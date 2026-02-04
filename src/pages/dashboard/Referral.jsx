import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Gift,
  Copy,
  Check,
  Users,
  CheckCircle,
  Clock
} from 'lucide-react';
import { useReferralStats } from '../../hooks/useReferralStats';

export default function Referral() {
  const { user } = useOutletContext();
  const isEntrepreneur = user.role === 'entrepreneur';

  const [copied, setCopied] = useState(false);

  // Build referral link from user's code
  const referralCode = user.referral_code || 'PROPAIR';
  const referralLink = `${window.location.origin}/login?ref=${referralCode}`;

  // Fetch real referral stats from Supabase (table referral_events)
  const { stats, referralList, loading } = useReferralStats(user?.id);

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
                    ? `${loading ? '-' : stats.earnedMonths} mois Pro gagnés`
                    : `${user.pro_months_balance || 0} participation${(user.pro_months_balance || 0) > 1 ? 's' : ''}`
                  }
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-amber">
                {loading ? '-' : stats.earnedMonths}
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

        {/* Stats Row - Connected to Supabase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-4"
        >
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-center gap-3 mb-3">
              <Users size={18} className="text-gray-400" />
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Inscrits</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {loading ? '-' : stats.totalReferrals}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle size={18} className="text-teal" />
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Validés</span>
            </div>
            <p className="text-2xl font-bold text-teal">
              {loading ? '-' : stats.validatedReferrals}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-center gap-3 mb-3">
              <Clock size={18} className="text-amber" />
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">En attente</span>
            </div>
            <p className="text-2xl font-bold text-amber">
              {loading ? '-' : stats.pendingReferrals}
            </p>
          </div>
        </motion.div>

        {/* Referral List - Real Data from Supabase */}
        {!loading && referralList.length > 0 && (
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
                <h2 className="font-bold text-gray-900">Historique</h2>
              </div>
              <span className="text-xs text-gray-400">{referralList.length}</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-3 font-medium">Date</th>
                    <th className="px-6 py-3 font-medium">Email Filleul</th>
                    <th className="px-6 py-3 font-medium">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {referralList.map((ref) => (
                    <tr key={ref.id} className="hover:bg-gray-50/50">
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(ref.created_at).toLocaleDateString('fr-CA')}
                      </td>
                      <td className="px-6 py-4 text-gray-900 font-medium">
                        {ref.referee_email || 'Email masqué'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          ref.status === 'validated' ? 'bg-teal/10 text-teal' :
                          ref.status === 'rejected' ? 'bg-red-100 text-red-600' :
                          'bg-gray-100 text-gray-500'
                        }`}>
                          {ref.status === 'validated' ? 'Validé' :
                           ref.status === 'rejected' ? 'Rejeté' : 'En attente'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>
        )}

        {/* Empty State */}
        {!loading && referralList.length === 0 && (
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

        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl border border-gray-100 p-12 text-center"
          >
            <div className="animate-pulse space-y-3">
              <div className="h-4 bg-gray-100 rounded w-1/3 mx-auto" />
              <div className="h-4 bg-gray-100 rounded w-1/2 mx-auto" />
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
