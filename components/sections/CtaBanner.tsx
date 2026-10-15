import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { localizePath, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface CtaBannerProps {
  lang: Locale;
  dict: Dictionary["cta"];
  /** Background of the section above, so its eave hangs into the banner */
  eaveColor?: string;
}

const CTA_BG = "#C84B11";

export default function CtaBanner({ lang, dict, eaveColor = "#FFFFFF" }: CtaBannerProps) {
  return (
    <section className="relative z-10 text-white" style={{ backgroundColor: CTA_BG }} aria-labelledby="cta-heading">
      <div
        className="eave absolute inset-x-0 top-0 z-10"
        style={{ "--eave-color": eaveColor } as React.CSSProperties}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="tile-pattern absolute inset-0 opacity-[0.12]"
          style={{
            maskImage: "linear-gradient(90deg, transparent 20%, black 85%)",
            WebkitMaskImage: "linear-gradient(90deg, transparent 20%, black 85%)",
          }}
        />
      </div>

      <div className="container-custom relative grid items-center gap-10 py-20 md:py-24 lg:grid-cols-[1.2fr_1fr]">
        <FadeIn>
          <h2 id="cta-heading" className="font-display text-[clamp(30px,3.8vw,46px)] leading-[1.06]">
            {dict.title}
          </h2>
          <p className="mt-5 max-w-xl text-lg text-white/85">{dict.text}</p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="flex flex-col items-start gap-3 lg:items-end">
            <a
              href="tel:+36300951686"
              className="group flex items-center gap-4 rounded-2xl bg-white py-4 pl-4 pr-7 text-[#14181B] shadow-[0_24px_48px_-20px_rgba(60,20,4,0.7)] transition-transform duration-300 hover:-translate-y-1"
              aria-label={dict.callAria}
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#C84B11] text-white transition-transform duration-300 group-hover:rotate-[-12deg]">
                <Phone size={20} aria-hidden="true" />
              </span>
              <span className="flex flex-col">
                <span className="label-text text-[#7F8A91]">{dict.call}</span>
                <span className="font-mono text-[22px] font-semibold leading-tight tracking-tight">+36 30 095 1686</span>
              </span>
            </a>
            <Link href={localizePath(lang, "/kapcsolat")} className="btn-white-outline group">
              {dict.quote}
              <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </FadeIn>
      </div>

      {/* Tile ends hanging over the footer */}
      <div
        className="eave absolute inset-x-0 top-full"
        style={{ "--eave-color": CTA_BG } as React.CSSProperties}
        aria-hidden="true"
      />
    </section>
  );
}
