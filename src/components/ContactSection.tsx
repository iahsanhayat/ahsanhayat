"use client";

import React from "react";
import { Mail, MessageCircle } from "lucide-react";
import { SocialLink } from "@/data/portfolioData";

interface ContactSectionProps {
  personal: {
    name: string;
    title: string;
    location: string;
    phone: string;
    phoneTel: string;
    email: string;
    emailMailto: string;
    gmailComposeUrl: string;
    portfolioUrl: string;
    portfolioFullUrl: string;
    whatsappUrl: string;
  };
  socials: SocialLink[];
}

export const ContactSection: React.FC<ContactSectionProps> = ({ personal }) => {
  return (
    <section id="contact" className="py-24 px-6 md:px-12 max-w-7xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A86A]" />
          <span className="text-[11px] md:text-xs font-semibold tracking-[0.25em] text-[#C9A86A] uppercase">
            START A PROJECT
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#F5F2EA]">
          HAVE AN IDEA?
        </h2>

        <p className="text-lg sm:text-xl md:text-2xl text-[#A7A39A] font-light max-w-2xl mx-auto">
          "Let's turn it into something worth watching."
        </p>

        {/* Primary Action Buttons (Ultra-Premium Tactile Buttons) */}
        <div className="flex flex-wrap items-center justify-center gap-5 pt-6">
          {/* Prominent WhatsApp Chat Button */}
          <a
            href={personal.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shimmer group relative inline-flex items-center justify-center px-9 py-4 rounded-full bg-gradient-to-r from-[#1eb854] via-[#25D366] to-[#1ebe65] text-[#051c0e] font-bold text-xs tracking-[0.18em] uppercase shadow-[0_10px_35px_-6px_rgba(37,211,102,0.45)] hover:shadow-[0_15px_45px_-4px_rgba(37,211,102,0.65)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 border-t border-white/40"
          >
            <div className="w-5 h-5 rounded-full bg-black/15 flex items-center justify-center mr-2.5">
              <MessageCircle className="w-3.5 h-3.5 text-[#051c0e] fill-current" />
            </div>
            <span>Chat on WhatsApp</span>
          </a>

          {/* Email Me Button (Directly opens Gmail compose with Ahsan's email prefilled) */}
          <a
            href={personal.gmailComposeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shimmer group relative inline-flex items-center justify-center px-9 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-[#F5F2EA] hover:text-[#E0C487] font-semibold text-xs tracking-[0.18em] uppercase border border-white/[0.15] hover:border-[#C9A86A]/70 backdrop-blur-md shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] hover:shadow-[0_10px_35px_-8px_rgba(201,168,106,0.35)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
          >
            <Mail className="w-4 h-4 mr-2.5 text-[#C9A86A] group-hover:scale-110 transition-transform duration-300" />
            <span>Email Me</span>
          </a>
        </div>
      </div>
    </section>
  );
};
