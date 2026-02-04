import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Login from './pages/Login';
import UpdatePassword from './pages/UpdatePassword';
import ForgotPassword from './pages/ForgotPassword';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Refund from './pages/Refund';
import NotFound from './pages/NotFound';

// Dashboard components
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardHome from './pages/dashboard/DashboardHome';
import Billing from './pages/dashboard/Billing';
import Referral from './pages/dashboard/Referral';
import Security from './pages/dashboard/Security';

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
        {children}
      </main>
      <Footer />
    </div>
  );
}

// Standalone layout for auth pages (no navbar/footer)
function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-white font-sans text-body">
      {children}
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
            <Route path="/portal" element={<DashboardLayout />}>
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
