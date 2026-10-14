import { MetadataRoute } from "next";
import { locales, localizePath, siteUrl } from "@/lib/i18n/config";

const pages: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/szolgaltatasok", priority: 0.9 },
  { path: "/arkalkulator", priority: 0.8 },
  { path: "/referenciak", priority: 0.7 },
  { path: "/kapcsolat", priority: 0.9 },
];

const absoluteUrl = (path: string) => (path === "/" ? siteUrl : `${siteUrl}${path}`);

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(({ path, priority }) =>
    locales.map((locale) => ({
      url: absoluteUrl(localizePath(locale, path)),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, absoluteUrl(localizePath(l, path))])),
      },
    }))
  );
}
