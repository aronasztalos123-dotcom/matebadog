import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import KalkulatorClient from "@/components/KalkulatorClient";
import FadeIn from "@/components/FadeIn";
import Link from "next/link";
import { Info, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Árkalkulátor   Tetőfedés és bádogos munkák becsült ára | Máté Tetőfedő",
  description:
    "Számítsa ki tetőfedési munkák becsült költségét. Valós piaci árak alapján, ingyenes. Pontos ár a helyszíni felmérés után.",
  openGraph: {
    title: "Árkalkulátor   Tetőfedés és bádogos munkák becsült ára | Máté Tetőfedő",
    description:
      "Számítsa ki tetőfedési munkák becsült költségét. Valós piaci árak alapján, ingyenes.",
    type: "website",
  },
};

export default function ArkalkulatorPage() {
  return (
    <>
      <PageHero
        title="Árkalkulátor"
        subtitle="Becsülje fel a várható költségeket   valós piaci árak alapján"
        breadcrumbs={[{ label: "Főoldal", href: "/" }, { label: "Árkalkulátor" }]}
      />

      <section className="bg-[#F7F5F2]" style={{ paddingTop: 48, paddingBottom: 16 }}>
        <div className="container-custom">
          {/* Disclaimer */}
          <FadeIn>
            <div className="bg-[#FEF3C7] border border-[#FCD34D] rounded-card px-6 py-4 flex gap-3 items-start mb-0">
              <Info size={18} className="text-[#92400E] shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-[#92400E] text-sm leading-relaxed">
                <strong>Fontos:</strong> Az alábbi árak tájékoztató jellegűek és a piaci
                átlagárakon alapulnak. A pontos ár a helyszíni felmérés után derül ki.
                Ingyenes felmérésért hívjon minket:{" "}
                <a href="tel:+36300951686" className="font-semibold underline">
                  +36 30 095 1686
                </a>
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-[#F7F5F2]" style={{ paddingTop: 32, paddingBottom: 96 }}>
        <div className="container-custom">
          <KalkulatorClient />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#C84B11]" style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="container-custom">
          <FadeIn>
            <div className="text-center">
              <h2 className="text-white font-bold text-2xl mb-3">
                Nem tudja pontosan a méreteket? Semmi gond.
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                Kiszállok, megmérem ingyen, és írásos ajánlatot adok.
                Csak hívjon, vagy töltse ki a kapcsolatfelvételi űrlapot.
              </p>
              <Link href="/kapcsolat" className="btn-white">
                <ArrowRight size={18} aria-hidden="true" />
                Ingyenes felmérést kérek
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
