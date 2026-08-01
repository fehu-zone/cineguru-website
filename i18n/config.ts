import en from "./locales/en.json";
import tr from "./locales/tr.json";

export const locales = ["tr", "en"] as const;

export type Locale = (typeof locales)[number];
export type Messages = typeof tr;

const dictionaries: Record<Locale, Messages> = { tr, en };

export function getMessages(locale: Locale): Messages {
  return dictionaries[locale];
}
