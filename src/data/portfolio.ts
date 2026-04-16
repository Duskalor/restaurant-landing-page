// ============================================================
// PORTFOLIO DATA - Edit THIS FILE ONLY to update your portfolio
// ============================================================

// Icon name type — matches Lucide icon component names used via lucide-astro
export type LucideIconName =
  | "Hammer"
  | "BookOpen"
  | "Rocket"
  | "RefreshCw"
  | "MessageSquare"
  | "ClipboardList"
  | "Lightbulb"
  | "Search"
  | "CloudSun"
  | "Paperclip";

// --- PERSONAL INFO ---
export const personal = {
  name: "Your Name",
  role: "Full Stack Developer",
  tagline: "Your tagline here.",
  description: "Your description here.",
  email: "your@email.com",
  location: "Your City",
  resumeUrl: "#", // Link to your resume/CV PDF
};

// --- SOCIAL LINKS ---
export const socials = {
  github: "https://github.com/yourusername",
  linkedin: "https://www.linkedin.com/in/yourusername/",
  twitter: "", // Add your Twitter/X when you have one
  email: "mailto:your@email.com",
};

// --- HERO STATS ---
export const stats = [
  { value: "N+", label: "Years building projects" },
  { value: "N+", label: "Projects on GitHub" },
  { value: "N+", label: "Technologies used" },
];

// --- ABOUT SECTION ---
export const about = {
  paragraphs: [
    "Write a short paragraph about yourself and your background here.",
    "Describe what you're looking for and what makes you unique as a developer.",
  ],
  highlights: [
    { iconName: "Hammer" as const, title: "Builder Mindset", description: "Describe your project-building approach" },
    { iconName: "BookOpen" as const, title: "Self-Taught", description: "Describe how you learned your skills" },
    { iconName: "Rocket" as const, title: "Full Stack", description: "Frontend, backend, databases, and deployment" },
    { iconName: "RefreshCw" as const, title: "Always Learning", description: "Constantly exploring new tools and best practices" },
  ],
};

// --- SKILLS ---
// Levels: 'Advanced' | 'Intermediate' | 'Beginner'
//   Advanced     = Can build complex features independently
//   Intermediate = Solid fundamentals, can build with guidance
//   Beginner     = Learning, can do basic tasks
export const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React", level: "Intermediate" },
      { name: "TypeScript", level: "Intermediate" },
      { name: "Astro", level: "Intermediate" },
      { name: "Tailwind CSS", level: "Intermediate" },
      { name: "HTML/CSS", level: "Advanced" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: "Intermediate" },
      { name: "Express", level: "Intermediate" },
      { name: "PostgreSQL", level: "Intermediate" },
      { name: "Your DB", level: "Intermediate" },
      { name: "REST APIs", level: "Intermediate" },
    ],
  },
  {
    title: "Tools & Other",
    skills: [
      { name: "Git/GitHub", level: "Intermediate" },
      { name: "Your Cloud", level: "Intermediate" },
      { name: "Your Tool", level: "Beginner" },
      { name: "Your Library", level: "Beginner" },
      { name: "JavaScript", level: "Advanced" },
    ],
  },
];

// --- PROJECTS ---
export const projects = [
  {
    title: "Project One",
    description: "Description of your first project. What does it do and what problem does it solve?",
    technologies: ["TypeScript", "React", "Node.js"],
    iconName: "MessageSquare" as const,
    liveUrl: "",
    githubUrl: "https://github.com/yourusername/project-one",
  },
  {
    title: "Project Two",
    description: "Description of your second project. Highlight the key technical challenge you solved.",
    technologies: ["TypeScript", "React", "Node.js"],
    iconName: "ClipboardList" as const,
    liveUrl: "",
    githubUrl: "https://github.com/yourusername/project-two",
  },
  {
    title: "Project Three",
    description: "Description of your third project. What did you build and what tech did you use?",
    technologies: ["TypeScript", "React", "Supabase"],
    iconName: "Lightbulb" as const,
    liveUrl: "",
    githubUrl: "https://github.com/yourusername/project-three",
  },
  {
    title: "Project Four",
    description: "Description of your fourth project. Focus on what makes it interesting.",
    technologies: ["JavaScript", "Node.js", "REST API"],
    iconName: "Search" as const,
    liveUrl: "",
    githubUrl: "https://github.com/yourusername/project-four",
  },
  {
    title: "Project Five",
    description: "Description of your fifth project. What did you learn while building this?",
    technologies: ["TypeScript", "React", "CSS"],
    iconName: "CloudSun" as const,
    liveUrl: "",
    githubUrl: "https://github.com/yourusername/project-five",
  },
  {
    title: "Project Six",
    description: "Description of your sixth project. What challenge did this solve?",
    technologies: ["TypeScript", "React", "Node.js"],
    iconName: "Paperclip" as const,
    liveUrl: "",
    githubUrl: "https://github.com/yourusername/project-six",
  },
];

// --- SEO / META ---
export const seo = {
  title: "Your Name - Your Role",
  description: "Your portfolio description.",
};

// --- HEADER ---
export const navItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

// --- FOOTER ---
export const footer = {
  tagline: "Your Role | Your Skills",
};
