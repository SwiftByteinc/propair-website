import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import DashboardHome from './DashboardHome';

vi.mock('framer-motion', () => ({
  motion: {
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    section: ({ children, ...props }) => <section {...props}>{children}</section>,
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    button: ({ children, onClick, ...props }) => <button onClick={onClick} {...props}>{children}</button>,
  },
}));

const mockOutletContext = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useOutletContext: () => mockOutletContext() };
});

const mockUseReferralStats = vi.fn();
vi.mock('../../hooks/useReferralStats', () => ({
  useReferralStats: (...args) => mockUseReferralStats(...args),
}));

const mockToast = { success: vi.fn(), error: vi.fn(), info: vi.fn() };
vi.mock('../../context/ToastContext', () => ({
  useToast: () => mockToast,
}));

Object.assign(navigator, {
  clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
});

function renderDashboardHome() {
  return render(
    <HelmetProvider>
      <MemoryRouter>
        <DashboardHome />
      </MemoryRouter>
    </HelmetProvider>
  );
}

describe('DashboardHome', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseReferralStats.mockReturnValue({
      stats: { totalReferrals: 2, validatedReferrals: 1, pendingReferrals: 1, earnedMonths: 0 },
      referralList: [],
      loading: false,
    });
  });

  describe('entrepreneur user', () => {
    beforeEach(() => {
      mockOutletContext.mockReturnValue({
        user: {
          id: 'user-1',
          full_name: 'Nicolas Lepage',
          email: 'test@test.com',
          role: 'entrepreneur',
          isPro: false,
          referral_code: 'NICOLAS123',
          trial_connections_count: 1,
        },
      });
    });

    it('renders greeting with first name', () => {
      renderDashboardHome();
      expect(screen.getByText('Bonjour, Nicolas')).toBeInTheDocument();
    });

    it('shows subtitle', () => {
      renderDashboardHome();
      expect(screen.getByText('Votre tour de contrôle ProPair.')).toBeInTheDocument();
    });

    it('shows referral module', () => {
      renderDashboardHome();
      expect(screen.getByText('Parrainage')).toBeInTheDocument();
      expect(screen.getByText('Votre lien unique')).toBeInTheDocument();
    });

    it('shows referral link with encoded code', () => {
      renderDashboardHome();
      expect(screen.getByText(/ref__=NICOLAS123/)).toBeInTheDocument();
    });

    it('copy button copies referral link', () => {
      renderDashboardHome();
      fireEvent.click(screen.getByText('Copier'));
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        expect.stringContaining('ref__=NICOLAS123')
      );
    });

    it('shows referral progress', () => {
      renderDashboardHome();
      expect(screen.getByText('1/3')).toBeInTheDocument();
      expect(screen.getByText(/Encore 2 parrainage/)).toBeInTheDocument();
    });

    it('shows Mode Essai for non-pro user', () => {
      renderDashboardHome();
      expect(screen.getByText(/Mode Essai/)).toBeInTheDocument();
      expect(screen.getByText('2 connexion(s) restante(s)')).toBeInTheDocument();
    });

    it('shows quick links', () => {
      renderDashboardHome();
      expect(screen.getByText('Abonnement')).toBeInTheDocument();
      expect(screen.getByText('Support')).toBeInTheDocument();
    });
  });

  describe('entrepreneur pro user', () => {
    beforeEach(() => {
      mockOutletContext.mockReturnValue({
        user: {
          id: 'user-1',
          full_name: 'Nicolas Lepage',
          email: 'test@test.com',
          role: 'entrepreneur',
          isPro: true,
          referral_code: 'NICOLAS123',
          trial_connections_count: 0,
        },
      });
    });

    it('shows Membre Élite badge', () => {
      renderDashboardHome();
      expect(screen.getByText('Membre Élite')).toBeInTheDocument();
    });

    it('shows Connexions illimitées', () => {
      renderDashboardHome();
      expect(screen.getByText('Connexions illimitées')).toBeInTheDocument();
    });

    it('shows Gérer l\'abonnement button', () => {
      renderDashboardHome();
      expect(screen.getByText("Gérer l'abonnement")).toBeInTheDocument();
    });
  });

  describe('client user', () => {
    beforeEach(() => {
      mockOutletContext.mockReturnValue({
        user: {
          id: 'user-2',
          full_name: 'Jean Tremblay',
          email: 'jean@test.com',
          role: 'client',
          isPro: false,
          referral_code: 'JEAN456',
          trial_connections_count: 0,
        },
      });
    });

    it('renders greeting with first name', () => {
      renderDashboardHome();
      expect(screen.getByText('Bonjour, Jean')).toBeInTheDocument();
    });

    it('shows Espace Client section', () => {
      renderDashboardHome();
      expect(screen.getByText('Espace Client')).toBeInTheDocument();
    });

    it('shows client navigation links', () => {
      renderDashboardHome();
      expect(screen.getByText('À propos')).toBeInTheDocument();
      expect(screen.getByText('Parrainage')).toBeInTheDocument();
    });

    it('does not show referral module', () => {
      renderDashboardHome();
      expect(screen.queryByText('Votre lien unique')).not.toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('shows 0 referrals progress when no referrals', () => {
      mockOutletContext.mockReturnValue({
        user: {
          id: 'user-1', full_name: 'Nicolas Lepage', email: 'test@test.com',
          role: 'entrepreneur', isPro: false, referral_code: 'NICOLAS123', trial_connections_count: 3,
        },
      });
      mockUseReferralStats.mockReturnValue({
        stats: { totalReferrals: 0, validatedReferrals: 0, pendingReferrals: 0, earnedMonths: 0 },
        referralList: [], loading: false,
      });
      renderDashboardHome();
      expect(screen.getByText('0/3')).toBeInTheDocument();
    });

    it('shows 0 connexion(s) restante(s) when trials exhausted', () => {
      mockOutletContext.mockReturnValue({
        user: {
          id: 'user-1', full_name: 'Nicolas Lepage', email: 'test@test.com',
          role: 'entrepreneur', isPro: false, referral_code: 'NICOLAS123', trial_connections_count: 3,
        },
      });
      renderDashboardHome();
      expect(screen.getByText('0 connexion(s) restante(s)')).toBeInTheDocument();
    });

    it('copy button calls clipboard with referral link', () => {
      mockOutletContext.mockReturnValue({
        user: {
          id: 'user-1', full_name: 'Nicolas Lepage', email: 'test@test.com',
          role: 'entrepreneur', isPro: false, referral_code: 'TEST999', trial_connections_count: 1,
        },
      });
      renderDashboardHome();
      fireEvent.click(screen.getByText('Copier'));
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        expect.stringContaining('ref__=TEST999')
      );
    });

    it('calls useReferralStats with user id', () => {
      mockOutletContext.mockReturnValue({
        user: {
          id: 'abc-123', full_name: 'Test User', email: 'test@test.com',
          role: 'entrepreneur', isPro: false, referral_code: 'CODE', trial_connections_count: 0,
        },
      });
      renderDashboardHome();
      expect(mockUseReferralStats).toHaveBeenCalledWith('abc-123');
    });

    it('shows referral progress 3/3 when 3 validated', () => {
      mockOutletContext.mockReturnValue({
        user: {
          id: 'user-1', full_name: 'Nicolas Lepage', email: 'test@test.com',
          role: 'entrepreneur', isPro: false, referral_code: 'NICOLAS123', trial_connections_count: 1,
        },
      });
      mockUseReferralStats.mockReturnValue({
        stats: { totalReferrals: 3, validatedReferrals: 3, pendingReferrals: 0, earnedMonths: 6 },
        referralList: [], loading: false,
      });
      renderDashboardHome();
      expect(screen.getByText('3/3')).toBeInTheDocument();
    });

    it('pro user does not show Mode Essai', () => {
      mockOutletContext.mockReturnValue({
        user: {
          id: 'user-1', full_name: 'Nicolas Lepage', email: 'test@test.com',
          role: 'entrepreneur', isPro: true, referral_code: 'NICOLAS123', trial_connections_count: 0,
        },
      });
      renderDashboardHome();
      expect(screen.queryByText(/Mode Essai/)).not.toBeInTheDocument();
    });

    it('client non-pro user shows Mode Essai', () => {
      mockOutletContext.mockReturnValue({
        user: {
          id: 'user-2', full_name: 'Jean Tremblay', email: 'jean@test.com',
          role: 'client', isPro: false, referral_code: 'JEAN456', trial_connections_count: 0,
        },
      });
      renderDashboardHome();
      expect(screen.getByText(/Mode Essai/)).toBeInTheDocument();
    });

    it('client user does not show referral progress', () => {
      mockOutletContext.mockReturnValue({
        user: {
          id: 'user-2', full_name: 'Jean Tremblay', email: 'jean@test.com',
          role: 'client', isPro: false, referral_code: 'JEAN456', trial_connections_count: 0,
        },
      });
      renderDashboardHome();
      expect(screen.queryByText(/Encore \d+ parrainage/)).not.toBeInTheDocument();
    });
  });
});
