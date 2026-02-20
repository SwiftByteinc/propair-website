import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowLeft, Home } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

export default function NotFound() {
  const { t } = useLanguage();
  return (
    <div className="font-sans min-h-[70vh] flex items-center justify-center px-4 py-16">
      <SEO noIndex />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        {/* Icon */}
        <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle size={40} className="text-amber-600" />
        </div>

        {/* 404 Number */}
        <h1 className="text-6xl font-bold text-slate-900 mb-4">404</h1>

        {/* Message */}
        <h2 className="text-2xl font-semibold text-slate-900 mb-3">
          {t('notFound.title')}
        </h2>
        <p className="text-slate-500 mb-8">
          {t('notFound.desc')}
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-black text-white font-semibold rounded-xl transition-colors shadow-lg shadow-slate-900/10 active:scale-[0.98]"
          >
            <Home size={18} />
            {t('notFound.homeBtn')}
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl transition-colors border border-slate-200 hover:border-slate-300"
          >
            <ArrowLeft size={18} />
            {t('notFound.backBtn')}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
