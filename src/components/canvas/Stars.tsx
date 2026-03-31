"use client";

import { useRef, useState, Suspense, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import type { Points as ThreePoints } from "three";
import { useTheme } from "next-themes";

/* ── helpers ────────────────────────────────────────────────── */
function readStarColors() {
  const style = getComputedStyle(document.documentElement);
  return {
    far:  style.getPropertyValue("--star-far").trim()  || "#e2e8f0",
    mid:  style.getPropertyValue("--star-mid").trim()  || "#c7d9ff",
    near: style.getPropertyValue("--star-near").trim() || "#a5c8ff",
  };
}

/* ── Star layer ─────────────────────────────────────────────── */
interface LayerProps {
  count: number; radius: number; size: number;
  color: string; opacity: number; speedX: number; speedY: number;
}

function StarLayer({ count, radius, size, color, opacity, speedX, speedY }: LayerProps) {
  const ref = useRef<ThreePoints>(null);
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(count * 3), { radius })
  );
  useFrame((_s, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x -= delta * speedX;
    ref.current.rotation.y -= delta * speedY;
  });
  return (
    <Points ref={ref} positions={sphere as Float32Array} stride={3} frustumCulled>
      <PointMaterial transparent color={color} size={size} sizeAttenuation depthWrite={false} opacity={opacity} />
    </Points>
  );
}

/* ── Mouse parallax ─────────────────────────────────────────── */
function ParallaxRig() {
  const { camera } = useThree();
  useFrame(({ mouse }) => {
    camera.position.x += (mouse.x * 0.08 - camera.position.x) * 0.05;
    camera.position.y += (mouse.y * 0.06 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 1);
  });
  return null;
}

/* ── Scene ──────────────────────────────────────────────────── */
interface SceneProps { colors: { far: string; mid: string; near: string }; isDark: boolean }

function Scene({ colors, isDark }: SceneProps) {
  const farOp  = isDark ? 0.30 : 0.60;
  const midOp  = isDark ? 0.55 : 0.72;
  const nearOp = isDark ? 0.90 : 0.88;

  return (
    <group rotation={[0, 0, Math.PI / 5]}>
      <StarLayer count={2800} radius={1.6} size={0.0011} color={colors.far}  opacity={farOp}  speedX={0.03}  speedY={0.025} />
      <StarLayer count={800}  radius={1.2} size={0.0020} color={colors.mid}  opacity={midOp}  speedX={0.055} speedY={0.045} />
      <StarLayer count={300}  radius={0.9} size={0.0042} color={colors.near} opacity={nearOp} speedX={0.085} speedY={0.065} />
    </group>
  );
}

/* ── Export ─────────────────────────────────────────────────── */
export default function StarsCanvas() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const [colors, setColors] = useState({ far: "#e2e8f0", mid: "#c7d9ff", near: "#a5c8ff" });

  // Re-read CSS vars whenever the theme changes.
  // rAF ensures data-theme is already written to <html> before getComputedStyle runs.
  useEffect(() => {
    const id = requestAnimationFrame(() => setColors(readStarColors()));
    return () => cancelAnimationFrame(id);
  }, [resolvedTheme]);

  return (
    <div className="w-full h-full absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1], fov: 100 }} frameloop="always" gl={{ antialias: false, alpha: true }}>
        <Suspense fallback={null}>
          <Scene colors={colors} isDark={isDark} />
          <ParallaxRig />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
}
