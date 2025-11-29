'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import Footer from '@/components/Footer'

// Scattered image placeholders for the about page
const scatteredImages = [
  {
    id: 1,
    label: 'STUDIO',
    position: { top: '8%', left: '5%' },
    size: 'w-[30vw] md:w-[18vw]',
    rotation: -4,
    variant: 'dark' as const,
    aspectRatio: '4/5',
  },
  {
    id: 2,
    label: 'PROCESS',
    position: { top: '15%', right: '8%' },
    size: 'w-[35vw] md:w-[22vw]',
    rotation: 3,
    variant: 'medium' as const,
    aspectRatio: '3/4',
  },
  {
    id: 3,
    label: 'DETAIL',
    position: { top: '55%', left: '12%' },
    size: 'w-[28vw] md:w-[16vw]',
    rotation: -2,
    variant: 'light' as const,
    aspectRatio: '1/1',
  },
  {
    id: 4,
    label: 'MATERIAL',
    position: { top: '70%', right: '15%' },
    size: 'w-[32vw] md:w-[20vw]',
    rotation: 2.5,
    variant: 'dark' as const,
    aspectRatio: '4/5',
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

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const parallax1 = useTransform(scrollYProgress, [0, 1], [0, -60])
  const parallax2 = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <div ref={containerRef} className="min-h-screen bg-yon-white">
      {/* Hero Section - Editorial Layout */}
      <section className="relative min-h-[130vh] md:min-h-[150vh] overflow-hidden">
        {/* Subtle grain texture */}
        <div className="absolute inset-0 opacity-[0.012] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

        {/* Scattered background images */}
        {scatteredImages.map((img, index) => (
          <motion.div
            key={img.id}
            className={`absolute ${img.size} group`}
            style={{
              ...img.position,
              y: index % 2 === 0 ? parallax1 : parallax2,
              zIndex: index + 1,
            }}
            initial={{ opacity: 0, scale: 0.95, rotate: img.rotation - 3 }}
            animate={{ opacity: 1, scale: 1, rotate: img.rotation }}
            transition={{
              duration: 1.2,
              delay: 0.4 + index * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div
              className={`relative ${variantStyles[img.variant]}`}
              style={{ aspectRatio: img.aspectRatio }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`font-mono text-[8px] md:text-[10px] tracking-[0.2em] ${variantTextStyles[img.variant]} opacity-50`}>
                  {img.label}
                </span>
              </div>
              {/* Subtle border */}
              <div className="absolute inset-0 border border-current opacity-[0.06]" />
            </div>
            {/* Image index */}
            <span className={`absolute -bottom-4 left-0 font-mono text-[8px] tracking-wider ${variantTextStyles[img.variant]} opacity-30`}>
              {String(img.id).padStart(2, '0')}
            </span>
          </motion.div>
        ))}

        {/* Main content */}
        <div className="relative z-20 pt-28 md:pt-36 lg:pt-40 px-6 md:px-12 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {/* Decorative element */}
              <span className="absolute -top-8 -left-2 md:-left-8 font-mono text-[100px] md:text-[160px] text-yon-platinum/20 leading-none select-none pointer-events-none">
                A
              </span>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-6 h-px bg-yon-grey" />
                  <span className="font-mono text-[10px] text-yon-grey tracking-[0.25em] uppercase">
                    Beyond the horizon
                  </span>
                </div>
                <h1 className="relative font-serif text-[18vw] md:text-[14vw] lg:text-[11vw] text-yon-black leading-[0.82]">
                  <motion.span
                    className="block"
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    THE
                  </motion.span>
                  <motion.span
                    className="block ml-[10%]"
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    YON
                  </motion.span>
                </h1>
              </motion.div>

              <motion.div
                className="mt-12 md:mt-16 ml-[3%] md:ml-[15%] max-w-lg"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-lg md:text-xl text-yon-steel leading-[1.7]">
                  "저 너머"를 향한 끊임없는 탐구.
                </p>
                <p className="mt-3 text-base text-yon-grey leading-[1.7]">
                  시간과 공간을 초월한 패션을 추구합니다.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Section - Editorial Grid */}
      <section className="py-32 md:py-48 lg:py-56 px-6 md:px-12 lg:px-16 bg-yon-ivory relative overflow-hidden">
        {/* Background decoration */}
        <span className="absolute top-1/2 -translate-y-1/2 -right-[10%] font-mono text-[35vw] md:text-[25vw] text-yon-platinum/15 leading-none select-none pointer-events-none">
          01
        </span>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12">
            {/* Left column - Label + Title */}
            <motion.div
              className="md:col-span-5"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-6 h-px bg-yon-grey" />
                <span className="font-mono text-[10px] text-yon-grey tracking-[0.2em] uppercase">
                  Philosophy
                </span>
              </div>
              <h2 className="font-serif text-[8vw] md:text-[4vw] lg:text-[3.2vw] text-yon-black leading-[1.05]">
                <span className="block">Twisted</span>
                <span className="block ml-[8%]">yet</span>
                <span className="block">harmonious</span>
              </h2>
              <span className="block mt-6 font-mono text-[10px] text-yon-grey/40 tracking-wider">
                001
              </span>
            </motion.div>

            {/* Right column - Content */}
            <motion.div
              className="md:col-span-6 md:col-start-7 md:pt-16"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-base md:text-lg text-yon-steel leading-[1.8]">
                모든 요소가 약간씩 어긋나 있습니다.
                하지만 전체적으로는 하나의 아름다운 구성을 이룹니다.
              </p>
              <p className="mt-5 text-base md:text-lg text-yon-steel leading-[1.8]">
                해체되어 있지만 완벽합니다.
                이것이 THE YON의 미학입니다.
              </p>
              <p className="mt-5 text-sm text-yon-grey leading-[1.8]">
                우리는 전통적인 패턴 메이킹과 현대적인 해체주의가 만나는 지점을 탐구합니다.
                Pattern Magic의 기법들을 연구하고, 그것을 넘어서는 새로운 가능성을 찾습니다.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Designer Section - Editorial Split */}
      <section className="py-32 md:py-48 lg:py-56 px-6 md:px-12 lg:px-16 relative">
        {/* Background decoration */}
        <span className="absolute top-20 -left-[5%] font-mono text-[30vw] md:text-[20vw] text-yon-platinum/8 leading-none select-none pointer-events-none">
          02
        </span>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12 md:gap-16">
            {/* Image - Offset */}
            <motion.div
              className="md:col-span-5 relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="relative bg-yon-charcoal"
                style={{ aspectRatio: '4/5', transform: 'rotate(-1.5deg)' }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-mono text-[10px] text-yon-silver tracking-[0.2em] opacity-50">
                    PORTRAIT
                  </span>
                </div>
                {/* Subtle border */}
                <div className="absolute inset-0 border border-yon-silver/10" />
              </div>
              {/* Decorative index */}
              <span className="absolute -bottom-6 left-0 font-mono text-[9px] text-yon-grey/40 tracking-wider">
                002
              </span>
            </motion.div>

            {/* Text content */}
            <motion.div
              className="md:col-span-6 md:col-start-7 md:pt-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-6 h-px bg-yon-grey" />
                <span className="font-mono text-[10px] text-yon-grey tracking-[0.2em] uppercase">
                  Designer
                </span>
              </div>
              <h2 className="font-serif text-[7vw] md:text-[3.5vw] lg:text-[2.8vw] text-yon-black leading-[1.1]">
                <span className="block">Taehyun</span>
                <span className="block ml-[5%]">Lee</span>
              </h2>
              <p className="mt-8 text-base md:text-lg text-yon-steel leading-[1.8]">
                사사다 패션스쿨에서 패션 디자인을 공부하고 있습니다.
                실험적인 패턴 메이킹과 소재 연구에 집중하며,
                전통적인 테일러링 기법과 현대적인 해체주의 사이의
                균형점을 찾고 있습니다.
              </p>
              <p className="mt-5 text-sm text-yon-grey leading-[1.8]">
                THE YON은 판매를 위한 브랜드가 아닙니다.
                이것은 실험과 연구를 위한 공간이며, 창작 과정 자체를
                기록하고 공유하기 위한 디지털 아카이브입니다.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Approach Section - Dark Editorial */}
      <section className="relative py-32 md:py-48 lg:py-56 px-6 md:px-12 lg:px-16 bg-yon-charcoal text-yon-white overflow-hidden">
        {/* Subtle grain texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

        {/* Decorative numbers */}
        <span className="absolute top-16 right-8 md:right-16 font-mono text-[120px] md:text-[200px] text-yon-graphite/20 leading-none select-none pointer-events-none">
          03
        </span>

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            className="grid md:grid-cols-12 gap-8 md:gap-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="md:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-6 h-px bg-yon-silver/50" />
                <span className="font-mono text-[10px] text-yon-silver/70 tracking-[0.2em] uppercase">
                  Approach
                </span>
              </div>
              <h2 className="font-serif text-[8vw] md:text-[4vw] lg:text-[3.2vw] leading-[1.05]">
                <span className="block">How</span>
                <span className="block ml-[8%]">we work</span>
              </h2>
              <span className="block mt-6 font-mono text-[10px] text-yon-grey/40 tracking-wider">
                003
              </span>
            </div>
          </motion.div>

          <div className="mt-16 md:mt-20 grid md:grid-cols-2 gap-10 md:gap-14">
            {[
              { num: '01', title: 'Research', text: '영감의 원천을 찾고, 기존의 기법을 분석합니다.' },
              { num: '02', title: 'Experiment', text: '새로운 가능성을 탐구하고, 실패를 두려워하지 않습니다.' },
              { num: '03', title: 'Document', text: '과정을 기록하고, 발견을 공유합니다.' },
              { num: '04', title: 'Refine', text: '반복적인 개선을 통해 완성도를 높입니다.' },
            ].map((item, index) => (
              <motion.div
                key={item.num}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <span className="font-mono text-[10px] text-yon-grey/60 tracking-wider">
                  {item.num}
                </span>
                <h3 className="mt-3 font-serif text-xl md:text-2xl text-yon-white group-hover:text-yon-accent transition-colors duration-500">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-yon-silver/80 leading-[1.8]">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Minimal */}
      <section className="py-32 md:py-40 lg:py-48 px-6 md:px-12 lg:px-16 relative overflow-hidden">
        {/* Background decoration */}
        <span className="absolute top-1/2 -translate-y-1/2 -left-[10%] font-mono text-[40vw] md:text-[30vw] text-yon-platinum/10 leading-none select-none pointer-events-none">
          04
        </span>

        <div className="max-w-4xl mx-auto">
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Decorative quote */}
            <span className="absolute -top-10 -left-4 md:-left-8 font-serif text-[80px] md:text-[120px] text-yon-platinum/25 leading-none select-none pointer-events-none">
              "
            </span>

            <p className="relative font-serif text-[6vw] md:text-[3.5vw] lg:text-[2.8vw] text-yon-black leading-[1.2] max-w-2xl">
              <span className="block">The journey matters</span>
              <span className="block ml-[5%]">as much as the destination</span>
            </p>

            <div className="mt-14 md:mt-16">
              <span className="font-mono text-[10px] text-yon-grey tracking-[0.2em] uppercase block mb-6">
                Interested in collaboration?
              </span>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-4 font-mono text-xs tracking-[0.15em] uppercase text-yon-black"
              >
                <span className="relative pb-1">
                  <span className="relative z-10">Get in touch</span>
                  <span className="absolute bottom-0 left-0 w-full h-px bg-yon-black origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  <span className="absolute bottom-0 left-0 w-full h-px bg-yon-accent origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] delay-100" />
                </span>
                <span className="transform group-hover:translate-x-2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  →
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
