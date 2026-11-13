export interface Project {
  id: string;
  title: string;
  year: string;
  role: string;
  description: string;
  tags: string[];
  link?: string;
  featured?: boolean;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Experience {
  period: string;
  role: string;
  company: string;
  location?: string;
  summary: string;
  highlights?: string[];
}

export interface SocialLink {
  platform: string;
  label: string;
  href: string;
}

export interface Photo {
  id: string;
  title: string;
  caption?: string;
  year: string;
  src: string;
  aspectRatio?: string;
}

export interface Film {
  id: string;
  title: string;
  year: string;
  role: string;
  duration?: string;
  summary: string;
  link?: string;
}

export interface Fact {
  label: string;
  value: string;
}

export interface AboutLink {
  label: string;
  href: string;
  download?: boolean;
}

export interface AboutChapter {
  chapter: string;
  title: string;
  lines: string[];
  photo: {
    src: string;
    caption: string;
    alt: string;
  };
  facts: Fact[];
  links: AboutLink[];
}

export interface PortfolioContent {
  name: string;
  tagline: string;
  bio: {
    intro: string;
    narrative: string[];
  };
  about: AboutChapter;
  projects: Project[];
  skills: SkillCategory[];
  experience: Experience[];
  socials: SocialLink[];
  photos: Photo[];
  films: Film[];
}

export const content: PortfolioContent = {
  name: "Kartheek",
  tagline: "Software designer & engineer shaping focused digital artifacts and quiet systems.",
  bio: {
    intro: "Working at the intersection of systems architecture, interactive craft, and computational design.",
    narrative: [
      "I believe software should feel tactile, intentional, and stripped of unnecessary noise. Every detail is balanced between technical rigour and editorial clarity.",
      "Rooted in minimalism, high performance, and enduring typography. Exploring interfaces that feel deliberate rather than generative.",
    ],
  },
  about: {
    chapter: "01",
    title: "THE EYE",
    lines: [
      "I started with a camera and an editing timeline.",
      "That taught me how to notice.",
      "Then I learned code, and found out you can build the thing, not just film it.",
    ],
    photo: {
      src: "/images/portrait.jpg",
      caption: "FIG. 01 — ME, MOSTLY",
      alt: "Portrait of Kartheek",
    },
    facts: [
      { label: "Based in", value: "Hyderabad, India" },
      { label: "Studying", value: "Computer Science & Engineering" },
      { label: "Interested in", value: "Quiet Systems, Compilers & Analog Motion" },
    ],
    links: [
      { label: "GitHub", href: "https://github.com/kartheekakula" },
      { label: "LinkedIn", href: "https://linkedin.com" },
      { label: "Instagram", href: "https://instagram.com" },
      { label: "YouTube", href: "https://youtube.com" },
      { label: "Resume", href: "/resume.pdf", download: true },
    ],
  },
  projects: [
    {
      id: "project-01",
      title: "Monolith Registry",
      year: "2026",
      role: "Architecture / Lead",
      description: "A deterministic dependency cache and distributed artifact graph built for predictable builds.",
      tags: ["Systems", "TypeScript", "Distributed Caching"],
      link: "https://github.com",
      featured: true,
    },
    {
      id: "project-02",
      title: "Kōan Editor",
      year: "2025",
      role: "Interface & Core",
      description: "An unadorned typography-first prose workspace with local CRDT synchronization.",
      tags: ["CRDT", "Web Standards", "Typography"],
      link: "https://github.com",
      featured: true,
    },
    {
      id: "project-03",
      title: "Chroma Engine",
      year: "2024",
      role: "Graphics Engineer",
      description: "Low-overhead raster pipeline for high-density document rendering and spatial layout.",
      tags: ["WebGPU", "Performance", "Canvas"],
      link: "https://github.com",
      featured: false,
    },
  ],
  skills: [
    {
      category: "Engineering",
      items: ["TypeScript", "Next.js", "React", "Node.js", "Rust", "Web Standards"],
    },
    {
      category: "Design & Interaction",
      items: ["Design Systems", "Typography", "Information Architecture", "Motion & Kinetics"],
    },
    {
      category: "Foundations",
      items: ["Performance Auditing", "Distributed Systems", "Accessibility", "Developer Tooling"],
    },
  ],
  experience: [
    {
      period: "2024 — Present",
      role: "Staff Engineer / Designer",
      company: "Independent Practice",
      location: "Remote",
      summary: "Directing product architecture, design systems, and bespoke tooling for engineering-focused teams.",
      highlights: [
        "Architected core platforms used by high-throughput workflows.",
        "Refined design systems emphasizing strict accessibility and typographic harmony.",
      ],
    },
    {
      period: "2022 — 2024",
      role: "Senior Software Engineer",
      company: "Studio Vanguard",
      location: "San Francisco / Remote",
      summary: "Spearheaded front-end infrastructure, build performance, and interactive client applications.",
      highlights: [
        "Reduced bundle footprint and layout shifts across client surfaces.",
        "Authored internal guidelines on motion accessibility and kinetic restraint.",
      ],
    },
  ],
  socials: [
    {
      platform: "GitHub",
      label: "github.com/kartheek",
      href: "https://github.com",
    },
    {
      platform: "X / Twitter",
      label: "@kartheek",
      href: "https://x.com",
    },
    {
      platform: "Email",
      label: "hello@kartheek.dev",
      href: "mailto:hello@kartheek.dev",
    },
    {
      platform: "ReadCV",
      label: "read.cv/kartheek",
      href: "https://read.cv",
    },
  ],
  photos: [
    {
      id: "photo-01",
      title: "Tokyo Monorail at Dawn",
      caption: "Linear tracks slicing misty industrial corridors.",
      year: "2025",
      src: "/photos/tokyo-dawn.jpg",
      aspectRatio: "4/5",
    },
    {
      id: "photo-02",
      title: "Brutalist Concrete Horizon",
      caption: "Sharp shadow intersections at Barbican Estate.",
      year: "2024",
      src: "/photos/barbican.jpg",
      aspectRatio: "16/9",
    },
  ],
  films: [
    {
      id: "film-01",
      title: "Quiet Geometry",
      year: "2025",
      role: "Direction / Cinematography",
      duration: "04:12",
      summary: "An observational visual study of architectural massing and late afternoon light.",
      link: "https://vimeo.com",
    },
    {
      id: "film-02",
      title: "Machinery in Silence",
      year: "2024",
      role: "Edit & Sound",
      duration: "06:45",
      summary: "Short documentary piece documenting an artisan bookbinding studio in Kyoto.",
      link: "https://vimeo.com",
    },
  ],
};
