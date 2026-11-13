export interface ProjectCaseStudy {
  role?: string;
  year?: string;
  stack?: string;
  status?: string;
  problem?: {
    summary: string;
    details: string[];
    image?: string;
  };
  approach?: {
    summary: string;
    details: string[];
    image?: string;
  };
  result?: {
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
  status?: string;
  year: string;
  role?: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  previewImage: string;
  caseStudy?: ProjectCaseStudy;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Experience {
  role: string;
  org: string;
  place?: string;
  period: string;
  bullets: string[];
}

export interface Education {
  institution: string;
  program: string;
  period: string;
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
  camera?: string;
  location?: string;
  year?: string;
  src: string;
  aspectClass: string;
}

export interface Film {
  id: string;
  title: string;
  year?: string;
  role?: string;
  duration?: string;
  summary?: string;
  youtubeId: string;
  thumbnail: string;
  aspect?: string;
}

export interface PortfolioContent {
  name: string;
  email: string;
  heroStatement: string;
  aboutText: string;
  contactLine: string;
  experienceClosingNote: string;
  projects: Project[];
  skills: SkillCategory[];
  experience: Experience[];
  education: Education[];
  socials: SocialLink[];
  photos: Photo[];
  films: Film[];
}

export const content: PortfolioContent = {
  name: "Kartheek",
  email: "kartheekav29@gmail.com",
  heroStatement: "[HERO STATEMENT]",
  aboutText: "[ABOUT STATEMENT]",
  contactLine: "[CONTACT STATEMENT]",
  experienceClosingNote: "[CLOSING NOTE]",

  projects: [
    {
      id: "edge-ocr",
      numeral: "01",
      slug: "edge-ocr",
      title: "Edge-OCR Bus Route Identifier",
      category: "Embedded · Computer Vision · Accessibility",
      year: "2025",
      description:
        "A low-cost wearable built on a Raspberry Pi Zero 2 W that reads bus route numbers using on-device OCR and announces them through audio and tactile feedback for visually impaired commuters.",
      tags: ["Raspberry Pi", "Python", "OCR", "Edge AI", "Accessibility"],
      previewImage: "/images/projects/edge-ocr.jpg",
      caseStudy: {
        role: "Hardware & Edge ML Lead",
        year: "2025",
        stack: "Raspberry Pi Zero 2 W, Python, OpenCV, Tesseract",
        status: "Prototype Tested",
        problem: {
          summary:
            "Visually impaired commuters in rapid transit terminals struggle to discern approaching municipal bus routes without sighted assistance.",
          details: [
            "Transit marquee LED signs suffer from rapid flicker, harsh sunlight reflection, and variable approach velocities.",
            "Smartphone apps require users to hold up a phone while navigating with a white cane, introducing physical vulnerability.",
            "Cloud-dependent vision APIs impose high latency and fail in subterranean or congested cellular zones.",
          ],
        },
        approach: {
          summary:
            "Designed a hands-free chest rig that processes optical frames entirely on-chip in real time.",
          details: [
            "Mounted a wide-angle camera module and Raspberry Pi Zero 2 W in a compact enclosure.",
            "Constructed a dual-stage vision pipeline with adaptive thresholding feeding quantized OCR.",
            "Implemented immediate voice synthesis paired with a haptic pulse confirming recognition.",
          ],
        },
        result: {
          summary:
            "Validated field accuracy under diverse illumination with zero cellular connection.",
          details: [
            "Delivers continuous operation on a lightweight lithium cell.",
            "Demonstrated noticeable reduction in passenger transit hesitation during field trials.",
          ],
        },
      },
    },
    {
      id: "arkee",
      numeral: "02",
      slug: "arkee",
      title: "Arkee",
      category: "Founder project",
      badge: "Founder project",
      status: "In progress",
      year: "2026",
      description: "[DESCRIPTION]",
      tags: [],
      previewImage: "/images/projects/arkee.jpg",
      caseStudy: {
        role: "Founder",
        year: "2026",
        status: "In progress",
        problem: {
          summary: "[DESCRIPTION]",
          details: [
            "Problem validation in progress.",
            "Iterating on core concept.",
          ],
        },
        approach: {
          summary: "Building and testing the initial implementation.",
          details: [
            "Developing foundational architecture.",
            "Gathering early direct feedback.",
          ],
        },
        result: {
          summary: "Currently in testing.",
          details: [
            "Evaluating whether the solution works as intended.",
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
      role: "Founder",
      org: "Arkee",
      place: "Self-started",
      period: "2026 – Present",
      bullets: [
        "A startup I am building and testing. I do not know yet if it will work, but I built it.",
      ],
    },
    {
      role: "Product Analyst",
      org: "Alfaleus Technology Private Limited",
      place: "Hyderabad",
      period: "June 2026 (1 month)",
      bullets: [
        "Brought in 5-6 clients during a 1-month internship, contributing directly to the product's client pipeline.",
        "Gave design input on a separate unreleased hardware product still in development.",
        "Edited product demo videos to market the company's existing products.",
      ],
    },
    {
      role: "Community Manager",
      org: "Entrepreneurship Club, VIT-AP",
      place: "Amaravati",
      period: "June 2025 – August 2026 (1 yr 3 mo)",
      bullets: [
        "Co-organized Eureka, a college businessathon, as part of the core organizing team.",
        "Built and ran a game night event for the college's Discord community.",
        "Reached the finals of the National Entrepreneurship Challenge (IIT Bombay) through club involvement.",
      ],
    },
    {
      role: "Freelance Video Editor",
      org: "Freelance",
      period: "August 2025 – July 2026 (1 yr)",
      bullets: [
        "Edited a short film sequence that became part of a demo film now used to fundraise for a feature-length production.",
        "Edited YouTube content for a client that reached 5,000 views per video.",
        "Delivered ongoing edited content for 3-4 creators over the year.",
      ],
    },
    {
      role: "Content Creator",
      org: "Self",
      place: "India",
      period: "December 2024 – July 2026 (1 yr 8 mo)",
      bullets: [
        "Produced short-form content reaching 10K-25K views per video by studying what drives engagement.",
        "Made micro-films, self-directed 1-minute shorts, alongside audience-facing content.",
        "Prioritized viewership patterns and storytelling over follower count alone.",
      ],
    },
  ],

  education: [
    {
      institution: "VIT-AP University",
      program: "B.Tech CSE",
      period: "2024–2028",
    },
    {
      institution: "FIITJEE",
      program: "MPC",
      period: "2022–2024",
    },
  ],

  socials: [
    {
      platform: "LinkedIn",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/kartheek-akula-648082322",
    },
    {
      platform: "Email",
      label: "Email",
      href: "mailto:kartheekav29@gmail.com",
    },
    {
      platform: "GitHub",
      label: "GitHub",
      href: "TODO",
    },
    {
      platform: "Instagram",
      label: "Instagram",
      href: "TODO",
    },
    {
      platform: "YouTube",
      label: "YouTube",
      href: "TODO",
    },
  ],

  photos: [
    {
      id: "photo-01",
      title: "Photo 1",
      src: "/images/photos/tokyo-dawn.jpg",
      aspectClass: "aspect-[4/5]",
    },
    {
      id: "photo-02",
      title: "Photo 2",
      src: "/images/photos/barbican.jpg",
      aspectClass: "aspect-[16/9]",
    },
    {
      id: "photo-03",
      title: "Photo 3",
      src: "/images/photos/amaravati-grid.jpg",
      aspectClass: "aspect-[3/4]",
    },
    {
      id: "photo-04",
      title: "Photo 4",
      src: "/images/photos/kyoto-eaves.jpg",
      aspectClass: "aspect-[1/1]",
    },
    {
      id: "photo-05",
      title: "Photo 5",
      src: "/images/photos/metro-car.jpg",
      aspectClass: "aspect-[16/9]",
    },
    {
      id: "photo-06",
      title: "Photo 6",
      src: "/images/photos/concrete-light.jpg",
      aspectClass: "aspect-[4/5]",
    },
  ],

  films: [
    {
      id: "film-01",
      title: "Film 1",
      youtubeId: "L_LUpnjgPso",
      thumbnail: "/images/films/quiet-geometry.jpg",
    },
    {
      id: "film-02",
      title: "Film 2",
      youtubeId: "jNQXAC9IVRw",
      thumbnail: "/images/films/machinery-in-silence.jpg",
    },
    {
      id: "film-03",
      title: "Film 3",
      youtubeId: "dQw4w9WgXcQ",
      thumbnail: "/images/films/night-drift.jpg",
    },
    {
      id: "film-04",
      title: "Film 4",
      youtubeId: "kJQP7kiw5Fk",
      thumbnail: "/images/films/shinjuku.jpg",
    },
  ],
};
