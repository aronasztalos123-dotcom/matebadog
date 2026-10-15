"use client";

import { motion, useReducedMotion } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import type { Dictionary } from "@/lib/i18n/dictionaries";

const ease = [0.22, 1, 0.36, 1] as const;

export default function ProcessSection({ dict }: { dict: Dictionary["process"] }) {
  const reduce = useReducedMotion();
  const steps = dict.steps.map((step, i) => ({ ...step, number: String(i + 1).padStart(2, "0") }));

  return (
    <section className="bg-[#F1F3F4] py-24 md:py-28" aria-labelledby="process-heading">
      <div className="container-custom">
        <FadeIn>
          <div className="mx-auto mb-16 max-w-xl text-center">
            <p className="label-text mb-5 text-[#C84B11]">{dict.eyebrow}</p>
            <h2
              id="process-heading"
              className="font-display text-[clamp(30px,3.6vw,44px)] leading-[1.08] text-[#14181B]"
            >
              {dict.title}
            </h2>
          </div>
        </FadeIn>

        <div className="relative">
          {/* The line fills in step by step as the section scrolls into view */}
          <div className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-[2px] bg-[#DDE2E5] lg:block" aria-hidden="true">
            <motion.div
              className="h-full origin-left bg-[#C84B11]"
              initial={{ scaleX: reduce ? 1 : 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1.4, ease, delay: 0.2 }}
            />
          </div>

          <ol className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {steps.map((step, i) => (
              <motion.li
                key={step.number}
                className="relative flex flex-col items-start lg:items-center lg:text-center"
                initial={{ opacity: 0, y: reduce ? 0 : 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, ease, delay: reduce ? 0 : 0.2 + i * 0.3 }}
              >
                <span className="relative z-10 mb-6 grid h-14 w-14 place-items-center rounded-full border-2 border-[#C84B11] bg-white font-mono text-lg font-semibold text-[#C84B11] shadow-card">
                  {step.number}
                </span>
                <h3 className="font-display mb-2 text-[19px] leading-snug text-[#14181B]">{step.title}</h3>
                <p className="max-w-[260px] text-sm leading-relaxed text-[#4F5A61]">{step.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
