import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const services = [
  {
    id: "tetofedes",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <rect x="4" y="20" width="28" height="12" rx="2" fill="currentColor" opacity="0.2" />
        <polygon points="2,22 18,6 34,22" fill="currentColor" />
        <rect x="14" y="26" width="8" height="6" rx="1" fill="currentColor" opacity="0.6" />
      </svg>
    ),
    title: "Tetőfedés",
    description:
      "Legyen szó új tető kialakításáról vagy a régi csere, mindent megoldunk profi anyagokkal és precíz kivitelezéssel.",
    bullets: [
      "Cseréptető (kerámia és beton cserép)",
      "Trapézlemez tető",
      "Hullámlemez tető",
      "Bitumenes zsindelytető",
      "Síkfedés (EPDM, bitumen)",
      "Tetőfelújítás és részleges javítás",
    ],
  },
  {
    id: "badogos",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <path d="M4 28 Q18 14 32 28" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <rect x="2" y="28" width="32" height="4" rx="2" fill="currentColor" opacity="0.3" />
        <circle cx="18" cy="12" r="4" fill="currentColor" opacity="0.6" />
        <rect x="16" y="16" width="4" height="12" rx="1" fill="currentColor" opacity="0.4" />
      </svg>
    ),
    title: "Bádogos munkák",
    description:
      "Az esővíz elvezetésétől az egyedi lemez megmunkálásig   a bádogos részletek nem csak esztétikai, hanem védelmi szerepet is betöltenek.",
    bullets: [
      "Ereszcsatorna rendszer szerelése (PVC és alumínium)",
      "Szellőzők, tetőátvezetések",
      "Villámszigetelés csatlakozások",
      "Oromlemezek, takarólemezek",
      "Kéménygallér és esővédő",
      "Egyedi fémlemez megmunkálás",
    ],
  },
  {
    id: "acsszerkezet",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <rect x="2" y="28" width="32" height="3" rx="1.5" fill="currentColor" opacity="0.4" />
        <rect x="8" y="14" width="3" height="14" rx="1.5" fill="currentColor" opacity="0.6" />
        <rect x="25" y="14" width="3" height="14" rx="1.5" fill="currentColor" opacity="0.6" />
        <line x1="18" y1="5" x2="8" y2="14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="18" y1="5" x2="28" y2="14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="8" y1="14" x2="28" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Ácsszerkezet",
    description:
      "A tető tartószerkezete az alap. Ha a szarufák, szelemnek vagy egyéb faszerkezet sérült, azt időben kell kezelni.",
    bullets: [
      "Teljes ácsszerkezet tervezés és kivitelezés",
      "Részleges faszerkezet csere (korhadt gerendák)",
      "Szarufacsere és megerősítés",
      "Tetőtér beépítés előkészítése",
      "Héjazat alatti deszkazás",
      "Szélléc és ereszléc felszerelés",
    ],
  },
  {
    id: "szigeteles",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <rect x="4" y="8" width="28" height="5" rx="2" fill="currentColor" />
        <rect x="4" y="16" width="28" height="5" rx="2" fill="currentColor" opacity="0.6" />
        <rect x="4" y="24" width="28" height="5" rx="2" fill="currentColor" opacity="0.3" />
      </svg>
    ),
    title: "Szigetelés & egyéb",
    description:
      "A megfelelő fólia és lécezés megvédi a tetőszerkezetet a nedvességtől, és energiahatékonyabbá teszi az otthonát.",
    bullets: [
      "Párazáró és páraáteresztő fólia fektetés",
      "Lécezés (lécrács kiosztás)",
      "Tetőablak beépítés (VELUX és egyéb)",
      "Hővédő fólia fektetés",
      "Kémény körüli szigetelés és tömítés",
      "Esővédő hálók és szél elleni védelem",
    ],
  },
];

export default function ServicesOverview() {
  return (
    <section
      id="szolgaltatasok"
      className="bg-white"
      style={{ paddingTop: 96, paddingBottom: 96 }}
      aria-labelledby="services-heading"
    >
      <div className="container-custom">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="label-text text-[#C84B11] mb-4">Szolgáltatások</p>
            <h2
              id="services-heading"
              className="text-[#1C1917] font-bold mb-4"
              style={{ fontSize: "clamp(28px, 3.5vw, 38px)", lineHeight: "1.2" }}
            >
              Mindent elvégzek, ami a tető körül szükséges.
            </h2>
            <p className="text-[#57534E] text-lg">
              Tetőfedéstől a bádogos részletekig, az ácsszerkezettől a szigetelésig  
              egy kézből, egy vállalkozástól.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <FadeIn key={service.id} delay={i * 0.08}>
              <article
                className="bg-white border border-[#E7E5E4] rounded-card p-8 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)" }}
              >
                <div
                  className="w-14 h-14 rounded-xl bg-[#FBE9E0] flex items-center justify-center text-[#C84B11] mb-6"
                  aria-hidden="true"
                >
                  {service.icon}
                </div>
                <h3 className="text-[#1C1917] text-xl font-semibold mb-3">
                  {service.title}
                </h3>
                <p className="text-[#57534E] text-sm leading-relaxed mb-5">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.bullets.map((bullet) => (
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
                <Link
                  href={`/szolgaltatasok#${service.id}`}
                  className="inline-flex items-center gap-1.5 text-[#C84B11] text-sm font-semibold group-hover:gap-2.5 transition-all duration-200"
                >
                  Részletek
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
