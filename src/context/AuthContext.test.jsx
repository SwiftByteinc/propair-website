import { render, screen, waitFor, act } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';

// Mock supabase
const mockGetSession = vi.fn();
const mockOnAuthStateChange = vi.fn();
const mockSignIn = vi.fn();
const mockSignUp = vi.fn();
const mockSignOut = vi.fn();
const mockSignInWithOAuth = vi.fn();
const mockUpdateUser = vi.fn();
const mockFrom = vi.fn();

vi.mock('../lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: (...args) => mockGetSession(...args),
      onAuthStateChange: (...args) => mockOnAuthStateChange(...args),
      signInWithPassword: (...args) => mockSignIn(...args),
      signUp: (...args) => mockSignUp(...args),
      signOut: (...args) => mockSignOut(...args),
      signInWithOAuth: (...args) => mockSignInWithOAuth(...args),
      updateUser: (...args) => mockUpdateUser(...args),
    },
    from: (...args) => mockFrom(...args),
  }
}));

// Test component that uses the hook
function TestConsumer() {
  const { user, loading, isPro } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (user) return <div>User: {user.email} | Pro: {isPro ? 'yes' : 'no'}</div>;
  return <div>No user</div>;
}

// Grabber component that exposes auth hook via callback ref
function Grabber({ onAuth }) {
  const auth = useAuth();
  onAuth(auth);
  return null;
}

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Default: no session
    mockGetSession.mockResolvedValue({ data: { session: null }, error: null });
    mockOnAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } }
    });
  });

  it('provides loading state initially then resolves', async () => {
    render(
      <AuthProvider><TestConsumer /></AuthProvider>
    );

    // Initially loading
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Then resolves to no user
    await waitFor(() => {
      expect(screen.getByText('No user')).toBeInTheDocument();
    });
  });

  it('provides user data when session exists', async () => {
    const mockUser = { id: '1', email: 'test@propair.ca' };
    mockGetSession.mockResolvedValue({
      data: { session: { user: mockUser } },
      error: null
    });

    // Mock profile fetch
    mockFrom.mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({
            data: { id: '1', full_name: 'Test User', user_role: 'entrepreneur' },
            error: null
          }),
          limit: vi.fn().mockResolvedValue({ data: [], error: null })
        })
      })
    });

    render(
      <AuthProvider><TestConsumer /></AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/User: test@propair.ca/)).toBeInTheDocument();
    });
  });

  it('exposes signIn function that calls supabase', async () => {
    mockSignIn.mockResolvedValue({ data: {}, error: null });

    const authRef = { current: null };

    render(
      <AuthProvider><Grabber onAuth={(auth) => { authRef.current = auth; }} /></AuthProvider>
    );

    await waitFor(() => expect(authRef.current.loading).toBe(false));

    await act(async () => {
      await authRef.current.signIn('test@test.com', 'password123');
    });

    expect(mockSignIn).toHaveBeenCalledWith({
      email: 'test@test.com',
      password: 'password123'
    });
  });

  it('exposes signOut function that clears state', async () => {
    mockSignOut.mockResolvedValue({ error: null });

    const authRef = { current: null };

    render(
      <AuthProvider><Grabber onAuth={(auth) => { authRef.current = auth; }} /></AuthProvider>
    );

    await waitFor(() => expect(authRef.current.loading).toBe(false));

    await act(async () => {
      await authRef.current.signOut();
    });

    expect(mockSignOut).toHaveBeenCalled();
  });

  it('handles getSession timeout gracefully', { timeout: 10000 }, async () => {
    // Simulate a very slow response that gets beaten by the 5s timeout in AuthContext
    mockGetSession.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ data: { session: null } }), 10000))
    );

    render(
      <AuthProvider><TestConsumer /></AuthProvider>
    );

    // Initially loading
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Should resolve via the 5s timeout fallback in AuthContext
    await waitFor(() => {
      expect(screen.getByText('No user')).toBeInTheDocument();
    }, { timeout: 7000 });
  });
});
