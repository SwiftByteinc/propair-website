import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import fr from '../i18n/fr';
import en from '../i18n/en';

const translations = { fr, en };

const LanguageContext = createContext();

/**
 * Get a nested value from an object using a dot-notation path.
 * e.g. getNestedValue(obj, 'nav.home') => obj.nav.home
 */
function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      return localStorage.getItem('propair-lang') || 'fr';
    } catch {
      return 'fr';
    }
  });

  const setLang = useCallback((code) => {
    setLangState(code);
    try {
      localStorage.setItem('propair-lang', code);
    } catch {
      // localStorage unavailable
    }
    // Update html lang attribute
    document.documentElement.lang = code === 'fr' ? 'fr-CA' : 'en';
  }, []);

  const t = useCallback((key, replacements) => {
    const value = getNestedValue(translations[lang], key);
    if (value === undefined) {
      // Fallback to French, then to the key itself
      const fallback = getNestedValue(translations.fr, key);
      if (fallback === undefined) return key;
      return fallback;
    }
    if (replacements && typeof value === 'string') {
      return Object.entries(replacements).reduce(
        (str, [k, v]) => str.replace(new RegExp(`\\{${k}\\}`, 'g'), v),
        value
      );
    }
    return value;
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
