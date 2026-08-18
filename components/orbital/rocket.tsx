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

const TRAIL_BASE_INTENSITY = [1.05, 0.78, 0.55] as const;
const TRAIL_BASE_OPACITY = [0.48, 0.36, 0.24] as const;

export function Rocket() {
  const shipRef = useRef<THREE.Group>(null);
  const trailRefs = useRef<Array<THREE.Mesh | null>>([]);
  const trailMaterials = useRef<Array<THREE.MeshStandardMaterial | null>>([]);
  const engineGlowRef = useRef<THREE.MeshStandardMaterial>(null);
  const pointLightRef = useRef<THREE.PointLight>(null);
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

  useFrame(({ camera }, delta) => {
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

    shipRef.current.getWorldPosition(tempPosition);
    const distToCamera = camera.position.distanceTo(tempPosition);
    const frontness = THREE.MathUtils.smoothstep(10.2, 7.4, distToCamera);
    const glowScale = THREE.MathUtils.lerp(1, 0.38, frontness);

    if (engineGlowRef.current) {
      engineGlowRef.current.emissiveIntensity = 1.25 * glowScale;
      engineGlowRef.current.opacity = 0.42 + 0.28 * (1 - frontness);
    }

    if (pointLightRef.current) {
      pointLightRef.current.intensity = 0.55 * glowScale;
    }

    trailMaterials.current.forEach((material, index) => {
      if (!material) {
        return;
      }

      material.emissiveIntensity = TRAIL_BASE_INTENSITY[index] * glowScale;
      material.opacity = TRAIL_BASE_OPACITY[index] * (0.55 + 0.45 * (1 - frontness));
    });

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
            ref={(node) => {
              trailMaterials.current[index] = node;
            }}
            color={EMERALD_GLOW}
            emissive={EMERALD}
            emissiveIntensity={TRAIL_BASE_INTENSITY[index]}
            transparent
            opacity={TRAIL_BASE_OPACITY[index]}
            toneMapped={false}
          />
        </mesh>
      ))}

      <group position={[0, 0, 0.09]}>
        <mesh>
          <sphereGeometry args={[0.02, 10, 10]} />
          <meshStandardMaterial
            ref={engineGlowRef}
            color={EMERALD_GLOW}
            emissive={EMERALD}
            emissiveIntensity={1.25}
            transparent
            opacity={0.62}
            toneMapped={false}
          />
        </mesh>
        <pointLight ref={pointLightRef} color={EMERALD_GLOW} intensity={0.55} distance={1.1} />
      </group>
    </group>
  );
}
