import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CreditCard,
  Download,
  Crown,
  Zap,
  Check,
  Shield,
  Lock,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export default function Billing() {
  const { user, subscription, isPro } = useOutletContext();

  // Format subscription end date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('fr-CA', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const renewalDate = subscription?.current_period_end
    ? formatDate(subscription.current_period_end)
    : '15 fév 2026';

  // Placeholder invoices - will be connected to Stripe when Edge Functions are ready
  const invoices = [];

  const handleStripeCheckout = () => {
    // TODO: Connect to Stripe Edge Function
    alert('Redirection vers Stripe Checkout...\n\nÀ connecter avec les Edge Functions Supabase.');
  };

  const handleStripePortal = () => {
    // TODO: Connect to Stripe Edge Function
    alert('Redirection vers Stripe Customer Portal...\n\nÀ connecter avec les Edge Functions Supabase.');
  };

  const handleDownloadInvoice = (invoiceId) => {
    alert(`Téléchargement de ${invoiceId}...`);
  };

  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <header className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-gray-900"
        >
          Abonnement
        </motion.h1>
        <p className="text-gray-500 mt-1">
          {isPro ? 'Gérez votre abonnement ProPair.' : 'Débloquez tout le potentiel de ProPair.'}
        </p>
      </header>

      <div className="space-y-6">

        {isPro ? (
          /* ═══════════════════════════════════════════════════════════════
             UTILISATEUR PRO - Gestion de l'abonnement
          ═══════════════════════════════════════════════════════════════ */
          <>
            {/* Status Card */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-teal/10 to-teal/5 rounded-2xl border border-teal/20 p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-teal/20 flex items-center justify-center">
                    <Crown size={24} className="text-teal" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-teal uppercase tracking-wider">Plan actif</p>
                    <p className="text-xl font-bold text-gray-900">ProPair Élite</p>
                    <p className="text-sm text-gray-500">29$/mois • Renouv. le {renewalDate}</p>
                  </div>
                </div>
                <button
                  onClick={handleStripePortal}
                  className="px-5 py-2.5 bg-white text-gray-700 rounded-xl font-semibold text-sm border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all flex items-center gap-2"
                >
                  Gérer
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
                <h2 className="font-bold text-gray-900">Factures</h2>
              </div>

              <div className="divide-y divide-gray-50">
                {invoices.length > 0 ? (
                  invoices.map((invoice) => (
                    <div
                      key={invoice.id}
                      className="px-6 py-4 flex items-center justify-between"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900">{invoice.id}</p>
                        <p className="text-xs text-gray-400">{invoice.date}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-semibold text-gray-900">{invoice.amount}$</span>
                        <button
                          onClick={() => handleDownloadInvoice(invoice.id)}
                          className="p-2 text-gray-400 hover:text-teal hover:bg-teal/10 rounded-lg transition-colors"
                        >
                          <Download size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-6 py-8 text-center text-sm text-gray-400">
                    Aucune facture disponible
                  </div>
                )}
              </div>
            </motion.section>
          </>
        ) : (
          /* ═══════════════════════════════════════════════════════════════
             UTILISATEUR GRATUIT - Paywall de conversion
          ═══════════════════════════════════════════════════════════════ */
          <>
            {/* Hero Paywall */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
            >
              <div className="p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-teal/10 flex items-center justify-center mx-auto mb-6">
                  <Crown size={32} className="text-teal" />
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Débloquez des connexions illimitées
                </h2>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  Connectez-vous avec tous vos clients potentiels. Gardez 100% de vos profits.
                </p>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">29$</span>
                  <span className="text-gray-500">/mois</span>
                </div>

                {/* Features */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 mb-8 text-sm">
                  <span className="flex items-center justify-center gap-2 text-gray-600">
                    <Check size={16} className="text-teal" />
                    Connexions illimitées
                  </span>
                  <span className="flex items-center justify-center gap-2 text-gray-600">
                    <Check size={16} className="text-teal" />
                    0% de commission
                  </span>
                  <span className="flex items-center justify-center gap-2 text-gray-600">
                    <Check size={16} className="text-teal" />
                    Support prioritaire
                  </span>
                </div>

                {/* CTA Button */}
                <button
                  onClick={handleStripeCheckout}
                  className="w-full sm:w-auto px-8 py-4 bg-teal text-white rounded-xl font-bold text-base hover:bg-teal-dark hover:shadow-lg hover:shadow-teal/20 transition-all flex items-center justify-center gap-2 mx-auto"
                >
                  <CreditCard size={20} />
                  Passer à Pro maintenant
                  <ChevronRight size={18} />
                </button>

                {/* Security */}
                <div className="mt-6 flex items-center justify-center gap-6 text-xs text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <Lock size={12} />
                    Paiement sécurisé
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Shield size={12} />
                    Annulable à tout moment
                  </span>
                </div>
              </div>

              {/* Stripe Badge */}
              <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-center gap-2">
                <span className="text-xs text-gray-400">Paiement sécurisé par</span>
                <svg className="h-5" viewBox="0 0 60 25" fill="none">
                  <path d="M59.64 14.28c0-4.82-2.33-8.63-6.79-8.63-4.48 0-7.18 3.81-7.18 8.59 0 5.67 3.19 8.54 7.78 8.54 2.24 0 3.93-.51 5.21-1.22v-3.76c-1.28.64-2.74 1.04-4.6 1.04-1.82 0-3.44-.64-3.65-2.87h9.19c0-.25.04-1.23.04-1.69zm-9.28-1.79c0-2.13 1.3-3.02 2.49-3.02 1.15 0 2.38.89 2.38 3.02h-4.87zM38.35 5.65c-1.83 0-3.01.86-3.67 1.46l-.24-1.16h-4.15v21.68l4.71-1v-5.26c.67.49 1.66 1.18 3.3 1.18 3.34 0 6.38-2.69 6.38-8.59-.01-5.42-3.09-8.31-6.33-8.31zm-1.11 12.78c-1.1 0-1.75-.4-2.2-.89v-7.03c.49-.54 1.16-.94 2.2-.94 1.68 0 2.84 1.89 2.84 4.42 0 2.58-1.14 4.44-2.84 4.44zM24.87 4.8l4.73-1.01V0l-4.73 1v3.8zM24.87 5.89h4.73v16.29h-4.73V5.89zM19.64 7.28l-.3-1.39h-4.08v16.29h4.71v-11.04c1.11-1.45 3-1.18 3.58-.98V5.89c-.6-.22-2.8-.64-3.91 1.39zM10.34 2.12l-4.6.98-.02 14.91c0 2.76 2.07 4.79 4.83 4.79 1.53 0 2.65-.28 3.27-.61v-3.83c-.6.24-3.56 1.1-3.56-1.66V9.78h3.56V5.89h-3.56l.08-3.77zM.98 10.1c0-.66.55-1.05 1.45-1.05 1.3 0 2.94.39 4.24 1.1V6.06a11.3 11.3 0 00-4.24-.78C.9 5.28 0 6.93 0 9.17c0 3.57 4.91 3 4.91 4.54 0 .78-.68 1.04-1.63 1.04-1.41 0-3.22-.58-4.65-1.36v4.12c1.58.68 3.18.98 4.65.98 3.63 0 5.72-1.47 5.72-3.82 0-3.85-4.93-3.17-4.93-4.57h-.09z" fill="#635BFF"/>
                </svg>
              </div>
            </motion.section>

            {/* Guarantee */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center text-xs text-gray-400"
            >
              Satisfait ou remboursé pendant 14 jours. Sans engagement.
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
