import Link from "next/link";
import { Phone } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export default function CtaBanner() {
  return (
    <section
      className="bg-[#C84B11]"
      style={{ paddingTop: 80, paddingBottom: 80 }}
      aria-labelledby="cta-heading"
    >
      <div className="container-custom">
        <FadeIn>
          <div className="text-center">
            <h2
              id="cta-heading"
              className="text-white font-bold mb-4"
              style={{ fontSize: "clamp(24px, 3vw, 36px)", lineHeight: "1.2" }}
            >
              Szüksége van tetőfedőre Gödöllő környékén?
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
              Hívjon most, vagy töltse ki az árajánlat kérő űrlapot. A felmérés
              ingyenes, az árajánlat kötelezettségmentes.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+36300951686"
                className="btn-white"
                aria-label="Hívjon most telefonon"
              >
                <Phone size={18} aria-hidden="true" />
                Hívjon: +36 30 095 1686
              </a>
              <Link href="/kapcsolat" className="btn-white-outline">
                Árajánlatot kérek
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
