'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

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
  speed = 15,
  persistOnHover = true
}: CipherTextProps) {
  const [displayText, setDisplayText] = useState('')
  const [isRevealed, setIsRevealed] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const elementRef = useRef<HTMLElement>(null)

  // Enhanced cipher characters - more cryptographic feel
  const cipherChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789¢£¤¥§©®™°±²³µ¶·¸¹º»¼½¾¿×÷αβγδεζηθικλμνξοπρστυφχψωΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ'

  // Generate random cipher character
  const getRandomCipher = useCallback(() => {
    return cipherChars[Math.floor(Math.random() * cipherChars.length)]
  }, [])

  // Generate cipher text with same length as original
  const generateCipherText = useCallback((length: number) => {
    return Array.from({ length }, () => getRandomCipher()).join('')
  }, [getRandomCipher])

  // Scramble effect while revealing
  const scrambleText = useCallback((currentIndex: number, targetText: string) => {
    const chars = targetText.split('')
    const result = []

    for (let i = 0; i < chars.length; i++) {
      if (i < currentIndex) {
        // Already revealed characters
        result.push(chars[i])
      } else if (i === currentIndex || i === currentIndex + 1) {
        // Characters being revealed - show scramble effect for smoother transition
        result.push(Math.random() > 0.3 ? getRandomCipher() : chars[i])
      } else {
        // Not yet revealed
        result.push(getRandomCipher())
      }
    }

    return result.join('')
  }, [getRandomCipher])

  // Initialize with cipher text
  useEffect(() => {
    if (!isRevealed && text) {
      setDisplayText(generateCipherText(text.length))
    } else if (isRevealed) {
      setDisplayText(text)
    }
  }, [text, isRevealed, generateCipherText])

  // Continuous cipher animation when not revealed
  useEffect(() => {
    if (!isRevealed && !isHovering && text) {
      const animInterval = setInterval(() => {
        setDisplayText(generateCipherText(text.length))
      }, 100) // Faster cipher animation

      return () => clearInterval(animInterval)
    }
  }, [text, isRevealed, isHovering, generateCipherText])

  // Handle reveal animation
  const startReveal = useCallback(() => {
    if (isRevealed || !text) return

    let currentIndex = 0
    setIsHovering(true)

    // Clear any existing intervals
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Start reveal with delay
    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(scrambleText(currentIndex, text))

          if (currentIndex === text.length) {
            // Fully revealed
            setDisplayText(text)
            if (intervalRef.current) {
              clearInterval(intervalRef.current)
            }
            if (persistOnHover) {
              setIsRevealed(true)
            }
          }
          currentIndex++
        }
      }, speed)
    }, delay)
  }, [text, isRevealed, delay, speed, scrambleText, persistOnHover])

  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)

    // If not persisting, reset after a delay
    if (!persistOnHover && isRevealed) {
      setTimeout(() => {
        setIsRevealed(false)
      }, 500)
    }
  }, [persistOnHover, isRevealed])

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
      onPointerEnter={startReveal}
      onPointerLeave={handleMouseLeave}
      style={{
        fontFamily: 'monospace',
        letterSpacing: '0.05em',
        cursor: 'pointer',
        display: 'inline-block',
        whiteSpace: 'pre-wrap',
        padding: '2px 4px',
        margin: '-2px -4px',
        position: 'relative',
        touchAction: 'auto',
        WebkitTapHighlightColor: 'transparent'
      }}
      data-cipher-text="true"
    >
      {displayText || generateCipherText(text.length)}
    </Component>
  )
}