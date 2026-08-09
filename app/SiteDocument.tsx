import Script from "next/script";
import { Inter, JetBrains_Mono } from "next/font/google";
import { siteConfig } from "@/data/site";
import { getMessages } from "@/i18n/config";
import "./globals.css";

const GA_ID = "G-KRY6M98B4Y";
const GT_ID = "GT-MQD3MCKQ";

const inter = Inter({
  variable: "--font-cine-body",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-cine-mono",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export default function SiteDocument({
  lang,
  children,
}: Readonly<{
  lang: "tr" | "en";
  children: React.ReactNode;
}>) {
  const messages = getMessages(lang);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: {
          "@type": "ImageObject",
          "url": `${siteConfig.url}/android-chrome-512x512.png`,
          "width": 512,
          "height": 512
        },
        email: siteConfig.email,
        telephone: siteConfig.phoneDisplay,
        sameAs: siteConfig.social.map((social) => social.href),
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.url}/#studio`,
        name: siteConfig.name,
        url: `${siteConfig.url}/${lang}`,
        description: messages.metadata.description,
        image: `${siteConfig.url}/assets/og-cineguru-v7.jpg`,
        priceRange: "$$",
        telephone: siteConfig.phoneDisplay,
        email: siteConfig.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.address.street,
          addressLocality: siteConfig.address.locality,
          addressRegion: siteConfig.address.region,
          addressCountry: siteConfig.address.country,
        },
        areaServed: ["İstanbul", "Türkiye"],
        parentOrganization: { "@id": `${siteConfig.url}/#organization` },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: siteConfig.name,
        url: siteConfig.url,
        publisher: { "@id": `${siteConfig.url}/#organization` },
        inLanguage: lang === "tr" ? "tr-TR" : "en-US",
      },
    ],
  };

  return (
    <html lang={lang} suppressHydrationWarning>
      <head suppressHydrationWarning>
        <script
          id="cineguru-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          suppressHydrationWarning
        />
        <meta name="google-site-verification" content="E3lC3sNYrlXhOzK__u2R68oEZ6GTYeJUR6TtWJooT8Y" />
        <link rel="preload" as="image" href="/assets/showreel-poster-1280.avif" type="image/avif" fetchPriority="high" />
        <link rel="dns-prefetch" href="https://www.youtube-nocookie.com" />
      </head>
      <body className={`${inter.variable} ${jetBrainsMono.variable}`}>
        {children}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GT_ID}`} strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer=window.dataLayer||[];
          function gtag(){dataLayer.push(arguments);}
          gtag('js',new Date());
          gtag('config','${GT_ID}');
          gtag('config','${GA_ID}');
        `}</Script>
      </body>
    </html>
  );
}
