"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  buildEvenRingNodes,
  buildNetworkNodes,
  buildOrbits,
  GLOBE_RADIUS,
  type OrbitConfig,
} from "@/lib/globeData";

interface NetworkParticlesProps {
  orbits?: OrbitConfig[];
  nodeCount?: number;
  trailLength?: number;
  nodesPerOrbit?: number;
  /** Extra twinkling stars scattered at random positions around the globe. */
  randomStarCount?: number;
}

interface NodeMeta {
  orbit: number;
  offset: number;
  speed: number;
  phase: number;
  sparkle: number;
  size: number;
  hue: number;
}

interface FreeStar {
  base: THREE.Vector3;
  driftAxis: THREE.Vector3;
  driftSpeed: number;
  phase: number;
  sparkle: number;
  size: number;
  hue: number;
}

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildNodeMeta(
  orbits: OrbitConfig[],
  nodeCount: number,
  nodesPerOrbit: number,
  seed = 21
): NodeMeta[] {
  const rand = mulberry32(seed);
  const useEvenSpacing = orbits.length <= 6;
  const base = useEvenSpacing
    ? buildEvenRingNodes(orbits, nodesPerOrbit, seed)
    : buildNetworkNodes(orbits, nodeCount, seed);

  return base.map((node) => ({
    orbit: node.orbit,
    offset: node.offset,
    speed: node.speed * (useEvenSpacing ? 1 : 0.65 + rand() * 0.7),
    phase: rand() * Math.PI * 2,
    sparkle: rand() > 0.72 ? 0.72 + rand() * 0.28 : 0.22 + rand() * 0.35,
    size: useEvenSpacing ? 0.34 + rand() * 0.52 : 0.3 + Math.pow(rand(), 2.2) * 1.35,
    hue: node.hue + (rand() - 0.5) * 0.03,
  }));
}

function buildFreeStars(count: number, seed = 77): FreeStar[] {
  const rand = mulberry32(seed);
  const stars: FreeStar[] = [];
  const v = new THREE.Vector3();
  const axis = new THREE.Vector3();

  for (let i = 0; i < count; i++) {
    const u = rand();
    const theta = rand() * Math.PI * 2;
    const phi = Math.acos(2 * rand() - 1);
    const r = THREE.MathUtils.lerp(GLOBE_RADIUS * 1.22, GLOBE_RADIUS * 1.68, u);
    v.setFromSphericalCoords(r, phi, theta);
    axis.set(rand() - 0.5, rand() - 0.5, rand() - 0.5).normalize();

    stars.push({
      base: v.clone(),
      driftAxis: axis,
      driftSpeed: 0.04 + rand() * 0.12,
      phase: rand() * Math.PI * 2,
      sparkle: 0.75 + rand() * 0.25,
      size: 0.5 + rand() * 0.85,
      hue: 0,
    });
  }
  return stars;
}

/**
 * Glowing stars on orbital paths plus random scattered stars that shine and
 * drift slowly through the space around the globe.
 */
