'use client'

import { useEffect, useRef, useState, Suspense } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import CipherText from '@/components/CipherText'
import AsymmetricGrid from '@/components/AsymmetricGrid'
import ImageGallery from '@/components/ImageGallery'
import { useMagneticCursor, useParallax, use3DTilt, useStaggerReveal } from '@/hooks/useGsap'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Dynamic import for 3D components to avoid SSR issues
const InteractiveCanvas = dynamic(() => import('@/components/InteractiveCanvas'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-100 animate-pulse" />
})

gsap.registerPlugin(ScrollTrigger)

// Gallery images data
const galleryImages = [
  { id: '1', src: '/gallery/img1.png', alt: 'Abandoned Subway', title: 'VOID TUNNEL', category: 'experimental' },
  { id: '2', src: '/gallery/img2.png', alt: 'Abstract Composition', title: 'GRAIN STUDY', category: 'abstract' },
  { id: '3', src: '/gallery/img3.png', alt: 'Arctic Melt', title: 'ICE FORMATION', category: 'nature' },
  { id: '4', src: '/gallery/img4.png', alt: 'Airport Terminal', title: 'LIMINAL SPACE', category: 'architecture' },
  { id: '5', src: '/gallery/img5.png', alt: 'Body Horror', title: 'METAMORPHOSIS', category: 'surreal' },
  { id: '6', src: '/gallery/img6.png', alt: 'Botanical Study', title: 'ORGANIC RENDER', category: 'nature' },
]

