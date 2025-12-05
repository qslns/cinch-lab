'use client'

import { CSSProperties, ReactNode, memo, useMemo } from 'react'

// Extended Slot sizes - more variety
type SlotSize =
  | 'hero'
  | 'hero-wide'
  | 'hero-tall'
  | 'large'
  | 'large-square'
  | 'large-wide'
  | 'medium'
  | 'medium-wide'
  | 'medium-tall'
  | 'small'
  | 'small-square'
  | 'small-wide'
  | 'tiny'
  | 'tiny-wide'
  | 'swatch'
  | 'micro'

// Extended Clip path variants - more organic/torn shapes
type ClipVariant =
  | 'irregular-1'
  | 'irregular-2'
  | 'irregular-3'
  | 'irregular-4'
  | 'irregular-5'
  | 'irregular-6'
  | 'torn-1'
  | 'torn-2'
  | 'torn-3'
  | 'torn-4'
  | 'diagonal-1'
  | 'diagonal-2'
  | 'trapezoid'
  | 'trapezoid-reverse'
  | 'wave-1'
  | 'wave-2'
  | 'notch-1'
  | 'notch-2'
  | 'corner-cut'
  | 'organic-1'
  | 'organic-2'
  | 'none'

// Shadow variants
type ShadowVariant =
  | 'brutal'
  | 'brutal-sm'
  | 'brutal-lg'
  | 'offset'
  | 'offset-lg'
  | 'offset-xl'
  | 'dramatic'
  | 'float'
  | 'deep'
  | 'soft'
  | 'harsh'
  | 'none'

// Blend modes
type BlendMode =
  | 'multiply'
  | 'screen'
  | 'overlay'
  | 'difference'
  | 'exclusion'
  | 'darken'
  | 'lighten'
  | 'color-burn'
  | 'color-dodge'
  | 'normal'

// Extended Decoration types
type Decoration =
  | 'tape-top'
  | 'tape-corner'
  | 'tape-x'
  | 'pin'
  | 'pin-red'
  | 'clip'
  | 'staple'
  | 'corner-fold'
  | 'sticker'
  | 'mark-x'
  | 'mark-check'
  | 'number'
  | 'none'

// Texture overlays
type TextureOverlay = 'grain' | 'paper' | 'noise' | 'scan' | 'none'

interface SlotProps {
  children?: ReactNode
  // Image props
  src?: string
  alt?: string
  label?: string
  labelPosition?: 'center' | 'bottom' | 'top' | 'corner'
  // Size & shape
  size?: SlotSize
  clip?: ClipVariant
  // Transform
  rotation?: number // -20 to 20
  skewX?: number
  skewY?: number
  scale?: number
  // Positioning
  position?: 'relative' | 'absolute' | 'fixed'
  top?: string
  left?: string
  right?: string
  bottom?: string
  zIndex?: number
  // Overlap & bleed
  overlapX?: number
  overlapY?: number
  bleed?: 'left' | 'right' | 'top' | 'bottom' | 'both-x' | 'both-y' | 'none'
  bleedAmount?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  // Effects
  shadow?: ShadowVariant
  blend?: BlendMode
  grayscale?: boolean
  contrast?: boolean
  sepia?: boolean
  invert?: boolean
  blur?: number
  opacity?: number
  // Border
  border?: 'rough' | 'brutal' | 'thin' | 'accent' | 'white' | 'double' | 'dashed' | 'none'
  // Decoration
  decoration?: Decoration
  decorationColor?: string
  // Texture
  texture?: TextureOverlay
  // Annotation/Number
  annotationNumber?: string
  annotationText?: string
  // Custom
  className?: string
  style?: CSSProperties
  // Interaction
  onClick?: () => void
  // Animation
  animated?: boolean
}

