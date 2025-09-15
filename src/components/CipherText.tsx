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
  speed = 5,
  persistOnHover = true
}: CipherTextProps) {
  const [displayText, setDisplayText] = useState('')
  const [isRevealed, setIsRevealed] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const elementRef = useRef<HTMLElement>(null)

  // Cipher characters - simplified for better readability
  const cipherChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789'

  // Generate random cipher character
  const getRandomCipher = useCallback(() => {
    return cipherChars[Math.floor(Math.random() * cipherChars.length)]
  }, [])

  // Generate fixed cipher text (only generated once per text change)
  const fixedCipherText = useMemo(() => {
    if (!text) return ''
    return Array.from({ length: text.length }, () => getRandomCipher()).join('')
  }, [text, getRandomCipher])

  // Initialize with fixed cipher text
  useEffect(() => {
    if (!isRevealed && text) {
      setDisplayText(fixedCipherText)
    }
  }, [text, fixedCipherText, isRevealed])

  // Optimized reveal animation
  const startReveal = useCallback(() => {
    // Prevent multiple simultaneous animations
    if (isAnimating || isRevealed || !text) return

    setIsAnimating(true)

    // Clear any existing intervals
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    const textLength = text.length

    // Adaptive speed based on text length
    const adjustedSpeed = textLength > 50 ? Math.max(2, speed / 2) : speed

    // Calculate chunk size for smoother animation
    const chunkSize = textLength < 10 ? 1 :
                      textLength < 30 ? 2 :
                      textLength < 60 ? 3 :
                      Math.ceil(textLength / 15)

    let currentIndex = 0

    // Start reveal animation
    const startAnimation = () => {
      intervalRef.current = setInterval(() => {
        if (currentIndex < textLength) {
          const endIndex = Math.min(currentIndex + chunkSize, textLength)

          // Build the display text with partial reveal
          const result = text.substring(0, endIndex) +
                        fixedCipherText.substring(endIndex)

          setDisplayText(result)
          currentIndex = endIndex
        } else {
          // Animation complete - ensure full text is displayed
          setDisplayText(text)
          setIsRevealed(true)
          setIsAnimating(false)

          // Clear interval
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
          }
        }
      }, adjustedSpeed)
    }

    // Start with delay if specified
    if (delay > 0) {
      timeoutRef.current = setTimeout(startAnimation, delay)
    } else {
      startAnimation()
    }
  }, [text, isRevealed, isAnimating, delay, speed, fixedCipherText])

  // Handle mouse enter
  const handleMouseEnter = useCallback(() => {
    startReveal()
  }, [startReveal])

  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    // If not persisting, reset after animation completes
    if (!persistOnHover && isRevealed && !isAnimating) {
      // Small delay to prevent flicker
      setTimeout(() => {
        setIsRevealed(false)
        setIsAnimating(false)
        setDisplayText(fixedCipherText)
      }, 100)
    }
  }, [persistOnHover, isRevealed, isAnimating, fixedCipherText])

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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseEnter}
      style={{
        fontFamily: 'inherit',
        letterSpacing: 'inherit',
        cursor: 'pointer',
        display: 'inline-block',
        whiteSpace: 'pre-wrap',
        position: 'relative',
        padding: '2px 4px',
        margin: '-2px -4px',
        touchAction: 'auto',
        WebkitTapHighlightColor: 'transparent',
        userSelect: 'none',
        transition: 'none',
        minHeight: '1em'
      }}
      data-cipher-text="true"
      data-revealed={isRevealed}
    >
      {displayText || fixedCipherText}
    </Component>
  )
}