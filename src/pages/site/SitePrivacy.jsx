import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Lock, UserCheck, Globe, Database, Cookie } from 'lucide-react';
import SEO from '../../components/SEO';
import { useLanguage } from '../../context/LanguageContext';

export default function SitePrivacy() {
  const { t } = useLanguage();

  const subcontractors = [
    { name: t('sitePrivacy.s5Sub1Name'), role: t('sitePrivacy.s5Sub1Role'), location: t('sitePrivacy.s5Sub1Location') },
    { name: t('sitePrivacy.s5Sub2Name'), role: t('sitePrivacy.s5Sub2Role'), location: t('sitePrivacy.s5Sub2Location') },
    { name: t('sitePrivacy.s5Sub3Name'), role: t('sitePrivacy.s5Sub3Role'), location: t('sitePrivacy.s5Sub3Location') },
    { name: t('sitePrivacy.s5Sub4Name'), role: t('sitePrivacy.s5Sub4Role'), location: t('sitePrivacy.s5Sub4Location') },
  ];

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen font-sans">
      <SEO
        title={t('sitePrivacy.title')}
        canonical="/site/privacy"
        description={t('sitePrivacy.seoDesc')}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-100 shadow-sm text-slate-600 text-xs sm:text-sm font-medium mb-6">
            <Shield size={16} className="text-teal-700" />
            <span>{t('sitePrivacy.title')}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            {t('sitePrivacy.title')}
          </h1>
          <p className="text-slate-500">{t('sitePrivacy.lastUpdate')}</p>
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
                {t('sitePrivacy.intro')}
              </p>
              <p className="text-slate-500 text-sm italic">
                {t('sitePrivacy.trademark')}
              </p>
            </div>
          </section>

          {/* Section 1 - Officer */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700/10 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">1</span>
              {t('sitePrivacy.s1Title')}
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <p className="text-slate-600 leading-relaxed mb-4">
                {t('sitePrivacy.s1P1')}
              </p>
              <div className="space-y-2 text-slate-600">
                <p><span className="font-semibold">{t('sitePrivacy.s1Role')}</span></p>
                <p>
                  <a href="mailto:privacy@propairapp.com" className="text-teal-700 hover:text-teal-800 underline underline-offset-2 font-medium">
                    {t('sitePrivacy.s1Email')}
                  </a>
                </p>
                <p>{t('sitePrivacy.s1Address')}</p>
              </div>
              <p className="text-slate-500 text-sm mt-4">{t('sitePrivacy.s1Delay')}</p>
            </div>
          </section>

          {/* Section 2 - Information collected */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700/10 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">2</span>
              {t('sitePrivacy.s2Title')}
            </h2>
            <div className="space-y-4">
              {/* 2.1 Direct */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-3">{t('sitePrivacy.s2DirectTitle')}</h3>
                <ul className="text-slate-600 space-y-2">
                  {t('sitePrivacy.s2DirectItems').map((item, i) => (
                    <li key={i}>&bull; {item}</li>
                  ))}
                </ul>
              </div>
              {/* 2.2 Auto */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-3">{t('sitePrivacy.s2AutoTitle')}</h3>
                <ul className="text-slate-600 space-y-2">
                  {t('sitePrivacy.s2AutoItems').map((item, i) => (
                    <li key={i}>&bull; {item}</li>
                  ))}
                </ul>
              </div>
              {/* 2.3 Third parties */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-3">{t('sitePrivacy.s2ThirdTitle')}</h3>
                <ul className="text-slate-600 space-y-2">
                  {t('sitePrivacy.s2ThirdItems').map((item, i) => (
                    <li key={i}>&bull; {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 - Purposes */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700/10 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">3</span>
              {t('sitePrivacy.s3Title')}
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <ul className="text-slate-600 space-y-2 mb-4">
                {t('sitePrivacy.s3Items').map((item, i) => (
                  <li key={i}>&bull; {item}</li>
                ))}
              </ul>
              <p className="text-slate-600 leading-relaxed mb-4">
                {t('sitePrivacy.s3Consent')}
              </p>
              <p className="text-slate-600 leading-relaxed">
                {t('sitePrivacy.s3Withdraw')}
              </p>
            </div>
          </section>

          {/* Section 4 - Cookies */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700/10 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">4</span>
              {t('sitePrivacy.s4Title')}
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <div className="flex items-start gap-3">
                <Cookie size={20} className="text-teal-700 mt-1" />
                <div>
                  <p className="text-slate-600 leading-relaxed mb-2">
                    {t('sitePrivacy.s4P1')}{' '}
                    <Link to="/site/cookies" className="text-teal-700 hover:text-teal-800 underline underline-offset-2 font-medium">
                      {t('sitePrivacy.s4Link')}
                    </Link>.
                  </p>
                  <p className="text-slate-600 font-semibold mb-2">{t('sitePrivacy.s4Summary')}</p>
                  <ul className="text-slate-600 space-y-2">
                    {t('sitePrivacy.s4Items').map((item, i) => (
                      <li key={i}>&bull; {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5 - Sharing */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700/10 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">5</span>
              {t('sitePrivacy.s5Title')}
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <div className="flex items-start gap-3 mb-4">
                <Database size={20} className="text-teal-700 mt-1" />
                <div>
                  <p className="text-slate-600 leading-relaxed font-bold mb-2">
                    {t('sitePrivacy.s5NoSale')}
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    {t('sitePrivacy.s5Intro')}
                  </p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                {subcontractors.map((sub, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 border border-slate-200">
                    <p className="font-semibold text-slate-900">{sub.name}</p>
                    <p className="text-slate-600 text-sm">{sub.role}</p>
                    <p className="text-slate-500 text-sm">{sub.location}</p>
                  </div>
                ))}
              </div>
              <p className="text-slate-600 text-sm">{t('sitePrivacy.s5Legal')}</p>
            </div>
          </section>

          {/* Section 6 - International transfers */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700/10 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">6</span>
              {t('sitePrivacy.s6Title')}
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <div className="flex items-start gap-3">
                <Globe size={20} className="text-teal-700 mt-1" />
                <div>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    {t('sitePrivacy.s6P1')}
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    {t('sitePrivacy.s6P2')}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7 - Data retention */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700/10 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">7</span>
              {t('sitePrivacy.s7Title')}
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <ul className="text-slate-600 space-y-2">
                {t('sitePrivacy.s7Items').map((item, i) => (
                  <li key={i}>&bull; {item}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section 8 - Security */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700/10 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">8</span>
              {t('sitePrivacy.s8Title')}
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 mb-4">
              <div className="flex items-start gap-3">
                <Lock size={20} className="text-teal-700 mt-1" />
                <ul className="text-slate-600 space-y-2">
                  {t('sitePrivacy.s8Items').map((item, i) => (
                    <li key={i}>&bull; {item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-teal-700/10 rounded-2xl p-6 border border-teal-700/20">
              <p className="text-slate-600 leading-relaxed">
                {t('sitePrivacy.s8Incident')}
              </p>
            </div>
          </section>

          {/* Section 9 - Your rights */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700/10 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">9</span>
              {t('sitePrivacy.s9Title')}
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <div className="flex items-start gap-3 mb-4">
                <UserCheck size={20} className="text-teal-700 mt-1" />
                <p className="text-slate-600">{t('sitePrivacy.s9P1')}</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                {t('sitePrivacy.s9Rights').map((right, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 border border-slate-200">
                    <p className="font-semibold text-slate-900 mb-1">{right.title}</p>
                    <p className="text-slate-600 text-sm">{right.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed">
                {t('sitePrivacy.s9How')}
              </p>
            </div>
          </section>

          {/* Section 10 - Minors */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700/10 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">10</span>
              {t('sitePrivacy.s10Title')}
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <p className="text-slate-600 leading-relaxed">
                {t('sitePrivacy.s10P1')}
              </p>
            </div>
          </section>

          {/* Section 11 - Changes */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700/10 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">11</span>
              {t('sitePrivacy.s11Title')}
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <p className="text-slate-600 leading-relaxed">
                {t('sitePrivacy.s11P1')}
              </p>
            </div>
          </section>

          {/* Section 12 - Contact */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700/10 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">12</span>
              {t('sitePrivacy.s12Title')}
            </h2>
            <div className="bg-teal-700/10 rounded-2xl p-6 border border-teal-700/20">
              <p className="text-slate-600 leading-relaxed mb-4">
                {t('sitePrivacy.s12P1')}
              </p>
              <div className="space-y-2 text-slate-600">
                <p className="font-semibold">{t('sitePrivacy.s12Company')}</p>
                <p>{t('sitePrivacy.s12Address')}</p>
                <p>
                  <a href="mailto:privacy@propairapp.com" className="text-teal-700 hover:text-teal-800 underline underline-offset-2 font-medium">
                    {t('sitePrivacy.s12Email')}
                  </a>
                </p>
              </div>
              <p className="text-slate-600 leading-relaxed mt-4 text-sm">
                {t('sitePrivacy.s12Recourse')}
              </p>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
