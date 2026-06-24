"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

import Globe from "./Globe";
import NetworkParticles from "./NetworkParticles";
import OrbitRings from "./OrbitRings";
import Stars from "./Stars";

import { buildGlobeOrbits } from "@/lib/globeData";

interface InteractionState {
  /** Normalized pointer -1..1 for parallax. */
  x: number;
  y: number;
  isDragging: boolean;
  pointerId: number | null;
  lastX: number;
  lastY: number;
  rotationX: number;
  rotationY: number;
}

function createInteractionState(): InteractionState {
  return {
    x: 0,
    y: 0,
    isDragging: false,
    pointerId: null,
    lastX: 0,
    lastY: 0,
    rotationX: 0,
    rotationY: 0,
  };
}





function CameraRig({
  interaction,
}: {
  interaction: React.RefObject<InteractionState>;
}) {
  const base = useMemo(() => new THREE.Vector3(0, 0.08, 4.1), []);
  const target = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  useFrame((state) => {
    const camera = state.camera;
    const t = state.clock.elapsedTime;
    const p = interaction.current;
    const parallax = p.isDragging ? 0.35 : 1;

    const floatX = Math.sin(t * 0.18) * 0.1;
    const floatY = Math.cos(t * 0.22) * 0.06;

    const desiredX = base.x + p.x * 0.45 * parallax + floatX;
    const desiredY = base.y + p.y * 0.32 * parallax + floatY;
    const desiredZ = base.z;

    camera.position.x += (desiredX - camera.position.x) * 0.045;
    camera.position.y += (desiredY - camera.position.y) * 0.045;
    camera.position.z += (desiredZ - camera.position.z) * 0.05;
    camera.lookAt(target);
  });

  return null;
}

function SceneContent({
  interaction,
}: {
  interaction: React.RefObject<InteractionState>;
}) {
  const { size } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const orbits = useMemo(() => buildGlobeOrbits(4), []);

  const layout = useMemo(() => {
    if (size.width >= 1024) return { x: 0, y: 0, scale: 1.32 };
    if (size.width >= 640) return { x: 0, y: 0.02, scale: 1.12 };
    return { x: 0, y: 0, scale: 0.95 };
  }, [size.width]);

  useFrame(() => {
    if (!groupRef.current) return;
    const drag = interaction.current;
    const targetScale = layout.scale;
    const g = groupRef.current;

    g.scale.setScalar(g.scale.x + (targetScale - g.scale.x) * 0.06);
    g.position.x += (layout.x - g.position.x) * 0.06;
    g.position.y += (layout.y - g.position.y) * 0.06;

    const rotEase = drag.isDragging ? 0.22 : 0.08;
    g.rotation.y += (drag.rotationY - g.rotation.y) * rotEase;
    g.rotation.x += (drag.rotationX - g.rotation.x) * rotEase;
  });

  return (
    <>
      <Stars count={2600} shootingStars={3} />

      <group ref={groupRef} position={[layout.x, layout.y, 0]}>
        <Globe rotationSpeed={0.028} />
        <OrbitRings orbits={orbits} />
        <NetworkParticles orbits={orbits} nodesPerOrbit={36} randomStarCount={36} trailLength={1} />
      </group>

      <CameraRig interaction={interaction} />
    </>
  );
}

function GlobeScene({
  interaction,
}: {
  interaction: React.RefObject<InteractionState>;
}) {
  return (
    <div className="absolute inset-0">
      <Canvas
        className="block h-full w-full"
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: true,
        }}
        style={{ background: "transparent", touchAction: "none" }}
        dpr={[1, 2]}
        camera={{ position: [0, 0.08, 4.1], fov: 42, near: 0.1, far: 200 }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.08;
        }}
      >
        <SceneContent interaction={interaction} />

        <EffectComposer multisampling={0}>
          <Bloom
            intensity={0.85}
            luminanceThreshold={0.18}
            luminanceSmoothing={0.35}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.2} darkness={0.18} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

export default function ThreeDElement() {
  const interaction = useRef<InteractionState>(createInteractionState());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const state = interaction.current;
    const container = containerRef.current;
    if (!container) return;

    const setPointer = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      state.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      state.y = -(((clientY - rect.top) / rect.height) * 2 - 1);
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      state.isDragging = true;
      state.pointerId = e.pointerId;
      state.lastX = e.clientX;
      state.lastY = e.clientY;
      container.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      setPointer(e.clientX, e.clientY);
      if (!state.isDragging || state.pointerId !== e.pointerId) return;

      const dx = e.clientX - state.lastX;
      const dy = e.clientY - state.lastY;
      state.lastX = e.clientX;
      state.lastY = e.clientY;

      state.rotationY += dx * 0.0055;
      state.rotationX = THREE.MathUtils.clamp(
        state.rotationX + dy * 0.0035,
        -0.85,
        0.85
      );
    };

    const endDrag = (e: PointerEvent) => {
      if (state.pointerId !== e.pointerId) return;
      state.isDragging = false;
      state.pointerId = null;
      if (container.hasPointerCapture(e.pointerId)) {
        container.releasePointerCapture(e.pointerId);
      }
    };

    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", endDrag);
    container.addEventListener("pointercancel", endDrag);
    return () => {
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", endDrag);
      container.removeEventListener("pointercancel", endDrag);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-full min-h-[min(52vh,28rem)] w-full lg:min-h-[36rem]"
    >
      <GlobeScene interaction={interaction} />
    </div>
  );
}
