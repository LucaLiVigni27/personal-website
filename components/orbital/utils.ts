import * as THREE from "three";
import {
  CAMERA_DISTANCE,
  CAMERA_FOV,
  EMERALD,
  EMERALD_GLOW,
  EMERALD_SOFT,
  ORBIT_TILT,
  PLANET_RADIUS,
  PLANET_ROTATION,
  SCENE_OFFSET,
} from "@/components/orbital/constants";

/** Light comes from the left, angled toward the camera (matches reference) */
const VIEW_LIGHT = new THREE.Vector3(-0.62, 0.15, 0.72).normalize();

const SHADOW = new THREE.Color("#020c08");
const DEEP = new THREE.Color("#053d2d");
const MID = new THREE.Color(EMERALD_SOFT);
const BRIGHT = new THREE.Color(EMERALD);
const GLOW = new THREE.Color(EMERALD_GLOW);
const RIM = new THREE.Color("#d9fce9");

function createSeededRandom(seed: number) {
  let state = seed;

  return () => {
    state = (state * 16807) % 2147483647;
    return (state - 1) / 2147483646;
  };
}

function buildViewNormalMatrix() {
  const camera = new THREE.PerspectiveCamera(CAMERA_FOV, 1, 0.1, 100);
  camera.position.set(0, 0, CAMERA_DISTANCE);
  camera.lookAt(0, 0, 0);
  camera.updateMatrixWorld();

  const worldMatrix = new THREE.Matrix4()
    .makeTranslation(...SCENE_OFFSET)
    .multiply(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(...ORBIT_TILT)))
    .multiply(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(...PLANET_ROTATION)));

  const modelViewMatrix = new THREE.Matrix4().multiplyMatrices(
    camera.matrixWorldInverse,
    worldMatrix,
  );

  return new THREE.Matrix3().getNormalMatrix(modelViewMatrix);
}

function smooth(edge0: number, edge1: number, x: number) {
  return THREE.MathUtils.smoothstep(x, edge0, edge1);
}

function colorForNormal(ndotl: number, target: THREE.Color) {
  target.copy(SHADOW);
  target.lerp(DEEP, smooth(-0.2, 0.06, ndotl));
  target.lerp(MID, smooth(-0.02, 0.32, ndotl));
  target.lerp(BRIGHT, smooth(0.2, 0.54, ndotl));
  target.lerp(GLOW, smooth(0.4, 0.78, ndotl));

  // brighter, glowing highlight on the strongly lit left limb
  target.lerp(RIM, smooth(0.58, 0.92, ndotl) * 0.72);
  return target;
}

export type PlanetResolution = {
  latBands: number;
  lonSteps: number;
};

export function createPlanetPointCloud(
  resolution: PlanetResolution,
  radius = PLANET_RADIUS,
) {
  const { latBands, lonSteps } = resolution;
  const random = createSeededRandom(42811);
  const viewNormalMatrix = buildViewNormalMatrix();
  const positions: number[] = [];
  const colors: number[] = [];
  const localNormal = new THREE.Vector3();
  const viewNormal = new THREE.Vector3();
  const color = new THREE.Color();

  for (let i = 0; i <= latBands; i += 1) {
    const v = i / latBands;
    const lat = (v - 0.5) * Math.PI * 0.97;
    const cosLat = Math.cos(lat);
    const sinLat = Math.sin(lat);

    // Thin the rows near the poles so they don't clump into a bright cap.
    const poleKeep = cosLat * 0.9 + 0.12;

    for (let j = 0; j < lonSteps; j += 1) {
      if (random() > poleKeep) {
        continue;
      }

      const lon = (j / lonSteps) * Math.PI * 2 + v * 0.18;
      const x = cosLat * Math.cos(lon);
      const y = sinLat;
      const z = cosLat * Math.sin(lon);

      localNormal.set(x, y, z);
      viewNormal.copy(localNormal).applyMatrix3(viewNormalMatrix).normalize();
      const ndotl = viewNormal.dot(VIEW_LIGHT);

      // Fade the dark hemisphere into the background by dropping most points.
      if (ndotl < -0.02 && random() > 0.32) {
        continue;
      }
      if (ndotl < -0.28 && random() > 0.5) {
        continue;
      }

      colorForNormal(ndotl, color);
      positions.push(x * radius, y * radius, z * radius);
      colors.push(color.r, color.g, color.b);
    }
  }

  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
  };
}

