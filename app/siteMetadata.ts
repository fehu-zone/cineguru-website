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
  applicationName: siteConfig.name,
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "video production",
  formatDetection: { telephone: true, address: true, email: true },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon-48x48.png",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  verification: {
    google: "E3lC3sNYrlXhOzK__u2R68oEZ6GTYeJUR6TtWJooT8Y",
  },
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
