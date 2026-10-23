"use client";

import React from "react";
import { Play, Sparkles, Clock, ArrowUpRight } from "lucide-react";
import { Project } from "@/data/portfolioData";

interface FeaturedProjectProps {
  project: Project;
  onWatchFilm: (project: Project) => void;
}

export const FeaturedProject: React.FC<FeaturedProjectProps> = ({
  project,
  onWatchFilm,
}) => {
  return (
    <section id="work" className="scroll-mt-16 py-24 px-6 md:px-12 relative overflow-hidden border-y border-white/[0.06] bg-transparent">
      {/* Animated Anamorphic Lens Flare Line */}
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A86A]/25 to-transparent pointer-events-none blur-[0.5px]" />

      {/* Dynamic Animated Ambient Light Auras */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-gradient-to-tr from-[#C9A86A]/20 via-[#EAB308]/25 to-transparent rounded-full blur-[170px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#C9A86A]/15 rounded-full blur-[150px] pointer-events-none animate-[pulse_6s_ease-in-out_infinite]" />

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2.5 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A86A]" />
              <span className="text-[11px] md:text-xs font-semibold tracking-[0.25em] text-[#C9A86A] uppercase">
                FEATURED SHORT FILM
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F5F2EA]">
              {project.title}
            </h2>
          </div>

          <div className="flex items-center space-x-4 text-xs tracking-wider text-[#A7A39A]">
            <span className="flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1.5 text-[#C9A86A]" />
              {project.duration}
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-[#C9A86A] uppercase">{project.category}</span>
          </div>
        </div>

        {/* Visually Dominant Hero Poster Canvas with Click-to-Play */}
        <div
          onClick={() => onWatchFilm(project)}
          className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-[#151515] border border-white/[0.1] shadow-2xl cursor-pointer group"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onWatchFilm(project);
            }
          }}
          aria-label={`Watch ${project.title}`}
        >
          {/* Main Poster Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />

          {/* Cinematic Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/85 via-black/20 to-black/30 group-hover:bg-black/30 transition-colors duration-500" />

          {/* Center Play Button Callout */}
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#C9A86A] text-[#0B0B0B] flex items-center justify-center pl-1 shadow-[0_0_40px_rgba(201,168,106,0.35)] transform scale-100 group-hover:scale-110 transition-transform duration-300">
              <Play className="w-8 h-8 md:w-10 md:h-10 fill-current" />
            </div>

            <div className="px-5 py-2 rounded-full bg-[#0B0B0B]/70 border border-white/10 backdrop-blur-md text-xs font-semibold tracking-[0.2em] uppercase text-[#F5F2EA] flex items-center space-x-2 group-hover:border-[#C9A86A]/50 transition-colors">
              <span>WATCH FILM</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#C9A86A]" />
            </div>
          </div>

          {/* Bottom Left Corner Banner */}
          <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 max-w-lg pointer-events-none">
            <span className="text-[11px] font-semibold tracking-[0.2em] text-[#C9A86A] uppercase">
              01 — CINEMATIC SPOTLIGHT
            </span>
            <p className="text-sm md:text-base text-[#F5F2EA] mt-1 font-medium drop-shadow-md">
              Full 5-minute fantasy short film rendered with cutting-edge AI generation.
            </p>
          </div>
        </div>

        {/* Project Details Below Video */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-4">
          {/* Left: Summary & Long Description */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xl font-bold tracking-tight text-[#F5F2EA]">
              Concept & Storytelling
            </h3>
            <p className="text-base text-[#A7A39A] leading-relaxed">
              {project.description}
            </p>
            {project.longDescription && (
              <p className="text-sm text-[#77736C] leading-relaxed">
                {project.longDescription}
              </p>
            )}

            <div className="pt-2">
              <button
                onClick={() => onWatchFilm(project)}
                className="btn-shimmer group inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C9A86A] via-[#dfbf82] to-[#C9A86A] text-[#0B0B0B] font-bold text-xs tracking-[0.18em] uppercase shadow-[0_10px_35px_-8px_rgba(201,168,106,0.5)] hover:shadow-[0_15px_45px_-5px_rgba(201,168,106,0.7)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 border-t border-white/50"
              >
                <Play className="w-4 h-4 mr-2.5 fill-current text-[#0B0B0B] group-hover:scale-110 transition-transform duration-300" />
                WATCH FULL FILM
              </button>
            </div>
          </div>

          {/* Right: Role & Tools */}
          <div className="lg:col-span-5 space-y-6 lg:border-l lg:border-white/[0.08] lg:pl-10">
            <div>
              <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#F5F2EA] mb-3">
                My Role
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.role.map((r) => (
                  <span
                    key={r}
                    className="text-xs px-3 py-1.5 rounded bg-white/[0.04] border border-white/[0.06] text-[#A7A39A] font-medium"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#F5F2EA] mb-3">
                Tools
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1.5 rounded bg-[#C9A86A]/5 border border-[#C9A86A]/20 text-[#C9A86A] font-medium flex items-center"
                  >
                    <Sparkles className="w-3 h-3 mr-1.5 opacity-70" />
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
