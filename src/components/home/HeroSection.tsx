'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useSpring, useMotionValue, animate } from 'framer-motion'
import { ImagePlaceholder } from './ImagePlaceholder'

// THE YON custom easing
const yonEase = [0.22, 1, 0.36, 1] as const

// Animated character reveal
function CharacterReveal({
  text,
  className,
  delay = 0,
  stagger = 0.03
}: {
  text: string
  className?: string
  delay?: number
  stagger?: number
}) {
  return (
    <motion.span className={`inline-block overflow-hidden ${className || ''}`}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: delay + i * stagger,
            ease: yonEase,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}

// Scattered floating images component
function FloatingImage({
  left,
  top,
  rotation,
  delay,
  label,
  variant = 'dark',
  aspectRatio = '3/4',
  size = 'medium',
}: {
  left: string
  top: string
  rotation: number
  delay: number
  label: string
  variant?: 'dark' | 'medium' | 'light'
  aspectRatio?: string
  size?: 'small' | 'medium' | 'large'
}) {
  const sizeClasses = {
    small: 'w-32 md:w-40 lg:w-48',
    medium: 'w-40 md:w-56 lg:w-72',
    large: 'w-48 md:w-64 lg:w-80',
  }

  return (
    <motion.div
      className={`absolute ${sizeClasses[size]}`}
      style={{ left, top }}
      initial={{ opacity: 0, y: 60, rotate: rotation * 2, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, rotate: rotation, scale: 1 }}
      transition={{
        duration: 1.2,
        delay,
        ease: yonEase,
      }}
      whileHover={{
        scale: 1.03,
        rotate: rotation * 0.5,
        transition: { duration: 0.4 },
      }}
    >
      <ImagePlaceholder
        label={label}
        variant={variant}
        aspectRatio={aspectRatio}
      />
    </motion.div>
  )
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth scroll parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.6], [0, -120])
  const heroScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92])

  // Mouse parallax
  const springConfig = { stiffness: 150, damping: 30 }
  const parallaxX = useSpring(mouseX, springConfig)
  const parallaxY = useSpring(mouseY, springConfig)

  useEffect(() => {
    setIsMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      const moveX = (e.clientX - centerX) / 50
      const moveY = (e.clientY - centerY) / 50
      mouseX.set(moveX)
      mouseY.set(moveY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  if (!isMounted) {
    return (
      <section className="relative min-h-[100vh] flex items-center justify-center">
        <div className="text-center">
          <span className="font-serif text-4xl text-yon-black">THE YON</span>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-[110vh] overflow-hidden bg-yon-white"
    >
      {/* Subtle grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

      {/* Asymmetric scattered images - Faerie style */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ x: parallaxX, y: parallaxY }}
      >
        <FloatingImage
          left="5%"
          top="15%"
          rotation={-2.5}
          delay={0.8}
          label="AW25 / 001"
          variant="dark"
          aspectRatio="3/4"
          size="medium"
        />
        <FloatingImage
          left="68%"
          top="8%"
          rotation={1.5}
          delay={1.0}
          label="FRAGMENT"
          variant="light"
          aspectRatio="4/5"
          size="small"
        />
        <FloatingImage
          left="75%"
          top="55%"
          rotation={-1.8}
          delay={1.2}
          label="DETAIL"
          variant="medium"
          aspectRatio="1/1"
          size="medium"
        />
        <FloatingImage
          left="2%"
          top="60%"
          rotation={2.2}
          delay={1.4}
          label="PROCESS"
          variant="light"
          aspectRatio="16/10"
          size="small"
        />
        <FloatingImage
          left="45%"
          top="70%"
          rotation={-1.2}
          delay={1.6}
          label="SS25 / 003"
          variant="dark"
          aspectRatio="4/5"
          size="large"
        />
      </motion.div>

      {/* Main Content - Asymmetric layout */}
      <motion.div
        className="relative z-20 min-h-[100vh] flex flex-col justify-center px-6 md:px-8 lg:px-16"
        style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
      >
        <div className="max-w-[1600px] mx-auto w-full">
          {/* Asymmetric Grid */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-0">
            {/* Left side - Main Title - takes 60% */}
            <div className="lg:col-span-7 lg:col-start-1">
              {/* Tagline with rotation */}
              <motion.div
                className="flex items-center gap-3 mb-8"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: yonEase }}
                style={{ transform: 'rotate(-0.5deg)' }}
              >
                <span className="w-12 h-px bg-yon-grey" />
                <span className="font-mono text-[9px] text-yon-steel tracking-[0.25em] uppercase">
                  Experimental Fashion Portfolio
                </span>
                <span className="font-mono text-[9px] text-yon-grey/40 tracking-wider ml-2">
                  2024 — 2025
                </span>
              </motion.div>

              {/* Main Title - Asymmetric stacking */}
              <div className="relative">
                <h1 className="font-serif text-[20vw] md:text-[16vw] lg:text-[12vw] leading-[0.8] tracking-[-0.03em] text-yon-black">
                  <motion.span
                    className="block"
                    initial={{ opacity: 0, x: -100, rotate: -2 }}
                    animate={{ opacity: 1, x: 0, rotate: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: yonEase }}
                  >
                    THE
                  </motion.span>
                  <motion.span
                    className="block ml-[8%] lg:ml-[12%]"
                    initial={{ opacity: 0, x: 100, rotate: 2 }}
                    animate={{ opacity: 1, x: 0, rotate: 0 }}
                    transition={{ duration: 1, delay: 0.5, ease: yonEase }}
                    style={{ transform: 'rotate(0.5deg)' }}
                  >
                    YON
                  </motion.span>
                </h1>

                {/* Subtitle overlay - positioned asymmetrically */}
                <motion.div
                  className="absolute -bottom-4 left-[15%] lg:left-[20%]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9, ease: yonEase }}
                >
                  <p className="font-mono text-xs md:text-sm text-yon-accent tracking-[0.2em] uppercase">
                    저 너머 — Beyond
                  </p>
                </motion.div>
              </div>

              {/* Location & Season info - rotated */}
              <motion.div
                className="mt-16 md:mt-20 flex items-center gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                style={{ transform: 'rotate(-0.3deg)' }}
              >
                <span className="font-mono text-[10px] text-yon-grey tracking-[0.15em]">
                  SEOUL
                </span>
                <span className="w-16 h-px bg-yon-grey/20" />
                <span className="font-mono text-[10px] text-yon-grey tracking-[0.15em]">
                  TOKYO
                </span>
                <span className="w-16 h-px bg-yon-grey/20" />
                <span className="font-mono text-[10px] text-yon-grey/50 tracking-[0.1em]">
                  AW25 — SS25
                </span>
              </motion.div>
            </div>

            {/* Right side - Description - takes 40%, offset */}
            <motion.div
              className="lg:col-span-4 lg:col-start-9 lg:pt-32"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: yonEase }}
            >
              <div className="lg:transform lg:rotate-[0.5deg]">
                <p className="text-lg md:text-xl text-yon-black leading-[1.6] font-light max-w-sm">
                  Fashion that transcends time and space.
                  Every element twisted, yet perfectly harmonious.
                </p>
                <p className="mt-5 text-sm text-yon-grey leading-[1.8]">
                  뒤틀렸지만 조화로운 — 실험적 패션의 경계를 탐구합니다.
                  모든 요소가 약간씩 어긋나 있지만, 전체적으로 아름다운 구성.
                </p>

                {/* CTA - Asymmetric placement */}
                <motion.div
                  className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <Link
                    href="/collections"
                    className="group inline-flex items-center gap-3 px-7 py-4 bg-yon-black text-yon-white font-mono text-[10px] tracking-[0.15em] uppercase hover:bg-yon-charcoal transition-all duration-300 hover:translate-x-1"
                    data-cursor="link"
                  >
                    <span>Explore Collections</span>
                    <motion.span
                      className="transform group-hover:translate-x-1 transition-transform"
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </Link>
                  <Link
                    href="/process"
                    className="group inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.12em] uppercase text-yon-grey hover:text-yon-black transition-colors"
                    data-cursor="link"
                  >
                    <span className="w-4 h-px bg-yon-grey group-hover:w-6 transition-all" />
                    <span>Process</span>
                  </Link>
                </motion.div>

                {/* Designer credit */}
                <motion.div
                  className="mt-12 pt-6 border-t border-yon-platinum/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                >
                  <span className="font-mono text-[9px] text-yon-grey/60 tracking-[0.2em] uppercase block">
                    By Taehyun Lee
                  </span>
                  <span className="font-mono text-[9px] text-yon-grey/40 tracking-[0.1em] block mt-1">
                    Sasada Fashion Academy
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator - Asymmetric position */}
      <motion.div
        className="absolute bottom-12 left-12 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        <div className="flex items-center gap-4" style={{ transform: 'rotate(-90deg) translateX(-50px)' }}>
          <motion.div
            className="w-16 h-px bg-gradient-to-r from-yon-grey/60 to-transparent origin-left"
            animate={{ scaleX: [1, 0.5, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="font-mono text-[8px] text-yon-grey/50 tracking-[0.25em] uppercase">
            Scroll
          </span>
        </div>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-1/4 right-8 z-10 hidden lg:block"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        <div className="w-32 h-32 border border-yon-grey/30 rotate-45" />
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 left-1/4 z-10 hidden lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ delay: 2 }}
      >
        <span className="font-serif text-[200px] text-yon-grey leading-none">
          ¶
        </span>
      </motion.div>
    </section>
  )
}
