// Advanced React Optimization Hooks

import { useEffect, useRef, useState, useCallback, useMemo, DependencyList } from 'react'

// Debounce hook
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// Throttle hook
export function useThrottle<T>(value: T, limit: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value)
  const lastRun = useRef(Date.now())

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRun.current >= limit) {
        setThrottledValue(value)
        lastRun.current = Date.now()
      }
    }, limit - (Date.now() - lastRun.current))

    return () => {
      clearTimeout(handler)
    }
  }, [value, limit])

  return throttledValue
}

// Intersection Observer hook
interface UseIntersectionObserverProps {
  threshold?: number | number[]
  root?: Element | null
  rootMargin?: string
  freezeOnceVisible?: boolean
}

export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  {
    threshold = 0,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = false
  }: UseIntersectionObserverProps = {}
): IntersectionObserverEntry | undefined {
  const [entry, setEntry] = useState<IntersectionObserverEntry>()
  const frozen = useRef(false)

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry)
  }

  useEffect(() => {
    const node = elementRef?.current
    const hasIOSupport = !!window.IntersectionObserver

    if (!hasIOSupport || frozen.current || !node) return

    const observerParams = { threshold, root, rootMargin }
    const observer = new IntersectionObserver(updateEntry, observerParams)

    observer.observe(node)

    return () => observer.disconnect()
  }, [elementRef, threshold, root, rootMargin])

  useEffect(() => {
    if (entry?.isIntersecting && freezeOnceVisible) {
      frozen.current = true
    }
  }, [entry, freezeOnceVisible])

  return entry
}

// Lazy load hook
export function useLazyLoad<T>(
  loader: () => Promise<T>,
  dependencies: DependencyList = []
): {
  data: T | null
  loading: boolean
  error: Error | null
  reload: () => void
} {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await loader()
      setData(result)
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }, [loader, ...dependencies])

  useEffect(() => {
    load()
  }, [load])

  return { data, loading, error, reload: load }
}

// Virtual scroll hook
interface VirtualScrollOptions {
  itemHeight: number
  containerHeight: number
  buffer?: number
  overscan?: number
}

export function useVirtualScroll<T>(
  items: T[],
  options: VirtualScrollOptions
) {
  const { itemHeight, containerHeight, buffer = 3, overscan = 3 } = options
  const [scrollTop, setScrollTop] = useState(0)

  const startIndex = Math.max(
    0,
    Math.floor(scrollTop / itemHeight) - overscan
  )

  const endIndex = Math.min(
    items.length - 1,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
  )

  const visibleItems = items.slice(startIndex, endIndex + 1)

  const totalHeight = items.length * itemHeight

  const offsetY = startIndex * itemHeight

  const handleScroll = useCallback((e: React.UIEvent<HTMLElement>) => {
    setScrollTop(e.currentTarget.scrollTop)
  }, [])

  return {
    visibleItems,
    totalHeight,
    offsetY,
    handleScroll,
    startIndex,
    endIndex
  }
}

// Media query hook
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches)
    media.addEventListener('change', listener)

    return () => media.removeEventListener('change', listener)
  }, [matches, query])

  return matches
}

// Local storage hook with SSR support
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue]
}

// Performance monitoring hook
export function usePerformance(componentName: string) {
  const renderCount = useRef(0)
  const renderTime = useRef<number[]>([])
  const mountTime = useRef(performance.now())

  useEffect(() => {
    renderCount.current++
    const currentRenderTime = performance.now() - mountTime.current
    renderTime.current.push(currentRenderTime)

    if (process.env.NODE_ENV === 'development') {
      console.log(`[${componentName}] Render #${renderCount.current} at ${currentRenderTime.toFixed(2)}ms`)
    }
  })

  return {
    renderCount: renderCount.current,
    averageRenderTime: renderTime.current.reduce((a, b) => a + b, 0) / renderTime.current.length,
    lastRenderTime: renderTime.current[renderTime.current.length - 1]
  }
}

// Memoized event handler
export function useEventCallback<T extends (...args: any[]) => any>(
  fn: T,
  dependencies: DependencyList
): T {
  const ref = useRef<T>(fn)
  const memoizedFn = useRef<T | undefined>(undefined)

  useEffect(() => {
    ref.current = fn
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fn, ...dependencies])

  if (!memoizedFn.current) {
    memoizedFn.current = ((...args) => {
      return ref.current(...args)
    }) as T
  }

  return memoizedFn.current
}

// Async state hook
export function useAsyncState<T>(
  initialState: T
): [T, (newState: T | Promise<T>) => Promise<void>] {
  const [state, setState] = useState(initialState)

  const setAsyncState = useCallback(
    async (newState: T | Promise<T>) => {
      const resolvedState = await Promise.resolve(newState)
      setState(resolvedState)
    },
    []
  )

  return [state, setAsyncState]
}

// Window size hook
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

// Previous value hook
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

// Unmount hook
export function useUnmount(fn: () => void) {
  const fnRef = useRef(fn)
  fnRef.current = fn

  useEffect(() => () => fnRef.current(), [])
}

// Update effect hook (skip first render)
export function useUpdateEffect(effect: React.EffectCallback, deps?: DependencyList) {
  const isMounted = useRef(false)

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
    } else {
      return effect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

// Timeout hook
export function useTimeout(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (delay === null) return

    const id = setTimeout(() => savedCallback.current(), delay)

    return () => clearTimeout(id)
  }, [delay])
}

// Interval hook
export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (delay === null) return

    const id = setInterval(() => savedCallback.current(), delay)

    return () => clearInterval(id)
  }, [delay])
}

// Click outside hook
export function useClickOutside(
  ref: React.RefObject<HTMLElement>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }
      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}

// Hover hook
export function useHover<T extends HTMLElement = HTMLElement>() {
  const [hovered, setHovered] = useState(false)
  const ref = useRef<T>(null)

  const handleMouseEnter = useCallback(() => setHovered(true), [])
  const handleMouseLeave = useCallback(() => setHovered(false), [])

  useEffect(() => {
    const node = ref.current
    if (!node) return

    node.addEventListener('mouseenter', handleMouseEnter)
    node.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      node.removeEventListener('mouseenter', handleMouseEnter)
      node.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [handleMouseEnter, handleMouseLeave])

  return [ref, hovered] as const
}