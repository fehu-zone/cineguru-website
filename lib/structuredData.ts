import { siteConfig } from "@/data/site";
import type { Locale, Messages } from "@/i18n/config";

export function createStructuredData(locale: Locale, messages: Messages) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: `${siteConfig.url}/${locale}`,
        email: siteConfig.email,
        telephone: siteConfig.phoneDisplay,
        foundingDate: "2017",
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.address.street,
          addressLocality: siteConfig.address.locality,
          addressRegion: siteConfig.address.region,
          addressCountry: siteConfig.address.country,
        },
        sameAs: siteConfig.social.map(({ href }) => href),
      },
      {
        "@type": "VideoObject",
        name: messages.hero.showreelModalTitle,
        description: messages.hero.showreelTitle,
        thumbnailUrl: `${siteConfig.url}/assets/showreel-poster-1280.webp`,
        uploadDate: "2026-01-15",
        duration: "PT1M30S",
        contentUrl: `${siteConfig.url}${siteConfig.showreel.video}`,
        embedUrl: `https://www.youtube-nocookie.com/embed/${siteConfig.showreel.id}`,
        publisher: {
          "@type": "Organization",
          "@id": `${siteConfig.url}/#organization`,
          name: siteConfig.name,
          logo: {
            "@type": "ImageObject",
            url: `${siteConfig.url}/assets/og-cineguru-v7.jpg`,
          },
        },
      },
    ],
  };
}
