import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Scale, CreditCard, Users, Shield, AlertTriangle } from 'lucide-react';
import SEO from '../../components/SEO';
import { useLanguage } from '../../context/LanguageContext';

export default function SiteTerms() {
  const { t } = useLanguage();

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen font-sans">
      <SEO
        title={t('siteTerms.title')}
        canonical="/site/terms"
        description={t('siteTerms.seoDesc')}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-100 shadow-sm text-slate-600 text-xs sm:text-sm font-medium mb-6">
            <Scale size={16} className="text-teal-700" />
            <span>{t('siteTerms.title')}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            {t('siteTerms.title')}
          </h1>
          <p className="text-slate-500">{t('siteTerms.lastUpdate')}</p>
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
              <p className="text-slate-600 leading-relaxed mb-4">
                {t('siteTerms.intro')}
              </p>
              <p className="text-slate-500 text-sm italic">
                {t('siteTerms.trademark')}
              </p>
            </div>
          </section>

          {/* Section 1 - Nature */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700/10 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">1</span>
              {t('siteTerms.s1Title')}
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <p className="text-slate-600 leading-relaxed mb-4">
                {t('siteTerms.s1P1')}
              </p>
              <ul className="text-slate-600 space-y-2 mb-4">
                {t('siteTerms.s1Items').map((item, i) => (
                  <li key={i}>&bull; {item}</li>
                ))}
              </ul>
              <p className="text-slate-600 leading-relaxed text-sm">
                {t('siteTerms.s1P2')}
              </p>
            </div>
          </section>

          {/* Section 2 - Account creation */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700/10 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">2</span>
              {t('siteTerms.s2Title')}
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <p className="text-slate-600 leading-relaxed mb-4">
                {t('siteTerms.s2P1')}
              </p>
              <ul className="text-slate-600 space-y-2 mb-4">
                {t('siteTerms.s2Items').map((item, i) => (
                  <li key={i}>&bull; {item}</li>
                ))}
              </ul>
              <p className="text-slate-600 leading-relaxed">
                {t('siteTerms.s2P2')}
              </p>
            </div>
          </section>

          {/* Section 3 - Subscriptions */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700/10 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">3</span>
              {t('siteTerms.s3Title')}
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <div className="flex items-start gap-3">
                <CreditCard size={20} className="text-teal-700 mt-1" />
                <div>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    {t('siteTerms.s3P1')}
                  </p>
                  <ul className="text-slate-600 space-y-2 mb-4">
                    {t('siteTerms.s3Items').map((item, i) => (
                      <li key={i}>&bull; {item}</li>
                    ))}
                  </ul>
                  <p className="text-slate-600 leading-relaxed">
                    {t('siteTerms.s3P2')}{' '}
                    <Link to="/site/refund" className="text-teal-700 hover:text-teal-800 underline underline-offset-2 font-medium">
                      /site/refund
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 - Referral */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700/10 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">4</span>
              {t('siteTerms.s4Title')}
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <div className="flex items-start gap-3">
                <Users size={20} className="text-teal-700 mt-1" />
                <div>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    {t('siteTerms.s4P1')}
                  </p>
                  <ul className="text-slate-600 space-y-2">
                    {t('siteTerms.s4Items').map((item, i) => (
                      <li key={i}>&bull; {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5 - IP */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700/10 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">5</span>
              {t('siteTerms.s5Title')}
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <p className="text-slate-600 leading-relaxed mb-4">
                {t('siteTerms.s5P1')}
              </p>
              <p className="text-slate-600 leading-relaxed">
                {t('siteTerms.s5P2')}
              </p>
            </div>
          </section>

          {/* Section 6 - Acceptable use */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700/10 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">6</span>
              {t('siteTerms.s6Title')}
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <div className="flex items-start gap-3">
                <Shield size={20} className="text-teal-700 mt-1" />
                <div>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    {t('siteTerms.s6P1')}
                  </p>
                  <ul className="text-slate-600 space-y-2">
                    {t('siteTerms.s6Items').map((item, i) => (
                      <li key={i}>&bull; {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7 - Liability */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700/10 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">7</span>
              {t('siteTerms.s7Title')}
            </h2>
            <div className="bg-teal-700/10 rounded-2xl p-6 border border-teal-700/20">
              <div className="flex items-start gap-3">
                <AlertTriangle size={20} className="text-teal-700 mt-1" />
                <div>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    {t('siteTerms.s7P1')}
                  </p>
                  <ul className="text-slate-600 space-y-2">
                    {t('siteTerms.s7Items').map((item, i) => (
                      <li key={i}>&bull; {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 8 - Indemnification */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700/10 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">8</span>
              {t('siteTerms.s8Title')}
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <p className="text-slate-600 leading-relaxed">
                {t('siteTerms.s8P1')}
              </p>
            </div>
          </section>

          {/* Section 9 - Suspension */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700/10 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">9</span>
              {t('siteTerms.s9Title')}
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <p className="text-slate-600 leading-relaxed mb-4">
                {t('siteTerms.s9P1')}
              </p>
              <ul className="text-slate-600 space-y-2 mb-4">
                {t('siteTerms.s9Items').map((item, i) => (
                  <li key={i}>&bull; {item}</li>
                ))}
              </ul>
              <p className="text-slate-600 leading-relaxed">
                {t('siteTerms.s9P2')}
              </p>
            </div>
          </section>

          {/* Section 10 - Force majeure */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700/10 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">10</span>
              {t('siteTerms.s10Title')}
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <p className="text-slate-600 leading-relaxed">
                {t('siteTerms.s10P1')}
              </p>
            </div>
          </section>

          {/* Section 11 - Severability */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700/10 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">11</span>
              {t('siteTerms.s11Title')}
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <p className="text-slate-600 leading-relaxed">
                {t('siteTerms.s11P1')}
              </p>
            </div>
          </section>

          {/* Section 12 - Changes */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700/10 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">12</span>
              {t('siteTerms.s12Title')}
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <p className="text-slate-600 leading-relaxed">
                {t('siteTerms.s12P1')}
              </p>
            </div>
          </section>

          {/* Section 13 - Law */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700/10 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">13</span>
              {t('siteTerms.s13Title')}
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <p className="text-slate-600 leading-relaxed mb-4">
                {t('siteTerms.s13P1')}
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                {t('siteTerms.s13P2')}
              </p>
              <p className="text-slate-600 leading-relaxed">
                {t('siteTerms.s13P3')}
              </p>
            </div>
          </section>

          {/* Section 14 - Contact */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700/10 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">14</span>
              {t('siteTerms.s14Title')}
            </h2>
            <div className="bg-teal-700/10 rounded-2xl p-6 border border-teal-700/20">
              <div className="space-y-2 text-slate-600">
                <p className="font-semibold">{t('siteTerms.s14Company')}</p>
                <p>{t('siteTerms.s14Address')}</p>
                <p>
                  <a href="mailto:support@propairapp.com" className="text-teal-700 hover:text-teal-800 underline underline-offset-2 font-medium">
                    {t('siteTerms.s14Email')}
                  </a>
                </p>
                <p className="text-slate-500">{t('siteTerms.s14Website')}</p>
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
