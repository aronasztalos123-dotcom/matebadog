import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries/hu";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  hu: () => import("./dictionaries/hu").then((m) => m.default),
  en: () => import("./dictionaries/en").then((m) => m.default),
  de: () => import("./dictionaries/de").then((m) => m.default),
  sk: () => import("./dictionaries/sk").then((m) => m.default),
};

export const getDictionary = (locale: Locale) => dictionaries[locale]();

export type { Dictionary };
