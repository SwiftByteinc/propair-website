import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User,
  MapPin,
  Plus,
  Pencil,
  Trash2,
  Home,
  Building2,
  TreePine,
  Save,
  CheckCircle2
} from 'lucide-react';

// Mock client data
const MOCK_CLIENT_DATA = {
  fullName: 'Marie Lapointe',
  email: 'marie.lapointe@gmail.com',
  phone: '+1 514-555-1234',
  addresses: [
    { id: 1, label: 'Maison principale', address: '1234 Rue Saint-Denis, Montréal, QC H2J 2L3', type: 'home', isDefault: true },
    { id: 2, label: 'Chalet', address: '567 Chemin du Lac, Mont-Tremblant, QC J8E 1T4', type: 'cottage' },
    { id: 3, label: 'Bureau', address: '890 Boulevard René-Lévesque, Montréal, QC H3B 1Y7', type: 'office' },
  ]
};

const ADDRESS_TYPES = [
  { id: 'home', label: 'Maison', icon: Home },
  { id: 'cottage', label: 'Chalet', icon: TreePine },
  { id: 'office', label: 'Bureau', icon: Building2 },
];

export default function ClientInfo() {
  const { user } = useOutletContext();
  const [clientData, setClientData] = useState(MOCK_CLIENT_DATA);
  const [editingAddress, setEditingAddress] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleAddAddress = () => {
    const newAddress = {
      id: Date.now(),
      label: '',
      address: '',
      type: 'home',
      isDefault: false,
      isNew: true
    };
    setClientData({
      ...clientData,
      addresses: [...clientData.addresses, newAddress]
    });
    setEditingAddress(newAddress.id);
  };

  const handleDeleteAddress = (id) => {
    if (confirm('Supprimer cette adresse?')) {
      setClientData({
        ...clientData,
        addresses: clientData.addresses.filter(a => a.id !== id)
      });
    }
  };

  const handleSetDefault = (id) => {
    setClientData({
      ...clientData,
      addresses: clientData.addresses.map(a => ({
        ...a,
        isDefault: a.id === id
      }))
    });
  };

  const getAddressIcon = (type) => {
    const found = ADDRESS_TYPES.find(t => t.id === type);
    return found ? found.icon : Home;
  };

  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <header className="mb-8 flex items-center justify-between">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-gray-900"
          >
            Mes Informations
          </motion.h1>
          <p className="text-gray-500 mt-1">
            Gérez vos informations personnelles et vos adresses de chantier.
          </p>
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleSave}
          disabled={isSaving}
          className={`px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all ${
            saveSuccess
              ? 'bg-green-500 text-white'
              : 'bg-teal text-white hover:bg-teal-dark'
          }`}
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Sauvegarde...
            </>
          ) : saveSuccess ? (
            <>
              <CheckCircle2 size={16} />
              Sauvegardé !
            </>
          ) : (
            <>
              <Save size={16} />
              Sauvegarder
            </>
          )}
        </motion.button>
      </header>

      <div className="space-y-8">
        {/* Personal Info */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
              <User size={16} className="text-gray-400" />
            </div>
            <h2 className="font-bold text-gray-900">Informations personnelles</h2>
          </div>

          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom complet
                </label>
                <input
                  type="text"
                  value={clientData.fullName}
                  onChange={(e) => setClientData({ ...clientData, fullName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse courriel
                </label>
                <input
                  type="email"
                  value={clientData.email}
                  onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                value={clientData.phone}
                onChange={(e) => setClientData({ ...clientData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all md:max-w-xs"
              />
            </div>
          </div>
        </motion.section>

        {/* Addresses */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                <MapPin size={16} className="text-gray-400" />
              </div>
              <h2 className="font-bold text-gray-900">Adresses de chantier</h2>
            </div>
            <button
              onClick={handleAddAddress}
              className="px-4 py-2 bg-teal/10 text-teal rounded-lg font-semibold text-sm hover:bg-teal/20 transition-colors flex items-center gap-2"
            >
              <Plus size={16} />
              Ajouter
            </button>
          </div>

          <div className="p-6 space-y-4">
            {clientData.addresses.map((address) => {
              const Icon = getAddressIcon(address.type);
              const isEditing = editingAddress === address.id;

              return (
                <div
                  key={address.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isEditing ? 'border-teal bg-teal/5' : 'border-gray-100 bg-gray-50'
                  }`}
                >
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">
                            Nom de l'adresse
                          </label>
                          <input
                            type="text"
                            value={address.label}
                            onChange={(e) => setClientData({
                              ...clientData,
                              addresses: clientData.addresses.map(a =>
                                a.id === address.id ? { ...a, label: e.target.value } : a
                              )
                            })}
                            placeholder="Ex: Maison principale"
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-teal focus:ring-2 focus:ring-teal/20 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">
                            Type
                          </label>
                          <select
                            value={address.type}
                            onChange={(e) => setClientData({
                              ...clientData,
                              addresses: clientData.addresses.map(a =>
                                a.id === address.id ? { ...a, type: e.target.value } : a
                              )
                            })}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-teal focus:ring-2 focus:ring-teal/20 text-sm"
                          >
                            {ADDRESS_TYPES.map(type => (
                              <option key={type.id} value={type.id}>{type.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                          Adresse complète
                        </label>
                        <input
                          type="text"
                          value={address.address}
                          onChange={(e) => setClientData({
                            ...clientData,
                            addresses: clientData.addresses.map(a =>
                              a.id === address.id ? { ...a, address: e.target.value } : a
                            )
                          })}
                          placeholder="1234 Rue Exemple, Ville, Province Code Postal"
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-teal focus:ring-2 focus:ring-teal/20 text-sm"
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingAddress(null)}
                          className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium text-sm"
                        >
                          Terminer
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-gray-400">
                          <Icon size={20} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-900">{address.label || 'Sans nom'}</p>
                            {address.isDefault && (
                              <span className="text-[10px] font-bold px-2 py-0.5 bg-teal/10 text-teal rounded-full uppercase">
                                Par défaut
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">{address.address || 'Adresse non renseignée'}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {!address.isDefault && (
                          <button
                            onClick={() => handleSetDefault(address.id)}
                            className="px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-teal hover:bg-teal/10 rounded-lg transition-colors"
                          >
                            Par défaut
                          </button>
                        )}
                        <button
                          onClick={() => setEditingAddress(address.id)}
                          className="p-2 text-gray-400 hover:text-teal hover:bg-teal/10 rounded-lg transition-colors"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteAddress(address.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {clientData.addresses.length === 0 && (
              <div className="text-center py-12">
                <MapPin size={48} className="mx-auto text-gray-200 mb-4" />
                <p className="text-gray-500">Aucune adresse enregistrée</p>
                <p className="text-sm text-gray-400">Ajoutez vos adresses de chantier pour ne pas avoir à les ressaisir.</p>
              </div>
            )}
          </div>
        </motion.section>

        {/* Tip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="p-4 bg-blue-50 border border-blue-100 rounded-xl"
        >
          <p className="text-sm text-blue-800">
            <strong>Astuce :</strong> Enregistrez vos adresses de chantier ici pour gagner du temps lors de la création de projets dans l'application mobile.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
