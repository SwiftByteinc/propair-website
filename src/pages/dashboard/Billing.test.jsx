import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Billing from './Billing';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    section: ({ children, ...props }) => <section {...props}>{children}</section>,
  },
}));

// Mock ToastContext
const mockToast = { info: vi.fn(), success: vi.fn(), error: vi.fn() };
vi.mock('../../context/ToastContext', () => ({
  useToast: () => mockToast,
}));

// Mock useOutletContext
const mockOutletContext = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useOutletContext: () => mockOutletContext(),
  };
});

function renderBilling() {
  return render(
    <MemoryRouter>
      <Billing />
    </MemoryRouter>
  );
}

describe('Billing', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('when user is Pro', () => {
    beforeEach(() => {
      mockOutletContext.mockReturnValue({
        subscription: {
          status: 'active',
          current_period_end: 1740000000,
        },
        isPro: true,
      });
    });

    it('shows Pro subscription status', () => {
      renderBilling();

      expect(screen.getByText('ProPair Élite')).toBeInTheDocument();
      expect(screen.getByText('Plan actif')).toBeInTheDocument();
    });

    it('displays renewal date', () => {
      renderBilling();

      expect(screen.getByText(/Renouvellement le/)).toBeInTheDocument();
    });

    it('shows manage via app button', () => {
      renderBilling();

      const btn = screen.getByText("Gérer via l'app");
      expect(btn).toBeInTheDocument();

      fireEvent.click(btn);
      expect(mockToast.info).toHaveBeenCalledWith(
        expect.stringContaining('application mobile')
      );
    });

    it('shows invoices section', () => {
      renderBilling();

      expect(screen.getByText('Factures')).toBeInTheDocument();
    });

    it('shows correct subtitle for Pro users', () => {
      renderBilling();

      expect(screen.getByText('Gérez votre abonnement ProPair.')).toBeInTheDocument();
    });
  });

  describe('when user is not Pro', () => {
    beforeEach(() => {
      mockOutletContext.mockReturnValue({
        subscription: null,
        isPro: false,
      });
    });

    it('shows no subscription message', () => {
      renderBilling();

      expect(screen.getByText('Aucun abonnement actif')).toBeInTheDocument();
    });

    it('shows upgrade CTA button', () => {
      renderBilling();

      expect(screen.getByText('Voir les offres')).toBeInTheDocument();
    });

    it('shows correct subtitle for free users', () => {
      renderBilling();

      expect(screen.getByText('Passez à la vitesse supérieure.')).toBeInTheDocument();
    });
  });

  describe('formatDate', () => {
    it('formats Unix timestamp correctly', () => {
      mockOutletContext.mockReturnValue({
        subscription: {
          status: 'active',
          current_period_end: 1740000000,
        },
        isPro: true,
      });

      renderBilling();

      // The date should be formatted in fr-CA locale
      const renewalText = screen.getByText(/Renouvellement le/);
      expect(renewalText.textContent).not.toContain('Non disponible');
    });

    it('handles ISO string dates', () => {
      mockOutletContext.mockReturnValue({
        subscription: {
          status: 'active',
          current_period_end: '2026-03-15T00:00:00Z',
        },
        isPro: true,
      });

      renderBilling();

      const renewalText = screen.getByText(/Renouvellement le/);
      expect(renewalText.textContent).toContain('2026');
    });

    it('shows fallback when no subscription end date', () => {
      mockOutletContext.mockReturnValue({
        subscription: { status: 'active' },
        isPro: true,
      });

      renderBilling();

      expect(screen.getByText(/Aucun abonnement actif/)).toBeInTheDocument();
    });
  });
});
