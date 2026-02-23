import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Building2, Server, Shield, Palette } from 'lucide-react';
import SEO from '../../components/SEO';
import { useLanguage } from '../../context/LanguageContext';

export default function SiteLegal() {
  const { t } = useLanguage();
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen font-sans">
      <SEO
        title={t('siteLegal.title')}
        canonical="/site/legal"
        description={t('siteLegal.seoDesc')}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-100 shadow-sm text-slate-600 text-xs sm:text-sm font-medium mb-6">
            <Building2 size={16} className="text-teal-700" />
            <span>{t('siteLegal.title')}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            {t('siteLegal.title')}
          </h1>
          <p className="text-slate-500">{t('siteLegal.lastUpdate')}</p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="prose prose-lg max-w-none"
        >
          {/* Section 1 — Publisher */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700/10 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">1</span>
              {t('siteLegal.s1Title')}
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <div className="space-y-2 text-slate-600">
                <p className="font-bold text-slate-900">{t('siteLegal.s1Company')}</p>
                <p>{t('siteLegal.s1Form')}</p>
                <p>{t('siteLegal.s1Address')}</p>
                <p>
                  <a href={`mailto:${t('siteLegal.s1Email')}`} className="text-teal-700 hover:text-teal-800 underline underline-offset-2 font-medium">
                    {t('siteLegal.s1Email')}
                  </a>
                </p>
                <p>{t('siteLegal.s1Phone')}</p>
                <p>{t('siteLegal.s1Director')}</p>
                <p>{t('siteLegal.s1NEQ')}</p>
              </div>
            </div>
          </section>

          {/* Section 2 — Hosting */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700/10 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">2</span>
              {t('siteLegal.s2Title')}
            </h2>
            <p className="text-slate-600 mb-4">{t('siteLegal.s2P1')}</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <div className="flex items-start gap-3">
                  <Server size={20} className="text-teal-700 mt-1" />
                  <div className="space-y-1 text-slate-600">
                    <p className="font-semibold text-slate-900">{t('siteLegal.s2Host')}</p>
                    <p>{t('siteLegal.s2HostAddress')}</p>
                    <a
                      href={`https://${t('siteLegal.s2HostWebsite')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-700 hover:text-teal-800 underline underline-offset-2 font-medium"
                    >
                      {t('siteLegal.s2HostWebsite')}
                    </a>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <div className="flex items-start gap-3">
                  <Server size={20} className="text-teal-700 mt-1" />
                  <div className="space-y-1 text-slate-600">
                    <p className="font-semibold text-slate-900">{t('siteLegal.s2Db')}</p>
                    <p>{t('siteLegal.s2DbAddress')}</p>
                    <a
                      href={`https://${t('siteLegal.s2DbWebsite')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-700 hover:text-teal-800 underline underline-offset-2 font-medium"
                    >
                      {t('siteLegal.s2DbWebsite')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-slate-600 mt-4">{t('siteLegal.s2P2')}</p>
          </section>

          {/* Section 3 — Intellectual Property */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700/10 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">3</span>
              {t('siteLegal.s3Title')}
            </h2>
            <div className="bg-teal-700/10 rounded-2xl p-6 border border-teal-700/20">
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>{t('siteLegal.s3P1')}</p>
                <p>{t('siteLegal.s3P2')}</p>
                <p>{t('siteLegal.s3P3')}</p>
              </div>
            </div>
          </section>

          {/* Section 4 — Privacy Officer */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700/10 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">4</span>
              {t('siteLegal.s4Title')}
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <div className="flex items-start gap-3">
                <Shield size={20} className="text-teal-700 mt-1" />
                <div className="space-y-2 text-slate-600">
                  <p className="text-slate-600 leading-relaxed">{t('siteLegal.s4P1')}</p>
                  <p>{t('siteLegal.s4Role')}</p>
                  <p>
                    <a href={`mailto:${t('siteLegal.s4Email')}`} className="text-teal-700 hover:text-teal-800 underline underline-offset-2 font-medium">
                      {t('siteLegal.s4Email')}
                    </a>
                  </p>
                  <p>{t('siteLegal.s4Address')}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5 — Terms Reference */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700/10 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">5</span>
              {t('siteLegal.s5Title')}
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <p className="text-slate-600 leading-relaxed">
                {t('siteLegal.s5P1').split('/site/terms')[0]}
                <Link to="/site/terms" className="text-teal-700 hover:text-teal-800 underline underline-offset-2 font-medium">
                  /site/terms
                </Link>
                {t('siteLegal.s5P1').split('/site/terms')[1]}
              </p>
            </div>
          </section>

          {/* Section 6 — Credits */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700/10 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">6</span>
              {t('siteLegal.s6Title')}
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <div className="flex items-start gap-3">
                <Palette size={20} className="text-teal-700 mt-1" />
                <div className="space-y-2 text-slate-600">
                  <p>{t('siteLegal.s6P1')}</p>
                  <p>{t('siteLegal.s6P2')}</p>
                  <p>{t('siteLegal.s6P3')}</p>
                </div>
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
