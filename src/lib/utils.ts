import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Animation variants for Framer Motion
export const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

export const slideIn = {
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 100, opacity: 0 }
}

export const scaleIn = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 }
}

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

// Random position generator for scattered layouts
export const getRandomPosition = (index: number) => {
  const positions = [
    { top: '5%', left: '10%' },
    { top: '15%', right: '8%' },
    { bottom: '20%', left: '15%' },
    { top: '40%', right: '20%' },
    { bottom: '10%', right: '12%' },
    { top: '60%', left: '5%' },
    { top: '25%', left: '40%' },
    { bottom: '35%', right: '35%' }
  ]
  return positions[index % positions.length]
}

// Micro interaction delays
export const getMicroDelay = (index: number) => index * 0.05

// Generate random size for asymmetric grids
export const getGridSpan = (index: number) => {
  const spans = [
    'col-span-1 row-span-1',
    'col-span-2 row-span-1',
    'col-span-1 row-span-2',
    'col-span-2 row-span-2',
    'col-span-1 row-span-3',
    'col-span-3 row-span-1'
  ]
  return spans[index % spans.length]
}