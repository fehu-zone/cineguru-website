import type { Locale } from "@/i18n/config";

type AnalyticsDetail = Record<string, string> & { language?: Locale };

declare global {
  interface Window {
    fbq?: (
      action: string,
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
    _fbq?: unknown;
  }
}

export function trackEvent(name: string, detail: AnalyticsDetail = {}): void {
  const payload = { event: `cineguru_${name}`, ...detail };

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("cineguru:analytics", { detail: payload }));

    const dataLayer = (window as Window & { dataLayer?: Array<Record<string, string>> }).dataLayer;
    dataLayer?.push(payload);

    if (typeof window.fbq === "function") {
      if (name === "contact_cta" || name === "whatsapp_click") {
        window.fbq("track", "Contact", { channel: "whatsapp", ...detail });
        window.fbq("trackCustom", "WhatsAppClick", detail);
      } else if (name === "phone_click") {
        window.fbq("track", "Contact", { channel: "phone", ...detail });
        window.fbq("trackCustom", "PhoneClick", detail);
      } else {
        window.fbq("trackCustom", name, detail);
      }
    }
  }
}

export function trackWhatsappClick(detail: AnalyticsDetail = {}): void {
  trackEvent("whatsapp_click", detail);
}

export function trackPhoneClick(detail: AnalyticsDetail = {}): void {
  trackEvent("phone_click", detail);
}

