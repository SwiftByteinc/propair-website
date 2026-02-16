import { useState } from 'react';
import { useOutletContext, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  Crown,
  Zap,
  Gift,
  Copy,
  Check,
  ChevronRight,
  CreditCard,
  Users,
  Briefcase,
  HelpCircle,
  Shield
} from 'lucide-react';
import { useReferralStats } from '../../hooks/useReferralStats';
import { useToast } from '../../context/ToastContext';

export default function DashboardHome() {
  const { user } = useOutletContext();
  const toast = useToast();
  const isEntrepreneur = user?.role === 'entrepreneur';
  const [copied, setCopied] = useState(false);

  // Stats réelles
  const { stats: referralStats, loading: loadingStats } = useReferralStats(user?.id);

  // Données utilisateur
  const connectionsTotal = 3; // Configurable plus tard via API

  // Sécurisation XSS : Encode le code de parrainage
  const referralCode = encodeURIComponent(user?.referral_code || 'PROPAIR2024');
  const referralLink = `${window.location.origin}/login?ref__=${referralCode}`;
  const referralGoal = 3;

  const connectionsUsed = user?.trial_connections_count || 0;
  const connectionsRemaining = user?.isPro ? 999 : Math.max(0, connectionsTotal - connectionsUsed);

  const referralCount = loadingStats ? 0 : (referralStats?.validatedReferrals || 0);

  const copyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
    } catch {
      // Fallback for older browsers
      const ta = document.createElement('textarea');
      ta.value = referralLink;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    toast.success("Lien copié dans le presse-papier !");
    setTimeout(() => setCopied(false), 2000);
  };

  const navigate = useNavigate();

  const handleStripeAction = () => {
    navigate('/portal/billing');
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-4xl">
      <Helmet><title>Accueil — Mon Espace ProPair</title></Helmet>

      {/* Header */}
      <header className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-slate-900"
        >
          Bonjour, {user?.full_name?.split(' ')[0] || 'Partenaire'}
        </motion.h1>
        <p className="text-slate-500 mt-1">
          Votre tour de contrôle ProPair.
        </p>
      </header>

      {/* STATUS BADGE */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`rounded-2xl p-6 mb-6 ${
          user?.isPro
            ? 'bg-teal-50 border border-teal-100'
            : 'bg-amber-50 border border-amber-100'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
              user?.isPro ? 'bg-teal-100 text-teal-700' : 'bg-amber-100 text-amber-700'
            }`}>
              {user?.isPro ? <Crown size={28} /> : <Zap size={28} />}
            </div>
            <div>
              <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-1 ${
                user?.isPro ? 'bg-teal-100 text-teal-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {user?.isPro ? (
                  <>
                    <Shield size={10} />
                    Membre Élite
                  </>
                ) : (
                  <>
                    Mode Essai ({connectionsUsed}/{connectionsTotal})
                  </>
                )}
              </div>
              <p className="text-lg font-bold text-slate-900">
                {user?.isPro ? 'Connexions illimitées' : `${connectionsRemaining} connexion(s) restante(s)`}
              </p>
              {!user?.isPro && (
                <div className="mt-2 w-48">
                  <div className="h-1.5 bg-amber-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(connectionsUsed / connectionsTotal) * 100}%` }}
                      className="h-full bg-amber-600 rounded-full"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleStripeAction}
            className={`px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all ${
              user?.isPro
                ? 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:shadow-sm'
                : 'bg-slate-900 text-white hover:bg-black shadow-lg shadow-slate-900/10'
            }`}
          >
            <CreditCard size={18} />
            {user?.isPro ? 'Gérer l\'abonnement' : 'Passer à Pro'}
            <ChevronRight size={16} />
          </button>
        </div>
      </motion.section>

      {/* DASHBOARD CONTENT */}
      {isEntrepreneur ? (
        <>
          {/* REFERRAL MODULE */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-slate-100 overflow-hidden mb-6"
          >
            <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                  <Gift size={16} className="text-amber-600" />
                </div>
                <h2 className="font-bold text-slate-900">Parrainage</h2>
              </div>
              <Link to="/portal/referral" className="text-xs font-semibold text-teal-600 hover:text-teal-700">
                Voir tout
              </Link>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Votre lien unique
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 px-4 py-2.5 bg-slate-50 rounded-lg border border-slate-100 text-sm font-mono text-slate-600 truncate">
                    {referralLink}
                  </div>
                  <motion.button
                    onClick={copyReferralLink}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 transition-all ${
                      copied
                        ? 'bg-teal-600 text-white'
                        : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? 'Copié' : 'Copier'}
                  </motion.button>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Objectif mois gratuit
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    {referralCount}/{referralGoal}
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((referralCount / referralGoal) * 100, 100)}%` }}
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  {referralGoal - referralCount > 0
                    ? `Encore ${referralGoal - referralCount} parrainage(s) validé(s) pour 1 mois gratuit`
                    : 'Mois gratuit débloqué ! Continuez !'
                  }
                </p>
              </div>
            </div>
          </motion.section>

          {/* QUICK LINKS - Correction lien mort */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            <Link
              to="/portal/billing"
              className="p-4 bg-white rounded-xl border border-slate-100 hover:border-teal-200 hover:shadow-sm transition-all group"
            >
              <CreditCard size={20} className="text-slate-500 group-hover:text-teal-600 mb-2" />
              <p className="font-semibold text-sm text-slate-900">Abonnement</p>
              <p className="text-xs text-slate-500">Factures et paiement</p>
            </Link>

            <a
              href="mailto:support@propairapp.com"
              className="p-4 bg-white rounded-xl border border-slate-100 hover:border-teal-200 hover:shadow-sm transition-all group"
            >
              <HelpCircle size={20} className="text-slate-500 group-hover:text-teal-600 mb-2" />
              <p className="font-semibold text-sm text-slate-900">Support</p>
              <p className="text-xs text-slate-500">Aide technique</p>
            </a>
          </motion.section>
        </>
      ) : (
        /* CLIENT VIEW */
        <>
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-slate-100 p-6 mb-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center">
                <Users size={24} className="text-teal-600" />
              </div>
              <div>
                <p className="font-bold text-slate-900">Espace Client</p>
                <p className="text-sm text-slate-500">Trouvez les meilleurs entrepreneurs</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Pour publier un projet ou suivre vos demandes, veuillez utiliser l'application mobile ProPair.
            </p>
          </motion.section>

          <div className="grid grid-cols-2 gap-4">
             <Link to="/about" className="p-4 bg-white rounded-xl border border-slate-100 hover:border-teal-100 hover:shadow-sm transition-all">
                <Briefcase size={20} className="text-slate-500 mb-2" />
                <p className="font-semibold text-sm">À propos</p>
             </Link>
             <Link to="/portal/referral" className="p-4 bg-white rounded-xl border border-slate-100 hover:border-teal-100 hover:shadow-sm transition-all">
                <Gift size={20} className="text-slate-500 mb-2" />
                <p className="font-semibold text-sm">Parrainage</p>
             </Link>
          </div>
        </>
      )}
    </div>
  );
}
