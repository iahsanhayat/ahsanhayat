"use client";

import React, { useState, useEffect } from "react";
import { portfolioData, Project } from "@/data/portfolioData";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeaturedProject } from "@/components/FeaturedProject";
import { SelectedWork } from "@/components/SelectedWork";
import { Capabilities } from "@/components/Capabilities";
import { Process } from "@/components/Process";
import { About } from "@/components/About";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ToolsSection } from "@/components/ToolsSection";
import { CVSection } from "@/components/CVSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { VideoModal } from "@/components/VideoModal";
import { CinematicBackground } from "@/components/CinematicBackground";

export default function Home() {
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  // Always load the top of the site on refresh
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);

      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }
    }
  }, []);

  // Find the featured project (The Ash Phoenix)
  const featuredProject =
    portfolioData.projects.find((p) => p.featured) || portfolioData.projects[0];

  const handleOpenVideo = (project: Project) => {
    setActiveModalProject(project);
  };

  const handleCloseVideo = () => {
    setActiveModalProject(null);
  };

  return (
    <main className="min-h-screen site-main-wrapper relative selection:bg-[#C9A86A]/30 transition-colors duration-300">
      {/* Unified Site-Wide Cinematic Background (Dust particles & ambient lighting) */}
      <CinematicBackground />

      {/* Sticky Cinematic Navigation */}
      <Navbar name={portfolioData.personal.name} />

      {/* Hero Section */}
      <div className="relative z-10">
        <Hero personal={portfolioData.personal} />
      </div>

      {/* Dominant Featured Showcase: The Ash Phoenix (Immediately following Hero) */}
      {featuredProject && (
        <div className="relative z-10">
          <FeaturedProject
            project={featuredProject}
            onWatchFilm={handleOpenVideo}
          />
        </div>
      )}

      {/* Selected Work (Grid of other client projects & ads) */}
      <div className="relative z-10">
        <SelectedWork
          projects={portfolioData.projects}
          onSelectProject={handleOpenVideo}
        />
      </div>

      {/* Capabilities: What I Create */}
      <div className="relative z-10">
        <Capabilities capabilities={portfolioData.capabilities} />
      </div>

      {/* Creative Process: From Idea to Final Frame */}
      <div className="relative z-10">
        <Process steps={portfolioData.process} />
      </div>

      {/* About Me & Verified Stats */}
      <div className="relative z-10">
        <About
          personal={portfolioData.personal}
          stats={portfolioData.stats}
        />
      </div>

      {/* Professional Experience & Own Channels */}
      <div className="relative z-10">
        <ExperienceSection
          experience={portfolioData.experience}
          ownChannels={portfolioData.ownChannels}
          education={portfolioData.education}
        />
      </div>

      {/* Tools I Work With, Core Skills & Distribution Platforms */}
      <div className="relative z-10">
        <ToolsSection
          tools={portfolioData.tools}
          skills={portfolioData.skills}
          platforms={portfolioData.platforms}
        />
      </div>

      {/* CV Section: Let's Work Together */}
      <div className="relative z-10">
        <CVSection cvPath={portfolioData.personal.cvPath} />
      </div>

      {/* Contact Section: Have an Idea? With Direct WhatsApp & Email */}
      <div className="relative z-10">
        <ContactSection
          personal={portfolioData.personal}
          socials={portfolioData.socials}
        />
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <Footer
          name={portfolioData.personal.name}
          title={portfolioData.personal.title}
          socials={portfolioData.socials}
        />
      </div>

      {/* Cinematic Fullscreen Video Modal */}
      {activeModalProject && (
        <VideoModal
          project={activeModalProject}
          onClose={handleCloseVideo}
        />
      )}
    </main>
  );
}
