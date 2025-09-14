// Advanced Image Loading and Optimization Utilities

interface ImageLoadOptions {
  quality?: number
  priority?: boolean
  placeholder?: 'blur' | 'empty' | 'shimmer'
  onLoad?: () => void
  onError?: (error: Error) => void
  retry?: number
  timeout?: number
}

interface ImageDimensions {
  width: number
  height: number
  aspectRatio: number
}

export class ProgressiveImageLoader {
  private loadQueue: Map<string, Promise<HTMLImageElement>> = new Map()
  private imageCache: Map<string, HTMLImageElement> = new Map()
  private observers: Map<string, IntersectionObserver> = new Map()
  private loadingPriorities: Map<string, number> = new Map()

  constructor(private maxConcurrent: number = 3) {}

  async loadImage(
    src: string,
    options: ImageLoadOptions = {}
  ): Promise<HTMLImageElement> {
    // Check cache first
    const cached = this.imageCache.get(src)
    if (cached) {
      options.onLoad?.()
      return cached
    }

    // Check if already loading
    const loading = this.loadQueue.get(src)
    if (loading) return loading

    // Create loading promise
    const loadPromise = this.createLoadPromise(src, options)
    this.loadQueue.set(src, loadPromise)

    try {
      const img = await loadPromise
      this.imageCache.set(src, img)
      this.loadQueue.delete(src)
      return img
    } catch (error) {
      this.loadQueue.delete(src)
      throw error
    }
  }

  private createLoadPromise(
    src: string,
    options: ImageLoadOptions
  ): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      let retryCount = 0
      const maxRetries = options.retry ?? 3
      const timeout = options.timeout ?? 30000

      const timeoutId = setTimeout(() => {
        reject(new Error(`Image load timeout: ${src}`))
      }, timeout)

      const attemptLoad = () => {
        img.onload = () => {
          clearTimeout(timeoutId)
          options.onLoad?.()
          resolve(img)
        }

        img.onerror = () => {
          if (retryCount < maxRetries) {
            retryCount++
            setTimeout(attemptLoad, 1000 * retryCount)
          } else {
            clearTimeout(timeoutId)
            const error = new Error(`Failed to load image: ${src}`)
            options.onError?.(error)
            reject(error)
          }
        }

        img.src = src
      }

      attemptLoad()
    })
  }

  createLazyLoader(rootMargin = '50px'): IntersectionObserver {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            const dataSrc = img.dataset.src

            if (dataSrc && !img.src.includes(dataSrc)) {
              this.loadImage(dataSrc, {
                onLoad: () => {
                  img.src = dataSrc
                  img.classList.add('loaded')
                  observer.unobserve(img)
                }
              })
            }
          }
        })
      },
      { rootMargin }
    )

    return observer
  }

  preloadImages(urls: string[], priority = false): Promise<void[]> {
    const promises = urls.map((url, index) => {
      this.loadingPriorities.set(url, priority ? 0 : index)
      return this.loadImage(url).then(() => undefined)
    })

    return Promise.all(promises)
  }

  clearCache() {
    this.imageCache.clear()
    this.loadQueue.clear()
    this.observers.forEach(observer => observer.disconnect())
    this.observers.clear()
  }
}

export class ImageOptimizer {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D

  constructor() {
    this.canvas = document.createElement('canvas')
    const ctx = this.canvas.getContext('2d')
    if (!ctx) throw new Error('Canvas context not available')
    this.ctx = ctx
  }

