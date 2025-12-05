'use client'

import { memo, useMemo, CSSProperties } from 'react'

// ============================================
// ANNOTATION TEXT COMPONENT
// Archive/Zine aesthetic typography
// Stamps, tags, handwritten notes, Margiela numbering
// ============================================

type AnnotationVariant =
  | 'handwritten'
  | 'stamp'
  | 'stamp-approved'
  | 'stamp-rejected'
  | 'tag'
  | 'tag-dark'
  | 'number'
  | 'number-circle'
  | 'crossed'
  | 'underlined'
  | 'circled'
  | 'note'
  | 'label'
  | 'whisper'

interface AnnotationTextProps {
  text: string
  variant?: AnnotationVariant
  rotation?: number
  randomRotation?: boolean
  position?: 'inline' | 'absolute'
  top?: string
  left?: string
  right?: string
  bottom?: string
  className?: string
  style?: CSSProperties
  index?: number // For Margiela-style numbering
}

// Frozen base styles for each variant
const VARIANT_STYLES = Object.freeze<Record<AnnotationVariant, CSSProperties>>({
  handwritten: {
    fontFamily: 'Georgia, "Cormorant Garamond", serif',
    fontStyle: 'italic',
    fontSize: '0.85rem',
    color: '#4A4A4A',
    letterSpacing: '-0.01em',
    lineHeight: 1.4,
  },
  stamp: {
    fontFamily: 'var(--font-mono), Consolas, monospace',
    fontSize: '0.6rem',
    letterSpacing: '0.25em',
    textTransform: 'uppercase' as const,
    color: '#1a1a1a',
    border: '2px solid currentColor',
    padding: '4px 10px',
    display: 'inline-block',
  },
  'stamp-approved': {
    fontFamily: 'var(--font-mono), Consolas, monospace',
    fontSize: '0.55rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase' as const,
    color: '#2D5A27',
    border: '2px solid #2D5A27',
    padding: '3px 8px',
    display: 'inline-block',
    borderRadius: '2px',
  },
  'stamp-rejected': {
    fontFamily: 'var(--font-mono), Consolas, monospace',
    fontSize: '0.55rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase' as const,
    color: '#C41E3A',
    border: '2px solid #C41E3A',
    padding: '3px 8px',
    display: 'inline-block',
    borderRadius: '2px',
  },
  tag: {
    fontFamily: 'var(--font-mono), Consolas, monospace',
    fontSize: '0.55rem',
    letterSpacing: '0.15em',
    textTransform: 'uppercase' as const,
    color: '#FAFAFA',
    background: '#1a1a1a',
    padding: '4px 10px',
    display: 'inline-block',
  },
  'tag-dark': {
    fontFamily: 'var(--font-mono), Consolas, monospace',
    fontSize: '0.55rem',
    letterSpacing: '0.15em',
    textTransform: 'uppercase' as const,
    color: '#1a1a1a',
    background: '#E5E5E5',
    padding: '4px 10px',
    display: 'inline-block',
  },
  number: {
    fontFamily: 'var(--font-mono), Consolas, monospace',
    fontSize: '0.5rem',
    letterSpacing: '0.4em',
    color: '#7A7A7A',
    opacity: 0.5,
  },
  'number-circle': {
    fontFamily: 'var(--font-mono), Consolas, monospace',
    fontSize: '0.6rem',
    letterSpacing: '0.1em',
    color: '#1a1a1a',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    border: '1px solid currentColor',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  crossed: {
    fontFamily: 'var(--font-mono), Consolas, monospace',
    fontSize: '0.75rem',
    letterSpacing: '0.1em',
    color: '#7A7A7A',
    textDecoration: 'line-through',
    textDecorationColor: '#C41E3A',
    textDecorationThickness: '2px',
  },
  underlined: {
    fontFamily: 'Georgia, serif',
    fontSize: '0.85rem',
    color: '#1a1a1a',
    borderBottom: '2px solid #8B7355',
    paddingBottom: '2px',
    display: 'inline',
  },
  circled: {
    fontFamily: 'var(--font-mono), Consolas, monospace',
    fontSize: '0.75rem',
    letterSpacing: '0.1em',
    color: '#1a1a1a',
    border: '2px solid #8B7355',
    borderRadius: '50%',
    padding: '6px 12px',
    display: 'inline-block',
  },
  note: {
    fontFamily: 'Georgia, serif',
    fontStyle: 'italic',
    fontSize: '0.7rem',
    color: '#6B6B6B',
    letterSpacing: '0',
    lineHeight: 1.5,
    maxWidth: '180px',
  },
  label: {
    fontFamily: 'var(--font-mono), Consolas, monospace',
    fontSize: '0.5rem',
    letterSpacing: '0.3em',
    textTransform: 'uppercase' as const,
    color: '#7A7A7A',
  },
  whisper: {
    fontFamily: 'var(--font-mono), Consolas, monospace',
    fontSize: '0.4rem',
    letterSpacing: '0.5em',
    textTransform: 'uppercase' as const,
    color: '#B0B0B0',
    opacity: 0.6,
  },
})

// Seeded random for consistent rotation
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000
  return x - Math.floor(x)
}

