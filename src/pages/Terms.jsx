import { motion } from 'framer-motion';
import { FileText, Users, Building2, CreditCard, MessageSquare, Scale, Gavel } from 'lucide-react';
import SEO from '../components/SEO';

export default function Terms() {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <SEO
        title="Conditions d'utilisation"
        canonical="/terms"
        description="Conditions générales d'utilisation de la plateforme ProPair. Règles, droits et obligations des utilisateurs."
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center">
              <FileText size={24} className="text-teal" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary">
                Conditions d'utilisation
              </h1>
              <p className="text-muted">Dernière mise à jour : Février 2026</p>
            </div>
          </div>
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
            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal/10 rounded-lg flex items-center justify-center text-teal text-sm font-bold">1</span>
              Nature du service et admissibilité
            </h2>
            <div className="bg-surface rounded-2xl p-6 border border-border">
              <div className="flex items-start gap-3 mb-4">
                <Users size={20} className="text-teal mt-1" />
                <div>
                  <p className="text-body leading-relaxed">
                    ProPair™ est une plateforme technologique d'intermédiation gérée par <strong>SwiftByte inc.</strong>
                  </p>
                </div>
              </div>
              <p className="text-body leading-relaxed">
                Pour utiliser nos services, vous devez :
              </p>
              <ul className="text-body space-y-2 mt-3">
                <li>• Avoir au moins <strong>18 ans</strong></li>
                <li>• Avoir la capacité juridique de contracter au Québec</li>
              </ul>
              <p className="text-sm text-muted italic mt-4">
                ProPair™ est une marque de commerce de SwiftByte inc.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal/10 rounded-lg flex items-center justify-center text-teal text-sm font-bold">2</span>
              Obligations des entrepreneurs (RBQ)
            </h2>
            <div className="bg-surface rounded-2xl p-6 border border-border">
              <div className="flex items-start gap-3">
                <Building2 size={20} className="text-teal mt-1" />
                <div>
                  <p className="text-body leading-relaxed mb-4">
                    L'Entrepreneur garantit qu'il détient :
                  </p>
                  <ul className="text-body space-y-2">
                    <li>• Une <strong>licence valide</strong> de la Régie du bâtiment du Québec (RBQ)</li>
                    <li>• Les <strong>assurances responsabilité civile</strong> requises</li>
                    <li>• Les <strong>cautionnements</strong> requis par la loi</li>
                  </ul>
                  <div className="mt-4 p-4 bg-amber/5 rounded-xl border border-amber/20">
                    <p className="text-body text-sm">
                      <strong>Important :</strong> ProPair se réserve le droit de suspendre tout profil ne pouvant justifier de ses titres professionnels.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal/10 rounded-lg flex items-center justify-center text-teal text-sm font-bold">3</span>
              Transactions et paiements
            </h2>
            <div className="space-y-4">
              <div className="bg-surface rounded-2xl p-6 border border-border">
                <div className="flex items-start gap-3">
                  <Scale size={20} className="text-teal mt-1" />
                  <div>
                    <h3 className="font-bold text-primary mb-2">Indépendance des contrats</h3>
                    <p className="text-body">
                      ProPair n'est <strong>pas partie aux contrats de travaux</strong>. Les ententes sont conclues directement entre les utilisateurs.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-surface rounded-2xl p-6 border border-border">
                <div className="flex items-start gap-3">
                  <CreditCard size={20} className="text-teal mt-1" />
                  <div>
                    <h3 className="font-bold text-primary mb-2">Paiements</h3>
                    <p className="text-body">
                      Les frais de service et abonnements sont gérés exclusivement via notre interface Web sécurisée. <strong>Aucun paiement n'est traité directement via les boutiques d'applications</strong> (Apple/Google).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal/10 rounded-lg flex items-center justify-center text-teal text-sm font-bold">4</span>
              Utilisation des échanges comme preuve
            </h2>
            <div className="bg-surface rounded-2xl p-6 border border-border">
              <div className="flex items-start gap-3">
                <MessageSquare size={20} className="text-teal mt-1" />
                <div>
                  <p className="text-body leading-relaxed mb-4">
                    Le Service permet de documenter les échanges et modifications de projet.
                  </p>
                  <div className="space-y-4">
                    <div className="p-4 bg-teal/5 rounded-xl border border-teal/20">
                      <h4 className="font-semibold text-primary mb-1">Accès aux données</h4>
                      <p className="text-body text-sm">
                        En cas de litige, ProPair peut fournir une extraction des conversations et fichiers partagés sur demande au support (<a href="mailto:support@propairapp.com" className="text-teal hover:underline">support@propairapp.com</a>).
                      </p>
                    </div>
                    <div className="p-4 bg-amber/5 rounded-xl border border-amber/20">
                      <h4 className="font-semibold text-primary mb-1">Limitation</h4>
                      <p className="text-body text-sm">
                        Ce service est fourni "tel quel". ProPair ne garantit pas l'admissibilité de ces logs devant un tribunal et n'est pas responsable des données supprimées par les utilisateurs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal/10 rounded-lg flex items-center justify-center text-teal text-sm font-bold">5</span>
              Limitation de responsabilité
            </h2>
            <div className="bg-surface rounded-2xl p-6 border border-border">
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-primary mb-2">Exclusion de responsabilité</h3>
                  <p className="text-body">
                    ProPair n'est <strong>pas responsable</strong> des malfaçons, des retards, des abandons de chantier ou des dommages corporels/matériels survenant lors des travaux.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-primary mb-2">Dommages indirects</h3>
                  <p className="text-body">
                    Nous ne sommes pas responsables des pertes de profits ou de données.
                  </p>
                </div>
                <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                  <h3 className="font-bold text-primary mb-2">Plafonnement</h3>
                  <p className="text-body">
                    La responsabilité totale de ProPair est limitée au montant payé par l'utilisateur au cours des <strong>6 derniers mois</strong>, ou <strong>100 $ CAD</strong> (le montant le plus élevé prévalant).
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal/10 rounded-lg flex items-center justify-center text-teal text-sm font-bold">6</span>
              Droit applicable et litiges
            </h2>
            <div className="bg-surface rounded-2xl p-6 border border-border">
              <div className="flex items-start gap-3">
                <Gavel size={20} className="text-teal mt-1" />
                <div>
                  <p className="text-body leading-relaxed mb-4">
                    Les présentes conditions sont régies par les <strong>lois du Québec</strong>.
                  </p>
                  <p className="text-body leading-relaxed">
                    Tout litige non résolu par médiation sera soumis à la compétence exclusive des <strong>tribunaux du district judiciaire de Saint-François</strong> (Sherbrooke/Magog).
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted text-center">
              ProPair™ est une marque de commerce de SwiftByte inc. — Magog, Québec, Canada
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
