// supabase/functions/delete-user-account/index.ts
// Edge Function pour suppression de compte conforme RGPD/Loi 25
// Soft delete: données anonymisées immédiatement, conservées 30 jours puis purgées
// À déployer avec: supabase functions deploy delete-user-account

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // 1. Créer un client Supabase avec les droits ADMIN (Service Role)
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // 2. Récupérer l'utilisateur qui fait la demande (via son token)
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

    console.log(`Soft-deleting user: ${user.id} (${user.email})`)

    // 3. RGPD/Loi 25 - Soft delete avec rétention 30 jours
    // Marquer le compte comme supprimé (les données seront purgées après 30 jours)
    const { error: updateError } = await supabaseAdmin
      .from('profiles')
      .update({
        account_deleted: true,
        account_deleted_at: new Date().toISOString(),
        // Anonymiser les données sensibles immédiatement
        full_name: 'Compte supprimé',
        phone: null
      })
      .eq('id', user.id)

    if (updateError) {
      console.error('Update error:', updateError)
      return new Response(
        JSON.stringify({ error: updateError.message }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // 4. Désactiver l'utilisateur dans auth (ban = ne peut plus se connecter)
    const { error: banError } = await supabaseAdmin.auth.admin.updateUserById(user.id, {
      ban_duration: '876000h' // ~100 ans = compte désactivé définitivement
    })

    if (banError) {
      console.error('Ban error:', banError)
      return new Response(
        JSON.stringify({ error: banError.message }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log(`User ${user.id} soft-deleted successfully (data retained 30 days)`)

    return new Response(
      JSON.stringify({ message: 'Compte supprimé avec succès. Données conservées 30 jours.' }),
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
