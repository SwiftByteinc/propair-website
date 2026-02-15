import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    header: ({ children, ...props }) => <header {...props}>{children}</header>,
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    span: ({ children, animate, ...props }) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }) => children,
}));

// Mock AuthContext
const mockUseAuth = vi.fn();
vi.mock('../../context/AuthContext', () => ({
  useAuth: () => mockUseAuth(),
}));

function renderNavbar(route = '/') {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Navbar />
    </MemoryRouter>
  );
}

describe('Navbar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAuth.mockReturnValue({ user: null, profile: null });
  });

  it('renders all navigation links', () => {
    renderNavbar();

    expect(screen.getAllByText('Accueil').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Notre Histoire').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Abonnements Pro').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Parrainage').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Contact').length).toBeGreaterThanOrEqual(1);
  });

  it('shows login button when not authenticated', () => {
    renderNavbar();

    expect(screen.getByText('Se connecter')).toBeInTheDocument();
  });

  it('shows user portal link when authenticated', () => {
    mockUseAuth.mockReturnValue({
      user: { id: '1', email: 'test@test.com' },
      profile: { full_name: 'Nicolas Dupont' },
    });

    renderNavbar();

    expect(screen.getByText('Nicolas')).toBeInTheDocument();
  });

  it('displays user initial in avatar when authenticated', () => {
    mockUseAuth.mockReturnValue({
      user: { id: '1', email: 'test@test.com' },
      profile: { full_name: 'Marie Tremblay' },
    });

    renderNavbar();

    expect(screen.getByText('M')).toBeInTheDocument();
  });

  it('has skip to content link for accessibility', () => {
    renderNavbar();

    const skipLink = screen.getByText('Aller au contenu principal');
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  it('toggles mobile menu on hamburger click', () => {
    renderNavbar();

    const menuButton = screen.getByRole('button', { name: /ouvrir le menu/i });
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('has correct aria-current on active link', () => {
    renderNavbar('/about');

    // Desktop links
    const aboutLinks = screen.getAllByText('Notre Histoire');
    const hasAriaCurrent = aboutLinks.some(link => link.getAttribute('aria-current') === 'page');
    expect(hasAriaCurrent).toBe(true);
  });

  it('renders logo with correct alt text', () => {
    renderNavbar();

    const logoLink = screen.getByRole('link', { name: /retour à l'accueil/i });
    expect(logoLink).toBeInTheDocument();
  });
});
