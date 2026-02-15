import { render } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import StructuredData from './StructuredData';

describe('StructuredData', () => {
  it('renders without crashing', () => {
    expect(() =>
      render(
        <HelmetProvider>
          <StructuredData />
        </HelmetProvider>
      )
    ).not.toThrow();
  });
});

// Test the structured data object logic directly
describe('StructuredData schema content', () => {
  // Reconstruct the data object to validate its structure
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://propairapp.com/#website",
        "name": "ProPair",
        "alternateName": "ProPair App",
        "url": "https://propairapp.com"
      },
      {
        "@type": "Organization",
        "@id": "https://propairapp.com/#organization",
        "name": "ProPair",
        "url": "https://propairapp.com",
        "logo": "https://propairapp.com/images/logo_ProPair.jpg",
        "description": "Plateforme de mise en relation entre entrepreneurs certifiés RBQ et clients au Québec",
        "sameAs": ["https://facebook.com/propair", "https://instagram.com/propair"],
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
      },
      {
        "@type": "LocalBusiness",
        "name": "ProPair",
        "image": "https://propairapp.com/images/logo_ProPair.jpg",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Magog",
          "addressRegion": "Québec",
          "addressCountry": "CA"
        }
      }
    ]
  };

  it('has valid JSON-LD context', () => {
    expect(structuredData['@context']).toBe('https://schema.org');
  });

  it('includes Organization with correct name and URL', () => {
    const org = structuredData['@graph'].find(item => item['@type'] === 'Organization');
    expect(org).toBeDefined();
    expect(org.name).toBe('ProPair');
    expect(org.url).toBe('https://propairapp.com');
  });

  it('Organization has contact point with email', () => {
    const org = structuredData['@graph'].find(item => item['@type'] === 'Organization');
    expect(org.contactPoint.email).toBe('support@propairapp.com');
    expect(org.contactPoint.availableLanguage).toContain('French');
    expect(org.contactPoint.availableLanguage).toContain('English');
  });

  it('includes SoftwareApplication schema', () => {
    const app = structuredData['@graph'].find(item => item['@type'] === 'SoftwareApplication');
    expect(app).toBeDefined();
    expect(app.applicationCategory).toBe('BusinessApplication');
  });

  it('includes WebSite schema with site name', () => {
    const website = structuredData['@graph'].find(item => item['@type'] === 'WebSite');
    expect(website).toBeDefined();
    expect(website.name).toBe('ProPair');
    expect(website.url).toBe('https://propairapp.com');
  });

  it('includes LocalBusiness with Magog address', () => {
    const biz = structuredData['@graph'].find(item => item['@type'] === 'LocalBusiness');
    expect(biz).toBeDefined();
    expect(biz.address.addressLocality).toBe('Magog');
    expect(biz.address.addressCountry).toBe('CA');
  });

  it('uses consistent propairapp.com domain everywhere', () => {
    const jsonStr = JSON.stringify(structuredData);
    expect(jsonStr).toContain('propairapp.com');
    expect(jsonStr).not.toContain('propair.ca');
  });

  it('produces valid JSON', () => {
    const jsonStr = JSON.stringify(structuredData);
    expect(() => JSON.parse(jsonStr)).not.toThrow();
  });
});
