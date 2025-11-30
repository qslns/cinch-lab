'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Footer from '@/components/Footer'

// Custom easing for smooth animations
const yonEase = [0.22, 1, 0.36, 1] as const

// Skills/expertise data
const expertise = [
  {
    id: '01',
    title: 'Pattern Making',
    titleKo: '패턴 메이킹',
    description: 'Deconstructing traditional pattern blocks to create unexpected silhouettes.',
    level: 90,
  },
  {
    id: '02',
    title: 'Draping',
    titleKo: '드레이핑',
    description: 'Sculpting fabric directly on the form to discover organic shapes.',
    level: 85,
  },
  {
    id: '03',
    title: 'Material Research',
    titleKo: '소재 연구',
    description: 'Exploring unconventional materials and textile manipulation.',
    level: 80,
  },
  {
    id: '04',
    title: 'Tailoring',
    titleKo: '테일러링',
    description: 'Traditional techniques reimagined through contemporary lens.',
    level: 75,
  },
]

// Timeline milestones
const milestones = [
  {
    year: '2024',
    title: 'THE YON Launch',
    description: 'Digital archive and experimental portfolio established.',
  },
  {
    year: '2023',
    description: 'Began advanced pattern manipulation research.',
  },
  {
    year: '2022',
    title: 'Sasada Fashion',
    description: 'Enrolled in fashion design program at Sasada Fashion School.',
  },
  {
    year: '2021',
    description: 'First experiments with deconstructed tailoring.',
  },
]

// Scattered image placeholders
const scatteredImages = [
  {
    id: 1,
    label: 'STUDIO',
    position: { top: '5%', left: '3%' },
    size: 'w-[28vw] md:w-[16vw]',
    rotation: -5,
    variant: 'dark' as const,
    aspectRatio: '4/5',
    parallaxSpeed: 0.3,
  },
  {
    id: 2,
    label: 'PROCESS',
    position: { top: '12%', right: '5%' },
    size: 'w-[32vw] md:w-[20vw]',
    rotation: 4,
    variant: 'medium' as const,
    aspectRatio: '3/4',
    parallaxSpeed: 0.5,
  },
  {
    id: 3,
    label: 'DETAIL',
    position: { top: '50%', left: '8%' },
    size: 'w-[24vw] md:w-[14vw]',
    rotation: -2,
    variant: 'light' as const,
    aspectRatio: '1/1',
    parallaxSpeed: 0.4,
  },
  {
    id: 4,
    label: 'MATERIAL',
    position: { top: '65%', right: '12%' },
    size: 'w-[30vw] md:w-[18vw]',
    rotation: 3,
    variant: 'dark' as const,
    aspectRatio: '4/5',
    parallaxSpeed: 0.6,
  },
]

const variantStyles = {
  light: 'bg-yon-platinum',
  medium: 'bg-yon-silver',
  dark: 'bg-yon-charcoal',
}

const variantTextStyles = {
  light: 'text-yon-grey',
  medium: 'text-yon-graphite',
  dark: 'text-yon-silver',
}

