import { Component } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { translations } from '../i18n';
import { STORAGE_KEYS } from '../lib/constants';

function getTranslations() {
  try {
    const lang = localStorage.getItem(STORAGE_KEYS.LANGUAGE) || 'fr';
    return translations[lang] || translations.fr;
  } catch {
    return translations.fr;
  }
}

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      const t = getTranslations();

      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 font-sans">
          <div className="max-w-md w-full text-center">
            <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-amber-100">
              <AlertTriangle size={32} className="text-amber-600" aria-hidden="true" />
            </div>

            <h1 className="text-2xl font-bold text-slate-900 mb-3">
              {t.errorBoundary.title}
            </h1>

            <p className="text-slate-500 mb-8">
              {t.errorBoundary.desc}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleReload}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-black text-white font-semibold rounded-xl transition-colors shadow-sm"
              >
                <RefreshCw size={20} aria-hidden="true" />
                {t.errorBoundary.refresh}
              </button>
              <a
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-900 font-semibold rounded-xl transition-colors border border-slate-200"
              >
                <Home size={20} aria-hidden="true" />
                {t.errorBoundary.home}
              </a>
            </div>

            {import.meta.env.DEV && this.state.error && (
              <details className="mt-8 text-left">
                <summary className="text-sm text-slate-500 cursor-pointer hover:text-slate-900 transition-colors">
                  {t.errorBoundary.details}
                </summary>
                <pre className="mt-2 p-4 bg-white rounded-xl border border-slate-200 text-xs text-red-600 overflow-auto shadow-inner">
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
