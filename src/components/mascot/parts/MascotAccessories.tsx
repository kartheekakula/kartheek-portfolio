"use client";

interface MascotAccessoriesProps {
  chapter: "hero" | "work" | "craft" | "experience" | "lens" | "other";
  isSleeping: boolean;
  speechText: string | null;
}

export function MascotAccessories({
  chapter,
  isSleeping,
  speechText,
}: MascotAccessoriesProps) {
  return (
    <>
      {/* Chapter (Work): Tiny Laptop */}
      {chapter === "work" && (
        <g stroke="#15120E" strokeWidth="1.25" fill="#15120E" strokeLinecap="round" strokeLinejoin="round">
          {/* Base keyboard */}
          <path d="M42 70 L58 70 L61 74 L39 74 Z" fill="#15120E" />
          {/* Angled screen */}
          <path d="M43 70 L47 60 L57 60 L57 70" fill="#F4ECDD" />
        </g>
      )}

      {/* Chapter (Lens): Tiny Camera */}
      {chapter === "lens" && (
        <g stroke="#15120E" strokeWidth="1.25" fill="#15120E" strokeLinecap="round" strokeLinejoin="round">
          {/* Camera body */}
          <rect x="44" y="48" width="13" height="9" rx="1" fill="#15120E" />
          {/* Lens circle */}
          <circle cx="50.5" cy="52.5" r="3" fill="#F4ECDD" stroke="#15120E" />
          {/* Tiny accent viewfinder dot */}
          <circle cx="50.5" cy="52.5" r="1.2" fill="#EB5A1F" stroke="none" />
        </g>
      )}

      {/* Sleep Zs: Drifting upward */}
      {isSleeping && (
        <g className="animate-pulse" fill="#15120E" opacity="0.8">
          <text x="68" y="24" fontSize="11" fontFamily="var(--font-space-grotesk), sans-serif" fontWeight="bold">
            z
          </text>
          <text x="76" y="16" fontSize="9" fontFamily="var(--font-space-grotesk), sans-serif">
            z
          </text>
          <text x="82" y="9" fontSize="7" fontFamily="var(--font-space-grotesk), sans-serif" opacity="0.6">
            z
          </text>
        </g>
      )}

      {/* Speech Bubble on Click */}
      {speechText && (
        <foreignObject x="-40" y="-36" width="180" height="42" className="overflow-visible pointer-events-none">
          <div className="flex justify-center">
            <div className="relative border border-line bg-cream px-2.5 py-1 text-[11px] font-sans uppercase tracking-wider text-ink shadow-xl animate-fadeIn whitespace-nowrap">
              <span>{speechText}</span>
              {/* Little speech tail pointer */}
              <div className="absolute left-1/2 -bottom-1 w-1.5 h-1.5 -translate-x-1/2 rotate-45 border-r border-b border-line bg-cream" />
            </div>
          </div>
        </foreignObject>
      )}
    </>
  );
}
