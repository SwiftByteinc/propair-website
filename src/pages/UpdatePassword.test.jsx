import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UpdatePassword from './UpdatePassword';
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
      getSession: vi.fn(),
      updateUser: vi.fn(),
    },
  },
}));

describe('UpdatePassword', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('with valid reset token', () => {
    beforeEach(() => {
      // Simulate hash params from Supabase reset link
      Object.defineProperty(window, 'location', {
        value: {
          ...window.location,
          hash: '#access_token=test-token&type=recovery',
          origin: 'http://localhost:3000',
        },
        writable: true,
        configurable: true,
      });
    });

    function renderWithToken() {
      return render(
        <LanguageProvider><MemoryRouter>
          <UpdatePassword />
        </MemoryRouter></LanguageProvider>
      );
    }

    it('shows password form when token is valid', async () => {
      renderWithToken();
      await waitFor(() => {
        expect(screen.getByText('Nouveau mot de passe')).toBeInTheDocument();
      });
    });

    it('renders password inputs', async () => {
      renderWithToken();
      await waitFor(() => {
        expect(screen.getByLabelText('Nouveau mot de passe')).toBeInTheDocument();
        expect(screen.getByLabelText('Confirmer le mot de passe')).toBeInTheDocument();
      });
    });

    it('password mismatch shows error', async () => {
      renderWithToken();

      await waitFor(() => {
        expect(screen.getByLabelText('Nouveau mot de passe')).toBeInTheDocument();
      });

      fireEvent.change(screen.getByLabelText('Nouveau mot de passe'), {
        target: { value: 'password123' },
      });
      fireEvent.change(screen.getByLabelText('Confirmer le mot de passe'), {
        target: { value: 'different456' },
      });
      fireEvent.submit(screen.getByText('Réinitialiser le mot de passe').closest('form'));

      await waitFor(() => {
        expect(screen.getByText('Les mots de passe ne correspondent pas')).toBeInTheDocument();
      });
    });

    it('password too short shows error', async () => {
      renderWithToken();

      await waitFor(() => {
        expect(screen.getByLabelText('Nouveau mot de passe')).toBeInTheDocument();
      });

      fireEvent.change(screen.getByLabelText('Nouveau mot de passe'), {
        target: { value: 'short' },
      });
      fireEvent.change(screen.getByLabelText('Confirmer le mot de passe'), {
        target: { value: 'short' },
      });
      fireEvent.submit(screen.getByText('Réinitialiser le mot de passe').closest('form'));

      await waitFor(() => {
        expect(screen.getByText('Le mot de passe doit contenir au moins 8 caractères')).toBeInTheDocument();
      });
    });

    it('successful update shows success message', async () => {
      supabase.auth.updateUser.mockResolvedValue({ error: null });

      renderWithToken();

      await waitFor(() => {
        expect(screen.getByLabelText('Nouveau mot de passe')).toBeInTheDocument();
      });

      fireEvent.change(screen.getByLabelText('Nouveau mot de passe'), {
        target: { value: 'newpassword123' },
      });
      fireEvent.change(screen.getByLabelText('Confirmer le mot de passe'), {
        target: { value: 'newpassword123' },
      });
      fireEvent.submit(screen.getByText('Réinitialiser le mot de passe').closest('form'));

      await waitFor(() => {
        expect(screen.getByText('Mot de passe mis à jour !')).toBeInTheDocument();
      });
    });
  });

  describe('with no token and no session', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'location', {
        value: {
          ...window.location,
          hash: '',
          origin: 'http://localhost:3000',
        },
        writable: true,
        configurable: true,
      });
      supabase.auth.getSession.mockResolvedValue({ data: { session: null } });
    });

    it('shows invalid link message', async () => {
      render(
        <LanguageProvider><MemoryRouter>
          <UpdatePassword />
        </MemoryRouter></LanguageProvider>
      );

      await waitFor(() => {
        expect(screen.getByText('Lien invalide ou expiré')).toBeInTheDocument();
      });
    });

    it('shows link to request new reset', async () => {
      render(
        <LanguageProvider><MemoryRouter>
          <UpdatePassword />
        </MemoryRouter></LanguageProvider>
      );

      await waitFor(() => {
        expect(screen.getByText('Demander un nouveau lien')).toBeInTheDocument();
      });
    });

    it('reset link points to /forgot-password', async () => {
      render(
        <LanguageProvider><MemoryRouter>
          <UpdatePassword />
        </MemoryRouter></LanguageProvider>
      );

      await waitFor(() => {
        const link = screen.getByText('Demander un nouveau lien').closest('a');
        expect(link).toHaveAttribute('href', '/forgot-password');
      });
    });

    it('shows descriptive error text', async () => {
      render(
        <LanguageProvider><MemoryRouter>
          <UpdatePassword />
        </MemoryRouter></LanguageProvider>
      );

      await waitFor(() => {
        expect(screen.getByText(/Ce lien de réinitialisation/)).toBeInTheDocument();
      });
    });
  });

  describe('with valid reset token - additional tests', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'location', {
        value: {
          ...window.location,
          hash: '#access_token=test-token&type=recovery',
          origin: 'http://localhost:3000',
        },
        writable: true,
        configurable: true,
      });
    });

    it('submit button text is Réinitialiser le mot de passe', async () => {
      render(<LanguageProvider><MemoryRouter><UpdatePassword /></MemoryRouter></LanguageProvider>);
      await waitFor(() => {
        expect(screen.getByText('Réinitialiser le mot de passe')).toBeInTheDocument();
      });
    });

    it('password fields are type password', async () => {
      render(<LanguageProvider><MemoryRouter><UpdatePassword /></MemoryRouter></LanguageProvider>);
      await waitFor(() => {
        expect(screen.getByLabelText('Nouveau mot de passe')).toBeInTheDocument();
      });
      const newPw = screen.getByLabelText('Nouveau mot de passe');
      const confirmPw = screen.getByLabelText('Confirmer le mot de passe');
      expect(newPw).toHaveAttribute('type', 'password');
      expect(confirmPw).toHaveAttribute('type', 'password');
    });

    it('API error shows error message', async () => {
      supabase.auth.updateUser.mockResolvedValue({
        error: { message: 'Token expired' },
      });
      render(<LanguageProvider><MemoryRouter><UpdatePassword /></MemoryRouter></LanguageProvider>);

      await waitFor(() => {
        expect(screen.getByLabelText('Nouveau mot de passe')).toBeInTheDocument();
      });

      fireEvent.change(screen.getByLabelText('Nouveau mot de passe'), { target: { value: 'validpass123' } });
      fireEvent.change(screen.getByLabelText('Confirmer le mot de passe'), { target: { value: 'validpass123' } });
      fireEvent.submit(screen.getByText('Réinitialiser le mot de passe').closest('form'));

      await waitFor(() => {
        expect(screen.getByText('Token expired')).toBeInTheDocument();
      });
    });

    it('success message mentions redirect', async () => {
      supabase.auth.updateUser.mockResolvedValue({ error: null });
      render(<LanguageProvider><MemoryRouter><UpdatePassword /></MemoryRouter></LanguageProvider>);

      await waitFor(() => {
        expect(screen.getByLabelText('Nouveau mot de passe')).toBeInTheDocument();
      });

      fireEvent.change(screen.getByLabelText('Nouveau mot de passe'), { target: { value: 'newpass12345' } });
      fireEvent.change(screen.getByLabelText('Confirmer le mot de passe'), { target: { value: 'newpass12345' } });
      fireEvent.submit(screen.getByText('Réinitialiser le mot de passe').closest('form'));

      await waitFor(() => {
        expect(screen.getByText(/Redirection vers la connexion/)).toBeInTheDocument();
      });
    });
  });
});
