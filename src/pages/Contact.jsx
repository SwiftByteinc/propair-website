import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, CreditCard, Shield, ArrowRight, Send } from 'lucide-react';
import { usePostHog } from '@posthog/react';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const posthog = usePostHog();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const channels = [
    {
      icon: Phone,
      title: t('contact.phoneTitle'),
      description: t('contact.phoneDesc'),
      value: t('contact.phoneValue'),
      href: 'tel:+18194810882',
      detail: t('contact.phoneDetail'),
      color: 'bg-teal-700',
    },
    {
      icon: Mail,
      title: t('contact.supportTitle'),
      description: t('contact.supportDesc'),
      value: t('contact.supportValue'),
      href: 'mailto:support@propairapp.com',
      detail: t('contact.supportDetail'),
      color: 'bg-slate-800',
    },
    {
      icon: CreditCard,
      title: t('contact.billingTitle'),
      description: t('contact.billingDesc'),
      value: t('contact.billingValue'),
      href: 'mailto:billing@propairapp.com',
      detail: t('contact.billingDetail'),
      color: 'bg-slate-800',
    },
    {
      icon: Shield,
      title: t('contact.privacyTitle'),
      description: t('contact.privacyDesc'),
      value: t('contact.privacyValue'),
      href: 'mailto:privacy@propairapp.com',
      detail: t('contact.privacyDetail'),
      color: 'bg-slate-800',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    posthog?.capture('contact_form_submitted', { subject: formData.subject });

    // Build mailto link with pre-filled info
    const subject = encodeURIComponent(formData.subject || 'Question depuis le site web');
    const body = encodeURIComponent(
      `Nom : ${formData.name}\nCourriel : ${formData.email}\n\n${formData.message}`
    );
    window.location.href = `mailto:support@propairapp.com?subject=${subject}&body=${body}`;

    setSent(true);
  };

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen font-sans">
      <SEO
        title={t('seo.contactTitle')}
        canonical="/contact"
        description={t('seo.contactDesc')}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-100 shadow-sm text-slate-600 text-xs sm:text-sm font-medium mb-6">
            <Mail size={16} className="text-teal-700" />
            <span>{t('contact.badge')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            {t('contact.title')}
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            {t('contact.subtitle')}
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
              className="group bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 ${channel.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <channel.icon size={20} className="text-white" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-slate-900 mb-1">{channel.title}</p>
                  <p className="text-slate-500 text-sm mb-3">{channel.description}</p>
                  <p className="text-teal-700 font-semibold group-hover:underline break-all">
                    {channel.value}
                  </p>
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500">
                    <Clock size={12} />
                    <span>{channel.detail}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </motion.div>

        {/* Contact Form + Info */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-200"
          >
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">{t('contact.formTitle')}</h2>

            {sent ? (
              <div className="bg-teal-700/10 border border-teal-700/20 rounded-2xl p-8 text-center" role="status" aria-live="polite" aria-atomic="true">
                <div className="w-14 h-14 bg-teal-700/15 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail size={24} className="text-teal-700" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{t('contact.sentTitle')}</h3>
                <p className="text-slate-600 mb-2">
                  {t('contact.sentDesc')}
                </p>
                <p className="text-slate-500 text-sm mb-4">
                  {t('contact.sentFallback')}{' '}
                  <a href="mailto:support@propairapp.com" className="text-teal-700 hover:underline">support@propairapp.com</a>
                </p>
                <button
                  onClick={() => { setSent(false); setFormData({ name: '', email: '', subject: '', message: '' }); }}
                  className="text-teal-700 font-semibold hover:underline"
                >
                  {t('contact.sentAnother')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-semibold text-slate-900 mb-2">
                      {t('contact.formName')}
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t('contact.formNamePlaceholder')}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-semibold text-slate-900 mb-2">
                      {t('contact.formEmail')}
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t('contact.formEmailPlaceholder')}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-sm font-semibold text-slate-900 mb-2">
                    {t('contact.formSubject')}
                  </label>
                  <select
                    id="contact-subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 outline-none transition-all"
                  >
                    <option value="">{t('contact.formSubjectDefault')}</option>
                    <option value="Question générale">{t('contact.formSubjectGeneral')}</option>
                    <option value="Problème technique">{t('contact.formSubjectTech')}</option>
                    <option value="Abonnement & facturation">{t('contact.formSubjectBilling')}</option>
                    <option value="Partenariat / Presse">{t('contact.formSubjectPartner')}</option>
                    <option value="Signaler un problème">{t('contact.formSubjectReport')}</option>
                    <option value="Autre">{t('contact.formSubjectOther')}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-semibold text-slate-900 mb-2">
                    {t('contact.formMessage')}
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t('contact.formMessagePlaceholder')}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-slate-900 hover:bg-black text-white font-bold rounded-xl transition-all shadow-lg shadow-slate-900/10 active:scale-[0.98]"
                >
                  <Send size={20} />
                  {t('contact.formSubmit')}
                </button>
                <p className="text-xs text-slate-500 mt-2">{t('contact.formMailtoHint')}</p>
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
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <MapPin size={20} className="text-teal-700" />
                {t('contact.addressTitle')}
              </h3>
              <address className="text-slate-600 not-italic leading-relaxed">
                <strong>{t('contact.addressCompany')}</strong><br />
                {t('contact.addressCity')}<br />
                {t('contact.addressCountry')}
              </address>
            </div>

            {/* Hours */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Clock size={20} className="text-teal-700" />
                {t('contact.hoursTitle')}
              </h3>
              <div className="space-y-2 text-slate-600 text-sm">
                <div className="flex justify-between">
                  <span>{t('contact.hoursWeekday')}</span>
                  <span className="font-semibold text-slate-900">{t('contact.hoursWeekdayValue')}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('contact.hoursWeekend')}</span>
                  <span className="text-slate-500">{t('contact.hoursWeekendValue')}</span>
                </div>
                <p className="text-xs text-slate-500 pt-2">{t('contact.hoursTimezone')}</p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-4">{t('contact.quickTitle')}</h3>
              <div className="space-y-3">
                <Link
                  to="/pricing#faq"
                  className="flex items-center justify-between text-sm text-slate-600 hover:text-teal-700 transition-colors"
                >
                  <span>{t('contact.quickFaq')}</span>
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/site/refund"
                  className="flex items-center justify-between text-sm text-slate-600 hover:text-teal-700 transition-colors"
                >
                  <span>{t('contact.quickRefund')}</span>
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/site/privacy"
                  className="flex items-center justify-between text-sm text-slate-600 hover:text-teal-700 transition-colors"
                >
                  <span>{t('contact.quickPrivacy')}</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
