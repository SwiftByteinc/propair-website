// supabase/functions/send-referral-email/index.ts
// Sends email notifications when a referral is validated
// Triggered by a Supabase Database Webhook on referral_events UPDATE (status → 'validated')
// Deploy: supabase functions deploy send-referral-email --no-verify-jwt

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  try {
    const payload = await req.json()

    // Database webhook sends: { type, table, record, old_record, schema }
    const { record, old_record } = payload

    // Guard: only process status changes to 'validated'
    if (!record || record.status !== 'validated') {
      return new Response(JSON.stringify({ skipped: true }), { status: 200 })
    }

    // Guard: only process actual status changes (not re-triggers)
    if (old_record?.status === 'validated') {
      return new Response(JSON.stringify({ skipped: true, reason: 'already_validated' }), { status: 200 })
    }

    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    if (!resendApiKey) {
      console.error('RESEND_API_KEY not configured')
      return new Response(JSON.stringify({ error: 'Email service not configured' }), { status: 500 })
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Fetch referrer and referee profiles
    const [referrerResult, refereeResult] = await Promise.all([
      supabaseAdmin
        .from('profiles')
        .select('email, full_name')
        .eq('id', record.referrer_id)
        .single(),
      supabaseAdmin
        .from('profiles')
        .select('email, full_name')
        .eq('id', record.referee_id)
        .single(),
    ])

    const referrer = referrerResult.data
    const referee = refereeResult.data

    if (!referrer?.email) {
      console.error(`Referrer profile not found for id: ${record.referrer_id}`)
      return new Response(JSON.stringify({ error: 'Referrer not found' }), { status: 200 })
    }

    const isEntrepreneur = record.referee_type === 'entrepreneur'
    const referrerName = referrer.full_name || 'Utilisateur'
    const refereeName = referee?.full_name || 'Un utilisateur'
    const fromEmail = Deno.env.get('RESEND_FROM_EMAIL') || 'ProPair <noreply@propairapp.com>'
    const appUrl = Deno.env.get('APP_URL') || 'https://www.propairapp.com'

    // --- Email to REFERRER (parrain) ---
    const referrerSubject = isEntrepreneur
      ? `${refereeName} a souscrit — 3 mois Pro offerts!`
      : `Nouveau client validé dans votre réseau ProPair`

    const referrerMonths = isEntrepreneur ? '3' : ''
    const referrerBody = isEntrepreneur
      ? `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <img src="${appUrl}/logo-propair.png" alt="ProPair" style="height: 32px;" />
          </div>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 32px; text-align: center;">
            <div style="font-size: 48px; margin-bottom: 16px;">🎉</div>
            <h1 style="color: #0f172a; font-size: 22px; margin: 0 0 12px;">Félicitations, ${referrerName}!</h1>
            <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 0 0 20px;">
              <strong>${refereeName}</strong> vient de souscrire à ProPair Pro grâce à votre parrainage.
              Vous recevez <strong>${referrerMonths} mois Pro gratuits</strong>, appliqués automatiquement à votre compte.
            </p>
            <div style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin: 20px 0;">
              <div style="color: #0f766e; font-size: 28px; font-weight: 700;">+${referrerMonths} mois</div>
              <div style="color: #64748b; font-size: 13px;">ajoutés à votre solde Pro</div>
            </div>
            <a href="${appUrl}/portal/referral" style="display: inline-block; background: #0f172a; color: white; text-decoration: none; padding: 12px 28px; border-radius: 12px; font-weight: 600; font-size: 14px;">
              Voir mon tableau de bord
            </a>
          </div>
          <p style="color: #94a3b8; font-size: 12px; text-align: center; margin-top: 24px;">
            ProPair — Magog, Québec<br/>
            <a href="${appUrl}/site/privacy" style="color: #94a3b8;">Politique de confidentialité</a>
          </p>
        </div>`
      : `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <img src="${appUrl}/logo-propair.png" alt="ProPair" style="height: 32px;" />
          </div>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 32px; text-align: center;">
            <div style="font-size: 48px; margin-bottom: 16px;">👤</div>
            <h1 style="color: #0f172a; font-size: 22px; margin: 0 0 12px;">Nouveau client validé!</h1>
            <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 0 0 20px;">
              <strong>${refereeName}</strong> vient de rejoindre ProPair grâce à votre lien de parrainage.
              Continuez à inviter vos contacts — <strong>6 clients validés = 3 mois Pro gratuits</strong>.
            </p>
            <a href="${appUrl}/portal/referral" style="display: inline-block; background: #0f172a; color: white; text-decoration: none; padding: 12px 28px; border-radius: 12px; font-weight: 600; font-size: 14px;">
              Voir ma progression
            </a>
          </div>
          <p style="color: #94a3b8; font-size: 12px; text-align: center; margin-top: 24px;">
            ProPair — Magog, Québec<br/>
            <a href="${appUrl}/site/privacy" style="color: #94a3b8;">Politique de confidentialité</a>
          </p>
        </div>`

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: referrer.email,
        subject: referrerSubject,
        html: referrerBody,
      }),
    })

    console.log(`Referral notification email sent to referrer ${referrer.email} (${record.referee_type})`)

    // --- Email to REFEREE (filleul) — only for entrepreneur referrals ---
    if (isEntrepreneur && referee?.email) {
      const refereeBody = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <img src="${appUrl}/logo-propair.png" alt="ProPair" style="height: 32px;" />
          </div>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 32px; text-align: center;">
            <div style="font-size: 48px; margin-bottom: 16px;">🎁</div>
            <h1 style="color: #0f172a; font-size: 22px; margin: 0 0 12px;">Bienvenue dans ProPair Pro!</h1>
            <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 0 0 20px;">
              Merci d'avoir rejoint ProPair grâce à un parrainage.
              Vous recevez <strong>2 mois Pro gratuits</strong> en bonus, appliqués automatiquement à votre compte.
            </p>
            <div style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin: 20px 0;">
              <div style="color: #0f766e; font-size: 28px; font-weight: 700;">+2 mois</div>
              <div style="color: #64748b; font-size: 13px;">de crédit Pro appliqué</div>
            </div>
            <a href="${appUrl}/portal" style="display: inline-block; background: #0f172a; color: white; text-decoration: none; padding: 12px 28px; border-radius: 12px; font-weight: 600; font-size: 14px;">
              Accéder à mon espace
            </a>
          </div>
          <p style="color: #94a3b8; font-size: 12px; text-align: center; margin-top: 24px;">
            ProPair — Magog, Québec<br/>
            <a href="${appUrl}/site/privacy" style="color: #94a3b8;">Politique de confidentialité</a>
          </p>
        </div>`

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromEmail,
          to: referee.email,
          subject: '2 mois Pro gratuits — Bienvenue chez ProPair!',
          html: refereeBody,
        }),
      })

      console.log(`Referral welcome email sent to referee ${referee.email}`)
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })

  } catch (err) {
    console.error('Error in send-referral-email:', err)
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})
