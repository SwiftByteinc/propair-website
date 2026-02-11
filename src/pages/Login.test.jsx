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
    expect(screen.getByPlaceholderText('Adresse email')).toBeInTheDocument();
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

    const emailInput = screen.getByPlaceholderText('Adresse email');
    const passwordInput = screen.getByPlaceholderText('Mot de passe');

    // Type in email
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput).toHaveValue('test@example.com');

    // Type in password
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput).toHaveValue('password123');
  });
});
