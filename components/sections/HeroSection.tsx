"use client";

import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import RoofIllustration from "@/components/RoofIllustration";
import { localizePath, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface HeroSectionProps {
  lang: Locale;
  dict: Dictionary["hero"];
}

const HERO_BG = "#1A2025";
const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroSection({ lang, dict }: HeroSectionProps) {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: 0.05 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
  };
  // Headline lines rise out of a mask
  const line: Variants = {
    hidden: { y: reduce ? 0 : "105%" },
    visible: { y: 0, transition: { duration: 0.8, ease } },
  };

  return (
    <section className="relative z-10 text-white" style={{ backgroundColor: HERO_BG }} aria-label={dict.aria}>
      {/* Faint drafting grid, strongest behind the roof */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse 60% 70% at 75% 50%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 70% at 75% 50%, black, transparent)",
        }}
        aria-hidden="true"
      />

      <div className="container-custom relative grid items-center gap-12 py-14 md:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:py-16">
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.p variants={item} className="label-text mb-6 flex items-center gap-3 text-[#F0A27A]">
            <span className="h-px w-8 bg-[#C84B11]" aria-hidden="true" />
            {dict.eyebrow}
          </motion.p>

          <h1 className="font-display mb-7 text-[clamp(36px,4.3vw,56px)] leading-[1.02]">
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span variants={line} className="block">
                {dict.titleLine1}
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span variants={line} className="block text-[#EE7A3F]">
                {dict.titleLine2}
              </motion.span>
            </span>
          </h1>

          <motion.p variants={item} className="mb-10 max-w-[520px] text-lg leading-relaxed text-white/75">
            {dict.body}
          </motion.p>

          <motion.div variants={item} className="mb-12 flex flex-wrap gap-3">
            <Link href={localizePath(lang, "/kapcsolat")} className="btn-primary group">
              {dict.ctaPrimary}
              <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link href={localizePath(lang, "/arkalkulator")} className="btn-white-outline">
              <Calculator size={17} aria-hidden="true" />
              {dict.ctaSecondary}
            </Link>
          </motion.div>

          <motion.dl variants={item} className="grid max-w-[520px] grid-cols-3 border-t border-white/12">
            {dict.stats.map((stat) => (
              <div key={stat.value} className="border-white/12 pt-5 pr-3 [&:not(:first-child)]:border-l [&:not(:first-child)]:pl-3 sm:pr-4 sm:[&:not(:first-child)]:pl-5">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-mono text-[clamp(17px,2.2vw,26px)] font-semibold leading-none text-white">
                  {stat.value}
                </dd>
                <dd className="mt-2 text-[13px] leading-snug text-white/55" aria-hidden="true">
                  {stat.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <div className="mx-auto w-full max-w-[560px] lg:max-w-none">
          <RoofIllustration lang={lang} />
        </div>
      </div>

      {/* Tile ends hanging over the next section */}
      <div
        className="eave absolute inset-x-0 top-full"
        style={{ "--eave-color": HERO_BG } as React.CSSProperties}
        aria-hidden="true"
      />
    </section>
  );
}
