import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ReferencjakClient from "@/components/ReferencjakClient";
import FadeIn from "@/components/FadeIn";
import { Phone } from "lucide-react";
import { notFound } from "next/navigation";
import { hasLocale, localizePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/i18n/metadata";

type PageParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { referencesPage: t } = await getDictionary(lang);
  return pageMetadata(lang, "/referenciak", {
    title: t.metaTitle,
    description: t.metaDescription,
    ogDescription: t.ogDescription,
  });
}

export default async function ReferencjakPage({ params }: PageParams) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.referencesPage;

  return (
    <>
      <PageHero
        title={t.title}
        subtitle={t.subtitle}
        breadcrumbs={[{ label: dict.common.home, href: localizePath(lang, "/") }, { label: t.title }]}
        breadcrumbAria={dict.common.breadcrumbAria}
      />

      <section className="bg-[#F1F3F4] pb-24 pt-20 md:pt-24">
        <div className="container-custom">
          <ReferencjakClient dict={dict.references} />

          <FadeIn>
            <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-[22px] bg-[#1A2025] p-8 text-white md:flex-row md:items-center md:p-10">
              <p className="max-w-xl text-lg leading-relaxed text-white/80">{t.visitText}</p>
              <a href="tel:+36300951686" className="btn-primary shrink-0" aria-label={t.callAria}>
                <Phone size={17} aria-hidden="true" />
                {dict.common.callNowNumber}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