// Asymmetric grid items
const gridItems = [
  { id: '1', image: '/gallery/img1.png', title: 'VOID', size: 'large' as const },
  { id: '2', image: '/gallery/img2.png', title: 'GRAIN', size: 'medium' as const },
  { id: '3', image: '/gallery/img3.png', title: 'ICE', size: 'tall' as const },
  { id: '4', image: '/gallery/img4.png', title: 'LIMINAL', size: 'wide' as const },
  { id: '5', image: '/gallery/img5.png', title: 'MORPH', size: 'medium' as const },
  { id: '6', image: '/gallery/img6.png', title: 'ORGANIC', size: 'small' as const },
]

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const [currentTime, setCurrentTime] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  // Magnetic cursor for hero title
  const magneticRef = useMagneticCursor(0.3)

  // 3D tilt for cards
  const card1Ref = use3DTilt(1200)
  const card2Ref = use3DTilt(1200)
  const card3Ref = use3DTilt(1200)

  // Stagger reveal for sections
  const staggerRef = useStaggerReveal(0.08)

  // Advanced parallax transforms
  const heroY = useTransform(scrollYProgress, [0, 0.5], ['0%', '25%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.15])
  const heroRotate = useTransform(scrollYProgress, [0, 0.5], [0, 3])

  // Background parallax
  const bgY1 = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const bgY2 = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const bgY3 = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  useEffect(() => {
    setIsLoaded(true)

    // Time update
    const timer = setInterval(() => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }))
    }, 1000)

    // Section observer
    const sections = document.querySelectorAll('section')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, { threshold: 0.5 })

    sections.forEach(section => observer.observe(section))

    // GSAP animations
    const ctx = gsap.context(() => {
      // Floating animation for hero
      gsap.to('.floating-element', {
        y: -20,
        duration: 3,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 0.2
      })

      // Rotating animation for decorative elements
      gsap.to('.rotating-element', {
        rotation: 360,
        duration: 20,
        ease: 'none',
        repeat: -1
      })

      // Morphing text effect
      const morphText = document.querySelectorAll('.morph-text')
      morphText.forEach(text => {
        gsap.to(text, {
          letterSpacing: '0.2em',
          duration: 2,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true
        })
      })
    })

    return () => {
      clearInterval(timer)
      observer.disconnect()
      ctx.revert()
    }
  }, [])

  // Scroll-based animations
  useEffect(() => {
    if (!isLoaded) return

    const ctx = gsap.context(() => {
      // Hero text split animation
      gsap.from('.hero-text-line', {
        y: 100,
        opacity: 0,
        rotationX: -90,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top center',
          once: true
        }
      })

      // Gallery reveal
      ScrollTrigger.create({
        trigger: '#gallery',
        start: 'top 80%',
        onEnter: () => {
          gsap.to('.gallery-item', {
            scale: 1,
            opacity: 1,
            duration: 1,
            stagger: 0.05,
            ease: 'power3.out'
          })
        },
        once: true
      })

      // Statement text reveal
      gsap.from('.statement-text', {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '#statement',
          start: 'top 70%',
          scrub: 1
        }
      })
    })

    return () => ctx.revert()
  }, [isLoaded])

  return (
    <div ref={containerRef} className="min-h-screen bg-white relative overflow-hidden">
      {/* Advanced background layers */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{ y: bgY1 }}
        >
          <div className="h-full w-full" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(0,0,0,0.03) 50px, rgba(0,0,0,0.03) 51px)`
          }} />
        </motion.div>
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{ y: bgY2 }}
        >
          <div className="h-full w-full" style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(0,0,0,0.03) 50px, rgba(0,0,0,0.03) 51px)`
          }} />
        </motion.div>
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{ y: bgY3 }}
        >
          <div className="h-full w-full" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 70px, rgba(0,0,0,0.02) 70px, rgba(0,0,0,0.02) 71px)`
          }} />
        </motion.div>
      </div>

      {/* 3D Background Canvas */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
        <Suspense fallback={null}>
          <InteractiveCanvas type="particles" interactive={false} />
        </Suspense>
      </div>

      {/* Hero Section with Advanced Animations */}
      <section id="hero" className="h-screen flex items-center justify-center relative">
        <motion.div
          ref={heroRef}
          className="relative z-10"
          style={{
            y: heroY,
            opacity: heroOpacity,
            scale: heroScale,
            rotate: heroRotate
          }}
        >
          {/* Main Title with Magnetic Effect */}
          <motion.div
            ref={magneticRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 1.5 }}
            className="text-center"
          >
            <div className="space-y-2 mb-8">
              <div className="hero-text-line overflow-hidden">
                <h1 className="text-[clamp(50px,8vw,140px)] font-thin tracking-tighter leading-[0.9]">
                  <CipherText text="CINCH" as="span" />
                </h1>
              </div>
              <div className="hero-text-line overflow-hidden">
                <h1 className="text-[clamp(50px,8vw,140px)] font-thin tracking-tighter leading-[0.9] italic opacity-60">
                  <CipherText text="LAB" as="span" delay={100} />
                </h1>
              </div>
              <div className="hero-text-line overflow-hidden">
                <h1 className="text-[clamp(40px,6vw,100px)] font-thin tracking-widest leading-[0.9] outline-text">
                  <CipherText text="EXTREME" as="span" delay={200} />
                </h1>
              </div>
              <div className="hero-text-line overflow-hidden">
                <h1 className="text-[clamp(30px,5vw,80px)] font-thin tracking-[0.3em] leading-[0.9] morph-text">
                  <CipherText text="FASHION" as="span" delay={300} />
                </h1>
              </div>
            </div>

            {/* Floating subtitle */}
            <motion.p
              className="text-xs tracking-[0.4em] text-gray-600 uppercase floating-element"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
            >
              <CipherText text="BEYOND TRADITIONAL PARADIGMS" delay={400} />
            </motion.p>
          </motion.div>

          {/* Decorative 3D elements */}
          <div className="absolute -top-20 -left-20 w-40 h-40 rotating-element">
            <div className="w-full h-full border border-black/10 transform rotate-45" />
          </div>
          <div className="absolute -bottom-20 -right-20 w-32 h-32 rotating-element">
            <div className="w-full h-full border-2 border-black/5 rounded-full" />
          </div>
        </motion.div>

        {/* Animated scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative">
            <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-black/30 to-transparent" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 border border-black/20 rotate-45 animate-pulse" />
          </div>
        </motion.div>
      </section>

      {/* Asymmetric Grid Gallery */}
      <section id="grid" className="py-24 px-8 md:px-20 relative">
        <motion.div
          className="max-w-8xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="mb-16 grid grid-cols-12 gap-8">
            <div className="col-span-2">
              <p className="text-[10px] tracking-[0.4em] opacity-40 writing-vertical">
                <CipherText text="VISUAL" />
              </p>
            </div>
            <div className="col-span-8">
              <h2 className="text-[clamp(32px,4vw,64px)] font-thin tracking-tight mb-8">
                <CipherText text="Experimental Gallery" />
              </h2>
              <p className="text-sm text-gray-600 max-w-2xl leading-relaxed">
                <CipherText text="A curated collection of visual experiments exploring the boundaries between fashion, art, and technology." />
              </p>
            </div>
            <div className="col-span-2 text-right">
              <p className="text-4xl font-thin opacity-20">
                <CipherText text="001" />
              </p>
            </div>
          </div>

          <AsymmetricGrid items={gridItems} animated />
        </motion.div>
      </section>

      {/* Interactive 3D Section */}
      <section id="interactive" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-8 md:px-20">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {/* 3D Canvas */}
            <div className="h-[500px] bg-gradient-to-br from-gray-50 to-white rounded-lg overflow-hidden">
              <Suspense fallback={<div className="w-full h-full animate-pulse bg-gray-100" />}>
                <InteractiveCanvas type="floating" interactive />
              </Suspense>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center">
              <span className="text-[10px] tracking-[0.4em] opacity-40 mb-4">
                <CipherText text="INTERACTIVE" />
              </span>
              <h2 className="text-[clamp(32px,4vw,56px)] font-thin tracking-tight mb-6">
                <CipherText text="Digital Experiments" />
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-8">
                <CipherText text="Exploring the intersection of fashion and technology through interactive 3D experiences. Each piece represents a unique fusion of traditional craftsmanship and digital innovation." />
              </p>
              <div className="grid grid-cols-3 gap-4">
                {['MORPH', 'DISTORT', 'EVOLVE'].map((text, i) => (
                  <motion.div
                    key={text}
                    className="text-center py-3 border border-black/10 cursor-pointer hover:bg-black hover:text-white transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <p className="text-xs tracking-widest">
                      <CipherText text={text} delay={i * 50} />
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navigation Cards with 3D Effect */}
      <section id="navigation" className="py-24 px-8 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div ref={staggerRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* LAB Card */}
            <Link href="/lab">
              <motion.div
                ref={card1Ref}
                className="h-[500px] p-12 bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] tracking-[0.4em] opacity-40">
                      <CipherText text="002" />
                    </span>
                    <h3 className="text-5xl font-thin mt-8 tracking-tight">
                      <CipherText text="LAB" />
                    </h3>
                    <p className="text-xs opacity-60 mt-4 tracking-wider">
                      <CipherText text="Experimental Zone" />
                    </p>
                  </div>
                  <div className="flex items-end justify-between">
                    <span className="text-[10px] tracking-[0.3em] opacity-60">
                      <CipherText text="ENTER →" />
                    </span>
                    <div className="w-16 h-16 border border-white/20 rotate-45 transform hover:rotate-90 transition-transform duration-500" />
                  </div>
                </div>
                <div className="absolute inset-0 opacity-10">
                  <Suspense fallback={null}>
                    <InteractiveCanvas type="morphing" interactive={false} />
                  </Suspense>
                </div>
              </motion.div>
            </Link>

            {/* COLLECTIONS Card */}
            <Link href="/collections">
              <motion.div
                ref={card2Ref}
                className="h-[500px] p-12 border border-black/10 hover:border-black/30 relative overflow-hidden cursor-pointer bg-white"
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] tracking-[0.4em] opacity-40">
                      <CipherText text="003" />
                    </span>
                    <h3 className="text-5xl font-thin mt-8 tracking-tight">
                      <CipherText text="COLLECTIONS" />
                    </h3>
                    <p className="text-xs opacity-60 mt-4 tracking-wider">
                      <CipherText text="Complete Archive" />
                    </p>
                  </div>
                  <div className="space-y-2">
                    {['2025', '2024', '2023'].map((year, i) => (
                      <div key={year} className="flex justify-between text-xs">
                        <span className="opacity-60">
                          <CipherText text={`COLLECTION ${year}`} delay={i * 50} />
                        </span>
                        <span className="opacity-40">
                          <CipherText text="→" />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-transparent to-black/5" />
              </motion.div>
            </Link>

            {/* ARCHIVE Card */}
            <Link href="/archive">
              <motion.div
                ref={card3Ref}
                className="h-[500px] p-12 bg-gradient-to-br from-white to-gray-50 border border-black/10 hover:border-black/30 relative overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] tracking-[0.4em] opacity-40">
                      <CipherText text="004" />
                    </span>
                    <h3 className="text-5xl font-thin mt-8 tracking-tight">
                      <CipherText text="ARCHIVE" />
                    </h3>
                    <p className="text-xs opacity-60 mt-4 tracking-wider">
                      <CipherText text="Complete History" />
                    </p>
                  </div>
                  <div className="relative">
                    <div className="w-full h-32 relative">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="absolute bottom-0 w-full h-1 bg-black/10"
                          style={{ bottom: `${i * 8}px` }}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] tracking-[0.3em] opacity-60 absolute bottom-0 right-0">
                      <CipherText text="EXPLORE →" />
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section id="gallery" className="py-24 bg-gray-50">
        <div className="max-w-8xl mx-auto px-8 md:px-20">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[clamp(32px,4vw,64px)] font-thin tracking-tight mb-4">
              <CipherText text="Visual Archives" />
            </h2>
            <p className="text-sm text-gray-600">
              <CipherText text="Curated experiments in fashion and form" />
            </p>
          </motion.div>

          <ImageGallery images={galleryImages} layout="masonry" />
        </div>
      </section>

      {/* Statement Section with Parallax */}
      <section id="statement" className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 md:px-20">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-12 gap-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="md:col-span-2">
              <p className="text-[10px] tracking-[0.4em] opacity-40 writing-vertical">
                <CipherText text="PHILOSOPHY" />
              </p>
            </div>

            <div className="md:col-span-7">
              <h3 className="statement-text text-[clamp(36px,5vw,72px)] leading-[0.9] font-thin tracking-tight mb-12">
                <CipherText text="We don't follow trends." as="span" />
                <br />
                <span className="italic opacity-60">
                  <CipherText text="We create" as="span" delay={100} />
                </span>
                <br />
                <CipherText text="movements." as="span" delay={200} />
              </h3>
              <p className="statement-text text-sm text-gray-600 max-w-2xl leading-relaxed">
                <CipherText text="CINCH LAB represents a new paradigm in fashion design, where traditional boundaries dissolve and new possibilities emerge. Our work exists at the intersection of art, technology, and human expression." />
              </p>
            </div>

            <div className="md:col-span-3">
              <div className="sticky top-32 space-y-8">
                <div className="text-right">
                  <p className="text-6xl font-thin">
                    <CipherText text="∞" />
                  </p>
                  <p className="text-[10px] tracking-[0.3em] opacity-60 mt-2">
                    <CipherText text="INFINITE POSSIBILITIES" />
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-6xl font-thin">
                    <CipherText text="001" />
                  </p>
                  <p className="text-[10px] tracking-[0.3em] opacity-60 mt-2">
                    <CipherText text="SINGULAR VISION" />
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Background decoration */}
        <div className="absolute -top-40 -right-40 w-80 h-80 border border-black/5 rounded-full" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 border border-black/5 rotate-45" />
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-8 md:px-20">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="text-[clamp(32px,4vw,56px)] font-thin tracking-tight mb-8">
                <CipherText text="Get in Touch" />
              </h3>
              <p className="text-sm opacity-60 mb-8 leading-relaxed">
                <CipherText text="Interested in collaborating or learning more about our experimental approach to fashion? We're always exploring new possibilities." />
              </p>
              <Link href="/contact">
                <motion.button
                  className="px-8 py-4 border border-white/30 hover:bg-white hover:text-black transition-colors text-xs tracking-[0.3em]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <CipherText text="CONTACT US →" />
                </motion.button>
              </Link>
            </div>

            <div className="flex items-end justify-end">
              <div className="text-right">
                <p className="text-xs tracking-[0.3em] opacity-40 mb-4">
                  <CipherText text="LOCATIONS" />
                </p>
                <p className="text-sm opacity-60 space-y-2">
                  <span className="block"><CipherText text="SEOUL" /></span>
                  <span className="block"><CipherText text="NEW YORK" /></span>
                  <span className="block"><CipherText text="TOKYO" /></span>
                  <span className="block"><CipherText text="PARIS" /></span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 md:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <p className="text-sm font-thin">
                <CipherText text="© 2025 CINCH LAB" />
              </p>
              <p className="text-[10px] text-gray-600 mt-1 tracking-wider">
                <CipherText text="Experimental Fashion Technical Laboratory" />
              </p>
            </div>
            <div className="flex gap-8 text-[10px] tracking-[0.3em] opacity-60">
              <Link href="/privacy" className="hover:opacity-100 transition-opacity">
                <CipherText text="PRIVACY" />
              </Link>
              <Link href="/terms" className="hover:opacity-100 transition-opacity">
                <CipherText text="TERMS" />
              </Link>
              <Link href="/careers" className="hover:opacity-100 transition-opacity">
                <CipherText text="CAREERS" />
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] bg-black z-50"
        style={{ width: useTransform(scrollYProgress, [0, 1], ['0%', '100%']) }}
      />

      {/* Time Display */}
      <div className="fixed bottom-8 right-8 text-[10px] tracking-[0.3em] opacity-40 font-mono z-50 mix-blend-difference text-black">
        {currentTime}
      </div>

      {/* Section Indicator */}
      <div className="fixed left-8 bottom-8 text-[10px] tracking-[0.3em] opacity-40 z-50">
        <CipherText text={activeSection.toUpperCase()} />
      </div>
    </div>
  )
}