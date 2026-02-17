import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const ToastContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

let toastCounter = 0;

export function ToastProvider({ children }) {
  const { t } = useLanguage();
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef(new Map());

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((timerId) => clearTimeout(timerId));
      timers.clear();
    };
  }, []);

  const addToast = useCallback((message, type = 'info') => {
    const id = ++toastCounter;
    setToasts((prev) => [...prev, { id, message, type }]);

    const timerId = setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
      timersRef.current.delete(id);
    }, 4000);
    timersRef.current.set(id, timerId);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timerId = timersRef.current.get(id);
    if (timerId) {
      clearTimeout(timerId);
      timersRef.current.delete(id);
    }
  }, []);

  // Helper methods for different toast types
  const toast = {
    success: (msg) => addToast(msg, 'success'),
    error: (msg) => addToast(msg, 'error'),
    info: (msg) => addToast(msg, 'info'),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}

      {/* Toast Container - Fixed bottom right */}
      <div
        className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-50 flex flex-col gap-2 pointer-events-none"
        role="region"
        aria-label="Notifications"
        aria-live="polite"
      >
        <AnimatePresence>
          {toasts.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              layout
              role="alert"
              className={`
                pointer-events-auto w-full sm:min-w-[300px] sm:max-w-[400px] p-4 rounded-xl shadow-lg border flex items-start gap-3
                ${item.type === 'success' ? 'bg-white border-teal-100 text-teal-800' : ''}
                ${item.type === 'error' ? 'bg-white border-red-200 text-red-700' : ''}
                ${item.type === 'info' ? 'bg-slate-900 border-slate-700 text-white' : ''}
              `}
            >
              <div className="mt-0.5 shrink-0">
                {item.type === 'success' && <CheckCircle size={18} className="text-teal-600" />}
                {item.type === 'error' && <AlertCircle size={18} className="text-red-500" />}
                {item.type === 'info' && <Info size={18} className="text-blue-400" />}
              </div>
              <p className="text-sm font-medium flex-1">{item.message}</p>
              <button
                onClick={() => removeToast(item.id)}
                className="opacity-50 hover:opacity-100 transition-opacity shrink-0"
                aria-label={t('common.closeNotification')}
              >
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
