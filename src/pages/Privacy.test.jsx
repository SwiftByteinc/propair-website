import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Privacy from './Privacy';
import { LanguageProvider } from '../context/LanguageContext';

function renderPrivacy() {
  return render(
    <HelmetProvider>
      <LanguageProvider><MemoryRouter>
        <Privacy />
      </MemoryRouter></LanguageProvider>
    </HelmetProvider>
  );
}

describe('Privacy', () => {
  it('renders page heading', () => {
    renderPrivacy();
    expect(screen.getByText('Politique de confidentialité')).toBeInTheDocument();
  });

  it('renders version info', () => {
    renderPrivacy();
    expect(screen.getByText(/Version 1\.0/)).toBeInTheDocument();
  });

  it('renders Introduction section', () => {
    renderPrivacy();
    expect(screen.getByText('1. Introduction')).toBeInTheDocument();
  });

  it('renders Responsable section', () => {
    renderPrivacy();
    expect(screen.getByText('2. Responsable de la protection des renseignements personnels')).toBeInTheDocument();
  });

  it('renders Renseignements section', () => {
    renderPrivacy();
    expect(screen.getByText('3. Renseignements que nous recueillons')).toBeInTheDocument();
  });

  it('renders Finalités section', () => {
    renderPrivacy();
    expect(screen.getByText('4. Finalités du traitement')).toBeInTheDocument();
  });

  it('renders Partage section', () => {
    renderPrivacy();
    expect(screen.getByText('5. Partage de vos renseignements')).toBeInTheDocument();
  });

  it('renders Conservation section', () => {
    renderPrivacy();
    expect(screen.getByText('6. Conservation des données')).toBeInTheDocument();
  });

  it('renders Sécurité section', () => {
    renderPrivacy();
    expect(screen.getByText('7. Sécurité et incidents')).toBeInTheDocument();
  });

  it('renders Droits section', () => {
    renderPrivacy();
    expect(screen.getByText('8. Vos droits')).toBeInTheDocument();
  });

  it('renders Mineurs section', () => {
    renderPrivacy();
    expect(screen.getByText('9. Mineurs')).toBeInTheDocument();
  });

  it('renders Autorisations section', () => {
    renderPrivacy();
    expect(screen.getByText("10. Autorisations de l'appareil")).toBeInTheDocument();
  });

  it('renders Transferts section', () => {
    renderPrivacy();
    expect(screen.getByText('11. Transferts internationaux')).toBeInTheDocument();
  });

  it('renders Modifications section', () => {
    renderPrivacy();
    expect(screen.getByText('12. Modifications')).toBeInTheDocument();
  });

  it('renders Contact section', () => {
    renderPrivacy();
    expect(screen.getByText('13. Contact et recours')).toBeInTheDocument();
  });

  it('mentions SwiftByte inc.', () => {
    renderPrivacy();
    expect(screen.getAllByText(/SwiftByte inc\./).length).toBeGreaterThanOrEqual(1);
  });

  it('renders privacy email', () => {
    renderPrivacy();
    expect(screen.getAllByText(/privacy@propairapp\.com/).length).toBeGreaterThanOrEqual(1);
  });

  it('mentions Loi 25', () => {
    renderPrivacy();
    expect(screen.getAllByText(/Loi 25/).length).toBeGreaterThanOrEqual(1);
  });

  it('mentions encryption', () => {
    renderPrivacy();
    expect(screen.getByText(/TLS 1\.3/)).toBeInTheDocument();
  });

  it('states no data selling', () => {
    renderPrivacy();
    expect(screen.getByText(/ne vendons jamais/)).toBeInTheDocument();
  });

  it('mentions 30 day deletion delay', () => {
    renderPrivacy();
    expect(screen.getAllByText(/30 jours/).length).toBeGreaterThanOrEqual(1);
  });

  it('has no navigation links', () => {
    renderPrivacy();
    const nav = document.querySelector('nav');
    expect(nav).toBeNull();
  });
});
