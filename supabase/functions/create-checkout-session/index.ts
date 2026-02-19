// supabase/functions/create-checkout-session/index.ts
// Creates a Stripe Checkout Session for subscription payment
// Deploy: supabase functions deploy create-checkout-session

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14?target=deno'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // 1. Authenticate user
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(
      authHeader.replace('Bearer ', '')
    )
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // 2. Parse and validate plan
    const { plan } = await req.json()
    if (!plan || !['monthly', 'annual'].includes(plan)) {
      return new Response(
        JSON.stringify({ error: 'Invalid plan. Must be "monthly" or "annual".' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // 3. Resolve Stripe Price ID (with early bird logic for annual)
    let priceId: string | undefined

    if (plan === 'monthly') {
      priceId = Deno.env.get('STRIPE_PRICE_MONTHLY')
    } else {
      // Count active subscriptions to determine early bird eligibility
      const earlyBirdLimit = 200
      const { count } = await supabaseAdmin
        .from('subscriptions')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active')

      if ((count ?? 0) < earlyBirdLimit) {
        priceId = Deno.env.get('STRIPE_PRICE_ANNUAL_EARLY') || Deno.env.get('STRIPE_PRICE_ANNUAL')
      } else {
        priceId = Deno.env.get('STRIPE_PRICE_ANNUAL_STANDARD') || Deno.env.get('STRIPE_PRICE_ANNUAL')
      }

      console.log(`Annual plan: ${count ?? 0}/${earlyBirdLimit} active subs → ${(count ?? 0) < earlyBirdLimit ? 'early bird' : 'standard'} price`)
    }

    if (!priceId) {
      console.error(`Missing Stripe price env var for plan: ${plan}`)
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // 4. Create or retrieve Stripe Customer
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
      apiVersion: '2023-10-16',
    })

    let customerId: string | undefined

    const { data: profileData } = await supabaseAdmin
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .single()

    if (profileData?.stripe_customer_id) {
      customerId = profileData.stripe_customer_id
    } else {
      // Search existing Stripe customer by email
      const existingCustomers = await stripe.customers.list({
        email: user.email,
        limit: 1,
      })

      if (existingCustomers.data.length > 0) {
        customerId = existingCustomers.data[0].id
      } else {
        const customer = await stripe.customers.create({
          email: user.email,
          metadata: { supabase_user_id: user.id },
        })
        customerId = customer.id
      }

      // Store customer ID in profiles
      await supabaseAdmin
        .from('profiles')
        .update({ stripe_customer_id: customerId })
        .eq('id', user.id)
    }

    // 5. Create Checkout Session
    const origin = req.headers.get('origin') || 'https://www.propairapp.com'

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/portal/billing?checkout=success`,
      cancel_url: `${origin}/portal/billing?checkout=cancelled`,
      subscription_data: {
        metadata: { supabase_user_id: user.id },
      },
      metadata: { supabase_user_id: user.id },
      allow_promotion_codes: true,
      automatic_tax: { enabled: true },
      customer_update: { address: 'auto' },
    })

    return new Response(
      JSON.stringify({ url: session.url }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Unexpected error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
