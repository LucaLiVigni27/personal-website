"use client";

import { useEffect, useRef, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { heroOrbitLabels } from "@/lib/hero-orbit-data";

const EMERALD = "#34d399";
const EMERALD_GLOW = "#6ee7b7";

type MousePosition = {
  x: number;
  y: number;
};

type OrbitalSceneProps = {
  simplified?: boolean;
};

function fibonacciSphere(count: number, radius: number) {
  const points: THREE.Vector3[] = [];
  const goldenRatio = (1 + Math.sqrt(5)) / 2;

  for (let i = 0; i < count; i += 1) {
    const theta = (2 * Math.PI * i) / goldenRatio;
    const y = 1 - (2 * i) / (count - 1);
    const radiusAtY = Math.sqrt(1 - y * y);
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;
    points.push(new THREE.Vector3(x, y, z).multiplyScalar(radius));
  }

  return points;
}

const PLANET_DOT_POSITIONS = (() => {
  const points = fibonacciSphere(1600, 1.95);
  const array = new Float32Array(points.length * 3);

  points.forEach((point, index) => {
    array[index * 3] = point.x;
    array[index * 3 + 1] = point.y;
    array[index * 3 + 2] = point.z;
  });

  return array;
})();

function DottedPlanet() {
  const pointsRef = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.045;
    }
  });

  return (
    <group>
      <mesh>
        <sphereGeometry args={[1.82, 32, 32]} />
        <meshBasicMaterial color="#030303" transparent opacity={0.92} />
      </mesh>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[PLANET_DOT_POSITIONS, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#f4f4f5"
          size={0.028}
          transparent
          opacity={0.95}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <mesh>
        <sphereGeometry args={[1.98, 32, 32]} />
        <meshBasicMaterial
          color={EMERALD}
          transparent
          opacity={0.035}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

function OrbitRings() {
  const ringRadii = [2.35, 2.68, 3.02];

  return (
    <group rotation={[0.58, 0.32, 0.1]}>
      {ringRadii.map((radius, index) => (
        <mesh
          key={radius}
          rotation={[Math.PI / 2 + index * 0.14, index * 0.36, index * 0.06]}
        >
          <torusGeometry args={[radius, 0.007, 8, 96]} />
          <meshBasicMaterial
            color={index === 0 ? EMERALD_GLOW : EMERALD}
            transparent
            opacity={0.34 - index * 0.07}
          />
        </mesh>
      ))}
    </group>
  );
}

function OrbitingGlow() {
  const glowRef = useRef<THREE.Group>(null);
  const trailRefs = useRef<Array<THREE.Mesh | null>>([]);
  const elapsed = useRef(0);
  const orbitRadius = 3.02;

  useFrame((_, delta) => {
    elapsed.current += delta;
    const t = elapsed.current * 0.42;

    if (!glowRef.current) {
      return;
    }

    glowRef.current.position.set(
      Math.cos(t) * orbitRadius,
      Math.sin(t * 0.7) * 0.22,
      Math.sin(t) * orbitRadius * 0.86,
    );

    trailRefs.current.forEach((mesh, index) => {
      if (!mesh) {
        return;
      }

      const trailT = t - (index + 1) * 0.075;
      mesh.position.set(
        Math.cos(trailT) * orbitRadius,
        Math.sin(trailT * 0.7) * 0.22,
        Math.sin(trailT) * orbitRadius * 0.86,
      );
    });
  });

  return (
    <group rotation={[0.58, 0.32, 0.1]}>
      {[0, 1].map((index) => (
        <mesh
          key={index}
          ref={(node) => {
            trailRefs.current[index] = node;
          }}
        >
          <sphereGeometry args={[0.034 - index * 0.008, 12, 12]} />
          <meshBasicMaterial
            color={EMERALD_GLOW}
            transparent
            opacity={0.55 - index * 0.15}
          />
        </mesh>
      ))}
      <group ref={glowRef}>
        <mesh>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshStandardMaterial
            color={EMERALD_GLOW}
            emissive={EMERALD}
            emissiveIntensity={1.2}
            transparent
            opacity={0.95}
          />
        </mesh>
        <pointLight color={EMERALD_GLOW} intensity={1.6} distance={2.2} />
      </group>
    </group>
  );
}

function OrbitLabels() {
  const labelRadius = 2.72;

  return (
    <>
      {heroOrbitLabels.map((node) => {
        const x =
          Math.cos(node.theta) * Math.sin(node.phi) * labelRadius;
        const y = Math.cos(node.phi) * labelRadius * 0.76;
        const z =
          Math.sin(node.theta) * Math.sin(node.phi) * labelRadius;

        return (
          <group key={node.label} position={[x, y, z]}>
            <mesh>
              <sphereGeometry args={[0.028, 12, 12]} />
              <meshBasicMaterial color={EMERALD} transparent opacity={0.55} />
            </mesh>
            <Html center distanceFactor={11} transform sprite>
              <a
                href={node.href}
                className="pointer-events-auto whitespace-nowrap rounded-full border border-emerald-500/30 bg-black/55 px-3 py-1.5 text-[11px] font-medium text-white/75 backdrop-blur-md transition hover:border-emerald-500/50 hover:text-emerald-400"
              >
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                {node.label}
              </a>
            </Html>
          </group>
        );
      })}
    </>
  );
}

function SceneContent({
  mouseRef,
  simplified,
}: {
  mouseRef: RefObject<MousePosition>;
  simplified: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const mouse = mouseRef.current ?? { x: 0, y: 0 };

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouse.x * 0.22,
        0.05,
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouse.y * 0.12,
        0.05,
      );
    }

    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      mouse.x * 0.28,
      0.05,
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      mouse.y * 0.16,
      0.05,
    );
    state.camera.lookAt(0.15, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.42} />
      <pointLight position={[3, 2, 4]} intensity={1.15} color="#ffffff" />
      <pointLight position={[-2, -1, 3]} intensity={0.75} color={EMERALD} />
      <group ref={groupRef} position={[0.15, 0, 0]}>
        <DottedPlanet />
        <OrbitRings />
        {!simplified ? (
          <>
            <OrbitingGlow />
            <OrbitLabels />
          </>
        ) : null}
      </group>
    </>
  );
}

function useSceneMouse() {
  const mouseRef = useRef<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      mouseRef.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return mouseRef;
}

export function OrbitalScene({ simplified = false }: OrbitalSceneProps) {
  const mouseRef = useSceneMouse();

  return (
    <Canvas
      camera={{ position: [0, 0, 8.2], fov: 38 }}
      dpr={[1, 1.25]}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      }}
      className="h-full w-full"
    >
      <SceneContent mouseRef={mouseRef} simplified={simplified} />
    </Canvas>
  );
}
