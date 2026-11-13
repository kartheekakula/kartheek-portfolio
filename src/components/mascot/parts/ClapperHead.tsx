"use client";

interface ClapperHeadProps {
  isClapping: boolean;
  isBlinking: boolean;
  isSleeping: boolean;
}

export function ClapperHead({
  isClapping,
  isBlinking,
  isSleeping,
}: ClapperHeadProps) {
  return (
    <g className="clapper-head">
      {/* Lower clapper board (face / slate) */}
      <rect
        x="26"
        y="28"
        width="48"
        height="26"
        rx="2"
        fill="#161613"
        stroke="#ECE7DC"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Diagonal slate chevron stripes */}
      <path
        d="M36 29 L30 39 M48 29 L40 43 M60 29 L52 43 M72 29 L64 43"
        stroke="#ECE7DC"
        strokeWidth="1.25"
        strokeOpacity="0.4"
        strokeLinecap="round"
      />

      {/* Eyes on the clapper slate */}
      {isSleeping ? (
        // Sleeping closed eyes: (- -)
        <g stroke="#ECE7DC" strokeWidth="1.75" strokeLinecap="round">
          <path d="M41 43 Q44 46 47 43" />
          <path d="M53 43 Q56 46 59 43" />
        </g>
      ) : isBlinking ? (
        // Blinking flat slits
        <g stroke="#ECE7DC" strokeWidth="1.75" strokeLinecap="round">
          <line x1="41" y1="43" x2="47" y2="43" />
          <line x1="53" y1="43" x2="59" y2="43" />
        </g>
      ) : (
        // Awake expressive eyes: (• •)
        <g fill="#ECE7DC">
          <circle cx="44" cy="42" r="2.2" />
          <circle cx="56" cy="42" r="2.2" />
        </g>
      )}

      {/* Top hinged clapper stick */}
      <g
        className="clapper-stick origin-[26px_28px] transition-transform duration-150 ease-out"
        style={{
          transform: isClapping ? "rotate(-22deg)" : "rotate(0deg)",
          transformOrigin: "26px 28px",
        }}
      >
        <rect
          x="26"
          y="18"
          width="48"
          height="10"
          rx="1.5"
          fill="#161613"
          stroke="#ECE7DC"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Striping on clapper stick */}
        <path
          d="M35 19 L40 27 M47 19 L52 27 M59 19 L64 27 M71 19 L73 24"
          stroke="#ECE7DC"
          strokeWidth="1.25"
          strokeOpacity="0.5"
          strokeLinecap="round"
        />
      </g>

      {/* The Single Accent Detail (#E5482D): The Mechanical Clapper Hinge Pivot Pin */}
      <circle
        cx="28"
        cy="28"
        r="2.5"
        fill="#E5482D"
        stroke="#161613"
        strokeWidth="1"
      />
    </g>
  );
}

