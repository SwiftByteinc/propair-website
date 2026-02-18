import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Security from './Security';
import { LanguageProvider } from '../../context/LanguageContext';

vi.mock('framer-motion', () => ({
  motion: {
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    section: ({ children, ...props }) => <section {...props}>{children}</section>,
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    button: ({ children, onClick, ...props }) => <button onClick={onClick} {...props}>{children}</button>,
    form: ({ children, onSubmit, ...props }) => <form onSubmit={onSubmit} {...props}>{children}</form>,
  },
  AnimatePresence: ({ children }) => children,
}));

const mockOutletContext = vi.fn();
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useOutletContext: () => mockOutletContext(),
    useNavigate: () => mockNavigate,
  };
});

const mockToast = { success: vi.fn(), error: vi.fn(), info: vi.fn() };
vi.mock('../../context/ToastContext', () => ({
  useToast: () => mockToast,
}));

const mockSupabase = vi.hoisted(() => ({
  auth: {
    signInWithPassword: vi.fn().mockResolvedValue({ error: null }),
    updateUser: vi.fn().mockResolvedValue({ error: null }),
    signOut: vi.fn().mockResolvedValue({}),
  },
  functions: {
    invoke: vi.fn().mockResolvedValue({ error: null }),
  },
}));
vi.mock('../../lib/supabase', () => ({
  supabase: mockSupabase,
}));

function renderSecurity() {
  return render(
    <HelmetProvider>
      <LanguageProvider><MemoryRouter>
        <Security />
      </MemoryRouter></LanguageProvider>
    </HelmetProvider>
  );
}

