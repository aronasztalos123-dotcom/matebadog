import { Check, MapPin } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import MaterialSwatch from "@/components/MaterialSwatch";
import ServiceAreaMap from "@/components/ServiceAreaMap";
import type { Dictionary } from "@/lib/i18n/dictionaries";

const countries = ["HU", "AT", "SK", "DE"] as const;

export default function AboutSection({ dict }: { dict: Dictionary["about"] }) {
  const [sinceBefore, sinceAfter] = dict.since.split("{year}");

  return (
    <section id="rolam" className="bg-[#F1F3F4] pb-24 pt-28 md:pb-28 md:pt-32" aria-labelledby="about-heading">
      <div className="container-custom">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          {/* Text column */}
          <FadeIn>
            <p className="label-text mb-5 text-[#C84B11]">{dict.eyebrow}</p>
            <h2
              id="about-heading"
              className="font-display mb-8 text-[clamp(30px,3.6vw,44px)] leading-[1.08] text-[#14181B]"
            >
              {dict.titleLine1}
              <br />
              <span className="text-[#C84B11]">{dict.titleLine2}</span>
            </h2>

            <div className="mb-10 space-y-5 text-base leading-relaxed text-[#4F5A61]">
              {dict.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {dict.checkItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-[#DDE2E5] bg-white p-4 text-sm leading-snug text-[#14181B]"
                >
                  <span
                    className="mt-px grid h-6 w-6 shrink-0 place-items-center rounded-md bg-[#C84B11] text-white"
                    aria-hidden="true"
                  >
                    <Check size={14} strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>

          {/* Craftsman card: years in the trade and the service area */}
          <FadeIn delay={0.12}>
            <div className="relative overflow-hidden rounded-[22px] bg-[#1A2025] text-white shadow-[0_40px_80px_-40px_rgba(20,24,27,0.7)]">
              <MaterialSwatch material="tiles" className="h-28" />
              <div
                className="eave absolute inset-x-0 top-28"
                style={{ "--eave-color": "#7A2C0A" } as React.CSSProperties}
                aria-hidden="true"
              />

              <div className="p-7 pt-12 md:p-9 md:pt-14">
                <p className="flex flex-col">
                  {sinceBefore && <span className="label-text text-white/55">{sinceBefore.trim()}</span>}
                  <span className="font-display text-[clamp(72px,9vw,104px)] leading-[0.95] tracking-tight">2009</span>
                  {sinceAfter && <span className="label-text mt-2 text-white/55">{sinceAfter.trim()}</span>}
                </p>

                <div className="my-8 h-px bg-white/10" />

                <p className="label-text mb-4 text-white/55">{dict.area.title}</p>
                <div className="-mx-2 mb-5">
                  <ServiceAreaMap dict={dict.area} />
                </div>
                <ul className="flex flex-wrap gap-2">
                  {countries.map((code, i) => (
                    <li
                      key={code}
                      className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] ${
                        i === 0 ? "bg-[#C84B11] font-semibold text-white" : "border border-white/12 bg-white/[0.04] text-white/80"
                      }`}
                    >
                      {i === 0 && <MapPin size={13} aria-hidden="true" />}
                      {dict.area.countries[code]}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-[13px] text-white/50">{dict.area.hq}</p>

                <p className="mt-8 font-mono text-xs text-white/35">47.4979° N · 19.0402° E</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