export default function NetworkParticles({
  orbits,
  nodeCount = 150,
  trailLength = 1,
  nodesPerOrbit = 44,
  randomStarCount = 32,
}: NetworkParticlesProps) {
  const config = useMemo(() => orbits ?? buildOrbits(24), [orbits]);
  const useEvenSpacing = config.length <= 6;
  const ringCount = useEvenSpacing ? config.length * nodesPerOrbit : nodeCount;
  const totalCount = ringCount + randomStarCount;

  const nodes = useMemo(
    () => buildNodeMeta(config, nodeCount, nodesPerOrbit),
    [config, nodeCount, nodesPerOrbit]
  );
  const freeStars = useMemo(() => buildFreeStars(randomStarCount), [randomStarCount]);
  const pointsRef = useRef<THREE.Points>(null);

  const orbitMeta = useMemo(
    () =>
      config.map((o) => ({
        a: o.radius,
        b: o.radius * (1 - o.eccentricity),
        euler: new THREE.Euler(...o.rotation),
        speed: o.speed,
        plane: o.plane ?? "equator",
        yaw: o.rotation[1],
      })),
    [config]
  );

  const { positions, scales, alphas, colors, phases, sparkles } = useMemo(() => {
    const total = totalCount * trailLength;
    const positions = new Float32Array(total * 3);
    const scales = new Float32Array(total);
    const alphas = new Float32Array(total);
    const colors = new Float32Array(total * 3);
    const phases = new Float32Array(total);
    const sparkles = new Float32Array(total);
    const color = new THREE.Color();

    for (let n = 0; n < ringCount; n++) {
      const node = nodes[n];
      const sat = 0.02 + node.sparkle * 0.03;
      const light = 0.86 + node.sparkle * 0.14;
      color.setHSL(node.hue, sat, light);
      for (let t = 0; t < trailLength; t++) {
        const i = n * trailLength + t;
        const fade = 1 - t / trailLength;
        scales[i] = node.size * (0.85 + node.sparkle * 0.3);
        alphas[i] = fade * (0.55 + node.sparkle * 0.45);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
        phases[i] = node.phase + t * 0.35;
        sparkles[i] = node.sparkle;
      }
    }

    for (let f = 0; f < randomStarCount; f++) {
      const star = freeStars[f];
      const i = ringCount + f;
      color.setHSL(star.hue, 0.02, 0.94);
      scales[i] = star.size;
      alphas[i] = 0.65 + star.sparkle * 0.35;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      phases[i] = star.phase;
      sparkles[i] = star.sparkle;
      positions[i * 3] = star.base.x;
      positions[i * 3 + 1] = star.base.y;
      positions[i * 3 + 2] = star.base.z;
    }

    return { positions, scales, alphas, colors, phases, sparkles };
  }, [nodes, ringCount, randomStarCount, freeStars, totalCount, trailLength]);

  const time = useRef(0);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const yAxis = useMemo(() => new THREE.Vector3(0, 1, 0), []);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 17 },
      uPixelRatio: {
        value: typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1,
      },
    }),
    []
  );

  const v = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    time.current += delta;
    const mat = materialRef.current;
    if (mat) mat.uniforms.uTime.value = time.current;
    const t = time.current;
    const pts = pointsRef.current;
    if (!pts) return;
    const posAttr = pts.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let n = 0; n < ringCount; n++) {
      const node = nodes[n];
      const meta = orbitMeta[node.orbit];
      const angle = node.offset * Math.PI * 2 + t * node.speed + t * meta.speed * 0.35;

      if (meta.plane === "meridian") {
        const sinA = Math.sin(angle);
        const cosA = Math.cos(angle);
        const r = meta.a;
        const yaw = meta.yaw;
        v.set(sinA * r * Math.sin(yaw), cosA * r, sinA * r * Math.cos(yaw));
      } else {
        v.set(Math.cos(angle) * meta.a, 0, Math.sin(angle) * meta.b).applyEuler(meta.euler);
        v.applyAxisAngle(yAxis, t * meta.speed);
      }

      const i = n * trailLength * 3;
      arr[i] = v.x;
      arr[i + 1] = v.y;
      arr[i + 2] = v.z;
    }

    for (let f = 0; f < randomStarCount; f++) {
      const star = freeStars[f];
      const wobble = Math.sin(t * star.driftSpeed * 2.4 + star.phase) * 0.018;
      v.copy(star.base).multiplyScalar(1 + wobble);
      v.applyAxisAngle(star.driftAxis, t * star.driftSpeed);
      const i = (ringCount + f) * 3;
      arr[i] = v.x;
      arr[i + 1] = v.y;
      arr[i + 2] = v.z;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        <bufferAttribute attach="attributes-aAlpha" args={[alphas, 1]} />
        <bufferAttribute attach="attributes-aColor" args={[colors, 3]} />
        <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
        <bufferAttribute attach="attributes-aSparkle" args={[sparkles, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </points>
  );
}

const vertexShader = /* glsl */ `
  attribute float aScale;
  attribute float aAlpha;
  attribute vec3 aColor;
  attribute float aPhase;
  attribute float aSparkle;
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  varying float vAlpha;
  varying vec3 vColor;
  varying float vTwinkle;
  varying float vSparkle;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    float twinkleA = sin(uTime * (0.7 + aSparkle * 2.2) + aPhase);
    float twinkleB = sin(uTime * 2.6 + aPhase * 1.9) * 0.4;
    float burst = pow(max(0.0, sin(uTime * 0.45 + aPhase * 3.1)), 6.0) * aSparkle;
    vTwinkle = 0.45 + 0.55 * (twinkleA + twinkleB) + burst * 0.65;
    vTwinkle *= 0.75 + aSparkle * 0.55;

    vAlpha = aAlpha * vTwinkle;
    vColor = aColor;
    vSparkle = aSparkle;

    float sizeBoost = 1.0 + aSparkle * 0.55 * max(0.0, twinkleA + burst);
    gl_PointSize = uSize * aScale * sizeBoost * uPixelRatio * (1.0 / -mvPosition.z);
  }
`;

const fragmentShader = /* glsl */ `
  varying float vAlpha;
  varying vec3 vColor;
  varying float vTwinkle;
  varying float vSparkle;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;

    float core = smoothstep(0.5, 0.0, d);
    float halo = smoothstep(0.5, 0.06, d);

    float flare = exp(-abs(c.x) * 12.0) + exp(-abs(c.y) * 12.0);
    flare *= vSparkle * core * 0.42;

    vec3 white = vec3(0.97, 0.99, 1.0);
    vec3 color = mix(vColor, white, core * (0.6 + vSparkle * 0.35));
    color += white * flare * vTwinkle;

    float alpha = (core * core * 0.65 + halo * 0.28 + flare) * vAlpha;
    gl_FragColor = vec4(color, alpha);
  }
`;
