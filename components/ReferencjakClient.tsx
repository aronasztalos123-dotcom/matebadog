"use client";

import { useState } from "react";
import { X } from "lucide-react";
import FadeIn from "@/components/FadeIn";

type FilterKey = "osszes" | "csereptet" | "lemeztet" | "badogos" | "acsmu" | "felujitas";

const filters: { key: FilterKey; label: string }[] = [
  { key: "osszes", label: "Összes" },
  { key: "csereptet", label: "Cseréptető" },
  { key: "lemeztet", label: "Lemez tető" },
  { key: "badogos", label: "Bádogos" },
  { key: "acsmu", label: "Ácsmunka" },
  { key: "felujitas", label: "Felújítás" },
];

interface Project {
  id: number;
  title: string;
  location: string;
  year: number;
  detail: string;
  category: FilterKey;
  color: string;
}

const projects: Project[] = [
  { id: 1, title: "Cseréptető csere", location: "Gödöllő, Dózsa György út", year: 2024, detail: "95 nm", category: "csereptet", color: "#C84B11" },
  { id: 2, title: "Trapézlemez tető", location: "Aszód, Petőfi utca", year: 2024, detail: "140 nm", category: "lemeztet", color: "#57534E" },
  { id: 3, title: "Ereszcsatorna csere", location: "Pécel", year: 2023, detail: "60 fm", category: "badogos", color: "#1C1917" },
  { id: 4, title: "Teljes tetőfelújítás", location: "Isaszeg", year: 2023, detail: "120 nm", category: "felujitas", color: "#A33D0D" },
  { id: 5, title: "Beton cseréptető", location: "Mogyoród", year: 2023, detail: "80 nm", category: "csereptet", color: "#C84B11" },
  { id: 6, title: "Ácsmunka + cseréptető", location: "Kistarcsa", year: 2023, detail: "110 nm", category: "acsmu", color: "#2C2517" },
  { id: 7, title: "Hullámlemez garázstető", location: "Gödöllő", year: 2022, detail: "60 nm", category: "lemeztet", color: "#57534E" },
  { id: 8, title: "Tetőablak beépítés", location: "Bag", year: 2022, detail: "2 db VELUX", category: "badogos", color: "#1C1917" },
  { id: 9, title: "Kémény körüli tömítés", location: "Vácszentlászló", year: 2022, detail: "", category: "badogos", color: "#A8A29E" },
  { id: 10, title: "Bitumenes zsindelytető", location: "Gödöllő", year: 2022, detail: "55 nm", category: "csereptet", color: "#C84B11" },
  { id: 11, title: "Ereszcsatorna + szellőző", location: "Pécel", year: 2021, detail: "", category: "badogos", color: "#57534E" },
  { id: 12, title: "Teljes csere cseréptetőre", location: "Aszód", year: 2021, detail: "175 nm", category: "felujitas", color: "#A33D0D" },
];

function RoofPlaceholderSvg({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 160 120"
      fill="none"
      className="w-16 h-12 opacity-30"
      aria-hidden="true"
    >
      <rect x="20" y="60" width="120" height="50" rx="4" fill={color} />
      <polygon points="10,64 80,16 150,64" fill={color} opacity="0.7" />
      <rect x="64" y="80" width="32" height="30" rx="3" fill="#1C1917" opacity="0.3" />
    </svg>
  );
}

export default function ReferencjakClient() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("osszes");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered =
    activeFilter === "osszes"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <>
      {/* Filter bar */}
      <FadeIn>
        <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Szűrők">
          {filters.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setActiveFilter(f.key)}
              className={`px-4 py-2 rounded-pill text-sm font-medium transition-all duration-150 border ${
                activeFilter === f.key
                  ? "bg-[#C84B11] text-white border-[#C84B11]"
                  : "bg-white text-[#57534E] border-[#E7E5E4] hover:border-[#C84B11] hover:text-[#C84B11]"
              }`}
              aria-pressed={activeFilter === f.key}
            >
              {f.label}
            </button>
          ))}
        </div>
      </FadeIn>

      {/* Masonry grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-0">
        {filtered.map((project, i) => (
          <FadeIn key={project.id} delay={i * 0.04}>
            <article
              className="break-inside-avoid mb-4 rounded-card overflow-hidden border border-[#E7E5E4] cursor-pointer group relative"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
              onClick={() => setSelectedProject(project)}
              role="button"
              tabIndex={0}
              aria-label={`${project.title}   ${project.location} · ${project.year}`}
              onKeyDown={(e) => e.key === "Enter" && setSelectedProject(project)}
            >
              {/* Placeholder image */}
              <div
                className="aspect-square flex flex-col items-center justify-center bg-[#F7F5F2] relative transition-transform duration-300 group-hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${project.color}18 0%, #F7F5F2 100%)`,
                }}
              >
                <RoofPlaceholderSvg color={project.color} />
                <p className="text-xs text-[#A8A29E] mt-3 px-4 text-center">
                  {project.title}
                </p>
                <p className="text-xs text-[#C84B11] font-medium">
                  {project.detail}
                </p>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#1C1917]/80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-card">
                <p className="text-white font-semibold text-center px-4">
                  {project.title}
                </p>
                <p className="text-white/70 text-sm mt-1">{project.location}</p>
                <p className="text-white/50 text-xs mt-0.5">
                  {project.year} {project.detail && `· ${project.detail}`}
                </p>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-[#A8A29E] py-16">
          Nincs találat ebben a kategóriában.
        </p>
      )}

      {/* Lightbox modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={selectedProject.title}
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white rounded-card max-w-xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Placeholder large image */}
            <div
              className="aspect-video flex flex-col items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${selectedProject.color}22 0%, #F7F5F2 100%)`,
              }}
              role="img"
              aria-label={`${selectedProject.title} munkafotó`}
            >
              <RoofPlaceholderSvg color={selectedProject.color} />
              <p className="text-[#A8A29E] text-sm mt-3">
                Ide kerül a munkafotó
              </p>
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-[#1C1917] font-semibold text-lg">
                    {selectedProject.title}
                  </h3>
                  <p className="text-[#57534E] text-sm mt-1">
                    {selectedProject.location} · {selectedProject.year}
                    {selectedProject.detail && ` · ${selectedProject.detail}`}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="p-2 text-[#A8A29E] hover:text-[#1C1917] transition-colors rounded-md shrink-0"
                  aria-label="Bezárás"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
