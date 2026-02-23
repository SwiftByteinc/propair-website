import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ForgotPassword from './ForgotPassword';
import { supabase } from '../lib/supabase';
import { LanguageProvider } from '../context/LanguageContext';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

vi.mock('../components/SEO', () => ({
  default: () => null,
}));

vi.mock('../lib/supabase', () => ({
  supabase: {
    auth: {
      resetPasswordForEmail: vi.fn(),
    },
  },
}));

function renderForgotPassword() {
  return render(
    <LanguageProvider><MemoryRouter>
      <ForgotPassword />
    </MemoryRouter></LanguageProvider>
  );
}

describe('ForgotPassword', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders heading', () => {
    renderForgotPassword();
    expect(screen.getByText('Mot de passe oublié ?')).toBeInTheDocument();
  });

  it('renders email input', () => {
    renderForgotPassword();
    expect(screen.getByLabelText('Adresse courriel')).toBeInTheDocument();
  });

  it('renders submit button', () => {
    renderForgotPassword();
    expect(screen.getByText('Envoyer le lien')).toBeInTheDocument();
  });

  it('has back to login link', () => {
    renderForgotPassword();
    expect(screen.getByText('Retour à la connexion')).toBeInTheDocument();
  });

  it('successful submission shows success state', async () => {
    supabase.auth.resetPasswordForEmail.mockResolvedValue({ error: null });

    renderForgotPassword();

    fireEvent.change(screen.getByLabelText('Adresse courriel'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.submit(screen.getByText('Envoyer le lien').closest('form'));

    await waitFor(() => {
      expect(screen.getByText('Lien envoyé !')).toBeInTheDocument();
    });

    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('error shows error message', async () => {
    supabase.auth.resetPasswordForEmail.mockResolvedValue({
      error: { message: 'Rate limit exceeded' },
    });

    renderForgotPassword();

    fireEvent.change(screen.getByLabelText('Adresse courriel'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.submit(screen.getByText('Envoyer le lien').closest('form'));

    await waitFor(() => {
      expect(screen.getByText('Rate limit exceeded')).toBeInTheDocument();
    });
  });

  it('Utiliser une autre adresse resets form', async () => {
    supabase.auth.resetPasswordForEmail.mockResolvedValue({ error: null });

    renderForgotPassword();

    fireEvent.change(screen.getByLabelText('Adresse courriel'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.submit(screen.getByText('Envoyer le lien').closest('form'));

    await waitFor(() => {
      expect(screen.getByText('Lien envoyé !')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Utiliser une autre adresse'));

    expect(screen.getByText('Envoyer le lien')).toBeInTheDocument();
  });

  it('has back to home link', () => {
    renderForgotPassword();
    expect(screen.getByText("← Retour à l'accueil")).toBeInTheDocument();
  });

  it('email input has type email', () => {
    renderForgotPassword();
    expect(screen.getByLabelText('Adresse courriel')).toHaveAttribute('type', 'email');
  });

  it('submit button is inside a form', () => {
    renderForgotPassword();
    const btn = screen.getByText('Envoyer le lien');
    expect(btn.closest('form')).toBeInTheDocument();
  });

  it('back to login link points to /connexion', () => {
    renderForgotPassword();
    const link = screen.getByText('Retour à la connexion').closest('a');
    expect(link).toHaveAttribute('href', '/connexion');
  });

  it('back to home link points to /', () => {
    renderForgotPassword();
    const link = screen.getByText("← Retour à l'accueil").closest('a');
    expect(link).toHaveAttribute('href', '/');
  });

  it('renders subtitle text', () => {
    renderForgotPassword();
    expect(screen.getByText(/réinitialiser votre accès/)).toBeInTheDocument();
  });
});
