import { notFound } from "next/navigation";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesOverview from "@/components/sections/ServicesOverview";
import ProcessSection from "@/components/sections/ProcessSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CtaBanner from "@/components/sections/CtaBanner";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <HeroSection lang={lang} dict={dict.hero} />
      <AboutSection dict={dict.about} />
      <ServicesOverview lang={lang} dict={dict.services} />
      <ProcessSection dict={dict.process} />
      <TestimonialsSection dict={dict.testimonials} />
      <CtaBanner lang={lang} dict={dict.cta} />
    </>
  );
}
