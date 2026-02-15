import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ReceiptText, Ban, Calendar, AlertCircle, Users, Mail } from 'lucide-react';
import SEO from '../components/SEO';

export default function Refund() {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen font-sans selection:bg-teal-50 selection:text-teal-700">
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
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-100 shadow-sm text-slate-600 text-xs sm:text-sm font-medium mb-6">
            <ReceiptText size={14} className="text-teal-600" />
            <span>Politique claire et transparente</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Politique de remboursement
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
              Principe de service rendu
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <p className="text-slate-600 leading-relaxed mb-4">
                ProPair™ fournit un service d'accès à une mise en relation et à des outils de gestion.
              </p>
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                <div className="flex items-start gap-3">
                  <Ban size={20} className="text-amber-600 mt-0.5" />
                  <p className="text-slate-600">
                    En raison de la <strong>nature numérique et immédiate</strong> du service, tous les achats sont <strong>définitifs et non remboursables</strong>.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600 text-sm font-bold">2</span>
              Abonnements SaaS
            </h2>
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <div className="flex items-start gap-3">
                  <Calendar size={20} className="text-teal-600 mt-1" />
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">Annulation</h3>
                    <p className="text-slate-600">
                      Vous pouvez annuler votre abonnement <strong>en tout temps</strong> via votre tableau de bord Web.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-2">Fin de période</h3>
                <ul className="text-slate-600 space-y-2">
                  <li>• L'accès aux fonctionnalités "Premium" reste actif jusqu'à la <strong>fin de la période de facturation</strong> en cours</li>
                  <li>• <strong>Aucun remboursement au prorata</strong> n'est accordé</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600 text-sm font-bold">3</span>
              Exceptions (cas particuliers)
            </h2>
            <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
              <div className="flex items-start gap-3">
                <AlertCircle size={20} className="text-teal-600 mt-1" />
                <div>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Un remboursement peut être accordé <strong>uniquement</strong> dans les cas suivants :
                  </p>
                  <ul className="text-slate-600 space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 text-sm font-bold flex-shrink-0">1</span>
                      <span><strong>Double facturation technique</strong> prouvée</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 text-sm font-bold flex-shrink-0">2</span>
                      <span><strong>Incapacité technique majeure</strong> de la plateforme empêchant l'utilisation du service payé pendant plus de <strong>72h consécutives</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 text-sm font-bold flex-shrink-0">3</span>
                      <span><strong>Obligation légale</strong> selon la Loi sur la protection du consommateur (LPC)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600 text-sm font-bold">4</span>
              Litiges entre utilisateurs
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <div className="flex items-start gap-3">
                <Users size={20} className="text-teal-600 mt-1" />
                <div>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    ProPair <strong>ne rembourse aucun frais</strong> en cas de déception liée à :
                  </p>
                  <ul className="text-slate-600 space-y-2 mb-4">
                    <li>• La qualité des travaux d'un entrepreneur</li>
                    <li>• Le comportement d'un client</li>
                  </ul>
                  <p className="text-slate-600">
                    Ces litiges doivent être réglés <strong>directement entre les parties</strong>, en utilisant au besoin l'historique des conversations fourni par ProPair.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600 text-sm font-bold">5</span>
              Contact facturation
            </h2>
            <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center">
                  <Mail size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-slate-600 mb-1">Pour toute réclamation :</p>
                  <a
                    href="mailto:billing@propairapp.com"
                    className="text-xl font-bold text-teal-600 hover:underline"
                  >
                    billing@propairapp.com
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Related Links */}
          <section className="mb-12">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Documents connexes</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                to="/privacy"
                className="bg-slate-50 rounded-xl p-4 border border-slate-100 hover:border-teal-200 transition-colors flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center">
                  <ReceiptText size={18} className="text-teal-600" />
                </div>
                <span className="font-medium text-slate-900">Politique de confidentialité</span>
              </Link>
              <Link
                to="/terms"
                className="bg-slate-50 rounded-xl p-4 border border-slate-100 hover:border-teal-200 transition-colors flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center">
                  <ReceiptText size={18} className="text-teal-600" />
                </div>
                <span className="font-medium text-slate-900">Conditions d'utilisation</span>
              </Link>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
