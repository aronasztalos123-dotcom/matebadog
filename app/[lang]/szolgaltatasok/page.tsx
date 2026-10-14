import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import CtaBanner from "@/components/sections/CtaBanner";
import { ArrowRight } from "lucide-react";
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

function ServicePlaceholderImage({ alt, id, placeholder }: { alt: string; id: string; placeholder: string }) {
  const colors: Record<string, string> = {
    tetofedes: "#C84B11",
    badogos: "#57534E",
    acsszerkezet: "#A33D0D",
    szigeteles: "#2C2517",
  };
  const color = colors[id] || "#C84B11";

  return (
    <div
      className="rounded-card overflow-hidden bg-[#F7F5F2] flex items-center justify-center aspect-[4/3] relative border border-[#E7E5E4]"
      role="img"
      aria-label={alt}
    >
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          aria-hidden="true"
          className="mb-4 opacity-40"
        >
          <rect x="8" y="32" width="48" height="24" rx="3" fill={color} />
          <polygon points="4,34 32,10 60,34" fill={color} opacity="0.7" />
          <rect x="24" y="44" width="16" height="12" rx="2" fill="#1C1917" opacity="0.4" />
        </svg>
        <p className="text-[#A8A29E] text-sm">{placeholder}</p>
      </div>
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />
    </div>
  );
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
        breadcrumbs={[{ label: dict.common.home, href: localizePath(lang, "/") }, { label: t.title }]}
        breadcrumbAria={dict.common.breadcrumbAria}
      />

      {sections.map((section, i) => (
        <section
          key={section.id}
          id={section.id}
          className={i % 2 === 0 ? "bg-white" : "bg-[#F7F5F2]"}
          style={{ paddingTop: 96, paddingBottom: 96 }}
          aria-labelledby={`${section.id}-heading`}
        >
          <div className="container-custom">
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                section.imageLeft ? "lg:grid-flow-dense" : ""
              }`}
            >
              {/* Text */}
              <FadeIn className={section.imageLeft ? "lg:col-start-2" : ""}>
                <h2
                  id={`${section.id}-heading`}
                  className="text-[#1C1917] font-bold mb-6"
                  style={{ fontSize: "clamp(22px, 2.5vw, 30px)", lineHeight: "1.25" }}
                >
                  {section.pageTitle}
                </h2>
                <div className="space-y-4 text-[#57534E] text-base leading-relaxed mb-6">
                  {section.paragraphs.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
                <ul className="space-y-2 mb-6">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2 text-sm text-[#57534E]"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-[#C84B11] mt-2 shrink-0"
                        aria-hidden="true"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-[#A8A29E] italic bg-[#FBE9E0] px-4 py-3 rounded-lg mb-6">
                  {section.priceNote}
                </p>
                <Link href={localizePath(lang, "/arkalkulator")} className="btn-secondary">
                  <ArrowRight size={16} aria-hidden="true" />
                  {t.calculatorCta}
                </Link>
              </FadeIn>

              {/* Image */}
              <FadeIn
                delay={0.12}
                className={section.imageLeft ? "lg:col-start-1 lg:row-start-1" : ""}
              >
                <ServicePlaceholderImage alt={section.alt} id={section.id} placeholder={dict.common.photoPlaceholder} />
              </FadeIn>
            </div>
          </div>
        </section>
      ))}

      <CtaBanner lang={lang} dict={dict.cta} />
    </>
  );
}
