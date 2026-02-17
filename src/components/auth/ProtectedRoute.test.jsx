import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

const mockUseAuth = vi.hoisted(() => vi.fn());
vi.mock('../../context/AuthContext', () => ({
  useAuth: () => mockUseAuth(),
}));

vi.mock('../../lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
      onAuthStateChange: vi.fn().mockReturnValue({ data: { subscription: { unsubscribe: vi.fn() } } }),
    },
  },
}));

import ProtectedRoute from './ProtectedRoute';

function renderProtected(authValue) {
  mockUseAuth.mockReturnValue(authValue);
  return render(
    <MemoryRouter initialEntries={['/protected']}>
      <Routes>
        <Route
          path="/protected"
          element={
            <ProtectedRoute>
              <div>Secret Content</div>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<div>Login Page</div>} />
      </Routes>
    </MemoryRouter>
  );
}

describe('ProtectedRoute', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('shows loader when auth is loading', () => {
    renderProtected({ user: null, loading: true });
    expect(screen.getByText('Vérification...')).toBeInTheDocument();
    expect(screen.queryByText('Secret Content')).not.toBeInTheDocument();
  });

  it('renders children when user is authenticated', () => {
    renderProtected({ user: { id: '1', email: 'test@test.com' }, loading: false });
    expect(screen.getByText('Secret Content')).toBeInTheDocument();
  });

  it('does not render children while loading', () => {
    renderProtected({ user: null, loading: true });
    expect(screen.queryByText('Secret Content')).not.toBeInTheDocument();
  });

  it('shows spinner animation while loading', () => {
    const { container } = renderProtected({ user: null, loading: true });
    expect(container.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('redirects to login when user is null and not loading', () => {
    renderProtected({ user: null, loading: false });
    expect(screen.queryByText('Secret Content')).not.toBeInTheDocument();
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  it('does not show loader after auth resolves', () => {
    renderProtected({ user: { id: '1', email: 'a@b.com' }, loading: false });
    expect(screen.queryByText('Vérification...')).not.toBeInTheDocument();
  });

  it('loader has centered layout', () => {
    const { container } = renderProtected({ user: null, loading: true });
    expect(container.querySelector('.min-h-screen')).toBeInTheDocument();
  });

  it('does not show login page when authenticated', () => {
    renderProtected({ user: { id: '1', email: 'a@b.com' }, loading: false });
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
  });

  it('does not show login page when loading', () => {
    renderProtected({ user: null, loading: true });
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
  });
});
