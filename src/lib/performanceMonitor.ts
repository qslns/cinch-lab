// Advanced Performance Monitoring System

interface PerformanceMetrics {
  fps: number
  memory: {
    used: number
    limit: number
    percent: number
  }
  timing: {
    domContentLoaded: number
    loadComplete: number
    firstPaint: number
    firstContentfulPaint: number
    largestContentfulPaint: number
    firstInputDelay: number
    cumulativeLayoutShift: number
    timeToInteractive: number
  }
  resources: {
    images: number
    scripts: number
    stylesheets: number
    fonts: number
    total: number
  }
  network: {
    rtt: number
    downlink: number
    effectiveType: string
    saveData: boolean
  }
}

export class PerformanceMonitor {
  private metrics: PerformanceMetrics
  private observers: Map<string, PerformanceObserver> = new Map()
  private rafId: number | null = null
  private frameCount = 0
  private lastFrameTime = 0
  private fpsHistory: number[] = []
  private callbacks: Set<(metrics: PerformanceMetrics) => void> = new Set()

  constructor() {
    this.metrics = this.initializeMetrics()
    this.setupObservers()
    this.startMonitoring()
  }

  private initializeMetrics(): PerformanceMetrics {
    return {
      fps: 60,
      memory: {
        used: 0,
        limit: 0,
        percent: 0
      },
      timing: {
        domContentLoaded: 0,
        loadComplete: 0,
        firstPaint: 0,
        firstContentfulPaint: 0,
        largestContentfulPaint: 0,
        firstInputDelay: 0,
        cumulativeLayoutShift: 0,
        timeToInteractive: 0
      },
      resources: {
        images: 0,
        scripts: 0,
        stylesheets: 0,
        fonts: 0,
        total: 0
      },
      network: {
        rtt: 0,
        downlink: 0,
        effectiveType: 'unknown',
        saveData: false
      }
    }
  }

