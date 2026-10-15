import FadeIn from "@/components/FadeIn";
import { MapPin, Quote, Star } from "lucide-react";
import { fill } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

const reviewers = [
  { stars: 5, name: "Kovács Péterné", location: "Gödöllő" },
  { stars: 5, name: "Tóth János", location: "Isaszeg" },
  { stars: 5, name: "Balogh Éva", location: "Pécel" },
];

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

export default function TestimonialsSection({ dict }: { dict: Dictionary["testimonials"] }) {
  const testimonials = reviewers.map((r, i) => ({ ...r, quote: dict.quotes[i] }));

  return (
    <section className="bg-white py-24 md:py-28" aria-labelledby="testimonials-heading">
      <div className="container-custom">
        <FadeIn>
          <div className="mx-auto mb-14 max-w-xl text-center">
            <p className="label-text mb-5 text-[#C84B11]">{dict.eyebrow}</p>
            <h2
              id="testimonials-heading"
              className="font-display text-[clamp(30px,3.6vw,44px)] leading-[1.08] text-[#14181B]"
            >
              {dict.title}
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.1} className="h-full">
              <article className="flex h-full flex-col rounded-[22px] border border-[#DDE2E5] bg-white p-7 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex gap-0.5" role="img" aria-label={fill(dict.starsAria, { count: t.stars })}>
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <Star key={j} size={16} className="fill-[#E8A33D] text-[#E8A33D]" aria-hidden="true" />
                    ))}
                  </div>
                  <Quote size={30} className="text-[#C84B11]/20" aria-hidden="true" />
                </div>
                <blockquote className="flex-1 text-[15.5px] leading-relaxed text-[#14181B]">{t.quote}</blockquote>
                <footer className="mt-7 flex items-center gap-3 border-t border-[#DDE2E5] pt-5">
                  <span
                    className="font-display grid h-10 w-10 place-items-center rounded-full bg-[#F1F3F4] text-[13px] text-[#4F5A61]"
                    aria-hidden="true"
                  >
                    {initials(t.name)}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#14181B]">{t.name}</p>
                    <p className="flex items-center gap-1 text-xs text-[#7F8A91]">
                      <MapPin size={12} aria-hidden="true" />
                      {t.location}
                    </p>
                  </div>
                </footer>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <p className="mt-10 text-center text-sm text-[#7F8A91]">{dict.footnote}</p>
        </FadeIn>
      </div>
    </section>
  );
}
