import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import KapcsolatForm from "@/components/KapcsolatForm";
import FadeIn from "@/components/FadeIn";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { notFound } from "next/navigation";
import { hasLocale, localizePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/i18n/metadata";

type PageParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { contactPage: t } = await getDictionary(lang);
  return pageMetadata(lang, "/kapcsolat", {
    title: t.metaTitle,
    description: t.metaDescription,
    ogDescription: t.ogDescription,
  });
}

const openingTimes = ["7:00–18:00", "7:00–18:00", "7:00–18:00", "7:00–18:00", "7:00–18:00", "8:00–13:00", null];

export default async function KapcsolatPage({ params }: PageParams) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.contactPage;
  const hours = t.days.map((day, i) => ({ day, time: openingTimes[i] }));

  return (
    <>
      <PageHero
        title={t.title}
        subtitle={t.subtitle}
        breadcrumbs={[{ label: dict.common.home, href: localizePath(lang, "/") }, { label: t.title }]}
        breadcrumbAria={dict.common.breadcrumbAria}
      />

      <section
        id="kapcsolat"
        className="bg-[#F1F3F4]"
        style={{ paddingTop: 96, paddingBottom: 96 }}
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left column: Contact details */}
            <FadeIn>
              <div className="space-y-8">
                {/* Contact blocks */}
                <div className="space-y-6">
                  <ContactBlock
                    icon={<Phone size={20} aria-hidden="true" />}
                    label={t.phoneLabel}
                    value="+36 30 095 1686"
                    sub={t.phoneSub}
                    href="tel:+36300951686"
                  />
                  <ContactBlock
                    icon={<Mail size={20} aria-hidden="true" />}
                    label={t.emailLabel}
                    value="mate.tetofedo@gmail.com"
                    sub={t.emailSub}
                    href="mailto:mate.tetofedo@gmail.com"
                  />
                  <ContactBlock
                    icon={<MapPin size={20} aria-hidden="true" />}
                    label={t.hqLabel}
                    value={t.hqValue}
                    sub={t.hqSub}
                  />
                </div>

                {/* Working hours */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Clock size={18} className="text-[#C84B11]" aria-hidden="true" />
                    <h3 className="font-display text-base text-[#14181B]">
                      {t.hoursHeading}
                    </h3>
                  </div>
                  <table className="w-full" aria-label={t.hoursAria}>
                    <tbody>
                      {hours.map(({ day, time }) => {
                        const isClosed = time === null;
                        return (
                          <tr
                            key={day}
                            className="border-b border-[#DDE2E5] last:border-0"
                          >
                            <td className="py-2.5 text-sm text-[#4F5A61] font-medium w-36">
                              {day}
                            </td>
                            <td
                              className={`py-2.5 text-sm text-right ${
                                isClosed
                                  ? "text-[#7F8A91]"
                                  : "text-[#14181B] font-medium"
                              }`}
                            >
                              {time ?? t.closed}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Google Maps embed */}
                <div>
                  <iframe
                    title={t.mapTitle}
                    src="https://maps.google.com/maps?q=Budapest&z=11&output=embed"
                    width="100%"
                    height="300"
                    style={{ border: 0, borderRadius: 12 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    aria-label={t.mapAria}
                  />
                </div>
              </div>
            </FadeIn>

            {/* Right column: Form */}
            <FadeIn delay={0.12}>
              <div
                className="rounded-[24px] border border-[#DDE2E5] bg-white p-7 shadow-[0_30px_60px_-30px_rgba(20,24,27,0.35)] md:p-9"
              >
                <div className="mb-6 pb-6 border-b border-[#DDE2E5]">
                  <h2 className="font-display mb-2 text-2xl text-[#14181B]">
                    {t.formTitle}
                  </h2>
                  <p className="text-[#4F5A61] text-sm">
                    {t.formSubtitle}
                  </p>
                </div>
                <KapcsolatForm dict={dict.contactForm} />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactBlock({
  icon,
  label,
  value,
  sub,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  href?: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#C84B11] text-white shadow-[0_8px_18px_-8px_rgba(200,75,17,0.7)]">
        {icon}
      </div>
      <div>
        <p className="label-text mb-1 text-[#7F8A91]">
          {label}
        </p>
        {href ? (
          <a
            href={href}
            className="text-lg font-semibold text-[#14181B] transition-colors hover:text-[#C84B11]"
          >
            {value}
          </a>
        ) : (
          <p className="text-lg font-semibold text-[#14181B]">{value}</p>
        )}
        <p className="text-[#4F5A61] text-xs mt-0.5">{sub}</p>
      </div>
    </div>
  );
}
