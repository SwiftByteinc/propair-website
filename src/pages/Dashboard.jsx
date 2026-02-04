import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LogOut,
  Copy,
  Check,
  ChevronRight,
  Gift,
  Users,
  CreditCard,
  Shield,
  Mail,
  Zap,
  Crown,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

// Skeleton Loading Components
const SkeletonPulse = ({ className }) => (
  <div className={`animate-pulse bg-gray-100 rounded-lg ${className}`} />
);

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl border border-gray-100 p-8 space-y-6">
    <div className="flex items-center gap-3">
      <SkeletonPulse className="w-10 h-10 rounded-xl" />
      <SkeletonPulse className="h-5 w-32" />
    </div>
    <SkeletonPulse className="h-24 w-full rounded-xl" />
    <SkeletonPulse className="h-12 w-48" />
  </div>
);

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, profile, loading: authLoading, profileLoading, isPro, signOut } = useAuth();

  const [copied, setCopied] = useState(false);
  const [referrals, setReferrals] = useState([]);
  const [loadingReferrals, setLoadingReferrals] = useState(true);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) navigate('/login');
  }, [user, authLoading, navigate]);

  // Fetch referrals
  useEffect(() => {
    let isMounted = true;
    const fetchReferrals = async () => {
      if (!user) return;
      try {
        const { data } = await supabase
          .from('referral_events')
          .select('*')
          .eq('referrer_id', user.id);
        if (isMounted) setReferrals(data || []);
      } catch {
        if (isMounted) setReferrals([]);
      } finally {
        if (isMounted) setLoadingReferrals(false);
      }
    };
    fetchReferrals();
    return () => { isMounted = false; };
  }, [user]);

  const copyReferralLink = () => {
    const link = `https://propairapp.com/login?ref=${profile?.referral_code || 'PROPAIR'}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStripeAction = () => {
    // TODO: Implement Stripe checkout/portal
    alert(isPro
      ? 'Redirection vers le portail Stripe...'
      : 'Redirection vers le paiement Stripe...'
    );
  };

  // Skeleton Loading State
  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-[#FDFDFD] antialiased">
        <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-xl border-b border-gray-100/50">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <SkeletonPulse className="h-8 w-32" />
            <SkeletonPulse className="h-8 w-24" />
          </div>
        </nav>
        <main className="max-w-6xl mx-auto px-6 py-12">
          <div className="mb-12">
            <SkeletonPulse className="h-10 w-64 mb-3" />
            <SkeletonPulse className="h-5 w-96" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <SkeletonCard />
              <SkeletonCard />
            </div>
            <div className="lg:col-span-4">
              <SkeletonCard />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!user || !profile) return null;

  const referralGoal = 3;
  const referralCount = referrals.length;
  const progressPercent = Math.min((referralCount / referralGoal) * 100, 100);
  const proMonths = profile?.pro_months_balance || 0;
  const connectionsLeft = isPro ? null : Math.max(0, 3 - (profile?.connections_used || 0));

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#1D1D1F] antialiased selection:bg-teal/10">

      {/* Navbar Ultra-Fine */}
      <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-xl border-b border-gray-100/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/images/logo_ProPair.jpg" alt="ProPair" className="h-8 w-auto" />
            <span className="text-gray-300 font-light">/</span>
            <span className="text-[14px] font-semibold text-gray-400 tracking-tight">Espace Pro</span>
          </Link>

          <div className="flex items-center gap-6">
            <span className="text-[13px] text-gray-400 hidden sm:block">{profile.email}</span>
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 text-[13px] text-gray-400 hover:text-red-500 transition-colors"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12">

        {/* Header avec Badge de Statut */}
        <header className="mb-12">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-[32px] font-bold tracking-tight text-gray-900">
                Bonjour, {profile.full_name?.split(' ')[0] || 'Entrepreneur'}
              </h1>
              <p className="text-gray-400 text-[15px]">
                Gérez votre abonnement et développez votre réseau.
              </p>
            </div>

            {/* Badge de Statut Dynamique */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-bold uppercase tracking-wider ${
                isPro
                  ? 'bg-gradient-to-r from-teal/10 to-teal/5 text-teal border border-teal/20'
                  : 'bg-gradient-to-r from-amber/10 to-amber/5 text-amber border border-amber/20'
              }`}
            >
              {isPro ? (
                <>
                  <Crown size={14} />
                  Certifié Élite
                </>
              ) : (
                <>
                  <Zap size={14} />
                  Mode Essai
                </>
              )}
            </motion.div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* ═══════════════════════════════════════════════════════════════
              COLONNE GAUCHE - COMMAND CENTER
          ═══════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-8 space-y-8">

            {/* Module de Statut de Croissance */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
            >
              {/* Header de Section */}
              <div className="px-8 py-6 border-b border-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                    <CreditCard size={18} className="text-gray-400" />
                  </div>
                  <div>
                    <h2 className="font-bold text-[16px] tracking-tight">Statut de votre compte</h2>
                    <p className="text-[12px] text-gray-400">Votre niveau d'accès actuel</p>
                  </div>
                </div>
              </div>

              {/* Contenu */}
              <div className="p-8">
                {isPro ? (
                  /* État PRO - Badge Élite */
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-gradient-to-br from-teal/5 to-transparent border border-teal/10">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-teal/10 flex items-center justify-center">
                        <Sparkles size={24} className="text-teal" />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-teal uppercase tracking-widest">Plan actif</p>
                        <p className="text-xl font-bold tracking-tight">ProPair Élite</p>
                        <p className="text-[13px] text-gray-400">Connexions illimitées</p>
                      </div>
                    </div>
                    <button
                      onClick={handleStripeAction}
                      className="w-full sm:w-auto px-6 py-3 bg-white text-gray-900 rounded-xl font-semibold text-[14px] border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all flex items-center justify-center gap-2"
                    >
                      Gérer mon abonnement
                      <ChevronRight size={16} />
                    </button>
                  </div>
                ) : (
                  /* État ESSAI - Compte à rebours */
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-gradient-to-br from-amber/5 to-transparent border border-amber/10">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-amber/10 flex items-center justify-center">
                          <Zap size={24} className="text-amber" />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-amber uppercase tracking-widest">Essai gratuit</p>
                          <p className="text-xl font-bold tracking-tight">
                            {connectionsLeft} connexion{connectionsLeft !== 1 ? 's' : ''} restante{connectionsLeft !== 1 ? 's' : ''}
                          </p>
                          <p className="text-[13px] text-gray-400">Passez à Pro pour l'illimité</p>
                        </div>
                      </div>
                    </div>

                    {/* Barre de progression des connexions */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-[12px]">
                        <span className="text-gray-400">Connexions utilisées</span>
                        <span className="font-bold text-gray-600">{3 - (connectionsLeft || 0)}/3</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${((3 - (connectionsLeft || 0)) / 3) * 100}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className="h-full bg-gradient-to-r from-amber to-amber/70 rounded-full"
                        />
                      </div>
                    </div>

                    {/* CTA Stripe */}
                    <button
                      onClick={handleStripeAction}
                      className="w-full py-4 bg-teal hover:bg-teal-dark text-white rounded-xl font-bold text-[14px] transition-all hover:shadow-lg hover:shadow-teal/20 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                    >
                      <Crown size={18} />
                      Activer mon accès illimité - 29$/mois
                    </button>
                  </div>
                )}
              </div>
            </motion.section>

            {/* ═══════════════════════════════════════════════════════════════
                MOTEUR DE VIRALITÉ - SECTION PARRAINAGE
            ═══════════════════════════════════════════════════════════════ */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
            >
              {/* Header */}
              <div className="px-8 py-6 border-b border-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                    <Users size={18} className="text-gray-400" />
                  </div>
                  <div>
                    <h2 className="font-bold text-[16px] tracking-tight">Moteur de croissance</h2>
                    <p className="text-[12px] text-gray-400">Parrainez et gagnez des mois gratuits</p>
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-8">

                {/* Lien de partage One-Tap */}
                <div>
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-3">
                    Votre lien de parrainage
                  </label>
                  <div className="flex items-center gap-2 p-1.5 bg-gray-50 rounded-xl border border-gray-100">
                    <input
                      readOnly
                      value={`propairapp.com/login?ref=${profile.referral_code || '...'}`}
                      className="flex-1 bg-transparent border-none text-[13px] font-mono text-gray-600 px-4 focus:ring-0 focus:outline-none"
                    />
                    <motion.button
                      onClick={copyReferralLink}
                      whileTap={{ scale: 0.95 }}
                      className={`px-5 py-2.5 rounded-lg font-bold text-[13px] transition-all flex items-center gap-2 ${
                        copied
                          ? 'bg-teal text-white shadow-lg shadow-teal/20'
                          : 'bg-white text-gray-900 border border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }`}
                    >
                      <AnimatePresence mode="wait">
                        {copied ? (
                          <motion.span
                            key="check"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="flex items-center gap-2"
                          >
                            <Check size={16} /> Copié !
                          </motion.span>
                        ) : (
                          <motion.span
                            key="copy"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="flex items-center gap-2"
                          >
                            <Copy size={16} /> Copier
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </div>
                </div>

                {/* Jauge de Progression */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Objectif mois gratuit</p>
                      <p className="text-2xl font-bold tracking-tight mt-1">
                        <span className="text-teal">{referralCount}</span>
                        <span className="text-gray-300"> / {referralGoal}</span>
                      </p>
                    </div>
                    <div className="w-16 h-16 rounded-full border-4 border-gray-100 flex items-center justify-center relative">
                      <svg className="absolute inset-0 w-full h-full -rotate-90">
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          className="text-teal"
                          strokeDasharray={`${progressPercent * 1.76} 176`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="text-[14px] font-bold text-teal">{Math.round(progressPercent)}%</span>
                    </div>
                  </div>

                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                      className="h-full bg-gradient-to-r from-teal to-teal-light rounded-full"
                    />
                  </div>

                  <p className="text-[13px] text-gray-400 mt-4">
                    {referralGoal - referralCount > 0 ? (
                      <>Encore <strong className="text-teal">{referralGoal - referralCount}</strong> parrainage{referralGoal - referralCount > 1 ? 's' : ''} pour débloquer 1 mois gratuit</>
                    ) : (
                      <span className="text-teal font-semibold">Bravo ! Mois gratuit débloqué !</span>
                    )}
                  </p>
                </div>

                {/* Liste des Filleuls */}
                {loadingReferrals ? (
                  <div className="space-y-3">
                    <SkeletonPulse className="h-14 w-full" />
                    <SkeletonPulse className="h-14 w-full" />
                  </div>
                ) : referrals.length > 0 ? (
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                      Filleuls inscrits ({referrals.length})
                    </p>
                    <div className="space-y-2">
                      {referrals.slice(0, 5).map((ref, i) => (
                        <div
                          key={ref.id || i}
                          className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-teal/10 text-teal flex items-center justify-center font-bold text-[12px]">
                              {i + 1}
                            </div>
                            <span className="text-[14px] font-medium">Parrainage #{i + 1}</span>
                          </div>
                          <span className="text-[11px] font-bold text-teal uppercase px-2 py-1 bg-teal/10 rounded-full">
                            Validé
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <Users size={32} className="mx-auto mb-3 opacity-30" />
                    <p className="text-[14px]">Aucun parrainage pour l'instant</p>
                    <p className="text-[12px]">Partagez votre lien pour commencer</p>
                  </div>
                )}
              </div>
            </motion.section>
          </div>

          {/* ═══════════════════════════════════════════════════════════════
              COLONNE DROITE - RÉCAPITULATIF
          ═══════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-4 space-y-6">

            {/* Compteur de Récompenses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl border border-gray-100 p-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <Gift size={18} className="text-amber" />
                <h3 className="font-bold text-[15px] tracking-tight">Vos récompenses</h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 rounded-xl bg-amber/5 border border-amber/10">
                  <span className="text-[13px] text-gray-500">Mois Pro gagnés</span>
                  <span className="text-2xl font-bold text-amber">{proMonths}</span>
                </div>
                <div className="flex justify-between items-center p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-[13px] text-gray-500">Parrainages actifs</span>
                  <span className="text-2xl font-bold">{referrals.length}</span>
                </div>
              </div>

              <p className="text-[11px] text-gray-400 mt-6 p-3 bg-gray-50 rounded-lg leading-relaxed">
                Les mois gratuits sont crédités automatiquement dès que votre filleul valide son compte.
              </p>
            </motion.div>

            {/* Identité et Paramètres */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-50">
                <h3 className="font-bold text-[15px] tracking-tight">Mon compte</h3>
              </div>

              <div className="divide-y divide-gray-50">
                <div className="px-6 py-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-teal/10 text-teal flex items-center justify-center font-bold">
                    {profile.full_name?.charAt(0) || 'U'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[14px] truncate">{profile.full_name}</p>
                    <p className="text-[12px] text-gray-400 truncate">{profile.email}</p>
                  </div>
                </div>

                <button className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <span className="flex items-center gap-3 text-[14px]">
                    <Shield size={16} className="text-gray-400" />
                    Sécurité
                  </span>
                  <ChevronRight size={16} className="text-gray-300" />
                </button>

                <button className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <span className="flex items-center gap-3 text-[14px]">
                    <Mail size={16} className="text-gray-400" />
                    Notifications
                  </span>
                  <ChevronRight size={16} className="text-gray-300" />
                </button>
              </div>
            </motion.div>

            {/* Support Prioritaire */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white"
            >
              <div className="flex items-center gap-3 mb-4">
                <HelpCircle size={20} className="text-teal-light" />
                <h3 className="font-bold text-[15px]">Support prioritaire</h3>
              </div>
              <p className="text-[13px] text-gray-400 mb-4">
                Une question ? Notre équipe est disponible pour vous aider.
              </p>
              <a
                href="mailto:support@propairapp.com"
                className="inline-flex items-center gap-2 text-[13px] font-semibold text-teal-light hover:text-teal transition-colors"
              >
                Contacter le support
                <ChevronRight size={14} />
              </a>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
