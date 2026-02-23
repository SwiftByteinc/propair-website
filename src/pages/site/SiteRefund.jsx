import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ReceiptText, Ban, Calendar, AlertCircle, ClipboardList, XCircle, AlertTriangle, Mail } from 'lucide-react';
import SEO from '../../components/SEO';
import { useLanguage } from '../../context/LanguageContext';

export default function SiteRefund() {
  const { t } = useLanguage();
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen font-sans">
      <SEO
        title={t('siteRefund.title')}
        canonical="/site/refund"
        description={t('siteRefund.seoDesc')}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-100 shadow-sm text-slate-600 text-xs sm:text-sm font-medium mb-6">
            <ReceiptText size={16} className="text-teal-700" />
            <span>{t('siteRefund.title')}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            {t('siteRefund.title')}
          </h1>
          <p className="text-slate-500">{t('siteRefund.lastUpdate')}</p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="prose prose-lg max-w-none"
        >
          {/* Intro */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 mb-12">
            <p className="text-slate-600 leading-relaxed">
              {t('siteRefund.intro').split(/\/refund/)[0]}
              <Link to="/refund" className="text-teal-700 hover:text-teal-800 underline underline-offset-2 font-medium">
                /refund
              </Link>
              {t('siteRefund.intro').split(/\/refund/)[1] || ''}
            </p>
          </div>

          {/* Section 1 — General Principle */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700/10 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">1</span>
              {t('siteRefund.s1Title')}
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <div className="flex items-start gap-3">
                <Ban size={20} className="text-teal-700 mt-1" />
                <div>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    {t('siteRefund.s1P1')}
                  </p>
                  <ul className="text-slate-600 space-y-2">
                    {t('siteRefund.s1Items').map((item, i) => (
                      <li key={i}>{'\u2022'} {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 — Cancellation */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700/10 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">2</span>
              {t('siteRefund.s2Title')}
            </h2>
            <div className="space-y-4">
              <p className="text-slate-600 leading-relaxed">{t('siteRefund.s2P1')}</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {t('siteRefund.s2Methods').map((method, i) => (
                  <div key={i} className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                    <div className="flex items-start gap-3">
                      <Calendar size={20} className="text-teal-700 mt-1" />
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-2">{method.title}</h3>
                        <p className="text-slate-600">{method.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed font-medium">{t('siteRefund.s2P2')}</p>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <ul className="text-slate-600 space-y-2">
                  {t('siteRefund.s2After').map((item, i) => (
                    <li key={i}>{'\u2022'} {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 — Exceptional Cases */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700/10 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">3</span>
              {t('siteRefund.s3Title')}
            </h2>
            <div className="bg-teal-700/10 rounded-2xl p-6 border border-teal-700/20">
              <div className="flex items-start gap-3">
                <AlertCircle size={20} className="text-teal-700 mt-1" />
                <div>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    {t('siteRefund.s3P1')}
                  </p>
                  <ul className="text-slate-600 space-y-3">
                    {t('siteRefund.s3Cases').map((c, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-6 h-6 bg-teal-700/10 rounded-full flex items-center justify-center text-teal-700 text-sm font-semibold flex-shrink-0">
                          {i + 1}
                        </span>
                        <span>
                          <strong>{c.title}</strong> — {c.desc}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 — Refund Procedure */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700/10 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">4</span>
              {t('siteRefund.s4Title')}
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <div className="flex items-start gap-3">
                <ClipboardList size={20} className="text-teal-700 mt-1" />
                <div>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    {t('siteRefund.s4P1')}
                  </p>
                  <ol className="text-slate-600 space-y-2 mb-4">
                    {t('siteRefund.s4Steps').map((step, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-6 h-6 bg-teal-700/10 rounded-full flex items-center justify-center text-teal-700 text-sm font-semibold flex-shrink-0">
                          {i + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                  <p className="text-slate-600 leading-relaxed">
                    {t('siteRefund.s4P2')}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5 — Not Refundable */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700/10 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">5</span>
              {t('siteRefund.s5Title')}
            </h2>
            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
              <div className="flex items-start gap-3">
                <XCircle size={20} className="text-amber-600 mt-1" />
                <ul className="text-slate-600 space-y-2">
                  {t('siteRefund.s5Items').map((item, i) => (
                    <li key={i}>{'\u2022'} {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Section 6 — Payment Disputes */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700/10 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">6</span>
              {t('siteRefund.s6Title')}
            </h2>
            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
              <div className="flex items-start gap-3">
                <AlertTriangle size={20} className="text-amber-600 mt-1" />
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>{t('siteRefund.s6P1')}</p>
                  <p>{t('siteRefund.s6P2')}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7 — Contact */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700/10 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">7</span>
              {t('siteRefund.s7Title')}
            </h2>
            <div className="bg-teal-700/10 rounded-2xl p-6 border border-teal-700/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-teal-700 rounded-xl flex items-center justify-center">
                  <Mail size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-slate-600 mb-1">{t('siteRefund.s7P1')}</p>
                  <a
                    href={`mailto:${t('siteRefund.s7Email')}`}
                    className="text-xl font-bold text-teal-700 hover:underline"
                  >
                    {t('siteRefund.s7Email')}
                  </a>
                  <p className="text-slate-500 text-sm mt-1">{t('siteRefund.s7Delay')}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Related Links */}
          <section className="mb-12">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">{t('siteRefund.s7RelatedTitle')}</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                to="/site/terms"
                className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:shadow-md transition-all flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-teal-700/10 rounded-lg flex items-center justify-center">
                  <ReceiptText size={20} className="text-teal-700" />
                </div>
                <span className="font-medium text-slate-900">{t('siteRefund.s7RelatedTerms')}</span>
              </Link>
              <Link
                to="/site/privacy"
                className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:shadow-md transition-all flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-teal-700/10 rounded-lg flex items-center justify-center">
                  <ReceiptText size={20} className="text-teal-700" />
                </div>
                <span className="font-medium text-slate-900">{t('siteRefund.s7RelatedPrivacy')}</span>
              </Link>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
