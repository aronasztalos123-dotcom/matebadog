import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
}

export default function PageHero({ title, subtitle, breadcrumbs }: PageHeroProps) {
  return (
    <section className="bg-[#1C1917] py-16 md:py-20">
      <div className="container-custom">
        {breadcrumbs && (
          <nav aria-label="Útvonal" className="mb-4">
            <ol className="flex items-center gap-2 flex-wrap">
              {breadcrumbs.map((crumb, i) => (
                <li key={i} className="flex items-center gap-2">
                  {i > 0 && (
                    <ChevronRight size={14} className="text-[#57534E]" aria-hidden="true" />
                  )}
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="text-[#A8A29E] hover:text-white text-sm transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-[#57534E] text-sm">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[#A8A29E] text-lg mt-4 max-w-2xl">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
