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
  const textRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !textRef.current || !textContainerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        {
          opacity: 0.15,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
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
      id="about"
      ref={sectionRef}
      className="flex flex-col gap-12 md:gap-16 scroll-mt-28 border-t border-line pt-12 md:pt-16"
    >
      {/* Plain Section Heading */}
      <div className="border-b border-line pb-4">
        <h2 className="text-xs uppercase tracking-widest text-muted font-sans font-medium">
          About
        </h2>
      </div>

      {/* 12-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left: About Text */}
        <div
          ref={textContainerRef}
          className="lg:col-span-7 flex flex-col gap-6"
        >
          <p
            ref={textRef}
            className="font-serif italic text-2xl sm:text-3xl md:text-4xl lg:text-[40px] text-ink font-normal leading-[1.25] tracking-tight will-change-[transform,opacity]"
          >
            {content.aboutText}
          </p>
        </div>

        {/* Right: Portrait Photo */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="relative aspect-[3/4] w-full max-w-sm mx-auto lg:max-w-none border border-line bg-surface overflow-hidden">
            <Image
              src="/images/potrait.jpeg"
              alt="Portrait of Kartheek"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover grayscale contrast-125 opacity-90 transition-opacity hover:opacity-100"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
