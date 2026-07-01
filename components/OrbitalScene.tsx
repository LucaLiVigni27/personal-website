"use client";

import { Canvas } from "@react-three/fiber";
import { CAMERA_DISTANCE, CAMERA_FOV } from "@/components/orbital/constants";
import { SceneContent } from "@/components/orbital/scene-content";

type OrbitalSceneProps = {
  simplified?: boolean;
};

export function OrbitalScene({ simplified = false }: OrbitalSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, CAMERA_DISTANCE], fov: CAMERA_FOV }}
      dpr={simplified ? [1, 1.1] : [1, 1.25]}
      gl={{
        alpha: true,
        antialias: !simplified,
        powerPreference: "high-performance",
      }}
      className="h-full w-full"
    >
      <SceneContent simplified={simplified} />
    </Canvas>
  );
}
