"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/data/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const endCreditsRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  const email = content.email;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  // Fade-to-black end credits animation when reaching the bottom
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (!endCreditsRef.current || !sectionRef.current) return;

      ScrollTrigger.create({
        trigger: endCreditsRef.current,
        start: "top 95%",
        onEnter: () => {
          gsap.fromTo(
            endCreditsRef.current,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
          );
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Filter out any social link with TODO
  const activeSocials = content.socials.filter(
    (s) => s.href && s.href !== "TODO" && !s.href.includes("TODO")
  );

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="flex flex-col gap-16 md:gap-24 scroll-mt-28 border-t border-line pt-12 md:pt-16 pb-20"
    >
      {/* Plain Section Heading */}
      <div className="border-b border-line pb-4">
        <h2 className="text-xs uppercase tracking-widest text-muted font-sans font-medium">
          Contact
        </h2>
      </div>

      {/* Headline Placeholder */}
      <div className="flex flex-col gap-8 max-w-4xl">
        <h2 className="font-serif italic text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-ink font-normal leading-[1.08] tracking-tight">
          {content.contactLine}
        </h2>
      </div>

      {/* Primary Mailto Action & Copy Button */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-2">
        <a
          href={`mailto:${email}`}
          className="group inline-flex items-center gap-3 font-serif text-2xl sm:text-3xl md:text-4xl text-ink hover:text-tangerine transition-colors break-all sm:break-normal"
        >
          <span className="border-b border-line group-hover:border-tangerine transition-colors pb-1">
            {email}
          </span>
          <span
            aria-hidden="true"
            className="text-muted group-hover:text-tangerine group-hover:rotate-45 transition-transform duration-300 ease-out"
          >
            ↗
          </span>
        </a>

        <button
          type="button"
          onClick={handleCopyEmail}
          className="font-sans text-xs uppercase tracking-widest border border-line px-4 py-2.5 text-muted hover:text-ink hover:border-tangerine transition-colors self-start sm:self-auto cursor-pointer font-medium"
        >
          {copied ? (
            <span className="text-tangerine font-medium">COPIED</span>
          ) : (
            <span>Copy email</span>
          )}
        </button>
      </div>

      {/* Social Links Row (links with TODO are filtered out) */}
      {activeSocials.length > 0 && (
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-4 border-t border-line">
          {activeSocials.map((social) => (
            <a
              key={social.platform}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative py-1 font-sans text-xs uppercase tracking-wider text-muted hover:text-ink transition-colors font-medium"
            >
              <span>{social.platform}</span>
              <span className="text-muted/60 ml-1 group-hover:text-tangerine transition-colors">
                ↗
              </span>
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-[1px] w-0 bg-tangerine transition-all duration-300 ease-out group-hover:w-full"
              />
            </a>
          ))}
        </div>
      )}

      {/* End Credits */}
      <div
        ref={endCreditsRef}
        className="border-t border-line pt-12 flex flex-col items-center justify-center gap-6 text-center select-none"
      >
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-3 font-sans text-xs text-muted">
          <div>
            <span className="text-muted/60">Written by </span>
            <span className="text-ink font-medium">Kartheek</span>
          </div>
          <div>
            <span className="text-muted/60">Directed by </span>
            <span className="text-ink font-medium">Kartheek</span>
          </div>
          <div>
            <span className="text-muted/60">Built by </span>
            <span className="text-ink font-medium">Kartheek</span>
          </div>
        </div>
      </div>

      {/* Final Colophon & The End */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-line pt-6 text-muted font-sans text-xs">
        <span>© 2026 {content.name}. All rights reserved.</span>
        <span className="text-tangerine uppercase tracking-widest font-medium">
          The End.
        </span>
      </div>
    </footer>
  );
}
