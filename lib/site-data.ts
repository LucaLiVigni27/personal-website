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
    headline: "Learning",
    headlineAccent: "by building ideas.",
    subtextLead: "I'm a UCLA student building machine learning models,",
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
    title: "Programming & CS",
    description:
      "Python, C++, JavaScript, SQL, data structures, algorithms, software development, database management, debugging, and software design.",
  },
  {
    title: "Data, Math & Statistics",
    description:
      "Pandas, NumPy, R, probability, statistics, linear algebra, calculus, regression, hypothesis testing, and data visualization.",
  },
  {
  title: "Machine Learning",
  description:
    "scikit-learn, TensorFlow/Keras, PyTorch, neural networks, model evaluation, feature engineering, MLflow, and applied machine learning projects.",
  },
  {
  title: "Software & Tools",
  description:
    "Git, Linux, React, Streamlit, Next.js, PySpark, cloud tools, APIs, RAG, embeddings, and vector databases.",
  },
];

export const projects: Project[] = [
  {
    title: "Los Angeles Airbnb Price Predictor",
    description:
      "End-to-end machine learning project that predicts Airbnb nightly prices using listing details, location, and market factors. Includes a deployed dashboard, model comparison, PySpark analysis, and MLflow experiment tracking.",
    tags: ["Python", "scikit-learn", "Streamlit", "PySpark", "MLflow", "Pandas"],
    href: "https://ml-project-9d4h7f7zpphjzcdp9w6rzs.streamlit.app/",
    github: "https://github.com/LucaLiVigni27/la-airbnb-price-predictor",
  },
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
    "I’m a UCLA student exploring machine learning, AI applications, data science, and software engineering. I’m interested in building practical tools that turn data, models, and ideas into useful software.",
    "I’m currently focused on strengthening my skills through hands-on projects, internships, and real-world applications. This site will evolve as I keep improving my skills, shipping projects, and exploring new ideas."
  ]
};

export const contact = {
  heading: "Reach Out",
  description:
    "Collaborations, hiring, or just saying hi — I'd love to hear from you.",
};
