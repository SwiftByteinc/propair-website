import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Refund from './Refund';
import { LanguageProvider } from '../context/LanguageContext';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

function renderRefund() {
  return render(
    <HelmetProvider>
      <LanguageProvider><MemoryRouter>
        <Refund />
      </MemoryRouter></LanguageProvider>
    </HelmetProvider>
  );
}

describe('Refund', () => {
  it('renders page heading', () => {
    renderRefund();
    expect(screen.getByText('Politique de remboursement')).toBeInTheDocument();
  });

  it('renders transparency badge', () => {
    renderRefund();
    expect(screen.getByText('Politique claire et transparente')).toBeInTheDocument();
  });

  it('renders last updated date', () => {
    renderRefund();
    expect(screen.getByText(/Dernière mise à jour/)).toBeInTheDocument();
  });

  it('renders Principe de service rendu section', () => {
    renderRefund();
    expect(screen.getByText('Principe de service rendu')).toBeInTheDocument();
  });

  it('renders Exceptions section', () => {
    renderRefund();
    expect(screen.getByText(/Exceptions/)).toBeInTheDocument();
  });

  it('states non-refundable policy', () => {
    renderRefund();
    expect(screen.getByText(/définitifs et non remboursables/)).toBeInTheDocument();
  });

  it('renders Annulation subsection', () => {
    renderRefund();
    expect(screen.getByText('Annulation')).toBeInTheDocument();
  });

  it('renders Contact facturation section', () => {
    renderRefund();
    expect(screen.getByText('Contact facturation')).toBeInTheDocument();
  });

  it('mentions ProPair trademark', () => {
    renderRefund();
    expect(screen.getAllByText(/ProPair™/).length).toBeGreaterThanOrEqual(1);
  });

  it('renders numbered sections', () => {
    renderRefund();
    // Numbers appear in section headings and in exception list
    expect(screen.getAllByText('1').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('2').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('3').length).toBeGreaterThanOrEqual(1);
  });

  it('mentions digital nature of service', () => {
    renderRefund();
    expect(screen.getByText(/nature numérique/)).toBeInTheDocument();
  });

  it('renders 5 sections total', () => {
    renderRefund();
    // Each section number appears at least once (some appear in both section heading and exception list)
    const nums = ['1', '2', '3', '4', '5'];
    nums.forEach((n) => expect(screen.getAllByText(n).length).toBeGreaterThanOrEqual(1));
  });

  it('mentions billing email', () => {
    renderRefund();
    expect(screen.getAllByText(/billing@propairapp\.com/).length).toBeGreaterThanOrEqual(1);
  });
});
