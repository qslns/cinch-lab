'use client'

import { CSSProperties } from 'react'

interface BackgroundTextProps {
  text: string
  // Size variants
  size?: 'massive' | 'giant' | 'huge' | 'large'
  // Positioning
  position?: 'fixed' | 'absolute' | 'relative'
  top?: string
  left?: string
  right?: string
  bottom?: string
  // Style
  opacity?: number // 0.01 to 0.1 typically
  rotation?: number
  color?: string
  // Font
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
  serif?: boolean
  // Layout
  vertical?: boolean // vertical writing mode
  blend?: 'difference' | 'multiply' | 'screen' | 'overlay' | 'normal'
  // Custom
  className?: string
  style?: CSSProperties
}

const sizeMap = {
  massive: 'clamp(10rem, 25vw, 30rem)',
  giant: 'clamp(8rem, 20vw, 25rem)',
  huge: 'clamp(6rem, 15vw, 18rem)',
  large: 'clamp(4rem, 10vw, 12rem)',
}

export default function BackgroundText({
  text,
  size = 'giant',
  position = 'absolute',
  top,
  left,
  right,
  bottom,
  opacity = 0.03,
  rotation = 0,
  color = '#0A0A0A',
  weight = 100,
  serif = true,
  vertical = false,
  blend = 'normal',
  className = '',
  style = {},
}: BackgroundTextProps) {
  const combinedStyle: CSSProperties = {
    position,
    ...(top && { top }),
    ...(left && { left }),
    ...(right && { right }),
    ...(bottom && { bottom }),
    fontSize: sizeMap[size],
    fontWeight: weight,
    fontFamily: serif ? 'var(--font-serif), Georgia, serif' : 'var(--font-sans), system-ui, sans-serif',
    opacity,
    color,
    lineHeight: 0.85,
    letterSpacing: '-0.04em',
    userSelect: 'none',
    pointerEvents: 'none',
    transform: rotation !== 0 ? `rotate(${rotation}deg)` : undefined,
    mixBlendMode: blend !== 'normal' ? blend : undefined,
    writingMode: vertical ? 'vertical-rl' : undefined,
    textOrientation: vertical ? 'mixed' : undefined,
    whiteSpace: 'nowrap',
    zIndex: 0,
    ...style,
  }

  return (
    <span className={`background-text ${className}`} style={combinedStyle} aria-hidden="true">
      {text}
    </span>
  )
}

// Pre-configured variants
export function BrandBackground({ className = '' }: { className?: string }) {
  return (
    <BackgroundText
      text="THE YON"
      size="massive"
      position="fixed"
      top="50%"
      left="50%"
      style={{ transform: 'translate(-50%, -50%)' }}
      opacity={0.02}
      weight={100}
      className={className}
    />
  )
}

export function SectionTitle({
  text,
  className = '',
}: {
  text: string
  className?: string
}) {
  return (
    <BackgroundText
      text={text}
      size="huge"
      position="absolute"
      top="10%"
      left="-5%"
      opacity={0.04}
      rotation={-5}
      weight={200}
      className={className}
    />
  )
}

export function VerticalAccent({
  text,
  className = '',
}: {
  text: string
  className?: string
}) {
  return (
    <BackgroundText
      text={text}
      size="large"
      position="absolute"
      right="5%"
      top="20%"
      opacity={0.05}
      vertical
      weight={300}
      className={className}
    />
  )
}
