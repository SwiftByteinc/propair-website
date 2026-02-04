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
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <Link to="/" className="flex justify-center mb-8">
          <img
            src="/images/logo_ProPair.jpg"
            alt="ProPair"
            className="h-12 w-auto"
          />
        </Link>

        {/* Back to login */}
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-muted hover:text-primary mb-6 text-sm transition-colors"
        >
          <ArrowLeft size={16} />
          Retour à la connexion
        </Link>

        {/* Title */}
        <h1 className="text-2xl font-bold text-primary mb-2">
          Mot de passe oublié ?
        </h1>
        <p className="text-muted mb-8">
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
            className="bg-teal/10 p-6 rounded-2xl border border-teal/20 text-center"
          >
            <div className="w-16 h-16 bg-teal/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send size={28} className="text-teal" />
            </div>
            <h2 className="text-lg font-bold text-primary mb-2">Lien envoyé !</h2>
            <p className="text-muted mb-4">
              Vérifiez votre boîte de réception à<br />
              <span className="font-semibold text-primary">{email}</span>
            </p>
            <p className="text-sm text-muted">
              Cliquez sur le lien dans l'email pour créer un nouveau mot de passe.
            </p>

            <button
              onClick={() => {
                setSent(false);
                setEmail('');
              }}
              className="mt-6 text-teal hover:text-teal-dark font-medium transition-colors text-sm"
            >
              Utiliser une autre adresse
            </button>
          </motion.div>
        ) : (
          /* Form */
          <form onSubmit={handleReset} className="space-y-4">
            <div>
              <div className="relative">
                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@courriel.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-white text-primary placeholder-muted focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal hover:bg-teal-dark text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
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

        {/* Back to home */}
        <div className="text-center mt-8">
          <Link to="/" className="text-sm text-muted hover:text-body">
            ← Retour à l'accueil
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
