"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";

export type MascotMode =
  | "idle"
  | "running-forward"
  | "running-backward"
  | "dangling"
  | "sitting"
  | "sleeping";

export type ChapterType =
  | "hero"
  | "work"
  | "craft"
  | "experience"
  | "lens"
  | "other";

const SPEECH_LINES = [
  "action!",
  "cut. one more take?",
  "hire him",
  "nice scroll",
];

export function useMascotState() {
  const [mode, setMode] = useState<MascotMode>("idle");
  const [chapter, setChapter] = useState<ChapterType>("hero");
  const [isBlinking, setIsBlinking] = useState(false);
  const [isBreathing, setIsBreathing] = useState(false);
  const [isClapping, setIsClapping] = useState(false);
  const [speechText, setSpeechText] = useState<string | null>(null);
  const [runCycle, setRunCycle] = useState(0);

  // Position state (persisted to sessionStorage)
  const [pos, setPos] = useState({ x: 48, y: 0 }); // y computed on mount
  const posRef = useRef(pos);
  posRef.current = pos;

  const [isDragging, setIsDragging] = useState(false);
  const [isFalling, setIsFalling] = useState(false);
  const dragStartRef = useRef({ mouseX: 0, mouseY: 0, initX: 0, initY: 0 });

  // Timers
  const lastActiveTimeRef = useRef<number>(0);
  const idleSitTimerRef = useRef<NodeJS.Timeout | null>(null);
  const idleSleepTimerRef = useRef<NodeJS.Timeout | null>(null);
  const speechTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Velocity tracking
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const runAnimFrame = useRef<number | null>(null);

  // Persist X in sessionStorage
  const saveX = useCallback((x: number) => {
    try {
      sessionStorage.setItem("mascot_x", Math.round(x).toString());
    } catch {}
  }, []);

  // Activity reset for Sitting (4s) & Sleeping (20s)
  const markActive = useCallback(() => {
    lastActiveTimeRef.current = Date.now();

    if (idleSitTimerRef.current) clearTimeout(idleSitTimerRef.current);
    if (idleSleepTimerRef.current) clearTimeout(idleSleepTimerRef.current);

    setMode((prev) => (prev === "sitting" || prev === "sleeping" ? "idle" : prev));

    idleSitTimerRef.current = setTimeout(() => {
      setMode((current) => (current === "idle" ? "sitting" : current));
    }, 4000);

    idleSleepTimerRef.current = setTimeout(() => {
      setMode((current) => (current === "sitting" ? "sleeping" : current));
    }, 20000);
  }, []);

  // Mounted & Screen dimension setup
  useEffect(() => {
    lastActiveTimeRef.current = Date.now();
    const savedX = sessionStorage.getItem("mascot_x");
    const initX = savedX ? Math.min(window.innerWidth - 90, Math.max(20, parseInt(savedX, 10))) : 48;
    const groundY = window.innerHeight - 110;
    const initialPos = { x: initX, y: groundY };
    setPos(initialPos);
    posRef.current = initialPos;
    markActive();
  }, [markActive]);

  // 1. Idle breathing and blinking loop
  useEffect(() => {
    const breatheInterval = setInterval(() => {
      setIsBreathing((prev) => !prev);
    }, 1200);

    const blinkInterval = setInterval(() => {
      if (Math.random() > 0.3) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 160);
      }
    }, 3200);

    return () => {
      clearInterval(breatheInterval);
      clearInterval(blinkInterval);
    };
  }, []);

  // 2. Scroll velocity & Running reactions
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      if (isDragging || isFalling) return;

      markActive();

      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;
      lastScrollY.current = currentScrollY;

      if (Math.abs(delta) > 5) {
        setMode(delta > 0 ? "running-forward" : "running-backward");

        // Step animation loop
        setRunCycle((prev) => (prev + 0.15) % 1);

        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => {
          setMode("idle");
        }, 150);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      if (runAnimFrame.current) cancelAnimationFrame(runAnimFrame.current);
    };
  }, [isDragging, isFalling, markActive]);

  // 3. Chapter Awareness Detection
  useEffect(() => {
    const checkChapter = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.4;

      const lensEl = document.getElementById("lens");
      const experienceEl = document.getElementById("experience");
      const craftEl = document.getElementById("craft");
      const workEl = document.getElementById("work");

      if (lensEl && scrollPos >= lensEl.offsetTop) {
        setChapter("lens");
      } else if (experienceEl && scrollPos >= experienceEl.offsetTop) {
        setChapter("experience");
      } else if (craftEl && scrollPos >= craftEl.offsetTop) {
        setChapter("craft");
      } else if (workEl && scrollPos >= workEl.offsetTop) {
        setChapter("work");
      } else {
        setChapter("hero");
      }
    };

    window.addEventListener("scroll", checkChapter, { passive: true });
    checkChapter();
    return () => window.removeEventListener("scroll", checkChapter);
  }, []);

  // 4. Click Clapper & Speech dialog reaction
  const triggerClap = useCallback(() => {
    markActive();
    setIsClapping(true);

    // Random speech line
    const randomLine =
      SPEECH_LINES[Math.floor(Math.random() * SPEECH_LINES.length)];
    setSpeechText(randomLine);

    if (speechTimerRef.current) clearTimeout(speechTimerRef.current);
    speechTimerRef.current = setTimeout(() => {
      setSpeechText(null);
    }, 2400);

    setTimeout(() => {
      setIsClapping(false);
    }, 280);
  }, [markActive]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (idleSitTimerRef.current) clearTimeout(idleSitTimerRef.current);
      if (idleSleepTimerRef.current) clearTimeout(idleSleepTimerRef.current);
      if (speechTimerRef.current) clearTimeout(speechTimerRef.current);
    };
  }, []);

  return {
    mode,
    setMode,
    chapter,
    isBlinking,
    isBreathing,
    isClapping,
    speechText,
    runCycle,
    pos,
    setPos,
    posRef,
    isDragging,
    setIsDragging,
    isFalling,
    setIsFalling,
    dragStartRef,
    markActive,
    saveX,
    triggerClap,
  };
}

