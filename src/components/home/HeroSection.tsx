'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { ImagePlaceholder } from './ImagePlaceholder'

// THE YON custom easing
const yonEase = [0.22, 1, 0.36, 1] as const

// Scattered floating images component - Enhanced for Faerie-style
function FloatingImage({
  left,
  top,
  rotation,
  delay,
  label,
  variant = 'dark',
  aspectRatio = '3/4',
  size = 'medium',
  parallaxSpeed = 0.1,
  zIndex = 10,
}: {
  left: string
  top: string
  rotation: number
  delay: number
  label: string
  variant?: 'dark' | 'medium' | 'light'
  aspectRatio?: string
  size?: 'small' | 'medium' | 'large' | 'xlarge'
  parallaxSpeed?: number
  zIndex?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, parallaxSpeed * 300])

  const sizeClasses = {
    small: 'w-24 md:w-32 lg:w-40',
    medium: 'w-32 md:w-48 lg:w-64',
    large: 'w-48 md:w-64 lg:w-80',
    xlarge: 'w-56 md:w-72 lg:w-96',
  }

  return (
    <motion.div
      ref={ref}
      className={`absolute ${sizeClasses[size]} pointer-events-auto`}
      style={{ left, top, zIndex, y }}
      initial={{ opacity: 0, y: 80, rotate: rotation * 2, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, rotate: rotation, scale: 1 }}
      transition={{
        duration: 1.4,
        delay,
        ease: yonEase,
      }}
      whileHover={{
        scale: 1.05,
        rotate: 0,
        zIndex: 50,
        transition: { duration: 0.5, ease: yonEase },
      }}
      data-cursor="image"
    >
      <ImagePlaceholder
        label={label}
        variant={variant}
        aspectRatio={aspectRatio}
      />
      {/* Margiela-style number tag */}
      <motion.span
        className="absolute -bottom-6 left-0 font-mono text-[8px] text-yon-grey/40 tracking-[0.3em]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.5 }}
      >
        {label.includes('/') ? label.split('/')[1]?.trim() : label}
      </motion.span>
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

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -150])
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])
  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -80])
  const subtitleY = useTransform(scrollYProgress, [0, 0.3], [0, -40])

  // Mouse parallax with stronger effect
  const springConfig = { stiffness: 100, damping: 25 }
  const parallaxX = useSpring(mouseX, springConfig)
  const parallaxY = useSpring(mouseY, springConfig)

  useEffect(() => {
    setIsMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      const moveX = (e.clientX - centerX) / 30
      const moveY = (e.clientY - centerY) / 30
      mouseX.set(moveX)
      mouseY.set(moveY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  if (!isMounted) {
    return (
      <section className="relative min-h-[100vh] flex items-center justify-center bg-yon-white">
        <div className="text-center">
          <span className="font-serif text-[15vw] text-yon-black leading-none">THE YON</span>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-[120vh] overflow-hidden bg-yon-white"
    >
      {/* Subtle grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

      {/* GIANT Background Typography - Extreme scale */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        style={{ opacity: heroOpacity }}
      >
        <motion.span
          className="font-serif text-[70vw] md:text-[55vw] lg:text-[45vw] text-yon-grey/[0.025] leading-none select-none whitespace-nowrap"
          initial={{ opacity: 0, scale: 0.9, x: 100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 2, ease: yonEase }}
          style={{ y: titleY }}
        >
          YON
        </motion.span>
      </motion.div>

      {/* Asymmetric scattered images - Faerie style with depth layers */}
      <motion.div
        className="absolute inset-0"
        style={{ x: parallaxX, y: parallaxY }}
      >
        {/* Layer 1 - Background images (slower parallax) */}
        <FloatingImage
          left="3%"
          top="12%"
          rotation={-3}
          delay={0.6}
          label="AW25 / 001"
          variant="dark"
          aspectRatio="3/4"
          size="large"
          parallaxSpeed={-0.15}
          zIndex={5}
        />
        <FloatingImage
          left="72%"
          top="5%"
          rotation={2}
          delay={0.8}
          label="FRAGMENT / 002"
          variant="light"
          aspectRatio="4/5"
          size="medium"
          parallaxSpeed={-0.1}
          zIndex={5}
        />

        {/* Layer 2 - Mid-ground images */}
        <FloatingImage
          left="78%"
          top="50%"
          rotation={-2}
          delay={1.0}
          label="DETAIL / 003"
          variant="medium"
          aspectRatio="1/1"
          size="large"
          parallaxSpeed={0.05}
          zIndex={15}
        />
        <FloatingImage
          left="-2%"
          top="58%"
          rotation={2.5}
          delay={1.2}
          label="PROCESS / 004"
          variant="light"
          aspectRatio="16/10"
          size="medium"
          parallaxSpeed={0.08}
          zIndex={15}
        />

        {/* Layer 3 - Foreground images (faster parallax) */}
        <FloatingImage
          left="42%"
          top="68%"
          rotation={-1.5}
          delay={1.4}
          label="SS25 / 005"
          variant="dark"
          aspectRatio="4/5"
          size="xlarge"
          parallaxSpeed={0.15}
          zIndex={25}
        />

        {/* Additional scattered element */}
        <FloatingImage
          left="55%"
          top="15%"
          rotation={1}
          delay={1.6}
          label="TOILE / 006"
          variant="medium"
          aspectRatio="3/4"
          size="small"
          parallaxSpeed={0.12}
          zIndex={20}
        />
      </motion.div>

      {/* Main Content - EXTREME Asymmetric layout */}
      <motion.div
        className="relative z-30 min-h-[100vh] flex flex-col justify-center px-4 md:px-8 lg:px-12"
        style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
      >
        <div className="max-w-[1800px] mx-auto w-full">
          {/* Asymmetric Grid - More extreme split */}
          <div className="grid lg:grid-cols-12 gap-4 lg:gap-0">
            {/* Left side - Main Title - DOMINANT */}
            <div className="lg:col-span-9 lg:col-start-1">
              {/* Tagline with micro typography */}
              <motion.div
                className="flex items-center gap-3 mb-6 lg:mb-10"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: yonEase }}
              >
                <motion.span
                  className="w-16 md:w-24 h-px bg-yon-accent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: yonEase }}
                  style={{ originX: 0 }}
                />
                <span className="font-mono text-[8px] md:text-[9px] text-yon-accent tracking-[0.35em] uppercase">
                  Experimental Fashion
                </span>
                <span className="hidden md:inline font-mono text-[8px] text-yon-grey/30 tracking-[0.2em]">
                  Portfolio 2024—25
                </span>
              </motion.div>

              {/* MAIN TITLE - EXTREME SCALE */}
              <div className="relative">
                <h1 className="relative">
                  {/* THE - First line */}
                  <motion.span
                    className="block font-serif leading-[0.75] tracking-[-0.05em] text-yon-black"
                    style={{
                      fontSize: 'clamp(5rem, 25vw, 18rem)',
                      transform: 'rotate(-1deg)',
                    }}
                    initial={{ opacity: 0, x: -200, rotate: -5 }}
                    animate={{ opacity: 1, x: 0, rotate: -1 }}
                    transition={{ duration: 1.4, delay: 0.3, ease: yonEase }}
                  >
                    THE
                    {/* Decorative accent line */}
                    <motion.span
                      className="absolute -right-8 md:-right-16 top-1/2 w-16 md:w-32 h-[2px] bg-yon-accent origin-left hidden lg:block"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1, delay: 1.2, ease: yonEase }}
                    />
                  </motion.span>

                  {/* YON - Second line with offset */}
                  <motion.span
                    className="block font-serif leading-[0.75] tracking-[-0.05em] text-yon-black ml-[8%] md:ml-[12%] lg:ml-[18%]"
                    style={{
                      fontSize: 'clamp(5rem, 25vw, 18rem)',
                      transform: 'rotate(0.5deg)',
                    }}
                    initial={{ opacity: 0, x: 200, rotate: 5 }}
                    animate={{ opacity: 1, x: 0, rotate: 0.5 }}
                    transition={{ duration: 1.4, delay: 0.5, ease: yonEase }}
                  >
                    YON
                    {/* Ghost outline effect */}
                    <motion.span
                      className="absolute inset-0 font-serif italic text-transparent pointer-events-none select-none"
                      style={{
                        WebkitTextStroke: '1px rgba(139, 115, 85, 0.12)',
                        transform: 'translate(4px, 4px)',
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5, duration: 0.8 }}
                    >
                      YON
                    </motion.span>
                  </motion.span>
                </h1>

                {/* Subtitle - Positioned asymmetrically */}
                <motion.div
                  className="absolute -bottom-4 md:-bottom-8 left-[15%] md:left-[20%] flex items-center gap-3 md:gap-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.1, ease: yonEase }}
                  style={{ y: subtitleY }}
                >
                  <span className="w-6 md:w-10 h-px bg-yon-grey/40" />
                  <p className="font-mono text-[10px] md:text-xs text-yon-steel tracking-[0.3em] uppercase">
                    저 너머 — Beyond Fashion
                  </p>
                </motion.div>

                {/* Margiela-style number tag */}
                <motion.span
                  className="absolute -top-4 md:-top-8 right-0 lg:right-[10%] font-mono text-[9px] text-yon-grey/25 tracking-[0.4em] rotate-90 origin-bottom-right"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6 }}
                >
                  001 / 2025
                </motion.span>
              </div>

              {/* Location markers - Micro typography, rotated */}
              <motion.div
                className="mt-20 md:mt-28 lg:mt-36 flex items-center gap-4 md:gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.3 }}
                style={{ transform: 'rotate(-0.5deg)' }}
              >
                <span className="font-mono text-[9px] text-yon-grey/60 tracking-[0.2em]">SEOUL</span>
                <span className="w-12 md:w-20 h-px bg-yon-platinum" />
                <span className="font-mono text-[9px] text-yon-grey/60 tracking-[0.2em]">TOKYO</span>
                <span className="w-12 md:w-20 h-px bg-yon-platinum hidden md:block" />
                <span className="font-mono text-[9px] text-yon-grey/30 tracking-[0.15em] hidden md:block">
                  AW25 — SS25
                </span>
              </motion.div>
            </div>

            {/* Right side - Description - MINIMAL, offset position */}
            <motion.div
              className="lg:col-span-3 lg:col-start-10 lg:pt-48 mt-16 lg:mt-0"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.9, ease: yonEase }}
            >
              <div className="lg:transform lg:rotate-[1deg] max-w-xs lg:max-w-none">
                <p className="text-base md:text-lg text-yon-black leading-[1.7] font-light">
                  Fashion that transcends time and space.
                </p>
                <p className="mt-3 text-sm text-yon-grey leading-[1.8]">
                  뒤틀렸지만 조화로운 — 모든 요소가 약간씩 어긋나 있지만,
                  전체적으로 하나의 아름다운 구성을 이룹니다.
                </p>

                {/* CTA - Minimal, elegant */}
                <motion.div
                  className="mt-10 md:mt-14 flex flex-col gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 }}
                >
                  <Link
                    href="/collections"
                    className="group inline-flex items-center gap-3 w-fit"
                    data-cursor="link"
                  >
                    <span className="px-6 py-3 bg-yon-black text-yon-white font-mono text-[9px] tracking-[0.2em] uppercase group-hover:bg-yon-charcoal transition-colors duration-300">
                      Explore Collections
                    </span>
                    <motion.span
                      className="text-yon-black text-sm"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      →
                    </motion.span>
                  </Link>

                  <Link
                    href="/process"
                    className="group inline-flex items-center gap-2 w-fit font-mono text-[9px] tracking-[0.15em] uppercase text-yon-grey hover:text-yon-black transition-colors"
                    data-cursor="link"
                  >
                    <motion.span
                      className="w-4 h-px bg-yon-grey group-hover:w-8 group-hover:bg-yon-black transition-all duration-300"
                    />
                    <span>View Process</span>
                  </Link>
                </motion.div>

                {/* Designer credit - Micro */}
                <motion.div
                  className="mt-14 pt-6 border-t border-yon-platinum/40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6 }}
                >
                  <span className="font-mono text-[8px] text-yon-grey/40 tracking-[0.25em] uppercase block">
                    By Taehyun Lee
                  </span>
                  <span className="font-mono text-[8px] text-yon-grey/25 tracking-[0.15em] block mt-1">
                    SASADA Fashion Academy
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator - Minimal, asymmetric */}
      <motion.div
        className="absolute bottom-8 md:bottom-12 left-8 md:left-16 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <div className="flex flex-col items-start gap-3">
          <motion.div
            className="w-px h-12 md:h-16 bg-gradient-to-b from-yon-grey/50 to-transparent origin-top"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="font-mono text-[7px] text-yon-grey/40 tracking-[0.3em] uppercase -rotate-90 origin-top-left translate-y-4">
            Scroll
          </span>
        </div>
      </motion.div>

      {/* Decorative geometric element */}
      <motion.div
        className="absolute top-[20%] right-[5%] z-10 hidden lg:block"
        initial={{ opacity: 0, scale: 0, rotate: 0 }}
        animate={{ opacity: 0.08, scale: 1, rotate: 45 }}
        transition={{ delay: 2, duration: 1.5, ease: yonEase }}
      >
        <div className="w-24 h-24 border border-yon-grey/40" />
      </motion.div>

      {/* Large decorative letter - Bottom right */}
      <motion.div
        className="absolute bottom-[15%] right-[8%] z-5 hidden lg:block pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        <span className="font-serif text-[25vw] text-yon-grey leading-none">
          ¶
        </span>
      </motion.div>
    </section>
  )
}
