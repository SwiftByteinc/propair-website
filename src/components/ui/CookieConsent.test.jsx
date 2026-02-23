import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CookieConsent from './CookieConsent';
import { LanguageProvider } from '../../context/LanguageContext';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }) => children,
}));

// Mock posthog-js
vi.mock('posthog-js', () => ({
  default: {
    opt_in_capturing: vi.fn(),
    opt_out_capturing: vi.fn(),
  },
}));

function Wrapper({ children }) {
  return (
    <MemoryRouter>
      <LanguageProvider>{children}</LanguageProvider>
    </MemoryRouter>
  );
}

describe('CookieConsent', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('does not show banner immediately', () => {
    render(<Wrapper><CookieConsent /></Wrapper>);
    expect(screen.queryByText(/vie privée/i)).not.toBeInTheDocument();
  });

  it('shows banner after 2 seconds on first visit', () => {
    render(<Wrapper><CookieConsent /></Wrapper>);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.getByText(/vie privée/i)).toBeInTheDocument();
    expect(screen.getByText('Accepter')).toBeInTheDocument();
    expect(screen.getByText('Refuser')).toBeInTheDocument();
  });

  it('does not show banner if consent was already given', () => {
    localStorage.setItem('propair-cookie-consent', 'accepted');

    render(<Wrapper><CookieConsent /></Wrapper>);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.queryByText(/vie privée/i)).not.toBeInTheDocument();
  });

  it('does not show banner if consent was declined', () => {
    localStorage.setItem('propair-cookie-consent', 'declined');

    render(<Wrapper><CookieConsent /></Wrapper>);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.queryByText(/vie privée/i)).not.toBeInTheDocument();
  });

  it('sets localStorage to accepted and hides banner on accept', async () => {
    const posthog = (await import('posthog-js')).default;
    render(<Wrapper><CookieConsent /></Wrapper>);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    fireEvent.click(screen.getByText('Accepter'));

    expect(localStorage.getItem('propair-cookie-consent')).toBe('accepted');
    expect(posthog.opt_in_capturing).toHaveBeenCalled();
    expect(screen.queryByText(/vie privée/i)).not.toBeInTheDocument();
  });

  it('sets localStorage to declined and hides banner on decline', async () => {
    const posthog = (await import('posthog-js')).default;
    render(<Wrapper><CookieConsent /></Wrapper>);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    fireEvent.click(screen.getByText('Refuser'));

    expect(localStorage.getItem('propair-cookie-consent')).toBe('declined');
    expect(posthog.opt_out_capturing).toHaveBeenCalled();
    expect(screen.queryByText(/vie privée/i)).not.toBeInTheDocument();
  });

  it('displays correct privacy message', () => {
    render(<Wrapper><CookieConsent /></Wrapper>);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.getByText(/cookies essentiels/i)).toBeInTheDocument();
    expect(screen.getByText(/aucune donnée n'est vendue/i)).toBeInTheDocument();
  });

  it('renders dialog with correct aria-label', () => {
    render(<Wrapper><CookieConsent /></Wrapper>);
    act(() => { vi.advanceTimersByTime(2000); });
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', 'Consentement aux cookies');
  });

  it('renders heading text', () => {
    render(<Wrapper><CookieConsent /></Wrapper>);
    act(() => { vi.advanceTimersByTime(2000); });
    expect(screen.getByText('Cookies & vie privée')).toBeInTheDocument();
  });

  it('does not show before 2 seconds', () => {
    render(<Wrapper><CookieConsent /></Wrapper>);
    act(() => { vi.advanceTimersByTime(1500); });
    expect(screen.queryByText(/vie privée/i)).not.toBeInTheDocument();
  });

  it('accept button is rendered as button element', () => {
    render(<Wrapper><CookieConsent /></Wrapper>);
    act(() => { vi.advanceTimersByTime(2000); });
    expect(screen.getByText('Accepter').tagName).toBe('BUTTON');
  });

  it('decline button is rendered as button element', () => {
    render(<Wrapper><CookieConsent /></Wrapper>);
    act(() => { vi.advanceTimersByTime(2000); });
    expect(screen.getByText('Refuser').tagName).toBe('BUTTON');
  });

  it('renders privacy policy link', () => {
    render(<Wrapper><CookieConsent /></Wrapper>);
    act(() => { vi.advanceTimersByTime(2000); });
    const link = screen.getByText('En savoir plus');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', '/privacy');
  });
});
