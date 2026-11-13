"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/data/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const textContainerRef = useRef<HTMLDivElement | null>(null);
  const linesRef = useRef<(HTMLSpanElement | null)[]>([]);

  const { about } = content;

  useEffect(() => {
    // Respect prefers-reduced-motion everywhere
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      linesRef.current.forEach((line) => {
        if (line) {
          line.style.opacity = "1";
          line.style.transform = "none";
        }
      });
      return;
    }

    const validLines = linesRef.current.filter(Boolean);
    if (validLines.length === 0 || !textContainerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        validLines,
        {
          opacity: 0.15,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.25,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textContainerRef.current,
            start: "top 80%",
            end: "bottom 50%",
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="flex flex-col gap-16 md:gap-24 scroll-mt-28 border-t border-line pt-16 md:pt-24"
    >
      {/* Chapter Label */}
      <div className="flex items-baseline justify-between border-b border-line pb-4">
        <span className="font-mono text-xs uppercase tracking-widest text-muted">
          {about.chapter} // {about.title}
        </span>
        <span className="font-mono text-xs uppercase tracking-widest text-muted hidden sm:inline">
          Chapter 01
        </span>
      </div>

      {/* 12-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left: Animated Instrument Serif text */}
        <div
          ref={textContainerRef}
          className="lg:col-span-7 flex flex-col gap-6"
        >
          <div className="font-story text-2xl sm:text-3xl md:text-4xl lg:text-[42px] text-text font-normal leading-[1.25] tracking-tight">
            {about.lines.map((line, idx) => (
              <span
                key={idx}
                ref={(el) => {
                  linesRef.current[idx] = el;
                }}
                className="about-reveal-line block will-change-[transform,opacity] pb-2 last:pb-0"
              >
                {line}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Tall Frame Portrait */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="relative aspect-[3/4] w-full max-w-sm mx-auto lg:max-w-none border border-line bg-surface overflow-hidden">
            <Image
              src={about.photo.src}
              alt={about.photo.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover grayscale contrast-125 opacity-90 transition-opacity hover:opacity-100"
              priority
            />
          </div>
          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-muted px-0.5">
            <span>{about.photo.caption}</span>
            <span>[ 01 ]</span>
          </div>
        </div>
      </div>

      {/* Row of 3 Facts */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-y border-line divide-y md:divide-y-0 md:divide-x divide-line">
        {about.facts.map((fact, idx) => (
          <div
            key={idx}
            className="py-6 md:px-6 first:md:pl-0 last:md:pr-0 flex flex-col gap-1.5"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
              {fact.label}
            </span>
            <span className="font-mono text-xs sm:text-sm text-text font-normal">
              {fact.value}
            </span>
          </div>
        ))}
      </div>

      {/* Links Row */}
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-2">
        <span className="font-mono text-xs uppercase tracking-widest text-muted mr-2">
          Index:
        </span>
        {about.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            download={link.download}
            target={link.download ? undefined : "_blank"}
            rel={link.download ? undefined : "noopener noreferrer"}
            className="group relative py-1 font-mono text-xs uppercase tracking-wider text-muted hover:text-text transition-colors"
          >
            <span>{link.label}</span>
            {link.download ? (
              <span className="text-[10px] text-muted/60 ml-1.5">[PDF]</span>
            ) : (
              <span className="text-muted/60 ml-1 group-hover:text-accent transition-colors">
                ↗
              </span>
            )}
            {/* 1px accent underline on hover */}
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-[1px] w-0 bg-accent transition-all duration-300 ease-out group-hover:w-full"
            />
          </a>
        ))}
      </div>
    </section>
  );
}

