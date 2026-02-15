import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const REFERRAL_KEY = 'propair_referral_code';

/**
 * Hook à appeler dans le Router — capture le param ?ref__= depuis n'importe quelle page
 * et le stocke dans localStorage (survit aux sessions).
 * Supporte aussi ?ref= pour la rétrocompatibilité.
 */
export function useReferralCapture() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('ref__') || searchParams.get('ref');
    if (code && code.length >= 5) {
      localStorage.setItem(REFERRAL_KEY, code);
    }
  }, [searchParams]);
}

/** Lit le code de parrainage stocké */
export function getStoredReferralCode() {
  return localStorage.getItem(REFERRAL_KEY);
}

/** Supprime le code après traitement */
export function clearStoredReferralCode() {
  localStorage.removeItem(REFERRAL_KEY);
  sessionStorage.removeItem('referral_code');
  sessionStorage.removeItem('pending_referral');
}
