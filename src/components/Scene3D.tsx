import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  useGLTF,
  Environment,
  Float,
  PresentationControls,
} from '@react-three/drei';
import * as THREE from 'three';

/* =======================
   Model Component
======================= */

interface ModelProps {
  url: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

const Model = ({
  url,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 36],
}: ModelProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);

  const { scene, animations } = useGLTF(url);

  // Setup & play animations
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

  // Update animation mixer + subtle rotation
  useFrame((state, delta) => {
    mixerRef.current?.update(delta);

    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.1) * 0.1 + rotation[1];
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <primitive object={scene} />
    </group>
  );
};

/* =======================
   Loading Fallback
======================= */

const LoadingFallback = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="#444" wireframe />
  </mesh>
);

/* =======================
   Scene Component
======================= */

interface Scene3DProps {
  className?: string;
  modelUrl?: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  ambientIntensity?: number;
  interactive?: boolean;
}

const Scene3D = ({
  className = '',
  modelUrl = '/models/cloud_station.glb',
  scale = 0.5,
  position = [0, -1, 0],
  rotation = [0, 0, 0],
  ambientIntensity = 0.5,
  interactive = true,
}: Scene3DProps) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 1.5, 15], fov: 6 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        {/* Lights */}
        <ambientLight intensity={ambientIntensity} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00d4ff" />

        <Suspense fallback={<LoadingFallback />}>
          {interactive ? (
            <PresentationControls
              global
              polar={[-0.4, 0.4]}
              azimuth={[-0.5, 0.5]}
              config={{ mass: 2, tension: 400 }}
              snap={{ mass: 4, tension: 400 }}
            >
              <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                <Model
                  url={modelUrl}
                  scale={scale}
                  position={position}
                  rotation={rotation}
                />
              </Float>
            </PresentationControls>
          ) : (
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
              <Model
                url={modelUrl}
                scale={scale}
                position={position}
                rotation={rotation}
              />
            </Float>
          )}

          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
};

/* =======================
   Preload Model
======================= */

useGLTF.preload('/models/cloud_station.glb');

export { Scene3D };
