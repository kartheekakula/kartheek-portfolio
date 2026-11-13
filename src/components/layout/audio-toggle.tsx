"use client";

import { useRef, useState } from "react";

export function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleSound = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        // Handle browser autoplay restriction or missing media file gracefully
        console.warn("Audio playback issue:", error);
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="fixed bottom-5 right-6 sm:right-12 md:right-20 lg:right-32 z-40">
      <audio
        ref={audioRef}
        src="/audio/ambient.mp3"
        preload="none"
        loop
      />
      <button
        type="button"
        onClick={toggleSound}
        className="font-mono text-[11px] tracking-widest uppercase transition-colors mix-blend-difference focus:outline-none cursor-pointer"
        aria-label={`Toggle sound: currently ${isPlaying ? "on" : "off"}`}
      >
        <span className="text-muted hover:text-text transition-colors">
          SOUND{" "}
          <span className={!isPlaying ? "text-accent font-medium" : "text-muted"}>
            OFF
          </span>{" "}
          /{" "}
          <span className={isPlaying ? "text-accent font-medium" : "text-muted"}>
            ON
          </span>
        </span>
      </button>
    </div>
  );
}

