"use client";

import React from "react";
import { ProcessStep } from "@/data/portfolioData";

interface ProcessProps {
  steps: ProcessStep[];
}

export const Process: React.FC<ProcessProps> = ({ steps }) => {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center space-x-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A86A]" />
          <span className="text-[11px] md:text-xs font-semibold tracking-[0.25em] text-[#C9A86A] uppercase">
            WORKFLOW & PIPELINE
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F5F2EA]">
          FROM IDEA TO FINAL FRAME
        </h2>
        <p className="text-sm md:text-base text-[#A7A39A] max-w-xl">
          A structured, director-led approach to turn concepts into polished, platform-ready films.
        </p>
      </div>

      {/* 5-Step Horizontal Grid on Desktop, Stacked on Mobile */}
      <div className="relative">
        {/* Subtle horizontal connecting line on desktop */}
        <div className="hidden lg:block absolute top-7 left-0 right-0 h-[1px] bg-white/[0.08] z-0" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
          {steps.map((item) => (
            <div
              key={item.number}
              className="flex flex-col space-y-4 group p-6 rounded-lg bg-[#151515] lg:bg-transparent border border-white/[0.06] lg:border-none"
            >
              {/* Step indicator dot / number */}
              <div className="flex items-center space-x-3">
                <div className="w-14 h-14 rounded-full bg-[#111111] border border-white/[0.1] flex items-center justify-center font-mono text-xs font-semibold text-[#C9A86A] group-hover:border-[#C9A86A] group-hover:bg-[#C9A86A]/10 transition-colors shadow-lg">
                  {item.number}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-sm md:text-base font-bold tracking-[0.16em] uppercase text-[#F5F2EA] pt-2">
                {item.step}
              </h3>

              {/* Description */}
              <p className="text-xs md:text-sm text-[#A7A39A] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
