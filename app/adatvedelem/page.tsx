import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Adatvédelmi tájékoztató | Máté Tetőfedő & Bádogos",
  description: "Adatvédelmi tájékoztató   Máté Tetőfedő & Bádogos",
};

export default function AdatvedelemPage() {
  return (
    <>
      <PageHero
        title="Adatvédelmi tájékoztató"
        breadcrumbs={[{ label: "Főoldal", href: "/" }, { label: "Adatvédelmi tájékoztató" }]}
      />
      <section className="bg-white" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div className="container-custom max-w-3xl">
          <FadeIn>
            <div className="prose prose-neutral max-w-none text-[#57534E] leading-relaxed space-y-6">
              <h2 className="text-[#1C1917] font-bold text-2xl">Adatkezelési tájékoztató</h2>
              <p>
                Az adatkezelő neve: Máté (egyéni vállalkozó), székhely: Gödöllő, Pest megye.
              </p>
              <p>
                A kapcsolatfelvételi űrlapon megadott személyes adatokat (név, telefonszám,
                e-mail cím, cím) kizárólag az árajánlat elkészítése és a kapcsolatfelvétel
                céljából kezeljük. Az adatokat harmadik félnek nem adjuk át, és az ajánlatadás
                lezárultával töröljük.
              </p>
              <p>
                Az adatkezelés jogalapja: az érintett hozzájárulása (GDPR 6. cikk (1) a) pont).
              </p>
              <p>
                Az érintett bármikor kérheti adatai törlését, módosítását vagy azok
                kezeléséről tájékoztatást a{" "}
                <a
                  href="mailto:mate.tetofedo@gmail.com"
                  className="text-[#C84B11] underline"
                >
                  mate.tetofedo@gmail.com
                </a>{" "}
                e-mail-címen.
              </p>
              <p className="text-sm text-[#A8A29E]">
                Utolsó frissítés: 2024. január 1.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
