"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface VapeModelProps {
  color: string;
}

// Interactive Vape Mesh inside the Canvas
const VapeModel: React.FC<VapeModelProps> = ({ color }) => {
  const groupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const ledRef = useRef<THREE.Mesh>(null);

  // Rotate on scroll & follow mouse cursor
  useFrame((state) => {
    if (!groupRef.current) return;

    // Follow mouse cursor with a smooth lerp
    const targetX = state.pointer.x * 0.4;
    const targetY = state.pointer.y * 0.3;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetX,
      0.08
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -targetY,
      0.08
    );

    // Scroll rotation effect
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    groupRef.current.rotation.y += scrollY * 0.003;

    // Pulse the bottom LED glowing ring
    if (ledRef.current) {
      const material = ledRef.current.material as THREE.MeshStandardMaterial;
      if (material) {
        material.emissiveIntensity = 1.5 + Math.sin(state.clock.getElapsedTime() * 4) * 0.5;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.3, 0]}>
      {/* 1. Mouthpiece / Cap */}
      <mesh position={[0, 2.1, 0]}>
        <cylinderGeometry args={[0.25, 0.3, 0.4, 32]} />
        <meshStandardMaterial color="#111" roughness={0.4} metalness={0.9} />
      </mesh>
      <mesh position={[0, 2.35, 0]}>
        <torusGeometry args={[0.15, 0.08, 16, 32]} />
        <meshStandardMaterial color="#111" roughness={0.4} metalness={0.9} />
      </mesh>

      {/* 2. Transparent Pod Cartridge */}
      <mesh position={[0, 1.4, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 1.0, 32]} />
        <meshPhysicalMaterial
          color="#a3e635"
          transparent
          opacity={0.35}
          roughness={0.1}
          metalness={0.1}
          transmission={0.95}
          thickness={0.5}
        />
      </mesh>

      {/* 3. Internal Coil inside the cartridge */}
      <mesh position={[0, 1.4, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.9, 16]} />
        <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.1} />
      </mesh>
      {/* Mesh coil structure lines */}
      <mesh position={[0, 1.4, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.7, 16]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.3} wireframe />
      </mesh>

      {/* 4. Vape Body Shell */}
      <mesh ref={bodyRef} position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 2.2, 32]} />
        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Brand Logo Text Mesh (represented by neat metallic strips on body) */}
      <mesh position={[0, -0.2, 0.43]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.12, 1.0, 0.02]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.2} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.2, 0.44]}>
        <boxGeometry args={[0.04, 0.8, 0.02]} />
        <meshStandardMaterial color="#111111" roughness={0.5} />
      </mesh>

      {/* 5. Glowing LED Indicator Ring */}
      <mesh ref={ledRef} position={[0, -1.32, 0]}>
        <torusGeometry args={[0.39, 0.04, 8, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2}
          roughness={0.1}
        />
      </mesh>

      {/* 6. Base Cap */}
      <mesh position={[0, -1.35, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.06, 32]} />
        <meshStandardMaterial color="#111" roughness={0.6} metalness={0.9} />
      </mesh>
    </group>
  );
};

// Vapor Particle Smoke Component
const VaporParticles: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 45;
  const positions = new Float32Array(particleCount * 3);
  const speeds = useRef<number[]>([]);
  const sines = useRef<number[]>([]);

  // Initialize random particle offsets and speeds
  useEffect(() => {
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 0.4; // X offset
      positions[i * 3 + 1] = 2.4 + Math.random() * 2.0; // Y height (start from mouthpiece)
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.4; // Z offset
      speeds.current.push(0.01 + Math.random() * 0.02);
      sines.current.push(Math.random() * 100);
    }
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const geometry = pointsRef.current.geometry;
    const posArr = geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      // Move particle upwards
      posArr[idx + 1] += speeds.current[i];
      // Sway left & right
      sines.current[i] += 0.03;
      posArr[idx] += Math.sin(sines.current[i]) * 0.003;

      // Reset when particle goes too high
      if (posArr[idx + 1] > 5.0) {
        posArr[idx] = (Math.random() - 0.5) * 0.2;
        posArr[idx + 1] = 2.4;
        posArr[idx + 2] = (Math.random() - 0.5) * 0.2;
      }
    }
    geometry.attributes.position.needsUpdate = true;
  });

  // Create vapor texture programmatically
  const createVaporTexture = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, "rgba(255, 255, 255, 0.4)");
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
    }
    return new THREE.CanvasTexture(canvas);
  };

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.4}
        map={createVaporTexture()}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export const ThreeDScene: React.FC<VapeModelProps> = ({ color }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Show a high-quality stylized CSS placeholder during SSR
    return (
      <div className="canvas-placeholder">
        <div className="placeholder-vape" style={{ "--glow-color": color } as React.CSSProperties}>
          <div className="placeholder-vape-mouthpiece" />
          <div className="placeholder-vape-cartridge" />
          <div className="placeholder-vape-body" />
          <div className="placeholder-vape-led" />
        </div>
        <div className="placeholder-glow" style={{ background: color }} />
      </div>
    );
  }

  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} />
        <directionalLight position={[-5, 5, -5]} intensity={0.4} />
        <pointLight position={[0, -2, 2]} intensity={0.6} color={color} />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
          <VapeModel color={color} />
          <VaporParticles />
        </Float>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
};
