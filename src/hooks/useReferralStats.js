import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useReferralStats(userId) {
  const [stats, setStats] = useState({
    totalReferrals: 0,      // Total des invitations
    validatedReferrals: 0,  // Ceux qui ont payé/sont validés
    pendingReferrals: 0,    // En attente
    earnedMonths: 0         // Mois gratuits gagnés
  });
  const [referralList, setReferralList] = useState([]); // Pour afficher la liste
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    async function fetchReferralData() {
      try {
        setLoading(true);

        // Récupère TOUS les événements de parrainage pour cet utilisateur
        const { data, error } = await supabase
          .from('referral_events')
          .select('*')
          .eq('referrer_id', userId)
          .order('created_at', { ascending: false }); // Les plus récents en premier

        if (error) throw error;

        // Calcul des statistiques en JS
        const total = data?.length || 0;
        const validated = data?.filter(item => item.status === 'validated').length || 0;
        const pending = data?.filter(item => item.status === 'pending').length || 0;

        // 1 parrainage validé = 1 mois offert
        const earned = validated;

        setStats({
          totalReferrals: total,
          validatedReferrals: validated,
          pendingReferrals: pending,
          earnedMonths: earned
        });

        setReferralList(data || []);

      } catch (err) {
        if (import.meta.env.DEV) console.error('Erreur lors du chargement des parrainages:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchReferralData();
  }, [userId]);

  return { stats, referralList, loading, error };
}
