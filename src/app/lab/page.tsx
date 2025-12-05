'use client'

import Link from 'next/link'
import Footer from '@/components/Footer'
import { Slot, AnnotationLabel } from '@/components/deconstructivist'

// Lab experiments data
const experiments = [
  {
    id: 'EXP-001',
    title: 'Material Splice',
    status: 'active',
    description: 'Contrasting fabric fusion techniques',
    date: '2024.11',
  },
  {
    id: 'EXP-002',
    title: 'Zero Waste Pattern',
    status: 'testing',
    description: 'Pattern cutting with no fabric waste',
    date: '2024.10',
  },
  {
    id: 'EXP-003',
    title: 'Modular System',
    status: 'paused',
    description: 'Interchangeable garment components',
    date: '2024.09',
  },
  {
    id: 'EXP-004',
    title: 'Surface Treatment',
    status: 'complete',
    description: 'Post-production fabric manipulation',
    date: '2024.08',
  },
  {
    id: 'EXP-005',
    title: 'Volume Study',
    status: 'active',
    description: '3D form through flat construction',
    date: '2024.11',
  },
]

// Experiment card with dense slot cluster
function ExperimentCard({
  experiment,
  index,
}: {
  experiment: (typeof experiments)[0]
  index: number
}) {
  const isReversed = index % 2 === 1
  const rotations = [-2, 1.5, -1, 2, -1.5]
  const clips = ['irregular-1', 'torn-1', 'irregular-3', 'torn-2', 'organic-1'] as const
  const decorations = ['tape-top', 'pin', 'staple', 'corner-fold', 'tape-corner'] as const

  const statusColors = {
    active: 'text-yon-accent',
    testing: 'text-yon-grey/60',
    paused: 'text-yon-grey/40',
    complete: 'text-yon-black/40',
  }

  return (
    <div
      className="relative py-16 border-b border-yon-grey/10"
      style={{ transform: `rotate(${rotations[index % rotations.length] * 0.3}deg)` }}
    >
      <div className={`flex flex-col md:flex-row gap-8 ${isReversed ? 'md:flex-row-reverse' : ''}`}>
        {/* Dense slot cluster - 4 slots per experiment */}
        <div className="w-full md:w-1/2 relative" style={{ minHeight: '300px' }}>
          {/* Main slot */}
          <Slot
            label={experiment.title}
            size="medium"
            position="absolute"
            top="0"
            left={isReversed ? 'auto' : '0'}
            right={isReversed ? '0' : 'auto'}
            rotation={rotations[index % rotations.length]}
            clip={clips[index % clips.length]}
            shadow={index % 2 === 0 ? 'offset' : 'float'}
            grayscale={experiment.status === 'paused'}
            zIndex={15}
            annotationNumber={experiment.id.replace('EXP-', '')}
          />

          {/* Detail slot - overlapping */}
          <Slot
            label="DETAIL"
            size="small"
            position="absolute"
            top="30%"
            left={isReversed ? '10%' : '40%'}
            rotation={-rotations[index % rotations.length] * 2}
            clip={clips[(index + 2) % clips.length]}
            zIndex={20}
            decoration={decorations[index % decorations.length]}
            overlapX={50}
          />

          {/* Swatch */}
          <Slot
            label="SAMPLE"
            size="swatch"
            position="absolute"
            bottom="10%"
            left={isReversed ? '5%' : '25%'}
            rotation={rotations[(index + 1) % rotations.length] * 3}
            border="rough"
            zIndex={18}
            decoration="tape-top"
          />

          {/* Micro accent */}
          <Slot
            label={String(index + 1).padStart(2, '0')}
            size="micro"
            position="absolute"
            top="60%"
            left={isReversed ? '40%' : '60%'}
            rotation={12}
            border="thin"
            zIndex={22}
            decoration="pin-red"
          />
        </div>

        {/* Info */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-4">
          <div className="flex items-baseline gap-4">
            <span
              className="font-mono text-yon-grey/30"
              style={{ fontSize: '0.55rem', letterSpacing: '0.2em' }}
            >
              {experiment.id}
            </span>
            <span
              className={`font-mono uppercase tracking-[0.15em] ${statusColors[experiment.status as keyof typeof statusColors]}`}
              style={{ fontSize: '0.5rem' }}
            >
              {experiment.status}
            </span>
          </div>

          <h3
            className="font-serif text-yon-black mt-3"
            style={{
              fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              transform: `rotate(${rotations[index % rotations.length] * 0.2}deg)`
            }}
          >
            {experiment.title}
          </h3>

          <p
            className="font-sans text-yon-grey/50 mt-3 max-w-sm"
            style={{ fontSize: '0.85rem', lineHeight: 1.7 }}
          >
            {experiment.description}
          </p>

          <span
            className="font-mono text-yon-grey/30 mt-4"
            style={{ fontSize: '0.55rem', letterSpacing: '0.15em' }}
          >
            {experiment.date}
          </span>
        </div>
      </div>

      {/* Annotation per experiment */}
      {index % 2 === 0 && (
        <AnnotationLabel
          text={experiment.status === 'active' ? 'in progress' : experiment.status}
          position={{
            top: '20%',
            right: isReversed ? '60%' : '10%'
          }}
          rotation={rotations[(index + 2) % rotations.length]}
          variant={experiment.status === 'active' ? 'stamp' : 'handwritten'}
        />
      )}
    </div>
  )
}

export default function LabPage() {
  return (
    <div className="relative min-h-screen bg-yon-white overflow-x-hidden">
      {/* ============================================
          HERO - Lab Introduction - fits single screen
          ============================================ */}
      <section className="relative w-full overflow-hidden texture-grain" style={{ height: 'calc(100vh - 42px)' }}>
        {/* Background typography - LAB */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '10%',
            left: '-12%',
            fontSize: 'clamp(18rem, 40vw, 60rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-mono), monospace',
            opacity: 0.025,
            lineHeight: 0.8,
            letterSpacing: '-0.05em',
            color: '#0A0A0A',
            transform: 'rotate(-3deg)',
          }}
          aria-hidden="true"
        >
          LAB
        </span>

        {/* Secondary background text */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            bottom: '15%',
            right: '-8%',
            fontSize: 'clamp(8rem, 20vw, 30rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.02,
            color: '#8B7355',
            transform: 'rotate(8deg)',
          }}
          aria-hidden="true"
        >
          EXP
        </span>

        {/* Third layer - vertical */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '20%',
            right: '5%',
            fontSize: 'clamp(4rem, 10vw, 12rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-mono), monospace',
            opacity: 0.015,
            letterSpacing: '0.3em',
            color: '#0A0A0A',
            writingMode: 'vertical-rl',
          }}
          aria-hidden="true"
        >
          2024
        </span>

        {/* ===== HERO SLOTS - 12 slots scattered ===== */}

        {/* Slot 1: Hero primary - left bleeding */}
        <Slot
          label="EXP / MAIN"
          size="hero"
          position="absolute"
          top="8%"
          left="-5%"
          rotation={-3}
          clip="irregular-1"
          shadow="offset-xl"
          zIndex={20}
          bleed="left"
          bleedAmount="lg"
          annotationNumber="001"
          texture="grain"
        />

        {/* Slot 2: Large - right top */}
        <Slot
          label="TEST 001"
          size="large"
          position="absolute"
          top="5%"
          right="3%"
          rotation={4}
          clip="torn-1"
          shadow="float"
          zIndex={18}
          decoration="tape-corner"
          bleed="right"
          bleedAmount="md"
        />

        {/* Slot 3: Medium - center overlapping */}
        <Slot
          label="SAMPLE"
          size="medium"
          position="absolute"
          top="35%"
          left="45%"
          rotation={-5}
          clip="organic-1"
          shadow="dramatic"
          zIndex={25}
          overlapX={80}
          decoration="staple"
        />

        {/* Slot 4: Small - bottom left */}
        <Slot
          label="ITERATION"
          size="small"
          position="absolute"
          bottom="20%"
          left="8%"
          rotation={7}
          clip="torn-2"
          shadow="offset"
          zIndex={22}
          grayscale
          decoration="pin"
        />

        {/* Slot 5: Medium-wide - right center */}
        <Slot
          label="PROCESS"
          size="medium-wide"
          position="absolute"
          top="55%"
          right="10%"
          rotation={-2}
          clip="wave-1"
          shadow="soft"
          zIndex={16}
          sepia
        />

        {/* Slot 6: Swatch cluster 1 */}
        <Slot
          label="A"
          size="swatch"
          position="absolute"
          top="25%"
          left="30%"
          rotation={12}
          border="rough"
          zIndex={24}
          decoration="tape-top"
        />

        {/* Slot 7: Swatch cluster 2 */}
        <Slot
          label="B"
          size="swatch"
          position="absolute"
          top="28%"
          left="37%"
          rotation={-8}
          border="accent"
          zIndex={26}
          overlapX={25}
        />

        {/* Slot 8: Tiny - scattered */}
        <Slot
          label="REF"
          size="tiny"
          position="absolute"
          top="70%"
          left="25%"
          rotation={-15}
          clip="notch-1"
          zIndex={28}
          decoration="clip"
        />

        {/* Slot 9: Tiny-wide - top */}
        <Slot
          label="MOOD"
          size="tiny-wide"
          position="absolute"
          top="15%"
          left="55%"
          rotation={5}
          clip="irregular-4"
          zIndex={19}
          grayscale
        />

        {/* Slot 10: Micro - accent */}
        <Slot
          label="01"
          size="micro"
          position="absolute"
          top="48%"
          left="72%"
          rotation={18}
          border="thin"
          zIndex={30}
          decoration="pin-red"
        />

        {/* Slot 11: Small - right bleeding */}
        <Slot
          label="DATA"
          size="small"
          position="absolute"
          bottom="35%"
          right="-3%"
          rotation={-6}
          clip="trapezoid"
          zIndex={17}
          bleed="right"
          bleedAmount="md"
        />

        {/* Slot 12: Medium-tall - bottom */}
        <Slot
          label="RESULT"
          size="medium-tall"
          position="absolute"
          bottom="5%"
          left="50%"
          rotation={2}
          clip="corner-cut"
          shadow="deep"
          zIndex={15}
          contrast
        />

        {/* Scattered Annotations */}
        <AnnotationLabel
          text="EXPERIMENTAL"
          position={{ top: '12%', left: '25%' }}
          rotation={-3}
          variant="stamp"
        />
        <AnnotationLabel
          text="test batch"
          position={{ top: '45%', right: '35%' }}
          rotation={5}
          variant="handwritten"
        />
        <AnnotationLabel
          text="R&D"
          position={{ bottom: '25%', left: '68%' }}
          rotation={-2}
          variant="tag"
        />
        <AnnotationLabel
          text="prototype"
          position={{ top: '75%', right: '20%' }}
          rotation={8}
          variant="default"
        />

        {/* Main title */}
        <div className="relative z-30 pt-40 pb-20 px-8 md:px-16 lg:px-24">
          <div className="max-w-4xl">
            <span
              className="block font-mono uppercase tracking-[0.4em] text-yon-grey/40"
              style={{ fontSize: '0.55rem' }}
            >
              THE YON — Experiments
            </span>

            <h1
              className="font-serif text-yon-black mt-6"
              style={{
                fontSize: 'clamp(3.5rem, 9vw, 7rem)',
                letterSpacing: '-0.03em',
                transform: 'rotate(-1.5deg)',
                lineHeight: 0.9,
              }}
            >
              Lab
            </h1>

            <p
              className="font-serif italic text-yon-grey/60 mt-10"
              style={{
                fontSize: 'clamp(1rem, 2.2vw, 1.4rem)',
                maxWidth: '40ch',
                marginLeft: '3rem',
                transform: 'rotate(0.5deg)',
              }}
            >
              &ldquo;Experiments in construction, material, and form. Work in progress, failures
              included.&rdquo;
            </p>

            <span
              className="block font-mono text-yon-grey/30 mt-4"
              style={{
                fontSize: '0.55rem',
                letterSpacing: '0.2em',
                marginLeft: '3rem',
              }}
            >
              실험실 — 진행중인 작업
            </span>
          </div>
        </div>

        {/* Status legend */}
        <div className="relative z-30 px-8 md:px-16 lg:px-24 pb-12">
          <div className="flex flex-wrap gap-8">
            <span
              className="font-mono uppercase tracking-[0.15em] text-yon-accent"
              style={{ fontSize: '0.5rem' }}
            >
              ● Active
            </span>
            <span
              className="font-mono uppercase tracking-[0.15em] text-yon-grey/60"
              style={{ fontSize: '0.5rem' }}
            >
              ● Testing
            </span>
            <span
              className="font-mono uppercase tracking-[0.15em] text-yon-grey/40"
              style={{ fontSize: '0.5rem' }}
            >
              ● Paused
            </span>
            <span
              className="font-mono uppercase tracking-[0.15em] text-yon-black/40"
              style={{ fontSize: '0.5rem' }}
            >
              ● Complete
            </span>
          </div>
        </div>
      </section>

      {/* ============================================
          EXPERIMENTS LIST - Dense Cards
          ============================================ */}
      <section className="relative py-20 px-8 md:px-16 lg:px-24 texture-paper">
        {/* Background */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '5%',
            right: '-10%',
            fontSize: 'clamp(12rem, 28vw, 40rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-mono), monospace',
            opacity: 0.015,
            color: '#0A0A0A',
            transform: 'rotate(5deg)',
          }}
          aria-hidden="true"
        >
          01—05
        </span>

        <div className="max-w-6xl mx-auto">
          {experiments.map((experiment, index) => (
            <ExperimentCard key={experiment.id} experiment={experiment} index={index} />
          ))}
        </div>
      </section>

      {/* ============================================
          FAILURES SECTION - Dense Scattered Layout
          ============================================ */}
      <section className="relative min-h-screen w-full py-24 overflow-hidden bg-yon-ivory/30 texture-grain">
        {/* Background */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '5%',
            right: '-10%',
            fontSize: 'clamp(12rem, 30vw, 45rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.025,
            lineHeight: 0.8,
            color: '#8B7355',
            transform: 'rotate(5deg)',
          }}
          aria-hidden="true"
        >
          FAIL
        </span>

        <span
          className="absolute pointer-events-none select-none"
          style={{
            bottom: '10%',
            left: '-5%',
            fontSize: 'clamp(6rem, 15vw, 20rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-mono), monospace',
            opacity: 0.02,
            color: '#0A0A0A',
            transform: 'rotate(-90deg)',
            transformOrigin: 'left bottom',
          }}
          aria-hidden="true"
        >
          ESSENTIAL
        </span>

        <div className="relative z-10 px-8 md:px-16 lg:px-24">
          <div className="max-w-4xl">
            <span
              className="block font-mono uppercase tracking-[0.3em] text-yon-accent/60"
              style={{ fontSize: '0.55rem' }}
            >
              Essential Documentation
            </span>

            <h2
              className="font-serif text-yon-accent mt-6"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                letterSpacing: '-0.02em',
                transform: 'rotate(-1deg)',
              }}
            >
              Failures
            </h2>

            <p
              className="font-sans text-yon-grey/60 mt-8 max-w-lg"
              style={{
                fontSize: '0.9rem',
                lineHeight: 1.8,
                marginLeft: '2rem',
                transform: 'rotate(0.5deg)',
              }}
            >
              Every failed experiment teaches something. Rejected ideas, broken toiles, wrong paths —
              all documented as essential steps toward discovery.
            </p>
          </div>

          {/* Failure slots - 12 scattered slots */}
          <div className="relative mt-20" style={{ minHeight: '70vh' }}>
            {/* Row 1 */}
            <Slot
              label="REJECTED / 01"
              size="large"
              position="absolute"
              top="0%"
              left="0%"
              rotation={-3}
              clip="torn-2"
              shadow="offset"
              grayscale
              zIndex={10}
              annotationNumber="F-001"
              decoration="mark-x"
            />

            <Slot
              label="FAILED TOILE"
              size="medium"
              position="absolute"
              top="5%"
              right="8%"
              rotation={5}
              clip="irregular-5"
              grayscale
              zIndex={15}
              decoration="tape-corner"
            />

            <Slot
              label="WRONG PATH"
              size="small"
              position="absolute"
              top="15%"
              left="40%"
              rotation={-8}
              clip="organic-2"
              grayscale
              zIndex={18}
              overlapX={60}
              decoration="staple"
            />

            {/* Row 2 */}
            <Slot
              label="ITERATION 03"
              size="medium-wide"
              position="absolute"
              top="35%"
              left="5%"
              rotation={2}
              clip="wave-2"
              grayscale
              sepia
              zIndex={12}
              decoration="pin"
            />

            <Slot
              label="DISCARDED"
              size="small-square"
              position="absolute"
              top="40%"
              right="20%"
              rotation={-6}
              border="rough"
              grayscale
              zIndex={16}
              decoration="mark-x"
            />

            <Slot
              label="STUDY"
              size="tiny"
              position="absolute"
              top="50%"
              left="55%"
              rotation={12}
              clip="notch-2"
              grayscale
              zIndex={20}
            />

            {/* Row 3 */}
            <Slot
              label="BROKEN"
              size="medium"
              position="absolute"
              bottom="25%"
              left="25%"
              rotation={-4}
              clip="torn-3"
              grayscale
              zIndex={14}
              decoration="corner-fold"
            />

            <Slot
              label="ABANDONED"
              size="small"
              position="absolute"
              bottom="20%"
              right="5%"
              rotation={7}
              clip="irregular-3"
              grayscale
              zIndex={17}
              bleed="right"
              bleedAmount="sm"
            />

            {/* Swatches - rejected materials */}
            <Slot
              label="X"
              size="swatch"
              position="absolute"
              top="60%"
              left="70%"
              rotation={-10}
              border="rough"
              grayscale
              zIndex={22}
              decoration="mark-x"
            />

            <Slot
              label="X"
              size="swatch"
              position="absolute"
              top="65%"
              left="76%"
              rotation={8}
              border="thin"
              grayscale
              zIndex={23}
              overlapX={20}
            />

            {/* Micro accents */}
            <Slot
              label="NO"
              size="micro"
              position="absolute"
              top="28%"
              right="40%"
              rotation={15}
              border="accent"
              grayscale
              zIndex={25}
            />

            <Slot
              label="?"
              size="micro"
              position="absolute"
              bottom="35%"
              left="10%"
              rotation={-12}
              border="dashed"
              grayscale
              zIndex={24}
            />

            {/* Annotations */}
            <AnnotationLabel
              text="learn from this"
              position={{ top: '25%', left: '60%' }}
              rotation={4}
              variant="handwritten"
            />
            <AnnotationLabel
              text="REJECTED"
              position={{ top: '55%', right: '30%' }}
              rotation={-3}
              variant="stamp"
            />
            <AnnotationLabel
              text="try again"
              position={{ bottom: '15%', left: '45%' }}
              rotation={6}
              variant="default"
            />
            <AnnotationLabel
              text="F-012"
              position={{ top: '8%', left: '65%' }}
              rotation={-5}
              variant="tag"
            />
          </div>
        </div>
      </section>

      {/* ============================================
          METHODOLOGY SECTION - New Addition
          ============================================ */}
      <section className="relative min-h-[80vh] w-full py-24 overflow-hidden texture-paper">
        {/* Background */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '10%',
            left: '-8%',
            fontSize: 'clamp(8rem, 18vw, 25rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.02,
            color: '#0A0A0A',
            transform: 'rotate(-5deg)',
          }}
          aria-hidden="true"
        >
          METHOD
        </span>

        <div className="relative z-10 px-8 md:px-16 lg:px-24">
          <div className="max-w-4xl mx-auto">
            <span
              className="block font-mono uppercase tracking-[0.3em] text-yon-grey/40"
              style={{ fontSize: '0.55rem' }}
            >
              Research Methodology
            </span>

            <h2
              className="font-serif text-yon-black mt-6"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                letterSpacing: '-0.02em',
                transform: 'rotate(-0.5deg)',
              }}
            >
              How We Work
            </h2>

            {/* Method steps with slots */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Step 1 */}
              <div className="relative">
                <Slot
                  label="OBSERVE"
                  size="small"
                  rotation={-3}
                  clip="irregular-2"
                  shadow="float"
                  zIndex={10}
                  annotationNumber="01"
                  decoration="pin"
                />
                <p
                  className="font-sans text-yon-grey/60 mt-6"
                  style={{ fontSize: '0.8rem', lineHeight: 1.7 }}
                >
                  Research and observation. Finding unexpected connections.
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative" style={{ marginTop: '2rem' }}>
                <Slot
                  label="EXPERIMENT"
                  size="small"
                  rotation={4}
                  clip="torn-1"
                  shadow="offset"
                  zIndex={10}
                  annotationNumber="02"
                  decoration="tape-top"
                />
                <p
                  className="font-sans text-yon-grey/60 mt-6"
                  style={{ fontSize: '0.8rem', lineHeight: 1.7 }}
                >
                  Rapid prototyping. Embracing failures as data.
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative" style={{ marginTop: '1rem' }}>
                <Slot
                  label="REFINE"
                  size="small"
                  rotation={-2}
                  clip="organic-1"
                  shadow="soft"
                  zIndex={10}
                  annotationNumber="03"
                  decoration="staple"
                />
                <p
                  className="font-sans text-yon-grey/60 mt-6"
                  style={{ fontSize: '0.8rem', lineHeight: 1.7 }}
                >
                  Iteration toward the essential. Removing excess.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating accents */}
        <Slot
          label="NOTE"
          size="tiny"
          position="absolute"
          top="15%"
          right="10%"
          rotation={8}
          border="thin"
          zIndex={5}
          decoration="clip"
        />

        <Slot
          label="REF"
          size="swatch"
          position="absolute"
          bottom="20%"
          left="5%"
          rotation={-6}
          border="rough"
          zIndex={6}
          grayscale
        />

        <AnnotationLabel
          text="process"
          position={{ top: '40%', right: '5%' }}
          rotation={-4}
          variant="handwritten"
        />
      </section>

      {/* ============================================
          CTA - Collections
          ============================================ */}
      <section className="relative min-h-[50vh] w-full flex items-center justify-center overflow-hidden">
        {/* Background */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '30%',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 'clamp(12rem, 30vw, 45rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.015,
            color: '#0A0A0A',
          }}
          aria-hidden="true"
        >
          →
        </span>

        <div className="text-center px-8 z-10">
          <span
            className="block font-mono uppercase tracking-[0.3em] text-yon-grey/40"
            style={{ fontSize: '0.55rem' }}
          >
            See the results
          </span>

          <h2
            className="font-serif text-yon-black mt-6"
            style={{
              fontSize: 'clamp(1.8rem, 4.5vw, 3rem)',
              transform: 'rotate(-1deg)',
            }}
          >
            Collections
          </h2>

          <Link
            href="/collections"
            className="inline-block mt-10 font-mono uppercase tracking-[0.2em] text-yon-grey/50 hover:text-yon-black transition-colors border-b border-yon-grey/20 hover:border-yon-black pb-1"
            style={{ fontSize: '0.6rem' }}
          >
            View Collections →
          </Link>
        </div>

        {/* Accent slots */}
        <Slot
          label="FINAL"
          size="small"
          position="absolute"
          bottom="15%"
          right="10%"
          rotation={-5}
          clip="irregular-3"
          zIndex={5}
          decoration="tape-corner"
        />

        <Slot
          label="RESULT"
          size="tiny"
          position="absolute"
          top="20%"
          left="15%"
          rotation={8}
          border="accent"
          zIndex={6}
        />

        <Slot
          label="→"
          size="micro"
          position="absolute"
          bottom="30%"
          left="25%"
          rotation={-3}
          border="thin"
          zIndex={7}
        />
      </section>

      <Footer />
    </div>
  )
}
