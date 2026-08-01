import type { Locale } from "@/i18n/config";

type AnalyticsDetail = Record<string, string> & { language?: Locale };

export function trackEvent(name: string, detail: AnalyticsDetail = {}): void {
  const payload = { event: `cineguru_${name}`, ...detail };
  window.dispatchEvent(new CustomEvent("cineguru:analytics", { detail: payload }));

  const dataLayer = (window as Window & { dataLayer?: Array<Record<string, string>> }).dataLayer;
  dataLayer?.push(payload);
}