describe('Security', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockOutletContext.mockReturnValue({
      user: {
        id: 'user-1',
        email: 'test@example.com',
        full_name: 'Test User',
        email_confirmed_at: '2025-01-01',
      },
    });
  });

  it('renders page heading', () => {
    renderSecurity();
    expect(screen.getByText('Sécurité')).toBeInTheDocument();
  });

  it('shows user email', () => {
    renderSecurity();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('shows email verified badge', () => {
    renderSecurity();
    expect(screen.getByText('Vérifié')).toBeInTheDocument();
  });

  it('shows non-verified when no email_confirmed_at', () => {
    mockOutletContext.mockReturnValue({
      user: { id: 'user-1', email: 'test@example.com', email_confirmed_at: null },
    });
    renderSecurity();
    expect(screen.getByText('Non vérifié')).toBeInTheDocument();
  });

  it('shows password section', () => {
    renderSecurity();
    expect(screen.getByText('Mot de passe')).toBeInTheDocument();
    expect(screen.getByText('Changer votre mot de passe')).toBeInTheDocument();
  });

  it('clicking password section toggles form', () => {
    renderSecurity();
    fireEvent.click(screen.getByText('Mot de passe'));
    expect(screen.getByText('Mot de passe actuel')).toBeInTheDocument();
    expect(screen.getByText('Nouveau mot de passe')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Min. 8 caractères')).toBeInTheDocument();
  });

  it('password mismatch shows error', async () => {
    renderSecurity();
    fireEvent.click(screen.getByText('Mot de passe'));

    const [currentPw, confirmPw] = screen.getAllByPlaceholderText('••••••••');
    const newPw = screen.getByPlaceholderText('Min. 8 caractères');

    fireEvent.change(currentPw, { target: { value: 'oldpass123' } });
    fireEvent.change(newPw, { target: { value: 'newpass123' } });
    fireEvent.change(confirmPw, { target: { value: 'different' } });

    fireEvent.submit(currentPw.closest('form'));

    await waitFor(() => {
      expect(screen.getByText('Les mots de passe ne correspondent pas')).toBeInTheDocument();
    });
  });

  it('password too short shows error', async () => {
    renderSecurity();
    fireEvent.click(screen.getByText('Mot de passe'));

    const [currentPw, confirmPw] = screen.getAllByPlaceholderText('••••••••');
    const newPw = screen.getByPlaceholderText('Min. 8 caractères');

    fireEvent.change(currentPw, { target: { value: 'old12345' } });
    fireEvent.change(newPw, { target: { value: 'short' } });
    fireEvent.change(confirmPw, { target: { value: 'short' } });

    fireEvent.submit(currentPw.closest('form'));

    await waitFor(() => {
      expect(screen.getByText('Le mot de passe doit contenir au moins 8 caractères')).toBeInTheDocument();
    });
  });

  it('shows delete account section', () => {
    renderSecurity();
    expect(screen.getByText('Supprimer le compte')).toBeInTheDocument();
    expect(screen.getByText('Action irréversible')).toBeInTheDocument();
  });

  it('opens delete confirmation modal', () => {
    renderSecurity();
    // The button text in the danger zone is just "Supprimer"
    const deleteButtons = screen.getAllByText('Supprimer');
    // Click the one in the danger zone (not in modal)
    fireEvent.click(deleteButtons[0]);
    expect(screen.getByText('Supprimer le compte ?')).toBeInTheDocument();
    expect(screen.getByText(/Toutes vos données seront définitivement supprimées/)).toBeInTheDocument();
  });

  it('cancel closes modal', () => {
    renderSecurity();
    fireEvent.click(screen.getAllByText('Supprimer')[0]);
    expect(screen.getByText('Supprimer le compte ?')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Annuler'));
    expect(screen.queryByText('Supprimer le compte ?')).not.toBeInTheDocument();
  });

  it('renders RGPD notice', () => {
    renderSecurity();
    expect(screen.getByText(/Loi 25 \/ RGPD/)).toBeInTheDocument();
  });

  it('successful password change calls supabase', async () => {
    renderSecurity();
    fireEvent.click(screen.getByText('Mot de passe'));

    const [currentPw, confirmPw] = screen.getAllByPlaceholderText('••••••••');
    const newPw = screen.getByPlaceholderText('Min. 8 caractères');

    fireEvent.change(currentPw, { target: { value: 'oldpass123' } });
    fireEvent.change(newPw, { target: { value: 'newpass123' } });
    fireEvent.change(confirmPw, { target: { value: 'newpass123' } });

    fireEvent.submit(currentPw.closest('form'));

    await waitFor(() => {
      expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalled();
    });
  });

  it('password change API error shows error message', async () => {
    mockSupabase.auth.signInWithPassword.mockResolvedValueOnce({ error: { message: 'Invalid credentials' } });

    renderSecurity();
    fireEvent.click(screen.getByText('Mot de passe'));

    const [currentPw, confirmPw] = screen.getAllByPlaceholderText('••••••••');
    const newPw = screen.getByPlaceholderText('Min. 8 caractères');

    fireEvent.change(currentPw, { target: { value: 'wrongpass' } });
    fireEvent.change(newPw, { target: { value: 'newpass123' } });
    fireEvent.change(confirmPw, { target: { value: 'newpass123' } });

    fireEvent.submit(currentPw.closest('form'));

    await waitFor(() => {
      expect(screen.getByText('Mot de passe actuel incorrect.')).toBeInTheDocument();
    });
  });

  it('shows Mettre à jour button in password form', () => {
    renderSecurity();
    fireEvent.click(screen.getByText('Mot de passe'));
    expect(screen.getByText('Mettre à jour')).toBeInTheDocument();
  });

  it('renders Confirmer label in password form', () => {
    renderSecurity();
    fireEvent.click(screen.getByText('Mot de passe'));
    expect(screen.getByText('Confirmer')).toBeInTheDocument();
  });

  it('shows Vérifications heading', () => {
    renderSecurity();
    expect(screen.getByText('Vérifications')).toBeInTheDocument();
  });

  it('renders RGPD 30 days notice', () => {
    renderSecurity();
    expect(screen.getByText(/30 jours/)).toBeInTheDocument();
  });

  it('modal shows warning about permanent deletion', () => {
    renderSecurity();
    fireEvent.click(screen.getAllByText('Supprimer')[0]);
    expect(screen.getByText(/définitivement supprimées/)).toBeInTheDocument();
  });

  it('delete button in modal triggers account deletion', async () => {
    renderSecurity();
    fireEvent.click(screen.getAllByText('Supprimer')[0]);

    // Click the delete button in the modal
    const modalButtons = screen.getAllByText('Supprimer');
    const modalDeleteBtn = modalButtons[modalButtons.length - 1];
    fireEvent.click(modalDeleteBtn);

    await waitFor(() => {
      expect(mockSupabase.functions.invoke).toHaveBeenCalled();
    });
  });
});
