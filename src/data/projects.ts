export interface Project {
  id: string;
  year: string;
  title: string;
  blurb: string;
  stack: string[];
  url: string;
  role?: string;
  featured?: boolean;
  /** Filter category — derived from the real nature of each build, not invented. */
  category: "Web" | "Machine Learning" | "CLI / Tooling";
}

export const projects: Project[] = [
  {
    id: "moj",
    year: "2026",
    title: "MOJ Case Management System V2",
    blurb:
      "A case-tracking web app modeled on a court workflow: a legal case from filing to resolution.",
    stack: ["JavaScript", "Web App", "Data Modeling"],
    url: "https://github.com/Josua-dev/MOJ-CASE-TRACKING-SYSTEM-V2",
    role: "Developer",
    featured: true,
    category: "Web",
  },
  {
    id: "road-fund",
    year: "2026",
    title: "Road Fund Administration",
    blurb:
      "A TypeScript web app modeled on the Road Fund Administration: report, verify and track road-maintenance issues.",
    stack: ["TypeScript", "Web App", "Dashboard"],
    url: "https://github.com/Josua-dev/roadfundnamibia",
    role: "Developer",
    featured: true,
    category: "Web",
  },
  {
    id: "omkumoh",
    year: "2026",
    title: "OM'KUMOH Consulting Engineers",
    blurb:
      "A Next.js 16 website for OM'KUMOH with a 3D campus scene and a GSAP scroll-driven camera.",
    stack: ["Next.js 16", "TypeScript", "GSAP", "3D"],
    url: "https://github.com/Josua-dev/omkumoh-website",
    role: "Front-end developer",
    featured: true,
    category: "Web",
  },
  {
    id: "movie-rec",
    year: "2025",
    title: "Movie Recommendation System",
    blurb:
      "A Python recommendation engine suggesting movies based on user preferences and content analysis.",
    stack: ["Python", "ML", "Recommendation"],
    url: "https://github.com/Josua-dev/MovieRecommendationSystem",
    role: "Developer",
    featured: true,
    category: "Machine Learning",
  },
  {
    id: "atm",
    year: "2025",
    title: "Namibian Express Bank ATM System",
    blurb:
      "A Python implementation of an ATM system: session, PIN, and transaction logic in the Namibian context.",
    stack: ["Python", "CLI", "Banking"],
    url: "https://github.com/Josua-dev/NAMIBIAN-EXPRESS-BANK-ATM-SYSTEM-PYTHON",
    role: "Developer",
    category: "CLI / Tooling",
  },
  {
    id: "phonebook",
    year: "2024",
    title: "Phonebook Project",
    blurb:
      "A Java phonebook application managing contacts with add, search, edit and delete flows.",
    stack: ["Java", "OOP", "CLI"],
    url: "https://github.com/Josua-dev/PHONEBOOKPROJECT",
    role: "Developer",
    category: "CLI / Tooling",
  },
];

export const projectCategories = [
  "All",
  "Web",
  "Machine Learning",
  "CLI / Tooling",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];