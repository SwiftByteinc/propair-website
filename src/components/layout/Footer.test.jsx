import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from './Footer';

function renderFooter() {
  return render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );
}

describe('Footer', () => {
  it('displays current year in copyright', () => {
    renderFooter();

    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`${year}`))).toBeInTheDocument();
  });

  it('displays company info', () => {
    renderFooter();

    expect(screen.getByText(/SwiftByte inc/i)).toBeInTheDocument();
    expect(screen.getByText('Magog, Québec')).toBeInTheDocument();
  });

  it('renders product section links', () => {
    renderFooter();

    expect(screen.getByText('Abonnements Pro')).toBeInTheDocument();
    expect(screen.getByText('Notre Histoire')).toBeInTheDocument();
    expect(screen.getByText('FAQ')).toBeInTheDocument();
  });

  it('renders company section links', () => {
    renderFooter();

    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Connexion')).toBeInTheDocument();
  });

  it('renders legal links', () => {
    renderFooter();

    expect(screen.getByText('Confidentialité')).toBeInTheDocument();
    expect(screen.getByText("Conditions d'utilisation")).toBeInTheDocument();
    expect(screen.getByText('Remboursement')).toBeInTheDocument();
  });

  it('renders app store download links', () => {
    renderFooter();

    expect(screen.getByText('App Store')).toBeInTheDocument();
    expect(screen.getByText('Google Play')).toBeInTheDocument();

    const appStoreLink = screen.getByText('App Store').closest('a');
    const playLink = screen.getByText('Google Play').closest('a');

    expect(appStoreLink).toHaveAttribute('href', 'https://apps.apple.com/app/propair');
    expect(playLink).toHaveAttribute('href', 'https://play.google.com/store/apps/details?id=com.propair');
    expect(appStoreLink).toHaveAttribute('target', '_blank');
    expect(playLink).toHaveAttribute('target', '_blank');
  });

  it('renders section headings', () => {
    renderFooter();

    expect(screen.getByText('Produit')).toBeInTheDocument();
    expect(screen.getByText('Entreprise')).toBeInTheDocument();
    expect(screen.getByText("Télécharger l'app")).toBeInTheDocument();
  });

  it('renders logo image', () => {
    renderFooter();

    const logo = screen.getByAltText('ProPair');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/images/logo_ProPair.jpg');
  });

  it('Confidentialité link points to /privacy', () => {
    renderFooter();
    const link = screen.getByText('Confidentialité').closest('a');
    expect(link).toHaveAttribute('href', '/privacy');
  });

  it('Conditions d\'utilisation link points to /terms', () => {
    renderFooter();
    const link = screen.getByText("Conditions d'utilisation").closest('a');
    expect(link).toHaveAttribute('href', '/terms');
  });

  it('Remboursement link points to /refund', () => {
    renderFooter();
    const link = screen.getByText('Remboursement').closest('a');
    expect(link).toHaveAttribute('href', '/refund');
  });

  it('Connexion link points to /login', () => {
    renderFooter();
    const link = screen.getByText('Connexion').closest('a');
    expect(link).toHaveAttribute('href', '/login');
  });

  it('FAQ link points to pricing page', () => {
    renderFooter();
    const link = screen.getByText('FAQ').closest('a');
    expect(link.getAttribute('href')).toContain('pricing');
  });

  it('app store links open in new tab with noopener', () => {
    renderFooter();
    const appStoreLink = screen.getByText('App Store').closest('a');
    const playLink = screen.getByText('Google Play').closest('a');
    expect(appStoreLink).toHaveAttribute('rel', expect.stringContaining('noopener'));
    expect(playLink).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });

  it('renders footer element', () => {
    renderFooter();
    const footer = document.querySelector('footer');
    expect(footer).toBeInTheDocument();
  });
});
