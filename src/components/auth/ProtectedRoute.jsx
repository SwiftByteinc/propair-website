import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-cyan-100 border-t-cyan-600 rounded-full animate-spin" />
          <span className="text-sm text-slate-500">{t('common.verifying')}</span>
        </div>
      </div>
    );
  }

  if (!user) {
    // Redirige vers login, mais garde en mémoire la page demandée
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
