import type { Metadata, Viewport } from "next";

import { siteConfig } from "@/data/site";
import { getMessages, type Locale } from "@/i18n/config";

export const siteViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "dark",
  themeColor: siteConfig.themeColor,
};

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.name,
  description: getMessages("tr").metadata.description,
  keywords: getMessages("tr").metadata.keywords,
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export function getLocalizedMetadata(lang: Locale): Metadata {
  const content = getMessages(lang).metadata;
  const path = `/${lang}`;
  return {
    ...baseMetadata,
    title: { absolute: content.title },
    description: content.description,
    keywords: content.keywords,
    alternates: {
      canonical: path,
      languages: { "tr-TR": "/tr", "en-US": "/en", "x-default": "/tr" },
    },
    openGraph: {
      title: content.title,
      description: content.ogDescription,
      type: "website",
      locale: content.locale,
      alternateLocale: lang === "tr" ? ["en_US"] : ["tr_TR"],
      url: `https://www.wearecineguru.com${path}`,
      siteName: siteConfig.name,
      images: [{ url: "/assets/og-cineguru-v7.jpg", width: 1200, height: 800, alt: content.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.ogDescription,
      images: ["/assets/og-cineguru-v7.jpg"],
    },
  };
}
