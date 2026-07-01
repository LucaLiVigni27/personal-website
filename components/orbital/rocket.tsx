"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { EMERALD, EMERALD_GLOW } from "@/components/orbital/constants";
import { PRIMARY_ORBIT } from "@/components/orbital/utils";

const tempPosition = new THREE.Vector3();
const tempTangent = new THREE.Vector3();
const tempLookAt = new THREE.Vector3();
const tempTrail = new THREE.Vector3();

export function Rocket() {
  const shipRef = useRef<THREE.Group>(null);
  const trailRefs = useRef<Array<THREE.Mesh | null>>([]);
  const progress = useRef(0.62);

  const shipMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#cbd5e1",
        metalness: 0.88,
        roughness: 0.22,
      }),
    [],
  );

  useFrame((_, delta) => {
    if (!shipRef.current) {
      return;
    }

    progress.current = (progress.current + delta * 0.16) % 1;

    PRIMARY_ORBIT.getPointAt(progress.current, tempPosition);
    PRIMARY_ORBIT.getTangentAt(progress.current, tempTangent);
    tempLookAt.copy(tempPosition).add(tempTangent);

    shipRef.current.position.copy(tempPosition);
    shipRef.current.lookAt(tempLookAt);
    shipRef.current.rotateY(Math.PI / 2);
    shipRef.current.rotateZ(-0.15);

    trailRefs.current.forEach((mesh, index) => {
      if (!mesh) {
        return;
      }

      const trailProgress = (progress.current - (index + 1) * 0.018 + 1) % 1;
      PRIMARY_ORBIT.getPointAt(trailProgress, tempTrail);
      mesh.position.copy(tempTrail);
    });
  });

  return (
    <group ref={shipRef}>
      <mesh material={shipMaterial} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.038, 0.16, 6]} />
      </mesh>
      <mesh material={shipMaterial} position={[0, 0, -0.055]}>
        <boxGeometry args={[0.11, 0.02, 0.055]} />
      </mesh>
      <mesh material={shipMaterial} position={[0.065, 0, -0.015]}>
        <boxGeometry args={[0.055, 0.01, 0.035]} />
      </mesh>
      <mesh material={shipMaterial} position={[-0.065, 0, -0.015]}>
        <boxGeometry args={[0.055, 0.01, 0.035]} />
      </mesh>

      {[0, 1, 2].map((index) => (
        <mesh
          key={index}
          ref={(node) => {
            trailRefs.current[index] = node;
          }}
        >
          <sphereGeometry args={[0.016 - index * 0.004, 8, 8]} />
          <meshStandardMaterial
            color={EMERALD_GLOW}
            emissive={EMERALD}
            emissiveIntensity={1.8 - index * 0.35}
            transparent
            opacity={0.7 - index * 0.15}
            toneMapped={false}
          />
        </mesh>
      ))}

      <group position={[0, 0, 0.09]}>
        <mesh>
          <sphereGeometry args={[0.02, 10, 10]} />
          <meshStandardMaterial
            color={EMERALD_GLOW}
            emissive={EMERALD}
            emissiveIntensity={2.2}
            transparent
            opacity={0.85}
            toneMapped={false}
          />
        </mesh>
        <pointLight color={EMERALD_GLOW} intensity={1.6} distance={1.4} />
      </group>
    </group>
  );
}
