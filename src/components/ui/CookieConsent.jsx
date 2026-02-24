import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import posthog from 'posthog-js';
import { useLanguage } from '../../context/LanguageContext';
import { STORAGE_KEYS } from '../../lib/constants';

export default function CookieConsent() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEYS.COOKIE_CONSENT);
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleReset = () => {
      localStorage.removeItem(STORAGE_KEYS.COOKIE_CONSENT);
      setIsVisible(true);
    };
    window.addEventListener('cookie-consent-reset', handleReset);
    return () => window.removeEventListener('cookie-consent-reset', handleReset);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEYS.COOKIE_CONSENT, 'accepted');
    posthog.opt_in_capturing();
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(STORAGE_KEYS.COOKIE_CONSENT, 'declined');
    posthog.opt_out_capturing();
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div role="dialog" aria-label={t('cookie.ariaLabel')} className="max-w-4xl mx-auto bg-slate-900 text-white rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-700">
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2">{t('cookie.title')}</h3>
              <p className="text-slate-300 text-sm">
                {t('cookie.desc')}{' '}
                <Link to="/site/cookies" className="text-teal-400 hover:text-teal-300 underline underline-offset-2">
                  {t('cookie.learnMore')}
                </Link>
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleDecline}
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                {t('cookie.decline')}
              </button>
              <button
                onClick={handleAccept}
                className="px-6 py-2 bg-teal-700 hover:bg-teal-700/90 text-white rounded-xl font-semibold text-sm transition-colors shadow-lg shadow-teal-700/20"
              >
                {t('cookie.accept')}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
