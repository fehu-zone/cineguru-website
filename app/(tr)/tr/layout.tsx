import type { Metadata, Viewport } from "next";
import SiteDocument from "../../SiteDocument";
import { getLocalizedMetadata, siteViewport } from "../../siteMetadata";

export const metadata: Metadata = getLocalizedMetadata("tr");
export const viewport: Viewport = siteViewport;

export default function TurkishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteDocument lang="tr">{children}</SiteDocument>;
}
