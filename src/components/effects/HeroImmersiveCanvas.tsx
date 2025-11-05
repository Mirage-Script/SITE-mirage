/* eslint-disable react/no-unknown-property */
import { Float, PointMaterial, Points } from '@react-three/drei';
import { Canvas, type RenderCallback, useFrame } from '@react-three/fiber';
import clsx from 'clsx';
import { useReducedMotion } from 'framer-motion';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import type { Group, Mesh } from 'three';



interface HeroImmersiveCanvasProps {
  className?: string;
}

function AuroraParticleField({ color, spread }: { color: string; spread: number }) {
  const groupRef = useRef<Group | null>(null);
  const elapsedRef = useRef(0);
  const positions = useMemo(() => {
    const count = 1800;
    const array = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      array[i * 3 + 0] = (Math.random() - 0.5) * spread;
      array[i * 3 + 1] = (Math.random() - 0.5) * (spread * 0.4);
      array[i * 3 + 2] = (Math.random() - 0.5) * spread;
    }

    return array;
  }, [spread]);

  const rotateAurora: RenderCallback = (_, delta) => {
    if (!groupRef.current) {
      return;
    }

    elapsedRef.current += delta;
    const t = elapsedRef.current;
    groupRef.current.rotation.y = t * 0.18;
    groupRef.current.rotation.x = Math.sin(t * 0.35) * 0.18;
  };

  useFrame(rotateAurora);

  return (
    <group ref={groupRef}>
      <Float speed={0.8} rotationIntensity={0.4} floatIntensity={0.6}>
        <Points positions={positions} stride={3} frustumCulled>
          <PointMaterial
            transparent
            color={color}
            size={0.045}
            sizeAttenuation
            depthWrite={false}
            opacity={0.78}
            depthTest={false}
          />
        </Points>
      </Float>
    </group>
  );
}

function NebulaRibbon() {
  const meshRef = useRef<Mesh | null>(null);
  const elapsedRef = useRef(0);

  const animateRibbon: RenderCallback = (_, delta) => {
    if (!meshRef.current) {
      return;
    }

    elapsedRef.current += delta;
    meshRef.current.rotation.z = Math.sin(elapsedRef.current * 0.6) * 0.14;
  };

  useFrame(animateRibbon);

  return (
    <mesh ref={meshRef} position={[0, 0, -2]}>
      <planeGeometry args={[6.5, 3, 32, 32]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            vec3 transformed = position;
            transformed.z += sin(uv.x * 3.1415 * 4.0) * 0.3;
            transformed.y += cos(uv.y * 3.1415 * 3.0) * 0.25;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          void main() {
            vec3 gradient = mix(vec3(0.047, 0.227, 0.345), vec3(0.251, 0.788, 0.937), smoothstep(0.0, 1.0, vUv.x));
            float alpha = smoothstep(0.1, 0.9, vUv.y) * 0.45;
            gl_FragColor = vec4(gradient, alpha);
          }
        `}
      />
    </mesh>
  );
}

function HeroScene() {
  return (
    <group>
      <ambientLight intensity={0.35} />
      <directionalLight intensity={0.4} position={[1.5, 2.5, 1.5]} color="#a855f7" />
      <AuroraParticleField color="#60a5fa" spread={6} />
      <AuroraParticleField color="#34d399" spread={5.5} />
      <NebulaRibbon />
    </group>
  );
}

export function HeroImmersiveCanvas({ className = '' }: HeroImmersiveCanvasProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (prefersReducedMotion || !isClient) {
    return null;
  }

  return (
    <div className={clsx('pointer-events-none', className)} aria-hidden>
      <Suspense fallback={null}>
        <Canvas gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }} dpr={[1, 1.75]} camera={{ position: [0, 0, 4.5], fov: 45 }}>
          <HeroScene />
        </Canvas>
      </Suspense>
    </div>
  );
}
