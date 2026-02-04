import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Save,
  Upload,
  X,
  Plus,
  MapPin,
  FileText,
  Image,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

// Mock profile data
const MOCK_PROFILE = {
  businessName: 'Plomberie Tremblay & Fils',
  bio: 'Plombier certifié avec plus de 15 ans d\'expérience dans la région de Montréal. Spécialisé dans les rénovations de salle de bain, installation de chauffe-eau et réparations d\'urgence. Service rapide et professionnel garanti.',
  specialties: ['Plomberie résidentielle', 'Chauffe-eau', 'Rénovation salle de bain'],
  serviceRadius: 50,
  serviceCities: ['Montréal', 'Laval', 'Longueuil', 'Brossard'],
  photos: [
    { id: 1, url: '/images/work-1.jpg', caption: 'Rénovation complète salle de bain' },
    { id: 2, url: '/images/work-2.jpg', caption: 'Installation chauffe-eau' },
    { id: 3, url: '/images/work-3.jpg', caption: 'Plomberie cuisine moderne' },
  ],
  certifications: [
    { id: 1, name: 'Licence RBQ', number: '5123-4567-89', verified: true },
    { id: 2, name: 'Assurance responsabilité', verified: true },
  ]
};

export default function PublicProfile() {
  const { user } = useOutletContext();
  const [profile, setProfile] = useState(MOCK_PROFILE);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
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
            Mon Profil Public
          </motion.h1>
          <p className="text-gray-500 mt-1">
            Ces informations sont visibles par les clients sur l'application.
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
        {/* Business Info */}
        <Section title="Informations de l'entreprise" icon={FileText}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom de l'entreprise
              </label>
              <input
                type="text"
                value={profile.businessName}
                onChange={(e) => setProfile({ ...profile, businessName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio / Description de vos services
              </label>
              <textarea
                rows={5}
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                placeholder="Décrivez votre expérience, vos spécialités et ce qui vous distingue..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all resize-none"
              />
              <p className="text-xs text-gray-400 mt-2">
                {profile.bio.length} / 500 caractères
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Spécialités
              </label>
              <div className="flex flex-wrap gap-2">
                {profile.specialties.map((spec, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-teal/10 text-teal rounded-full text-sm"
                  >
                    {spec}
                    <button className="hover:text-red-500 transition-colors">
                      <X size={14} />
                    </button>
                  </span>
                ))}
                <button className="inline-flex items-center gap-1 px-3 py-1.5 border border-dashed border-gray-300 text-gray-500 rounded-full text-sm hover:border-teal hover:text-teal transition-colors">
                  <Plus size={14} />
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </Section>

        {/* Photo Gallery */}
        <Section title="Galerie de réalisations" icon={Image}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {profile.photos.map((photo) => (
              <div
                key={photo.id}
                className="aspect-square rounded-xl bg-gray-100 relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  <Image size={32} className="text-gray-400" />
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="p-2 bg-white/20 rounded-full hover:bg-red-500 transition-colors">
                    <X size={20} className="text-white" />
                  </button>
                </div>
                <p className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 text-white text-xs truncate">
                  {photo.caption}
                </p>
              </div>
            ))}

            {/* Upload Button */}
            <label className="aspect-square rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-teal hover:bg-teal/5 transition-all">
              <Upload size={24} className="text-gray-400 mb-2" />
              <span className="text-sm text-gray-500">Ajouter</span>
              <input type="file" className="hidden" accept="image/*" multiple />
            </label>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Glissez-déposez vos photos ou cliquez pour téléverser. Max 10 photos, 5MB chacune.
          </p>
        </Section>

        {/* Service Area */}
        <Section title="Zone de service" icon={MapPin}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rayon de déplacement : <strong>{profile.serviceRadius} km</strong>
              </label>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={profile.serviceRadius}
                onChange={(e) => setProfile({ ...profile, serviceRadius: parseInt(e.target.value) })}
                className="w-full accent-teal"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>10 km</span>
                <span>100 km</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Villes desservies
              </label>
              <div className="flex flex-wrap gap-2">
                {profile.serviceCities.map((city, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    <MapPin size={12} />
                    {city}
                    <button className="hover:text-red-500 transition-colors">
                      <X size={14} />
                    </button>
                  </span>
                ))}
                <button className="inline-flex items-center gap-1 px-3 py-1.5 border border-dashed border-gray-300 text-gray-500 rounded-full text-sm hover:border-teal hover:text-teal transition-colors">
                  <Plus size={14} />
                  Ajouter une ville
                </button>
              </div>
            </div>
          </div>
        </Section>

        {/* Certifications */}
        <Section title="Certifications & Assurances" icon={FileText}>
          <div className="space-y-3">
            {profile.certifications.map((cert) => (
              <div
                key={cert.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    cert.verified ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
                  }`}>
                    {cert.verified ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{cert.name}</p>
                    {cert.number && (
                      <p className="text-xs text-gray-500">N° {cert.number}</p>
                    )}
                  </div>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                  cert.verified
                    ? 'bg-green-100 text-green-700'
                    : 'bg-amber-100 text-amber-700'
                }`}>
                  {cert.verified ? 'Vérifié' : 'En attente'}
                </span>
              </div>
            ))}

            {/* Upload Certification */}
            <label className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-teal hover:bg-teal/5 transition-all">
              <Upload size={18} className="text-gray-400" />
              <span className="text-sm text-gray-500">Téléverser un document (PDF)</span>
              <input type="file" className="hidden" accept=".pdf" />
            </label>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Vos certifications seront vérifiées par notre équipe sous 24-48h.
          </p>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, icon: Icon, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
    >
      <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
          <Icon size={16} className="text-gray-400" />
        </div>
        <h2 className="font-bold text-gray-900">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </motion.section>
  );
}
