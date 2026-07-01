"use client";

import { Html } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import { EMERALD_GLOW } from "@/components/orbital/constants";
import { OrbitLabelBadge } from "@/components/orbital/label-badge";
import { getLabelRingPosition, LABEL_DOT_RADIUS } from "@/components/orbital/utils";
import { heroOrbitLabels, type OrbitLabel } from "@/lib/hero-orbit-data";

function OrbitAnchor({ position }: { position: THREE.Vector3 }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.03, 10, 10]} />
      <meshBasicMaterial color={EMERALD_GLOW} toneMapped={false} />
    </mesh>
  );
}

function OrbitLabelItem({ item }: { item: OrbitLabel }) {
  const dotPosition = useMemo(
    () => getLabelRingPosition(item.angle, LABEL_DOT_RADIUS),
    [item.angle],
  );
  const labelPosition = useMemo(
    () => getLabelRingPosition(item.angle, item.radius),
    [item.angle, item.radius],
  );

  return (
    <group>
      <OrbitAnchor position={dotPosition} />
      <Html
        center
        transform={false}
        position={labelPosition}
        zIndexRange={[40, 0]}
        style={{
          pointerEvents: "auto",
          userSelect: "none",
        }}
      >
        <OrbitLabelBadge label={item.label} href={item.href} icon={item.icon} />
      </Html>
    </group>
  );
}

export function OrbitLabels() {
  return (
    <group>
      {heroOrbitLabels.map((item) => (
        <OrbitLabelItem key={item.label} item={item} />
      ))}
    </group>
  );
}
