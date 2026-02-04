import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Smartphone,
  Shield,
  Users,
  Briefcase,
  Check,
  Star,
  MessageCircle,
  TrendingUp
} from 'lucide-react';

export default function Home() {
  return (
    <div className="w-full overflow-hidden bg-white">
      {/* ============================================ */}
      {/* HERO SECTION - Fresh & Minimal */}
      {/* ============================================ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Gradient background - soft teal/amber wash */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal/5 via-white to-amber/5" />

        {/* Floating decorative shapes */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-teal/20 to-teal/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-tr from-amber/15 to-amber/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-teal/5 to-transparent rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Main headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-primary leading-[1.1] mb-6 tracking-tight">
                Connectez.
                <br />
                <span className="bg-gradient-to-r from-teal to-teal-dark bg-clip-text text-transparent">Collaborez.</span>
              </h1>

              <p className="text-xl sm:text-2xl text-body mb-10 max-w-xl leading-relaxed">
                La mise en relation directe entre clients et entrepreneurs.{' '}
                <span className="text-teal font-semibold">0% de commission</span> sur vos travaux.
              </p>

              {/* CTA Button - Teal gradient */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#telecharger"
                  className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-teal to-teal-dark hover:from-teal-dark hover:to-teal text-white font-bold rounded-2xl transition-all shadow-lg shadow-teal/30 hover:shadow-xl hover:shadow-teal/40 hover:-translate-y-0.5"
                >
                  <Smartphone size={20} />
                  Télécharger l'application
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Trust badges */}
              <div className="mt-12 flex flex-wrap gap-6 text-sm text-muted">
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-teal/10">
                  <Check size={18} className="text-teal" />
                  <span>100% gratuit pour les clients</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-teal/10">
                  <Shield size={18} className="text-teal" />
                  <span>Artisans vérifiés</span>
                </div>
              </div>
            </motion.div>

            {/* Right: Phone mockup */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* Phone frame with gradient border */}
                <div className="relative w-72 h-[580px] bg-white rounded-[50px] border-2 border-teal/20 shadow-2xl shadow-teal/10 overflow-hidden">
                  {/* Notch - Teal gradient instead of black */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gradient-to-r from-teal to-teal-dark rounded-b-2xl z-10" />

                  {/* Screen content */}
                  <div className="w-full h-full bg-gradient-to-b from-surface to-white p-5 pt-12">
                    {/* App header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-gradient-to-br from-teal to-teal-dark rounded-xl flex items-center justify-center shadow-lg shadow-teal/30">
                          <span className="text-white text-lg font-bold">P</span>
                        </div>
                        <div>
                          <div className="text-primary font-bold">ProPair</div>
                          <div className="text-muted text-xs">3 demandes à traiter</div>
                        </div>
                      </div>
                      <div className="w-9 h-9 bg-gradient-to-br from-amber/20 to-amber/10 rounded-full border border-amber/20 flex items-center justify-center">
                        <div className="w-6 h-6 bg-gradient-to-br from-teal to-teal-dark rounded-full" />
                      </div>
                    </div>

                    {/* Mock project cards */}
                    <div className="space-y-3">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        className="bg-white rounded-2xl p-4 shadow-lg shadow-teal/5 border border-teal/10"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-teal/20 to-teal/10 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Users size={18} className="text-teal" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-primary font-semibold text-sm">Rénovation cuisine</div>
                            <div className="text-muted text-xs mt-0.5">Sherbrooke • Budget: 15k-20k$</div>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="px-2 py-0.5 bg-gradient-to-r from-teal/20 to-teal/10 text-teal text-xs font-medium rounded-full">Nouveau</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                        className="bg-white rounded-2xl p-4 shadow-lg shadow-amber/5 border border-amber/10"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-amber/20 to-amber/10 rounded-xl flex items-center justify-center flex-shrink-0">
                            <MessageCircle size={18} className="text-amber" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-primary font-semibold text-sm">Toiture à refaire</div>
                            <div className="text-muted text-xs mt-0.5">Magog • Budget: 8k-12k$</div>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="px-2 py-0.5 bg-gradient-to-r from-amber/20 to-amber/10 text-amber text-xs font-medium rounded-full">En attente</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 }}
                        className="bg-white rounded-2xl p-4 shadow-lg shadow-green-500/5 border border-green-500/10"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Check size={18} className="text-green-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-primary font-semibold text-sm">Peinture intérieure</div>
                            <div className="text-muted text-xs mt-0.5">Granby • Budget: 3k-5k$</div>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="px-2 py-0.5 bg-gradient-to-r from-green-500/20 to-green-500/10 text-green-500 text-xs font-medium rounded-full">Connecté</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Bottom nav */}
                    <div className="absolute bottom-6 left-5 right-5">
                      <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-3 shadow-lg border border-teal/10 flex items-center justify-around">
                        <div className="w-8 h-8 bg-gradient-to-br from-teal/20 to-teal/10 rounded-lg flex items-center justify-center">
                          <TrendingUp size={16} className="text-teal" />
                        </div>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                          <MessageCircle size={16} className="text-muted" />
                        </div>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                          <Users size={16} className="text-muted" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating stats card */}
                <motion.div
                  initial={{ opacity: 0, x: -30, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.9, type: "spring", stiffness: 100 }}
                  className="absolute -left-16 top-1/4 bg-white/90 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-teal/10 hidden lg:block"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal to-teal-dark rounded-xl flex items-center justify-center shadow-lg shadow-teal/30">
                      <TrendingUp size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-teal">2,500+</div>
                      <div className="text-xs text-muted">Pros actifs</div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating review card */}
                <motion.div
                  initial={{ opacity: 0, x: 30, y: -20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 1.1, type: "spring", stiffness: 100 }}
                  className="absolute -right-8 bottom-1/3 bg-white/90 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-amber/10 hidden lg:block"
                >
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="text-amber fill-amber" />
                    ))}
                  </div>
                  <div className="text-xs text-muted">4.9/5 sur l'App Store</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* VALUE PROPOSITION - Glass Cards */}
      {/* ============================================ */}
      <section className="py-32 bg-gradient-to-b from-white via-surface to-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-teal/5 to-transparent" />
        <div className="absolute -left-40 top-1/2 w-80 h-80 bg-teal/10 rounded-full blur-3xl" />
        <div className="absolute -right-40 top-1/3 w-80 h-80 bg-amber/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-teal/10 to-amber/10 rounded-full text-sm font-semibold text-teal mb-4">
              La différence ProPair
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-primary mb-6">
              Pourquoi ProPair ?
            </h2>
            <p className="text-xl text-body max-w-2xl mx-auto">
              Une solution simple pour une mise en relation directe et transparente.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Client card - Teal theme */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-teal/20 shadow-xl shadow-teal/5 hover:shadow-2xl hover:shadow-teal/10 hover:border-teal/40 transition-all duration-500"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-teal to-teal-dark rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-teal/30 group-hover:scale-110 transition-transform duration-500">
                  <Users size={28} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">Pour les Clients</h3>
                <p className="text-lg font-semibold text-teal mb-4">La rénovation sans intermédiaire</p>
                <p className="text-body mb-6 leading-relaxed">
                  ProPair vous met en contact direct avec des entrepreneurs qualifiés, sans intermédiaire ni frais cachés.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-teal to-teal-dark flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={12} className="text-white" />
                    </div>
                    <div>
                      <span className="font-semibold text-primary">Publication simplifiée</span>
                      <p className="text-sm text-muted">Décrivez votre projet en quelques clics et recevez des réponses personnalisées.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-teal to-teal-dark flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={12} className="text-white" />
                    </div>
                    <div>
                      <span className="font-semibold text-primary">Confiance vérifiée</span>
                      <p className="text-sm text-muted">Chaque entrepreneur est validé avec ses licences RBQ et assurances.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-teal to-teal-dark flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={12} className="text-white" />
                    </div>
                    <div>
                      <span className="font-semibold text-primary">Communication directe</span>
                      <p className="text-sm text-muted">Discutez directement avec les professionnels sans passer par un tiers.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-teal to-teal-dark flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={12} className="text-white" />
                    </div>
                    <div>
                      <span className="font-semibold text-primary">100% gratuit pour vous</span>
                      <p className="text-sm text-muted">L'utilisation de ProPair est entièrement gratuite pour les clients.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Pro card - Amber accent */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 border-2 border-amber/30 shadow-xl shadow-amber/5 hover:shadow-2xl hover:shadow-amber/10 hover:border-amber/50 transition-all duration-500"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Pro badge */}
              <div className="absolute -top-3 right-6 px-4 py-1 bg-gradient-to-r from-amber to-amber-dark text-white text-xs font-bold rounded-full shadow-lg">
                PRO
              </div>

              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-amber to-amber-dark rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-amber/30 group-hover:scale-110 transition-transform duration-500">
                  <Briefcase size={28} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">Pour les Entrepreneurs</h3>
                <p className="text-lg font-semibold text-amber mb-4">Votre outil de travail, pas votre patron</p>
                <p className="text-body mb-6 leading-relaxed">
                  ProPair, c'est l'outil intelligent conçu pour vous aider à trouver des chantiers, pas pour vous dicter comment travailler.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber to-amber-dark flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={12} className="text-white" />
                    </div>
                    <div>
                      <span className="font-semibold text-primary">Recevez des demandes ciblées</span>
                      <p className="text-sm text-muted">Seulement les projets qui correspondent à vos métiers et votre zone.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber to-amber-dark flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={12} className="text-white" />
                    </div>
                    <div>
                      <span className="font-semibold text-primary">Abonnement fixe, 0% commission</span>
                      <p className="text-sm text-muted">Vous gardez 100% de vos profits. Pas de surprise à la fin du mois.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber to-amber-dark flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={12} className="text-white" />
                    </div>
                    <div>
                      <span className="font-semibold text-primary">Restez maître de votre business</span>
                      <p className="text-sm text-muted">Pas de contrat. Pas de restriction. Vous gérez votre carnet de commandes comme vous voulez.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber to-amber-dark flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={12} className="text-white" />
                    </div>
                    <div>
                      <span className="font-semibold text-primary">Visibilité sans effort</span>
                      <p className="text-sm text-muted">Créez votre profil une fois, et laissez les clients venir à vous.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* HOW IT WORKS - Horizontal Steps */}
      {/* ============================================ */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Subtle line connecting steps */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-teal/20 to-transparent hidden md:block" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-teal/10 to-teal/5 rounded-full text-sm font-semibold text-teal mb-4">
              Simple & rapide
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-primary mb-6">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-body max-w-2xl mx-auto">
              En 3 étapes simples, trouvez le bon professionnel ou le bon projet.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative text-center group"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-teal to-teal-dark rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-teal/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Créez votre profil</h3>
              <p className="text-body">
                Inscrivez-vous gratuitement et complétez votre profil en quelques minutes.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative text-center group"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-amber to-amber-dark rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-amber/30 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Publiez ou recherchez</h3>
              <p className="text-body">
                Clients : décrivez votre projet. Entrepreneurs : parcourez les demandes dans votre zone.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative text-center group"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-teal to-teal-dark rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-teal/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Connectez-vous directement</h3>
              <p className="text-body">
                Échangez via le chat intégré et collaborez sans intermédiaire ni commission.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* APP DOWNLOAD - Clean Card */}
      {/* ============================================ */}
      <section id="telecharger" className="py-24 bg-gradient-to-b from-white to-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-teal/5 via-white to-amber/5 rounded-[32px] p-8 md:p-12 border border-teal/10 shadow-xl overflow-hidden"
          >
            {/* Decorative gradients */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber/10 rounded-full blur-3xl" />

            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: App Icon + Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col sm:flex-row items-center gap-8"
              >
                <div className="relative">
                  <img
                    src="/apple-touch-icon.png"
                    alt="ProPair App"
                    className="w-32 h-32 rounded-[28px] shadow-2xl shadow-teal/20 border-2 border-white flex-shrink-0"
                  />
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-teal/20 to-amber/20 blur-xl -z-10" />
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-3">
                    Téléchargez ProPair
                  </h2>
                  <p className="text-body mb-2">
                    Disponible gratuitement sur iOS et Android.
                  </p>
                  <p className="text-sm text-muted">
                    Notifications en temps réel • Chat intégré • 0% commission
                  </p>
                </div>
              </motion.div>

              {/* Right: App Store buttons - Teal gradient instead of black */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end"
              >
                <a
                  href="https://apps.apple.com/app/propair"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-teal to-teal-dark hover:from-teal-dark hover:to-teal text-white rounded-2xl transition-all shadow-lg shadow-teal/30 hover:shadow-xl hover:-translate-y-0.5"
                >
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] uppercase text-white/70">Télécharger sur</div>
                    <div className="text-lg font-bold -mt-0.5">App Store</div>
                  </div>
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.propair"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-teal to-teal-dark hover:from-teal-dark hover:to-teal text-white rounded-2xl transition-all shadow-lg shadow-teal/30 hover:shadow-xl hover:-translate-y-0.5"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] uppercase text-white/70">Disponible sur</div>
                    <div className="text-lg font-bold -mt-0.5">Google Play</div>
                  </div>
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FINAL CTA - Gradient Section */}
      {/* ============================================ */}
      <section className="py-32 bg-gradient-to-br from-teal/5 via-white to-amber/5 relative overflow-hidden">
        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-teal/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -20, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber/10 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-primary mb-6">
              Prêt à commencer ?
            </h2>
            <p className="text-xl text-body mb-12 max-w-2xl mx-auto">
              Rejoignez des milliers d'utilisateurs qui font confiance à ProPair pour leurs projets.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#telecharger"
                className="group flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-teal to-teal-dark hover:from-teal-dark hover:to-teal text-white text-lg font-bold rounded-2xl transition-all shadow-xl shadow-teal/30 hover:shadow-2xl hover:shadow-teal/40 hover:-translate-y-1"
              >
                <Smartphone size={22} />
                Télécharger l'application
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                to="/about"
                className="flex items-center justify-center gap-3 px-10 py-5 bg-white/80 backdrop-blur-sm hover:bg-white text-primary text-lg font-semibold rounded-2xl border border-teal/20 hover:border-teal/40 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Notre histoire
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
