"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

interface NavbarProps {
  name: string;
}

export const Navbar: React.FC<NavbarProps> = ({ name }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

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
          ? "site-header-scrolled py-4 shadow-xl backdrop-blur-md"
          : "bg-transparent py-6 md:py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#"
          className="text-sm md:text-base font-semibold tracking-[0.2em] uppercase site-nav-brand hover:text-[#C9A86A] transition-colors duration-200"
        >
          {name}
        </a>

        {/* Desktop Navigation & Theme Switcher */}
        <div className="hidden md:flex items-center space-x-8 lg:space-x-10">
          <nav className="flex items-center space-x-8 lg:space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs lg:text-sm font-medium tracking-[0.16em] uppercase site-nav-link hover:text-[#C9A86A] transition-colors duration-200 relative group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C9A86A] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Theme Toggle Button (Desktop) */}
          <button
            onClick={toggleTheme}
            type="button"
            className="theme-toggle-btn relative inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/10 hover:border-[#C9A86A]/50 bg-white/5 hover:bg-white/10 transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#C9A86A]"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <Moon className="w-4 h-4 text-[#C9A86A] transition-transform duration-300 hover:rotate-12" />
            ) : (
              <Sun className="w-4 h-4 text-[#B08838] transition-transform duration-300 hover:rotate-45" />
            )}
          </button>
        </div>

        {/* Mobile Header Controls: Theme Button + Hamburger */}
        <div className="flex md:hidden items-center space-x-3">
          <button
            onClick={toggleTheme}
            type="button"
            className="theme-toggle-btn relative inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/10 hover:border-[#C9A86A]/50 bg-white/5 transition-all duration-300 focus:outline-none"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <Moon className="w-4 h-4 text-[#C9A86A]" />
            ) : (
              <Sun className="w-4 h-4 text-[#B08838]" />
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="site-mobile-toggle p-2 -mr-2 transition-colors focus:outline-none"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden site-mobile-drawer border-b border-white/[0.08] px-6 py-6 transition-all duration-300 shadow-2xl">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium tracking-[0.18em] uppercase site-nav-link hover:text-[#C9A86A] transition-colors py-2"
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
