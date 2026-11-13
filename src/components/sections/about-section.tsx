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
  const paragraphRef = useRef<HTMLDivElement | null>(null);
  const linesRef = useRef<(HTMLSpanElement | null)[]>([]);

  // Split aboutText into natural editorial lines for the scroll reveal
  const aboutSentences = [
    "I'm a CS undergrad with a strong focus on building fast, functional and genuinely useful products.",
    "I've interned at Alfaleus, led the entrepreneurship club, and done freelance video editing.",
    "I'm a curious mind with a weird fascination for building things better, turning rough sketches into clean working products.",
  ];

  useEffect(() => {
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
    if (validLines.length === 0 || !paragraphRef.current) return;

    const ctx = gsap.context(() => {
      // Paragraph reveals line by line: fade and 16px upward motion, scrub true
      gsap.fromTo(
        validLines,
        {
          opacity: 0.15,
          y: 16,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: paragraphRef.current,
            start: "top 80%",
            end: "bottom 55%",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector("#contact");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="scroll-mt-24 border-t border-line pt-20 md:pt-28 pb-16"
    >
      {/* Three-Column Editorial Block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Column: Large Playfair word "Hello" with short placeholder line */}
        <div className="lg:col-span-3 flex flex-col gap-3">
          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-ink tracking-tight leading-none">
            Hello
          </h2>
          <p className="font-sans text-sm text-muted leading-relaxed max-w-[220px]">
            A few notes on craft and curiosity.
          </p>
        </div>

        {/* Center Column: Portrait (larger photo slot using /images/about.jpg in full color) */}
        <div className="lg:col-span-4 flex flex-col">
          <div className="relative aspect-[3/4] w-full max-w-sm mx-auto lg:max-w-none rounded-[12px] border border-line bg-surface overflow-hidden shadow-[0_16px_40px_rgba(21,18,14,0.08)]">
            <Image
              src="/images/about.jpg"
              alt="Kartheek in a green shirt standing in front of a cafe sign at night"
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover object-[center_30%]"
              priority
            />
          </div>
        </div>

        {/* Right Column: Paragraph at 20px with 1.6 line-height + Get in touch link */}
        <div className="lg:col-span-5 flex flex-col gap-8 lg:pt-2">
          <div
            ref={paragraphRef}
            className="font-sans text-[20px] leading-[1.6] text-ink font-normal"
          >
            {aboutSentences.map((sentence, idx) => (
              <span
                key={idx}
                ref={(el) => {
                  linesRef.current[idx] = el;
                }}
                className="about-reveal-line block will-change-[transform,opacity] pb-3 last:pb-0"
              >
                {sentence}
              </span>
            ))}
          </div>

          {/* Underline link with moving arrow that scrolls to Contact */}
          <div>
            <a
              href="#contact"
              onClick={handleScrollToContact}
              className="group inline-flex items-center gap-2 font-sans text-base text-ink underline underline-offset-8 decoration-line hover:decoration-tangerine transition-colors font-medium"
            >
              <span>Get in touch</span>
              <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5 text-tangerine">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
