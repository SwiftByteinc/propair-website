import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, MessageSquare, CreditCard, Shield, ArrowRight, Send, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';

const channels = [
  {
    icon: Phone,
    title: 'Téléphone',
    description: 'Parlez directement à notre équipe',
    value: '873-200-9806',
    href: 'tel:+18732009806',
    detail: 'Lun-Ven, 9h à 17h (HE)',
    color: 'bg-teal',
  },
  {
    icon: Mail,
    title: 'Support général',
    description: 'Questions sur l\'app ou votre compte',
    value: 'support@propairapp.com',
    href: 'mailto:support@propairapp.com',
    detail: 'Réponse sous 24h ouvrables',
    color: 'bg-slate-800',
  },
  {
    icon: CreditCard,
    title: 'Facturation',
    description: 'Abonnement, paiements, remboursements',
    value: 'billing@propairapp.com',
    href: 'mailto:billing@propairapp.com',
    detail: 'Réponse sous 24h ouvrables',
    color: 'bg-amber-600',
  },
  {
    icon: Shield,
    title: 'Confidentialité',
    description: 'Données personnelles, droit d\'accès (Loi 25)',
    value: 'privacy@propairapp.com',
    href: 'mailto:privacy@propairapp.com',
    detail: 'Réponse sous 30 jours (obligation légale)',
    color: 'bg-indigo-600',
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    // Ouvre le client email avec les infos pré-remplies
    const subject = encodeURIComponent(formData.subject || 'Question depuis le site web');
    const body = encodeURIComponent(
      `Nom : ${formData.name}\nEmail : ${formData.email}\n\n${formData.message}`
    );
    window.location.href = `mailto:support@propairapp.com?subject=${subject}&body=${body}`;

    // Feedback visuel
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 500);
  };

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <SEO
        title="Contact"
        canonical="/contact"
        description="Contactez l'équipe ProPair par téléphone ou courriel. Support technique, facturation et confidentialité."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 bg-teal/10 rounded-2xl mb-6">
            <MessageSquare size={28} className="text-teal" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Nous sommes là pour vous
          </h1>
          <p className="text-body text-lg max-w-2xl mx-auto">
            Une question, un problème technique ou une demande spéciale ?
            Contactez-nous par le canal qui vous convient.
          </p>
        </motion.div>

        {/* Contact Channels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid sm:grid-cols-2 gap-4 mb-16"
        >
          {channels.map((channel) => (
            <a
              key={channel.title}
              href={channel.href}
              className="group bg-surface rounded-2xl p-6 border border-border hover:border-teal/30 hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 ${channel.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <channel.icon size={22} className="text-white" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-primary mb-1">{channel.title}</h3>
                  <p className="text-muted text-sm mb-3">{channel.description}</p>
                  <p className="text-teal font-semibold group-hover:underline break-all">
                    {channel.value}
                  </p>
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-muted">
                    <Clock size={12} />
                    <span>{channel.detail}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </motion.div>

        {/* Contact Form + Info */}
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <h2 className="text-2xl font-bold text-primary mb-6">Envoyez-nous un message</h2>

            {sent ? (
              <div className="bg-teal/5 border border-teal/20 rounded-2xl p-8 text-center">
                <div className="w-14 h-14 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail size={24} className="text-teal" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">Votre client courriel s'est ouvert</h3>
                <p className="text-body mb-4">
                  Envoyez le message depuis votre application de courriel.
                  Nous vous répondrons sous 24h ouvrables.
                </p>
                <button
                  onClick={() => { setSent(false); setFormData({ name: '', email: '', subject: '', message: '' }); }}
                  className="text-teal font-semibold hover:underline"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-semibold text-primary mb-2">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Votre nom"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-white text-primary placeholder-muted focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-semibold text-primary mb-2">
                      Courriel
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="votre@courriel.com"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-white text-primary placeholder-muted focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-sm font-semibold text-primary mb-2">
                    Sujet
                  </label>
                  <select
                    id="contact-subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-white text-primary focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all"
                  >
                    <option value="">Choisir un sujet...</option>
                    <option value="Question générale">Question générale</option>
                    <option value="Problème technique">Problème technique</option>
                    <option value="Abonnement & facturation">Abonnement & facturation</option>
                    <option value="Partenariat / Presse">Partenariat / Presse</option>
                    <option value="Signaler un problème">Signaler un problème</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-semibold text-primary mb-2">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Décrivez votre question ou problème..."
                    className="w-full px-4 py-3 rounded-xl border border-border bg-white text-primary placeholder-muted focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-teal hover:bg-teal-dark text-white font-semibold rounded-xl transition-all shadow-sm disabled:opacity-50"
                >
                  {sending ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>
                      <Send size={18} />
                      Envoyer le message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Side Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Address */}
            <div className="bg-surface rounded-2xl p-6 border border-border">
              <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                <MapPin size={18} className="text-teal" />
                Siège social
              </h3>
              <address className="text-body not-italic leading-relaxed">
                <strong>SwiftByte inc.</strong><br />
                Magog, Québec<br />
                Canada
              </address>
            </div>

            {/* Hours */}
            <div className="bg-surface rounded-2xl p-6 border border-border">
              <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                <Clock size={18} className="text-teal" />
                Heures de service
              </h3>
              <div className="space-y-2 text-body text-sm">
                <div className="flex justify-between">
                  <span>Lundi — Vendredi</span>
                  <span className="font-semibold text-primary">9h — 17h</span>
                </div>
                <div className="flex justify-between">
                  <span>Samedi — Dimanche</span>
                  <span className="text-muted">Fermé</span>
                </div>
                <p className="text-xs text-muted pt-2">Heure de l'Est (HE) — Fuseau Montréal</p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-surface rounded-2xl p-6 border border-border">
              <h3 className="font-bold text-primary mb-4">Besoin d'aide rapide ?</h3>
              <div className="space-y-3">
                <Link
                  to="/pricing#faq"
                  className="flex items-center justify-between text-sm text-body hover:text-teal transition-colors"
                >
                  <span>Questions fréquentes</span>
                  <ArrowRight size={14} />
                </Link>
                <Link
                  to="/refund"
                  className="flex items-center justify-between text-sm text-body hover:text-teal transition-colors"
                >
                  <span>Politique de remboursement</span>
                  <ArrowRight size={14} />
                </Link>
                <Link
                  to="/privacy"
                  className="flex items-center justify-between text-sm text-body hover:text-teal transition-colors"
                >
                  <span>Confidentialité & données</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 pt-8 border-t border-border text-center"
        >
          <p className="text-sm text-muted">
            ProPair™ est une marque de commerce de SwiftByte inc. — Magog, Québec, Canada
          </p>
        </motion.div>
      </div>
    </div>
  );
}