export type OrbitCurveConfig = {
  radiusX: number;
  radiusY: number;
  radiusZ: number;
  wobble: number;
  phase: number;
};

export function createOrbitCurve({
  radiusX,
  radiusY,
  radiusZ,
  wobble,
  phase,
}: OrbitCurveConfig) {
  const controlPoints: THREE.Vector3[] = [];

  for (let i = 0; i < 8; i += 1) {
    const t = phase + (i / 8) * Math.PI * 2;
    controlPoints.push(
      new THREE.Vector3(
        Math.cos(t) * radiusX,
        Math.sin(t * 1.15) * radiusY,
        Math.sin(t + wobble) * radiusZ,
      ),
    );
  }

  return new THREE.CatmullRomCurve3(controlPoints, true, "catmullrom", 0.42);
}

export function getOrbitAnchor(orbitT: number) {
  return PRIMARY_ORBIT.getPointAt(orbitT);
}

export function getOrbitLabelPosition(orbitT: number, lift = 0.28) {
  const anchor = PRIMARY_ORBIT.getPointAt(orbitT);
  return anchor.clone().add(anchor.clone().normalize().multiplyScalar(lift));
}

/**
 * Position on a tilted ring around the planet (in the scene group's local XY
 * plane, so it inherits ORBIT_TILT). Gives precise control over where each
 * label sits so they read like the reference layout.
 */
export function getLabelRingPosition(angleDeg: number, radius: number) {
  const a = THREE.MathUtils.degToRad(angleDeg);
  return new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0);
}

/** Radius of the ring the label dots sit on (shared by the dashed orbit) */
export const LABEL_DOT_RADIUS = 2.06;

/** Clean planar ellipse in the XZ plane (tilted into a ring by ORBIT_TILT) */
function createEllipseOrbitXZ(radiusX: number, radiusZ: number, segments = 120) {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i < segments; i += 1) {
    const t = (i / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(t) * radiusX, 0, Math.sin(t) * radiusZ));
  }
  return new THREE.CatmullRomCurve3(points, true, "catmullrom", 0.5);
}

/** Clean circle in the XY plane — passes through getLabelRingPosition points */
function createRingXY(radius: number, segments = 120) {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i < segments; i += 1) {
    const t = (i / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(t) * radius, Math.sin(t) * radius, 0));
  }
  return new THREE.CatmullRomCurve3(points, true, "catmullrom", 0.5);
}

/** Clean circular ring tilted by the given rotation — always spherical */
function createTiltedRing(
  radius: number,
  rotX: number,
  rotY: number,
  segments = 120,
) {
  const euler = new THREE.Euler(rotX, rotY, 0);
  const points: THREE.Vector3[] = [];
  for (let i = 0; i < segments; i += 1) {
    const t = (i / segments) * Math.PI * 2;
    const point = new THREE.Vector3(Math.cos(t) * radius, Math.sin(t) * radius, 0);
    point.applyEuler(euler);
    points.push(point);
  }
  return new THREE.CatmullRomCurve3(points, true, "catmullrom", 0.5);
}

export const PRIMARY_ORBIT = createEllipseOrbitXZ(2.34, 2.18);

export const SECONDARY_ORBITS = [
  createRingXY(LABEL_DOT_RADIUS),
  createTiltedRing(2.5, 1.42, 0.32),
  createOrbitCurve({
    radiusX: 2.08,
    radiusY: 0.7,
    radiusZ: 1.82,
    wobble: 2.4,
    phase: 3.6,
  }),
];

export const DESKTOP_PLANET_POINTS = createPlanetPointCloud({
  latBands: 78,
  lonSteps: 150,
});
export const SIMPLIFIED_PLANET_POINTS = createPlanetPointCloud({
  latBands: 46,
  lonSteps: 92,
});
