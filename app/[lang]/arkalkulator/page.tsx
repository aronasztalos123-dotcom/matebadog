import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import KalkulatorClient from "@/components/KalkulatorClient";
import FadeIn from "@/components/FadeIn";
import Link from "next/link";
import { Info, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { hasLocale, localizePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/i18n/metadata";

type PageParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { calculatorPage: t } = await getDictionary(lang);
  return pageMetadata(lang, "/arkalkulator", {
    title: t.metaTitle,
    description: t.metaDescription,
    ogDescription: t.ogDescription,
  });
}

export default async function ArkalkulatorPage({ params }: PageParams) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.calculatorPage;

  return (
    <>
      <PageHero
        title={t.title}
        subtitle={t.subtitle}
        breadcrumbs={[{ label: dict.common.home, href: localizePath(lang, "/") }, { label: t.title }]}
        breadcrumbAria={dict.common.breadcrumbAria}
      />

      <section className="bg-[#F7F5F2]" style={{ paddingTop: 48, paddingBottom: 16 }}>
        <div className="container-custom">
          {/* Disclaimer */}
          <FadeIn>
            <div className="bg-[#FEF3C7] border border-[#FCD34D] rounded-card px-6 py-4 flex gap-3 items-start mb-0">
              <Info size={18} className="text-[#92400E] shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-[#92400E] text-sm leading-relaxed">
                <strong>{t.importantLabel}</strong> {t.disclaimer}{" "}
                <a href="tel:+36300951686" className="font-semibold underline">
                  +36 30 095 1686
                </a>
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-[#F7F5F2]" style={{ paddingTop: 32, paddingBottom: 96 }}>
        <div className="container-custom">
          <KalkulatorClient lang={lang} dict={dict.calculator} />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#C84B11]" style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="container-custom">
          <FadeIn>
            <div className="text-center">
              <h2 className="text-white font-bold text-2xl mb-3">
                {t.bottomTitle}
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                {t.bottomText}
              </p>
              <Link href={localizePath(lang, "/kapcsolat")} className="btn-white">
                <ArrowRight size={18} aria-hidden="true" />
                {t.bottomCta}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
