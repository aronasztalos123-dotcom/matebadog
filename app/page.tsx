import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesOverview from "@/components/sections/ServicesOverview";
import ProcessSection from "@/components/sections/ProcessSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CtaBanner from "@/components/sections/CtaBanner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesOverview />
      <ProcessSection />
      <TestimonialsSection />
      <CtaBanner />
    </>
  );
}
