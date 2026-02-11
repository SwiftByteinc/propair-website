import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, ArrowRight, Check, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function UpdatePassword() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isValidLink, setIsValidLink] = useState(false);
  const [checkingLink, setCheckingLink] = useState(true);

  // Check if user arrived via password reset link (has access_token in URL)
  useEffect(() => {
    const checkResetLink = async () => {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get('access_token');
      const type = hashParams.get('type');

      if (accessToken && type === 'recovery') {
        setIsValidLink(true);
      } else {
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
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) throw error;

      setSuccess(true);

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  // Checking link validity
  if (checkingLink) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12 font-sans">
        <div className="text-center">
          <Loader2 size={32} className="animate-spin text-teal-600 mx-auto mb-4" />
          <p className="text-slate-500">Vérification du lien...</p>
        </div>
      </div>
    );
  }

  // Invalid or expired link
  if (!isValidLink) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12 font-sans">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm flex flex-col items-center"
        >
          <Link to="/" className="flex justify-center mb-8">
            <img
              src="/images/logo_ProPair.jpg"
              alt="ProPair"
              className="h-12 w-auto"
            />
          </Link>

          <div className="w-full max-w-[420px] bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 p-6 sm:p-8 text-center">
            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle size={32} className="text-amber-500" />
            </div>

            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Lien invalide ou expiré
            </h1>
            <p className="text-slate-500 mb-8">
              Ce lien de réinitialisation n'est plus valide. Veuillez demander un nouveau lien.
            </p>

            <Link
              to="/forgot-password"
              className="inline-flex items-center justify-center gap-2 w-full bg-black hover:bg-slate-800 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-slate-900/10 active:scale-[0.98]"
            >
              Demander un nouveau lien
              <ArrowRight size={18} />
            </Link>

            <div className="mt-6">
              <Link to="/login" className="text-sm text-slate-400 hover:text-slate-900 transition-colors">
                ← Retour à la connexion
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12 font-sans">
      <div className="w-full max-w-sm flex flex-col items-center">
        {/* Logo */}
        <Link to="/" className="flex justify-center mb-8">
          <img
            src="/images/logo_ProPair.jpg"
            alt="ProPair"
            className="h-12 w-auto"
          />
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-[420px] bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 p-6 sm:p-8"
        >
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-600 text-sm">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

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
                Mot de passe mis à jour !
              </h1>
              <p className="text-slate-500 mb-8">
                Votre mot de passe a été réinitialisé avec succès.<br />
                Redirection vers la connexion...
              </p>

              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 w-full bg-black hover:bg-slate-800 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-slate-900/10 active:scale-[0.98]"
              >
                Se connecter
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
                Nouveau mot de passe
              </h1>
              <p className="text-slate-500 text-center mb-8">
                Créez un nouveau mot de passe sécurisé pour votre compte.
              </p>

              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div>
                  <div className="relative">
                    <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Nouveau mot de passe"
                      aria-label="Nouveau mot de passe"
                      autoComplete="new-password"
                      className="w-full pl-11 pr-11 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 outline-none transition-all"
                      required
                      minLength={8}
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirmer le mot de passe"
                      aria-label="Confirmer le mot de passe"
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
                  className="w-full bg-black hover:bg-slate-800 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-slate-900/10 active:scale-[0.98]"
                >
                  {loading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>
                      Réinitialiser le mot de passe
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
            <Link to="/" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">
              ← Retour à l'accueil
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
