import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogIn, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export default function Navbar() {
  const { user, profile } = useAuth();
  const { t, lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.pricing'), path: '/pricing' },
    { name: t('nav.referral'), path: '/parrainage' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional: reset menu state on route change
  useEffect(() => { setIsOpen(false); }, [location]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleEscape = (e) => {
        if (e.key === 'Escape') setIsOpen(false);
      };
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleEscape);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const isActive = (path) => location.pathname === path;

  const navRef = useRef(null);
  const linkRefs = useRef({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const target = hovered || location.pathname;
    const el = linkRefs.current[target];
    const nav = navRef.current;
    if (el && nav) {
      const navRect = nav.getBoundingClientRect();
      const linkRect = el.getBoundingClientRect();
      setIndicator({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
        opacity: 1,
      });
    } else {
      setIndicator((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [location.pathname, hovered]);

  useEffect(() => {
    const onResize = () => {
      const el = linkRefs.current[location.pathname];
      const nav = navRef.current;
      if (el && nav) {
        const navRect = nav.getBoundingClientRect();
        const linkRect = el.getBoundingClientRect();
        setIndicator({ left: linkRect.left - navRect.left, width: linkRect.width, opacity: 1 });
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [location.pathname]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:px-4 focus:py-2 focus:bg-teal-600 focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold"
      >
        {t('nav.skipToContent')}
      </a>
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
          <div className="flex justify-between items-center h-16 sm:h-20">

            <Link
              to="/"
              className="group focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg p-1"
              aria-label={t('nav.backToHomeAria')}
            >
              <div className="flex items-center gap-2">
                <img
                  src="/images/logo_ProPair.jpg"
                  alt=""
                  width="120"
                  height="56"
                  className="h-11 sm:h-14 w-auto transition-all group-hover:scale-105"
                  aria-hidden="true"
                />
                <span className="sr-only">ProPair</span>
              </div>
            </Link>

            <nav ref={navRef} className="hidden md:flex items-center space-x-6 relative" aria-label="Navigation principale">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  ref={(el) => { linkRefs.current[link.path] = el; }}
                  onMouseEnter={() => setHovered(link.path)}
                  onMouseLeave={() => setHovered(null)}
                  className={`relative text-sm font-semibold pb-1 transition-colors outline-none px-1 ${
                    isActive(link.path)
                      ? 'text-teal-700'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                  aria-current={isActive(link.path) ? 'page' : undefined}
                >
                  {link.name}
                </Link>
              ))}
              <motion.span
                className="absolute bottom-0 h-0.5 bg-teal-600 rounded-full pointer-events-none"
                animate={{
                  left: indicator.left,
                  width: indicator.width,
                  opacity: indicator.opacity,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            </nav>

            <div className="hidden md:flex items-center space-x-3">
              {/* Language Toggle */}
              <button
                onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
                className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors px-2 py-1 rounded-lg hover:bg-slate-100"
                aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
              >
                {lang === 'fr' ? 'EN' : 'FR'}
              </button>

              {user ? (
                <Link
                  to="/portal"
                  className="flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white rounded-full transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                  aria-label={t('nav.accessPortalAria')}
                >
                  <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center font-bold text-sm" aria-hidden="true">
                    {profile?.full_name?.charAt(0)?.toUpperCase() || <User size={14}/>}
                  </div>
                  <span className="text-sm font-semibold">
                    {profile?.full_name?.split(' ')[0] || t('nav.myAccount')}
                  </span>
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:border-slate-300 hover:text-slate-900 transition-all outline-none"
                >
                  <LogIn size={16} aria-hidden="true" />
                  {t('nav.login')}
                </Link>
              )}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? t('nav.closeMenu') : t('nav.openMenu')}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 md:hidden"
              aria-hidden="true"
            />

            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label={t('nav.menu')}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-50 md:hidden shadow-2xl border-l border-slate-100 flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <span className="font-bold text-lg text-slate-900">{t('nav.menu')}</span>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label={t('nav.closeMenu')}
                  autoFocus
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>

              {user && (
                <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center font-bold text-lg shadow-sm">
                      {profile?.full_name?.charAt(0) || <User size={20}/>}
                    </div>
                    <div className="overflow-hidden">
                      <p className="font-bold text-slate-900 truncate">{profile?.full_name || t('nav.user')}</p>
                      <p className="text-sm text-slate-500 truncate">{user.email}</p>
                    </div>
                  </div>
                </div>
              )}

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
                    {t('nav.myDashboard')}
                  </Link>
                )}

                {/* Mobile Language Toggle */}
                <button
                  onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
                  className="block w-full text-left px-4 py-3 rounded-xl text-base font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  {lang === 'fr' ? '🌐 English' : '🌐 Français'}
                </button>
              </nav>

              <div className="p-6 border-t border-slate-100 space-y-3 bg-white">
                {user ? (
                  <Link
                    to="/portal"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-3 w-full px-5 py-3.5 text-sm font-bold bg-slate-900 text-white rounded-xl hover:bg-black transition-all shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
                  >
                    {t('nav.accessPortal')}
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full px-5 py-3.5 text-sm font-bold bg-slate-900 text-white rounded-xl hover:bg-black transition-all shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
                  >
                    <LogIn size={16} aria-hidden="true" />
                    {t('nav.login')}
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
