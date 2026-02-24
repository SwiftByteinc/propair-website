import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-100">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-12 sm:mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/">
              <img
                src="/images/logo_ProPair.jpg"
                alt="ProPair"
                width="103"
                height="48"
                className="h-12 w-auto"
                loading="lazy"
              />
            </Link>
            <p className="text-slate-600 leading-relaxed">
              {t('footer.brandDesc')}
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <MapPin size={16} className="text-teal-700" />
              <span>{t('footer.location')}</span>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-6">{t('footer.productTitle')}</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/pricing" className="text-slate-600 hover:text-teal-700 transition-colors py-1 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700/30 rounded">
                  {t('footer.productPricing')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-600 hover:text-teal-700 transition-colors py-1 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700/30 rounded">
                  {t('footer.productAbout')}
                </Link>
              </li>
              <li>
                <Link to="/pricing#faq" className="text-slate-600 hover:text-teal-700 transition-colors py-1 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700/30 rounded">
                  {t('footer.productFaq')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-6">{t('footer.companyTitle')}</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/contact" className="text-slate-600 hover:text-teal-700 transition-colors py-1 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700/30 rounded">
                  {t('footer.companyContact')}
                </Link>
              </li>
              <li>
                <Link to="/connexion" className="text-slate-600 hover:text-teal-700 transition-colors py-1 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700/30 rounded">
                  {t('footer.companyLogin')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Download */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-6">{t('footer.downloadTitle')}</h3>
            <p className="text-slate-600 mb-4">{t('footer.downloadDesc')}</p>
            <div className="space-y-3">
              <a
                href="https://apps.apple.com/app/propair"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex justify-center items-center gap-2.5 px-4 py-3.5 bg-slate-900 hover:bg-black text-white font-semibold rounded-xl transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                {t('common.appStore')}
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.propair"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex justify-center items-center gap-2.5 px-4 py-3.5 bg-slate-900 hover:bg-black text-white font-semibold rounded-xl transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                {t('common.googlePlay')}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            {t('footer.copyright', { year: currentYear })}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-1.5 gap-y-1 text-sm text-slate-500">
            <Link to="/site/privacy" className="hover:text-teal-700 hover:underline underline-offset-2 transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700/30 rounded px-1">
              {t('footer.legalPrivacy')}
            </Link>
            <span className="text-slate-300" aria-hidden="true">·</span>
            <Link to="/site/terms" className="hover:text-teal-700 hover:underline underline-offset-2 transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700/30 rounded px-1">
              {t('footer.legalTerms')}
            </Link>
            <span className="text-slate-300" aria-hidden="true">·</span>
            <Link to="/site/cookies" className="hover:text-teal-700 hover:underline underline-offset-2 transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700/30 rounded px-1">
              {t('footer.legalCookies')}
            </Link>
            <span className="text-slate-300" aria-hidden="true">·</span>
            <Link to="/site/legal" className="hover:text-teal-700 hover:underline underline-offset-2 transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700/30 rounded px-1">
              {t('footer.legalNotice')}
            </Link>
            <span className="text-slate-300" aria-hidden="true">·</span>
            <Link to="/site/refund" className="hover:text-teal-700 hover:underline underline-offset-2 transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700/30 rounded px-1">
              {t('footer.legalRefund')}
            </Link>
            <span className="text-slate-300" aria-hidden="true">·</span>
            <button
              onClick={() => window.dispatchEvent(new Event('cookie-consent-reset'))}
              className="hover:text-teal-700 hover:underline underline-offset-2 transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700/30 rounded px-1"
            >
              {t('footer.cookiePreferences')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
