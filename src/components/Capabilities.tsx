"use client";

import React from "react";
import { Capability } from "@/data/portfolioData";

interface CapabilitiesProps {
  capabilities: Capability[];
}

export const Capabilities: React.FC<CapabilitiesProps> = ({ capabilities }) => {
  return (
    <section className="py-24 px-6 md:px-12 bg-transparent border-y border-white/[0.06] relative overflow-hidden">
      {/* Subtle Ambient Light Aura */}
      <div className="absolute top-1/2 right-1/3 w-[650px] h-[450px] bg-[#C9A86A]/10 rounded-full blur-[160px] pointer-events-none animate-pulse" />
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A86A]" />
            <span className="text-[11px] md:text-xs font-semibold tracking-[0.25em] text-[#C9A86A] uppercase">
              CORE CAPABILITIES
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F5F2EA]">
            WHAT I CREATE
          </h2>
          <p className="text-sm md:text-base text-[#A7A39A] max-w-xl">
            Bridging artistic direction, prompt engineering, and cinematic post-production.
          </p>
        </div>

        {/* 4 Elegant Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((item) => (
            <div
              key={item.number}
              className="group relative p-8 bg-[#151515] border border-white/[0.08] hover:border-[#C9A86A]/40 rounded-lg flex flex-col justify-between space-y-8 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="space-y-4">
                <span className="text-xs font-mono tracking-[0.2em] text-[#77736C] group-hover:text-[#C9A86A] transition-colors">
                  {item.number}
                </span>

                <h3 className="text-base md:text-lg font-bold tracking-tight text-[#F5F2EA] leading-snug">
                  {item.title}
                </h3>
              </div>

              <p className="text-xs md:text-sm text-[#A7A39A] leading-relaxed">
                {item.description}
              </p>

              {/* Minimal bottom accent line */}
              <div className="w-8 h-[1px] bg-white/10 group-hover:w-full group-hover:bg-[#C9A86A]/50 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