  async resizeImage(
    img: HTMLImageElement,
    maxWidth: number,
    maxHeight: number,
    quality = 0.9
  ): Promise<Blob> {
    const { width, height } = this.calculateDimensions(
      img.width,
      img.height,
      maxWidth,
      maxHeight
    )

    this.canvas.width = width
    this.canvas.height = height

    this.ctx.drawImage(img, 0, 0, width, height)

    return new Promise((resolve, reject) => {
      this.canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob)
          else reject(new Error('Failed to create blob'))
        },
        'image/webp',
        quality
      )
    })
  }

  private calculateDimensions(
    originalWidth: number,
    originalHeight: number,
    maxWidth: number,
    maxHeight: number
  ): ImageDimensions {
    const aspectRatio = originalWidth / originalHeight

    let width = originalWidth
    let height = originalHeight

    if (width > maxWidth) {
      width = maxWidth
      height = width / aspectRatio
    }

    if (height > maxHeight) {
      height = maxHeight
      width = height * aspectRatio
    }

    return {
      width: Math.round(width),
      height: Math.round(height),
      aspectRatio
    }
  }

  async generateBlurHash(
    img: HTMLImageElement,
    componentX = 4,
    componentY = 3
  ): Promise<string> {
    // Simplified blur hash generation
    const width = 32
    const height = 32

    this.canvas.width = width
    this.canvas.height = height

    this.ctx.drawImage(img, 0, 0, width, height)

    const imageData = this.ctx.getImageData(0, 0, width, height)
    const pixels = imageData.data

    // Generate a simple hash based on average colors
    let r = 0, g = 0, b = 0
    for (let i = 0; i < pixels.length; i += 4) {
      r += pixels[i]
      g += pixels[i + 1]
      b += pixels[i + 2]
    }

    const pixelCount = pixels.length / 4
    r = Math.round(r / pixelCount)
    g = Math.round(g / pixelCount)
    b = Math.round(b / pixelCount)

    return `blur:${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
  }

  async generateThumbnail(
    img: HTMLImageElement,
    size = 64
  ): Promise<string> {
    this.canvas.width = size
    this.canvas.height = size

    this.ctx.drawImage(img, 0, 0, size, size)

    return this.canvas.toDataURL('image/webp', 0.6)
  }
}

export class ResponsiveImageSet {
  private breakpoints = [640, 768, 1024, 1280, 1536, 1920]

  generateSrcSet(
    basePath: string,
    extension = 'webp'
  ): string {
    return this.breakpoints
      .map(width => `${basePath}?w=${width}&fm=${extension} ${width}w`)
      .join(', ')
  }

  generateSizes(config: {
    mobile?: string
    tablet?: string
    desktop?: string
  }): string {
    const { mobile = '100vw', tablet = '50vw', desktop = '33vw' } = config

    return [
      `(max-width: 640px) ${mobile}`,
      `(max-width: 1024px) ${tablet}`,
      desktop
    ].join(', ')
  }

  getOptimalFormat(): string {
    if (typeof window === 'undefined') return 'webp'

    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = 1

    const formats = [
      { type: 'image/avif', ext: 'avif' },
      { type: 'image/webp', ext: 'webp' },
      { type: 'image/jpeg', ext: 'jpg' }
    ]

    for (const format of formats) {
      const dataUrl = canvas.toDataURL(format.type)
      if (dataUrl.startsWith(`data:${format.type}`)) {
        return format.ext
      }
    }

    return 'jpg'
  }
}

// Virtual Scrolling for large image grids
export class VirtualImageGrid {
  private container: HTMLElement
  private items: any[]
  private itemHeight: number
  private visibleRange = { start: 0, end: 0 }
  private scrollTop = 0

  constructor(
    container: HTMLElement,
    items: any[],
    itemHeight: number,
    private columns = 3
  ) {
    this.container = container
    this.items = items
    this.itemHeight = itemHeight

    this.init()
  }

  private init() {
    this.container.style.position = 'relative'
    this.container.style.overflow = 'auto'

    const totalHeight = Math.ceil(this.items.length / this.columns) * this.itemHeight
    const spacer = document.createElement('div')
    spacer.style.height = `${totalHeight}px`
    this.container.appendChild(spacer)

    this.container.addEventListener('scroll', this.handleScroll.bind(this))
    this.updateVisibleRange()
  }

  private handleScroll() {
    this.scrollTop = this.container.scrollTop
    this.updateVisibleRange()
  }

  private updateVisibleRange() {
    const containerHeight = this.container.clientHeight
    const startRow = Math.floor(this.scrollTop / this.itemHeight)
    const endRow = Math.ceil((this.scrollTop + containerHeight) / this.itemHeight)

    this.visibleRange = {
      start: startRow * this.columns,
      end: Math.min(endRow * this.columns, this.items.length)
    }

    this.render()
  }

  private render() {
    // Clear existing items
    const existingItems = this.container.querySelectorAll('.virtual-item')
    existingItems.forEach(item => item.remove())

    // Render visible items
    for (let i = this.visibleRange.start; i < this.visibleRange.end; i++) {
      const item = this.items[i]
      if (!item) continue

      const row = Math.floor(i / this.columns)
      const col = i % this.columns

      const element = this.createItemElement(item, row, col)
      this.container.appendChild(element)
    }
  }

  private createItemElement(item: any, row: number, col: number): HTMLElement {
    const element = document.createElement('div')
    element.className = 'virtual-item'
    element.style.position = 'absolute'
    element.style.top = `${row * this.itemHeight}px`
    element.style.left = `${(col * 100) / this.columns}%`
    element.style.width = `${100 / this.columns}%`
    element.style.height = `${this.itemHeight}px`

    // Add image or content
    const img = document.createElement('img')
    img.dataset.src = item.src
    img.className = 'lazy-load'
    element.appendChild(img)

    return element
  }
}

// Adaptive Loading based on network conditions
export class AdaptiveImageLoader {
  private connection: any

  constructor() {
    if (typeof window !== 'undefined' && 'connection' in navigator) {
      this.connection = (navigator as any).connection
    }
  }

  getNetworkQuality(): 'slow' | 'medium' | 'fast' {
    if (!this.connection) return 'medium'

    const effectiveType = this.connection.effectiveType
    const downlink = this.connection.downlink

    if (effectiveType === 'slow-2g' || effectiveType === '2g') {
      return 'slow'
    }

    if (effectiveType === '4g' && downlink > 5) {
      return 'fast'
    }

    return 'medium'
  }

  getOptimalImageQuality(): number {
    const quality = this.getNetworkQuality()

    switch (quality) {
      case 'slow':
        return 0.5
      case 'fast':
        return 0.95
      default:
        return 0.75
    }
  }

  shouldLoadHighResolution(): boolean {
    return this.getNetworkQuality() === 'fast'
  }

  getImageUrl(basePath: string, options?: {
    width?: number
    quality?: number
    format?: string
  }): string {
    const networkQuality = this.getNetworkQuality()
    const quality = options?.quality ?? this.getOptimalImageQuality()
    const format = options?.format ?? 'webp'

    let width = options?.width ?? 1920
    if (networkQuality === 'slow') {
      width = Math.min(width, 800)
    } else if (networkQuality === 'medium') {
      width = Math.min(width, 1280)
    }

    return `${basePath}?w=${width}&q=${Math.round(quality * 100)}&fm=${format}`
  }
}

// Export singleton instances
export const progressiveLoader = new ProgressiveImageLoader()
export const imageOptimizer = new ImageOptimizer()
export const responsiveImageSet = new ResponsiveImageSet()
export const adaptiveLoader = new AdaptiveImageLoader()