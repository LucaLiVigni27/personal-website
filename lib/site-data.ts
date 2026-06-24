export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "email";
};

export type Project = {
  title: string;
  description: string;
  tags: string[];
  href?: string;
  github?: string;
};

export type NavLink = {
  label: string;
  href: string;
  sectionId: string;
};

export const site = {
  name: "Luca LiVigni",
  email: "lucalivigni71@gmail.com",
  hero: {
    greeting: "HI, I'M LUCA",
    headline: "Exploring",
    headlineAccent: "what drives me.",
    subtextLead: "Machine Learning Engineer building intelligent systems,",
    subtextHighlight: "AI applications,",
    subtextTail: "and software that create",
    subtextAccent: "real impact.",
  },
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "#top", sectionId: "top" },
  { label: "Projects", href: "#projects", sectionId: "projects" },
  { label: "Skills", href: "#skills", sectionId: "skills" },
  { label: "About", href: "#about", sectionId: "about" },
  { label: "Contact", href: "#contact", sectionId: "contact" },
];

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: "linkedin",
  },
  {
    label: "Email",
    href: `mailto:${site.email}`,
    icon: "email",
  },
];

export const skills = [
  {
    title: "Machine Learning",
    description:
      "Model development, experimentation, and deploying learning systems that solve real problems.",
  },
  {
    title: "Data Science",
    description:
      "Exploratory analysis, visualization, and turning raw data into actionable insight.",
  },
  {
    title: "AI Applications",
    description:
      "Building practical AI-powered products with modern LLM and automation workflows.",
  },
  {
    title: "Software Engineering",
    description:
      "Crafting reliable, polished web experiences with React, TypeScript, and modern tooling.",
  },
];

export const projects: Project[] = [
  {
    title: "Personal Website",
    description:
      "An interactive portfolio with a CSS orbital hero, scroll-driven motion, and a modular project showcase.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind"],
    href: "#",
    github: "https://github.com/",
  },
];

export const about = {
  heading: "About Me",
  paragraphs: [
    "I'm a developer focused on intelligent systems and modern web experiences. I like building products that feel polished, purposeful, and a little bit futuristic.",
    "I'm still early in my journey and actively shipping projects to grow my skills. This site will evolve as I do — reach out if you'd like to connect or collaborate.",
  ],
};

export const contact = {
  heading: "Reach Out",
  description:
    "Collaborations, hiring, or just saying hi — I'd love to hear from you.",
};
