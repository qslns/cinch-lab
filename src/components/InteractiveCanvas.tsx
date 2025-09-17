'use client'

import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Text, Box, Sphere, MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'
import { useSpring, animated } from '@react-spring/three'

// Floating mesh component
function FloatingMesh({ position = [0, 0, 0] as [number, number, number], scale = 1, color = '#000000' }: { position?: [number, number, number]; scale?: number; color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  const { scale: animatedScale } = useSpring({
    scale: hovered ? scale * 1.2 : scale,
    config: { mass: 1, tension: 170, friction: 26 }
  })

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1
  })

  return (
    <animated.mesh
      ref={meshRef}
      position={position}
      scale={animatedScale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <MeshDistortMaterial
        color={color}
        speed={2}
        distort={0.3}
        radius={1}
        roughness={0.5}
        metalness={0.8}
      />
    </animated.mesh>
  )
}

// Particle system
function ParticleSystem({ count = 500 }: { count?: number }) {
  const points = useRef<THREE.Points>(null)

  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10

    colors[i * 3] = Math.random()
    colors[i * 3 + 1] = Math.random()
    colors[i * 3 + 2] = Math.random()
  }

  useFrame((state) => {
    if (!points.current) return
    points.current.rotation.x = state.clock.elapsedTime * 0.05
    points.current.rotation.y = state.clock.elapsedTime * 0.05
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} vertexColors transparent opacity={0.6} />
    </points>
  )
}

// 3D Text
function Text3D({ text, position = [0, 0, 0] as [number, number, number], size = 1 }: { text: string; position?: [number, number, number]; size?: number }) {
  const textRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!textRef.current) return
    textRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1
  })

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
      <Text
        ref={textRef}
        position={position}
        fontSize={size}
        color="black"
        anchorX="center"
        anchorY="middle"
        font="/fonts/font.woff"
      >
        {text}
        <meshStandardMaterial
          metalness={0.8}
          roughness={0.2}
          color="#000000"
        />
      </Text>
    </Float>
  )
}

// Morphing sphere
function MorphingSphere({ position = [0, 0, 0] as [number, number, number] }: { position?: [number, number, number] }) {
  const sphereRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!sphereRef.current) return
    const time = state.clock.elapsedTime
    sphereRef.current.rotation.x = time * 0.2
    sphereRef.current.rotation.y = time * 0.3
  })

  return (
    <mesh ref={sphereRef} position={position}>
      <Sphere args={[1, 32, 32]}>
        <MeshDistortMaterial
          color="#000000"
          speed={5}
          distort={0.5}
          radius={1}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </mesh>
  )
}

// Scene lighting
function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />
      <spotLight
        position={[0, 10, 0]}
        angle={0.15}
        penumbra={1}
        intensity={1}
        castShadow
      />
    </>
  )
}

interface InteractiveCanvasProps {
  type?: 'particles' | 'morphing' | 'floating' | 'text'
  text?: string
  interactive?: boolean
  className?: string
}

export default function InteractiveCanvas({
  type = 'floating',
  text = 'CINCH LAB',
  interactive = true,
  className = ''
}: InteractiveCanvasProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        shadows
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <SceneLighting />

        {interactive && <OrbitControls enableZoom={false} enablePan={false} />}

        {type === 'particles' && <ParticleSystem />}

        {type === 'morphing' && (
          <>
            <MorphingSphere position={[0, 0, 0] as [number, number, number]} />
            <MorphingSphere position={[-2, 1, -1] as [number, number, number]} />
            <MorphingSphere position={[2, -1, -1] as [number, number, number]} />
          </>
        )}

        {type === 'floating' && (
          <>
            <FloatingMesh position={[-2, 0, 0] as [number, number, number]} color="#000000" />
            <FloatingMesh position={[2, 0, 0] as [number, number, number]} color="#333333" />
            <FloatingMesh position={[0, 2, 0] as [number, number, number]} color="#666666" />
            <FloatingMesh position={[0, -2, 0] as [number, number, number]} color="#999999" />
          </>
        )}

        {type === 'text' && <Text3D text={text} size={1.5} />}
      </Canvas>
    </div>
  )
}