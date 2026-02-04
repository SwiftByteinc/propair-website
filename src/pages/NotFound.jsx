import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        {/* Icon */}
        <div className="w-20 h-20 bg-amber/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle size={40} className="text-amber" />
        </div>

        {/* 404 Number */}
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>

        {/* Message */}
        <h2 className="text-2xl font-bold text-primary mb-3">
          Page introuvable
        </h2>
        <p className="text-muted mb-8">
          Oups ! La page que vous recherchez n'existe pas ou a été déplacée.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-teal hover:bg-teal-dark text-white font-semibold rounded-xl transition-colors"
          >
            <Home size={18} />
            Retour à l'accueil
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-surface hover:bg-border text-primary font-semibold rounded-xl transition-colors border border-border"
          >
            <ArrowLeft size={18} />
            Page précédente
          </button>
        </div>
      </motion.div>
    </div>
  );
}
