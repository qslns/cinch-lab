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
  speed = 6,
  persistOnHover = true
}: CipherTextProps) {
  const [displayText, setDisplayText] = useState('')
  const [isRevealed, setIsRevealed] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const elementRef = useRef<HTMLElement>(null)
  const parentHoverRef = useRef<boolean>(false)

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

  // Optimized reveal animation
  const startReveal = useCallback(() => {
    if (isRevealed || !text || isHovering) return

    setIsHovering(true)

    // Clear any existing intervals
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    const textLength = text.length

    // Adaptive chunk size based on text length
    const chunkSize = textLength < 10 ? 1 :
                      textLength < 30 ? 2 :
                      textLength < 50 ? 3 :
                      Math.ceil(textLength / 12)

    let currentIndex = 0

    // Start reveal immediately or with delay
    const startAnimation = () => {
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
            intervalRef.current = null
          }
          setIsRevealed(true)
        }
      }, speed)
    }

    if (delay > 0) {
      timeoutRef.current = setTimeout(startAnimation, delay)
    } else {
      startAnimation()
    }
  }, [text, isRevealed, isHovering, delay, speed, fixedCipherText])

  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    // Add a small delay to prevent flicker when moving between elements
    setTimeout(() => {
      if (!parentHoverRef.current) {
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
        if (!persistOnHover) {
          setTimeout(() => {
            setIsRevealed(false)
            setDisplayText(fixedCipherText)
          }, 200)
        }
      }
    }, 50)
  }, [persistOnHover, fixedCipherText])

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

  // Handle parent hover for better area coverage
  useEffect(() => {
    const handleParentHover = (e: MouseEvent) => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect()
        const buffer = 20 // Pixels of buffer around the element

        if (e.clientX >= rect.left - buffer &&
            e.clientX <= rect.right + buffer &&
            e.clientY >= rect.top - buffer &&
            e.clientY <= rect.bottom + buffer) {
          parentHoverRef.current = true
          if (!isHovering) {
            startReveal()
          }
        } else {
          parentHoverRef.current = false
        }
      }
    }

    if (elementRef.current?.parentElement) {
      elementRef.current.parentElement.addEventListener('mousemove', handleParentHover)
      return () => {
        if (elementRef.current?.parentElement) {
          elementRef.current.parentElement.removeEventListener('mousemove', handleParentHover)
        }
      }
    }
  }, [startReveal, isHovering])

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
      onTouchStart={startReveal}
      style={{
        fontFamily: 'inherit',
        letterSpacing: 'inherit',
        cursor: 'pointer',
        display: 'inline-block',
        whiteSpace: 'pre-wrap',
        position: 'relative',
        padding: '4px 8px',
        margin: '-4px -8px',
        touchAction: 'auto',
        WebkitTapHighlightColor: 'transparent',
        userSelect: 'none',
        minWidth: 'fit-content'
      }}
      data-cipher-text="true"
    >
      {displayText || fixedCipherText}
    </Component>
  )
}