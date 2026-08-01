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
        embedUrl: `https://www.youtube-nocookie.com/embed/${siteConfig.showreel.id}`,
        contentUrl: `https://www.youtube.com/watch?v=${siteConfig.showreel.id}`,
      },
    ],
  };
}
