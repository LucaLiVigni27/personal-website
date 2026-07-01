"use client";

import type { OrbitLabelIcon } from "@/lib/hero-orbit-data";

function Icon({ type }: { type: OrbitLabelIcon }) {
  const className = "h-3 w-3 shrink-0 text-emerald-400/75";

  if (type === "ai") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <path
          d="M12 4a3 3 0 100 6 3 3 0 000-6zm-7 9a2 2 0 100 4 2 2 0 000-4zm14 0a2 2 0 100 4 2 2 0 000-4z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    );
  }

  if (type === "skills") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <rect x="5" y="12" width="3" height="7" rx="0.8" fill="currentColor" />
        <rect x="10.5" y="8" width="3" height="11" rx="0.8" fill="currentColor" />
        <rect x="16" y="5" width="3" height="14" rx="0.8" fill="currentColor" />
      </svg>
    );
  }

  if (type === "projects") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <rect x="4" y="5" width="16" height="12" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M4 9h16M9 9v8" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }

  if (type === "software") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <path
          d="M9 8l-4 4 4 4M15 8l4 4-4 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        d="M4 10l16-6-6 16-2-7-7-2z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function OrbitLabelBadge({
  label,
  href,
  icon,
}: {
  label: string;
  href: string;
  icon: OrbitLabelIcon;
}) {
  return (
    <a
      href={href}
      className="pointer-events-auto flex items-center gap-1.5 whitespace-nowrap rounded-full border border-emerald-500/25 bg-black/40 px-2.5 py-1 text-[11px] leading-none text-white/65 backdrop-blur-[2px] transition hover:border-emerald-400/40 hover:text-emerald-200/85"
    >
      <Icon type={icon} />
      {label}
    </a>
  );
}
