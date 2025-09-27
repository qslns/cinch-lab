'use client'

import { useState, useEffect } from 'react'

export const breakpoints = {
  mobile: 320,
  tablet: 768,
  laptop: 1024,
  desktop: 1440,
  wide: 1920,
}

export type Breakpoint = keyof typeof breakpoints

export const useResponsive = () => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>('desktop')
  const [windowSize, setWindowSize] = useState({
    width: 1024,
    height: 768,
  })

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      setWindowSize({ width, height })

      if (width >= breakpoints.wide) {
        setCurrentBreakpoint('wide')
      } else if (width >= breakpoints.desktop) {
        setCurrentBreakpoint('desktop')
      } else if (width >= breakpoints.laptop) {
        setCurrentBreakpoint('laptop')
      } else if (width >= breakpoints.tablet) {
        setCurrentBreakpoint('tablet')
      } else {
        setCurrentBreakpoint('mobile')
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = currentBreakpoint === 'mobile'
  const isTablet = currentBreakpoint === 'tablet'
  const isLaptop = currentBreakpoint === 'laptop'
  const isDesktop = currentBreakpoint === 'desktop'
  const isWide = currentBreakpoint === 'wide'
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])
  const isLandscape = windowSize.width > windowSize.height
  const isPortrait = !isLandscape

  return {
    currentBreakpoint,
    windowSize,
    isMobile,
    isTablet,
    isLaptop,
    isDesktop,
    isWide,
    isTouchDevice,
    isLandscape,
    isPortrait,
    isSmallScreen: isMobile || isTablet,
    isLargeScreen: isDesktop || isWide,
  }
}