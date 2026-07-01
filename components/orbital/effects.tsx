"use client";

import { Bloom, EffectComposer } from "@react-three/postprocessing";

type SceneEffectsProps = {
  enabled?: boolean;
};

export function SceneEffects({ enabled = true }: SceneEffectsProps) {
  if (!enabled) {
    return null;
  }

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={0.55}
        luminanceThreshold={0.36}
        luminanceSmoothing={0.86}
        mipmapBlur
      />
    </EffectComposer>
  );
}
