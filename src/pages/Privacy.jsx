import { motion } from 'framer-motion';
import { Shield, Mail, MapPin, Lock, Database, UserCheck, AlertTriangle } from 'lucide-react';
import SEO from '../components/SEO';

export default function Privacy() {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen font-sans selection:bg-teal-50 selection:text-teal-700">
      <SEO
        title="Politique de confidentialité"
        canonical="/privacy"
        description="Politique de confidentialité de ProPair. Découvrez comment nous protégeons vos données personnelles."
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-100 shadow-sm text-slate-600 text-xs sm:text-sm font-medium mb-6">
            <Shield size={14} className="text-teal-600" />
            <span>Loi 25 / RGPD conforme</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Politique de confidentialité
          </h1>
          <p className="text-slate-500">Dernière mise à jour : Février 2026</p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="prose prose-lg max-w-none"
        >
          {/* Section 1 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600 text-sm font-bold">1</span>
              Introduction
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <p className="text-slate-600 leading-relaxed mb-4">
                ProPair™, exploitée par <strong>SwiftByte inc.</strong> (« nous », « notre »), propose une plateforme de mise en relation B2B. La présente Politique détaille nos pratiques de gestion des renseignements personnels conformément à la <strong>Loi 25 (Québec)</strong>, à la <strong>LPRPDE (Canada)</strong> et au <strong>RGPD</strong>, le cas échéant.
              </p>
              <p className="text-sm text-slate-500 italic">
                ProPair™ est une marque de commerce de SwiftByte inc.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600 text-sm font-bold">2</span>
              Responsable de la protection des renseignements personnels
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <p className="text-slate-600 leading-relaxed mb-4">
                Conformément à la Loi 25, le responsable est :
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <UserCheck size={18} className="text-teal-600" />
                  <span className="text-slate-600"><strong>Titre :</strong> Responsable de la protection des données / Direction des opérations</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-teal-600" />
                  <span className="text-slate-600"><strong>Courriel :</strong> <a href="mailto:privacy@propairapp.com" className="text-teal-600 hover:underline">privacy@propairapp.com</a></span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-teal-600" />
                  <span className="text-slate-600"><strong>Adresse :</strong> Magog, Québec, Canada</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600 text-sm font-bold">3</span>
              Renseignements collectés
            </h2>
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-3">Collectés directement</h3>
                <p className="text-slate-600">
                  Nom, courriel, téléphone, localisation, profil professionnel (RBQ, certifications), photos de projets, messages via la plateforme.
                </p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-3">Collectés automatiquement</h3>
                <p className="text-slate-600">
                  Adresse IP, identifiants d'appareil, données de géolocalisation (avec consentement), journaux d'accès.
                </p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-3">Via des tiers</h3>
                <p className="text-slate-600">
                  Authentification Google/Apple, vérifications de licences professionnelles.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600 text-sm font-bold">4</span>
              Finalités et consentement
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <p className="text-slate-600 leading-relaxed mb-4">
                Nous collectons vos données pour fournir le Service, faciliter la mise en relation et assurer la sécurité. En utilisant ProPair, vous offrez un <strong>consentement manifeste, libre et éclairé</strong>.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Vous pouvez retirer votre consentement en tout temps via les paramètres de l'application ou en nous contactant à <a href="mailto:privacy@propairapp.com" className="text-teal-600 hover:underline">privacy@propairapp.com</a>.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600 text-sm font-bold">5</span>
              Communication et transferts
            </h2>
            <div className="space-y-4">
              <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                <h3 className="font-bold text-teal-600 mb-2 flex items-center gap-2">
                  <Lock size={18} />
                  Aucune vente
                </h3>
                <p className="text-slate-600">
                  Nous ne vendons <strong>jamais</strong> vos renseignements personnels.
                </p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-2">Partage limité</h3>
                <p className="text-slate-600">
                  Limité aux fournisseurs (Supabase pour l'hébergement, Stripe pour le paiement) et aux autorités si requis par la loi.
                </p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-2">Transferts hors Québec</h3>
                <p className="text-slate-600">
                  Vos données sont hébergées via Supabase. Nous nous assurons que ces tiers respectent des standards de protection équivalents à la Loi 25.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600 text-sm font-bold">6</span>
              Conservation et sécurité
            </h2>
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <div className="flex items-start gap-3">
                  <Database size={20} className="text-teal-600 mt-1" />
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">Durée de conservation</h3>
                    <ul className="text-slate-600 space-y-2">
                      <li>• Comptes actifs : conservés pendant la durée de l'activité + 3 ans</li>
                      <li>• Données fiscales : conservées 7 ans</li>
                      <li>• <strong>Suppression de compte : vos données sont supprimées dans un délai de 30 jours</strong></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <div className="flex items-start gap-3">
                  <Lock size={20} className="text-teal-600 mt-1" />
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">Mesures de sécurité</h3>
                    <p className="text-slate-600">
                      Chiffrement TLS 1.3 (transit) et AES-256 (repos).
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={20} className="text-amber-600 mt-1" />
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">Incident de confidentialité</h3>
                    <p className="text-slate-600">
                      En cas d'incident présentant un risque de préjudice sérieux, nous aviserons la Commission d'accès à l'information (CAI) et les personnes concernées dans les plus brefs délais.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600 text-sm font-bold">7</span>
              Vos droits et suppression
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <p className="text-slate-600 leading-relaxed mb-4">
                Vous disposez des droits suivants :
              </p>
              <ul className="text-slate-600 space-y-2 mb-6">
                <li>• <strong>Accès</strong> : obtenir une copie de vos données personnelles</li>
                <li>• <strong>Rectification</strong> : corriger des informations inexactes</li>
                <li>• <strong>Portabilité</strong> : recevoir vos données dans un format structuré</li>
                <li>• <strong>Suppression</strong> : supprimer votre compte et vos données</li>
              </ul>
              <div className="bg-teal-50 rounded-xl p-4 border border-teal-100">
                <p className="text-slate-600">
                  <strong>Suppression de compte :</strong> Vous pouvez supprimer votre compte et vos données associées directement dans les paramètres de l'application mobile ou sur simple demande à <a href="mailto:privacy@propairapp.com" className="text-teal-600 hover:underline">privacy@propairapp.com</a>. Vos données seront supprimées dans un délai de <strong>30 jours</strong>.
                </p>
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
