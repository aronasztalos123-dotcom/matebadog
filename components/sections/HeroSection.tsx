"use client";

import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const stats = [
  { value: "15+ év", label: "tapasztalat" },
  { value: "300+", label: "befejezett projekt" },
  { value: "5 év", label: "anyaggarancia" },
];

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.12 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
  };

  return (
    <section
      className="relative min-h-[88vh] flex items-center"
      aria-label="Főoldal bevezető"
      style={{
        background:
          "linear-gradient(135deg, #2C2517 0%, #1C1917 40%, #0f0d0b 100%)",
      }}
    >
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
        aria-hidden="true"
      />

      {/* Subtle orange glow */}
      <div
        className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "#C84B11" }}
        aria-hidden="true"
      />

      <div className="container-custom relative z-10 py-24">
        <motion.div
          className="max-w-[640px]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow */}
          <motion.p
            variants={itemVariants}
            className="label-text text-[#C84B11] mb-5"
          >
            Tetőfedő &amp; Bádogos mester · Gödöllő
          </motion.p>

          {/* H1 */}
          <motion.h1
            variants={itemVariants}
            className="text-white font-bold leading-[1.15] tracking-tight mb-6"
            style={{ fontSize: "clamp(36px, 5vw, 52px)" }}
          >
            Minőségi tető,
            <br />
            amit az idő is igazol.
          </motion.h1>

          {/* Body */}
          <motion.p
            variants={itemVariants}
            className="text-white/80 text-lg leading-relaxed mb-10 max-w-[520px]"
          >
            Több mint 15 éve vállalom Gödöllő és környékén a tetőfedési, bádogos
            és ácsszerkezeti munkákat. Pontos árak, határidők betartása, garanciával.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 mb-14"
          >
            <a href="#kapcsolat" className="btn-primary">
              <ArrowRight size={18} aria-hidden="true" />
              Ingyenes felmérést kérek
            </a>
            <Link href="/arkalkulator" className="btn-white-outline">
              Megnézem az árkalkulátort
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-0 divide-x divide-white/20"
          >
            {stats.map((stat) => (
              <div key={stat.value} className="pr-8 pl-0 first:pl-0 [&:not(:first-child)]:pl-8">
                <p className="text-white text-2xl font-bold leading-tight">
                  {stat.value}
                </p>
                <p className="text-white/60 text-sm mt-0.5">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
}
