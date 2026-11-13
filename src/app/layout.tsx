import type { Metadata, Viewport } from "next";
import { Playfair_Display, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { FilmGrain } from "@/components/film-grain";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { TopNav } from "@/components/layout/top-nav";
import { BottomHud } from "@/components/layout/bottom-hud";
import { AudioToggle } from "@/components/layout/audio-toggle";
import { ClientWidgets } from "@/components/layout/client-widgets";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#F4ECDD",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://kartheek.dev"),
  title: {
    default: "Kartheek",
    template: "%s | Kartheek",
  },
  description: "Portfolio of Kartheek.",
  authors: [{ name: "Kartheek", url: "mailto:kartheekav29@gmail.com" }],
  creator: "Kartheek",
  openGraph: {
    title: "Kartheek",
    description: "Portfolio of Kartheek.",
    url: "https://kartheek.dev",
    siteName: "Kartheek",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kartheek",
    description: "Portfolio of Kartheek.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${spaceGrotesk.variable}`}
    >
      <body className="bg-cream text-ink font-sans min-h-screen relative antialiased overflow-x-hidden selection:bg-tangerine selection:text-white">
        <ScrollProgress />
        <FilmGrain />
        <TopNav />
        <BottomHud />
        <AudioToggle />
        <ClientWidgets />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
