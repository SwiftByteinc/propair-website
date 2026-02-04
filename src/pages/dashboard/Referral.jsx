import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Gift,
  Copy,
  Check,
  Users,
  ChevronRight
} from 'lucide-react';

export default function Referral() {
  const { user } = useOutletContext();
  const isEntrepreneur = user.role === 'entrepreneur';

  const [copied, setCopied] = useState(false);

  // Build referral link from user's code
  const referralCode = user.referral_code || 'PROPAIR';
  const referralLink = `https://propairapp.com/login?ref=${referralCode}`;

  // Placeholder data - will be connected to Supabase when referral_events table is ready
  const referrals = [];
  const stats = {
    totalReferrals: 0,
    subscribedReferrals: 0,
    monthsEarned: user.pro_months_balance || 0,
    entriesEarned: 0
  };

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          Parrainage
        </motion.h1>
        <p className="text-gray-500 mt-1">
          {isEntrepreneur
            ? 'Invitez des collègues et gagnez des mois gratuits.'
            : 'Invitez vos amis et gagnez des récompenses.'
          }
        </p>
      </header>

      <div className="space-y-6">

        {/* Rewards Card - Style Status Card */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-amber/10 to-amber/5 rounded-2xl border border-amber/20 p-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber/20 flex items-center justify-center">
                <Gift size={24} className="text-amber" />
              </div>
              <div>
                <p className="text-xs font-bold text-amber uppercase tracking-wider">Récompenses</p>
                <p className="text-xl font-bold text-gray-900">
                  {isEntrepreneur
                    ? `${stats.monthsEarned} mois Pro gagnés`
                    : `${stats.entriesEarned} participation${stats.entriesEarned > 1 ? 's' : ''}`
                  }
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-amber">
                {isEntrepreneur ? stats.monthsEarned : stats.entriesEarned}
              </p>
            </div>
          </div>
        </motion.section>

        {/* Referral Link Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
              <Copy size={16} className="text-gray-400" />
            </div>
            <h2 className="font-bold text-gray-900">Lien de parrainage</h2>
          </div>

          <div className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex-1 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 text-sm font-mono text-gray-600 truncate">
                {referralLink}
              </div>
              <motion.button
                onClick={copyLink}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all whitespace-nowrap ${
                  copied
                    ? 'bg-teal text-white'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
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
                      <Check size={16} /> Copié
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

            <p className="text-xs text-gray-400 mt-4">
              {isEntrepreneur
                ? 'Quand votre filleul s\'abonne, vous recevez tous les deux 1 mois gratuit.'
                : 'Chaque ami inscrit vous donne une participation au tirage mensuel.'
              }
            </p>
          </div>
        </motion.section>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-center gap-3 mb-3">
              <Users size={18} className="text-gray-400" />
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Inscrits</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.totalReferrals}</p>
          </div>

          {isEntrepreneur && (
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center gap-3 mb-3">
                <Gift size={18} className="text-teal" />
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Abonnés</span>
              </div>
              <p className="text-2xl font-bold text-teal">{stats.subscribedReferrals}</p>
            </div>
          )}
        </motion.div>

        {/* Referral List */}
        {referrals.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                  <Users size={16} className="text-gray-400" />
                </div>
                <h2 className="font-bold text-gray-900">Filleuls</h2>
              </div>
              <span className="text-xs text-gray-400">{referrals.length}</span>
            </div>

            <div className="divide-y divide-gray-50">
              {referrals.map((referral) => (
                <div
                  key={referral.id}
                  className="px-6 py-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center font-semibold text-sm">
                      {referral.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{referral.name}</p>
                      <p className="text-xs text-gray-400">{referral.date}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    referral.status === 'subscribed' || referral.status === 'active'
                      ? 'bg-teal/10 text-teal'
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {referral.status === 'subscribed' ? 'Abonné' :
                     referral.status === 'active' ? 'Actif' : 'Inscrit'}
                  </span>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Empty State */}
        {referrals.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl border border-gray-100 p-12 text-center"
          >
            <Users size={40} className="mx-auto text-gray-200 mb-4" />
            <p className="text-gray-500 font-medium">Aucun parrainage</p>
            <p className="text-sm text-gray-400">Partagez votre lien pour commencer</p>
          </motion.div>
        )}

      </div>
    </div>
  );
}
