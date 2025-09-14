import * as THREE from 'three'

// Three.js Performance Optimization Utilities

export class PerformanceMonitor {
  private frameCount = 0
  private lastTime = performance.now()
  private fps = 60
  private frameHistory: number[] = []
  private maxHistoryLength = 60

  update(): number {
    const currentTime = performance.now()
    const delta = currentTime - this.lastTime

    if (delta >= 1000) {
      this.fps = Math.round((this.frameCount * 1000) / delta)
      this.frameHistory.push(this.fps)

      if (this.frameHistory.length > this.maxHistoryLength) {
        this.frameHistory.shift()
      }

      this.frameCount = 0
      this.lastTime = currentTime
    }

    this.frameCount++
    return this.fps
  }

  getAverageFPS(): number {
    if (this.frameHistory.length === 0) return this.fps
    const sum = this.frameHistory.reduce((a, b) => a + b, 0)
    return Math.round(sum / this.frameHistory.length)
  }

  getQualityLevel(): 'low' | 'medium' | 'high' {
    const avgFPS = this.getAverageFPS()
    if (avgFPS < 30) return 'low'
    if (avgFPS < 50) return 'medium'
    return 'high'
  }
}

export class LODManager {
  private lodObjects: Map<THREE.Mesh, THREE.LOD> = new Map()

  createLOD(mesh: THREE.Mesh, distances = [0, 50, 100]): THREE.LOD {
    const lod = new THREE.LOD()

    // High detail
    lod.addLevel(mesh, distances[0])

    // Medium detail
    const mediumGeometry = this.simplifyGeometry(mesh.geometry as THREE.BufferGeometry, 0.5)
    const mediumMesh = new THREE.Mesh(mediumGeometry, mesh.material)
    lod.addLevel(mediumMesh, distances[1])

    // Low detail
    const lowGeometry = this.simplifyGeometry(mesh.geometry as THREE.BufferGeometry, 0.25)
    const lowMesh = new THREE.Mesh(lowGeometry, mesh.material)
    lod.addLevel(lowMesh, distances[2])

    this.lodObjects.set(mesh, lod)
    return lod
  }

  private simplifyGeometry(geometry: THREE.BufferGeometry, factor: number): THREE.BufferGeometry {
    // Simple geometry simplification (in production, use proper simplification algorithm)
    const simplified = geometry.clone()
    const positionAttribute = simplified.getAttribute('position')

    if (positionAttribute && positionAttribute instanceof THREE.BufferAttribute) {
      const positions = positionAttribute.array
      const stride = Math.max(1, Math.floor(1 / factor))
      const newPositions: number[] = []

      for (let i = 0; i < positions.length; i += stride * 3) {
        newPositions.push(positions[i], positions[i + 1], positions[i + 2])
      }

      simplified.setAttribute('position', new THREE.Float32BufferAttribute(newPositions, 3))
    }

    return simplified
  }

  updateAll(camera: THREE.Camera) {
    this.lodObjects.forEach(lod => {
      lod.update(camera)
    })
  }
}

export class TextureOptimizer {
  private textureCache: Map<string, THREE.Texture> = new Map()
  private loader = new THREE.TextureLoader()
  private maxTextureSize = 2048

  async loadTexture(url: string, options?: {
    generateMipmaps?: boolean
    minFilter?: THREE.MinificationTextureFilter
    magFilter?: THREE.MagnificationTextureFilter
    anisotropy?: number
  }): Promise<THREE.Texture> {
    // Check cache
    const cached = this.textureCache.get(url)
    if (cached) return cached

    return new Promise((resolve, reject) => {
      this.loader.load(
        url,
        (texture) => {
          // Optimize texture settings
          texture.generateMipmaps = options?.generateMipmaps ?? true
          texture.minFilter = options?.minFilter ?? THREE.LinearMipmapLinearFilter
          texture.magFilter = options?.magFilter ?? THREE.LinearFilter
          texture.anisotropy = options?.anisotropy ?? 4

          // Compress texture if too large
          if (texture.image) {
            const { width, height } = texture.image
            if (width > this.maxTextureSize || height > this.maxTextureSize) {
              this.resizeTexture(texture, this.maxTextureSize)
            }
          }

          // Cache texture
          this.textureCache.set(url, texture)
          resolve(texture)
        },
        undefined,
        reject
      )
    })
  }

  private resizeTexture(texture: THREE.Texture, maxSize: number) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx || !texture.image) return

    const { width, height } = texture.image
    const scale = Math.min(maxSize / width, maxSize / height)

    canvas.width = width * scale
    canvas.height = height * scale

    ctx.drawImage(texture.image, 0, 0, canvas.width, canvas.height)
    texture.image = canvas
  }

  clearCache() {
    this.textureCache.forEach(texture => texture.dispose())
    this.textureCache.clear()
  }
}

export class GeometryInstancer {
  createInstancedMesh(
    geometry: THREE.BufferGeometry,
    material: THREE.Material,
    count: number,
    positions: THREE.Vector3[],
    rotations?: THREE.Euler[],
    scales?: THREE.Vector3[]
  ): THREE.InstancedMesh {
    const mesh = new THREE.InstancedMesh(geometry, material, count)
    const matrix = new THREE.Matrix4()
    const position = new THREE.Vector3()
    const quaternion = new THREE.Quaternion()
    const scale = new THREE.Vector3(1, 1, 1)

    for (let i = 0; i < count && i < positions.length; i++) {
      position.copy(positions[i])

      if (rotations && rotations[i]) {
        quaternion.setFromEuler(rotations[i])
      }

      if (scales && scales[i]) {
        scale.copy(scales[i])
      }

      matrix.compose(position, quaternion, scale)
      mesh.setMatrixAt(i, matrix)
    }

    mesh.instanceMatrix.needsUpdate = true
    return mesh
  }
}

