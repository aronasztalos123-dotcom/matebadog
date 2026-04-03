import FadeIn from "@/components/FadeIn";

const steps = [
  {
    number: "01",
    title: "Kapcsolatfelvétel",
    text: "Hívjon fel vagy töltse ki a kapcsolatfelvételi űrlapot. Általában 24 órán belül visszajelzek.",
  },
  {
    number: "02",
    title: "Ingyenes felmérés",
    text: "Kiszállok a helyszínre, megmérem a tetőt, felmérem az állapotát, és meghallgatom az elképzeléseit. Ez teljesen ingyenes.",
  },
  {
    number: "03",
    title: "Részletes árajánlat",
    text: "Írásos, tételes árajánlatot adok: anyagok, munkadíj, kellékek   minden tétel külön feltüntetve. Nincs rejtett költség.",
  },
  {
    number: "04",
    title: "Kivitelezés & átadás",
    text: "A megbeszélt időpontban elvégzem a munkát. Befejezés után átvesszük, és 5 év garanciát adok az elvégzett munkára.",
  },
];

export default function ProcessSection() {
  return (
    <section
      className="bg-[#F7F5F2]"
      style={{ paddingTop: 96, paddingBottom: 96 }}
      aria-labelledby="process-heading"
    >
      <div className="container-custom">
        <FadeIn>
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="label-text text-[#C84B11] mb-4">Munkamenet</p>
            <h2
              id="process-heading"
              className="text-[#1C1917] font-bold"
              style={{ fontSize: "clamp(28px, 3.5vw, 38px)", lineHeight: "1.2" }}
            >
              Egyszerű folyamat, átlátható árazás.
            </h2>
          </div>
        </FadeIn>

        {/* Steps   horizontal timeline on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector line (desktop only) */}
          <div
            className="hidden lg:block absolute top-10 left-[calc(12.5%+2rem)] right-[calc(12.5%+2rem)] h-px bg-[#E7E5E4]"
            aria-hidden="true"
          />

          {steps.map((step, i) => (
            <FadeIn key={step.number} delay={i * 0.1}>
              <div className="flex flex-col items-start lg:items-center lg:text-center">
                {/* Number bubble */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full bg-white border-2 border-[#C84B11] flex items-center justify-center shadow-card">
                    <span className="text-2xl font-bold text-[#C84B11]">
                      {step.number}
                    </span>
                  </div>
                </div>
                <h3 className="text-[#1C1917] text-lg font-semibold mb-3">
                  {step.title}
                </h3>
                <p className="text-[#57534E] text-sm leading-relaxed">{step.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
