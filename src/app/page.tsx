'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import CinchFilters from '@/components/CinchFilters'
import { 
  performanceMonitor, 
  animationController, 
  effectObserver,
  isMobile,
  throttle,
  easings
} from '@/lib/performance'

export default function ExperimentalHomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [fps, setFps] = useState(60)
  const [isAccessible, setIsAccessible] = useState(false)
  const [extremeMode, setExtremeMode] = useState(false)
  const [timeMode, setTimeMode] = useState('night')
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const mainRef = useRef<HTMLDivElement>(null)
  const konamiCode = useRef<string[]>([])

  // Initialize performance monitoring
  useEffect(() => {
    performanceMonitor.start()
    const unsubscribe = performanceMonitor.onFPSUpdate((currentFps) => {
      setFps(currentFps)
      if (currentFps < 30) {
        document.body.classList.add('low-performance')
      } else {
        document.body.classList.remove('low-performance')
      }
    })

    // Set time-based theme
    const hour = new Date().getHours()
    if (hour >= 6 && hour < 12) setTimeMode('dawn')
    else if (hour >= 12 && hour < 18) setTimeMode('day')
    else if (hour >= 18 && hour < 24) setTimeMode('dusk')
    else setTimeMode('night')

    // Loading complete
    const timer = setTimeout(() => setIsLoading(false), 1500)

    return () => {
      performanceMonitor.stop()
      unsubscribe()
      clearTimeout(timer)
    }
  }, [])

  // Apply time mode
  useEffect(() => {
    document.body.className = ''
    document.body.classList.add(`${timeMode}-mode`)
    if (isAccessible) document.body.classList.add('accessible-mode')
    if (extremeMode) document.body.classList.add('extreme-mode')
  }, [timeMode, isAccessible, extremeMode])

  // Konami Code Detection
  useEffect(() => {
    const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
    
    const handleKeyPress = (e: KeyboardEvent) => {
      konamiCode.current.push(e.key)
      if (konamiCode.current.length > KONAMI.length) {
        konamiCode.current.shift()
      }
      
      if (konamiCode.current.join('') === KONAMI.join('')) {
        setExtremeMode(true)
        setTimeout(() => setExtremeMode(false), 10000) // 10 seconds of extreme mode
      }
      
      // ESC to cancel effects
      if (e.key === 'Escape') {
        setIsAccessible(true)
        setExtremeMode(false)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  // Mouse tracking for magnetic effects
  const handleMouseMove = useCallback(
    throttle((e: MouseEvent) => {
      if (!isAccessible && !isMobile()) {
        setMousePos({ x: e.clientX, y: e.clientY })
        
        // Magnetic effect on elements
        const magneticElements = document.querySelectorAll('.magnetic-zone')
        magneticElements.forEach((el) => {
          const rect = el.getBoundingClientRect()
          const centerX = rect.left + rect.width / 2
          const centerY = rect.top + rect.height / 2
          const deltaX = e.clientX - centerX
          const deltaY = e.clientY - centerY
          const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
          
          if (distance < 150) {
            const force = (150 - distance) / 150
            const translateX = deltaX * force * 0.2
            const translateY = deltaY * force * 0.2
            ;(el as HTMLElement).style.transform = `translate(${translateX}px, ${translateY}px)`
          } else {
            ;(el as HTMLElement).style.transform = ''
          }
        })
      }
    }, 16),
    [isAccessible]
  )

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  const sections = [
    { id: 'manifesto', title: 'MANIFESTO', subtitle: 'Cinch • Release • Repeat' },
    { id: 'collections', title: 'COLLECTIONS', subtitle: 'Experimental Fashion' },
    { id: 'laboratory', title: 'LABORATORY', subtitle: 'Digital Experiments' },
    { id: 'archive', title: 'ARCHIVE', subtitle: 'Past • Present • Future' },
  ]

  return (
    <>
      <CinchFilters />
      
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="cinch-loading"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>

      {/* FPS Counter */}
      <div className={`fps-counter ${fps < 30 ? 'low-fps' : ''}`}>
        FPS: {fps}
      </div>

      {/* Accessibility Toggle */}
      <button
        className="accessibility-toggle"
        onClick={() => setIsAccessible(!isAccessible)}
        aria-label="Toggle Accessibility Mode"
      >
        A
      </button>

      {/* Noise Overlay */}
      {!isAccessible && !isMobile() && <div className="noise-overlay" />}

      {/* Main Content */}
      <main ref={mainRef} className="min-h-screen relative">
        {/* Hero Section */}
        <section className="h-screen flex items-center justify-center relative overflow-hidden">
          {/* Background Distortion */}
          <div className="absolute inset-0 distortion-container" />
          
          {/* Glitch Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="text-center z-10"
          >
            <h1 
              className="glitch text-6xl md:text-8xl lg:text-9xl mb-4"
              data-text="CINCH LAB"
            >
              CINCH LAB
            </h1>
            <p className="liquid-text">
              Experimental Fashion Laboratory
            </p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.8 }}
              className="mt-8 text-sm tracking-[0.3em] uppercase"
            >
              Cinch • Release • Repeat
            </motion.p>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-[1px] h-20 bg-white opacity-50" />
          </motion.div>
        </section>

        {/* Navigation Grid */}
        <section className="min-h-screen flex items-center justify-center px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="tear-content"
              >
                <Link
                  href={`/${section.id}`}
                  className="block group relative overflow-hidden"
                >
                  <div className="aspect-square bg-black border border-white relative">
                    {/* RGB Split Effect */}
                    <div className="rgb-split absolute inset-0">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center magnetic-zone">
                          <h2 className="morph-nav text-2xl md:text-3xl mb-2">
                            {section.title}
                          </h2>
                          <p className="text-xs tracking-widest opacity-50 group-hover:opacity-100 transition-opacity">
                            {section.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-white mix-blend-difference opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Products - 3D Showcase */}
        <section className="min-h-screen py-20 px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto"
          >
            <h2 className="glitch text-4xl md:text-6xl mb-12" data-text="NEW EXPERIMENTS">
              NEW EXPERIMENTS
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="product-3d">
                  <div className="product-3d-inner">
                    <div className="aspect-[3/4] bg-gradient-to-br from-gray-900 to-black border border-white relative overflow-hidden group">
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                        <p className="text-sm mb-1">PRODUCT {String(item).padStart(3, '0')}</p>
                        <p className="text-xs opacity-70">EXPERIMENTAL PIECE</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Philosophy Section */}
        <section className="min-h-screen flex items-center justify-center px-4 md:px-8 relative">
          <div className="max-w-4xl text-center">
            <motion.blockquote
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-2xl md:text-4xl lg:text-5xl font-thin leading-tight"
            >
              <span className="liquid-text">
                "Fashion's extreme limits lie not in excess,
              </span>
              <br />
              <span className="glitch inline-block mt-4" data-text="but in controlled chaos.">
                but in controlled chaos."
              </span>
            </motion.blockquote>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-8 text-sm tracking-[0.3em] uppercase opacity-70"
            >
              CINCH LAB MANIFESTO
            </motion.p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl md:text-3xl mb-8">ENTER THE LABORATORY</h3>
              <Link
                href="/laboratory"
                className="morph-nav inline-block border border-white px-8 py-4 text-sm tracking-widest uppercase"
              >
                EXPERIMENT NOW
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Custom Cursor (desktop only) */}
      {!isAccessible && !isMobile() && (
        <div
          className="fixed w-4 h-4 border border-white pointer-events-none z-[9999] mix-blend-difference"
          style={{
            left: mousePos.x - 8,
            top: mousePos.y - 8,
            transition: 'transform 0.1s ease-out',
            transform: extremeMode ? 'rotate(45deg) scale(2)' : 'rotate(0deg) scale(1)'
          }}
        />
      )}
    </>
  )
}