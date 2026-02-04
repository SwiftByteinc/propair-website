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
          <div className="w-10 h-10 border-3 border-teal/20 border-t-teal rounded-full animate-spin" />
          <span className="text-sm text-muted">Vérification...</span>
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
