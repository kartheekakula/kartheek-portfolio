"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useMascot } from "./useMascot";
import { MascotSvg } from "./MascotSvg";

export function Mascot() {
  const {
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
  } = useMascot();

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Mascot flip Easter Egg (triggered by Konami Code in terminal-overlay)
  useEffect(() => {
    const handleMascotFlip = () => {
      if (!containerRef.current) return;
      gsap.to(containerRef.current, {
        rotation: "+=360",
        y: -30,
        duration: 0.7,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.to(containerRef.current, {
            y: 0,
            duration: 0.25,
            ease: "bounce.out",
          });
        },
      });
    };

    window.addEventListener("mascot-flip", handleMascotFlip);
    return () => window.removeEventListener("mascot-flip", handleMascotFlip);
  }, []);

  // Squash & bounce on impact when landing from fall
  useEffect(() => {
    if (state === "fall" && containerRef.current) {
      // Landing bounce is triggered in useMascot onComplete
    }
  }, [state]);

  if (!isMounted) {
    // Render at fixed bottom-right immediately even during hydration
    return (
      <div
        aria-hidden="true"
        className="fixed bottom-6 right-8 z-[60] pointer-events-none select-none opacity-0"
      />
    );
  }

  const isDragging = state === "drag";

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[60] overflow-hidden select-none"
    >
      <div
        ref={containerRef}
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
          transition: isDragging || state === "fall" ? "none" : "transform 0.15s ease-out",
        }}
        className="absolute top-0 left-0 will-change-transform"
      >
        <div
          onPointerDown={handlePointerDown}
          className={`pointer-events-auto cursor-grab active:cursor-grabbing transition-transform duration-150 ${
            isDragging ? "scale-105" : "hover:scale-105"
          }`}
          style={{ touchAction: "none" }}
          role="img"
          aria-label="Interactive camera mascot"
        >
          <MascotSvg
            state={state}
            section={section}
            pupil={pupil}
            isBlinking={isBlinking}
            isFlashing={isFlashing}
            isBreathing={isBreathing}
            speechText={speechText}
            walkPhase={walkPhase}
            walkDirection={walkDirection}
          />
        </div>
      </div>
    </div>
  );
}
