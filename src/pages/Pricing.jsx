import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function Pricing() {
  const [isPro, setIsPro] = useState(false);

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Tarifs simples et transparents</h1>
            <p className="text-xl text-slate-600 mb-8">
              Que vous soyez un particulier ou un professionnel, nous avons l'offre adaptée à vos besoins.
            </p>

            {/* Toggle Switch */}
            <div className="flex items-center justify-center space-x-4">
              <span className={`text-lg font-medium transition-colors ${!isPro ? 'text-slate-900' : 'text-slate-500'}`}>
                Je suis un Client
              </span>
              <button
                onClick={() => setIsPro(!isPro)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 ${isPro ? 'bg-brand' : 'bg-slate-300'}`}
              >
                <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition shadow-sm ${isPro ? 'translate-x-7' : 'translate-x-1'}`} />
              </button>
              <span className={`text-lg font-medium transition-colors ${isPro ? 'text-slate-900' : 'text-slate-500'}`}>
                Je suis un Pro
              </span>
            </div>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

          {/* Free Plan (Client) or Basic Pro */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border border-slate-100 h-full">
              <div className="p-2">
                <h3 className="text-xl font-bold text-slate-900">{isPro ? "Débutant" : "Basique"}</h3>
                <p className="text-slate-500 text-sm mt-1">{isPro ? "Pour démarrer votre activité" : "Pour les petits travaux"}</p>
                <div className="my-6">
                  <span className="text-4xl font-bold text-slate-900">Gratuit</span>
                </div>
                <Button variant="outline" className="w-full mb-8">Commencer</Button>
                <ul className="space-y-4">
                  {[
                    "Accès à la plateforme",
                    "Recherche illimitée",
                    "Messagerie sécurisée",
                    isPro ? "3 devis / mois" : "Demandes illimitées",
                    isPro ? "Profil basique" : "Support par email"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check size={18} className="text-brand mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-600 text-sm">{feature}</span>
                    </li>
                  ))}
                  <li className="flex items-start text-slate-400">
                     <X size={18} className="mr-3 mt-0.5 flex-shrink-0" />
                     <span className="text-sm decoration-slate-400">Badge vérifié</span>
                  </li>
                </ul>
              </div>
            </Card>
          </motion.div>

          {/* Pro Plan (Highlighted) */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
             <div className="absolute -top-4 inset-x-0 flex justify-center">
               <span className="bg-brand text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                 Recommandé
               </span>
             </div>
            <Card className="border-2 border-brand shadow-2xl shadow-teal-900/10 h-full relative z-10 transform md:-translate-y-4">
              <div className="p-2">
                <h3 className="text-xl font-bold text-slate-900">{isPro ? "Professionnel" : "Premium"}</h3>
                <p className="text-teal-600 text-sm mt-1">{isPro ? "Développez votre clientèle" : "Pour les projets complexes"}</p>
                <div className="my-6 flex items-baseline">
                  <span className="text-5xl font-bold text-slate-900">{isPro ? "29€" : "9€"}</span>
                  <span className="text-slate-500 ml-2">/mois</span>
                </div>
                <Button variant="primary" className="w-full mb-8">Choisir ce plan</Button>
                <ul className="space-y-4">
                  {[
                    "Toutes les options gratuites",
                    "Badge 'Vérifié' exclusif",
                    "Support prioritaire 24/7",
                    isPro ? "Devis illimités" : "Suivi de projet dédié",
                    isPro ? "Mise en avant du profil" : "Garantie satisfaction étendue",
                    isPro ? "Commission réduite (5%)" : "Accès aux pros 'Elite'"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check size={18} className="text-brand mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-800 text-sm font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </motion.div>

          {/* Enterprise Plan */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border border-slate-100 h-full">
              <div className="p-2">
                <h3 className="text-xl font-bold text-slate-900">{isPro ? "Entreprise" : "Grands Comptes"}</h3>
                <p className="text-slate-500 text-sm mt-1">{isPro ? "Pour les grandes structures" : "Gestion multisites"}</p>
                <div className="my-6">
                  <span className="text-4xl font-bold text-slate-900">Sur devis</span>
                </div>
                <Button variant="ghost" className="w-full mb-8 border border-slate-200">Contacter l'équipe</Button>
                <ul className="space-y-4">
                  {[
                    "Accès multi-utilisateurs",
                    "API dédiée",
                    "Account Manager dédié",
                    "Facturation centralisée",
                    "Reporting avancé",
                    "Formation des équipes"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check size={18} className="text-brand mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </motion.div>

        </div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Questions fréquentes</h2>
          <div className="space-y-4">
             {[
               { q: "Puis-je annuler à tout moment ?", a: "Oui, tous nos abonnements sont sans engagement. Vous pouvez annuler en un clic depuis votre espace client." },
               { q: "Comment fonctionne la vérification ?", a: "Nous demandons une pièce d'identité et un Kbis pour les professionnels. Le processus prend généralement moins de 24h." },
               { q: "Les paiements sont-ils sécurisés ?", a: "Absolument. Nous utilisons Stripe pour traiter toutes les transactions avec un niveau de sécurité bancaire." }
             ].map((item, i) => (
               <Card key={i} className="p-6">
                 <h3 className="font-bold text-slate-900 mb-2">{item.q}</h3>
                 <p className="text-slate-600 text-sm">{item.a}</p>
               </Card>
             ))}
          </div>
        </div>

      </div>
    </div>
  );
}
