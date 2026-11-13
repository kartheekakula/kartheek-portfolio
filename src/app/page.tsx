import { content } from "@/data/content";

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-16 sm:px-12 md:px-20 lg:px-32 max-w-6xl mx-auto flex flex-col gap-28 md:gap-36">
      {/* Hero / Identity */}
      <header className="flex flex-col gap-8 pt-8 md:pt-16 border-b border-line pb-16 md:pb-24">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4">
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            Folio // 2026
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            Available for Select Engagements
          </span>
        </div>

        <div className="flex flex-col gap-6">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-text leading-[1.02]">
            {content.name}
          </h1>
          <p className="font-story text-2xl sm:text-3xl md:text-4xl text-muted leading-snug max-w-3xl font-normal">
            {content.tagline}
          </p>
        </div>

        {/* Bio Narrative */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6 border-t border-line">
          <div className="md:col-span-4">
            <span className="font-mono text-xs uppercase tracking-wider text-muted">
              Statement
            </span>
          </div>
          <div className="md:col-span-8 flex flex-col gap-4 text-base sm:text-lg text-text/90 leading-relaxed font-light">
            <p className="text-text font-normal">{content.bio.intro}</p>
            {content.bio.narrative.map((paragraph, index) => (
              <p key={index} className="text-muted leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </header>

      {/* Selected Projects */}
      <section className="flex flex-col gap-10">
        <div className="flex items-baseline justify-between border-b border-line pb-4">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
            Selected Works [ {content.projects.length.toString().padStart(2, "0")} ]
          </h2>
          <span className="font-mono text-xs text-muted">2024 — Present</span>
        </div>

        <div className="divide-y divide-line border-y border-line">
          {content.projects.map((project, idx) => (
            <article
              key={project.id}
              className="py-8 md:py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline transition-colors hover:bg-surface/60 px-2"
            >
              <div className="md:col-span-1 font-mono text-xs text-muted">
                {(idx + 1).toString().padStart(2, "0")}
              </div>

              <div className="md:col-span-4 flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl sm:text-3xl font-normal text-text tracking-tight">
                    {project.title}
                  </h3>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-muted hover:text-accent transition-colors"
                      aria-label={`Open ${project.title}`}
                    >
                      ↗
                    </a>
                  )}
                </div>
                <span className="font-mono text-xs text-muted">
                  {project.role}
                </span>
              </div>

              <div className="md:col-span-5 flex flex-col gap-3">
                <p className="text-sm sm:text-base text-muted font-light leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[11px] uppercase tracking-wider text-muted border border-line px-2 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2 md:text-right font-mono text-xs text-muted">
                {project.year}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Experience & History */}
      <section className="flex flex-col gap-10">
        <div className="flex items-baseline justify-between border-b border-line pb-4">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
            Chronology [ Experience ]
          </h2>
          <span className="font-mono text-xs text-muted">Career Trajectory</span>
        </div>

        <div className="divide-y divide-line border-y border-line">
          {content.experience.map((item, idx) => (
            <div
              key={idx}
              className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 px-2"
            >
              <div className="md:col-span-4 flex flex-col gap-1">
                <span className="font-mono text-xs text-muted">
                  {item.period}
                </span>
                <span className="text-lg text-text font-normal">
                  {item.company}
                </span>
                {item.location && (
                  <span className="font-mono text-xs text-muted">
                    {item.location}
                  </span>
                )}
              </div>

              <div className="md:col-span-8 flex flex-col gap-3">
                <span className="text-base font-normal text-text">
                  {item.role}
                </span>
                <p className="text-sm sm:text-base text-muted font-light leading-relaxed">
                  {item.summary}
                </p>
                {item.highlights && item.highlights.length > 0 && (
                  <ul className="flex flex-col gap-1.5 pt-2">
                    {item.highlights.map((highlight, hIdx) => (
                      <li
                        key={hIdx}
                        className="font-mono text-xs text-muted flex items-start gap-2"
                      >
                        <span className="text-accent">—</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Capabilities & Skills */}
      <section className="flex flex-col gap-10">
        <div className="flex items-baseline justify-between border-b border-line pb-4">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
            Disciplines & Tooling
          </h2>
          <span className="font-mono text-xs text-muted">Stack</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.skills.map((group, idx) => (
            <div key={idx} className="border border-line p-6 flex flex-col gap-4">
              <span className="font-mono text-xs uppercase tracking-widest text-muted border-b border-line pb-2">
                // {group.category}
              </span>
              <ul className="flex flex-col gap-2 font-mono text-xs text-text/80">
                {group.items.map((skill, sIdx) => (
                  <li key={sIdx} className="flex items-center gap-2">
                    <span className="text-muted/60 text-[10px]">+</span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Photography & Film Observations */}
      <section className="flex flex-col gap-10">
        <div className="flex items-baseline justify-between border-b border-line pb-4">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
            Visual Studies [ Photography & Film ]
          </h2>
          <span className="font-mono text-xs text-muted">Analog & Motion</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Photos */}
          <div className="flex flex-col gap-6">
            <span className="font-mono text-xs uppercase tracking-wider text-muted border-b border-line pb-2">
              Stills
            </span>
            <div className="flex flex-col gap-6">
              {content.photos.map((photo) => (
                <div
                  key={photo.id}
                  className="border border-line p-5 flex flex-col gap-3 bg-surface/30"
                >
                  <div className="aspect-[4/3] bg-surface border border-line flex items-center justify-center text-muted font-mono text-xs">
                    [ Placeholder: {photo.src} ]
                  </div>
                  <div className="flex items-baseline justify-between pt-1">
                    <span className="text-sm text-text font-normal">
                      {photo.title}
                    </span>
                    <span className="font-mono text-xs text-muted">
                      {photo.year}
                    </span>
                  </div>
                  {photo.caption && (
                    <p className="font-story text-sm text-muted">
                      {photo.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Films */}
          <div className="flex flex-col gap-6">
            <span className="font-mono text-xs uppercase tracking-wider text-muted border-b border-line pb-2">
              Moving Image
            </span>
            <div className="flex flex-col gap-6">
              {content.films.map((film) => (
                <div
                  key={film.id}
                  className="border border-line p-5 flex flex-col gap-3 bg-surface/30"
                >
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-base text-text font-normal">
                      {film.title}
                    </h3>
                    <span className="font-mono text-xs text-muted">
                      {film.year} {film.duration && `// ${film.duration}`}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-muted">
                    {film.role}
                  </span>
                  <p className="text-xs sm:text-sm text-muted font-light leading-relaxed">
                    {film.summary}
                  </p>
                  {film.link && (
                    <a
                      href={film.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-muted hover:text-accent transition-colors pt-2 flex items-center gap-1"
                    >
                      Watch archive <span>↗</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Network / Socials / Colophon */}
      <footer className="border-t border-line pt-12 pb-20 flex flex-col gap-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4 flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              Colophon
            </span>
            <p className="text-xs text-muted leading-relaxed font-light">
              Typeset in Bricolage Grotesque, Instrument Serif, and JetBrains Mono.
              Engineered with Next.js, Lenis, GSAP, and Tailwind CSS.
              No gradients. No glow.
            </p>
          </div>

          <div className="md:col-span-8 flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              Connect
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {content.socials.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-line p-3 flex items-center justify-between font-mono text-xs text-muted hover:text-text hover:border-accent transition-colors"
                >
                  <span>{social.platform}</span>
                  <span className="text-muted/60">{social.label} ↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-line pt-6 text-muted font-mono text-[11px]">
          <span>© 2026 {content.name}. All rights reserved.</span>
          <span>Index 01 // Dark Theme // Strict Contrast</span>
        </div>
      </footer>
    </main>
  );
}
