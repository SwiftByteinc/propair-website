import { createContext, useContext, useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { clearStoredReferralCode } from '../hooks/useReferralCapture';

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
          .order('created_at', { ascending: false })
          .limit(5);

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

  // Track if referral was already processed to avoid duplicates
  const referralProcessed = useRef(false);

  // Process pending referral after signup
  const processReferral = useCallback(async (currentUser) => {
    if (!supabase || !currentUser || referralProcessed.current) return;

    try {
      const pendingRaw = sessionStorage.getItem('pending_referral');
      if (!pendingRaw) return;

      const pending = JSON.parse(pendingRaw);
      if (!pending?.code) return;

      // Guard: only process within 1 hour of creation
      if (Date.now() - pending.timestamp > 3600000) {
        clearStoredReferralCode();
        return;
      }

      referralProcessed.current = true;

      // 1. Look up the referrer by referral_code
      const { data: referrer, error: lookupErr } = await supabase
        .from('profiles')
        .select('id, email')
        .eq('referral_code', pending.code)
        .single();

      if (lookupErr || !referrer) {
        clearStoredReferralCode();
        return;
      }

      // 2. Guard: can't refer yourself
      if (referrer.id === currentUser.id) {
        clearStoredReferralCode();
        return;
      }

      // 3. Guard: check if already referred (unique constraint)
      const { data: existing } = await supabase
        .from('referral_events')
        .select('id')
        .eq('referred_id', currentUser.id)
        .limit(1);

      if (existing && existing.length > 0) {
        clearStoredReferralCode();
        return;
      }

      // 4. Determine referee_type from profile (default to 'client')
      const { data: newProfile } = await supabase
        .from('profiles')
        .select('user_role')
        .eq('id', currentUser.id)
        .single();

      const refereeType = newProfile?.user_role === 'entrepreneur' ? 'entrepreneur' : 'client';

      // 5. Create the referral_event
      await supabase.from('referral_events').insert({
        referrer_id: referrer.id,
        referrer_email: referrer.email,
        referred_id: currentUser.id,
        referee_type: refereeType,
        status: refereeType === 'client' ? 'validated' : 'pending',
        created_at: new Date().toISOString()
      });

      // 6. Cleanup
      clearStoredReferralCode();

    } catch {
      // Silent fail — don't block auth flow
      clearStoredReferralCode();
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
          if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
            await fetchProfile(currentUser);
          }
          // Process pending referral on first sign-in
          if (event === 'SIGNED_IN') {
            processReferral(currentUser);
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
  }, [fetchProfile, processReferral]);

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
    const allowedPaths = ['/portal', '/portal/billing', '/portal/referral', '/portal/settings'];
    const safePath = allowedPaths.includes(redirectTo) ? redirectTo : '/portal';
    return await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}${safePath}`
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
      referralProcessed.current = false;
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
