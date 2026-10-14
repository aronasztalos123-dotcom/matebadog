import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import { notFound } from "next/navigation";
import { hasLocale, localizePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/i18n/metadata";

type PageParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { privacyPage: t } = await getDictionary(lang);
  return pageMetadata(lang, "/adatvedelem", { title: t.metaTitle, description: t.metaDescription });
}

export default async function AdatvedelemPage({ params }: PageParams) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.privacyPage;

  return (
    <>
      <PageHero
        title={t.title}
        breadcrumbs={[{ label: dict.common.home, href: localizePath(lang, "/") }, { label: t.title }]}
        breadcrumbAria={dict.common.breadcrumbAria}
      />
      <section className="bg-white" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div className="container-custom max-w-3xl">
          <FadeIn>
            <div className="prose prose-neutral max-w-none text-[#57534E] leading-relaxed space-y-6">
              <h2 className="text-[#1C1917] font-bold text-2xl">{t.heading}</h2>
              <p>{t.controller}</p>
              <p>{t.purpose}</p>
              <p>{t.legalBasis}</p>
              <p>
                {t.rightsBefore}{" "}
                <a
                  href="mailto:mate.tetofedo@gmail.com"
                  className="text-[#C84B11] underline"
                >
                  mate.tetofedo@gmail.com
                </a>
                {t.rightsAfter}
              </p>
              <p className="text-sm text-[#A8A29E]">
                {t.lastUpdated}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
