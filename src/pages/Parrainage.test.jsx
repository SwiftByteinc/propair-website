import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Parrainage from './Parrainage';
import { LanguageProvider } from '../context/LanguageContext';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

// Mock SEO
vi.mock('../components/SEO', () => ({
  default: () => null,
}));

// Mock AuthContext
const mockUseAuth = vi.fn();
vi.mock('../context/AuthContext', () => ({
  useAuth: () => mockUseAuth(),
}));

function renderParrainage() {
  return render(
    <LanguageProvider><MemoryRouter>
      <Parrainage />
    </MemoryRouter></LanguageProvider>
  );
}

describe('Parrainage (Public Page)', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('when user is not logged in', () => {
    beforeEach(() => {
      mockUseAuth.mockReturnValue({ user: null });
    });

    it('renders hero banner with title', () => {
      renderParrainage();

      expect(screen.getByText(/parrainez, gagnez des mois pro/i)).toBeInTheDocument();
    });

    it('renders the 3 steps', () => {
      renderParrainage();

      expect(screen.getByText('Partagez votre code')).toBeInTheDocument();
      expect(screen.getByText("Votre filleul s'inscrit")).toBeInTheDocument();
      expect(screen.getByText('Gagnez des mois Pro')).toBeInTheDocument();
    });

    it('renders step numbers 1, 2, 3', () => {
      renderParrainage();

      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('renders how it works section', () => {
      renderParrainage();

      expect(screen.getByText('Comment ça marche')).toBeInTheDocument();
    });

    it('renders reward cards', () => {
      renderParrainage();

      expect(screen.getByText('Parrainez un entrepreneur')).toBeInTheDocument();
      expect(screen.getByText('Parrainez des clients')).toBeInTheDocument();
    });

    it('renders entrepreneur reward details', () => {
      renderParrainage();

      expect(screen.getByText(/il s'inscrit via votre code/i)).toBeInTheDocument();
      expect(screen.getByText(/il paie 2 mois mensuels ou 1 abonnement annuel/i)).toBeInTheDocument();
      expect(screen.getByText(/votre filleul gagne 2 mois pro gratuits/i)).toBeInTheDocument();
    });

    it('renders client reward details', () => {
      renderParrainage();

      expect(screen.getByText(/invitez vos contacts clients via votre code/i)).toBeInTheDocument();
      expect(screen.getByText(/accumulez 6 clients validés/i)).toBeInTheDocument();
    });

    it('renders flow badges', () => {
      renderParrainage();

      expect(screen.getByText('+3 mois parrain')).toBeInTheDocument();
      expect(screen.getByText('+2 mois filleul')).toBeInTheDocument();
      expect(screen.getByText('+3 mois')).toBeInTheDocument();
    });

    it('renders info footer about rules', () => {
      renderParrainage();

      expect(screen.getByText(/cumulables/i)).toBeInTheDocument();
    });

    it('shows CTA for non-logged-in users', () => {
      renderParrainage();

      expect(screen.getByText(/prêt à gagner des mois gratuits/i)).toBeInTheDocument();
      expect(screen.getByText('Créer mon compte')).toBeInTheDocument();
    });

    it('CTA links to login page', () => {
      renderParrainage();

      const ctaLink = screen.getByText('Créer mon compte').closest('a');
      expect(ctaLink).toHaveAttribute('href', '/login');
    });
  });

  describe('when user is logged in', () => {
    beforeEach(() => {
      mockUseAuth.mockReturnValue({
        user: { id: '1', email: 'test@test.com' },
      });
    });

    it('shows CTA for logged-in users', () => {
      renderParrainage();

      expect(screen.getByText('Commencez à parrainer')).toBeInTheDocument();
      expect(screen.getByText('Mon tableau de bord')).toBeInTheDocument();
    });

    it('CTA links to portal referral page', () => {
      renderParrainage();

      const ctaLink = screen.getByText('Mon tableau de bord').closest('a');
      expect(ctaLink).toHaveAttribute('href', '/portal/referral');
    });
  });

  describe('additional coverage', () => {
    beforeEach(() => {
      mockUseAuth.mockReturnValue({ user: null });
    });

    it('renders flow reward badges', () => {
      renderParrainage();
      expect(screen.getByText('+3 mois parrain')).toBeInTheDocument();
      expect(screen.getByText('+3 mois')).toBeInTheDocument();
    });

    it('renders step number 1', () => {
      renderParrainage();
      expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('renders step number 2', () => {
      renderParrainage();
      expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('renders step number 3', () => {
      renderParrainage();
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('shows "cumulables" info in footer', () => {
      renderParrainage();
      expect(screen.getByText(/cumulables/i)).toBeInTheDocument();
    });

    it('CTA link to login has correct href', () => {
      renderParrainage();
      const ctaLink = screen.getByText('Créer mon compte').closest('a');
      expect(ctaLink).toHaveAttribute('href', '/login');
    });

    it('renders Partagez votre code step', () => {
      renderParrainage();
      expect(screen.getByText('Partagez votre code')).toBeInTheDocument();
    });

    it('renders Gagnez des mois Pro step', () => {
      renderParrainage();
      expect(screen.getByText('Gagnez des mois Pro')).toBeInTheDocument();
    });

    it('renders entrepreneur reward card', () => {
      renderParrainage();
      expect(screen.getByText('Parrainez un entrepreneur')).toBeInTheDocument();
    });

    it('renders client network reward card', () => {
      renderParrainage();
      expect(screen.getByText('Parrainez des clients')).toBeInTheDocument();
    });
  });
});
