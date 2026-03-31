"use client";

import { Suspense, useEffect, useRef, useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "./CanvasLoader";

function ComputerModel({ isMobile }: { isMobile: boolean }) {
  const computer = useGLTF("/desktop_pc/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={0.2} groundColor="black" />
      <pointLight
        intensity={isMobile ? 25 : 50}
        position={isMobile ? [-2, -1, -1] : [-2, -2, -1]}
      />
      <spotLight
        position={isMobile ? [-3, 4, 7] : [-3, 5, 3]}
        angle={9}
        penumbra={4}
        intensity={isMobile ? 400 : 500}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive
        object={computer.scene}
        scale={isMobile ? 1.5 : 2}
        position={isMobile ? [-2, -7, -2] : [-4, -10, -2]}
        rotation={[-0.01, -0.25, 0.0]}
      />
    </mesh>
  );
}

export default function ComputersCanvas() {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleResize = useCallback((entries: ResizeObserverEntry[]) => {
    const entry = entries[0];
    setIsMobile(entry.contentRect.width < 580);
  }, []);

  useEffect(() => {
    const observer = new ResizeObserver(handleResize);
    const el = containerRef.current ?? document.documentElement;
    observer.observe(el);
    setIsMobile(window.innerWidth < 580);
    return () => observer.disconnect();
  }, [handleResize]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full">
      <Canvas
        frameloop="demand"
        shadows
        camera={{ position: [20, 3, 5], fov: 25 }}
        gl={{ preserveDrawingBuffer: true }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", (e) =>
            e.preventDefault()
          );
        }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          <ComputerModel isMobile={isMobile} />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
}
