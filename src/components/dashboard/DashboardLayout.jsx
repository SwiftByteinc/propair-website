import { useEffect, useState, useMemo } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { supabase } from '../../lib/supabase';
import Sidebar from './Sidebar';

// Skeleton loader for initial auth loading
function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar skeleton - hidden on mobile */}
      <aside className="hidden md:block w-64 h-screen bg-white border-r border-slate-100 fixed left-0 top-0">
        <div className="animate-pulse">
          {/* Back button area */}
          <div className="h-16 px-6 flex items-center border-b border-slate-50">
            <div className="h-4 bg-slate-100 rounded w-16" />
          </div>
          {/* User card */}
          <div className="p-6 border-b border-slate-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-100 rounded-full shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-100 rounded w-28" />
                <div className="h-3 bg-slate-100 rounded w-36" />
              </div>
            </div>
            <div className="mt-4 h-6 bg-slate-100 rounded-full w-24" />
          </div>
          {/* Nav links */}
          <div className="p-4 space-y-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-11 bg-slate-50 rounded-xl" />
            ))}
          </div>
        </div>
      </aside>

      {/* Mobile header skeleton */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-slate-100 flex items-center px-4 z-30">
        <div className="w-11 h-11 bg-slate-100 rounded-xl animate-pulse" />
        <div className="h-4 bg-slate-100 rounded w-24 ml-3 animate-pulse" />
      </div>

      {/* Main skeleton */}
      <main className="md:ml-64 flex-1 p-4 sm:p-6 md:p-8 pt-18 md:pt-8 max-w-4xl">
        <div className="animate-pulse space-y-6">
          {/* Header */}
          <div>
            <div className="h-7 bg-slate-100 rounded-lg w-56 mb-2" />
            <div className="h-4 bg-slate-100 rounded w-72" />
          </div>
          {/* Status card */}
          <div className="h-24 bg-slate-100 rounded-2xl" />
          {/* Content card */}
          <div className="h-44 bg-slate-100 rounded-2xl" />
          {/* Quick links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="h-20 bg-slate-100 rounded-xl" />
            <div className="h-20 bg-slate-100 rounded-xl" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default function DashboardLayout() {
  const navigate = useNavigate();
  const {
    user,
    profile,
    subscription,
    loading,
    profileLoading,
    isPro,
    signOut
  } = useAuth();

  const { t } = useLanguage();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate('/connexion');
    }
  }, [user, loading, navigate]);

  // Handle sign out
  const handleSignOut = async () => {
    await signOut();
    navigate('/connexion');
  };

  // Build user object for components — memoized to avoid re-renders
  // Must be called before early returns to satisfy rules-of-hooks
  const userData = useMemo(() => {
    if (!user) return null;
    return {
      id: user.id,
      email: user.email || profile?.email,
      full_name: profile?.full_name || user.user_metadata?.full_name || t('dashboard.userFallback'),
      role: profile?.user_role || 'client',
      isPro: isPro,
      referral_code: profile?.referral_code,
      pro_months_balance: profile?.pro_months_balance || 0,
      is_verified: profile?.is_verified || false,
      activated: profile?.activated || false,
      leads_used: profile?.leads_used || 0,
      avatar_url: (() => {
        const isEntrep = profile?.user_role === 'entrepreneur';
        const path = isEntrep
          ? profile?.profile_customization?.logo_image
          : profile?.profile_customization?.profile_photo;
        if (!path) return null;
        if (path.startsWith('http')) return path;
        const bucket = isEntrep ? 'documents' : 'avatars';
        return supabase?.storage.from(bucket).getPublicUrl(path).data?.publicUrl || null;
      })(),
      subscription_status: subscription?.status,
      subscription_end: subscription?.current_period_end,
      email_confirmed_at: user.email_confirmed_at
    };
  }, [user, profile, subscription, isPro, t]);

  const pageTitle = useMemo(() => {
    const path = location.pathname;
    if (path === '/portal/billing') {
      return userData?.role === 'entrepreneur'
        ? t('dashboard.sideBillingEntrep')
        : t('dashboard.sideBillingClient');
    }
    if (path === '/portal/referral') return t('dashboard.sideReferral');
    if (path === '/portal/security') return t('dashboard.sideSecurity');
    return t('dashboard.sideHome');
  }, [location.pathname, t, userData?.role]);

  // Show skeleton while loading
  if (loading || profileLoading) {
    return <DashboardSkeleton />;
  }

  // Don't render if no user
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      {/* Mobile header with hamburger */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-slate-100 flex items-center px-4 z-30">
        <button
          onClick={() => setSidebarOpen(true)}
          className="w-11 h-11 flex items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100"
          aria-label={t('dashboard.openMenu')}
        >
          <Menu size={20} />
        </button>
        <span className="font-semibold text-sm text-slate-900 ml-3 truncate">{pageTitle}</span>
      </div>

      {/* Sidebar */}
      <Sidebar
        user={userData}
        onSignOut={handleSignOut}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <main className="md:ml-64 min-h-screen pt-14 md:pt-0">
        <Outlet context={{ user: userData, profile, subscription, isPro }} />
      </main>
    </div>
  );
}
