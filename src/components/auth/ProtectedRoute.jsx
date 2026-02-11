import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // Loader pendant la vérification de session
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-teal-100 border-t-teal-600 rounded-full animate-spin" />
          <span className="text-sm text-slate-500">Vérification...</span>
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
