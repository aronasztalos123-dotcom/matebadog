"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Globe } from "lucide-react";
import { locales, localeNames, localizePath, stripLocale, type Locale } from "@/lib/i18n/config";

interface LanguageSwitcherProps {
  lang: Locale;
  ariaLabel: string;
  /** "dropdown" for the desktop header, "grid" for the mobile menu */
  variant?: "dropdown" | "grid";
  className?: string;
}

export default function LanguageSwitcher({
  lang,
  ariaLabel,
  variant = "dropdown",
  className = "",
}: LanguageSwitcherProps) {
  const basePath = stripLocale(usePathname());

  if (variant === "grid") {
    return (
      <nav aria-label={ariaLabel} className={className}>
        <ul className="grid grid-cols-4 gap-2">
          {locales.map((locale) => {
            const isActive = locale === lang;
            return (
              <li key={locale}>
                <Link
                  href={localizePath(locale, basePath)}
                  hrefLang={locale}
                  lang={locale}
                  aria-current={isActive ? "true" : undefined}
                  className={`flex flex-col items-center rounded-xl border px-2 py-2.5 transition-colors ${
                    isActive
                      ? "border-[#C84B11] bg-[#FBE9E0] text-[#C84B11]"
                      : "border-[#DDE2E5] text-[#14181B] hover:border-[#7F8A91]"
                  }`}
                >
                  <span className="font-mono text-sm font-semibold uppercase">{locale}</span>
                  <span className="mt-0.5 text-[11px] text-[#4F5A61]">{localeNames[locale]}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }

  return <LanguageDropdown lang={lang} ariaLabel={ariaLabel} basePath={basePath} className={className} />;
}

function LanguageDropdown({
  lang,
  ariaLabel,
  basePath,
  className,
}: {
  lang: Locale;
  ariaLabel: string;
  basePath: string;
  className: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <nav aria-label={ariaLabel} className={`relative ${className}`} ref={rootRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={listId}
        className="flex h-10 items-center gap-1.5 rounded-[10px] border border-[#DDE2E5] bg-white px-3 text-[#14181B] transition-colors hover:border-[#7F8A91]"
      >
        <Globe size={15} className="text-[#4F5A61]" aria-hidden="true" />
        <span className="font-mono text-[13px] font-semibold uppercase">{lang}</span>
        <ChevronDown
          size={14}
          className={`text-[#7F8A91] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={listId}
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98, transition: { duration: 0.12 } }}
            transition={{ type: "spring", stiffness: 500, damping: 32 }}
            className="absolute right-0 top-full z-10 mt-2 w-52 origin-top-right rounded-xl border border-[#DDE2E5] bg-white p-1.5 shadow-[0_18px_40px_-12px_rgba(20,24,27,0.3)]"
          >
            {locales.map((locale) => {
              const isActive = locale === lang;
              return (
                <li key={locale}>
                  <Link
                    href={localizePath(locale, basePath)}
                    hrefLang={locale}
                    lang={locale}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "true" : undefined}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                      isActive ? "bg-[#FBE9E0] text-[#C84B11]" : "text-[#14181B] hover:bg-[#F1F3F4]"
                    }`}
                  >
                    <span className="w-6 font-mono text-xs font-semibold uppercase opacity-70">{locale}</span>
                    <span className="flex-1 font-medium">{localeNames[locale]}</span>
                    {isActive && <Check size={15} aria-hidden="true" />}
                  </Link>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}
