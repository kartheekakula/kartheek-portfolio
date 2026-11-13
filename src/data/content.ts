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
  camera: string;
  location: string;
  year: string;
  src: string;
  aspectClass: string;
}

export interface Film {
  id: string;
  title: string;
  year: string;
  role: string;
  duration: string;
  summary: string;
  youtubeId: string;
  thumbnail: string;
  aspect?: string;
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
  education: Education[];
  experienceClosingNote: string;
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
  experienceClosingNote:
    "I'm early on the coding side. I'd rather say that plainly than oversell it.",
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
      camera: "Sony A7 IV · 35mm f/1.4 GM",
      location: "Tokyo, Japan",
      year: "2025",
      src: "/images/photos/tokyo-dawn.jpg",
      aspectClass: "aspect-[4/5]",
    },
    {
      id: "photo-02",
      title: "Brutalist Concrete Horizon",
      caption: "Sharp shadow intersections at Barbican Estate.",
      camera: "Fujifilm X100V · 23mm f/2",
      location: "London, Barbican",
      year: "2024",
      src: "/images/photos/barbican.jpg",
      aspectClass: "aspect-[16/9]",
    },
    {
      id: "photo-03",
      title: "Amaravati High Tension Grid",
      caption: "Transmission towers disappearing into late twilight mist.",
      camera: "Sony A7 IV · 85mm f/1.8",
      location: "Amaravati, India",
      year: "2025",
      src: "/images/photos/amaravati-grid.jpg",
      aspectClass: "aspect-[3/4]",
    },
    {
      id: "photo-04",
      title: "Kyoto Temple Eaves",
      caption: "Repetitive wooden joins weathered by rain and moss.",
      camera: "Leica Q2 · 28mm f/1.7",
      location: "Kyoto, Higashiyama",
      year: "2024",
      src: "/images/photos/kyoto-eaves.jpg",
      aspectClass: "aspect-[1/1]",
    },
    {
      id: "photo-05",
      title: "Late Night Metro Car",
      caption: "Fluorescent hum reflected across curved steel stanchions.",
      camera: "Ricoh GR IIIx · 40mm f/2.8",
      location: "Hyderabad, India",
      year: "2025",
      src: "/images/photos/metro-car.jpg",
      aspectClass: "aspect-[16/9]",
    },
    {
      id: "photo-06",
      title: "Concrete Light Slice",
      caption: "Early sun cutting sharp angles across geometric facades.",
      camera: "Fujifilm X100V · 23mm f/2",
      location: "Mumbai, India",
      year: "2024",
      src: "/images/photos/concrete-light.jpg",
      aspectClass: "aspect-[4/5]",
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
      youtubeId: "L_LUpnjgPso",
      thumbnail: "/images/films/quiet-geometry.jpg",
      aspect: "2.39:1",
    },
    {
      id: "film-02",
      title: "Machinery in Silence",
      year: "2024",
      role: "Edit & Sound",
      duration: "06:45",
      summary:
        "Short documentary piece documenting an artisan bookbinding studio in Kyoto.",
      youtubeId: "jNQXAC9IVRw",
      thumbnail: "/images/films/machinery-in-silence.jpg",
      aspect: "16:9",
    },
    {
      id: "film-03",
      title: "Night Drift, Amaravati",
      year: "2025",
      role: "Cinematography & Grade",
      duration: "03:20",
      summary:
        "A slow-tempo night drive exploring unpaved capital perimeter highways.",
      youtubeId: "dQw4w9WgXcQ",
      thumbnail: "/images/films/night-drift.jpg",
      aspect: "2.39:1",
    },
    {
      id: "film-04",
      title: "The Shinjuku Crossline",
      year: "2024",
      role: "Direction & Edit",
      duration: "05:10",
      summary:
        "A fast-paced rhythmic assembly of commuter transitions at rush hour.",
      youtubeId: "kJQP7kiw5Fk",
      thumbnail: "/images/films/shinjuku.jpg",
      aspect: "16:9",
    },
  ],
};
