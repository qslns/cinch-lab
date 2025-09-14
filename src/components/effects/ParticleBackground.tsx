'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface ParticleBackgroundProps {
  count?: number
  color?: string
  size?: number
  speed?: number
}

export default function ParticleBackground({
  count = 1000,
  color = '#ffffff',
  size = 2,
  speed = 0.5
}: ParticleBackgroundProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const particlesRef = useRef<THREE.Points | null>(null)
  const frameRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 50
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    rendererRef.current = renderer
    mount.appendChild(renderer.domElement)

    // Create particles
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    const scales = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      // Random positions
      positions[i3] = (Math.random() - 0.5) * 100
      positions[i3 + 1] = (Math.random() - 0.5) * 100
      positions[i3 + 2] = (Math.random() - 0.5) * 50

      // Random velocities
      velocities[i3] = (Math.random() - 0.5) * speed
      velocities[i3 + 1] = (Math.random() - 0.5) * speed
      velocities[i3 + 2] = (Math.random() - 0.5) * speed

      // Random scales
      scales[i] = Math.random() * 2 + 0.5
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3))
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1))

    // Shader material for advanced effects
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uColor: { value: new THREE.Color(color) },
        uSize: { value: size }
      },
      vertexShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uSize;
        attribute vec3 velocity;
        attribute float scale;
        varying float vAlpha;

        void main() {
          vec3 pos = position;

          // Add movement based on time and velocity
          pos += velocity * uTime * 0.5;

          // Add mouse interaction
          vec2 mouseInfluence = uMouse * 10.0;
          pos.x += sin(uTime + position.y * 0.1) * 2.0 + mouseInfluence.x * 0.1;
          pos.y += cos(uTime + position.x * 0.1) * 2.0 + mouseInfluence.y * 0.1;

          // Wrap positions
          pos = mod(pos + 50.0, 100.0) - 50.0;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;

          // Size with perspective
          gl_PointSize = uSize * scale * (300.0 / -mvPosition.z);

          // Fade based on distance
          vAlpha = 1.0 - smoothstep(20.0, 50.0, length(pos.xy));
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vAlpha;

        void main() {
          // Circular particle shape
          vec2 center = gl_PointCoord - 0.5;
          float dist = length(center);

          if (dist > 0.5) discard;

          // Soft edges
          float alpha = smoothstep(0.5, 0.0, dist) * vAlpha;

          gl_FragColor = vec4(uColor, alpha * 0.6);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    const particles = new THREE.Points(geometry, material)
    particlesRef.current = particles
    scene.add(particles)

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    const clock = new THREE.Clock()

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)

      const elapsedTime = clock.getElapsedTime()

      // Update uniforms
      if (material.uniforms) {
        material.uniforms.uTime.value = elapsedTime
        material.uniforms.uMouse.value.x = mouseRef.current.x
        material.uniforms.uMouse.value.y = mouseRef.current.y
      }

      // Rotate particles
      if (particles) {
        particles.rotation.y = elapsedTime * 0.05
        particles.rotation.x = Math.sin(elapsedTime * 0.1) * 0.1
      }

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!camera || !renderer) return

      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }

      if (mount && renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }

      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [count, color, size, speed])

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  )
}