"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { content } from "@/data/content";

export function HeroSection() {
  const containerRef = useRef<HTMLElement | null>(null);
  const nameRef = useRef<HTMLHeadingElement | null>(null);
  const portraitRef = useRef<HTMLDivElement | null>(null);
  const statementRef = useRef<HTMLParagraphElement | null>(null);

  const nameLetters = "KARTHEEK".split("");

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const letters = nameRef.current?.querySelectorAll(".hero-letter");
      if (letters && letters.length > 0) {
        // Letters rise from below with 40ms stagger, ease power3.out, under 1.2s total
        gsap.fromTo(
          letters,
          {
            y: 80,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.88,
            stagger: 0.04,
            ease: "power3.out",
          }
        );
      }

      // Portrait photo card fades and settles in cleanly after name (no bounce)
      if (portraitRef.current) {
        gsap.fromTo(
          portraitRef.current,
          {
            opacity: 0,
            y: 28,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            delay: 0.42,
            ease: "power3.out",
          }
        );
      }

      // Hero statement settles softly
      if (statementRef.current) {
        gsap.fromTo(
          statementRef.current,
          {
            opacity: 0,
            y: 16,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.6,
            ease: "power3.out",
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="min-h-[100dvh] w-full flex flex-col justify-between pt-24 pb-16 sm:pb-20 select-none"
    >
      {/* Central Content Canvas */}
      <div className="flex-1 flex flex-col justify-center max-w-6xl mx-auto w-full px-6 sm:px-12 md:px-20 lg:px-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end w-full">
          {/* Left/Main Column: Huge Name, Overlapping Portrait Card, and Statement */}
          <div className="lg:col-span-8 flex flex-col">
            {/* The name KARTHEEK in huge Playfair Display */}
            <h1
              ref={nameRef}
              className="font-serif font-bold uppercase tracking-tight text-ink text-[clamp(3.5rem,14vw,11.5rem)] leading-[0.9] flex flex-wrap"
              aria-label="KARTHEEK"
            >
              {nameLetters.map((char, idx) => (
                <span
                  key={idx}
                  className="hero-letter inline-block overflow-hidden will-change-[transform,opacity]"
                >
                  {char}
                </span>
              ))}
            </h1>

            {/* Overlapping Portrait Photo Card + Statement */}
            <div className="relative flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-8 -mt-6 sm:-mt-10 md:-mt-14 lg:-mt-16 z-10">
              {/* Portrait Card */}
              <div
                ref={portraitRef}
                className="relative w-36 h-48 sm:w-44 sm:h-56 md:w-52 md:h-64 flex-shrink-0 rounded-[12px] shadow-[0_16px_40px_rgba(21,18,14,0.12)] border border-line bg-surface overflow-hidden rotate-[2deg] transition-all duration-400 ease-out hover:grayscale-0 hover:rotate-0 hover:shadow-2xl cursor-pointer grayscale group"
              >
                <Image
                  src="/images/portrait.jpg"
                  alt="Portrait of Kartheek"
                  fill
                  sizes="(max-width: 640px) 144px, 208px"
                  className="object-cover object-[center_30%] transition-transform duration-500 ease-out group-hover:scale-105"
                  priority
                />
              </div>

              {/* Statement under name */}
              <div
                ref={statementRef}
                className="max-w-[520px] pb-2 sm:pb-4"
              >
                <p className="font-sans text-base sm:text-lg text-muted/90 font-normal leading-relaxed">
                  {content.heroStatement}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Generous empty space where the mascot will walk */}
          <div
            aria-hidden="true"
            className="hidden lg:block lg:col-span-4 h-full pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
}

