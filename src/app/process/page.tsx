'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Footer from '@/components/Footer'

// Custom easing for smooth animations
const yonEase = [0.22, 1, 0.36, 1] as const

// Process stages data - CSM/Parsons/Antwerp 포트폴리오 핵심 요소
const processStages = [
  {
    id: '01',
    title: 'Research',
    titleKo: '리서치',
    subtitle: 'Finding Inspiration',
    description: 'Every collection begins with deep research. Historical archives, art movements, architectural forms, and cultural phenomena become the foundation of new ideas.',
    descriptionKo: '모든 컬렉션은 깊은 리서치에서 시작됩니다. 역사적 아카이브, 예술 운동, 건축적 형태, 문화적 현상이 새로운 아이디어의 기반이 됩니다.',
    items: [
      { type: 'image', label: 'Mood Board', id: 'RES-001' },
      { type: 'image', label: 'Reference', id: 'RES-002' },
      { type: 'image', label: 'Archive', id: 'RES-003' },
    ],
    quote: '"Research is not just looking—it is seeing connections that others miss."',
    duration: 'Weeks 1-3',
    color: 'yon-platinum',
  },
  {
    id: '02',
    title: 'Concept',
    titleKo: '컨셉',
    subtitle: 'Defining the Vision',
    description: 'From research emerges a concept. Not just an aesthetic direction, but a philosophical framework that will guide every decision in the collection.',
    descriptionKo: '리서치에서 컨셉이 탄생합니다. 단순한 미적 방향이 아닌, 컬렉션의 모든 결정을 이끌어갈 철학적 프레임워크입니다.',
    items: [
      { type: 'sketch', label: 'Concept Map', id: 'CON-001' },
      { type: 'sketch', label: 'Initial Ideas', id: 'CON-002' },
      { type: 'text', label: 'Manifesto', id: 'CON-003' },
    ],
    quote: '"The concept is the soul. Everything else is just clothing."',
    duration: 'Weeks 2-4',
    color: 'yon-silver',
  },
  {
    id: '03',
    title: 'Sketch',
    titleKo: '스케치',
    subtitle: 'First Marks',
    description: 'Ideas move from mind to paper. Quick sketches capture energy and movement. Detailed drawings explore construction and proportion.',
    descriptionKo: '아이디어가 마음에서 종이로 이동합니다. 빠른 스케치는 에너지와 움직임을 포착합니다. 상세한 드로잉은 구조와 비례를 탐구합니다.',
    items: [
      { type: 'sketch', label: 'Quick Studies', id: 'SKE-001' },
      { type: 'sketch', label: 'Silhouettes', id: 'SKE-002' },
      { type: 'sketch', label: 'Detail Drawing', id: 'SKE-003' },
      { type: 'sketch', label: 'Technical', id: 'SKE-004' },
    ],
    quote: '"The first sketch is never right. That is exactly why it is necessary."',
    duration: 'Weeks 3-6',
    color: 'yon-grey',
  },
  {
    id: '04',
    title: 'Material',
    titleKo: '소재',
    subtitle: 'Touch & Texture',
    description: 'Fabric selection is a dialogue between vision and reality. Each material has its own voice—we listen and adapt.',
    descriptionKo: '원단 선택은 비전과 현실 사이의 대화입니다. 각 소재는 고유의 목소리를 가지고 있습니다—우리는 듣고 적응합니다.',
    items: [
      { type: 'swatch', label: 'Fabric Tests', id: 'MAT-001' },
      { type: 'swatch', label: 'Color Study', id: 'MAT-002' },
      { type: 'swatch', label: 'Texture Map', id: 'MAT-003' },
    ],
    quote: '"Fabric does not lie. It will reveal your intentions, good or bad."',
    duration: 'Weeks 4-8',
    color: 'yon-steel',
  },
  {
    id: '05',
    title: 'Toile',
    titleKo: '토일',
    subtitle: 'First Form',
    description: 'The toile is where ideas become three-dimensional. Muslin prototypes allow us to fail safely and discover unexpected possibilities.',
    descriptionKo: '토일은 아이디어가 3차원이 되는 곳입니다. 머슬린 프로토타입은 안전하게 실패하고 예상치 못한 가능성을 발견하게 해줍니다.',
    items: [
      { type: 'image', label: 'First Toile', id: 'TOI-001' },
      { type: 'image', label: 'Iteration 2', id: 'TOI-002' },
      { type: 'image', label: 'Iteration 3', id: 'TOI-003' },
      { type: 'image', label: 'Final Toile', id: 'TOI-004' },
    ],
    quote: '"Every toile is a question. The fabric gives the answer."',
    duration: 'Weeks 6-12',
    color: 'yon-charcoal',
  },
  {
    id: '06',
    title: 'Refine',
    titleKo: '정제',
    subtitle: 'Details Matter',
    description: 'Refinement is where obsession meets craft. Every seam, every stitch, every proportion is questioned and perfected.',
    descriptionKo: '정제는 집착과 장인정신이 만나는 곳입니다. 모든 솔기, 모든 스티치, 모든 비례가 질문받고 완벽해집니다.',
    items: [
      { type: 'detail', label: 'Seam Study', id: 'REF-001' },
      { type: 'detail', label: 'Proportion', id: 'REF-002' },
      { type: 'detail', label: 'Finishing', id: 'REF-003' },
    ],
    quote: '"God is in the details. Or in our case, the devil."',
    duration: 'Weeks 10-14',
    color: 'yon-graphite',
  },
  {
    id: '07',
    title: 'Failure',
    titleKo: '실패',
    subtitle: 'Learning Through Loss',
    description: 'We document our failures with the same care as our successes. Each mistake teaches something that success never could.',
    descriptionKo: '우리는 성공과 같은 주의로 실패를 기록합니다. 각 실수는 성공이 결코 가르쳐줄 수 없는 것을 가르쳐줍니다.',
    items: [
      { type: 'failure', label: 'Rejected Ideas', id: 'FAI-001' },
      { type: 'failure', label: 'Failed Toiles', id: 'FAI-002' },
      { type: 'failure', label: 'Lessons', id: 'FAI-003' },
    ],
    quote: '"Show me a designer who has never failed, and I will show you a liar."',
    duration: 'Ongoing',
    color: 'yon-accent',
  },
  {
    id: '08',
    title: 'Final',
    titleKo: '최종',
    subtitle: 'The Destination',
    description: 'The final garment is not an end, but a beginning. It is a question answered, and a new question posed.',
    descriptionKo: '최종 의복은 끝이 아니라 시작입니다. 그것은 답변된 질문이자 새로운 질문입니다.',
    items: [
      { type: 'final', label: 'Look 01', id: 'FIN-001' },
      { type: 'final', label: 'Look 02', id: 'FIN-002' },
      { type: 'final', label: 'Detail', id: 'FIN-003' },
    ],
    quote: '"Every end is a new beginning in disguise."',
    duration: 'Week 14+',
    color: 'yon-black',
  },
]

