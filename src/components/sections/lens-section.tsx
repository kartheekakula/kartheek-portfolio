"use client";

import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content, Film, Photo } from "@/data/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function LensSection() {
  const filmsSectionRef = useRef<HTMLElement | null>(null);
  const pinnedWrapperRef = useRef<HTMLDivElement | null>(null);
  const stripRef = useRef<HTMLDivElement | null>(null);
  const letterboxTopRef = useRef<HTMLDivElement | null>(null);
  const letterboxBottomRef = useRef<HTMLDivElement | null>(null);

  // Modals state
  const [activeFilm, setActiveFilm] = useState<Film | null>(null);
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);

  const { films, photos } = content;

  // 1. GSAP Layout Setup (useLayoutEffect with gsap.context)
  useIsomorphicLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !filmsSectionRef.current) return;

    const ctx = gsap.context(() => {
      const strip = stripRef.current;
      const pinnedWrapper = pinnedWrapperRef.current;
      if (!strip || !pinnedWrapper) return;

      // Pinned Films Horizontal Scroll Strip
      gsap.to(strip, {
        x: () => -(strip.scrollWidth - window.innerWidth + 80),
        ease: "none",
        scrollTrigger: {
          trigger: pinnedWrapper,
          start: "top top",
          end: () => "+=" + (strip.scrollWidth - window.innerWidth),
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          scrub: 1,
        },
      });

      // Letterbox Bars Trigger (Bars are scoped inside Films section)
      if (letterboxTopRef.current && letterboxBottomRef.current) {
        ScrollTrigger.create({
          trigger: pinnedWrapper,
          start: "top 20%",
          end: "bottom 80%",
          onEnter: () => {
            gsap.to([letterboxTopRef.current, letterboxBottomRef.current], {
              y: 0,
              duration: 0.4,
              ease: "power2.out",
            });
          },
          onLeave: () => {
            gsap.to(letterboxTopRef.current, {
              y: "-100%",
              duration: 0.3,
              ease: "power2.in",
            });
            gsap.to(letterboxBottomRef.current, {
              y: "100%",
              duration: 0.3,
              ease: "power2.in",
            });
          },
          onEnterBack: () => {
            gsap.to([letterboxTopRef.current, letterboxBottomRef.current], {
              y: 0,
              duration: 0.4,
              ease: "power2.out",
            });
          },
          onLeaveBack: () => {
            gsap.to(letterboxTopRef.current, {
              y: "-100%",
              duration: 0.3,
              ease: "power2.in",
            });
            gsap.to(letterboxBottomRef.current, {
              y: "100%",
              duration: 0.3,
              ease: "power2.in",
            });
          },
        });
      }
    }, filmsSectionRef);

    // Refresh after fonts load
    if (typeof document !== "undefined" && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    // Refresh after window complete load
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
      ctx.revert();
    };
  }, [films]);

  // 2. Lightbox keyboard navigation & escape handling
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveFilm(null);
        setActivePhotoIdx(null);
      } else if (activePhotoIdx !== null) {
        if (e.key === "ArrowRight") {
          setActivePhotoIdx((prev) =>
            prev !== null ? (prev + 1) % photos.length : 0
          );
        } else if (e.key === "ArrowLeft") {
          setActivePhotoIdx((prev) =>
            prev !== null ? (prev - 1 + photos.length) % photos.length : 0
          );
        }
      }
    },
    [activePhotoIdx, photos.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const activePhoto =
    activePhotoIdx !== null ? photos[activePhotoIdx] : null;

  return (
    <>
      {/* ========================================================= */}
      {/* 1. FILMS SECTION (Dark Ink Background, Pinned Strip)      */}
      {/* ========================================================= */}
      <section
        id="films"
        ref={filmsSectionRef}
        className="relative w-full bg-ink text-cream overflow-hidden"
      >
        {/* Letterbox bars scoped strictly inside Films section */}
        <div
          ref={letterboxTopRef}
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-4 sm:h-6 bg-black z-30 pointer-events-none border-b border-cream/10 -translate-y-full will-change-transform"
        />
        <div
          ref={letterboxBottomRef}
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-4 sm:h-6 bg-black z-30 pointer-events-none border-t border-cream/10 translate-y-full will-change-transform"
        />

        {/* Pinned wrapper with non-absolute positioning */}
        <div
          ref={pinnedWrapperRef}
          className="relative w-full min-h-screen flex flex-col justify-center py-16 px-6 sm:px-12 md:px-20 overflow-hidden"
        >
          {/* Simple Header */}
          <div className="w-full max-w-7xl mx-auto mb-8 sm:mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-cream tracking-tight">
              Films
            </h2>
          </div>

          {/* Horizontal Strip */}
          <div className="w-full overflow-visible">
            <div
              ref={stripRef}
              className="flex gap-8 sm:gap-12 items-start will-change-transform"
            >
              {films.map((film) => (
                <div
                  key={film.id}
                  onClick={() => setActiveFilm(film)}
                  className="group cursor-pointer flex-shrink-0 w-[280px] sm:w-[420px] md:w-[500px] flex flex-col gap-3 select-none"
                >
                  {/* Thumbnail Frame */}
                  <div className="relative aspect-[16/9] w-full border border-cream/15 bg-black overflow-hidden rounded-xl">
                    <Image
                      src={film.thumbnail}
                      alt={film.title}
                      fill
                      loading="lazy"
                      onLoad={() => ScrollTrigger.refresh()}
                      sizes="(max-width: 640px) 280px, (max-width: 1024px) 420px, 500px"
                      className="object-cover grayscale contrast-125 opacity-85 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                    />

                    {/* Play Cue Overlay */}
                    <div className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="font-sans text-xs uppercase tracking-widest text-cream border border-cream/30 bg-ink/90 px-4 py-2 rounded-full flex items-center gap-2">
                        <span>Watch</span>
                        <span className="text-tangerine">▶</span>
                      </span>
                    </div>
                  </div>

                  {/* Title Only in Playfair Display */}
                  <h3 className="font-serif text-lg sm:text-xl md:text-2xl text-cream font-medium group-hover:text-tangerine transition-colors">
                    {film.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. PHOTOGRAPHY SECTION (Cream Background, z-index 2, 20vh)*/}
      {/* ========================================================= */}
      <section
        id="photography"
        className="relative z-[2] mt-[20vh] w-full bg-cream text-ink py-20 md:py-28 px-6 sm:px-12 md:px-20 lg:px-32"
      >
        <div className="max-w-7xl mx-auto">
          {/* Simple Header */}
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-ink tracking-tight mb-10 sm:mb-14">
            Photography
          </h2>

          {/* 3 Columns on Desktop, 1 Column on Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-start">
            {photos.map((photo, idx) => (
              <div
                key={photo.id}
                onClick={() => setActivePhotoIdx(idx)}
                className="group cursor-pointer relative overflow-hidden rounded-xl border border-line bg-surface/30 aspect-[4/5] shadow-sm hover:shadow-md transition-shadow"
              >
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  loading="lazy"
                  onLoad={() => ScrollTrigger.refresh()}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover grayscale contrast-110 transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* FULLSCREEN FILM MODAL (youtube-nocookie)                   */}
      {/* ========================================================= */}
      {activeFilm && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-ink/95 flex flex-col items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setActiveFilm(null)}
        >
          <div
            className="w-full max-w-5xl flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal top bar */}
            <div className="flex items-center justify-between font-sans text-xs text-muted border-b border-cream/15 pb-3">
              <span className="font-serif text-base text-cream">
                {activeFilm.title}
              </span>
              <button
                type="button"
                onClick={() => setActiveFilm(null)}
                className="hover:text-tangerine transition-colors uppercase tracking-wider cursor-pointer font-medium"
              >
                Close (Esc)
              </button>
            </div>

            {/* Responsive 16:9 Video Embed */}
            <div className="relative aspect-[16/9] w-full border border-cream/20 rounded-xl overflow-hidden bg-black shadow-2xl">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeFilm.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={activeFilm.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* FULLSCREEN PHOTO LIGHTBOX WITH ARROWS                     */}
      {/* ========================================================= */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-ink/95 flex flex-col justify-between p-6 sm:p-10 select-none animate-in fade-in duration-200"
          onClick={() => setActivePhotoIdx(null)}
        >
          {/* Top Bar */}
          <div
            className="flex items-center justify-between font-sans text-xs text-muted border-b border-cream/15 pb-3 max-w-6xl w-full mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="font-serif text-sm tracking-wide text-cream">
              {activePhoto.title}
            </span>

            <div className="flex items-center gap-6">
              <span className="hidden sm:inline text-muted/70 text-[11px]">
                Use ← / → keys to navigate
              </span>
              <button
                type="button"
                onClick={() => setActivePhotoIdx(null)}
                className="hover:text-tangerine transition-colors uppercase tracking-wider cursor-pointer font-medium"
              >
                Close (Esc)
              </button>
            </div>
          </div>

          {/* Central Image with Navigation Arrows */}
          <div
            className="relative flex-1 max-w-5xl w-full mx-auto my-6 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Arrow */}
            <button
              type="button"
              onClick={() =>
                setActivePhotoIdx((prev) =>
                  prev !== null ? (prev - 1 + photos.length) % photos.length : 0
                )
              }
              aria-label="Previous photo"
              className="absolute left-2 sm:-left-12 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-ink/80 border border-cream/20 text-cream flex items-center justify-center hover:bg-tangerine hover:border-tangerine transition-colors cursor-pointer"
            >
              ‹
            </button>

            {/* Photo Container */}
            <div className="relative w-full h-full max-h-[75vh]">
              <Image
                src={activePhoto.src}
                alt={activePhoto.title}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            {/* Right Arrow */}
            <button
              type="button"
              onClick={() =>
                setActivePhotoIdx((prev) =>
                  prev !== null ? (prev + 1) % photos.length : 0
                )
              }
              aria-label="Next photo"
              className="absolute right-2 sm:-right-12 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-ink/80 border border-cream/20 text-cream flex items-center justify-center hover:bg-tangerine hover:border-tangerine transition-colors cursor-pointer"
            >
              ›
            </button>
          </div>

          {/* Bottom Bar Counter */}
          <div
            className="flex items-center justify-center font-sans text-xs text-muted/80 max-w-6xl w-full mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <span>
              {(activePhotoIdx ?? 0) + 1} of {photos.length}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
