import { useState } from 'react';
import { usePostHog } from '@posthog/react';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

export default function DeleteAccount() {
  const { t } = useLanguage();
  const posthog = usePostHog();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(t('deleteAccountPage.invalidEmail'));
      return;
    }

    posthog?.capture('delete_account_requested', { email_domain: email.split('@')[1] });

    const subject = encodeURIComponent('Account Deletion Request / Demande de suppression de compte');
    const body = encodeURIComponent(
      `Account email / Courriel du compte : ${email}\n\nI would like to request the deletion of my ProPair account and all associated data.\n\nJe souhaite demander la suppression de mon compte ProPair et de toutes les données associées.`
    );
    window.location.href = `mailto:privacy@propairapp.com?subject=${subject}&body=${body}`;

    setSent(true);
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-8">
      <SEO
        title={t('deleteAccountPage.title')}
        canonical="/delete-account"
        description={t('deleteAccountPage.seoDesc')}
      />
      <article className="max-w-3xl mx-auto text-sm text-slate-800 leading-relaxed font-serif">
        <h1 className="text-xl font-bold text-center mb-1 uppercase tracking-wide">
          {t('deleteAccountPage.title')}
        </h1>
        <p className="text-center text-xs text-slate-500 mb-8">ProPair — privacy@propairapp.com</p>

        {sent ? (
          <section className="mb-6">
            <h2 className="font-bold mb-1">{t('deleteAccountPage.successTitle')}</h2>
            <p className="mb-2">{t('deleteAccountPage.successDesc')}</p>
            <p className="mb-4 text-xs italic">{t('deleteAccountPage.successNote')}</p>
            <button
              onClick={() => {
                setSent(false);
                setEmail('');
              }}
              className="text-sm underline text-slate-600 hover:text-slate-900"
            >
              {t('deleteAccountPage.submitBtn')}
            </button>
          </section>
        ) : (
          <>
            <section className="mb-6">
              <h2 className="font-bold mb-1">1. {t('deleteAccountPage.infoTitle')}</h2>
              <ul className="list-disc pl-5 mb-2 space-y-1">
                {t('deleteAccountPage.infoItems').map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="font-bold mb-1">2. {t('deleteAccountPage.submitBtn')}</h2>
              <p className="mb-3">{t('deleteAccountPage.intro')}</p>

              <div aria-live="polite" aria-atomic="true">
                {error && (
                  <p className="mb-3 text-red-600 text-sm" role="alert">{error}</p>
                )}
              </div>

              <form onSubmit={handleSubmit}>
                <label htmlFor="delete-email" className="block font-bold mb-1">
                  {t('deleteAccountPage.emailAriaLabel')}
                </label>
                <input
                  type="email"
                  id="delete-email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('deleteAccountPage.emailPlaceholder')}
                  autoComplete="email"
                  className="w-full px-3 py-2 border border-slate-300 rounded text-sm font-sans text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:outline-none mb-3"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-800 text-white text-sm font-sans rounded hover:bg-slate-900 transition-colors"
                >
                  {t('deleteAccountPage.submitBtn')}
                </button>
              </form>
            </section>
          </>
        )}
      </article>
    </div>
  );
}
