import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Terms from './Terms';
import { LanguageProvider } from '../context/LanguageContext';

function renderTerms() {
  return render(
    <HelmetProvider>
      <LanguageProvider><MemoryRouter>
        <Terms />
      </MemoryRouter></LanguageProvider>
    </HelmetProvider>
  );
}

describe('Terms', () => {
  it('renders page heading', () => {
    renderTerms();
    expect(screen.getByText("Conditions d'utilisation")).toBeInTheDocument();
  });

  it('renders version info', () => {
    renderTerms();
    expect(screen.getByText(/Version 1\.0/)).toBeInTheDocument();
  });

  it('renders Nature du service section', () => {
    renderTerms();
    expect(screen.getByText('1. Nature du service et admissibilité')).toBeInTheDocument();
  });

  it('renders Comptes section', () => {
    renderTerms();
    expect(screen.getByText('2. Comptes utilisateur')).toBeInTheDocument();
  });

  it('renders Obligations section', () => {
    renderTerms();
    expect(screen.getByText('3. Obligations professionnelles des entrepreneurs')).toBeInTheDocument();
  });

  it('renders Accès section', () => {
    renderTerms();
    expect(screen.getByText('4. Accès aux fonctionnalités')).toBeInTheDocument();
  });

  it('renders Utilisation acceptable section', () => {
    renderTerms();
    expect(screen.getByText('5. Utilisation acceptable')).toBeInTheDocument();
  });

  it('renders Contenu section', () => {
    renderTerms();
    expect(screen.getByText('6. Contenu utilisateur')).toBeInTheDocument();
  });

  it('renders Messagerie section', () => {
    renderTerms();
    expect(screen.getByText('7. Messagerie')).toBeInTheDocument();
  });

  it('renders Documentation section', () => {
    renderTerms();
    expect(screen.getByText('8. Documentation des échanges')).toBeInTheDocument();
  });

  it('renders Propriété intellectuelle section', () => {
    renderTerms();
    expect(screen.getByText('9. Propriété intellectuelle')).toBeInTheDocument();
  });

  it('renders Limitation section', () => {
    renderTerms();
    expect(screen.getByText('10. Limitation de responsabilité')).toBeInTheDocument();
  });

  it('renders Indemnisation section', () => {
    renderTerms();
    expect(screen.getByText('11. Indemnisation')).toBeInTheDocument();
  });

  it('renders Suspension section', () => {
    renderTerms();
    expect(screen.getByText('12. Suspension et résiliation')).toBeInTheDocument();
  });

  it('renders Notifications section', () => {
    renderTerms();
    expect(screen.getByText('13. Notifications push')).toBeInTheDocument();
  });

  it('renders Force majeure section', () => {
    renderTerms();
    expect(screen.getByText('14. Force majeure')).toBeInTheDocument();
  });

  it('renders Modifications section', () => {
    renderTerms();
    expect(screen.getByText('15. Modifications')).toBeInTheDocument();
  });

  it('renders Droit applicable section', () => {
    renderTerms();
    expect(screen.getByText('16. Droit applicable et règlement des litiges')).toBeInTheDocument();
  });

  it('renders Divisibilité section', () => {
    renderTerms();
    expect(screen.getByText('17. Divisibilité')).toBeInTheDocument();
  });

  it('mentions age requirement', () => {
    renderTerms();
    expect(screen.getByText(/18 ans/)).toBeInTheDocument();
  });

  it('mentions SwiftByte inc.', () => {
    renderTerms();
    expect(screen.getAllByText(/SwiftByte inc\./).length).toBeGreaterThanOrEqual(1);
  });

  it('mentions ProPair trademark', () => {
    renderTerms();
    expect(screen.getAllByText(/ProPair™/).length).toBeGreaterThanOrEqual(1);
  });

  it('mentions Québec jurisdiction', () => {
    renderTerms();
    expect(screen.getAllByText(/Québec/).length).toBeGreaterThanOrEqual(1);
  });

  it('mentions 100$ CAD liability cap', () => {
    renderTerms();
    expect(screen.getByText(/100 \$ CAD/)).toBeInTheDocument();
  });

  it('has no navigation links', () => {
    renderTerms();
    const nav = document.querySelector('nav');
    expect(nav).toBeNull();
  });
});
