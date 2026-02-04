import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useReferralStats(userId) {
  const [stats, setStats] = useState({
    totalReferrals: 0,
    subscribedReferrals: 0,
    potentialEarnings: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    async function fetchReferrals() {
      try {
        setLoading(true);

        // 1. Compter le nombre total de filleuls (ceux qui ont utilisé ton code)
        const { count: total, error: totalError } = await supabase
          .from('referrals')
          .select('*', { count: 'exact', head: true })
          .eq('referrer_id', userId);

        if (totalError) throw totalError;

        // 2. Compter ceux qui se sont abonnés (conversion)
        // On suppose que ta table referrals a une colonne 'status'
        const { count: subscribed, error: subError } = await supabase
          .from('referrals')
          .select('*', { count: 'exact', head: true })
          .eq('referrer_id', userId)
          .eq('status', 'subscribed');

        if (subError) throw subError;

        setStats({
          totalReferrals: total || 0,
          subscribedReferrals: subscribed || 0,
          // 1 mois gratuit (valeur 29$) par filleul abonné
          potentialEarnings: (subscribed || 0) * 29
        });

      } catch (err) {
        console.error('Erreur stats parrainage:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchReferrals();
  }, [userId]);

  return { stats, loading, error };
}
