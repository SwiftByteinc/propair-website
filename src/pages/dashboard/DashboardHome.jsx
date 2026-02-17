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
import { useLanguage } from '../../context/LanguageContext';

export default function DashboardHome() {
  const { t } = useLanguage();
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
    toast.success(t('dashboard.linkCopied'));
    setTimeout(() => setCopied(false), 2000);
  };

  const navigate = useNavigate();

  const handleStripeAction = () => {
    navigate('/portal/billing');
  };

  const firstName = user?.full_name?.split(' ')[0] || t('dashboard.helloFallback');

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-4xl">
      <Helmet><title>{t('dashboard.homeTitle')}</title></Helmet>

      {/* Header */}
      <header className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-slate-900"
        >
          {t('dashboard.hello', { name: firstName })}
        </motion.h1>
        <p className="text-slate-500 mt-1">
          {t('dashboard.controlTower')}
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
                    {t('dashboard.memberElite')}
                  </>
                ) : (
                  <>
                    {t('dashboard.trialMode', { used: connectionsUsed, total: connectionsTotal })}
                  </>
                )}
              </div>
              <p className="text-lg font-bold text-slate-900">
                {user?.isPro ? t('dashboard.unlimitedConnections') : t('dashboard.connectionsRemaining', { count: connectionsRemaining })}
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
            {user?.isPro ? t('dashboard.manageSubscription') : t('dashboard.upgradeToPro')}
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
                <h2 className="font-bold text-slate-900">{t('dashboard.referralSection')}</h2>
              </div>
              <Link to="/portal/referral" className="text-xs font-semibold text-teal-600 hover:text-teal-700">
                {t('dashboard.seeAll')}
              </Link>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  {t('dashboard.yourUniqueLink')}
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
                    {copied ? t('dashboard.copied') : t('dashboard.copy')}
                  </motion.button>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {t('dashboard.freeMonthGoal')}
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
                    ? t('dashboard.moreReferralsNeeded', { count: referralGoal - referralCount })
                    : t('dashboard.freeMonthUnlocked')
                  }
                </p>
              </div>
            </div>
          </motion.section>

          {/* QUICK LINKS */}
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
              <p className="font-semibold text-sm text-slate-900">{t('dashboard.subscriptionLink')}</p>
              <p className="text-xs text-slate-500">{t('dashboard.invoicesAndPayment')}</p>
            </Link>

            <a
              href="mailto:support@propairapp.com"
              className="p-4 bg-white rounded-xl border border-slate-100 hover:border-teal-200 hover:shadow-sm transition-all group"
            >
              <HelpCircle size={20} className="text-slate-500 group-hover:text-teal-600 mb-2" />
              <p className="font-semibold text-sm text-slate-900">{t('dashboard.supportLink')}</p>
              <p className="text-xs text-slate-500">{t('dashboard.technicalHelp')}</p>
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
                <p className="font-bold text-slate-900">{t('dashboard.clientSpace')}</p>
                <p className="text-sm text-slate-500">{t('dashboard.clientSpaceDesc')}</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t('dashboard.clientSpaceInfo')}
            </p>
          </motion.section>

          <div className="grid grid-cols-2 gap-4">
             <Link to="/about" className="p-4 bg-white rounded-xl border border-slate-100 hover:border-teal-100 hover:shadow-sm transition-all">
                <Briefcase size={20} className="text-slate-500 mb-2" />
                <p className="font-semibold text-sm">{t('dashboard.aboutLink')}</p>
             </Link>
             <Link to="/portal/referral" className="p-4 bg-white rounded-xl border border-slate-100 hover:border-teal-100 hover:shadow-sm transition-all">
                <Gift size={20} className="text-slate-500 mb-2" />
                <p className="font-semibold text-sm">{t('dashboard.referralLink')}</p>
             </Link>
          </div>
        </>
      )}
    </div>
  );
}