  private setupObservers() {
    if (typeof window === 'undefined') return

    // Paint timing observer
    try {
      const paintObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-paint') {
            this.metrics.timing.firstPaint = entry.startTime
          } else if (entry.name === 'first-contentful-paint') {
            this.metrics.timing.firstContentfulPaint = entry.startTime
          }
        }
      })
      paintObserver.observe({ entryTypes: ['paint'] })
      this.observers.set('paint', paintObserver)
    } catch (e) {
      console.warn('Paint observer not supported')
    }

    // Largest Contentful Paint observer
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        if (lastEntry) {
          this.metrics.timing.largestContentfulPaint = lastEntry.startTime
        }
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
      this.observers.set('lcp', lcpObserver)
    } catch (e) {
      console.warn('LCP observer not supported')
    }

    // First Input Delay observer
    try {
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if ('processingStart' in entry) {
            const fid = (entry as any).processingStart - entry.startTime
            this.metrics.timing.firstInputDelay = Math.max(
              this.metrics.timing.firstInputDelay,
              fid
            )
          }
        }
      })
      fidObserver.observe({ entryTypes: ['first-input'] })
      this.observers.set('fid', fidObserver)
    } catch (e) {
      console.warn('FID observer not supported')
    }

    // Layout Shift observer
    try {
      let clsValue = 0
      let clsEntries: any[] = []

      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsEntries.push(entry)
            clsValue += (entry as any).value
          }
        }
        this.metrics.timing.cumulativeLayoutShift = clsValue
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })
      this.observers.set('cls', clsObserver)
    } catch (e) {
      console.warn('CLS observer not supported')
    }

    // Navigation timing
    if (window.performance && window.performance.timing) {
      const timing = window.performance.timing
      this.metrics.timing.domContentLoaded = timing.domContentLoadedEventEnd - timing.navigationStart
      this.metrics.timing.loadComplete = timing.loadEventEnd - timing.navigationStart
    }

    // Network information
    if ('connection' in navigator) {
      const connection = (navigator as any).connection
      this.metrics.network = {
        rtt: connection.rtt || 0,
        downlink: connection.downlink || 0,
        effectiveType: connection.effectiveType || 'unknown',
        saveData: connection.saveData || false
      }
    }
  }

  private startMonitoring() {
    if (typeof window === 'undefined') return

    const measureFPS = (timestamp: number) => {
      if (this.lastFrameTime) {
        const delta = timestamp - this.lastFrameTime
        const fps = 1000 / delta

        this.fpsHistory.push(fps)
        if (this.fpsHistory.length > 60) {
          this.fpsHistory.shift()
        }

        this.metrics.fps = Math.round(
          this.fpsHistory.reduce((a, b) => a + b, 0) / this.fpsHistory.length
        )
      }

      this.lastFrameTime = timestamp
      this.frameCount++

      // Update memory usage
      if ('memory' in performance) {
        const memory = (performance as any).memory
        this.metrics.memory = {
          used: memory.usedJSHeapSize,
          limit: memory.jsHeapSizeLimit,
          percent: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100
        }
      }

      // Update resource counts
      this.updateResourceCounts()

      // Notify callbacks
      if (this.frameCount % 60 === 0) {
        this.notifyCallbacks()
      }

      this.rafId = requestAnimationFrame(measureFPS)
    }

    this.rafId = requestAnimationFrame(measureFPS)
  }

  private updateResourceCounts() {
    if (!window.performance || !window.performance.getEntriesByType) return

    const resources = window.performance.getEntriesByType('resource')

    this.metrics.resources = {
      images: 0,
      scripts: 0,
      stylesheets: 0,
      fonts: 0,
      total: resources.length
    }

    resources.forEach((resource: any) => {
      if (resource.initiatorType === 'img') {
        this.metrics.resources.images++
      } else if (resource.initiatorType === 'script') {
        this.metrics.resources.scripts++
      } else if (resource.initiatorType === 'css' || resource.initiatorType === 'link') {
        this.metrics.resources.stylesheets++
      } else if (resource.initiatorType === 'font') {
        this.metrics.resources.fonts++
      }
    })
  }

  private notifyCallbacks() {
    this.callbacks.forEach(callback => callback(this.metrics))
  }

  public subscribe(callback: (metrics: PerformanceMetrics) => void) {
    this.callbacks.add(callback)
    return () => this.callbacks.delete(callback)
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics }
  }

  public getWebVitals() {
    return {
      LCP: this.metrics.timing.largestContentfulPaint,
      FID: this.metrics.timing.firstInputDelay,
      CLS: this.metrics.timing.cumulativeLayoutShift,
      FCP: this.metrics.timing.firstContentfulPaint,
      TTFB: this.metrics.timing.firstPaint
    }
  }

  public destroy() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId)
    }

    this.observers.forEach(observer => observer.disconnect())
    this.observers.clear()
    this.callbacks.clear()
  }
}

// Performance Budgets
export class PerformanceBudget {
  private budgets = {
    fps: { min: 30, target: 60 },
    memory: { max: 50 }, // MB
    loadTime: { max: 3000 }, // ms
    firstPaint: { max: 1000 },
    firstContentfulPaint: { max: 1500 },
    largestContentfulPaint: { max: 2500 },
    firstInputDelay: { max: 100 },
    cumulativeLayoutShift: { max: 0.1 },
    bundleSize: { max: 500 }, // KB
    imageSize: { max: 200 }, // KB per image
    totalRequests: { max: 50 }
  }

  checkBudget(metrics: PerformanceMetrics): {
    passed: boolean
    violations: string[]
  } {
    const violations: string[] = []

    if (metrics.fps < this.budgets.fps.min) {
      violations.push(`FPS below minimum: ${metrics.fps} < ${this.budgets.fps.min}`)
    }

    if (metrics.memory.used > this.budgets.memory.max * 1024 * 1024) {
      violations.push(`Memory usage exceeded: ${(metrics.memory.used / 1024 / 1024).toFixed(2)}MB > ${this.budgets.memory.max}MB`)
    }

    if (metrics.timing.largestContentfulPaint > this.budgets.largestContentfulPaint.max) {
      violations.push(`LCP exceeded: ${metrics.timing.largestContentfulPaint}ms > ${this.budgets.largestContentfulPaint.max}ms`)
    }

    if (metrics.timing.firstInputDelay > this.budgets.firstInputDelay.max) {
      violations.push(`FID exceeded: ${metrics.timing.firstInputDelay}ms > ${this.budgets.firstInputDelay.max}ms`)
    }

    if (metrics.timing.cumulativeLayoutShift > this.budgets.cumulativeLayoutShift.max) {
      violations.push(`CLS exceeded: ${metrics.timing.cumulativeLayoutShift} > ${this.budgets.cumulativeLayoutShift.max}`)
    }

    return {
      passed: violations.length === 0,
      violations
    }
  }
}

