'use client'

import { useState, useEffect, useRef } from 'react'

interface CipherTextProps {
  text: string
  className?: string
  as?: keyof JSX.IntrinsicElements
  delay?: number
}

export default function CipherText({
  text,
  className = '',
  as: Component = 'span' as keyof JSX.IntrinsicElements,
  delay = 0
}: CipherTextProps) {
  const [displayText, setDisplayText] = useState('')
  const [isRevealed, setIsRevealed] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Cipher characters - mix of special characters and numbers
  const cipherChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789¢£¤¥§©®™°±²³µ¶·¸¹º»¼½¾¿×÷'

  // Generate random cipher character
  const getRandomCipher = () => {
    return cipherChars[Math.floor(Math.random() * cipherChars.length)]
  }

  // Generate cipher text with same length as original
  const generateCipherText = (length: number) => {
    return Array.from({ length }, () => getRandomCipher()).join('')
  }

  // Initialize with cipher text
  useEffect(() => {
    if (!isRevealed) {
      setDisplayText(generateCipherText(text.length))
    }
  }, [text, isRevealed])

  // Handle hover - reveal animation
  const handleMouseEnter = () => {
    if (isRevealed) return

    let currentIndex = 0
    const chars = text.split('')
    const cipherArray = generateCipherText(text.length).split('')

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    // Animate reveal with delay
    setTimeout(() => {
      intervalRef.current = setInterval(() => {
        if (currentIndex < chars.length) {
          cipherArray[currentIndex] = chars[currentIndex]
          setDisplayText(cipherArray.join(''))
          currentIndex++
        } else {
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
          }
          setIsRevealed(true)
        }
      }, 30) // Speed of reveal animation
    }, delay)
  }

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return (
    <Component
      className={className}
      onMouseEnter={handleMouseEnter}
      style={{
        fontFamily: 'monospace',
        letterSpacing: '0.05em',
        cursor: 'default'
      }}
    >
      {displayText}
    </Component>
  )
}