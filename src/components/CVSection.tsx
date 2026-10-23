"use client";

import React from "react";
import { Download, Mail } from "lucide-react";

interface CVSectionProps {
  cvPath: string;
}

export const CVSection: React.FC<CVSectionProps> = ({ cvPath }) => {
  return (
    <section id="cv" className="py-24 px-6 md:px-12 bg-[#0E0E0E]/75 backdrop-blur-sm border-y border-white/[0.06]">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center space-x-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A86A]" />
          <span className="text-[11px] md:text-xs font-semibold tracking-[0.25em] text-[#C9A86A] uppercase">
            COLLABORATION & HIRING
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F5F2EA]">
          LET'S WORK TOGETHER
        </h2>

        <p className="text-base sm:text-lg text-[#A7A39A] max-w-xl mx-auto leading-relaxed">
          "Interested in working together? Download my CV or get in touch."
        </p>

        {/* Buttons (Luxury Tactile Buttons) */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-5">
          <a
            href={cvPath}
            download="Ahsan-Hayat-CV.pdf"
            className="btn-shimmer group w-full sm:w-auto inline-flex items-center justify-center px-9 py-4 rounded-full bg-gradient-to-r from-[#C9A86A] via-[#dfbf82] to-[#C9A86A] text-[#0B0B0B] font-bold text-xs tracking-[0.18em] uppercase shadow-[0_10px_35px_-8px_rgba(201,168,106,0.5)] hover:shadow-[0_15px_45px_-5px_rgba(201,168,106,0.7)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 border-t border-white/50"
          >
            <Download className="w-4 h-4 mr-2.5 text-[#0B0B0B] group-hover:scale-110 transition-transform duration-300" />
            DOWNLOAD CV
          </a>

          <a
            href="#contact"
            className="btn-shimmer group w-full sm:w-auto inline-flex items-center justify-center px-9 py-4 rounded-full border border-white/[0.15] hover:border-[#C9A86A]/70 text-[#F5F2EA] hover:text-[#E0C487] font-semibold text-xs tracking-[0.18em] uppercase backdrop-blur-md shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] hover:shadow-[0_10px_35px_-8px_rgba(201,168,106,0.3)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 bg-white/[0.04] hover:bg-white/[0.08]"
          >
            <Mail className="w-4 h-4 mr-2.5 text-[#C9A86A] group-hover:scale-110 transition-transform duration-300" />
            CONTACT ME
          </a>
        </div>
      </div>
    </section>
  );
};
