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
  const sectionRef = useRef<HTMLElement | null>(null);
  const diagonalCutRef = useRef<HTMLDivElement | null>(null);

  const email = content.email;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Fallback
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Diagonal cut transition animation on scroll
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !diagonalCutRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        diagonalCutRef.current,
        {
          clipPath: "polygon(0 100%, 100% 60%, 100% 100%, 0 100%)",
        },
        {
          clipPath: "polygon(0 100%, 100% 0%, 100% 100%, 0 100%)",
          ease: "none",
          scrollTrigger: {
            trigger: diagonalCutRef.current,
            start: "top 95%",
            end: "bottom 40%",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Filter out any social link with TODO, YouTube, or Email
  const activeSocials = content.socials.filter(
    (s) =>
      s.href &&
      s.href !== "TODO" &&
      !s.href.includes("TODO") &&
      s.platform.toLowerCase() !== "youtube" &&
      s.platform.toLowerCase() !== "email"
  );

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="relative w-full bg-cream text-ink scroll-mt-20 overflow-hidden"
    >
      {/* ========================================================= */}
      {/* DIAGONAL CUT TRANSITION (Dark above -> Cream below)       */}
      {/* ========================================================= */}
      <div
        aria-hidden="true"
        className="relative w-full h-24 sm:h-36 md:h-48 bg-ink overflow-hidden pointer-events-none select-none"
      >
        <div
          ref={diagonalCutRef}
          className="absolute inset-0 bg-cream will-change-[clip-path]"
          style={{
            clipPath: "polygon(0 100%, 100% 0%, 100% 100%, 0 100%)",
          }}
        />
      </div>

      {/* ========================================================= */}
      {/* MAIN CONTACT CONTENT CONTAINER                            */}
      {/* ========================================================= */}
      <div className="w-full max-w-6xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32 pt-12 sm:pt-20 pb-20 flex flex-col gap-16 sm:gap-24">
        {/* Large two-line statement */}
        <div className="flex flex-col gap-3 max-w-4xl">
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-ink font-bold leading-[1.12] tracking-tight">
            <span className="block mb-2 sm:mb-3">
              {content.contactLine.line1}
            </span>
            <span className="inline-block bg-tangerine text-ink px-3 py-1 sm:px-5 sm:py-2 rounded-sm shadow-sm font-bold">
              {content.contactLine.line2}
            </span>
          </h2>
        </div>

        {/* Primary Email & Action Buttons */}
        <div className="flex flex-col gap-6 pt-2">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              href={`mailto:${email}`}
              className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-ink hover:text-tangerine transition-colors underline decoration-line/80 hover:decoration-tangerine underline-offset-8 break-all sm:break-normal"
            >
              {email}
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="font-sans text-xs uppercase tracking-widest border border-line hover:border-ink bg-cream px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-muted hover:text-ink transition-all font-medium cursor-pointer shadow-sm self-start sm:self-auto"
            >
              {copied ? (
                <span className="text-tangerine font-semibold">Copied</span>
              ) : (
                "Copy"
              )}
            </button>
          </div>

          <div>
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 font-sans text-xs sm:text-sm font-semibold text-ink hover:text-tangerine uppercase tracking-wider group transition-colors pt-2"
            >
              <span>Contact</span>
              <span className="group-hover:translate-x-1 transition-transform duration-200">
                →
              </span>
            </a>
          </div>
        </div>

        {/* ========================================================= */}
        {/* FOOTER: Socials, Resume & Colophon                        */}
        {/* ========================================================= */}
        <div className="pt-12 sm:pt-16 border-t border-line flex flex-col items-center gap-10">
          {/* Tooltip & Social Icons Row */}
          <div className="relative group/footer flex flex-col items-center">
            {/* Tooltip "Say hi" appearing above the icons on hover */}
            <div
              role="tooltip"
              className="absolute -top-10 opacity-0 group-hover/footer:opacity-100 group-hover/footer:-translate-y-1 transition-all duration-200 pointer-events-none px-3 py-1 rounded bg-ink text-cream text-[11px] font-sans tracking-wide shadow-md whitespace-nowrap z-10"
            >
              Say hi
              <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-ink" />
            </div>

            {/* Round outlined icon buttons & Resume pill */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {activeSocials.map((social) => {
                const platform = social.platform.toLowerCase();

                return (
                  <a
                    key={social.platform}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.platform}
                    className="w-11 h-11 rounded-full border border-line hover:border-ink bg-cream text-ink hover:text-tangerine flex items-center justify-center transition-all shadow-sm hover:scale-105"
                  >
                    {platform === "github" && (
                      <svg
                        className="w-4 h-4 fill-current"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        />
                      </svg>
                    )}
                    {platform === "linkedin" && (
                      <svg
                        className="w-4 h-4 fill-current"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.77v8.37H6.46v-8.37M7.85 6.25a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24" />
                      </svg>
                    )}
                    {platform === "instagram" && (
                      <svg
                        className="w-4 h-4 fill-none stroke-current stroke-2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                    )}
                  </a>
                );
              })}

              {/* Pill Button "Resume" downloading /resume.pdf */}
              <a
                href="/resume.pdf"
                download="Kartheek_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-line hover:border-ink bg-cream text-ink font-sans text-xs uppercase tracking-wider font-semibold transition-all hover:bg-ink hover:text-cream shadow-sm hover:scale-105"
              >
                <span>Resume</span>
                <svg
                  className="w-3.5 h-3.5 fill-none stroke-current stroke-2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Bottom Colophon Line */}
          <div className="border-t border-line/60 pt-8 pb-4 w-full text-center">
            <p className="font-sans text-xs text-muted">
              Written, directed and built by Kartheek · 2026
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
