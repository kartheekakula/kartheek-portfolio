import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
    <article className="min-h-screen px-6 pt-28 pb-32 sm:px-12 md:px-20 lg:px-32 max-w-5xl mx-auto flex flex-col gap-20 md:gap-28">
      {/* Top back navigation */}
      <nav aria-label="Breadcrumb">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted hover:text-text transition-colors"
        >
          <span>←</span>
          <span>Index // Chapter 02 Works</span>
        </Link>
      </nav>

      {/* Hero Header */}
      <header className="flex flex-col gap-8 border-b border-line pb-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            {project.numeral} // {project.category}
          </span>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                project.status === "Live"
                  ? "bg-accent"
                  : "bg-muted animate-pulse"
              }`}
            />
            <span className="text-text">{project.status}</span>
          </div>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-normal text-text tracking-tight leading-[1.05]">
          {project.title}
        </h1>

        <p className="font-story text-xl sm:text-2xl md:text-3xl text-muted font-normal leading-relaxed max-w-3xl">
          {project.description}
        </p>

        {/* External project links if available */}
        <div className="flex flex-wrap items-center gap-6 font-mono text-xs uppercase tracking-wider pt-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text hover:text-accent transition-colors flex items-center gap-1.5"
            >
              <span>View live release</span>
              <span>↗</span>
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-text transition-colors flex items-center gap-1.5"
            >
              <span>Source Repository</span>
              <span>↗</span>
            </a>
          )}
        </div>
      </header>

      {/* 4-Item Meta Grid */}
      <section aria-label="Project Meta Information">
        <div className="grid grid-cols-2 md:grid-cols-4 border-y border-line divide-y md:divide-y-0 md:divide-x divide-line">
          <div className="py-6 pr-4 flex flex-col gap-1.5">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
              Role
            </span>
            <span className="font-mono text-xs sm:text-sm text-text">
              {caseStudy.role}
            </span>
          </div>

          <div className="py-6 md:px-6 flex flex-col gap-1.5">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
              Year
            </span>
            <span className="font-mono text-xs sm:text-sm text-text">
              {caseStudy.year}
            </span>
          </div>

          <div className="py-6 md:px-6 flex flex-col gap-1.5">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
              Stack
            </span>
            <span className="font-mono text-xs sm:text-sm text-text leading-snug">
              {caseStudy.stack}
            </span>
          </div>

          <div className="py-6 md:pl-6 flex flex-col gap-1.5">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
              Status
            </span>
            <span className="font-mono text-xs sm:text-sm text-accent">
              {caseStudy.status}
            </span>
          </div>
        </div>
      </section>

      {/* Main Case Study Sections: Problem, Approach, Result */}
      <div className="flex flex-col gap-24 md:gap-32">
        {/* 1. Problem */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start border-t border-line pt-12">
          <div className="md:col-span-4 flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              01 // Focus
            </span>
            <h2 className="text-2xl sm:text-3xl text-text font-normal tracking-tight">
              The Problem
            </h2>
          </div>

          <div className="md:col-span-8 flex flex-col gap-6">
            <p className="text-lg sm:text-xl text-text font-light leading-relaxed">
              {caseStudy.problem.summary}
            </p>

            <ul className="flex flex-col gap-3 pt-2">
              {caseStudy.problem.details.map((item, idx) => (
                <li
                  key={idx}
                  className="font-mono text-xs sm:text-sm text-muted flex items-start gap-3 leading-relaxed"
                >
                  <span className="text-accent">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Image / Visual frame placeholder */}
            <div className="mt-4 border border-line bg-surface aspect-[16/9] w-full relative overflow-hidden flex items-center justify-center text-muted font-mono text-xs">
              <span className="uppercase tracking-wider">
                [ FIG. 01 — Architectural & Contextual Telemetry ]
              </span>
            </div>
          </div>
        </section>

        {/* 2. Approach */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start border-t border-line pt-12">
          <div className="md:col-span-4 flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              02 // Execution
            </span>
            <h2 className="text-2xl sm:text-3xl text-text font-normal tracking-tight">
              The Approach
            </h2>
          </div>

          <div className="md:col-span-8 flex flex-col gap-6">
            <p className="text-lg sm:text-xl text-text font-light leading-relaxed">
              {caseStudy.approach.summary}
            </p>

            <ul className="flex flex-col gap-3 pt-2">
              {caseStudy.approach.details.map((item, idx) => (
                <li
                  key={idx}
                  className="font-mono text-xs sm:text-sm text-muted flex items-start gap-3 leading-relaxed"
                >
                  <span className="text-accent">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Code / Visual diagram placeholder */}
            <div className="mt-4 border border-line bg-surface p-6 font-mono text-xs text-muted flex flex-col gap-2">
              <div className="flex items-center justify-between border-b border-line pb-2 text-[10px] uppercase tracking-wider">
                <span>System Pipeline Trace</span>
                <span>Latency &lt; 350ms</span>
              </div>
              <pre className="text-text/80 overflow-x-auto pt-2 font-mono text-xs leading-relaxed">
                {`[Input Capture] -> [Adaptive Threshold Filter] -> [Quantized OCR] -> [Haptic / Audio Dispatch]`}
              </pre>
            </div>
          </div>
        </section>

        {/* 3. Result */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start border-t border-line pt-12">
          <div className="md:col-span-4 flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              03 // Outcome
            </span>
            <h2 className="text-2xl sm:text-3xl text-text font-normal tracking-tight">
              The Result
            </h2>
          </div>

          <div className="md:col-span-8 flex flex-col gap-6">
            <p className="text-lg sm:text-xl text-text font-light leading-relaxed">
              {caseStudy.result.summary}
            </p>

            <ul className="flex flex-col gap-3 pt-2">
              {caseStudy.result.details.map((item, idx) => (
                <li
                  key={idx}
                  className="font-mono text-xs sm:text-sm text-muted flex items-start gap-3 leading-relaxed"
                >
                  <span className="text-accent">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Video embed / visual demonstration frame */}
            <div className="mt-4 border border-line bg-surface aspect-[16/9] w-full relative overflow-hidden flex flex-col items-center justify-center text-muted font-mono text-xs gap-2">
              <span className="uppercase tracking-wider">
                [ Video Demonstration / Verification Study ]
              </span>
              <span className="text-[10px] text-muted/60">
                1080p 24fps // Uncompressed capture
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* Footer Navigation */}
      <footer className="border-t border-line pt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <Link
          href="/#work"
          className="font-mono text-xs uppercase tracking-widest text-muted hover:text-text transition-colors flex items-center gap-2"
        >
          <span>←</span>
          <span>Back to Works</span>
        </Link>

        <span className="font-mono text-xs uppercase tracking-widest text-muted">
          Kartheek // Case Study 0{project.numeral}
        </span>
      </footer>
    </article>
  );
}