// Frozen clip paths - no re-creation on render
const CLIP_PATHS = Object.freeze<Record<ClipVariant, string>>({
  'irregular-1': 'polygon(5% 0%, 100% 8%, 95% 100%, 0% 92%)',
  'irregular-2': 'polygon(0% 5%, 92% 0%, 100% 95%, 8% 100%)',
  'irregular-3': 'polygon(3% 0%, 100% 3%, 97% 100%, 0% 97%)',
  'irregular-4': 'polygon(8% 0%, 100% 5%, 92% 100%, 0% 95%)',
  'irregular-5': 'polygon(0% 3%, 95% 0%, 100% 97%, 5% 100%)',
  'irregular-6': 'polygon(2% 5%, 98% 0%, 95% 95%, 0% 100%)',
  'torn-1':
    'polygon(0% 0%, 100% 2%, 98% 15%, 100% 30%, 97% 45%, 100% 60%, 98% 75%, 100% 90%, 95% 100%, 0% 98%)',
  'torn-2':
    'polygon(2% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 85%, 3% 70%, 0% 55%, 2% 40%, 0% 25%, 3% 10%)',
  'torn-3':
    'polygon(0% 0%, 15% 2%, 30% 0%, 45% 3%, 60% 0%, 75% 2%, 90% 0%, 100% 0%, 100% 100%, 85% 98%, 70% 100%, 55% 97%, 40% 100%, 25% 98%, 10% 100%, 0% 100%)',
  'torn-4':
    'polygon(0% 5%, 5% 0%, 15% 8%, 25% 0%, 35% 5%, 45% 0%, 55% 8%, 65% 0%, 75% 5%, 85% 0%, 95% 8%, 100% 0%, 100% 100%, 0% 100%)',
  'diagonal-1': 'polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%)',
  'diagonal-2': 'polygon(0% 0%, 100% 0%, 90% 100%, 0% 100%)',
  trapezoid: 'polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)',
  'trapezoid-reverse': 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)',
  'wave-1':
    'polygon(0% 0%, 100% 0%, 100% 85%, 90% 90%, 80% 85%, 70% 90%, 60% 85%, 50% 90%, 40% 85%, 30% 90%, 20% 85%, 10% 90%, 0% 85%)',
  'wave-2':
    'polygon(0% 15%, 10% 10%, 20% 15%, 30% 10%, 40% 15%, 50% 10%, 60% 15%, 70% 10%, 80% 15%, 90% 10%, 100% 15%, 100% 100%, 0% 100%)',
  'notch-1': 'polygon(0% 0%, 85% 0%, 100% 15%, 100% 100%, 0% 100%)',
  'notch-2': 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 15%)',
  'corner-cut': 'polygon(0% 0%, 85% 0%, 100% 15%, 100% 100%, 15% 100%, 0% 85%)',
  'organic-1':
    'polygon(10% 0%, 90% 5%, 100% 20%, 95% 80%, 85% 100%, 15% 95%, 0% 75%, 5% 25%)',
  'organic-2':
    'polygon(5% 10%, 25% 0%, 75% 5%, 95% 15%, 100% 50%, 90% 90%, 60% 100%, 20% 95%, 0% 70%, 5% 30%)',
  none: 'none',
})

// Frozen shadow values
const SHADOWS = Object.freeze<Record<ShadowVariant, string>>({
  brutal: '15px 15px 0px rgba(0,0,0,0.9)',
  'brutal-sm': '8px 8px 0px rgba(0,0,0,0.9)',
  'brutal-lg': '25px 25px 0px rgba(0,0,0,0.85)',
  offset: '-15px 20px 40px rgba(0,0,0,0.25)',
  'offset-lg': '-25px 30px 60px rgba(0,0,0,0.3)',
  'offset-xl': '-35px 45px 80px rgba(0,0,0,0.35)',
  dramatic: '25px 25px 0px rgba(0,0,0,0.15)',
  float: '0 30px 60px rgba(0,0,0,0.2)',
  deep: '0 50px 100px rgba(0,0,0,0.3)',
  soft: '0 10px 30px rgba(0,0,0,0.1)',
  harsh: '10px 10px 0px #0A0A0A, 20px 20px 0px rgba(0,0,0,0.1)',
  none: 'none',
})

