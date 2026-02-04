import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, User, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';

export default function Login() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, signIn, signUp, signInWithOAuth } = useAuth();

  const refCode = searchParams.get('ref');

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  // Safe referral storage using sessionStorage
  useEffect(() => {
    if (refCode) {
      sessionStorage.setItem('referral_code', refCode);
    }
  }, [refCode]);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/portal');
    }
  }, [user, navigate]);

  // --- VALIDATION LOGIC ---
  const validateForm = () => {
    // 1. Email Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return "Veuillez entrer une adresse email valide.";
    }

    // 2. Password Strength (Signup Only)
    if (!isLogin) {
      if (formData.password.length < 8) {
        return "Le mot de passe doit contenir au moins 8 caractères.";
      }

      if (formData.password !== formData.confirmPassword) {
        return "Les mots de passe ne correspondent pas.";
      }

      if (!formData.name.trim()) {
        return "Veuillez entrer votre nom complet.";
      }
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation pre-submit
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        // Sign in
        const { error } = await signIn(formData.email, formData.password);
        if (error) throw error;
        // Navigation handled by useEffect
      } else {
        // Sign up
        const storedRefCode = sessionStorage.getItem('referral_code');
        const { error } = await signUp(
          formData.email,
          formData.password,
          formData.name,
          storedRefCode
        );
        if (error) throw error;

        // Clean up
        sessionStorage.removeItem('referral_code');
        // Navigation handled by useEffect
      }
    } catch (err) {
      // Friendly error messages
      let msg = err.message;
      if (msg.includes('Invalid login credentials')) msg = "Email ou mot de passe incorrect.";
      if (msg.includes('already registered')) msg = "Cet email est déjà utilisé.";
      if (msg.includes('Email not confirmed')) msg = "Veuillez confirmer votre email.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setError('');
    setLoading(true);
    try {
      const { error } = await signInWithOAuth(provider, '/portal');
      if (error) throw error;
    } catch (err) {
      setError(err.message || 'Erreur de connexion sociale.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12 font-sans">
      <SEO
        title={isLogin ? "Connexion" : "Inscription"}
        canonical="/login"
        description="Connectez-vous ou créez votre compte ProPair. Accédez à votre espace entrepreneur ou client."
        noIndex={true}
      />

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

        {/* Referral Badge */}
        {refCode && (
          <div className="mb-6 p-4 bg-teal/10 border border-teal/20 rounded-xl flex items-start gap-3">
            <CheckCircle size={20} className="text-teal mt-0.5 shrink-0" />
            <p className="text-sm text-teal font-medium">
              Code de parrainage appliqué ! Créez votre compte pour en profiter.
            </p>
          </div>
        )}

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-primary mb-2">
            {isLogin ? 'Bon retour parmi nous' : 'Créer un compte'}
          </h1>
          <p className="text-muted text-sm">
            {isLogin
              ? 'Gérez vos chantiers et vos demandes.'
              : 'Rejoignez les entrepreneurs de Magog.'}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-600 text-sm"
          >
            <AlertCircle size={18} className="shrink-0" />
            {error}
          </motion.div>
        )}

        {/* SSO Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            onClick={() => handleSocialLogin('google')}
            disabled={loading}
            className="py-2.5 px-4 bg-white hover:bg-surface border border-border rounded-xl transition-colors flex items-center justify-center gap-2 text-sm font-medium text-primary disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin('apple')}
            disabled={loading}
            className="py-2.5 px-4 bg-primary hover:bg-primary/90 text-white rounded-xl transition-colors flex items-center justify-center gap-2 text-sm font-medium disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            Apple
          </button>
        </div>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-muted">ou avec email</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name field (signup only) */}
          {!isLogin && (
            <div>
              <div className="relative">
                <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Votre nom complet"
                  aria-label="Nom complet"
                  autoComplete="name"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-white text-primary placeholder-muted focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all"
                  required
                  disabled={loading}
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <div className="relative">
              <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Adresse email"
                aria-label="Adresse email"
                autoComplete="email"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-white text-primary placeholder-muted focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Mot de passe"
                aria-label="Mot de passe"
                autoComplete={isLogin ? "current-password" : "new-password"}
                className="w-full pl-11 pr-11 py-3 rounded-xl border border-border bg-white text-primary placeholder-muted focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-body"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {!isLogin && (
              <p className="text-xs text-muted mt-1.5 ml-1">Minimum 8 caractères</p>
            )}
          </div>

          {/* Confirm Password (signup only) */}
          {!isLogin && (
            <div>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Confirmer le mot de passe"
                  aria-label="Confirmer le mot de passe"
                  autoComplete="new-password"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-white text-primary placeholder-muted focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all"
                  required
                  disabled={loading}
                />
              </div>
            </div>
          )}

          {/* Forgot Password */}
          {isLogin && (
            <div className="text-right">
              <Link to="/forgot-password" className="text-sm text-teal hover:text-teal-dark">
                Mot de passe oublié ?
              </Link>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal hover:bg-teal-dark text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm shadow-teal/20"
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <>
                {isLogin ? 'Se connecter' : 'Créer mon compte'}
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Toggle Login/Signup */}
        <p className="text-center mt-8 text-muted text-sm">
          {isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setFormData({ email: '', password: '', name: '', confirmPassword: '' });
            }}
            className="ml-1 text-teal font-semibold hover:text-teal-dark"
            disabled={loading}
          >
            {isLogin ? "S'inscrire" : "Se connecter"}
          </button>
        </p>

        {/* Back to home */}
        <div className="text-center mt-8 pt-6 border-t border-border">
          <Link to="/" className="text-sm text-muted hover:text-body transition-colors">
            ← Retour à l'accueil
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
