import Image from "next/image";
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
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pt-8 md:pt-16 border-b border-line pb-16 md:pb-24">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-ink leading-[1.02] font-serif">
              {content.name}
            </h1>
            <p className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-muted leading-snug max-w-3xl font-normal">
              {content.heroStatement}
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-3">
            <div className="relative aspect-[3/4] w-full max-w-xs mx-auto lg:max-w-none border border-line bg-surface overflow-hidden">
              <Image
                src="/images/portrait.jpg"
                alt="Portrait of Kartheek"
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="object-cover object-[center_30%] grayscale contrast-125 opacity-90 transition-all duration-500 hover:grayscale-0 hover:contrast-100 hover:opacity-100"
                priority
              />
            </div>
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
