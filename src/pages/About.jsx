import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, Target, Globe } from 'lucide-react';
import Card from '../components/ui/Card';

// Animated Counter Component
const Counter = ({ value, label }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value.replace(/,/g, '').replace('k', '000').replace('%', ''));
    if (start === end) return;

    let totalDuration = 2000;
    let incrementTime = (totalDuration / end) * 10;

    // Adjust for large numbers to avoid performance issues
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

  return (
    <div className="text-center p-6">
      <div className="text-4xl lg:text-5xl font-bold text-brand mb-2">
        {value.includes('k') ? `${Math.floor(count/1000)}k+` : value.includes('%') ? `${count}%` : count}
      </div>
      <div className="text-slate-600 font-medium">{label}</div>
    </div>
  );
};

export default function About() {
  return (
    <div className="pt-32 pb-24 w-full overflow-hidden">

      {/* Hero / Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Notre mission : Simplifier vos projets.</h1>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                ProPair est né d'un constat simple : trouver un artisan de confiance ou un client sérieux relève souvent du parcours du combattant.
              </p>
              <p>
                Nous avons voulu changer la donne en créant une plateforme qui remet l'humain et la confiance au cœur de la relation. Nous ne sommes pas juste un annuaire, nous sommes votre partenaire de réussite.
              </p>
              <p>
                Aujourd'hui, nous sommes fiers de connecter des milliers de passionnés à travers le pays, en garantissant qualité, sécurité et transparence.
              </p>
            </div>
          </motion.div>
          <motion.div
             className="lg:w-1/2 relative"
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.6, delay: 0.2 }}
          >
             <div className="rounded-3xl overflow-hidden shadow-2xl">
               <img
                 src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                 alt="Équipe ProPair"
                 className="w-full h-auto object-cover"
               />
             </div>
             <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-slate-50 py-24 mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
             <h2 className="text-3xl font-bold text-slate-900 mb-4">Nos Valeurs</h2>
             <p className="text-slate-600">Ce qui nous guide au quotidien.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {[
               { icon: Target, title: "Excellence", text: "Nous visons la perfection dans chaque interaction." },
               { icon: Users, title: "Communauté", text: "Nous grandissons ensemble, main dans la main." },
               { icon: Heart, title: "Passion", text: "Nous aimons ce que nous faisons et ça se voit." },
               { icon: Globe, title: "Impact", text: "Nous construisons un avenir plus durable." }
             ].map((item, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
               >
                 <Card className="text-center h-full hover:border-brand border border-transparent transition-colors">
                   <div className="w-16 h-16 bg-teal-50 text-brand rounded-2xl mx-auto flex items-center justify-center mb-6">
                     <item.icon size={32} />
                   </div>
                   <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                   <p className="text-slate-600">{item.text}</p>
                 </Card>
               </motion.div>
             ))}
           </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-12 bg-slate-900 text-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-800">
               <Counter value="10k+" label="Projets réalisés" />
               <Counter value="98%" label="Satisfaction client" />
               <Counter value="5000" label="Professionnels vérifiés" />
               <Counter value="24/7" label="Support disponible" />
            </div>
         </div>
      </section>
    </div>
  );
}
