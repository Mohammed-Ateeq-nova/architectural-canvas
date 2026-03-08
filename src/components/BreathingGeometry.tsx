import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VERTEX_COUNT = 800;
const SPHERE_RADIUS = 2.5;

const BreathingMesh = () => {
  const meshRef = useRef<THREE.Points>(null);
  const scrollRef = useRef({ progress: 0 });

  // Create geometry with vertices on a sphere surface
  const { positions, originalPositions, opacities, sizes } = useMemo(() => {
    const pos = new Float32Array(VERTEX_COUNT * 3);
    const origPos = new Float32Array(VERTEX_COUNT * 3);
    const opac = new Float32Array(VERTEX_COUNT);
    const sz = new Float32Array(VERTEX_COUNT);

    for (let i = 0; i < VERTEX_COUNT; i++) {
      // Fibonacci sphere distribution for even spread
      const phi = Math.acos(1 - 2 * (i + 0.5) / VERTEX_COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      const x = SPHERE_RADIUS * Math.sin(phi) * Math.cos(theta);
      const y = SPHERE_RADIUS * Math.sin(phi) * Math.sin(theta);
      const z = SPHERE_RADIUS * Math.cos(phi);

      // Add slight randomness for organic feel
      const jitter = 0.15;
      pos[i * 3] = x + (Math.random() - 0.5) * jitter;
      pos[i * 3 + 1] = y + (Math.random() - 0.5) * jitter;
      pos[i * 3 + 2] = z + (Math.random() - 0.5) * jitter;

      origPos[i * 3] = pos[i * 3];
      origPos[i * 3 + 1] = pos[i * 3 + 1];
      origPos[i * 3 + 2] = pos[i * 3 + 2];

      opac[i] = 1.0;
      sz[i] = Math.random() * 3 + 1.5;
    }
    return { positions: pos, originalPositions: origPos, opacities: opac, sizes: sz };
  }, []);

  // ScrollTrigger for hero section
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: '#hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        scrollRef.current.progress = self.progress;
      },
    });

    return () => trigger.kill();
  }, []);

  // Shader material
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('#00d4ff') },
        uColorSecondary: { value: new THREE.Color('#ff00aa') },
      },
      vertexShader: `
        attribute float aOpacity;
        attribute float aSize;
        varying float vOpacity;
        varying float vDistance;
        
        void main() {
          vOpacity = aOpacity;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vDistance = length(position);
          gl_PointSize = aSize * (200.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform vec3 uColorSecondary;
        varying float vOpacity;
        varying float vDistance;
        
        void main() {
          // Soft circle
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float alpha = smoothstep(0.5, 0.1, d) * vOpacity;
          
          // Mix colors based on distance from center
          float colorMix = smoothstep(0.0, 4.0, vDistance);
          vec3 color = mix(uColor, uColorSecondary, colorMix);
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const geo = meshRef.current.geometry;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    const opacAttr = geo.attributes.aOpacity as THREE.BufferAttribute;
    const time = state.clock.elapsedTime;
    const scroll = scrollRef.current.progress;

    // Normalized scroll: 0 = start, 1 = hero completely gone
    const dissolveStart = 0.1;
    const dissolveEnd = 0.85;
    const dissolve = Math.max(0, Math.min(1, (scroll - dissolveStart) / (dissolveEnd - dissolveStart)));

    for (let i = 0; i < VERTEX_COUNT; i++) {
      const ox = originalPositions[i * 3];
      const oy = originalPositions[i * 3 + 1];
      const oz = originalPositions[i * 3 + 2];

      // Breathing: sine wave displacement on vertex normals
      const nx = ox / SPHERE_RADIUS;
      const ny = oy / SPHERE_RADIUS;
      const nz = oz / SPHERE_RADIUS;

      const breathe = Math.sin(time * 1.5 + i * 0.05) * 0.15 * (1 - dissolve);

      // Dissolve: push vertices outward and upward
      const disperseForce = dissolve * dissolve * 8;
      const upDrift = dissolve * dissolve * 3;
      const randomDrift = Math.sin(i * 7.3) * dissolve * 2;

      posAttr.array[i * 3] = ox + nx * breathe + nx * disperseForce + Math.sin(i * 3.1) * randomDrift;
      posAttr.array[i * 3 + 1] = oy + ny * breathe + ny * disperseForce + upDrift + Math.cos(i * 2.7) * randomDrift;
      posAttr.array[i * 3 + 2] = oz + nz * breathe + nz * disperseForce + Math.sin(i * 5.3) * randomDrift;

      // Opacity: fade per-vertex with dissolve
      const vertexFade = Math.max(0, 1 - dissolve * 1.5 + Math.sin(i * 0.3) * 0.2);
      opacAttr.array[i] = vertexFade;
    }

    posAttr.needsUpdate = true;
    opacAttr.needsUpdate = true;

    // Slow rotation
    meshRef.current.rotation.y = time * 0.08 + scroll * 2;
    meshRef.current.rotation.x = Math.sin(time * 0.05) * 0.1;

    // Drift right and scale down with scroll
    meshRef.current.position.x = scroll * 8;
    meshRef.current.position.y = scroll * 2;
    const s = 1 - scroll * 0.3;
    meshRef.current.scale.set(s, s, s);

    // Update time uniform
    shaderMaterial.uniforms.uTime.value = time;
  });

  return (
    <points ref={meshRef} material={shaderMaterial}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={VERTEX_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aOpacity"
          count={VERTEX_COUNT}
          array={opacities}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aSize"
          count={VERTEX_COUNT}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
    </points>
  );
};

export const BreathingGeometry = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <BreathingMesh />
      </Canvas>
    </div>
  );
};

export default BreathingGeometry;
