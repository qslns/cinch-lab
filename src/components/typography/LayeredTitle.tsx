'use client'

import { memo, useMemo, CSSProperties, ReactNode } from 'react'

// ============================================
// LAYERED TITLE COMPONENT
// GEDOKU style layered/offset text
// Multiple shadow layers, blend modes
// ============================================

type LayerStyle = 'offset' | 'echo' | 'glitch' | 'shadow' | 'double' | 'triple'
type BlendMode = 'normal' | 'multiply' | 'difference' | 'overlay' | 'screen'
type SizeVariant = 'hero' | 'large' | 'medium' | 'small'

interface LayeredTitleProps {
  text: string
  layerStyle?: LayerStyle
  blendMode?: BlendMode
  size?: SizeVariant
  offsetX?: number
  offsetY?: number
  layerColor?: string
  mainColor?: string
  layerOpacity?: number
  className?: string
  style?: CSSProperties
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div'
  // Character-level effects
  charRotation?: boolean
  rotationIntensity?: number
}

// Frozen size configurations
const SIZE_STYLES = Object.freeze<Record<SizeVariant, CSSProperties>>({
  hero: {
    fontSize: 'clamp(4rem, 18vw, 14rem)',
    lineHeight: 0.85,
    letterSpacing: '-0.04em',
    fontWeight: 300,
  },
  large: {
    fontSize: 'clamp(2.5rem, 10vw, 8rem)',
    lineHeight: 0.9,
    letterSpacing: '-0.03em',
    fontWeight: 300,
  },
  medium: {
    fontSize: 'clamp(1.75rem, 6vw, 4rem)',
    lineHeight: 0.95,
    letterSpacing: '-0.02em',
    fontWeight: 300,
  },
  small: {
    fontSize: 'clamp(1.25rem, 3vw, 2rem)',
    lineHeight: 1,
    letterSpacing: '-0.01em',
    fontWeight: 300,
  },
})

// Default layer configurations
const LAYER_CONFIGS = Object.freeze<
  Record<LayerStyle, { offset: [number, number]; opacity: number; color: string }>
>({
  offset: { offset: [3, 3], opacity: 0.2, color: '#8B7355' },
  echo: { offset: [6, 6], opacity: 0.1, color: '#0A0A0A' },
  glitch: { offset: [2, -2], opacity: 0.3, color: '#C41E3A' },
  shadow: { offset: [4, 4], opacity: 0.15, color: '#4A4A4A' },
  double: { offset: [2, 2], opacity: 0.25, color: '#8B7355' },
  triple: { offset: [2, 2], opacity: 0.2, color: '#8B7355' },
})

// Seeded random for consistent character rotation
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000
  return x - Math.floor(x)
}

// Character wrapper for individual rotation
const RotatedChar = memo(function RotatedChar({
  char,
  index,
  intensity,
}: {
  char: string
  index: number
  intensity: number
}) {
  const rotation = useMemo(() => {
    const rand = seededRandom(index * 17.89)
    return (rand - 0.5) * intensity
  }, [index, intensity])

  if (char === ' ') {
    return <span style={{ display: 'inline' }}>&nbsp;</span>
  }

  return (
    <span
      style={{
        display: 'inline-block',
        transform: `rotate(${rotation}deg)`,
        transition: 'transform 0.3s ease',
      }}
    >
      {char}
    </span>
  )
})

