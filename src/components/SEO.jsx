import { Helmet } from 'react-helmet-async';

const defaultMeta = {
  siteName: 'ProPair',
  defaultTitle: 'ProPair - Bâtissez. Connectez. Prospérez.',
  defaultDescription: 'La plateforme québécoise qui connecte clients et entrepreneurs de la construction. 0% commission, 100% local.',
  siteUrl: 'https://propairapp.com',
  ogImage: '/og-image.png',
  twitterHandle: '@propairapp',
  locale: 'fr_CA',
};

export default function SEO({
  title,
  description = defaultMeta.defaultDescription,
  ogImage = defaultMeta.ogImage,
  noIndex = false,
  canonical,
  type = 'website',
}) {
  const fullTitle = title
    ? `${title} | ${defaultMeta.siteName}`
    : defaultMeta.defaultTitle;

  const canonicalUrl = canonical
    ? `${defaultMeta.siteUrl}${canonical}`
    : undefined;

  return (
    <Helmet>
      {/* Basic Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={defaultMeta.siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${defaultMeta.siteUrl}${ogImage}`} />
      <meta property="og:locale" content={defaultMeta.locale} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={defaultMeta.twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${defaultMeta.siteUrl}${ogImage}`} />
    </Helmet>
  );
}
