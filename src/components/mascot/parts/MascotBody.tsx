"use client";

interface MascotBodyProps {
  isBreathing: boolean;
  isSitting: boolean;
}

export function MascotBody({ isBreathing, isSitting }: MascotBodyProps) {
  return (
    <g
      className="mascot-body transition-transform duration-700 ease-in-out"
      style={{
        transform: isBreathing ? "scale(1.02, 1.03)" : "scale(1, 1)",
        transformOrigin: "50px 65px",
      }}
    >
      {/* Hand-drawn small torso */}
      <path
        d={
          isSitting
            ? "M40 54 Q36 68 38 72 Q50 75 62 72 Q64 68 60 54 Z"
            : "M40 54 Q37 65 40 73 Q50 76 60 73 Q63 65 60 54 Z"
        }
        fill="#161613"
        stroke="#ECE7DC"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Subtle hand-drawn fold lines */}
      <path
        d="M48 60 L52 60"
        stroke="#ECE7DC"
        strokeWidth="1.2"
        strokeOpacity="0.4"
        strokeLinecap="round"
      />
    </g>
  );
}

