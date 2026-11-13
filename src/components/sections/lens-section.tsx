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

  // 2. Horizontally scrolling pinned film strip
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
        className="fixed top-0 left-0 right-0 h-4 md:h-6 bg-ink z-50 pointer-events-none -translate-y-full will-change-transform border-b border-line/40"
      />
      <div
        ref={letterboxBottomRef}
        aria-hidden="true"
        className="fixed bottom-0 left-0 right-0 h-4 md:h-6 bg-ink z-50 pointer-events-none translate-y-full will-change-transform border-t border-line/40"
      />

      <section
        id="lens"
        ref={sectionRef}
        className="flex flex-col gap-20 md:gap-28 scroll-mt-28 border-t border-line pt-12 md:pt-16"
      >
        {/* Plain Section Heading */}
        <div className="border-b border-line pb-4">
          <h2 className="text-xs uppercase tracking-widest text-muted font-sans font-medium">
            Lens
          </h2>
        </div>

        {/* ---------------- FILMS ---------------- */}
        <div className="flex flex-col gap-8">
          <div className="flex items-baseline justify-between border-b border-line pb-3">
            <h3 className="font-sans text-xs uppercase tracking-widest text-ink font-medium">
              Films
            </h3>
            <span className="font-sans text-xs text-muted">
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
                      loading="lazy"
                      sizes="(max-width: 768px) 300px, 540px"
                      className="object-cover grayscale contrast-125 opacity-85 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                    />

                    {/* Overlay cue */}
                    <div className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="font-sans text-xs uppercase tracking-widest text-cream border border-line bg-ink/90 px-3 py-1.5 flex items-center gap-2">
                        <span>Play Reel</span>
                        <span className="text-tangerine">▶</span>
                      </span>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-baseline justify-between pt-1">
                    <div className="flex items-center gap-3">
                      <span className="font-sans text-xs text-muted">
                        {(idx + 1).toString().padStart(2, "0")}
                      </span>
                      <h4 className="font-serif text-lg sm:text-xl text-ink font-normal group-hover:text-tangerine transition-colors">
                        {film.title}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ---------------- PHOTOGRAPHY ---------------- */}
        <div className="flex flex-col gap-8">
          <div className="flex items-baseline justify-between border-b border-line pb-3">
            <h3 className="font-sans text-xs uppercase tracking-widest text-ink font-medium">
              Photography
            </h3>
            <span className="font-sans text-xs text-muted">
              {photos.length.toString().padStart(2, "0")} Frames
            </span>
          </div>

          {/* Masonry-like grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {photos.map((photo, idx) => (
              <figure
                key={photo.id}
                onClick={() => setActivePhotoIdx(idx)}
                className="group cursor-pointer flex flex-col gap-2.5 border border-line p-3 bg-surface/30 transition-colors hover:border-tangerine"
              >
                <div
                  className={`relative ${photo.aspectClass} w-full overflow-hidden bg-surface`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover grayscale contrast-125 transition-all duration-500 group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 font-sans text-[10px] uppercase tracking-wider text-muted bg-cream/90 border border-line px-1.5 py-0.5">
                    {(idx + 1).toString().padStart(2, "0")}
                  </div>
                </div>

                <figcaption className="flex flex-col gap-1 pt-1 font-sans text-[11px]">
                  <div className="flex items-baseline justify-between text-ink">
                    <span className="font-medium">{photo.title}</span>
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
          className="fixed inset-0 z-50 bg-ink/95 flex flex-col items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setActiveFilm(null)}
        >
          <div
            className="w-full max-w-5xl flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal top bar */}
            <div className="flex items-center justify-between font-sans text-xs text-muted border-b border-line pb-3">
              <span className="uppercase tracking-widest text-cream">
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
            <div className="relative aspect-[16/9] w-full border border-line bg-black">
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

      {/* ---------------- FULLSCREEN PHOTO LIGHTBOX ---------------- */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-ink/95 flex flex-col justify-between p-6 sm:p-10 select-none animate-fadeIn"
          onClick={() => setActivePhotoIdx(null)}
        >
          {/* Lightbox Header with Counter */}
          <div
            className="flex items-center justify-between font-sans text-xs text-muted border-b border-line pb-3 max-w-6xl w-full mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="tracking-widest uppercase text-cream font-medium">
              PHOTO {((activePhotoIdx ?? 0) + 1).toString().padStart(2, "0")} of {photos.length.toString().padStart(2, "0")}
            </span>

            <div className="flex items-center gap-6">
              <span className="hidden sm:inline text-muted/60 text-[11px]">
                Arrow keys to navigate
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
            className="flex items-baseline justify-between font-sans text-xs text-muted border-t border-line pt-3 max-w-6xl w-full mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-cream font-normal">{activePhoto.title}</span>
          </div>
        </div>
      )}
    </>
  );
}
