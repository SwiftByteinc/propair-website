import { useOutletContext, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  CreditCard,
  Crown,
  ExternalLink
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useLanguage } from '../../context/LanguageContext';

export default function Billing() {
  const { t, lang } = useLanguage();
  const { subscription, isPro } = useOutletContext();
  const toast = useToast();

  // Formatage dynamique de la date
  const formatDate = (timestamp) => {
    if (!timestamp) return t('dashboard.notAvailable');
    // Support both Unix timestamp (seconds) and ISO string
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


  const handleStripePortal = () => {
    toast.info(t('dashboard.billingToast'));
  };

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
            {/* Status Card */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-teal-50 to-white rounded-2xl border border-teal-100 p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center">
                    <Crown size={24} className="text-teal-700" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-teal-600 uppercase tracking-wider">{t('dashboard.activePlan')}</p>
                    <p className="text-xl font-bold text-slate-900">{t('dashboard.planName')}</p>
                    <p className="text-sm text-slate-500">
                      {t('dashboard.renewalDate', { date: renewalDate })}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleStripePortal}
                  className="px-5 py-2.5 bg-white text-slate-700 rounded-xl font-semibold text-sm border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all flex items-center gap-2"
                >
                  {t('dashboard.manageViaApp')}
                  <ExternalLink size={14} />
                </button>
              </div>
            </motion.section>

            {/* Invoices info */}
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
                {t('dashboard.invoicesDesc')}
              </div>
            </motion.section>
          </>
        ) : (
          /* Non-Pro State : Redirection vers Pricing */
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 bg-white rounded-2xl border border-slate-100"
          >
            <Crown size={48} className="mx-auto text-amber-600 mb-4" />
            <h2 className="text-xl font-bold text-slate-900 mb-2">{t('dashboard.goProTitle')}</h2>
            <p className="text-slate-500 mb-6">{t('dashboard.goProDesc')}</p>
            <Link
              to="/pricing"
              className="inline-block px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-black transition-colors shadow-lg shadow-slate-900/10"
            >
              {t('dashboard.seeOffers')}
            </Link>
          </motion.section>
        )}
      </div>
    </div>
  );
}
