import React from 'react';
import { motion } from 'framer-motion';
import { Bell, CreditCard, MessageCircle, Star, MapPin, User, Search } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

export default function Home() {
  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div className="lg:w-1/2" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-tight mb-6">
                Toute la gestion de vos services, <span className="text-teal-600">dans votre poche.</span>
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                ProPair est l'application qui connecte clients et professionnels en temps réel. Chat intégré, suivi GPS, et paiements sécurisés.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="h-14 px-8 bg-slate-900 hover:bg-slate-800 text-white rounded-xl">App Store</Button>
                <Button variant="outline" className="h-14 px-8 rounded-xl">Google Play</Button>
              </div>
            </motion.div>

            <motion.div className="lg:w-1/2 flex justify-center" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              {/* iPhone Simulation */}
              <div className="relative w-[320px] h-[640px] bg-slate-900 rounded-[55px] shadow-2xl border-[12px] border-slate-900 overflow-hidden ring-1 ring-slate-900/50">
                 {/* Dynamic Island */}
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-3xl z-30"></div>

                 {/* App Interface */}
                 <div className="w-full h-full bg-slate-100 relative flex flex-col">
                    {/* Header App */}
                    <div className="pt-12 pb-4 px-6 bg-white shadow-sm z-20 flex justify-between items-center">
                       <div className="flex items-center gap-2 bg-slate-100 rounded-full px-4 py-2 w-full">
                          <Search size={16} className="text-slate-400"/>
                          <span className="text-xs text-slate-400">Rechercher un plombier...</span>
                       </div>
                    </div>

                    {/* MAP Background Simulation */}
                    <div className="flex-1 bg-slate-200 relative overflow-hidden">
                       {/* Roads */}
                       <div className="absolute top-0 left-1/4 w-4 h-full bg-white/60"></div>
                       <div className="absolute top-1/3 left-0 w-full h-4 bg-white/60"></div>
                       <div className="absolute top-2/3 left-0 w-full h-4 bg-white/60 rotate-45"></div>

                       {/* Pins */}
                       <div className="absolute top-24 left-1/3 bg-teal-500 p-2 rounded-full shadow-lg border-2 border-white animate-bounce"><User size={16} className="text-white"/></div>
                       <div className="absolute bottom-40 right-12 bg-slate-800 p-2 rounded-full shadow-lg border-2 border-white"><MapPin size={16} className="text-white"/></div>

                       {/* Pro Card Overlay */}
                       <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-2xl shadow-xl z-20">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">JD</div>
                             <div>
                                <h4 className="font-bold text-slate-900 text-sm">Julien Dépanne</h4>
                                <div className="flex items-center text-xs text-yellow-500"><Star size={10} fill="currentColor"/> 4.9 (120 avis)</div>
                             </div>
                          </div>
                          <div className="mt-3 flex gap-2">
                             <button className="flex-1 bg-slate-900 text-white text-xs py-2 rounded-lg font-medium">Contacter</button>
                             <button className="flex-1 bg-slate-100 text-slate-900 text-xs py-2 rounded-lg font-medium">Profil</button>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Bell, title: "Notifications instantanées", desc: "Soyez alerté dès qu'une opportunité se présente." },
                { icon: CreditCard, title: "Paiement en un clic", desc: "Réglez vos prestations de manière sécurisée." },
                { icon: MessageCircle, title: "Messagerie sécurisée", desc: "Échangez sans divulguer votre numéro personnel." }
              ].map((step, idx) => (
                <Card key={idx} className="text-center py-10 hover:border-teal-100 transition-colors">
                  <div className="w-16 h-16 mx-auto bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 mb-6">
                    <step.icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600">{step.desc}</p>
                </Card>
              ))}
            </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-teal-700 rounded-3xl p-12 shadow-2xl shadow-teal-900/20 relative overflow-hidden">
             <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white mb-6">Prêt à simplifier votre quotidien ?</h2>
                <Button className="bg-white text-slate-900 hover:bg-slate-100">Télécharger ProPair</Button>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
