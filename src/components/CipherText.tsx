'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'

interface CipherTextProps {
  text: string
  className?: string
  as?: React.ElementType
  delay?: number
  speed?: number
  persistOnHover?: boolean
}

export default function CipherText({
  text,
  className = '',
  as: Component = 'span',
  delay = 0,
  speed = 8,
  persistOnHover = true
}: CipherTextProps) {
  const [displayText, setDisplayText] = useState('')
  const [isRevealed, setIsRevealed] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const elementRef = useRef<HTMLElement>(null)

  // Cipher characters
  const cipherChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789αβγδεζηθικλμνξοπρστυφχψω'

  // Generate random cipher character
  const getRandomCipher = useCallback(() => {
    return cipherChars[Math.floor(Math.random() * cipherChars.length)]
  }, [])

  // Generate fixed cipher text (only generated once)
  const fixedCipherText = useMemo(() => {
    if (!text) return ''
    return Array.from({ length: text.length }, () => getRandomCipher()).join('')
  }, [text]) // Only regenerate when text changes

  // Initialize with fixed cipher text
  useEffect(() => {
    if (!isRevealed && text) {
      setDisplayText(fixedCipherText)
    } else if (isRevealed) {
      setDisplayText(text)
    }
  }, [text, isRevealed, fixedCipherText])

  // Optimized reveal animation for long text
  const startReveal = useCallback(() => {
    if (isRevealed || !text) return

    setIsHovering(true)

    // Clear any existing intervals
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    const textLength = text.length

    // For short text (< 20 chars), reveal character by character
    // For long text, reveal in chunks
    const chunkSize = textLength < 20 ? 1 : Math.ceil(textLength / 15)
    let currentIndex = 0

    // Start reveal with delay
    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        if (currentIndex < textLength) {
          const endIndex = Math.min(currentIndex + chunkSize, textLength)
          const chars = text.split('')
          const cipherChars = fixedCipherText.split('')

          // Build the display text
          const result = []
          for (let i = 0; i < textLength; i++) {
            if (i < endIndex) {
              // Revealed characters
              result.push(chars[i])
            } else {
              // Still cipher
              result.push(cipherChars[i])
            }
          }

          setDisplayText(result.join(''))
          currentIndex = endIndex
        } else {
          // Fully revealed
          setDisplayText(text)
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
          }
          if (persistOnHover) {
            setIsRevealed(true)
          }
        }
      }, speed)
    }, delay)
  }, [text, isRevealed, delay, speed, fixedCipherText, persistOnHover])

  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)

    // Clear any running animations
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    // If not persisting, reset after a delay
    if (!persistOnHover && isRevealed) {
      setTimeout(() => {
        setIsRevealed(false)
        setDisplayText(fixedCipherText)
      }, 300)
    }
  }, [persistOnHover, isRevealed, fixedCipherText])

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // Handle empty text
  if (!text) {
    return <Component className={className}>{''}</Component>
  }

  return (
    <Component
      ref={elementRef as any}
      className={className}
      onMouseEnter={startReveal}
      onMouseLeave={handleMouseLeave}
      style={{
        fontFamily: 'inherit',
        letterSpacing: 'inherit',
        cursor: 'pointer',
        display: 'inline-block',
        whiteSpace: 'pre-wrap',
        position: 'relative',
        touchAction: 'auto',
        WebkitTapHighlightColor: 'transparent',
        userSelect: 'none'
      }}
      data-cipher-text="true"
    >
      {displayText || fixedCipherText}
    </Component>
  )
}