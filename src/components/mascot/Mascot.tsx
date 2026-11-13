"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useMascotState } from "./useMascotState";
import { ClapperHead } from "./parts/ClapperHead";
import { MascotBody } from "./parts/MascotBody";
import { MascotLimbs } from "./parts/MascotLimbs";
import { MascotAccessories } from "./parts/MascotAccessories";

export function Mascot() {
  const {
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
  } = useMascotState();

  const squashRef = useRef<SVGGElement | null>(null);
  const clickMovedRef = useRef(false);

  // Dragging event listeners on window
  useEffect(() => {
    if (!isDragging) return;

    const handlePointerMove = (e: PointerEvent) => {
      const deltaX = e.clientX - dragStartRef.current.mouseX;
      const deltaY = e.clientY - dragStartRef.current.mouseY;

      if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
        clickMovedRef.current = true;
      }

      const newX = Math.min(
        window.innerWidth - 85,
        Math.max(10, dragStartRef.current.initX + deltaX)
      );
      const newY = Math.min(
        window.innerHeight - 90,
        Math.max(10, dragStartRef.current.initY + deltaY)
      );

      setPos({ x: newX, y: newY });
      posRef.current = { x: newX, y: newY };
    };

    const handlePointerUp = () => {
      setIsDragging(false);

      if (!clickMovedRef.current) {
        // Was a pure click
        triggerClap();
        return;
      }

      // Save X in session storage
      saveX(posRef.current.x);

      // Gravity fall to bottom of viewport
      const targetGroundY = window.innerHeight - 110;
      const fallDistance = Math.max(0, targetGroundY - posRef.current.y);

      if (fallDistance > 10) {
        setIsFalling(true);
        const duration = Math.min(0.5, Math.max(0.2, fallDistance / 900));

        gsap.to(posRef.current, {
          y: targetGroundY,
          duration: duration,
          ease: "power2.in",
          onUpdate: () => {
            setPos({ ...posRef.current });
          },
          onComplete: () => {
            setIsFalling(false);
            setMode("idle");

            // Small tactile squash and bounce
            if (squashRef.current) {
              gsap.fromTo(
                squashRef.current,
                { scaleY: 0.68, scaleX: 1.32 },
                {
                  scaleY: 1,
                  scaleX: 1,
                  duration: 0.45,
                  ease: "elastic.out(1.1, 0.4)",
                }
              );
            }
          },
        });
      } else {
        setMode("idle");
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isDragging, saveX, triggerClap, setMode, setPos, posRef, setIsDragging, setIsFalling]);

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    e.preventDefault();
    markActive();
    clickMovedRef.current = false;

    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      initX: pos.x,
      initY: pos.y,
    };

    setIsDragging(true);
    setMode("dangling");
  };

  // Rotation tilt depending on state
  let rotation = 0;
  if (mode === "running-forward") rotation = 14;
  else if (mode === "running-backward") rotation = -14;
  else if (mode === "dangling") rotation = 4;

  const isSitting = mode === "sitting" || mode === "sleeping";
  const isSleeping = mode === "sleeping";

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none"
    >
      <div
        className="absolute will-change-transform"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
          transition: isDragging || isFalling ? "none" : "transform 0.15s ease-out",
        }}
      >
        <svg
          width="80"
          height="96"
          viewBox="0 0 100 120"
          onPointerDown={handlePointerDown}
          className={`pointer-events-auto transition-transform duration-200 ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{
            transform: `rotate(${rotation}deg)`,
            transformOrigin: "50px 80px",
          }}
        >
          {/* Squash and bounce container */}
          <g
            ref={squashRef}
            style={{ transformOrigin: "50px 96px" }}
          >
            {/* Clapperboard Head with eyes and single accent detail */}
            <ClapperHead
              isClapping={isClapping}
              isBlinking={isBlinking}
              isSleeping={isSleeping}
            />

            {/* Torso */}
            <MascotBody
              isBreathing={isBreathing}
              isSitting={isSitting}
            />

            {/* Arms and Legs */}
            <MascotLimbs
              mode={mode}
              chapter={chapter}
              runCycle={runCycle}
              isClapping={isClapping}
            />

            {/* Laptop, Camera, Sleep Zs, and Speech Dialog */}
            <MascotAccessories
              chapter={chapter}
              isSleeping={isSleeping}
              speechText={speechText}
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

