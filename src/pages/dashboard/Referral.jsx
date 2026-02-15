import { useState, useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Gift, Copy, Check, Users, CheckCircle, Clock,
  Share2, Briefcase, ArrowRight, Award, Sparkles
} from 'lucide-react';
import { useReferralStats } from '../../hooks/useReferralStats';

// Progress Bar component
// eslint-disable-next-line no-unused-vars -- Icon is used in JSX below
function ProgressBar({ current, max, label, sublabel, color = 'teal', icon: Icon }) {
  const progress = Math.min(current / max, 1);

  const colorMap = {
    teal: { bg: 'bg-teal-100', fill: 'bg-teal-600', text: 'text-teal-600', iconBg: 'bg-teal-50' },
    amber: { bg: 'bg-amber-100', fill: 'bg-amber-500', text: 'text-amber-600', iconBg: 'bg-amber-50' },
    pink: { bg: 'bg-pink-100', fill: 'bg-pink-500', text: 'text-pink-600', iconBg: 'bg-pink-50' },
  };
  const c = colorMap[color] || colorMap.teal;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-lg ${c.iconBg} flex items-center justify-center`}>
            <Icon size={16} className={c.text} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">{label}</p>
            <p className="text-[11px] text-slate-500">{sublabel}</p>
          </div>
        </div>
        <div className="flex items-baseline gap-1">
          <span className={`text-lg font-bold ${c.text}`}>{current}</span>
          <span className="text-xs text-slate-500">/ {max}</span>
        </div>
      </div>
      <div className={`h-2.5 ${c.bg} rounded-full overflow-hidden`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
          className={`h-full ${c.fill} rounded-full`}
        />
      </div>
      {progress >= 1 && (
        <p className="text-[11px] font-semibold text-green-600 mt-1.5 flex items-center gap-1">
          <CheckCircle size={12} /> Objectif atteint
        </p>
      )}
    </div>
  );
}

export default function Referral() {
  const { user } = useOutletContext();
  const isEntrepreneur = user?.role === 'entrepreneur';
  const [copied, setCopied] = useState(false);

  // Build referral link
  const referralCode = user?.referral_code || 'PROPAIR';
  const referralLink = `${window.location.origin}/login?ref__=${encodeURIComponent(referralCode)}`;

  // Fetch real referral stats from Supabase
  const { stats, referralList, loading } = useReferralStats(user?.id);

  // Compute detailed stats from referralList
  const entreReferrals = referralList.filter(r => r.referee_type === 'entrepreneur');
  const clientReferrals = referralList.filter(r => r.referee_type === 'client');
  const entreValidated = entreReferrals.filter(r => r.status === 'validated').length;
  const clientCount = clientReferrals.length;
  const entreMonths = entreValidated * 2;
  const clientMonths = Math.floor(clientCount / 6) * 2;
  const totalMonths = entreMonths + clientMonths;

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
    } catch {
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
    setTimeout(() => setCopied(false), 2000);
  }, [referralLink]);

  const handleShare = useCallback(async () => {
    const shareData = {
      title: 'ProPair — Parrainage',
      text: `Rejoins ProPair avec mon code ${referralCode} et on gagne tous les deux des mois Pro gratuits !\n${referralLink}`,
      url: referralLink,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled
      }
    } else {
      copyLink();
    }
  }, [referralCode, referralLink, copyLink]);

  return (
    <div className="p-6 md:p-8 max-w-4xl">
      {/* Header */}
      <header className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-slate-900"
        >
          Parrainage
        </motion.h1>
        <p className="text-slate-500 mt-1">
          Partagez votre lien, suivez vos récompenses.
        </p>
      </header>

      <div className="space-y-6">

        {/* REWARD BANNER */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-pink-50 to-amber-50/50 rounded-2xl border border-pink-100 p-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/80 border border-pink-100 flex items-center justify-center shadow-sm">
                <Gift size={28} className="text-pink-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-pink-500 uppercase tracking-wider mb-0.5">Mois Pro gagnés</p>
                <p className="text-sm text-slate-500">
                  {entreMonths > 0 && `${entreMonths} via entrepreneurs`}
                  {entreMonths > 0 && clientMonths > 0 && ' + '}
                  {clientMonths > 0 && `${clientMonths} via clients`}
                  {totalMonths === 0 && 'Partagez pour commencer'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-slate-900">
                {loading ? '-' : totalMonths}
              </p>
              <p className="text-[11px] text-slate-500 font-medium">mois</p>
            </div>
          </div>
        </motion.section>

        {/* PROGRESS BARS */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5"
        >
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
              <Award size={16} className="text-slate-500" />
            </div>
            <h2 className="font-bold text-slate-900">Progression</h2>
          </div>

          {/* Entrepreneur progress */}
          <ProgressBar
            current={loading ? 0 : entreValidated}
            max={1}
            label="Parrainage entrepreneur"
            sublabel="1 filleul validé (3 mois actif) = 2 mois Pro"
            color="amber"
            icon={Briefcase}
          />

          {/* Client progress */}
          <ProgressBar
            current={loading ? 0 : clientCount}
            max={6}
            label="Réseau client"
            sublabel="6 clients inscrits = 2 mois Pro"
            color="pink"
            icon={Users}
          />

          {/* Info */}
          <div className="bg-slate-50 rounded-xl p-3 flex items-start gap-2.5">
            <Sparkles size={14} className="text-amber-600 mt-0.5 shrink-0" />
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Les barres se réinitialisent après chaque palier atteint. Les mois gagnés sont cumulables.
            </p>
          </div>
        </motion.section>

        {/* REFERRAL LINK + ACTIONS */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl border border-slate-100 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-slate-50 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
              <Copy size={16} className="text-slate-500" />
            </div>
            <h2 className="font-bold text-slate-900">Votre lien de parrainage</h2>
          </div>

          <div className="p-6">
            {/* Code display */}
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mb-4">
              <span className="flex-1 text-lg font-bold text-slate-900 tracking-widest font-mono">
                {referralCode}
              </span>
              <span className="text-[10px] font-semibold text-slate-500 bg-slate-200/60 px-2 py-0.5 rounded-full uppercase">
                Votre code
              </span>
            </div>

            {/* Link display */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 px-4 py-3 bg-slate-50 rounded-xl border border-slate-100 text-sm font-mono text-slate-500 truncate">
                {referralLink}
              </div>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                onClick={copyLink}
                whileTap={{ scale: 0.95 }}
                className={`py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                  copied
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-2">
                      <Check size={16} /> Copié
                    </motion.span>
                  ) : (
                    <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-2">
                      <Copy size={16} /> Copier le lien
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <motion.button
                onClick={handleShare}
                whileTap={{ scale: 0.95 }}
                className="py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 bg-pink-600 text-white hover:bg-pink-700 transition-all"
              >
                <Share2 size={16} />
                Partager
              </motion.button>
            </div>

            <p className="text-xs text-slate-500 mt-4">
              {isEntrepreneur
                ? 'Quand votre filleul s\'abonne et reste actif 3 mois, vous gagnez 2 mois Pro chacun.'
                : 'Aidez vos amis entrepreneurs à découvrir une solution locale et juste.'
              }
            </p>
          </div>
        </motion.section>

        {/* STATS ROW */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-4"
        >
          <div className="bg-white rounded-xl border border-slate-100 p-5">
            <div className="flex items-center gap-3 mb-3">
              <Users size={18} className="text-slate-500" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Inscrits</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">
              {loading ? '-' : stats.totalReferrals}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-100 p-5">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle size={18} className="text-teal-600" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Validés</span>
            </div>
            <p className="text-2xl font-bold text-teal-600">
              {loading ? '-' : stats.validatedReferrals}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-100 p-5">
            <div className="flex items-center gap-3 mb-3">
              <Clock size={18} className="text-amber-600" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">En attente</span>
            </div>
            <p className="text-2xl font-bold text-amber-600">
              {loading ? '-' : stats.pendingReferrals}
            </p>
          </div>
        </motion.div>

        {/* HOW IT WORKS (inline) */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-2xl border border-slate-100 p-6"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
              <Award size={16} className="text-slate-500" />
            </div>
            <h2 className="font-bold text-slate-900">Comment ça marche</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-amber-50/50 rounded-xl p-4 border border-amber-100/50">
              <div className="flex items-center gap-2.5 mb-2">
                <Briefcase size={16} className="text-amber-600" />
                <h3 className="font-semibold text-slate-900 text-sm">Entrepreneur</h3>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <span>Inscription</span>
                <ArrowRight size={12} className="text-slate-500" />
                <span>3 mois actif</span>
                <ArrowRight size={12} className="text-slate-500" />
                <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-bold">+2 mois</span>
              </div>
            </div>
            <div className="bg-pink-50/50 rounded-xl p-4 border border-pink-100/50">
              <div className="flex items-center gap-2.5 mb-2">
                <Users size={16} className="text-pink-600" />
                <h3 className="font-semibold text-slate-900 text-sm">Client</h3>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <span>6 inscrits</span>
                <ArrowRight size={12} className="text-slate-500" />
                <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-bold">+2 mois</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* REFERRAL LIST */}
        {!loading && referralList.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl border border-slate-100 overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                  <Users size={16} className="text-slate-500" />
                </div>
                <h2 className="font-bold text-slate-900">Historique</h2>
              </div>
              <span className="text-xs text-slate-500 bg-slate-50 px-2 py-0.5 rounded-full">{referralList.length}</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-3 font-medium">Date</th>
                    <th className="px-6 py-3 font-medium">Courriel</th>
                    <th className="px-6 py-3 font-medium">Type</th>
                    <th className="px-6 py-3 font-medium">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {referralList.map((ref) => (
                    <tr key={ref.id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 text-slate-600">
                        {new Date(ref.created_at).toLocaleDateString('fr-CA')}
                      </td>
                      <td className="px-6 py-4 text-slate-900 font-medium">
                        {ref.referee_email
                          ? `${ref.referee_email.substring(0, 2)}***@${ref.referee_email.split('@')[1] || '***'}`
                          : 'Courriel masqué'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          ref.referee_type === 'entrepreneur'
                            ? 'bg-amber-50 text-amber-600'
                            : 'bg-pink-50 text-pink-600'
                        }`}>
                          {ref.referee_type === 'entrepreneur' ? 'Pro' : 'Client'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          ref.status === 'validated' ? 'bg-teal-50 text-teal-600' :
                          ref.status === 'rejected' ? 'bg-red-100 text-red-600' :
                          'bg-slate-100 text-slate-500'
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

        {/* EMPTY STATE */}
        {!loading && referralList.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl border border-slate-100 p-12 text-center"
          >
            <Users size={40} className="mx-auto text-slate-200 mb-4" />
            <p className="text-slate-500 font-medium mb-1">Aucun parrainage pour le moment</p>
            <p className="text-sm text-slate-500">Partagez votre lien ci-dessus pour commencer</p>
          </motion.div>
        )}

        {/* LOADING STATE */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl border border-slate-100 p-12 text-center"
          >
            <div className="animate-pulse space-y-3">
              <div className="h-4 bg-slate-100 rounded w-1/3 mx-auto" />
              <div className="h-4 bg-slate-100 rounded w-1/2 mx-auto" />
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