// Frozen size styles
const SIZE_STYLES = Object.freeze<Record<SlotSize, CSSProperties>>({
  hero: { width: 'clamp(400px, 55vw, 1000px)', aspectRatio: '3/4' },
  'hero-wide': { width: 'clamp(500px, 65vw, 1200px)', aspectRatio: '16/10' },
  'hero-tall': { width: 'clamp(350px, 45vw, 800px)', aspectRatio: '2/3' },
  large: { width: 'clamp(280px, 32vw, 600px)', aspectRatio: '3/4' },
  'large-square': { width: 'clamp(250px, 28vw, 500px)', aspectRatio: '1/1' },
  'large-wide': { width: 'clamp(350px, 40vw, 700px)', aspectRatio: '16/9' },
  medium: { width: 'clamp(180px, 20vw, 380px)', aspectRatio: '4/5' },
  'medium-wide': { width: 'clamp(220px, 24vw, 450px)', aspectRatio: '16/10' },
  'medium-tall': { width: 'clamp(150px, 16vw, 300px)', aspectRatio: '2/3' },
  small: { width: 'clamp(100px, 12vw, 220px)', aspectRatio: '3/4' },
  'small-square': { width: 'clamp(90px, 10vw, 180px)', aspectRatio: '1/1' },
  'small-wide': { width: 'clamp(140px, 15vw, 280px)', aspectRatio: '16/10' },
  tiny: { width: 'clamp(55px, 6vw, 110px)', aspectRatio: '1/1' },
  'tiny-wide': { width: 'clamp(80px, 9vw, 160px)', aspectRatio: '4/3' },
  swatch: { width: 'clamp(45px, 5vw, 90px)', aspectRatio: '1/1' },
  micro: { width: 'clamp(30px, 3vw, 60px)', aspectRatio: '1/1' },
})

// Frozen border styles
const BORDER_STYLES = Object.freeze<Record<string, CSSProperties>>({
  rough: { border: '3px solid #0A0A0A', borderRadius: '2px 8px 4px 12px' },
  brutal: { border: '4px solid #0A0A0A' },
  thin: { border: '1px solid #0A0A0A' },
  accent: { border: '2px solid #8B7355' },
  white: { border: '3px solid #FAFAFA' },
  double: { border: '4px double #0A0A0A' },
  dashed: { border: '2px dashed #0A0A0A' },
  none: {},
})

// Frozen bleed margins
const BLEED_MARGINS = Object.freeze({
  sm: 40,
  md: 80,
  lg: 120,
  xl: 180,
  xxl: 250,
} as const)

// Frozen label position styles
const LABEL_POSITION_STYLES = Object.freeze<Record<string, CSSProperties>>({
  center: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  bottom: {
    position: 'absolute',
    bottom: '8px',
    left: '8px',
  },
  top: {
    position: 'absolute',
    top: '8px',
    left: '8px',
  },
  corner: {
    position: 'absolute',
    bottom: '4px',
    right: '4px',
  },
})

