import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Contact from './Contact';
import { LanguageProvider } from '../context/LanguageContext';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

function renderContact() {
  return render(
    <HelmetProvider>
      <LanguageProvider><MemoryRouter>
        <Contact />
      </MemoryRouter></LanguageProvider>
    </HelmetProvider>
  );
}

describe('Contact', () => {
  it('renders page heading', () => {
    renderContact();
    expect(screen.getByText('Nous sommes là pour vous')).toBeInTheDocument();
  });

  it('renders 4 contact channels', () => {
    renderContact();
    expect(screen.getByText('Téléphone')).toBeInTheDocument();
    expect(screen.getByText('Support général')).toBeInTheDocument();
    expect(screen.getByText('Facturation')).toBeInTheDocument();
    expect(screen.getByText('Confidentialité')).toBeInTheDocument();
  });

  it('renders phone number', () => {
    renderContact();
    expect(screen.getByText('819 481-0882')).toBeInTheDocument();
  });

  it('renders email addresses', () => {
    renderContact();
    expect(screen.getByText('support@propairapp.com')).toBeInTheDocument();
    expect(screen.getByText('billing@propairapp.com')).toBeInTheDocument();
    expect(screen.getByText('privacy@propairapp.com')).toBeInTheDocument();
  });

  it('renders contact form with all fields', () => {
    renderContact();
    expect(screen.getByLabelText('Nom complet')).toBeInTheDocument();
    expect(screen.getByLabelText('Courriel')).toBeInTheDocument();
    expect(screen.getByLabelText('Sujet')).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
  });

  it('renders submit button', () => {
    renderContact();
    expect(screen.getByText('Envoyer le message')).toBeInTheDocument();
  });

  it('form submission shows success state', async () => {
    vi.useFakeTimers();
    renderContact();

    fireEvent.change(screen.getByLabelText('Nom complet'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText('Courriel'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByLabelText('Sujet'), { target: { value: 'Question générale' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hello' } });

    fireEvent.submit(screen.getByText('Envoyer le message').closest('form'));

    act(() => {
      vi.advanceTimersByTime(600);
    });

    expect(screen.getByText("Votre client courriel s'est ouvert")).toBeInTheDocument();
    vi.useRealTimers();
  });

  it('renders address info', () => {
    renderContact();
    expect(screen.getByText('SwiftByte inc.')).toBeInTheDocument();
    expect(screen.getByText(/Magog, Québec/)).toBeInTheDocument();
  });

  it('renders business hours', () => {
    renderContact();
    expect(screen.getByText('Heures de service')).toBeInTheDocument();
    expect(screen.getByText('Lundi — Vendredi')).toBeInTheDocument();
    expect(screen.getByText('9h — 17h')).toBeInTheDocument();
  });

  it('renders quick links', () => {
    renderContact();
    expect(screen.getByText('Questions fréquentes')).toBeInTheDocument();
    expect(screen.getByText('Politique de remboursement')).toBeInTheDocument();
    expect(screen.getByText('Confidentialité & données')).toBeInTheDocument();
  });

  it('renders response time badges', () => {
    renderContact();
    expect(screen.getAllByText('Réponse sous 24h ouvrables').length).toBeGreaterThanOrEqual(1);
  });

  it('phone link has tel: href', () => {
    renderContact();
    const phoneLink = screen.getByText('819 481-0882').closest('a');
    expect(phoneLink).toHaveAttribute('href', 'tel:+18194810882');
  });

  it('support email has mailto: href', () => {
    renderContact();
    const link = screen.getByText('support@propairapp.com').closest('a');
    expect(link).toHaveAttribute('href', 'mailto:support@propairapp.com');
  });

  it('billing email has mailto: href', () => {
    renderContact();
    const link = screen.getByText('billing@propairapp.com').closest('a');
    expect(link).toHaveAttribute('href', 'mailto:billing@propairapp.com');
  });

  it('privacy email has mailto: href', () => {
    renderContact();
    const link = screen.getByText('privacy@propairapp.com').closest('a');
    expect(link).toHaveAttribute('href', 'mailto:privacy@propairapp.com');
  });

  it('renders subtitle text', () => {
    renderContact();
    expect(screen.getByText(/canal qui vous convient/)).toBeInTheDocument();
  });
});
