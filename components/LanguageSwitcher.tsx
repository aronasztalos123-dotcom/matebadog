"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeNames, localizePath, stripLocale, type Locale } from "@/lib/i18n/config";

interface LanguageSwitcherProps {
  lang: Locale;
  ariaLabel: string;
  className?: string;
}

export default function LanguageSwitcher({ lang, ariaLabel, className = "" }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const basePath = stripLocale(pathname);

  return (
    <nav aria-label={ariaLabel} className={`flex items-center gap-1 ${className}`}>
      {locales.map((locale) => {
        const isActive = locale === lang;
        return (
          <Link
            key={locale}
            href={localizePath(locale, basePath)}
            hrefLang={locale}
            lang={locale}
            title={localeNames[locale]}
            aria-label={localeNames[locale]}
            aria-current={isActive ? "true" : undefined}
            className={`px-2 py-1 rounded-md text-xs font-semibold uppercase tracking-wide transition-colors ${
              isActive
                ? "bg-[#C84B11] text-white"
                : "text-[#57534E] hover:text-[#1C1917] hover:bg-[#F7F5F2]"
            }`}
          >
            {locale}
          </Link>
        );
      })}
    </nav>
  );
}
