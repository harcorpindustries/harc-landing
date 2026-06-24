"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface DustParticlesProps {
  count?: number;
  innerRadius?: number;
  outerRadius?: number;
}

/**
 * A volumetric cloud of glowing purple dust wrapping the planet. The whole
 * field rotates slowly so the motes appear to orbit, while each mote softly
 * twinkles. Additive blending + bloom give the "full glow" purplish shine.
 */
export default function DustParticles({
  count = 2200,
  innerRadius = 1.25,
  outerRadius = 3.4,
}: DustParticlesProps) {
  const groupRef = useRef<THREE.Group>(null);

  const { positions, scales, phases, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const phases = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    const v = new THREE.Vector3();
    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      // Bias the radial distribution toward the planet for a dense halo
      // that thins out into space.
      const t = Math.pow(Math.random(), 1.7);
      const r = THREE.MathUtils.lerp(innerRadius, outerRadius, t);
      const theta = Math.random() * Math.PI * 2;
      // Flatten slightly toward an orbital disk while keeping volume.
      const phi = Math.acos(2 * Math.random() - 1);
      const flatten = 0.6;
      v.set(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi) * flatten,
        r * Math.sin(phi) * Math.sin(theta)
      );
      positions[i * 3] = v.x;
      positions[i * 3 + 1] = v.y;
      positions[i * 3 + 2] = v.z;

      scales[i] = 0.5 + Math.pow(Math.random(), 2) * 2.4;
      phases[i] = Math.random() * Math.PI * 2;

      // Neutral silver dust.
      color.setHSL(0, 0.02, 0.55 + Math.random() * 0.2);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return { positions, scales, phases, colors };
  }, [count, innerRadius, outerRadius]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 34 },
      uPixelRatio: {
        value: typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1,
      },
    }),
    []
  );

  useFrame((_, delta) => {
    uniforms.uTime.value += delta;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.035;
      groupRef.current.rotation.x = Math.sin(uniforms.uTime.value * 0.05) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
          <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
          <bufferAttribute attach="attributes-aColor" args={[colors, 3]} />
        </bufferGeometry>
        <shaderMaterial
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </points>
    </group>
  );
}

const vertexShader = /* glsl */ `
  attribute float aScale;
  attribute float aPhase;
  attribute vec3 aColor;
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  varying float vTwinkle;
  varying vec3 vColor;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    vTwinkle = 0.5 + 0.5 * sin(uTime * 1.1 + aPhase);
    vColor = aColor;
    gl_PointSize = uSize * aScale * uPixelRatio * (1.0 / -mvPosition.z);
  }
`;

const fragmentShader = /* glsl */ `
  varying float vTwinkle;
  varying vec3 vColor;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float glow = smoothstep(0.5, 0.0, d);
    float alpha = glow * glow * (0.25 + vTwinkle * 0.55);
    gl_FragColor = vec4(vColor, alpha);
  }
`;
