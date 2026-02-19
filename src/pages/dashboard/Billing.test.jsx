import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Billing from './Billing';
import { LanguageProvider } from '../../context/LanguageContext';

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

// Mock AuthContext
vi.mock('../../context/AuthContext', () => ({
  useAuth: () => ({ refreshProfile: vi.fn() }),
}));

// Mock supabase
vi.mock('../../lib/supabase', () => ({
  supabase: { functions: { invoke: vi.fn() } },
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
    <HelmetProvider>
      <LanguageProvider><MemoryRouter>
        <Billing />
      </MemoryRouter></LanguageProvider>
    </HelmetProvider>
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
          plan: 'annual',
          current_period_end: 1740000000,
        },
        isPro: true,
      });
    });

    it('shows Pro subscription status', () => {
      renderBilling();

      expect(screen.getByText(/ProPair Élite/)).toBeInTheDocument();
      expect(screen.getByText('Plan actif')).toBeInTheDocument();
    });

    it('displays renewal date', () => {
      renderBilling();

      expect(screen.getByText(/Renouvellement le/)).toBeInTheDocument();
    });

    it('shows manage subscription button', () => {
      renderBilling();

      const btn = screen.getByText("Gérer l'abonnement");
      expect(btn).toBeInTheDocument();
    });

    it('shows invoices section', () => {
      renderBilling();

      expect(screen.getByText('Factures')).toBeInTheDocument();
    });

    it('shows correct subtitle for Pro users', () => {
      renderBilling();

      expect(screen.getByText('Gérez votre abonnement ProPair.')).toBeInTheDocument();
    });

    it('shows plan type (Annual)', () => {
      renderBilling();

      expect(screen.getByText(/Annuel/)).toBeInTheDocument();
    });

    it('shows billing portal link in invoices section', () => {
      renderBilling();

      expect(screen.getByText('portail de facturation')).toBeInTheDocument();
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

    it('shows checkout cards for both plans', () => {
      renderBilling();

      expect(screen.getByText("Choisir l'annuel")).toBeInTheDocument();
      expect(screen.getByText('Choisir le mensuel')).toBeInTheDocument();
    });

    it('shows annual plan price', () => {
      renderBilling();

      expect(screen.getByText(/149\$/)).toBeInTheDocument();
    });

    it('shows monthly plan price', () => {
      renderBilling();

      expect(screen.getByText(/24\$/)).toBeInTheDocument();
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
          plan: 'monthly',
          current_period_end: 1740000000,
        },
        isPro: true,
      });

      renderBilling();

      const renewalText = screen.getByText(/Renouvellement le/);
      expect(renewalText.textContent).not.toContain('Non disponible');
    });

    it('handles ISO string dates', () => {
      mockOutletContext.mockReturnValue({
        subscription: {
          status: 'active',
          plan: 'annual',
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
        subscription: { status: 'active', plan: 'monthly' },
        isPro: true,
      });

      renderBilling();

      expect(screen.getByText(/Aucun abonnement actif/)).toBeInTheDocument();
    });
  });

  describe('additional coverage', () => {
    it('renders page heading "Abonnement"', () => {
      mockOutletContext.mockReturnValue({ subscription: null, isPro: false });
      renderBilling();
      expect(screen.getByText('Abonnement')).toBeInTheDocument();
    });

    it('pro user does not show checkout cards', () => {
      mockOutletContext.mockReturnValue({
        subscription: { status: 'active', plan: 'annual', current_period_end: 1740000000 },
        isPro: true,
      });
      renderBilling();
      expect(screen.queryByText("Choisir l'annuel")).not.toBeInTheDocument();
      expect(screen.queryByText('Choisir le mensuel')).not.toBeInTheDocument();
    });

    it('non-pro user does not show manage subscription button', () => {
      mockOutletContext.mockReturnValue({ subscription: null, isPro: false });
      renderBilling();
      expect(screen.queryByText("Gérer l'abonnement")).not.toBeInTheDocument();
    });

    it('non-pro user does not show "ProPair Élite"', () => {
      mockOutletContext.mockReturnValue({ subscription: null, isPro: false });
      renderBilling();
      expect(screen.queryByText(/ProPair Élite/)).not.toBeInTheDocument();
    });

    it('non-pro user does not show "Plan actif"', () => {
      mockOutletContext.mockReturnValue({ subscription: null, isPro: false });
      renderBilling();
      expect(screen.queryByText('Plan actif')).not.toBeInTheDocument();
    });

    it('non-pro user does not show renewal date', () => {
      mockOutletContext.mockReturnValue({ subscription: null, isPro: false });
      renderBilling();
      expect(screen.queryByText(/Renouvellement le/)).not.toBeInTheDocument();
    });

    it('pro user shows "Factures" section', () => {
      mockOutletContext.mockReturnValue({
        subscription: { status: 'active', plan: 'annual', current_period_end: 1740000000 },
        isPro: true,
      });
      renderBilling();
      expect(screen.getByText('Factures')).toBeInTheDocument();
    });

    it('annual saving text is shown for non-pro', () => {
      mockOutletContext.mockReturnValue({ subscription: null, isPro: false });
      renderBilling();
      expect(screen.getByText(/139\$/)).toBeInTheDocument();
    });
  });
});
