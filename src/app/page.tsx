import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { LensSection } from "@/components/sections/lens-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Light Cream: Hero (Full Viewport) */}
      <HeroSection />

      {/* Light Cream: About */}
      <div className="w-full max-w-6xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32">
        <AboutSection />
      </div>

      {/* Dark Ink: Projects (Pinned Full Viewport Scroller) */}
      <div className="section-ink w-full">
        <ProjectsSection />
      </div>

      {/* Light Cream: Skills (Pinned Circular Arc Scroller) */}
      <div className="w-full">
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
