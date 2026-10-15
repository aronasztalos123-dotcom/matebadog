import Link from "next/link";
import { ChevronRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  breadcrumbAria?: string;
}

const HERO_BG = "#1A2025";

export default function PageHero({ title, subtitle, breadcrumbs, breadcrumbAria }: PageHeroProps) {
  return (
    <section className="relative z-10 text-white" style={{ backgroundColor: HERO_BG }}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="tile-pattern absolute inset-0 opacity-[0.07]"
          style={{
            maskImage: "linear-gradient(90deg, transparent 35%, black 90%)",
            WebkitMaskImage: "linear-gradient(90deg, transparent 35%, black 90%)",
          }}
        />
      </div>

      <div className="container-custom relative py-16 md:py-20">
        {breadcrumbs && (
          <nav aria-label={breadcrumbAria} className="mb-5">
            <ol className="flex flex-wrap items-center gap-2">
              {breadcrumbs.map((crumb, i) => (
                <li key={i} className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em]">
                  {i > 0 && <ChevronRight size={13} className="text-white/30" aria-hidden="true" />}
                  {crumb.href ? (
                    <Link href={crumb.href} className="text-white/55 transition-colors hover:text-white">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-[#F0A27A]" aria-current="page">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <FadeIn>
          <h1 className="font-display max-w-3xl text-[clamp(34px,4.6vw,56px)] leading-[1.05]">{title}</h1>
          {subtitle && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/65">{subtitle}</p>}
        </FadeIn>
      </div>

      <div
        className="eave absolute inset-x-0 top-full"
        style={{ "--eave-color": HERO_BG } as React.CSSProperties}
        aria-hidden="true"
      />
    </section>
  );
}
