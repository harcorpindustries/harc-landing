"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { buildOrbits, type OrbitConfig } from "@/lib/globeData";

interface OrbitRingsProps {
  orbits?: OrbitConfig[];
  segments?: number;
}

/**
 * Elegant silver orbital rings wrapping the globe. Each ring is a thin,
 * semi-transparent additive line on its own tilted plane with a slow drift.
 */
export default function OrbitRings({
  orbits,
  segments = 128,
}: OrbitRingsProps) {
  const config = useMemo(() => orbits ?? buildOrbits(24), [orbits]);
  const groupRef = useRef<THREE.Group>(null);

  const rings = useMemo(() => {
    return config.map((orbit) => {
      const positions = new Float32Array((segments + 1) * 3);
      const a = orbit.radius;
      const b = orbit.radius * (1 - orbit.eccentricity);
      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        positions[i * 3] = Math.cos(angle) * a;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = Math.sin(angle) * b;
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      const material = new THREE.LineBasicMaterial({
        color: new THREE.Color().setHSL(0, 0.02, 0.92),
        transparent: true,
        opacity: orbit.opacity * 1.12,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const line = new THREE.Line(geometry, material);
      line.rotation.set(...orbit.rotation);
      line.userData = { baseOpacity: orbit.opacity * 1.12, speed: orbit.speed };
      return line;
    });
  }, [config, segments]);

  useEffect(() => {
    const current = rings;
    return () => {
      current.forEach((line) => {
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
      });
    };
  }, [rings]);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;
    for (const child of group.children) {
      const line = child as THREE.Line;
      const { baseOpacity, speed } = line.userData as {
        baseOpacity: number;
        speed: number;
      };
      line.rotateY(delta * speed);
      (line.material as THREE.LineBasicMaterial).opacity = baseOpacity * 0.85;
    }
  });

  return (
    <group ref={groupRef}>
      {rings.map((line, i) => (
        <primitive key={i} object={line} />
      ))}
    </group>
  );
}
