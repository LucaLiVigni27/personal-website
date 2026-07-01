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
  /** Angle around the planet ring, in degrees (0 = right, 90 = top) */
  angle: number;
  /** Ring radius from the planet center */
  radius: number;
};

/** Labels arranged around the planet, matching the reference layout */
export const heroOrbitLabels: OrbitLabel[] = [
  { label: "AI & ML", href: "#skills", icon: "ai", angle: 116, radius: 2.38 },
  { label: "Skills", href: "#skills", icon: "skills", angle: 50, radius: 2.34 },
  { label: "Software", href: "#about", icon: "software", angle: -32, radius: 2.59 },
  { label: "Contact", href: "#contact", icon: "contact", angle: -96, radius: 2.28 },
  { label: "Projects", href: "#projects", icon: "projects", angle: 158, radius: 2.46 },
];
