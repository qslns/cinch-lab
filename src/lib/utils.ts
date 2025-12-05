import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Easing } from "framer-motion"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// THE YON custom easing - frozen constants for better performance
export const EASING = Object.freeze({
  yon: [0.22, 1, 0.36, 1] as const,
  yonOut: [0.16, 1, 0.3, 1] as const,
  yonIn: [0.4, 0, 1, 1] as const,
})

export const yonEase: Easing = EASING.yon
export const yonEaseOut: Easing = EASING.yonOut
export const yonEaseIn: Easing = EASING.yonIn

// Animation variants - frozen singletons (no re-creation on each render)
export const fadeIn = Object.freeze({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
})

export const slideIn = Object.freeze({
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 100, opacity: 0 }
})

export const scaleIn = Object.freeze({
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 }
})

export const staggerContainer = Object.freeze({
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
})

// Pre-computed positions array - no recalculation needed
const POSITIONS = Object.freeze([
  { top: '5%', left: '10%' },
  { top: '15%', right: '8%' },
  { bottom: '20%', left: '15%' },
  { top: '40%', right: '20%' },
  { bottom: '10%', right: '12%' },
  { top: '60%', left: '5%' },
  { top: '25%', left: '40%' },
  { bottom: '35%', right: '35%' }
] as const)

export const getRandomPosition = (index: number) => POSITIONS[index % POSITIONS.length]

// Micro delay - simple multiplication
export const getMicroDelay = (index: number): number => index * 0.05

// Pre-computed grid spans
const GRID_SPANS = Object.freeze([
  'col-span-1 row-span-1',
  'col-span-2 row-span-1',
  'col-span-1 row-span-2',
  'col-span-2 row-span-2',
  'col-span-1 row-span-3',
  'col-span-3 row-span-1'
] as const)

export const getGridSpan = (index: number): string => GRID_SPANS[index % GRID_SPANS.length]

// Throttle utility for scroll/resize handlers
export function throttle<T extends (...args: Parameters<T>) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => { inThrottle = false }, limit)
    }
  }
}

// Debounce utility for input handlers
export function debounce<T extends (...args: Parameters<T>) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}
