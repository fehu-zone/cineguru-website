import type { Metadata, Viewport } from "next";
import SiteDocument from "../SiteDocument";
import { baseMetadata, siteViewport } from "../siteMetadata";

export const metadata: Metadata = baseMetadata;
export const viewport: Viewport = siteViewport;

export default function RootRedirectLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteDocument lang="tr">{children}</SiteDocument>;
}
