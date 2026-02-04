import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogIn, Briefcase, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, profile } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Gestion du scroll pour l'effet de fond
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu mobile lors d'un changement de page
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Désactiver le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Notre Histoire', path: '/about' },
    { name: 'Abonnements Pro', path: '/pricing' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-slate-200'
            : 'bg-white/80 backdrop-blur-sm border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            {/* Logo */}
            <Link
              to="/"
              className="group focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg p-1"
              aria-label="Retour à l'accueil ProPair"
            >
              <div className="flex items-center gap-2">
                <img
                  src="/images/logo_ProPair.jpg"
                  alt=""
                  className="h-12 w-auto transition-all group-hover:scale-105"
                  aria-hidden="true"
                />
                <span className="sr-only">ProPair</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8" aria-label="Navigation principale">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-md px-2 py-1 ${
                    isActive(link.path)
                      ? 'text-teal-600'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  aria-current={isActive(link.path) ? 'page' : undefined}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-3">
              {user ? (
                // Connected State
                <Link
                  to="/portal"
                  className="flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white rounded-full transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                  aria-label="Accéder à mon portail"
                >
                  <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center font-bold text-sm" aria-hidden="true">
                    {profile?.full_name?.charAt(0)?.toUpperCase() || <User size={14}/>}
                  </div>
                  <span className="text-sm font-semibold">
                    {profile?.full_name?.split(' ')[0] || 'Mon Compte'}
                  </span>
                </Link>
              ) : (
                // Not Connected State
                <>
                  <Link
                    to="/login"
                    className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-full"
                  >
                    <LogIn size={16} aria-hidden="true" />
                    Connexion
                  </Link>
                  <Link
                    to="/pricing"
                    className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-teal-700 border-2 border-teal-600/20 rounded-full hover:bg-teal-50 transition-all focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <Briefcase size={16} aria-hidden="true" />
                    Espace Pro
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button - A11y Enhanced */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Fermer le menu de navigation" : "Ouvrir le menu de navigation"}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 md:hidden"
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu principal"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-50 md:hidden shadow-2xl border-l border-slate-100 flex flex-col"
            >
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <span className="font-bold text-lg text-slate-900">Menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Fermer le menu"
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>

              {/* Mobile User Info */}
              {user && (
                <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center font-bold text-lg shadow-sm">
                      {profile?.full_name?.charAt(0) || <User size={20}/>}
                    </div>
                    <div className="overflow-hidden">
                      <p className="font-bold text-slate-900 truncate">{profile?.full_name || 'Utilisateur'}</p>
                      <p className="text-sm text-slate-500 truncate">{user.email}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile Links */}
              <nav className="flex-1 p-6 space-y-2 overflow-y-auto" aria-label="Navigation mobile">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-base font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                      isActive(link.path)
                        ? 'bg-teal-50 text-teal-700'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                    aria-current={isActive(link.path) ? 'page' : undefined}
                  >
                    {link.name}
                  </Link>
                ))}

                {user && (
                  <Link
                    to="/portal"
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-base font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                      isActive('/portal') ? 'bg-teal-50 text-teal-700' : 'text-teal-700 hover:bg-teal-50'
                    }`}
                  >
                    Mon Tableau de bord
                  </Link>
                )}
              </nav>

              {/* Mobile Actions Footer */}
              <div className="p-6 border-t border-slate-100 space-y-3 bg-white">
                {user ? (
                  <Link
                    to="/portal"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-3 w-full px-5 py-3.5 text-sm font-bold bg-slate-900 text-white rounded-xl hover:bg-black transition-all shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
                  >
                    Accéder à mon espace
                  </Link>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      Connexion
                    </Link>
                    <Link
                      to="/pricing"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                      S'inscrire
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
