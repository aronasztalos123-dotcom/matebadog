import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import KapcsolatForm from "@/components/KapcsolatForm";
import FadeIn from "@/components/FadeIn";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Kapcsolat & Árajánlat kérés | Máté Tetőfedő Gödöllő",
  description:
    "Lépjen kapcsolatba tetőfedő mesterünkkel. Ingyenes felmérés, kötelezettségmentes árajánlat. Gödöllő és 30 km-es körzet.",
  openGraph: {
    title: "Kapcsolat & Árajánlat kérés | Máté Tetőfedő Gödöllő",
    description:
      "Lépjen kapcsolatba tetőfedő mesterünkkel. Ingyenes felmérés, kötelezettségmentes árajánlat.",
    type: "website",
  },
};

const hours = [
  { day: "Hétfő", time: "7:00–18:00" },
  { day: "Kedd", time: "7:00–18:00" },
  { day: "Szerda", time: "7:00–18:00" },
  { day: "Csütörtök", time: "7:00–18:00" },
  { day: "Péntek", time: "7:00–18:00" },
  { day: "Szombat", time: "8:00–13:00" },
  { day: "Vasárnap", time: "Zárva" },
];

export default function KapcsolatPage() {
  return (
    <>
      <PageHero
        title="Kapcsolat"
        subtitle="Írjon, hívjon, vagy kérjen ingyenes felmérést"
        breadcrumbs={[{ label: "Főoldal", href: "/" }, { label: "Kapcsolat" }]}
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
                    label="Telefon"
                    value="+36 30 095 1686"
                    sub="Hétfő–Péntek: 7:00–18:00 | Szombat: 8:00–13:00"
                    href="tel:+36300951686"
                  />
                  <ContactBlock
                    icon={<Mail size={20} aria-hidden="true" />}
                    label="E-mail"
                    value="mate.tetofedo@gmail.com"
                    sub="Általában 24 órán belül válaszolok"
                    href="mailto:mate.tetofedo@gmail.com"
                  />
                  <ContactBlock
                    icon={<MapPin size={20} aria-hidden="true" />}
                    label="Székhely"
                    value="Gödöllő, Pest megye"
                    sub="Szolgáltatási körzet: 30 km"
                  />
                </div>

                {/* Working hours */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Clock size={18} className="text-[#C84B11]" aria-hidden="true" />
                    <h3 className="text-[#1C1917] font-semibold text-base">
                      Nyitvatartás
                    </h3>
                  </div>
                  <table className="w-full" aria-label="Nyitvatartási idők">
                    <tbody>
                      {hours.map(({ day, time }) => {
                        const isClosed = time === "Zárva";
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
                              {time}
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
                    title="Máté Tetőfedő helyszíne Google Térképen"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21617.29!2d19.9667394!3d47.6394674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741d5c2f6d9a1c9%3A0x400c4290c1e5fa0!2sG%C3%B6d%C3%B6ll%C5%91!5e0!3m2!1shu!2shu!4v1700000000000!5m2!1shu!2shu"
                    width="100%"
                    height="300"
                    style={{ border: 0, borderRadius: 12 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    aria-label="Gödöllő helyszíne Google Térképen"
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
                    Árajánlat kérés / kapcsolatfelvétel
                  </h2>
                  <p className="text-[#57534E] text-sm">
                    A felmérés és az árajánlat ingyenes és kötelezettségmentes.
                  </p>
                </div>
                <KapcsolatForm />
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
