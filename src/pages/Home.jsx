import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Search, Users, ShieldCheck, Zap, Star } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-brand text-sm font-semibold mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
                </span>
                Nouvelle version 2.0 disponible
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-tight mb-6">
                Trouvez le professionnel <span className="text-brand">idéal</span> en un clic.
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Connectez-vous avec des experts vérifiés pour tous vos projets. Une plateforme simple, sécurisée et conçue pour votre tranquillité d'esprit.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="primary" className="flex items-center justify-center gap-2">
                  Commencer maintenant <ArrowRight size={20} />
                </Button>
                <Button variant="outline">
                  Voir la démo
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-4 text-sm text-slate-500">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white" />
                  ))}
                </div>
                <p>Rejoint par 10k+ utilisateurs ce mois-ci</p>
              </div>
            </motion.div>

            <motion.div
              className="lg:w-1/2 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative z-10 bg-slate-200 rounded-3xl aspect-[4/3] shadow-2xl overflow-hidden">
                {/* Placeholder image */}
                <div className="absolute inset-0 bg-slate-100 flex items-center justify-center text-slate-400">
                   <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                     <span className="text-lg font-medium">Image d'illustration</span>
                   </div>
                </div>

                {/* Floating card notification */}
                <motion.div
                  className="absolute bottom-8 left-8 bg-white p-4 rounded-xl shadow-xl flex items-center gap-4 max-w-xs"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                   <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                     <Star size={20} fill="currentColor" />
                   </div>
                   <div>
                     <p className="font-bold text-slate-900">Expert trouvé !</p>
                     <p className="text-xs text-slate-500">À moins de 5km de vous</p>
                   </div>
                </motion.div>
              </div>

              {/* Decorative background blobs */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Comment ça marche ?</h2>
            <p className="text-lg text-slate-600">ProPair simplifie chaque étape de votre recherche pour vous faire gagner du temps.</p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              { icon: Search, title: "1. Publiez", desc: "Décrivez votre projet en quelques mots. C'est gratuit et sans engagement." },
              { icon: Users, title: "2. Comparez", desc: "Recevez des devis de professionnels qualifiés et comparez leurs profils." },
              { icon: CheckCircle, title: "3. Engagez", desc: "Choisissez le meilleur expert et réalisez votre projet en toute sérénité." }
            ].map((step, idx) => (
              <Card key={idx} hoverEffect className="text-center py-10">
                <div className="w-16 h-16 mx-auto bg-teal-50 rounded-2xl flex items-center justify-center text-brand mb-6">
                  <step.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed">{step.desc}</p>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why ProPair (Bento Grid) */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Pourquoi choisir ProPair ?</h2>
            <p className="text-lg text-slate-600">Nous avons repensé l'expérience de mise en relation pour la rendre parfaite.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-6 h-auto md:h-[600px]">
            {/* Feature 1: Verification */}
            <motion.div
              className="md:col-span-2 row-span-2 bg-white rounded-3xl p-8 shadow-sm border border-slate-100 relative overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative z-10">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center text-brand mb-6">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Vérification d'identité rigoureuse</h3>
                <p className="text-slate-600 max-w-md">Chaque professionnel sur ProPair passe par un processus de vérification strict. Identité, diplômes, assurances... nous contrôlons tout pour votre sécurité.</p>

                <div className="mt-8 space-y-3">
                  {['Identité validée', 'Assurance vérifiée', 'Diplômes certifiés'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-slate-700">
                      <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center">
                        <CheckCircle size={12} className="text-white" />
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute right-0 bottom-0 w-1/2 h-full bg-gradient-to-l from-teal-50/50 to-transparent translate-x-10 translate-y-10 group-hover:translate-x-5 group-hover:translate-y-5 transition-transform duration-500"></div>
            </motion.div>

            {/* Feature 2: Speed */}
            <motion.div
              className="bg-brand text-white rounded-3xl p-8 shadow-lg shadow-teal-900/20 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative z-10">
                <Zap size={32} className="mb-4 text-teal-200" />
                <h3 className="text-xl font-bold mb-2">Rapidité éclair</h3>
                <p className="text-teal-100 text-sm">Obtenez des réponses en moins de 30 minutes en moyenne.</p>
              </div>
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            </motion.div>

            {/* Feature 3: Payment */}
            <motion.div
              className="bg-slate-900 text-white rounded-3xl p-8 shadow-lg shadow-slate-900/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
               <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-4 text-orange-500">
                 <Star size={24} />
               </div>
               <h3 className="text-xl font-bold mb-2">Paiement Sécurisé</h3>
               <p className="text-slate-400 text-sm">Vos fonds sont protégés jusqu'à la validation de la mission.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="bg-teal-700 rounded-3xl p-12 relative overflow-hidden shadow-2xl shadow-teal-900/20"
          >
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Prêt à commencer ?</h2>
              <p className="text-teal-100 text-lg mb-8 max-w-2xl mx-auto">
                Rejoignez des milliers de clients satisfaits et trouvez le professionnel qu'il vous faut dès aujourd'hui.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button className="bg-white text-teal-900 hover:bg-teal-50 shadow-none">
                  Trouver un pro
                </Button>
                <Button className="bg-teal-800 text-white hover:bg-teal-900 shadow-none border border-teal-600">
                  Devenir prestataire
                </Button>
              </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-teal-500 rounded-full mix-blend-overlay opacity-30 blur-3xl"></div>
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-teal-400 rounded-full mix-blend-overlay opacity-30 blur-3xl"></div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
