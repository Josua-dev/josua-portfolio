### Task 2: Typed data files (projects + site config)

**Files:**
- Create: `src/data/site.ts`, `src/data/projects.ts`

**Interfaces:**
- Consumes: nothing (pure data; imports only types)
- Produces:
  - `site.name: string`, `site.tagline: string`, `site.location: string`, `site.avatarUrl: string`, `site.contact: { email: string; github: string; linkedin: string; whatsapp: string }`, `site.manifesto: string`
  - `projects: Project[]` where `Project = { year: string; title: string; blurb: string; stack: string[]; url: string; accent: string; role?: string }`
  - Later tasks import `{ site }` from `@/data/site` and `{ projects }` from `@/data/projects`.

- [ ] **Step 1: Create `src/data/site.ts`**

```ts
export const site = {
  name: "Josua",
  fullName: "Josua Uuyuni",
  tagline: "Android & software developer",
  location: "Windhoek, Namibia",
  manifesto: "Building for the Namibian market.",
  avatarUrl: "https://avatars.githubusercontent.com/u/183984329?v=4",
  contact: {
    email: "joshua7919859@gmail.com",
    github: "https://github.com/Josua-dev",
    linkedin: "#", // TODO: replace with your LinkedIn URL
    whatsapp: "#", // TODO: replace with wa.me/264XXXXXXXXX
  },
};
```

- [ ] **Step 2: Create `src/data/projects.ts`**

```ts
export interface Project {
  year: string;
  title: string;
  blurb: string;
  stack: string[];
  url: string;
  accent: string; // tailwind gradient classes, e.g. "from-violet-500 to-fuchsia-500"
  role?: string;
}

export const projects: Project[] = [
  {
    year: "2026",
    title: "MOJ Case Management System V2",
    blurb:
      "A production-structured case-tracking web app for the Ministry of Justice — a full lifecycle system for legal cases.",
    stack: ["JavaScript", "Web App", "Data Modeling"],
    url: "https://github.com/Josua-dev/MOJ-CASE-TRACKING-SYSTEM-V2",
    accent: "from-violet-500 to-fuchsia-500",
    role: "Developer",
  },
  {
    year: "2026",
    title: "Road Fund Administration",
    blurb:
      "A TypeScript platform for Namibia's Road Fund Administration — managing road-fund data and workflows.",
    stack: ["TypeScript", "Web App", "Dashboard"],
    url: "https://github.com/Josua-dev/roadfundnamibia",
    accent: "from-sky-500 to-indigo-500",
    role: "Developer",
  },
  {
    year: "2026",
    title: "OM'KUMOH Consulting Engineers",
    blurb:
      "Premium Next.js 16 website with cinematic 3D campus scene and GSAP scroll-driven camera for OM'KUMOH.",
    stack: ["Next.js 16", "TypeScript", "GSAP", "3D"],
    url: "https://github.com/Josua-dev/omkumoh-website",
    accent: "from-amber-500 to-orange-600",
    role: "Front-end developer",
  },
  {
    year: "2025",
    title: "Movie Recommendation System",
    blurb:
      "A Python recommendation engine suggesting movies based on user preferences and content analysis.",
    stack: ["Python", "ML", "Recommendation"],
    url: "https://github.com/Josua-dev/MovieRecommendationSystem",
    accent: "from-emerald-500 to-teal-500",
    role: "Developer",
  },
  {
    year: "2025",
    title: "Namibian Express Bank ATM System",
    blurb:
      "A Python implementation of an ATM system — session, PIN, and transaction logic in the Namibian context.",
    stack: ["Python", "CLI", "Banking"],
    url: "https://github.com/Josua-dev/NAMIBIAN-EXPRESS-BANK-ATM-SYSTEM-PYTHON",
    accent: "from-rose-500 to-pink-500",
    role: "Developer",
  },
  {
    year: "2024",
    title: "Phonebook Project",
    blurb:
      "A Java phonebook application managing contacts with add, search, edit and delete flows.",
    stack: ["Java", "OOP", "CLI"],
    url: "https://github.com/Josua-dev/PHONEBOOKPROJECT",
    accent: "from-cyan-500 to-blue-500",
    role: "Developer",
  },
];
```

- [ ] **Step 3: Verify types compile**

Run: `npx tsc --noEmit`
Expected: exit 0, no output (no type errors).

- [ ] **Step 4: Commit**

```bash
git add src/data/
git commit -m "feat: add typed site + project data"
```

---

