import Script from "next/script";
import { Inter, JetBrains_Mono } from "next/font/google";
import { siteConfig } from "@/data/site";
import { getMessages } from "@/i18n/config";
import "./globals.css";

const GA_ID = "G-KRY6M98B4Y";
const GT_ID = "GT-MQD3MCKQ";
const META_PIXEL_ID = "976702455393029";
const GTM_ID = "GTM-MHNC3BDD";

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
        {/* Google Tag Manager */}
        <script
          id="gtm-script"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
        {/* End Google Tag Manager */}
        <script
          id="cineguru-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          suppressHydrationWarning
        />
        <meta name="google-site-verification" content="E3lC3sNYrlXhOzK__u2R68oEZ6GTYeJUR6TtWJooT8Y" />
        <meta name="facebook-domain-verification" content="wmo7dc13rnpykpmgcnrlxg4d61ynqd" />
        <link rel="preload" as="image" href="/assets/showreel-poster-1280.avif" type="image/avif" fetchPriority="high" />
        <link rel="dns-prefetch" href="https://www.youtube-nocookie.com" />
        {/* Meta Pixel Code */}
        <script
          id="meta-pixel"
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '${META_PIXEL_ID}');fbq('track', 'PageView');`,
          }}
        />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </head>
      <body className={`${inter.variable} ${jetBrainsMono.variable}`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
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
