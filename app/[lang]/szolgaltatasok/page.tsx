import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import MaterialSwatch, { serviceMaterial } from "@/components/MaterialSwatch";
import CtaBanner from "@/components/sections/CtaBanner";
import { ArrowRight, Check } from "lucide-react";
import { notFound } from "next/navigation";
import { hasLocale, localizePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/i18n/metadata";

type PageParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { servicesPage: t } = await getDictionary(lang);
  return pageMetadata(lang, "/szolgaltatasok", {
    title: t.metaTitle,
    description: t.metaDescription,
    ogDescription: t.ogDescription,
  });
}

const sectionLayout = [
  { id: "tetofedes", imageLeft: false },
  { id: "badogos", imageLeft: true },
  { id: "acsszerkezet", imageLeft: false },
  { id: "szigeteles", imageLeft: true },
] as const;

/** "Indicative price: 6,000–9,000 Ft/m²…" → label and value */
function splitPriceNote(note: string) {
  const i = note.indexOf(":");
  return i === -1 ? { label: "", value: note } : { label: note.slice(0, i), value: note.slice(i + 1).trim() };
}

export default async function SzolgaltatasokPage({ params }: PageParams) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.servicesPage;
  const sections = sectionLayout.map((layout) => ({ ...layout, ...dict.services.items[layout.id] }));

  return (
    <>
      <PageHero
        title={t.title}
        subtitle={dict.services.subtitle}
        breadcrumbs={[{ label: dict.common.home, href: localizePath(lang, "/") }, { label: t.title }]}
        breadcrumbAria={dict.common.breadcrumbAria}
      />

      {/* Jump links to each service */}
      <nav aria-label={t.title} className="border-b border-[#DDE2E5] bg-white pb-5 pt-10">
        <ul className="container-custom flex flex-wrap gap-2">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="flex items-center gap-2.5 rounded-full border border-[#DDE2E5] bg-white py-1.5 pl-1.5 pr-4 text-sm font-medium text-[#14181B] transition-colors hover:border-[#C84B11] hover:text-[#C84B11]"
              >
                <MaterialSwatch material={serviceMaterial[section.id]} className="h-7 w-7 rounded-full" />
                {section.cardTitle}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {sections.map((section, i) => {
        const price = splitPriceNote(section.priceNote);
        return (
          <section
            key={section.id}
            id={section.id}
            className={`py-20 md:py-28 ${i % 2 === 0 ? "bg-white" : "bg-[#F1F3F4]"}`}
            aria-labelledby={`${section.id}-heading`}
          >
            <div className="container-custom">
              <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
                {/* Text */}
                <FadeIn className={section.imageLeft ? "lg:order-2" : ""}>
                  <h2
                    id={`${section.id}-heading`}
                    className="font-display mb-6 text-[clamp(26px,3vw,38px)] leading-[1.1] text-[#14181B]"
                  >
                    {section.pageTitle}
                  </h2>
                  <div className="mb-8 space-y-4 text-base leading-relaxed text-[#4F5A61]">
                    {section.paragraphs.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                  <ul className="mb-9 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2.5 text-sm leading-snug text-[#14181B]">
                        <Check size={16} strokeWidth={2.5} className="mt-0.5 shrink-0 text-[#C84B11]" aria-hidden="true" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <Link href={localizePath(lang, "/arkalkulator")} className="btn-secondary group">
                    {t.calculatorCta}
                    <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </FadeIn>

                {/* Material panel with the indicative price */}
                <FadeIn delay={0.12} className={section.imageLeft ? "lg:order-1" : ""}>
                  <div className="group relative">
                    <MaterialSwatch
                      material={serviceMaterial[section.id]}
                      className="aspect-[4/3] rounded-[24px] shadow-[0_40px_80px_-40px_rgba(20,24,27,0.55)]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" aria-hidden="true" />
                    </MaterialSwatch>
                    <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/95 p-5 shadow-[0_18px_40px_-18px_rgba(20,24,27,0.5)] backdrop-blur-sm md:inset-x-auto md:left-6 md:bottom-6 md:max-w-[340px]">
                      {price.label && <p className="label-text mb-1.5 text-[#C84B11]">{price.label}</p>}
                      <p className="text-sm font-medium leading-relaxed text-[#14181B]">{price.value}</p>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </section>
        );
      })}

      <CtaBanner lang={lang} dict={dict.cta} eaveColor="#F1F3F4" />
    </>
  );
}
