import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogIn, Briefcase } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, profile } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

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
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-soft border-b border-border'
            : 'bg-white/80 backdrop-blur-sm border-b border-border'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="group">
              <img
                src="/images/logo_ProPair.jpg"
                alt="ProPair"
                className="h-16 w-auto transition-all group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-semibold transition-colors ${
                    isActive(link.path)
                      ? 'text-teal'
                      : 'text-body hover:text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-3">
              {user ? (
                // Connected State - User Account Button (Amber style)
                <Link
                  to="/portal"
                  className="flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-amber to-amber-dark hover:from-amber-dark hover:to-amber text-white rounded-full transition-all shadow-soft hover:shadow-lg"
                >
                  <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center font-bold text-sm">
                    {profile?.full_name?.charAt(0)?.toUpperCase() || 'U'}
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
                    className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-body hover:text-primary transition-colors"
                  >
                    <LogIn size={16} />
                    Connexion
                  </Link>
                  <Link
                    to="/login?redirect=billing"
                    className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-teal border-2 border-teal rounded-full hover:bg-teal hover:text-white transition-all"
                  >
                    <Briefcase size={16} />
                    Espace Pro
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-surface text-body hover:bg-border transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-primary/30 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu de navigation"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-white z-50 md:hidden shadow-float"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <Link to="/">
                    <img
                      src="/images/logo_ProPair.jpg"
                      alt="ProPair"
                      className="h-10 w-auto"
                    />
                  </Link>
                  <button
                    onClick={() => setIsOpen(false)}
                    aria-label="Fermer le menu"
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface text-body"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Mobile User Info (if connected) */}
                {user && (
                  <div className="p-6 border-b border-border bg-surface">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-teal/10 rounded-full flex items-center justify-center text-teal font-bold">
                        {profile?.full_name?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <p className="font-semibold text-primary">{profile?.full_name || 'Utilisateur'}</p>
                        <p className="text-sm text-muted">{profile?.email}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mobile Links */}
                <nav className="flex-1 p-6 space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`block px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                        isActive(link.path) ? 'bg-teal/10 text-teal' : 'text-body hover:bg-surface'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}

                  {/* Mobile Portal Link (if connected) */}
                  {user && (
                    <Link
                      to="/portal"
                      className={`block px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                        isActive('/portal') ? 'bg-teal/10 text-teal' : 'text-teal hover:bg-teal/5'
                      }`}
                    >
                      Mon Portail
                    </Link>
                  )}
                </nav>

                {/* Mobile Actions */}
                <div className="p-6 border-t border-border space-y-3">
                  {user ? (
                    <Link
                      to="/portal"
                      className="flex items-center justify-center gap-3 w-full px-5 py-3 text-sm font-semibold bg-gradient-to-r from-amber to-amber-dark text-white rounded-xl hover:from-amber-dark hover:to-amber transition-all shadow-soft"
                    >
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">
                        {profile?.full_name?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      Mon Compte
                    </Link>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="flex items-center justify-center gap-2 w-full px-5 py-3 text-sm font-semibold text-body border-2 border-border-dark rounded-xl hover:bg-surface transition-colors"
                      >
                        <LogIn size={18} />
                        Connexion
                      </Link>
                      <Link
                        to="/login?redirect=billing"
                        className="flex items-center justify-center gap-2 w-full px-5 py-3 text-sm font-semibold text-teal border-2 border-teal rounded-xl hover:bg-teal hover:text-white transition-all"
                      >
                        <Briefcase size={18} />
                        Espace Pro
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
