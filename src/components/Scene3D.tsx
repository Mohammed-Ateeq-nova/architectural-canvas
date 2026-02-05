 import { Suspense, useRef } from 'react';
 import { Canvas, useFrame } from '@react-three/fiber';
 import { useGLTF, Environment, Float, PresentationControls } from '@react-three/drei';
 import * as THREE from 'three';
 
 interface ModelProps {
   url: string;
   scale?: number;
   position?: [number, number, number];
   rotation?: [number, number, number];
 }
 
 const Model = ({ url, scale = 1, position = [0, 0, 0], rotation = [0, 0, 0] }: ModelProps) => {
   const { scene } = useGLTF(url);
   const groupRef = useRef<THREE.Group>(null);
 
   useFrame((state) => {
     if (groupRef.current) {
       // Subtle rotation
       groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1 + rotation[1];
     }
   });
 
   return (
     <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
       <primitive object={scene.clone()} />
     </group>
   );
 };
 
 const LoadingFallback = () => (
   <mesh>
     <boxGeometry args={[1, 1, 1]} />
     <meshStandardMaterial color="#333" wireframe />
   </mesh>
 );
 
 interface Scene3DProps {
   className?: string;
   modelUrl?: string;
   scale?: number;
   position?: [number, number, number];
   rotation?: [number, number, number];
   ambientIntensity?: number;
   interactive?: boolean;
 }
 
 export const Scene3D = ({
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
         camera={{ position: [0, 2, 8], fov: 45 }}
         gl={{ 
           antialias: true,
           alpha: true,
           powerPreference: 'high-performance',
         }}
         style={{ background: 'transparent' }}
       >
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
               <Float
                 speed={1.5}
                 rotationIntensity={0.2}
                 floatIntensity={0.5}
               >
                 <Model
                   url={modelUrl}
                   scale={scale}
                   position={position}
                   rotation={rotation}
                 />
               </Float>
             </PresentationControls>
           ) : (
             <Float
               speed={1.5}
               rotationIntensity={0.2}
               floatIntensity={0.5}
             >
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
 
 // Preload the model
 useGLTF.preload('/models/cloud_station.glb');
 
 export default Scene3D;
