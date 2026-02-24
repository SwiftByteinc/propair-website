import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, ShieldCheck, Hammer, Mountain, ArrowRight, Quote, Lightbulb, PenTool, Heart } from 'lucide-react';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';

// Composant Compteur avec protection NaN
const Counter = ({ value, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    // Protection contre les valeurs non-numériques (ex: "Magog")
    const numericString = value.toString().replace(/[^0-9]/g, '');
    const end = parseInt(numericString, 10);

    // Si pas de nombre valide ou trop petit pour animer, afficher la valeur telle quelle
    if (isNaN(end) || end <= 1) return;

    let start = 0;
    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / end));
    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, stepTime > 0 ? stepTime : 10);
    return () => clearInterval(timer);
  }, [value, isInView]);

  // Si valeur non-numérique ou contient %, afficher directement
  const numericCheck = value.toString().replace(/[^0-9]/g, '');
  const isNumeric = numericCheck.length > 0 && !isNaN(parseInt(numericCheck, 10));
  const numericEnd = parseInt(numericCheck, 10);
  const showRawValue = value.includes('%') || value.includes('+') || value.includes('$') || !isNumeric || numericEnd <= 1;

  return (
    <div ref={ref} className="text-center p-4 sm:p-6">
      <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-2">
        {showRawValue ? value : count.toLocaleString()}
      </div>
      <div className="text-slate-500 font-medium text-xs">{label}</div>
    </div>
  );
};

export default function About() {
  const { t } = useLanguage();

  const timeline = [
    {
      year: t('about.timeline1Year'),
      title: t('about.timeline1Title'),
      description: t('about.timeline1Desc'),
      icon: Lightbulb
    },
    {
      year: t('about.timeline2Year'),
      title: t('about.timeline2Title'),
      description: t('about.timeline2Desc'),
      icon: PenTool
    },
    {
      year: t('about.timeline3Year'),
      title: t('about.timeline3Title'),
      description: t('about.timeline3Desc'),
      icon: Heart
    }
  ];

  const values = [
    {
      icon: Clock,
      title: t('about.value1Title'),
      description: t('about.value1Desc')
    },
    {
      icon: Hammer,
      title: t('about.value2Title'),
      description: t('about.value2Desc')
    },
    {
      icon: Mountain,
      title: t('about.value3Title'),
      description: t('about.value3Desc')
    },
    {
      icon: ShieldCheck,
      title: t('about.value4Title'),
      description: t('about.value4Desc')
    }
  ];

  return (
    <div className="w-full overflow-hidden bg-white font-sans">
      <SEO
        title={t('seo.aboutTitle')}
        canonical="/about"
        description={t('seo.aboutDesc')}
      />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-slate-50" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white text-teal-700 px-4 py-2 rounded-full text-sm font-semibold mb-8 border border-teal-700 shadow-sm">
              <Mountain size={16} className="text-teal-700" />
              <span>{t('about.badge')}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-8 tracking-tight">
              {t('about.heroTitle1')}{' '}
              <span className="text-teal-700 block mt-2">
                {t('about.heroTitle2')}
              </span>
            </h1>

            <div className="space-y-6 text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              <p dangerouslySetInnerHTML={{ __html: t('about.heroParagraph1') }} />
              <p>{t('about.heroParagraph2')}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CITATION */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-white via-slate-50/50 to-white relative">
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Quote className="w-12 h-12 text-slate-200 mx-auto mb-6" />
            <blockquote
              className="text-2xl md:text-3xl font-medium text-slate-900 leading-relaxed italic mb-8"
              dangerouslySetInnerHTML={{ __html: t('about.quote') }}
            />

            <div className="flex flex-col items-center">
              <div className="w-12 h-1 bg-teal-700 rounded-full mb-4"></div>
              <div className="font-semibold text-slate-900">{t('about.quoteAuthor')}</div>
              <div className="text-sm text-slate-500">{t('about.quoteRole')}</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PARCOURS (Timeline Storytelling) */}
      <section className="py-20 md:py-28 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-slate-900 mb-4">{t('about.timelineTitle')}</h2>
            <p className="text-slate-600">{t('about.timelineSubtitle')}</p>
          </div>

          <div className="relative space-y-12">
            {/* Ligne verticale */}
            <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-teal-700 via-slate-200 to-teal-700 transform md:-translate-x-1/2" />

            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 md:gap-0 items-start md:items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Point Icone */}
                <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white border-2 border-teal-700 text-teal-700 flex items-center justify-center rounded-full z-10 shadow-md shadow-teal-700">
                  <item.icon size={20} />
                </div>

                {/* Contenu */}
                <div className={`pl-20 md:pl-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                  <span className="inline-block px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-teal-700 mb-2">
                    {item.year}
                  </span>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">{item.description}</p>
                </div>

                {/* Espace vide pour l'autre moitié */}
                <div className="hidden md:block md:w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VALEURS */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-slate-900 mb-4">{t('about.valuesTitle')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className={`bg-white p-8 rounded-2xl border border-slate-200 border-t-2 ${index % 2 === 0 ? 'border-t-teal-700' : 'border-t-slate-700'} shadow-md shadow-slate-200/40 hover:shadow-lg transition-all group`}>
                <value.icon size={20} className={`${index % 2 === 0 ? 'text-slate-600 group-hover:text-teal-700' : 'text-slate-600 group-hover:text-slate-700'} transition-colors mb-6`} />
                <h3 className="text-lg font-semibold text-slate-900 mb-3">{value.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 md:py-28 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md shadow-slate-200/40 grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-y md:divide-y-0 divide-slate-100">
            <Counter value={t('about.stat1Value')} label={t('about.stat1Label')} />
            <Counter value={t('about.stat2Value')} label={t('about.stat2Label')} />
            <Counter value={t('about.stat3Value')} label={t('about.stat3Label')} />
            <Counter value={t('about.stat4Value')} label={t('about.stat4Label')} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900 mb-6">
            {t('about.ctaTitle')}
          </h2>
          <p className="text-slate-600 text-lg mb-10 max-w-xl mx-auto">
            {t('about.ctaDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login?mode=signup"
              className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-slate-900/10 active:scale-[0.98]"
            >
              {t('about.ctaSignup')}
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 font-semibold py-4 px-8 rounded-xl hover:border-slate-300 hover:text-slate-900 transition-all active:scale-[0.98]"
            >
              {t('about.ctaLearnMore')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
