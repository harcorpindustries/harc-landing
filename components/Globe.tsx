"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Group, ShaderMaterial } from "three";

import {
  buildCityDots,
  buildCoastDots,
  buildGlobeDots,
  getLandFacingRotation,
  GLOBE_OCCLUDER_RADIUS,
  loadLandMask,
  type GlobeDots,
} from "@/lib/globeData";

interface GlobeProps {
  maskUrl?: string;
  rotationSpeed?: number;
}

type DotUniforms = {
  uColor: { value: THREE.Color };
  uCore: { value: THREE.Color };
  uSize: { value: number };
  uGlow: { value: number };
  uPixelRatio: { value: number };
  uTime: { value: number };
};

interface GlobePointLayerProps {
  dots: GlobeDots;
  uniforms: DotUniforms;
}

function GlobePointLayer({ dots, uniforms }: GlobePointLayerProps) {
  const materialRef = useRef<ShaderMaterial>(null);

  useFrame((state) => {
    const material = materialRef.current;
    if (!material) return;
    material.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[dots.positions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[dots.scales, 1]} />
        <bufferAttribute attach="attributes-aIntensity" args={[dots.intensities, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        depthTest
        blending={THREE.AdditiveBlending}
        vertexShader={dotVertexShader}
        fragmentShader={dotFragmentShader}
      />
    </points>
  );
}

/**
 * Point-cloud Earth: transparent sphere of silver dots – land fill, coast
 * borders, and bright city hubs – with stars visible through the globe.
 */
export default function Globe({
  maskUrl = "/earth-spec.jpg",
  rotationSpeed = 0.03,
}: GlobeProps) {
  const groupRef = useRef<Group>(null);
  const [landDots, setLandDots] = useState<GlobeDots | null>(null);
  const [coastDots, setCoastDots] = useState<GlobeDots | null>(null);
  const [cityDots, setCityDots] = useState<GlobeDots | null>(null);

  const pixelRatio =
    typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1;

  const landUniforms = useMemo<DotUniforms>(
    () => ({
      uColor: { value: new THREE.Color("#8a8a8e") },
      uCore: { value: new THREE.Color("#c8c8cc") },
      uSize: { value: 4.8 },
      uGlow: { value: 0.68 },
      uPixelRatio: { value: pixelRatio },
      uTime: { value: 0 },
    }),
    [pixelRatio]
  );

  const coastUniforms = useMemo<DotUniforms>(
    () => ({
      uColor: { value: new THREE.Color("#b8b8bc") },
      uCore: { value: new THREE.Color("#eeeced") },
      uSize: { value: 6.2 },
      uGlow: { value: 1.05 },
      uPixelRatio: { value: pixelRatio },
      uTime: { value: 0 },
    }),
    [pixelRatio]
  );

  const cityUniforms = useMemo<DotUniforms>(
    () => ({
      uColor: { value: new THREE.Color("#d8d8dc") },
      uCore: { value: new THREE.Color("#ffffff") },
      uSize: { value: 9.5 },
      uGlow: { value: 1.45 },
      uPixelRatio: { value: pixelRatio },
      uTime: { value: 0 },
    }),
    [pixelRatio]
  );

  useEffect(() => {
    let active = true;
    loadLandMask(maskUrl, 1024, 0.5)
      .then((mask) => {
        if (!active) return;
        if (groupRef.current) {
          const facing = getLandFacingRotation(mask);
          groupRef.current.rotation.x = facing.x;
          groupRef.current.rotation.y = facing.y;
        }
        setLandDots(buildGlobeDots(mask));
        setCoastDots(buildCoastDots(mask));
        setCityDots(buildCityDots({ mask }));
      })
      .catch((err) => console.error("Failed to load globe land mask", err));
    return () => {
      active = false;
    };
  }, [maskUrl]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Depth-only occluder – hides back-hemisphere dots without a visible fill. */}
      <mesh renderOrder={0}>
        <sphereGeometry args={[GLOBE_OCCLUDER_RADIUS, 64, 64]} />
        <meshBasicMaterial colorWrite={false} depthWrite />
      </mesh>

      {landDots && <GlobePointLayer dots={landDots} uniforms={landUniforms} />}
      {coastDots && <GlobePointLayer dots={coastDots} uniforms={coastUniforms} />}
      {cityDots && <GlobePointLayer dots={cityDots} uniforms={cityUniforms} />}
    </group>
  );
}

const dotVertexShader = /* glsl */ `
  attribute float aScale;
  attribute float aIntensity;
  uniform float uSize;
  uniform float uGlow;
  uniform float uPixelRatio;
  uniform float uTime;
  varying float vIntensity;
  varying float vTwinkle;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    vIntensity = aIntensity;
    float phase = dot(position, vec3(12.9898, 78.233, 45.164)) * 0.35;
    vTwinkle = 0.88 + 0.12 * sin(uTime * 1.6 + phase);
    gl_PointSize = uSize * aScale * uGlow * uPixelRatio * (1.0 / -mvPosition.z);
  }
`;

const dotFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uCore;
  varying float vIntensity;
  varying float vTwinkle;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float core = smoothstep(0.5, 0.32, d);
    float glow = smoothstep(0.5, 0.08, d);
    vec3 color = mix(uColor, uCore, core * 0.72);
    float alpha = glow * vIntensity * vTwinkle * 0.78;
    gl_FragColor = vec4(color, alpha);
  }
`;
