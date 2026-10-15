"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Calendar, MapPin, X } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import MaterialSwatch, { type Material } from "@/components/MaterialSwatch";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type FilterKey = "osszes" | "csereptet" | "lemeztet" | "badogos" | "acsmu" | "felujitas";
type Category = Exclude<FilterKey, "osszes">;

const filterKeys: FilterKey[] = ["osszes", "csereptet", "lemeztet", "badogos", "acsmu", "felujitas"];

const categoryMaterial: Record<Category, Material> = {
  csereptet: "tiles",
  lemeztet: "seam",
  badogos: "seam",
  acsmu: "timber",
  felujitas: "tiles",
};

interface ProjectData {
  id: number;
  location: string;
  year: number;
  category: Category;
}

interface Project extends ProjectData {
  title: string;
  detail: string;
}

// Titles and details are translated; they come from the dictionary in the same order.
const projectData: ProjectData[] = [
  { id: 1, location: "Gödöllő, Dózsa György út", year: 2024, category: "csereptet" },
  { id: 2, location: "Aszód, Petőfi utca", year: 2024, category: "lemeztet" },
  { id: 3, location: "Pécel", year: 2023, category: "badogos" },
  { id: 4, location: "Isaszeg", year: 2023, category: "felujitas" },
  { id: 5, location: "Mogyoród", year: 2023, category: "csereptet" },
  { id: 6, location: "Kistarcsa", year: 2023, category: "acsmu" },
  { id: 7, location: "Gödöllő", year: 2022, category: "lemeztet" },
  { id: 8, location: "Bag", year: 2022, category: "badogos" },
  { id: 9, location: "Vácszentlászló", year: 2022, category: "badogos" },
  { id: 10, location: "Gödöllő", year: 2022, category: "csereptet" },
  { id: 11, location: "Pécel", year: 2021, category: "badogos" },
  { id: 12, location: "Aszód", year: 2021, category: "felujitas" },
];

const spring = { type: "spring", stiffness: 420, damping: 36 } as const;

export default function ReferencjakClient({ dict }: { dict: Dictionary["references"] }) {
  const projects: Project[] = projectData.map((p, i) => ({ ...p, ...dict.projects[i] }));
  const reduce = useReducedMotion();

  const [activeFilter, setActiveFilter] = useState<FilterKey>("osszes");
  const [selected, setSelected] = useState<Project | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const filtered = activeFilter === "osszes" ? projects : projects.filter((p) => p.category === activeFilter);

  const open = (project: Project, opener: HTMLElement) => {
    openerRef.current = opener;
    setSelected(project);
  };

  useEffect(() => {
    if (!selected) return;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      openerRef.current?.focus();
    };
  }, [selected]);

  return (
    <>
      {/* Filter bar */}
      <FadeIn>
        <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label={dict.filtersAria}>
          {filterKeys.map((key) => {
            const isActive = activeFilter === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveFilter(key)}
                aria-pressed={isActive}
                className={`relative rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "border-[#14181B] text-white"
                    : "border-[#DDE2E5] bg-white text-[#4F5A61] hover:border-[#7F8A91] hover:text-[#14181B]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-[#14181B]"
                    transition={reduce ? { duration: 0 } : spring}
                    aria-hidden="true"
                  />
                )}
                <span className="relative">{dict.filters[key]}</span>
              </button>
            );
          })}
        </div>
      </FadeIn>

      <motion.ul layout={!reduce} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {filtered.map((project) => (
            <motion.li
              key={project.id}
              layout={!reduce}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.15 } }}
              transition={reduce ? { duration: 0 } : spring}
            >
              <button
                type="button"
                onClick={(e) => open(project, e.currentTarget)}
                className="group block w-full rounded-[22px] border border-[#DDE2E5] bg-white p-2 text-left transition-[box-shadow,border-color] duration-300 hover:border-[#C9D0D4] hover:shadow-card-hover"
              >
                <MaterialSwatch material={categoryMaterial[project.category]} className="aspect-[16/10] rounded-[16px]">
                  <span className="absolute left-3 top-3 rounded-full bg-[#14181B]/70 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-white backdrop-blur-sm">
                    {dict.filters[project.category]}
                  </span>
                  <span
                    className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white text-[#14181B] opacity-0 transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                    aria-hidden="true"
                  >
                    <ArrowUpRight size={16} />
                  </span>
                </MaterialSwatch>
                <div className="px-3 pb-3 pt-4">
                  <h3 className="font-display text-[17px] leading-snug text-[#14181B]">{project.title}</h3>
                  <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-[#4F5A61]">
                    <span className="flex items-center gap-1">
                      <MapPin size={13} aria-hidden="true" />
                      {project.location}
                    </span>
                    <span className="font-mono text-[#7F8A91]">{project.year}</span>
                    {project.detail && <span className="font-mono text-[#C84B11]">{project.detail}</span>}
                  </p>
                </div>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {filtered.length === 0 && <p className="py-16 text-center text-[#7F8A91]">{dict.noResults}</p>}

      {/* Project details */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-[#14181B]/70 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-dialog-title"
              className="w-full max-w-xl overflow-hidden rounded-[24px] bg-white shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]"
              initial={{ opacity: 0, y: reduce ? 0 : 24, scale: reduce ? 1 : 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: reduce ? 0 : 12, scale: reduce ? 1 : 0.98, transition: { duration: 0.15 } }}
              transition={reduce ? { duration: 0 } : spring}
              onClick={(e) => e.stopPropagation()}
            >
              <MaterialSwatch material={categoryMaterial[selected.category]} className="aspect-[16/8]">
                <span className="absolute bottom-4 left-5 rounded-full bg-[#14181B]/70 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-white backdrop-blur-sm">
                  {dict.filters[selected.category]}
                </span>
              </MaterialSwatch>
              <div className="flex items-start justify-between gap-4 p-6">
                <div>
                  <h3 id="project-dialog-title" className="font-display text-xl leading-snug text-[#14181B]">
                    {selected.title}
                  </h3>
                  <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 text-sm text-[#4F5A61]">
                    <dt>
                      <MapPin size={15} className="mt-0.5 text-[#7F8A91]" aria-hidden="true" />
                    </dt>
                    <dd>{selected.location}</dd>
                    <dt>
                      <Calendar size={15} className="mt-0.5 text-[#7F8A91]" aria-hidden="true" />
                    </dt>
                    <dd className="font-mono">
                      {selected.year}
                      {selected.detail && <span className="ml-3 text-[#C84B11]">{selected.detail}</span>}
                    </dd>
                  </dl>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setSelected(null)}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#DDE2E5] text-[#4F5A61] transition-colors hover:border-[#14181B] hover:text-[#14181B]"
                  aria-label={dict.close}
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
