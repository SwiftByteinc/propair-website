import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Smartphone,
  Briefcase,
  Check,
  Star,
  MessageSquare,
  Layout,
  Clock,
  Search,
  Users
} from 'lucide-react';
import SEO from '../components/SEO';

export default function Home() {
  return (
    <div className="w-full overflow-hidden bg-white font-sans selection:bg-teal-50 selection:text-teal-700">
      <SEO
        canonical="/"
        description="ProPair connecte clients et entrepreneurs de la construction au Québec. 0% commission, plateforme locale. Trouvez le bon pro pour vos rénovations."
      />
      
      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Fond très léger */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-teal-50/50 via-white to-white" />

        {/* Padding ajusté : pt-28 sur mobile, pt-32 sur desktop */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 md:pt-32 md:pb-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-100 shadow-sm text-slate-600 text-xs sm:text-sm font-medium mb-6 md:mb-8">
              <Star size={14} className="fill-amber-400 text-amber-400" />
              <span>La référence locale à Magog</span>
            </div>

            {/* Titre responsive : text-4xl mobile -> text-7xl desktop */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.1] mb-6 md:mb-8 tracking-tight">
              Connectez.{' '}
              <span className="text-teal-600 relative inline-block">
                Collaborez.
                {/* Soulignement SVG adaptatif */}
                <svg className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-2 md:h-3 text-amber-400 opacity-80" viewBox="0 0 300 12" fill="none"><path d="M2 9.5C55.5 3.5 168.5 -1.5 298 9.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/></svg>
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-slate-600 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed font-light px-2">
              La plateforme qui remplace les appels interminables par des outils de gestion simples et une mise en relation directe.
            </p>

            {/* Boutons empilés sur mobile (w-full), ligne sur desktop */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-12 md:mb-16 px-4 sm:px-0">
              <a
                href="#telecharger"
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-teal-200 hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto active:scale-95 duration-200"
              >
                <Smartphone size={20} />
                Télécharger l'app
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                to="/pricing"
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-white text-slate-700 border border-slate-200 font-bold rounded-2xl transition-all shadow-sm hover:shadow-md hover:border-teal-200 hover:text-teal-700 w-full sm:w-auto active:scale-95 duration-200"
              >
                <Briefcase size={20} />
                Espace Pro
              </Link>
            </div>

            {/* Badges : Grid sur mobile pour alignement propre */}
            <div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-3 sm:gap-6 justify-center text-sm font-medium text-slate-500 px-8 sm:px-0">
              <div className="flex items-center justify-center gap-2">
                <Check size={18} className="text-teal-600" /> 0% de commission
              </div>
              <div className="flex items-center justify-center gap-2">
                <Check size={18} className="text-teal-600" /> Outils de gestion inclus
              </div>
              <div className="flex items-center justify-center gap-2">
                <Check size={18} className="text-teal-600" /> Chat intégré
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================ */}
      {/* POURQUOI PROPAIR - Offre de valeur */}
      {/* ============================================ */}
      <section className="py-20 md:py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 md:mb-6">
              Pensé pour les deux côtés du chantier
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-light">
              Que vous cherchiez un expert ou des contrats, tout est simplifié.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
            
            {/* Carte CLIENTS */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-[2rem] p-6 md:p-10 shadow-xl shadow-slate-200/50 border border-white hover:border-teal-100 transition-all"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 bg-teal-50 rounded-2xl flex items-center justify-center mb-6 md:mb-8">
                <Users size={28} className="text-teal-600 md:w-8 md:h-8" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">Pour les Clients</h3>
              <p className="text-base md:text-lg font-medium text-teal-600 mb-4 md:mb-6">Liberté totale de contact</p>
              
              <p className="text-slate-600 mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
                Vous avez le choix : publiez une demande détaillée pour recevoir des offres ciblées, ou contactez directement l'entrepreneur de votre choix via l'application.
              </p>

              <ul className="space-y-3 md:space-y-4">
                <li className="flex items-start gap-3">
                  <div className="p-1 bg-teal-50 rounded-full mt-0.5"><MessageSquare size={14} className="text-teal-600" /></div>
                  <span className="text-slate-700 text-sm md:text-base">Chat direct avec les artisans</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-1 bg-teal-50 rounded-full mt-0.5"><Layout size={14} className="text-teal-600" /></div>
                  <span className="text-slate-700 text-sm md:text-base">Suivi de projet centralisé</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-1 bg-teal-50 rounded-full mt-0.5"><Check size={14} className="text-teal-600" /></div>
                  <span className="text-slate-700 text-sm md:text-base">Accès aux profils complets</span>
                </li>
              </ul>
            </motion.div>

            {/* Carte PROS */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-[2rem] p-6 md:p-10 shadow-xl shadow-slate-200/50 border border-amber-100/50 relative overflow-hidden hover:border-amber-200 transition-all"
            >
              <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-amber-50 rounded-bl-[80px] md:rounded-bl-[100px] -z-10" />
              
              <div className="w-14 h-14 md:w-16 md:h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-6 md:mb-8">
                <Layout size={28} className="text-amber-600 md:w-8 md:h-8" />
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900">Pour les Pros</h3>
                <span className="px-3 py-1 bg-amber-100 text-amber-800 text-[10px] md:text-xs font-bold rounded-full uppercase tracking-wide">Premium</span>
              </div>
              
              <p className="text-base md:text-lg font-medium text-amber-600 mb-4 md:mb-6">Moins de téléphone, meilleur service</p>
              
              <p className="text-slate-600 mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
                Diminuez votre temps au téléphone tout en améliorant votre service client. Recevez uniquement les demandes qui vous correspondent vraiment.
              </p>

              <ul className="space-y-3 md:space-y-4">
                <li className="flex items-start gap-3">
                  <div className="p-1 bg-amber-100 rounded-full mt-0.5"><Clock size={14} className="text-amber-700" /></div>
                  <span className="text-slate-700 text-sm md:text-base">Gain de temps massif sur la gestion</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-1 bg-amber-100 rounded-full mt-0.5"><Check size={14} className="text-amber-700" /></div>
                  <span className="text-slate-700 text-sm md:text-base">Leads qualifiés dans votre dashboard</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-1 bg-amber-100 rounded-full mt-0.5"><Layout size={14} className="text-amber-700" /></div>
                  <span className="text-slate-700 text-sm md:text-base">Outils de gestion partagés</span>
                </li>
              </ul>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* COMMENT ÇA MARCHE - Processus */}
      {/* ============================================ */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 md:mb-6">
              De la demande au chantier
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
              Un processus transparent et efficace.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 md:gap-8 max-w-5xl mx-auto">
            
            {/* Étape 1 */}
            <div className="text-center relative">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-teal-50 rounded-3xl flex items-center justify-center mx-auto mb-4 md:mb-6 rotate-3 border border-teal-100">
                <Search size={28} className="text-teal-600 md:w-8 md:h-8" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 md:mb-3">1. Contactez ou Publiez</h3>
              <p className="text-slate-600 text-sm leading-relaxed px-2 md:px-4">
                Trouvez un pro et contactez-le directement, OU faites une demande. Elle sera relayée <strong>uniquement aux pros correspondants</strong>.
              </p>
            </div>

            {/* Étape 2 */}
            <div className="text-center relative">
               {/* Arrow desktop only */}
               <div className="hidden md:block absolute top-10 -left-1/2 w-full h-px border-t-2 border-dashed border-slate-100 -z-10" />
               
              <div className="w-16 h-16 md:w-20 md:h-20 bg-amber-50 rounded-3xl flex items-center justify-center mx-auto mb-4 md:mb-6 -rotate-3 border border-amber-100">
                <MessageSquare size={28} className="text-amber-600 md:w-8 md:h-8" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 md:mb-3">2. Discussion & Entente</h3>
              <p className="text-slate-600 text-sm leading-relaxed px-2 md:px-4">
                Discutez détails, envoyez des photos et fixez le prix via le chat sécurisé. Tout reste tracé pour éviter les malentendus.
              </p>
            </div>

            {/* Étape 3 */}
            <div className="text-center relative">
               {/* Arrow desktop only */}
               <div className="hidden md:block absolute top-10 -left-1/2 w-full h-px border-t-2 border-dashed border-slate-100 -z-10" />

              <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-4 md:mb-6 rotate-3 border border-slate-100">
                <Layout size={28} className="text-slate-700 md:w-8 md:h-8" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 md:mb-3">3. Gestion Simplifiée</h3>
              <p className="text-slate-600 text-sm leading-relaxed px-2 md:px-4">
                Utilisez nos outils de gestion de projet intégrés pour suivre les travaux. Une expérience fluide pour tous.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TÉLÉCHARGER - Version Clean (Optimisée Mobile) */}
      {/* ============================================ */}
      <section id="telecharger" className="py-20 md:py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-white rounded-[24px] md:rounded-[32px] p-8 md:p-12 border border-slate-200 shadow-xl overflow-hidden"
          >
            {/* Dégradés décoratifs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl opacity-50" />

            <div className="relative z-10 grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Gauche: Icone & Info */}
              <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-8">
                <div className="relative group">
                  <img
                    src="/apple-touch-icon.png"
                    alt="ProPair App"
                    className="w-24 h-24 md:w-32 md:h-32 rounded-[22px] md:rounded-[28px] shadow-2xl border-4 border-white flex-shrink-0 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 rounded-[28px] bg-slate-200 blur-xl -z-10 opacity-50" />
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-2 md:mb-3">
                    Téléchargez ProPair
                  </h2>
                  <p className="text-slate-600 mb-2 font-medium text-sm md:text-base">
                    L'essentiel de votre activité dans votre poche.
                  </p>
                  <p className="text-xs md:text-sm text-slate-400">
                    Disponible gratuitement sur iOS et Android.
                  </p>
                </div>
              </div>

              {/* Droite: Boutons Stores (Stackés sur mobile) */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-end w-full sm:w-auto">
                <a
                  href="https://apps.apple.com/app/propair"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 px-6 py-3 md:py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto active:scale-95 duration-200"
                >
                  <svg className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-[9px] md:text-[10px] uppercase text-white/60 font-bold tracking-wider">Télécharger sur</div>
                    <div className="text-base md:text-lg font-bold -mt-1 font-sans">App Store</div>
                  </div>
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.propair"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 px-6 py-3 md:py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto active:scale-95 duration-200"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-[9px] md:text-[10px] uppercase text-white/60 font-bold tracking-wider">Disponible sur</div>
                    <div className="text-base md:text-lg font-bold -mt-1 font-sans">Google Play</div>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}