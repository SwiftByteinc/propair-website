import { Link } from 'react-router-dom';
import { Send, MapPin } from 'lucide-react';

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
            <div className="flex space-x-4">
              {[
                { name: 'Facebook', href: '#', path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
                { name: 'Twitter', href: '#', path: 'M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z' },
                { name: 'Instagram', href: '#', path: 'M16 8a6 6 0 0 1 6 6v7a6 6 0 0 1-6 6H8a6 6 0 0 1-6-6v-7a6 6 0 0 1 6-6h8zM12 11a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' },
                { name: 'LinkedIn', href: '#', path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z' }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  aria-label={social.name}
                  className="w-10 h-10 bg-surface hover:bg-teal rounded-lg flex items-center justify-center text-muted hover:text-white transition-all border border-border"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
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
                <Link to="/" className="text-body hover:text-teal transition-colors">
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
                <a href="#" className="text-body hover:text-teal transition-colors">
                  Carrières
                </a>
              </li>
              <li>
                <a href="#" className="text-body hover:text-teal transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-body hover:text-teal transition-colors">
                  Presse
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-primary mb-6">Newsletter</h3>
            <p className="text-body mb-4">Recevez nos derniers conseils et mises à jour.</p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Votre email"
                className="w-full px-4 py-3 rounded-xl border border-border bg-white text-primary placeholder-muted focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all"
              />
              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 px-4 py-3 bg-teal hover:bg-teal-dark text-white font-semibold rounded-xl transition-colors shadow-soft"
              >
                S'inscrire
                <Send size={16} />
              </button>
            </form>
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
