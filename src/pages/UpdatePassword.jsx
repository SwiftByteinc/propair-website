import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, ArrowRight, Check, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

export default function UpdatePassword() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isValidLink, setIsValidLink] = useState(false);
  const [checkingLink, setCheckingLink] = useState(true);
  const redirectTimer = useRef(null);

  // Cleanup redirect timer on unmount
  useEffect(() => {
    return () => {
      if (redirectTimer.current) clearTimeout(redirectTimer.current);
    };
  }, []);

  // Check if user arrived via password reset link (has access_token in URL)
  useEffect(() => {
    const checkResetLink = async () => {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get('access_token');
      const type = hashParams.get('type');

      if (accessToken && type === 'recovery') {
        setIsValidLink(true);
      } else if (supabase) {
        // Check if there's an active session (user might have already clicked the link)
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setIsValidLink(true);
        }
      }
      setCheckingLink(false);
    };

    checkResetLink();
  }, []);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError(t('updatePassword.passwordMismatch'));
      return;
    }

    if (password.length < 8) {
      setError(t('updatePassword.passwordTooShort'));
      return;
    }

    setLoading(true);

    try {
      if (!supabase) throw new Error(t('updatePassword.serviceUnavailable'));
      const { error } = await supabase.auth.updateUser({ password });

      if (error) throw error;

      setSuccess(true);

      // Redirect to login after 3 seconds
      redirectTimer.current = setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err.message || t('updatePassword.genericError'));
    } finally {
      setLoading(false);
    }
  };

  // Checking link validity
  if (checkingLink) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12 font-sans">
        <SEO noIndex />
        <div className="text-center">
          <Loader2 size={32} className="animate-spin text-teal-600 mx-auto mb-4" />
          <p className="text-slate-500">{t('updatePassword.checkingLink')}</p>
        </div>
      </div>
    );
  }

  // Invalid or expired link
  if (!isValidLink) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12 font-sans">
        <SEO noIndex />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm flex flex-col items-center"
        >
          <Link to="/" className="flex justify-center mb-8">
            <img
              src="/images/logo_ProPair.jpg"
              alt="ProPair"
              width="120"
              height="56"
              className="h-12 w-auto"
            />
          </Link>

          <div className="w-full max-w-[420px] bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 p-6 sm:p-8 text-center">
            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle size={32} className="text-amber-600" />
            </div>

            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              {t('updatePassword.invalidLinkTitle')}
            </h1>
            <p className="text-slate-500 mb-8">
              {t('updatePassword.invalidLinkDesc')}
            </p>

            <Link
              to="/forgot-password"
              className="inline-flex items-center justify-center gap-2 w-full bg-slate-900 hover:bg-black text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-slate-900/10 active:scale-[0.98]"
            >
              {t('updatePassword.requestNewLink')}
              <ArrowRight size={18} />
            </Link>

            <div className="mt-6">
              <Link to="/login" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                {t('common.backToLoginArrow')}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12 font-sans">
      <SEO noIndex />
      <div className="w-full max-w-sm flex flex-col items-center">
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
          className="w-full max-w-[420px] bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 p-6 sm:p-8"
        >
          {/* Error Message */}
          <div aria-live="polite" aria-atomic="true">
            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-600 text-sm" role="alert">
                <AlertCircle size={18} />
                {error}
              </div>
            )}
          </div>

          {success ? (
            /* Success State */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={40} className="text-teal-600" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">
                {t('updatePassword.successTitle')}
              </h1>
              <p className="text-slate-500 mb-8">
                {t('updatePassword.successDesc')}<br />
                {t('updatePassword.redirecting')}
              </p>

              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 w-full bg-slate-900 hover:bg-black text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-slate-900/10 active:scale-[0.98]"
              >
                {t('updatePassword.loginBtn')}
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          ) : (
            /* Password Form */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Lock size={32} className="text-teal-600" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 text-center mb-2">
                {t('updatePassword.newPasswordTitle')}
              </h1>
              <p className="text-slate-500 text-center mb-8">
                {t('updatePassword.newPasswordDesc')}
              </p>

              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div>
                  <div className="relative">
                    <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t('updatePassword.newPasswordPlaceholder')}
                      aria-label={t('updatePassword.newPasswordAria')}
                      autoComplete="new-password"
                      className="w-full pl-11 pr-11 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 outline-none transition-all"
                      required
                      minLength={8}
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? t('updatePassword.hidePassword') : t('updatePassword.showPassword')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder={t('updatePassword.confirmPasswordPlaceholder')}
                      aria-label={t('updatePassword.confirmPasswordAria')}
                      autoComplete="new-password"
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
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>
                      {t('updatePassword.resetBtn')}
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          )}
        </motion.div>

        {/* Back to home */}
        {!success && (
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
