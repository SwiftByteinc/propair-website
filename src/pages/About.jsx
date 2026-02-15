import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Heart, Globe } from 'lucide-react';
import Card from '../components/ui/Card';

export default function About() {
  return (
    <div className="pt-32 pb-24 w-full overflow-hidden bg-white">
      {/* Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div className="lg:w-1/2" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Notre mission : Simplifier vos projets.</h1>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>ProPair est né d'un constat simple : trouver un artisan de confiance relève souvent du parcours du combattant.</p>
              <p>Nous remettons l'humain et la confiance au cœur de la relation.</p>
            </div>
          </motion.div>
          <motion.div className="lg:w-1/2" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
             <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="Mission" className="rounded-3xl shadow-2xl"/>
          </motion.div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="bg-slate-50 py-24 mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
             <h2 className="text-3xl font-bold text-slate-900">Nos Valeurs</h2>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
             {[
               { icon: Target, title: "Excellence", text: "Viser la perfection." },
               { icon: Users, title: "Communauté", text: "Grandir ensemble." },
               { icon: Heart, title: "Passion", text: "Aimer ce qu'on fait." },
               { icon: Globe, title: "Impact", text: "Un avenir durable." }
             ].map((item, i) => (
               <Card key={i} className="text-center h-full hover:border-teal-500 transition-colors">
                 <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-2xl mx-auto flex items-center justify-center mb-6"><item.icon size={32} /></div>
                 <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                 <p className="text-slate-600">{item.text}</p>
               </Card>
             ))}
           </div>
        </div>
      </section>

      {/* Stats (Pas d'équipe après ça) */}
      <section className="py-12 bg-slate-900 text-white">
         <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div><div className="text-4xl font-bold text-teal-400">10k+</div><div className="text-slate-400">Projets</div></div>
            <div><div className="text-4xl font-bold text-teal-400">98%</div><div className="text-slate-400">Satisfaction</div></div>
            <div><div className="text-4xl font-bold text-teal-400">5000</div><div className="text-slate-400">Pros</div></div>
            <div><div className="text-4xl font-bold text-teal-400">24/7</div><div className="text-slate-400">Support</div></div>
         </div>
      </section>
    </div>
  );
}
