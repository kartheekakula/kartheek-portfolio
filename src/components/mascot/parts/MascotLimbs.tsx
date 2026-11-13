"use client";

interface MascotLimbsProps {
  mode:
    | "idle"
    | "running-forward"
    | "running-backward"
    | "dangling"
    | "sitting"
    | "sleeping";
  chapter: "hero" | "work" | "craft" | "experience" | "lens" | "other";
  runCycle: number; // 0 to 1
  isClapping: boolean;
}

export function MascotLimbs({
  mode,
  chapter,
  runCycle,
  isClapping,
}: MascotLimbsProps) {
  // Compute leg rotation based on running phase or dangling
  let leftLegAngle = 0;
  let rightLegAngle = 0;

  if (mode === "running-forward") {
    leftLegAngle = Math.sin(runCycle * Math.PI * 2) * 26;
    rightLegAngle = -Math.sin(runCycle * Math.PI * 2) * 26;
  } else if (mode === "running-backward") {
    leftLegAngle = -Math.sin(runCycle * Math.PI * 2) * 26;
    rightLegAngle = Math.sin(runCycle * Math.PI * 2) * 26;
  } else if (mode === "dangling") {
    leftLegAngle = Math.sin(runCycle * Math.PI) * 12;
    rightLegAngle = -Math.sin(runCycle * Math.PI) * 10;
  }

  const isSitting = mode === "sitting" || mode === "sleeping";

  return (
    <g className="mascot-limbs" stroke="#ECE7DC" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="none">
      {/* ---------------- LEGS ---------------- */}
      {isSitting ? (
        // Folded sitting legs
        <g>
          <path d="M42 73 Q36 76 34 78 Q42 80 44 76" />
          <path d="M58 73 Q64 76 66 78 Q58 80 56 76" />
        </g>
      ) : (
        // Upright / dangling / running legs
        <g>
          {/* Left leg */}
          <g
            style={{
              transform: `rotate(${leftLegAngle}deg)`,
              transformOrigin: "44px 74px",
            }}
          >
            <path d="M44 74 L42 90 L38 92" />
          </g>

          {/* Right leg */}
          <g
            style={{
              transform: `rotate(${rightLegAngle}deg)`,
              transformOrigin: "56px 74px",
            }}
          >
            <path d="M56 74 L58 90 L62 92" />
          </g>
        </g>
      )}

      {/* ---------------- ARMS ---------------- */}
      {isClapping ? (
        // Clapping arms raised towards clapper
        <g>
          <path d="M38 56 Q30 46 36 34" />
          <path d="M62 56 Q70 46 64 34" />
        </g>
      ) : chapter === "hero" ? (
        // Hero: friendly wave with right arm
        <g>
          <path d="M38 58 Q34 66 32 70" />
          <path d="M62 58 Q72 50 74 38 Q77 40 78 44" />
        </g>
      ) : chapter === "work" ? (
        // Work: arms extended forward typing on laptop
        <g>
          <path d="M38 58 Q42 66 48 68" />
          <path d="M62 58 Q58 66 52 68" />
        </g>
      ) : chapter === "lens" ? (
        // Lens: arms holding camera to eye level
        <g>
          <path d="M38 58 Q42 54 46 50" />
          <path d="M62 58 Q58 54 54 50" />
        </g>
      ) : isSitting ? (
        // Sitting quietly: hands on knees
        <g>
          <path d="M38 58 Q36 68 40 72" />
          <path d="M62 58 Q64 68 60 72" />
        </g>
      ) : (
        // Default idle arms with slight natural swing
        <g>
          <path d="M38 58 Q33 66 31 71" />
          <path d="M62 58 Q67 66 69 71" />
        </g>
      )}
    </g>
  );
}

