"use client";

import { useEffect, useState } from "react";

export function BottomHud() {
  const [timecode, setTimecode] = useState("00:00:00:00");
  const [istTime, setIstTime] = useState<string>("");

  // Map scroll progress to a ~3 minute (180s) timeline at 24 frames/sec
  useEffect(() => {
    let ticking = false;

    const updateTimecode = () => {
      const scrollY = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;

      const totalSeconds = progress * 180;
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = Math.floor(totalSeconds % 60);
      const frames = Math.floor((totalSeconds % 1) * 24);

      const formatted = `00:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(frames).padStart(2, "0")}`;
      setTimecode(formatted);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateTimecode);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateTimecode();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Live IST Clock
  useEffect(() => {
    const formatIst = () => {
      const now = new Date();
      return now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    };

    setIstTime(formatIst());
    const interval = setInterval(() => {
      setIstTime(formatIst());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <aside
      aria-label="Viewport status HUD"
      className="fixed bottom-5 left-6 sm:left-12 md:px-0 lg:left-32 z-40 pointer-events-none flex items-center gap-3 font-mono text-[11px] tracking-wider uppercase text-text mix-blend-difference select-none"
    >
      {/* Blinking REC dot */}
      <div className="flex items-center gap-1.5">
        <span
          aria-hidden="true"
          className="w-2 h-2 rounded-full bg-accent animate-pulse"
        />
        <span className="text-text font-medium">REC</span>
      </div>

      {/* Timecode (hidden on mobile) */}
      <span aria-hidden="true" className="text-muted/60 hidden sm:inline">
        //
      </span>
      <span className="tabular-nums text-text hidden sm:inline">
        {timecode}
      </span>

      {/* Live IST clock (hidden on mobile) */}
      {istTime && (
        <>
          <span aria-hidden="true" className="text-muted/60 hidden sm:inline">
            //
          </span>
          <span className="tabular-nums text-muted hidden sm:inline">
            {istTime} IST
          </span>
        </>
      )}
    </aside>
  );
}
