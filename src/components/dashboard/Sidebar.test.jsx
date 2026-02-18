import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from './Sidebar';
import { LanguageProvider } from '../../context/LanguageContext';

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
    <LanguageProvider><MemoryRouter initialEntries={['/portal']}>
      <Sidebar {...defaultProps} />
    </MemoryRouter></LanguageProvider>
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

  it('Accueil link points to /portal', () => {
    renderSidebar();
    const link = screen.getByText('Accueil').closest('a');
    expect(link).toHaveAttribute('href', '/portal');
  });

  it('Sécurité link points to /portal/security', () => {
    renderSidebar();
    const link = screen.getByText('Sécurité').closest('a');
    expect(link).toHaveAttribute('href', '/portal/security');
  });

  it('Parrainage link points to /portal/referral', () => {
    renderSidebar();
    const link = screen.getByText('Parrainage').closest('a');
    expect(link).toHaveAttribute('href', '/portal/referral');
  });

  it('client does not show "Abonnement & Factures"', () => {
    renderSidebar(clientUser);
    expect(screen.queryByText('Abonnement & Factures')).not.toBeInTheDocument();
  });

  it('shows fallback initial "U" when no name', () => {
    renderSidebar({ ...entrepreneurUser, full_name: '' });
    expect(screen.getByText('U')).toBeInTheDocument();
  });

  it('shows "Utilisateur" when full_name is null', () => {
    renderSidebar({ ...entrepreneurUser, full_name: null });
    expect(screen.getByText('Utilisateur')).toBeInTheDocument();
  });

  it('does not show backdrop when closed', () => {
    renderSidebar(entrepreneurUser, { isOpen: false });
    const backdrop = document.querySelector('[aria-hidden="true"]');
    expect(backdrop).not.toBeInTheDocument();
  });

  it('clicking backdrop calls onClose', () => {
    const onClose = vi.fn();
    renderSidebar(entrepreneurUser, { isOpen: true, onClose });
    const backdrop = document.querySelector('[aria-hidden="true"]');
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalled();
  });

  it('renders nav element', () => {
    renderSidebar();
    const nav = document.querySelector('nav');
    expect(nav).toBeInTheDocument();
  });

  it('renders aside element', () => {
    renderSidebar();
    const aside = document.querySelector('aside');
    expect(aside).toBeInTheDocument();
  });

  it('entrepreneur billing link points to /portal/billing', () => {
    renderSidebar(entrepreneurUser);
    const link = screen.getByText('Abonnement & Factures').closest('a');
    expect(link).toHaveAttribute('href', '/portal/billing');
  });

  it('client billing link points to /portal/billing', () => {
    renderSidebar(clientUser);
    const link = screen.getByText('Abonnement').closest('a');
    expect(link).toHaveAttribute('href', '/portal/billing');
  });

  it('shows M initial for Marie', () => {
    renderSidebar(clientUser);
    expect(screen.getByText('M')).toBeInTheDocument();
  });

  it('displays client email', () => {
    renderSidebar(clientUser);
    expect(screen.getByText('marie@test.com')).toBeInTheDocument();
  });
});
