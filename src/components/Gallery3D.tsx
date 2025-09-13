'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three-stdlib'
import { EffectComposer } from 'three-stdlib'
import { RenderPass } from 'three-stdlib'
import { UnrealBloomPass } from 'three-stdlib'
import { ImageMetadata } from '@/lib/imageDatabase'

interface Gallery3DProps {
  images: ImageMetadata[]
  layout?: 'grid' | 'spiral' | 'sphere' | 'helix' | 'random' | 'wave'
  interactive?: boolean
  autoRotate?: boolean
  effects?: boolean
}

export default function Gallery3D({
  images,
  layout = 'helix',
  interactive = true,
  autoRotate = true,
  effects = true
}: Gallery3DProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const composerRef = useRef<EffectComposer | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)
  const frameRef = useRef<number>(0)
  const imagesRef = useRef<THREE.Group>(new THREE.Group())
  const [selectedImage, setSelectedImage] = useState<ImageMetadata | null>(null)
  const [loading, setLoading] = useState(true)
  const [performanceStats, setPerformanceStats] = useState({ fps: 60, quality: 'high' })

  // Initialize Three.js scene
  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth
    const height = mountRef.current.clientHeight

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)
    scene.fog = new THREE.Fog(0x000000, 1, 1000)
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.set(0, 0, 100)
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: performanceStats.quality === 'high',
      alpha: true,
      powerPreference: 'high-performance'
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = performanceStats.quality === 'high'
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    rendererRef.current = renderer
    mountRef.current.appendChild(renderer.domElement)

    // Post-processing
    if (effects && performanceStats.quality === 'high') {
      const composer = new EffectComposer(renderer)
      const renderPass = new RenderPass(scene, camera)
      composer.addPass(renderPass)

      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(width, height),
        0.5, // Bloom strength
        0.4, // Radius
        0.85  // Threshold
      )
      composer.addPass(bloomPass)
      composerRef.current = composer
    }

    // Controls
    if (interactive) {
      const controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true
      controls.dampingFactor = 0.05
      controls.autoRotate = autoRotate
      controls.autoRotateSpeed = 0.5
      controls.maxDistance = 500
      controls.minDistance = 10
      controlsRef.current = controls
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
    scene.add(ambientLight)

    const spotLight1 = new THREE.SpotLight(0xff00ff, 1)
    spotLight1.position.set(50, 50, 50)
    spotLight1.castShadow = true
    scene.add(spotLight1)

    const spotLight2 = new THREE.SpotLight(0x00ffff, 1)
    spotLight2.position.set(-50, 50, -50)
    spotLight2.castShadow = true
    scene.add(spotLight2)

    const pointLight = new THREE.PointLight(0xffffff, 0.5)
    pointLight.position.set(0, 0, 0)
    scene.add(pointLight)

    // Add image group to scene
    scene.add(imagesRef.current)

    // Create image meshes
    createImageMeshes()

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)

      // Update controls
      if (controlsRef.current) {
        controlsRef.current.update()
      }

      // Animate images
      animateImages()

      // Render
      if (composerRef.current && effects) {
        composerRef.current.render()
      } else {
        renderer.render(scene, camera)
      }

      // Performance monitoring
      updatePerformance()
    }

    animate()
    setLoading(false)

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !camera || !renderer) return

      const newWidth = mountRef.current.clientWidth
      const newHeight = mountRef.current.clientHeight

      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()

      renderer.setSize(newWidth, newHeight)

      if (composerRef.current) {
        composerRef.current.setSize(newWidth, newHeight)
      }
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
      scene.clear()
    }
  }, [])

  // Create image meshes based on layout
  const createImageMeshes = useCallback(() => {
    const group = imagesRef.current
    group.clear()

    const loader = new THREE.TextureLoader()
    const imageCount = Math.min(images.length, 100) // Limit for performance

    images.slice(0, imageCount).forEach((image, index) => {
      // Create geometry
      const geometry = new THREE.BoxGeometry(10, 10, 0.5)

      // Create material with texture
      const material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        emissive: new THREE.Color(image.dominantColor.r / 255, image.dominantColor.g / 255, image.dominantColor.b / 255),
        emissiveIntensity: 0.2,
        shininess: 100,
        specular: 0x222222
      })

      // Load texture asynchronously
      loader.load(
        `/웹 꾸미기 사진/${image.filename}`,
        (texture) => {
          material.map = texture
          material.needsUpdate = true
        },
        undefined,
        (error) => {
          console.error('Error loading texture:', error)
        }
      )

      const mesh = new THREE.Mesh(geometry, material)
      mesh.castShadow = true
      mesh.receiveShadow = true

      // Position based on layout
      const position = calculatePosition(index, imageCount, layout)
      mesh.position.set(position.x, position.y, position.z)

      // Random initial rotation for variety
      mesh.rotation.set(
        Math.random() * Math.PI * 0.1,
        Math.random() * Math.PI * 0.1,
        Math.random() * Math.PI * 0.1
      )

      // Store metadata
      mesh.userData = { image, index }

      // Add interaction
      if (interactive) {
        mesh.userData.originalPosition = position
        mesh.userData.originalScale = { x: 1, y: 1, z: 1 }
      }

      group.add(mesh)
    })
  }, [images, layout, interactive])

  // Calculate position based on layout type
  const calculatePosition = (index: number, total: number, layoutType: string) => {
    const radius = 100
    const height = 200

    switch (layoutType) {
      case 'grid': {
        const cols = Math.ceil(Math.sqrt(total))
        const x = (index % cols - cols / 2) * 15
        const y = (Math.floor(index / cols) - cols / 2) * 15
        return { x, y, z: 0 }
      }

      case 'spiral': {
        const angle = (index / total) * Math.PI * 10
        const r = radius * (index / total)
        return {
          x: r * Math.cos(angle),
          y: (index / total - 0.5) * height,
          z: r * Math.sin(angle)
        }
      }

      case 'sphere': {
        const phi = Math.acos(-1 + (2 * index) / total)
        const theta = Math.sqrt(total * Math.PI) * phi
        return {
          x: radius * Math.cos(theta) * Math.sin(phi),
          y: radius * Math.sin(theta) * Math.sin(phi),
          z: radius * Math.cos(phi)
        }
      }

      case 'helix': {
        const angle = (index / total) * Math.PI * 8
        const y = (index / total - 0.5) * height
        return {
          x: radius * Math.cos(angle),
          y: y,
          z: radius * Math.sin(angle)
        }
      }

      case 'wave': {
        const cols = Math.ceil(Math.sqrt(total))
        const x = (index % cols - cols / 2) * 15
        const z = (Math.floor(index / cols) - cols / 2) * 15
        const y = Math.sin(x * 0.1) * 20 + Math.cos(z * 0.1) * 20
        return { x, y, z }
      }

      case 'random':
      default: {
        return {
          x: (Math.random() - 0.5) * radius * 2,
          y: (Math.random() - 0.5) * height,
          z: (Math.random() - 0.5) * radius * 2
        }
      }
    }
  }

  // Animate images
  const animateImages = () => {
    const time = Date.now() * 0.001
    const group = imagesRef.current

    group.children.forEach((child, index) => {
      if (child instanceof THREE.Mesh) {
        // Gentle floating animation
        child.position.y += Math.sin(time + index * 0.5) * 0.01

        // Slight rotation
        child.rotation.y += 0.001
        child.rotation.x += Math.sin(time + index) * 0.0001

        // Hover effect
        if (child.userData.hover) {
          child.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1)
          child.material.emissiveIntensity = 0.5
        } else {
          child.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
          child.material.emissiveIntensity = 0.2
        }
      }
    })
  }

  // Performance monitoring
  const updatePerformance = () => {
    // Simple FPS counter
    const now = performance.now()
    if (!frameRef.current) return

    // Auto-adjust quality based on FPS
    // Implementation would go here
  }

  // Raycaster for interaction
  useEffect(() => {
    if (!interactive || !rendererRef.current || !cameraRef.current || !sceneRef.current) return

    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const handleMouseMove = (event: MouseEvent) => {
      if (!mountRef.current) return

      const rect = mountRef.current.getBoundingClientRect()
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(mouse, cameraRef.current!)
      const intersects = raycaster.intersectObjects(imagesRef.current.children)

      // Reset all hover states
      imagesRef.current.children.forEach(child => {
        if (child.userData) child.userData.hover = false
      })

      // Set hover on intersected object
      if (intersects.length > 0) {
        intersects[0].object.userData.hover = true
        document.body.style.cursor = 'pointer'
      } else {
        document.body.style.cursor = 'default'
      }
    }

    const handleClick = (event: MouseEvent) => {
      if (!mountRef.current) return

      const rect = mountRef.current.getBoundingClientRect()
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(mouse, cameraRef.current!)
      const intersects = raycaster.intersectObjects(imagesRef.current.children)

      if (intersects.length > 0) {
        const selectedObject = intersects[0].object
        setSelectedImage(selectedObject.userData.image)
      }
    }

    const canvas = rendererRef.current.domElement
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('click', handleClick)

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('click', handleClick)
    }
  }, [interactive])

  return (
    <div className="relative w-full h-full">
      <div ref={mountRef} className="w-full h-full" />

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80">
          <div className="text-white text-2xl">Loading 3D Gallery...</div>
        </div>
      )}

      {selectedImage && (
        <div className="absolute top-4 right-4 bg-black/90 p-4 rounded-lg max-w-sm">
          <h3 className="text-white font-bold mb-2">{selectedImage.filename}</h3>
          <p className="text-gray-300 text-sm mb-2">Category: {selectedImage.category}</p>
          <p className="text-gray-300 text-sm mb-2">
            Size: {selectedImage.dimensions.width}x{selectedImage.dimensions.height}
          </p>
          <div className="flex flex-wrap gap-1 mt-2">
            {selectedImage.tags.slice(0, 5).map(tag => (
              <span key={tag} className="text-xs bg-blue-500/30 text-blue-300 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
          <button
            onClick={() => setSelectedImage(null)}
            className="mt-4 text-sm text-gray-400 hover:text-white"
          >
            Close
          </button>
        </div>
      )}

      {/* Performance Stats */}
      <div className="absolute bottom-4 left-4 text-xs text-gray-500">
        FPS: {performanceStats.fps} | Quality: {performanceStats.quality}
      </div>

      {/* Layout Controls */}
      <div className="absolute top-4 left-4 flex gap-2">
        {['grid', 'spiral', 'sphere', 'helix', 'wave'].map(l => (
          <button
            key={l}
            onClick={() => {
              // Re-create meshes with new layout
              // This would trigger a re-render with new layout
            }}
            className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-sm rounded"
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  )
}