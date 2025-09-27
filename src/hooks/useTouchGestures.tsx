'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface SwipeHandlers {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  onTap?: () => void
  onDoubleTap?: () => void
  onLongPress?: () => void
  onPinch?: (scale: number) => void
}

export const useTouchGestures = (handlers: SwipeHandlers) => {
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 })
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 })
  const [lastTap, setLastTap] = useState(0)
  const [isPinching, setIsPinching] = useState(false)
  const [initialPinchDistance, setInitialPinchDistance] = useState(0)
  const longPressTimer = useRef<NodeJS.Timeout>()

  const minSwipeDistance = 50
  const doubleTapDelay = 300
  const longPressDelay = 500

  const getDistance = (touches: TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX
    const dy = touches[0].clientY - touches[1].clientY
    return Math.sqrt(dx * dx + dy * dy)
  }

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0]
    setTouchStart({ x: touch.clientX, y: touch.clientY })
    setTouchEnd({ x: touch.clientX, y: touch.clientY })

    // Handle pinch start
    if (e.touches.length === 2) {
      setIsPinching(true)
      setInitialPinchDistance(getDistance(e.touches))
    }

    // Start long press timer
    if (handlers.onLongPress) {
      longPressTimer.current = setTimeout(() => {
        handlers.onLongPress?.()
      }, longPressDelay)
    }
  }, [handlers])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    const touch = e.touches[0]
    setTouchEnd({ x: touch.clientX, y: touch.clientY })

    // Clear long press on move
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
    }

    // Handle pinch
    if (e.touches.length === 2 && isPinching && handlers.onPinch) {
      const currentDistance = getDistance(e.touches)
      const scale = currentDistance / initialPinchDistance
      handlers.onPinch(scale)
    }
  }, [isPinching, initialPinchDistance, handlers])

  const handleTouchEnd = useCallback(() => {
    // Clear long press timer
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
    }

    // Reset pinch
    setIsPinching(false)
    setInitialPinchDistance(0)

    const deltaX = touchEnd.x - touchStart.x
    const deltaY = touchEnd.y - touchStart.y
    const absDeltaX = Math.abs(deltaX)
    const absDeltaY = Math.abs(deltaY)

    // Check for tap or double tap
    if (absDeltaX < 10 && absDeltaY < 10) {
      const currentTime = Date.now()
      const timeDiff = currentTime - lastTap

      if (timeDiff < doubleTapDelay && timeDiff > 0) {
        handlers.onDoubleTap?.()
        setLastTap(0)
      } else {
        handlers.onTap?.()
        setLastTap(currentTime)
      }
      return
    }

    // Check for swipe
    if (absDeltaX > minSwipeDistance || absDeltaY > minSwipeDistance) {
      if (absDeltaX > absDeltaY) {
        // Horizontal swipe
        if (deltaX > 0) {
          handlers.onSwipeRight?.()
        } else {
          handlers.onSwipeLeft?.()
        }
      } else {
        // Vertical swipe
        if (deltaY > 0) {
          handlers.onSwipeDown?.()
        } else {
          handlers.onSwipeUp?.()
        }
      }
    }
  }, [touchStart, touchEnd, lastTap, handlers])

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  }
}

// Touch-friendly scroll hook
export const useTouchScroll = (elementRef: React.RefObject<HTMLElement>) => {
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const handleMouseDown = useCallback((e: MouseEvent) => {
    if (!elementRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - elementRef.current.offsetLeft)
    setScrollLeft(elementRef.current.scrollLeft)
  }, [elementRef])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !elementRef.current) return
    e.preventDefault()
    const x = e.pageX - elementRef.current.offsetLeft
    const walk = (x - startX) * 2
    elementRef.current.scrollLeft = scrollLeft - walk
  }, [isDragging, startX, scrollLeft, elementRef])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    element.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      element.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [handleMouseDown, handleMouseMove, handleMouseUp, elementRef])

  return { isDragging }
}

// Touch-friendly button hook
export const useTouchButton = () => {
  const [isPressed, setIsPressed] = useState(false)
  const [isTapped, setIsTapped] = useState(false)

  const handleTouchStart = useCallback(() => {
    setIsPressed(true)
  }, [])

  const handleTouchEnd = useCallback(() => {
    setIsPressed(false)
    setIsTapped(true)
    setTimeout(() => setIsTapped(false), 200)
  }, [])

  return {
    isPressed,
    isTapped,
    touchHandlers: {
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd,
    },
  }
}

// Improved touch detection
export const useIsTouchDevice = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches
      )
    }

    checkTouch()
    window.addEventListener('resize', checkTouch)

    return () => {
      window.removeEventListener('resize', checkTouch)
    }
  }, [])

  return isTouchDevice
}