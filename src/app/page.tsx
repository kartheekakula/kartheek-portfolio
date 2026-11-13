import { content } from "@/data/content";
import { AboutSection } from "@/components/sections/about-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { LensSection } from "@/components/sections/lens-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <main className="min-h-screen px-6 pt-24 pb-28 sm:px-12 md:px-20 lg:px-32 max-w-6xl mx-auto flex flex-col gap-28 md:gap-36">
      {/* Hero / Identity */}
      <header className="flex flex-col gap-8 pt-8 md:pt-16 border-b border-line pb-16 md:pb-24">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4">
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            Folio // 2026
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            Available for Select Engagements
          </span>
        </div>

        <div className="flex flex-col gap-6">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-text leading-[1.02]">
            {content.name}
          </h1>
          <p className="font-story text-2xl sm:text-3xl md:text-4xl text-muted leading-snug max-w-3xl font-normal">
            {content.tagline}
          </p>
        </div>
      </header>

      {/* Chapter 01: About / The Eye */}
      <AboutSection />

      {/* Chapter 02: Projects / The Build */}
      <ProjectsSection />

      {/* Chapter 03: Skills / The Craft */}
      <SkillsSection />

      {/* Chapter 03b: Experience / The Road So Far */}
      <ExperienceSection />

      {/* Chapter 04: The Lens */}
      <LensSection />

      {/* Chapter 05: Next / Contact & Colophon */}
      <ContactSection />
    </main>
  );
}
