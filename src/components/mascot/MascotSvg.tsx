"use client";

import React from "react";
import { MascotState, ActiveSection } from "./useMascot";

interface MascotSvgProps {
  state: MascotState;
  section: ActiveSection;
  pupil: { x: number; y: number };
  isBlinking: boolean;
  isFlashing: boolean;
  isBreathing: boolean;
  speechText: string | null;
  walkPhase: number;
  walkDirection: "right" | "left";
}

export function MascotSvg({
  state,
  section,
  pupil,
  isBlinking,
  isFlashing,
  isBreathing,
  speechText,
  walkPhase,
  walkDirection,
}: MascotSvgProps) {
  // Leaning and breathing transforms
  const isWalking = state === "walk";
  const isSitting = state === "sit" || state === "sleep";
  const isSleeping = state === "sleep";
  const isDangling = state === "drag";

  // Body tilt based on walking direction
  let bodyRotation = 0;
  if (isWalking) {
    bodyRotation = walkDirection === "right" ? 10 : -10;
  } else if (isDangling) {
    bodyRotation = 4;
  } else if (state === "shoot") {
    bodyRotation = -4;
  }

  // Leg angles
  let leftLegAngle = 0;
  let rightLegAngle = 0;
  if (isWalking) {
    const swing = Math.sin(walkPhase * Math.PI * 2) * 26;
    leftLegAngle = swing;
    rightLegAngle = -swing;
  } else if (isDangling) {
    leftLegAngle = 12;
    rightLegAngle = -8;
  }

  return (
    <svg
      viewBox="0 0 100 120"
      className="w-[76px] h-[92px] sm:w-[84px] sm:h-[102px] select-none overflow-visible will-change-transform"
      style={{
        transform: `rotate(${bodyRotation}deg)`,
        transformOrigin: "50px 85px",
        transition: isWalking ? "none" : "transform 0.25s ease-out",
      }}
    >
      {/* Whole Figure Group (supports breathing scaleY) */}
      <g
        style={{
          transform: isBreathing ? "scale(1, 1.025)" : "scale(1, 1)",
          transformOrigin: "50px 95px",
          transition: "transform 1.2s ease-in-out",
        }}
      >
        {/* ========================================================= */}
        {/* 1. LEGS & SHOES (Separate group)                           */}
        {/* ========================================================= */}
        <g id="mascot-legs">
          {isSitting ? (
            // Folded sitting legs on the floor
            <g stroke="#15120E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="#15120E">
              {/* Left sitting leg & shoe */}
              <path d="M42 80 Q34 82 32 86 Q40 88 44 84" fill="#15120E" />
              {/* Right sitting leg & shoe */}
              <path d="M58 80 Q66 82 68 86 Q60 88 56 84" fill="#15120E" />
            </g>
          ) : (
            // Standing, walking, or dangling legs
            <g stroke="#15120E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="#15120E">
              {/* Left leg & shoe */}
              <g
                style={{
                  transform: `rotate(${leftLegAngle}deg)`,
                  transformOrigin: "42px 80px",
                }}
              >
                <line x1="42" y1="80" x2="40" y2="98" />
                <ellipse cx="38" cy="99" rx="4.5" ry="3" fill="#15120E" />
              </g>

              {/* Right leg & shoe */}
              <g
                style={{
                  transform: `rotate(${rightLegAngle}deg)`,
                  transformOrigin: "58px 80px",
                }}
              >
                <line x1="58" y1="80" x2="60" y2="98" />
                <ellipse cx="62" cy="99" rx="4.5" ry="3" fill="#15120E" />
              </g>
            </g>
          )}
        </g>

        {/* ========================================================= */}
        {/* 2. TORSO (Separate group)                                 */}
        {/* ========================================================= */}
        <g id="mascot-torso">
          {/* Small cream torso */}
          <path
            d={
              isSitting
                ? "M38 58 Q34 72 38 78 Q50 82 62 78 Q66 72 62 58 Z"
                : "M38 58 Q35 70 39 80 Q50 82 61 80 Q65 70 62 58 Z"
            }
            fill="#F4ECDD"
            stroke="#15120E"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Subtle center seam/button */}
          <line x1="50" y1="64" x2="50" y2="72" stroke="#15120E" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.5" />
        </g>

        {/* ========================================================= */}
        {/* 3. ARMS (Separate group)                                  */}
        {/* ========================================================= */}
        <g id="mascot-arms" stroke="#15120E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
          {state === "shoot" ? (
            // Both hands holding up camera taking a photo
            <>
              <path d="M36 62 Q26 48 34 38" />
              <path d="M64 62 Q74 48 66 38" />
            </>
          ) : section === "hero" || section === "contact" ? (
            // Friendly wave with right arm
            <>
              <path d="M37 62 Q33 70 32 74" />
              <path d="M63 62 Q74 54 75 42 Q78 44 79 48" />
            </>
          ) : section === "skills" ? (
            // Pointing forward right
            <>
              <path d="M37 62 Q33 70 32 74" />
              <path d="M63 62 L78 52" />
            </>
          ) : section === "lens" ? (
            // Hands raised framing a shot
            <>
              <path d="M37 62 Q30 52 38 46" />
              <path d="M63 62 Q70 52 62 46" />
            </>
          ) : isSitting ? (
            // Hands resting on knees
            <>
              <path d="M37 62 Q35 72 40 76" />
              <path d="M63 62 Q65 72 60 76" />
            </>
          ) : (
            // Default resting at sides with slight sway
            <>
              <path d="M37 62 Q34 70 34 74" />
              <path d="M63 62 Q66 70 66 74" />
            </>
          )}
        </g>

        {/* ========================================================= */}
        {/* 4. HEAD: BOXY RETRO CAMERA (Separate group)               */}
        {/* ========================================================= */}
        <g id="mascot-head-group">
          {/* Viewfinder bump on top */}
          <g id="mascot-viewfinder">
            <rect
              x="42"
              y="16"
              width="16"
              height="6"
              rx="1.5"
              fill="#15120E"
              stroke="#F4ECDD"
              strokeWidth="1.5"
            />
            {/* Viewfinder glass hole */}
            <rect x="46" y="18" width="8" height="2" rx="0.5" fill="#F4ECDD" opacity="0.6" />
          </g>

          {/* Camera Head: rounded rectangle in ink with cream outline */}
          <rect
            id="mascot-head"
            x="24"
            y="21"
            width="52"
            height="38"
            rx="6"
            fill="#15120E"
            stroke="#F4ECDD"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Tangerine record light on top-left corner */}
          <g id="mascot-rec-light">
            <circle cx="31" cy="28" r="2.2" fill="#EB5A1F" />
            <circle cx="31" cy="28" r="0.75" fill="#FFFFFF" opacity="0.8" />
          </g>

          {/* ======================================================= */}
          {/* 5. BIG ROUND LENS / SINGLE EYE                          */}
          {/* ======================================================= */}
          <g id="mascot-lens">
            {/* Outer cream ring */}
            <circle cx="50" cy="40" r="14" fill="#F4ECDD" stroke="#15120E" strokeWidth="1.75" />

            {/* Inner dark aperture body */}
            <circle cx="50" cy="40" r="10.5" fill="#2A2620" />

            {/* Eye state: Sleeping, Blinking, or Awake Tracking Pupil */}
            {isSleeping ? (
              // Sleeping closed slit: curved line
              <path
                d="M44 41 Q50 45 56 41"
                fill="none"
                stroke="#F4ECDD"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : isBlinking ? (
              // Blinking lens shutter: flat line
              <line
                x1="43"
                y1="40"
                x2="57"
                y2="40"
                stroke="#F4ECDD"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              // Pupil that tracks cursor
              <g id="mascot-pupil" style={{ transform: `translate3d(${pupil.x}px, ${pupil.y}px, 0)` }}>
                {/* Moving ink pupil */}
                <circle cx="50" cy="40" r="5" fill="#15120E" />
                {/* Tiny cream catchlight specular reflection dot */}
                <circle cx="48.5" cy="38.5" r="1.5" fill="#F4ECDD" />
              </g>
            )}
          </g>
        </g>

        {/* ========================================================= */}
        {/* 6. CHARACTER FLASH OVERLAY (Photo Shoot)                  */}
        {/* ========================================================= */}
        <g id="mascot-flash" pointerEvents="none">
          <rect
            x="20"
            y="14"
            width="60"
            height="88"
            rx="8"
            fill="#FFFFFF"
            opacity={isFlashing ? 0.95 : 0}
            style={{ transition: "opacity 0.08s ease-out" }}
          />
        </g>
      </g>

      {/* =========================================================== */}
      {/* 7. SLEEP Zs (Floating upward)                               */}
      {/* =========================================================== */}
      {isSleeping && (
        <g id="mascot-sleep-z" fill="#15120E" opacity="0.85" className="animate-pulse">
          <text x="68" y="16" fontSize="11" fontFamily="var(--font-space-grotesk), sans-serif" fontWeight="bold">
            z
          </text>
          <text x="76" y="9" fontSize="8" fontFamily="var(--font-space-grotesk), sans-serif">
            z
          </text>
          <text x="82" y="3" fontSize="6" fontFamily="var(--font-space-grotesk), sans-serif" opacity="0.6">
            z
          </text>
        </g>
      )}

      {/* =========================================================== */}
      {/* 8. SPEECH BUBBLE (On Click Photo Shoot, 1.5s)              */}
      {/* =========================================================== */}
      {speechText && (
        <foreignObject
          x="-35"
          y="-26"
          width="170"
          height="38"
          className="overflow-visible pointer-events-none"
        >
          <div className="flex justify-center">
            <div className="relative border border-line bg-cream px-3 py-1 rounded text-[11px] font-sans font-medium uppercase tracking-wider text-ink shadow-[0_8px_20px_rgba(21,18,14,0.12)] whitespace-nowrap animate-fadeIn">
              <span>{speechText}</span>
              {/* Speech bubble tail pointer */}
              <div className="absolute left-1/2 -bottom-1 w-1.5 h-1.5 -translate-x-1/2 rotate-45 border-r border-b border-line bg-cream" />
            </div>
          </div>
        </foreignObject>
      )}
    </svg>
  );
}

