import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Trash2, Send, AlertCircle, Shield } from 'lucide-react';
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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12 font-sans">
      <SEO
        title={t('deleteAccountPage.title')}
        canonical="/delete-account"
        description={t('deleteAccountPage.seoDesc')}
      />
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Logo */}
        <Link to="/" className="flex justify-center mb-8">
          <img
            src="/images/logo_ProPair.jpg"
            alt="ProPair"
            width="120"
            height="56"
            className="h-12 w-auto"
          />
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 p-6 sm:p-8"
        >
          {sent ? (
            /* Success State */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-teal-700/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Send size={28} className="text-teal-700" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">
                {t('deleteAccountPage.successTitle')}
              </h1>
              <p className="text-slate-500 mb-4">
                {t('deleteAccountPage.successDesc')}
              </p>
              <p className="text-sm text-slate-400">
                {t('deleteAccountPage.successNote')}
              </p>

              <button
                onClick={() => {
                  setSent(false);
                  setEmail('');
                }}
                className="mt-6 text-teal-700 hover:text-teal-800 font-medium transition-colors text-sm"
              >
                {t('common.backToHomeArrow')}
              </button>
            </motion.div>
          ) : (
            /* Form */
            <>
              <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Trash2 size={28} className="text-red-600" />
              </div>

              <h1 className="text-2xl font-bold text-slate-900 text-center mb-2">
                {t('deleteAccountPage.title')}
              </h1>
              <p className="text-slate-500 text-center mb-6 text-sm">
                {t('deleteAccountPage.intro')}
              </p>

              {/* Error Message */}
              <div aria-live="polite" aria-atomic="true">
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-600 text-sm" role="alert">
                    <AlertCircle size={20} className="shrink-0" />
                    {error}
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Mail size={20} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    id="delete-email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('deleteAccountPage.emailPlaceholder')}
                    aria-label={t('deleteAccountPage.emailAriaLabel')}
                    autoComplete="email"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-500 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 outline-none transition-all"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-600/10 active:scale-[0.98]"
                >
                  {t('deleteAccountPage.submitBtn')}
                </button>
              </form>

              {/* Separator */}
              <div className="border-t border-slate-100 my-6" />

              {/* Info Section */}
              <div>
                <h2 className="text-sm font-semibold text-slate-900 mb-3">
                  {t('deleteAccountPage.infoTitle')}
                </h2>
                <ul className="space-y-2.5">
                  {t('deleteAccountPage.infoItems').map((item, i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-slate-600">
                      <span className="text-slate-300 mt-0.5 shrink-0">&bull;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Privacy Policy Link */}
              <div className="mt-6 pt-4 border-t border-slate-100">
                <Link
                  to="/site/privacy"
                  className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-teal-700 transition-colors"
                >
                  <Shield size={14} />
                  {t('deleteAccountPage.privacyLink')}
                </Link>
              </div>
            </>
          )}
        </motion.div>

        {/* Back to home */}
        {!sent && (
          <div className="text-center mt-8">
            <Link to="/" className="text-sm text-slate-500 hover:text-slate-600 transition-colors">
              {t('common.backToHomeArrow')}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
