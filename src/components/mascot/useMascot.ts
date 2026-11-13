"use client";

/**
 * ============================================================================
 * MASCOT STATE MACHINE (useMascot.ts)
 * ============================================================================
 * States:
 * - 'idle'  : Default standing state. Gentle breathing (scaleY 1 to 1.03),
 *             pupil tracks cursor, periodic blinking (lens flicks shut).
 * - 'walk'  : Active when scrolling. Leans forward and swaps legs.
 *             Speed scales with scroll velocity.
 * - 'sit'   : Settles down after 3 seconds of scroll/pointer inactivity.
 * - 'sleep' : Enters after 15 seconds of inactivity. Lens closes, floating 'z'.
 * - 'drag'  : Active while held by the pointer. Legs dangle and swing.
 * - 'fall'  : Active on release. Drops under gravity to the floor with
 *             a squash-and-stretch bounce on impact.
 * - 'shoot' : Triggered on click. Raises camera, quick flash overlay on character,
 *             and shows a speech bubble for 1.5s with a random quote.
 *
 * Section Awareness (IntersectionObserver):
 * - Hero       : Waves with right arm
 * - Projects   : Looks at project cards & nods
 * - Skills     : Points at active skill
 * - Experience : Reads (pupil moves left-to-right)
 * - Lens       : Raises hands with viewfinder frame
 * - Contact    : Waves goodbye
 * ============================================================================
 */

import { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";

export type MascotState =
  | "idle"
  | "walk"
  | "sit"
  | "sleep"
  | "drag"
  | "fall"
  | "shoot";

export type ActiveSection =
  | "hero"
  | "about"
  | "projects"
  | "skills"
  | "experience"
  | "lens"
  | "contact"
  | "none";

const SPEECH_QUOTES = ["Say cheese", "Got it", "One more", "Nice shot"];

export function useMascot() {
  const [state, setState] = useState<MascotState>("idle");
  const [section, setSection] = useState<ActiveSection>("hero");

  // Coordinates on screen
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  // Pupil offset from center of lens (-5 to +5)
  const [pupil, setPupil] = useState({ x: 0, y: 0 });

  // Animation sub-states
  const [isBlinking, setIsBlinking] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [isBreathing, setIsBreathing] = useState(false);
  const [speechText, setSpeechText] = useState<string | null>(null);
  const [walkPhase, setWalkPhase] = useState(0); // 0 to 1
  const [walkDirection, setWalkDirection] = useState<"right" | "left">("right");

  // Timers and tracking refs
  const dragStartRef = useRef({ mouseX: 0, mouseY: 0, initX: 0, initY: 0 });
  const hasMovedWhileDraggingRef = useRef(false);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const sleepTimerRef = useRef<NodeJS.Timeout | null>(null);
  const blinkTimerRef = useRef<NodeJS.Timeout | null>(null);
  const speechTimerRef = useRef<NodeJS.Timeout | null>(null);
  const readingTweenRef = useRef<gsap.core.Tween | null>(null);

  // Scroll tracking
  const lastScrollYRef = useRef(0);
  const scrollStopTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize position at bottom-right on mount
  useEffect(() => {
    setIsMounted(true);
    const winWidth = typeof window !== "undefined" ? window.innerWidth : 1200;
    const winHeight = typeof window !== "undefined" ? window.innerHeight : 800;

    const savedX = sessionStorage.getItem("mascot_pos_x");
    const defaultX = Math.max(20, winWidth - 110);
    const defaultY = Math.max(20, winHeight - 110);

    const initialX = savedX ? Math.min(winWidth - 100, Math.max(20, parseFloat(savedX))) : defaultX;
    const initialY = defaultY;

    setPos({ x: initialX, y: initialY });
    posRef.current = { x: initialX, y: initialY };
  }, []);

  // Save X to sessionStorage
  const saveX = useCallback((x: number) => {
    try {
      sessionStorage.setItem("mascot_pos_x", x.toString());
    } catch {
      // ignore
    }
  }, []);

  // Reset inactivity timer
  const resetInactivity = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    if (sleepTimerRef.current) clearTimeout(sleepTimerRef.current);

    if (state === "sit" || state === "sleep") {
      setState("idle");
    }

    // 3 seconds to sit
    inactivityTimerRef.current = setTimeout(() => {
      setState((curr) => (curr === "idle" ? "sit" : curr));
    }, 3000);

    // 15 seconds to sleep
    sleepTimerRef.current = setTimeout(() => {
      setState((curr) => (curr === "idle" || curr === "sit" ? "sleep" : curr));
    }, 15000);
  }, [state]);

  // Periodic Blink loop
  useEffect(() => {
    let active = true;

    const scheduleBlink = () => {
      const delay = 2500 + Math.random() * 3000;
      blinkTimerRef.current = setTimeout(() => {
        if (!active) return;
        setIsBlinking(true);
        setTimeout(() => {
          if (active) setIsBlinking(false);
          scheduleBlink();
        }, 180);
      }, delay);
    };

    scheduleBlink();
    return () => {
      active = false;
      if (blinkTimerRef.current) clearTimeout(blinkTimerRef.current);
    };
  }, []);

  // Idle gentle breathing loop
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setIsBreathing((prev) => !prev);
    }, 1400);

    return () => clearInterval(interval);
  }, []);

  // Pupil cursor tracking (when not reading or sleeping)
  useEffect(() => {
    if (state === "sleep" || section === "experience") return;

    const handleMouseMove = (e: MouseEvent) => {
      resetInactivity();

      // Mascot center coordinate
      const mascotCenterX = posRef.current.x + 45;
      const mascotCenterY = posRef.current.y + 35;

      const deltaX = e.clientX - mascotCenterX;
      const deltaY = e.clientY - mascotCenterY;
      const dist = Math.hypot(deltaX, deltaY);

      if (dist === 0) {
        setPupil({ x: 0, y: 0 });
        return;
      }

      // Max pupil offset of 4.5px inside lens
      const maxOffset = 4.5;
      const clampedDist = Math.min(maxOffset, dist / 40);
      setPupil({
        x: (deltaX / dist) * clampedDist,
        y: (deltaY / dist) * clampedDist,
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [state, section, resetInactivity]);

  // Section awareness: pupil reads left-to-right in Experience
  useEffect(() => {
    if (section === "experience" && state !== "sleep") {
      const tween = gsap.to(
        {},
        {
          duration: 1.6,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          onUpdate: function () {
            const progress = this.progress(); // 0 to 1
            setPupil({ x: -4 + progress * 8, y: 0 });
          },
        }
      );
      readingTweenRef.current = tween;
      return () => {
        tween.kill();
      };
    }
  }, [section, state]);

  // Scroll reaction (Walk state + velocity)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      resetInactivity();
      if (state === "drag" || state === "fall" || state === "shoot") return;

      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;

      if (Math.abs(delta) > 2) {
        setState("walk");
        setWalkDirection(delta > 0 ? "right" : "left");
        setWalkPhase((prev) => (prev + Math.abs(delta) * 0.05) % 1);
      }

      if (scrollStopTimerRef.current) clearTimeout(scrollStopTimerRef.current);
      scrollStopTimerRef.current = setTimeout(() => {
        setState((curr) => (curr === "walk" ? "idle" : curr));
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollStopTimerRef.current) clearTimeout(scrollStopTimerRef.current);
    };
  }, [state, resetInactivity]);

  // Section Observer (IntersectionObserver)
  useEffect(() => {
    const sectionIds: ActiveSection[] = [
      "hero",
      "about",
      "projects",
      "skills",
      "experience",
      "lens",
      "contact",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id as ActiveSection;
            if (id) {
              setSection(id);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Action: Click photo shoot with flash & speech bubble
  const shootPhoto = useCallback(() => {
    if (state === "drag" || state === "fall") return;

    setState("shoot");
    setIsFlashing(true);

    // Pick random speech quote
    const quote = SPEECH_QUOTES[Math.floor(Math.random() * SPEECH_QUOTES.length)];
    setSpeechText(quote);

    // Flash shuts off quickly (120ms)
    setTimeout(() => {
      setIsFlashing(false);
    }, 140);

    // Speech bubble stays for 1.5s
    if (speechTimerRef.current) clearTimeout(speechTimerRef.current);
    speechTimerRef.current = setTimeout(() => {
      setSpeechText(null);
      setState("idle");
    }, 1500);
  }, [state]);

  // Pointer drag start
  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    resetInactivity();
    hasMovedWhileDraggingRef.current = false;

    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      initX: posRef.current.x,
      initY: posRef.current.y,
    };

    setState("drag");
  };

  // Window pointer move and up during drag
  useEffect(() => {
    if (state !== "drag") return;

    const handlePointerMove = (e: PointerEvent) => {
      const deltaX = e.clientX - dragStartRef.current.mouseX;
      const deltaY = e.clientY - dragStartRef.current.mouseY;

      if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
        hasMovedWhileDraggingRef.current = true;
      }

      const winW = window.innerWidth;
      const winH = window.innerHeight;

      const newX = Math.min(winW - 85, Math.max(10, dragStartRef.current.initX + deltaX));
      const newY = Math.min(winH - 95, Math.max(10, dragStartRef.current.initY + deltaY));

      setPos({ x: newX, y: newY });
      posRef.current = { x: newX, y: newY };
    };

    const handlePointerUp = () => {
      if (!hasMovedWhileDraggingRef.current) {
        // Was a tap/click -> take photo!
        shootPhoto();
        return;
      }

      // Save dropped X position
      saveX(posRef.current.x);

      // Gravity fall to bottom of screen with squash bounce
      const groundY = window.innerHeight - 110;
      const fallDistance = groundY - posRef.current.y;

      if (fallDistance > 10) {
        setState("fall");
        const duration = Math.min(0.55, Math.max(0.25, fallDistance / 800));

        gsap.to(posRef.current, {
          y: groundY,
          duration: duration,
          ease: "power2.in",
          onUpdate: () => {
            setPos({ ...posRef.current });
          },
          onComplete: () => {
            setState("idle");
            resetInactivity();
          },
        });
      } else {
        setState("idle");
        resetInactivity();
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [state, saveX, shootPhoto, resetInactivity]);

  return {
    state,
    section,
    pos,
    isMounted,
    pupil,
    isBlinking,
    isFlashing,
    isBreathing,
    speechText,
    walkPhase,
    walkDirection,
    handlePointerDown,
    shootPhoto,
  };
}

