import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Gift, Users, Briefcase, Award, ArrowRight,
  Share2, CheckCircle, Sparkles, Copy, Check
} from 'lucide-react';
import SEO from '../components/SEO';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function Parrainage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  const referralCode = user?.referral_code;
  const referralLink = referralCode
    ? `${window.location.origin}/login?ref__=${encodeURIComponent(referralCode)}`
    : null;

  const copyLink = useCallback(async () => {
    if (!referralLink) return;
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard may not be available */ }
  }, [referralLink]);

  const steps = [
    {
      icon: Share2,
      title: t('parrainage.step1Title'),
      description: t('parrainage.step1Desc')
    },
    {
      icon: Users,
      title: t('parrainage.step2Title'),
      description: t('parrainage.step2Desc')
    },
    {
      icon: Award,
      title: t('parrainage.step3Title'),
      description: t('parrainage.step3Desc')
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen font-sans">
      <SEO
        title={t('seo.parrainageTitle')}
        canonical="/parrainage"
        description={t('seo.parrainageDesc')}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HERO BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-teal-700/15 to-teal-700/5 rounded-2xl p-5 sm:p-8 md:p-10 flex items-center gap-4 sm:gap-6 mb-10 border border-teal-700/20"
        >
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              {t('parrainage.heroTitle')}
            </h1>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              {t('parrainage.heroDesc')}
            </p>
          </div>
          <div className="hidden sm:flex w-20 h-20 items-center justify-center flex-shrink-0">
            <Gift size={56} className="text-teal-700" />
          </div>
        </motion.div>

        {/* COMMENT ÇA MARCHE — 3 étapes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <h2 className="text-xl font-semibold text-slate-900 mb-6">{t('parrainage.howTitle')}</h2>

          <div className="space-y-4">
            {steps.map((step, i) => (
              <div key={i} className="flex items-start gap-4 bg-white rounded-2xl border border-slate-200 p-5 shadow-md shadow-slate-200/40">
                <div className="flex items-center justify-center gap-3 shrink-0">
                  <span className="w-7 h-7 rounded-full bg-teal-700/10 text-teal-700 flex items-center justify-center text-xs font-semibold">
                    {i + 1}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-teal-700/10 flex items-center justify-center">
                    <step.icon size={20} className="text-teal-700" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">{step.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RÉCOMPENSES — deux voies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <h2 className="text-xl font-semibold text-slate-900 mb-6">{t('parrainage.rewardsTitle')}</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Voie entrepreneur */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md shadow-slate-200/40">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                  <Briefcase size={20} className="text-slate-600" />
                </div>
                <h3 className="font-semibold text-slate-900">{t('parrainage.entrepTitle')}</h3>
              </div>

              <div className="space-y-3 mb-5">
                <div className="flex items-start gap-2.5">
                  <CheckCircle size={16} className="text-teal-700 mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-600">{t('parrainage.entrepStep1')}</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle size={16} className="text-teal-700 mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-600">{t('parrainage.entrepStep2')}</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <Sparkles size={16} className="text-teal-700 mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-900 font-semibold">{t('parrainage.entrepRewardParrain')}</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <Sparkles size={16} className="text-teal-700 mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-900 font-semibold">{t('parrainage.entrepRewardFilleul')}</p>
                </div>
              </div>

              {/* Flow visuel */}
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 bg-slate-50 rounded-xl p-3 text-[11px] sm:text-xs font-semibold text-slate-600 flex-wrap">
                <span>{t('parrainage.entrepFlow1')}</span>
                <ArrowRight size={12} className="text-slate-500" />
                <span>{t('parrainage.entrepFlow2')}</span>
                <ArrowRight size={12} className="text-slate-500" />
                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">{t('parrainage.entrepFlowParrain')}</span>
                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">{t('parrainage.entrepFlowFilleul')}</span>
              </div>
            </div>

            {/* Voie client */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md shadow-slate-200/40">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-teal-700/10 flex items-center justify-center">
                  <Users size={20} className="text-teal-700" />
                </div>
                <h3 className="font-semibold text-slate-900">{t('parrainage.clientTitle')}</h3>
              </div>

              <div className="space-y-3 mb-5">
                <div className="flex items-start gap-2.5">
                  <CheckCircle size={16} className="text-teal-700 mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-600">{t('parrainage.clientStep1')}</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle size={16} className="text-teal-700 mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-600">{t('parrainage.clientStep2')}</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle size={16} className="text-teal-700 mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-600">{t('parrainage.clientStep3')}</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <Sparkles size={16} className="text-teal-700 mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-900 font-semibold">{t('parrainage.clientReward')}</p>
                </div>
              </div>

              {/* Note */}
              <p className="text-xs text-slate-500 mb-4">{t('parrainage.clientNote')}</p>

              {/* Flow visuel */}
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 bg-teal-700/10 rounded-xl p-3 text-[11px] sm:text-xs font-semibold text-slate-600 flex-wrap">
                <span>{t('parrainage.clientFlow1')}</span>
                <ArrowRight size={12} className="text-slate-500" />
                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">{t('parrainage.clientFlowReward')}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* INFO FOOTER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-slate-50 rounded-2xl p-5 border border-slate-200 mb-10"
        >
          <p className="text-xs text-slate-500 leading-relaxed">
            {t('parrainage.infoText')}
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-900 rounded-2xl p-8 md:p-10 text-center"
        >
          <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">
            {user ? t('parrainage.ctaLoggedIn') : t('parrainage.ctaLoggedOut')}
          </h2>
          <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
            {user ? t('parrainage.ctaLoggedInDesc') : t('parrainage.ctaLoggedOutDesc')}
          </p>
          {user && referralLink && (
            <div className="mb-6 max-w-md mx-auto">
              <p className="text-slate-400 text-xs mb-2">{t('parrainage.yourLink')}</p>
              <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-3">
                <span className="text-white text-sm font-mono truncate flex-1">{referralLink}</span>
                <button
                  onClick={copyLink}
                  className="shrink-0 text-white/70 hover:text-white transition-colors"
                  aria-label={copied ? t('dashboard.copiedLabel') : t('dashboard.copyLink')}
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            </div>
          )}
          <Link
            to={user ? '/portal/referral' : '/login?mode=signup'}
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-900 font-bold py-3.5 px-8 rounded-xl transition-all active:scale-[0.98]"
          >
            {user ? t('parrainage.ctaLoggedInBtn') : t('parrainage.ctaLoggedOutBtn')}
            <ArrowRight size={16} />
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
