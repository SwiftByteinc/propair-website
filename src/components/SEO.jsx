import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

const defaultMeta = {
  siteName: 'ProPair',
  siteUrl: 'https://propairapp.com',
  ogImage: '/og-image.png',
  twitterHandle: '@propairapp',
};

export default function SEO({
  title,
  description,
  ogImage = defaultMeta.ogImage,
  noIndex = false,
  canonical,
  type = 'website',
}) {
  const { t, lang } = useLanguage();

  const resolvedDescription = description || t('seo.defaultDescription');
  const fullTitle = title
    ? `${title} | ${defaultMeta.siteName}`
    : t('seo.defaultTitle');

  const locale = lang === 'fr' ? 'fr_CA' : 'en_CA';

  const canonicalUrl = canonical
    ? `${defaultMeta.siteUrl}${canonical}`
    : undefined;

  return (
    <Helmet>
      {/* Basic Meta */}
      <html lang={lang === 'fr' ? 'fr-CA' : 'en'} />
      <title>{fullTitle}</title>
      <meta name="description" content={resolvedDescription} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={defaultMeta.siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:image" content={`${defaultMeta.siteUrl}${ogImage}`} />
      <meta property="og:locale" content={locale} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={defaultMeta.twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={`${defaultMeta.siteUrl}${ogImage}`} />
    </Helmet>
  );
}
