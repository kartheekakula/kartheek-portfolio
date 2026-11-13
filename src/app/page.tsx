import { content } from "@/data/content";
import { AboutSection } from "@/components/sections/about-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { LensSection } from "@/components/sections/lens-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Light Cream: Hero & About */}
      <div className="w-full max-w-6xl mx-auto px-6 pt-24 pb-16 sm:px-12 md:px-20 lg:px-32 flex flex-col gap-24">
        {/* Hero / Identity */}
        <header className="flex flex-col gap-8 pt-8 md:pt-16 border-b border-line pb-16 md:pb-24">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-ink leading-[1.02] font-serif">
              {content.name}
            </h1>
            <p className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-muted leading-snug max-w-3xl font-normal">
              {content.heroStatement}
            </p>
          </div>
        </header>

        {/* About */}
        <AboutSection />
      </div>

      {/* Dark Ink: Projects */}
      <section className="section-ink w-full py-20 md:py-28">
        <div className="w-full max-w-6xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32">
          <ProjectsSection />
        </div>
      </section>

      {/* Light Cream: Skills */}
      <div className="w-full max-w-6xl mx-auto px-6 py-20 md:py-28 sm:px-12 md:px-20 lg:px-32">
        <SkillsSection />
      </div>

      {/* Dark Ink: Experience */}
      <section className="section-ink w-full py-20 md:py-28">
        <div className="w-full max-w-6xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32">
          <ExperienceSection />
        </div>
      </section>

      {/* Light Cream: Lens & Contact */}
      <div className="w-full max-w-6xl mx-auto px-6 pt-20 pb-28 sm:px-12 md:px-20 lg:px-32 flex flex-col gap-28 md:gap-36">
        <LensSection />
        <ContactSection />
      </div>
    </main>
  );
}
