import { useState, useEffect, useCallback } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  CreditCard,
  Crown,
  ExternalLink,
  Loader2,
  Check,
  Star
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
  const { isEarlyBird, claimed, remaining, limit } = useEarlyBirdCount();

  // Handle checkout success/cancel from Stripe redirect
  // Includes polling to wait for webhook to update the DB
  useEffect(() => {
    const checkout = searchParams.get('checkout');
    if (!checkout) return;

    // Clean URL immediately
    searchParams.delete('checkout');
    setSearchParams(searchParams, { replace: true });

    if (checkout === 'success') {
      setVerifying(true);

      // Poll for subscription activation (webhook may take 1-5s)
      let attempts = 0;
      const maxAttempts = 4;
      const interval = setInterval(async () => {
        attempts++;
        try {
          await refreshProfile();
        } catch { /* ignore */ }

        // Check if subscription is now active
        if (isPro || attempts >= maxAttempts) {
          clearInterval(interval);
          setVerifying(false);
          if (isPro) {
            toast.success(t('dashboard.checkoutSuccess'));
          } else {
            // Show success anyway — webhook might still be processing
            toast.success(t('dashboard.checkoutSuccess'));
          }
        }
      }, 2000);

      return () => clearInterval(interval);
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
          <Loader2 size={32} className="animate-spin mx-auto text-teal-600 mb-4" />
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
          className="text-2xl font-bold text-slate-900"
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
              className="bg-gradient-to-br from-teal-50 to-white rounded-2xl border border-teal-100 p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center">
                    <Crown size={24} className="text-teal-700" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-teal-600 uppercase tracking-wider">{t('dashboard.activePlan')}</p>
                    <p className="text-xl font-bold text-slate-900">
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
                  className="px-5 py-2.5 bg-white text-slate-700 rounded-xl font-semibold text-sm border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all flex items-center gap-2 disabled:opacity-50"
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
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-slate-50 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                  <CreditCard size={16} className="text-slate-500" />
                </div>
                <h2 className="font-bold text-slate-900">{t('dashboard.invoicesTitle')}</h2>
              </div>
              <div className="px-6 py-8 text-center text-sm text-slate-500">
                {t('dashboard.invoicesViaPortal')}{' '}
                <button
                  onClick={handleStripePortal}
                  disabled={portalLoading}
                  className="text-teal-600 font-semibold hover:underline"
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
              className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-teal-200 relative overflow-hidden flex flex-col justify-between"
            >
              {/* Badge */}
              <div className="absolute top-5 right-5">
                <span className="bg-amber-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide flex items-center gap-1">
                  <Star size={10} className="fill-white" /> {isEarlyBird ? t('pricing.earlyBirdBadge') : t('pricing.annualBadge')}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{t('pricing.annualTitle')}</h3>
                <p className="text-teal-600 font-medium text-sm mb-5">{t('pricing.annualTagline')}</p>

                <div className="mb-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-bold text-slate-900">
                      {isEarlyBird ? t('pricing.annualPrice') : t('pricing.annualStandardPrice')}
                    </span>
                    <span className="text-sm text-slate-500">{t('pricing.annualPeriod')}</span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-2 text-sm">
                    <span className="text-slate-500 line-through decoration-red-400">{t('pricing.annualOldPrice')}</span>
                    <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded text-xs">
                      {isEarlyBird ? t('pricing.annualDiscount') : t('pricing.annualStandardDiscount')}
                    </span>
                  </div>
                </div>

                {/* Early Bird Progress */}
                {isEarlyBird && (
                  <div className="mb-6 p-3 bg-amber-50 rounded-xl border border-amber-100">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-amber-800">{t('pricing.earlyBirdLabel')}</span>
                      <span className="text-xs font-bold text-amber-600">{claimed}/{limit}</span>
                    </div>
                    <div className="h-2 bg-amber-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(claimed / limit) * 100}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
                      />
                    </div>
                    <p className="text-xs text-amber-700 font-semibold mt-1.5">
                      {t('pricing.earlyBirdRemaining', { count: remaining })}
                    </p>
                  </div>
                )}

                <div className="space-y-3 mb-6 pt-6 border-t border-slate-100">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('pricing.annualAllIncluded')}</p>
                  {[t('pricing.feature1'), t('pricing.feature2'), t('pricing.feature3'), t('pricing.feature4'), t('pricing.feature5')].map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 bg-teal-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={12} className="text-teal-600" />
                      </div>
                      <span className="text-slate-600 text-sm">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleCheckout('annual')}
                disabled={checkoutLoading !== null}
                className="w-full py-3.5 px-6 font-bold text-white bg-slate-900 hover:bg-black rounded-xl transition-all shadow-lg shadow-slate-900/10 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
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
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{t('pricing.monthlyTitle')}</h3>
                <p className="text-slate-500 text-sm mb-5">{t('pricing.monthlyTagline')}</p>

                <div className="mb-6 flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-bold text-slate-900">{t('pricing.monthlyPrice')}</span>
                  <span className="text-sm text-slate-500">{t('pricing.monthlyPeriod')}</span>
                </div>

                <div className="space-y-3 mb-6 pt-6 border-t border-slate-100">
                  <p className="text-xs font-bold text-slate-500 uppercase">{t('pricing.monthlyIncluded')}</p>
                  {[t('pricing.feature1'), t('pricing.feature2'), t('pricing.feature3'), t('pricing.feature4'), t('pricing.feature5')].map((feat, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-sm text-slate-600">
                      <Check size={12} className="text-teal-600" /> {feat}
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleCheckout('monthly')}
                disabled={checkoutLoading !== null}
                className="w-full py-3.5 px-6 font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
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
