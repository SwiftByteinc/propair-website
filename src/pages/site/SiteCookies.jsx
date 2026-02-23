import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cookie, Shield, BarChart3, Settings, Info } from 'lucide-react';
import SEO from '../../components/SEO';
import { useLanguage } from '../../context/LanguageContext';

export default function SiteCookies() {
  const { t } = useLanguage();

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen font-sans">
      <SEO
        title={t('siteCookies.title')}
        canonical="/site/cookies"
        description={t('siteCookies.seoDesc')}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-100 shadow-sm text-slate-600 text-xs sm:text-sm font-medium mb-6">
            <Cookie size={16} className="text-teal-700" />
            <span>{t('siteCookies.title')}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            {t('siteCookies.title')}
          </h1>
          <p className="text-slate-500">{t('siteCookies.lastUpdate')}</p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="prose prose-lg max-w-none"
        >
          {/* Intro */}
          <section className="mb-12">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <p className="text-slate-600 leading-relaxed">
                {t('siteCookies.intro')}{' '}
                <Link to="/site/privacy" className="text-teal-700 hover:text-teal-800 underline underline-offset-2 font-medium">
                  /site/privacy
                </Link>
              </p>
            </div>
          </section>

          {/* Section 1 - What is a cookie */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700/10 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">1</span>
              {t('siteCookies.s1Title')}
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <p className="text-slate-600 leading-relaxed">
                {t('siteCookies.s1P1')}
              </p>
            </div>
          </section>

          {/* Section 2 - Cookies used */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700/10 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">2</span>
              {t('siteCookies.s2Title')}
            </h2>
            <div className="space-y-4">
              {/* 2.1 Essential */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <Shield size={18} className="text-teal-700" />
                  <h3 className="font-semibold text-slate-900">{t('siteCookies.s2EssentialTitle')}</h3>
                </div>
                <p className="text-slate-600 text-sm mb-4">{t('siteCookies.s2EssentialDesc')}</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="py-2 pr-4 font-semibold text-slate-900">Name</th>
                        <th className="py-2 pr-4 font-semibold text-slate-900">Provider</th>
                        <th className="py-2 pr-4 font-semibold text-slate-900">Purpose</th>
                        <th className="py-2 font-semibold text-slate-900">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {t('siteCookies.s2Essential').map((cookie, i) => (
                        <tr key={i} className="border-b border-slate-100">
                          <td className="py-2 pr-4 text-slate-600 font-mono text-xs">{cookie.name}</td>
                          <td className="py-2 pr-4 text-slate-600">{cookie.provider}</td>
                          <td className="py-2 pr-4 text-slate-600">{cookie.purpose}</td>
                          <td className="py-2 text-slate-600">{cookie.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 2.2 Analytics */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 size={18} className="text-teal-700" />
                  <h3 className="font-semibold text-slate-900">{t('siteCookies.s2AnalyticsTitle')}</h3>
                </div>
                <p className="text-slate-600 text-sm mb-4">{t('siteCookies.s2AnalyticsDesc')}</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="py-2 pr-4 font-semibold text-slate-900">Name</th>
                        <th className="py-2 pr-4 font-semibold text-slate-900">Provider</th>
                        <th className="py-2 pr-4 font-semibold text-slate-900">Purpose</th>
                        <th className="py-2 font-semibold text-slate-900">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {t('siteCookies.s2Analytics').map((cookie, i) => (
                        <tr key={i} className="border-b border-slate-100">
                          <td className="py-2 pr-4 text-slate-600 font-mono text-xs">{cookie.name}</td>
                          <td className="py-2 pr-4 text-slate-600">{cookie.provider}</td>
                          <td className="py-2 pr-4 text-slate-600">{cookie.purpose}</td>
                          <td className="py-2 text-slate-600">{cookie.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 2.3 Advertising */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-2">{t('siteCookies.s2NoneTitle')}</h3>
                <p className="text-slate-600">{t('siteCookies.s2NoneDesc')}</p>
              </div>
            </div>
          </section>

          {/* Section 3 - Managing cookies */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700/10 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">3</span>
              {t('siteCookies.s3Title')}
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <div className="flex items-start gap-3 mb-4">
                <Settings size={20} className="text-teal-700 mt-1" />
                <p className="text-slate-600">{t('siteCookies.s3P1')}</p>
              </div>
              <div className="grid sm:grid-cols-1 gap-4">
                {t('siteCookies.s3Methods').map((method, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 border border-slate-200">
                    <p className="font-semibold text-slate-900 mb-1">{method.title}</p>
                    <p className="text-slate-600 text-sm">{method.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 4 - PostHog data */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700/10 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">4</span>
              {t('siteCookies.s4Title')}
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <div className="flex items-start gap-3 mb-4">
                <Info size={20} className="text-teal-700 mt-1" />
                <p className="text-slate-600">{t('siteCookies.s4P1')}</p>
              </div>
              <ul className="text-slate-600 space-y-2 mb-4">
                {t('siteCookies.s4Items').map((item, i) => (
                  <li key={i}>&bull; {item}</li>
                ))}
              </ul>
              <p className="text-slate-600 leading-relaxed mb-4">
                {t('siteCookies.s4P2')}
              </p>
              <div className="bg-teal-700/10 rounded-xl p-4 border border-teal-700/20">
                <p className="text-slate-600 text-sm">
                  {t('siteCookies.s4P3')}
                </p>
              </div>
            </div>
          </section>

          {/* Section 5 - Legal basis */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700/10 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">5</span>
              {t('siteCookies.s5Title')}
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <p className="text-slate-600 leading-relaxed mb-4">
                {t('siteCookies.s5P1')}
              </p>
              <ul className="text-slate-600 space-y-2">
                {t('siteCookies.s5Items').map((item, i) => (
                  <li key={i}>&bull; {item}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section 6 - Changes */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700/10 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">6</span>
              {t('siteCookies.s6Title')}
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <p className="text-slate-600 leading-relaxed">
                {t('siteCookies.s6P1')}
              </p>
            </div>
          </section>

          {/* Section 7 - Contact */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700/10 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">7</span>
              {t('siteCookies.s7Title')}
            </h2>
            <div className="bg-teal-700/10 rounded-2xl p-6 border border-teal-700/20">
              <p className="text-slate-600 leading-relaxed mb-4">
                {t('siteCookies.s7P1')}
              </p>
              <p>
                <a href="mailto:privacy@propairapp.com" className="text-teal-700 hover:text-teal-800 underline underline-offset-2 font-medium">
                  {t('siteCookies.s7Email')}
                </a>
              </p>
            </div>

            {/* Related links */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">{t('siteCookies.s7RelatedTitle')}</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <Link
                  to="/site/privacy"
                  className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:shadow-md transition-all flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-teal-700/10 rounded-lg flex items-center justify-center">
                    <Shield size={20} className="text-teal-700" />
                  </div>
                  <span className="font-medium text-slate-900">{t('siteCookies.s7RelatedPrivacy')}</span>
                </Link>
                <Link
                  to="/site/terms"
                  className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:shadow-md transition-all flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-teal-700/10 rounded-lg flex items-center justify-center">
                    <Cookie size={20} className="text-teal-700" />
                  </div>
                  <span className="font-medium text-slate-900">{t('siteCookies.s7RelatedTerms')}</span>
                </Link>
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
