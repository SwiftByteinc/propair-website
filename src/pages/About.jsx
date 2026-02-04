import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Heart, Target, Zap, ArrowRight, MapPin, Sparkles, Mountain, Handshake, ShieldCheck, Lightbulb, Clock, Hammer, Quote } from 'lucide-react';

// ==========================================
// Composant Compteur Animé (Premium)
// ==========================================
const Counter = ({ value, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = parseInt(value.replace(/,/g, '').replace('k', '000').replace('%', '').replace('$', '').replace('+', ''));
    if (start === end) return;
    let totalDuration = 2000;
    let incrementTime = (end > 1000) ? 10 : (end > 5000 ? 5 : (totalDuration / end) * 10);
    let timer = setInterval(() => {
      start += Math.ceil(end / 100);
      if (start >= end) { start = end; clearInterval(timer); }
      setCount(start);
    }, incrementTime);
    return () => clearInterval(timer);
  }, [value, isInView]);

  const formatValue = () => {
    if (value.includes('k')) return `${Math.floor(count/1000)}k+`;
    if (value.includes('%')) return `${count}%`;
    if (value.includes('$')) return `${count.toLocaleString()} $`;
    return count.toLocaleString();
  };

  return (
    <div ref={ref} className="text-center p-8 group">
      <div className="text-5xl lg:text-6xl font-bold text-indigo-950 mb-3 tracking-tight font-feature-settings group-hover:text-teal-700 transition-colors duration-300">
        {formatValue()}
      </div>
      <div className="text-indigo-800/70 font-medium uppercase tracking-wider text-sm font-sans">{label}</div>
    </div>
  );
};

