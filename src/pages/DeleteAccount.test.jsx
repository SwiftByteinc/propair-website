import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DeleteAccount from './DeleteAccount';
import { LanguageProvider } from '../context/LanguageContext';

// Mock SEO component
vi.mock('../components/SEO', () => ({
  default: () => null,
}));

const renderPage = () => {
  return render(
    <LanguageProvider>
      <BrowserRouter>
        <DeleteAccount />
      </BrowserRouter>
    </LanguageProvider>
  );
};

describe('DeleteAccount Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders page heading', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: /supprimer mon compte/i })).toBeInTheDocument();
  });

  it('renders email input', () => {
    renderPage();
    expect(screen.getByPlaceholderText(/adresse courriel du compte/i)).toBeInTheDocument();
  });

  it('renders submit button', () => {
    renderPage();
    expect(screen.getByRole('button', { name: /demander la suppression/i })).toBeInTheDocument();
  });

  it('renders data deletion info section', () => {
    renderPage();
    expect(screen.getByText(/ce qui se passe quand vous supprimez/i)).toBeInTheDocument();
    expect(screen.getByText(/délai de grâce de 30 jours/i)).toBeInTheDocument();
    expect(screen.getByText(/loi 25 du québec/i)).toBeInTheDocument();
  });

  it('shows success state after form submission', () => {
    renderPage();
    const input = screen.getByPlaceholderText(/adresse courriel du compte/i);
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.submit(screen.getByRole('button', { name: /demander la suppression/i }).closest('form'));

    expect(screen.getByText(/demande envoyée/i)).toBeInTheDocument();
    expect(screen.getByText(/courriel de confirmation sous 48 heures/i)).toBeInTheDocument();
  });

  it('shows error for invalid email', () => {
    renderPage();
    const input = screen.getByPlaceholderText(/adresse courriel du compte/i);
    fireEvent.change(input, { target: { value: 'not-an-email' } });
    fireEvent.submit(screen.getByRole('button', { name: /demander la suppression/i }).closest('form'));

    expect(screen.getByText(/veuillez entrer une adresse courriel valide/i)).toBeInTheDocument();
  });

  it('has no links to other pages', () => {
    renderPage();
    const links = screen.queryAllByRole('link');
    expect(links).toHaveLength(0);
  });
});
