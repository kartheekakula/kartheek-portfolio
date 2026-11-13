"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content, SkillCategory } from "@/data/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Arc Geometry Constants (Desktop)
const SVG_WIDTH = 500;
const SVG_HEIGHT = 700;
const CENTER_X = 50;
const CENTER_Y = 350;
const ARC_RADIUS = 300;
const STEP_ANGLE = 22; // degrees between category nodes

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const arcGroupRef = useRef<SVGGElement | null>(null);
  const activeArcPathRef = useRef<SVGPathElement | null>(null);
  const desktopContentRef = useRef<HTMLDivElement | null>(null);
  const mobileContentRef = useRef<HTMLDivElement | null>(null);
  const desktopPillsRef = useRef<HTMLDivElement | null>(null);
  const mobilePillsRef = useRef<HTMLDivElement | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const [activeIdx, setActiveIdx] = useState(0);
  const [displayedIdx, setDisplayedIdx] = useState(0);
  const activeIdxRef = useRef(0);
  const isTransitioningRef = useRef(false);

  const { skills } = content;

  // Node base angles relative to center horizontal (index 2 is 0 deg)
  const nodeAngles = skills.map((_, i) => (i - 2) * STEP_ANGLE);

  // Transition content when active category changes
  const transitionToCategory = useCallback((newIdx: number) => {
    if (newIdx === activeIdxRef.current || isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    activeIdxRef.current = newIdx;
    setActiveIdx(newIdx);

    const wrappers = [
      desktopContentRef.current,
      mobileContentRef.current,
    ].filter((el): el is HTMLDivElement => el !== null);

    if (wrappers.length === 0) {
      setDisplayedIdx(newIdx);
      isTransitioningRef.current = false;
      return;
    }

    // 1. Old text slides up 24px and fades out (0.35s)
    gsap.to(wrappers, {
      y: -24,
      opacity: 0,
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => {
        setDisplayedIdx(newIdx);

        // 2. New text slides in from below (0.5s, power3.out)
        gsap.fromTo(
          wrappers,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
            onComplete: () => {
              isTransitioningRef.current = false;
            },
          }
        );

        // 3. Pills appear with a stagger of 0.06s, each rising 12px
        const pillContainers = [
          desktopPillsRef.current,
          mobilePillsRef.current,
        ].filter(Boolean);

        pillContainers.forEach((container) => {
          const pillEls = container?.querySelectorAll(".skill-pill");
          if (pillEls && pillEls.length > 0) {
            gsap.fromTo(
              pillEls,
              { y: 12, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.45,
                stagger: 0.06,
                ease: "power3.out",
              }
            );
          }
        });
      },
    });
  }, []);

  const handleNodeClick = useCallback(
    (index: number) => {
      transitionToCategory(index);
      const st = scrollTriggerRef.current;
      if (st) {
        const targetProgress = index / (skills.length - 1);
        const targetScroll = st.start + targetProgress * (st.end - st.start);
        window.scrollTo({ top: targetScroll, behavior: "smooth" });
      }
    },
    [skills.length, transitionToCategory]
  );

  // GSAP ScrollTrigger Pinned Rotation Setup
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Total rotation from category 0 (+44 deg) to category 4 (-44 deg)
      const maxAngle = 2 * STEP_ANGLE; // 44
      const arcPath = activeArcPathRef.current;
      const pathLength = arcPath ? arcPath.getTotalLength() : 600;

      if (arcPath) {
        arcPath.style.strokeDasharray = `${pathLength}`;
        arcPath.style.strokeDashoffset = `${pathLength * 0.85}`;
      }

      // Pin section for 5 steps length
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=2600",
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress; // 0 to 1

          // 1. Continuous smooth rotation of the arc group around center
          const currentRotation = maxAngle - progress * (2 * maxAngle);
          if (arcGroupRef.current) {
            arcGroupRef.current.setAttribute(
              "transform",
              `rotate(${currentRotation} ${CENTER_X} ${CENTER_Y})`
            );

            // Counter-rotate each node so numeral text stays upright
            const nodes = arcGroupRef.current.querySelectorAll(".arc-node");
            nodes.forEach((node) => {
              const nx = parseFloat(node.getAttribute("data-cx") || "0");
              const ny = parseFloat(node.getAttribute("data-cy") || "0");
              node.setAttribute(
                "transform",
                `rotate(${-currentRotation} ${nx} ${ny})`
              );
            });
          }

          // 2. Active arc progress line (darkens up to the active one)
          if (arcPath) {
            // progress 0 -> offset = pathLength * 0.82 (reaches node 0)
            // progress 1 -> offset = pathLength * 0.08 (reaches node 4)
            const activeFraction = 0.18 + progress * 0.74;
            const offset = pathLength * (1 - Math.min(1, activeFraction));
            arcPath.style.strokeDashoffset = `${offset}`;
          }

          // 3. Determine active category step (0 to 4)
          const stepIndex = Math.min(
            skills.length - 1,
            Math.max(0, Math.round(progress * (skills.length - 1)))
          );

          if (stepIndex !== activeIdxRef.current) {
            transitionToCategory(stepIndex);
          }
        },
      });

      scrollTriggerRef.current = st;
    }, sectionRef);

    return () => ctx.revert();
  }, [skills, transitionToCategory]);

  const currentCategory: SkillCategory = skills[displayedIdx] || skills[0];

  // SVG Arc Path Calculation
  // From angle -54 deg to +54 deg
  const startRad = (-54 * Math.PI) / 180;
  const endRad = (54 * Math.PI) / 180;
  const arcStartX = CENTER_X + ARC_RADIUS * Math.cos(startRad);
  const arcStartY = CENTER_Y + ARC_RADIUS * Math.sin(startRad);
  const arcEndX = CENTER_X + ARC_RADIUS * Math.cos(endRad);
  const arcEndY = CENTER_Y + ARC_RADIUS * Math.sin(endRad);
  const arcPathD = `M ${arcStartX} ${arcStartY} A ${ARC_RADIUS} ${ARC_RADIUS} 0 0 1 ${arcEndX} ${arcEndY}`;

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full h-screen bg-cream text-ink overflow-hidden flex flex-col justify-between select-none border-t border-line"
    >
      {/* ========================================================= */}
      {/* DESKTOP & TABLET LAYOUT (>= lg)                           */}
      {/* ========================================================= */}
      <div className="hidden lg:flex w-full h-full items-center relative">
        {/* Left Side: Circular Arc SVG cut off by screen edge */}
        <div className="w-[42vw] max-w-[500px] h-full flex items-center justify-start relative overflow-hidden pointer-events-none">
          <svg
            viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
            className="w-full h-[90%] overflow-visible"
          >
            {/* Background static arc in --line */}
            <path
              d={arcPathD}
              fill="none"
              stroke="var(--line)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Connecting progress arc that darkens up to active step */}
            <path
              ref={activeArcPathRef}
              d={arcPathD}
              fill="none"
              stroke="var(--ink)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Rotatable Group containing all category nodes */}
            <g
              ref={arcGroupRef}
              transform={`rotate(44 ${CENTER_X} ${CENTER_Y})`}
              className="will-change-transform"
            >
              {skills.map((cat, i) => {
                const angleDeg = nodeAngles[i];
                const angleRad = (angleDeg * Math.PI) / 180;
                const nx = CENTER_X + ARC_RADIUS * Math.cos(angleRad);
                const ny = CENTER_Y + ARC_RADIUS * Math.sin(angleRad);
                const isActive = activeIdx === i;

                return (
                  <g
                    key={cat.numeral}
                    className="arc-node pointer-events-auto cursor-pointer"
                    data-cx={nx}
                    data-cy={ny}
                    transform={`rotate(-44 ${nx} ${ny})`}
                    onClick={() => handleNodeClick(i)}
                  >
                    {/* Circle Node */}
                    <circle
                      cx={nx}
                      cy={ny}
                      r={isActive ? 25 : 22}
                      fill={isActive ? "var(--ink)" : "var(--cream)"}
                      stroke={isActive ? "var(--ink)" : "var(--line)"}
                      strokeWidth={isActive ? "2" : "1.5"}
                      className="transition-all duration-300 ease-out"
                    />

                    {/* Numeral in Playfair Display Italic */}
                    <text
                      x={nx}
                      y={ny + 5}
                      textAnchor="middle"
                      fill={isActive ? "var(--cream)" : "var(--muted)"}
                      className="font-serif italic font-medium text-sm transition-colors duration-300 select-none"
                    >
                      {cat.numeral}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        {/* Right Side: Content for Active Category */}
        <div className="flex-1 flex flex-col justify-center pl-6 pr-12 lg:pr-24 max-w-2xl">
          <div ref={desktopContentRef} className="flex flex-col gap-6">
            {/* Small letter-spaced label "Category 01" */}
            <span className="font-sans text-xs tracking-[0.25em] text-muted uppercase font-medium">
              Category {currentCategory.numeral}
            </span>

            {/* Category Name in large Playfair Display bold */}
            <h3 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-ink tracking-tight leading-[1.08]">
              {currentCategory.category}
            </h3>

            {/* Short description in muted Space Grotesk */}
            <p className="font-sans text-base sm:text-lg text-muted/90 leading-relaxed max-w-xl">
              {currentCategory.description}
            </p>

            {/* Skills as pill chips (fully rounded, filled --ink, cream text, 20px padding) */}
            <div
              ref={desktopPillsRef}
              className="flex flex-wrap items-center gap-3 pt-3"
            >
              {currentCategory.items.map((skill) => (
                <span
                  key={skill}
                  className="skill-pill inline-block bg-ink text-cream rounded-full px-5 py-2.5 sm:px-6 sm:py-3 font-sans text-xs sm:text-sm font-medium tracking-wide transition-transform duration-200 hover:scale-105"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MOBILE LAYOUT (< lg): Horizontal Row at Top               */}
      {/* ========================================================= */}
      <div className="flex lg:hidden flex-col w-full h-full justify-center px-6 sm:px-12 py-16 gap-10">
        {/* Horizontal row of numbered circles at the top */}
        <div className="w-full flex items-center justify-between relative pb-4 border-b border-line">
          {skills.map((cat, i) => {
            const isActive = activeIdx === i;
            return (
              <button
                key={cat.numeral}
                type="button"
                onClick={() => handleNodeClick(i)}
                className={`w-11 h-11 rounded-full flex items-center justify-center font-serif italic text-sm transition-all duration-300 ${
                  isActive
                    ? "bg-ink text-cream border-2 border-ink shadow-md"
                    : "bg-cream text-muted border border-line"
                }`}
                aria-label={`Category ${cat.numeral}: ${cat.category}`}
              >
                {cat.numeral}
              </button>
            );
          })}
        </div>

        {/* Mobile Category Content with the same smooth transition */}
        <div ref={mobileContentRef} className="flex flex-col gap-5">
          <span className="font-sans text-xs tracking-[0.25em] text-muted uppercase font-medium">
            Category {currentCategory.numeral}
          </span>

          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-ink tracking-tight">
            {currentCategory.category}
          </h3>

          <p className="font-sans text-sm sm:text-base text-muted/90 leading-relaxed">
            {currentCategory.description}
          </p>

          <div
            ref={mobilePillsRef}
            className="flex flex-wrap items-center gap-2.5 pt-2"
          >
            {currentCategory.items.map((skill) => (
              <span
                key={skill}
                className="skill-pill inline-block bg-ink text-cream rounded-full px-4 py-2 font-sans text-xs font-medium tracking-wide"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
