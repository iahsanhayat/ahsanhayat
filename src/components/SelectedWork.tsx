"use client";

import React, { useState } from "react";
import { Project } from "@/data/portfolioData";
import { ProjectCard } from "./ProjectCard";

interface SelectedWorkProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({
  projects,
  onSelectProject,
}) => {
  const [filter, setFilter] = useState<"ALL" | "FILM" | "CLIENT" | "UGC">("ALL");

  const visibleProjects = projects.filter((p) => !p.hidden);

  const filteredProjects = visibleProjects.filter((p) => {
    if (filter === "ALL") return true;
    if (filter === "FILM") return p.category.includes("FILM");
    if (filter === "CLIENT") return p.isClientProject;
    if (filter === "UGC") return p.category.includes("UGC") || p.category.includes("ADVERTISING");
    return true;
  });

  return (
    <section id="projects" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Header & Subtitle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A86A]" />
            <span className="text-[11px] md:text-xs font-semibold tracking-[0.25em] text-[#C9A86A] uppercase">
              PORTFOLIO SHOWCASE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F5F2EA]">
            SELECTED WORK
          </h2>
          <p className="text-sm md:text-base text-[#A7A39A] max-w-xl">
            "A selection of AI films, client projects, and commercial content."
          </p>
        </div>

        {/* Minimal Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 text-xs font-medium tracking-[0.16em] uppercase">
          {[
            { id: "ALL", label: "ALL WORK" },
            { id: "FILM", label: "AI FILMS" },
            { id: "CLIENT", label: "CLIENT WORK" },
            { id: "UGC", label: "ADVERTISING & UGC" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as typeof filter)}
              className={`px-3.5 py-1.5 rounded text-[11px] transition-all duration-200 ${
                filter === tab.id
                  ? "bg-[#C9A86A] text-[#0B0B0B] font-semibold"
                  : "bg-white/[0.03] text-[#A7A39A] hover:text-[#F5F2EA] border border-white/[0.06]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Editorial Grid: 2-column on desktop, single column on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onSelect={onSelectProject}
          />
        ))}
      </div>
    </section>
  );
};
