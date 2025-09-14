'use client'

import { useEffect, useRef, useState, useLayoutEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import dynamic from 'next/dynamic'
import { BentoGrid, BentoCard } from '@/components/ui/BentoGrid'
import { SplitScreen, AsymmetricGrid, FloatingLayout } from '@/components/ui/SplitScreen'
import {
  MagneticButton,
  RippleButton,
} from '@/components/ui/MicroInteractions'
import {
  KineticText,
  DepthText,
  LiquidText,
  VariableText,
  SplitRevealText,
  GradientText,
  MorphingText
} from '@/components/ui/TrendyTextEffects'
import Image from 'next/image'
import Link from 'next/link'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Dynamic import for WebGL component
const ParticleBackground = dynamic(
  () => import('@/components/effects/ParticleBackground'),
  { ssr: false }
)

// Mini card component for decorative images
function FashionCard({ image, index }: { image: string; index: number }) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-lg bg-black border border-white/5"
      whileHover={{ scale: 1.05, rotate: Math.random() * 10 - 5 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 400 }}
    >
      <div className="aspect-[3/4] relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
        <Image
          src={image}
          alt={`Fashion ${index}`}
          fill
          className="object-cover"
          sizes="300px"
        />
        <motion.div
          className="absolute inset-0 bg-white/20"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6 }}
        />
      </div>
    </motion.div>
  )
}

