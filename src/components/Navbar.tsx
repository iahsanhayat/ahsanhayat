"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  name: string;
}

export const Navbar: React.FC<NavbarProps> = ({ name }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "WORK", href: "#work" },
    { label: "ABOUT", href: "#about" },
    { label: "EXPERIENCE", href: "#experience" },
    { label: "EXPERTISE", href: "#expertise" },
    { label: "CV", href: "#cv" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0B0B0B]/85 backdrop-blur-md border-b border-white/[0.08] py-4 shadow-xl"
          : "bg-transparent py-6 md:py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#"
          className="text-sm md:text-base font-semibold tracking-[0.2em] uppercase text-[#F5F2EA] hover:text-[#C9A86A] transition-colors duration-200"
        >
          {name}
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs lg:text-sm font-medium tracking-[0.16em] uppercase text-[#A7A39A] hover:text-[#F5F2EA] transition-colors duration-200 relative group py-1"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C9A86A] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-[#F5F2EA] hover:text-[#C9A86A] p-2 -mr-2 transition-colors focus:outline-none"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0B0B0B]/98 border-b border-white/[0.08] px-6 py-6 transition-all duration-300">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium tracking-[0.18em] uppercase text-[#A7A39A] hover:text-[#C9A86A] transition-colors py-2"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
