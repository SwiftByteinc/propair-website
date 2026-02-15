import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';
import Button from '../ui/Button';

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-white font-bold text-xl">
                P
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">ProPair</span>
            </Link>
            <p className="text-slate-400 leading-relaxed">
              La plateforme de référence pour connecter les meilleurs professionnels avec des clients exigeants. Simple. Rapide. Sécurisé.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="text-slate-500 hover:text-brand transition-colors">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="font-bold text-white mb-6">Produit</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/pricing" className="text-slate-400 hover:text-white transition-colors">Tarifs</Link>
              </li>
              <li>
                <Link to="/guides" className="text-slate-400 hover:text-white transition-colors">Guides</Link>
              </li>
               <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">Fonctionnalités</a>
              </li>
               <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">Télécharger</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-6">Compagnie</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition-colors">À propos</Link>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">Carrières</a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-white mb-6">Newsletter</h3>
            <p className="text-slate-400 mb-4">Recevez nos derniers conseils et mises à jour.</p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Votre email"
                className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-800 text-white placeholder-slate-500 focus:border-brand focus:ring-2 focus:ring-teal-900 outline-none transition-all"
              />
              <Button variant="primary" className="w-full flex justify-center items-center gap-2">
                <span>S'inscrire</span>
                <Send size={16} />
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">© 2026 ProPair Inc. Tous droits réservés.</p>
          <div className="flex space-x-6 text-sm text-slate-500">
            <a href="#" className="hover:text-white">Confidentialité</a>
            <a href="#" className="hover:text-white">CGU</a>
            <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
