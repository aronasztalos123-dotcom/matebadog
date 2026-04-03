import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ReferencjakClient from "@/components/ReferencjakClient";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Referenciák   Befejezett munkáink | Máté Tetőfedő Gödöllő",
  description:
    "Befejezett tetőfedési, bádogos és ácsszerkezeti munkáink Gödöllő és környékéről. Cseréptető, lemez tető, felújítás.",
  openGraph: {
    title: "Referenciák   Befejezett munkáink | Máté Tetőfedő Gödöllő",
    description:
      "Befejezett tetőfedési, bádogos és ácsszerkezeti munkáink Gödöllő és környékéről.",
    type: "website",
  },
};

export default function ReferencjakPage() {
  return (
    <>
      <PageHero
        title="Referenciák"
        subtitle="Befejezett munkáink fotói   Gödöllő és környékéről"
        breadcrumbs={[{ label: "Főoldal", href: "/" }, { label: "Referenciák" }]}
      />

      <section className="bg-white" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div className="container-custom">
          <ReferencjakClient />

          <FadeIn>
            <div className="mt-16 bg-[#F7F5F2] rounded-card p-8 text-center border border-[#E7E5E4]">
              <p className="text-[#57534E] text-base leading-relaxed max-w-xl mx-auto">
                Szeretné látni a munkáimat a helyszínen? Hívjon, és elmegyünk egy-két
                elkészült munkámhoz, hogy meggyőződhessen a minőségről.
              </p>
              <a
                href="tel:+36300951686"
                className="btn-primary inline-flex mt-6"
                aria-label="Hívjon telefonon"
              >
                Hívjon most: +36 30 095 1686
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
