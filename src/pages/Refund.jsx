import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ReceiptText, Ban, Calendar, AlertCircle, Users, Mail } from 'lucide-react';
import SEO from '../components/SEO';

export default function Refund() {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <SEO
        title="Politique de remboursement"
        canonical="/refund"
        description="Politique de remboursement ProPair. Informations sur les annulations et remboursements d'abonnement."
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
              <ReceiptText size={24} className="text-teal" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary">
                Politique de remboursement
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
              Principe de service rendu
            </h2>
            <div className="bg-surface rounded-2xl p-6 border border-border">
              <p className="text-body leading-relaxed mb-4">
                ProPair™ fournit un service d'accès à une mise en relation et à des outils de gestion.
              </p>
              <div className="p-4 bg-amber/5 rounded-xl border border-amber/20">
                <div className="flex items-start gap-3">
                  <Ban size={20} className="text-amber mt-0.5" />
                  <p className="text-body">
                    En raison de la <strong>nature numérique et immédiate</strong> du service, tous les achats sont <strong>définitifs et non remboursables</strong>.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal/10 rounded-lg flex items-center justify-center text-teal text-sm font-bold">2</span>
              Abonnements SaaS
            </h2>
            <div className="space-y-4">
              <div className="bg-surface rounded-2xl p-6 border border-border">
                <div className="flex items-start gap-3">
                  <Calendar size={20} className="text-teal mt-1" />
                  <div>
                    <h3 className="font-bold text-primary mb-2">Annulation</h3>
                    <p className="text-body">
                      Vous pouvez annuler votre abonnement <strong>en tout temps</strong> via votre tableau de bord Web.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-surface rounded-2xl p-6 border border-border">
                <h3 className="font-bold text-primary mb-2">Fin de période</h3>
                <ul className="text-body space-y-2">
                  <li>• L'accès aux fonctionnalités "Premium" reste actif jusqu'à la <strong>fin de la période de facturation</strong> en cours</li>
                  <li>• <strong>Aucun remboursement au prorata</strong> n'est accordé</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal/10 rounded-lg flex items-center justify-center text-teal text-sm font-bold">3</span>
              Exceptions (cas particuliers)
            </h2>
            <div className="bg-teal/5 rounded-2xl p-6 border border-teal/20">
              <div className="flex items-start gap-3">
                <AlertCircle size={20} className="text-teal mt-1" />
                <div>
                  <p className="text-body leading-relaxed mb-4">
                    Un remboursement peut être accordé <strong>uniquement</strong> dans les cas suivants :
                  </p>
                  <ul className="text-body space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="w-6 h-6 bg-teal/20 rounded-full flex items-center justify-center text-teal text-sm font-bold flex-shrink-0">1</span>
                      <span><strong>Double facturation technique</strong> prouvée</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-6 h-6 bg-teal/20 rounded-full flex items-center justify-center text-teal text-sm font-bold flex-shrink-0">2</span>
                      <span><strong>Incapacité technique majeure</strong> de la plateforme empêchant l'utilisation du service payé pendant plus de <strong>72h consécutives</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-6 h-6 bg-teal/20 rounded-full flex items-center justify-center text-teal text-sm font-bold flex-shrink-0">3</span>
                      <span><strong>Obligation légale</strong> selon la Loi sur la protection du consommateur (LPC)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal/10 rounded-lg flex items-center justify-center text-teal text-sm font-bold">4</span>
              Litiges entre utilisateurs
            </h2>
            <div className="bg-surface rounded-2xl p-6 border border-border">
              <div className="flex items-start gap-3">
                <Users size={20} className="text-teal mt-1" />
                <div>
                  <p className="text-body leading-relaxed mb-4">
                    ProPair <strong>ne rembourse aucun frais</strong> en cas de déception liée à :
                  </p>
                  <ul className="text-body space-y-2 mb-4">
                    <li>• La qualité des travaux d'un entrepreneur</li>
                    <li>• Le comportement d'un client</li>
                  </ul>
                  <p className="text-body">
                    Ces litiges doivent être réglés <strong>directement entre les parties</strong>, en utilisant au besoin l'historique des conversations fourni par ProPair.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal/10 rounded-lg flex items-center justify-center text-teal text-sm font-bold">5</span>
              Contact facturation
            </h2>
            <div className="bg-teal/5 rounded-2xl p-6 border border-teal/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-teal rounded-xl flex items-center justify-center">
                  <Mail size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-body mb-1">Pour toute réclamation :</p>
                  <a
                    href="mailto:billing@propairapp.com"
                    className="text-xl font-bold text-teal hover:underline"
                  >
                    billing@propairapp.com
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Related Links */}
          <section className="mb-12">
            <h3 className="text-lg font-bold text-primary mb-4">Documents connexes</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                to="/privacy"
                className="bg-surface rounded-xl p-4 border border-border hover:border-teal/30 transition-colors flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-teal/10 rounded-lg flex items-center justify-center">
                  <ReceiptText size={18} className="text-teal" />
                </div>
                <span className="font-medium text-primary">Politique de confidentialité</span>
              </Link>
              <Link
                to="/terms"
                className="bg-surface rounded-xl p-4 border border-border hover:border-teal/30 transition-colors flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-teal/10 rounded-lg flex items-center justify-center">
                  <ReceiptText size={18} className="text-teal" />
                </div>
                <span className="font-medium text-primary">Conditions d'utilisation</span>
              </Link>
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
