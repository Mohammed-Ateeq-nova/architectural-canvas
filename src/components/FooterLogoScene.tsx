import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  useGLTF,
  Environment,
  Float,
} from '@react-three/drei';
import * as THREE from 'three';

interface ModelProps {
  url: string;
  scale?: number;
  position?: [number, number, number];
  colorPreset?: 'cyber' | 'aurora' | 'magma';
  mouseRef: React.RefObject<{ x: number; y: number }>;
}

const LogoModel = ({
  url,
  scale = 0.21,
  position = [0, 0, 0],
  colorPreset = 'cyber',
  mouseRef,
}: ModelProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const materialsRef = useRef<THREE.MeshStandardMaterial[]>([]);

  const { scene, animations } = useGLTF(url);

  // Setup animations if present
  useEffect(() => {
    if (!animations || animations.length === 0) return;

    mixerRef.current = new THREE.AnimationMixer(scene);
    animations.forEach((clip) => {
      const action = mixerRef.current!.clipAction(clip);
      action.reset().play();
    });

    return () => {
      mixerRef.current?.stopAllAction();
      mixerRef.current = null;
    };
  }, [animations, scene]);

  // Compile a flat list of materials on load for high performance updates inside useFrame
  useEffect(() => {
    const materials: THREE.MeshStandardMaterial[] = [];
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((mat) => {
              if (mat instanceof THREE.MeshStandardMaterial) {
                mat.roughness = 0.15;
                mat.metalness = 0.9;
                materials.push(mat);
              }
            });
          } else if (mesh.material instanceof THREE.MeshStandardMaterial) {
            mesh.material.roughness = 0.15;
            mesh.material.metalness = 0.9;
            materials.push(mesh.material);
          }
        }
      }
    });
    materialsRef.current = materials;
  }, [scene]);

  // Target emissive specs based on preset
  const presetSpecs = {
    cyber: { emissive: '#ff00a0', intensity: 0.25 },
    aurora: { emissive: '#a000ff', intensity: 0.25 },
    magma: { emissive: '#ff0055', intensity: 0.25 },
  }[colorPreset];

  const targetEmissiveColor = new THREE.Color(presetSpecs.emissive);

  useFrame((state, delta) => {
    mixerRef.current?.update(delta);

    if (groupRef.current && mouseRef.current) {
      // Frame-rate independent damping factor (works consistently at any FPS)
      const damping = 1 - Math.pow(0.001, delta);

      // Mouse pointer tracking on both axes with wide responsive ranges
      const targetPitch = mouseRef.current.y * 0.35;  // Vertical mouse -> X rotation
      const targetYaw   = mouseRef.current.x * 0.5;   // Horizontal mouse -> Y rotation

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetPitch, damping);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetYaw, damping);
    }

    // Gentle pulsing effect + smooth color lerp
    const colorDamping = 1 - Math.pow(0.01, delta);
    const time = state.clock.getElapsedTime();
    const pulseIntensity = presetSpecs.intensity + Math.sin(time * 2) * 0.08;

    materialsRef.current.forEach((mat) => {
      mat.emissive.lerp(targetEmissiveColor, colorDamping);
      mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, pulseIntensity, colorDamping);
    });
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <primitive object={scene} />
    </group>
  );
};

const LoadingFallback = () => (
  <mesh>
    <octahedronGeometry args={[1.5, 1]} />
    <meshBasicMaterial color="#00e5ff" wireframe transparent opacity={0.3} />
  </mesh>
);

interface FooterLogoSceneProps {
  colorPreset?: 'cyber' | 'aurora' | 'magma';
  interactive?: boolean;
  scale?: number;
}

export const FooterLogoScene = ({
  colorPreset = 'cyber',
  interactive = true,
  scale = 0.21,
}: FooterLogoSceneProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!interactive) return;

    const handlePointerMove = (e: PointerEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const pointerX = e.clientX;
      const pointerY = e.clientY;

      // Allow tracking within bounding box + 150px vertical margin for smooth ease-in
      const margin = 150;
      const isOver = 
        pointerX >= rect.left - margin && 
        pointerX <= rect.right + margin && 
        pointerY >= rect.top - margin && 
        pointerY <= rect.bottom + margin;

      if (isOver) {
        // Calculate coordinates relative to container center normalized between [-1.2, 1.2]
        const x = ((pointerX - rect.left) / rect.width) * 2 - 1;
        const y = -(((pointerY - rect.top) / rect.height) * 2 - 1);
        
        mouseRef.current = { 
          x: Math.max(-1.2, Math.min(1.2, x)), 
          y: Math.max(-1.2, Math.min(1.2, y)) 
        };
      } else {
        mouseRef.current = { x: 0, y: 0 };
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [interactive]);

  // Determine light colors based on selected preset
  const lightColors = {
    cyber: { cyan: '#00e5ff', accent: '#ff00a0' },
    aurora: { cyan: '#00ffcc', accent: '#a000ff' },
    magma: { cyan: '#ff7700', accent: '#ff0055' },
  }[colorPreset];

  return (
    <div ref={containerRef} className="w-full h-full absolute inset-0 select-none pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 38 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent', pointerEvents: 'none' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} />
        
        {/* Neon point lights casting colored highlights */}
        <pointLight position={[-6, 2, -2]} intensity={4} color={lightColors.cyan} />
        <pointLight position={[6, -2, 2]} intensity={3} color={lightColors.accent} />
        
        {/* Soft fill light from bottom */}
        <pointLight position={[0, -5, 0]} intensity={1.2} color="#3333ff" />

        <Suspense fallback={<LoadingFallback />}>
          <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.3}>
            {/* Static flip group: 180° on X and Z axes */}
            <group rotation={[Math.PI, 0, Math.PI]}>
              <LogoModel
                url="/models/logo.glb"
                scale={scale}
                position={[0, -0.2, 0]}
                colorPreset={colorPreset}
                mouseRef={mouseRef}
              />
            </group>
          </Float>

          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
};

// Preload the model to prevent lag when the footer comes into view
useGLTF.preload('/models/logo.glb');

export default FooterLogoScene;
