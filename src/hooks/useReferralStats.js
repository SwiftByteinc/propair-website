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
    if (!userId || !supabase) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    async function fetchReferralData() {
      try {
        setLoading(true);

        const { data, error } = await supabase
          .from('referral_events')
          .select('*')
          .eq('referrer_id', userId)
          .order('created_at', { ascending: false });

        if (!isMounted) return;
        if (error) throw error;

        setError(null);

        const total = data?.length || 0;
        const validated = data?.filter(item => item.status === 'validated').length || 0;
        const pending = data?.filter(item => item.status === 'pending').length || 0;
        const entreValidated = data?.filter(item => item.status === 'validated' && item.referee_type === 'entrepreneur').length || 0;
        const clientCount = data?.filter(item => item.referee_type === 'client').length || 0;
        const earned = (entreValidated * 2) + (Math.floor(clientCount / 6) * 2);

        setStats({
          totalReferrals: total,
          validatedReferrals: validated,
          pendingReferrals: pending,
          earnedMonths: earned
        });

        setReferralList(data || []);

      } catch (err) {
        if (!isMounted) return;
        if (import.meta.env.DEV) console.error('Erreur lors du chargement des parrainages:', err);
        setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchReferralData();

    return () => { isMounted = false; };
  }, [userId]);

  return { stats, referralList, loading, error };
}
