"use client";

import { useState } from "react";

const NAV_ITEMS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Lens", href: "#lens" },
  { label: "Contact", href: "#contact" },
];

export function TopNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 py-5 sm:px-12 md:px-20 lg:px-32 mix-blend-difference pointer-events-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <a
          href="#"
          onClick={(e) => handleScroll(e, "#")}
          className="font-sans text-xs uppercase tracking-widest text-white hover:text-tangerine transition-colors pointer-events-auto font-medium"
          aria-label="Kartheek - Back to Top"
        >
          KARTHEEK
        </a>

        {/* Desktop Nav */}
        <nav aria-label="Main Navigation" className="hidden sm:block">
          <ul className="flex items-center gap-6 md:gap-8 font-sans text-xs uppercase tracking-wider text-white/80">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  className="hover:text-white transition-colors pointer-events-auto py-1 font-medium"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <div className="sm:hidden pointer-events-auto">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="font-sans text-xs uppercase tracking-widest text-white hover:text-tangerine transition-colors py-1 cursor-pointer font-medium"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? "CLOSE" : "MENU"}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="sm:hidden pointer-events-auto mt-4 border border-line bg-cream p-6 animate-fadeIn shadow-2xl"
          style={{ mixBlendMode: "normal" }}
        >
          <ul className="flex flex-col gap-4 font-sans text-xs uppercase tracking-widest text-muted">
            {NAV_ITEMS.map((item) => (
              <li key={item.label} className="border-b border-line/40 pb-2">
                <a
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  className="hover:text-ink transition-colors block font-medium"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
