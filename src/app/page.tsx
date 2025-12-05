import Link from 'next/link'
import Footer from '@/components/Footer'
import { Slot, AnnotationLabel } from '@/components/deconstructivist'
import {
  LayeredTitle,
  GlitchTitle,
  ExperimentalText,
  AnnotationText,
  NumberTag,
  LabelText,
  WhisperText,
  HandwrittenNote,
  GrainDisplay,
  StaggerFadeText,
} from '@/components/typography'

export default function HomePage() {
  return (
    <div className="relative bg-yon-white min-h-screen overflow-x-hidden">
      {/* ============================================
          SECTION 1: HERO - Dense Deconstructivist Collage
          Target: 15+ slots with overlapping, bleeding, varied sizes
          1920x1080 viewport optimized - fits in single screen capture
          ============================================ */}
      <section className="relative w-full overflow-hidden texture-grain" style={{ height: 'calc(100vh - 42px)' }}>
        {/* Background typography - THE YON massive with layer effect */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '25%',
            left: '-8%',
            fontSize: 'clamp(14rem, 32vw, 45rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.03,
            lineHeight: 0.8,
            letterSpacing: '-0.05em',
            color: '#0A0A0A',
            zIndex: 1,
            textShadow: '6px 6px 0 rgba(139, 115, 85, 0.02)',
          }}
          aria-hidden="true"
        >
          THE YON
        </span>

        {/* Second layer - offset shadow for depth */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: 'calc(25% + 8px)',
            left: 'calc(-8% + 8px)',
            fontSize: 'clamp(14rem, 32vw, 45rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.015,
            lineHeight: 0.8,
            letterSpacing: '-0.05em',
            color: '#8B7355',
            zIndex: 0,
          }}
          aria-hidden="true"
        >
          THE YON
        </span>

        {/* Secondary background text - vertical */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '10%',
            right: '3%',
            fontSize: 'clamp(6rem, 15vw, 20rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-mono), monospace',
            opacity: 0.015,
            letterSpacing: '0.3em',
            color: '#0A0A0A',
            writingMode: 'vertical-rl',
            zIndex: 1,
          }}
          aria-hidden="true"
        >
          2024
        </span>

        {/* Third layer - accent mark */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '60%',
            right: '15%',
            fontSize: 'clamp(8rem, 20vw, 28rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-mono), monospace',
            opacity: 0.012,
            color: '#8B7355',
            transform: 'rotate(15deg)',
            zIndex: 0,
          }}
          aria-hidden="true"
        >
          →
        </span>

        {/* ===== HERO SLOTS - 15 slots with dense overlapping ===== */}

        {/* Slot 1: Hero - Primary large image (left, bleeding) */}
        <Slot
          label="AW25 / LOOK 01"
          size="hero"
          position="absolute"
          top="5%"
          left="-3%"
          rotation={-2.5}
          clip="irregular-1"
          shadow="offset-xl"
          zIndex={20}
          bleed="left"
          bleedAmount="lg"
          annotationNumber="001"
          texture="grain"
        />

        {/* Slot 2: Large - Secondary (right top) */}
        <Slot
          label="SS25 / 002"
          size="large"
          position="absolute"
          top="3%"
          right="5%"
          rotation={3}
          clip="torn-1"
          shadow="float"
          zIndex={18}
          decoration="tape-corner"
          annotationText="main look"
        />

        {/* Slot 3: Medium - Overlapping center-right */}
        <Slot
          label="DETAIL"
          size="medium"
          position="absolute"
          top="40%"
          right="12%"
          rotation={-4}
          clip="irregular-5"
          shadow="dramatic"
          zIndex={25}
          overlapX={100}
          overlapY={50}
          decoration="pin"
        />

        {/* Slot 4: Small - Accent (bottom left, bleeding) */}
        <Slot
          label="PROCESS"
          size="small"
          position="absolute"
          bottom="18%"
          left="-2%"
          rotation={6}
          clip="torn-2"
          shadow="brutal-sm"
          zIndex={22}
          bleed="left"
          bleedAmount="md"
          grayscale
        />

        {/* Slot 5: Tiny - Swatch with tape */}
        <Slot
          label="FABRIC"
          size="tiny"
          position="absolute"
          top="65%"
          left="32%"
          rotation={-10}
          border="rough"
          zIndex={30}
          decoration="tape-top"
        />

        {/* Slot 6: Swatch - Material sample */}
        <Slot
          label="WOOL"
          size="swatch"
          position="absolute"
          top="22%"
          right="32%"
          rotation={15}
          border="brutal"
          zIndex={24}
          decoration="staple"
        />

        {/* Slot 7: Small square - Bottom right */}
        <Slot
          label="TOILE"
          size="small-square"
          position="absolute"
          bottom="10%"
          right="8%"
          rotation={-3}
          clip="diagonal-1"
          shadow="offset"
          zIndex={19}
          decoration="corner-fold"
        />

        {/* Slot 8: Tiny - Far right edge (bleeding) */}
        <Slot
          label="REF"
          size="tiny"
          position="absolute"
          top="50%"
          right="-4%"
          rotation={-18}
          clip="irregular-4"
          zIndex={15}
          bleed="right"
          bleedAmount="lg"
        />

        {/* Slot 9: Micro - Scattered accent */}
        <Slot
          label="01"
          size="micro"
          position="absolute"
          top="35%"
          left="48%"
          rotation={8}
          border="thin"
          zIndex={28}
          decoration="pin-red"
        />

        {/* Slot 10: Medium-wide - Overlapping */}
        <Slot
          label="SILHOUETTE"
          size="medium-wide"
          position="absolute"
          top="58%"
          left="15%"
          rotation={2}
          clip="wave-1"
          shadow="soft"
          zIndex={16}
          overlapY={80}
          sepia
        />

        {/* Slot 11: Swatch cluster 1 */}
        <Slot
          label="SILK"
          size="swatch"
          position="absolute"
          top="75%"
          left="55%"
          rotation={-5}
          border="accent"
          zIndex={26}
        />

        {/* Slot 12: Swatch cluster 2 */}
        <Slot
          label="LINEN"
          size="swatch"
          position="absolute"
          top="78%"
          left="60%"
          rotation={12}
          border="rough"
          zIndex={27}
          overlapX={30}
        />

        {/* Slot 13: Tiny-wide - Reference */}
        <Slot
          label="MOOD"
          size="tiny-wide"
          position="absolute"
          top="12%"
          left="40%"
          rotation={-7}
          clip="notch-1"
          zIndex={21}
          grayscale
          decoration="clip"
        />

        {/* Slot 14: Small - Top bleeding */}
        <Slot
          label="ARCHIVE"
          size="small"
          position="absolute"
          top="-3%"
          left="58%"
          rotation={4}
          clip="trapezoid"
          shadow="float"
          zIndex={14}
          bleed="top"
          bleedAmount="md"
        />

        {/* Slot 15: Medium-tall */}
        <Slot
          label="FORM"
          size="medium-tall"
          position="absolute"
          bottom="5%"
          left="40%"
          rotation={-1}
          clip="organic-1"
          shadow="deep"
          zIndex={17}
          contrast
        />

        {/* Scattered Annotation Labels with experimental typography */}
        <AnnotationLabel
          text="AW25"
          position={{ top: '8%', left: '25%' }}
          rotation={-3}
          variant="tag"
        />
        <div
          className="absolute"
          style={{ top: '45%', left: '5%', transform: 'rotate(5deg)', zIndex: 50 }}
        >
          <HandwrittenNote text="test print" />
        </div>
        <div
          className="absolute"
          style={{ bottom: '30%', right: '35%', transform: 'rotate(-2deg)', zIndex: 50 }}
        >
          <AnnotationText text="APPROVED" variant="stamp" />
        </div>
        <div
          className="absolute"
          style={{ top: '70%', right: '5%', transform: 'rotate(8deg)', zIndex: 50 }}
        >
          <NumberTag index={1} />
        </div>

        {/* Navigation hint - bottom center */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40"
          style={{ textAlign: 'center' }}
        >
          <Link href="/collections" className="group">
            <span
              className="block font-mono uppercase tracking-[0.3em] text-yon-grey/60 group-hover:text-yon-black transition-colors"
              style={{ fontSize: '0.6rem' }}
            >
              View Collections
            </span>
            <span className="block text-yon-grey/40 mt-2 text-lg group-hover:text-yon-black transition-colors">
              ↓
            </span>
          </Link>
        </div>

        {/* Brand mark - top left corner with GLITCH effect */}
        <div className="absolute top-6 left-6 z-40">
          <GlitchTitle
            text="THE YON"
            size="small"
            glitchOffset={3}
            style={{
              fontSize: '0.85rem',
              letterSpacing: '0.35em',
              fontFamily: 'var(--font-mono)',
              fontWeight: 500,
            }}
            as="span"
          />
          <ExperimentalText
            text="저 너머"
            variant="micro"
            effect="scatter"
            intensity="medium"
            className="block mt-1"
          />
        </div>

        {/* Year - top right corner */}
        <div className="absolute top-6 right-6 z-40 text-right">
          <LabelText
            text="Portfolio"
            style={{ fontSize: '0.55rem' }}
          />
          <WhisperText
            text="2024—25"
            className="block mt-1"
            style={{ fontSize: '0.5rem' }}
          />
        </div>
      </section>

      {/* ============================================
          SECTION 2: Philosophy Statement
          Dense asymmetric typography with floating slots
          ============================================ */}
      <section className="relative min-h-[90vh] w-full flex items-center overflow-hidden texture-paper">
        {/* Background letter - massive Y with echo effect */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '5%',
            right: '-15%',
            fontSize: 'clamp(25rem, 60vw, 80rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.02,
            lineHeight: 0.8,
            color: '#0A0A0A',
          }}
          aria-hidden="true"
        >
          Y
        </span>

        {/* Echo layer */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: 'calc(5% + 15px)',
            right: 'calc(-15% + 15px)',
            fontSize: 'clamp(25rem, 60vw, 80rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.008,
            lineHeight: 0.8,
            color: '#8B7355',
          }}
          aria-hidden="true"
        >
          Y
        </span>

        {/* Secondary background text */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            bottom: '10%',
            left: '-5%',
            fontSize: 'clamp(4rem, 10vw, 12rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-mono), monospace',
            opacity: 0.025,
            letterSpacing: '0.2em',
            color: '#0A0A0A',
            transform: 'rotate(-90deg)',
            transformOrigin: 'left bottom',
          }}
          aria-hidden="true"
        >
          PHILOSOPHY
        </span>

        <div className="relative z-10 px-8 md:px-16 lg:px-24 max-w-5xl">
          {/* Philosophy text - GLITCH layered title */}
          <GlitchTitle
            text="Twisted yet harmonious"
            size="display"
            glitchOffset={6}
            rotateChars
            rotationIntensity={3}
            style={{
              fontStyle: 'italic',
              transform: 'rotate(-2deg)',
            }}
            as="h2"
          />

          <div className="mt-8" style={{ marginLeft: '2rem', transform: 'rotate(1deg)' }}>
            <ExperimentalText
              text="뒤틀렸지만 조화로운"
              variant="subtitle"
              effect="mixed"
              intensity="strong"
              colorScheme="accent"
            />
          </div>

          <p
            className="font-sans text-yon-grey/70 mt-14 max-w-md leading-relaxed"
            style={{
              fontSize: '0.95rem',
              marginLeft: '5rem',
              transform: 'rotate(0.8deg)',
            }}
          >
            Every element slightly askew, yet together they form perfect beauty.
            Fashion that exists beyond time and space—unreachable, ideal.
          </p>
        </div>

        {/* Floating slots - 6 slots */}
        <Slot
          label="MOOD"
          size="medium"
          position="absolute"
          top="10%"
          right="8%"
          rotation={8}
          clip="irregular-6"
          shadow="float"
          zIndex={8}
          grayscale
          decoration="tape-top"
        />

        <Slot
          label="REF"
          size="tiny"
          position="absolute"
          bottom="25%"
          right="20%"
          rotation={-6}
          border="thin"
          zIndex={10}
          decoration="pin"
        />

        <Slot
          label="TEXTURE"
          size="swatch"
          position="absolute"
          top="60%"
          right="35%"
          rotation={12}
          border="rough"
          zIndex={9}
        />

        <Slot
          label="SKETCH"
          size="small"
          position="absolute"
          bottom="15%"
          right="5%"
          rotation={-4}
          clip="torn-3"
          zIndex={7}
          bleed="right"
          bleedAmount="sm"
          sepia
        />

        <Slot
          label="DETAIL"
          size="tiny-wide"
          position="absolute"
          top="35%"
          right="28%"
          rotation={-10}
          clip="notch-2"
          zIndex={11}
        />

        <Slot
          label="002"
          size="micro"
          position="absolute"
          top="50%"
          right="45%"
          rotation={15}
          border="accent"
          zIndex={12}
        />

        <div
          className="absolute"
          style={{ bottom: '40%', left: '60%', transform: 'rotate(3deg)', zIndex: 50 }}
        >
          <HandwrittenNote text="essential" />
        </div>
      </section>

      {/* ============================================
          SECTION 3: Collections Preview
          Dense moodboard grid - 10+ slots
          ============================================ */}
      <section className="relative min-h-screen w-full py-24 overflow-hidden texture-grain">
        {/* Section title - background with triple layer */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '3%',
            left: '-10%',
            fontSize: 'clamp(8rem, 18vw, 25rem)',
            fontWeight: 200,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.035,
            letterSpacing: '-0.03em',
            color: '#0A0A0A',
            transform: 'rotate(-5deg)',
          }}
          aria-hidden="true"
        >
          COLLECTIONS
        </span>

        {/* Second layer */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: 'calc(3% + 6px)',
            left: 'calc(-10% + 6px)',
            fontSize: 'clamp(8rem, 18vw, 25rem)',
            fontWeight: 200,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.015,
            letterSpacing: '-0.03em',
            color: '#8B7355',
            transform: 'rotate(-5deg)',
          }}
          aria-hidden="true"
        >
          COLLECTIONS
        </span>

        {/* Third layer */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: 'calc(3% + 12px)',
            left: 'calc(-10% + 12px)',
            fontSize: 'clamp(8rem, 18vw, 25rem)',
            fontWeight: 200,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.008,
            letterSpacing: '-0.03em',
            color: '#4A4A4A',
            transform: 'rotate(-5deg)',
          }}
          aria-hidden="true"
        >
          COLLECTIONS
        </span>

        {/* Second background layer */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            bottom: '5%',
            right: '-8%',
            fontSize: 'clamp(10rem, 22vw, 30rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-mono), monospace',
            opacity: 0.02,
            color: '#0A0A0A',
            transform: 'rotate(8deg)',
          }}
          aria-hidden="true"
        >
          04
        </span>

        {/* Collection 1: DECONSTRUCTION */}
        <div className="relative mb-20 px-8 md:px-16">
          <div className="flex flex-wrap items-start gap-4 md:gap-0">
            {/* Main look */}
            <Slot
              label="DECONSTRUCTION / 01"
              size="large"
              rotation={-2.5}
              clip="irregular-1"
              shadow="offset-lg"
              zIndex={15}
              annotationNumber="D-001"
              decoration="tape-corner"
            />

            {/* Detail overlapping */}
            <Slot
              label="DETAIL"
              size="small"
              rotation={5}
              clip="torn-1"
              zIndex={20}
              overlapX={80}
              style={{ marginTop: '6rem' }}
              decoration="pin"
            />

            {/* Swatch with decoration */}
            <Slot
              label="DENIM"
              size="swatch"
              rotation={-10}
              border="rough"
              decoration="tape-top"
              zIndex={25}
              style={{ marginLeft: '-1.5rem', marginTop: '1.5rem' }}
            />

            {/* Extra tiny */}
            <Slot
              label="REF"
              size="micro"
              rotation={12}
              border="thin"
              zIndex={22}
              style={{ marginLeft: '1rem', marginTop: '8rem' }}
            />
          </div>

          {/* Collection info with GRAIN experimental typography */}
          <div className="mt-10 ml-4" style={{ transform: 'rotate(-1deg)' }}>
            <Link href="/collections/deconstruction" className="group">
              <GrainDisplay
                text="DECONSTRUCTION"
                variant="photocopy"
                className="group-hover:opacity-70 transition-opacity"
                style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)' }}
              />
              <ExperimentalText
                text="AW25 — View Collection →"
                variant="caption"
                effect="wave"
                intensity="medium"
                className="mt-3 block"
              />
            </Link>
          </div>
        </div>

        {/* Collection 2: FRAGMENTS - Right aligned */}
        <div className="relative mb-20 px-8 md:px-16 flex justify-end">
          <div className="flex flex-wrap items-end gap-4 md:gap-0">
            <Slot
              label="FRAGMENTS / 01"
              size="medium"
              rotation={3}
              clip="organic-2"
              shadow="float"
              zIndex={15}
              annotationNumber="F-001"
            />

            <Slot
              label="TEXTURE"
              size="tiny"
              rotation={-15}
              border="brutal"
              zIndex={20}
              decoration="pin-red"
              style={{ marginLeft: '-2.5rem', marginBottom: '3rem' }}
            />

            <Slot
              label="NYLON"
              size="swatch"
              rotation={8}
              border="accent"
              zIndex={18}
              style={{ marginLeft: '0.5rem' }}
            />
          </div>
        </div>

        {/* Collection 3: VOID - Scattered */}
        <div className="relative px-8 md:px-16">
          <Slot
            label="VOID / 01"
            size="medium"
            position="relative"
            rotation={-1.5}
            clip="corner-cut"
            shadow="dramatic"
            zIndex={15}
            style={{ marginLeft: '18%' }}
            decoration="staple"
            grayscale
          />

          <Slot
            label="SILHOUETTE"
            size="small-square"
            position="absolute"
            top="0"
            right="12%"
            rotation={7}
            clip="diagonal-2"
            zIndex={12}
            sepia
          />

          <Slot
            label="VOL"
            size="tiny"
            position="absolute"
            top="40%"
            right="25%"
            rotation={-8}
            border="thin"
            zIndex={18}
            decoration="clip"
          />
        </div>

        {/* Scattered labels with experimental typography */}
        <div
          className="absolute"
          style={{ top: '15%', right: '20%', transform: 'rotate(-4deg)', zIndex: 50 }}
        >
          <AnnotationText text="CURRENT" variant="tag" />
        </div>
        <div
          className="absolute"
          style={{ top: '45%', left: '8%', transform: 'rotate(6deg)', zIndex: 50 }}
        >
          <AnnotationText text="IN PROGRESS" variant="stamp" rotation={2} />
        </div>

        {/* View all link */}
        <div className="text-center mt-20">
          <Link
            href="/collections"
            className="inline-block font-mono uppercase tracking-[0.25em] text-yon-grey/60 hover:text-yon-black transition-colors border-b border-yon-grey/20 hover:border-yon-black pb-1"
            style={{ fontSize: '0.65rem' }}
          >
            View All Collections
          </Link>
        </div>
      </section>

      {/* ============================================
          SECTION 4: Process Teaser
          Sketchbook feel with 8+ slots
          ============================================ */}
      <section className="relative min-h-[80vh] w-full py-20 overflow-hidden bg-yon-ivory/30 texture-paper">
        {/* Background with layered effect */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            bottom: '8%',
            right: '-8%',
            fontSize: 'clamp(10rem, 25vw, 35rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.025,
            color: '#0A0A0A',
            transform: 'rotate(5deg)',
          }}
          aria-hidden="true"
        >
          PROCESS
        </span>

        <span
          className="absolute pointer-events-none select-none"
          style={{
            bottom: 'calc(8% + 5px)',
            right: 'calc(-8% + 5px)',
            fontSize: 'clamp(10rem, 25vw, 35rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.01,
            color: '#8B7355',
            transform: 'rotate(5deg)',
          }}
          aria-hidden="true"
        >
          PROCESS
        </span>

        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '15%',
            left: '-3%',
            fontSize: 'clamp(5rem, 12vw, 15rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-mono), monospace',
            opacity: 0.02,
            letterSpacing: '0.15em',
            color: '#0A0A0A',
            transform: 'rotate(-90deg)',
            transformOrigin: 'left top',
          }}
          aria-hidden="true"
        >
          01—08
        </span>

        <div className="relative z-10 px-8 md:px-16 lg:px-24">
          <div className="flex flex-wrap gap-6 items-start">
            {/* Sketch slots */}
            <Slot
              label="SKETCH / 001"
              size="medium"
              rotation={-4}
              border="rough"
              decoration="tape-top"
              zIndex={15}
              annotationNumber="S-001"
              texture="paper"
            />

            <Slot
              label="ITERATION"
              size="small"
              rotation={8}
              clip="torn-3"
              zIndex={18}
              style={{ marginTop: '4rem' }}
              sepia
              decoration="pin"
            />

            <Slot
              label="FINAL"
              size="small-square"
              rotation={-2}
              border="brutal"
              zIndex={20}
              decoration="mark-check"
            />

            <Slot
              label="REJECTED"
              size="tiny"
              rotation={12}
              clip="irregular-3"
              zIndex={16}
              grayscale
              decoration="mark-x"
              style={{ marginTop: '2rem' }}
            />

            <Slot
              label="NOTE"
              size="micro"
              rotation={-15}
              border="dashed"
              zIndex={22}
              style={{ marginLeft: '-1rem', marginTop: '5rem' }}
            />
          </div>

          {/* Swatch cluster */}
          <div className="absolute right-16 top-20 flex gap-2">
            <Slot
              label="A"
              size="swatch"
              rotation={-5}
              border="thin"
              zIndex={10}
            />
            <Slot
              label="B"
              size="swatch"
              rotation={8}
              border="accent"
              zIndex={11}
              overlapX={20}
            />
            <Slot
              label="C"
              size="swatch"
              rotation={-12}
              border="rough"
              zIndex={12}
              overlapX={25}
            />
          </div>

          {/* Process link */}
          <div className="mt-16" style={{ transform: 'rotate(-0.5deg)' }}>
            <Link href="/process" className="group">
              <span
                className="font-mono uppercase tracking-[0.2em] text-yon-grey/60 group-hover:text-yon-black transition-colors"
                style={{ fontSize: '0.65rem' }}
              >
                Explore Process →
              </span>
            </Link>
          </div>
        </div>

        <div
          className="absolute"
          style={{ top: '30%', right: '10%', transform: 'rotate(5deg)', zIndex: 50 }}
        >
          <NumberTag index={3} />
        </div>
        <div
          className="absolute"
          style={{ bottom: '25%', left: '45%', transform: 'rotate(-3deg)', zIndex: 50 }}
        >
          <HandwrittenNote text="needs revision" />
        </div>
      </section>

      {/* ============================================
          SECTION 5: Contact CTA
          Minimal with accent slots
          ============================================ */}
      <section className="relative min-h-[60vh] w-full flex items-center justify-center overflow-hidden">
        {/* Background symbol with offset */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 'clamp(15rem, 35vw, 50rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.015,
            color: '#0A0A0A',
          }}
          aria-hidden="true"
        >
          →
        </span>

        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: 'calc(20% + 8px)',
            left: 'calc(50% + 8px)',
            transform: 'translateX(-50%)',
            fontSize: 'clamp(15rem, 35vw, 50rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.008,
            color: '#8B7355',
          }}
          aria-hidden="true"
        >
          →
        </span>

        <div className="text-center px-8 z-10">
          <GlitchTitle
            text="Get in Touch"
            size="heading"
            glitchOffset={5}
            rotateChars
            rotationIntensity={2.5}
            style={{
              transform: 'rotate(-2deg)',
            }}
            as="h2"
          />

          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-block group"
            >
              <ExperimentalText
                text="Contact →"
                variant="caption"
                effect="scatter"
                intensity="medium"
                className="group-hover:opacity-70 transition-opacity"
              />
            </Link>
          </div>

          <div className="mt-12">
            <a
              href="mailto:hello@theyon.com"
              className="font-mono text-yon-grey/40 hover:text-yon-black transition-colors"
              style={{ fontSize: '0.75rem', letterSpacing: '0.1em' }}
            >
              hello@theyon.com
            </a>
          </div>
        </div>

        {/* Accent slots */}
        <Slot
          label="STUDIO"
          size="small"
          position="absolute"
          bottom="18%"
          right="8%"
          rotation={-8}
          clip="irregular-6"
          zIndex={5}
          grayscale
          decoration="tape-corner"
        />

        <Slot
          label="MAIL"
          size="tiny"
          position="absolute"
          top="25%"
          left="12%"
          rotation={10}
          border="thin"
          zIndex={6}
          decoration="pin"
        />

        <Slot
          label="@"
          size="micro"
          position="absolute"
          bottom="30%"
          left="25%"
          rotation={-5}
          border="accent"
          zIndex={7}
        />
      </section>

      <Footer />
    </div>
  )
}
