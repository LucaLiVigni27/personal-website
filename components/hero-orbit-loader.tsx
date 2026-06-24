"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ClientErrorBoundary } from "@/components/client-error-boundary";

const OrbitalScene = dynamic(
  () =>
    import("@/components/OrbitalScene").then((module) => module.OrbitalScene),
  {
    ssr: false,
    loading: () => <OrbitPlaceholder />,
  },
);

type OrbitConfig = {
  visible: boolean;
  simplified: boolean;
};

const DEFAULT_ORBIT_CONFIG: OrbitConfig = {
  visible: false,
  simplified: true,
};

function OrbitPlaceholder() {
  return (
    <div
      aria-hidden="true"
      className="flex h-full w-full items-center justify-center"
    >
      <div className="h-44 w-44 animate-pulse rounded-full border border-emerald-500/15 bg-emerald-500/5" />
    </div>
  );
}

function readOrbitConfig(): OrbitConfig {
  const isTabletOrLarger = window.matchMedia("(min-width: 768px)").matches;
  const isDesktopOrLarger = window.matchMedia("(min-width: 1024px)").matches;

  return {
    visible: isTabletOrLarger,
    simplified: !isDesktopOrLarger,
  };
}

export function HeroOrbitLoader() {
  const [isMounted, setIsMounted] = useState(false);
  const [config, setConfig] = useState<OrbitConfig>(DEFAULT_ORBIT_CONFIG);

  useEffect(() => {
    setIsMounted(true);

    const tabletQuery = window.matchMedia("(min-width: 768px)");
    const desktopQuery = window.matchMedia("(min-width: 1024px)");

    const updateConfig = () => {
      setConfig((current) => {
        const next = readOrbitConfig();

        if (
          current.visible === next.visible &&
          current.simplified === next.simplified
        ) {
          return current;
        }

        return next;
      });
    };

    updateConfig();

    tabletQuery.addEventListener("change", updateConfig);
    desktopQuery.addEventListener("change", updateConfig);

    return () => {
      tabletQuery.removeEventListener("change", updateConfig);
      desktopQuery.removeEventListener("change", updateConfig);
    };
  }, []);

  if (!isMounted || !config.visible) {
    return null;
  }

  return (
    <ClientErrorBoundary fallback={<OrbitPlaceholder />}>
      <OrbitalScene simplified={config.simplified} />
    </ClientErrorBoundary>
  );
}
