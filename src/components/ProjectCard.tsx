"use client";

import React from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { Project } from "@/data/portfolioData";

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const isVertical = project.aspectRatio === "9:16";

  return (
    <div
      onClick={() => onSelect(project)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(project);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View project ${project.title}`}
      className="group relative flex flex-col bg-[#151515] border border-white/[0.08] hover:border-[#C9A86A]/40 rounded-lg overflow-hidden transition-all duration-500 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#C9A86A]"
    >
      {/* Thumbnail Frame */}
      <div
        className={`relative w-full overflow-hidden bg-black/50 ${
          isVertical ? "aspect-[4/5] sm:aspect-[3/4]" : "aspect-[16/10]"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.thumbnail}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />

        {/* Ambient Overlay that darkens slightly on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

        {/* Category & Badge Chips */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
          <span className="text-[10px] tracking-[0.2em] uppercase font-semibold px-2.5 py-1 rounded bg-[#0B0B0B]/80 backdrop-blur-md text-[#C9A86A] border border-white/[0.08]">
            {project.category}
          </span>

          {project.isClientProject && (
            <span className="text-[9px] tracking-[0.16em] uppercase font-bold px-2 py-0.5 rounded bg-[#C9A86A]/20 text-[#E0C487] border border-[#C9A86A]/30 backdrop-blur-md">
              CLIENT PROJECT
            </span>
          )}
        </div>

        {/* Center subtle play icon reveal on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="w-14 h-14 rounded-full bg-[#C9A86A] text-[#0B0B0B] flex items-center justify-center pl-0.5 shadow-xl transform scale-90 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-6 h-6 fill-current" />
          </div>
        </div>
      </div>

      {/* Card Metadata */}
      <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
        <div>
          {/* Project Number */}
          <div className="text-[11px] font-mono tracking-[0.2em] text-[#77736C] uppercase mb-1">
            {project.number}
          </div>

          {/* Title */}
          <h3 className="text-lg md:text-xl font-bold tracking-tight text-[#F5F2EA] group-hover:text-[#F5F2EA] transition-transform duration-300 group-hover:translate-x-1">
            {project.title}
          </h3>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-[#A7A39A] mt-2 line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Footer info: Duration + VIEW PROJECT Action */}
        <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
          <span className="text-[#77736C] text-[11px] tracking-wider uppercase font-medium">
            {project.duration || "Watch Video"}
          </span>

          <div className="inline-flex items-center text-[#C9A86A] group-hover:text-[#E0C487] font-semibold tracking-[0.16em] uppercase text-[11px] transition-colors">
            <span>VIEW PROJECT</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
};
