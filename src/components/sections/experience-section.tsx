"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/data/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const timelineContainerRef = useRef<HTMLDivElement | null>(null);
  const lineFillRef = useRef<HTMLDivElement | null>(null);

  // First row is open by default
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const { experience, education, experienceClosingNote } = content;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      if (lineFillRef.current) {
        lineFillRef.current.style.transform = "scaleY(1)";
      }
      return;
    }

    const ctx = gsap.context(() => {
      // Unrolling film-strip timeline scrub
      if (lineFillRef.current && timelineContainerRef.current) {
        gsap.fromTo(
          lineFillRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: timelineContainerRef.current,
              start: "top 75%",
              end: "bottom 85%",
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleRow = (idx: number) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="flex flex-col gap-12 md:gap-16 scroll-mt-28"
    >
      {/* Plain Section Heading */}
      <div className="flex items-baseline justify-between border-b border-line pb-4">
        <h2 className="text-xs uppercase tracking-widest text-muted font-sans font-medium">
          Experience
        </h2>
      </div>

      {/* Film-strip Timeline */}
      <div
        ref={timelineContainerRef}
        className="relative flex flex-col divide-y divide-line border-y border-line"
      >
        {/* Background static hairline */}
        <div
          aria-hidden="true"
          className="absolute top-4 bottom-4 left-3 md:left-[25%] w-[1px] bg-line pointer-events-none"
        />

        {/* Scrubbing accent hairline */}
        <div
          ref={lineFillRef}
          aria-hidden="true"
          className="absolute top-4 bottom-4 left-3 md:left-[25%] w-[1px] bg-tangerine origin-top will-change-transform pointer-events-none"
        />

        {experience.map((item, idx) => {
          const isOpen = openIdx === idx;

          return (
            <div
              key={idx}
              onClick={() => toggleRow(idx)}
              className="group relative grid grid-cols-1 md:grid-cols-12 py-7 md:py-9 cursor-pointer select-none transition-colors hover:bg-surface/30 px-2"
            >
              {/* Dot on the timeline spine */}
              <div
                aria-hidden="true"
                className={`absolute left-3 md:left-[25%] -translate-x-1/2 top-9 md:top-10 w-2 h-2 rounded-full border border-ink transition-all duration-300 ${
                  isOpen
                    ? "bg-tangerine scale-125"
                    : "bg-muted group-hover:bg-tangerine group-hover:scale-110"
                }`}
              />

              {/* Desktop Period Column */}
              <div className="hidden md:block md:col-span-3 font-sans text-xs text-muted text-right pr-10 pt-1">
                {item.period}
              </div>

              {/* Content Column */}
              <div className="pl-8 md:pl-10 md:col-span-9 flex flex-col gap-1.5">
                {/* Mobile Period */}
                <span className="block md:hidden font-sans text-[11px] text-muted mb-0.5">
                  {item.period}
                </span>

                {/* Role Header */}
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-serif text-xl sm:text-2xl text-cream font-normal tracking-tight group-hover:text-tangerine transition-colors">
                    {item.role}
                  </h3>
                  <span className="font-sans text-xs text-muted/60 transition-transform duration-300">
                    {isOpen ? "—" : "+"}
                  </span>
                </div>

                {/* Organization & Place */}
                <div className="font-sans text-xs text-muted uppercase tracking-wider flex items-center gap-2">
                  <span>{item.org}</span>
                  {item.place && (
                    <>
                      <span className="text-muted/40">·</span>
                      <span className="text-muted/80">{item.place}</span>
                    </>
                  )}
                </div>

                {/* Collapsible Bullets */}
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 mt-4"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <ul className="flex flex-col gap-2.5 pt-3 border-t border-line/60">
                      {item.bullets.map((bullet, bIdx) => (
                        <li
                          key={bIdx}
                          className="font-serif text-base sm:text-lg text-cream/90 italic leading-relaxed flex items-start gap-3"
                        >
                          <span className="text-tangerine not-italic font-sans text-xs pt-1">
                            —
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Education Block */}
      <div className="border-t border-line pt-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline font-sans text-xs">
        <div className="md:col-span-3 md:text-right md:pr-10 text-muted uppercase tracking-widest font-medium">
          Education
        </div>
        <div className="md:col-span-9 flex flex-col sm:flex-row gap-6 sm:gap-12">
          {education.map((edu, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              <span className="text-cream font-normal">{edu.institution}</span>
              <span className="text-muted text-[11px]">
                {edu.program} ({edu.period})
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Closing Note */}
      <div className="border-t border-line pt-10 md:pt-14 pb-2">
        <p className="font-serif text-xl sm:text-2xl md:text-3xl text-muted font-normal italic leading-relaxed max-w-2xl">
          {experienceClosingNote}
        </p>
      </div>
    </section>
  );
}
