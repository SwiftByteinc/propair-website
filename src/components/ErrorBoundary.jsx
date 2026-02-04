import { Component } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log uniquement en développement
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-surface flex items-center justify-center px-4 font-sans">
          <div className="max-w-md w-full text-center">
            {/* Icon */}
            <div className="w-20 h-20 bg-amber/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-amber/20">
              <AlertTriangle size={40} className="text-amber" />
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-primary mb-3">
              Oups ! Une erreur est survenue
            </h1>

            {/* Description */}
            <p className="text-muted mb-8">
              Nous sommes désolés, quelque chose s'est mal passé. Veuillez rafraîchir la page ou retourner à l'accueil.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleReload}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-teal hover:bg-teal-dark text-white font-semibold rounded-xl transition-colors shadow-sm"
              >
                <RefreshCw size={18} />
                Rafraîchir la page
              </button>
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-surface text-primary font-semibold rounded-xl transition-colors border border-border"
              >
                <Home size={18} />
                Retour à l'accueil
              </Link>
            </div>

            {/* Error details (development only) */}
            {import.meta.env.DEV && this.state.error && (
              <details className="mt-8 text-left">
                <summary className="text-sm text-muted cursor-pointer hover:text-primary transition-colors">
                  Détails de l'erreur (Dev Mode)
                </summary>
                <pre className="mt-2 p-4 bg-white rounded-xl border border-border text-xs text-red-600 overflow-auto shadow-inner">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