function Slot({
  children,
  src,
  alt = 'Image',
  label,
  labelPosition = 'center',
  size = 'medium',
  clip = 'none',
  rotation = 0,
  skewX = 0,
  skewY = 0,
  scale = 1,
  position = 'relative',
  top,
  left,
  right,
  bottom,
  zIndex = 1,
  overlapX = 0,
  overlapY = 0,
  bleed = 'none',
  bleedAmount = 'md',
  shadow = 'none',
  blend = 'normal',
  grayscale = false,
  contrast = false,
  sepia = false,
  invert = false,
  blur = 0,
  opacity = 1,
  border = 'none',
  decoration = 'none',
  decorationColor,
  texture = 'none',
  annotationNumber,
  annotationText,
  className = '',
  style = {},
  onClick,
  animated = false,
}: SlotProps) {
  // Build transform string
  const transforms: string[] = []
  if (rotation !== 0) transforms.push(`rotate(${rotation}deg)`)
  if (skewX !== 0) transforms.push(`skewX(${skewX}deg)`)
  if (skewY !== 0) transforms.push(`skewY(${skewY}deg)`)
  if (scale !== 1) transforms.push(`scale(${scale})`)

  // Build filter string
  const filters: string[] = []
  if (grayscale) filters.push('grayscale(100%)')
  if (contrast) filters.push('contrast(1.2)')
  if (sepia) filters.push('sepia(30%)')
  if (invert) filters.push('invert(100%)')
  if (blur > 0) filters.push(`blur(${blur}px)`)

  // Build margin for overlap/bleed
  let marginLeft: number | undefined
  let marginRight: number | undefined
  let marginTop: number | undefined
  let marginBottom: number | undefined

  if (overlapX !== 0) marginLeft = -Math.abs(overlapX)
  if (overlapY !== 0) marginTop = -Math.abs(overlapY)

  if (bleed === 'left' || bleed === 'both-x') marginLeft = -BLEED_MARGINS[bleedAmount]
  if (bleed === 'right' || bleed === 'both-x') marginRight = -BLEED_MARGINS[bleedAmount]
  if (bleed === 'top' || bleed === 'both-y') marginTop = -BLEED_MARGINS[bleedAmount]
  if (bleed === 'bottom' || bleed === 'both-y') marginBottom = -BLEED_MARGINS[bleedAmount]

  // Combine all styles
  const combinedStyle: CSSProperties = {
    ...SIZE_STYLES[size],
    ...(BORDER_STYLES[border] || {}),
    position,
    ...(top && { top }),
    ...(left && { left }),
    ...(right && { right }),
    ...(bottom && { bottom }),
    zIndex,
    ...(marginLeft !== undefined && { marginLeft }),
    ...(marginTop !== undefined && { marginTop }),
    ...(marginRight !== undefined && { marginRight }),
    ...(marginBottom !== undefined && { marginBottom }),
    transform: transforms.length > 0 ? transforms.join(' ') : undefined,
    clipPath: clip !== 'none' ? CLIP_PATHS[clip] : undefined,
    boxShadow: shadow !== 'none' ? SHADOWS[shadow] : undefined,
    mixBlendMode: blend !== 'normal' ? blend : undefined,
    filter: filters.length > 0 ? filters.join(' ') : undefined,
    opacity,
    overflow: 'hidden',
    transition: animated ? 'transform 0.3s ease, box-shadow 0.3s ease' : undefined,
    ...style,
  }

  return (
    <div
      className={`slot ${className}`}
      style={combinedStyle}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Texture overlay */}
      {texture !== 'none' && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 5,
            opacity: texture === 'grain' ? 0.08 : texture === 'paper' ? 0.05 : 0.1,
            background:
              texture === 'grain'
                ? 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")'
                : texture === 'scan'
                  ? 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)'
                  : undefined,
            mixBlendMode: 'multiply',
          }}
        />
      )}

      {/* Annotation Number - top left corner */}
      {annotationNumber && (
        <div
          style={{
            position: 'absolute',
            top: -12,
            left: -8,
            fontFamily: 'monospace',
            fontSize: '0.6rem',
            color: '#0A0A0A',
            background: '#FAFAFA',
            padding: '2px 6px',
            transform: 'rotate(-3deg)',
            zIndex: 15,
            letterSpacing: '0.1em',
          }}
        >
          {annotationNumber}
        </div>
      )}

      {/* Annotation Text - bottom */}
      {annotationText && (
        <div
          style={{
            position: 'absolute',
            bottom: -18,
            left: 4,
            fontFamily: 'monospace',
            fontSize: '0.5rem',
            color: '#7A7A7A',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            transform: 'rotate(1deg)',
            zIndex: 15,
          }}
        >
          {annotationText}
        </div>
      )}

      {/* Decoration: Tape Top */}
      {decoration === 'tape-top' && (
        <div
          style={{
            position: 'absolute',
            top: -10,
            left: '50%',
            transform: 'translateX(-50%) rotate(-2deg)',
            width: 65,
            height: 22,
            background: decorationColor || 'rgba(255, 245, 200, 0.85)',
            zIndex: 10,
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        />
      )}

      {/* Decoration: Tape Corner */}
      {decoration === 'tape-corner' && (
        <>
          <div
            style={{
              position: 'absolute',
              top: -6,
              left: -6,
              width: 40,
              height: 18,
              background: decorationColor || 'rgba(255, 245, 200, 0.85)',
              transform: 'rotate(-45deg)',
              zIndex: 10,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: -6,
              right: -6,
              width: 40,
              height: 18,
              background: decorationColor || 'rgba(255, 245, 200, 0.85)',
              transform: 'rotate(-45deg)',
              zIndex: 10,
            }}
          />
        </>
      )}

      {/* Decoration: Tape X */}
      {decoration === 'tape-x' && (
        <>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '140%',
              height: 20,
              background: decorationColor || 'rgba(255, 245, 200, 0.7)',
              transform: 'translate(-50%, -50%) rotate(45deg)',
              zIndex: 10,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '140%',
              height: 20,
              background: decorationColor || 'rgba(255, 245, 200, 0.7)',
              transform: 'translate(-50%, -50%) rotate(-45deg)',
              zIndex: 10,
            }}
          />
        </>
      )}

      {/* Decoration: Pin */}
      {decoration === 'pin' && (
        <div
          style={{
            position: 'absolute',
            top: -6,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 14,
            height: 14,
            background: decorationColor || '#2D2D2D',
            borderRadius: '50%',
            zIndex: 10,
            boxShadow: '0 2px 4px rgba(0,0,0,0.3), inset 0 -2px 4px rgba(0,0,0,0.2)',
          }}
        />
      )}

      {/* Decoration: Red Pin */}
      {decoration === 'pin-red' && (
        <div
          style={{
            position: 'absolute',
            top: -6,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 14,
            height: 14,
            background: '#C41E3A',
            borderRadius: '50%',
            zIndex: 10,
            boxShadow: '0 2px 4px rgba(0,0,0,0.3), inset 0 -2px 4px rgba(0,0,0,0.2)',
          }}
        />
      )}

      {/* Decoration: Clip */}
      {decoration === 'clip' && (
        <div
          style={{
            position: 'absolute',
            top: -18,
            left: 15,
            width: 28,
            height: 45,
            border: '3px solid #5A5A5A',
            borderRadius: '0 0 12px 12px',
            borderTop: 'none',
            zIndex: 10,
          }}
        />
      )}

      {/* Decoration: Staple */}
      {decoration === 'staple' && (
        <div
          style={{
            position: 'absolute',
            top: 8,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 20,
            height: 8,
            borderBottom: '2px solid #7A7A7A',
            borderLeft: '2px solid #7A7A7A',
            borderRight: '2px solid #7A7A7A',
            zIndex: 10,
          }}
        />
      )}

      {/* Decoration: Corner Fold */}
      {decoration === 'corner-fold' && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 0,
            height: 0,
            borderStyle: 'solid',
            borderWidth: '0 30px 30px 0',
            borderColor: 'transparent #FAFAFA transparent transparent',
            zIndex: 10,
            filter: 'drop-shadow(-2px 2px 2px rgba(0,0,0,0.1))',
          }}
        />
      )}

      {/* Decoration: Sticker */}
      {decoration === 'sticker' && (
        <div
          style={{
            position: 'absolute',
            top: -8,
            right: -8,
            width: 35,
            height: 35,
            background: decorationColor || '#FFD700',
            borderRadius: '50%',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.6rem',
            fontWeight: 'bold',
            color: '#0A0A0A',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          ★
        </div>
      )}

      {/* Decoration: Mark X (failure) */}
      {decoration === 'mark-x' && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '4rem',
            fontWeight: 100,
            color: decorationColor || '#C41E3A',
            opacity: 0.6,
            zIndex: 10,
            fontFamily: 'serif',
            lineHeight: 1,
          }}
        >
          ✕
        </div>
      )}

      {/* Decoration: Mark Check (approved) */}
      {decoration === 'mark-check' && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '3rem',
            fontWeight: 100,
            color: decorationColor || '#2E7D32',
            opacity: 0.6,
            zIndex: 10,
            fontFamily: 'serif',
            lineHeight: 1,
          }}
        >
          ✓
        </div>
      )}

      {/* Decoration: Number */}
      {decoration === 'number' && (
        <div
          style={{
            position: 'absolute',
            bottom: -5,
            right: -5,
            width: 24,
            height: 24,
            background: '#0A0A0A',
            borderRadius: '50%',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.6rem',
            fontWeight: 'bold',
            color: '#FAFAFA',
            fontFamily: 'monospace',
          }}
        >
          {annotationNumber || '01'}
        </div>
      )}

      {/* Image or placeholder */}
      {src ? (
        <img
          src={src}
          alt={alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      ) : children ? (
        children
      ) : (
        // Placeholder with various styles
        <div
          style={{
            width: '100%',
            height: '100%',
            background: grayscale
              ? 'linear-gradient(135deg, #B0B0B0 0%, #8A8A8A 100%)'
              : 'linear-gradient(135deg, #E8E8E8 0%, #D0D0D0 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: grayscale ? '#5A5A5A' : '#7A7A7A',
            position: 'relative',
          }}
        >
          {label && (
            <span
              style={{
                ...LABEL_POSITION_STYLES[labelPosition],
                fontFamily: 'monospace',
                fontSize: size === 'micro' || size === 'swatch' ? '0.45rem' : '0.6rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              {label}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

// Memoized export
export default memo(Slot)

// Export sub-components for specific use cases
export function HeroSlot(props: Omit<SlotProps, 'size'>) {
  return <Slot {...props} size="hero" />
}

export function SwatchSlot(props: Omit<SlotProps, 'size'>) {
  return <Slot {...props} size="swatch" />
}

export function TinySlot(props: Omit<SlotProps, 'size'>) {
  return <Slot {...props} size="tiny" />
}

export function MicroSlot(props: Omit<SlotProps, 'size'>) {
  return <Slot {...props} size="micro" />
}

// Frozen annotation variant styles
const ANNOTATION_VARIANT_STYLES = Object.freeze<Record<string, CSSProperties>>({
  default: {
    fontFamily: 'monospace',
    fontSize: '0.55rem',
    letterSpacing: '0.15em',
    color: '#7A7A7A',
    textTransform: 'uppercase',
  },
  handwritten: {
    fontFamily: 'Georgia, serif',
    fontSize: '0.7rem',
    fontStyle: 'italic',
    color: '#4A4A4A',
  },
  stamp: {
    fontFamily: 'monospace',
    fontSize: '0.5rem',
    letterSpacing: '0.2em',
    color: '#C41E3A',
    textTransform: 'uppercase',
    border: '1px solid #C41E3A',
    padding: '2px 6px',
  },
  tag: {
    fontFamily: 'monospace',
    fontSize: '0.5rem',
    letterSpacing: '0.1em',
    color: '#FAFAFA',
    background: '#0A0A0A',
    padding: '3px 8px',
    textTransform: 'uppercase',
  },
})

// Utility component for scattered annotation labels
export const AnnotationLabel = memo(function AnnotationLabel({
  text,
  position,
  rotation = 0,
  variant = 'default',
}: {
  text: string
  position: { top?: string; left?: string; right?: string; bottom?: string }
  rotation?: number
  variant?: 'default' | 'handwritten' | 'stamp' | 'tag'
}) {
  return (
    <span
      style={{
        position: 'absolute',
        ...position,
        transform: `rotate(${rotation}deg)`,
        zIndex: 50,
        ...ANNOTATION_VARIANT_STYLES[variant],
      }}
    >
      {text}
    </span>
  )
})
