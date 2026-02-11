import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, ShieldCheck, Hammer, Mountain, ArrowRight, Quote, Lightbulb, PenTool, Heart } from 'lucide-react';
import SEO from '../components/SEO';

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
    <div ref={ref} className="text-center p-6">
      <div className="text-4xl lg:text-5xl font-bold text-slate-900 mb-2">
        {showRawValue ? value : count.toLocaleString()}
      </div>
      <div className="text-slate-500 font-medium uppercase tracking-wider text-xs">{label}</div>
    </div>
  );
};

export default function About() {
  // L'HISTOIRE VRAIE (Intégrée ici)
  const timeline = [
    {
      year: "Le Déclic",
      title: "Une simple publication Facebook",
      description: "Tout est parti d'une dame cherchant une massothérapeute sur les réseaux sociaux. Venant du milieu des services (réparation de bateaux), j'ai réalisé qu'il manquait un lien direct et simple entre les besoins locaux et nos talents.",
      icon: Lightbulb
    },
    {
      year: "Le Sacrifice",
      title: "Apprendre et bâtir",
      description: "J'ai appris à coder de zéro. J'ai mis de côté mes hobbies et réduit mon travail régulier pour consacrer des milliers d'heures à développer cette plateforme.",
      icon: PenTool
    },
    {
      year: "La Mission",
      title: "Pour ma communauté",
      description: "Aujourd'hui, je lance ProPair avec la même passion qu'au premier jour : offrir aux gens d'ici un outil simple, efficace et juste, bâti par un entrepreneur d'ici.",
      icon: Heart
    }
  ];

  const values = [
    {
      icon: Clock,
      title: "Sauver du temps",
      description: "On n'est pas là pour placoter. Nos outils connectent le besoin à la compétence, rapidement."
    },
    {
      icon: Hammer,
      title: "Faits pour le terrain",
      description: "Je suis entrepreneur. Je sais de quels outils on a besoin pour offrir une expérience digne de ce nom."
    },
    {
      icon: Mountain,
      title: "Ancré à Magog",
      description: "Je comprends la réalité des entrepreneurs locaux parce que c'est la mienne."
    },
    {
      icon: ShieldCheck,
      title: "Zéro commission",
      description: "Mon but n'est pas de taxer votre travail. Le modèle est simple et fixe. Vous gardez vos profits."
    }
  ];

  return (
    <div className="w-full overflow-hidden bg-white selection:bg-teal-50 selection:text-teal-700 font-sans">
      <SEO
        title="À propos"
        canonical="/about"
        description="Découvrez l'histoire de ProPair, créé par Nicolas Lepage à Magog. Une plateforme locale pour connecter entrepreneurs et clients au Québec."
      />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-slate-50" />

        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white text-teal-700 px-4 py-2 rounded-full text-sm font-semibold mb-8 border border-teal-100 shadow-sm">
              <Mountain size={16} className="text-amber-500" />
              <span>Initiative locale de Magog</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-8 tracking-tight">
              En tant qu'entrepreneur, je me suis posé la question :{' '}
              <span className="text-teal-600 block mt-2">
                "Qu'est-ce que je voudrais utiliser ?"
              </span>
              {/* Soulignement retiré ici comme demandé */}
            </h1>

            <div className="space-y-6 text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              <p>
                Je m'appelle <span className="font-bold text-slate-900">Nicolas Lepage</span>. Je suis né et j'ai grandi ici, à Magog. L'entrepreneuriat a toujours fait partie de ma vie.
              </p>
              <p>
                J'ai créé ProPair pour une raison simple : régler de vrais problèmes pour les gens de ma région.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CITATION */}
      <section className="py-20 bg-gradient-to-b from-white via-slate-50/50 to-white relative">
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Quote className="w-12 h-12 text-slate-200 mx-auto mb-6" />
            <blockquote className="text-2xl md:text-3xl font-medium text-slate-900 leading-relaxed italic mb-8">
              "Arrêter de compliquer la vie des artisans avec de la paperasse. <span className="text-teal-600 font-bold">ProPair, c'est l'outil que j'aurais aimé avoir quand j'ai commencé.</span>"
            </blockquote>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-1 bg-amber-500 rounded-full mb-4"></div>
              <div className="font-bold text-slate-900">Nicolas Lepage</div>
              <div className="text-sm text-slate-500">Fondateur de ProPair</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PARCOURS (Timeline Storytelling) */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">L'histoire d'une obsession</h2>
            <p className="text-slate-600">Comment une frustration est devenue une mission.</p>
          </div>

          <div className="relative space-y-12">
            {/* Ligne verticale */}
            <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-teal-200 via-slate-200 to-teal-200 transform md:-translate-x-1/2" />

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
                <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white border-2 border-teal-200 text-teal-600 flex items-center justify-center rounded-full z-10 shadow-md shadow-teal-100">
                  <item.icon size={18} />
                </div>

                {/* Contenu */}
                <div className={`pl-20 md:pl-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                  <span className="inline-block px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-amber-600 mb-2 uppercase tracking-wide">
                    {item.year}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
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
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">L'ADN de ProPair</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-teal-100 transition-all group">
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-teal-50 transition-colors">
                  <value.icon size={24} className="text-slate-600 group-hover:text-teal-600 transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{value.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-y md:divide-y-0 divide-slate-100">
            <Counter value="100%" label="Pour l'entrepreneur" />
            <Counter value="0$" label="Frais cachés" />
            <Counter value="Magog" label="Point de départ" />
            <Counter value="1" label="Vision commune" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Utilisez l'outil que j'ai créé pour nous.
          </h2>
          <p className="text-slate-600 text-lg mb-10 max-w-xl mx-auto">
            Si vous êtes tanné des plateformes qui ne comprennent pas votre réalité, venez essayer ProPair.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login?mode=signup"
              className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg shadow-slate-900/10 active:scale-[0.98]"
            >
              Créer mon compte
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 font-bold py-4 px-8 rounded-2xl hover:border-slate-300 hover:text-slate-900 transition-all active:scale-[0.98]"
            >
              Voir comment ça marche
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}