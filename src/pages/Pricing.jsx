import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Zap, Shield, Bell, Users, Star, ArrowRight, Info, Server, Heart } from 'lucide-react';
import SEO from '../components/SEO';

export default function Pricing() {
  // État pour déclencher l'effet "Insider"
  const [showInsider, setShowInsider] = useState(false);

  // Déclencheur après 5 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInsider(true);
    }, 5000); // 5000ms = 5 secondes

    return () => clearTimeout(timer);
  }, []);

  const proFeatures = [
    { icon: Zap, text: "Accès illimité aux demandes" },
    { icon: Shield, text: "Profil vérifié & Badge" },
    { icon: Bell, text: "Notifications instantanées" },
    { icon: Users, text: "0% de commission (garanti)" },
    { icon: Star, text: "Outils de gestion inclus" }
  ];

  const faqs = [
    {
      question: "Puis-je annuler à tout moment ?",
      answer: "Oui, absolument. Vous pouvez annuler votre abonnement en un clic depuis votre espace. Votre accès reste actif jusqu'à la fin de la période payée."
    },
    {
      question: "Y a-t-il vraiment 0% de commission ?",
      answer: "Oui. C'est notre promesse. Vous payez votre abonnement fixe, et tout ce que vous facturez à vos clients vous appartient à 100%."
    },
    {
      question: "L'offre de lancement est valable combien de temps ?",
      answer: "L'offre annuelle à 149$ est réservée aux premiers membres fondateurs de Magog. Une fois le tarif bloqué, vous le gardez à vie tant que vous restez abonné."
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen font-sans selection:bg-teal-50 selection:text-teal-700">
      <SEO
        title="Tarifs"
        canonical="/pricing"
        description="Abonnement ProPair à 24$/mois ou 149$/an. 0% commission, connexions illimitées. Investissez dans votre croissance, pas dans des commissions."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            Investissez dans votre croissance,<br/>
            <span className="text-teal-600">pas dans des commissions.</span>
          </h1>
          <p className="text-xl text-slate-600 font-light">
            Un modèle honnête pour les entrepreneurs d'ici.
          </p>
        </div>

        {/* PRICING GRID (Cote à Cote) */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto items-center mb-24">

          {/* ============================================== */}
          {/* CARTE GAUCHE : MENSUEL (Celle qui change) */}
          {/* ============================================== */}
          <div className="relative h-full min-h-[500px]">
            <AnimatePresence mode="wait">
              
              {/* ÉTAT 1 : La carte Mensuelle Normale */}
              {!showInsider ? (
                <motion.div
                  key="monthly-card"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, filter: "blur(10px)" }}
                  transition={{ duration: 0.8 }}
                  className="bg-white rounded-[2rem] p-8 border border-slate-200 h-full relative z-10"
                >
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Mensuel</h3>
                  <p className="text-slate-500 mb-6">Liberté totale, sans engagement.</p>
                  
                  <div className="mb-8 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-slate-900">24$</span>
                    <span className="text-sm text-slate-500">/mois + tx</span>
                  </div>

                  <Link
                    to="/login?plan=monthly"
                    className="block w-full py-3 px-6 text-center font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all mb-8"
                  >
                    Choisir le mensuel
                  </Link>

                  <div className="space-y-3 opacity-70">
                    <p className="text-xs font-bold text-slate-400 uppercase">Inclus :</p>
                    {proFeatures.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-slate-600">
                        <Check size={14} className="text-slate-400" /> {f.text}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                
                /* ÉTAT 2 : Le Message "Insider / Transparence" */
                <motion.div
                  key="insider-msg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="h-full flex flex-col justify-center p-8 rounded-[2rem] border border-dashed border-slate-200 bg-slate-50/50 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-2 text-amber-600 mb-4 font-bold text-sm uppercase tracking-wide">
                    <Info size={16} />
                    Transparence ProPair
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    Pourquoi on préfère l'annuel ?
                  </h3>
                  
                  <div className="space-y-6 text-slate-600 text-sm leading-relaxed">
                    <p>
                      En tant qu'entreprise locale, chaque dollar compte pour améliorer l'application.
                    </p>
                    
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-slate-900">Frais bancaires (Stripe)</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-red-500 font-bold">10.47%</span> sur le mensuel
                        <ArrowRight size={12} className="text-slate-400"/>
                        <span className="text-green-600 font-bold">2.8%</span> sur l'annuel
                      </div>
                    </div>

                    <div className="flex gap-3 items-start">
                      <Server size={18} className="text-teal-600 mt-1 flex-shrink-0" />
                      <p>L'argent économisé est réinvesti directement dans le développement et les serveurs, pas dans les banques.</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => setShowInsider(false)}
                    className="mt-8 text-xs text-slate-400 underline hover:text-slate-600 text-left"
                  >
                    Je préfère quand même payer mensuellement
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ============================================== */}
          {/* CARTE DROITE : ANNUEL (La Star) */}
          {/* ============================================== */}
          <motion.div
            animate={{ 
              scale: showInsider ? 1.05 : 1,
              borderColor: showInsider ? '#0d9488' : '#e2e8f0', // teal-600 vs slate-200
              boxShadow: showInsider ? '0 25px 50px -12px rgba(13, 148, 136, 0.15)' : '0 0 0 0 rgba(0,0,0,0)'
            }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-[2rem] p-8 md:p-10 border-2 relative overflow-hidden h-full flex flex-col justify-between"
          >
            {/* Ruban Promo */}
            <div className="absolute top-6 right-6">
              <span className="bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm uppercase tracking-wide flex items-center gap-1">
                <Star size={12} className="fill-white" /> Offre Lancement
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Annuel</h3>
              <p className="text-teal-600 font-medium mb-6">Le choix intelligent.</p>

              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl md:text-6xl font-bold text-slate-900">149$</span>
                  <span className="text-sm text-slate-500">/an + tx</span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm">
                  <span className="text-slate-400 line-through decoration-red-400">288$</span>
                  <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded">-48% de rabais</span>
                </div>
              </div>

              <div className="space-y-4 mb-8 pt-8 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tout inclus :</p>
                {proFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-teal-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={14} className="text-teal-600" />
                    </div>
                    <span className="text-slate-600 text-sm font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              to="/login?plan=annual"
              className="block w-full py-4 px-6 text-center font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Choisir l'annuel
            </Link>
            
            <p className="text-center text-xs text-slate-400 mt-4">
              3 connexions gratuites offertes pour tester avant de payer.
            </p>
          </motion.div>

        </div>

        {/* TRUST / GARANTIE */}
        <div className="text-center border-t border-slate-100 pt-16 mb-24">
          <div className="inline-flex flex-col items-center">
            <Heart size={32} className="text-amber-400 fill-amber-400 mb-4 animate-pulse" />
            <h3 className="text-lg font-bold text-slate-900">Soutenez l'économie locale</h3>
            <p className="text-slate-500 max-w-lg mx-auto mt-2">
              En choisissant ProPair, vous encouragez une entreprise de Magog qui se bat pour que les artisans gardent leurs profits.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div id="faq" className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Questions fréquentes
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden hover:border-teal-100 transition-colors"
              >
                <div className="w-full px-6 py-5 flex items-start justify-between text-left">
                  <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                </div>
                <div className="px-6 pb-5 pt-0">
                  <p className="text-slate-600 leading-relaxed text-sm">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}