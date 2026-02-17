import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }) => children,
}));

// Mock AuthContext
vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    user: null,
    signIn: vi.fn(),
    signUp: vi.fn(),
    signInWithOAuth: vi.fn(),
  }),
}));

// Mock SEO component
vi.mock('../components/SEO', () => ({
  default: () => null,
}));

// Wrapper component with Router
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Login Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login page correctly', () => {
    renderWithRouter(<Login />);

    // Check main heading
    expect(screen.getByText('Bon retour parmi nous')).toBeInTheDocument();

    // Check email and password fields exist
    expect(screen.getByPlaceholderText('Adresse courriel')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Mot de passe')).toBeInTheDocument();

    // Check submit button
    expect(screen.getByRole('button', { name: /se connecter/i })).toBeInTheDocument();
  });

  it('renders social login buttons', () => {
    renderWithRouter(<Login />);

    // Check Google and Apple buttons
    expect(screen.getByRole('button', { name: /google/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /apple/i })).toBeInTheDocument();
  });

  it('toggles between login and signup mode', () => {
    renderWithRouter(<Login />);

    // Initially in login mode
    expect(screen.getByText('Bon retour parmi nous')).toBeInTheDocument();

    // Click to switch to signup
    const toggleButton = screen.getByRole('button', { name: /s'inscrire/i });
    fireEvent.click(toggleButton);

    // Now should show signup mode
    expect(screen.getByText('Créer un compte')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Votre nom complet')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirmer le mot de passe')).toBeInTheDocument();
  });

  it('shows password toggle button', () => {
    renderWithRouter(<Login />);

    const togglePasswordBtn = screen.getByRole('button', { name: /afficher le mot de passe/i });
    expect(togglePasswordBtn).toBeInTheDocument();

    // Click to show password
    fireEvent.click(togglePasswordBtn);

    // Now should say "masquer"
    expect(screen.getByRole('button', { name: /masquer le mot de passe/i })).toBeInTheDocument();
  });

  it('has forgot password link in login mode', () => {
    renderWithRouter(<Login />);

    expect(screen.getByText('Mot de passe oublié ?')).toBeInTheDocument();
  });

  it('has back to home link', () => {
    renderWithRouter(<Login />);

    expect(screen.getByText(/retour à l'accueil/i)).toBeInTheDocument();
  });

  it('allows typing in form fields', () => {
    renderWithRouter(<Login />);

    const emailInput = screen.getByPlaceholderText('Adresse courriel');
    const passwordInput = screen.getByPlaceholderText('Mot de passe');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput).toHaveValue('test@example.com');

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput).toHaveValue('password123');
  });

  it('email input has type email', () => {
    renderWithRouter(<Login />);
    const email = screen.getByPlaceholderText('Adresse courriel');
    expect(email).toHaveAttribute('type', 'email');
  });

  it('password input has type password by default', () => {
    renderWithRouter(<Login />);
    const pw = screen.getByPlaceholderText('Mot de passe');
    expect(pw).toHaveAttribute('type', 'password');
  });

  it('password becomes visible after toggle', () => {
    renderWithRouter(<Login />);
    const toggle = screen.getByRole('button', { name: /afficher le mot de passe/i });
    fireEvent.click(toggle);
    const pw = screen.getByPlaceholderText('Mot de passe');
    expect(pw).toHaveAttribute('type', 'text');
  });

  it('forgot password link points to /forgot-password', () => {
    renderWithRouter(<Login />);
    const link = screen.getByText('Mot de passe oublié ?').closest('a');
    expect(link).toHaveAttribute('href', '/forgot-password');
  });

  it('signup mode shows name field', () => {
    renderWithRouter(<Login />);
    fireEvent.click(screen.getByRole('button', { name: /s'inscrire/i }));
    expect(screen.getByPlaceholderText('Votre nom complet')).toBeInTheDocument();
  });

  it('signup mode shows confirm password field', () => {
    renderWithRouter(<Login />);
    fireEvent.click(screen.getByRole('button', { name: /s'inscrire/i }));
    expect(screen.getByPlaceholderText('Confirmer le mot de passe')).toBeInTheDocument();
  });

  it('login mode does not show name field', () => {
    renderWithRouter(<Login />);
    expect(screen.queryByPlaceholderText('Votre nom complet')).not.toBeInTheDocument();
  });

  it('login mode does not show confirm password', () => {
    renderWithRouter(<Login />);
    expect(screen.queryByPlaceholderText('Confirmer le mot de passe')).not.toBeInTheDocument();
  });

  it('renders ou divider between form and social buttons', () => {
    renderWithRouter(<Login />);
    expect(screen.getByText('ou par courriel')).toBeInTheDocument();
  });

  it('switching to signup then back restores login mode', () => {
    renderWithRouter(<Login />);
    fireEvent.click(screen.getByRole('button', { name: /s'inscrire/i }));
    expect(screen.getByText('Créer un compte')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /se connecter/i }));
    expect(screen.getByText('Bon retour parmi nous')).toBeInTheDocument();
  });
});
