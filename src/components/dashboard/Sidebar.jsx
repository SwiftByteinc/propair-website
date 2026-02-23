import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
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
import { useLanguage } from '../../context/LanguageContext';

function SidebarAvatar({ name, src }) {
  const [imgError, setImgError] = useState(false);
  const initial = name?.charAt(0) || 'U';

  if (src && !imgError) {
    return (
      <img
        src={src}
        alt=""
        onError={() => setImgError(true)}
        className="w-10 h-10 rounded-full object-cover"
      />
    );
  }

  return (
    <div className="w-10 h-10 rounded-full bg-teal-700 text-white flex items-center justify-center font-bold text-sm">
      {initial}
    </div>
  );
}

export default function Sidebar({ user, onSignOut, isOpen, onClose }) {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const isEntrepreneur = user?.role === 'entrepreneur';

  const entrepreneurLinks = [
    { to: '/portal', icon: Home, label: t('dashboard.sideHome'), end: true },
    { to: '/portal/billing', icon: CreditCard, label: t('dashboard.sideBillingEntrep') },
    { to: '/portal/referral', icon: Gift, label: t('dashboard.sideReferral') },
    { to: '/portal/security', icon: Shield, label: t('dashboard.sideSecurity') },
  ];

  const clientLinks = [
    { to: '/portal', icon: Home, label: t('dashboard.sideHome'), end: true },
    { to: '/portal/billing', icon: CreditCard, label: t('dashboard.sideBillingClient') },
    { to: '/portal/referral', icon: Gift, label: t('dashboard.sideReferral') },
    { to: '/portal/security', icon: Shield, label: t('dashboard.sideSecurity') },
  ];

  const links = isEntrepreneur ? entrepreneurLinks : clientLinks;

  // Close sidebar on route change (mobile)
  const prevPathname = useRef(location.pathname);
  useEffect(() => {
    if (prevPathname.current !== location.pathname) {
      prevPathname.current = location.pathname;
      onClose?.();
    }
  }, [location.pathname, onClose]);

  const handleSignOut = () => {
    if (onSignOut) onSignOut();
    else navigate('/connexion');
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
        w-64 h-dvh bg-white border-r border-slate-100 flex flex-col fixed left-0 top-0 z-50
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}>

        {/* Back */}
        <div className="h-16 px-6 flex items-center border-b border-slate-50">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-600 transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700/30 focus-visible:ring-offset-2 rounded-lg"
          >
            <ChevronLeft size={16} />
            <span>{t('dashboard.sideBack')}</span>
          </button>
        </div>

        {/* User Card */}
        <div className="p-6 border-b border-slate-50">
          <div className="flex items-center gap-3">
            <SidebarAvatar name={user?.full_name} src={user?.avatar_url} />

            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-slate-900 truncate">
                {user?.full_name || t('dashboard.userFallback')}
              </p>
              <p className="text-xs text-slate-500 truncate">
                {user?.email || ''}
              </p>
            </div>
          </div>

          {/* Status Badge */}
          <div className={`mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold ${
            isEntrepreneur
              ? user?.activated
                ? 'bg-teal-700/10 text-teal-700'
                : 'bg-amber-50 text-amber-600'
              : 'bg-slate-100 text-slate-600'
          }`}>
            {isEntrepreneur && user?.activated ? <Crown size={12} /> : <Zap size={12} />}
            {isEntrepreneur
              ? user?.activated
                ? t('dashboard.statusPro')
                : t('dashboard.statusProInactive')
              : t('dashboard.statusClient')}
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
                  ? 'bg-teal-700/10 text-teal-700 border-l-2 border-teal-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-l-2 border-transparent'
                }
              `}
            >
              <link.icon size={18} />
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Sign Out */}
        <div className="p-4 pb-[max(1rem,env(safe-area-inset-bottom))] border-t border-slate-50">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700/30 focus-visible:ring-offset-2"
          >
            <LogOut size={18} />
            {t('dashboard.signOut')}
          </button>
        </div>
      </aside>
    </>
  );
}
