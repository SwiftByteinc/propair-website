import React from 'react';
import { motion } from 'framer-motion';
import { Tag, Calendar, User, ArrowRight } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

// Mock Data
const articles = [
  {
    id: 1,
    title: "Comment choisir le bon plombier pour vos urgences ?",
    category: "Plomberie",
    excerpt: "Les fuites d'eau n'attendent pas. Voici les 5 critères indispensables pour éviter les arnaques et trouver un artisan fiable rapidement.",
    author: "Sophie Martin",
    date: "12 Oct 2025",
    imageUrl: "https://images.unsplash.com/photo-1581578731117-104f2a8d23e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Rénovation énergétique : Quelles aides en 2026 ?",
    category: "Rénovation",
    excerpt: "MaPrimeRénov', CEE, Éco-PTZ... Décryptage complet des subventions disponibles pour isoler votre logement à moindre coût.",
    author: "Marc Dupont",
    date: "05 Oct 2025",
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Les tendances déco qui vont marquer l'année",
    category: "Design",
    excerpt: "Du minimalisme chaleureux au retour des couleurs vives, découvrez comment transformer votre intérieur avec style.",
    author: "Léa Dubois",
    date: "28 Sep 2025",
    imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Jardinage : Préparer son extérieur pour l'hiver",
    category: "Jardin",
    excerpt: "Taille des haies, protection des plantes fragiles... Le guide complet pour retrouver un jardin en pleine forme au printemps.",
    author: "Thomas Bernard",
    date: "15 Sep 2025",
    imageUrl: "https://images.unsplash.com/photo-1416879151795-276199f5e87c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    title: "Déménagement : La check-list ultime pour ne rien oublier",
    category: "Déménagement",
    excerpt: "Cartons, démarches administratives, location de camion... Organisez votre départ semaine après semaine sans stress.",
    author: "Julie Petit",
    date: "02 Sep 2025",
    imageUrl: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    title: "Sécuriser sa maison pendant les vacances",
    category: "Sécurité",
    excerpt: "Alarmes connectées, voisins vigilants, serrures renforcées. Les meilleures solutions pour partir l'esprit tranquille.",
    author: "Antoine Roux",
    date: "20 Aout 2025",
    imageUrl: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  }
];

export default function Guides() {
  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Guides & Conseils</h1>
            <p className="text-xl text-slate-600">
              Retrouvez nos meilleurs articles pour vous accompagner dans tous vos projets de maison, de la rénovation à la décoration.
            </p>
          </motion.div>
        </div>

        {/* Featured Article (Optional - reusing the first one for layout variety or just grid) */}
        {/* We'll stick to a clean grid as requested */}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="h-full flex flex-col overflow-hidden p-0 group cursor-pointer border border-slate-100 hover:border-teal-100 transition-colors">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-brand text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center text-xs text-slate-500 mb-3 space-x-4">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {article.date}
                    </div>
                    <div className="flex items-center">
                      <User size={14} className="mr-1" />
                      {article.author}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                    {article.excerpt}
                  </p>

                  <div className="pt-4 border-t border-slate-100">
                    <span className="text-brand font-semibold text-sm flex items-center group-hover:translate-x-2 transition-transform">
                      Lire l'article <ArrowRight size={16} className="ml-1" />
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button variant="outline" className="px-8">
            Charger plus d'articles
          </Button>
        </div>

      </div>
    </div>
  );
}
