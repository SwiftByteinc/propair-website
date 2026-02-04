import { useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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

export default function DashboardHome() {
  const { user } = useOutletContext();
  const isEntrepreneur = user.role === 'entrepreneur';
  const [copied, setCopied] = useState(false);

  // ✅ Connexion aux vraies stats de parrainage
  const { stats: referralStats, loading: loadingStats } = useReferralStats(user?.id);

  // Data from user profile (passed via context)
  const proMonthsEarned = user.pro_months_balance || 0;
  const connectionsTotal = 3; // Limite essai gratuit
  const referralCode = user.referral_code || 'PROPAIR2024';
  const referralLink = `https://propairapp.com/login?ref=${referralCode}`;
  const referralGoal = 3;

  // Calculate connections used (for trial users)
  const connectionsUsed = user?.trial_connections_count || 0;
  const connectionsRemaining = user?.isPro ? 999 : Math.max(0, connectionsTotal - connectionsUsed);

  // ✅ Vraies données de parrainage depuis Supabase
  const referralCount = loadingStats ? 0 : (referralStats?.validatedReferrals || 0);

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStripeAction = () => {
    // TODO: Integrate with Stripe
    alert(user.isPro
      ? 'Redirection vers Stripe Customer Portal...'
      : 'Redirection vers Stripe Checkout...'
    );
  };

  return (
    <div className="p-8 max-w-4xl">

      {/* Header */}
      <header className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-gray-900"
        >
          Bonjour, {user.full_name?.split(' ')[0] || 'Utilisateur'} 👋
        </motion.h1>
        <p className="text-gray-500 mt-1">
          Votre tour de contrôle ProPair.
        </p>
      </header>

      {/* ═══════════════════════════════════════════════════════════════
          BADGE DE STATUT (Camouflage Apple)
      ═══════════════════════════════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`rounded-2xl p-6 mb-6 ${
          user.isPro
            ? 'bg-gradient-to-br from-teal/10 to-teal/5 border border-teal/20'
            : 'bg-gradient-to-br from-amber/10 to-amber/5 border border-amber/20'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
              user.isPro ? 'bg-teal/20 text-teal' : 'bg-amber/20 text-amber'
            }`}>
              {user.isPro ? <Crown size={28} /> : <Zap size={28} />}
            </div>
            <div>
              <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-1 ${
                user.isPro ? 'bg-teal/20 text-teal' : 'bg-amber/20 text-amber'
              }`}>
                {user.isPro ? (
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
              <p className="text-lg font-bold text-gray-900">
                {user.isPro ? 'Connexions illimitées' : `${connectionsRemaining} connexion${connectionsRemaining > 1 ? 's' : ''} restante${connectionsRemaining > 1 ? 's' : ''}`}
              </p>
              {!user.isPro && (
                <div className="mt-2 w-48">
                  <div className="h-1.5 bg-amber/20 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(connectionsUsed / connectionsTotal) * 100}%` }}
                      className="h-full bg-amber rounded-full"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleStripeAction}
            className={`px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all ${
              user.isPro
                ? 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:shadow-sm'
                : 'bg-teal text-white hover:bg-teal-dark hover:shadow-lg hover:shadow-teal/20'
            }`}
          >
            <CreditCard size={18} />
            {user.isPro ? 'Gérer l\'abonnement' : 'Passer à Pro'}
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Valeur ajoutée pour conversion */}
        {!user.isPro && (
          <div className="mt-4 pt-4 border-t border-amber/20 flex items-center gap-6 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-teal" />
              0% commission
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-teal" />
              Annulable à tout moment
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-teal" />
              Paiement sécurisé
            </span>
          </div>
        )}
      </motion.section>

      {isEntrepreneur && (
        <>
          {/* ═══════════════════════════════════════════════════════════════
              MODULE DE PARRAINAGE (Croissance)
          ═══════════════════════════════════════════════════════════════ */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-6"
          >
            <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber/10 flex items-center justify-center">
                  <Gift size={16} className="text-amber" />
                </div>
                <h2 className="font-bold text-gray-900">Parrainage</h2>
              </div>
              <Link to="/portal/referral" className="text-xs font-semibold text-teal hover:text-teal-dark">
                Voir tout
              </Link>
            </div>

            <div className="p-6 space-y-5">
              {/* Lien de parrainage */}
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                  Votre lien unique
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 px-4 py-2.5 bg-gray-50 rounded-lg border border-gray-100 text-sm font-mono text-gray-600 truncate">
                    /login?ref={referralCode}
                  </div>
                  <motion.button
                    onClick={copyReferralLink}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 transition-all ${
                      copied
                        ? 'bg-teal text-white'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? 'Copié' : 'Copier'}
                  </motion.button>
                </div>
              </div>

              {/* Barre de progression vers mois gratuit */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Objectif mois gratuit
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    {referralCount}/{referralGoal}
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(referralCount / referralGoal) * 100}%` }}
                    className="h-full bg-gradient-to-r from-amber to-amber/70 rounded-full"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  {referralGoal - referralCount > 0
                    ? `Encore ${referralGoal - referralCount} parrainage${referralGoal - referralCount > 1 ? 's' : ''} pour 1 mois gratuit`
                    : 'Mois gratuit débloqué !'
                  }
                </p>
              </div>

              {/* Récapitulatif */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Mois Pro accumulés</span>
                <span className="text-lg font-bold text-amber">{proMonthsEarned}</span>
              </div>
            </div>
          </motion.section>

          {/* ═══════════════════════════════════════════════════════════════
              RÉCAPITULATIF RAPIDE
          ═══════════════════════════════════════════════════════════════ */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            <Link
              to="/portal/billing"
              className="p-4 bg-white rounded-xl border border-gray-100 hover:border-teal/30 hover:shadow-sm transition-all group"
            >
              <CreditCard size={20} className="text-gray-400 group-hover:text-teal mb-2" />
              <p className="font-semibold text-sm text-gray-900">Abonnement</p>
              <p className="text-xs text-gray-400">Factures et paiement</p>
            </Link>

            <a
              href="mailto:support@propairapp.com"
              className="p-4 bg-white rounded-xl border border-gray-100 hover:border-teal/30 hover:shadow-sm transition-all group"
            >
              <HelpCircle size={20} className="text-gray-400 group-hover:text-teal mb-2" />
              <p className="font-semibold text-sm text-gray-900">Support</p>
              <p className="text-xs text-gray-400">Aide technique</p>
            </a>
          </motion.section>
        </>
      )}

      {!isEntrepreneur && (
        <>
          {/* CLIENT - Interface simplifiée */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-gray-100 p-6 mb-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center">
                <Users size={24} className="text-teal" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Membre ProPair</p>
                <p className="text-sm text-gray-500">Trouvez les meilleurs entrepreneurs</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Utilisez l'application mobile pour poster vos projets et recevoir des soumissions.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            <Link
              to="/portal/referral"
              className="p-4 bg-white rounded-xl border border-gray-100 hover:border-teal/30 hover:shadow-sm transition-all group"
            >
              <Gift size={20} className="text-gray-400 group-hover:text-teal mb-2" />
              <p className="font-semibold text-sm text-gray-900">Parrainage</p>
              <p className="text-xs text-gray-400">Inviter un entrepreneur</p>
            </Link>

            <Link
              to="/portal/info"
              className="p-4 bg-white rounded-xl border border-gray-100 hover:border-teal/30 hover:shadow-sm transition-all group"
            >
              <Briefcase size={20} className="text-gray-400 group-hover:text-teal mb-2" />
              <p className="font-semibold text-sm text-gray-900">Mes infos</p>
              <p className="text-xs text-gray-400">Adresses de chantier</p>
            </Link>
          </motion.section>
        </>
      )}
    </div>
  );
}
