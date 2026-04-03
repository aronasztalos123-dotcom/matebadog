import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import CtaBanner from "@/components/sections/CtaBanner";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Szolgáltatások   Tetőfedés, Bádogos, Ácsszerkezet | Máté Tetőfedő",
  description:
    "Tetőfedés, bádogos munkák, ácsszerkezet és szigetelés Gödöllő és környékén. Minden tetőhöz kapcsolódó munkát elvégzünk.",
  openGraph: {
    title: "Szolgáltatások   Tetőfedés, Bádogos, Ácsszerkezet | Máté Tetőfedő",
    description: "Tetőfedés, bádogos munkák, ácsszerkezet és szigetelés Gödöllő és környékén.",
    type: "website",
  },
};

interface ServiceSection {
  id: string;
  title: string;
  alt: string;
  paragraphs: string[];
  bullets: string[];
  priceNote: string;
  imageLeft?: boolean;
}

const sections: ServiceSection[] = [
  {
    id: "tetofedes",
    title: "Tetőfedés   minden anyaggal, minden tetőn",
    alt: "Tetőfedési munkák illusztrációja",
    paragraphs: [
      "A tetőfedés az egyik legfontosabb döntés, amit egy ház tulajdonosa hozhat. Rossz minőségű munka esetén a beázás nem csak kellemetlen, de komoly szerkezeti károkat is okozhat. Ezért nem spórolok sem az anyagokon, sem a munkán.",
      "Kerámiát és beton cserepet egyaránt felszerelünk. A kerámia cserép hosszabb élettartamú és könnyebb, a beton olcsóbb, de nehezebb   együtt mérlegelünk a tetőszerkezet teherbírása alapján.",
      "Lemeztetőkhöz trapéz- és hullámlemezzel is dolgozom. Ezek gazdaságos, tartós megoldások mezőgazdasági épületekre, garázsokra, és kerti épületekre.",
    ],
    bullets: [
      "Cseréptető (kerámia és beton cserép)",
      "Trapézlemez tető",
      "Hullámlemez tető",
      "Bitumenes zsindelytető",
      "Síkfedés (EPDM, bitumen)",
      "Tetőfelújítás és részleges javítás",
    ],
    priceNote: "Tájékoztató ár: Cseréptető 6.000–9.000 Ft/nm anyaggal és munkával. Lemez: 4.500–7.500 Ft/nm anyaggal és munkával.",
    imageLeft: false,
  },
  {
    id: "badogos",
    title: "Bádogos munkák   az esővíztől az egyedi megmunkálásig",
    alt: "Bádogos munkák illusztrációja",
    paragraphs: [
      "A bádogos munkák célja az esővíz megfelelő elvezetése és a tető érzékeny pontjainak védelme. Egy rossz ereszcsatorna vagy hiányzó széllemez hosszú távon komoly károkat tud okozni a falakban és az alapokban.",
      "Horganyzott és alumínium ereszcsatornával egyaránt dolgozom. Az alumínium tartósabb és könnyebb, a PVC olcsóbb   az ajánlatnál mindkét variációt részletezem.",
      "Kémény körüli villámszigeteléssel, tetőátvezetésekkel és oromlemezekkel is foglalkozom. Ezek a részletek sokszor elmaradnak, de a beázások 60%-a ezeken a pontokon keletkezik.",
    ],
    bullets: [
      "Ereszcsatorna rendszer szerelése (PVC és alumínium)",
      "Szellőzők, tetőátvezetések",
      "Villámszigetelés csatlakozások",
      "Oromlemezek, takarólemezek",
      "Kéménygallér és esővédő",
      "Egyedi fémlemez megmunkálás",
    ],
    priceNote: "Tájékoztató ár: Ereszcsatorna szerelés: 3.500–5.500 Ft/fm. Egyedi bádogos munka díja megbeszélés szerint.",
    imageLeft: true,
  },
  {
    id: "acsszerkezet",
    title: "Ácsszerkezet   az alap, amire minden épül",
    alt: "Ácsszerkezeti munkák illusztrációja",
    paragraphs: [
      "A tetőszerkezet fából készül, és ha nedvesség éri, megindulhat a korhadás. Sajnos sok esetben ezt csak tetőcsere közben veszik észre. Ezért minden felmérés alkalmával a szerkezetet is megvizsgálom.",
      "Teljes ácsszerkezet csere esetén statikus tervrajz alapján dolgozom, és az engedélyeztetésben is segítek. Kisebb gerendacsere esetén nem kell engedély   ezt gyorsan el lehet intézni.",
    ],
    bullets: [
      "Teljes ácsszerkezet tervezés és kivitelezés",
      "Részleges faszerkezet csere (korhadt gerendák)",
      "Szarufacsere és megerősítés",
      "Tetőtér beépítés előkészítése",
      "Héjazat alatti deszkazás",
      "Szélléc és ereszléc felszerelés",
    ],
    priceNote: "Tájékoztató ár: Ácsszerkezeti munka: 5.000–8.000 Ft/nm a munkadíj, anyag nélkül.",
    imageLeft: false,
  },
  {
    id: "szigeteles",
    title: "Szigetelés és fóliázás   ami a tető alatt van",
    alt: "Szigetelési munkák illusztrációja",
    paragraphs: [
      "A modern tetőknél az alátét fólia nélkülözhetetlen. Megakadályozza, hogy a szél által felhajtott csapadék bejusson a tetőszerkezetbe, és a kondenz vizet is elvezeti. Kétféle fóliával dolgozom: párazáróval és páraáteresztővel   a felhasználás helye dönti el, melyik kerül hova.",
      "A lécezés kiosztása szintén kritikus: ha rossz a lécköz, a cserép nem fog jól illeszkedni. 15 éve ezzel foglalkozom, ezért automatikusan elvégzem a kiosztást minden cserepes tetőnél.",
    ],
    bullets: [
      "Párazáró és páraáteresztő fólia fektetés",
      "Lécezés (lécrács kiosztás)",
      "Tetőablak beépítés (VELUX és egyéb)",
      "Hővédő fólia fektetés",
      "Kémény körüli szigetelés és tömítés",
      "Esővédő hálók és szél elleni védelem",
    ],
    priceNote: "Tájékoztató ár: Fólia és lécezés: 1.800–2.800 Ft/nm anyaggal és munkával.",
    imageLeft: true,
  },
];

