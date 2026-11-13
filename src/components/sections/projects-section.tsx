"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const previewRef = useRef<HTMLDivElement | null>(null);

  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);

  const { projects } = content;

  // Touch device detection
  useEffect(() => {
    setIsTouchDevice(
      window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0
    );
  }, []);

  // GSAP quickTo cursor follow setup
  useEffect(() => {
    if (isTouchDevice || !previewRef.current) return;

    gsap.set(previewRef.current, {
      xPercent: 0,
      yPercent: 0,
      rotation: 2,
      scale: 0.96,
      autoAlpha: 0,
    });

    xTo.current = gsap.quickTo(previewRef.current, "x", {
      duration: 0.35,
      ease: "power3.out",
    });
    yTo.current = gsap.quickTo(previewRef.current, "y", {
      duration: 0.35,
      ease: "power3.out",
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (xTo.current && yTo.current) {
        // Offset slightly from cursor for clean sightlines
        xTo.current(e.clientX + 24);
        yTo.current(e.clientY - 110);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isTouchDevice]);

  // Scroll reveal with clip-path
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      rowsRef.current.forEach((row) => {
        if (row) {
          row.style.clipPath = "none";
          row.style.opacity = "1";
          row.style.transform = "none";
        }
      });
      return;
    }

    const ctx = gsap.context(() => {
      rowsRef.current.forEach((row) => {
        if (!row) return;

        gsap.fromTo(
          row,
          {
            clipPath: "inset(100% 0% 0% 0%)",
            y: 35,
            opacity: 0,
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [projects]);

  const handleMouseEnterRow = (project: Project) => {
    setHoveredSlug(project.slug);
    setActiveProject(project);

    if (!isTouchDevice && previewRef.current) {
      gsap.to(previewRef.current, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.25,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeaveRow = () => {
    setHoveredSlug(null);

    if (!isTouchDevice && previewRef.current) {
      gsap.to(previewRef.current, {
        autoAlpha: 0,
        scale: 0.96,
        duration: 0.2,
        ease: "power2.in",
      });
    }
  };

  const handleRowClick = (slug: string) => {
    router.push(`/work/${slug}`);
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      className="flex flex-col gap-12 md:gap-16 scroll-mt-28 border-t border-line pt-16 md:pt-24"
    >
      {/* Chapter Label */}
      <div className="flex items-baseline justify-between border-b border-line pb-4">
        <span className="font-mono text-xs uppercase tracking-widest text-muted">
          02 // THE BUILD
        </span>
        <span className="font-mono text-xs uppercase tracking-widest text-muted">
          Selected Engineering Works [ 0{projects.length} ]
        </span>
      </div>

      {/* Floating Preview Image for desktop (GSAP quickTo) */}
      {!isTouchDevice && (
        <div
          ref={previewRef}
          aria-hidden="true"
          className="fixed top-0 left-0 pointer-events-none z-50 w-72 h-44 border border-line bg-surface overflow-hidden shadow-2xl hidden md:block"
        >
          {activeProject && (
            <div className="relative w-full h-full">
              <Image
                src={activeProject.previewImage}
                alt={activeProject.title}
                fill
                sizes="288px"
                className="object-cover grayscale contrast-125 opacity-95"
              />
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-text bg-bg/80 px-2 py-1 border border-line">
                <span>{activeProject.numeral} // {activeProject.title}</span>
                <span className="text-accent">{activeProject.status}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Numbered Editorial Rows */}
      <div className="divide-y divide-line border-y border-line">
        {projects.map((project, idx) => {
          const isDimmed = hoveredSlug !== null && hoveredSlug !== project.slug;

          return (
            <div
              key={project.id}
              ref={(el) => {
                rowsRef.current[idx] = el;
              }}
              onClick={() => handleRowClick(project.slug)}
              onMouseEnter={() => handleMouseEnterRow(project)}
              onMouseLeave={handleMouseLeaveRow}
              className={`group cursor-pointer py-10 md:py-14 grid grid-cols-1 md:grid-cols-12 gap-8 items-start transition-opacity duration-300 ${
                isDimmed ? "opacity-40" : "opacity-100"
              }`}
            >
              {/* Left: Big numeral */}
              <div className="md:col-span-2">
                <span className="font-display text-4xl sm:text-6xl md:text-7xl font-light text-text/80 tracking-tighter leading-none group-hover:text-accent transition-colors">
                  {project.numeral}
                </span>
              </div>

              {/* Middle: Category, Title, Description, Tags */}
              <div className="md:col-span-7 flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
                    {project.category}
                  </span>
                  {project.badge && (
                    <span className="font-mono text-[10px] uppercase tracking-wider text-accent border border-accent/40 px-1.5 py-0.2">
                      {project.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl text-text font-normal tracking-tight group-hover:text-accent transition-colors">
                  {project.title}
                </h3>

                <p className="text-muted text-sm sm:text-base font-light leading-relaxed max-w-2xl">
                  {project.description}
                </p>

                {/* Tech tags separated by slashes (not pills) */}
                <div className="font-mono text-xs text-muted/80 tracking-wider pt-1">
                  {project.tags.join(" / ")}
                </div>
              </div>

              {/* Right: Status & Links */}
              <div className="md:col-span-3 flex flex-col sm:items-end justify-between self-stretch gap-6 pt-1">
                {/* Status indicator */}
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      project.status === "Live"
                        ? "bg-accent"
                        : "bg-muted animate-pulse"
                    }`}
                  />
                  <span className="text-text">{project.status}</span>
                </div>

                {/* Case study cue & External Links */}
                <div className="flex flex-col sm:items-end gap-2.5 font-mono text-xs uppercase tracking-wider">
                  <span className="text-text group-hover:text-accent transition-colors flex items-center gap-1 font-medium">
                    Read Case Study <span>→</span>
                  </span>

                  <div className="flex items-center gap-4 text-muted pt-1">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="hover:text-text transition-colors flex items-center gap-1"
                      >
                        View live <span>↗</span>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="hover:text-text transition-colors flex items-center gap-1"
                      >
                        GitHub <span>↗</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
