import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }) => children,
}));

// Mock react-helmet-async
vi.mock('react-helmet-async', () => ({
  Helmet: ({ children }) => <>{children}</>,
  HelmetProvider: ({ children }) => <>{children}</>,
}));

// Mock AuthContext
const mockUseAuth = vi.fn();
vi.mock('../../context/AuthContext', () => ({
  useAuth: () => mockUseAuth(),
}));

// Mock Sidebar
vi.mock('./Sidebar', () => ({
  default: ({ user }) => <div data-testid="sidebar">Sidebar for {user?.full_name}</div>,
}));

// Mock react-router-dom Outlet
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Outlet: () => <div data-testid="outlet">Dashboard Content</div>,
  };
});

function renderDashboard() {
  return render(
    <MemoryRouter>
      <DashboardLayout />
    </MemoryRouter>
  );
}

describe('DashboardLayout', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('shows skeleton while loading', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      profile: null,
      subscription: null,
      loading: true,
      profileLoading: false,
      isPro: false,
      signOut: vi.fn(),
    });

    renderDashboard();

    // Skeleton has animate-pulse elements
    const skeletonElements = document.querySelectorAll('.animate-pulse');
    expect(skeletonElements.length).toBeGreaterThan(0);
  });

  it('shows skeleton while profile is loading', () => {
    mockUseAuth.mockReturnValue({
      user: { id: '1', email: 'test@test.com' },
      profile: null,
      subscription: null,
      loading: false,
      profileLoading: true,
      isPro: false,
      signOut: vi.fn(),
    });

    renderDashboard();

    const skeletonElements = document.querySelectorAll('.animate-pulse');
    expect(skeletonElements.length).toBeGreaterThan(0);
  });

  it('returns null when not authenticated after loading', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      profile: null,
      subscription: null,
      loading: false,
      profileLoading: false,
      isPro: false,
      signOut: vi.fn(),
    });

    const { container } = renderDashboard();

    expect(container.firstChild).toBeNull();
  });

  it('renders sidebar and outlet when authenticated', () => {
    mockUseAuth.mockReturnValue({
      user: {
        id: '1',
        email: 'test@test.com',
        user_metadata: { full_name: 'Jean Test' },
        email_confirmed_at: '2026-01-01',
      },
      profile: {
        full_name: 'Jean Test',
        user_role: 'entrepreneur',
        referral_code: 'JEAN123',
        pro_months_balance: 2,
        is_verified: true,
        trial_connections_count: 3,
      },
      subscription: { status: 'active', current_period_end: 1740000000 },
      loading: false,
      profileLoading: false,
      isPro: true,
      signOut: vi.fn(),
    });

    renderDashboard();

    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('outlet')).toBeInTheDocument();
    expect(screen.getByText('Sidebar for Jean Test')).toBeInTheDocument();
  });

  it('passes correct userData to sidebar with memoized values', () => {
    mockUseAuth.mockReturnValue({
      user: {
        id: 'user-abc',
        email: 'jean@test.com',
        user_metadata: { full_name: 'Jean Pro' },
        email_confirmed_at: '2026-01-15',
      },
      profile: {
        full_name: 'Jean Pro',
        user_role: 'entrepreneur',
        referral_code: 'JEANPRO',
        pro_months_balance: 4,
        is_verified: true,
        trial_connections_count: 5,
      },
      subscription: { status: 'active', current_period_end: 1740000000 },
      loading: false,
      profileLoading: false,
      isPro: true,
      signOut: vi.fn(),
    });

    renderDashboard();

    expect(screen.getByText('Sidebar for Jean Pro')).toBeInTheDocument();
  });
});
