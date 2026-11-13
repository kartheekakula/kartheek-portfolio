"use client";

import dynamic from "next/dynamic";

const Mascot = dynamic(
  () => import("@/components/mascot/Mascot").then((mod) => mod.Mascot),
  { ssr: false }
);

const TerminalOverlay = dynamic(
  () =>
    import("@/components/easter-eggs/terminal-overlay").then(
      (mod) => mod.TerminalOverlay
    ),
  { ssr: false }
);

export function ClientWidgets() {
  return (
    <>
      <Mascot />
      <TerminalOverlay />
    </>
  );
}

