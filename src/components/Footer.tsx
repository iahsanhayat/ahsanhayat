"use client";

import React from "react";
import { SocialLink } from "@/data/portfolioData";
import { ArrowUp } from "lucide-react";

interface FooterProps {
  name: string;
  title: string;
  socials: SocialLink[];
}

export const Footer: React.FC<FooterProps> = ({ name, title, socials }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeSocials = socials.filter((s) => s.active);

  return (
    <footer className="border-t border-white/[0.08] bg-[#070707]/80 backdrop-blur-sm py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Brand Information */}
        <div className="space-y-2">
          <div className="text-sm font-bold tracking-[0.2em] uppercase text-[#F5F2EA]">
            {name}
          </div>
          <div className="text-xs text-[#77736C] tracking-[0.16em] uppercase">
            {title}
          </div>
        </div>

        {/* Social / Direct Links */}
        <div className="flex flex-wrap items-center gap-6 text-xs tracking-wider uppercase text-[#A7A39A]">
          {activeSocials.map((s) => (
            <a
              key={s.platform}
              href={s.url}
              className="hover:text-[#C9A86A] transition-colors"
              {...(s.type !== "email" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {s.label}
            </a>
          ))}

          {/* Scroll to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1.5 text-xs text-[#77736C] hover:text-[#F5F2EA] transition-colors p-1"
            aria-label="Scroll to top"
          >
            <span>TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Copyright & Portfolio Domain */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#77736C] gap-4">
        <div>© 2026 {name} • Kasur, Pakistan</div>
        <div className="text-[11px] font-mono tracking-wider text-[#A7A39A]">
          ahsanhayat.vercel.app
        </div>
      </div>
    </footer>
  );
};
