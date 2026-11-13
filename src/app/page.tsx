import { content } from "@/data/content";
import { AboutSection } from "@/components/sections/about-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { LensSection } from "@/components/sections/lens-section";

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

      {/* Network / Socials / Colophon */}
      <footer id="contact" className="border-t border-line pt-12 pb-24 flex flex-col gap-12 scroll-mt-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4 flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              Colophon
            </span>
            <p className="text-xs text-muted leading-relaxed font-light">
              Typeset in Bricolage Grotesque, Instrument Serif, and JetBrains Mono.
              Engineered with Next.js, Lenis, GSAP, and Tailwind CSS.
              No gradients. No glow.
            </p>
          </div>

          <div className="md:col-span-8 flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              Connect
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {content.socials.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-line p-3 flex items-center justify-between font-mono text-xs text-muted hover:text-text hover:border-accent transition-colors"
                >
                  <span>{social.platform}</span>
                  <span className="text-muted/60">{social.label} ↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-line pt-6 text-muted font-mono text-[11px]">
          <span>© 2026 {content.name}. All rights reserved.</span>
          <span>Index 01 // Dark Theme // Strict Contrast</span>
        </div>
      </footer>
    </main>
  );
}
