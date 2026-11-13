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

  const email = "hello@kartheek.dev";

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

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="flex flex-col gap-16 md:gap-24 scroll-mt-28 border-t border-line pt-16 md:pt-24 pb-20"
    >
      {/* Chapter Label */}
      <div className="flex items-baseline justify-between border-b border-line pb-4">
        <span className="font-mono text-xs uppercase tracking-widest text-muted">
          05 // NEXT
        </span>
        <span className="font-mono text-xs uppercase tracking-widest text-muted">
          Inquiries & Collaboration
        </span>
      </div>

      {/* Huge Instrument Serif headline */}
      <div className="flex flex-col gap-8 max-w-4xl">
        <h2 className="font-story text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-text font-normal leading-[1.08] tracking-tight">
          &ldquo;Got a role, a project or a scene in mind? Let&apos;s make it.&rdquo;
        </h2>
      </div>

      {/* Primary Mailto Action & Copy Button */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-2">
        <a
          href={`mailto:${email}`}
          className="group inline-flex items-center gap-3 font-display text-2xl sm:text-3xl md:text-4xl text-text hover:text-accent transition-colors"
        >
          <span className="border-b border-line group-hover:border-accent transition-colors pb-1">
            {email}
          </span>
          <span
            aria-hidden="true"
            className="text-muted group-hover:text-accent group-hover:rotate-45 transition-transform duration-300 ease-out"
          >
            ↗
          </span>
        </a>

        <button
          type="button"
          onClick={handleCopyEmail}
          className="font-mono text-xs uppercase tracking-widest border border-line px-4 py-2.5 text-muted hover:text-text hover:border-accent transition-colors self-start sm:self-auto cursor-pointer"
        >
          {copied ? (
            <span className="text-accent font-medium">COPIED</span>
          ) : (
            <span>Copy email</span>
          )}
        </button>
      </div>

      {/* Social Links Row */}
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-4 border-t border-line">
        <span className="font-mono text-xs uppercase tracking-widest text-muted mr-2">
          Network:
        </span>
        {content.socials.map((social) => (
          <a
            key={social.platform}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative py-1 font-mono text-xs uppercase tracking-wider text-muted hover:text-text transition-colors"
          >
            <span>{social.platform}</span>
            <span className="text-muted/60 ml-1 group-hover:text-accent transition-colors">
              ↗
            </span>
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-[1px] w-0 bg-accent transition-all duration-300 ease-out group-hover:w-full"
            />
          </a>
        ))}
      </div>

      {/* Fade-to-black End Credits Roll */}
      <div
        ref={endCreditsRef}
        className="border-t border-line pt-12 flex flex-col items-center justify-center gap-6 text-center select-none"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted/60">
          [ End Credits Roll ]
        </span>
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-3 font-mono text-xs text-muted">
          <div>
            <span className="text-muted/50">WRITTEN BY // </span>
            <span className="text-text">KARTHEEK</span>
          </div>
          <div>
            <span className="text-muted/50">DIRECTED BY // </span>
            <span className="text-text">KARTHEEK</span>
          </div>
          <div>
            <span className="text-muted/50">BUILT BY // </span>
            <span className="text-text">KARTHEEK</span>
          </div>
        </div>
      </div>

      {/* Final Colophon & The End */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-line pt-6 text-muted font-mono text-[11px]">
        <span>© 2026 {content.name}. All rights reserved.</span>
        <span className="text-accent uppercase tracking-widest font-medium">
          The End.
        </span>
      </div>
    </footer>
  );
}
