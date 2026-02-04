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
      {/* HERO SECTION - White Mode Apple Style */}
      {/* ============================================ */}
      <section className="relative min-h-screen flex items-center bg-white overflow-hidden">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-surface pointer-events-none" />

        {/* Very subtle decorative elements */}
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-teal/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber/5 rounded-full blur-[100px] pointer-events-none" />

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
                <span className="text-gradient-teal">Collaborez.</span>
              </h1>

              <p className="text-xl sm:text-2xl text-body mb-10 max-w-xl leading-relaxed">
                La mise en relation directe entre clients et entrepreneurs.{' '}
                <span className="text-teal font-semibold">0% de commission</span> sur vos travaux.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#telecharger"
                  className="group flex items-center justify-center gap-3 px-8 py-4 bg-teal hover:bg-teal-dark text-white font-bold rounded-2xl transition-all btn-press shadow-lg shadow-teal/25"
                >
                  <Smartphone size={20} />
                  Télécharger l'application
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Trust badges */}
              <div className="mt-12 flex flex-wrap gap-6 text-sm text-muted">
                <div className="flex items-center gap-2">
                  <Check size={18} className="text-teal" />
                  <span>100% gratuit pour les clients</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield size={18} className="text-muted" />
                  <span>Artisans vérifiés</span>
                </div>
              </div>
            </motion.div>

            {/* Right: Phone mockup with float effect */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* Phone frame with soft shadow */}
                <div className="relative w-72 h-[580px] bg-white rounded-[50px] border border-border shadow-float overflow-hidden">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-primary rounded-b-2xl z-10" />

                  {/* Screen content - Light UI */}
                  <div className="w-full h-full bg-surface p-5 pt-12">
                    {/* App header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-teal rounded-xl flex items-center justify-center shadow-soft">
                          <span className="text-white text-lg font-bold">P</span>
                        </div>
                        <div>
                          <div className="text-primary font-bold">ProPair</div>
                          <div className="text-muted text-xs">3 demandes à traiter</div>
                        </div>
                      </div>
                      <div className="w-9 h-9 bg-white rounded-full border border-border flex items-center justify-center">
                        <div className="w-6 h-6 bg-gradient-to-br from-teal-light to-teal rounded-full" />
                      </div>
                    </div>

                    {/* Mock project cards */}
                    <div className="space-y-3">
                      <div className="bg-white rounded-2xl p-4 shadow-soft border border-border">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-teal/10 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Users size={18} className="text-teal" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-primary font-semibold text-sm">Rénovation cuisine</div>
                            <div className="text-muted text-xs mt-0.5">Sherbrooke • Budget: 15k-20k$</div>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="px-2 py-0.5 bg-teal/10 text-teal text-xs font-medium rounded-full">Nouveau</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-2xl p-4 shadow-soft border border-border">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-amber/10 rounded-xl flex items-center justify-center flex-shrink-0">
                            <MessageCircle size={18} className="text-amber" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-primary font-semibold text-sm">Toiture à refaire</div>
                            <div className="text-muted text-xs mt-0.5">Magog • Budget: 8k-12k$</div>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="px-2 py-0.5 bg-amber/10 text-amber text-xs font-medium rounded-full">En attente</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-2xl p-4 shadow-soft border border-border">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-success/10 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Check size={18} className="text-success" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-primary font-semibold text-sm">Peinture intérieure</div>
                            <div className="text-muted text-xs mt-0.5">Granby • Budget: 3k-5k$</div>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="px-2 py-0.5 bg-success/10 text-success text-xs font-medium rounded-full">Connecté</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom nav hint */}
                    <div className="absolute bottom-6 left-5 right-5">
                      <div className="bg-white rounded-2xl p-3 shadow-soft-lg border border-border flex items-center justify-around">
                        <div className="w-8 h-8 bg-teal/10 rounded-lg flex items-center justify-center">
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
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -left-16 top-1/4 bg-white rounded-2xl p-4 shadow-soft-xl border border-border hidden lg:block"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal/10 rounded-xl flex items-center justify-center">
                      <TrendingUp size={20} className="text-teal" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">2,500+</div>
                      <div className="text-xs text-muted">Pros actifs</div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating review card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute -right-8 bottom-1/3 bg-white rounded-2xl p-4 shadow-soft-xl border border-border hidden lg:block"
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
      {/* VALUE PROPOSITION - Clean White Cards */}
      {/* ============================================ */}
      <section className="py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-primary mb-6">
              Pourquoi ProPair ?
            </h2>
            <p className="text-xl text-body max-w-2xl mx-auto">
              Une solution simple pour une mise en relation directe et transparente.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Client card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group bg-white rounded-3xl p-8 border border-border shadow-soft hover:shadow-soft-lg hover:border-teal/20 transition-all"
            >
              <div className="w-14 h-14 bg-teal rounded-2xl flex items-center justify-center mb-6 shadow-soft group-hover:scale-105 transition-transform">
                <Users size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-2">Pour les Clients</h3>
              <p className="text-lg font-semibold text-teal mb-4">La rénovation sans intermédiaire</p>
              <p className="text-body mb-6 leading-relaxed">
                ProPair vous met en contact direct avec des entrepreneurs qualifiés, sans intermédiaire ni frais cachés.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check size={18} className="text-teal flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-primary">Publication simplifiée</span>
                    <p className="text-sm text-muted">Décrivez votre projet en quelques clics et recevez des réponses personnalisées.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={18} className="text-teal flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-primary">Confiance vérifiée</span>
                    <p className="text-sm text-muted">Chaque entrepreneur est validé avec ses licences RBQ et assurances.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={18} className="text-teal flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-primary">Communication directe</span>
                    <p className="text-sm text-muted">Discutez directement avec les professionnels sans passer par un tiers.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={18} className="text-teal flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-primary">100% gratuit pour vous</span>
                    <p className="text-sm text-muted">L'utilisation de ProPair est entièrement gratuite pour les clients.</p>
                  </div>
                </li>
              </ul>
            </motion.div>

            {/* Pro card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group bg-white rounded-3xl p-8 border-2 border-teal shadow-soft hover:shadow-soft-lg transition-all"
            >
              <div className="w-14 h-14 bg-amber rounded-2xl flex items-center justify-center mb-6 shadow-soft group-hover:scale-105 transition-transform">
                <Briefcase size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-2">Pour les Entrepreneurs</h3>
              <p className="text-lg font-semibold text-amber mb-4">Votre outil de travail, pas votre patron</p>
              <p className="text-body mb-6 leading-relaxed">
                ProPair, c'est l'outil intelligent conçu pour vous aider à trouver des chantiers, pas pour vous dicter comment travailler.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check size={18} className="text-amber flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-primary">Recevez des demandes ciblées</span>
                    <p className="text-sm text-muted">Seulement les projets qui correspondent à vos métiers et votre zone.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={18} className="text-amber flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-primary">Abonnement fixe, 0% commission</span>
                    <p className="text-sm text-muted">Vous gardez 100% de vos profits. Pas de surprise à la fin du mois.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={18} className="text-amber flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-primary">Restez maître de votre business</span>
                    <p className="text-sm text-muted">Pas de contrat. Pas de restriction. Vous gérez votre carnet de commandes comme vous voulez.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={18} className="text-amber flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-primary">Visibilité sans effort</span>
                    <p className="text-sm text-muted">Créez votre profil une fois, et laissez les clients venir à vous.</p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* HOW IT WORKS SECTION */}
      {/* ============================================ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
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
              className="text-center"
            >
              <div className="w-16 h-16 bg-teal/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-teal">1</span>
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
              className="text-center"
            >
              <div className="w-16 h-16 bg-amber/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-amber">2</span>
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
              className="text-center"
            >
              <div className="w-16 h-16 bg-teal/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-teal">3</span>
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
      {/* APP DOWNLOAD SECTION */}
      {/* ============================================ */}
      <section id="telecharger" className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-soft border border-border">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: App Icon + Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col sm:flex-row items-center gap-8"
              >
                <img
                  src="/apple-touch-icon.png"
                  alt="ProPair App"
                  className="w-32 h-32 rounded-[28px] shadow-soft-lg border border-border flex-shrink-0"
                />
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

              {/* Right: App Store buttons */}
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
                  className="flex items-center justify-center gap-3 px-6 py-4 bg-primary hover:bg-primary/90 text-white rounded-xl transition-colors btn-press shadow-soft"
                >
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] uppercase text-white/60">Télécharger sur</div>
                    <div className="text-lg font-bold -mt-0.5">App Store</div>
                  </div>
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.propair"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 px-6 py-4 bg-primary hover:bg-primary/90 text-white rounded-xl transition-colors btn-press shadow-soft"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] uppercase text-white/60">Disponible sur</div>
                    <div className="text-lg font-bold -mt-0.5">Google Play</div>
                  </div>
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FINAL CTA - Light with teal accent */}
      {/* ============================================ */}
      <section className="py-32 bg-surface relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-teal/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-amber/5 rounded-full blur-[100px]" />
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
                className="group flex items-center justify-center gap-3 px-10 py-5 bg-teal hover:bg-teal-dark text-white text-lg font-bold rounded-2xl transition-all btn-press shadow-lg shadow-teal/25"
              >
                <Smartphone size={22} />
                Télécharger l'application
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                to="/about"
                className="flex items-center justify-center gap-3 px-10 py-5 bg-white hover:bg-white/80 text-primary text-lg font-semibold rounded-2xl border border-border-dark transition-all btn-press shadow-soft"
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
