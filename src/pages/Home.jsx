import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Smartphone,
  Shield,
  Zap,
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
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/5 border border-teal/10 mb-8"
              >
                <span className="w-2 h-2 bg-teal rounded-full animate-pulse" />
                <span className="text-teal text-sm font-medium">La plateforme québécoise sans commission</span>
              </motion.div>

              {/* Main headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-primary leading-[1.1] mb-6 tracking-tight">
                Bâtissez.
                <br />
                Connectez.
                <br />
                <span className="text-gradient-teal">Prospérez.</span>
              </h1>

              <p className="text-xl sm:text-2xl text-body mb-10 max-w-xl leading-relaxed">
                La mise en relation directe entre clients et entrepreneurs.{' '}
                <span className="text-teal font-semibold">0% de commission</span> sur vos travaux.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/login?redirect=billing"
                  className="group flex items-center justify-center gap-3 px-8 py-4 bg-amber hover:bg-amber-dark text-white font-bold rounded-2xl transition-all btn-press shadow-lg shadow-amber/25"
                >
                  Obtenir mes 3 connexions gratuites
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/pricing"
                  className="group flex items-center justify-center gap-3 px-8 py-4 bg-white hover:bg-surface text-primary font-semibold rounded-2xl border border-border-dark transition-all btn-press"
                >
                  <Briefcase size={20} />
                  Voir les tarifs
                </Link>
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
                <div className="flex items-center gap-2">
                  <Zap size={18} className="text-amber" />
                  <span>Réponse en 24h</span>
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

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Client card - White with subtle border */}
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
              <h3 className="text-2xl font-bold text-primary mb-3">Pour les Clients</h3>
              <p className="text-body mb-6 leading-relaxed">
                Trouvez des artisans qualifiés pour vos projets. Décrivez votre besoin et recevez des propositions.
              </p>
              <div className="flex items-center gap-2 text-teal font-semibold">
                <Check size={20} />
                <span>100% gratuit</span>
              </div>
            </motion.div>

            {/* Pro card - White with teal accent */}
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
              <h3 className="text-2xl font-bold text-primary mb-3">Pour les Entrepreneurs</h3>
              <p className="text-body mb-6 leading-relaxed">
                Accédez à des demandes qualifiées dans votre région. Un abonnement fixe, zéro commission.
              </p>
              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 text-teal font-semibold hover:text-teal-dark transition-colors"
              >
                Voir les tarifs
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* APP DOWNLOAD SECTION */}
      {/* ============================================ */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-primary mb-6 leading-tight">
                Emportez ProPair
                <br />
                <span className="text-gradient-teal">partout avec vous.</span>
              </h2>

              <p className="text-xl text-body mb-10 leading-relaxed">
                Gérez vos projets ou trouvez des chantiers directement depuis votre téléphone.
                Notifications en temps réel et chat intégré.
              </p>

              {/* App Store buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#"
                  className="flex items-center justify-center gap-3 px-6 py-4 bg-primary hover:bg-primary/90 text-white rounded-xl transition-colors btn-press shadow-soft"
                >
                  <Smartphone size={24} />
                  <div className="text-left">
                    <div className="text-[10px] uppercase text-white/60">Télécharger sur</div>
                    <div className="text-lg font-bold -mt-0.5">App Store</div>
                  </div>
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center gap-3 px-6 py-4 bg-primary hover:bg-primary/90 text-white rounded-xl transition-colors btn-press shadow-soft"
                >
                  <Smartphone size={24} />
                  <div className="text-left">
                    <div className="text-[10px] uppercase text-white/60">Disponible sur</div>
                    <div className="text-lg font-bold -mt-0.5">Google Play</div>
                  </div>
                </a>
              </div>

              {/* Stats */}
              <div className="mt-12 flex gap-12">
                <div>
                  <div className="text-3xl font-bold text-primary">4.9</div>
                  <div className="text-sm text-muted flex items-center gap-1">
                    <Star size={14} className="text-amber fill-amber" />
                    Note App Store
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">10K+</div>
                  <div className="text-sm text-muted">Téléchargements</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-teal">0%</div>
                  <div className="text-sm text-muted">Commission</div>
                </div>
              </div>
            </motion.div>

            {/* Right: Phone visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* Phone with shadow-float */}
                <div className="relative w-64 h-[520px] bg-white rounded-[45px] border border-border shadow-float overflow-hidden">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-primary rounded-b-xl z-10" />
                  <div className="w-full h-full bg-surface p-4 pt-10">
                    {/* Mock UI */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-10 h-10 bg-teal rounded-xl flex items-center justify-center text-white font-bold shadow-soft">P</div>
                      <div className="w-8 h-8 bg-white rounded-full border border-border" />
                    </div>
                    <div className="space-y-3">
                      <div className="bg-white rounded-2xl p-4 shadow-soft border border-border">
                        <div className="h-3 w-3/4 bg-border-dark rounded-full mb-2" />
                        <div className="h-2 w-1/2 bg-border rounded-full" />
                      </div>
                      <div className="bg-white rounded-2xl p-4 shadow-soft border-2 border-teal/30">
                        <div className="h-3 w-2/3 bg-teal/20 rounded-full mb-2" />
                        <div className="h-2 w-1/3 bg-teal/10 rounded-full" />
                      </div>
                      <div className="bg-white rounded-2xl p-4 shadow-soft border border-border">
                        <div className="h-3 w-1/2 bg-border-dark rounded-full mb-2" />
                        <div className="h-2 w-3/4 bg-border rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
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
              <Link
                to="/login?redirect=billing"
                className="group flex items-center justify-center gap-3 px-10 py-5 bg-amber hover:bg-amber-dark text-white text-lg font-bold rounded-2xl transition-all btn-press shadow-lg shadow-amber/25"
              >
                Obtenir mes 3 connexions gratuites
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
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
