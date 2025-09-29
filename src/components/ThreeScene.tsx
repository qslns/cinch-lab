'use client'

import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Rotating sphere with distortion effect
function DistortedSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={2}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#E85D2C"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  )
}

// Rotating cube with wireframe
function RotatingCube() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.4
      meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.2
    }
  })

  return (
    <mesh ref={meshRef} scale={1.5}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#0047AB"
        wireframe={true}
        transparent={true}
        opacity={0.6}
      />
    </mesh>
  )
}

// Floating particles
function Particles({ count = 100 }) {
  const points = useRef<THREE.Points>(null)

  const particlesPosition = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    particlesPosition[i * 3] = (Math.random() - 0.5) * 10
    particlesPosition[i * 3 + 1] = (Math.random() - 0.5) * 10
    particlesPosition[i * 3 + 2] = (Math.random() - 0.5) * 10
  }

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.05
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#FFFFFF"
        transparent={true}
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  )
}

// Torus knot
function TorusKnot() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15
    }
  })

  return (
    <mesh ref={meshRef} scale={0.5}>
      <torusKnotGeometry args={[1, 0.3, 128, 32]} />
      <meshStandardMaterial
        color="#DC143C"
        roughness={0.1}
        metalness={0.9}
      />
    </mesh>
  )
}

// Main 3D scene component
interface ThreeSceneProps {
  type?: 'sphere' | 'cube' | 'particles' | 'torus' | 'all'
  className?: string
}

export default function ThreeScene({ type = 'sphere', className = '' }: ThreeSceneProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />

          {/* 3D Objects */}
          {(type === 'sphere' || type === 'all') && <DistortedSphere />}
          {(type === 'cube' || type === 'all') && <RotatingCube />}
          {(type === 'particles' || type === 'all') && <Particles count={200} />}
          {(type === 'torus' || type === 'all') && <TorusKnot />}

          {/* Environment */}
          <Environment preset="city" />

          {/* Controls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={true}
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

// Individual exports for specific use cases
export function FloatingSphere({ className = '' }: { className?: string }) {
  return <ThreeScene type="sphere" className={className} />
}

export function WireframeCube({ className = '' }: { className?: string }) {
  return <ThreeScene type="cube" className={className} />
}

export function ParticleField({ className = '' }: { className?: string }) {
  return <ThreeScene type="particles" className={className} />
}

export function TorusKnotScene({ className = '' }: { className?: string }) {
  return <ThreeScene type="torus" className={className} />
}