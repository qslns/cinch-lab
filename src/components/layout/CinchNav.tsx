'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { name: 'HOME', path: '/', emoji: '🏠', color: '#ffffff' },
  { name: 'LAB', path: '/lab', emoji: '🧪', color: '#ff006e' },
  { name: 'MOOD', path: '/mood', emoji: '✨', color: '#00f5ff' },
  { name: 'COLLECTIONS', path: '/collections', emoji: '🎨', color: '#bfff00' },
  { name: 'ARCHIVE', path: '/archive', emoji: '📁', color: '#8b00ff' },
  { name: 'ABOUT', path: '/about', emoji: '👽', color: '#ff6b00' },
  { name: 'CONTACT', path: '/contact', emoji: '📱', color: '#ffef00' }
]

const specialPages = [
  { name: 'EXTREME', path: '/extreme', emoji: '🔥' },
  { name: 'CHAOS', path: '/chaos', emoji: '🌀' },
  { name: 'VOID', path: '/void', emoji: '🕳️' },
  { name: 'DISTORTION', path: '/distortion', emoji: '🌊' }
]

export default function CinchNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const currentPage = navItems.find(item => item.path === pathname) ||
                      specialPages.find(item => item.path === pathname)

  return (
    <>
      {/* Navigation Bar */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled || isOpen ? 'bg-black/90 backdrop-blur-md' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center p-6 md:p-8">
          {/* Logo */}
          <Link href="/">
            <motion.div
              className="text-2xl md:text-3xl font-black tracking-widest cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="inline-block"
                animate={{
                  color: isOpen ? '#ffffff' : (scrolled ? '#ffffff' : '#ffffff'),
                  textShadow: isOpen ? '0 0 20px rgba(255,255,255,0.5)' : 'none'
                }}
              >
                CINCH
              </motion.span>
              <motion.span
                className="inline-block ml-2 text-sm opacity-50"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                LAB
              </motion.span>
            </motion.div>
          </Link>

          {/* Current Page Indicator (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            {currentPage && (
              <motion.div
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-lg">{currentPage.emoji}</span>
                <span className="text-sm font-bold tracking-widest">{currentPage.name}</span>
              </motion.div>
            )}
          </div>

          {/* Menu Toggle Button */}
          <motion.button
            className="relative w-12 h-12 flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className="relative w-8 h-6"
              animate={{ rotate: isOpen ? 45 : 0 }}
            >
              <motion.span
                className="absolute left-0 w-full h-0.5 bg-white"
                animate={{
                  top: isOpen ? '50%' : '0%',
                  rotate: isOpen ? 45 : 0,
                  translateY: isOpen ? '-50%' : 0
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-white"
                animate={{
                  opacity: isOpen ? 0 : 1,
                  scaleX: isOpen ? 0 : 1
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="absolute left-0 w-full h-0.5 bg-white"
                animate={{
                  bottom: isOpen ? '50%' : '0%',
                  rotate: isOpen ? -45 : 0,
                  translateY: isOpen ? '50%' : 0
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Animated ring around button */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/20"
              animate={{
                scale: isOpen ? [1, 1.2, 1] : 1,
                borderColor: isOpen ? '#ff006e' : 'rgba(255,255,255,0.2)'
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>
      </motion.nav>

      {/* Full Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Background Overlay */}
            <motion.div
              className="fixed inset-0 bg-black z-[90]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.95 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Menu Content */}
            <motion.div
              className="fixed inset-0 z-[95] flex items-center justify-center px-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="max-w-6xl w-full">
                {/* Main Navigation */}
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {navItems.map((item, index) => (
                    <Link key={item.path} href={item.path}>
                      <motion.div
                        className="relative group cursor-pointer"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                        onHoverStart={() => setHoveredItem(item.name)}
                        onHoverEnd={() => setHoveredItem(null)}
                        onClick={() => setIsOpen(false)}
                      >
                        <motion.div
                          className="p-8 rounded-2xl border-2 transition-all"
                          style={{
                            borderColor: hoveredItem === item.name ? item.color : 'rgba(255,255,255,0.1)',
                            background: hoveredItem === item.name
                              ? `linear-gradient(135deg, ${item.color}20, transparent)`
                              : pathname === item.path
                              ? 'rgba(255,255,255,0.1)'
                              : 'rgba(255,255,255,0.02)'
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <motion.span
                            className="text-4xl mb-4 block"
                            animate={{
                              rotate: hoveredItem === item.name ? [0, -10, 10, 0] : 0
                            }}
                            transition={{ duration: 0.5 }}
                          >
                            {item.emoji}
                          </motion.span>

                          <h3
                            className="text-2xl font-black mb-2"
                            style={{
                              color: hoveredItem === item.name ? item.color : '#ffffff'
                            }}
                          >
                            {item.name}
                          </h3>

                          {pathname === item.path && (
                            <motion.div
                              className="absolute top-4 right-4 w-2 h-2 rounded-full"
                              style={{ backgroundColor: item.color }}
                              animate={{
                                scale: [1, 1.5, 1],
                                opacity: [1, 0.5, 1]
                              }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                          )}
                        </motion.div>
                      </motion.div>
                    </Link>
                  ))}
                </motion.div>

                {/* Special Pages */}
                <motion.div
                  className="border-t border-white/10 pt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-sm tracking-widest opacity-50 mb-4">EXPERIMENTAL ZONES</p>
                  <div className="flex flex-wrap gap-4">
                    {specialPages.map((item, index) => (
                      <Link key={item.path} href={item.path}>
                        <motion.button
                          className="px-6 py-3 rounded-full border border-white/20 font-bold text-sm tracking-widest flex items-center gap-2"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 + index * 0.05 }}
                          whileHover={{
                            scale: 1.05,
                            borderColor: '#ffffff',
                            background: 'rgba(255,255,255,0.1)'
                          }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setIsOpen(false)}
                        >
                          <span>{item.emoji}</span>
                          <span>{item.name}</span>
                        </motion.button>
                      </Link>
                    ))}
                  </div>
                </motion.div>

                {/* Social Links */}
                <motion.div
                  className="mt-12 flex justify-center gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  {['Instagram', 'TikTok', 'Twitter', 'Discord'].map((social) => (
                    <motion.a
                      key={social}
                      href="#"
                      className="text-sm uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {social}
                    </motion.a>
                  ))}
                </motion.div>
              </div>

              {/* Decorative Elements */}
              <motion.div
                className="fixed top-20 left-20 text-6xl opacity-10"
                animate={{
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 10, repeat: Infinity }}
              >
                ✦
              </motion.div>

              <motion.div
                className="fixed bottom-20 right-20 text-6xl opacity-10"
                animate={{
                  rotate: -360,
                  scale: [1, 1.5, 1]
                }}
                transition={{ duration: 8, repeat: Infinity }}
              >
                ◈
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cursor follower for menu */}
      {isOpen && (
        <motion.div
          className="fixed w-8 h-8 rounded-full border-2 border-white/20 pointer-events-none z-[200]"
          animate={{
            x: mousePos.x - 16,
            y: mousePos.y - 16
          }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        />
      )}
    </>
  )
}