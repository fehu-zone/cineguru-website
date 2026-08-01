import type { Metadata, Viewport } from "next";

export const siteViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "dark",
  themeColor: "#0b0b0c",
};

export const baseMetadata: Metadata = {
  metadataBase: new URL("https://www.wearecineguru.com"),
  title: "Cineguru Studio",
  description: "AI destekli reklam, marka ve etkinlik filmleri üreten İstanbul merkezli video prodüksiyon stüdyosu.",
  keywords: [
    "AI video production",
    "reklam filmi",
    "tanıtım filmi",
    "video prodüksiyon",
    "Cineguru Studio",
    "İstanbul prodüksiyon şirketi",
  ],
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

const localized = {
  tr: {
    title: "Cineguru Studio | AI Destekli Video Prodüksiyon",
    description: "Reklam filmleri, marka hikâyeleri, etkinlik filmleri ve sosyal medya içerikleri için AI destekli video prodüksiyon stüdyosu.",
    ogDescription: "İnsan yaratıcılığı ile yapay zekâyı aynı prodüksiyon disiplininde buluşturuyoruz.",
    locale: "tr_TR",
    alt: "Cineguru Studio — AI destekli video prodüksiyon",
  },
  en: {
    title: "Cineguru Studio | AI-Powered Video Production",
    description: "An Istanbul production studio creating commercials, brand films, event films and social content with live action, AI and post-production.",
    ogDescription: "We bring human creativity and artificial intelligence into one production discipline.",
    locale: "en_US",
    alt: "Cineguru Studio — AI-powered video production",
  },
} as const;

export function getLocalizedMetadata(lang: "tr" | "en"): Metadata {
  const content = localized[lang];
  const path = `/${lang}`;
  return {
    ...baseMetadata,
    title: { absolute: content.title },
    description: content.description,
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
      siteName: "Cineguru Studio",
      images: [{ url: "/assets/og-cineguru-v7.jpg", width: 1200, height: 800, alt: content.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.ogDescription,
      images: ["/assets/og-cineguru-v7.jpg"],
    },
  };
}
