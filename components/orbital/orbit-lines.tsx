"use client";

import { Line } from "@react-three/drei";
import { useMemo } from "react";
import { EMERALD_GLOW } from "@/components/orbital/constants";
import { PRIMARY_ORBIT, SECONDARY_ORBITS } from "@/components/orbital/utils";

type OrbitLinesProps = {
  simplified?: boolean;
};

export function OrbitLines({ simplified = false }: OrbitLinesProps) {
  const primaryPoints = useMemo(
    () => PRIMARY_ORBIT.getPoints(simplified ? 96 : 128),
    [simplified],
  );

  const secondaryOrbits = useMemo(
    () => (simplified ? SECONDARY_ORBITS.slice(0, 1) : SECONDARY_ORBITS),
    [simplified],
  );

  return (
    <group>
      <Line
        points={primaryPoints}
        color={EMERALD_GLOW}
        lineWidth={1}
        transparent
        opacity={0.82}
      />

      {secondaryOrbits.map((curve, index) => (
        <Line
          key={index}
          points={curve.getPoints(simplified ? 72 : 96)}
          color={EMERALD_GLOW}
          lineWidth={1}
          transparent
          opacity={0.22 - index * 0.04}
          dashed
          dashSize={0.1}
          gapSize={0.13}
        />
      ))}
    </group>
  );
}
