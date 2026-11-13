export interface ProjectCaseStudy {
  role: string;
  year: string;
  status: string;
  summary: string;
  what: string;
  how: string;
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
  description: string;
  tags: string[];
  previewImage: string;
  caseStudy: ProjectCaseStudy;
}

export interface SkillCategory {
  numeral: string;
  category: string;
  description: string;
  items: string[];
}

export interface Experience {
  role: string;
  org: string;
  place?: string;
  period: string;
  tags?: string[];
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
  contactLine: {
    line1: string;
    line2: string;
  };
  experienceClosingNote?: string;
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
  heroStatement:
    "I'm Kartheek Akula, a builder based in India. I come from the intersection of tech and creativity, bringing my creative vision and technical capabilities to the table.",
  aboutText:
    "I'm a CS undergrad with a strong focus on building fast, functional and genuinely useful products. I've interned at Alfaleus, led the entrepreneurship club, and done freelance video editing. I'm a curious mind with a weird fascination for building things better, turning rough sketches into clean working products.",
  contactLine: {
    line1: "Got a role, a product or a rough idea?",
    line2: "Let's build something useful.",
  },

  projects: [
    {
      id: "edge-ocr",
      numeral: "01",
      slug: "edge-ocr",
      title: "Edge-OCR Bus Route Identifier",
      category: "Embedded, Computer Vision, Accessibility",
      year: "2025",
      description:
        "A low-cost wearable that reads bus route numbers and announces them through audio and touch for visually impaired commuters.",
      tags: ["Raspberry Pi", "Python", "OCR", "Edge AI"],
      previewImage: "/images/projects/edge-ocr.jpg",
      caseStudy: {
        role: "Hardware & Edge ML Lead",
        year: "2025",
        status: "Prototype Tested",
        summary:
          "A low-cost wearable that reads bus route numbers and announces them through audio and touch for visually impaired commuters.",
        what: "A wearable device mounted with a camera and Raspberry Pi Zero 2 W that recognizes municipal bus route numbers in real time, communicating approaching transit info without requiring smartphones or network connectivity.",
        how: "An adaptive on-device vision pipeline runs optical character recognition directly on-chip, triggering high-contrast voice feedback paired with haptic vibration pulses confirming route detection.",
      },
    },
    {
      id: "arkee",
      numeral: "02",
      slug: "arkee",
      title: "Arkee",
      category: "Founder Project",
      status: "In progress",
      year: "2026",
      description: "[DESCRIPTION]",
      tags: [],
      previewImage: "/images/projects/arkee.jpg",
      caseStudy: {
        role: "Founder",
        year: "2026",
        status: "In progress",
        summary: "[DESCRIPTION]",
        what: "[DESCRIPTION]",
        how: "Currently developing the core platform architecture and validating the workflow directly with filmmakers.",
      },
    },
  ],

  skills: [
    {
      numeral: "01",
      category: "Languages",
      description: "Core languages I use to write backend logic, web interfaces, and scripts.",
      items: ["Java", "Python", "JavaScript", "TypeScript", "SQL"],
    },
    {
      numeral: "02",
      category: "Frontend",
      description: "Tools I rely on to build responsive, tactile web interfaces and smooth motion.",
      items: ["React", "Next.js", "Tailwind CSS", "GSAP"],
    },
    {
      numeral: "03",
      category: "Backend",
      description: "Servers, APIs, and databases I use to structure and persist application data.",
      items: ["Node.js", "REST APIs", "PostgreSQL", "MongoDB"],
    },
    {
      numeral: "04",
      category: "AI and Embedded",
      description: "Edge hardware and intelligent models for processing real-world inputs.",
      items: ["OCR", "Computer Vision", "Raspberry Pi", "RAG"],
    },
    {
      numeral: "05",
      category: "Tools and Creative",
      description: "Software I use daily for version control, interface design, video editing, and deployment.",
      items: ["Git", "Vercel", "Figma", "Premiere Pro", "DaVinci Resolve"],
    },
  ],

  experience: [
    {
      role: "Founder",
      org: "Arkee",
      period: "2026",
      tags: ["Startup", "Product", "Filmmaking"],
      bullets: [
        "Built a platform where filmmakers share short films, get discovered through a portfolio profile, and collaborate by craft.",
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
      platform: "GitHub",
      label: "GitHub",
      href: "https://github.com/kartheekakula",
    },
    {
      platform: "LinkedIn",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/kartheek-akula-648082322",
    },
    {
      platform: "Instagram",
      label: "Instagram",
      href: "https://www.instagram.com/kartheekakulaa",
    },
    {
      platform: "Email",
      label: "Email",
      href: "mailto:kartheekav29@gmail.com",
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
