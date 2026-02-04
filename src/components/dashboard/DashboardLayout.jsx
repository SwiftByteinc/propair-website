import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Sidebar from './Sidebar';

// Skeleton loader for initial auth loading
function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex">
      {/* Sidebar skeleton */}
      <aside className="w-64 h-screen bg-white border-r border-gray-100 fixed left-0 top-0">
        <div className="p-6 space-y-4 animate-pulse">
          <div className="h-8 bg-gray-100 rounded-lg w-32" />
          <div className="h-12 bg-gray-100 rounded-full w-12" />
          <div className="h-4 bg-gray-100 rounded w-full" />
          <div className="h-4 bg-gray-100 rounded w-2/3" />
        </div>
      </aside>
      {/* Main skeleton */}
      <main className="ml-64 flex-1 p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-100 rounded-lg w-64" />
          <div className="h-32 bg-gray-100 rounded-2xl" />
          <div className="h-48 bg-gray-100 rounded-2xl" />
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

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  // Handle sign out
  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  // Show skeleton while loading
  if (loading || profileLoading) {
    return <DashboardSkeleton />;
  }

  // Don't render if no user
  if (!user) {
    return null;
  }

  // Build user object for components
  const userData = {
    id: user.id,
    email: user.email || profile?.email,
    full_name: profile?.full_name || user.user_metadata?.full_name || 'Utilisateur',
    role: profile?.user_role || 'entrepreneur', // Default to entrepreneur
    isPro: isPro,
    referral_code: profile?.referral_code,
    pro_months_balance: profile?.pro_months_balance || 0,
    is_verified: profile?.is_verified || false,
    // Trial connections (for non-Pro users)
    trial_connections_count: profile?.trial_connections_count || 0,
    // Subscription info
    subscription_status: subscription?.status,
    subscription_end: subscription?.current_period_end
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Sidebar */}
      <Sidebar user={userData} onSignOut={handleSignOut} />

      {/* Main Content Area */}
      <main className="ml-64 min-h-screen">
        <Outlet context={{ user: userData, profile, subscription, isPro }} />
      </main>
    </div>
  );
}
