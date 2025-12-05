'use client'

import { memo, useMemo, CSSProperties, ReactNode } from 'react'

// ============================================
// EXPERIMENTAL TEXT COMPONENT
// GEDOKU/Sakiyama inspired typography
// "Twisted yet harmonious"
// ============================================

// Type definitions
type TextVariant = 'hero' | 'title' | 'subtitle' | 'body' | 'caption' | 'micro'
type TextEffect = 'layer' | 'scatter' | 'wave' | 'grain' | 'outline' | 'mixed' | 'none'
type ColorScheme = 'mono' | 'desaturated' | 'accent'
type Intensity = 'subtle' | 'medium' | 'strong'

interface ExperimentalTextProps {
  text: string
  variant?: TextVariant
  effect?: TextEffect
  colorScheme?: ColorScheme
  handwritten?: boolean
  randomize?: boolean
  intensity?: Intensity
  className?: string
  style?: CSSProperties
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
  splitChars?: boolean
}

// Frozen style constants - no re-creation on render
const VARIANT_STYLES = Object.freeze<Record<TextVariant, CSSProperties>>({
  hero: {
    fontSize: 'clamp(4rem, 18vw, 14rem)',
    lineHeight: 0.85,
    letterSpacing: '-0.04em',
    fontWeight: 300,
  },
  title: {
    fontSize: 'clamp(2.5rem, 10vw, 8rem)',
    lineHeight: 0.9,
    letterSpacing: '-0.03em',
    fontWeight: 300,
  },
  subtitle: {
    fontSize: 'clamp(1.5rem, 5vw, 3.5rem)',
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
    fontWeight: 300,
  },
  body: {
    fontSize: 'clamp(1rem, 2vw, 1.25rem)',
    lineHeight: 1.6,
    letterSpacing: '-0.01em',
    fontWeight: 400,
  },
  caption: {
    fontSize: '0.75rem',
    lineHeight: 1.4,
    letterSpacing: '0.1em',
    fontWeight: 400,
    textTransform: 'uppercase' as const,
  },
  micro: {
    fontSize: '0.625rem',
    lineHeight: 1.2,
    letterSpacing: '0.2em',
    fontWeight: 400,
    textTransform: 'uppercase' as const,
  },
})

// Intensity multipliers
const INTENSITY_MULTIPLIERS = Object.freeze<Record<Intensity, number>>({
  subtle: 0.4,
  medium: 1,
  strong: 1.8,
})

// Desaturated color palette (GEDOKU style)
const DESATURATED_COLORS = Object.freeze([
  '#1a1a1a', // near black
  '#2d2d2d', // dark grey
  '#4a4a4a', // medium grey
  '#6b6b6b', // grey
  '#8b7355', // muted brown (accent)
  '#5c5c5c', // soft grey
])

// Seeded random for consistent results
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000
  return x - Math.floor(x)
}

// Generate character style based on index and effect
function generateCharStyle(
  index: number,
  totalChars: number,
  effect: TextEffect,
  intensity: Intensity,
  colorScheme: ColorScheme,
  randomize: boolean,
  handwritten: boolean
): CSSProperties {
  const mult = INTENSITY_MULTIPLIERS[intensity]
  const seed = randomize ? index * 13.37 : index * 1.1
  const rand = seededRandom(seed)

  const baseStyle: CSSProperties = {
    display: 'inline-block',
    transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
  }

  // Handwritten font adjustment
  if (handwritten) {
    baseStyle.fontFamily = 'Georgia, "Cormorant Garamond", serif'
    baseStyle.fontStyle = 'italic'
  }

  switch (effect) {
    case 'scatter': {
      // Each character slightly displaced
      const rotation = (rand - 0.5) * 6 * mult
      const yOffset = (seededRandom(seed + 1) - 0.5) * 4 * mult
      const xOffset = (seededRandom(seed + 2) - 0.5) * 2 * mult

      return {
        ...baseStyle,
        transform: `rotate(${rotation}deg) translate(${xOffset}px, ${yOffset}px)`,
        opacity: 0.85 + rand * 0.15,
      }
    }

    case 'wave': {
      // Sinusoidal y-position
      const waveOffset = Math.sin((index / totalChars) * Math.PI * 2) * 8 * mult
      const subtleRotation = Math.sin((index / totalChars) * Math.PI) * 2 * mult

      return {
        ...baseStyle,
        transform: `translateY(${waveOffset}px) rotate(${subtleRotation}deg)`,
      }
    }

    case 'layer': {
      // Layered shadow effect
      const shadowOffset = 2 * mult

      return {
        ...baseStyle,
        textShadow: `${shadowOffset}px ${shadowOffset}px 0 rgba(139, 115, 85, 0.15)`,
      }
    }

    case 'outline': {
      return {
        ...baseStyle,
        color: 'transparent',
        WebkitTextStroke: `${0.5 + mult * 0.5}px currentColor`,
      }
    }

    case 'grain': {
      // Subtle opacity variation
      const opacity = 0.7 + rand * 0.3

      return {
        ...baseStyle,
        opacity,
        filter: `contrast(${0.95 + rand * 0.1})`,
      }
    }

    case 'mixed': {
      // Combine multiple effects per character
      const effectIndex = index % 4
      const rotation = (rand - 0.5) * 4 * mult
      const yOffset = (seededRandom(seed + 1) - 0.5) * 3 * mult

      const mixedStyle: CSSProperties = {
        ...baseStyle,
        transform: `rotate(${rotation}deg) translateY(${yOffset}px)`,
      }

      // Every 3rd character gets special treatment
      if (effectIndex === 0) {
        mixedStyle.color = colorScheme === 'accent'
          ? '#8B7355'
          : colorScheme === 'desaturated'
            ? DESATURATED_COLORS[index % DESATURATED_COLORS.length]
            : undefined
      } else if (effectIndex === 2) {
        mixedStyle.opacity = 0.8
        mixedStyle.textShadow = `2px 2px 0 rgba(139, 115, 85, 0.1)`
      }

      return mixedStyle
    }

    default:
      return baseStyle
  }
}

