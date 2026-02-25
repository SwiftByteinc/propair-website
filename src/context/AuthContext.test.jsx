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

  it('exposes signUp function that calls supabase and syncs user_role', async () => {
    mockSignUp.mockResolvedValue({ data: { user: { id: '2' } }, error: null });
    const mockEq = vi.fn().mockResolvedValue({ error: null });
    const mockUpdate = vi.fn().mockReturnValue({ eq: mockEq });
    mockFrom.mockReturnValue({ update: mockUpdate });
    const authRef = { current: null };
    render(
      <AuthProvider><Grabber onAuth={(auth) => { authRef.current = auth; }} /></AuthProvider>
    );
    await waitFor(() => expect(authRef.current.loading).toBe(false));
    await act(async () => {
      await authRef.current.signUp('new@test.com', 'password123', 'Test Name');
    });
    expect(mockSignUp).toHaveBeenCalledWith({
      email: 'new@test.com',
      password: 'password123',
      options: { data: { full_name: 'Test Name', user_role: 'client' } },
    });
    // Verify immediate user_role sync after signup
    expect(mockFrom).toHaveBeenCalledWith('profiles');
    expect(mockUpdate).toHaveBeenCalledWith({ user_role: 'client' });
    expect(mockEq).toHaveBeenCalledWith('id', '2');
  });

  it('exposes signInWithOAuth function', async () => {
    mockSignInWithOAuth.mockResolvedValue({ data: {}, error: null });
    const authRef = { current: null };
    render(
      <AuthProvider><Grabber onAuth={(auth) => { authRef.current = auth; }} /></AuthProvider>
    );
    await waitFor(() => expect(authRef.current.loading).toBe(false));
    await act(async () => {
      await authRef.current.signInWithOAuth('google');
    });
    expect(mockSignInWithOAuth).toHaveBeenCalledWith({
      provider: 'google',
      options: { redirectTo: expect.stringContaining('/portal') },
    });
  });

  it('exposes refreshProfile function', async () => {
    const authRef = { current: null };
    render(
      <AuthProvider><Grabber onAuth={(auth) => { authRef.current = auth; }} /></AuthProvider>
    );
    await waitFor(() => expect(authRef.current.loading).toBe(false));
    expect(typeof authRef.current.refreshProfile).toBe('function');
  });

  it('provides isPro false by default (no session)', async () => {
    const authRef = { current: null };
    render(
      <AuthProvider><Grabber onAuth={(auth) => { authRef.current = auth; }} /></AuthProvider>
    );
    await waitFor(() => expect(authRef.current.loading).toBe(false));
    expect(authRef.current.isPro).toBe(false);
  });

  it('handles getSession error gracefully', async () => {
    mockGetSession.mockResolvedValue({ data: { session: null }, error: new Error('Network error') });
    render(
      <AuthProvider><TestConsumer /></AuthProvider>
    );
    await waitFor(() => {
      expect(screen.getByText('No user')).toBeInTheDocument();
    });
  });

  it('signIn returns error when credentials are wrong', async () => {
    mockSignIn.mockResolvedValue({ data: null, error: { message: 'Invalid login' } });
    const authRef = { current: null };
    render(
      <AuthProvider><Grabber onAuth={(auth) => { authRef.current = auth; }} /></AuthProvider>
    );
    await waitFor(() => expect(authRef.current.loading).toBe(false));
    let result;
    await act(async () => {
      result = await authRef.current.signIn('bad@test.com', 'wrong');
    });
    expect(result.error).toBeTruthy();
  });

  it('calls onAuthStateChange on mount', async () => {
    render(
      <AuthProvider><TestConsumer /></AuthProvider>
    );
    await waitFor(() => {
      expect(screen.getByText('No user')).toBeInTheDocument();
    });
    expect(mockOnAuthStateChange).toHaveBeenCalledTimes(1);
  });

  it('unsubscribes from auth changes on unmount', async () => {
    const unsubscribe = vi.fn();
    mockOnAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe } }
    });
    const { unmount } = render(
      <AuthProvider><TestConsumer /></AuthProvider>
    );
    await waitFor(() => {
      expect(screen.getByText('No user')).toBeInTheDocument();
    });
    unmount();
    expect(unsubscribe).toHaveBeenCalled();
  });

  it('provides profile data when session exists', async () => {
    const mockUser = { id: '1', email: 'test@propair.ca' };
    mockGetSession.mockResolvedValue({
      data: { session: { user: mockUser } },
      error: null
    });
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
    const authRef = { current: null };
    render(
      <AuthProvider><Grabber onAuth={(auth) => { authRef.current = auth; }} /></AuthProvider>
    );
    await waitFor(() => expect(authRef.current.loading).toBe(false));
    expect(authRef.current.user).toBeTruthy();
  });
});
