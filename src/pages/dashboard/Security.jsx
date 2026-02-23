import { useState, useEffect, useRef } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Trash2,
  ChevronDown,
  Loader2
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useToast } from '../../context/ToastContext';
import { useLanguage } from '../../context/LanguageContext';


export default function Security() {
  const { t } = useLanguage();
  const { user } = useOutletContext();
  const navigate = useNavigate();
  const toast = useToast();
  const modalRef = useRef(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  // Real verification status from Supabase auth metadata
  const verification = {
    email: {
      verified: !!user?.email_confirmed_at,
      value: user?.email || t('dashboard.notProvided')
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!passwords.current) {
      setError(t('dashboard.errorCurrentRequired'));
      return;
    }
    if (passwords.new !== passwords.confirm) {
      setError(t('dashboard.errorPasswordMismatch'));
      return;
    }
    if (passwords.new.length < 8) {
      setError(t('dashboard.errorPasswordShort'));
      return;
    }

    setLoading(true);
    try {
      if (!supabase) throw new Error(t('dashboard.serviceUnavailable'));
      // Verify current password first by re-authenticating
      const { error: verifyError } = await supabase.auth.signInWithPassword({
        email: user?.email,
        password: passwords.current
      });

      if (verifyError) {
        setError(t('dashboard.errorCurrentIncorrect'));
        setLoading(false);
        return;
      }

      const { error } = await supabase.auth.updateUser({
        password: passwords.new
      });

      if (error) {
        setError(error.message);
      } else {
        toast.success(t('dashboard.successPasswordChanged'));
        setPasswords({ current: '', new: '', confirm: '' });
        setShowPasswordForm(false);
      }
    } catch {
      setError(t('dashboard.errorGeneric'));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true);
      if (!supabase) throw new Error(t('dashboard.serviceUnavailable'));

      // Appel à l'Edge Function sécurisée pour suppression RGPD
      const { error } = await supabase.functions.invoke('delete-user-account');

      if (error) throw error;

      // Déconnexion locale et redirection
      await supabase.auth.signOut();
      navigate('/');

    } catch (error) {
      if (import.meta.env.DEV) console.error('Erreur suppression:', error);
      toast.error(t('dashboard.deleteError'));
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-4xl">
      <Helmet><title>{t('dashboard.securityTitle')}</title></Helmet>
      {/* Header */}
      <header className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl sm:text-2xl font-bold text-slate-900"
        >
          {t('dashboard.securityHeading')}
        </motion.h1>
        <p className="text-slate-500 mt-1">
          {t('dashboard.securitySubtitle')}
        </p>
      </header>

      <div className="space-y-4">
        {/* Verification Badges - Compact */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-md shadow-slate-200/40 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-slate-50 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
              <Shield size={16} className="text-slate-500" />
            </div>
            <h2 className="font-semibold text-slate-900">{t('dashboard.verifications')}</h2>
          </div>

          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail size={20} className="text-slate-500" />
              <div>
                <p className="text-sm font-medium text-slate-900">{t('dashboard.emailLabel')}</p>
                <p className="text-xs text-slate-500">{verification.email.value}</p>
              </div>
            </div>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              verification.email.verified
                ? 'bg-teal-700/10 text-teal-700'
                : 'bg-amber-50 text-amber-600'
            }`}>
              {verification.email.verified ? t('dashboard.verified') : t('dashboard.notVerified')}
            </span>
          </div>
        </motion.section>

        {/* Password - Collapsible */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-md shadow-slate-200/40 overflow-hidden"
        >
          <button
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700/30 focus-visible:ring-offset-2"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                <Lock size={16} className="text-slate-500" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-slate-900">{t('dashboard.password')}</p>
                <p className="text-xs text-slate-500">{t('dashboard.changePassword')}</p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: showPasswordForm ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={20} className="text-slate-500" />
            </motion.div>
          </button>

          <AnimatePresence>
            {showPasswordForm && (
              <motion.form
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onSubmit={handlePasswordChange}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 pt-2 space-y-4 border-t border-slate-50">
                  {/* Error/Success Messages */}
                  <div aria-live="polite" aria-atomic="true">
                    {error && (
                      <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600" role="alert">
                        {error}
                      </div>
                    )}
                    {success && (
                      <div className="p-3 bg-teal-700/10 border border-teal-700/20 rounded-lg text-sm text-teal-700" role="status">
                        {success}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1.5">
                      {t('dashboard.currentPassword')}
                    </label>
                    <input
                      type="password"
                      value={passwords.current}
                      onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 text-sm transition-all"
                      placeholder="••••••••"
                      autoComplete="current-password"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1.5">
                        {t('dashboard.newPassword')}
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={passwords.new}
                          onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 text-sm transition-all pr-10"
                          placeholder={t('dashboard.minCharsPlaceholder')}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={showPassword ? t('dashboard.hidePassword') : t('dashboard.showPassword')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700/30 rounded"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1.5">
                        {t('dashboard.confirmLabel')}
                      </label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={passwords.confirm}
                        onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 text-sm transition-all"
                        placeholder="••••••••"
                        autoComplete="new-password"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-slate-900 text-white rounded-xl font-semibold text-sm hover:bg-black transition-colors disabled:opacity-50 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700/30 focus-visible:ring-offset-2 active:scale-[0.98]"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        {t('dashboard.updating')}
                      </>
                    ) : (
                      t('dashboard.updateBtn')
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.section>

        {/* Danger Zone - Compact */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-md shadow-slate-200/40 overflow-hidden"
        >
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                <Trash2 size={16} className="text-red-500" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">{t('dashboard.deleteAccount')}</p>
                <p className="text-xs text-slate-500">{t('dashboard.irreversibleAction')}</p>
              </div>
            </div>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="text-xs font-semibold text-red-500 hover:text-red-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
            >
              {t('dashboard.deleteBtn')}
            </button>
          </div>
        </motion.section>

        {/* RGPD Notice - Minimal */}
        <p className="text-xs text-slate-500 text-center pt-4">
          {t('dashboard.rgpdNotice')}
        </p>
      </div>

      {/* Delete Modal with focus trap */}
      {showDeleteModal && (
        <DeleteModal
          modalRef={modalRef}
          isDeleting={isDeleting}
          onClose={() => setShowDeleteModal(false)}
          onDelete={handleDeleteAccount}
          t={t}
        />
      )}
    </div>
  );
}

function DeleteModal({ modalRef, isDeleting, onClose, onDelete, t }) {
  // Focus trap: keep focus inside modal
  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    const focusableEls = modal.querySelectorAll('button:not([disabled])');
    if (focusableEls.length === 0) return;
    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];

    firstEl.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl?.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl?.focus();
        }
      }
    };

    modal.addEventListener('keydown', handleKeyDown);
    return () => modal.removeEventListener('keydown', handleKeyDown);
  }, [modalRef, onClose, isDeleting]);

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        ref={modalRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-title"
        aria-describedby="delete-desc"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl max-w-sm w-full p-6"
      >
        <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
          <Trash2 size={24} />
        </div>
        <h3 id="delete-title" className="text-lg font-semibold text-center text-slate-900 mb-2">
          {t('dashboard.deleteModalTitle')}
        </h3>
        <p id="delete-desc" className="text-center text-sm text-slate-500 mb-6">
          {t('dashboard.deleteModalDesc')}
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700/30 active:scale-[0.98]"
          >
            {t('dashboard.cancelBtn')}
          </button>
          <button
            onClick={onDelete}
            disabled={isDeleting}
            className="flex-1 py-3 bg-red-600 text-white rounded-xl font-semibold text-sm hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 active:scale-[0.98]"
          >
            {isDeleting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                {t('dashboard.deleting')}
              </>
            ) : (
              t('dashboard.deleteBtn')
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
