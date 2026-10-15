import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import MaterialSwatch, { serviceMaterial } from "@/components/MaterialSwatch";
import { localizePath, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

const serviceIds = ["tetofedes", "badogos", "acsszerkezet", "szigeteles"] as const;

interface ServicesOverviewProps {
  lang: Locale;
  dict: Dictionary["services"];
}

export default function ServicesOverview({ lang, dict }: ServicesOverviewProps) {
  const services = serviceIds.map((id) => ({ id, ...dict.items[id] }));

  return (
    <section id="szolgaltatasok" className="bg-white py-24 md:py-28" aria-labelledby="services-heading">
      <div className="container-custom">
        <FadeIn>
          <div className="mb-14 grid gap-6 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="label-text mb-5 text-[#C84B11]">{dict.eyebrow}</p>
              <h2
                id="services-heading"
                className="font-display text-[clamp(30px,3.6vw,44px)] leading-[1.08] text-[#14181B]"
              >
                {dict.title}
              </h2>
            </div>
            <p className="max-w-md text-lg leading-relaxed text-[#4F5A61] lg:justify-self-end">{dict.subtitle}</p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {services.map((service, i) => (
            <FadeIn key={service.id} delay={i * 0.07}>
              <Link
                href={`${localizePath(lang, "/szolgaltatasok")}#${service.id}`}
                className="group flex h-full flex-col rounded-[22px] border border-[#DDE2E5] bg-white p-2 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#C9D0D4] hover:shadow-card-hover"
              >
                <MaterialSwatch material={serviceMaterial[service.id]} className="h-36 rounded-[16px] md:h-40" />
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-[22px] leading-tight text-[#14181B]">{service.cardTitle}</h3>
                    <span
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#DDE2E5] text-[#14181B] transition-all duration-300 group-hover:-rotate-45 group-hover:border-[#C84B11] group-hover:bg-[#C84B11] group-hover:text-white"
                      aria-hidden="true"
                    >
                      <ArrowRight size={17} />
                    </span>
                  </div>
                  <p className="mt-3 text-[15px] leading-relaxed text-[#4F5A61]">{service.cardDescription}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="rounded-full bg-[#F1F3F4] px-3 py-1 text-[13px] text-[#4F5A61]">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <span className="sr-only">{dict.details}</span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
