"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";
import CanvasLoader from "./CanvasLoader";

function BallModel({ imgUrl }: { imgUrl: string }) {
  const [decal] = useTexture([imgUrl]);

  return (
    <Float speed={2.5} rotationIntensity={2} floatIntensity={3}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[0, 0, 0.5]} />
      <mesh castShadow receiveShadow scale={3}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 2, 6.25]}
          scale={1}
          map={decal}
        />
      </mesh>
    </Float>
  );
}

export default function BallCanvas({ icon }: { icon: string }) {
  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", (e) =>
          e.preventDefault()
        );
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} />
        <BallModel imgUrl={icon} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
}
