import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check, Zap, Shield, Bell, Users, Star, Info, Heart,
  MessageSquare, Briefcase, CreditCard,
  Smartphone, ArrowRight
} from 'lucide-react';
import SEO from '../components/SEO';

export default function Pricing() {
  // État pour déclencher l'effet "Insider"
  const [showInsider, setShowInsider] = useState(false);

  // Déclencheur après 5 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInsider(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const reasons = [
    {
      icon: Shield,
      title: "0% de commission",
      description: "Contrairement aux autres plateformes, ProPair ne prend aucune cote sur vos contrats. Vous payez un abonnement fixe, point final."
    },
    {
      icon: Zap,
      title: "Connexions illimitées",
      description: "Avec l'abonnement Pro, contactez autant de clients que vous voulez. Pas de limite, pas de frais cachés."
    },
    {
      icon: Bell,
      title: "Demandes en temps réel",
      description: "Soyez le premier averti quand un client cherche votre type de service dans votre région."
    },
    {
      icon: Star,
      title: "Profil vérifié",
      description: "Un badge de vérification qui inspire confiance aux clients et vous démarque de la compétition."
    },
    {
      icon: MessageSquare,
      title: "Chat intégré",
      description: "Plus besoin de donner votre numéro personnel. Communiquez via l'app de manière professionnelle et sécurisée."
    },
    {
      icon: CreditCard,
      title: "Tarif simple et fixe",
      description: "24$/mois ou 149$/an. Pas de surprise. Pas de pourcentage. Votre travail vous appartient."
    }
  ];

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
      question: "Est-ce que je peux essayer gratuitement ?",
      answer: "Oui ! Vous avez 3 connexions gratuites pour tester la plateforme avant de vous abonner. Aucune carte de crédit requise."
    },
    {
      question: "Quels types d'entrepreneurs utilisent ProPair ?",
      answer: "Plombiers, électriciens, peintres, menuisiers, paysagistes, nettoyeurs, déménageurs, massothérapeutes… Tout entrepreneur offrant un service local."
    },
    {
      question: "Comment les clients me trouvent ?",
      answer: "Les clients publient leurs besoins sur ProPair. Si votre profil correspond (métier + zone géographique), vous recevez une notification et pouvez les contacter."
    },
    {
      question: "L'offre de lancement est valable combien de temps ?",
      answer: "L'offre annuelle à 149$ est réservée aux premiers membres fondateurs de Magog. Une fois le tarif bloqué, vous le gardez à vie tant que vous restez abonné."
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen font-sans selection:bg-teal-50 selection:text-teal-700">
      <SEO
        title="Tarifs & Guide Entrepreneur"
        canonical="/pricing"
        description="Abonnement ProPair à 24$/mois ou 149$/an. 0% commission, connexions illimitées. Découvrez comment utiliser ProPair pour trouver des clients."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-100 shadow-sm text-slate-600 text-xs sm:text-sm font-medium mb-6 md:mb-8">
            <Shield size={14} className="text-teal-600" />
            <span>0% de commission, toujours</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            Investissez dans votre croissance,<br/>
            <span className="text-teal-600">pas dans des commissions.</span>
          </h1>
          <p className="text-xl text-slate-600 font-light">
            Un modèle honnête pour les entrepreneurs d'ici.
          </p>
        </div>

        {/* SECTION PRO — Votre vitrine entrepreneur */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-slate-50 rounded-[2rem] p-8 md:p-12 border border-slate-100"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center">
                <Briefcase size={24} className="text-amber-600" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Pour les Pros</h2>
                <span className="px-3 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-full uppercase tracking-wide">Premium</span>
              </div>
            </div>

            <p className="text-lg font-medium text-amber-600 mt-4 mb-6">Votre vitrine pro, toujours dans votre poche</p>

            <p className="text-slate-600 leading-relaxed mb-4">
              Fini les appels manqués et les soumissions perdues. ProPair centralise vos demandes, vos conversations et vos projets en un seul endroit. Vous recevez uniquement les mandats qui correspondent à votre métier et votre zone — et vous gardez 100% de vos revenus.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Créez votre profil en 2 minutes : ajoutez votre métier, votre zone de service et vos spécialités. Dès qu'un client publie un besoin qui vous correspond, vous êtes notifié instantanément. Utilisez le chat intégré pour échanger directement avec le client — sans intermédiaire.
            </p>
            <p className="text-slate-600 leading-relaxed mb-8">
              L'application est gratuite à télécharger sur iOS et Android. Vous avez 3 connexions offertes pour tester avant de vous abonner. Aucune carte de crédit requise pour commencer.
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-slate-100">
                <div className="p-1.5 bg-amber-100 rounded-full mt-0.5"><Bell size={16} className="text-amber-700" /></div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">Notifications ciblées</p>
                  <p className="text-slate-500 text-xs mt-1">Zéro bruit — uniquement les demandes dans votre zone et votre métier.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-slate-100">
                <div className="p-1.5 bg-amber-100 rounded-full mt-0.5"><Shield size={16} className="text-amber-700" /></div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">0% commission</p>
                  <p className="text-slate-500 text-xs mt-1">Abonnement fixe. Tout ce que vous facturez est à vous, point final.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-slate-100">
                <div className="p-1.5 bg-amber-100 rounded-full mt-0.5"><MessageSquare size={16} className="text-amber-700" /></div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">Chat & gestion intégrés</p>
                  <p className="text-slate-500 text-xs mt-1">Communiquez, suivez vos projets et gérez vos clients dans l'app.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* POURQUOI PROPAIR (6 raisons) */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Pourquoi choisir ProPair</h2>
            <p className="text-slate-500">Un abonnement fixe, des outils concrets, zéro surprise.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="bg-slate-50 rounded-2xl border border-slate-100 p-6 hover:border-teal-100 transition-colors"
              >
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-4 border border-slate-100">
                  <reason.icon size={20} className="text-teal-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{reason.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PRICING GRID (Cote à Cote) */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto items-center mb-24">

          {/* CARTE GAUCHE : ANNUEL (La Star) */}
          <motion.div
            animate={{
              scale: showInsider ? 1.02 : 1,
              borderColor: showInsider ? '#0d9488' : '#e2e8f0',
              boxShadow: showInsider ? '0 25px 50px -12px rgba(13, 148, 136, 0.15)' : '0 0 0 0 rgba(0,0,0,0)'
            }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-[2rem] p-5 sm:p-8 md:p-10 border-2 relative overflow-hidden h-full flex flex-col justify-between"
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
                  <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900">149$</span>
                  <span className="text-sm text-slate-500">/an + tx</span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm">
                  <span className="text-slate-500 line-through decoration-red-400">200$</span>
                  <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded">-25% de rabais</span>
                </div>
              </div>

              <div className="space-y-4 mb-8 pt-8 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tout inclus :</p>
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
              className="block w-full py-4 px-6 text-center font-bold text-white bg-slate-900 hover:bg-black rounded-xl transition-all shadow-lg shadow-slate-900/10 hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Choisir l'annuel
            </Link>

            <p className="text-center text-xs text-slate-500 mt-4">
              3 connexions gratuites offertes pour tester avant de payer.
            </p>
          </motion.div>

          {/* CARTE DROITE : MENSUEL + Overlay Insider */}
          <div className="relative h-full flex flex-col">
            <div className="bg-white rounded-[2rem] p-5 sm:p-8 border border-slate-200 flex-1 relative z-10 overflow-hidden">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Mensuel</h3>
              <p className="text-slate-500 mb-6">Liberté totale, sans engagement.</p>

              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-bold text-slate-900">24$</span>
                <span className="text-sm text-slate-500">/mois + tx</span>
              </div>

              <Link
                to="/login?plan=monthly"
                className="block w-full py-3 px-6 text-center font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all mb-8 active:scale-[0.98]"
              >
                Choisir le mensuel
              </Link>

              <div className="space-y-3 opacity-70">
                <p className="text-xs font-bold text-slate-500 uppercase">Inclus :</p>
                {proFeatures.slice(0, 3).map((f, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-slate-600">
                    <Check size={14} className="text-slate-500" /> {f.text}
                  </div>
                ))}
              </div>

              {/* Overlay Insider - apparaît après 5s SUR la carte */}
              <AnimatePresence>
                {showInsider && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    role="dialog"
                    aria-label="Information sur les frais"
                    className="absolute inset-0 z-20 bg-white/80 backdrop-blur-sm rounded-[2rem] flex items-center justify-center p-4 sm:p-8"
                  >
                    <div className="text-center max-w-xs">
                      <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Info size={22} className="text-amber-600" />
                      </div>
                      <p className="font-bold text-slate-900 text-lg mb-2">Le saviez-vous ?</p>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">
                        Les frais Stripe coûtent <span className="text-red-500 font-bold">10.47%</span> au mensuel contre <span className="text-green-600 font-bold">2.8%</span> à l'annuel.
                      </p>
                      <p className="text-slate-500 text-xs mb-5">
                        L'annuel nous permet de réinvestir dans l'app au lieu de payer les banques.
                      </p>
                      <Link
                        to="/login?plan=annual"
                        className="inline-block px-6 py-2.5 bg-slate-900 hover:bg-black text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-slate-900/10 active:scale-[0.98]"
                      >
                        Passer à l'annuel
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* CTA DARK - Prêt à développer votre clientèle ? */}
        <section className="mb-24">
          <div className="max-w-3xl mx-auto bg-slate-900 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
            <div className="relative z-10">
              <Smartphone size={40} className="text-teal-400 mx-auto mb-6" />
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Prêt à développer votre clientèle ?
              </h3>
              <p className="text-slate-300 mb-8 max-w-lg mx-auto">
                Téléchargez ProPair, créez votre profil en 2 minutes et commencez à recevoir des demandes de clients près de chez vous.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/login?mode=signup"
                  className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 font-bold py-3.5 px-8 rounded-xl hover:bg-slate-100 transition-all active:scale-[0.98]"
                >
                  Créer mon compte
                  <ArrowRight size={18} />
                </Link>
                <a
                  href="#faq"
                  className="inline-flex items-center justify-center gap-2 border border-slate-600 text-slate-300 font-bold py-3.5 px-8 rounded-xl hover:border-slate-400 hover:text-white transition-all active:scale-[0.98]"
                >
                  Voir la FAQ
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST / GARANTIE */}
        <div className="text-center border-t border-slate-100 pt-16 mb-24">
          <div className="inline-flex flex-col items-center">
            <Heart size={32} className="text-amber-400 fill-amber-400 mb-4" />
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
                <div className="px-6 pt-5 pb-3">
                  <span className="font-semibold text-slate-900">{faq.question}</span>
                </div>
                <div className="px-6 pb-5">
                  <p className="text-slate-500 leading-relaxed text-sm">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}