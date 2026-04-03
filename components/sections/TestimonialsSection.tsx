import FadeIn from "@/components/FadeIn";
import { Star } from "lucide-react";

const testimonials = [
  {
    stars: 5,
    quote:
      "Nagyon precíz és megbízható mester. Pontosan jött ki, pontosan annyit számolt fel, amennyit mondott. A szomszédoknak is ajánlottam.",
    name: "Kovács Péterné",
    location: "Gödöllő",
  },
  {
    stars: 5,
    quote:
      "Teljesen felújítottuk a tetőt   cseréptől az ereszcsatornáig. Egy hét alatt végzett, és azóta nem volt egyetlen beázás sem. Nagyon elégedett vagyok.",
    name: "Tóth János",
    location: "Isaszeg",
  },
  {
    stars: 5,
    quote:
      "Vihar után kaptam a számot. Másnap már kint volt, megcsinálta a sürgős javítást, és azután visszajött az állandó megoldással is. Profi munka.",
    name: "Balogh Éva",
    location: "Pécel",
  },
];

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-1 mb-4" aria-label={`${count} csillag az 5-ből`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={16} className="fill-[#C84B11] text-[#C84B11]" aria-hidden="true" />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section
      className="bg-white"
      style={{ paddingTop: 96, paddingBottom: 96 }}
      aria-labelledby="testimonials-heading"
    >
      <div className="container-custom">
        <FadeIn>
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="label-text text-[#C84B11] mb-4">Vélemények</p>
            <h2
              id="testimonials-heading"
              className="text-[#1C1917] font-bold"
              style={{ fontSize: "clamp(28px, 3.5vw, 38px)", lineHeight: "1.2" }}
            >
              Mit mondanak az ügyfeleink?
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible -mx-6 px-6 md:mx-0 md:px-0">
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.1}>
              <article
                className="bg-white border border-[#E7E5E4] rounded-card p-8 min-w-[280px] md:min-w-0"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)" }}
              >
                <StarRow count={t.stars} />
                <blockquote className="text-[#57534E] text-sm leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <footer>
                  <p className="text-[#1C1917] font-semibold text-sm">{t.name}</p>
                  <p className="text-[#A8A29E] text-xs">{t.location}</p>
                </footer>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <p className="text-center text-[#A8A29E] text-sm mt-10">
            Valódi Google-vélemények alapján · Átlag: 5.0 ★
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
