import Link from "next/link";
import { Phone } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { localizePath, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface CtaBannerProps {
  lang: Locale;
  dict: Dictionary["cta"];
}

export default function CtaBanner({ lang, dict }: CtaBannerProps) {
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
              {dict.title}
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
              {dict.text}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+36300951686"
                className="btn-white"
                aria-label={dict.callAria}
              >
                <Phone size={18} aria-hidden="true" />
                {dict.call}
              </a>
              <Link href={localizePath(lang, "/kapcsolat")} className="btn-white-outline">
                {dict.quote}
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
