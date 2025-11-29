'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'

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

  const parallax1 = useTransform(scrollYProgress, [0, 1], [0, -80])
  const parallax2 = useTransform(scrollYProgress, [0, 1], [0, -120])
  const parallax3 = useTransform(scrollYProgress, [0, 1], [0, -60])

  return (
    <div ref={containerRef} className="min-h-screen bg-yon-white">
      {/* Hero Section with scattered images */}
      <section className="relative min-h-[140vh] md:min-h-[160vh] overflow-hidden">
        {/* Scattered background images */}
        {scatteredImages.map((img, index) => (
          <motion.div
            key={img.id}
            className={`absolute ${img.size}`}
            style={{
              ...img.position,
              y: index % 2 === 0 ? parallax1 : parallax2,
              zIndex: index + 1,
            }}
            initial={{ opacity: 0, scale: 0.9, rotate: img.rotation - 5 }}
            animate={{ opacity: 1, scale: 1, rotate: img.rotation }}
            transition={{
              duration: 1,
              delay: 0.3 + index * 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div
              className={`${variantStyles[img.variant]} shadow-lg`}
              style={{ aspectRatio: img.aspectRatio }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`font-mono text-[10px] tracking-widest ${variantTextStyles[img.variant]}`}>
                  {img.label}
                </span>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Main content - overlapping images */}
        <div className="relative z-20 pt-32 md:pt-48 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {/* Decorative element */}
              <span className="absolute -top-12 -left-4 md:-left-12 font-mono text-[120px] md:text-[200px] text-yon-platinum/30 leading-none select-none pointer-events-none">
                A
              </span>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="relative font-mono text-xs text-yon-grey tracking-[0.2em] uppercase">
                  Beyond the horizon
                </span>
                <h1 className="relative mt-6 font-serif text-[14vw] md:text-[10vw] lg:text-[8vw] text-yon-black leading-[0.85]">
                  <span className="block transform rotate-[-1deg]">THE</span>
                  <span className="block transform rotate-[0.5deg] ml-[15%]">YON</span>
                </h1>
              </motion.div>

              <motion.p
                className="mt-12 md:mt-16 text-xl md:text-2xl text-yon-steel max-w-lg leading-relaxed ml-[5%] md:ml-[20%]"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                "저 너머"를 향한 끊임없는 탐구.
                <br />
                시간과 공간을 초월한 패션을 추구합니다.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Section - Asymmetric layout */}
      <section className="py-32 md:py-48 px-6 md:px-12 bg-yon-ivory">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-12 gap-8 md:gap-16">
            {/* Left column - staggered */}
            <motion.div
              className="md:col-span-5 md:col-start-1"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-mono text-xs text-yon-grey tracking-[0.2em] uppercase">
                Philosophy
              </span>
              <h2 className="mt-4 font-serif text-4xl md:text-5xl lg:text-6xl text-yon-black leading-[1.1]">
                <span className="block transform rotate-[-0.5deg]">Twisted</span>
                <span className="block transform rotate-[0.3deg] ml-[10%]">yet</span>
                <span className="block transform rotate-[-0.2deg]">harmonious</span>
              </h2>
            </motion.div>

            {/* Right column - offset */}
            <motion.div
              className="md:col-span-6 md:col-start-7 md:mt-24"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-lg md:text-xl text-yon-steel leading-relaxed">
                모든 요소가 약간씩 어긋나 있습니다.
                하지만 전체적으로는 하나의 아름다운 구성을 이룹니다.
              </p>
              <p className="mt-6 text-lg md:text-xl text-yon-steel leading-relaxed">
                해체되어 있지만 완벽합니다.
                이것이 THE YON의 미학입니다.
              </p>
              <p className="mt-6 text-base text-yon-grey leading-relaxed">
                우리는 전통적인 패턴 메이킹과 현대적인 해체주의가 만나는 지점을 탐구합니다.
                Pattern Magic의 기법들을 연구하고, 그것을 넘어서는 새로운 가능성을 찾습니다.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Designer Section - Split layout */}
      <section className="py-32 md:py-48 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            {/* Image placeholder - rotated */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, rotate: -5 }}
              whileInView={{ opacity: 1, rotate: -2 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="bg-yon-charcoal shadow-2xl"
                style={{ aspectRatio: '4/5' }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-mono text-sm text-yon-silver tracking-widest">
                    DESIGNER PORTRAIT
                  </span>
                </div>
              </div>
              {/* Decorative number */}
              <span className="absolute -bottom-8 -right-4 font-mono text-[80px] md:text-[120px] text-yon-platinum/40 leading-none select-none">
                01
              </span>
            </motion.div>

            {/* Text content */}
            <motion.div
              className="flex flex-col justify-center"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-mono text-xs text-yon-grey tracking-[0.2em] uppercase">
                Designer
              </span>
              <h2 className="mt-4 font-serif text-4xl md:text-5xl text-yon-black">
                <span className="block transform rotate-[-0.3deg]">Taehyun</span>
                <span className="block transform rotate-[0.2deg] ml-[5%]">Lee</span>
              </h2>
              <p className="mt-8 text-lg text-yon-steel leading-relaxed">
                사사다 패션스쿨에서 패션 디자인을 공부하고 있습니다.
                실험적인 패턴 메이킹과 소재 연구에 집중하며,
                전통적인 테일러링 기법과 현대적인 해체주의 사이의
                균형점을 찾고 있습니다.
              </p>
              <p className="mt-6 text-base text-yon-grey leading-relaxed">
                THE YON은 판매를 위한 브랜드가 아닙니다.
                이것은 실험과 연구를 위한 공간이며, 창작 과정 자체를
                기록하고 공유하기 위한 디지털 아카이브입니다.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Approach Section - Dark with scattered numbers */}
      <section className="relative py-32 md:py-48 px-6 md:px-12 bg-yon-charcoal text-yon-white overflow-hidden">
        {/* Decorative scattered numbers */}
        <span className="absolute top-12 right-8 font-mono text-[150px] md:text-[250px] text-yon-graphite/30 leading-none select-none pointer-events-none">
          02
        </span>
        <span className="absolute bottom-12 left-8 font-mono text-[100px] md:text-[180px] text-yon-graphite/20 leading-none select-none pointer-events-none transform rotate-[-8deg]">
          03
        </span>

        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-xs text-yon-silver tracking-[0.2em] uppercase">
              Approach
            </span>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
              <span className="block transform rotate-[-0.3deg]">How</span>
              <span className="block transform rotate-[0.2deg] ml-[8%]">we work</span>
            </h2>
          </motion.div>

          <div className="mt-16 md:mt-24 grid md:grid-cols-2 gap-12 md:gap-16">
            {[
              { num: '01', title: 'Research', text: '영감의 원천을 찾고, 기존의 기법을 분석합니다.' },
              { num: '02', title: 'Experiment', text: '새로운 가능성을 탐구하고, 실패를 두려워하지 않습니다.' },
              { num: '03', title: 'Document', text: '과정을 기록하고, 발견을 공유합니다.' },
              { num: '04', title: 'Refine', text: '반복적인 개선을 통해 완성도를 높입니다.' },
            ].map((item, index) => (
              <motion.div
                key={item.num}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <span className="font-mono text-xs text-yon-grey">
                  {item.num}
                </span>
                <h3 className="mt-2 font-serif text-2xl md:text-3xl text-yon-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-base text-yon-silver leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 md:py-40 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="relative text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Decorative quote */}
            <span className="absolute -top-16 left-1/2 -translate-x-1/2 font-mono text-[100px] md:text-[160px] text-yon-platinum/30 leading-none select-none pointer-events-none">
              &ldquo;
            </span>

            <p className="relative font-serif text-2xl md:text-3xl lg:text-4xl text-yon-black leading-[1.3] max-w-2xl mx-auto">
              <span className="block transform rotate-[-0.3deg]">The journey matters</span>
              <span className="block transform rotate-[0.2deg]">as much as the destination</span>
            </p>

            <div className="mt-16">
              <span className="font-mono text-xs text-yon-grey tracking-[0.2em] uppercase block mb-6">
                Interested in collaboration?
              </span>
              <Link
                href="/contact"
                className="inline-block font-serif text-3xl md:text-4xl text-yon-black hover:text-yon-accent transition-colors duration-300"
              >
                <span className="transform inline-block rotate-[-0.5deg]">Get in touch</span>
                <span className="inline-block ml-4">→</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
