'use client'

import { motion, MotionValue, TargetAndTransition, VariantLabels, Transition, ViewportOptions } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ImagePlaceholderProps {
  label?: string
  aspectRatio?: '3/4' | '4/5' | '1/1' | '16/9' | '2/3' | '4/3'
  variant?: 'light' | 'dark' | 'medium'
  className?: string
  style?: React.CSSProperties
  motionStyle?: {
    y?: MotionValue<number>
    x?: MotionValue<number>
    scale?: MotionValue<number>
    rotate?: MotionValue<number>
  }
  initial?: TargetAndTransition | VariantLabels
  animate?: TargetAndTransition | VariantLabels
  transition?: Transition
  whileInView?: TargetAndTransition | VariantLabels
  viewport?: ViewportOptions
}

const variantStyles = {
  light: 'bg-yon-platinum text-yon-grey',
  medium: 'bg-yon-silver text-yon-graphite',
  dark: 'bg-yon-charcoal text-yon-silver',
}

export default function ImagePlaceholder({
  label = 'IMAGE',
  aspectRatio = '3/4',
  variant = 'light',
  className,
  style,
  motionStyle,
  initial,
  animate,
  transition,
  whileInView,
  viewport,
}: ImagePlaceholderProps) {
  return (
    <motion.div
      className={cn(
        'relative overflow-hidden',
        variantStyles[variant],
        className
      )}
      style={{
        aspectRatio,
        ...style,
        ...motionStyle,
      }}
      initial={initial}
      animate={animate}
      transition={transition}
      whileInView={whileInView}
      viewport={viewport}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-mono text-xs tracking-widest uppercase">
          {label}
        </span>
      </div>
    </motion.div>
  )
}
