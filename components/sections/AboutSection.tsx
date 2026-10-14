import { Check } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export default function AboutSection({ dict }: { dict: Dictionary["about"] }) {
  return (
    <section
      id="rolam"
      className="bg-[#F7F5F2]"
      style={{ paddingTop: 96, paddingBottom: 96 }}
      aria-labelledby="about-heading"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text column */}
          <FadeIn>
            <p className="label-text text-[#C84B11] mb-4">{dict.eyebrow}</p>
            <h2
              id="about-heading"
              className="text-[#1C1917] font-bold mb-8"
              style={{ fontSize: "clamp(28px, 3.5vw, 38px)", lineHeight: "1.2" }}
            >
              {dict.titleLine1}
              <br />
              {dict.titleLine2}
            </h2>

            <div className="space-y-5 text-[#57534E] text-base leading-relaxed mb-10">
              {dict.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {dict.checkItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    className="w-6 h-6 rounded-full bg-[#FBE9E0] flex items-center justify-center shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    <Check size={13} className="text-[#C84B11]" />
                  </span>
                  <span className="text-[#57534E] text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </FadeIn>

          {/* Image placeholder column */}
          <FadeIn delay={0.15}>
            <div
              className="rounded-card overflow-hidden bg-[#2C2517] flex items-center justify-center aspect-[4/5] relative"
              aria-label={dict.portraitAria}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 80 80"
                  fill="none"
                  className="mb-6 opacity-30"
                  aria-hidden="true"
                >
                  <rect x="10" y="40" width="60" height="30" rx="3" fill="#C84B11" />
                  <polygon points="5,42 40,12 75,42" fill="#A33D0D" />
                  <rect x="30" y="55" width="20" height="15" rx="2" fill="#1C1917" />
                </svg>
                <p className="text-white/30 text-sm">
                  {dict.portraitPlaceholder}
                </p>
              </div>

              {/* Orange accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-1 bg-[#C84B11]"
                aria-hidden="true"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