function AnnotationText({
  text,
  variant = 'label',
  rotation = 0,
  randomRotation = false,
  position = 'inline',
  top,
  left,
  right,
  bottom,
  className = '',
  style = {},
  index,
}: AnnotationTextProps) {
  const variantStyle = VARIANT_STYLES[variant]

  // Calculate rotation
  const finalRotation = useMemo(() => {
    if (randomRotation) {
      const seed = text.length * 13.37 + (index ?? 0)
      return (seededRandom(seed) - 0.5) * 8
    }
    return rotation
  }, [rotation, randomRotation, text.length, index])

  // Format text for number variants
  const displayText = useMemo(() => {
    if (variant === 'number' || variant === 'number-circle') {
      // Format as padded number if index is provided
      if (index !== undefined) {
        return String(index).padStart(2, '0')
      }
    }
    return text
  }, [text, variant, index])

  const combinedStyle: CSSProperties = useMemo(
    () => ({
      ...variantStyle,
      ...(position === 'absolute' && {
        position: 'absolute' as const,
        top,
        left,
        right,
        bottom,
        zIndex: 50,
      }),
      transform:
        finalRotation !== 0
          ? `rotate(${finalRotation}deg)`
          : undefined,
      ...style,
    }),
    [variantStyle, position, top, left, right, bottom, finalRotation, style]
  )

  return (
    <span
      className={`annotation-text annotation-text--${variant} ${className}`}
      style={combinedStyle}
    >
      {displayText}
    </span>
  )
}

export default memo(AnnotationText)

// Pre-configured exports for common use cases

// Margiela-style number tag (01, 02, 03...)
export const NumberTag = memo(function NumberTag({
  index,
  circled = false,
  ...props
}: Omit<AnnotationTextProps, 'variant' | 'text'> & {
  index: number
  circled?: boolean
}) {
  return (
    <AnnotationText
      {...props}
      text=""
      index={index}
      variant={circled ? 'number-circle' : 'number'}
    />
  )
})

// Stamp variants
export const StampText = memo(function StampText(
  props: Omit<AnnotationTextProps, 'variant'>
) {
  return <AnnotationText {...props} variant="stamp" />
})

export const ApprovedStamp = memo(function ApprovedStamp(
  props: Omit<AnnotationTextProps, 'variant' | 'text'>
) {
  return <AnnotationText {...props} text="APPROVED" variant="stamp-approved" />
})

export const RejectedStamp = memo(function RejectedStamp(
  props: Omit<AnnotationTextProps, 'variant' | 'text'>
) {
  return <AnnotationText {...props} text="REJECTED" variant="stamp-rejected" />
})

// Tag variants
export const TagText = memo(function TagText(
  props: Omit<AnnotationTextProps, 'variant'>
) {
  return <AnnotationText {...props} variant="tag" />
})

// Handwritten note
export const HandwrittenNote = memo(function HandwrittenNote(
  props: Omit<AnnotationTextProps, 'variant'>
) {
  return <AnnotationText {...props} variant="note" randomRotation />
})

// Label
export const LabelText = memo(function LabelText(
  props: Omit<AnnotationTextProps, 'variant'>
) {
  return <AnnotationText {...props} variant="label" />
})

// Whisper text (very subtle)
export const WhisperText = memo(function WhisperText(
  props: Omit<AnnotationTextProps, 'variant'>
) {
  return <AnnotationText {...props} variant="whisper" />
})

// Crossed out text
export const CrossedText = memo(function CrossedText(
  props: Omit<AnnotationTextProps, 'variant'>
) {
  return <AnnotationText {...props} variant="crossed" />
})

// Season tag (common in fashion)
export const SeasonTag = memo(function SeasonTag({
  season,
  year,
  ...props
}: Omit<AnnotationTextProps, 'variant' | 'text'> & {
  season: 'SS' | 'AW' | 'PF' | 'RS'
  year: string
}) {
  return (
    <AnnotationText
      {...props}
      text={`${season}${year}`}
      variant="tag"
    />
  )
})
