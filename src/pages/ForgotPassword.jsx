import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Send, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });

      if (error) throw error;
      setSent(true);
    } catch (err) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12 font-sans">
      {/* Logo */}
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
          className="w-full bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 p-6 sm:p-8"
        >
          {/* Back to login */}
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-900 mb-6 text-sm transition-colors"
          >
            <ArrowLeft size={16} />
            Retour à la connexion
          </Link>

          {/* Title */}
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Mot de passe oublié ?
          </h1>
          <p className="text-slate-500 mb-8">
            Entrez votre courriel et nous vous enverrons un lien pour réinitialiser votre accès.
          </p>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-600 text-sm">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          {sent ? (
            /* Success State */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-teal-50 p-6 rounded-2xl border border-teal-100 text-center"
            >
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send size={28} className="text-teal-600" />
              </div>
              <h2 className="text-lg font-bold text-slate-900 mb-2">Lien envoyé !</h2>
              <p className="text-slate-500 mb-4">
                Vérifiez votre boîte de réception à<br />
                <span className="font-semibold text-slate-900">{email}</span>
              </p>
              <p className="text-sm text-slate-500">
                Cliquez sur le lien dans le courriel pour créer un nouveau mot de passe.
              </p>

              <button
                onClick={() => {
                  setSent(false);
                  setEmail('');
                }}
                className="mt-6 text-teal-600 hover:text-teal-700 font-medium transition-colors text-sm"
              >
                Utiliser une autre adresse
              </button>
            </motion.div>
          ) : (
            /* Form */
            <form onSubmit={handleReset} className="space-y-4">
              <div>
                <div className="relative">
                  <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nom@exemple.com"
                    aria-label="Adresse courriel"
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
                    Envoi en cours...
                  </>
                ) : (
                  'Envoyer le lien'
                )}
              </button>
            </form>
          )}
        </motion.div>

        {/* Back to home */}
        <div className="text-center mt-8">
          <Link to="/" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
