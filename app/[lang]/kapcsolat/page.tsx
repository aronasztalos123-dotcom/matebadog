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
        className="bg-[#F7F5F2]"
        style={{ paddingTop: 80, paddingBottom: 80 }}
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
                    <h3 className="text-[#1C1917] font-semibold text-base">
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
                            className="border-b border-[#E7E5E4] last:border-0"
                          >
                            <td className="py-2.5 text-sm text-[#57534E] font-medium w-36">
                              {day}
                            </td>
                            <td
                              className={`py-2.5 text-sm text-right ${
                                isClosed
                                  ? "text-[#A8A29E]"
                                  : "text-[#1C1917] font-medium"
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
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21617.29!2d19.9667394!3d47.6394674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741d5c2f6d9a1c9%3A0x400c4290c1e5fa0!2sG%C3%B6d%C3%B6ll%C5%91!5e0!3m2!1shu!2shu!4v1700000000000!5m2!1shu!2shu"
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
                className="bg-white rounded-card p-8"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)" }}
              >
                <div className="mb-6 pb-6 border-b border-[#E7E5E4]">
                  <h2 className="text-xl font-bold text-[#1C1917] mb-2">
                    {t.formTitle}
                  </h2>
                  <p className="text-[#57534E] text-sm">
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
      <div className="w-10 h-10 rounded-xl bg-[#FBE9E0] flex items-center justify-center text-[#C84B11] shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium text-[#A8A29E] uppercase tracking-wide mb-0.5">
          {label}
        </p>
        {href ? (
          <a
            href={href}
            className="text-[#1C1917] font-semibold hover:text-[#C84B11] transition-colors text-sm"
          >
            {value}
          </a>
        ) : (
          <p className="text-[#1C1917] font-semibold text-sm">{value}</p>
        )}
        <p className="text-[#57534E] text-xs mt-0.5">{sub}</p>
      </div>
    </div>
  );
}
