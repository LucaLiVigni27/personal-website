export type OrbitLabelIcon =
  | "ai"
  | "skills"
  | "projects"
  | "software"
  | "contact";

export type OrbitLabel = {
  label: string;
  href: string;
  icon: OrbitLabelIcon;
  angle: number;
  radius: number;
};

export type OrbitLabelOverlay = {
  label: string;
  href: string;
  icon: OrbitLabelIcon;
  top: string;
  left: string;
};

export const heroOrbitLabelOverlays: OrbitLabelOverlay[] = [
  { label: "AI & ML", href: "#skills", icon: "ai", top: "17%", left: "22%" },
  { label: "Skills", href: "#skills", icon: "skills", top: "9%", left: "74%" },
  { label: "Projects", href: "#projects", icon: "projects", top: "43%", left: "8%" },
  { label: "Software", href: "#about", icon: "software", top: "39%", left: "80%" },
  { label: "Contact", href: "#contact", icon: "contact", top: "79%", left: "46%" },
];

export const heroOrbitLabels: OrbitLabel[] = [
  { label: "AI & ML", href: "#skills", icon: "ai", angle: 116, radius: 2.38 },
  { label: "Skills", href: "#skills", icon: "skills", angle: 50, radius: 2.34 },
  { label: "Software", href: "#about", icon: "software", angle: -32, radius: 2.59 },
  { label: "Contact", href: "#contact", icon: "contact", angle: -96, radius: 2.28 },
  { label: "Projects", href: "#projects", icon: "projects", angle: 158, radius: 2.46 },
];
