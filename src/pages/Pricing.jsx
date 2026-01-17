import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, AlertCircle, TrendingUp } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function Pricing() {
  const [showPopup, setShowPopup] = useState(false);
  const [hasSeenPopup, setHasSeenPopup] = useState(false);

  // Trigger popup after 5 seconds if not seen
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasSeenPopup) {
        setShowPopup(true);
        setHasSeenPopup(true);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [hasSeenPopup]);

  const handleMonthlyClick = () => {
    if (!hasSeenPopup) {
      setShowPopup(true);
      setHasSeenPopup(true);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen relative overflow-hidden">

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-slate-900 skew-y-3 transform -translate-y-24 z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Ne laissez pas filer votre marge</h1>
            <p className="text-xl text-slate-300 mb-8">
              ProPair est la seule plateforme qui vous laisse choisir votre modèle de commission.
            </p>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-center">

          {/* Monthly Plan (High Fees) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border border-slate-200 h-full bg-white/95 backdrop-blur">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900">Mensuel</h3>
                <p className="text-slate-500 mt-1">Flexibilité maximale, frais standards.</p>

                <div className="my-8 py-6 border-y border-slate-100">
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold text-slate-900">$23</span>
                    <span className="text-slate-500 ml-2">/mois</span>
                  </div>
                  <div className="mt-4 flex items-center justify-center text-red-500 bg-red-50 py-2 px-4 rounded-full mx-auto w-fit">
                    <AlertCircle size={18} className="mr-2" />
                    <span className="font-bold">10.47% de commission</span>
                  </div>
                  <p className="text-center text-xs text-slate-400 mt-2">sur chaque transaction</p>
                </div>

                <Button variant="outline" className="w-full mb-8 py-4" onClick={handleMonthlyClick}>
                  Choisir le Mensuel
                </Button>

                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Check size={18} className="text-slate-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Accès complet à la plateforme</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-slate-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Liberté d'arrêter quand vous voulez</span>
                  </li>
                </ul>
              </div>
            </Card>
          </motion.div>

          {/* Annual Plan (Low Fees - Winner) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
             <div className="absolute -top-5 inset-x-0 flex justify-center z-20">
               <span className="bg-gradient-to-r from-teal-500 to-teal-600 text-white text-sm font-bold px-6 py-2 rounded-full uppercase tracking-wider shadow-lg transform hover:scale-105 transition-transform cursor-default">
                 Choix Intelligent
               </span>
             </div>
            <Card className="border-2 border-teal-500 shadow-2xl shadow-teal-900/20 h-full relative z-10 bg-white overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full -mr-16 -mt-16 z-0" />

              <div className="p-8 relative z-10">
                <h3 className="text-2xl font-bold text-slate-900">Annuel</h3>
                <p className="text-teal-600 font-medium mt-1">Maximisez vos profits dès le jour 1.</p>

                <div className="my-8 py-6 border-y border-dashed border-slate-200">
                  <div className="flex items-baseline justify-center">
                    <span className="text-6xl font-extrabold text-slate-900">$150</span>
                    <span className="text-slate-500 ml-2">/an</span>
                  </div>
                   <p className="text-center text-sm text-slate-400 mt-1">(soit $12.50/mois)</p>

                  <div className="mt-4 flex items-center justify-center text-teal-700 bg-teal-50 py-3 px-6 rounded-full mx-auto w-fit shadow-sm border border-teal-100">
                    <TrendingUp size={20} className="mr-2" />
                    <span className="font-bold text-lg">Seulement 2.8%</span>
                  </div>
                  <p className="text-center text-xs text-slate-400 mt-2">de commission transactionnelle</p>
                </div>

                <Button variant="primary" className="w-full mb-8 py-4 text-lg shadow-lg shadow-teal-500/30">
                  Passer à l'Annuel
                </Button>

                <ul className="space-y-4">
                  {[
                    "Economisez 126$ sur l'abonnement",
                    "Gagnez ~8% de plus sur chaque projet",
                    "Badge 'Pro Partenaire' exclusif",
                    "Support Prioritaire"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <div className="bg-teal-100 rounded-full p-1 mr-3 mt-0.5">
                        <Check size={14} className="text-teal-700 flex-shrink-0" />
                      </div>
                      <span className="text-slate-800 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </motion.div>

        </div>

        {/* Trust Badge */}
        <div className="mt-16 text-center">
            <p className="text-slate-400 text-sm">Paiements sécurisés par Stripe • Annulation facile • Satisfait ou remboursé</p>
        </div>

      </div>

      {/* Smart Popup */}
      <AnimatePresence>
        {showPopup && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-40"
              onClick={() => setShowPopup(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg"
            >
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="bg-slate-900 p-6 text-center relative">
                    <button onClick={() => setShowPopup(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                        <X size={24} />
                    </button>
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-500/20 rounded-full mb-4 border border-teal-500/50">
                        <TrendingUp className="text-teal-400" size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Cet argent est à vous.</h2>
                </div>

                <div className="p-8">
                    <p className="text-slate-600 text-lg mb-6 text-center">
                        En passant au plan Annuel, vous économisez en moyenne <span className="font-bold text-slate-900">+800$ de frais</span> par an sur vos projets.
                    </p>

                    <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-8">
                        <p className="text-orange-800 text-sm font-medium">
                            <span className="font-bold">Le saviez-vous ?</span> Sur un projet à 1000$, vous payez 104$ de frais en Mensuel, contre seulement 28$ en Annuel.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                         <button
                            onClick={() => setShowPopup(false)}
                            className="px-4 py-3 rounded-xl border border-slate-200 text-slate-500 font-medium hover:bg-slate-50 transition-colors"
                        >
                            Je préfère payer plus
                        </button>
                        <Button variant="primary" className="py-3 text-base shadow-xl">
                            Passer à l'Annuel
                        </Button>
                    </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
