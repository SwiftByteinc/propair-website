import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// Mock AuthContext
const mockUseAuth = vi.fn();
vi.mock('../../context/AuthContext', () => ({
  useAuth: () => mockUseAuth()
}));

function renderWithRouter(ui) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe('ProtectedRoute', () => {
  it('shows loader when auth is loading', () => {
    mockUseAuth.mockReturnValue({ user: null, loading: true });

    renderWithRouter(
      <ProtectedRoute><div>Secret</div></ProtectedRoute>
    );

    expect(screen.getByText('Vérification...')).toBeInTheDocument();
    expect(screen.queryByText('Secret')).not.toBeInTheDocument();
  });

  it('renders children when user is authenticated', () => {
    mockUseAuth.mockReturnValue({ user: { id: '1', email: 'test@test.com' }, loading: false });

    renderWithRouter(
      <ProtectedRoute><div>Secret Content</div></ProtectedRoute>
    );

    expect(screen.getByText('Secret Content')).toBeInTheDocument();
  });
});
