import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

// Helper function outside component to avoid recreation
const createFallbackProfile = (userData) => ({
  id: userData?.id || 'unknown',
  email: userData?.email || '',
  full_name: userData?.user_metadata?.full_name || userData?.email?.split('@')[0] || 'Utilisateur',
  user_role: 'client',
  referral_code: null,
  pro_months_balance: 0,
  is_verified: false
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);

  // Fetch user profile securely with timeout handling
  const fetchProfile = useCallback(async (userData) => {
    if (!userData?.id || !supabase) {
      setProfile(createFallbackProfile(userData));
      setProfileLoading(false);
      return;
    }

    setProfileLoading(true);

    try {
      // 1. Fetch Profile with Timeout Race
      const profilePromise = supabase
        .from('profiles')
        .select('*')
        .eq('id', userData.id)
        .single();

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), 5000)
      );

      const { data: profileData, error: profileError } = await Promise.race([
        profilePromise,
        timeoutPromise
      ]);

      if (profileError) {
        // Silent fail to fallback
        setProfile(createFallbackProfile(userData));
      } else {
        setProfile(profileData);
      }

      // 2. Fetch Subscription (Only if profile succeeded or fallback created)
      try {
        const subPromise = supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', userData.id)
          .limit(5); // Safety limit

        const { data: subData } = await Promise.race([
          subPromise,
          new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 3000))
        ]);

        if (subData && subData.length > 0) {
          // Prioritize active or trialing subscriptions
          const activeSub = subData.find(s => ['active', 'trialing'].includes(s.status));
          setSubscription(activeSub || null);
        } else {
          setSubscription(null);
        }
      } catch {
        setSubscription(null);
      }

    } catch {
      setProfile(createFallbackProfile(userData));
      setSubscription(null);
    } finally {
      setProfileLoading(false);
    }
  }, []);

  // Main Auth Effect
  useEffect(() => {
    let isMounted = true;
    let authListener = null;

    const initializeAuth = async () => {
      if (!supabase) {
        if (import.meta.env.DEV) console.warn('Supabase not configured');
        if (isMounted) setLoading(false);
        return;
      }

      try {
        // Get initial session with timeout
        const sessionPromise = supabase.auth.getSession();
        const timeoutPromise = new Promise((resolve) =>
          setTimeout(() => resolve({ data: { session: null } }), 5000)
        );

        const { data: { session }, error } = await Promise.race([sessionPromise, timeoutPromise]);
        if (error) throw error;

        if (isMounted) {
          const currentUser = session?.user ?? null;
          setUser(currentUser);

          if (currentUser) {
            await fetchProfile(currentUser);
          }
        }
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error('Auth initialization error:', error);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    initializeAuth();

    // Subscribe to auth changes
    if (supabase) {
      const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (!isMounted) return;

        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
          // Only refetch if user changed or just signed in
          if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
            await fetchProfile(currentUser);
          }
        } else {
          setProfile(null);
          setSubscription(null);
        }

        setLoading(false);
      });
      authListener = data.subscription;
    }

    return () => {
      isMounted = false;
      if (authListener) authListener.unsubscribe();
    };
  }, [fetchProfile]);

  // --- Auth Actions ---

  const signIn = useCallback(async (email, password) => {
    if (!supabase) return { error: { message: 'Service unavailable' } };
    return await supabase.auth.signInWithPassword({ email, password });
  }, []);

  const signUp = useCallback(async (email, password, fullName, referralCode = null) => {
    if (!supabase) return { error: { message: 'Service unavailable' } };

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName }
      }
    });

    if (data?.user && referralCode) {
      // Use sessionStorage instead of localStorage for slightly better security
      sessionStorage.setItem('pending_referral', JSON.stringify({
        code: referralCode,
        userId: data.user.id,
        timestamp: Date.now()
      }));
    }

    return { data, error };
  }, []);

  const signInWithOAuth = useCallback(async (provider, redirectTo = '/portal') => {
    if (!supabase) return { error: { message: 'Service unavailable' } };
    return await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}${redirectTo}`
      }
    });
  }, []);

  const signOut = useCallback(async () => {
    if (!supabase) {
      setUser(null);
      setProfile(null);
      setSubscription(null);
      return { error: null };
    }
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
      setProfile(null);
      setSubscription(null);
    }
    return { error };
  }, []);

  // Computed values
  const isPro = subscription?.status === 'active' || subscription?.status === 'trialing';
  const hasReferralMonths = (profile?.pro_months_balance || 0) > 0;

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    user,
    profile,
    subscription,
    loading,
    profileLoading,
    isPro,
    hasReferralMonths,
    signIn,
    signUp,
    signInWithOAuth,
    signOut,
    refreshProfile: () => user && fetchProfile(user)
  }), [user, profile, subscription, loading, profileLoading, isPro, hasReferralMonths, signIn, signUp, signInWithOAuth, signOut, fetchProfile]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
