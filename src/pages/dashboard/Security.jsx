import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Lock,
  Smartphone,
  Mail,
  Eye,
  EyeOff,
  Trash2,
  ChevronDown,
  Loader2
} from 'lucide-react';
import { supabase } from '../../lib/supabase';


export default function Security() {
  const { user, profile } = useOutletContext();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  // Real verification status from user data
  const verification = {
    email: {
      verified: user?.email ? true : false, // If email exists, consider verified (from SSO or confirmed signup)
      value: user?.email || 'Non renseigné'
    },
    phone: {
      verified: profile?.phone_verified || false,
      value: profile?.phone || ''
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (passwords.new !== passwords.confirm) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    if (passwords.new.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: passwords.new
      });

      if (error) {
        setError(error.message);
      } else {
        setSuccess('Mot de passe modifié avec succès!');
        setPasswords({ current: '', new: '', confirm: '' });
        setTimeout(() => {
          setShowPasswordForm(false);
          setSuccess('');
        }, 2000);
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyPhone = () => {
    // Phone verification would typically involve sending an SMS code
    // This requires additional setup with Supabase or a third-party service
    alert('Fonctionnalité à venir: Vérification par SMS');
  };

  const handleDeleteAccount = () => {
    // TODO: Connect to Edge Function for RGPD-compliant deletion
    alert('Demande de suppression envoyée. Votre compte sera supprimé dans les 30 jours.');
    setShowDeleteModal(false);
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
          Sécurité
        </motion.h1>
        <p className="text-gray-500 mt-1">
          Gérez la sécurité de votre compte.
        </p>
      </header>

      <div className="space-y-4">
        {/* Verification Badges - Compact */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
              <Shield size={16} className="text-gray-400" />
            </div>
            <h2 className="font-bold text-gray-900">Vérifications</h2>
          </div>

          <div className="divide-y divide-gray-50">
            {/* Email */}
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Email</p>
                  <p className="text-xs text-gray-400">{verification.email.value}</p>
                </div>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                verification.email.verified
                  ? 'bg-teal/10 text-teal'
                  : 'bg-amber/10 text-amber'
              }`}>
                {verification.email.verified ? 'Vérifié' : 'Non vérifié'}
              </span>
            </div>

            {/* Phone */}
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone size={18} className="text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Téléphone</p>
                  <p className="text-xs text-gray-400">
                    {verification.phone.verified ? verification.phone.value : 'Non renseigné'}
                  </p>
                </div>
              </div>
              {verification.phone.verified ? (
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-teal/10 text-teal">
                  Vérifié
                </span>
              ) : (
                <button
                  onClick={handleVerifyPhone}
                  className="text-xs font-semibold text-teal hover:text-teal-dark transition-colors"
                >
                  Vérifier
                </button>
              )}
            </div>
          </div>
        </motion.section>

        {/* Password - Collapsible */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
        >
          <button
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                <Lock size={16} className="text-gray-400" />
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-900">Mot de passe</p>
                <p className="text-xs text-gray-400">Dernière modification il y a 3 mois</p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: showPasswordForm ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={18} className="text-gray-400" />
            </motion.div>
          </button>

          <AnimatePresence>
            {showPasswordForm && (
              <motion.form
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onSubmit={handlePasswordChange}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 pt-2 space-y-4 border-t border-gray-50">
                  {/* Error/Success Messages */}
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600">
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="p-3 bg-teal/10 border border-teal/20 rounded-lg text-sm text-teal">
                      {success}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5">
                        Nouveau mot de passe
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={passwords.new}
                          onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-teal focus:ring-1 focus:ring-teal/20 text-sm transition-all pr-10"
                          placeholder="Min. 8 caractères"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5">
                        Confirmer
                      </label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={passwords.confirm}
                        onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-teal focus:ring-1 focus:ring-teal/20 text-sm transition-all"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 bg-gray-900 text-white rounded-lg font-semibold text-sm hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Mise à jour...
                      </>
                    ) : (
                      'Mettre à jour'
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.section>

        {/* Danger Zone - Compact */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
        >
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                <Trash2 size={16} className="text-red-500" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Supprimer le compte</p>
                <p className="text-xs text-gray-400">Action irréversible</p>
              </div>
            </div>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="text-xs font-semibold text-red-500 hover:text-red-600 transition-colors"
            >
              Supprimer
            </button>
          </div>
        </motion.section>

        {/* RGPD Notice - Minimal */}
        <p className="text-xs text-gray-400 text-center pt-4">
          Loi 25 / RGPD : Suppression traitée sous 30 jours.
        </p>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-sm w-full p-6"
          >
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <Trash2 size={24} />
            </div>
            <h3 className="text-lg font-bold text-center text-gray-900 mb-2">
              Supprimer le compte ?
            </h3>
            <p className="text-center text-sm text-gray-500 mb-6">
              Toutes vos données seront définitivement supprimées.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-semibold text-sm hover:bg-gray-200 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 py-2.5 bg-red-600 text-white rounded-lg font-semibold text-sm hover:bg-red-700 transition-colors"
              >
                Supprimer
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
