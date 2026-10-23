"use client";

import React from "react";
import { Cpu, CheckCircle2, Share2 } from "lucide-react";

interface ToolsSectionProps {
  tools: {
    name: string;
    category: string;
  }[];
  skills?: string[];
  platforms?: string[];
}

export const ToolsSection: React.FC<ToolsSectionProps> = ({
  tools,
  skills = [],
  platforms = [],
}) => {
  return (
    <section id="expertise" className="py-24 px-6 md:px-12 max-w-7xl mx-auto space-y-16">
      {/* 1. Tools Section */}
      <div className="space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A86A]" />
            <span className="text-[11px] md:text-xs font-semibold tracking-[0.25em] text-[#C9A86A] uppercase">
              PRODUCTION TOOLKIT
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F5F2EA]">
            TOOLS I WORK WITH
          </h2>
          <p className="text-sm md:text-base text-[#A7A39A] max-w-xl">
            Generative model pipelines, voice synthesis, and post-production software applied to real video projects.
          </p>
        </div>

        {/* Refined Grid of Tools */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="group p-5 md:p-6 rounded-lg bg-[#151515] border border-white/[0.08] hover:border-[#C9A86A]/40 transition-all duration-300 hover:bg-[#1A1A1A] flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm md:text-base font-bold tracking-wide text-[#F5F2EA] group-hover:text-[#E0C487] transition-colors">
                  {tool.name}
                </span>
                <Cpu className="w-4 h-4 text-[#77736C] group-hover:text-[#C9A86A] transition-colors" />
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.04] text-[11px] uppercase tracking-wider text-[#77736C]">
                {tool.category}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Core Skills Pills */}
      {skills.length > 0 && (
        <div className="space-y-6 pt-4 border-t border-white/[0.06]">
          <div className="space-y-2">
            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-[#F5F2EA]">
              CORE SKILLS & CAPABILITIES
            </h3>
            <p className="text-xs sm:text-sm text-[#A7A39A]">
              Specialized expertise in multi-scene consistency, prompt design, and platform-specific video pacing.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            {skills.map((skill) => (
              <div
                key={skill}
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-md bg-[#151515] border border-white/[0.08] hover:border-[#C9A86A]/40 text-xs sm:text-sm text-[#F5F2EA] transition-all"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A86A]" />
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Distribution Platforms */}
      {platforms.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-white/[0.06]">
          <div className="flex items-center space-x-2 text-[#C9A86A]">
            <Share2 className="w-4 h-4" />
            <h4 className="text-xs font-semibold tracking-widest uppercase">
              DISTRIBUTION PLATFORMS
            </h4>
          </div>

          <div className="flex flex-wrap gap-3">
            {platforms.map((plat) => (
              <span
                key={plat}
                className="px-4 py-2 rounded bg-white/[0.03] border border-white/[0.08] text-xs font-semibold tracking-wider uppercase text-[#F5F2EA]"
              >
                {plat}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
