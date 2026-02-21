import { motion } from 'framer-motion';
import { Shield, Mail, MapPin, Lock, Database, UserCheck, AlertTriangle } from 'lucide-react';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';

export default function Privacy() {
  const { t } = useLanguage();
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen font-sans selection:bg-cyan-50 selection:text-cyan-700">
      <SEO
        title={t('privacy.title')}
        canonical="/privacy"
        description={t('privacy.seoDesc')}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-100 shadow-sm text-slate-600 text-xs sm:text-sm font-medium mb-6">
            <Shield size={14} className="text-cyan-600" />
            <span>{t('privacy.badge')}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            {t('privacy.title')}
          </h1>
          <p className="text-slate-500">{t('privacy.lastUpdate')}</p>
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
              <span className="w-8 h-8 bg-cyan-50 rounded-lg flex items-center justify-center text-cyan-600 text-sm font-semibold">1</span>
              {t('privacy.s1Title')}
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <p className="text-slate-600 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: t('privacy.s1P1') }} />
              <p className="text-sm text-slate-500 italic">
                {t('privacy.s1Note')}
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-cyan-50 rounded-lg flex items-center justify-center text-cyan-600 text-sm font-semibold">2</span>
              {t('privacy.s2Title')}
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <p className="text-slate-600 leading-relaxed mb-4">
                {t('privacy.s2P1')}
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <UserCheck size={18} className="text-cyan-600" />
                  <span className="text-slate-600"><strong>{t('privacy.s2RoleLabel')}</strong> {t('privacy.s2Role')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-cyan-600" />
                  <span className="text-slate-600"><strong>{t('privacy.s2EmailLabel')}</strong> <a href="mailto:privacy@propairapp.com" className="text-cyan-600 hover:underline">privacy@propairapp.com</a></span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-cyan-600" />
                  <span className="text-slate-600"><strong>{t('privacy.s2AddressLabel')}</strong> {t('privacy.s2Address')}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-cyan-50 rounded-lg flex items-center justify-center text-cyan-600 text-sm font-semibold">3</span>
              {t('privacy.s3Title')}
            </h2>
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h3 className="font-semibold text-slate-900 mb-3">{t('privacy.s3DirectTitle')}</h3>
                <p className="text-slate-600">{t('privacy.s3DirectDesc')}</p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h3 className="font-semibold text-slate-900 mb-3">{t('privacy.s3AutoTitle')}</h3>
                <p className="text-slate-600">{t('privacy.s3AutoDesc')}</p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h3 className="font-semibold text-slate-900 mb-3">{t('privacy.s3ThirdTitle')}</h3>
                <p className="text-slate-600">{t('privacy.s3ThirdDesc')}</p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-cyan-50 rounded-lg flex items-center justify-center text-cyan-600 text-sm font-semibold">4</span>
              {t('privacy.s4Title')}
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <p className="text-slate-600 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: t('privacy.s4P1') }} />
              <p className="text-slate-600 leading-relaxed">
                {t('privacy.s4P2')} <a href="mailto:privacy@propairapp.com" className="text-cyan-600 hover:underline">privacy@propairapp.com</a>.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-cyan-50 rounded-lg flex items-center justify-center text-cyan-600 text-sm font-semibold">5</span>
              {t('privacy.s5Title')}
            </h2>
            <div className="space-y-4">
              <div className="bg-cyan-50 rounded-2xl p-6 border border-cyan-100">
                <h3 className="font-semibold text-cyan-600 mb-2 flex items-center gap-2">
                  <Lock size={18} />
                  {t('privacy.s5NoSaleTitle')}
                </h3>
                <p className="text-slate-600" dangerouslySetInnerHTML={{ __html: t('privacy.s5NoSaleDesc') }} />
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h3 className="font-semibold text-slate-900 mb-2">{t('privacy.s5ShareTitle')}</h3>
                <p className="text-slate-600">{t('privacy.s5ShareDesc')}</p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h3 className="font-semibold text-slate-900 mb-2">{t('privacy.s5TransferTitle')}</h3>
                <p className="text-slate-600">{t('privacy.s5TransferDesc')}</p>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-cyan-50 rounded-lg flex items-center justify-center text-cyan-600 text-sm font-semibold">6</span>
              {t('privacy.s6Title')}
            </h2>
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <div className="flex items-start gap-3">
                  <Database size={20} className="text-cyan-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">{t('privacy.s6RetentionTitle')}</h3>
                    <ul className="text-slate-600 space-y-2">
                      <li>• {t('privacy.s6Retention1')}</li>
                      <li>• {t('privacy.s6Retention2')}</li>
                      <li>• <strong>{t('privacy.s6Retention3')}</strong></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <div className="flex items-start gap-3">
                  <Lock size={20} className="text-cyan-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">{t('privacy.s6SecurityTitle')}</h3>
                    <p className="text-slate-600">{t('privacy.s6SecurityDesc')}</p>
                  </div>
                </div>
              </div>
              <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={20} className="text-amber-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">{t('privacy.s6IncidentTitle')}</h3>
                    <p className="text-slate-600">{t('privacy.s6IncidentDesc')}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-cyan-50 rounded-lg flex items-center justify-center text-cyan-600 text-sm font-semibold">7</span>
              {t('privacy.s7Title')}
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <p className="text-slate-600 leading-relaxed mb-4">
                {t('privacy.s7P1')}
              </p>
              <ul className="text-slate-600 space-y-2 mb-6">
                <li>• <strong>{t('privacy.s7Right1Title')}</strong> : {t('privacy.s7Right1Desc')}</li>
                <li>• <strong>{t('privacy.s7Right2Title')}</strong> : {t('privacy.s7Right2Desc')}</li>
                <li>• <strong>{t('privacy.s7Right3Title')}</strong> : {t('privacy.s7Right3Desc')}</li>
                <li>• <strong>{t('privacy.s7Right4Title')}</strong> : {t('privacy.s7Right4Desc')}</li>
              </ul>
              <div className="bg-cyan-50 rounded-xl p-4 border border-cyan-100">
                <p className="text-slate-600">
                  <strong>{t('privacy.s7DeletionTitle')}</strong> {t('privacy.s7DeletionDesc')} <a href="mailto:privacy@propairapp.com" className="text-cyan-600 hover:underline">privacy@propairapp.com</a>. {t('privacy.s7DeletionDelay')} <strong>{t('privacy.s7DeletionDays')}</strong>.
                </p>
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
