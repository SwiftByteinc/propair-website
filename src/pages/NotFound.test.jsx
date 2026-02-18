import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from './NotFound';
import { LanguageProvider } from '../context/LanguageContext';

// Mock SEO component
vi.mock('../components/SEO', () => ({
  default: () => null,
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

function renderNotFound() {
  return render(
    <LanguageProvider><MemoryRouter>
      <NotFound />
    </MemoryRouter></LanguageProvider>
  );
}

describe('NotFound (404)', () => {
  it('renders 404 heading', () => {
    renderNotFound();

    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders error message', () => {
    renderNotFound();

    expect(screen.getByText('Page introuvable')).toBeInTheDocument();
    expect(screen.getByText(/la page que vous recherchez/i)).toBeInTheDocument();
  });

  it('has home link pointing to /', () => {
    renderNotFound();

    const homeLink = screen.getByText("Retour à l'accueil");
    expect(homeLink.closest('a')).toHaveAttribute('href', '/');
  });

  it('has back button that calls history.back', () => {
    const historyBackSpy = vi.spyOn(window.history, 'back').mockImplementation(() => {});

    renderNotFound();

    const backButton = screen.getByText('Page précédente');
    fireEvent.click(backButton);

    expect(historyBackSpy).toHaveBeenCalledTimes(1);
    historyBackSpy.mockRestore();
  });

  it('renders both action buttons', () => {
    renderNotFound();

    expect(screen.getByText("Retour à l'accueil")).toBeInTheDocument();
    expect(screen.getByText('Page précédente')).toBeInTheDocument();
  });

  it('renders 404 as large heading', () => {
    renderNotFound();
    const heading = screen.getByText('404');
    expect(heading.tagName).toBe('H1');
  });

  it('renders Page introuvable as h2', () => {
    renderNotFound();
    const sub = screen.getByText('Page introuvable');
    expect(sub.tagName).toBe('H2');
  });

  it('renders description text', () => {
    renderNotFound();
    expect(screen.getByText(/a été déplacée/)).toBeInTheDocument();
  });

  it('home link uses Link component with correct destination', () => {
    renderNotFound();
    const link = screen.getByText("Retour à l'accueil").closest('a');
    expect(link).toHaveAttribute('href', '/');
  });

  it('back button is a button element', () => {
    renderNotFound();
    const btn = screen.getByText('Page précédente');
    expect(btn.tagName).toBe('BUTTON');
  });
});
