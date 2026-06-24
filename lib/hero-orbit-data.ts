export type OrbitLabelIcon = "ml" | "data" | "ai" | "code";

export type OrbitLabel = {
  label: string;
  href: string;
  theta: number;
  phi: number;
  icon: OrbitLabelIcon;
};

export const heroOrbitLabels: OrbitLabel[] = [
  {
    label: "Machine Learning",
    href: "#skills",
    theta: 0.75,
    phi: 0.92,
    icon: "ml",
  },
  {
    label: "Data Science",
    href: "#skills",
    theta: 1.95,
    phi: 0.62,
    icon: "data",
  },
  {
    label: "AI Applications",
    href: "#skills",
    theta: 3.55,
    phi: 1.05,
    icon: "ai",
  },
  {
    label: "Software Engineering",
    href: "#skills",
    theta: 5.05,
    phi: 0.68,
    icon: "code",
  },
];
