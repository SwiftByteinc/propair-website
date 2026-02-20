import { motion } from 'framer-motion';
import { FileText, Users, Building2, CreditCard, MessageSquare, Scale, Gavel } from 'lucide-react';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';

export default function Terms() {
  const { t } = useLanguage();
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen font-sans selection:bg-teal-50 selection:text-teal-700">
      <SEO
        title={t('terms.title')}
        canonical="/terms"
        description={t('terms.seoDesc')}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-100 shadow-sm text-slate-600 text-xs sm:text-sm font-medium mb-6">
            <FileText size={14} className="text-teal-600" />
            <span>{t('terms.badge')}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            {t('terms.title')}
          </h1>
          <p className="text-slate-500">{t('terms.lastUpdate')}</p>
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
              <span className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600 text-sm font-semibold">1</span>
              {t('terms.s1Title')}
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <div className="flex items-start gap-3 mb-4">
                <Users size={20} className="text-teal-600 mt-1" />
                <div>
                  <p className="text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('terms.s1P1') }} />
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed">
                {t('terms.s1P2')}
              </p>
              <ul className="text-slate-600 space-y-2 mt-3">
                <li>• {t('terms.s1Req1')}</li>
                <li>• {t('terms.s1Req2')}</li>
              </ul>
              <p className="text-sm text-slate-500 italic mt-4">
                {t('terms.s1Note')}
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600 text-sm font-semibold">2</span>
              {t('terms.s2Title')}
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <div className="flex items-start gap-3">
                <Building2 size={20} className="text-teal-600 mt-1" />
                <div>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    {t('terms.s2P1')}
                  </p>
                  <ul className="text-slate-600 space-y-2">
                    <li>• {t('terms.s2Req1')}</li>
                    <li>• {t('terms.s2Req2')}</li>
                    <li>• {t('terms.s2Req3')}</li>
                  </ul>
                  <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-100">
                    <p className="text-slate-600 text-sm">
                      {t('terms.s2Warning')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600 text-sm font-semibold">3</span>
              {t('terms.s3Title')}
            </h2>
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <div className="flex items-start gap-3">
                  <Scale size={20} className="text-teal-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">{t('terms.s3IndTitle')}</h3>
                    <p className="text-slate-600" dangerouslySetInnerHTML={{ __html: t('terms.s3IndDesc') }} />
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <div className="flex items-start gap-3">
                  <CreditCard size={20} className="text-teal-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">{t('terms.s3PayTitle')}</h3>
                    <p className="text-slate-600" dangerouslySetInnerHTML={{ __html: t('terms.s3PayDesc') }} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600 text-sm font-semibold">4</span>
              {t('terms.s4Title')}
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <div className="flex items-start gap-3">
                <MessageSquare size={20} className="text-teal-600 mt-1" />
                <div>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    {t('terms.s4P1')}
                  </p>
                  <div className="space-y-4">
                    <div className="p-4 bg-teal-50 rounded-xl border border-teal-100">
                      <h4 className="font-semibold text-slate-900 mb-1">{t('terms.s4AccessTitle')}</h4>
                      <p className="text-slate-600 text-sm">
                        {t('terms.s4AccessDesc')}
                      </p>
                    </div>
                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                      <h4 className="font-semibold text-slate-900 mb-1">{t('terms.s4LimitTitle')}</h4>
                      <p className="text-slate-600 text-sm">
                        {t('terms.s4LimitDesc')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600 text-sm font-semibold">5</span>
              {t('terms.s5Title')}
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">{t('terms.s5ExclTitle')}</h3>
                  <p className="text-slate-600" dangerouslySetInnerHTML={{ __html: t('terms.s5ExclDesc') }} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">{t('terms.s5IndirectTitle')}</h3>
                  <p className="text-slate-600">{t('terms.s5IndirectDesc')}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <h3 className="font-semibold text-slate-900 mb-2">{t('terms.s5CapTitle')}</h3>
                  <p className="text-slate-600" dangerouslySetInnerHTML={{ __html: t('terms.s5CapDesc') }} />
                </div>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600 text-sm font-semibold">6</span>
              {t('terms.s6Title')}
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <div className="flex items-start gap-3">
                <Gavel size={20} className="text-teal-600 mt-1" />
                <div>
                  <p className="text-slate-600 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: t('terms.s6P1') }} />
                  <p className="text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('terms.s6P2') }} />
                </div>
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
