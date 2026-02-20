import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Smartphone,
  Briefcase,
  Check,
  Star,
  MessageSquare,
  Layout,
  Clock,
  Search,
  Users
} from 'lucide-react';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const { t } = useLanguage();
  return (
    <div className="w-full overflow-hidden bg-white font-sans selection:bg-teal-50 selection:text-teal-700">
      <SEO
        canonical="/"
        description={t('seo.homeDesc')}
      />

      {/* HERO SECTION */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-teal-50/50 via-white to-white" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 md:pt-32 md:pb-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-100 shadow-sm text-slate-600 text-xs sm:text-sm font-medium mb-6 md:mb-8">
              <Star size={14} className="fill-teal-500 text-teal-500" />
              <span>{t('home.badge')}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.1] mb-6 md:mb-8 tracking-tight">
              {t('home.heroTitle1')}{' '}
              <span className="text-teal-600 relative inline-block">
                {t('home.heroTitle2')}
                <svg className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-2 md:h-3 text-teal-400 opacity-60" viewBox="0 0 300 12" fill="none"><path d="M2 9.5C55.5 3.5 168.5 -1.5 298 9.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/></svg>
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-slate-600 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed font-light px-2">
              {t('home.heroSubtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-12 md:mb-16 px-4 sm:px-0">
              <a
                href="#telecharger"
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 hover:bg-black text-white font-bold rounded-2xl transition-all hover:-translate-y-0.5 w-full sm:w-auto active:scale-[0.98] duration-200 shadow-lg shadow-slate-900/10"
              >
                <Smartphone size={20} />
                {t('home.ctaDownload')}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                to="/pricing"
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-white text-slate-700 border border-slate-200 font-semibold rounded-2xl transition-all hover:border-slate-300 hover:text-slate-900 w-full sm:w-auto active:scale-[0.98] duration-200"
              >
                <Briefcase size={20} />
                {t('home.ctaPro')}
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 sm:gap-6 justify-center text-sm font-medium text-slate-500 px-4 sm:px-0">
              <div className="flex items-center justify-center gap-2">
                <Check size={18} className="text-teal-600" /> {t('home.badgeCommission')}
              </div>
              <div className="flex items-center justify-center gap-2">
                <Check size={18} className="text-teal-600" /> {t('home.badgeTools')}
              </div>
              <div className="flex items-center justify-center gap-2 col-span-2 sm:col-span-1">
                <Check size={18} className="text-teal-600" /> {t('home.badgeChat')}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* POURQUOI PROPAIR */}
      <section className="py-20 md:py-32 bg-white border-t border-slate-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4 md:mb-6">
              {t('home.valueTitle')}
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-light">
              {t('home.valueSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">

            {/* Carte CLIENTS */}
            <motion.div
              className="bg-white rounded-2xl p-6 md:p-10 shadow-lg shadow-slate-200/50 border border-slate-100/60 hover:shadow-lg transition-all"
            >
              <Users size={24} className="text-teal-600 mb-6 md:mb-8" />
              <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-2">{t('home.clientTitle')}</h3>
              <p className="text-base md:text-lg font-medium text-teal-600 mb-4 md:mb-6">{t('home.clientTagline')}</p>

              <p className="text-slate-600 mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
                {t('home.clientDescription')}
              </p>

              <ul className="space-y-3 md:space-y-4">
                <li className="flex items-start gap-3">
                  <MessageSquare size={16} className="text-teal-600 mt-0.5 shrink-0" />
                  <span className="text-slate-700 text-sm md:text-base">{t('home.clientFeature1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Layout size={16} className="text-teal-600 mt-0.5 shrink-0" />
                  <span className="text-slate-700 text-sm md:text-base">{t('home.clientFeature2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={16} className="text-teal-600 mt-0.5 shrink-0" />
                  <span className="text-slate-700 text-sm md:text-base">{t('home.clientFeature3')}</span>
                </li>
              </ul>
            </motion.div>

            {/* Carte PROS */}
            <motion.div
              className="bg-white rounded-2xl p-6 md:p-10 shadow-lg shadow-slate-200/50 border border-slate-100/60 relative overflow-hidden hover:shadow-lg transition-all"
            >
              <Layout size={24} className="text-slate-700 mb-6 md:mb-8" />

              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl md:text-2xl font-semibold text-slate-900">{t('home.proTitle')}</h3>
                <span className="px-3 py-1 bg-slate-900 text-white text-[10px] md:text-xs font-semibold rounded-full">{t('home.proBadge')}</span>
              </div>

              <p className="text-base md:text-lg font-medium text-slate-500 mb-4 md:mb-6">{t('home.proTagline')}</p>

              <p className="text-slate-600 mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
                {t('home.proDescription')}
              </p>

              <ul className="space-y-3 md:space-y-4">
                <li className="flex items-start gap-3">
                  <Clock size={16} className="text-teal-600 mt-0.5 shrink-0" />
                  <span className="text-slate-700 text-sm md:text-base">{t('home.proFeature1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={16} className="text-teal-600 mt-0.5 shrink-0" />
                  <span className="text-slate-700 text-sm md:text-base">{t('home.proFeature2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Layout size={16} className="text-teal-600 mt-0.5 shrink-0" />
                  <span className="text-slate-700 text-sm md:text-base">{t('home.proFeature3')}</span>
                </li>
              </ul>
            </motion.div>

          </div>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4 md:mb-6">
              {t('home.processTitle')}
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
              {t('home.processSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto relative">
            <div className="hidden md:block absolute top-12 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-teal-200 via-slate-200 to-teal-200" />

            <div className="text-center relative bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-100/60 shadow-sm">
              <Search size={24} className="text-teal-600 mx-auto mb-4 md:mb-6 relative z-10" />
              <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-2 md:mb-3">{t('home.step1Title')}</h3>
              <p className="text-slate-600 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: t('home.step1Desc') }} />
            </div>

            <div className="text-center relative bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-100/60 shadow-sm">
              <MessageSquare size={24} className="text-slate-600 mx-auto mb-4 md:mb-6 relative z-10" />
              <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-2 md:mb-3">{t('home.step2Title')}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {t('home.step2Desc')}
              </p>
            </div>

            <div className="text-center relative bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-100/60 shadow-sm">
              <Layout size={24} className="text-teal-600 mx-auto mb-4 md:mb-6 relative z-10" />
              <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-2 md:mb-3">{t('home.step3Title')}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {t('home.step3Desc')}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* TÉLÉCHARGER */}
      <section id="telecharger" className="py-20 md:py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-8">
                <div className="relative group">
                  <img
                    src="/apple-touch-icon.png"
                    alt="ProPair App"
                    className="w-24 h-24 md:w-32 md:h-32 rounded-2xl shadow-2xl shadow-black/30 border-4 border-white/10 flex-shrink-0 group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-3">
                    {t('home.downloadTitle')}
                  </h2>
                  <p className="text-slate-300 mb-2 font-medium text-sm md:text-base">
                    {t('home.downloadSubtitle')}
                  </p>
                  <p className="text-xs md:text-sm text-slate-500">
                    {t('home.downloadFree')}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-end w-full sm:w-auto">
                <a
                  href="https://apps.apple.com/app/propair"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 px-6 py-3 md:py-4 bg-white hover:bg-slate-100 text-slate-900 rounded-2xl transition-all shadow-lg hover:-translate-y-0.5 w-full sm:w-auto active:scale-[0.98] duration-200"
                >
                  <svg className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-[9px] md:text-[10px] uppercase text-slate-500 font-medium tracking-wider">{t('common.downloadOn')}</div>
                    <div className="text-base md:text-lg font-semibold -mt-1 font-sans">{t('common.appStore')}</div>
                  </div>
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.propair"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 px-6 py-3 md:py-4 bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-2xl transition-all hover:-translate-y-0.5 w-full sm:w-auto active:scale-[0.98] duration-200"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-[9px] md:text-[10px] uppercase text-white/50 font-medium tracking-wider">{t('common.availableOn')}</div>
                    <div className="text-base md:text-lg font-semibold -mt-1 font-sans">{t('common.googlePlay')}</div>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
