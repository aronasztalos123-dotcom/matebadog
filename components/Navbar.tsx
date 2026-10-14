"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Menu, X } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { localizePath, stripLocale, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface NavbarProps {
  lang: Locale;
  dict: Dictionary["nav"];
  callNowNumber: string;
}

export default function Navbar({ lang, dict, callNowNumber }: NavbarProps) {
  const navLinks = [
    { href: localizePath(lang, "/"), label: dict.links.home },
    { href: localizePath(lang, "/szolgaltatasok"), label: dict.links.services },
    { href: localizePath(lang, "/arkalkulator"), label: dict.links.calculator },
    { href: localizePath(lang, "/referenciak"), label: dict.links.references },
    { href: localizePath(lang, "/kapcsolat"), label: dict.links.contact },
  ];

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // Hungarian pages are rewritten internally to /hu/..., so normalise before comparing
  const pathname = localizePath(lang, stripLocale(usePathname()));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#E7E5E4] transition-all duration-300 ${
          scrolled ? "shadow-sm backdrop-blur-sm py-2" : "py-4"
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Link href={localizePath(lang, "/")} className="flex flex-col leading-none no-underline" aria-label={dict.logoAria}>
            <span className="text-[22px] text-[#1C1917]">
              <span className="font-extrabold relative">
                Máté
                <span
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#C84B11] rounded-full"
                  aria-hidden="true"
                />
              </span>
              <span className="font-normal"> Tetőfedő</span>
            </span>
            <span className="text-[11px] font-medium text-[#A8A29E] tracking-widest uppercase mt-1">
              &amp; Bádogos
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label={dict.mainNavAria}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[15px] font-medium transition-colors duration-200 pb-px border-b-2 ${
                    isActive
                      ? "text-[#C84B11] border-[#C84B11]"
                      : "text-[#57534E] border-transparent hover:text-[#1C1917]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Language switcher + CTA button */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher lang={lang} ariaLabel={dict.languageAria} />
            <a
              href="tel:+36300951686"
              className="btn-primary text-sm"
              aria-label={dict.callAria}
            >
              <Phone size={16} aria-hidden="true" />
              {dict.callNow}
            </a>
          </div>

          {/* Mobile language switcher + hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageSwitcher lang={lang} ariaLabel={dict.languageAria} className="hidden sm:flex" />
            <button
              className="p-2 text-[#1C1917] rounded-md"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? dict.closeMenu : dict.openMenu}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-white flex flex-col pt-[80px]"
          role="dialog"
          aria-modal="true"
          aria-label={dict.menuDialogAria}
        >
          <nav className="flex flex-col gap-1 p-6" aria-label={dict.mobileNavAria}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xl font-semibold py-4 border-b border-[#E7E5E4] transition-colors ${
                    isActive ? "text-[#C84B11]" : "text-[#1C1917]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <LanguageSwitcher lang={lang} ariaLabel={dict.languageAria} className="px-6 sm:hidden" />
          <div className="p-6 mt-auto">
            <a
              href="tel:+36300951686"
              className="btn-primary w-full justify-center text-center"
            >
              <Phone size={18} aria-hidden="true" />
              {callNowNumber}
            </a>
          </div>
        </div>
      )}

      {/* Spacer for fixed navbar */}
      <div className="h-[73px]" aria-hidden="true" />
    </>
  );
}
