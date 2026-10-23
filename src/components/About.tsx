"use client";

import React, { useState } from "react";
import { MapPin, Globe, Sparkles, CheckCircle2, Star, Eye } from "lucide-react";

interface AboutProps {
  personal: {
    name: string;
    photo: string;
    summary: string;
    location: string;
    availability: string;
  };
  stats: {
    value: string;
    label: string;
    note?: string;
  }[];
}

export const About: React.FC<AboutProps> = ({ personal, stats }) => {
  const [imgFailed, setImgFailed] = useState(false);

  const getStatIcon = (index: number) => {
    switch (index) {
      case 0:
        return <CheckCircle2 className="w-4 h-4 text-[#C9A86A]" />;
      case 1:
        return <Star className="w-4 h-4 text-[#C9A86A] fill-[#C9A86A]" />;
      case 2:
        return <Eye className="w-4 h-4 text-[#C9A86A]" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#C9A86A]" />;
    }
  };

  return (
    <section id="about" className="py-24 px-6 md:px-12 bg-[#0E0E0E]/75 backdrop-blur-sm border-y border-white/[0.06]">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Portrait: Yellow circular frame with head popping out */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative group w-full max-w-[280px] sm:max-w-[320px] flex items-center justify-center">
              <div className="absolute w-[220px] h-[220px] rounded-full bg-[#EAB308]/15 blur-2xl group-hover:bg-[#EAB308]/25 transition-all duration-500 pointer-events-none" />

              <div className="relative w-full flex items-center justify-center">
                {!imgFailed ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={personal.photo}
                    alt={personal.name}
                    onError={() => setImgFailed(true)}
                    className="w-full h-auto object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.7)] transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="w-[240px] h-[240px] rounded-full bg-[#EAB308] p-6 text-center flex flex-col items-center justify-center space-y-3 text-black shadow-xl">
                    <Sparkles className="w-6 h-6" />
                    <span className="text-xs font-bold tracking-wider uppercase">
                      {personal.name}
                    </span>
                    <span className="text-[10px] opacity-80">
                      Creative Content Producer
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Copy and Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A86A]" />
              <span className="text-[11px] md:text-xs font-semibold tracking-[0.25em] text-[#C9A86A] uppercase">
                BIOGRAPHY & SUMMARY
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F5F2EA]">
              ABOUT ME
            </h2>

            <div className="text-base sm:text-lg text-[#A7A39A] leading-relaxed max-w-2xl font-normal">
              <p>{personal.summary}</p>
            </div>

            {/* Location & Availability tags */}
            <div className="pt-4 flex flex-wrap gap-4 sm:gap-6 border-t border-white/[0.06] text-xs font-medium text-[#F5F2EA]">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-[#C9A86A]" />
                <span>{personal.location}</span>
              </div>

              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-[#C9A86A]" />
                <span className="text-[#A7A39A]">{personal.availability}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Verified Stats / Achievements Grid */}
        <div className="pt-8 border-t border-white/[0.06]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, idx) => (
              <div
                key={stat.label}
                className="p-6 rounded-lg bg-[#151515] border border-white/[0.08] hover:border-[#C9A86A]/40 transition-all duration-300 flex flex-col justify-between space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F5F2EA]">
                    {stat.value}
                  </span>
                  {getStatIcon(idx)}
                </div>

                <div>
                  <h4 className="text-xs font-semibold tracking-wider uppercase text-[#C9A86A]">
                    {stat.label}
                  </h4>
                  {stat.note && (
                    <p className="text-[11px] text-[#77736C] mt-1 leading-snug">
                      {stat.note}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
