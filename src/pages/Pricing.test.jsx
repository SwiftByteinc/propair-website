import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Pricing from './Pricing';
import { LanguageProvider } from '../context/LanguageContext';
import { ToastProvider } from '../context/ToastContext';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    section: ({ children, ...props }) => <section {...props}>{children}</section>,
  },
  AnimatePresence: ({ children }) => children,
}));

// Mock supabase for useEarlyBirdCount hook
vi.mock('../lib/supabase', () => ({
  supabase: { functions: { invoke: vi.fn().mockResolvedValue({ data: { claimed: 42, remaining: 158, limit: 200, isEarlyBird: true }, error: null }) } },
}));

// Mock AuthContext (user not logged in by default)
vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({ user: null }),
}));

// Mock IntersectionObserver (not available in jsdom)
globalThis.IntersectionObserver = class {
  constructor(cb) { globalThis.__ioCallback = cb; }
  observe() {}
  disconnect() {}
  unobserve() {}
};

function renderPricing() {
  return render(
    <HelmetProvider>
      <LanguageProvider><ToastProvider><MemoryRouter>
        <Pricing />
      </MemoryRouter></ToastProvider></LanguageProvider>
    </HelmetProvider>
  );
}

describe('Pricing', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders page heading', () => {
    renderPricing();
    expect(screen.getByText(/Investissez dans votre croissance/)).toBeInTheDocument();
  });

  it('renders 0% commission badge', () => {
    renderPricing();
    expect(screen.getByText('0% de commission, toujours')).toBeInTheDocument();
  });

  it('renders 6 reason cards', () => {
    renderPricing();
    expect(screen.getByText('Connexions illimitées')).toBeInTheDocument();
    expect(screen.getByText('Demandes en temps réel')).toBeInTheDocument();
    expect(screen.getByText('Profil vérifié')).toBeInTheDocument();
    expect(screen.getByText('Chat intégré')).toBeInTheDocument();
    expect(screen.getByText('Tarif simple et fixe')).toBeInTheDocument();
  });

  it('renders annual price', () => {
    renderPricing();
    expect(screen.getByText('149$')).toBeInTheDocument();
    expect(screen.getByText('/an + tx')).toBeInTheDocument();
  });

  it('renders monthly price', () => {
    renderPricing();
    expect(screen.getByText('24$')).toBeInTheDocument();
    expect(screen.getByText('/mois + tx')).toBeInTheDocument();
  });

  it('renders Choisir l\'annuel button', () => {
    renderPricing();
    const btn = screen.getByText("Choisir l'annuel");
    expect(btn.closest('button')).toBeInTheDocument();
  });

  it('renders monthly CTA button', () => {
    renderPricing();
    const btn = screen.getByText('Continuer avec le mensuel');
    expect(btn.closest('button')).toBeInTheDocument();
  });

  it('renders Offre Lancement badge', () => {
    renderPricing();
    expect(screen.getByText('Accès Pionnier')).toBeInTheDocument();
  });

  it('renders discount badge', () => {
    renderPricing();
    expect(screen.getByText('-25% de rabais')).toBeInTheDocument();
  });

  it('renders all 5 pro features in annual card', () => {
    renderPricing();
    expect(screen.getByText('Accès illimité aux demandes')).toBeInTheDocument();
    expect(screen.getByText('Profil vérifié & Badge')).toBeInTheDocument();
    expect(screen.getByText('Notifications instantanées')).toBeInTheDocument();
    expect(screen.getByText('0% de commission (garanti)')).toBeInTheDocument();
    expect(screen.getByText('Outils de gestion inclus')).toBeInTheDocument();
  });

  it('renders all FAQ questions', () => {
    renderPricing();
    expect(screen.getByText('Puis-je annuler à tout moment ?')).toBeInTheDocument();
    expect(screen.getByText('Y a-t-il vraiment 0% de commission ?')).toBeInTheDocument();
    expect(screen.getByText('Est-ce que je peux essayer gratuitement ?')).toBeInTheDocument();
    expect(screen.getByText('Quels types d\'entrepreneurs utilisent ProPair ?')).toBeInTheDocument();
    expect(screen.getByText('Comment les clients me trouvent ?')).toBeInTheDocument();
    expect(screen.getByText('L\'offre de lancement est valable combien de temps ?')).toBeInTheDocument();
  });

  it('clicking FAQ question toggles answer', () => {
    renderPricing();

    const question = screen.getByText('Puis-je annuler à tout moment ?');
    fireEvent.click(question);

    expect(screen.getByText(/Vous pouvez annuler votre abonnement en un clic/)).toBeInTheDocument();
  });

  it('renders CTA section', () => {
    renderPricing();
    expect(screen.getByText('Prêt à développer votre clientèle ?')).toBeInTheDocument();
  });

  it('renders trust section', () => {
    renderPricing();
    expect(screen.getByText("Soutenez l'économie locale")).toBeInTheDocument();
  });

  it('renders FAQ heading', () => {
    renderPricing();
    expect(screen.getByText('Questions fréquentes')).toBeInTheDocument();
  });

  it('overlay does not show before 5 seconds', () => {
    renderPricing();
    act(() => { vi.advanceTimersByTime(4000); });
    expect(screen.queryByText('Le saviez-vous ?')).not.toBeInTheDocument();
  });

  it('clicking second FAQ question shows its answer', () => {
    renderPricing();
    fireEvent.click(screen.getByText('Y a-t-il vraiment 0% de commission ?'));
    expect(screen.getAllByText(/tout ce que vous facturez/i).length).toBeGreaterThanOrEqual(1);
  });

  it('renders Offre Lancement badge on annual card', () => {
    renderPricing();
    expect(screen.getByText('Accès Pionnier')).toBeInTheDocument();
  });

  it('renders annual card discount text', () => {
    renderPricing();
    expect(screen.getByText('-25% de rabais')).toBeInTheDocument();
  });

  it('CTA section has annual signup button', () => {
    renderPricing();
    const btn = screen.getByText('Choisir l\'annuel').closest('button');
    expect(btn).toBeInTheDocument();
  });
});
