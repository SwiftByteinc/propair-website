import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const Pricing = lazy(() => import('./pages/Pricing'));
const About = lazy(() => import('./pages/About'));
const Login = lazy(() => import('./pages/Login'));
const UpdatePassword = lazy(() => import('./pages/UpdatePassword'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const Refund = lazy(() => import('./pages/Refund'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Dashboard components (lazy loaded)
const DashboardLayout = lazy(() => import('./components/dashboard/DashboardLayout'));
const DashboardHome = lazy(() => import('./pages/dashboard/DashboardHome'));
const Billing = lazy(() => import('./pages/dashboard/Billing'));
const Referral = lazy(() => import('./pages/dashboard/Referral'));
const Security = lazy(() => import('./pages/dashboard/Security'));

// Page loader component
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-3 border-teal/20 border-t-teal rounded-full animate-spin" />
        <span className="text-sm text-muted">Chargement...</span>
      </div>
    </div>
  );
}

// ScrollToTop component to handle scroll position on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Layout wrapper for pages with Navbar and Footer
function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-body">
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<PageLoader />}>
          {children}
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

// Standalone layout for auth pages (no navbar/footer)
function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-white font-sans text-body">
      <Suspense fallback={<PageLoader />}>
        {children}
      </Suspense>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Public pages with Navbar and Footer */}
            <Route path="/" element={<MainLayout><Home /></MainLayout>} />
            <Route path="/pricing" element={<MainLayout><Pricing /></MainLayout>} />
            <Route path="/about" element={<MainLayout><About /></MainLayout>} />

            {/* Legal pages */}
            <Route path="/privacy" element={<MainLayout><Privacy /></MainLayout>} />
            <Route path="/terms" element={<MainLayout><Terms /></MainLayout>} />
            <Route path="/refund" element={<MainLayout><Refund /></MainLayout>} />

            {/* Auth pages (standalone, no navbar/footer) */}
            <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
            <Route path="/forgot-password" element={<AuthLayout><ForgotPassword /></AuthLayout>} />
            <Route path="/update-password" element={<AuthLayout><UpdatePassword /></AuthLayout>} />

            {/* Portal - Dashboard with nested routes */}
            <Route path="/portal" element={
              <Suspense fallback={<PageLoader />}>
                <DashboardLayout />
              </Suspense>
            }>
              <Route index element={<DashboardHome />} />
              <Route path="billing" element={<Billing />} />
              <Route path="referral" element={<Referral />} />
              <Route path="security" element={<Security />} />
            </Route>

            {/* 404 - Page Not Found */}
            <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
          </Routes>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
