'use client'

import { memo, useMemo, CSSProperties, ReactNode } from 'react'

// ============================================
// CHARACTER EFFECT COMPONENT
// Individual character animation wrapper
// For word-level or character-level effects
// ============================================

type EffectType =
  | 'stagger-fade'
  | 'stagger-slide'
  | 'wave'
  | 'typewriter'
  | 'glitch'
  | 'hover-scatter'
  | 'magnetic'

interface CharacterEffectProps {
  text: string
  effect?: EffectType
  staggerDelay?: number
  duration?: number
  className?: string
  style?: CSSProperties
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
  // Word-level vs character-level
  splitBy?: 'char' | 'word'
  // Hover effects
  hoverEffect?: boolean
}

// Seeded random for consistent results
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000
  return x - Math.floor(x)
}

// Single character/word component
const EffectUnit = memo(function EffectUnit({
  content,
  index,
  effect,
  staggerDelay,
  duration,
  isWord,
  hoverEffect,
}: {
  content: string
  index: number
  effect: EffectType
  staggerDelay: number
  duration: number
  isWord: boolean
  hoverEffect: boolean
}) {
  const delay = index * staggerDelay

  const baseStyle: CSSProperties = useMemo(() => {
    const style: CSSProperties = {
      display: 'inline-block',
      transition: `all ${duration}s cubic-bezier(0.22, 1, 0.36, 1)`,
    }

    switch (effect) {
      case 'stagger-fade':
        return {
          ...style,
          opacity: 0,
          animation: `fadeIn ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s forwards`,
        }

      case 'stagger-slide':
        return {
          ...style,
          opacity: 0,
          transform: 'translateY(40px)',
          animation: `slideUp ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s forwards`,
        }

      case 'wave':
        return {
          ...style,
          animation: `wave ${duration}s ease-in-out ${delay}s infinite`,
        }

      case 'typewriter':
        return {
          ...style,
          opacity: 0,
          animation: `typeIn 0.1s steps(1) ${delay}s forwards`,
        }

      case 'glitch':
        const rand = seededRandom(index * 17)
        return {
          ...style,
          animation: `glitch ${0.3 + rand * 0.3}s ease-in-out ${delay}s infinite`,
          animationPlayState: 'paused',
        }

      case 'hover-scatter':
        return {
          ...style,
          cursor: 'default',
        }

      case 'magnetic':
        return {
          ...style,
          transition: 'transform 0.3s ease-out',
          cursor: 'default',
        }

      default:
        return style
    }
  }, [effect, delay, duration, index])

  // Handle hover effects
  const hoverStyles: CSSProperties = useMemo(() => {
    if (!hoverEffect) return {}

    switch (effect) {
      case 'hover-scatter':
        const rand = seededRandom(index * 23)
        return {
          '--hover-x': `${(rand - 0.5) * 20}px`,
          '--hover-y': `${(seededRandom(index * 31) - 0.5) * 10}px`,
          '--hover-rotate': `${(rand - 0.5) * 15}deg`,
        } as CSSProperties

      case 'glitch':
        return {
          animationPlayState: 'running',
        }

      default:
        return {}
    }
  }, [effect, hoverEffect, index])

  // Space handling
  if (content === ' ') {
    return <span style={{ display: 'inline' }}>&nbsp;</span>
  }

  return (
    <span
      style={{ ...baseStyle, ...hoverStyles }}
      className={hoverEffect ? 'effect-unit-hover' : ''}
      data-index={index}
    >
      {isWord ? content : content}
      {isWord && <span style={{ display: 'inline' }}>&nbsp;</span>}
    </span>
  )
})

function CharacterEffect({
  text,
  effect = 'stagger-fade',
  staggerDelay = 0.05,
  duration = 0.6,
  className = '',
  style = {},
  as: Component = 'span',
  splitBy = 'char',
  hoverEffect = false,
}: CharacterEffectProps) {
  // Split text based on splitBy prop
  const units = useMemo(() => {
    if (splitBy === 'word') {
      return text.split(' ')
    }
    return text.split('')
  }, [text, splitBy])

  const containerStyle: CSSProperties = useMemo(
    () => ({
      display: 'inline-flex',
      flexWrap: 'wrap' as const,
      ...style,
    }),
    [style]
  )

  return (
    <>
      {/* Keyframe definitions */}
      <style jsx global>{`
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes wave {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        @keyframes typeIn {
          to {
            opacity: 1;
          }
        }
        @keyframes glitch {
          0%, 100% {
            transform: translate(0, 0);
          }
          20% {
            transform: translate(-2px, 1px);
          }
          40% {
            transform: translate(2px, -1px);
          }
          60% {
            transform: translate(-1px, -1px);
          }
          80% {
            transform: translate(1px, 2px);
          }
        }
        .effect-unit-hover:hover {
          transform: translate(var(--hover-x, 0), var(--hover-y, 0)) rotate(var(--hover-rotate, 0deg));
          color: #8B7355;
        }
      `}</style>

      <Component
        className={`character-effect character-effect--${effect} ${className}`}
        style={containerStyle}
      >
        {/* Screen reader text */}
        <span className="sr-only">{text}</span>

        {/* Animated units */}
        <span aria-hidden="true" style={{ display: 'contents' }}>
          {units.map((unit, index) => (
            <EffectUnit
              key={`${index}-${unit}`}
              content={unit}
              index={index}
              effect={effect}
              staggerDelay={staggerDelay}
              duration={duration}
              isWord={splitBy === 'word'}
              hoverEffect={hoverEffect}
            />
          ))}
        </span>
      </Component>
    </>
  )
}

export default memo(CharacterEffect)

// Pre-configured exports

// Stagger fade in
export const StaggerFadeText = memo(function StaggerFadeText(
  props: Omit<CharacterEffectProps, 'effect'>
) {
  return <CharacterEffect {...props} effect="stagger-fade" />
})

// Stagger slide up
export const StaggerSlideText = memo(function StaggerSlideText(
  props: Omit<CharacterEffectProps, 'effect'>
) {
  return <CharacterEffect {...props} effect="stagger-slide" />
})

// Wave animation
export const WaveText = memo(function WaveText(
  props: Omit<CharacterEffectProps, 'effect'>
) {
  return <CharacterEffect {...props} effect="wave" />
})

// Typewriter effect
export const TypewriterText = memo(function TypewriterText(
  props: Omit<CharacterEffectProps, 'effect'>
) {
  return <CharacterEffect {...props} effect="typewriter" staggerDelay={0.08} />
})

// Glitch on hover
export const GlitchText = memo(function GlitchText(
  props: Omit<CharacterEffectProps, 'effect' | 'hoverEffect'>
) {
  return <CharacterEffect {...props} effect="glitch" hoverEffect />
})

// Scatter on hover
export const ScatterText = memo(function ScatterText(
  props: Omit<CharacterEffectProps, 'effect' | 'hoverEffect'>
) {
  return <CharacterEffect {...props} effect="hover-scatter" hoverEffect />
})
