import { useState, useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';
import { copyToClipboard } from '../../lib/clipboard';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Gift, Copy, Check, Users, CheckCircle, Clock,
  Share2, Briefcase, ArrowRight, Award, Sparkles
} from 'lucide-react';
import { useReferralStats } from '../../hooks/useReferralStats';
import { useLanguage } from '../../context/LanguageContext';

// Progress Bar component
// eslint-disable-next-line no-unused-vars -- Icon is used in JSX below
function ProgressBar({ current, max, label, sublabel, color = 'teal', icon: Icon, goalReachedText }) {
  const progress = Math.min(current / max, 1);

  const colorMap = {
    teal: { bg: 'bg-teal-700/10', fill: 'bg-teal-700', text: 'text-teal-700', iconBg: 'bg-teal-700/10' },
    amber: { bg: 'bg-amber-100', fill: 'bg-amber-500', text: 'text-amber-600', iconBg: 'bg-amber-50' },
    slate: { bg: 'bg-slate-200', fill: 'bg-slate-600', text: 'text-slate-600', iconBg: 'bg-slate-50' },
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
      <div className={`h-2 ${c.bg} rounded-full overflow-hidden`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
          className={`h-full ${c.fill} rounded-full`}
        />
      </div>
      {progress >= 1 && (
        <p className="text-[11px] font-semibold text-green-600 mt-1.5 flex items-center gap-1">
          <CheckCircle size={12} /> {goalReachedText}
        </p>
      )}
    </div>
  );
}

export default function Referral() {
  const { t, lang } = useLanguage();
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
  const clientCount = clientReferrals.filter(r => r.status === 'validated').length;
  const entreMonths = entreValidated * 3;
  const clientMonths = Math.floor(clientCount / 6) * 3;
  const totalMonths = entreMonths + clientMonths;

  const copyLink = useCallback(async () => {
    await copyToClipboard(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [referralLink]);

  const handleShare = useCallback(async () => {
    const shareData = {
      title: t('dashboard.shareTitle'),
      text: t('dashboard.shareText', { code: referralCode }) + `\n${referralLink}`,
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
  }, [referralCode, referralLink, copyLink, t]);

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-4xl">
      <Helmet><title>{t('dashboard.referralTitle')}</title></Helmet>
      {/* Header */}
      <header className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-slate-900"
        >
          {t('dashboard.referralHeading')}
        </motion.h1>
        <p className="text-slate-500 mt-1">
          {t('dashboard.referralSubtitle')}
        </p>
      </header>

      <div className="space-y-6">

        {/* REWARDS & PROGRESSION */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-slate-100/60 shadow-sm overflow-hidden"
        >
          {/* Reward summary header */}
          <div className="bg-gradient-to-br from-teal-700/15 to-slate-50/30 px-4 sm:px-6 py-5 border-b border-teal-700/20">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/80 border border-teal-700/20 flex items-center justify-center shadow-sm shrink-0">
                  <Gift size={20} className="text-teal-700 sm:hidden" />
                  <Gift size={24} className="text-teal-700 hidden sm:block" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-teal-700 mb-0.5">{t('dashboard.proMonthsEarned')}</p>
                  <p className="text-xs sm:text-sm text-slate-500 truncate">
                    {entreMonths > 0 && t('dashboard.viaEntrepreneurs', { count: entreMonths })}
                    {entreMonths > 0 && clientMonths > 0 && ' + '}
                    {clientMonths > 0 && t('dashboard.viaClients', { count: clientMonths })}
                    {totalMonths === 0 && t('dashboard.shareToStart')}
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-2xl sm:text-3xl font-bold text-slate-900">
                  {loading ? '-' : totalMonths}
                </p>
                <p className="text-[11px] text-slate-500 font-medium">{t('dashboard.months')}</p>
              </div>
            </div>
          </div>

          {/* Progress bars */}
          <div className="p-4 sm:p-6 space-y-5">
            <ProgressBar
              current={loading ? 0 : entreValidated}
              max={1}
              label={t('dashboard.entrepReferral')}
              sublabel={t('dashboard.entrepReferralDesc')}
              color="teal"
              icon={Briefcase}
              goalReachedText={t('dashboard.goalReached')}
            />

            <ProgressBar
              current={loading ? 0 : clientCount}
              max={6}
              label={t('dashboard.clientNetwork')}
              sublabel={t('dashboard.clientNetworkDesc')}
              color="slate"
              icon={Users}
              goalReachedText={t('dashboard.goalReached')}
            />

            <div className="bg-slate-50 rounded-xl p-3 flex items-start gap-2.5">
              <Sparkles size={14} className="text-teal-700 mt-0.5 shrink-0" />
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {t('dashboard.progressResetInfo')}
              </p>
            </div>
          </div>
        </motion.section>

        {/* REFERRAL LINK + ACTIONS */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-white rounded-2xl border border-slate-100/60 shadow-sm overflow-hidden"
        >
          <div className="px-4 sm:px-6 py-4 border-b border-slate-50 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
              <Copy size={16} className="text-slate-500" />
            </div>
            <h2 className="font-semibold text-slate-900">{t('dashboard.yourReferralLink')}</h2>
          </div>

          <div className="p-4 sm:p-6">
            {/* Code display */}
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-3 sm:px-4 py-3 mb-4">
              <span className="flex-1 text-base sm:text-lg font-bold text-slate-900 tracking-wider font-mono">
                {referralCode}
              </span>
              <span className="text-[10px] font-semibold text-slate-500 bg-slate-200/60 px-2 py-0.5 rounded-full whitespace-nowrap">
                {t('dashboard.yourCode')}
              </span>
            </div>

            {/* Link display */}
            <div className="mb-4">
              <div className="px-3 sm:px-4 py-3 bg-slate-50 rounded-xl border border-slate-100/60 text-xs sm:text-sm font-mono text-slate-500 break-all">
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
                    ? 'bg-teal-700 text-white'
                    : 'bg-slate-900 text-white hover:bg-black'
                }`}
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-2">
                      <Check size={16} /> {t('dashboard.copiedLabel')}
                    </motion.span>
                  ) : (
                    <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-2">
                      <Copy size={16} /> {t('dashboard.copyLink')}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <motion.button
                onClick={handleShare}
                whileTap={{ scale: 0.95 }}
                className="py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all"
              >
                <Share2 size={16} />
                {t('dashboard.share')}
              </motion.button>
            </div>

            <p className="text-xs text-slate-500 mt-4">
              {isEntrepreneur
                ? t('dashboard.entrepReferralTip')
                : t('dashboard.clientReferralTip')
              }
            </p>
          </div>
        </motion.section>

        {/* STATS ROW */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4"
        >
          <div className="bg-white rounded-xl border border-slate-100/60 shadow-sm p-5 border-t-2 border-t-slate-300">
            <div className="flex items-center gap-3 mb-3">
              <Users size={18} className="text-slate-500" />
              <span className="text-xs font-medium text-slate-500">{t('dashboard.statsSignedUp')}</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">
              {loading ? '-' : stats.totalReferrals}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-100/60 shadow-sm p-5 border-t-2 border-t-teal-700">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle size={18} className="text-teal-700" />
              <span className="text-xs font-medium text-slate-500">{t('dashboard.statsValidated')}</span>
            </div>
            <p className="text-2xl font-bold text-teal-700">
              {loading ? '-' : stats.validatedReferrals}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-100/60 shadow-sm p-5 border-t-2 border-t-amber-400">
            <div className="flex items-center gap-3 mb-3">
              <Clock size={18} className="text-amber-600" />
              <span className="text-xs font-medium text-slate-500">{t('dashboard.statsPending')}</span>
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
          transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl border border-slate-100/60 shadow-sm p-4 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
              <Award size={16} className="text-slate-500" />
            </div>
            <h2 className="font-semibold text-slate-900">{t('dashboard.howItWorks')}</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/50">
              <div className="flex items-center gap-2.5 mb-3">
                <Briefcase size={16} className="text-slate-600" />
                <h3 className="font-semibold text-slate-900 text-sm">{t('dashboard.entrepreneur')}</h3>
              </div>
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <span>{t('dashboard.signUp')}</span>
                  <ArrowRight size={12} className="text-slate-400 shrink-0" />
                  <span>{t('dashboard.threeMonthsActive')}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-semibold">{t('dashboard.plusThreeMonthsParrain')}</span>
                  <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-semibold">{t('dashboard.plusTwoMonthsFilleul')}</span>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/50">
              <div className="flex items-center gap-2.5 mb-3">
                <Users size={16} className="text-slate-600" />
                <h3 className="font-semibold text-slate-900 text-sm">{t('dashboard.client')}</h3>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <span>{t('dashboard.sixSignedUp')}</span>
                <ArrowRight size={12} className="text-slate-400 shrink-0" />
                <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-semibold">{t('dashboard.plusThreeMonths')}</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* REFERRAL LIST */}
        {!loading && referralList.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-slate-100/60 shadow-sm overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                  <Users size={16} className="text-slate-500" />
                </div>
                <h2 className="font-semibold text-slate-900">{t('dashboard.history')}</h2>
              </div>
              <span className="text-xs text-slate-500 bg-slate-50 px-2 py-0.5 rounded-full">{referralList.length}</span>
            </div>

            {/* Desktop table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-3 font-medium">{t('dashboard.dateColumn')}</th>
                    <th className="px-6 py-3 font-medium">{t('dashboard.emailColumn')}</th>
                    <th className="px-6 py-3 font-medium">{t('dashboard.typeColumn')}</th>
                    <th className="px-6 py-3 font-medium">{t('dashboard.statusColumn')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {referralList.map((ref) => (
                    <tr key={ref.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-slate-600">
                        {new Date(ref.created_at).toLocaleDateString(lang === 'fr' ? 'fr-CA' : 'en-CA')}
                      </td>
                      <td className="px-6 py-4 text-slate-900 font-medium">
                        {ref.referee_email
                          ? `${ref.referee_email.substring(0, 2)}***@${ref.referee_email.split('@')[1] || '***'}`
                          : t('dashboard.emailHidden')}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          ref.referee_type === 'entrepreneur'
                            ? 'bg-slate-100 text-slate-600'
                            : 'bg-teal-700/10 text-teal-700'
                        }`}>
                          {ref.referee_type === 'entrepreneur' ? 'Pro' : 'Client'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          ref.status === 'validated' ? 'bg-teal-700/10 text-teal-700' :
                          ref.status === 'rejected' ? 'bg-red-100 text-red-600' :
                          'bg-slate-100 text-slate-500'
                        }`}>
                          {ref.status === 'validated' ? t('dashboard.statusValidated') :
                           ref.status === 'rejected' ? t('dashboard.statusRejected') : t('dashboard.statusPending')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile card list */}
            <div className="sm:hidden divide-y divide-slate-50">
              {referralList.map((ref) => (
                <div key={ref.id} className="px-4 py-3.5 flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {ref.referee_email
                        ? `${ref.referee_email.substring(0, 2)}***@${ref.referee_email.split('@')[1] || '***'}`
                        : t('dashboard.emailHidden')}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-500">
                        {new Date(ref.created_at).toLocaleDateString(lang === 'fr' ? 'fr-CA' : 'en-CA')}
                      </span>
                      <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium ${
                        ref.referee_type === 'entrepreneur'
                          ? 'bg-slate-100 text-slate-600'
                          : 'bg-teal-700/10 text-teal-700'
                      }`}>
                        {ref.referee_type === 'entrepreneur' ? 'Pro' : 'Client'}
                      </span>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold shrink-0 ${
                    ref.status === 'validated' ? 'bg-teal-700/10 text-teal-700' :
                    ref.status === 'rejected' ? 'bg-red-100 text-red-600' :
                    'bg-slate-100 text-slate-500'
                  }`}>
                    {ref.status === 'validated' ? t('dashboard.statusValidated') :
                     ref.status === 'rejected' ? t('dashboard.statusRejected') : t('dashboard.statusPending')}
                  </span>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* EMPTY STATE */}
        {!loading && referralList.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-slate-100/60 shadow-sm p-12 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-4">
              <Gift size={32} className="text-slate-300" />
            </div>
            <p className="text-slate-900 font-semibold mb-1">{t('dashboard.noReferralsYet')}</p>
            <p className="text-sm text-slate-500 mb-5">{t('dashboard.shareYourLink')}</p>
            <motion.button
              onClick={copyLink}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold text-sm hover:bg-black transition-all"
            >
              <Copy size={16} />
              {t('dashboard.copyLink')}
            </motion.button>
          </motion.div>
        )}

        {/* LOADING STATE */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl border border-slate-100/60 shadow-sm p-12 text-center"
          >
            <div className="animate-pulse space-y-4">
              <div className="h-5 bg-slate-100 rounded-lg w-2/5 mx-auto" />
              <div className="h-3 bg-slate-100 rounded w-3/5 mx-auto" />
              <div className="flex justify-center gap-3 mt-4">
                <div className="h-10 bg-slate-100 rounded-xl w-28" />
                <div className="h-10 bg-slate-100 rounded-xl w-28" />
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
