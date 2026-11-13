"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/data/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Preset rotation angles between 3 and 5 degrees, alternating per card
const CARD_ROTATIONS = [-3.5, 4.2, -3.0, 4.5, -4.0];

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const marqueeTrackRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({});
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const { experience, educationNote } = content;

  const toggleDetails = (idx: number) => {
    setExpandedCards((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setIsReducedMotion(prefersReducedMotion);

    if (prefersReducedMotion || !sectionRef.current) return;

    const cards = cardsRef.current.filter((el): el is HTMLDivElement => el !== null);
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      // 1. Initial State:
      // Card 0 sits centered with its slight initial tilt.
      // Subsequent cards sit down below the viewport with slight tilt and opacity 0.
      gsap.set(cards[0], {
        left: "50%",
        top: "50%",
        xPercent: -50,
        yPercent: -50,
        rotation: CARD_ROTATIONS[0],
        opacity: 1,
        scale: 1,
      });

      for (let i = 1; i < cards.length; i++) {
        gsap.set(cards[i], {
          left: "50%",
          top: "50%",
          xPercent: -50,
          yPercent: 160,
          rotation: CARD_ROTATIONS[i] > 0 ? 8 : -8,
          opacity: 0,
          scale: 0.96,
        });
      }

      // 2. Timeline attached to pinned ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2800",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Horizontal shift with scroll velocity on the gigantic marquee word
            const velocity = self.getVelocity();
            if (marqueeTrackRef.current) {
              gsap.to(marqueeTrackRef.current, {
                x: `-=${velocity * 0.04}`,
                duration: 0.35,
                ease: "power1.out",
                overwrite: "auto",
              });
            }
          },
        },
      });

      // Background marquee continuous scrub progression across the timeline
      if (marqueeTrackRef.current) {
        tl.to(
          marqueeTrackRef.current,
          {
            xPercent: -22,
            ease: "none",
            duration: cards.length * 1.5,
          },
          0
        );
      }

      // 3. Card swap animations:
      // Current card flies up and tilts out while the next rises into center with a slight rotation.
      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          const nextCard = cards[i + 1];
          const exitRotation = CARD_ROTATIONS[i] < 0 ? -12 : 12;
          const targetRotation = CARD_ROTATIONS[i + 1];
          const stepLabel = `step-${i}`;

          tl.addLabel(stepLabel)
            // Current card flies up and tilts out
            .to(
              card,
              {
                yPercent: -230,
                rotation: exitRotation,
                opacity: 0,
                scale: 0.95,
                duration: 1.2,
                ease: "power2.inOut",
              },
              stepLabel
            )
            // Next card rises into center from below with target rotation
            .to(
              nextCard,
              {
                yPercent: -50,
                rotation: targetRotation,
                opacity: 1,
                scale: 1,
                duration: 1.2,
                ease: "power2.inOut",
              },
              stepLabel
            )
            // Brief plateau so the user can easily read the card during scroll
            .to({}, { duration: 0.45 });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [experience.length]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className={`relative w-full bg-ink text-cream overflow-hidden flex flex-col justify-center items-center select-none ${
        isReducedMotion ? "min-h-screen py-24 px-6" : "h-screen"
      }`}
    >
      {/* ========================================================= */}
      {/* GIGANTIC FADED BACKGROUND MARQUEE (6% cream contrast)     */}
      {/* ========================================================= */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center pointer-events-none overflow-hidden z-0"
      >
        <div
          ref={marqueeTrackRef}
          className="flex whitespace-nowrap will-change-transform text-cream/[0.06] select-none text-[22vw] font-serif font-black tracking-tight leading-none uppercase"
        >
          <span className="mr-14">EXPERIENCE</span>
          <span className="mr-14">EXPERIENCE</span>
          <span className="mr-14">EXPERIENCE</span>
          <span className="mr-14">EXPERIENCE</span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* CARDS STACK CONTAINER                                      */}
      {/* ========================================================= */}
      {isReducedMotion ? (
        // Accessible non-pinned stack for prefers-reduced-motion
        <div className="relative z-10 w-full max-w-xl flex flex-col gap-8 my-auto">
          {experience.map((item, idx) => {
            const isExpanded = !!expandedCards[idx];
            return (
              <div
                key={idx}
                style={{ backgroundColor: "#FBF7EE" }}
                className="w-full rounded-2xl p-6 sm:p-8 md:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-ink/10 text-ink select-text"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ink tracking-tight leading-tight">
                    {item.role}
                  </h3>
                  <span className="font-sans text-xs sm:text-sm text-muted font-medium shrink-0">
                    {item.period}
                  </span>
                </div>

                <div className="w-full h-[1px] bg-ink/15 my-4" />

                {item.org && (
                  <p className="font-sans text-sm sm:text-base text-muted font-medium mb-4">
                    {item.org}
                  </p>
                )}

                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 rounded-full border border-ink/20 text-ink/80 font-sans text-xs uppercase tracking-wider font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => toggleDetails(idx)}
                    className="font-sans text-xs uppercase tracking-wider text-tangerine hover:text-ink font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    aria-expanded={isExpanded}
                  >
                    <span>Details</span>
                    <span className="text-[10px]">{isExpanded ? "—" : "+"}</span>
                  </button>

                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-ink/10 animate-in fade-in duration-200">
                      <ul className="flex flex-col gap-2.5">
                        {item.bullets.map((bullet, bIdx) => (
                          <li
                            key={bIdx}
                            className="font-sans text-xs sm:text-sm text-ink/80 flex items-start gap-2.5 leading-relaxed"
                          >
                            <span className="text-tangerine select-none font-bold">
                              •
                            </span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // Standard interactive pinned card deck
        <div className="relative z-10 w-full max-w-xl h-[400px] sm:h-[360px] px-5 sm:px-6">
          {experience.map((item, idx) => {
            const isExpanded = !!expandedCards[idx];

            return (
              <div
                key={idx}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                style={{
                  backgroundColor: "#FBF7EE",
                }}
                className="absolute w-[calc(100%-2.5rem)] sm:w-[520px] md:w-[560px] rounded-2xl p-6 sm:p-8 md:p-9 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border border-ink/10 text-ink will-change-transform transition-shadow duration-300 select-text"
              >
                {/* Header: Role on left (Playfair Display bold), Year on right (Space Grotesk) */}
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-serif text-2xl sm:text-3xl md:text-[2rem] font-bold text-ink tracking-tight leading-tight">
                    {item.role}
                  </h3>
                  <span className="font-sans text-xs sm:text-sm text-muted font-medium shrink-0">
                    {item.period}
                  </span>
                </div>

                {/* Thin ink line under header */}
                <div className="w-full h-[1px] bg-ink/15 my-4" />

                {/* Organization in muted Space Grotesk */}
                {item.org && (
                  <p className="font-sans text-sm sm:text-base text-muted font-medium mb-4">
                    {item.org}
                  </p>
                )}

                {/* Outlined Pill Tags */}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 rounded-full border border-ink/20 text-ink/80 font-sans text-xs uppercase tracking-wider font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Details Expand Button & List */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => toggleDetails(idx)}
                    className="font-sans text-xs uppercase tracking-wider text-tangerine hover:text-ink font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    aria-expanded={isExpanded}
                  >
                    <span>Details</span>
                    <span className="text-[10px]">{isExpanded ? "—" : "+"}</span>
                  </button>

                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-ink/10 animate-in fade-in duration-200">
                      <ul className="flex flex-col gap-2.5">
                        {item.bullets.map((bullet, bIdx) => (
                          <li
                            key={bIdx}
                            className="font-sans text-xs sm:text-sm text-ink/80 flex items-start gap-2.5 leading-relaxed"
                          >
                            <span className="text-tangerine select-none font-bold">
                              •
                            </span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================= */}
      {/* EDUCATION: One small line at the very end of section      */}
      {/* ========================================================= */}
      <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 px-6 flex justify-center pointer-events-none z-20">
        <p className="font-sans text-xs sm:text-sm text-cream/40 tracking-wider text-center">
          {educationNote || "VIT-AP University, B.Tech Computer Science, 2024 to 2028"}
        </p>
      </div>
    </section>
  );
}
