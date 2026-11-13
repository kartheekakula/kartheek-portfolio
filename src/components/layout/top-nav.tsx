"use client";

const NAV_ITEMS = [
  { label: "Work", href: "#work" },
  { label: "Story", href: "#story" },
  { label: "Lens", href: "#lens" },
  { label: "Contact", href: "#contact" },
];

export function TopNav() {
  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
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
          className="font-mono text-xs uppercase tracking-widest text-text hover:text-accent transition-colors pointer-events-auto"
        >
          KARTHEEK
        </a>

        <nav aria-label="Main Navigation">
          <ul className="flex items-center gap-5 sm:gap-8 font-mono text-xs uppercase tracking-wider text-muted">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  className="hover:text-text transition-colors pointer-events-auto"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

