import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useReferralStats(userId) {
  const [stats, setStats] = useState({
    totalReferrals: 0,
    validatedReferrals: 0,
    pendingReferrals: 0,
    entreValidated: 0,
    clientValidated: 0,
    entreMonths: 0,
    clientMonths: 0,
    earnedMonths: 0
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
          .select('id, referrer_id, referee_id, referrer_email, referee_email, referee_type, status, created_at')
          .eq('referrer_id', userId)
          .order('created_at', { ascending: false });

        if (!isMounted) return;
        if (error) throw error;

        setError(null);

        // Single pass over data to compute all counts
        let total = 0, validated = 0, pending = 0, entreValidated = 0, clientValidated = 0;
        if (data) {
          for (const item of data) {
            total++;
            if (item.status === 'validated') {
              validated++;
              if (item.referee_type === 'entrepreneur') entreValidated++;
              if (item.referee_type === 'client') clientValidated++;
            } else if (item.status === 'pending') {
              pending++;
            }
          }
        }
        const entreMonths = entreValidated * 3;
        const clientMonths = Math.floor(clientValidated / 6) * 3;

        setStats({
          totalReferrals: total,
          validatedReferrals: validated,
          pendingReferrals: pending,
          entreValidated,
          clientValidated,
          entreMonths,
          clientMonths,
          earnedMonths: entreMonths + clientMonths
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
