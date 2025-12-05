'use client'

import { memo, useMemo, CSSProperties, useId } from 'react'

// ============================================
// GRAIN TEXT COMPONENT
// Textured typography with noise/grain effects
// Photocopy/risograph aesthetic
// ============================================

type GrainVariant = 'subtle' | 'medium' | 'strong' | 'photocopy' | 'risograph' | 'vintage'
type TextSize = 'display' | 'title' | 'heading' | 'body'

interface GrainTextProps {
  text: string
  variant?: GrainVariant
  size?: TextSize
  grainOpacity?: number
  grainScale?: number
  className?: string
  style?: CSSProperties
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
  color?: string
  animated?: boolean
}

// Frozen size configurations
const SIZE_STYLES = Object.freeze<Record<TextSize, CSSProperties>>({
  display: {
    fontSize: 'clamp(3rem, 12vw, 10rem)',
    lineHeight: 0.85,
    letterSpacing: '-0.04em',
    fontWeight: 300,
    fontFamily: 'var(--font-serif), Georgia, serif',
  },
  title: {
    fontSize: 'clamp(2rem, 6vw, 5rem)',
    lineHeight: 0.9,
    letterSpacing: '-0.03em',
    fontWeight: 300,
    fontFamily: 'var(--font-serif), Georgia, serif',
  },
  heading: {
    fontSize: 'clamp(1.5rem, 4vw, 3rem)',
    lineHeight: 1,
    letterSpacing: '-0.02em',
    fontWeight: 300,
    fontFamily: 'var(--font-serif), Georgia, serif',
  },
  body: {
    fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
    lineHeight: 1.6,
    letterSpacing: '-0.01em',
    fontWeight: 400,
    fontFamily: 'var(--font-sans), system-ui, sans-serif',
  },
})

// Grain variant configurations
const GRAIN_CONFIGS = Object.freeze<
  Record<GrainVariant, { baseFrequency: number; numOctaves: number; opacity: number }>
>({
  subtle: { baseFrequency: 0.65, numOctaves: 3, opacity: 0.08 },
  medium: { baseFrequency: 0.75, numOctaves: 4, opacity: 0.15 },
  strong: { baseFrequency: 0.85, numOctaves: 5, opacity: 0.25 },
  photocopy: { baseFrequency: 0.9, numOctaves: 4, opacity: 0.2 },
  risograph: { baseFrequency: 0.6, numOctaves: 3, opacity: 0.12 },
  vintage: { baseFrequency: 0.5, numOctaves: 2, opacity: 0.18 },
})

function GrainText({
  text,
  variant = 'subtle',
  size = 'title',
  grainOpacity,
  grainScale,
  className = '',
  style = {},
  as: Component = 'span',
  color = '#1a1a1a',
  animated = false,
}: GrainTextProps) {
  const filterId = useId()
  const config = GRAIN_CONFIGS[variant]
  const sizeStyle = SIZE_STYLES[size]

  const finalOpacity = grainOpacity ?? config.opacity
  const finalScale = grainScale ?? config.baseFrequency

  const containerStyle: CSSProperties = useMemo(
    () => ({
      position: 'relative' as const,
      display: 'inline-block',
      color,
      ...sizeStyle,
      ...style,
    }),
    [color, sizeStyle, style]
  )

  const grainOverlayStyle: CSSProperties = useMemo(
    () => ({
      position: 'absolute' as const,
      inset: '-20%', // Extend beyond text for edge coverage
      pointerEvents: 'none' as const,
      mixBlendMode: 'overlay' as const,
      opacity: finalOpacity,
      filter: `url(#${filterId})`,
      zIndex: 1,
      ...(animated && {
        animation: 'grainShift 0.5s steps(4) infinite',
      }),
    }),
    [filterId, finalOpacity, animated]
  )

  return (
    <>
      {/* SVG Filter Definition */}
      <svg
        style={{
          position: 'absolute',
          width: 0,
          height: 0,
          overflow: 'hidden',
        }}
        aria-hidden="true"
      >
        <defs>
          <filter id={filterId}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency={finalScale}
              numOctaves={config.numOctaves}
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              type="saturate"
              values="0"
              in="noise"
              result="monoNoise"
            />
            <feBlend
              mode="multiply"
              in="SourceGraphic"
              in2="monoNoise"
            />
          </filter>
        </defs>
      </svg>

      <Component className={`grain-text grain-text--${variant} ${className}`} style={containerStyle}>
        {/* Main text */}
        <span style={{ position: 'relative', zIndex: 2 }}>{text}</span>

        {/* Grain overlay */}
        <span style={grainOverlayStyle} aria-hidden="true" />
      </Component>

      {/* Animation keyframes (injected once) */}
      {animated && (
        <style jsx global>{`
          @keyframes grainShift {
            0%, 100% { transform: translate(0, 0); }
            25% { transform: translate(1px, -1px); }
            50% { transform: translate(-1px, 1px); }
            75% { transform: translate(1px, 1px); }
          }
        `}</style>
      )}
    </>
  )
}

export default memo(GrainText)

// Pre-configured exports

// Display text with subtle grain
export const GrainDisplay = memo(function GrainDisplay(
  props: Omit<GrainTextProps, 'size'>
) {
  return <GrainText {...props} size="display" as="h1" />
})

// Title with photocopy effect
export const PhotocopyTitle = memo(function PhotocopyTitle(
  props: Omit<GrainTextProps, 'variant' | 'size'>
) {
  return <GrainText {...props} variant="photocopy" size="title" as="h2" />
})

// Risograph style text
export const RisographText = memo(function RisographText(
  props: Omit<GrainTextProps, 'variant'>
) {
  return <GrainText {...props} variant="risograph" />
})

// Vintage degraded text
export const VintageText = memo(function VintageText(
  props: Omit<GrainTextProps, 'variant'>
) {
  return <GrainText {...props} variant="vintage" />
})

// Animated grain (for hover states or emphasis)
export const AnimatedGrainText = memo(function AnimatedGrainText(
  props: Omit<GrainTextProps, 'animated'>
) {
  return <GrainText {...props} animated />
})
