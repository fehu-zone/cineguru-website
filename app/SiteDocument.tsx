import Script from "next/script";
import { Inter, JetBrains_Mono } from "next/font/google";
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
  return (
    <html lang={lang}>
      <head>
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
