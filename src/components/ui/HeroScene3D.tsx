import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const Icosahedron = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const [mouse, setMouse] = useState({ x: 0, y: 0 });

    useFrame((state) => {
        if (!meshRef.current) return;

        // Smooth lerp basic rotation
        meshRef.current.rotation.x += 0.002;
        meshRef.current.rotation.y += 0.003;

        // Pointer alignment logic
        // Pointer returns values from -1 to 1.
        // Max 15 degrees (~0.26 rad) each axis
        const maxRot = 15 * (Math.PI / 180);
        const targetX = (state.pointer.y * maxRot);
        const targetY = (state.pointer.x * maxRot);

        // Adding the base rotation to the pointer offset for the final transform
        // actually, a secondary group is better for pointer tracking to avoid conflicts,
        // but doing it directly is okay if we use lerp.
        // We already have Float handling up/down, so let's just do pointer tracking subtly.
    });

    return (
        <Float
            speed={1.5} // Animation speed
            rotationIntensity={1} // XYZ rotation intensity
            floatIntensity={2} // Up/down float intensity, translates to ~20px visually
            floatingRange={[-0.2, 0.2]} // Range of y-axis values
        >
            <mesh ref={meshRef}>
                <icosahedronGeometry args={[2, 0]} />
                <meshStandardMaterial
                    color="#00d4ff"
                    emissive="#00d4ff"
                    emissiveIntensity={0.8}
                    wireframe
                    transparent
                    opacity={0.8}
                />
            </mesh>
        </Float>
    );
};

export const HeroScene3D = () => {
    return (
        <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-end pr-[10%] drop-shadow-[0_0_15px_rgba(0,212,255,0.4)]">
            <div className="w-[400px] h-[400px] pointer-events-auto">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                    <ambientLight intensity={0.5} />
                    <Icosahedron />
                </Canvas>
            </div>
        </div>
    );
};
