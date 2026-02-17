import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';

// Mock all lazy-loaded pages
vi.mock('./pages/Home', () => ({ default: () => <div>Home Page</div> }));
vi.mock('./pages/Pricing', () => ({ default: () => <div>Pricing Page</div> }));
vi.mock('./pages/About', () => ({ default: () => <div>About Page</div> }));
vi.mock('./pages/Login', () => ({ default: () => <div>Login Page</div> }));
vi.mock('./pages/ForgotPassword', () => ({ default: () => <div>ForgotPassword Page</div> }));
vi.mock('./pages/UpdatePassword', () => ({ default: () => <div>UpdatePassword Page</div> }));
vi.mock('./pages/Privacy', () => ({ default: () => <div>Privacy Page</div> }));
vi.mock('./pages/Terms', () => ({ default: () => <div>Terms Page</div> }));
vi.mock('./pages/Refund', () => ({ default: () => <div>Refund Page</div> }));
vi.mock('./pages/Contact', () => ({ default: () => <div>Contact Page</div> }));
vi.mock('./pages/Parrainage', () => ({ default: () => <div>Parrainage Page</div> }));
vi.mock('./pages/NotFound', () => ({ default: () => <div>NotFound Page</div> }));
vi.mock('./pages/dashboard/DashboardHome', () => ({ default: () => <div>DashboardHome Page</div> }));
vi.mock('./pages/dashboard/Billing', () => ({ default: () => <div>Billing Page</div> }));
vi.mock('./pages/dashboard/Referral', () => ({ default: () => <div>Referral Page</div> }));
vi.mock('./pages/dashboard/Security', () => ({ default: () => <div>Security Page</div> }));

// Mock DashboardLayout to just render outlet
vi.mock('./components/dashboard/DashboardLayout', () => ({
  default: () => <div>DashboardLayout</div>,
}));

// Mock layout components
vi.mock('./components/layout/Navbar', () => ({ default: () => <nav>Navbar</nav> }));
vi.mock('./components/layout/Footer', () => ({ default: () => <footer>Footer</footer> }));
vi.mock('./components/ErrorBoundary', () => ({ default: ({ children }) => <div>{children}</div> }));
vi.mock('./components/auth/ProtectedRoute', () => ({
  default: ({ children }) => <div>{children}</div>,
}));
vi.mock('./components/ui/CookieConsent', () => ({ default: () => null }));
vi.mock('./components/seo/StructuredData', () => ({ default: () => null }));
vi.mock('./hooks/useReferralCapture', () => ({ useReferralCapture: () => {} }));

// Mock AuthContext
vi.mock('./context/AuthContext', () => ({
  AuthProvider: ({ children }) => <div>{children}</div>,
  useAuth: () => ({ user: null }),
}));

// Mock ToastContext
vi.mock('./context/ToastContext', () => ({
  ToastProvider: ({ children }) => <div>{children}</div>,
}));

// We need to mock react-helmet-async at App level too
vi.mock('react-helmet-async', async () => {
  const actual = await vi.importActual('react-helmet-async');
  return {
    ...actual,
    Helmet: ({ children }) => <div data-testid="helmet">{children}</div>,
  };
});

import App from './App';

describe('App routing', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    expect(() =>
      render(
        <HelmetProvider>
          <App />
        </HelmetProvider>
      )
    ).not.toThrow();
  });

  it('renders Home page at root route', async () => {
    window.history.pushState({}, '', '/');
    render(
      <HelmetProvider>
        <App />
      </HelmetProvider>
    );
    expect(await screen.findByText('Home Page')).toBeInTheDocument();
  });

  it('renders Navbar on public pages', async () => {
    window.history.pushState({}, '', '/');
    render(
      <HelmetProvider>
        <App />
      </HelmetProvider>
    );
    expect(await screen.findByText('Navbar')).toBeInTheDocument();
  });

  it('renders Footer on public pages', async () => {
    window.history.pushState({}, '', '/');
    render(
      <HelmetProvider>
        <App />
      </HelmetProvider>
    );
    expect(await screen.findByText('Footer')).toBeInTheDocument();
  });

  it('renders Pricing page', async () => {
    window.history.pushState({}, '', '/pricing');
    render(
      <HelmetProvider>
        <App />
      </HelmetProvider>
    );
    expect(await screen.findByText('Pricing Page')).toBeInTheDocument();
  });

  it('renders About page', async () => {
    window.history.pushState({}, '', '/about');
    render(
      <HelmetProvider>
        <App />
      </HelmetProvider>
    );
    expect(await screen.findByText('About Page')).toBeInTheDocument();
  });

  it('renders Login page', async () => {
    window.history.pushState({}, '', '/login');
    render(
      <HelmetProvider>
        <App />
      </HelmetProvider>
    );
    expect(await screen.findByText('Login Page')).toBeInTheDocument();
  });

  it('renders Privacy page', async () => {
    window.history.pushState({}, '', '/privacy');
    render(
      <HelmetProvider>
        <App />
      </HelmetProvider>
    );
    expect(await screen.findByText('Privacy Page')).toBeInTheDocument();
  });

  it('renders Terms page', async () => {
    window.history.pushState({}, '', '/terms');
    render(
      <HelmetProvider>
        <App />
      </HelmetProvider>
    );
    expect(await screen.findByText('Terms Page')).toBeInTheDocument();
  });

  it('renders Refund page', async () => {
    window.history.pushState({}, '', '/refund');
    render(
      <HelmetProvider>
        <App />
      </HelmetProvider>
    );
    expect(await screen.findByText('Refund Page')).toBeInTheDocument();
  });

  it('renders Contact page', async () => {
    window.history.pushState({}, '', '/contact');
    render(
      <HelmetProvider>
        <App />
      </HelmetProvider>
    );
    expect(await screen.findByText('Contact Page')).toBeInTheDocument();
  });

  it('renders Parrainage page', async () => {
    window.history.pushState({}, '', '/parrainage');
    render(
      <HelmetProvider>
        <App />
      </HelmetProvider>
    );
    expect(await screen.findByText('Parrainage Page')).toBeInTheDocument();
  });

  it('renders NotFound for unknown routes', async () => {
    window.history.pushState({}, '', '/this-does-not-exist');
    render(
      <HelmetProvider>
        <App />
      </HelmetProvider>
    );
    expect(await screen.findByText('NotFound Page')).toBeInTheDocument();
  });

  it('renders ForgotPassword page', async () => {
    window.history.pushState({}, '', '/forgot-password');
    render(
      <HelmetProvider>
        <App />
      </HelmetProvider>
    );
    expect(await screen.findByText('ForgotPassword Page')).toBeInTheDocument();
  });

  it('renders UpdatePassword page', async () => {
    window.history.pushState({}, '', '/update-password');
    render(
      <HelmetProvider>
        <App />
      </HelmetProvider>
    );
    expect(await screen.findByText('UpdatePassword Page')).toBeInTheDocument();
  });

  it('auth pages do not show Navbar', async () => {
    window.history.pushState({}, '', '/login');
    render(
      <HelmetProvider>
        <App />
      </HelmetProvider>
    );
    await screen.findByText('Login Page');
    // Login uses AuthLayout which doesn't include Navbar
    // Navbar only appears in MainLayout routes
    expect(screen.queryAllByText('Navbar')).toHaveLength(0);
    expect(await screen.findByText('Login Page')).toBeInTheDocument();
  });
});
