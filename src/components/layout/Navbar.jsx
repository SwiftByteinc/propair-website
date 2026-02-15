import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Button from '../ui/Button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Guides', path: '/guides' },
    { name: 'Tarifs', path: '/pricing' },
    { name: 'À Propos', path: '/about' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-slate-900 tracking-tight">ProPair<span className="text-teal-600">.</span></Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors">
                {link.name}
              </Link>
            ))}
            <Button size="sm">Télécharger l'App</Button>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-slate-900">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-lg py-4 px-4 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className="text-base font-medium text-slate-800 py-2">
              {link.name}
            </Link>
          ))}
          <Button className="w-full">Télécharger l'App</Button>
        </div>
      )}
    </nav>
  );
}