// Process stage item placeholder component
function ProcessItem({
  item,
  index,
  stageColor,
}: {
  item: { type: string; label: string; id: string }
  index: number
  stageColor: string
}) {
  const [isHovered, setIsHovered] = useState(false)

  const getAspectRatio = () => {
    switch (item.type) {
      case 'sketch':
        return '3/4'
      case 'swatch':
        return '1/1'
      case 'detail':
        return '4/3'
      case 'failure':
        return '4/5'
      case 'final':
        return '3/4'
      default:
        return '4/5'
    }
  }

  return (
    <motion.div
      className="group relative cursor-pointer"
      initial={{ opacity: 0, y: 40, rotate: -2 }}
      whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? 1 : -1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor="image"
      data-cursor-text="View"
    >
      <motion.div
        className={`relative bg-${stageColor} overflow-hidden`}
        style={{ aspectRatio: getAspectRatio() }}
        animate={{ scale: isHovered ? 1.03 : 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Placeholder content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="font-mono text-[9px] tracking-[0.25em] uppercase opacity-40"
            style={{
              color: stageColor === 'yon-charcoal' || stageColor === 'yon-black' || stageColor === 'yon-graphite'
                ? '#B0B0B0'
                : '#4A4A4A',
            }}
            animate={{ opacity: isHovered ? 0.7 : 0.4 }}
          >
            {item.label}
          </motion.span>
        </div>

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-yon-accent/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Border */}
        <div className="absolute inset-0 border border-current opacity-10" />
      </motion.div>

      {/* ID label */}
      <motion.div
        className="mt-3 flex items-center justify-between"
        animate={{ y: isHovered ? -2 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <span className="font-mono text-[9px] text-yon-grey/60 tracking-wider">
          {item.id}
        </span>
        <span className="font-mono text-[8px] text-yon-grey/40 tracking-wider uppercase">
          {item.type}
        </span>
      </motion.div>
    </motion.div>
  )
}

// Process stage section
function ProcessStage({ stage, index }: { stage: typeof processStages[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const parallaxY = useTransform(scrollYProgress, [0, 1], [50, -50])
  const isEven = index % 2 === 0

  return (
    <section
      ref={ref}
      className={`relative py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-16 overflow-hidden ${
        index % 2 === 0 ? 'bg-yon-white' : 'bg-yon-ivory'
      }`}
    >
      {/* Background stage number */}
      <motion.span
        className={`absolute font-mono text-[30vw] md:text-[25vw] leading-none select-none pointer-events-none opacity-[0.03] ${
          isEven ? 'top-0 right-[-5%]' : 'top-0 left-[-5%]'
        }`}
        style={{ y: parallaxY }}
      >
        {stage.id}
      </motion.span>

      <div className="max-w-7xl mx-auto relative">
        {/* Stage header */}
        <div className={`grid md:grid-cols-12 gap-8 md:gap-12 mb-16 md:mb-24 ${isEven ? '' : 'md:text-right'}`}>
          <motion.div
            className={`md:col-span-6 ${isEven ? '' : 'md:col-start-7'}`}
            initial={{ opacity: 0, x: isEven ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Stage number & subtitle */}
            <div className={`flex items-center gap-3 mb-4 ${isEven ? '' : 'md:justify-end'}`}>
              <span className="font-mono text-[11px] text-yon-accent tracking-[0.2em]">
                {stage.id}
              </span>
              <span className="w-8 h-px bg-yon-grey/30" />
              <span className="font-mono text-[10px] text-yon-grey tracking-[0.15em] uppercase">
                {stage.subtitle}
              </span>
            </div>

            {/* Title */}
            <h2 className="font-serif text-[12vw] md:text-[8vw] lg:text-[6vw] text-yon-black leading-[0.9]">
              {stage.title}
            </h2>
            <span className="block mt-2 font-mono text-[10px] text-yon-grey/50 tracking-wider">
              {stage.titleKo}
            </span>

            {/* Duration */}
            <div className={`mt-6 flex items-center gap-2 ${isEven ? '' : 'md:justify-end'}`}>
              <span className="font-mono text-[9px] text-yon-grey/60 tracking-wider uppercase">
                Duration:
              </span>
              <span className="font-mono text-[10px] text-yon-steel tracking-wider">
                {stage.duration}
              </span>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            className={`md:col-span-5 ${isEven ? 'md:col-start-8' : 'md:col-start-1 md:row-start-1'}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-base md:text-lg text-yon-steel leading-[1.8]">
              {stage.description}
            </p>
            <p className="mt-4 text-sm text-yon-grey leading-[1.7]">
              {stage.descriptionKo}
            </p>
          </motion.div>
        </div>

        {/* Process items grid - asymmetric layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {stage.items.map((item, i) => (
            <div
              key={item.id}
              className={`${
                i === 0 ? 'md:col-span-2 md:row-span-2' : ''
              } ${
                i === 1 && stage.items.length > 3 ? 'md:mt-12' : ''
              } ${
                i === 2 && stage.items.length > 3 ? 'md:mt-[-2rem]' : ''
              }`}
            >
              <ProcessItem item={item} index={i} stageColor={stage.color} />
            </div>
          ))}
        </div>

        {/* Quote */}
        <motion.blockquote
          className={`mt-16 md:mt-24 relative ${isEven ? 'md:ml-[20%]' : 'md:mr-[20%]'}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="absolute -top-6 -left-4 font-serif text-[60px] text-yon-platinum/40 leading-none">
            "
          </span>
          <p className="font-serif text-xl md:text-2xl text-yon-black/80 italic leading-relaxed pl-8">
            {stage.quote.replace(/"/g, '')}
          </p>
        </motion.blockquote>
      </div>
    </section>
  )
}

export default function ProcessPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div ref={containerRef} className="min-h-screen bg-yon-white">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] bg-yon-accent z-50"
        style={{ width: progressWidth }}
      />

      {/* Hero Section - Extreme Typography */}
      <section className="relative min-h-screen flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-12 lg:px-16 overflow-hidden">
        {/* Grain texture */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

        {/* Giant Background Letter */}
        <motion.span
          className="absolute top-[5%] right-[-15%] font-serif text-[80vw] md:text-[60vw] text-yon-platinum/[0.03] leading-none select-none pointer-events-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: yonEase }}
        >
          P
        </motion.span>

        {/* Vertical decorative line */}
        <motion.div
          className="absolute top-[15%] left-[8%] w-px h-[35vh] bg-gradient-to-b from-transparent via-yon-accent/30 to-transparent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: yonEase }}
        />

        {/* Number tag */}
        <motion.span
          className="absolute top-[25%] left-[4%] font-mono text-[10px] text-yon-grey/30 tracking-[0.3em] -rotate-90 origin-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          03.PROCESS
        </motion.span>

        <div className="max-w-7xl mx-auto relative w-full">
          {/* Prefix tag with accent */}
          <motion.div
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: yonEase }}
          >
            <span className="w-12 h-px bg-yon-accent" />
            <span className="font-mono text-[10px] text-yon-accent tracking-[0.3em] uppercase">
              The Making
            </span>
          </motion.div>

          {/* Main Title - EXTREME Scale */}
          <h1 className="relative">
            <motion.span
              className="block font-serif text-[24vw] md:text-[18vw] lg:text-[16vw] text-yon-black leading-[0.75] tracking-[-0.04em]"
              initial={{ opacity: 0, y: 100, rotate: 3 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: yonEase }}
            >
              Pro
            </motion.span>
            <motion.span
              className="block font-serif text-[24vw] md:text-[18vw] lg:text-[16vw] text-yon-black leading-[0.75] tracking-[-0.04em] ml-[15%] md:ml-[20%]"
              initial={{ opacity: 0, y: 100, rotate: -3 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.45, ease: yonEase }}
            >
              cess
            </motion.span>

            {/* Italic ghost overlay */}
            <motion.span
              className="absolute top-0 left-0 font-serif italic text-[24vw] md:text-[18vw] lg:text-[16vw] text-yon-accent/[0.06] leading-[0.75] tracking-[-0.04em] pointer-events-none"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: yonEase }}
            >
              Pro
            </motion.span>
          </h1>

          {/* Korean subtitle - asymmetric placement */}
          <motion.div
            className="mt-6 md:mt-10 ml-[5%] md:ml-[45%]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: yonEase }}
          >
            <span className="font-mono text-[11px] text-yon-grey/50 tracking-[0.2em]">
              과정 — The Journey
            </span>
          </motion.div>

          {/* Two column layout */}
          <div className="mt-12 md:mt-20 grid md:grid-cols-12 gap-8 md:gap-12">
            {/* Subtitle */}
            <motion.div
              className="md:col-span-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: yonEase }}
            >
              <p className="text-xl md:text-2xl lg:text-3xl text-yon-steel leading-[1.4]">
                The journey from idea to garment.
                <span className="block mt-3 text-base md:text-lg text-yon-grey">
                  아이디어에서 의복까지의 여정. 모든 실패가 축하받습니다.
                </span>
              </p>
            </motion.div>

            {/* Stats - asymmetric */}
            <motion.div
              className="md:col-span-4 md:col-start-9"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: yonEase }}
            >
              <div className="space-y-6">
                {[
                  { value: '8', label: 'Stages', tag: '[01]' },
                  { value: '14+', label: 'Weeks', tag: '[02]' },
                  { value: '∞', label: 'Iterations', tag: '[03]' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    className="flex items-end justify-between border-b border-yon-platinum/50 pb-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 + i * 0.1, ease: yonEase }}
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-serif text-4xl md:text-5xl text-yon-black leading-none">{stat.value}</span>
                      <span className="font-mono text-[9px] text-yon-grey tracking-[0.15em] uppercase">
                        {stat.label}
                      </span>
                    </div>
                    <span className="font-mono text-[8px] text-yon-grey/30">{stat.tag}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Decorative line */}
          <motion.div
            className="mt-12 w-[50%] md:w-[35%] h-px bg-gradient-to-r from-yon-grey/20 via-yon-accent/30 to-transparent"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 1, ease: yonEase }}
          />

          {/* Scroll indicator - offset */}
          <motion.div
            className="absolute bottom-[-8vh] left-[10%] flex flex-col items-center gap-4"
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
        </div>
      </section>

      {/* Navigation */}
      <section className="sticky top-16 md:top-20 z-40 bg-yon-white/95 backdrop-blur-sm border-y border-yon-platinum py-4 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {processStages.map((stage, i) => (
              <a
                key={stage.id}
                href={`#stage-${stage.id}`}
                className="flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] tracking-wider text-yon-grey hover:text-yon-black transition-colors whitespace-nowrap"
              >
                <span className="text-yon-accent">{stage.id}</span>
                <span className="uppercase">{stage.title}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Process Stages */}
      {processStages.map((stage, index) => (
        <div key={stage.id} id={`stage-${stage.id}`}>
          <ProcessStage stage={stage} index={index} />
        </div>
      ))}

      {/* Philosophy Section */}
      <section className="relative py-32 md:py-48 px-6 md:px-12 lg:px-16 bg-yon-charcoal text-yon-white overflow-hidden">
        {/* Grain texture */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

        <div className="max-w-4xl mx-auto relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-[10px] text-yon-silver/60 tracking-[0.25em] uppercase">
              Philosophy
            </span>

            <h2 className="mt-8 font-serif text-[10vw] md:text-[6vw] lg:text-[5vw] leading-[1.1]">
              <span className="block">Process is</span>
              <span className="block text-yon-accent">the product</span>
            </h2>

            <p className="mt-10 text-lg md:text-xl text-yon-silver leading-[1.9] max-w-2xl mx-auto">
              In fashion education, the journey matters as much as the destination.
              CSM, Parsons, and Antwerp all seek designers who understand that
              creativity is not a destination—it is a way of moving through the world.
            </p>

            <p className="mt-6 text-base text-yon-grey leading-[1.8] max-w-xl mx-auto">
              패션 교육에서 여정은 목적지만큼 중요합니다.
              CSM, 파슨스, 앤트워프 모두 창의성이 목적지가 아닌
              세상을 움직이는 방식임을 이해하는 디자이너를 찾습니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-yon-ivory">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-mono text-[10px] text-yon-grey tracking-[0.2em] uppercase">
              Continue Exploring
            </span>

            <h2 className="mt-6 font-serif text-3xl md:text-4xl lg:text-5xl text-yon-black leading-tight">
              See the results of this process
            </h2>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/collections"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-yon-black text-yon-white font-mono text-[10px] tracking-[0.15em] uppercase hover:bg-yon-charcoal transition-colors"
              >
                <span>View Collections</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link
                href="/archive"
                className="group inline-flex items-center gap-3 px-8 py-4 border border-yon-black font-mono text-[10px] tracking-[0.15em] uppercase text-yon-black hover:bg-yon-black hover:text-yon-white transition-all"
              >
                <span>Enter Archive</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