// Character component for individual letter styling
const Character = memo(function Character({
  char,
  index,
  totalChars,
  effect,
  intensity,
  colorScheme,
  randomize,
  handwritten,
}: {
  char: string
  index: number
  totalChars: number
  effect: TextEffect
  intensity: Intensity
  colorScheme: ColorScheme
  randomize: boolean
  handwritten: boolean
}) {
  const style = useMemo(
    () => generateCharStyle(index, totalChars, effect, intensity, colorScheme, randomize, handwritten),
    [index, totalChars, effect, intensity, colorScheme, randomize, handwritten]
  )

  // Preserve spaces
  if (char === ' ') {
    return <span style={{ display: 'inline' }}>&nbsp;</span>
  }

  return (
    <span
      style={style}
      data-char-index={index}
      aria-hidden="true"
    >
      {char}
    </span>
  )
})

// Main ExperimentalText component
function ExperimentalText({
  text,
  variant = 'title',
  effect = 'none',
  colorScheme = 'mono',
  handwritten = false,
  randomize = false,
  intensity = 'medium',
  className = '',
  style = {},
  as: Component = 'span',
  splitChars = true,
}: ExperimentalTextProps) {
  const variantStyle = VARIANT_STYLES[variant]

  const combinedStyle: CSSProperties = useMemo(() => ({
    fontFamily: handwritten
      ? 'Georgia, "Cormorant Garamond", serif'
      : 'var(--font-serif), Georgia, serif',
    color: colorScheme === 'accent' ? '#8B7355' : '#1a1a1a',
    ...variantStyle,
    ...style,
  }), [variantStyle, handwritten, colorScheme, style])

  const characters = useMemo(() => text.split(''), [text])

  // For accessibility, include a screen-reader-only version
  const srOnly = (
    <span className="sr-only">{text}</span>
  )

  // Render split characters for effects, or plain text for 'none'
  if (!splitChars || effect === 'none') {
    return (
      <Component
        className={`experimental-text experimental-text--${variant} ${className}`}
        style={combinedStyle}
      >
        {text}
      </Component>
    )
  }

  return (
    <Component
      className={`experimental-text experimental-text--${variant} ${className}`}
      style={combinedStyle}
    >
      {srOnly}
      <span aria-hidden="true" style={{ display: 'inline-flex', flexWrap: 'wrap' }}>
        {characters.map((char, index) => (
          <Character
            key={`${index}-${char}`}
            char={char}
            index={index}
            totalChars={characters.length}
            effect={effect}
            intensity={intensity}
            colorScheme={colorScheme}
            randomize={randomize}
            handwritten={handwritten}
          />
        ))}
      </span>
    </Component>
  )
}

export default memo(ExperimentalText)

// Named exports for specific use cases
export const HeroText = memo(function HeroText(props: Omit<ExperimentalTextProps, 'variant'>) {
  return <ExperimentalText {...props} variant="hero" />
})

export const TitleText = memo(function TitleText(props: Omit<ExperimentalTextProps, 'variant'>) {
  return <ExperimentalText {...props} variant="title" />
})

export const SubtitleText = memo(function SubtitleText(props: Omit<ExperimentalTextProps, 'variant'>) {
  return <ExperimentalText {...props} variant="subtitle" />
})
