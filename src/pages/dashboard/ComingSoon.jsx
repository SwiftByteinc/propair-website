import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Gift, Link2, Sparkles, Rocket, Heart, Check } from 'lucide-react';
import posthog from 'posthog-js';
import { useLanguage } from '../../context/LanguageContext';

const WAITLIST_KEY = 'propair_waitlist_joined';
const VOTES_KEY = 'propair_feature_votes';

function getStoredVotes() {
  try {
    return JSON.parse(localStorage.getItem(VOTES_KEY) || '{}');
  } catch {
    return {};
  }
}

export default function ComingSoon() {
  const { t } = useLanguage();
  const [joined, setJoined] = useState(() => {
    try { return localStorage.getItem(WAITLIST_KEY) === 'true'; } catch { return false; }
  });
  const [votes, setVotes] = useState(() => {
    try { return getStoredVotes(); } catch { return {}; }
  });

  const handleJoinWaitlist = () => {
    if (joined) return;
    setJoined(true);
    try { localStorage.setItem(WAITLIST_KEY, 'true'); } catch { /* ignore */ }
    posthog.capture('referral_waitlist_joined');
  };

  const handleVote = (featureId) => {
    const newVotes = { ...votes, [featureId]: !votes[featureId] };
    setVotes(newVotes);
    try { localStorage.setItem(VOTES_KEY, JSON.stringify(newVotes)); } catch { /* ignore */ }
    if (!votes[featureId]) {
      posthog.capture('feature_vote', { feature: featureId });
    }
  };

  const features = [
    {
      id: 'referral',
      icon: Gift,
      title: t('dashboard.comingSoonFeature1Title'),
      description: t('dashboard.comingSoonFeature1Desc'),
    },
    {
      id: 'crm',
      icon: Link2,
      title: t('dashboard.comingSoonFeature2Title'),
      description: t('dashboard.comingSoonFeature2Desc'),
    },
    {
      id: 'quotes',
      icon: Sparkles,
      title: t('dashboard.comingSoonFeature3Title'),
      description: t('dashboard.comingSoonFeature3Desc'),
    },
  ];

  const totalVotes = Object.values(votes).filter(Boolean).length;

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-4xl">
      <Helmet><title>{t('dashboard.comingSoonTitle')}</title></Helmet>

      {/* Header */}
      <header className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl sm:text-2xl font-bold text-slate-900"
        >
          {t('dashboard.comingSoonHeading')}
        </motion.h1>
        <p className="text-slate-500 mt-1">
          {t('dashboard.comingSoonSubtitle')}
        </p>
      </header>

      <div className="space-y-6">

        {/* REFERRAL TEASER — Hero card */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-md shadow-slate-200/40 overflow-hidden"
        >
          <div className="bg-gradient-to-br from-teal-700/15 to-slate-50/30 px-4 sm:px-6 py-5 border-b border-teal-700/20">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/80 border border-teal-700/20 flex items-center justify-center shadow-sm shrink-0">
                <Gift size={24} className="text-teal-700" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  {t('dashboard.comingSoonReferralTitle')}
                </h2>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {t('dashboard.comingSoonReferralDesc')}
            </p>

            <motion.button
              onClick={handleJoinWaitlist}
              whileTap={!joined ? { scale: 0.95 } : undefined}
              disabled={joined}
              className={`w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700/30 focus-visible:ring-offset-2 ${
                joined
                  ? 'bg-teal-700 text-white cursor-default'
                  : 'bg-slate-900 text-white hover:bg-black active:scale-[0.98]'
              }`}
            >
              {joined ? (
                <>
                  <Check size={18} />
                  {t('dashboard.comingSoonJoined')}
                </>
              ) : (
                <>
                  <Rocket size={18} />
                  {t('dashboard.comingSoonJoinWaitlist')}
                </>
              )}
            </motion.button>
          </div>
        </motion.section>

        {/* DANS NOTRE LABORATOIRE — Feature votes */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-md shadow-slate-200/40 overflow-hidden"
        >
          <div className="px-4 sm:px-6 py-4 border-b border-slate-50">
            <h2 className="font-semibold text-slate-900">{t('dashboard.comingSoonLabTitle')}</h2>
            <p className="text-xs text-slate-500 mt-0.5">{t('dashboard.comingSoonLabSubtitle')}</p>
          </div>

          <div className="p-4 sm:p-6 grid sm:grid-cols-3 gap-4">
            {features.map((feature) => {
              const isVoted = !!votes[feature.id];
              return (
                <div
                  key={feature.id}
                  className={`rounded-xl border p-5 transition-all ${
                    isVoted
                      ? 'border-teal-700/30 bg-teal-700/5'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                    isVoted ? 'bg-teal-700/10' : 'bg-slate-50'
                  }`}>
                    <feature.icon size={20} className={isVoted ? 'text-teal-700' : 'text-slate-500'} />
                  </div>
                  <h3 className="font-semibold text-slate-900 text-sm mb-1">{feature.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">{feature.description}</p>

                  <button
                    onClick={() => handleVote(feature.id)}
                    className={`w-full py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700/30 focus-visible:ring-offset-2 ${
                      isVoted
                        ? 'bg-teal-700/10 text-teal-700'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <Heart size={14} className={isVoted ? 'fill-teal-700' : ''} />
                    {isVoted ? t('dashboard.comingSoonVoted') : t('dashboard.comingSoonVote')}
                  </button>
                </div>
              );
            })}
          </div>

          {totalVotes > 0 && (
            <div className="px-4 sm:px-6 pb-4">
              <p className="text-xs text-slate-500 text-center">
                {t('dashboard.comingSoonThanks')}
              </p>
            </div>
          )}
        </motion.section>
      </div>
    </div>
  );
}
