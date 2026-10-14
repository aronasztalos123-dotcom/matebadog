import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
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
    <footer className="bg-[#1C1917] text-white" role="contentinfo">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand */}
          <div>
            <div className="mb-4">
              <span className="text-xl font-extrabold text-white">Máté</span>
              <span className="text-xl font-normal text-white"> Tetőfedő</span>
              <p className="text-sm font-medium text-[#A8A29E] tracking-widest uppercase mt-0.5">
                &amp; Bádogos
              </p>
            </div>
            <p className="text-[#A8A29E] text-sm leading-relaxed mb-6">
              {dict.tagline}
            </p>
            <a
              href="https://maps.google.com/?q=Gödöllő+Pest+megye+Hungary"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#A8A29E] hover:text-white text-sm transition-colors"
              aria-label={dict.mapsAria}
            >
              <MapPin size={16} aria-hidden="true" />
              {dict.maps}
            </a>
            <p className="text-[#57534E] text-xs mt-8">
              © 2024 Máté Tetőfedő &amp; Bádogos. {dict.rights}
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">
              {dict.navHeading}
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#A8A29E] hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">
              {dict.servicesHeading}
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#A8A29E] hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">
              {dict.contactHeading}
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+36300951686"
                  className="flex items-start gap-3 text-[#A8A29E] hover:text-white text-sm transition-colors"
                >
                  <Phone size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
                  +36 30 095 1686
                </a>
              </li>
              <li>
                <a
                  href="mailto:mate.tetofedo@gmail.com"
                  className="flex items-start gap-3 text-[#A8A29E] hover:text-white text-sm transition-colors"
                >
                  <Mail size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
                  mate.tetofedo@gmail.com
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-[#A8A29E] text-sm">
                  <MapPin size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
                  {dict.location}
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3 text-[#A8A29E] text-sm">
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
      <div className="border-t border-[#2C2517]">
        <div className="container-custom py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <Link
            href={localizePath(lang, "/adatvedelem")}
            className="text-[#57534E] hover:text-[#A8A29E] text-xs transition-colors"
          >
            {dict.privacy}
          </Link>
          <span className="text-[#57534E] text-xs">
            {dict.designedBy}
          </span>
        </div>
      </div>
    </footer>
  );
}
