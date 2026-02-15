import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from './Sidebar';

// Mock lucide icons to simple spans
vi.mock('lucide-react', () => ({
  Home: () => <span>HomeIcon</span>,
  CreditCard: () => <span>CreditCardIcon</span>,
  Gift: () => <span>GiftIcon</span>,
  Shield: () => <span>ShieldIcon</span>,
  LogOut: () => <span>LogOutIcon</span>,
  ChevronLeft: () => <span>ChevronLeftIcon</span>,
  Crown: () => <span>CrownIcon</span>,
  Zap: () => <span>ZapIcon</span>,
  X: () => <span>XIcon</span>,
}));

const entrepreneurUser = {
  id: '1',
  full_name: 'Nicolas Dupont',
  email: 'nicolas@test.com',
  role: 'entrepreneur',
  isPro: true,
};

const clientUser = {
  id: '2',
  full_name: 'Marie Client',
  email: 'marie@test.com',
  role: 'client',
  isPro: false,
};

function renderSidebar(user = entrepreneurUser, props = {}) {
  const defaultProps = {
    user,
    onSignOut: vi.fn(),
    isOpen: false,
    onClose: vi.fn(),
    ...props,
  };

  return render(
    <MemoryRouter initialEntries={['/portal']}>
      <Sidebar {...defaultProps} />
    </MemoryRouter>
  );
}

describe('Sidebar', () => {
  it('displays user name and email', () => {
    renderSidebar();

    expect(screen.getByText('Nicolas Dupont')).toBeInTheDocument();
    expect(screen.getByText('nicolas@test.com')).toBeInTheDocument();
  });

  it('displays user initial as avatar', () => {
    renderSidebar();

    expect(screen.getByText('N')).toBeInTheDocument();
  });

  it('shows Pro badge for Pro users', () => {
    renderSidebar(entrepreneurUser);

    expect(screen.getByText('Pro')).toBeInTheDocument();
  });

  it('shows Essai badge for non-Pro users', () => {
    renderSidebar(clientUser);

    expect(screen.getByText('Essai')).toBeInTheDocument();
  });

  it('renders entrepreneur navigation links', () => {
    renderSidebar(entrepreneurUser);

    expect(screen.getByText('Accueil')).toBeInTheDocument();
    expect(screen.getByText('Abonnement & Factures')).toBeInTheDocument();
    expect(screen.getByText('Parrainage')).toBeInTheDocument();
    expect(screen.getByText('Sécurité')).toBeInTheDocument();
  });

  it('renders client navigation links', () => {
    renderSidebar(clientUser);

    expect(screen.getByText('Accueil')).toBeInTheDocument();
    expect(screen.getByText('Abonnement')).toBeInTheDocument();
    expect(screen.getByText('Parrainage')).toBeInTheDocument();
    expect(screen.getByText('Sécurité')).toBeInTheDocument();
  });

  it('shows Déconnexion button', () => {
    renderSidebar();

    expect(screen.getByText('Déconnexion')).toBeInTheDocument();
  });

  it('calls onSignOut when sign out is clicked', () => {
    const onSignOut = vi.fn();
    renderSidebar(entrepreneurUser, { onSignOut });

    fireEvent.click(screen.getByText('Déconnexion'));
    expect(onSignOut).toHaveBeenCalledTimes(1);
  });

  it('shows mobile close button', () => {
    renderSidebar(entrepreneurUser, { isOpen: true });

    const closeBtn = screen.getByRole('button', { name: /fermer le menu/i });
    expect(closeBtn).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    renderSidebar(entrepreneurUser, { isOpen: true, onClose });

    fireEvent.click(screen.getByRole('button', { name: /fermer le menu/i }));
    expect(onClose).toHaveBeenCalled();
  });

  it('shows mobile backdrop when open', () => {
    renderSidebar(entrepreneurUser, { isOpen: true });

    const backdrop = document.querySelector('[aria-hidden="true"]');
    expect(backdrop).toBeInTheDocument();
  });

  it('renders logo image', () => {
    renderSidebar();

    const logo = screen.getByAltText('ProPair');
    expect(logo).toHaveAttribute('src', '/images/logo_ProPair.jpg');
  });
});
