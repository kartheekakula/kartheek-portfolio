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
        console.warn("Audio playback issue:", error);
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="fixed bottom-5 right-6 sm:right-12 md:right-20 lg:right-32 z-40">
      {/* Audio element is completely hidden and only controlled by the button */}
      <audio
        ref={audioRef}
        src="/audio/ambient.mp3"
        preload="none"
        loop
        className="hidden"
        aria-hidden="true"
      />
      <button
        type="button"
        onClick={toggleSound}
        className="font-sans text-xs tracking-widest uppercase transition-colors mix-blend-difference focus:outline-none cursor-pointer"
        aria-label={`Toggle sound: currently ${isPlaying ? "on" : "off"}`}
      >
        <span className="text-white/80 hover:text-white transition-colors">
          SOUND{" "}
          <span className={!isPlaying ? "text-tangerine font-medium" : "text-white/60"}>
            OFF
          </span>{" "}
          ·{" "}
          <span className={isPlaying ? "text-tangerine font-medium" : "text-white/60"}>
            ON
          </span>
        </span>
      </button>
    </div>
  );
}
