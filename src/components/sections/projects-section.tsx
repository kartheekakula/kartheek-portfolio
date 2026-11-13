"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content, Project } from "@/data/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ProjectsSection() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [activeNumber, setActiveNumber] = useState("01");
  const [scrollProgress, setScrollProgress] = useState(0);

  const { projects } = content;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const getScrollAmount = () => {
        return track.scrollWidth - track.clientWidth;
      };

      const tl = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${Math.max(window.innerWidth * 1.2, getScrollAmount() * 1.5)}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
            const idx = Math.min(
              projects.length - 1,
              Math.floor(self.progress * projects.length + 0.3)
            );
            setActiveNumber(projects[idx]?.numeral || "01");
          },
        },
      });

      // Staggered title and text fades across project panels
      panelsRef.current.forEach((panel) => {
        if (!panel) return;
        const title = panel.querySelector(".project-panel-title");
        const body = panel.querySelector(".project-panel-body");

        if (title) {
          gsap.fromTo(
            title,
            { opacity: 0.3, x: 25 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              ease: "power3.out",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tl,
                start: "left 85%",
                end: "left 35%",
                scrub: true,
              },
            }
          );
        }

        if (body) {
          gsap.fromTo(
            body,
            { opacity: 0.2, y: 15 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power3.out",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tl,
                start: "left 80%",
                end: "left 40%",
                scrub: true,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [projects]);

  const handleRowClick = (slug: string) => {
    router.push(`/work/${slug}`);
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative w-full h-screen bg-ink text-cream overflow-hidden flex flex-col justify-between select-none"
    >
      {/* Subtle warm glow on right edge: radial of --tangerine at 25% fading into --mango at 10% */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 bottom-0 w-[45vw] pointer-events-none z-0 opacity-100 bg-[radial-gradient(ellipse_at_right,_rgba(235,90,31,0.25)_0%,_rgba(243,179,61,0.10)_45%,_transparent_75%)]"
      />

      {/* Main Content Arena: Pinned Left Title + Horizontal Sliding Right Panels */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row w-full h-full pt-20 pb-16">
        {/* Left Side (Fixed while pinned): "Projects" in huge Playfair + short line + SCROLL label */}
        <div className="w-full lg:w-[32vw] flex-shrink-0 flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:pl-20 lg:pr-8 border-b lg:border-b-0 lg:border-r border-line/40 py-6 lg:py-0">
          <h2 className="font-serif font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-cream tracking-tight leading-none">
            Projects
          </h2>
          <div className="mt-6 flex flex-col gap-2">
            <div className="w-12 h-[1px] bg-cream/40" />
            <span className="font-sans text-xs tracking-[0.25em] text-muted uppercase font-medium">
              SCROLL
            </span>
          </div>
        </div>

        {/* Right Side: Horizontal sliding panels */}
        <div className="flex-1 overflow-hidden flex items-center relative">
          <div
            ref={trackRef}
            className="flex items-center gap-12 sm:gap-16 lg:gap-24 pl-8 sm:pl-16 lg:pl-20 pr-32 will-change-transform h-full"
          >
            {projects.map((project, idx) => (
              <div
                key={project.id}
                ref={(el) => {
                  panelsRef.current[idx] = el;
                }}
                onClick={() => handleRowClick(project.slug)}
                className="group cursor-pointer w-[80vw] sm:w-[60vw] md:w-[48vw] lg:w-[42vw] max-w-xl flex-shrink-0 flex flex-col justify-center gap-6 p-6 sm:p-8 rounded-none border border-line/30 bg-ink/40 backdrop-blur-sm transition-all duration-300 hover:border-line/70"
              >
                {/* Meta Line: Number and Category in muted text (e.g. "01  Embedded, Computer Vision") */}
                <div className="flex items-baseline justify-between font-sans text-xs text-muted uppercase tracking-wider">
                  <span>
                    {project.numeral} &nbsp; {project.category}
                  </span>
                  {project.status && (
                    <span className="text-tangerine text-[11px] font-medium tracking-widest border border-tangerine/40 px-2 py-0.5">
                      {project.status}
                    </span>
                  )}
                </div>

                {/* Project Title in large Playfair Display with slight shift on hover */}
                <h3 className="project-panel-title font-serif text-3xl sm:text-4xl md:text-5xl text-cream font-normal tracking-tight transition-transform duration-300 ease-out group-hover:translate-x-1.5">
                  {project.title}
                </h3>

                {/* Description: at most two short sentences */}
                <p className="project-panel-body font-sans text-muted text-sm sm:text-base leading-relaxed">
                  {project.description}
                </p>

                {/* Tag Chips (thin 1px border, small uppercase Space Grotesk, no fill) */}
                {project.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-sans text-[10px] uppercase tracking-wider text-muted/90 border border-line/50 px-2.5 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* View Case Study Outlined Button: fills with tangerine on hover */}
                <div className="pt-4">
                  <Link
                    href={`/work/${project.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-wider text-cream border border-line/60 px-5 py-2.5 transition-all duration-300 ease-out hover:bg-tangerine hover:border-tangerine hover:text-white font-medium"
                  >
                    <span>View case study</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Progress Bar: thin line with active indicator and current numeral 01 or 02 on right */}
      <div className="relative z-10 w-full px-8 sm:px-12 md:px-16 lg:px-20 pb-6 flex items-center justify-between gap-6 font-sans text-xs">
        {/* Progress track */}
        <div className="flex-1 h-[1px] bg-line/40 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 bottom-0 bg-tangerine transition-all duration-100 ease-out"
            style={{ width: `${Math.max(5, scrollProgress * 100)}%` }}
          />
        </div>

        {/* Current numeral (01 or 02, no slashes) */}
        <div className="font-sans text-xs uppercase tracking-widest text-muted tabular-nums pl-4 font-medium">
          {activeNumber}
        </div>
      </div>
    </section>
  );
}
