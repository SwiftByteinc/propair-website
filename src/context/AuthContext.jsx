import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [subscription, setSubscription] = useState(null)
  const [loading, setLoading] = useState(true)
  const [profileLoading, setProfileLoading] = useState(false)

  // Create a fallback profile from user data
  const createFallbackProfile = (userData) => ({
    id: userData.id,
    email: userData.email,
    full_name: userData.user_metadata?.full_name || userData.email?.split('@')[0] || 'Utilisateur',
    user_role: 'client',
    referral_code: null,
    pro_months_balance: 0,
    is_verified: false
  })

  // Fetch user profile from profiles table with timeout
  const fetchProfile = async (userData) => {
    if (!userData?.id || !supabase) {
      setProfile(createFallbackProfile(userData || { id: 'unknown', email: '' }))
      setProfileLoading(false)
      return
    }

    setProfileLoading(true)

    // Create a timeout promise
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), 5000)
    )

    try {
      // Race between fetch and timeout
      const profilePromise = supabase
        .from('profiles')
        .select('*')
        .eq('id', userData.id)
        .single()

      const { data: profileData, error: profileError } = await Promise.race([
        profilePromise,
        timeoutPromise
      ])

      if (profileError) {
        setProfile(createFallbackProfile(userData))
      } else {
        setProfile(profileData)
      }

      // Fetch subscription with timeout
      try {
        const subPromise = supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', userData.id)
          .limit(5)

        const { data: subData } = await Promise.race([
          subPromise,
          new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 3000))
        ])

        if (subData && subData.length > 0) {
          const activeSub = subData.find(s => s.status === 'active' || s.status === 'trialing')
          setSubscription(activeSub || null)
        } else {
          setSubscription(null)
        }
      } catch {
        setSubscription(null)
      }

    } catch {
      setProfile(createFallbackProfile(userData))
      setSubscription(null)
    } finally {
      setProfileLoading(false)
    }
  }

  useEffect(() => {
    let isMounted = true
    let authSubscription = null

    const initializeAuth = async () => {
      // If supabase is not configured, skip auth
      if (!supabase) {
        console.warn('Supabase not configured - skipping auth')
        if (isMounted) setLoading(false)
        return
      }

      try {
        // Add timeout to getSession to prevent infinite loading
        const sessionPromise = supabase.auth.getSession()
        const timeoutPromise = new Promise((resolve) =>
          setTimeout(() => resolve({ data: { session: null } }), 5000)
        )

        const { data: { session } } = await Promise.race([sessionPromise, timeoutPromise])
        if (!isMounted) return

        const currentUser = session?.user ?? null
        setUser(currentUser)

        if (currentUser) {
          await fetchProfile(currentUser)
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Auth error:', error)
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    initializeAuth()

    // Listen for auth changes (only if supabase is configured)
    if (supabase) {
      const { data } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (!isMounted) return
          const currentUser = session?.user ?? null
          setUser(currentUser)
          if (currentUser) {
            await fetchProfile(currentUser)
          } else {
            setProfile(null)
            setSubscription(null)
          }
          setLoading(false)
        }
      )
      authSubscription = data?.subscription
    }

    return () => {
      isMounted = false
      if (authSubscription) {
        authSubscription.unsubscribe()
      }
    }
  }, [])

  // Sign in with email/password
  const signIn = async (email, password) => {
    if (!supabase) return { data: null, error: { message: 'Supabase not configured' } }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  }

  // Sign up with email/password
  const signUp = async (email, password, fullName, referralCode = null) => {
    if (!supabase) return { data: null, error: { message: 'Supabase not configured' } }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName }
      }
    })

    // Store referral code for later processing
    if (data?.user && referralCode) {
      localStorage.setItem('pending_referral', JSON.stringify({
        code: referralCode,
        userId: data.user.id,
        timestamp: Date.now()
      }))
    }

    return { data, error }
  }

  // Sign in with OAuth (Apple/Google)
  const signInWithOAuth = async (provider, redirectTo = '/portal') => {
    if (!supabase) return { data: null, error: { message: 'Supabase not configured' } }
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}${redirectTo}`
      }
    })
    return { data, error }
  }

  // Sign out
  const signOut = async () => {
    if (!supabase) {
      setUser(null)
      setProfile(null)
      setSubscription(null)
      return { error: null }
    }
    const { error } = await supabase.auth.signOut()
    if (!error) {
      setUser(null)
      setProfile(null)
      setSubscription(null)
    }
    return { error }
  }

  // Check if user is Pro (based on active subscription)
  const isPro = subscription?.status === 'active' || subscription?.status === 'trialing'
  const hasReferralMonths = (profile?.pro_months_balance || 0) > 0

  const value = {
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
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
