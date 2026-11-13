import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Instrument_Serif,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { FilmGrain } from "@/components/film-grain";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { TopNav } from "@/components/layout/top-nav";
import { BottomHud } from "@/components/layout/bottom-hud";
import { AudioToggle } from "@/components/layout/audio-toggle";
import { Mascot } from "@/components/mascot/Mascot";
import { TerminalOverlay } from "@/components/easter-eggs/terminal-overlay";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-instrument-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kartheek — Portfolio",
  description: "Software designer & engineer shaping focused digital artifacts and quiet systems.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${bricolage.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-bg text-text font-display min-h-screen relative antialiased">
        <ScrollProgress />
        <FilmGrain />
        <TopNav />
        <BottomHud />
        <AudioToggle />
        <Mascot />
        <TerminalOverlay />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
