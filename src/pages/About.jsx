import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Heart, Target, Zap, ArrowRight, MapPin, Sparkles, Mountain } from 'lucide-react';

// Animated Counter Component
const Counter = ({ value, label }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value.replace(/,/g, '').replace('k', '000').replace('%', '').replace('$', '').replace('+', ''));
    if (start === end) return;

    let totalDuration = 2000;
    let incrementTime = (totalDuration / end) * 10;

    if (end > 1000) {
      incrementTime = 10;
    }

    let timer = setInterval(() => {
      start += Math.ceil(end / 100);
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  const formatValue = () => {
    if (value.includes('k')) return `${Math.floor(count/1000)}k+`;
    if (value.includes('%')) return `${count}%`;
    if (value.includes('$')) return `${count.toLocaleString()}$`;
    return count.toLocaleString();
  };

  return (
    <div className="text-center p-6">
      <div className="text-4xl lg:text-5xl font-bold text-teal mb-2">
        {formatValue()}
      </div>
      <div className="text-body font-medium">{label}</div>
    </div>
  );
};

export default function About() {
  const timeline = [
    {
      year: "2024",
      title: "ProPair voit le jour",
      description: "Face aux plateformes qui prennent 20% de commission aux artisans, nous créons ProPair à Magog : abonnement fixe pour les pros, 0% de commission."
    },
    {
      year: "2025",
      title: "La communauté grandit",
      description: "Plus de 2,500 entrepreneurs québécois nous font confiance. En moyenne, ils économisent 3,000$ par an en commissions."
    },
    {
      year: "2026",
      title: "Expansion nationale",
      description: "ProPair s'étend à travers le Canada tout en restant fidèle à ses racines québécoises et ses valeurs de transparence."
    }
  ];

  const values = [
    {
      icon: Target,
      title: "Transparence",
      description: "Pas de frais cachés, pas de mauvaises surprises. Tout est clair dès le départ."
    },
    {
      icon: MapPin,
      title: "Local",
      description: "Une entreprise québécoise qui comprend les besoins des entrepreneurs d'ici."
    },
    {
      icon: Heart,
      title: "Équité",
      description: "Les artisans méritent de garder 100% de ce qu'ils gagnent. C'est notre engagement."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Nous améliorons constamment notre plateforme pour simplifier votre quotidien."
    }
  ];

  return (
    <div className="pt-32 pb-24 w-full overflow-hidden bg-white">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-teal/5 text-teal px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-teal/10">
              <Mountain size={16} />
              Né à Magog, Québec
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">
              Une entreprise québécoise qui croit aux{' '}
              <span className="text-gradient-teal">artisans d'ici</span>.
            </h1>
            <div className="space-y-6 text-lg text-body leading-relaxed">
              <p>
                ProPair est né d'une frustration partagée par des milliers d'entrepreneurs au Québec :
                pourquoi reverser 15 à 25% de chaque projet à une plateforme américaine ?
              </p>
              <p>
                Nous avons créé ProPair avec une conviction simple :
                les artisans travaillent dur pour leurs clients, ils méritent de garder l'intégralité de leurs revenus.
              </p>
              <p>
                Notre modèle d'abonnement fixe permet aux professionnels de développer leur activité
                sereinement, sans voir leur marge grignotée à chaque projet.
              </p>
            </div>

            {/* Quebec badge */}
            <div className="mt-8 inline-flex items-center gap-3 px-4 py-3 bg-surface rounded-xl border border-border">
              <MapPin className="text-teal" size={20} />
              <span className="text-primary font-medium">Siège social à Magog, QC</span>
            </div>
          </motion.div>

          <motion.div
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="rounded-3xl overflow-hidden shadow-float bg-white p-12 border border-border">
              <div className="text-center">
                <div className="w-24 h-24 bg-teal rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-soft">
                  <span className="text-white text-5xl font-bold">P</span>
                </div>
                <h2 className="text-3xl font-bold text-primary mb-2">ProPair</h2>
                <p className="text-muted mb-6">La connexion directe</p>
                <div className="flex justify-center gap-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-teal">0%</div>
                    <div className="text-sm text-muted">Commission</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber">100%</div>
                    <div className="text-sm text-muted">Québécois</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-teal/10 rounded-full blur-3xl" />
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-amber/10 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </section>

      {/* Vision Section - Serif Editorial */}
      <section className="py-24 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Sparkles className="w-8 h-8 text-teal mx-auto mb-6" />
            <blockquote className="font-editorial text-2xl md:text-3xl lg:text-4xl text-primary leading-relaxed italic mb-8">
              "ProPair a été conçu à Magog, au coeur des Cantons-de-l'Est, avec une vision simple :
              reconnecter les Québécois avec les artisans de leur région, sans intermédiaire gourmand."
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 bg-teal rounded-full flex items-center justify-center text-white font-bold">
                P
              </div>
              <div className="text-left">
                <div className="font-semibold text-primary">L'équipe ProPair</div>
                <div className="text-sm text-muted">Magog, Québec</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Notre parcours</h2>
            <p className="text-body text-lg">De l'idée à la réalité</p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border-dark transform md:-translate-x-1/2" />

            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-teal rounded-full transform -translate-x-1/2 shadow-soft z-10" />

                {/* Content */}
                <div className={`ml-20 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                  <span className="text-teal font-bold text-lg">{item.year}</span>
                  <h3 className="text-xl font-bold text-primary mt-1 mb-2">{item.title}</h3>
                  <p className="text-body">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Nos valeurs</h2>
            <p className="text-body text-lg">Ce qui nous guide au quotidien</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-soft border border-border hover:border-teal/20 hover:shadow-soft-lg transition-all group"
              >
                <div className="w-14 h-14 bg-teal/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-teal transition-colors">
                  <value.icon size={28} className="text-teal group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{value.title}</h3>
                <p className="text-body">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-16 bg-white border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border">
            <Counter value="10k+" label="Projets réalisés" />
            <Counter value="98%" label="Satisfaction client" />
            <Counter value="2500" label="Pros actifs" />
            <Counter value="3000$" label="Économisés/an/pro" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-12 text-center border-2 border-teal shadow-soft-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber/5 rounded-full blur-2xl" />

          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Envie de rejoindre l'aventure ?
            </h2>
            <p className="text-body text-lg mb-8 max-w-xl mx-auto">
              Que vous soyez client à la recherche d'un artisan ou professionnel souhaitant
              développer votre activité, ProPair est fait pour vous.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login?redirect=billing"
                className="inline-flex items-center justify-center gap-2 bg-amber hover:bg-amber-dark text-white font-semibold py-4 px-8 rounded-full transition-colors shadow-lg shadow-amber/25 btn-press"
              >
                Obtenir mes 3 connexions gratuites
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center gap-2 bg-white border-2 border-border-dark text-primary font-semibold py-4 px-8 rounded-full hover:bg-surface transition-colors"
              >
                Voir les tarifs Pro
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