export default function ModernFashionPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const [currentTime, setCurrentTime] = useState(new Date())

  // Parallax transforms
  const heroY = useTransform(scrollYProgress, [0, 0.5], ['0%', '30%'])
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  // GSAP ScrollTrigger animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Fashion cards stagger animation
      gsap.from('.fashion-card', {
        y: 100,
        opacity: 0,
        scale: 0.8,
        rotateY: 45,
        stagger: 0.1,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.fashion-grid',
          start: 'top 80%',
          end: 'bottom 20%'
        }
      })

      // Parallax text
      gsap.to('.parallax-text', {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: '.parallax-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Sample decorative images from the folder
  const fashionImages = [
    '/웹 꾸미기 사진/image-1.png',
    '/웹 꾸미기 사진/image-2.png',
    '/웹 꾸미기 사진/image-3.png',
    '/웹 꾸미기 사진/image-4.png',
    '/웹 꾸미기 사진/image-5.png',
    '/웹 꾸미기 사진/image-6.png',
    '/웹 꾸미기 사진/image-7.png',
    '/웹 꾸미기 사진/image-8.png',
    '/웹 꾸미기 사진/image-9.png',
    '/웹 꾸미기 사진/image-10.png',
    '/웹 꾸미기 사진/image-11.png',
    '/웹 꾸미기 사진/image-12.png'
  ]

  const fashionWords = ['EXPERIMENTAL', 'AVANT-GARDE', 'REVOLUTIONARY', 'VISIONARY']

  return (
    <main ref={containerRef} className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <ParticleBackground count={200} color="#ffffff" size={1} speed={0.2} />

      {/* Hero Section - Full Fashion */}
      <section className="relative h-screen flex items-center justify-center">
        <motion.div
          style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
          className="text-center z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <DepthText
              text="CINCH"
              className="text-[8rem] md:text-[12rem] lg:text-[16rem] font-black tracking-tighter"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-[-2rem] md:mt-[-3rem]"
          >
            <KineticText
              text="LABORATORY"
              className="text-2xl md:text-4xl tracking-[0.5em] text-gray-400"
              delay={0.8}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-8"
          >
            <MorphingText
              texts={fashionWords}
              className="text-xl md:text-2xl text-gray-500"
            />
          </motion.div>
        </motion.div>

        {/* Floating Fashion Images */}
        <div className="absolute inset-0 pointer-events-none">
          {fashionImages.slice(0, 5).map((img, i) => (
            <motion.div
              key={i}
              className="absolute w-24 h-32 md:w-32 md:h-40"
              style={{
                left: `${20 + i * 15}%`,
                top: `${20 + Math.sin(i) * 20}%`
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, 0]
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <Image
                src={img}
                alt=""
                fill
                className="object-cover rounded opacity-20"
              />
            </motion.div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </section>

      {/* Split Fashion Gallery */}
      <section className="py-32">
        <SplitScreen
          leftSize="45%"
          rightSize="55%"
          parallax
          left={
            <div className="h-full flex items-center justify-center p-12">
              <div className="space-y-8">
                <LiquidText
                  text="475 CURATED"
                  className="text-5xl md:text-7xl font-black"
                />
                <GradientText
                  text="VISUALS"
                  className="text-4xl md:text-6xl"
                />
                <p className="text-gray-400 text-lg">
                  Where fashion transcends reality
                </p>
              </div>
            </div>
          }
          right={
            <div className="p-8">
              <div className="grid grid-cols-3 gap-4 fashion-grid">
                {fashionImages.slice(0, 9).map((img, i) => (
                  <div key={i} className="fashion-card">
                    <FashionCard image={img} index={i} />
                  </div>
                ))}
              </div>
            </div>
          }
        />
      </section>

      {/* Bento Fashion Features */}
      <section className="py-20 px-4 md:px-8 lg:px-16 parallax-section">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <SplitRevealText
            text="EXPERIENCE THE COLLECTION"
            className="text-4xl md:text-6xl font-bold parallax-text"
          />
        </motion.div>

        <BentoGrid className="max-w-7xl mx-auto">
          <BentoCard
            title="GALLERY"
            description="Immersive visual journey"
            span="col-span-12 md:col-span-7 row-span-3"
            href="/gallery"
            index={0}
            background={
              <Image
                src={fashionImages[0]}
                alt=""
                fill
                className="object-cover opacity-30"
              />
            }
          >
            <VariableText
              text="EXPLORE"
              className="text-4xl font-black"
            />
          </BentoCard>

          <BentoCard
            title="RUNWAY"
            description="Fashion in motion"
            span="col-span-6 md:col-span-5 row-span-2"
            href="/runway"
            index={1}
            background={
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-pink-900/30" />
            }
          />

          <BentoCard
            title="CHAOS"
            description="Break the rules"
            span="col-span-6 md:col-span-5 row-span-2"
            href="/chaos"
            index={2}
            background={
              <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 to-orange-900/30" />
            }
          />

          <BentoCard
            title="LAB"
            description="Experimental space"
            span="col-span-12 md:col-span-4 row-span-2"
            href="/lab"
            index={3}
            background={
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-cyan-900/30" />
            }
          />

          <BentoCard
            title="ARCHIVE"
            description="Timeless pieces"
            span="col-span-6 md:col-span-4 row-span-2"
            href="/archive"
            index={4}
          />

          <BentoCard
            title="COLLECTIONS"
            description="Curated selections"
            span="col-span-6 md:col-span-4 row-span-2"
            href="/collections"
            index={5}
          />
        </BentoGrid>
      </section>

      {/* Asymmetric Fashion Display */}
      <section className="py-32 px-4 md:px-8 lg:px-16">
        <AsymmetricGrid>
          {fashionImages.map((img, i) => (
            <motion.div
              key={i}
              className="relative overflow-hidden rounded-lg group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
              <Image
                src={img}
                alt={`Fashion piece ${i}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 500px"
              />
              <motion.div
                className="absolute inset-0 flex items-center justify-center z-20"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <span className="text-white text-xl font-bold">VIEW</span>
              </motion.div>
            </motion.div>
          ))}
        </AsymmetricGrid>
      </section>

      {/* Fashion Manifesto */}
      <section className="py-32 px-4 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2 }}
          viewport={{ once: true }}
        >
          <DepthText
            text="PUSH BOUNDARIES"
            className="text-4xl md:text-7xl font-black mb-8"
          />
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Fashion is not just clothing. It's an expression,
            a revolution, a glimpse into the future.
          </p>
        </motion.div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-16 px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h4 className="text-2xl font-bold">CINCH LAB</h4>
            <p className="text-gray-600 text-sm mt-2">© 2025</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500">Experimental Fashion Laboratory</p>
            <p className="text-gray-600 text-sm">{currentTime.toLocaleTimeString()}</p>
          </div>
        </div>
      </footer>
    </main>
  )
}