"use client";

import { Canvas } from "@react-three/fiber";

interface WebGLArtworkProps {
  rotationX: number;
  rotationY: number;
}

function ProductDeliveryScene({ rotationX, rotationY }: WebGLArtworkProps) {
  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 4, 6]} intensity={1.8} />
      <pointLight position={[-3, -2, 3]} color="#7fa8e8" intensity={18} />

      <group rotation={[rotationX, rotationY, 0]}>
        <mesh position={[0, 0, -0.55]} rotation={[0.1, -0.12, 0.025]}>
          <boxGeometry args={[2.5, 3.15, 0.12]} />
          <meshStandardMaterial
            color="#a9bfd9"
            metalness={0.56}
            roughness={0.38}
            transparent
            opacity={0.22}
          />
        </mesh>

        <mesh rotation={[0.8, 0.2, 0.1]}>
          <torusGeometry args={[1.96, 0.014, 8, 128]} />
          <meshBasicMaterial color="#476e9f" transparent opacity={0.9} />
        </mesh>

        <mesh rotation={[1.35, 0.62, 0.76]}>
          <torusGeometry args={[2.02, 0.009, 8, 128]} />
          <meshBasicMaterial color="#8099b7" transparent opacity={0.88} />
        </mesh>

        <mesh rotation={[0.32, 1.04, 0.3]}>
          <torusGeometry args={[1.84, 0.007, 8, 128]} />
          <meshBasicMaterial color="#9aafc9" transparent opacity={0.68} />
        </mesh>

        <mesh position={[-1.76, 1.62, 0.26]} rotation={[0.2, 0.35, 0.1]}>
          <octahedronGeometry args={[0.21, 0]} />
          <meshStandardMaterial
            color="#345f9c"
            metalness={0.68}
            roughness={0.27}
          />
        </mesh>

        <mesh position={[1.78, 0.9, 0.32]} rotation={[0.2, 0.3, 0.15]}>
          <dodecahedronGeometry args={[0.19, 0]} />
          <meshStandardMaterial
            color="#c28f55"
            metalness={0.58}
            roughness={0.3}
          />
        </mesh>

        <mesh position={[1.55, -1.64, 0.24]} rotation={[0.3, 0.1, 0.25]}>
          <boxGeometry args={[0.27, 0.27, 0.27]} />
          <meshStandardMaterial
            color="#7894b7"
            metalness={0.72}
            roughness={0.24}
          />
        </mesh>

        <mesh position={[-1.75, -1.52, 0.28]}>
          <icosahedronGeometry args={[0.16, 0]} />
          <meshStandardMaterial
            color="#aebfd3"
            metalness={0.6}
            roughness={0.32}
          />
        </mesh>
      </group>
    </>
  );
}

export default function WebGLArtwork({
  rotationX,
  rotationY,
}: WebGLArtworkProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      data-testid="hero-webgl-artwork"
    >
      <Canvas
        camera={{ position: [0, 0, 6.8], fov: 39 }}
        dpr={[1, 1.25]}
        frameloop="demand"
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        fallback={<div className="absolute inset-0" />}
      >
        <ProductDeliveryScene rotationX={rotationX} rotationY={rotationY} />
      </Canvas>
    </div>
  );
}
