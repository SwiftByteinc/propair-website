import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ReceiptText, Ban, Calendar, AlertCircle, Users, Mail } from 'lucide-react';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';

export default function Refund() {
  const { t } = useLanguage();
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen font-sans selection:bg-teal-700 selection:text-teal-700">
      <SEO
        title={t('refund.title')}
        canonical="/refund"
        description={t('refund.seoDesc')}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-100 shadow-sm text-slate-600 text-xs sm:text-sm font-medium mb-6">
            <ReceiptText size={14} className="text-teal-700" />
            <span>{t('refund.badge')}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            {t('refund.title')}
          </h1>
          <p className="text-slate-500">{t('refund.lastUpdate')}</p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="prose prose-lg max-w-none"
        >
          {/* Section 1 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">1</span>
              {t('refund.s1Title')}
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <p className="text-slate-600 leading-relaxed mb-4">
                {t('refund.s1P1')}
              </p>
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                <div className="flex items-start gap-3">
                  <Ban size={20} className="text-amber-600 mt-0.5" />
                  <p className="text-slate-600">
                    {t('refund.s1Warning')}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">2</span>
              {t('refund.s2Title')}
            </h2>
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <div className="flex items-start gap-3">
                  <Calendar size={20} className="text-teal-700 mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">{t('refund.s2CancelTitle')}</h3>
                    <p className="text-slate-600">{t('refund.s2CancelDesc')}</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h3 className="font-semibold text-slate-900 mb-2">{t('refund.s2EndTitle')}</h3>
                <ul className="text-slate-600 space-y-2">
                  <li>• {t('refund.s2EndItem1')}</li>
                  <li>• {t('refund.s2EndItem2')}</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">3</span>
              {t('refund.s3Title')}
            </h2>
            <div className="bg-teal-700 rounded-2xl p-6 border border-teal-700">
              <div className="flex items-start gap-3">
                <AlertCircle size={20} className="text-teal-700 mt-1" />
                <div>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    {t('refund.s3P1')}
                  </p>
                  <ul className="text-slate-600 space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="w-6 h-6 bg-teal-700 rounded-full flex items-center justify-center text-teal-700 text-sm font-semibold flex-shrink-0">1</span>
                      <span>{t('refund.s3Case1')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-6 h-6 bg-teal-700 rounded-full flex items-center justify-center text-teal-700 text-sm font-semibold flex-shrink-0">2</span>
                      <span>{t('refund.s3Case2')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-6 h-6 bg-teal-700 rounded-full flex items-center justify-center text-teal-700 text-sm font-semibold flex-shrink-0">3</span>
                      <span>{t('refund.s3Case3')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">4</span>
              {t('refund.s4Title')}
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <div className="flex items-start gap-3">
                <Users size={20} className="text-teal-700 mt-1" />
                <div>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    {t('refund.s4P1')}
                  </p>
                  <ul className="text-slate-600 space-y-2 mb-4">
                    <li>• {t('refund.s4Item1')}</li>
                    <li>• {t('refund.s4Item2')}</li>
                  </ul>
                  <p className="text-slate-600">
                    {t('refund.s4P2')}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-700 rounded-lg flex items-center justify-center text-teal-700 text-sm font-semibold">5</span>
              {t('refund.s5Title')}
            </h2>
            <div className="bg-teal-700 rounded-2xl p-6 border border-teal-700">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-teal-700 rounded-xl flex items-center justify-center">
                  <Mail size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-slate-600 mb-1">{t('refund.s5P1')}</p>
                  <a
                    href="mailto:billing@propairapp.com"
                    className="text-xl font-bold text-teal-700 hover:underline"
                  >
                    billing@propairapp.com
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Related Links */}
          <section className="mb-12">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">{t('refund.relatedTitle')}</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                to="/privacy"
                className="bg-slate-50 rounded-xl p-4 border border-slate-100/60 hover:shadow-md transition-all flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-teal-700 rounded-lg flex items-center justify-center">
                  <ReceiptText size={18} className="text-teal-700" />
                </div>
                <span className="font-medium text-slate-900">{t('refund.relatedPrivacy')}</span>
              </Link>
              <Link
                to="/terms"
                className="bg-slate-50 rounded-xl p-4 border border-slate-100/60 hover:shadow-md transition-all flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-teal-700 rounded-lg flex items-center justify-center">
                  <ReceiptText size={18} className="text-teal-700" />
                </div>
                <span className="font-medium text-slate-900">{t('refund.relatedTerms')}</span>
              </Link>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
