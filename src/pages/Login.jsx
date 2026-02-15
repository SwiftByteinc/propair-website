import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, User, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getStoredReferralCode } from '../hooks/useReferralCapture';
import SEO from '../components/SEO';

export default function Login() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, signIn, signUp, signInWithOAuth } = useAuth();

  // Support both ?ref__= and ?ref= (rétrocompatibilité)
  const refCode = searchParams.get('ref__') || searchParams.get('ref');

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

  // Le capture global (useReferralCapture dans App.jsx) gère le stockage localStorage.
  // Ici on stocke aussi en sessionStorage pour rétrocompatibilité.
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return "Veuillez entrer une adresse email valide.";
    }

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

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password);
        if (error) throw error;
      } else {
        const storedRefCode = sessionStorage.getItem('referral_code') || getStoredReferralCode();
        const { error } = await signUp(
          formData.email,
          formData.password,
          formData.name,
          storedRefCode
        );
        if (error) throw error;
        sessionStorage.removeItem('referral_code');
      }
    } catch (err) {
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

  const inputClass = "w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 outline-none transition-all text-sm";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-8 sm:py-12 font-sans">
      <SEO
        title={isLogin ? "Connexion" : "Inscription"}
        canonical="/login"
        description="Connectez-vous ou créez votre compte ProPair. Accédez à votre espace entrepreneur ou client."
        noIndex={true}
      />

      {/* Logo */}
      <Link to="/" className="mb-8 sm:mb-10">
        <img
          src="/images/logo_ProPair.jpg"
          alt="ProPair"
          className="h-12 sm:h-14 w-auto"
        />
      </Link>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-[420px] bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 p-6 sm:p-8"
      >
        {/* Referral Badge */}
        {(refCode || getStoredReferralCode()) && (
          <div className="mb-6 p-3.5 bg-teal-50 border border-teal-100 rounded-xl flex items-start gap-3">
            <CheckCircle size={18} className="text-teal-600 mt-0.5 shrink-0" />
            <p className="text-sm text-teal-700 font-medium">
              Code de parrainage appliqué ! Créez votre compte pour en profiter.
            </p>
          </div>
        )}

        {/* Title */}
        <div className="text-center mb-7">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1.5">
            {isLogin ? 'Bon retour parmi nous' : 'Créer un compte'}
          </h1>
          <p className="text-slate-500 text-sm">
            {isLogin
              ? 'Gérez vos chantiers et vos demandes.'
              : 'Rejoignez les entrepreneurs de Magog.'}
          </p>
        </div>

        {/* Error Message */}
        <div aria-live="polite" aria-atomic="true">
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-5 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2.5 text-red-600 text-sm"
              role="alert"
            >
              <AlertCircle size={16} className="shrink-0" />
              {error}
            </motion.div>
          )}
        </div>

        {/* SSO Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            onClick={() => handleSocialLogin('google')}
            disabled={loading}
            className="py-3 px-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all flex items-center justify-center gap-2.5 text-sm font-medium text-slate-700 disabled:opacity-50 active:scale-[0.98]"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
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
            className="py-3 px-4 bg-black hover:bg-slate-800 text-white rounded-xl transition-all flex items-center justify-center gap-2.5 text-sm font-medium disabled:opacity-50 active:scale-[0.98]"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            Apple
          </button>
        </div>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-3 bg-white text-slate-400 uppercase tracking-wider font-medium">ou par email</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Name field (signup only) */}
          {!isLogin && (
            <div className="relative">
              <User size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Votre nom complet"
                aria-label="Nom complet"
                autoComplete="name"
                className={inputClass}
                required
                disabled={loading}
              />
            </div>
          )}

          {/* Email */}
          <div className="relative">
            <Mail size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Adresse email"
              aria-label="Adresse email"
              autoComplete="email"
              className={inputClass}
              required
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <Lock size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Mot de passe"
                aria-label="Mot de passe"
                autoComplete={isLogin ? "current-password" : "new-password"}
                className="w-full pl-11 pr-11 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 outline-none transition-all text-sm"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
            {!isLogin && (
              <p className="text-xs text-slate-400 mt-1.5 ml-1">Minimum 8 caractères</p>
            )}
          </div>

          {/* Confirm Password (signup only) */}
          {!isLogin && (
            <div className="relative">
              <Lock size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="Confirmer le mot de passe"
                aria-label="Confirmer le mot de passe"
                autoComplete="new-password"
                className={inputClass}
                required
                disabled={loading}
              />
            </div>
          )}

          {/* Forgot Password */}
          {isLogin && (
            <div className="text-right">
              <Link to="/forgot-password" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                Mot de passe oublié ?
              </Link>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black hover:bg-slate-800 text-white font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-slate-900/10 active:scale-[0.98] mt-2"
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <>
                {isLogin ? 'Se connecter' : 'Créer mon compte'}
                <ArrowRight size={17} />
              </>
            )}
          </button>
        </form>

        {/* Toggle Login/Signup */}
        <p className="text-center mt-6 text-slate-500 text-sm">
          {isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setFormData({ email: '', password: '', name: '', confirmPassword: '' });
            }}
            className="ml-1 text-slate-900 font-semibold hover:underline"
            disabled={loading}
          >
            {isLogin ? "S'inscrire" : "Se connecter"}
          </button>
        </p>
      </motion.div>

      {/* Back to home */}
      <Link to="/" className="mt-6 sm:mt-8 text-sm text-slate-400 hover:text-slate-600 transition-colors">
        ← Retour à l'accueil
      </Link>
    </div>
  );
}
