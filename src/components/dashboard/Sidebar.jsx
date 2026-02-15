import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import {
  Home,
  CreditCard,
  Gift,
  Shield,
  LogOut,
  ChevronLeft,
  Crown,
  Zap,
  X
} from 'lucide-react';

export default function Sidebar({ user, onSignOut, isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isEntrepreneur = user?.role === 'entrepreneur';

  const entrepreneurLinks = [
    { to: '/portal', icon: Home, label: 'Accueil', end: true },
    { to: '/portal/billing', icon: CreditCard, label: 'Abonnement & Factures' },
    { to: '/portal/referral', icon: Gift, label: 'Parrainage' },
    { to: '/portal/security', icon: Shield, label: 'Sécurité' },
  ];

  const clientLinks = [
    { to: '/portal', icon: Home, label: 'Accueil', end: true },
    { to: '/portal/billing', icon: CreditCard, label: 'Abonnement' },
    { to: '/portal/referral', icon: Gift, label: 'Parrainage' },
    { to: '/portal/security', icon: Shield, label: 'Sécurité' },
  ];

  const links = isEntrepreneur ? entrepreneurLinks : clientLinks;

  // Close sidebar on route change (mobile)
  useEffect(() => {
    onClose?.();
  }, [location.pathname, onClose]);

  const handleSignOut = () => {
    if (onSignOut) onSignOut();
    else navigate('/login');
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={`
        w-64 h-screen bg-white border-r border-slate-100 flex flex-col fixed left-0 top-0 z-50
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}>

        {/* Logo & Back */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-50">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <ChevronLeft size={18} />
            <img src="/images/logo_ProPair.jpg" alt="ProPair" className="h-7" />
          </button>
          <button
            onClick={onClose}
            className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            aria-label="Fermer le menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* User Card */}
        <div className="p-6 border-b border-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-sm">
              {user?.full_name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-slate-900 truncate">
                {user?.full_name || 'Utilisateur'}
              </p>
              <p className="text-xs text-slate-400 truncate">
                {user?.email || ''}
              </p>
            </div>
          </div>

          {/* Status Badge */}
          <div className={`mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
            user?.isPro
              ? 'bg-teal-50 text-teal-600'
              : 'bg-amber-50 text-amber-600'
          }`}>
            {user?.isPro ? <Crown size={12} /> : <Zap size={12} />}
            {user?.isPro ? 'Pro' : 'Essai'}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                ${isActive
                  ? 'bg-teal-50 text-teal-600'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }
              `}
            >
              <link.icon size={18} />
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Sign Out */}
        <div className="p-4 border-t border-slate-50">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all"
          >
            <LogOut size={18} />
            Déconnexion
          </button>
        </div>
      </aside>
    </>
  );
}