function LayeredTitle({
  text,
  layerStyle = 'offset',
  blendMode = 'normal',
  size = 'large',
  offsetX,
  offsetY,
  layerColor,
  mainColor = '#1a1a1a',
  layerOpacity,
  className = '',
  style = {},
  as: Component = 'h2',
  charRotation = false,
  rotationIntensity = 3,
}: LayeredTitleProps) {
  const config = LAYER_CONFIGS[layerStyle]
  const sizeStyle = SIZE_STYLES[size]

  // Calculate final offset and colors
  const finalOffsetX = offsetX ?? config.offset[0]
  const finalOffsetY = offsetY ?? config.offset[1]
  const finalLayerColor = layerColor ?? config.color
  const finalOpacity = layerOpacity ?? config.opacity

  // Container style
  const containerStyle: CSSProperties = useMemo(
    () => ({
      position: 'relative' as const,
      display: 'inline-block',
      fontFamily: 'var(--font-serif), Georgia, serif',
      ...sizeStyle,
      ...style,
    }),
    [sizeStyle, style]
  )

  // Main text style
  const mainTextStyle: CSSProperties = useMemo(
    () => ({
      position: 'relative' as const,
      zIndex: 2,
      color: mainColor,
    }),
    [mainColor]
  )

  // Layer styles based on layerStyle variant
  const layerStyles = useMemo(() => {
    const layers: CSSProperties[] = []

    const baseLayer: CSSProperties = {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      color: finalLayerColor,
      opacity: finalOpacity,
      mixBlendMode: blendMode,
      pointerEvents: 'none' as const,
      userSelect: 'none' as const,
      zIndex: 1,
    }

    switch (layerStyle) {
      case 'offset':
        layers.push({
          ...baseLayer,
          transform: `translate(${finalOffsetX}px, ${finalOffsetY}px)`,
        })
        break

      case 'echo':
        // Multiple fading layers
        layers.push({
          ...baseLayer,
          transform: `translate(${finalOffsetX}px, ${finalOffsetY}px)`,
          opacity: finalOpacity,
        })
        layers.push({
          ...baseLayer,
          transform: `translate(${finalOffsetX * 2}px, ${finalOffsetY * 2}px)`,
          opacity: finalOpacity * 0.5,
          zIndex: 0,
        })
        break

      case 'glitch':
        // RGB glitch effect - offset layers
        layers.push({
          ...baseLayer,
          transform: `translate(${finalOffsetX}px, ${-finalOffsetY / 2}px)`,
          color: '#C41E3A',
          opacity: 0.5,
          mixBlendMode: 'multiply' as const,
        })
        layers.push({
          ...baseLayer,
          transform: `translate(${-finalOffsetX}px, ${finalOffsetY / 2}px)`,
          color: '#1E3AC4',
          opacity: 0.4,
          mixBlendMode: 'multiply' as const,
          zIndex: 0,
        })
        break

      case 'shadow':
        layers.push({
          ...baseLayer,
          transform: `translate(${finalOffsetX}px, ${finalOffsetY}px)`,
          filter: 'blur(0.5px)',
        })
        break

      case 'double':
        // Two offset layers
        layers.push({
          ...baseLayer,
          transform: `translate(${finalOffsetX}px, ${finalOffsetY}px)`,
        })
        layers.push({
          ...baseLayer,
          transform: `translate(${-finalOffsetX * 0.5}px, ${-finalOffsetY * 0.5}px)`,
          opacity: finalOpacity * 0.6,
          color: '#4A4A4A',
          zIndex: 0,
        })
        break

      case 'triple':
        // Three layers with decreasing opacity
        layers.push({
          ...baseLayer,
          transform: `translate(${finalOffsetX}px, ${finalOffsetY}px)`,
        })
        layers.push({
          ...baseLayer,
          transform: `translate(${finalOffsetX * 2}px, ${finalOffsetY * 2}px)`,
          opacity: finalOpacity * 0.5,
          zIndex: 0,
        })
        layers.push({
          ...baseLayer,
          transform: `translate(${finalOffsetX * 3}px, ${finalOffsetY * 3}px)`,
          opacity: finalOpacity * 0.25,
          zIndex: -1,
        })
        break
    }

    return layers
  }, [layerStyle, finalOffsetX, finalOffsetY, finalLayerColor, finalOpacity, blendMode])

  // Render text with optional character rotation
  const renderText = (isMainText: boolean = true) => {
    if (charRotation && isMainText) {
      return text.split('').map((char, index) => (
        <RotatedChar
          key={`${index}-${char}`}
          char={char}
          index={index}
          intensity={rotationIntensity}
        />
      ))
    }
    return text
  }

  return (
    <Component className={`layered-title ${className}`} style={containerStyle}>
      {/* Background layers */}
      {layerStyles.map((layerStyle, index) => (
        <span key={index} style={layerStyle} aria-hidden="true">
          {text}
        </span>
      ))}

      {/* Main text */}
      <span style={mainTextStyle}>{renderText(true)}</span>

      {/* Screen reader text */}
      <span className="sr-only">{text}</span>
    </Component>
  )
}

export default memo(LayeredTitle)

// Pre-configured exports
export const HeroLayeredTitle = memo(function HeroLayeredTitle(
  props: Omit<LayeredTitleProps, 'size'>
) {
  return <LayeredTitle {...props} size="hero" as="h1" />
})

export const GlitchTitle = memo(function GlitchTitle(
  props: Omit<LayeredTitleProps, 'layerStyle'>
) {
  return <LayeredTitle {...props} layerStyle="glitch" />
})

export const EchoTitle = memo(function EchoTitle(
  props: Omit<LayeredTitleProps, 'layerStyle'>
) {
  return <LayeredTitle {...props} layerStyle="echo" />
})

export const OffsetTitle = memo(function OffsetTitle(
  props: Omit<LayeredTitleProps, 'layerStyle'>
) {
  return <LayeredTitle {...props} layerStyle="offset" />
})
