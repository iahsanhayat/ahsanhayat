"use client";

import React from "react";
import { Briefcase, GraduationCap, Video, Palette, CheckCircle, ArrowUpRight } from "lucide-react";

interface ExperienceSectionProps {
  experience: {
    title: string;
    position: string;
    platform: string;
    dates: string;
    responsibilities: string[];
    earlier: {
      title: string;
      text: string;
    };
  };
  ownChannels: {
    title: string;
    text: string;
    platforms: string[];
  };
  education: {
    degree: string;
    institution: string;
    status: string;
  };
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experience,
  ownChannels,
  education,
}) => {
  return (
    <section id="experience" className="py-24 px-6 md:px-12 max-w-7xl mx-auto space-y-16">
      {/* Section Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center space-x-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A86A]" />
          <span className="text-[11px] md:text-xs font-semibold tracking-[0.25em] text-[#C9A86A] uppercase">
            CAREER & TRACK RECORD
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F5F2EA]">
          {experience.title}
        </h2>
        <p className="text-sm md:text-base text-[#A7A39A] max-w-xl">
          End-to-end production track record across international freelance clientele and original digital series.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Experience: Fiverr Level 2 Seller */}
        <div className="lg:col-span-8 space-y-8">
          <div className="p-8 rounded-lg bg-[#151515] border border-white/[0.08] hover:border-[#C9A86A]/40 transition-all duration-300 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-5">
              <div>
                <a
                  href="https://www.fiverr.com/startic1122"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs font-mono tracking-widest uppercase text-[#C9A86A] hover:text-[#E0C487] transition-colors group/fiverr"
                  title="Open Fiverr Profile (startic1122)"
                >
                  <span>{experience.platform}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/fiverr:translate-x-0.5 group-hover/fiverr:-translate-y-0.5" />
                </a>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-[#F5F2EA] mt-1">
                  {experience.position}
                </h3>
              </div>

              <div className="flex items-center space-x-2 self-start sm:self-auto">
                <a
                  href="https://www.fiverr.com/startic1122"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] px-3 py-1 rounded bg-[#C9A86A]/10 hover:bg-[#C9A86A]/20 border border-[#C9A86A]/25 text-[#C9A86A] font-semibold tracking-wider uppercase transition-colors inline-flex items-center space-x-1"
                >
                  <span>Visit Profile</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
                <span className="text-xs px-3 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-[#A7A39A] font-medium">
                  {experience.dates}
                </span>
              </div>
            </div>

            {/* Responsibilities list */}
            <ul className="space-y-3.5 text-xs sm:text-sm text-[#A7A39A] leading-relaxed">
              {experience.responsibilities.map((resp, i) => (
                <li key={i} className="flex items-start space-x-3">
                  <CheckCircle className="w-4 h-4 text-[#C9A86A] shrink-0 mt-0.5" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Earlier Experience Subsection */}
          <div className="p-6 rounded-lg bg-[#111111] border border-white/[0.06] flex items-start space-x-4">
            <div className="p-2.5 rounded-md bg-[#C9A86A]/10 text-[#C9A86A] shrink-0">
              <Palette className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <h4 className="text-sm font-bold tracking-wider uppercase text-[#F5F2EA]">
                {experience.earlier.title}
              </h4>
              <p className="text-xs sm:text-sm text-[#A7A39A] leading-relaxed">
                {experience.earlier.text}
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar: Own Channels & Original Series + Education */}
        <div className="lg:col-span-4 space-y-6">
          {/* Own Channels & Original Series */}
          <div className="p-7 rounded-lg bg-[#151515] border border-white/[0.08] space-y-4">
            <div className="flex items-center space-x-2 text-[#C9A86A]">
              <Video className="w-4 h-4" />
              <span className="text-xs font-semibold tracking-widest uppercase">
                ORIGINAL CONTENT
              </span>
            </div>

            <h3 className="text-base font-bold tracking-tight text-[#F5F2EA]">
              {ownChannels.title}
            </h3>

            <p className="text-xs sm:text-sm text-[#A7A39A] leading-relaxed">
              {ownChannels.text}
            </p>

            <div className="pt-2 flex flex-wrap gap-2">
              {ownChannels.platforms.map((plat) => (
                <span
                  key={plat}
                  className="text-[11px] px-2.5 py-1 rounded bg-white/[0.03] border border-white/[0.06] text-[#C9A86A] font-medium"
                >
                  {plat}
                </span>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="p-7 rounded-lg bg-[#151515] border border-white/[0.08] space-y-3">
            <div className="flex items-center space-x-2 text-[#C9A86A]">
              <GraduationCap className="w-4 h-4" />
              <span className="text-xs font-semibold tracking-widest uppercase">
                ACADEMIC BACKGROUND
              </span>
            </div>

            <h3 className="text-base font-bold tracking-tight text-[#F5F2EA]">
              {education.degree}
            </h3>

            <p className="text-xs text-[#A7A39A]">
              {education.institution}
            </p>

            <div className="pt-1 text-[11px] font-mono text-[#C9A86A] tracking-wider uppercase">
              {education.status}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
