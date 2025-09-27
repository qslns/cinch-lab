'use client'

import { useResponsive } from '@/hooks/useResponsive'
import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'

interface ResponsiveWrapperProps {
  children: ReactNode
  className?: string
  mobileLayout?: ReactNode
  tabletLayout?: ReactNode
  desktopLayout?: ReactNode
}

export const ResponsiveWrapper = ({
  children,
  className = '',
  mobileLayout,
  tabletLayout,
  desktopLayout
}: ResponsiveWrapperProps) => {
  const { isMobile, isTablet, isSmallScreen } = useResponsive()

  const getLayout = () => {
    if (isMobile && mobileLayout) return mobileLayout
    if (isTablet && tabletLayout) return tabletLayout
    if (!isSmallScreen && desktopLayout) return desktopLayout
    return children
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={isSmallScreen ? 'small' : 'large'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={className}
      >
        {getLayout()}
      </motion.div>
    </AnimatePresence>
  )
}

// Mobile Menu Component
export const MobileMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          className="fixed inset-0 z-50 bg-white"
        >
          <div className="p-6">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center"
            >
              <span className="block w-6 h-0.5 bg-black rotate-45 absolute" />
              <span className="block w-6 h-0.5 bg-black -rotate-45 absolute" />
            </button>

            <nav className="mt-20 space-y-6">
              <a href="/" className="block text-2xl font-mono hover:text-red-500 transition-colors">
                HOME
              </a>
              <a href="/lab" className="block text-2xl font-mono hover:text-red-500 transition-colors">
                LAB
              </a>
              <a href="/collections" className="block text-2xl font-mono hover:text-red-500 transition-colors">
                COLLECTIONS
              </a>
              <a href="/archive" className="block text-2xl font-mono hover:text-red-500 transition-colors">
                ARCHIVE
              </a>
              <a href="/about" className="block text-2xl font-mono hover:text-red-500 transition-colors">
                ABOUT
              </a>
              <a href="/contact" className="block text-2xl font-mono hover:text-red-500 transition-colors">
                CONTACT
              </a>
              <a href="/analysis" className="block text-2xl font-mono hover:text-red-500 transition-colors">
                ANALYSIS
              </a>
            </nav>

            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-sm text-gray-600 font-mono">
                CINCH • RELEASE • REPEAT
              </p>
              <p className="text-xs text-gray-400 mt-2">
                NO SALES. ONLY CREATION.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Touch-friendly Button
export const TouchButton = ({ children, onClick, className = '' }: any) => {
  const { isTouchDevice } = useResponsive()

  return (
    <button
      onClick={onClick}
      className={`
        ${className}
        ${isTouchDevice ? 'min-h-[44px] min-w-[44px] active:scale-95' : 'hover:scale-105'}
        transition-transform duration-200
      `}
    >
      {children}
    </button>
  )
}

// Conditional Parallax
export const ConditionalParallax = ({ children, offset = 50 }: any) => {
  const { isSmallScreen, isTouchDevice } = useResponsive()

  if (isSmallScreen || isTouchDevice) {
    return <div>{children}</div>
  }

  return (
    <motion.div
      initial={{ y: 0 }}
      whileInView={{ y: -offset }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: false, amount: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

// Adaptive Grid
export const AdaptiveGrid = ({ children, className = '' }: any) => {
  const { isMobile, isTablet, isDesktop } = useResponsive()

  const getGridClass = () => {
    if (isMobile) return 'grid-cols-1'
    if (isTablet) return 'grid-cols-2'
    if (isDesktop) return 'grid-cols-3'
    return 'grid-cols-4'
  }

  return (
    <div className={`grid gap-4 ${getGridClass()} ${className}`}>
      {children}
    </div>
  )
}