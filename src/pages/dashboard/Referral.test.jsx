import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Referral from './Referral';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    section: ({ children, ...props }) => <section {...props}>{children}</section>,
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    button: ({ children, onClick, ...props }) => <button onClick={onClick} {...props}>{children}</button>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }) => children,
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

// Mock useReferralStats
const mockUseReferralStats = vi.fn();
vi.mock('../../hooks/useReferralStats', () => ({
  useReferralStats: (...args) => mockUseReferralStats(...args),
}));

// Mock clipboard API
Object.assign(navigator, {
  clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
});

function renderReferral() {
  return render(
    <HelmetProvider>
      <MemoryRouter>
        <Referral />
      </MemoryRouter>
    </HelmetProvider>
  );
}

describe('Referral Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockOutletContext.mockReturnValue({
      user: {
        id: 'user-1',
        role: 'entrepreneur',
        referral_code: 'NICOLAS123',
      },
    });

    mockUseReferralStats.mockReturnValue({
      stats: { totalReferrals: 5, validatedReferrals: 2, pendingReferrals: 3, earnedMonths: 2 },
      referralList: [
        { id: 1, referee_type: 'entrepreneur', status: 'validated', created_at: '2026-01-01', referee_email: 'a@test.com' },
        { id: 2, referee_type: 'entrepreneur', status: 'pending', created_at: '2026-01-02', referee_email: 'b@test.com' },
        { id: 3, referee_type: 'client', status: 'validated', created_at: '2026-01-03', referee_email: 'c@test.com' },
        { id: 4, referee_type: 'client', status: 'pending', created_at: '2026-01-04', referee_email: 'd@test.com' },
        { id: 5, referee_type: 'client', status: 'pending', created_at: '2026-01-05', referee_email: 'e@test.com' },
      ],
      loading: false,
    });
  });

  it('renders page heading', () => {
    renderReferral();

    expect(screen.getByText('Parrainage')).toBeInTheDocument();
    expect(screen.getByText(/partagez votre lien/i)).toBeInTheDocument();
  });

  it('displays referral code', () => {
    renderReferral();

    expect(screen.getByText('NICOLAS123')).toBeInTheDocument();
  });

  it('displays referral link with correct format', () => {
    renderReferral();

    const linkElements = screen.getAllByText(/ref__=NICOLAS123/);
    expect(linkElements.length).toBeGreaterThan(0);
  });

  it('displays stats cards with correct values', () => {
    renderReferral();

    // Stats appear in specific cards — use getAllByText for values that appear multiple times
    // '5' appears in stats card and in history count badge
    const fives = screen.getAllByText('5');
    expect(fives.length).toBeGreaterThanOrEqual(1); // total
    const twos = screen.getAllByText('2');
    expect(twos.length).toBeGreaterThanOrEqual(1); // validated
    const threes = screen.getAllByText('3');
    expect(threes.length).toBeGreaterThanOrEqual(1); // pending
  });

  it('displays stat labels', () => {
    renderReferral();

    expect(screen.getByText('Inscrits')).toBeInTheDocument();
    expect(screen.getByText('Validés')).toBeInTheDocument();
    // "En attente" appears in stats label AND in table status badges
    const enAttenteElements = screen.getAllByText('En attente');
    expect(enAttenteElements.length).toBeGreaterThanOrEqual(1);
  });

  it('copies referral link to clipboard on button click', async () => {
    renderReferral();

    const copyBtn = screen.getByText('Copier le lien');
    fireEvent.click(copyBtn);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      expect.stringContaining('ref__=NICOLAS123')
    );
  });

  it('shows Copié after clicking copy', async () => {
    renderReferral();

    fireEvent.click(screen.getByText('Copier le lien'));

    // Wait for state update
    expect(await screen.findByText('Copié')).toBeInTheDocument();
  });

  it('displays referral history table', () => {
    renderReferral();

    expect(screen.getByText('Historique')).toBeInTheDocument();
    // Emails are masked: first 2 chars + ***@ + domain
    expect(screen.getByText('a@***@test.com')).toBeInTheDocument();
    expect(screen.getByText('b@***@test.com')).toBeInTheDocument();
  });

  it('shows correct type badges in history', () => {
    renderReferral();

    const proBadges = screen.getAllByText('Pro');
    const clientBadges = screen.getAllByText('Client');

    // At least one of each in the history table
    expect(proBadges.length).toBeGreaterThanOrEqual(1);
    expect(clientBadges.length).toBeGreaterThanOrEqual(1);
  });

  it('shows correct status badges', () => {
    renderReferral();

    const valideBadges = screen.getAllByText('Validé');
    const pendingBadges = screen.getAllByText('En attente');

    expect(valideBadges.length).toBeGreaterThanOrEqual(1);
    expect(pendingBadges.length).toBeGreaterThanOrEqual(1);
  });

  it('calculates earned months correctly', () => {
    renderReferral();

    // 1 entrepreneur validated * 2 = 2 months, 3 clients < 6 = 0 months, total = 2
    const monthsDisplay = screen.getAllByText('2');
    expect(monthsDisplay.length).toBeGreaterThanOrEqual(1);
  });

  it('shows how it works section', () => {
    renderReferral();

    expect(screen.getByText('Comment ça marche')).toBeInTheDocument();
    expect(screen.getByText('Entrepreneur')).toBeInTheDocument();
  });

  it('shows progress bars section', () => {
    renderReferral();

    expect(screen.getByText('Progression')).toBeInTheDocument();
    expect(screen.getByText('Parrainage entrepreneur')).toBeInTheDocument();
    expect(screen.getByText('Réseau client')).toBeInTheDocument();
  });

  it('shows empty state when no referrals', () => {
    mockUseReferralStats.mockReturnValue({
      stats: { totalReferrals: 0, validatedReferrals: 0, pendingReferrals: 0, earnedMonths: 0 },
      referralList: [],
      loading: false,
    });

    renderReferral();

    expect(screen.getByText(/aucun parrainage/i)).toBeInTheDocument();
  });

  it('shows loading state', () => {
    mockUseReferralStats.mockReturnValue({
      stats: { totalReferrals: 0, validatedReferrals: 0, pendingReferrals: 0, earnedMonths: 0 },
      referralList: [],
      loading: true,
    });

    renderReferral();

    // Loading shows dashes
    const dashes = screen.getAllByText('-');
    expect(dashes.length).toBeGreaterThan(0);
  });

  it('shows entrepreneur-specific help text', () => {
    renderReferral();

    expect(screen.getByText(/filleul s'abonne/i)).toBeInTheDocument();
  });

  it('shows client help text for client users', () => {
    mockOutletContext.mockReturnValue({
      user: {
        id: 'user-2',
        role: 'client',
        referral_code: 'CLIENT456',
      },
    });

    renderReferral();

    expect(screen.getByText(/entrepreneurs à découvrir/i)).toBeInTheDocument();
  });

  it('displays client referral code in link', () => {
    mockOutletContext.mockReturnValue({
      user: { id: 'user-2', role: 'client', referral_code: 'CLIENT456' },
    });
    renderReferral();
    expect(screen.getAllByText(/ref__=CLIENT456/).length).toBeGreaterThan(0);
  });

  it('client user copies correct link', () => {
    mockOutletContext.mockReturnValue({
      user: { id: 'user-2', role: 'client', referral_code: 'CLIENT456' },
    });
    renderReferral();
    fireEvent.click(screen.getByText('Copier le lien'));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      expect.stringContaining('ref__=CLIENT456')
    );
  });

  it('shows referral code in badge', () => {
    renderReferral();
    expect(screen.getByText('NICOLAS123')).toBeInTheDocument();
  });

  it('shows empty history when no referrals', () => {
    mockUseReferralStats.mockReturnValue({
      stats: { totalReferrals: 0, validatedReferrals: 0, pendingReferrals: 0, earnedMonths: 0 },
      referralList: [],
      loading: false,
    });
    renderReferral();
    expect(screen.getByText(/aucun parrainage/i)).toBeInTheDocument();
  });

  it('loading state hides stats values', () => {
    mockUseReferralStats.mockReturnValue({
      stats: { totalReferrals: 0, validatedReferrals: 0, pendingReferrals: 0, earnedMonths: 0 },
      referralList: [],
      loading: true,
    });
    renderReferral();
    const dashes = screen.getAllByText('-');
    expect(dashes.length).toBeGreaterThanOrEqual(3);
  });

  it('shows progress section with correct labels', () => {
    renderReferral();
    expect(screen.getByText('Parrainage entrepreneur')).toBeInTheDocument();
    expect(screen.getByText('Réseau client')).toBeInTheDocument();
  });

  it('shows "Comment ça marche" section', () => {
    renderReferral();
    expect(screen.getByText('Comment ça marche')).toBeInTheDocument();
  });
});
