import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Privacy from './Privacy';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

function renderPrivacy() {
  return render(
    <HelmetProvider>
      <MemoryRouter>
        <Privacy />
      </MemoryRouter>
    </HelmetProvider>
  );
}

describe('Privacy', () => {
  it('renders page heading', () => {
    renderPrivacy();
    expect(screen.getByText('Politique de confidentialité')).toBeInTheDocument();
  });

  it('renders Loi 25 badge', () => {
    renderPrivacy();
    expect(screen.getByText('Loi 25 / RGPD conforme')).toBeInTheDocument();
  });

  it('renders last updated date', () => {
    renderPrivacy();
    expect(screen.getByText(/Dernière mise à jour/)).toBeInTheDocument();
  });

  it('renders Introduction section', () => {
    renderPrivacy();
    expect(screen.getByText('Introduction')).toBeInTheDocument();
  });

  it('renders Responsable section', () => {
    renderPrivacy();
    expect(screen.getByText('Responsable de la protection des renseignements personnels')).toBeInTheDocument();
  });

  it('renders Renseignements collectés section', () => {
    renderPrivacy();
    expect(screen.getByText('Renseignements collectés')).toBeInTheDocument();
  });

  it('renders Finalités et consentement section', () => {
    renderPrivacy();
    expect(screen.getByText('Finalités et consentement')).toBeInTheDocument();
  });

  it('renders Communication et transferts section', () => {
    renderPrivacy();
    expect(screen.getByText('Communication et transferts')).toBeInTheDocument();
  });

  it('renders Conservation et sécurité section', () => {
    renderPrivacy();
    expect(screen.getByText('Conservation et sécurité')).toBeInTheDocument();
  });

  it('renders Vos droits section', () => {
    renderPrivacy();
    expect(screen.getByText(/Vos droits/)).toBeInTheDocument();
  });

  it('mentions SwiftByte inc.', () => {
    renderPrivacy();
    expect(screen.getAllByText(/SwiftByte inc\./).length).toBeGreaterThanOrEqual(1);
  });

  it('renders privacy email links', () => {
    renderPrivacy();
    const links = screen.getAllByText('privacy@propairapp.com');
    expect(links.length).toBeGreaterThanOrEqual(1);
  });

  it('mentions Loi 25 in content', () => {
    renderPrivacy();
    expect(screen.getAllByText(/Loi 25/).length).toBeGreaterThanOrEqual(1);
  });

  it('renders encryption details', () => {
    renderPrivacy();
    expect(screen.getByText(/TLS 1\.3/)).toBeInTheDocument();
  });

  it('states no data selling policy', () => {
    renderPrivacy();
    expect(screen.getByText(/Aucune vente/)).toBeInTheDocument();
  });
});
