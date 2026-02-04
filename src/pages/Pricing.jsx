import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Zap, Shield, Bell, Users, ChevronDown, ChevronUp, Sparkles, Download, ArrowRight } from 'lucide-react';

export default function Pricing() {
  const [openFaq, setOpenFaq] = useState(null);

  const clientFeatures = [
    "Trouver un professionnel qualifié",
    "Chat direct avec les artisans",
    "Devis gratuits et sans engagement",
    "Aucune commission sur vos travaux"
  ];

  const proFeatures = [
    { icon: Zap, text: "Accès illimité aux demandes de votre zone" },
    { icon: Shield, text: "Profil vérifié avec badge de confiance" },
    { icon: Bell, text: "Notifications instantanées" },
    { icon: Users, text: "0% de commission sur vos revenus" }
  ];

  const faqs = [
    {
      question: "Puis-je annuler à tout moment ?",
      answer: "Oui, vous pouvez annuler votre abonnement à tout moment depuis votre espace personnel. Votre accès reste actif jusqu'à la fin de la période payée."
    },
    {
      question: "Comment fonctionnent les 3 connexions offertes ?",
      answer: "En vous inscrivant, vous recevez 3 connexions gratuites. Chaque connexion vous permet de répondre à une demande client. C'est l'équivalent d'un essai gratuit sans limite de temps."
    },
    {
      question: "Quels moyens de paiement acceptez-vous ?",
      answer: "Nous acceptons toutes les cartes bancaires (Visa, Mastercard, American Express) ainsi que les paiements par virement. Tous les paiements sont sécurisés par Stripe."
    },
    {
      question: "Y a-t-il vraiment 0% de commission ?",
      answer: "Absolument. Contrairement aux plateformes qui prennent 15-25% de vos revenus, ProPair fonctionne sur un abonnement fixe. Vous gardez 100% de ce que vous facturez à vos clients."
    },
    {
      question: "Comment fonctionne le parrainage ?",
      answer: "Chaque entrepreneur que vous parrainez vous offre 1 mois gratuit d'abonnement. Il n'y a pas de limite : parrainez 12 pros et votre année est entièrement gratuite !"
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-surface min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Choisissez votre{' '}
              <span className="text-gradient-teal">formule</span>
            </h1>
            <p className="text-xl text-body">
              Une offre simple et transparente pour tous.
            </p>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">

          {/* Client Card - White, subtle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl p-8 border border-border shadow-soft"
          >
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface text-body rounded-full text-sm font-medium mb-4">
                <Users size={14} />
                Pour les clients
              </div>
              <h3 className="text-2xl font-bold text-primary mb-2">Gratuit</h3>
              <p className="text-muted">Pour toujours</p>
            </div>

            <div className="mb-8">
              <div className="text-5xl font-bold text-primary mb-2">
                0$
              </div>
              <p className="text-muted">Aucun frais, jamais</p>
            </div>

            <ul className="space-y-4 mb-8">
              {clientFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check size={20} className="text-teal flex-shrink-0 mt-0.5" />
                  <span className="text-body">{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/login"
              className="block w-full py-4 px-6 text-center font-semibold text-body border-2 border-border-dark rounded-xl hover:bg-surface transition-colors"
            >
              <span className="flex items-center justify-center gap-2">
                <Download size={18} />
                Télécharger l'app
              </span>
            </Link>
          </motion.div>

          {/* Pro Card - White with teal border, prominent */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl p-8 border-2 border-teal shadow-soft-lg relative overflow-hidden"
          >
            {/* Subtle glow effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber/5 rounded-full blur-2xl pointer-events-none" />

            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal/10 text-teal rounded-full text-sm font-medium mb-4">
                    <Sparkles size={14} />
                    Pour les entrepreneurs
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-2">Abonnement Pro</h3>
                  <p className="text-muted">Accès complet à la plateforme</p>
                </div>
              </div>

              {/* Badge 3 connexions */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber/10 text-amber-dark rounded-full text-sm font-semibold mb-6 border border-amber/20">
                <Zap size={16} />
                3 connexions offertes à l'inscription
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-primary">29$</span>
                  <span className="text-muted">/mois</span>
                </div>
                <p className="text-muted mt-1">Facturation mensuelle</p>
              </div>

              <ul className="space-y-4 mb-8">
                {proFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-teal/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon size={16} className="text-teal" />
                    </div>
                    <span className="text-body pt-1">{feature.text}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/login?redirect=billing"
                className="block w-full py-4 px-6 text-center font-semibold text-white bg-amber hover:bg-amber-dark rounded-xl transition-colors shadow-lg shadow-amber/25"
              >
                <span className="flex items-center justify-center gap-2">
                  Choisir ce plan
                  <ArrowRight size={18} />
                </span>
              </Link>

              <p className="text-center text-muted text-sm mt-4">
                Annulation possible à tout moment
              </p>
            </div>
          </motion.div>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-8 mb-20 py-8 border-y border-border"
        >
          <div className="flex items-center gap-2 text-body">
            <Shield size={20} className="text-teal" />
            <span className="font-medium">Paiements sécurisés par Stripe</span>
          </div>
          <div className="flex items-center gap-2 text-body">
            <Check size={20} className="text-teal" />
            <span className="font-medium">Satisfait ou remboursé</span>
          </div>
          <div className="flex items-center gap-2 text-body">
            <Users size={20} className="text-teal" />
            <span className="font-medium">+2,500 pros actifs</span>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Questions fréquentes
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-border overflow-hidden shadow-soft"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-surface transition-colors"
                >
                  <span className="font-semibold text-primary pr-4">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp size={20} className="text-muted flex-shrink-0" />
                  ) : (
                    <ChevronDown size={20} className="text-muted flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-5"
                  >
                    <p className="text-body leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-white rounded-3xl p-12 border-2 border-teal shadow-soft-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber/5 rounded-full blur-2xl pointer-events-none" />

            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Prêt à développer votre activité ?
              </h2>
              <p className="text-body text-lg mb-8 max-w-xl mx-auto">
                Rejoignez ProPair et commencez à recevoir des demandes de clients qualifiés dans votre région.
              </p>
              <Link
                to="/login?redirect=billing"
                className="inline-flex items-center gap-2 bg-amber hover:bg-amber-dark text-white font-semibold py-4 px-8 rounded-full transition-colors shadow-lg shadow-amber/25 btn-press"
              >
                Commencer maintenant
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
