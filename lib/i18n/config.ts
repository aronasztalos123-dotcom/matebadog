export const locales = ["hu", "en", "de", "sk"] as const;

export type Locale = (typeof locales)[number];

/** Hungarian is the original language and stays on the unprefixed URLs. */
export const defaultLocale: Locale = "hu";

export const siteUrl = "https://mate-tetofedo.hu";

export const localeNames: Record<Locale, string> = {
  hu: "Magyar",
  en: "English",
  de: "Deutsch",
  sk: "Slovenčina",
};

export const ogLocales: Record<Locale, string> = {
  hu: "hu_HU",
  en: "en_GB",
  de: "de_DE",
  sk: "sk_SK",
};

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Prefixes a path with the locale segment (no prefix for the default locale). */
export function localizePath(locale: Locale, path: string): string {
  if (locale === defaultLocale) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/** Removes a leading locale segment from a browser pathname. */
export function stripLocale(pathname: string): string {
  const [, first, ...rest] = pathname.split("/");
  if (first && hasLocale(first)) {
    return rest.length ? `/${rest.join("/")}` : "/";
  }
  return pathname || "/";
}

/** Canonical + hreflang alternates for a page path (without locale prefix). */
export function buildAlternates(locale: Locale, path: string) {
  return {
    canonical: localizePath(locale, path),
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, localizePath(l, path)])),
      "x-default": path,
    },
  };
}

/** Replaces `{key}` placeholders in a dictionary string. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ""));
}