// Resource Timing Analysis
export class ResourceTimingAnalyzer {
  analyze(): {
    slowestResources: any[]
    largestResources: any[]
    failedResources: any[]
    totalSize: number
    totalDuration: number
  } {
    if (!window.performance || !window.performance.getEntriesByType) {
      return {
        slowestResources: [],
        largestResources: [],
        failedResources: [],
        totalSize: 0,
        totalDuration: 0
      }
    }

    const resources = window.performance.getEntriesByType('resource') as any[]

    const slowestResources = [...resources]
      .sort((a, b) => b.duration - a.duration)
      .slice(0, 10)
      .map(r => ({
        name: r.name,
        duration: r.duration,
        size: r.transferSize,
        type: r.initiatorType
      }))

    const largestResources = [...resources]
      .filter(r => r.transferSize)
      .sort((a, b) => b.transferSize - a.transferSize)
      .slice(0, 10)
      .map(r => ({
        name: r.name,
        duration: r.duration,
        size: r.transferSize,
        type: r.initiatorType
      }))

    const failedResources = resources
      .filter(r => r.responseStatus >= 400 || r.responseStatus === 0)
      .map(r => ({
        name: r.name,
        status: r.responseStatus,
        type: r.initiatorType
      }))

    const totalSize = resources.reduce((sum, r) => sum + (r.transferSize || 0), 0)
    const totalDuration = resources.reduce((sum, r) => sum + r.duration, 0)

    return {
      slowestResources,
      largestResources,
      failedResources,
      totalSize,
      totalDuration
    }
  }
}

// Performance Recommendations
export class PerformanceAdvisor {
  getRecommendations(metrics: PerformanceMetrics): string[] {
    const recommendations: string[] = []

    // FPS recommendations
    if (metrics.fps < 30) {
      recommendations.push('Critical: FPS is below 30. Consider reducing animations and visual effects.')
    } else if (metrics.fps < 50) {
      recommendations.push('Warning: FPS is below 50. Consider optimizing render-heavy components.')
    }

    // Memory recommendations
    if (metrics.memory.percent > 80) {
      recommendations.push('Critical: Memory usage is above 80%. Consider implementing cleanup and disposal.')
    } else if (metrics.memory.percent > 60) {
      recommendations.push('Warning: Memory usage is above 60%. Monitor for memory leaks.')
    }

    // Loading performance
    if (metrics.timing.largestContentfulPaint > 4000) {
      recommendations.push('LCP is above 4s. Optimize critical rendering path and lazy load non-critical resources.')
    }

    if (metrics.timing.firstInputDelay > 300) {
      recommendations.push('FID is above 300ms. Reduce JavaScript execution time and break up long tasks.')
    }

    if (metrics.timing.cumulativeLayoutShift > 0.25) {
      recommendations.push('CLS is above 0.25. Add size attributes to images and avoid injecting content above existing content.')
    }

    // Resource recommendations
    if (metrics.resources.images > 50) {
      recommendations.push('Too many image requests. Consider implementing image sprites or lazy loading.')
    }

    if (metrics.resources.scripts > 20) {
      recommendations.push('Too many script files. Consider bundling and code splitting.')
    }

    // Network recommendations
    if (metrics.network.effectiveType === '2g' || metrics.network.effectiveType === 'slow-2g') {
      recommendations.push('User is on slow network. Implement adaptive loading and reduce resource sizes.')
    }

    if (metrics.network.saveData) {
      recommendations.push('User has data saver enabled. Reduce media quality and defer non-critical resources.')
    }

    return recommendations
  }
}

// Export singleton instance
export const performanceMonitor = typeof window !== 'undefined' ? new PerformanceMonitor() : null
export const performanceBudget = new PerformanceBudget()
export const resourceAnalyzer = typeof window !== 'undefined' ? new ResourceTimingAnalyzer() : null
export const performanceAdvisor = new PerformanceAdvisor()