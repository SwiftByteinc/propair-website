import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Send, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

export default function ForgotPassword() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!supabase) throw new Error(t('forgotPassword.serviceUnavailable'));
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });

      if (error) throw error;
      setSent(true);
    } catch (err) {
      setError(err.message || t('forgotPassword.genericError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12 font-sans">
      <SEO noIndex />
      <div className="w-full max-w-sm flex flex-col items-center">
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
          className="w-full bg-white rounded-2xl sm:rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 p-6 sm:p-8"
        >
          {/* Back to login */}
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-6 text-sm transition-colors"
          >
            <ArrowLeft size={16} />
            {t('common.backToLogin')}
          </Link>

          {/* Title */}
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            {t('forgotPassword.title')}
          </h1>
          <p className="text-slate-500 mb-8">
            {t('forgotPassword.desc')}
          </p>

          {/* Error Message */}
          <div aria-live="polite" aria-atomic="true">
            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-600 text-sm" role="alert">
                <AlertCircle size={18} />
                {error}
              </div>
            )}
          </div>

          {sent ? (
            /* Success State */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-cyan-50 p-6 rounded-2xl border border-cyan-100 text-center"
            >
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send size={28} className="text-cyan-600" />
              </div>
              <h2 className="text-lg font-semibold text-slate-900 mb-2">{t('forgotPassword.sentTitle')}</h2>
              <p className="text-slate-500 mb-4">
                {t('forgotPassword.sentDesc1')}<br />
                <span className="font-semibold text-slate-900">{email}</span>
              </p>
              <p className="text-sm text-slate-500">
                {t('forgotPassword.sentDesc2')}
              </p>

              <button
                onClick={() => {
                  setSent(false);
                  setEmail('');
                }}
                className="mt-6 text-cyan-600 hover:text-cyan-700 font-medium transition-colors text-sm"
              >
                {t('forgotPassword.useAnother')}
              </button>
            </motion.div>
          ) : (
            /* Form */
            <form onSubmit={handleReset} className="space-y-4">
              <div>
                <div className="relative">
                  <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nom@exemple.com"
                    aria-label={t('forgotPassword.emailAria')}
                    autoComplete="email"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 outline-none transition-all"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 hover:bg-black text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-slate-900/10 active:scale-[0.98]"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    {t('forgotPassword.sending')}
                  </>
                ) : (
                  t('forgotPassword.sendLink')
                )}
              </button>
            </form>
          )}
        </motion.div>

        {/* Back to home */}
        <div className="text-center mt-8">
          <Link to="/" className="text-sm text-slate-500 hover:text-slate-600 transition-colors">
            {t('common.backToHomeArrow')}
          </Link>
        </div>
      </div>
    </div>
  );
}
