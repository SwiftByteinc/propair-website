import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Terms from './Terms';
import { LanguageProvider } from '../context/LanguageContext';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

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

  it('renders transparency badge', () => {
    renderTerms();
    expect(screen.getByText('Conditions claires et transparentes')).toBeInTheDocument();
  });

  it('renders last updated date', () => {
    renderTerms();
    expect(screen.getByText(/Dernière mise à jour/)).toBeInTheDocument();
  });

  it('renders Nature du service section', () => {
    renderTerms();
    expect(screen.getByText('Nature du service et admissibilité')).toBeInTheDocument();
  });

  it('renders RBQ obligations section', () => {
    renderTerms();
    expect(screen.getByText('Obligations des entrepreneurs (RBQ)')).toBeInTheDocument();
  });

  it('mentions age requirement', () => {
    renderTerms();
    expect(screen.getByText(/18 ans/)).toBeInTheDocument();
  });

  it('mentions SwiftByte inc.', () => {
    renderTerms();
    expect(screen.getAllByText(/SwiftByte inc\./).length).toBeGreaterThanOrEqual(1);
  });

  it('renders Paiements subsection', () => {
    renderTerms();
    expect(screen.getByText('Paiements')).toBeInTheDocument();
  });

  it('mentions ProPair trademark', () => {
    renderTerms();
    expect(screen.getAllByText(/ProPair™/).length).toBeGreaterThanOrEqual(1);
  });

  it('renders numbered sections', () => {
    renderTerms();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('mentions Québec jurisdiction', () => {
    renderTerms();
    expect(screen.getAllByText(/Québec/).length).toBeGreaterThanOrEqual(1);
  });

  it('renders legal capacity requirement', () => {
    renderTerms();
    expect(screen.getByText(/capacité juridique/)).toBeInTheDocument();
  });

  it('renders all 6 sections', () => {
    renderTerms();
    const sectionNumbers = ['1', '2', '3', '4', '5', '6'];
    sectionNumbers.forEach((num) => {
      expect(screen.getByText(num)).toBeInTheDocument();
    });
  });
});
