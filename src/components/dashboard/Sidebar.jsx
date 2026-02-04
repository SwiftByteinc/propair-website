import { NavLink, useNavigate } from 'react-router-dom';
import {
  Home,
  CreditCard,
  Gift,
  Shield,
  LogOut,
  ChevronLeft,
  Crown,
  Zap
} from 'lucide-react';

export default function Sidebar({ user, onSignOut }) {
  const navigate = useNavigate();
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

  const handleSignOut = () => {
    if (onSignOut) onSignOut();
    else navigate('/login');
  };

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0 z-30">

      {/* Logo & Back */}
      <div className="h-16 px-6 flex items-center justify-between border-b border-gray-50">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ChevronLeft size={18} />
          <img src="/images/logo_ProPair.jpg" alt="ProPair" className="h-7" />
        </button>
      </div>

      {/* User Card */}
      <div className="p-6 border-b border-gray-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-teal/10 text-teal flex items-center justify-center font-bold text-sm">
            {user?.full_name?.charAt(0) || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-gray-900 truncate">
              {user?.full_name || 'Utilisateur'}
            </p>
            <p className="text-xs text-gray-400 truncate">
              {user?.email || ''}
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className={`mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
          user?.isPro
            ? 'bg-teal/10 text-teal'
            : 'bg-amber/10 text-amber'
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
                ? 'bg-teal/10 text-teal'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }
            `}
          >
            <link.icon size={18} />
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* Sign Out */}
      <div className="p-4 border-t border-gray-50">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all"
        >
          <LogOut size={18} />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
