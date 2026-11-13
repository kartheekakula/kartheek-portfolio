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
  const currentIndex = content.projects.findIndex((p) => p.slug === slug);

  if (currentIndex === -1) {
    notFound();
  }

  const project = content.projects[currentIndex];
  const { caseStudy } = project;
  const nextProject = content.projects[(currentIndex + 1) % content.projects.length];

  return (
    <article className="min-h-screen px-6 pt-28 pb-32 sm:px-12 md:px-20 lg:px-32 max-w-4xl mx-auto flex flex-col gap-14 sm:gap-16 bg-cream text-ink">
      {/* Back Link */}
      <nav aria-label="Breadcrumb">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-muted hover:text-ink transition-colors font-medium"
        >
          <span>←</span>
          <span>Back to Projects</span>
        </Link>
      </nav>

      {/* Header: Title in big Playfair Display & One Sentence Summary */}
      <header className="flex flex-col gap-6">
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-ink tracking-tight leading-[1.05]">
          {project.title}
        </h1>

        <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-muted font-normal leading-relaxed">
          {caseStudy.summary}
        </p>
      </header>

      {/* Single Row with Three Items: Role, Year, Status */}
      <div className="grid grid-cols-3 border-y border-line py-5 divide-x divide-line font-sans">
        <div className="flex flex-col gap-1 pr-4">
          <span className="text-[10px] uppercase tracking-widest text-muted">
            Role
          </span>
          <span className="text-xs sm:text-sm text-ink font-medium">
            {caseStudy.role}
          </span>
        </div>

        <div className="flex flex-col gap-1 px-4 sm:px-6">
          <span className="text-[10px] uppercase tracking-widest text-muted">
            Year
          </span>
          <span className="text-xs sm:text-sm text-ink font-medium">
            {caseStudy.year}
          </span>
        </div>

        <div className="flex flex-col gap-1 pl-4 sm:pl-6">
          <span className="text-[10px] uppercase tracking-widest text-muted">
            Status
          </span>
          <span className="text-xs sm:text-sm text-tangerine font-medium">
            {caseStudy.status}
          </span>
        </div>
      </div>

      {/* One Image or Video (Placeholder Box) */}
      <div className="w-full aspect-[16/9] rounded-[12px] border border-line bg-surface flex items-center justify-center text-muted font-sans text-xs uppercase tracking-wider shadow-sm select-none">
        <span>Media Placeholder</span>
      </div>

      {/* Two Short Paragraphs Maximum: Labelled only with plain words "What" and "How" */}
      <div className="flex flex-col gap-10 font-sans">
        <div className="flex flex-col gap-3">
          <h2 className="font-serif text-2xl sm:text-3xl text-ink font-normal">
            What
          </h2>
          <p className="text-base sm:text-lg text-muted leading-relaxed">
            {caseStudy.what}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="font-serif text-2xl sm:text-3xl text-ink font-normal">
            How
          </h2>
          <p className="text-base sm:text-lg text-muted leading-relaxed">
            {caseStudy.how}
          </p>
        </div>
      </div>

      {/* Next Project Link */}
      <footer className="border-t border-line pt-10 flex items-center justify-between font-sans">
        <Link
          href={`/work/${nextProject.slug}`}
          className="group inline-flex items-center gap-2 text-base text-ink underline underline-offset-8 decoration-line hover:decoration-tangerine transition-colors font-medium"
        >
          <span>Next project: {nextProject.title}</span>
          <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5 text-tangerine">
            →
          </span>
        </Link>
      </footer>
    </article>
  );
}
