import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-border">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/">
              <img
                src="/images/logo_ProPair.jpg"
                alt="ProPair"
                className="h-12 w-auto"
                loading="lazy"
              />
            </Link>
            <p className="text-body leading-relaxed">
              La plateforme québécoise qui connecte clients et professionnels.
              Zéro commission. 100% confiance.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted">
              <MapPin size={16} className="text-teal" />
              <span>Magog, Québec</span>
            </div>
            {/* Réseaux sociaux - À activer quand les pages existent */}
            {/*
            <div className="flex space-x-4">
              {[
                { name: 'Facebook', href: 'https://facebook.com/propairapp', path: '...' },
              ].map((social, i) => (
                <a key={i} href={social.href} ... />
              ))}
            </div>
            */}
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-bold text-primary mb-6">Produit</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/pricing" className="text-body hover:text-teal transition-colors">
                  Abonnements Pro
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-body hover:text-teal transition-colors">
                  Fonctionnalités
                </Link>
              </li>
              <li>
                <Link to="/pricing#faq" className="text-body hover:text-teal transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-bold text-primary mb-6">Entreprise</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/about" className="text-body hover:text-teal transition-colors">
                  Notre Histoire
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-body hover:text-teal transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-body hover:text-teal transition-colors">
                  Connexion
                </Link>
              </li>
            </ul>
          </div>

          {/* Télécharger */}
          <div>
            <h3 className="font-bold text-primary mb-6">Télécharger l'app</h3>
            <p className="text-body mb-4">Disponible gratuitement sur iOS et Android.</p>
            <div className="space-y-3">
              <a
                href="https://apps.apple.com/app/propair"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex justify-center items-center gap-2 px-4 py-3 bg-teal hover:bg-teal-dark text-white font-semibold rounded-xl transition-colors shadow-soft"
              >
                App Store
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.propair"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex justify-center items-center gap-2 px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-colors shadow-soft"
              >
                Google Play
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted text-sm">
            © {currentYear} ProPair™ — Une marque de SwiftByte inc.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted">
            <Link to="/privacy" className="hover:text-teal transition-colors">
              Confidentialité
            </Link>
            <Link to="/terms" className="hover:text-teal transition-colors">
              Conditions d'utilisation
            </Link>
            <Link to="/refund" className="hover:text-teal transition-colors">
              Remboursement
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
