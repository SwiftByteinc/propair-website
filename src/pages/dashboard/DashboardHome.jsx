import { useState, useEffect } from 'react';
import { useOutletContext, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  Crown,
  Zap,
  Rocket,
  ChevronRight,
  CreditCard,
  Users,
  Briefcase,
  HelpCircle,
  Shield,
  Loader2
} from 'lucide-react';
// FEATURE_FLAG: V2_REFERRAL — import { useReferralStats } from '../../hooks/useReferralStats';
// FEATURE_FLAG: V2_REFERRAL — import { copyToClipboard } from '../../lib/clipboard';
import { useToast } from '../../context/ToastContext';
import { useLanguage } from '../../context/LanguageContext';
import { STORAGE_KEYS } from '../../lib/constants';
import { supabase } from '../../lib/supabase';

export default function DashboardHome() {
  const { t } = useLanguage();
  const { user, isPro } = useOutletContext();
  const toast = useToast();
  const isEntrepreneur = user?.role === 'entrepreneur';
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  // Process pending plan from signup flow (auto-redirect to Stripe Checkout)
  useEffect(() => {
    const pendingPlan = sessionStorage.getItem(STORAGE_KEYS.PENDING_PLAN);
    if (!pendingPlan || isPro || !supabase) return;

    // Clear immediately to prevent infinite loop if user cancels on Stripe
    sessionStorage.removeItem(STORAGE_KEYS.PENDING_PLAN);

    if (!['monthly', 'annual'].includes(pendingPlan)) return;

    const startCheckout = async () => {
      setCheckoutLoading(true);
      try {
        const { data, error } = await supabase.functions.invoke('create-checkout-session', {
          body: { plan: pendingPlan },
        });
        if (error) throw error;
        if (data?.url) {
          window.location.href = data.url;
        }
      } catch (err) {
        console.error('Checkout error:', err);
        toast.error(t('dashboard.checkoutError'));
        setCheckoutLoading(false);
      }
    };

    startCheckout();
  }, [isPro, toast, t]);

  // Données utilisateur
  const connectionsTotal = 3; // Configurable plus tard via API
  const connectionsUsed = user?.leads_used || 0;
  const connectionsRemaining = user?.isPro ? 999 : Math.max(0, connectionsTotal - connectionsUsed);

  const navigate = useNavigate();

  const handleStripeAction = () => {
    navigate('/portal/billing');
  };

  const firstName = user?.full_name?.split(' ')[0] || t('dashboard.helloFallback');
  const hour = new Date().getHours();
  const greetingKey = hour < 12 ? 'dashboard.helloMorning' : hour < 18 ? 'dashboard.helloAfternoon' : 'dashboard.helloEvening';

  // Show loading overlay when checkout session is being created
  if (checkoutLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4 sm:p-6 md:p-8 max-w-4xl flex items-center justify-center min-h-[50vh]"
      >
        <div className="text-center">
          <Loader2 size={32} className="animate-spin mx-auto text-teal-700 mb-4" />
          <p className="font-semibold text-slate-900">{t('dashboard.redirectingToCheckout')}</p>
          <p className="text-sm text-slate-500 mt-1">{t('dashboard.pleaseWait')}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-4xl">
      <Helmet><title>{t('dashboard.homeTitle')}</title></Helmet>

      {/* Header */}
      <header className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl sm:text-2xl font-bold text-slate-900"
        >
          {t(greetingKey, { name: firstName })}
        </motion.h1>
        <p className="text-slate-500 mt-1">
          {t('dashboard.controlTower')}
        </p>
      </header>

      {/* STATUS BADGE */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className={`rounded-2xl py-4 px-5 mb-6 ${
          user?.isPro
            ? 'bg-teal-700/10 border border-teal-700/20'
            : 'bg-amber-50 border border-amber-100'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
              user?.isPro ? 'bg-teal-700/10 text-teal-700' : 'bg-amber-100 text-amber-700'
            }`}>
              {user?.isPro ? <Crown size={20} /> : <Zap size={20} />}
            </div>
            <div>
              <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold mb-1 ${
                user?.isPro ? 'bg-teal-700/10 text-teal-700' : 'bg-amber-100 text-amber-800'
              }`}>
                {user?.isPro ? (
                  <>
                    <Shield size={12} />
                    {t('dashboard.memberElite')}
                  </>
                ) : (
                  <>
                    {t('dashboard.trialMode', { used: connectionsUsed, total: connectionsTotal })}
                  </>
                )}
              </div>
              <p className="text-base sm:text-lg font-semibold text-slate-900">
                {user?.isPro ? t('dashboard.unlimitedConnections') : t('dashboard.connectionsRemaining', { count: connectionsRemaining })}
              </p>
              {!user?.isPro && (
                <div className="mt-2 w-full max-w-48">
                  <div className="h-2 bg-amber-200 rounded-full overflow-hidden">
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
            className={`px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700/30 focus-visible:ring-offset-2 ${
              user?.isPro
                ? 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:shadow-sm'
                : 'bg-slate-900 text-white hover:bg-black shadow-lg shadow-slate-900/10'
            }`}
          >
            <CreditCard size={20} />
            {user?.isPro ? t('dashboard.manageSubscription') : t('dashboard.upgradeToPro')}
            <ChevronRight size={16} />
          </button>
        </div>
      </motion.section>

      {/* DASHBOARD CONTENT */}
      {isEntrepreneur ? (
        <>
          {/* FEATURE_FLAG: V2_REFERRAL — was REFERRAL MODULE, replaced by Coming Soon teaser */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-md shadow-slate-200/40 overflow-hidden mb-6"
          >
            <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-700/10 flex items-center justify-center">
                  <Rocket size={16} className="text-teal-700" />
                </div>
                <h2 className="font-semibold text-slate-900">{t('dashboard.comingSoonSection')}</h2>
              </div>
              <span className="text-[10px] font-semibold bg-teal-700/10 text-teal-700 px-2 py-0.5 rounded-full">
                {t('dashboard.badgeSoon')}
              </span>
            </div>

            <div className="p-6">
              <p className="text-sm text-slate-600 mb-4">{t('dashboard.comingSoonHomeDesc')}</p>
              <Link
                to="/portal/referral"
                className="text-sm font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700/30 focus-visible:ring-offset-2 rounded"
              >
                {t('dashboard.comingSoonHomeLink')}
                <ChevronRight size={14} />
              </Link>
            </div>
          </motion.section>

          {/* QUICK LINKS */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <Link
              to="/portal/billing"
              className="p-4 bg-white rounded-xl border border-slate-200 shadow-md shadow-slate-200/40 hover:shadow-md hover:-translate-y-0.5 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700/30 focus-visible:ring-offset-2"
            >
              <CreditCard size={20} className="text-slate-500 group-hover:text-teal-700 mb-2" />
              <p className="font-semibold text-sm text-slate-900">{t('dashboard.subscriptionLink')}</p>
              <p className="text-xs text-slate-500">{t('dashboard.invoicesAndPayment')}</p>
            </Link>

            <a
              href="mailto:support@propairapp.com"
              className="p-4 bg-white rounded-xl border border-slate-200 shadow-md shadow-slate-200/40 hover:shadow-md hover:-translate-y-0.5 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700/30 focus-visible:ring-offset-2"
            >
              <HelpCircle size={20} className="text-slate-500 group-hover:text-teal-700 mb-2" />
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
            className="bg-white rounded-2xl border border-slate-200 shadow-md shadow-slate-200/40 p-6 mb-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-teal-700/10 flex items-center justify-center">
                <Users size={24} className="text-teal-700" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">{t('dashboard.clientSpace')}</p>
                <p className="text-sm text-slate-500">{t('dashboard.clientSpaceDesc')}</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t('dashboard.clientSpaceInfo')}
            </p>
          </motion.section>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <Link to="/about" className="p-4 bg-white rounded-xl border border-slate-200 shadow-md shadow-slate-200/40 hover:shadow-md hover:-translate-y-0.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700/30 focus-visible:ring-offset-2">
                <Briefcase size={20} className="text-slate-500 mb-2" />
                <p className="font-semibold text-sm">{t('dashboard.aboutLink')}</p>
             </Link>
             {/* FEATURE_FLAG: V2_REFERRAL — was referral link */}
             <Link to="/portal/referral" className="p-4 bg-white rounded-xl border border-slate-200 shadow-md shadow-slate-200/40 hover:shadow-md hover:-translate-y-0.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700/30 focus-visible:ring-offset-2">
                <Rocket size={20} className="text-teal-700 mb-2" />
                <p className="font-semibold text-sm">{t('dashboard.sideComingSoon')}</p>
                <p className="text-[10px] font-semibold text-teal-700 mt-1">{t('dashboard.badgeSoon')}</p>
             </Link>
          </div>
        </>
      )}
    </div>
  );
}
