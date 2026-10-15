"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Phone, ArrowUpRight } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import LogoMark from "@/components/LogoMark";
import { localizePath, stripLocale, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface NavbarProps {
  lang: Locale;
  dict: Dictionary["nav"];
  callNowNumber: string;
}

const spring = { type: "spring", stiffness: 420, damping: 34 } as const;

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
  const [hovered, setHovered] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();
  // Hungarian pages are rewritten internally to /hu/..., so normalise before comparing
  const pathname = localizePath(lang, stripLocale(usePathname()));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  const closeMenu = () => setMobileOpen(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={`border-b transition-[background-color,border-color,box-shadow] duration-300 ${
            scrolled || mobileOpen
              ? "border-[#DDE2E5] bg-white/90 shadow-[0_10px_30px_-18px_rgba(20,24,27,0.35)] backdrop-blur-md"
              : "border-transparent bg-white"
          }`}
        >
          <div className="container-custom flex h-[72px] items-center gap-6">
            {/* Logo */}
            <Link
              href={localizePath(lang, "/")}
              className="group flex shrink-0 items-center gap-3"
              aria-label={dict.logoAria}
              onClick={closeMenu}
            >
              <LogoMark className="transition-transform duration-300 group-hover:-rotate-6" />
              <span className="flex flex-col leading-none">
                <span className="font-display text-[20px] text-[#14181B]">Máté</span>
                <span className="mt-1 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-[#4F5A61]">
                  Tetőfedő &amp; Bádogos
                </span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden flex-1 justify-center lg:flex" aria-label={dict.mainNavAria}>
              <ul className="flex items-center gap-0.5" onMouseLeave={() => setHovered(null)}>
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onMouseEnter={() => setHovered(link.href)}
                        aria-current={isActive ? "page" : undefined}
                        className={`relative block whitespace-nowrap rounded-lg px-3.5 py-2 text-[14.5px] font-medium transition-colors duration-200 ${
                          isActive ? "text-[#14181B]" : "text-[#4F5A61] hover:text-[#14181B]"
                        }`}
                      >
                        {hovered === link.href && (
                          <motion.span
                            layoutId="nav-hover"
                            className="absolute inset-0 rounded-lg bg-[#F1F3F4]"
                            transition={reduceMotion ? { duration: 0 } : spring}
                            aria-hidden="true"
                          />
                        )}
                        <span className="relative">{link.label}</span>
                        {isActive && (
                          <motion.span
                            layoutId="nav-active"
                            className="absolute inset-x-3.5 -bottom-[3px] h-[2.5px] rounded-full bg-[#C84B11]"
                            transition={reduceMotion ? { duration: 0 } : spring}
                            aria-hidden="true"
                          />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Language + call */}
            <div className="ml-auto hidden items-center gap-2.5 lg:flex">
              <LanguageSwitcher lang={lang} ariaLabel={dict.languageAria} />
              <a
                href="tel:+36300951686"
                className="btn-primary h-10 !px-4 !py-0 text-[14px]"
                aria-label={dict.callAria}
              >
                <Phone size={15} aria-hidden="true" />
                <span className="hidden xl:inline">{dict.callNow}</span>
              </a>
            </div>

            {/* Mobile: call shortcut + menu toggle */}
            <div className="ml-auto flex items-center gap-2 lg:hidden">
              <a
                href="tel:+36300951686"
                className="grid h-10 w-10 place-items-center rounded-[10px] bg-[#FBE9E0] text-[#C84B11]"
                aria-label={dict.callAria}
              >
                <Phone size={17} aria-hidden="true" />
              </a>
              <button
                type="button"
                className="relative grid h-10 w-10 place-items-center rounded-[10px] border border-[#DDE2E5] bg-white"
                onClick={() => setMobileOpen((o) => !o)}
                aria-label={mobileOpen ? dict.closeMenu : dict.openMenu}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
              >
                <motion.span
                  className="absolute h-[2px] w-[18px] rounded-full bg-[#14181B]"
                  animate={mobileOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
                  transition={spring}
                  aria-hidden="true"
                />
                <motion.span
                  className="absolute h-[2px] w-[18px] rounded-full bg-[#14181B]"
                  animate={mobileOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
                  transition={spring}
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-x-0 bottom-0 top-[72px] z-40 flex flex-col overflow-y-auto bg-white lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label={dict.menuDialogAria}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.nav
              className="flex flex-col px-6 pt-4"
              aria-label={dict.mobileNavAria}
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.045, delayChildren: 0.05 } } }}
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    variants={{
                      hidden: { opacity: 0, x: reduceMotion ? 0 : -12 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex items-center justify-between border-b border-[#DDE2E5] py-4 font-display text-[26px] ${
                        isActive ? "text-[#C84B11]" : "text-[#14181B]"
                      }`}
                    >
                      {link.label}
                      <ArrowUpRight size={22} className="text-[#7F8A91]" aria-hidden="true" />
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>

            <LanguageSwitcher lang={lang} ariaLabel={dict.languageAria} variant="grid" className="px-6 pt-6" />

            <div className="mt-auto p-6">
              <a href="tel:+36300951686" className="btn-primary w-full">
                <Phone size={18} aria-hidden="true" />
                {callNowNumber}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed navbar */}
      <div className="h-[72px]" aria-hidden="true" />
    </>
  );
}