export default function About() {
  const timeline = [
    {
      icon: Clock,
      year: "Le Constat",
      title: "Trop de temps perdu",
      description: "Comme entrepreneur à Magog, je passais trop de temps à gérer des appels manqués ou à payer des leads inutiles. Je me suis dit : 'Qu'est-ce que je voudrais utiliser moi-même tous les jours ?'"
    },
    {
      icon: Lightbulb,
      year: "La Solution",
      title: "Créer l'outil manquant",
      description: "J'ai décidé de bâtir la plateforme que je ne trouvais pas ailleurs. Pas pour prendre une commission, mais pour nous faire sauver du temps et offrir une expérience pro aux clients."
    },
    {
      icon: Handshake,
      year: "Aujourd'hui",
      title: "ProPair pour tous",
      description: "Ce qui a commencé comme une solution à ma propre frustration est devenu un outil pour tous les entrepreneurs d'ici qui veulent travailler mieux, pas juste plus fort."
    }
  ];

  const values = [
    {
      icon: Clock,
      title: "Sauver du temps",
      description: "On n'est pas là pour placoter au téléphone. Nos outils sont faits pour connecter le besoin à la compétence, rapidement."
    },
    {
      icon: Hammer,
      title: "Faits pour le terrain",
      description: "Je suis entrepreneur. Je sais de quels outils on a besoin pour offrir une expérience digne de ce nom, des deux côtés."
    },
    {
      icon: Mountain,
      title: "Ancré à Magog",
      description: "Je comprends la réalité des entrepreneurs locaux parce que c'est la mienne. On bâtit ça pour notre économie."
    },
    {
      icon: ShieldCheck,
      title: "Zéro commission",
      description: "Mon but n'est pas de taxer votre travail. Le modèle est simple, fixe et transparent. Vous gardez vos profits."
    }
  ];

  return (
    // Changement du fond global de blanc à un ton pierre/crème très subtil
    <div className="w-full overflow-hidden bg-stone-50 selection:bg-amber-100 selection:text-indigo-950 font-sans">

      {/* ============================================ */}
      {/* HERO SECTION - Ambiance chaleureuse et profonde */}
      {/* ============================================ */}
      <section className="relative pt-40 pb-32 md:pt-48 md:pb-48 overflow-hidden">
        
        {/* Image de fond avec un overlay BLEU NUIT profond au lieu de blanc */}
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=2000" 
                alt="Montage entrepreneurs Magog" 
                // Ajout d'un filtre bleu nuit (mix-blend-multiply ou overlay couleur)
                className="w-full h-full object-cover filter blur-md scale-105"
            />
            {/* L'overlay crucial qui remplace le noir par du bleu profond */}
            <div className="absolute inset-0 bg-indigo-950/80 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-stone-50 via-transparent to-indigo-950/50"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Badge avec touche d'Ambre */}
            <div className="inline-flex items-center gap-2 bg-indigo-900/30 backdrop-blur-md text-amber-300 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-amber-500/20 shadow-sm">
              <Mountain size={16} />
              <span className="font-semibold tracking-wide">L'initiative d'un entrepreneur de Magog</span>
            </div>

            {/* Titre en Blanc Cassé/Crème pour contraster avec le fond bleu nuit */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-stone-100 mb-8 leading-[1.1] tracking-tight font-serif">
              En tant qu'entrepreneur, je me suis posé la question :{' '}
              {/* Soulignement Ambre */}
              <span className="relative inline-block text-white mt-2">
                "Qu'est-ce que je voudrais utiliser moi-même tous les jours ?"
                 <svg className="absolute -bottom-3 left-0 w-full h-4 text-amber-500/70" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 9.5C55.5 3.5 168.5 -1.5 298 9.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/></svg>
              </span>
            </h1>

            {/* Textes en bleu très clair/blanc cassé */}
            <div className="space-y-6 text-lg text-indigo-100/80 leading-relaxed font-light max-w-2xl mx-auto">
              <p>
                Je m'appelle <span className="font-semibold text-white">Nicolas Lepage</span>. Je ne suis pas une multinationale. Je suis un gars d'ici qui en avait assez de perdre du temps au téléphone et de payer des commissions inutiles.
              </p>
              <p>
                J'ai créé ProPair non pas pour prendre un pourcentage, mais pour offrir une expérience digne de ce nom.
              </p>
              <p className="font-medium text-amber-200 text-xl font-serif">
                Des bons outils pour les clients, et surtout, pour nous, les entrepreneurs. Pour qu'on puisse se concentrer sur notre vrai travail.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CITATION VISION - Élégance et Chaleur */}
      {/* ============================================ */}
      <section className="py-24 relative overflow-hidden">
        {/* Ajout d'une texture subtile en fond */}
        <div className="absolute inset-0 bg-stone-100 opacity-50 pattern-diagonal-lines-sm"></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
             {/* Guillemets géants décoratifs en Ambre */}
            <Quote className="absolute -top-10 -left-10 w-32 h-32 text-amber-500/10 transform -scale-x-100" />
            
            <Sparkles className="w-8 h-8 text-amber-500 mx-auto mb-8 relative z-10" />
            
            {/* Utilisation du Bleu Nuit Profond */}
            <blockquote className="text-3xl md:text-4xl font-serif text-indigo-950 leading-relaxed italic mb-12 relative z-10">
              "Mon but est simple : arrêter de compliquer la vie des artisans avec de la paperasse et des frais. <span className="font-bold text-teal-700 decoration-amber-500/30 underline underline-offset-4">ProPair, c'est l'outil que j'aurais aimé avoir quand j'ai commencé.</span>"
            </blockquote>
            
            <div className="flex flex-col items-center justify-center relative z-10">
              {/* Petite touche visuelle: ligne ambre */}
              <div className="w-16 h-1 bg-amber-500 rounded-full mb-4"></div>
              <div className="font-bold text-indigo-950 text-xl font-serif">Nicolas Lepage</div>
              <div className="text-sm text-indigo-800/60 font-medium uppercase tracking-wider">Entrepreneur & Fondateur de ProPair, Magog</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================ */}
      {/* NOTRE PARCOURS (Timeline repensée avec des icônes) */}
      {/* ============================================ */}
      <section className="py-32 bg-white relative">
         {/* Séparateur de section organique */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-stone-50 to-white"></div>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-bold text-indigo-950 mb-6 tracking-tight font-serif">Du chantier au code</h2>
            <p className="text-indigo-800/70 text-xl font-light max-w-xl mx-auto">Comment mon besoin personnel est devenu une solution pour tous.</p>
          </div>

          <div className="relative">
            {/* Ligne verticale en pointillés Ambre */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px border-l-2 border-dashed border-amber-200 transform md:-translate-x-1/2" />

            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.2 }}
                className={`relative flex flex-col md:flex-row items-center mb-20 ${
                  index % 2 === 0 ? '' : 'md:flex-row-reverse'
                }`}
              >
                {/* Point central : Icône dans un cercle Ambre/Bleu */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-10 my-4 md:my-0">
                    <div className="w-16 h-16 bg-indigo-950 rounded-full ring-8 ring-white shadow-lg flex items-center justify-center border-2 border-amber-500">
                        <item.icon className="text-amber-400 w-8 h-8" />
                    </div>
                </div>

                {/* Année/Titre de l'étape */}
                <div className={`md:w-1/2 text-center md:text-right mb-6 md:mb-0 ${index % 2 === 0 ? 'md:pr-24' : 'md:pl-24 md:text-left'}`}>
                    <span className="inline-block py-2 px-4 bg-amber-50 text-amber-800 font-bold rounded-lg text-sm border border-amber-100 shadow-sm uppercase tracking-widest mb-2">{item.year}</span>
                    <h3 className="text-2xl font-bold text-indigo-950 font-serif">{item.title}</h3>
                </div>

                {/* Contenu */}
                <div className={`ml-24 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pl-24 text-left' : 'md:pr-24 md:text-right'}`}>
                  <p className="text-indigo-800/80 leading-relaxed text-lg">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* MES VALEURS (Cartes Premium avec Ambre) */}
      {/* ============================================ */}
      <section className="py-32 bg-stone-50 relative overflow-hidden">
        {/* Formes d'arrière-plan subtiles */}
        <div className="absolute -top-1/2 -right-1/4 w-full h-full bg-gradient-radial from-teal-50/50 to-transparent opacity-50 pointer-events-none"></div>
        <div className="absolute -bottom-1/2 -left-1/4 w-full h-full bg-gradient-radial from-amber-50/40 to-transparent opacity-50 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-indigo-950 mb-6 tracking-tight font-serif">L'ADN de ProPair</h2>
            <p className="text-indigo-800/70 text-xl font-light max-w-2xl mx-auto">Les principes non-négociables sur lesquels j'ai bâti cette plateforme, d'entrepreneur à entrepreneur.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                // Cartes plus profondes, avec une ombre colorée et une bordure au survol
                className="bg-white rounded-[2rem] p-8 border border-stone-100 shadow-xl shadow-indigo-900/5 hover:shadow-2xl hover:shadow-amber-900/10 hover:border-amber-500/30 transition-all duration-500 group hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-950 transition-colors duration-500 shadow-inner">
                  <value.icon size={32} className="text-teal-700 group-hover:text-amber-400 transition-colors duration-500" />
                </div>
                <h3 className="text-2xl font-bold text-indigo-950 mb-4 font-serif">{value.title}</h3>
                <p className="text-indigo-800/70 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* STATS BANNER (Épuré et chaud) */}
      {/* ============================================ */}
      <section className="py-20 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-stone-100 bg-stone-50/50 rounded-3xl p-4">
            <Counter value="100%" label="Pour l'entrepreneur" />
            <Counter value="0$" label="Frais cachés" />
            <Counter value="Magog" label="Point de départ" />
            <Counter value="1" label="Vision commune" />
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CTA FINAL (Boutons Bleu Nuit et Ambre) */}
      {/* ============================================ */}
      <section className="max-w-5xl mx-auto px-6 py-40 text-center relative">
        {/* Petit effet de halo derrière le CTA */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-amber-100/30 blur-[100px] rounded-full -z-10"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-indigo-950 mb-8 tracking-tight font-serif">
            Utilisez l'outil que j'ai créé pour nous.
          </h2>
          <p className="text-indigo-800/80 text-xl mb-16 max-w-2xl mx-auto leading-relaxed">
            Si vous êtes tanné des plateformes qui ne comprennent pas votre réalité, venez essayer ProPair. C'est fait pour vous, par l'un des vôtres.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {/* Bouton Principal : Bleu Nuit Profond */}
            <Link
              to="/login?mode=signup"
              className="group inline-flex items-center justify-center gap-3 bg-indigo-950 hover:bg-indigo-900 text-white font-bold text-lg py-5 px-12 rounded-full transition-all shadow-xl shadow-indigo-900/20 hover:shadow-2xl hover:shadow-indigo-900/30 active:scale-95"
            >
              Créer mon compte
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
            </Link>
            
            {/* Bouton Secondaire : Bordure Ambre */}
            <Link
              to="/pricing"
              className="group inline-flex items-center justify-center gap-2 bg-transparent border-2 border-amber-600 text-amber-800 font-bold text-lg py-5 px-12 rounded-full hover:bg-amber-50 transition-all active:scale-95"
            >
              Voir comment ça marche
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}