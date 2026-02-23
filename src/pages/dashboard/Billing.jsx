import { useState, useEffect, useCallback, useRef } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  CreditCard,
  Crown,
  ExternalLink,
  Loader2,
  Check,
  Star,
  ChevronDown
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useLanguage } from '../../context/LanguageContext';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { useEarlyBirdCount } from '../../hooks/useEarlyBirdCount';

export default function Billing() {
  const { t, lang } = useLanguage();
  const { subscription, isPro } = useOutletContext();
  const { refreshProfile } = useAuth();
  const toast = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [portalLoading, setPortalLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(null); // 'monthly' | 'annual' | null
  const [verifying, setVerifying] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const { isEarlyBird, remaining } = useEarlyBirdCount();

  // Keep refs to avoid stale closures in async polling
  const isProRef = useRef(isPro);
  useEffect(() => { isProRef.current = isPro; }, [isPro]);

  // Handle checkout success/cancel from Stripe redirect
  useEffect(() => {
    const checkout = searchParams.get('checkout');
    if (!checkout) return;

    // Clean URL immediately
    searchParams.delete('checkout');
    setSearchParams(searchParams, { replace: true });

    if (checkout === 'success') {
      setVerifying(true);
      let cancelled = false;

      const poll = async () => {
        const maxAttempts = 5;
        for (let i = 0; i < maxAttempts; i++) {
          if (cancelled) return;
          await new Promise(r => setTimeout(r, 2000));
          if (cancelled) return;
          try { await refreshProfile(); } catch { /* ignore */ }
          if (isProRef.current) {
            setVerifying(false);
            toast.success(t('dashboard.checkoutSuccess'));
            return;
          }
        }
        // Webhook might still be processing — show success, user can reload
        if (!cancelled) {
          setVerifying(false);
          toast.success(t('dashboard.checkoutSuccess'));
        }
      };
      poll();

      return () => { cancelled = true; };
    } else if (checkout === 'cancelled') {
      toast.info(t('dashboard.checkoutCancelled'));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Format date
  const formatDate = (timestamp) => {
    if (!timestamp) return t('dashboard.notAvailable');
    const date = typeof timestamp === 'number'
      ? new Date(timestamp * 1000)
      : new Date(timestamp);
    return date.toLocaleDateString(lang === 'fr' ? 'fr-CA' : 'en-CA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const renewalDate = subscription?.current_period_end
    ? formatDate(subscription.current_period_end)
    : t('dashboard.noActiveSubscription');

  // Open Stripe Customer Portal
  const handleStripePortal = useCallback(async () => {
    if (!supabase) return;
    setPortalLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-portal-session');
      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Portal error:', err);
      toast.error(t('dashboard.portalError'));
    } finally {
      setPortalLoading(false);
    }
  }, [toast, t]);

  // Create checkout session for a specific plan
  const handleCheckout = useCallback(async (plan) => {
    if (!supabase) return;
    setCheckoutLoading(plan);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: { plan },
      });
      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Checkout error:', err);
      toast.error(t('dashboard.checkoutError'));
    } finally {
      setCheckoutLoading(null);
    }
  }, [toast, t]);

  // Show verification loader after successful checkout
  if (verifying) {
    return (
      <div className="p-4 sm:p-6 md:p-8 max-w-4xl flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <Loader2 size={32} className="animate-spin mx-auto text-teal-700 mb-4" />
          <p className="font-semibold text-slate-900">{t('dashboard.verifyingPayment')}</p>
          <p className="text-sm text-slate-500 mt-1">{t('dashboard.pleaseWait')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-4xl">
      <Helmet><title>{t('dashboard.billingTitle')}</title></Helmet>
      <header className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl sm:text-2xl font-bold text-slate-900"
        >
          {t('dashboard.billingHeading')}
        </motion.h1>
        <p className="text-slate-500 mt-1">
          {isPro ? t('dashboard.billingProSubtitle') : t('dashboard.billingFreeSubtitle')}
        </p>
      </header>

      <div className="space-y-6">
        {isPro ? (
          <>
            {/* Active Subscription Card */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-teal-700/15 to-white rounded-2xl border border-teal-700/20 shadow-sm p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-700/10 flex items-center justify-center">
                    <Crown size={24} className="text-teal-700" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-teal-700">{t('dashboard.activePlan')}</p>
                    <p className="text-base sm:text-xl font-semibold text-slate-900">
                      {t('dashboard.planName')} — {subscription?.plan === 'annual'
                        ? t('dashboard.planAnnual')
                        : t('dashboard.planMonthly')}
                    </p>
                    <p className="text-sm text-slate-500">
                      {t('dashboard.renewalDate', { date: renewalDate })}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleStripePortal}
                  disabled={portalLoading}
                  className="px-6 py-3 bg-white text-slate-700 rounded-xl font-semibold text-sm border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all flex items-center gap-2 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700/30 focus-visible:ring-offset-2"
                >
                  {portalLoading ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <ExternalLink size={14} />
                  )}
                  {t('dashboard.manageSubscription')}
                </button>
              </div>
            </motion.section>

            {/* Invoices — via Stripe Portal */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="bg-white rounded-2xl border border-slate-100/60 shadow-sm overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-slate-50 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                  <CreditCard size={16} className="text-slate-500" />
                </div>
                <h2 className="font-semibold text-slate-900">{t('dashboard.invoicesTitle')}</h2>
              </div>
              <div className="px-6 py-8 text-center text-sm text-slate-500">
                {t('dashboard.invoicesViaPortal')}{' '}
                <button
                  onClick={handleStripePortal}
                  disabled={portalLoading}
                  className="text-teal-700 font-semibold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700/30 rounded"
                >
                  {t('dashboard.openPortal')}
                </button>
              </div>
            </motion.section>
          </>
        ) : (
          /* Non-Pro: Pricing-style checkout cards */
          <div className="grid md:grid-cols-2 gap-6 items-start">

            {/* CARTE ANNUEL */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-teal-700/20 shadow-sm relative overflow-hidden flex flex-col justify-between"
            >
              {/* Badge */}
              <div className="absolute top-5 right-5">
                <span className="bg-teal-700 text-white text-[10px] font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Star size={10} className="fill-white" /> {isEarlyBird ? t('pricing.earlyBirdBadge') : t('pricing.annualBadge')}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-1">{t('pricing.annualTitle')}</h3>
                <p className="text-teal-700 font-medium text-sm mb-5">{t('pricing.annualTagline')}</p>

                <div className="mb-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-bold text-slate-900">
                      {isEarlyBird ? t('pricing.annualPrice') : t('pricing.annualStandardPrice')}
                    </span>
                    <span className="text-sm text-slate-500">{t('pricing.annualPeriod')}</span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-2 text-sm">
                    <span className="text-slate-500 line-through decoration-red-400">{t('pricing.annualOldPrice')}</span>
                    <span className="text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded text-xs">
                      {isEarlyBird ? t('pricing.annualDiscount') : t('pricing.annualStandardDiscount')}
                    </span>
                  </div>
                </div>

                {/* Early Bird */}
                {isEarlyBird && (
                  <div className="mb-6 p-3 bg-teal-700/10 rounded-xl border border-teal-700/20">
                    <p className="text-xs font-semibold text-teal-700">{t('pricing.earlyBirdLabel')}</p>
                    <p className="text-xs text-teal-700 font-semibold mt-1">
                      {t('pricing.earlyBirdRemaining', { count: remaining })}
                    </p>
                  </div>
                )}

                <div className="mb-6 pt-6 border-t border-slate-100">
                  <button
                    onClick={() => setShowFeatures(!showFeatures)}
                    className="md:hidden flex items-center gap-1.5 text-xs font-medium text-teal-700 mb-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700/30 rounded"
                  >
                    {showFeatures ? t('dashboard.hideFeatures') : t('dashboard.showFeatures')}
                    <ChevronDown size={14} className={`transition-transform ${showFeatures ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`${showFeatures ? 'block' : 'hidden'} md:block space-y-3`}>
                    <p className="text-xs font-medium text-slate-500">{t('pricing.annualAllIncluded')}</p>
                    {[t('pricing.feature1'), t('pricing.feature2'), t('pricing.feature3'), t('pricing.feature4'), t('pricing.feature5')].map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <div className="w-5 h-5 bg-teal-700/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check size={12} className="text-teal-700" />
                        </div>
                        <span className="text-slate-600 text-sm">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleCheckout('annual')}
                disabled={checkoutLoading !== null}
                className="w-full py-3.5 px-6 font-bold text-white bg-slate-900 hover:bg-black rounded-xl transition-all shadow-lg shadow-slate-900/10 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700/30 focus-visible:ring-offset-2"
              >
                {checkoutLoading === 'annual' && <Loader2 size={18} className="animate-spin" />}
                {t('dashboard.chooseAnnual')}
              </button>

              <p className="text-center text-xs text-slate-500 mt-3">{t('pricing.annualNote')}</p>
            </motion.section>

            {/* CARTE MENSUEL */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/60 shadow-sm flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-1">{t('pricing.monthlyTitle')}</h3>
                <p className="text-slate-500 text-sm mb-5">{t('pricing.monthlyTagline')}</p>

                <div className="mb-6 flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-bold text-slate-900">{t('pricing.monthlyPrice')}</span>
                  <span className="text-sm text-slate-500">{t('pricing.monthlyPeriod')}</span>
                </div>

                <div className="mb-6 pt-6 border-t border-slate-100">
                  <button
                    onClick={() => setShowFeatures(!showFeatures)}
                    className="md:hidden flex items-center gap-1.5 text-xs font-medium text-teal-700 mb-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700/30 rounded"
                  >
                    {showFeatures ? t('dashboard.hideFeatures') : t('dashboard.showFeatures')}
                    <ChevronDown size={14} className={`transition-transform ${showFeatures ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`${showFeatures ? 'block' : 'hidden'} md:block space-y-3`}>
                    <p className="text-xs font-medium text-slate-500">{t('pricing.monthlyIncluded')}</p>
                    {[t('pricing.feature1'), t('pricing.feature2'), t('pricing.feature3'), t('pricing.feature4'), t('pricing.feature5')].map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <div className="w-5 h-5 bg-teal-700/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check size={12} className="text-teal-700" />
                        </div>
                        <span className="text-slate-600 text-sm">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleCheckout('monthly')}
                disabled={checkoutLoading !== null}
                className="w-full py-3.5 px-6 font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700/30 focus-visible:ring-offset-2"
              >
                {checkoutLoading === 'monthly' && <Loader2 size={18} className="animate-spin" />}
                {t('dashboard.chooseMonthly')}
              </button>
            </motion.section>

          </div>
        )}
      </div>
    </div>
  );
}
