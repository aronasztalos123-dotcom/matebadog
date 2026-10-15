import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import LogoMark from "@/components/LogoMark";
import { localizePath, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface FooterProps {
  lang: Locale;
  dict: Dictionary["footer"];
  navLinks: Dictionary["nav"]["links"];
}

export default function Footer({ lang, dict, navLinks: labels }: FooterProps) {
  const navLinks = [
    { href: localizePath(lang, "/"), label: labels.home },
    { href: localizePath(lang, "/szolgaltatasok"), label: labels.services },
    { href: localizePath(lang, "/arkalkulator"), label: labels.calculator },
    { href: localizePath(lang, "/referenciak"), label: labels.references },
    { href: localizePath(lang, "/kapcsolat"), label: labels.contact },
  ];

  const services = localizePath(lang, "/szolgaltatasok");
  const serviceLinks = [
    { href: `${services}#tetofedes`, label: dict.serviceLinks.roofing },
    { href: `${services}#badogos`, label: dict.serviceLinks.tinsmith },
    { href: `${services}#acsszerkezet`, label: dict.serviceLinks.carpentry },
    { href: `${services}#szigeteles`, label: dict.serviceLinks.insulation },
    { href: `${services}#tetofedes`, label: dict.serviceLinks.renovation },
    { href: `${services}#szigeteles`, label: dict.serviceLinks.roofWindow },
  ];

  return (
    <footer className="bg-[#14181B] text-white" role="contentinfo">
      <div className="container-custom pb-14 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand */}
          <div>
            <div className="mb-5 flex items-center gap-3">
              <LogoMark />
              <span className="flex flex-col leading-none">
                <span className="font-display text-[20px] text-white">Máté</span>
                <span className="mt-1 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-white/50">
                  Tetőfedő &amp; Bádogos
                </span>
              </span>
            </div>
            <p className="text-[#7F8A91] text-sm leading-relaxed mb-6">
              {dict.tagline}
            </p>
            <a
              href="https://maps.google.com/?q=Budapest+Hungary"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#7F8A91] hover:text-white text-sm transition-colors"
              aria-label={dict.mapsAria}
            >
              <MapPin size={16} aria-hidden="true" />
              {dict.maps}
            </a>
            <p className="mt-8 text-xs text-white/35">
              © {new Date().getFullYear()} Máté Tetőfedő &amp; Bádogos. {dict.rights}
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="label-text mb-5 text-white/45">
              {dict.navHeading}
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#7F8A91] hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="label-text mb-5 text-white/45">
              {dict.servicesHeading}
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#7F8A91] hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="label-text mb-5 text-white/45">
              {dict.contactHeading}
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+36300951686"
                  className="flex items-start gap-3 text-[#7F8A91] hover:text-white text-sm transition-colors"
                >
                  <Phone size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
                  +36 30 095 1686
                </a>
              </li>
              <li>
                <a
                  href="mailto:mate.tetofedo@gmail.com"
                  className="flex items-start gap-3 text-[#7F8A91] hover:text-white text-sm transition-colors"
                >
                  <Mail size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
                  mate.tetofedo@gmail.com
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-[#7F8A91] text-sm">
                  <MapPin size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
                  {dict.location}
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3 text-[#7F8A91] text-sm">
                  <Clock size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <p>{dict.weekdays}</p>
                    <p>{dict.saturday}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.07]">
        <div className="container-custom py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <Link
            href={localizePath(lang, "/adatvedelem")}
            className="text-xs text-white/40 transition-colors hover:text-white"
          >
            {dict.privacy}
          </Link>
          <span className="text-xs text-white/40">
            {dict.designedBy}
          </span>
        </div>
      </div>
    </footer>
  );
}
