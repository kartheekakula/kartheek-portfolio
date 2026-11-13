import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { content } from "@/data/content";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return content.projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = content.projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} — Case Study`,
    description: project.description,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = content.projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const { caseStudy } = project;

  return (
    <article className="min-h-screen px-6 pt-28 pb-32 sm:px-12 md:px-20 lg:px-32 max-w-5xl mx-auto flex flex-col gap-20 md:gap-28 bg-cream text-ink">
      {/* Top back navigation */}
      <nav aria-label="Breadcrumb">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-muted hover:text-ink transition-colors font-medium"
        >
          <span>←</span>
          <span>Back to Projects</span>
        </Link>
      </nav>

      {/* Hero Header */}
      <header className="flex flex-col gap-8 border-b border-line pb-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="font-sans text-xs uppercase tracking-widest text-muted">
            {project.numeral} · {project.category}
          </span>
          {project.status && (
            <div className="flex items-center gap-2 font-sans text-xs uppercase tracking-wider">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  project.status === "Live"
                    ? "bg-tangerine"
                    : "bg-muted animate-pulse"
                }`}
              />
              <span className="text-ink">{project.status}</span>
            </div>
          )}
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-ink tracking-tight leading-[1.05]">
          {project.title}
        </h1>

        <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-muted font-normal leading-relaxed max-w-3xl">
          {project.description}
        </p>

        {/* External project links if available */}
        <div className="flex flex-wrap items-center gap-6 font-sans text-xs uppercase tracking-wider pt-2 font-medium">
          {project.liveUrl && project.liveUrl !== "TODO" && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink hover:text-tangerine transition-colors flex items-center gap-1.5"
            >
              <span>View live release</span>
              <span>↗</span>
            </a>
          )}
          {project.githubUrl && project.githubUrl !== "TODO" && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-ink transition-colors flex items-center gap-1.5"
            >
              <span>Source Repository</span>
              <span>↗</span>
            </a>
          )}
        </div>
      </header>

      {/* 4-Item Meta Grid */}
      {caseStudy && (
        <section aria-label="Project Meta Information">
          <div className="grid grid-cols-2 md:grid-cols-4 border-y border-line divide-y md:divide-y-0 md:divide-x divide-line font-sans">
            {caseStudy.role && (
              <div className="py-6 pr-4 flex flex-col gap-1.5">
                <span className="text-[10px] uppercase tracking-widest text-muted">
                  Role
                </span>
                <span className="text-xs sm:text-sm text-ink">
                  {caseStudy.role}
                </span>
              </div>
            )}

            {caseStudy.year && (
              <div className="py-6 md:px-6 flex flex-col gap-1.5">
                <span className="text-[10px] uppercase tracking-widest text-muted">
                  Year
                </span>
                <span className="text-xs sm:text-sm text-ink">
                  {caseStudy.year}
                </span>
              </div>
            )}

            {caseStudy.stack && (
              <div className="py-6 md:px-6 flex flex-col gap-1.5">
                <span className="text-[10px] uppercase tracking-widest text-muted">
                  Stack
                </span>
                <span className="text-xs sm:text-sm text-ink leading-snug">
                  {caseStudy.stack}
                </span>
              </div>
            )}

            {caseStudy.status && (
              <div className="py-6 md:pl-6 flex flex-col gap-1.5">
                <span className="text-[10px] uppercase tracking-widest text-muted">
                  Status
                </span>
                <span className="text-xs sm:text-sm text-tangerine font-medium">
                  {caseStudy.status}
                </span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Main Case Study Sections: Problem, Approach, Result */}
      {caseStudy && (
        <div className="flex flex-col gap-24 md:gap-32 font-sans">
          {/* 1. Problem */}
          {caseStudy.problem && (
            <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start border-t border-line pt-12">
              <div className="md:col-span-4 flex flex-col gap-2">
                <h2 className="font-serif text-2xl sm:text-3xl text-ink font-normal tracking-tight">
                  The Problem
                </h2>
              </div>

              <div className="md:col-span-8 flex flex-col gap-6">
                <p className="text-lg sm:text-xl text-ink font-normal leading-relaxed">
                  {caseStudy.problem.summary}
                </p>

                {caseStudy.problem.details.length > 0 && (
                  <ul className="flex flex-col gap-3 pt-2">
                    {caseStudy.problem.details.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-xs sm:text-sm text-muted flex items-start gap-3 leading-relaxed"
                      >
                        <span className="text-tangerine">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          )}

          {/* 2. Approach */}
          {caseStudy.approach && (
            <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start border-t border-line pt-12">
              <div className="md:col-span-4 flex flex-col gap-2">
                <h2 className="font-serif text-2xl sm:text-3xl text-ink font-normal tracking-tight">
                  The Approach
                </h2>
              </div>

              <div className="md:col-span-8 flex flex-col gap-6">
                <p className="text-lg sm:text-xl text-ink font-normal leading-relaxed">
                  {caseStudy.approach.summary}
                </p>

                {caseStudy.approach.details.length > 0 && (
                  <ul className="flex flex-col gap-3 pt-2">
                    {caseStudy.approach.details.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-xs sm:text-sm text-muted flex items-start gap-3 leading-relaxed"
                      >
                        <span className="text-tangerine">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          )}

          {/* 3. Result */}
          {caseStudy.result && (
            <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start border-t border-line pt-12">
              <div className="md:col-span-4 flex flex-col gap-2">
                <h2 className="font-serif text-2xl sm:text-3xl text-ink font-normal tracking-tight">
                  The Result
                </h2>
              </div>

              <div className="md:col-span-8 flex flex-col gap-6">
                <p className="text-lg sm:text-xl text-ink font-normal leading-relaxed">
                  {caseStudy.result.summary}
                </p>

                {caseStudy.result.details.length > 0 && (
                  <ul className="flex flex-col gap-3 pt-2">
                    {caseStudy.result.details.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-xs sm:text-sm text-muted flex items-start gap-3 leading-relaxed"
                      >
                        <span className="text-tangerine">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          )}
        </div>
      )}

      {/* Footer Navigation */}
      <footer className="border-t border-line pt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6 font-sans">
        <Link
          href="/#work"
          className="text-xs uppercase tracking-widest text-muted hover:text-ink transition-colors flex items-center gap-2 font-medium"
        >
          <span>←</span>
          <span>Back to Projects</span>
        </Link>

        <span className="text-xs uppercase tracking-widest text-muted">
          Kartheek · {project.title}
        </span>
      </footer>
    </article>
  );
}
