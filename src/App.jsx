import { useEffect, lazy, Suspense, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { usePostHog } from '@posthog/react';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/auth/ProtectedRoute';
import CookieConsent from './components/ui/CookieConsent';
import StructuredData from './components/seo/StructuredData';
import { useReferralCapture } from './hooks/useReferralCapture';

// --- LAZY LOADING (Code Splitting P1) ---
const Home = lazy(() => import('./pages/Home'));
const Pricing = lazy(() => import('./pages/Pricing'));
const About = lazy(() => import('./pages/About'));
const Login = lazy(() => import('./pages/Login'));
const UpdatePassword = lazy(() => import('./pages/UpdatePassword'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const Refund = lazy(() => import('./pages/Refund'));
const Contact = lazy(() => import('./pages/Contact'));
const Parrainage = lazy(() => import('./pages/Parrainage'));
const DeleteAccount = lazy(() => import('./pages/DeleteAccount'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Website legal pages
const SitePrivacy = lazy(() => import('./pages/site/SitePrivacy'));
const SiteTerms = lazy(() => import('./pages/site/SiteTerms'));
const SiteCookies = lazy(() => import('./pages/site/SiteCookies'));
const SiteLegal = lazy(() => import('./pages/site/SiteLegal'));
const SiteRefund = lazy(() => import('./pages/site/SiteRefund'));

// Dashboard components
const DashboardLayout = lazy(() => import('./components/dashboard/DashboardLayout'));
const DashboardHome = lazy(() => import('./pages/dashboard/DashboardHome'));
const Billing = lazy(() => import('./pages/dashboard/Billing'));
const Referral = lazy(() => import('./pages/dashboard/Referral'));
const Security = lazy(() => import('./pages/dashboard/Security'));

// Loader optimisé
function PageLoader() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-teal-700/20 border-t-teal-700 rounded-full animate-spin" />
        <span className="text-sm text-slate-500 font-medium animate-pulse">{t('common.loading')}</span>
      </div>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  const posthog = usePostHog();
  const prevPath = useRef(pathname);
  useReferralCapture(); // Capture ?ref__= ou ?ref= depuis n'importe quelle page
  useEffect(() => {
    window.scrollTo(0, 0);
    // Track SPA page views on route change (skip initial — PostHog handles that)
    if (posthog && prevPath.current !== pathname) {
      posthog.capture('$pageview', { $current_url: window.location.href });
    }
    prevPath.current = pathname;
  }, [pathname, posthog]);
  return null;
}

// Layout wrapper
function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-slate-600">
      <Navbar />
      <main id="main-content" className="flex-grow">
        {/* Suspense wrap pour le lazy loading */}
        <Suspense fallback={<PageLoader />}>
          {children}
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-600">
      <Suspense fallback={<PageLoader />}>
        {children}
      </Suspense>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ToastProvider>
          <AuthProvider>
            <Router>
            <StructuredData />
            <ScrollToTop />
            <Routes>
              {/* Public Pages */}
              <Route path="/" element={<MainLayout><Home /></MainLayout>} />
              <Route path="/pricing" element={<MainLayout><Pricing /></MainLayout>} />
              <Route path="/about" element={<MainLayout><About /></MainLayout>} />

              {/* Legal Pages (orphan — no nav/footer for App Store review) */}
              <Route path="/privacy" element={<AuthLayout><Privacy /></AuthLayout>} />
              <Route path="/terms" element={<AuthLayout><Terms /></AuthLayout>} />
              <Route path="/refund" element={<AuthLayout><Refund /></AuthLayout>} />
              <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
              <Route path="/parrainage" element={<MainLayout><Parrainage /></MainLayout>} />

              {/* Website Legal Pages (with nav/footer) */}
              <Route path="/site/privacy" element={<MainLayout><SitePrivacy /></MainLayout>} />
              <Route path="/site/terms" element={<MainLayout><SiteTerms /></MainLayout>} />
              <Route path="/site/cookies" element={<MainLayout><SiteCookies /></MainLayout>} />
              <Route path="/site/legal" element={<MainLayout><SiteLegal /></MainLayout>} />
              <Route path="/site/refund" element={<MainLayout><SiteRefund /></MainLayout>} />

              {/* Auth Pages */}
              <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
              <Route path="/connexion" element={<AuthLayout><Login /></AuthLayout>} />
              <Route path="/forgot-password" element={<AuthLayout><ForgotPassword /></AuthLayout>} />
              <Route path="/update-password" element={<AuthLayout><UpdatePassword /></AuthLayout>} />
              <Route path="/delete-account" element={<AuthLayout><DeleteAccount /></AuthLayout>} />

              {/* Portal (Protected) */}
              <Route path="/portal" element={
                <ProtectedRoute>
                  <Suspense fallback={<PageLoader />}>
                    <DashboardLayout />
                  </Suspense>
                </ProtectedRoute>
              }>
                <Route index element={<DashboardHome />} />
                <Route path="billing" element={<Billing />} />
                <Route path="referral" element={<Referral />} />
                <Route path="security" element={<Security />} />
              </Route>

              {/* 404 */}
              <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
            </Routes>

            <CookieConsent />
            </Router>
          </AuthProvider>
        </ToastProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
