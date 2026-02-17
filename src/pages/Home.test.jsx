import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Home from './Home';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    section: ({ children, ...props }) => <section {...props}>{children}</section>,
  },
}));

function renderHome() {
  return render(
    <HelmetProvider>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </HelmetProvider>
  );
}

describe('Home', () => {
  it('renders hero heading', () => {
    renderHome();
    expect(screen.getByText(/Connectez\./)).toBeInTheDocument();
    expect(screen.getByText(/Collaborez\./)).toBeInTheDocument();
  });

  it('renders hero subtitle', () => {
    renderHome();
    expect(screen.getByText(/La plateforme qui remplace les appels/)).toBeInTheDocument();
  });

  it('renders value proposition badges', () => {
    renderHome();
    expect(screen.getByText('0% de commission')).toBeInTheDocument();
    expect(screen.getByText('Outils de gestion inclus')).toBeInTheDocument();
    expect(screen.getByText('Chat intégré')).toBeInTheDocument();
  });

  it('renders CTA buttons', () => {
    renderHome();
    expect(screen.getByText("Télécharger l'app")).toBeInTheDocument();
    expect(screen.getByText('Espace Pro')).toBeInTheDocument();
  });

  it('renders Espace Pro link to /pricing', () => {
    renderHome();
    const link = screen.getByText('Espace Pro').closest('a');
    expect(link).toHaveAttribute('href', '/pricing');
  });

  it('renders Pour les Clients card', () => {
    renderHome();
    expect(screen.getByText('Pour les Clients')).toBeInTheDocument();
    expect(screen.getByText('Liberté totale de contact')).toBeInTheDocument();
  });

  it('renders Pour les Pros card with Premium badge', () => {
    renderHome();
    expect(screen.getByText('Pour les Pros')).toBeInTheDocument();
    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('renders 3 steps', () => {
    renderHome();
    expect(screen.getByText('1. Contactez ou Publiez')).toBeInTheDocument();
    expect(screen.getByText('2. Discussion & Entente')).toBeInTheDocument();
    expect(screen.getByText('3. Gestion Simplifiée')).toBeInTheDocument();
  });

  it('renders section heading', () => {
    renderHome();
    expect(screen.getByText('Pensé pour les deux côtés du chantier')).toBeInTheDocument();
    expect(screen.getByText('De la demande au chantier')).toBeInTheDocument();
  });

  it('renders download section', () => {
    renderHome();
    expect(screen.getByText('Téléchargez ProPair')).toBeInTheDocument();
    expect(screen.getByText('App Store')).toBeInTheDocument();
    expect(screen.getByText('Google Play')).toBeInTheDocument();
  });

  it('renders App Store link with correct href', () => {
    renderHome();
    const link = screen.getByText('App Store').closest('a');
    expect(link).toHaveAttribute('href', 'https://apps.apple.com/app/propair');
  });

  it('renders Google Play link with correct href', () => {
    renderHome();
    const link = screen.getByText('Google Play').closest('a');
    expect(link).toHaveAttribute('href', 'https://play.google.com/store/apps/details?id=com.propair');
  });

  it('renders local badge', () => {
    renderHome();
    expect(screen.getByText('La référence locale à Magog')).toBeInTheDocument();
  });

  it('renders client card heading', () => {
    renderHome();
    expect(screen.getByText('Pour les Clients')).toBeInTheDocument();
  });

  it('renders client card benefits', () => {
    renderHome();
    expect(screen.getByText('Chat direct avec les artisans')).toBeInTheDocument();
  });

  it('renders pro card features', () => {
    renderHome();
    expect(screen.getByText('Notifications ciblées, zéro bruit')).toBeInTheDocument();
  });

  it('download section links open in new tab', () => {
    renderHome();
    const appStoreLink = screen.getByText('App Store').closest('a');
    expect(appStoreLink).toHaveAttribute('target', '_blank');
  });

  it('renders step descriptions', () => {
    renderHome();
    expect(screen.getByText(/Trouvez un pro et contactez-le/)).toBeInTheDocument();
  });
});