function ServicePlaceholderImage({ alt, id }: { alt: string; id: string }) {
  const colors: Record<string, string> = {
    tetofedes: "#C84B11",
    badogos: "#57534E",
    acsszerkezet: "#A33D0D",
    szigeteles: "#2C2517",
  };
  const color = colors[id] || "#C84B11";

  return (
    <div
      className="rounded-card overflow-hidden bg-[#F7F5F2] flex items-center justify-center aspect-[4/3] relative border border-[#E7E5E4]"
      role="img"
      aria-label={alt}
    >
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          aria-hidden="true"
          className="mb-4 opacity-40"
        >
          <rect x="8" y="32" width="48" height="24" rx="3" fill={color} />
          <polygon points="4,34 32,10 60,34" fill={color} opacity="0.7" />
          <rect x="24" y="44" width="16" height="12" rx="2" fill="#1C1917" opacity="0.4" />
        </svg>
        <p className="text-[#A8A29E] text-sm">Ide kerül a munkafotó</p>
      </div>
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />
    </div>
  );
}

export default function SzolgaltatasokPage() {
  return (
    <>
      <PageHero
        title="Szolgáltatások"
        breadcrumbs={[{ label: "Főoldal", href: "/" }, { label: "Szolgáltatások" }]}
      />

      {sections.map((section, i) => (
        <section
          key={section.id}
          id={section.id}
          className={i % 2 === 0 ? "bg-white" : "bg-[#F7F5F2]"}
          style={{ paddingTop: 96, paddingBottom: 96 }}
          aria-labelledby={`${section.id}-heading`}
        >
          <div className="container-custom">
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                section.imageLeft ? "lg:grid-flow-dense" : ""
              }`}
            >
              {/* Text */}
              <FadeIn className={section.imageLeft ? "lg:col-start-2" : ""}>
                <h2
                  id={`${section.id}-heading`}
                  className="text-[#1C1917] font-bold mb-6"
                  style={{ fontSize: "clamp(22px, 2.5vw, 30px)", lineHeight: "1.25" }}
                >
                  {section.title}
                </h2>
                <div className="space-y-4 text-[#57534E] text-base leading-relaxed mb-6">
                  {section.paragraphs.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
                <ul className="space-y-2 mb-6">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2 text-sm text-[#57534E]"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-[#C84B11] mt-2 shrink-0"
                        aria-hidden="true"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-[#A8A29E] italic bg-[#FBE9E0] px-4 py-3 rounded-lg mb-6">
                  {section.priceNote}
                </p>
                <Link href="/arkalkulator" className="btn-secondary">
                  <ArrowRight size={16} aria-hidden="true" />
                  Kalkulátorban kiszámítom
                </Link>
              </FadeIn>

              {/* Image */}
              <FadeIn
                delay={0.12}
                className={section.imageLeft ? "lg:col-start-1 lg:row-start-1" : ""}
              >
                <ServicePlaceholderImage alt={section.alt} id={section.id} />
              </FadeIn>
            </div>
          </div>
        </section>
      ))}

      <CtaBanner />
    </>
  );
}
