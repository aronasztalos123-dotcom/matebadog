import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ReferencjakClient from "@/components/ReferencjakClient";
import FadeIn from "@/components/FadeIn";
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

      <section className="bg-white" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div className="container-custom">
          <ReferencjakClient dict={dict.references} photoPlaceholder={dict.common.photoPlaceholder} />

          <FadeIn>
            <div className="mt-16 bg-[#F7F5F2] rounded-card p-8 text-center border border-[#E7E5E4]">
              <p className="text-[#57534E] text-base leading-relaxed max-w-xl mx-auto">
                {t.visitText}
              </p>
              <a
                href="tel:+36300951686"
                className="btn-primary inline-flex mt-6"
                aria-label={t.callAria}
              >
                {dict.common.callNowNumber}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
