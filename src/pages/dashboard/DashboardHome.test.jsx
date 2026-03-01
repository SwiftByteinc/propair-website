import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import DashboardHome from './DashboardHome';
import { LanguageProvider } from '../../context/LanguageContext';

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

const mockToast = { success: vi.fn(), error: vi.fn(), info: vi.fn() };
vi.mock('../../context/ToastContext', () => ({
  useToast: () => mockToast,
}));

// Mock supabase
vi.mock('../../lib/supabase', () => ({
  supabase: { functions: { invoke: vi.fn().mockResolvedValue({ data: null, error: null }) } },
}));

function renderDashboardHome() {
  return render(
    <HelmetProvider>
      <LanguageProvider><MemoryRouter>
        <DashboardHome />
      </MemoryRouter></LanguageProvider>
    </HelmetProvider>
  );
}

describe('DashboardHome', () => {
  beforeEach(() => {
    vi.clearAllMocks();
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
          leads_used: 1,
        },
        isPro: false,
      });
    });

    it('renders greeting with first name', () => {
      renderDashboardHome();
      expect(screen.getByText(/Bon.+Nicolas/)).toBeInTheDocument();
    });

    it('shows subtitle', () => {
      renderDashboardHome();
      expect(screen.getByText('Votre tour de contrôle ProPair.')).toBeInTheDocument();
    });

    it('shows Coming Soon section instead of referral', () => {
      renderDashboardHome();
      expect(screen.getByText('À venir')).toBeInTheDocument();
      expect(screen.getByText('Bientôt')).toBeInTheDocument();
    });

    it('shows Coming Soon description and link', () => {
      renderDashboardHome();
      expect(screen.getByText(/On prépare de nouvelles fonctionnalités/)).toBeInTheDocument();
      expect(screen.getByText('Voir les nouveautés')).toBeInTheDocument();
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

    it('does not show referral module', () => {
      renderDashboardHome();
      expect(screen.queryByText('Votre lien unique')).not.toBeInTheDocument();
      expect(screen.queryByText('Copier')).not.toBeInTheDocument();
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
          leads_used: 0,
        },
        isPro: true,
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
          leads_used: 0,
        },
        isPro: false,
      });
    });

    it('renders greeting with first name', () => {
      renderDashboardHome();
      expect(screen.getByText(/Bon.+Jean/)).toBeInTheDocument();
    });

    it('shows Espace Client section', () => {
      renderDashboardHome();
      expect(screen.getByText('Espace Client')).toBeInTheDocument();
    });

    it('shows client navigation links with Coming Soon', () => {
      renderDashboardHome();
      expect(screen.getByText('À propos')).toBeInTheDocument();
      expect(screen.getByText('À venir')).toBeInTheDocument();
      expect(screen.getByText('Bientôt')).toBeInTheDocument();
    });

    it('does not show referral module', () => {
      renderDashboardHome();
      expect(screen.queryByText('Votre lien unique')).not.toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('shows 0 connexion(s) restante(s) when trials exhausted', () => {
      mockOutletContext.mockReturnValue({
        user: {
          id: 'user-1', full_name: 'Nicolas Lepage', email: 'test@test.com',
          role: 'entrepreneur', isPro: false, leads_used: 3,
        },
        isPro: false,
      });
      renderDashboardHome();
      expect(screen.getByText('0 connexion(s) restante(s)')).toBeInTheDocument();
    });

    it('pro user does not show Mode Essai', () => {
      mockOutletContext.mockReturnValue({
        user: {
          id: 'user-1', full_name: 'Nicolas Lepage', email: 'test@test.com',
          role: 'entrepreneur', isPro: true, leads_used: 0,
        },
        isPro: true,
      });
      renderDashboardHome();
      expect(screen.queryByText(/Mode Essai/)).not.toBeInTheDocument();
    });

    it('client non-pro user shows Mode Essai', () => {
      mockOutletContext.mockReturnValue({
        user: {
          id: 'user-2', full_name: 'Jean Tremblay', email: 'jean@test.com',
          role: 'client', isPro: false, leads_used: 0,
        },
        isPro: false,
      });
      renderDashboardHome();
      expect(screen.getByText(/Mode Essai/)).toBeInTheDocument();
    });
  });
});
