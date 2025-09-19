'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useCipher } from '@/contexts/CipherContext'

interface CipherTextProps {
  text: string
  className?: string
  as?: React.ElementType
  delay?: number
  speed?: number
  persistOnHover?: boolean
  autoReveal?: boolean
}

export default function CipherText({
  text,
  className = '',
  as: Component = 'span',
  delay = 0,
  speed = 3,
  persistOnHover = true,
  autoReveal = false
}: CipherTextProps) {
  const { isCipherEnabled } = useCipher()
  const [displayText, setDisplayText] = useState('')
  const [isRevealed, setIsRevealed] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const animationFrameRef = useRef<number | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const elementRef = useRef<HTMLElement>(null)
  const startTimeRef = useRef<number>(0)
  const lastFrameTime = useRef<number>(0)

  // Cipher characters - optimized for better visual effect
  const cipherChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  // Generate random cipher character
  const getRandomCipher = useCallback(() => {
    return cipherChars[Math.floor(Math.random() * cipherChars.length)]
  }, [])

  // Generate cipher text with spaces preserved
  const generateCipherText = useCallback((originalText: string) => {
    return originalText.split('').map(char =>
      char === ' ' ? ' ' : getRandomCipher()
    ).join('')
  }, [getRandomCipher])

  // Generate fixed cipher text (only generated once per text change)
  const fixedCipherText = useMemo(() => {
    if (!text) return ''
    return generateCipherText(text)
  }, [text, generateCipherText])

  // Initialize with fixed cipher text
  useEffect(() => {
    if (!text) {
      setDisplayText('')
      return
    }
    // If cipher is disabled globally, show normal text
    if (!isCipherEnabled) {
      setDisplayText(text)
      setIsRevealed(true)
      return
    }
    if (!isRevealed && !hasInteracted) {
      setDisplayText(fixedCipherText)
    }
  }, [text, fixedCipherText, isRevealed, hasInteracted, isCipherEnabled])

  // Smooth reveal animation using requestAnimationFrame
  const startReveal = useCallback(() => {
    // If cipher is disabled, don't animate
    if (!isCipherEnabled) return

    // Prevent multiple simultaneous animations
    if (isAnimating || isRevealed || !text || typeof text !== 'string') return

    setIsAnimating(true)
    setHasInteracted(true)

    // Clear any existing animations
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    const textLength = text.length
    const duration = Math.min(500, Math.max(150, textLength * speed * 6)) // Optimized duration

    // Start animation
    const startAnimation = () => {
      startTimeRef.current = performance.now()
      lastFrameTime.current = 0

      const animate = (currentTime: number) => {
        // Frame rate limiting for better performance (60fps max)
        if (currentTime - lastFrameTime.current < 16.67) {
          animationFrameRef.current = requestAnimationFrame(animate)
          return
        }
        lastFrameTime.current = currentTime

        const elapsed = currentTime - startTimeRef.current
        const progress = Math.min(elapsed / duration, 1)

        // Optimized easing function
        const easedProgress = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2

        const revealedLength = Math.floor(textLength * easedProgress)

        // Optimized text generation
        const chars = text.split('')
        const result = chars.map((char, i) => {
          if (i < revealedLength) return char
          if (char === ' ') return ' '
          // Reduced randomness for better performance
          return Math.random() > 0.98 ? getRandomCipher() : (fixedCipherText[i] || getRandomCipher())
        }).join('')

        setDisplayText(result)

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate)
        } else {
          // Animation complete
          setDisplayText(text)
          setIsRevealed(true)
          setIsAnimating(false)
          animationFrameRef.current = null
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Start with delay if specified
    if (delay > 0) {
      timeoutRef.current = setTimeout(startAnimation, delay)
    } else {
      startAnimation()
    }
  }, [text, isRevealed, isAnimating, delay, speed, fixedCipherText, getRandomCipher, isCipherEnabled])

  // Handle mouse enter
  const handleMouseEnter = useCallback(() => {
    startReveal()
  }, [startReveal])

  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    // Don't reset if cipher is disabled globally
    if (!isCipherEnabled) return

    // Only reset if not persisting and after a longer delay to prevent accidental resets
    if (!persistOnHover && isRevealed && !isAnimating) {
      // Longer delay to prevent flicker and ensure user intended to leave
      setTimeout(() => {
        // Double check mouse is still not over the element
        if (!elementRef.current?.matches(':hover')) {
          setIsRevealed(false)
          setIsAnimating(false)
          setHasInteracted(false)
          setDisplayText(fixedCipherText)
        }
      }, 300) // Reduced delay for better responsiveness
    }
  }, [persistOnHover, isRevealed, isAnimating, fixedCipherText, isCipherEnabled])

  // Auto-reveal on mount if specified or if cipher is disabled
  useEffect(() => {
    if (!isCipherEnabled) {
      setDisplayText(text)
      setIsRevealed(true)
      return
    }
    if (autoReveal && !hasInteracted) {
      const timer = setTimeout(() => {
        startReveal()
      }, delay + 100)
      return () => clearTimeout(timer)
    }
  }, [autoReveal, delay, startReveal, hasInteracted, isCipherEnabled, text])

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // Handle empty text or invalid text
  if (!text || typeof text !== 'string') {
    const EmptyComponent = Component as any
    return <EmptyComponent className={className}>{text || ''}</EmptyComponent>
  }

  const DynamicComponent = Component as any

  // If cipher is disabled globally, render plain text without interactions
  if (!isCipherEnabled) {
    const PlainComponent = Component as any
    return (
      <PlainComponent className={className}>
        {text}
      </PlainComponent>
    )
  }

  return (
    <DynamicComponent
      ref={elementRef}
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
        touchAction: 'auto',
        WebkitTapHighlightColor: 'transparent',
        userSelect: 'none',
        transition: 'opacity 0.15s ease',
        minHeight: '1em',
        isolation: 'isolate',
        willChange: isAnimating ? 'contents' : 'auto'
      }}
      data-cipher-text="true"
      data-revealed={isRevealed}
    >
      {displayText || fixedCipherText}
    </DynamicComponent>
  )
}