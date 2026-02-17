import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check, Zap, Shield, Bell, Users, Star, Info, Heart,
  MessageSquare, Briefcase, CreditCard,
  Smartphone, ArrowRight, ChevronDown, X
} from 'lucide-react';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';

export default function Pricing() {
  const { t } = useLanguage();
  const [showInsider, setShowInsider] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // Déclencheur après 5 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInsider(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

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
    <div className="pt-32 pb-24 bg-white min-h-screen font-sans selection:bg-teal-50 selection:text-teal-700">
      <SEO
        title={t('seo.pricingTitle')}
        canonical="/pricing"
        description={t('seo.pricingDesc')}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-100 shadow-sm text-slate-600 text-xs sm:text-sm font-medium mb-6 md:mb-8">
            <Shield size={14} className="text-teal-600" />
            <span>{t('pricing.badge')}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            {t('pricing.title1')}<br/>
            <span className="text-teal-600">{t('pricing.title2')}</span>
          </h1>
          <p className="text-xl text-slate-600 font-light">
            {t('pricing.subtitle')}
          </p>
        </div>

        {/* SECTION PRO — Votre vitrine entrepreneur */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-slate-50 rounded-[2rem] p-8 md:p-12 border border-slate-100"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center">
                <Briefcase size={24} className="text-amber-600" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{t('pricing.proSectionTitle')}</h2>
                <span className="px-3 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-full uppercase tracking-wide">{t('pricing.proBadge')}</span>
              </div>
            </div>

            <p className="text-lg font-medium text-amber-600 mt-4 mb-6">{t('pricing.proTagline')}</p>

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
              <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-slate-100">
                <div className="p-1.5 bg-amber-100 rounded-full mt-0.5"><Bell size={16} className="text-amber-700" /></div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{t('pricing.proNotifTitle')}</p>
                  <p className="text-slate-500 text-xs mt-1">{t('pricing.proNotifDesc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-slate-100">
                <div className="p-1.5 bg-amber-100 rounded-full mt-0.5"><Shield size={16} className="text-amber-700" /></div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{t('pricing.proCommTitle')}</p>
                  <p className="text-slate-500 text-xs mt-1">{t('pricing.proCommDesc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-slate-100">
                <div className="p-1.5 bg-amber-100 rounded-full mt-0.5"><MessageSquare size={16} className="text-amber-700" /></div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{t('pricing.proChatTitle')}</p>
                  <p className="text-slate-500 text-xs mt-1">{t('pricing.proChatDesc')}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* POURQUOI PROPAIR (6 raisons) */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('pricing.reasonsTitle')}</h2>
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
                className="bg-slate-50 rounded-2xl border border-slate-100 p-6 hover:border-teal-100 transition-colors"
              >
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-4 border border-slate-100">
                  <reason.icon size={20} className="text-teal-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{reason.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PRICING GRID (Cote à Cote) */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto items-center mb-24">

          {/* CARTE GAUCHE : ANNUEL (La Star) */}
          <motion.div
            animate={{
              scale: showInsider ? 1.02 : 1,
              borderColor: showInsider ? '#0d9488' : '#e2e8f0',
              boxShadow: showInsider ? '0 25px 50px -12px rgba(13, 148, 136, 0.15)' : '0 0 0 0 rgba(0,0,0,0)'
            }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-[2rem] p-5 sm:p-8 md:p-10 border-2 relative overflow-hidden h-full flex flex-col justify-between"
          >
            {/* Ruban Promo */}
            <div className="absolute top-6 right-6">
              <span className="bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm uppercase tracking-wide flex items-center gap-1">
                <Star size={12} className="fill-white" /> {t('pricing.annualBadge')}
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{t('pricing.annualTitle')}</h3>
              <p className="text-teal-600 font-medium mb-6">{t('pricing.annualTagline')}</p>

              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900">{t('pricing.annualPrice')}</span>
                  <span className="text-sm text-slate-500">{t('pricing.annualPeriod')}</span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm">
                  <span className="text-slate-500 line-through decoration-red-400">{t('pricing.annualOldPrice')}</span>
                  <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded">{t('pricing.annualDiscount')}</span>
                </div>
              </div>

              <div className="space-y-4 mb-8 pt-8 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('pricing.annualAllIncluded')}</p>
                {proFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-teal-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={14} className="text-teal-600" />
                    </div>
                    <span className="text-slate-600 text-sm font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              to="/login?plan=annual"
              className="block w-full py-4 px-6 text-center font-bold text-white bg-slate-900 hover:bg-black rounded-xl transition-all shadow-lg shadow-slate-900/10 hover:-translate-y-0.5 active:scale-[0.98]"
            >
              {t('pricing.annualCta')}
            </Link>

            <p className="text-center text-xs text-slate-500 mt-4">
              {t('pricing.annualNote')}
            </p>
          </motion.div>

          {/* CARTE DROITE : MENSUEL + Overlay Insider */}
          <div className="relative h-full flex flex-col">
            <div className="bg-white rounded-[2rem] p-5 sm:p-8 border border-slate-200 flex-1 relative z-10 overflow-hidden">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{t('pricing.monthlyTitle')}</h3>
              <p className="text-slate-500 mb-6">{t('pricing.monthlyTagline')}</p>

              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-bold text-slate-900">{t('pricing.monthlyPrice')}</span>
                <span className="text-sm text-slate-500">{t('pricing.monthlyPeriod')}</span>
              </div>

              <Link
                to="/login?plan=monthly"
                className="block w-full py-3 px-6 text-center font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all mb-8 active:scale-[0.98]"
              >
                {t('pricing.monthlyCta')}
              </Link>

              <div className="space-y-3">
                <p className="text-xs font-bold text-slate-500 uppercase">{t('pricing.monthlyIncluded')}</p>
                {proFeatures.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-slate-600">
                    <Check size={14} className="text-teal-600" /> {f.text}
                  </div>
                ))}
              </div>

              {/* Overlay Insider - apparaît après 5s SUR la carte */}
              <AnimatePresence>
                {showInsider && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    role="dialog"
                    aria-label={t('pricing.insiderTitle')}
                    className="absolute inset-0 z-20 bg-white/80 backdrop-blur-sm rounded-[2rem] flex items-center justify-center p-4 sm:p-8"
                  >
                    <div className="text-center max-w-xs relative">
                      <button
                        onClick={() => setShowInsider(false)}
                        className="absolute -top-2 -right-2 w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-500 transition-colors"
                        aria-label={t('common.close')}
                      >
                        <X size={16} />
                      </button>
                      <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Info size={22} className="text-amber-600" />
                      </div>
                      <p className="font-bold text-slate-900 text-lg mb-2">{t('pricing.insiderTitle')}</p>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">
                        {t('pricing.insiderDesc1')} <span className="text-red-500 font-bold">{t('pricing.insiderDesc2')}</span> {t('pricing.insiderDesc3')} <span className="text-green-600 font-bold">{t('pricing.insiderDesc4')}</span> {t('pricing.insiderDesc5')}
                      </p>
                      <p className="text-slate-500 text-xs mb-5">
                        {t('pricing.insiderNote')}
                      </p>
                      <Link
                        to="/login?plan=annual"
                        className="inline-block px-6 py-2.5 bg-slate-900 hover:bg-black text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-slate-900/10 active:scale-[0.98]"
                      >
                        {t('pricing.insiderCta')}
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* CTA DARK - Prêt à développer votre clientèle ? */}
        <section className="mb-24">
          <div className="max-w-3xl mx-auto bg-slate-900 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
            <div className="relative z-10">
              <Smartphone size={40} className="text-teal-400 mx-auto mb-6" />
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {t('pricing.ctaTitle')}
              </h3>
              <p className="text-slate-300 mb-8 max-w-lg mx-auto">
                {t('pricing.ctaDesc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/login?mode=signup"
                  className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 font-bold py-3.5 px-8 rounded-xl hover:bg-slate-100 transition-all active:scale-[0.98]"
                >
                  {t('pricing.ctaSignup')}
                  <ArrowRight size={18} />
                </Link>
                <a
                  href="#faq"
                  className="inline-flex items-center justify-center gap-2 border border-slate-600 text-slate-300 font-bold py-3.5 px-8 rounded-xl hover:border-slate-400 hover:text-white transition-all active:scale-[0.98]"
                >
                  {t('pricing.ctaFaq')}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST / GARANTIE */}
        <div className="text-center border-t border-slate-100 pt-16 mb-24">
          <div className="inline-flex flex-col items-center">
            <Heart size={32} className="text-amber-400 fill-amber-400 mb-4" />
            <h3 className="text-lg font-bold text-slate-900">{t('pricing.trustTitle')}</h3>
            <p className="text-slate-500 max-w-lg mx-auto mt-2">
              {t('pricing.trustDesc')}
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div id="faq" className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            {t('pricing.faqTitle')}
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden hover:border-teal-100 transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0"
                  >
                    <ChevronDown size={18} className="text-slate-400" />
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
