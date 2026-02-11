import { Helmet } from 'react-helmet-async';

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://propair.ca/#organization",
        "name": "ProPair",
        "url": "https://propair.ca",
        "logo": "https://propair.ca/images/logo_ProPair.jpg",
        "description": "Plateforme de mise en relation entre entrepreneurs certifiés RBQ et clients au Québec",
        "sameAs": [
          "https://facebook.com/propair",
          "https://instagram.com/propair"
        ],
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Magog",
          "addressRegion": "QC",
          "addressCountry": "CA"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "support@propairapp.com",
          "contactType": "customer service",
          "availableLanguage": ["French", "English"]
        }
      },
      {
        "@type": "SoftwareApplication",
        "name": "ProPair",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web, iOS, Android",
        "description": "Application de mise en relation entre entrepreneurs certifiés et clients pour projets de construction et rénovation",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "CAD",
          "description": "Essai gratuit disponible"
        }
      },
      {
        "@type": "LocalBusiness",
        "name": "ProPair",
        "image": "https://propair.ca/images/logo_ProPair.jpg",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Magog",
          "addressRegion": "Québec",
          "addressCountry": "CA"
        },
        "areaServed": {
          "@type": "GeoCircle",
          "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": 45.2668,
            "longitude": -72.1514
          },
          "geoRadius": "100000"
        },
        "priceRange": "$$"
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}
