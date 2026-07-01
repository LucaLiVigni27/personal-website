"use client";

import { PLANET_ROTATION } from "@/components/orbital/constants";
import {
  DESKTOP_PLANET_POINTS,
  SIMPLIFIED_PLANET_POINTS,
} from "@/components/orbital/utils";

type PlanetProps = {
  simplified?: boolean;
};

export function Planet({ simplified = false }: PlanetProps) {
  const points = simplified ? SIMPLIFIED_PLANET_POINTS : DESKTOP_PLANET_POINTS;

  return (
    <group rotation={PLANET_ROTATION}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[points.positions, 3]}
          />
          <bufferAttribute attach="attributes-color" args={[points.colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          vertexColors
          size={simplified ? 0.026 : 0.022}
          transparent
          opacity={0.95}
          sizeAttenuation
          depthWrite={false}
          toneMapped={false}
        />
      </points>
    </group>
  );
}