export class SceneOptimizer {
  private scene: THREE.Scene
  private performanceMonitor: PerformanceMonitor
  private lodManager: LODManager
  private textureOptimizer: TextureOptimizer

  constructor(scene: THREE.Scene) {
    this.scene = scene
    this.performanceMonitor = new PerformanceMonitor()
    this.lodManager = new LODManager()
    this.textureOptimizer = new TextureOptimizer()
  }

  optimizeMaterials() {
    this.scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        const material = object.material

        if (material instanceof THREE.MeshStandardMaterial ||
            material instanceof THREE.MeshPhysicalMaterial) {
          // Reduce material complexity based on performance
          const quality = this.performanceMonitor.getQualityLevel()

          if (quality === 'low') {
            material.roughness = Math.max(0.5, material.roughness)
            material.metalness = Math.min(0.5, material.metalness)
            material.envMapIntensity = 0.5
          } else if (quality === 'medium') {
            material.envMapIntensity = 0.75
          }
        }
      }
    })
  }

  enableFrustumCulling() {
    this.scene.traverse((object) => {
      object.frustumCulled = true
    })
  }

  mergeGeometries(meshes: THREE.Mesh[]): THREE.Mesh | null {
    if (meshes.length === 0) return null

    const geometries = meshes.map(mesh => mesh.geometry as THREE.BufferGeometry)
    const materials = meshes.map(mesh => mesh.material)

    // Check if all materials are the same
    const firstMaterial = materials[0]
    const sameMaterial = materials.every(mat => mat === firstMaterial)

    if (!sameMaterial) {
      console.warn('Cannot merge geometries with different materials')
      return null
    }

    // Merge geometries
    const mergedGeometry = new THREE.BufferGeometry()
    const positions: number[] = []
    const normals: number[] = []
    const uvs: number[] = []

    geometries.forEach((geometry, index) => {
      const mesh = meshes[index]
      const positionAttribute = geometry.getAttribute('position')
      const normalAttribute = geometry.getAttribute('normal')
      const uvAttribute = geometry.getAttribute('uv')

      if (positionAttribute instanceof THREE.BufferAttribute) {
        const matrix = mesh.matrixWorld
        const posArray = positionAttribute.array

        for (let i = 0; i < posArray.length; i += 3) {
          const vertex = new THREE.Vector3(
            posArray[i],
            posArray[i + 1],
            posArray[i + 2]
          )
          vertex.applyMatrix4(matrix)
          positions.push(vertex.x, vertex.y, vertex.z)
        }
      }

      if (normalAttribute instanceof THREE.BufferAttribute) {
        normals.push(...Array.from(normalAttribute.array))
      }

      if (uvAttribute instanceof THREE.BufferAttribute) {
        uvs.push(...Array.from(uvAttribute.array))
      }
    })

    mergedGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    if (normals.length > 0) {
      mergedGeometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3))
    }
    if (uvs.length > 0) {
      mergedGeometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
    }

    return new THREE.Mesh(mergedGeometry, firstMaterial)
  }

  disposeObject(object: THREE.Object3D) {
    if (object instanceof THREE.Mesh) {
      object.geometry.dispose()

      if (object.material instanceof THREE.Material) {
        object.material.dispose()
      } else if (Array.isArray(object.material)) {
        object.material.forEach(material => material.dispose())
      }
    }

    // Recursively dispose children
    while (object.children.length > 0) {
      this.disposeObject(object.children[0])
      object.remove(object.children[0])
    }
  }

  getStats() {
    return {
      fps: this.performanceMonitor.getAverageFPS(),
      quality: this.performanceMonitor.getQualityLevel(),
      meshes: this.scene.children.filter(o => o instanceof THREE.Mesh).length,
      lights: this.scene.children.filter(o => o instanceof THREE.Light).length,
      geometries: this.countGeometries(),
      textures: this.countTextures()
    }
  }

  private countGeometries(): number {
    const geometries = new Set<THREE.BufferGeometry>()
    this.scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        geometries.add(object.geometry as THREE.BufferGeometry)
      }
    })
    return geometries.size
  }

  private countTextures(): number {
    const textures = new Set<THREE.Texture>()
    this.scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        const material = object.material
        if (material instanceof THREE.MeshStandardMaterial) {
          if (material.map) textures.add(material.map)
          if (material.normalMap) textures.add(material.normalMap)
          if (material.roughnessMap) textures.add(material.roughnessMap)
          if (material.metalnessMap) textures.add(material.metalnessMap)
        }
      }
    })
    return textures.size
  }
}

// Export utility function for adaptive quality
export function getAdaptiveQuality(fps: number): {
  shadows: boolean
  antialias: boolean
  pixelRatio: number
  postProcessing: boolean
} {
  if (fps < 30) {
    return {
      shadows: false,
      antialias: false,
      pixelRatio: 1,
      postProcessing: false
    }
  } else if (fps < 50) {
    return {
      shadows: true,
      antialias: false,
      pixelRatio: Math.min(1.5, window.devicePixelRatio),
      postProcessing: false
    }
  } else {
    return {
      shadows: true,
      antialias: true,
      pixelRatio: Math.min(2, window.devicePixelRatio),
      postProcessing: true
    }
  }
}