import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Smartphone, CreditCard, Bell, MessageCircle, Star, MapPin, Navigation } from 'lucide-react';
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
              <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-tight mb-6">
                Toute la gestion de vos services, <span className="text-brand">dans votre poche.</span>
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                ProPair est l'application qui connecte clients et professionnels en temps réel. Chat intégré, suivi GPS, et paiements sécurisés.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="secondary" className="flex items-center justify-center gap-3 px-8 py-4 h-16 !bg-slate-900 !text-white hover:!bg-slate-800">
                  <Smartphone size={24} />
                  <div className="text-left">
                    <div className="text-[10px] uppercase leading-none opacity-80">Download on the</div>
                    <div className="text-lg font-bold leading-none">App Store</div>
                  </div>
                </Button>
                <Button variant="secondary" className="flex items-center justify-center gap-3 px-8 py-4 h-16 !bg-slate-900 !text-white hover:!bg-slate-800">
                  <div className="text-left">
                    <div className="text-[10px] uppercase leading-none opacity-80">Get it on</div>
                    <div className="text-lg font-bold leading-none">Google Play</div>
                  </div>
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="lg:w-1/2 flex justify-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Stylized iPhone */}
              <div className="relative w-[300px] h-[600px] bg-slate-900 rounded-[50px] shadow-2xl border-[8px] border-slate-800 overflow-hidden ring-4 ring-slate-200/50">
                 {/* Notch */}
                 <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-20"></div>

                 {/* Screen Content - MAP UI */}
                 <div className="w-full h-full bg-slate-100 relative overflow-hidden flex flex-col">

                    {/* Map Background Roads */}
                    <div className="absolute inset-0 z-0">
                        {/* Vertical Roads */}
                        <div className="absolute left-[20%] h-full w-4 bg-white/70"></div>
                        <div className="absolute left-[60%] h-full w-6 bg-white/70"></div>
                        <div className="absolute right-[10%] h-full w-3 bg-white/70"></div>

                        {/* Horizontal Roads */}
                        <div className="absolute top-[30%] w-full h-5 bg-white/70"></div>
                        <div className="absolute top-[70%] w-full h-4 bg-white/70"></div>

                        {/* Diagonal/Rotated */}
                        <div className="absolute top-[40%] left-[-10%] w-[120%] h-4 bg-white/70 rotate-12 origin-left"></div>
                    </div>

                    {/* Pins */}
                    <div className="absolute top-[35%] left-[25%] z-10 text-teal-500 drop-shadow-md animate-bounce" style={{ animationDuration: '2s' }}>
                        <MapPin size={32} fill="currentColor" />
                    </div>
                    <div className="absolute top-[60%] right-[20%] z-10 text-teal-500 drop-shadow-md animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>
                        <MapPin size={32} fill="currentColor" />
                    </div>
                     <div className="absolute top-[15%] right-[30%] z-10 text-slate-400 drop-shadow-md">
                        <MapPin size={24} fill="currentColor" />
                    </div>

                    {/* Top Search Bar Simulation */}
                     <div className="absolute top-12 left-4 right-4 bg-white rounded-full shadow-md p-3 flex items-center gap-2 z-20">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                             <Navigation size={14} />
                        </div>
                        <div className="h-2 w-24 bg-slate-200 rounded"></div>
                     </div>

                    {/* Pro Card (Bottom) */}
                    <div className="absolute bottom-4 left-4 right-4 bg-white rounded-2xl shadow-xl p-4 z-20">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden relative border-2 border-white shadow-sm">
                                {/* Simple Avatar Placeholder */}
                                <div className="absolute inset-0 bg-slate-300 flex items-center justify-center text-slate-500 text-xs font-bold">TP</div>
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-slate-900 text-sm">Thomas Plomberie</h4>
                                <div className="flex items-center gap-1">
                                    <Star size={12} className="text-yellow-400 fill-current" />
                                    <span className="text-xs text-slate-600 font-medium">4.9 (124 avis)</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 flex gap-2">
                             <Button size="sm" className="w-full text-xs py-2 h-auto">Contacter</Button>
                        </div>
                    </div>

                 </div>

                 {/* Reflection */}
                 <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none z-10"></div>
              </div>

              {/* Decorative blobs */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-100/50 rounded-full blur-3xl -z-10 animate-pulse"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features App */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              { icon: Bell, title: "Notifications instantanées", desc: "Soyez alerté dès qu'une opportunité se présente ou qu'un pro vous répond." },
              { icon: CreditCard, title: "Paiement en un clic", desc: "Réglez vos prestations de manière sécurisée directement depuis l'application." },
              { icon: MessageCircle, title: "Messagerie sécurisée", desc: "Échangez des photos et des messages sans divulguer votre numéro personnel." }
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

      {/* Final CTA */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="bg-teal-700 rounded-3xl p-12 relative overflow-hidden shadow-2xl shadow-teal-900/20"
          >
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ne perdez plus de temps au téléphone.</h2>
              <p className="text-teal-100 text-lg mb-8 max-w-2xl mx-auto">
                Téléchargez ProPair et gérez vos projets ou votre activité en toute simplicité.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                 <Button className="bg-white text-slate-900 hover:bg-slate-100 shadow-none px-8">
                  Téléchargez ProPair
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
