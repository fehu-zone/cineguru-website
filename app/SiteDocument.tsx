import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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
        <link rel="preload" as="image" href="/assets/showreel-poster-1280.avif" type="image/avif" fetchPriority="high" />
        <link rel="dns-prefetch" href="https://www.youtube-nocookie.com" />
      </head>
      <body className={`${inter.variable} ${jetBrainsMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
