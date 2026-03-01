import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ComingSoon from './ComingSoon';
import { LanguageProvider } from '../../context/LanguageContext';

vi.mock('framer-motion', () => ({
  motion: {
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    section: ({ children, ...props }) => <section {...props}>{children}</section>,
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    button: ({ children, onClick, disabled, ...props }) => (
      <button onClick={onClick} disabled={disabled} {...props}>{children}</button>
    ),
  },
}));

vi.mock('posthog-js', () => ({
  default: { capture: vi.fn() },
}));

const localStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] ?? null),
    setItem: vi.fn((key, value) => { store[key] = String(value); }),
    removeItem: vi.fn((key) => { delete store[key]; }),
    clear: vi.fn(() => { store = {}; }),
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

function renderComingSoon() {
  return render(
    <HelmetProvider>
      <LanguageProvider><MemoryRouter>
        <ComingSoon />
      </MemoryRouter></LanguageProvider>
    </HelmetProvider>
  );
}

describe('ComingSoon', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
  });

  it('renders heading and subtitle', () => {
    renderComingSoon();
    expect(screen.getByText('À venir')).toBeInTheDocument();
    expect(screen.getByText(/Découvrez ce qui arrive/)).toBeInTheDocument();
  });

  it('renders referral teaser section', () => {
    renderComingSoon();
    // "Programme de parrainage" appears twice: teaser hero + lab card
    const referralTexts = screen.getAllByText('Programme de parrainage');
    expect(referralTexts.length).toBe(2);
    expect(screen.getByText(/Invitez vos collègues/)).toBeInTheDocument();
  });

  it('renders waitlist button', () => {
    renderComingSoon();
    expect(screen.getByText("Rejoindre la liste d'accès prioritaire")).toBeInTheDocument();
  });

  it('clicking waitlist button changes to joined state', () => {
    renderComingSoon();
    fireEvent.click(screen.getByText("Rejoindre la liste d'accès prioritaire"));
    expect(screen.getByText('Vous êtes sur la liste !')).toBeInTheDocument();
  });

  it('clicking waitlist button triggers posthog capture', async () => {
    const posthog = (await import('posthog-js')).default;
    renderComingSoon();
    fireEvent.click(screen.getByText("Rejoindre la liste d'accès prioritaire"));
    expect(posthog.capture).toHaveBeenCalledWith('referral_waitlist_joined');
  });

  it('clicking waitlist button persists to localStorage', () => {
    renderComingSoon();
    fireEvent.click(screen.getByText("Rejoindre la liste d'accès prioritaire"));
    expect(localStorageMock.setItem).toHaveBeenCalledWith('propair_waitlist_joined', 'true');
  });

  it('renders lab section with 3 feature cards', () => {
    renderComingSoon();
    expect(screen.getByText('Dans notre laboratoire')).toBeInTheDocument();
    // 2 "Programme de parrainage" texts: one in teaser, one in lab
    const referralTexts = screen.getAllByText('Programme de parrainage');
    expect(referralTexts.length).toBe(2);
    expect(screen.getByText('Intégrations CRM')).toBeInTheDocument();
    expect(screen.getByText('Devis automatisés')).toBeInTheDocument();
  });

  it('renders 3 vote buttons', () => {
    renderComingSoon();
    const voteButtons = screen.getAllByText('Voter');
    expect(voteButtons.length).toBe(3);
  });

  it('clicking vote button changes to voted state', () => {
    renderComingSoon();
    const voteButtons = screen.getAllByText('Voter');
    fireEvent.click(voteButtons[0]);
    expect(screen.getByText('Voté !')).toBeInTheDocument();
  });

  it('clicking vote button triggers posthog capture', async () => {
    const posthog = (await import('posthog-js')).default;
    renderComingSoon();
    const voteButtons = screen.getAllByText('Voter');
    fireEvent.click(voteButtons[1]); // CRM
    expect(posthog.capture).toHaveBeenCalledWith('feature_vote', { feature: 'crm' });
  });

  it('shows thanks message when at least one vote is cast', () => {
    renderComingSoon();
    expect(screen.queryByText(/Merci pour vos votes/)).not.toBeInTheDocument();
    const voteButtons = screen.getAllByText('Voter');
    fireEvent.click(voteButtons[0]);
    expect(screen.getByText(/Merci pour vos votes/)).toBeInTheDocument();
  });

  it('vote is toggleable (un-vote)', () => {
    renderComingSoon();
    const voteButtons = screen.getAllByText('Voter');
    fireEvent.click(voteButtons[0]);
    expect(screen.getByText('Voté !')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Voté !'));
    // After un-voting, all 3 should be "Voter" again
    expect(screen.getAllByText('Voter').length).toBe(3);
  });
});
