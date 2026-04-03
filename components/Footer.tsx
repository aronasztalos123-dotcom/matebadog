import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const navLinks = [
  { href: "/", label: "Főoldal" },
  { href: "/szolgaltatasok", label: "Szolgáltatások" },
  { href: "/arkalkulator", label: "Árkalkulátor" },
  { href: "/referenciak", label: "Referenciák" },
  { href: "/kapcsolat", label: "Kapcsolat" },
];

const serviceLinks = [
  { href: "/szolgaltatasok#tetofedes", label: "Tetőfedés" },
  { href: "/szolgaltatasok#badogos", label: "Bádogos munkák" },
  { href: "/szolgaltatasok#acsszerkezet", label: "Ácsszerkezet" },
  { href: "/szolgaltatasok#szigeteles", label: "Szigetelés" },
  { href: "/szolgaltatasok#tetofedes", label: "Tetőfelújítás" },
  { href: "/szolgaltatasok#szigeteles", label: "Tetőablak beépítés" },
];

export default function Footer() {
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
              Minőségi tetőmunkák Gödöllő és környékén.
            </p>
            <a
              href="https://maps.google.com/?q=Gödöllő+Pest+megye+Hungary"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#A8A29E] hover:text-white text-sm transition-colors"
              aria-label="Megtekintés Google Térképen"
            >
              <MapPin size={16} aria-hidden="true" />
              Google Térképen
            </a>
            <p className="text-[#57534E] text-xs mt-8">
              © 2024 Máté Tetőfedő &amp; Bádogos. Minden jog fenntartva.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">
              Navigáció
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
              Szolgáltatások
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
              Elérhetőség
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
                  Gödöllő, Pest megye
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3 text-[#A8A29E] text-sm">
                  <Clock size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <p>Hétfő–Péntek: 7:00–18:00</p>
                    <p>Szombat: 8:00–13:00</p>
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
            href="/adatvedelem"
            className="text-[#57534E] hover:text-[#A8A29E] text-xs transition-colors"
          >
            Adatvédelmi tájékoztató
          </Link>
          <span className="text-[#57534E] text-xs">
            Weboldal tervezve: Máté Tetőfedő &amp; Bádogos
          </span>
        </div>
      </div>
    </footer>
  );
}
