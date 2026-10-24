"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowDown, Download, Film, Sparkles } from "lucide-react";

interface HeroProps {
  personal: {
    name: string;
    title: string;
    primaryTagline: string;
    secondaryPositioning: string;
    availability: string;
    photo: string;
    cvPath: string;
  };
}

export const Hero: React.FC<HeroProps> = ({ personal }) => {
  const [imgFailed, setImgFailed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Trigger entrance state on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-[95vh] lg:min-h-screen flex items-center justify-center pt-28 pb-16 px-6 md:px-12 overflow-hidden bg-transparent">
      {/* Subtle Anamorphic Lens Flare Line */}
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A86A]/25 to-transparent pointer-events-none blur-[0.5px]" />

      {/* Film Director Viewfinder Corners */}
      <div className="absolute top-24 left-10 w-7 h-7 border-t-2 border-l-2 border-[#C9A86A]/25 pointer-events-none hidden md:block" />
      <div className="absolute top-24 right-10 w-7 h-7 border-t-2 border-r-2 border-[#C9A86A]/25 pointer-events-none hidden md:block" />
      <div className="absolute bottom-16 left-10 w-7 h-7 border-b-2 border-l-2 border-[#C9A86A]/25 pointer-events-none hidden md:block" />
      <div className="absolute bottom-16 right-10 w-7 h-7 border-b-2 border-r-2 border-[#C9A86A]/25 pointer-events-none hidden md:block" />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center z-10">
        {/* Left Column: Text & CTAs */}
        <div
          className={`lg:col-span-7 flex flex-col justify-center space-y-6 md:space-y-8 transition-all duration-1000 ease-out ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Eyebrow Label */}
          <div className="inline-flex items-center space-x-2.5">
            <span className="w-2 h-2 rounded-full bg-[#C9A86A] animate-ping" />
            <span className="text-[11px] md:text-xs font-semibold tracking-[0.25em] text-[#C9A86A] uppercase">
              AI VIDEO CREATOR / CONTENT PRODUCER
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-[2.6rem] sm:text-5xl md:text-6xl lg:text-[4.2rem] font-bold tracking-tight text-[#F5F2EA] leading-[1.08]">
            AI Video Creator <br />
            <span className="text-[#A7A39A] font-light">&</span> Creative Content
            Producer
          </h1>

          {/* Supporting Statement */}
          <p className="text-base sm:text-lg md:text-xl text-[#A7A39A] font-normal leading-relaxed max-w-xl">
            "{personal.primaryTagline}"
          </p>

          {/* Secondary Positioning */}
          <div className="text-xs md:text-sm text-[#77736C] tracking-wide font-medium">
            {personal.secondaryPositioning}
          </div>

          {/* Call to Actions: Prominent Primary CTA + Refined Secondary CTA */}
          <div className="pt-2 space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              {/* Unmistakable PRIMARY CTA */}
              <a
                href="#work"
                className="btn-shimmer group relative inline-flex items-center justify-center w-full sm:w-[235px] h-[58px] sm:h-[60px] rounded-full bg-gradient-to-r from-[#F5F2EA] via-[#FFFFFF] to-[#EAE6DB] text-[#0B0B0B] font-bold text-[13px] tracking-[0.16em] uppercase shadow-[0_12px_35px_-8px_rgba(245,242,234,0.35)] hover:shadow-[0_18px_45px_-6px_rgba(201,168,106,0.45)] hover:scale-[1.025] active:scale-[0.98] transition-all duration-300 ease-out border-t border-white"
              >
                <span>WATCH MY WORK</span>
                <span className="inline-block ml-2 text-base font-semibold transition-transform duration-300 ease-out group-hover:translate-x-1.5">
                  →
                </span>
              </a>

              {/* SECONDARY CTA (Visually Quieter) */}
              <a
                href={personal.cvPath}
                download
                className="btn-shimmer group inline-flex items-center justify-center w-full sm:w-auto h-[54px] sm:h-[58px] px-8 rounded-full border border-white/[0.14] hover:border-white/[0.3] text-[#A7A39A] hover:text-[#F5F2EA] font-semibold text-xs tracking-[0.16em] uppercase backdrop-blur-md bg-white/[0.03] hover:bg-white/[0.07] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Download className="w-4 h-4 mr-2 text-[#C9A86A] group-hover:scale-110 transition-transform duration-300" />
                <span>DOWNLOAD CV</span>
              </a>
            </div>

            {/* Editorial Metadata Line */}
            <div className="text-[10px] sm:text-[11px] font-medium tracking-[0.2em] uppercase text-[#77736C]">
              04 FEATURED PROJECTS &nbsp;·&nbsp; AI FILMS &nbsp;·&nbsp; CLIENT WORK &nbsp;·&nbsp; AI ADS
            </div>
          </div>

          {/* Availability Status */}
          <div className="pt-1 flex items-center space-x-2 text-xs text-[#77736C]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Available for freelance projects & creative opportunities</span>
          </div>
        </div>

        {/* Right Column: Premium Animated Hero Portrait */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end z-10">
          <div
            className={`relative group w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[440px] flex items-center justify-center transition-all duration-1000 ease-out ${
              isLoaded
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-90 translate-y-12"
            }`}
          >
            {/* Luminous Pulsing Warm Halo around Yellow Circle */}
            <div className="absolute w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] rounded-full bg-[#EAB308]/30 blur-3xl pointer-events-none animate-pulse" />
            <div className="absolute w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] rounded-full bg-[#C9A86A]/20 blur-2xl pointer-events-none" />

            {/* Subtle Rotating Gold Ambient Light Ring */}
            <div className="absolute w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] rounded-full border border-[#C9A86A]/25 border-dashed pointer-events-none animate-[spin_30s_linear_infinite] opacity-60" />

            {/* Continuous Cinematic Floating Portrait Container */}
            <div className="relative w-full flex items-center justify-center animate-[floatGently_4.5s_ease-in-out_infinite]">
              {!imgFailed ? (
                <Image
                  src={personal.photo}
                  alt={personal.name}
                  width={440}
                  height={504}
                  priority
                  onError={() => setImgFailed(true)}
                  className="w-full h-auto object-contain filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.85)] transition-all duration-500 group-hover:scale-105 group-hover:drop-shadow-[0_30px_60px_rgba(234,179,8,0.3)]"
                />
              ) : (
                <div className="w-[280px] h-[280px] rounded-full bg-[#EAB308] p-8 text-center flex flex-col items-center justify-center space-y-4 text-black shadow-2xl">
                  <Sparkles className="w-8 h-8" />
                  <div>
                    <h3 className="text-base font-bold tracking-wider uppercase">
                      {personal.name}
                    </h3>
                    <p className="text-xs mt-1 opacity-80">
                      AI Video Creator & Producer
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tiny scroll indicator at the bottom */}
      <a
        href="#work"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 text-[#77736C] hover:text-[#C9A86A] transition-colors z-10"
        aria-label="Scroll to Selected Work"
      >
        <span className="text-[10px] tracking-[0.25em] uppercase font-medium">
          SCROLL
        </span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </a>
    </section>
  );
};
