export interface ProjectCaseStudy {
  role: string;
  year: string;
  stack: string;
  status: string;
  problem: {
    summary: string;
    details: string[];
    image?: string;
  };
  approach: {
    summary: string;
    details: string[];
    image?: string;
  };
  result: {
    summary: string;
    details: string[];
    videoEmbed?: string;
    image?: string;
  };
}

export interface Project {
  id: string;
  numeral: string;
  slug: string;
  title: string;
  category: string;
  badge?: string;
  status: "Live" | "In progress";
  year: string;
  role: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  previewImage: string;
  caseStudy: ProjectCaseStudy;
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
      id: "edge-ocr",
      numeral: "01",
      slug: "edge-ocr",
      title: "Edge-OCR Bus Route Identifier",
      category: "Embedded · Computer Vision · Accessibility",
      status: "Live",
      year: "2025",
      role: "Hardware & Edge ML Lead",
      description:
        "A low-cost wearable built on a Raspberry Pi Zero 2 W that reads bus route numbers using on-device OCR and announces them through audio and tactile feedback for visually impaired commuters.",
      tags: ["Raspberry Pi", "Python", "OCR", "Edge AI", "Accessibility"],
      liveUrl: "https://github.com/kartheekakula",
      githubUrl: "https://github.com/kartheekakula",
      previewImage: "/images/projects/edge-ocr.jpg",
      caseStudy: {
        role: "Embedded ML & Hardware Engineering",
        year: "2025",
        stack: "Raspberry Pi Zero 2 W / Python / OpenCV / Tesseract / TTS",
        status: "Field Prototype Tested",
        problem: {
          summary:
            "Visually impaired commuters in rapid transit terminals struggle to discern approaching municipal bus routes without sighted assistance.",
          details: [
            "Transit marquee LED signs suffer from rapid flicker, harsh sunlight reflection, and variable approach velocities.",
            "Smartphone apps require users to hold up a phone while navigating with a white cane, introducing physical vulnerability and severe battery drain.",
            "Cloud-dependent vision APIs impose prohibitive latency (>800ms) and collapse in subterranean or congested cellular zones.",
          ],
        },
        approach: {
          summary:
            "Designed a hands-free chest rig that processes optical frames entirely on-chip in real time.",
          details: [
            "Mounted a wide-angle camera module and Raspberry Pi Zero 2 W in a compact 3D-printed enclosure with passive thermal routing.",
            "Constructed a dual-stage vision pipeline: an adaptive Otsu thresholding stage isolates marquee bounding boxes, feeding a quantized Tesseract engine optimized for numeric sequences.",
            "Implemented dual-mode sensory feedback: immediate high-contrast bone-conduction voice synthesis paired with a haptic pulse module confirming recognition in under 350ms.",
          ],
        },
        result: {
          summary:
            "Validated 91.4% field accuracy under diverse illumination with zero cellular connection.",
          details: [
            "Delivers 4.5 hours of continuous operation on a lightweight 2500mAh lithium cell.",
            "Benchmarked over 14 transit stops in Hyderabad, demonstrating a 70% reduction in passenger transit hesitation.",
          ],
        },
      },
    },
    {
      id: "arkee",
      numeral: "02",
      slug: "arkee",
      title: "Arkee",
      category: "Startup · Product · Systems",
      badge: "FOUNDER PROJECT",
      status: "In progress",
      year: "2026",
      role: "Founder & Architect",
      description:
        "My own startup, currently being built and still being validated. A quiet system solving information density and operational friction for technical teams. Currently iterating on the core engine and testing customer viability.",
      tags: [
        "Founder Project",
        "Next.js",
        "TypeScript",
        "Distributed Systems",
        "CRDT",
      ],
      liveUrl: "https://arkee.dev",
      githubUrl: "https://github.com/kartheekakula",
      previewImage: "/images/projects/arkee.jpg",
      caseStudy: {
        role: "Founder / Full Stack Architecture",
        year: "2026",
        stack: "Next.js / TypeScript / CRDT / Tailwind CSS / PostgreSQL",
        status: "Active Alpha & Customer Validation",
        problem: {
          summary:
            "Modern engineering and research workflows are overwhelmed by fragmented, bloated productivity suites.",
          details: [
            "Teams waste hours navigating multi-layered menus, slow web apps, and noisy notification feeds designed for executive reporting rather than builder flow.",
            "Current tools treat documentation, project telemetry, and technical decisions as separate silos, causing continuous mental context switching.",
            "Existing collaborative tools rely on heavy client-side bundles and intrusive UI patterns that slow down high-speed thought.",
          ],
        },
        approach: {
          summary:
            "Architecting an unadorned, keyboard-first operating layer engineered around typography and local-first data synchronization.",
          details: [
            "Building an editorial, distraction-free environment that unifies tasks, architecture decision records, and technical specs in a single unified hierarchy.",
            "Implementing local-first CRDT synchronization to ensure every interaction occurs instantaneously at 0ms perceived latency, with seamless offline sync.",
            "Engaging in continuous validation sprints with technical leads to test whether the stripped-down ergonomics measurably improve team execution velocity.",
          ],
        },
        result: {
          summary:
            "Currently in closed pilot trials with selected early teams.",
          details: [
            "Observing workflow retention and gathering direct feedback on usability, keystroke shortcuts, and synchronicity.",
            "Actively stress-testing multi-user conflict resolution before expanding access.",
          ],
        },
      },
    },
  ],
  skills: [
    {
      category: "Languages",
      items: ["Java", "Python", "JavaScript", "TypeScript", "SQL"],
    },
    {
      category: "Frontend",
      items: ["React", "Next.js", "Tailwind CSS", "GSAP"],
    },
    {
      category: "Backend & Data",
      items: ["Node.js", "REST APIs", "PostgreSQL", "MongoDB"],
    },
    {
      category: "AI & Embedded",
      items: ["OCR", "Computer Vision", "Raspberry Pi", "RAG"],
    },
    {
      category: "Tools",
      items: ["Git", "Vercel", "Figma", "Premiere Pro", "DaVinci Resolve"],
    },
  ],
  experience: [
    {
      period: "2024 — Present",
      role: "Staff Engineer / Designer",
      company: "Independent Practice",
      location: "Remote",
      summary:
        "Directing product architecture, design systems, and bespoke tooling for engineering-focused teams.",
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
      summary:
        "Spearheaded front-end infrastructure, build performance, and interactive client applications.",
      highlights: [
        "Reduced bundle footprint and layout shifts across client surfaces.",
        "Authored internal guidelines on motion accessibility and kinetic restraint.",
      ],
    },
  ],
  socials: [
    {
      platform: "GitHub",
      label: "github.com/kartheekakula",
      href: "https://github.com/kartheekakula",
    },
    {
      platform: "LinkedIn",
      label: "linkedin.com/in/kartheek",
      href: "https://linkedin.com",
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
      summary:
        "An observational visual study of architectural massing and late afternoon light.",
      link: "https://vimeo.com",
    },
    {
      id: "film-02",
      title: "Machinery in Silence",
      year: "2024",
      role: "Edit & Sound",
      duration: "06:45",
      summary:
        "Short documentary piece documenting an artisan bookbinding studio in Kyoto.",
      link: "https://vimeo.com",
    },
  ],
};
