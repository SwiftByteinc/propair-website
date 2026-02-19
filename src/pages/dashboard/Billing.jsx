import { useState, useEffect, useCallback } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  CreditCard,
  Crown,
  ExternalLink,
  Loader2,
  CheckCircle
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useLanguage } from '../../context/LanguageContext';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

export default function Billing() {
  const { t, lang } = useLanguage();
  const { subscription, isPro } = useOutletContext();
  const { refreshProfile } = useAuth();
  const toast = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [portalLoading, setPortalLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(null); // 'monthly' | 'annual' | null
  const [verifying, setVerifying] = useState(false);

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
          /* Non-Pro: Show checkout options */
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-slate-100 p-8"
          >
            <div className="text-center mb-8">
              <Crown size={48} className="mx-auto text-amber-600 mb-4" />
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                {t('dashboard.goProTitle')}
              </h2>
              <p className="text-slate-500">{t('dashboard.goProDesc')}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto">
              {/* Annual Plan Card */}
              <button
                onClick={() => handleCheckout('annual')}
                disabled={checkoutLoading !== null}
                className="p-6 rounded-xl border-2 border-teal-200 bg-teal-50/50 hover:border-teal-300 transition-all text-left disabled:opacity-50"
              >
                <p className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-1">
                  {t('dashboard.annualPlanLabel')}
                </p>
                <p className="text-2xl font-bold text-slate-900">149$<span className="text-sm font-normal text-slate-500">{t('dashboard.perYear')}</span></p>
                <p className="text-xs text-green-600 font-semibold mt-1">{t('dashboard.annualSaving')}</p>
                <div className="mt-4 w-full py-2.5 bg-slate-900 text-white rounded-lg font-semibold text-sm text-center flex items-center justify-center gap-2">
                  {checkoutLoading === 'annual' ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <CheckCircle size={16} />
                  )}
                  {t('dashboard.chooseAnnual')}
                </div>
              </button>

              {/* Monthly Plan Card */}
              <button
                onClick={() => handleCheckout('monthly')}
                disabled={checkoutLoading !== null}
                className="p-6 rounded-xl border border-slate-200 hover:border-slate-300 transition-all text-left disabled:opacity-50"
              >
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  {t('dashboard.monthlyPlanLabel')}
                </p>
                <p className="text-2xl font-bold text-slate-900">24$<span className="text-sm font-normal text-slate-500">{t('dashboard.perMonth')}</span></p>
                <p className="text-xs text-slate-500 mt-1">{t('dashboard.monthlyFlexible')}</p>
                <div className="mt-4 w-full py-2.5 bg-slate-100 text-slate-700 rounded-lg font-semibold text-sm text-center flex items-center justify-center gap-2">
                  {checkoutLoading === 'monthly' ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <CreditCard size={16} />
                  )}
                  {t('dashboard.chooseMonthly')}
                </div>
              </button>
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
