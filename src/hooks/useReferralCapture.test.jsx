import { renderHook } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useReferralCapture, getStoredReferralCode, clearStoredReferralCode } from './useReferralCapture';

function createWrapper(initialEntries = ['/']) {
  return function Wrapper({ children }) {
    return <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>;
  };
}

describe('useReferralCapture', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('captures ref__ parameter and stores in localStorage', () => {
    renderHook(() => useReferralCapture(), {
      wrapper: createWrapper(['/?ref__=ABCDE12345']),
    });

    expect(localStorage.getItem('propair_referral_code')).toBe('ABCDE12345');
  });

  it('captures ref parameter for backwards compatibility', () => {
    renderHook(() => useReferralCapture(), {
      wrapper: createWrapper(['/?ref=LEGACY_CODE']),
    });

    expect(localStorage.getItem('propair_referral_code')).toBe('LEGACY_CODE');
  });

  it('prefers ref__ over ref when both are present', () => {
    renderHook(() => useReferralCapture(), {
      wrapper: createWrapper(['/?ref__=PRIMARY&ref=FALLBACK']),
    });

    expect(localStorage.getItem('propair_referral_code')).toBe('PRIMARY');
  });

  it('rejects codes shorter than 5 characters', () => {
    renderHook(() => useReferralCapture(), {
      wrapper: createWrapper(['/?ref__=AB12']),
    });

    expect(localStorage.getItem('propair_referral_code')).toBeNull();
  });

  it('rejects codes longer than 50 characters', () => {
    const longCode = 'A'.repeat(51);
    renderHook(() => useReferralCapture(), {
      wrapper: createWrapper([`/?ref__=${longCode}`]),
    });

    expect(localStorage.getItem('propair_referral_code')).toBeNull();
  });

  it('rejects codes with special characters', () => {
    renderHook(() => useReferralCapture(), {
      wrapper: createWrapper(['/?ref__=HACK%3Cscript%3E']),
    });

    expect(localStorage.getItem('propair_referral_code')).toBeNull();
  });

  it('accepts alphanumeric codes with underscores and hyphens', () => {
    renderHook(() => useReferralCapture(), {
      wrapper: createWrapper(['/?ref__=Valid_Code-123']),
    });

    expect(localStorage.getItem('propair_referral_code')).toBe('Valid_Code-123');
  });

  it('does nothing when no ref param is present', () => {
    renderHook(() => useReferralCapture(), {
      wrapper: createWrapper(['/pricing?utm=test']),
    });

    expect(localStorage.getItem('propair_referral_code')).toBeNull();
  });
});

describe('getStoredReferralCode', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns stored code from localStorage', () => {
    localStorage.setItem('propair_referral_code', 'MY_CODE');
    expect(getStoredReferralCode()).toBe('MY_CODE');
  });

  it('returns null when no code is stored', () => {
    expect(getStoredReferralCode()).toBeNull();
  });
});

describe('clearStoredReferralCode', () => {
  beforeEach(() => {
    localStorage.setItem('propair_referral_code', 'CODE');
    sessionStorage.setItem('referral_code', 'CODE');
    sessionStorage.setItem('pending_referral', '{"code":"CODE"}');
  });

  it('clears all referral data from localStorage and sessionStorage', () => {
    clearStoredReferralCode();

    expect(localStorage.getItem('propair_referral_code')).toBeNull();
    expect(sessionStorage.getItem('referral_code')).toBeNull();
    expect(sessionStorage.getItem('pending_referral')).toBeNull();
  });
});
