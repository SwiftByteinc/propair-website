import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CreditCard,
  Download,
  Crown,
  ExternalLink
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function Billing() {
  const { subscription, isPro } = useOutletContext();
  const toast = useToast();

  // Formatage dynamique de la date (Correction Hardcode)
  const formatDate = (timestamp) => {
    if (!timestamp) return 'Non disponible';
    // Support both Unix timestamp (seconds) and ISO string
    const date = typeof timestamp === 'number'
      ? new Date(timestamp * 1000)
      : new Date(timestamp);
    return date.toLocaleDateString('fr-CA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const renewalDate = subscription?.current_period_end
    ? formatDate(subscription.current_period_end)
    : 'Aucun abonnement actif';

  // Placeholder : Sera remplacé par un fetch réel vers l'API Stripe
  const invoices = [];

  const handleStripePortal = () => {
    toast.info('Redirection vers le portail de paiement sécurisé...');
    // TODO: Appel API backend pour créer la session portail
    // window.location.href = sessionUrl;
  };

  const handleDownloadInvoice = (invoiceId) => {
    toast.success(`Téléchargement de la facture ${invoiceId}...`);
  };

  return (
    <div className="p-8 max-w-4xl">
      <header className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-gray-900"
        >
          Abonnement
        </motion.h1>
        <p className="text-gray-500 mt-1">
          {isPro ? 'Gérez votre abonnement ProPair.' : 'Passez à la vitesse supérieure.'}
        </p>
      </header>

      <div className="space-y-6">
        {isPro ? (
          <>
            {/* Status Card */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-teal-50 to-white rounded-2xl border border-teal-100 p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center">
                    <Crown size={24} className="text-teal-700" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-teal-600 uppercase tracking-wider">Plan actif</p>
                    <p className="text-xl font-bold text-gray-900">ProPair Élite</p>
                    <p className="text-sm text-gray-500">
                      Renouvellement le : {renewalDate}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleStripePortal}
                  className="px-5 py-2.5 bg-white text-gray-700 rounded-xl font-semibold text-sm border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all flex items-center gap-2"
                >
                  Gérer sur Stripe
                  <ExternalLink size={14} />
                </button>
              </div>
            </motion.section>

            {/* Invoices */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                  <CreditCard size={16} className="text-gray-400" />
                </div>
                <h2 className="font-bold text-gray-900">Factures récentes</h2>
              </div>

              <div className="divide-y divide-gray-50">
                {invoices.length > 0 ? (
                  invoices.map((invoice) => (
                    <div key={invoice.id} className="px-6 py-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{invoice.id}</p>
                        <p className="text-xs text-gray-400">{formatDate(invoice.created)}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-semibold text-gray-900">{invoice.amount}$</span>
                        <button
                          onClick={() => handleDownloadInvoice(invoice.id)}
                          className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                          aria-label={`Télécharger la facture ${invoice.id}`}
                        >
                          <Download size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-6 py-8 text-center text-sm text-gray-400 bg-gray-50/50">
                    Aucune facture disponible pour le moment.
                  </div>
                )}
              </div>
            </motion.section>
          </>
        ) : (
          /* Non-Pro State : Redirection vers Pricing */
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 bg-white rounded-2xl border border-gray-100"
          >
            <Crown size={48} className="mx-auto text-amber-500 mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Aucun abonnement actif</h2>
            <p className="text-gray-500 mb-6">Passez Pro pour débloquer toutes les fonctionnalités.</p>
            <button
              onClick={() => window.location.href = '/pricing'}
              className="px-6 py-3 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition-colors"
            >
              Voir les offres
            </button>
          </motion.section>
        )}
      </div>
    </div>
  );
}
