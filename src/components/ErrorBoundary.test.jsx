import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';

// Component that throws an error
function BrokenComponent() {
  throw new Error('Test error message');
}

function GoodComponent() {
  return <div>Working fine</div>;
}

function renderWithRouter(ui) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    // Suppress console.error for expected errors
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders children when no error occurs', () => {
    renderWithRouter(
      <ErrorBoundary>
        <GoodComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Working fine')).toBeInTheDocument();
  });

  it('renders error UI when a child component throws', () => {
    renderWithRouter(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText(/une erreur est survenue/i)).toBeInTheDocument();
  });

  it('shows refresh button in error state', () => {
    renderWithRouter(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Rafraîchir la page')).toBeInTheDocument();
  });

  it('shows home link in error state', () => {
    renderWithRouter(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    );

    const homeLink = screen.getByText("Retour à l'accueil");
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.closest('a')).toHaveAttribute('href', '/');
  });

  it('shows error description message', () => {
    renderWithRouter(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText(/veuillez rafraîchir la page/i)).toBeInTheDocument();
  });

  it('home link uses <a> tag not <Link>', () => {
    renderWithRouter(
      <ErrorBoundary><BrokenComponent /></ErrorBoundary>
    );
    const link = screen.getByText("Retour à l'accueil").closest('a');
    expect(link.tagName).toBe('A');
  });

  it('does not show error UI for working components', () => {
    renderWithRouter(
      <ErrorBoundary><GoodComponent /></ErrorBoundary>
    );
    expect(screen.queryByText(/une erreur est survenue/i)).not.toBeInTheDocument();
  });

  it('renders multiple children when no error', () => {
    renderWithRouter(
      <ErrorBoundary>
        <div>Child 1</div>
        <div>Child 2</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });

  it('catches error from deeply nested component', () => {
    function DeepBroken() {
      return <div><BrokenComponent /></div>;
    }
    renderWithRouter(
      <ErrorBoundary><DeepBroken /></ErrorBoundary>
    );
    expect(screen.getByText(/une erreur est survenue/i)).toBeInTheDocument();
  });

  it('refresh button is a button element', () => {
    renderWithRouter(
      <ErrorBoundary><BrokenComponent /></ErrorBoundary>
    );
    const btn = screen.getByText('Rafraîchir la page');
    expect(btn.closest('button')).toBeInTheDocument();
  });
});
