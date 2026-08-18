"use client";

import { OrbitLabelBadge } from "@/components/orbital/label-badge";
import { heroOrbitLabelOverlays } from "@/lib/hero-orbit-data";

export function OrbitLabelsOverlay() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10">
      {heroOrbitLabelOverlays.map((item) => (
        <div
          key={item.label}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ top: item.top, left: item.left }}
        >
          <span className="absolute -left-2 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-emerald-400/70 shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
          <OrbitLabelBadge label={item.label} href={item.href} icon={item.icon} />
        </div>
      ))}
    </div>
  );
}
