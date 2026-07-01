"use client";

import { ORBIT_TILT, SCENE_OFFSET } from "@/components/orbital/constants";
import { SceneEffects } from "@/components/orbital/effects";
import { SceneLighting } from "@/components/orbital/lighting";
import { OrbitLabels } from "@/components/orbital/orbit-labels";
import { OrbitLines } from "@/components/orbital/orbit-lines";
import { Planet } from "@/components/orbital/planet";
import { Rocket } from "@/components/orbital/rocket";

type SceneContentProps = {
  simplified?: boolean;
};

export function SceneContent({ simplified = false }: SceneContentProps) {
  return (
    <>
      <SceneLighting />
      <group position={SCENE_OFFSET} rotation={ORBIT_TILT}>
        <Planet simplified={simplified} />
        <OrbitLines simplified={simplified} />
        {!simplified ? (
          <>
            <OrbitLabels />
            <Rocket />
          </>
        ) : null}
      </group>
      <SceneEffects enabled={!simplified} />
    </>
  );
}
