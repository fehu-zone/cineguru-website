import type { Metadata, Viewport } from "next";
import SiteDocument from "../../SiteDocument";
import { getLocalizedMetadata, siteViewport } from "../../siteMetadata";

export const metadata: Metadata = getLocalizedMetadata("en");
export const viewport: Viewport = siteViewport;

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteDocument lang="en">{children}</SiteDocument>;
}
