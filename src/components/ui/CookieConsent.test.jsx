import { render, screen, fireEvent, act } from '@testing-library/react';
import CookieConsent from './CookieConsent';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }) => children,
}));

describe('CookieConsent', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('does not show banner immediately', () => {
    render(<CookieConsent />);
    expect(screen.queryByText(/vie privée/i)).not.toBeInTheDocument();
  });

  it('shows banner after 2 seconds on first visit', () => {
    render(<CookieConsent />);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.getByText(/vie privée/i)).toBeInTheDocument();
    expect(screen.getByText('Accepter')).toBeInTheDocument();
    expect(screen.getByText('Refuser')).toBeInTheDocument();
  });

  it('does not show banner if consent was already given', () => {
    localStorage.setItem('propair-cookie-consent', 'accepted');

    render(<CookieConsent />);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.queryByText(/vie privée/i)).not.toBeInTheDocument();
  });

  it('does not show banner if consent was declined', () => {
    localStorage.setItem('propair-cookie-consent', 'declined');

    render(<CookieConsent />);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.queryByText(/vie privée/i)).not.toBeInTheDocument();
  });

  it('sets localStorage to accepted and hides banner on accept', () => {
    render(<CookieConsent />);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    fireEvent.click(screen.getByText('Accepter'));

    expect(localStorage.getItem('propair-cookie-consent')).toBe('accepted');
    expect(screen.queryByText(/vie privée/i)).not.toBeInTheDocument();
  });

  it('sets localStorage to declined and hides banner on decline', () => {
    render(<CookieConsent />);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    fireEvent.click(screen.getByText('Refuser'));

    expect(localStorage.getItem('propair-cookie-consent')).toBe('declined');
    expect(screen.queryByText(/vie privée/i)).not.toBeInTheDocument();
  });

  it('displays correct privacy message', () => {
    render(<CookieConsent />);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.getByText(/cookies essentiels/i)).toBeInTheDocument();
    expect(screen.getByText(/aucune donnée n'est vendue/i)).toBeInTheDocument();
  });
});
