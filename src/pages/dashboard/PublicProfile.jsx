import { useOutletContext } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Smartphone, ExternalLink } from 'lucide-react';

export default function PublicProfile() {
  useOutletContext();

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-4xl">
      <Helmet><title>Profil Public — Mon Espace ProPair</title></Helmet>
      <header className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-slate-900"
        >
          Mon Profil Public
        </motion.h1>
        <p className="text-slate-500 mt-1">
          Gérez votre profil visible par les clients.
        </p>
      </header>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-slate-100 p-12 text-center"
      >
        <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Smartphone size={32} className="text-teal-600" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-3">
          Gérez votre profil depuis l'application
        </h2>
        <p className="text-slate-500 max-w-md mx-auto mb-8">
          Pour modifier votre profil public, vos photos de réalisations, vos certifications et votre zone de service, utilisez l'application mobile ProPair.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://apps.apple.com/app/propair"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold text-sm hover:bg-slate-800 transition-colors"
          >
            App Store
            <ExternalLink size={14} />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.propair"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold text-sm hover:bg-slate-800 transition-colors"
          >
            Google Play
            <ExternalLink size={14} />
          </a>
        </div>
      </motion.section>
    </div>
  );
}
