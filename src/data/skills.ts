/**
 * Skills — grouped by where each tool actually appears in Josua's real work.
 * No proficiency percentages: those would be invented. "Where it shows up"
 * is verifiable from the GitHub repo list.
 */
export interface SkillGroup {
  name: string;
  note?: string;
  items: { label: string; where?: string }[];
}

export const skillGroups: SkillGroup[] = [
  {
    name: "Web",
    items: [
      { label: "JavaScript", where: "MOJ Case Tracking V2" },
      { label: "TypeScript", where: "Road Fund, OM'KUMOH" },
      { label: "Next.js 16", where: "OM'KUMOH site" },
      { label: "GSAP", where: "OM'KUMOH scroll scene" },
      { label: "3D / WebGL", where: "OM'KUMOH campus scene" },
      { label: "Dashboards", where: "Road Fund app" },
    ],
  },
  {
    name: "Backend",
    items: [
      { label: "Python", where: "Recommender, ATM" },
      { label: "Java", where: "Phonebook (OOP)" },
      { label: "CLI tools", where: "ATM, Phonebook" },
      { label: "Data modeling", where: "MOJ case tracking" },
    ],
  },
  {
    name: "Machine learning",
    note: "Early in the subject — learned in public.",
    items: [
      { label: "Recommendation", where: "Movie Recommender" },
      { label: "Python · ML", where: "Movie Recommender" },
    ],
  },
];

export const exploringSkills = [
  "LLMs",
  "RAG",
  "AI agents",
  "AI application integrations",
];