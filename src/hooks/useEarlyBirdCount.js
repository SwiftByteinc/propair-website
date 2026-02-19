import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useEarlyBirdCount() {
  const [data, setData] = useState({ claimed: 0, remaining: 200, limit: 200, isEarlyBird: true });
  const [loading, setLoading] = useState(!!supabase);

  useEffect(() => {
    if (!supabase) return;

    supabase.functions.invoke('get-early-bird-count', { method: 'GET' })
      .then(({ data: result, error }) => {
        if (!error && result) setData(result);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { ...data, loading };
}
