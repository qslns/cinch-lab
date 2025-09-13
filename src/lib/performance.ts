// Performance Optimization Layer for CINCH LAB
// "Control the chaos, don't let it control you"

export class PerformanceMonitor {
  private frameCount = 0
  private lastTime = performance.now()
  private fps = 60
  private isLowPerformance = false
  private callbacks: Set<(fps: number) => void> = new Set()
  private rafId: number | null = null

  start() {
    if (this.rafId) return
    
    const measure = () => {
      const currentTime = performance.now()
      const delta = currentTime - this.lastTime
      
      if (delta >= 1000) {
        this.fps = Math.round((this.frameCount * 1000) / delta)
        this.frameCount = 0
        this.lastTime = currentTime
        
        // Detect low performance
        this.isLowPerformance = this.fps < 30
        
        // Notify listeners
        this.callbacks.forEach(cb => cb(this.fps))
      }
      
      this.frameCount++
      this.rafId = requestAnimationFrame(measure)
    }
    
    measure()
  }

  stop() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
  }

  onFPSUpdate(callback: (fps: number) => void) {
    this.callbacks.add(callback)
    return () => this.callbacks.delete(callback)
  }

  getFPS() {
    return this.fps
  }

  isPerformanceLow() {
    return this.isLowPerformance
  }
}

// Throttled RAF for smooth animations
export class AnimationController {
  private animations = new Map<string, {
    callback: (progress: number) => void
    startTime: number
    duration: number
    easing?: (t: number) => number
  }>()
  private rafId: number | null = null
  private isPaused = false

  add(
    id: string, 
    callback: (progress: number) => void, 
    duration: number = 1000,
    easing?: (t: number) => number
  ) {
    this.animations.set(id, {
      callback,
      startTime: performance.now(),
      duration,
      easing: easing || ((t) => t) // Linear by default
    })
    
    if (!this.rafId && !this.isPaused) {
      this.start()
    }
  }

  remove(id: string) {
    this.animations.delete(id)
    if (this.animations.size === 0 && this.rafId) {
      this.stop()
    }
  }

  private start() {
    const animate = () => {
      const now = performance.now()
      
      this.animations.forEach((anim, id) => {
        const elapsed = now - anim.startTime
        const progress = Math.min(elapsed / anim.duration, 1)
        const easedProgress = anim.easing ? anim.easing(progress) : progress
        
        anim.callback(easedProgress)
        
        if (progress >= 1) {
          this.remove(id)
        }
      })
      
      if (this.animations.size > 0 && !this.isPaused) {
        this.rafId = requestAnimationFrame(animate)
      }
    }
    
    animate()
  }

  private stop() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
  }

  pause() {
    this.isPaused = true
    this.stop()
  }

  resume() {
    this.isPaused = false
    if (this.animations.size > 0) {
      this.start()
    }
  }

  clear() {
    this.animations.clear()
    this.stop()
  }
}

// Intersection Observer Manager for lazy loading effects
export class EffectObserver {
  private observer: IntersectionObserver
  private elements = new Map<Element, (entry: IntersectionObserverEntry) => void>()

  constructor(options?: IntersectionObserverInit) {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const callback = this.elements.get(entry.target)
        if (callback) {
          callback(entry)
        }
      })
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    })
  }

  observe(element: Element, callback: (entry: IntersectionObserverEntry) => void) {
    this.elements.set(element, callback)
    this.observer.observe(element)
  }

  unobserve(element: Element) {
    this.elements.delete(element)
    this.observer.unobserve(element)
  }

  disconnect() {
    this.observer.disconnect()
    this.elements.clear()
  }
}

// Debounce heavy operations
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle for scroll/resize events
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Check if device is mobile
export function isMobile(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth < 768
}

// GPU acceleration helper
export function enableGPU(element: HTMLElement) {
  element.style.transform = 'translateZ(0)'
  element.style.willChange = 'transform'
}

export function disableGPU(element: HTMLElement) {
  element.style.transform = ''
  element.style.willChange = ''
}

// Easing functions for animations
export const easings = {
  linear: (t: number) => t,
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  easeInCubic: (t: number) => t * t * t,
  easeOutCubic: (t: number) => (--t) * t * t + 1,
  easeInOutCubic: (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeInElastic: (t: number) => {
    const c4 = (2 * Math.PI) / 3
    return t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4)
  },
  easeOutElastic: (t: number) => {
    const c4 = (2 * Math.PI) / 3
    return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1
  }
}

// Singleton instances
export const performanceMonitor = new PerformanceMonitor()
export const animationController = new AnimationController()
export const effectObserver = new EffectObserver()