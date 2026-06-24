"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface StarsProps {
  count?: number;
  radius?: number;
  shootingStars?: number;
}

/**
 * A sparse deep-space starfield with a purplish tint plus occasional shooting
 * stars that streak across the sky and respawn. Everything is additive so the
 * bloom pass gives the motes a soft glow.
 */
export default function Stars({
  count = 2800,
  radius = 95,
  shootingStars = 4,
}: StarsProps) {
  return (
    <>
      <StarField count={count} radius={radius} />
      <ShootingStars count={shootingStars} radius={radius * 0.7} />
    </>
  );
}

function StarField({ count, radius }: { count: number; radius: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, scales, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const phases = new Float32Array(count);
    const v = new THREE.Vector3();
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const t = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * t - 1);
      const r = radius * (0.55 + Math.random() * 0.45);
      v.set(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
      positions[i * 3] = v.x;
      positions[i * 3 + 1] = v.y;
      positions[i * 3 + 2] = v.z;
      scales[i] = 0.25 + Math.pow(Math.random(), 4) * 1.4;
      phases[i] = Math.random() * Math.PI * 2;
    }
    return { positions, scales, phases };
  }, [count, radius]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 16 },
      uPixelRatio: {
        value: typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1,
      },
    }),
    []
  );

  useFrame((_, delta) => {
    uniforms.uTime.value += delta;
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.006;
    }
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
      </bufferGeometry>
      <shaderMaterial
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={starVertex}
        fragmentShader={starFragment}
      />
    </points>
  );
}

interface Meteor {
  pos: THREE.Vector3;
  dir: THREE.Vector3;
  speed: number;
  delay: number;
  age: number;
}

function ShootingStars({ count, radius }: { count: number; radius: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const trail = 12;

  const meteors = useMemo<Meteor[]>(() => {
    return Array.from({ length: count }, () => spawnMeteor(radius));
  }, [count, radius]);

  const { positions, alphas } = useMemo(() => {
    const positions = new Float32Array(count * trail * 3);
    const alphas = new Float32Array(count * trail);
    for (let m = 0; m < count; m++) {
      for (let k = 0; k < trail; k++) {
        alphas[m * trail + k] = Math.pow(1 - k / trail, 1.5);
      }
    }
    return { positions, alphas };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uSize: { value: 70 },
      uPixelRatio: {
        value: typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1,
      },
    }),
    []
  );

  useFrame((_, delta) => {
    const pts = pointsRef.current;
    if (!pts) return;
    const arr = (pts.geometry.getAttribute("position") as THREE.BufferAttribute)
      .array as Float32Array;
    const alphaAttr = pts.geometry.getAttribute("aAlpha") as THREE.BufferAttribute;
    const alphaArr = alphaAttr.array as Float32Array;
    const gap = 0.55;

    for (let m = 0; m < meteors.length; m++) {
      const me = meteors[m];
      me.age += delta;

      if (me.delay > 0) {
        me.delay -= delta;
        for (let k = 0; k < trail; k++) {
          const i = (m * trail + k) * 3;
          arr[i] = arr[i + 1] = arr[i + 2] = 99999;
          alphaArr[m * trail + k] = 0;
        }
        continue;
      }

      me.pos.addScaledVector(me.dir, me.speed * delta);

      // Fade the streak in then out over its flight, then respawn.
      const lifeFade = Math.min(1, me.age * 2) * Math.max(0, 1 - me.age * 0.35);
      for (let k = 0; k < trail; k++) {
        const i = (m * trail + k) * 3;
        arr[i] = me.pos.x - me.dir.x * gap * k;
        arr[i + 1] = me.pos.y - me.dir.y * gap * k;
        arr[i + 2] = me.pos.z - me.dir.z * gap * k;
        alphaArr[m * trail + k] = Math.pow(1 - k / trail, 1.5) * lifeFade;
      }

      if (me.age > 3.2) Object.assign(meteors[m], spawnMeteor(radius));
    }

    (pts.geometry.getAttribute("position") as THREE.BufferAttribute).needsUpdate =
      true;
    alphaAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aAlpha" args={[alphas, 1]} />
      </bufferGeometry>
      <shaderMaterial
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={meteorVertex}
        fragmentShader={meteorFragment}
      />
    </points>
  );
}

function spawnMeteor(radius: number): Meteor {
  const v = new THREE.Vector3();
  const u = Math.random();
  const t = Math.random();
  const theta = 2 * Math.PI * u;
  const phi = Math.acos(2 * t - 1);
  v.set(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.sin(phi) * Math.sin(theta) * 0.6 + radius * 0.3,
    radius * Math.cos(phi)
  );
  // Direction biased across the view with a downward slant.
  const dir = new THREE.Vector3(
    -0.6 - Math.random() * 0.5,
    -0.25 - Math.random() * 0.3,
    (Math.random() - 0.5) * 0.4
  ).normalize();
  return {
    pos: v,
    dir,
    speed: 26 + Math.random() * 22,
    delay: Math.random() * 5,
    age: 0,
  };
}

const starVertex = /* glsl */ `
  attribute float aScale;
  attribute float aPhase;
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  varying float vTwinkle;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    vTwinkle = 0.55 + 0.45 * sin(uTime * 0.65 + aPhase);
    gl_PointSize = uSize * aScale * uPixelRatio * (1.0 / -mvPosition.z);
  }
`;

const starFragment = /* glsl */ `
  varying float vTwinkle;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.0, d) * vTwinkle;
    vec3 color = mix(vec3(0.9, 0.9, 0.92), vec3(1.0), 0.45);
    gl_FragColor = vec4(color, alpha);
  }
`;

const meteorVertex = /* glsl */ `
  attribute float aAlpha;
  uniform float uSize;
  uniform float uPixelRatio;
  varying float vAlpha;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    vAlpha = aAlpha;
    gl_PointSize = uSize * aAlpha * uPixelRatio * (1.0 / -mvPosition.z);
  }
`;

const meteorFragment = /* glsl */ `
  varying float vAlpha;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float glow = smoothstep(0.5, 0.0, d);
    vec3 color = mix(vec3(0.92, 0.92, 0.94), vec3(1.0), glow * 0.6);
    gl_FragColor = vec4(color, glow * vAlpha);
  }
`;
