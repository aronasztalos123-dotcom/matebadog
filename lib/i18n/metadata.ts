import type { Metadata } from "next";
import { buildAlternates, ogLocales, type Locale } from "./config";

export function pageMetadata(
  lang: Locale,
  path: string,
  { title, description, ogDescription }: { title: string; description: string; ogDescription?: string }
): Metadata {
  return {
    title,
    description,
    alternates: buildAlternates(lang, path),
    openGraph: {
      title,
      description: ogDescription ?? description,
      type: "website",
      locale: ogLocales[lang],
    },
  };
}
