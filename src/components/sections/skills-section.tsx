"use client";

import { useEffect, useRef } from "react";
import { content } from "@/data/content";

export function SkillsSection() {
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const { skills } = content;

  // Horizontal marquee reacting to scroll velocity
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !marqueeRef.current) return;

    let currentX = 0;
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let rafId: number;

    const onScroll = () => {
      const delta = window.scrollY - lastScrollY;
      scrollVelocity = delta * 0.25;
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    const animate = () => {
      // Natural base drift speed + inertial decay of scroll velocity
      const speed = 0.6 + Math.abs(scrollVelocity);
      // Direction: moves steadily left, reverses if scrolling up fast
      const direction = scrollVelocity < -2 ? 1 : -1;
      currentX += direction * speed;

      if (marqueeRef.current) {
        const halfWidth = marqueeRef.current.scrollWidth / 2;
        if (currentX <= -halfWidth) {
          currentX += halfWidth;
        } else if (currentX >= 0) {
          currentX -= halfWidth;
        }
        marqueeRef.current.style.transform = `translate3d(${currentX}px, 0, 0)`;
      }

      // Smooth decay of scroll velocity
      scrollVelocity *= 0.92;

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleScrollToExperience = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    const target = document.querySelector("#experience");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const marqueeText = "BUILD • SHOOT • EDIT • SHIP • ";
  const repeatedMarquee = Array(8).fill(marqueeText).join("");

  return (
    <section
      id="craft"
      className="flex flex-col gap-12 md:gap-16 scroll-mt-28 border-t border-line pt-16 md:pt-24 overflow-hidden"
    >
      {/* Chapter Label */}
      <div className="flex items-baseline justify-between border-b border-line pb-4">
        <span className="font-mono text-xs uppercase tracking-widest text-muted">
          03 // THE CRAFT
        </span>
        <span className="font-mono text-xs uppercase tracking-widest text-muted">
          Disciplines & Capabilities
        </span>
      </div>

      {/* Outlined Huge Marquee Strip */}
      <div
        aria-hidden="true"
        className="w-full overflow-hidden select-none py-2 border-b border-line"
      >
        <div
          ref={marqueeRef}
          className="will-change-transform inline-block whitespace-nowrap"
        >
          <span
            className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tighter"
            style={{
              WebkitTextStroke: "1px var(--line)",
              color: "transparent",
            }}
          >
            {repeatedMarquee}
          </span>
        </div>
      </div>

      {/* Skills 5-column / responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 md:gap-12 pt-4">
        {skills.map((group) => (
          <div key={group.category} className="flex flex-col gap-5">
            <span className="font-mono text-xs uppercase tracking-widest text-muted border-b border-line pb-2">
              // {group.category}
            </span>
            <ul className="flex flex-col gap-3 font-mono text-xs sm:text-sm text-text/80">
              {group.items.map((item) => (
                <li key={item}>
                  <span className="relative inline-block cursor-default text-text/90 hover:text-text transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-accent after:transition-all after:duration-200">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Road so far Link */}
      <div className="pt-6 border-t border-line flex items-center justify-between">
        <a
          href="#experience"
          onClick={handleScrollToExperience}
          className="font-mono text-xs uppercase tracking-widest text-muted hover:text-accent transition-colors inline-flex items-center gap-2 group py-2"
        >
          <span>See the road so far</span>
          <span className="group-hover:translate-y-1 transition-transform duration-200">
            ↓
          </span>
        </a>

        <span className="font-mono text-[11px] uppercase tracking-wider text-muted/60 hidden sm:inline">
          Chronology & Trajectory
        </span>
      </div>
    </section>
  );
}