// Skill bar component
function SkillBar({ skill, index }: { skill: typeof expertise[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="group py-6 border-b border-yon-platinum last:border-b-0"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-[10px] text-yon-grey/60 tracking-wider">
              {skill.id}
            </span>
            <span className="w-3 h-px bg-yon-silver" />
            <span className="font-mono text-[9px] text-yon-grey/50 tracking-wider">
              {skill.titleKo}
            </span>
          </div>
          <motion.h3
            className="font-serif text-xl md:text-2xl text-yon-black leading-tight"
            animate={{ x: isHovered ? 8 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {skill.title}
          </motion.h3>
          <motion.p
            className="mt-2 text-sm text-yon-steel leading-relaxed max-w-md"
            animate={{ opacity: isHovered ? 1 : 0.7 }}
            transition={{ duration: 0.3 }}
          >
            {skill.description}
          </motion.p>
        </div>

        {/* Skill level indicator */}
        <div className="hidden md:flex items-center gap-4 pt-2">
          <div className="w-32 h-1 bg-yon-platinum overflow-hidden">
            <motion.div
              className="h-full bg-yon-accent"
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <span className="font-mono text-[10px] text-yon-grey/60 tracking-wider w-8">
            {skill.level}%
          </span>
        </div>
      </div>
    </motion.div>
  )
}

// Timeline item component
function TimelineItem({ milestone, index, isLast }: { milestone: typeof milestones[0]; index: number; isLast: boolean }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative pl-10 md:pl-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Line */}
      {!isLast && (
        <motion.div
          className="absolute left-[15px] md:left-[25px] top-8 bottom-0 w-px bg-yon-platinum"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
          style={{ originY: 0 }}
        />
      )}

      {/* Dot */}
      <motion.div
        className="absolute left-0 md:left-2.5 top-1.5 w-[14px] h-[14px] rounded-full border-2 border-yon-accent bg-yon-white"
        animate={{ scale: isHovered ? 1.3 : 1 }}
        transition={{ duration: 0.2 }}
      />

      {/* Content */}
      <div className="pb-10 md:pb-14">
        <span className="font-mono text-[11px] text-yon-accent tracking-wider">
          {milestone.year}
        </span>
        {milestone.title && (
          <motion.h4
            className="mt-2 font-serif text-lg md:text-xl text-yon-black"
            animate={{ x: isHovered ? 6 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {milestone.title}
          </motion.h4>
        )}
        <p className={`${milestone.title ? 'mt-2' : 'mt-2'} text-sm text-yon-steel leading-relaxed`}>
          {milestone.description}
        </p>
      </div>
    </motion.div>
  )
}

// Floating image component
function FloatingImage({
  img,
  scrollYProgress,
}: {
  img: typeof scatteredImages[0]
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * img.parallaxSpeed])
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`absolute ${img.size} group cursor-pointer`}
      style={{
        ...img.position,
        y,
        zIndex: img.id,
      }}
      initial={{ opacity: 0, scale: 0.9, rotate: img.rotation - 5 }}
      animate={{ opacity: 1, scale: 1, rotate: img.rotation }}
      transition={{
        duration: 1.2,
        delay: 0.3 + img.id * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className={`relative ${variantStyles[img.variant]} overflow-hidden`}
        style={{ aspectRatio: img.aspectRatio }}
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className={`font-mono text-[8px] md:text-[10px] tracking-[0.25em] ${variantTextStyles[img.variant]} opacity-40`}
            animate={{ opacity: isHovered ? 0.8 : 0.4 }}
          >
            {img.label}
          </motion.span>
        </div>

        {/* Border */}
        <motion.div
          className="absolute inset-0 border border-current opacity-5"
          animate={{ opacity: isHovered ? 0.15 : 0.05 }}
        />

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-yon-accent/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Index number */}
      <motion.span
        className={`absolute -bottom-5 left-0 font-mono text-[8px] tracking-wider ${variantTextStyles[img.variant]} opacity-30`}
        animate={{ opacity: isHovered ? 0.7 : 0.3 }}
      >
        {String(img.id).padStart(2, '0')}
      </motion.span>
    </motion.div>
  )
}

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95])
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -150])

  return (
    <div ref={containerRef} className="min-h-screen bg-yon-white">
      {/* Hero Section - Extreme Typography */}
      <section className="relative min-h-[100vh] md:min-h-[120vh] overflow-hidden">
        {/* Grain texture */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

        {/* Giant Background Letters */}
        <motion.span
          className="absolute top-[10%] left-[-10%] font-serif text-[80vw] md:text-[55vw] text-yon-platinum/[0.03] leading-none select-none pointer-events-none"
          style={{ y: parallaxY }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: yonEase }}
        >
          Y
        </motion.span>

        {/* Vertical decorative line */}
        <motion.div
          className="absolute top-[15%] right-[12%] w-px h-[40vh] bg-gradient-to-b from-transparent via-yon-accent/30 to-transparent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: yonEase }}
        />

        {/* Number tag */}
        <motion.span
          className="absolute top-[25%] right-[8%] font-mono text-[10px] text-yon-grey/30 tracking-[0.3em] -rotate-90 origin-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          05.ABOUT
        </motion.span>

        {/* Scattered background images */}
        {scatteredImages.map(img => (
          <FloatingImage key={img.id} img={img} scrollYProgress={scrollYProgress} />
        ))}

        {/* Main content */}
        <motion.div
          className="relative z-20 pt-32 md:pt-40 lg:pt-48 px-6 md:px-12 lg:px-16"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div className="relative">
              {/* Prefix tag with accent */}
              <motion.div
                className="flex items-center gap-4 mb-8"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: yonEase }}
              >
                <span className="w-12 h-px bg-yon-accent" />
                <span className="font-mono text-[10px] text-yon-accent tracking-[0.3em] uppercase">
                  Beyond the horizon
                </span>
              </motion.div>

              {/* Title - EXTREME Scale */}
              <h1 className="relative">
                {/* Main title */}
                <motion.span
                  className="block font-serif text-[28vw] md:text-[20vw] lg:text-[18vw] text-yon-black leading-[0.75] tracking-[-0.04em]"
                  initial={{ opacity: 0, y: 100, rotate: 3 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ duration: 1.2, delay: 0.3, ease: yonEase }}
                >
                  THE
                </motion.span>
                <motion.span
                  className="block font-serif text-[28vw] md:text-[20vw] lg:text-[18vw] text-yon-black leading-[0.75] tracking-[-0.04em] ml-[12%] md:ml-[18%]"
                  initial={{ opacity: 0, y: 100, rotate: -3 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ duration: 1.2, delay: 0.45, ease: yonEase }}
                >
                  YON
                </motion.span>

                {/* Italic ghost overlay */}
                <motion.span
                  className="absolute top-0 left-0 font-serif italic text-[28vw] md:text-[20vw] lg:text-[18vw] text-yon-accent/[0.08] leading-[0.75] tracking-[-0.04em] pointer-events-none"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.8, ease: yonEase }}
                >
                  THE
                </motion.span>
              </h1>

              {/* Korean subtitle - asymmetric placement */}
              <motion.div
                className="mt-8 md:mt-12 ml-[5%] md:ml-[45%] lg:ml-[50%]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: yonEase }}
              >
                <span className="font-mono text-[11px] md:text-xs text-yon-grey/50 tracking-[0.2em]">
                  저 너머 — Beyond
                </span>
              </motion.div>

              {/* Tagline - dramatically positioned */}
              <motion.div
                className="mt-16 md:mt-24 max-w-xl md:max-w-2xl"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7, ease: yonEase }}
              >
                <p className="text-xl md:text-2xl lg:text-3xl text-yon-steel leading-[1.4]">
                  "저 너머"를 향한 끊임없는 탐구.
                </p>
                <p className="mt-6 text-base md:text-lg text-yon-grey leading-relaxed max-w-md">
                  시간과 공간을 초월한 패션을 추구합니다.
                  <span className="block mt-2">뒤틀렸지만 조화로운, 해체되었지만 완벽한.</span>
                </p>
              </motion.div>

              {/* Scroll indicator - offset */}
              <motion.div
                className="absolute bottom-[-50vh] left-[10%] flex flex-col items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <span className="font-mono text-[9px] text-yon-grey/50 tracking-[0.25em] uppercase">
                  Scroll to explore
                </span>
                <motion.div
                  className="w-px h-16 bg-gradient-to-b from-yon-grey/40 to-transparent"
                  animate={{ scaleY: [1, 0.4, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>

              {/* Decorative bottom line */}
              <motion.div
                className="absolute bottom-[-30vh] left-0 right-[40%] h-px bg-gradient-to-r from-yon-accent/40 via-yon-grey/20 to-transparent"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 0.8, ease: yonEase }}
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="relative py-32 md:py-48 px-6 md:px-12 lg:px-16 bg-yon-ivory overflow-hidden">
        {/* Background number */}
        <motion.span
          className="absolute top-1/2 -translate-y-1/2 -right-[15%] font-mono text-[40vw] md:text-[30vw] text-yon-platinum/10 leading-none select-none pointer-events-none"
          style={{ y: parallaxY }}
        >
          01
        </motion.span>

        <div className="max-w-6xl mx-auto relative">
          <div className="grid md:grid-cols-12 gap-12 md:gap-16">
            {/* Left - Title */}
            <motion.div
              className="md:col-span-5"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-yon-grey" />
                <span className="font-mono text-[10px] text-yon-grey tracking-[0.2em] uppercase">
                  Philosophy
                </span>
              </div>

              <h2 className="font-serif text-[10vw] md:text-[5vw] lg:text-[4vw] text-yon-black leading-[1]">
                <span className="block">Twisted</span>
                <span className="block ml-[6%]">yet</span>
                <span className="block">harmonious</span>
              </h2>

              <span className="block mt-8 font-mono text-[9px] text-yon-grey/40 tracking-wider">
                뒤틀렸지만 조화로운
              </span>
            </motion.div>

            {/* Right - Content */}
            <motion.div
              className="md:col-span-6 md:col-start-7 md:pt-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-lg md:text-xl text-yon-steel leading-[1.8]">
                모든 요소가 약간씩 어긋나 있습니다.
                하지만 전체적으로는 하나의 아름다운 구성을 이룹니다.
              </p>

              <p className="mt-6 text-lg md:text-xl text-yon-steel leading-[1.8]">
                해체되어 있지만 완벽합니다.
                이것이 THE YON의 미학입니다.
              </p>

              <p className="mt-8 text-base text-yon-grey leading-[1.9]">
                우리는 전통적인 패턴 메이킹과 현대적인 해체주의가 만나는 지점을 탐구합니다.
                Pattern Magic의 기법들을 연구하고, 그것을 넘어서는 새로운 가능성을 찾습니다.
                실패를 두려워하지 않고, 과정 자체를 예술로 승화시킵니다.
              </p>

              {/* Quote */}
              <motion.blockquote
                className="mt-12 relative pl-6 border-l-2 border-yon-accent"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <p className="font-serif text-lg text-yon-black italic leading-relaxed">
                  "Every imperfection is a choice.
                  Every asymmetry, intentional."
                </p>
              </motion.blockquote>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Designer Section */}
      <section className="relative py-32 md:py-48 px-6 md:px-12 lg:px-16 overflow-hidden">
        {/* Background number */}
        <motion.span
          className="absolute top-16 -left-[10%] font-mono text-[35vw] md:text-[25vw] text-yon-platinum/8 leading-none select-none pointer-events-none"
          style={{ y: parallaxY }}
        >
          02
        </motion.span>

        <div className="max-w-6xl mx-auto relative">
          <div className="grid md:grid-cols-12 gap-12 md:gap-16">
            {/* Image */}
            <motion.div
              className="md:col-span-5"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="relative bg-yon-charcoal group cursor-pointer overflow-hidden"
                style={{ aspectRatio: '4/5', transform: 'rotate(-2deg)' }}
              >
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="font-mono text-[10px] text-yon-silver/50 tracking-[0.25em]">
                    PORTRAIT
                  </span>
                </motion.div>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-yon-accent/0 group-hover:bg-yon-accent/10 transition-colors duration-500" />
                <div className="absolute inset-0 border border-yon-silver/10" />
              </div>

              {/* Caption */}
              <motion.div
                className="mt-6 flex items-center gap-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <span className="font-mono text-[9px] text-yon-grey/50 tracking-wider">002</span>
                <span className="w-4 h-px bg-yon-silver" />
                <span className="font-mono text-[9px] text-yon-grey/50 tracking-wider">
                  Taehyun Lee, 2024
                </span>
              </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div
              className="md:col-span-6 md:col-start-7 md:pt-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-yon-grey" />
                <span className="font-mono text-[10px] text-yon-grey tracking-[0.2em] uppercase">
                  Designer
                </span>
              </div>

              <h2 className="font-serif text-[9vw] md:text-[4.5vw] lg:text-[3.5vw] text-yon-black leading-[1.05]">
                <span className="block">Taehyun</span>
                <span className="block ml-[4%]">Lee</span>
              </h2>

              <p className="mt-10 text-lg md:text-xl text-yon-steel leading-[1.8]">
                사사다 패션스쿨에서 패션 디자인을 공부하고 있습니다.
              </p>

              <p className="mt-5 text-base text-yon-grey leading-[1.9]">
                실험적인 패턴 메이킹과 소재 연구에 집중하며,
                전통적인 테일러링 기법과 현대적인 해체주의 사이의
                균형점을 찾고 있습니다.
              </p>

              <p className="mt-5 text-base text-yon-grey leading-[1.9]">
                THE YON은 판매를 위한 브랜드가 아닙니다.
                이것은 실험과 연구를 위한 공간이며, 창작 과정 자체를
                기록하고 공유하기 위한 디지털 아카이브입니다.
              </p>

              {/* Education badges */}
              <div className="mt-10 flex flex-wrap gap-3">
                <span className="px-4 py-2 font-mono text-[10px] text-yon-grey tracking-wider border border-yon-platinum">
                  Sasada Fashion School
                </span>
                <span className="px-4 py-2 font-mono text-[10px] text-yon-accent tracking-wider border border-yon-accent/30">
                  Aspiring: CSM / Parsons / Antwerp
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-32 md:py-48 px-6 md:px-12 lg:px-16 bg-yon-ivory relative overflow-hidden">
        <motion.span
          className="absolute bottom-[-10%] right-[-10%] font-mono text-[40vw] md:text-[30vw] text-yon-platinum/10 leading-none select-none pointer-events-none"
          style={{ y: parallaxY }}
        >
          03
        </motion.span>

        <div className="max-w-4xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-yon-grey" />
              <span className="font-mono text-[10px] text-yon-grey tracking-[0.2em] uppercase">
                Expertise
              </span>
            </div>

            <h2 className="font-serif text-[8vw] md:text-[4vw] lg:text-[3vw] text-yon-black leading-[1.1] mb-12">
              Core Skills
            </h2>
          </motion.div>

          <div className="space-y-0">
            {expertise.map((skill, index) => (
              <SkillBar key={skill.id} skill={skill} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Approach Section - Dark */}
      <section className="relative py-32 md:py-48 px-6 md:px-12 lg:px-16 bg-yon-charcoal text-yon-white overflow-hidden">
        {/* Grain texture */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

        {/* Background number */}
        <span className="absolute top-12 right-8 md:right-16 font-mono text-[140px] md:text-[220px] text-yon-graphite/15 leading-none select-none pointer-events-none">
          04
        </span>

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            className="grid md:grid-cols-12 gap-12 md:gap-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="md:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-yon-silver/50" />
                <span className="font-mono text-[10px] text-yon-silver/70 tracking-[0.2em] uppercase">
                  Approach
                </span>
              </div>

              <h2 className="font-serif text-[10vw] md:text-[5vw] lg:text-[4vw] leading-[1]">
                <span className="block">How</span>
                <span className="block ml-[6%]">we work</span>
              </h2>

              <span className="block mt-8 font-mono text-[9px] text-yon-grey/40 tracking-wider">
                우리의 작업 방식
              </span>
            </div>
          </motion.div>

          <div className="mt-16 md:mt-24 grid md:grid-cols-2 gap-x-16 gap-y-12">
            {[
              { num: '01', title: 'Research', titleKo: '연구', text: '영감의 원천을 찾고, 기존의 기법을 분석합니다. 패션 역사, 예술, 건축에서 아이디어를 발굴합니다.' },
              { num: '02', title: 'Experiment', titleKo: '실험', text: '새로운 가능성을 탐구하고, 실패를 두려워하지 않습니다. 예상치 못한 결과가 혁신의 시작입니다.' },
              { num: '03', title: 'Document', titleKo: '기록', text: '과정을 기록하고, 발견을 공유합니다. 모든 시행착오는 소중한 자산입니다.' },
              { num: '04', title: 'Refine', titleKo: '정제', text: '반복적인 개선을 통해 완성도를 높입니다. 디테일이 전체를 완성합니다.' },
            ].map((item, index) => (
              <motion.div
                key={item.num}
                className="group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-[10px] text-yon-grey/60 tracking-wider">
                    {item.num}
                  </span>
                  <span className="w-3 h-px bg-yon-grey/30" />
                  <span className="font-mono text-[9px] text-yon-grey/50 tracking-wider">
                    {item.titleKo}
                  </span>
                </div>

                <h3 className="font-serif text-2xl md:text-3xl text-yon-white group-hover:text-yon-accent transition-colors duration-500">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm text-yon-silver/80 leading-[1.9]">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-32 md:py-48 px-6 md:px-12 lg:px-16 relative overflow-hidden">
        <motion.span
          className="absolute top-1/2 -translate-y-1/2 -left-[15%] font-mono text-[40vw] md:text-[28vw] text-yon-platinum/8 leading-none select-none pointer-events-none"
          style={{ y: parallaxY }}
        >
          05
        </motion.span>

        <div className="max-w-4xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-yon-grey" />
              <span className="font-mono text-[10px] text-yon-grey tracking-[0.2em] uppercase">
                Journey
              </span>
            </div>

            <h2 className="font-serif text-[8vw] md:text-[4vw] lg:text-[3vw] text-yon-black leading-[1.1] mb-16">
              Timeline
            </h2>
          </motion.div>

          <div>
            {milestones.map((milestone, index) => (
              <TimelineItem
                key={milestone.year}
                milestone={milestone}
                index={index}
                isLast={index === milestones.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 md:py-48 px-6 md:px-12 lg:px-16 bg-yon-ivory relative overflow-hidden">
        {/* Background quote mark */}
        <span className="absolute -top-16 -left-8 md:-left-16 font-serif text-[100px] md:text-[180px] text-yon-platinum/20 leading-none select-none pointer-events-none">
          "
        </span>

        <div className="max-w-4xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-serif text-[7vw] md:text-[4vw] lg:text-[3.2vw] text-yon-black leading-[1.2]">
              <span className="block">The journey matters</span>
              <span className="block ml-[4%]">as much as</span>
              <span className="block">the destination</span>
            </p>

            <p className="mt-8 text-base text-yon-grey leading-relaxed max-w-md">
              목적지만큼 여정도 중요합니다.
              함께 새로운 가능성을 탐구해 보시겠습니까?
            </p>

            <div className="mt-14">
              <span className="font-mono text-[10px] text-yon-grey tracking-[0.2em] uppercase block mb-6">
                Interested in collaboration?
              </span>

              <Link
                href="/contact"
                className="group inline-flex items-center gap-5"
              >
                <span className="relative font-mono text-sm tracking-[0.15em] uppercase text-yon-black pb-1">
                  <span className="relative z-10">Get in touch</span>
                  <span className="absolute bottom-0 left-0 w-full h-px bg-yon-black origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  <span className="absolute bottom-0 left-0 w-full h-px bg-yon-accent origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] delay-100" />
                </span>
                <motion.span
                  className="text-lg text-yon-black"
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.3 }}
                >
                  →
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
