"use client";
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface DroneModelProps {
  mouseRef: React.RefObject<{ x: number; y: number }>;
}

const DroneModel = ({ mouseRef }: DroneModelProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);

  const { scene, animations } = useGLTF('/models/buster_drone.glb');

  // Setup Start_Liftoff animation in Ping-Pong mode (forward and reverse)
  useEffect(() => {
    if (!animations || animations.length === 0) return;

    const mixer = new THREE.AnimationMixer(scene);
    mixerRef.current = mixer;

    const clip = animations.find((a) => a.name === 'Start_Liftoff') || animations[0];
    if (clip) {
      const action = mixer.clipAction(clip);
      // LoopPingPong plays forward to end, reverses back to start, and repeats
      action.setLoop(THREE.LoopPingPong, Infinity);
      action.timeScale = 1.8; // Balanced pacing for liftoff & landing cycle
      action.reset().play();
    }

    return () => {
      mixer.stopAllAction();
      mixerRef.current = null;
    };
  }, [animations, scene]);

  // Animation mixer update & mouse-tracking tilt matching FooterLogoScene
  useFrame((state, delta) => {
    mixerRef.current?.update(delta);

    if (groupRef.current && mouseRef.current) {
      // Frame-rate independent damping factor
      const damping = 1 - Math.pow(0.001, delta);

      // Pitch (X-axis tilt) and Yaw (Y-axis rotation) towards mouse
      const targetPitch = mouseRef.current.y * 0.32;
      const targetYaw = mouseRef.current.x * 0.52;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetPitch,
        damping
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetYaw,
        damping
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.4, 0]}>
      <primitive object={scene} />
    </group>
  );
};

export const BusterDroneLoader = () => {
  const [mounted, setMounted] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);

    const handlePointerMove = (e: PointerEvent) => {
      // Screen-space normalization [-1, 1] relative to window center
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      if (halfW === 0 || halfH === 0) return;

      const x = (e.clientX - halfW) / halfW;
      const y = -((e.clientY - halfH) / halfH);

      mouseRef.current = {
        x: Math.max(-1.2, Math.min(1.2, x)),
        y: Math.max(-1.2, Math.min(1.2, y)),
      };
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  if (!mounted) {
    return <div className="w-full h-full" />;
  }

  return (
    <div className="w-full h-full select-none">
      <Canvas
        camera={{ position: [0, 0.4, 5.8], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[6, 9, 6]} intensity={1.8} />
        <directionalLight position={[-6, 4, -4]} intensity={1.2} color="#00e5ff" />
        <pointLight position={[0, -2.5, 3]} intensity={1.5} color="#00d4ff" />
        <pointLight position={[0, 4, -2]} intensity={0.8} color="#ffffff" />

        <Suspense fallback={null}>
          <DroneModel mouseRef={mouseRef} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
};

// Preload drone GLB asset
useGLTF.preload('/models/buster_drone.glb');

export default BusterDroneLoader;

