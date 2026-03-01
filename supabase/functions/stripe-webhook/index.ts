// supabase/functions/stripe-webhook/index.ts
// Handles Stripe webhook events to sync subscription state
// Deploy: supabase functions deploy stripe-webhook --no-verify-jwt

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14?target=deno'

serve(async (req) => {
  const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
    apiVersion: '2023-10-16',
  })

  const supabaseAdmin = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  // Referral credit amount per month (in cents). Default: 4999 = 49.99$ CAD
  const REFERRAL_CREDIT_PER_MONTH = parseInt(Deno.env.get('REFERRAL_CREDIT_PER_MONTH') ?? '4999', 10)

  // 1. Verify webhook signature
  const signature = req.headers.get('stripe-signature')
  if (!signature) {
    return new Response('Missing stripe-signature header', { status: 400 })
  }

  const body = await req.text()
  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      Deno.env.get('STRIPE_WEBHOOK_SECRET') ?? ''
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }

  console.log(`Processing webhook event: ${event.type} (${event.id})`)

  // Helper: find user ID by stripe customer ID
  const findUserByCustomer = async (customerId: string): Promise<string | null> => {
    const { data } = await supabaseAdmin
      .from('profiles')
      .select('id')
      .eq('stripe_customer_id', customerId)
      .single()
    return data?.id ?? null
  }

  // Helper: sync profiles.activated flag (used by the mobile app as the real Pro gate)
  const setActivated = async (userId: string, activated: boolean) => {
    const { error } = await supabaseAdmin
      .from('profiles')
      .update({ activated })
      .eq('id', userId)
    if (error) console.error(`Error setting profiles.activated=${activated} for ${userId}:`, error)
    else console.log(`profiles.activated=${activated} for user ${userId}`)
  }

  // Helper: validate pending entrepreneur referral and credit months (atomic SQL transaction)
  const validatePendingReferrals = async (userId: string) => {
    const { error } = await supabaseAdmin.rpc('validate_and_credit_referral', {
      new_pro_id: userId
    })
    if (error) console.error(`Referral validation error for ${userId}:`, error)
    else console.log(`Referral validation check completed for ${userId}`)
  }

  // Helper: apply Stripe Customer Balance credits for a validated entrepreneur referral
  // Uses stripe_credited flag to prevent duplicate credits on repeated webhook events
  const applyReferralStripeCredits = async (refereeUserId: string) => {
    try {
      // Find the validated referral for this referee that hasn't been credited yet
      const { data: referralEvent, error: lookupErr } = await supabaseAdmin
        .from('referral_events')
        .select('id, referrer_id, referee_type')
        .eq('referee_id', refereeUserId)
        .eq('status', 'validated')
        .eq('stripe_credited', false)
        .maybeSingle()

      if (lookupErr) {
        console.error(`Referral credit lookup error for ${refereeUserId}:`, lookupErr)
        return
      }

      // No uncredited referral found (already credited or no referral exists)
      if (!referralEvent) return

      // Only entrepreneur referrals get immediate Stripe credits
      if (referralEvent.referee_type !== 'entrepreneur') return

      // Credit the REFERRER: +3 months
      const { data: referrerProfile } = await supabaseAdmin
        .from('profiles')
        .select('stripe_customer_id')
        .eq('id', referralEvent.referrer_id)
        .single()

      if (referrerProfile?.stripe_customer_id) {
        const referrerCredit = REFERRAL_CREDIT_PER_MONTH * 3
        await stripe.customers.createBalanceTransaction(
          referrerProfile.stripe_customer_id,
          {
            amount: -referrerCredit, // Negative = credit in favor of customer
            currency: 'cad',
            description: 'Récompense parrainage ProPair – 3 mois offerts',
          }
        )
        console.log(`Stripe credit applied: -${referrerCredit} to referrer ${referralEvent.referrer_id}`)
      } else {
        // Referrer has no Stripe customer yet — pro_months_balance is already set by the RPC,
        // stored credits will be applied when they subscribe (see applyStoredReferralCredits)
        console.log(`Referrer ${referralEvent.referrer_id} has no Stripe customer — credits stored in pro_months_balance`)
      }

      // Credit the REFEREE (filleul): +2 months
      const { data: refereeProfile } = await supabaseAdmin
        .from('profiles')
        .select('stripe_customer_id')
        .eq('id', refereeUserId)
        .single()

      if (refereeProfile?.stripe_customer_id) {
        const refereeCredit = REFERRAL_CREDIT_PER_MONTH * 2
        await stripe.customers.createBalanceTransaction(
          refereeProfile.stripe_customer_id,
          {
            amount: -refereeCredit,
            currency: 'cad',
            description: 'Bonus filleul ProPair – 2 mois offerts',
          }
        )
        console.log(`Stripe credit applied: -${refereeCredit} to referee ${refereeUserId}`)
      }

      // Mark as credited to prevent duplicate credits
      await supabaseAdmin
        .from('referral_events')
        .update({ stripe_credited: true })
        .eq('id', referralEvent.id)

      console.log(`Referral event ${referralEvent.id} marked as stripe_credited`)

    } catch (err) {
      // Non-blocking: log error but don't fail the webhook
      console.error(`Error applying referral Stripe credits for ${refereeUserId}:`, err)
    }
  }

  // Helper: apply stored pro_months_balance as Stripe Customer Balance on first checkout
  // Handles the case where a user accumulated referral months before subscribing
  const applyStoredReferralCredits = async (userId: string) => {
    try {
      const { data: profile } = await supabaseAdmin
        .from('profiles')
        .select('pro_months_balance, stripe_customer_id')
        .eq('id', userId)
        .single()

      if (!profile?.stripe_customer_id || !profile?.pro_months_balance || profile.pro_months_balance <= 0) {
        return
      }

      const creditAmount = REFERRAL_CREDIT_PER_MONTH * profile.pro_months_balance

      await stripe.customers.createBalanceTransaction(
        profile.stripe_customer_id,
        {
          amount: -creditAmount,
          currency: 'cad',
          description: `Crédit parrainage ProPair – ${profile.pro_months_balance} mois accumulés`,
        }
      )

      // Reset balance to zero (credits are now in Stripe)
      await supabaseAdmin
        .from('profiles')
        .update({ pro_months_balance: 0 })
        .eq('id', userId)

      console.log(`Applied ${profile.pro_months_balance} stored months (${creditAmount} cents) as Stripe credit for ${userId}`)

    } catch (err) {
      console.error(`Error applying stored referral credits for ${userId}:`, err)
    }
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.metadata?.supabase_user_id
        const subscriptionId = session.subscription as string

        if (!userId || !subscriptionId) {
          console.error('Missing metadata or subscription ID in checkout.session.completed')
          break
        }

        // Fetch full subscription details from Stripe
        const subscription = await stripe.subscriptions.retrieve(subscriptionId)
        const priceId = subscription.items.data[0]?.price.id
        const plan = priceId === Deno.env.get('STRIPE_PRICE_ANNUAL') ? 'annual' : 'monthly'

        // Upsert subscription record
        const { error } = await supabaseAdmin
          .from('subscriptions')
          .upsert({
            user_id: userId,
            status: subscription.status,
            plan: plan,
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            stripe_subscription_id: subscriptionId,
            stripe_customer_id: session.customer as string,
          }, {
            onConflict: 'user_id',
          })

        if (error) console.error('Error upserting subscription:', error)
        else console.log(`Subscription created for user ${userId}: ${plan} (${subscription.status})`)

        // Activate profile (syncs with mobile app's Pro gate)
        await setActivated(userId, true)

        // Validate any pending entrepreneur referral for this user
        await validatePendingReferrals(userId)

        // Apply Stripe Customer Balance credits for the validated referral
        await applyReferralStripeCredits(userId)

        // Apply any stored referral months accumulated before subscribing
        await applyStoredReferralCredits(userId)

        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        let userId = subscription.metadata?.supabase_user_id

        if (!userId) {
          userId = await findUserByCustomer(subscription.customer as string)
        }

        if (!userId) {
          console.error('Cannot find user for subscription update')
          break
        }

        const priceId = subscription.items.data[0]?.price.id
        const plan = priceId === Deno.env.get('STRIPE_PRICE_ANNUAL') ? 'annual' : 'monthly'

        const { error } = await supabaseAdmin
          .from('subscriptions')
          .update({
            status: subscription.status,
            plan: plan,
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          })
          .eq('user_id', userId)

        if (error) console.error('Error updating subscription:', error)
        else console.log(`Subscription updated for user ${userId}: ${subscription.status}`)

        // Sync activated flag with subscription status
        const isActive = ['active', 'trialing'].includes(subscription.status)
        await setActivated(userId, isActive)

        // Validate pending referral only on real payment (not trialing)
        if (subscription.status === 'active') {
          await validatePendingReferrals(userId)

          // Apply Stripe Customer Balance credits for the validated referral
          await applyReferralStripeCredits(userId)
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        let userId = subscription.metadata?.supabase_user_id

        if (!userId) {
          userId = await findUserByCustomer(subscription.customer as string)
        }

        if (!userId) {
          console.error('Cannot find user for subscription deletion')
          break
        }

        const { error } = await supabaseAdmin
          .from('subscriptions')
          .update({ status: 'cancelled' })
          .eq('user_id', userId)

        if (error) console.error('Error cancelling subscription:', error)
        else console.log(`Subscription cancelled for user ${userId}`)

        // Deactivate profile
        await setActivated(userId, false)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const customerId = invoice.customer as string

        const userId = await findUserByCustomer(customerId)
        if (userId) {
          await supabaseAdmin
            .from('subscriptions')
            .update({ status: 'past_due' })
            .eq('user_id', userId)
          console.log(`Subscription marked past_due for user ${userId}`)
        } else {
          console.error('Cannot find user for invoice.payment_failed')
        }
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }
  } catch (error) {
    console.error('Error processing webhook event:', error)
  }

  // Always return 200 to acknowledge receipt
  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
})
