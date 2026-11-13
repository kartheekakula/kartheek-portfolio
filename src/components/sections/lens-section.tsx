"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content, Film, Photo } from "@/data/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function LensSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const letterboxTopRef = useRef<HTMLDivElement | null>(null);
  const letterboxBottomRef = useRef<HTMLDivElement | null>(null);

  const filmsContainerRef = useRef<HTMLDivElement | null>(null);
  const filmsTrackRef = useRef<HTMLDivElement | null>(null);

  // Modals state
  const [activeFilm, setActiveFilm] = useState<Film | null>(null);
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);

  const { films, photos } = content;

  // 1. Cinematic Letterbox Bars
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (
        !letterboxTopRef.current ||
        !letterboxBottomRef.current ||
        !sectionRef.current
      )
        return;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 60%",
        end: "bottom 30%",
        onEnter: () => {
          gsap.to([letterboxTopRef.current, letterboxBottomRef.current], {
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        },
        onLeave: () => {
          gsap.to(letterboxTopRef.current, {
            y: "-100%",
            duration: 0.4,
            ease: "power2.in",
          });
          gsap.to(letterboxBottomRef.current, {
            y: "100%",
            duration: 0.4,
            ease: "power2.in",
          });
        },
        onEnterBack: () => {
          gsap.to([letterboxTopRef.current, letterboxBottomRef.current], {
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(letterboxTopRef.current, {
            y: "-100%",
            duration: 0.4,
            ease: "power2.in",
          });
          gsap.to(letterboxBottomRef.current, {
            y: "100%",
            duration: 0.4,
            ease: "power2.in",
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 2. Horizontally scrolling pinned film strip (Part A)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (!filmsContainerRef.current || !filmsTrackRef.current) return;

      const track = filmsTrackRef.current;
      const totalScrollWidth = track.scrollWidth - window.innerWidth + 120;

      if (totalScrollWidth <= 0) return;

      gsap.to(track, {
        x: -totalScrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: filmsContainerRef.current,
          start: "top 15%",
          end: () => `+=${totalScrollWidth * 1.2}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [films]);

  // 3. Lightbox keyboard navigation & escape handling
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
      {/* Dynamic Cinematic Letterbox Bars */}
      <div
        ref={letterboxTopRef}
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-4 md:h-6 bg-black z-50 pointer-events-none -translate-y-full will-change-transform border-b border-line/40"
      />
      <div
        ref={letterboxBottomRef}
        aria-hidden="true"
        className="fixed bottom-0 left-0 right-0 h-4 md:h-6 bg-black z-50 pointer-events-none translate-y-full will-change-transform border-t border-line/40"
      />

      <section
        id="lens"
        ref={sectionRef}
        className="flex flex-col gap-20 md:gap-32 scroll-mt-28 border-t border-line pt-16 md:pt-24"
      >
        {/* Chapter Header */}
        <div className="flex items-baseline justify-between border-b border-line pb-4">
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            04 // THE LENS
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            Motion Picture & Still Observations
          </span>
        </div>

        {/* ---------------- PART A: FILMS ---------------- */}
        <div className="flex flex-col gap-8">
          <div className="flex items-baseline justify-between border-b border-line pb-3">
            <h3 className="font-mono text-xs uppercase tracking-widest text-text">
              Part A // Moving Image [ Pin Scrub ]
            </h3>
            <span className="font-mono text-xs text-muted">
              {films.length.toString().padStart(2, "0")} Entries
            </span>
          </div>

          <div
            ref={filmsContainerRef}
            className="w-full relative overflow-hidden py-4"
          >
            <div
              ref={filmsTrackRef}
              className="flex gap-8 items-start will-change-transform"
            >
              {films.map((film, idx) => (
                <div
                  key={film.id}
                  onClick={() => setActiveFilm(film)}
                  className="group cursor-pointer flex-shrink-0 w-[300px] sm:w-[440px] md:w-[540px] flex flex-col gap-3.5 select-none"
                >
                  {/* Thumbnail Frame */}
                  <div className="relative aspect-[16/9] w-full border border-line bg-surface overflow-hidden">
                    <Image
                      src={film.thumbnail}
                      alt={film.title}
                      fill
                      sizes="(max-width: 768px) 300px, 540px"
                      className="object-cover grayscale contrast-125 opacity-85 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                    />

                    {/* Overlay cue */}
                    <div className="absolute inset-0 bg-bg/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="font-mono text-xs uppercase tracking-widest text-text border border-line bg-bg/90 px-3 py-1.5 flex items-center gap-2">
                        <span>Play Reel</span>
                        <span className="text-accent">▶</span>
                      </span>
                    </div>

                    <div className="absolute bottom-2 left-2 font-mono text-[10px] text-muted bg-bg/80 border border-line px-1.5 py-0.5">
                      {film.duration}
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-baseline justify-between pt-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-muted">
                        {(idx + 1).toString().padStart(2, "0")}
                      </span>
                      <h4 className="font-display text-lg sm:text-xl text-text font-normal group-hover:text-accent transition-colors">
                        {film.title}
                      </h4>
                    </div>
                    <span className="font-mono text-xs text-muted">
                      {film.year}
                    </span>
                  </div>

                  <p className="font-story text-sm text-muted line-clamp-2">
                    {film.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ---------------- PART B: PHOTOGRAPHY ---------------- */}
        <div className="flex flex-col gap-8">
          <div className="flex items-baseline justify-between border-b border-line pb-3">
            <h3 className="font-mono text-xs uppercase tracking-widest text-text">
              Part B // Still Image [ Lightbox & Optics ]
            </h3>
            <span className="font-mono text-xs text-muted">
              {photos.length.toString().padStart(2, "0")} Frames
            </span>
          </div>

          {/* Masonry-like grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {photos.map((photo, idx) => (
              <figure
                key={photo.id}
                onClick={() => setActivePhotoIdx(idx)}
                className="group cursor-pointer flex flex-col gap-2.5 border border-line p-3 bg-surface/20 transition-colors hover:border-accent"
              >
                <div
                  className={`relative ${photo.aspectClass} w-full overflow-hidden bg-surface`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover grayscale contrast-125 transition-all duration-500 group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 font-mono text-[9px] uppercase tracking-wider text-muted bg-bg/80 border border-line px-1.5 py-0.5">
                    {(idx + 1).toString().padStart(2, "0")}
                  </div>
                </div>

                <figcaption className="flex flex-col gap-1 pt-1 font-mono text-[11px]">
                  <div className="flex items-baseline justify-between text-text">
                    <span className="font-medium">{photo.title}</span>
                    <span className="text-muted">{photo.year}</span>
                  </div>
                  <div className="text-muted text-[10px] truncate">
                    {photo.camera} // {photo.location}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FULLSCREEN FILM MODAL ---------------- */}
      {activeFilm && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-bg/95 flex flex-col items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setActiveFilm(null)}
        >
          <div
            className="w-full max-w-5xl flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal top bar */}
            <div className="flex items-center justify-between font-mono text-xs text-muted border-b border-line pb-3">
              <span className="uppercase tracking-widest text-text">
                Reel // {activeFilm.title} ({activeFilm.year})
              </span>
              <button
                type="button"
                onClick={() => setActiveFilm(null)}
                className="hover:text-accent transition-colors uppercase tracking-wider cursor-pointer"
              >
                [ Close ESC ]
              </button>
            </div>

            {/* Responsive 16:9 Video Embed */}
            <div className="relative aspect-[16/9] w-full border border-line bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeFilm.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={activeFilm.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            <div className="flex items-baseline justify-between font-mono text-xs text-muted">
              <span>{activeFilm.role}</span>
              <span>Duration: {activeFilm.duration}</span>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- FULLSCREEN PHOTO LIGHTBOX ---------------- */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-bg/95 flex flex-col justify-between p-6 sm:p-10 select-none animate-fadeIn"
          onClick={() => setActivePhotoIdx(null)}
        >
          {/* Lightbox Header with Counter */}
          <div
            className="flex items-center justify-between font-mono text-xs text-muted border-b border-line pb-3 max-w-6xl w-full mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="tracking-widest uppercase text-text font-medium">
              PHOTO{" "}
              {((activePhotoIdx ?? 0) + 1).toString().padStart(2, "0")} /{" "}
              {photos.length.toString().padStart(2, "0")}
            </span>

            <div className="flex items-center gap-6">
              <span className="hidden sm:inline text-muted/60 text-[11px]">
                [ ← / → Navigate ]
              </span>
              <button
                type="button"
                onClick={() => setActivePhotoIdx(null)}
                className="hover:text-accent transition-colors uppercase tracking-wider cursor-pointer"
              >
                [ Close ESC ]
              </button>
            </div>
          </div>

          {/* Central Image Container */}
          <div
            className="relative flex-1 max-w-5xl w-full mx-auto my-6 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
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
          </div>

          {/* Lightbox Caption Footer */}
          <div
            className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 font-mono text-xs text-muted border-t border-line pt-3 max-w-6xl w-full mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-baseline gap-3">
              <span className="text-text font-normal">{activePhoto.title}</span>
              <span className="text-muted/60">({activePhoto.year})</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs">
              <span className="text-text/80">{activePhoto.camera}</span>
              <span className="text-muted/40">//</span>
              <span>{activePhoto.location}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

