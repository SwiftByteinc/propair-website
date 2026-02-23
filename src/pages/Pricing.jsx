import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check, Zap, Shield, Bell, Users, Star, Heart,
  MessageSquare, Briefcase, CreditCard,
  Smartphone, ArrowRight, ChevronDown, Loader2, Clover, RefreshCw
} from 'lucide-react';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';
import { useEarlyBirdCount } from '../hooks/useEarlyBirdCount';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { supabase } from '../lib/supabase';

export default function Pricing() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  const [checkoutLoading, setCheckoutLoading] = useState(null);
  const toast = useToast();
  const { remaining, isEarlyBird } = useEarlyBirdCount();

  // Clover nudge: appears 5s after the monthly card enters viewport
  const monthlyRef = useRef(null);
  const [showClover, setShowClover] = useState(false);

  useEffect(() => {
    const el = monthlyRef.current;
    if (!el) return;

    let timer;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = setTimeout(() => setShowClover(true), 5000);
        } else {
          clearTimeout(timer);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const handlePlanClick = async (plan) => {
    if (!user) {
      navigate(`/login?plan=${plan}`);
      return;
    }
    setCheckoutLoading(plan);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: { plan },
      });
      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch {
      setCheckoutLoading(null);
      toast.error(t('pricing.checkoutError') || 'Une erreur est survenue. Veuillez réessayer.');
    }
  };

  const reasons = [
    {
      icon: Shield,
      title: t('pricing.reason1Title'),
      description: t('pricing.reason1Desc')
    },
    {
      icon: Zap,
      title: t('pricing.reason2Title'),
      description: t('pricing.reason2Desc')
    },
    {
      icon: Bell,
      title: t('pricing.reason3Title'),
      description: t('pricing.reason3Desc')
    },
    {
      icon: Star,
      title: t('pricing.reason4Title'),
      description: t('pricing.reason4Desc')
    },
    {
      icon: MessageSquare,
      title: t('pricing.reason5Title'),
      description: t('pricing.reason5Desc')
    },
    {
      icon: CreditCard,
      title: t('pricing.reason6Title'),
      description: t('pricing.reason6Desc')
    }
  ];

  const proFeatures = [
    { icon: Zap, text: t('pricing.feature1') },
    { icon: Shield, text: t('pricing.feature2') },
    { icon: Bell, text: t('pricing.feature3') },
    { icon: Users, text: t('pricing.feature4') },
    { icon: Star, text: t('pricing.feature5') }
  ];

  const faqs = [
    { question: t('pricing.faq1Q'), answer: t('pricing.faq1A') },
    { question: t('pricing.faq2Q'), answer: t('pricing.faq2A') },
    { question: t('pricing.faq3Q'), answer: t('pricing.faq3A') },
    { question: t('pricing.faq4Q'), answer: t('pricing.faq4A') },
    { question: t('pricing.faq5Q'), answer: t('pricing.faq5A') },
    { question: t('pricing.faq6Q'), answer: t('pricing.faq6A') }
  ];

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen font-sans">
      <SEO
        title={t('seo.pricingTitle')}
        canonical="/pricing"
        description={t('seo.pricingDesc')}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-100 shadow-sm text-slate-600 text-xs sm:text-sm font-medium mb-6 md:mb-8">
            <Shield size={16} className="text-teal-700" />
            <span>{t('pricing.badge')}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            {t('pricing.title1')}<br/>
            <span className="text-teal-700">{t('pricing.title2')}</span>
          </h1>
          <p className="text-xl text-slate-600 font-light">
            {t('pricing.subtitle')}
          </p>
        </div>

        {/* SECTION PRO — Votre vitrine entrepreneur */}
        <section className="py-20 md:py-28 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-slate-50 rounded-2xl p-8 md:p-12 border border-slate-200 shadow-md shadow-slate-200/40"
          >
            <div className="flex items-center gap-3 mb-2">
              <Briefcase size={20} className="text-slate-700" />
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">{t('pricing.proSectionTitle')}</h2>
                <span className="px-3 py-0.5 bg-slate-900 text-white text-[10px] font-semibold rounded-full">{t('pricing.proBadge')}</span>
              </div>
            </div>

            <p className="text-lg font-medium text-slate-500 mt-4 mb-6">{t('pricing.proTagline')}</p>

            <p className="text-slate-600 leading-relaxed mb-4">
              {t('pricing.proDesc1')}
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              {t('pricing.proDesc2')}
            </p>
            <p className="text-slate-600 leading-relaxed mb-8">
              {t('pricing.proDesc3')}
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-slate-200">
                <Bell size={16} className="text-teal-700 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{t('pricing.proNotifTitle')}</p>
                  <p className="text-slate-500 text-xs mt-1">{t('pricing.proNotifDesc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-slate-200">
                <Shield size={16} className="text-teal-700 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{t('pricing.proCommTitle')}</p>
                  <p className="text-slate-500 text-xs mt-1">{t('pricing.proCommDesc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-slate-200">
                <MessageSquare size={16} className="text-teal-700 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{t('pricing.proChatTitle')}</p>
                  <p className="text-slate-500 text-xs mt-1">{t('pricing.proChatDesc')}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* POURQUOI PROPAIR (6 raisons) */}
        <section className="py-20 md:py-28 mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-slate-900 mb-4">{t('pricing.reasonsTitle')}</h2>
            <p className="text-slate-500">{t('pricing.reasonsSubtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="bg-slate-50 rounded-2xl border border-slate-200 p-6 shadow-md shadow-slate-200/40 hover:shadow-lg transition-all"
              >
                <reason.icon size={20} className={`${index % 2 === 0 ? 'text-teal-700' : 'text-slate-700'} mb-4`} />
                <h3 className="font-semibold text-slate-900 mb-2">{reason.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PRICING GRID (Cote à Cote) */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto items-center mb-24">

          {/* CARTE GAUCHE : ANNUEL (La Star) */}
          <div
            className="bg-white rounded-2xl p-5 sm:p-8 md:p-10 border-2 border-teal-700 shadow-lg relative overflow-hidden h-full flex flex-col justify-between"
          >
            {/* Ruban Promo */}
            <div className="absolute top-6 right-6">
              <span className="bg-teal-700 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                <Star size={12} className="fill-white" /> {isEarlyBird ? t('pricing.earlyBirdBadge') : t('pricing.annualBadge')}
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-2">{t('pricing.annualTitle')}</h3>
              <p className="text-teal-700 font-medium mb-6">{t('pricing.annualTagline')}</p>

              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900">
                    {isEarlyBird ? t('pricing.annualPrice') : t('pricing.annualStandardPrice')}
                  </span>
                  <span className="text-sm text-slate-500">{t('pricing.annualPeriod')}</span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm">
                  <span className="text-slate-500 line-through decoration-red-400">{t('pricing.annualOldPrice')}</span>
                  <span className="text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded">
                    {isEarlyBird ? t('pricing.annualDiscount') : t('pricing.annualStandardDiscount')}
                  </span>
                </div>
              </div>

              {/* Early Bird */}
              {isEarlyBird && (
                <div className="mb-8 p-3 bg-teal-700/10 rounded-xl border border-teal-700/20">
                  <p className="text-xs font-semibold text-teal-700">
                    {t('pricing.earlyBirdLabel')}
                  </p>
                  <p className="text-xs text-teal-700 font-semibold mt-1">
                    {t('pricing.earlyBirdRemaining', { count: remaining })}
                  </p>
                </div>
              )}

              <div className="space-y-4 mb-8 pt-8 border-t border-slate-100">
                <p className="text-xs font-medium text-slate-500">{t('pricing.annualAllIncluded')}</p>
                {proFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check size={16} className="text-teal-700 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600 text-sm font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => handlePlanClick('annual')}
              disabled={checkoutLoading !== null}
              className="block w-full py-4 px-6 text-center font-bold text-white bg-slate-900 hover:bg-black rounded-xl transition-all shadow-lg shadow-slate-900/10 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {checkoutLoading === 'annual' && <Loader2 size={20} className="animate-spin" />}
              {t('pricing.annualCta')}
            </button>

          </div>

          {/* CARTE DROITE : MENSUEL */}
          <div ref={monthlyRef} className="h-full flex flex-col">
            <div className="bg-white rounded-2xl p-5 sm:p-8 border border-slate-200 shadow-md shadow-slate-200/40 flex-1 overflow-hidden">
              <h3 className="text-2xl font-semibold text-slate-900 mb-2">{t('pricing.monthlyTitle')}</h3>
              <p className="text-slate-500 mb-6">{t('pricing.monthlyTagline')}</p>

              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-bold text-slate-900">{t('pricing.monthlyPrice')}</span>
                <span className="text-sm text-slate-500">{t('pricing.monthlyPeriod')}</span>
              </div>

              <button
                onClick={() => handlePlanClick('monthly')}
                disabled={checkoutLoading !== null}
                className="w-full py-3 px-6 text-center text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {checkoutLoading === 'monthly' && <Loader2 size={20} className="animate-spin" />}
                {t('pricing.monthlyCta')}
              </button>

              <div className="flex items-center gap-2 text-sm text-slate-500 mt-4">
                <Check size={16} className="text-teal-700" />
                <span>{t('pricing.monthlyIncluded')}</span>
              </div>

              {/* Clover nudge — appears 5s after section enters viewport */}
              <AnimatePresence>
                {showClover && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mt-6 p-3 bg-teal-700/10 rounded-xl border border-teal-700/20"
                  >
                    <div className="flex items-start gap-2">
                      <Clover size={16} className="text-teal-700 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-teal-700">{t('pricing.insiderTitle')}</p>
                        <p className="text-xs text-slate-600 mt-1">
                          {t('pricing.insiderNote')}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

        {/* CTA DARK - Prêt à développer votre clientèle ? */}
        <section className="py-24 md:py-32 mb-24">
          <div className="max-w-3xl mx-auto bg-slate-900 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
            <div className="relative z-10">
              <Smartphone size={32} className="text-teal-700 mx-auto mb-6" />
              <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                {t('pricing.ctaTitle')}
              </h3>
              <p className="text-slate-300 mb-8 max-w-lg mx-auto">
                {t('pricing.ctaDesc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/login?mode=signup"
                  className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 font-semibold py-3.5 px-8 rounded-xl hover:bg-slate-100 transition-all active:scale-[0.98]"
                >
                  {t('pricing.ctaSignup')}
                  <ArrowRight size={20} />
                </Link>
                <a
                  href="#faq"
                  className="inline-flex items-center justify-center gap-2 border border-slate-600 text-slate-300 font-semibold py-3.5 px-8 rounded-xl hover:border-slate-400 hover:text-white transition-all active:scale-[0.98]"
                >
                  {t('pricing.ctaFaq')}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST / GARANTIE */}
        <div className="py-8 border-t border-slate-200 mb-24">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
            <div className="flex items-center gap-2.5 text-sm text-slate-600">
              <Shield size={20} className="text-teal-700" />
              <span>{t('pricing.trustSecure')}</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-slate-600">
              <RefreshCw size={20} className="text-teal-700" />
              <span>{t('pricing.trustCancel')}</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-slate-600">
              <Heart size={20} className="text-teal-700 fill-teal-700" />
              <span>{t('pricing.trustSupport')}</span>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div id="faq" className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-semibold text-center text-slate-900 mb-12">
            {t('pricing.faqTitle')}
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                id={`faq-${index}`}
                className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden hover:shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  aria-expanded={openFaq === index}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0"
                  >
                    <ChevronDown size={20} className="text-slate-400" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5">
                        <p className="text-slate-500 leading-relaxed text-sm">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
