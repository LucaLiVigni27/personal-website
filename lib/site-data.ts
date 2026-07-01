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
  schoolEmail: "luca27livigni@ucla.edu",
  hero: {
    greeting: "HI, I'M LUCA",
    headline: "Exploring",
    headlineAccent: "what I love to build.",
    subtextLead: "I'm a UCLA student building maching learning models,",
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
    href: "https://github.com/LucaLiVigni27",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/luca-livigni/",
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
    title: "Programming",
    description:
      "Writing clean code and building projects across software engineering, scripting, and core programming fundamentals.",
  },
  {
    title: "Data Analysis",
    description:
      "Using statistics, visualization, and analysis to find patterns and explain data clearly.",
  },
  {
  title: "Machine Learning & Math",
  description:
    "Applying mathematical thinking, modeling, and machine learning techniques to solve technical problems.",
  },
  {
  title: "Problem Solving",
  description:
    "Breaking down complex ideas with algorithms, data structures, experimentation, and logical reasoning.",
  },
];

export const projects: Project[] = [
  {
    title: "Personal Website",
    description:
      "A personal portfolio showcasing my projects, skills, and interests in machine learning, AI applications, data science, and software engineering.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind"],
    href: "#",
    github: "https://github.com/LucaLiVigni27/personal-website",
  },
];

export const about = {
  heading: "About Me",
  paragraphs: [
    "I’m a UCLA student exploring machine learning, AI applications, data science, and software engineering. I enjoy building projects that connect code, data, and intelligent systems in practical ways.",
    "I’m still early in my journey and focused on learning by building. This site will evolve as I keep improving my skills, shipping projects, and exploring new ideas."
  ],
};

export const contact = {
  heading: "Reach Out",
  description:
    "Collaborations, hiring, or just saying hi — I'd love to hear from you.",
};
