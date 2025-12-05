'use client'

import Link from 'next/link'
import Footer from '@/components/Footer'
import { Slot, AnnotationLabel } from '@/components/deconstructivist'
import {
  LayeredTitle,
  ExperimentalText,
  AnnotationText,
  NumberTag,
  LabelText,
  WhisperText,
  HandwrittenNote,
  TagText,
} from '@/components/typography'

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-yon-white overflow-x-hidden">
      {/* ============================================
          SECTION 1: Portrait Collage Hero
          Dense deconstructivist layout - 15+ slots
          ============================================ */}
      <section className="relative min-h-screen w-full overflow-hidden texture-grain">
        {/* Background typography - Name */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '15%',
            left: '-15%',
            fontSize: 'clamp(14rem, 35vw, 55rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.025,
            lineHeight: 0.8,
            letterSpacing: '-0.05em',
            color: '#0A0A0A',
            transform: 'rotate(-5deg)',
          }}
          aria-hidden="true"
        >
          TAEHYUN
        </span>

        {/* Secondary background - LEE */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            bottom: '10%',
            right: '-10%',
            fontSize: 'clamp(10rem, 25vw, 40rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-mono), monospace',
            opacity: 0.02,
            letterSpacing: '0.1em',
            color: '#8B7355',
            transform: 'rotate(8deg)',
          }}
          aria-hidden="true"
        >
          LEE
        </span>

        {/* Third layer - vertical */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '25%',
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
          DESIGNER
        </span>

        {/* ===== HERO SLOTS - 15 scattered portrait collage ===== */}

        {/* Slot 1: Main portrait - large, left bleeding */}
        <Slot
          label="PORTRAIT"
          size="hero"
          position="absolute"
          top="5%"
          left="-5%"
          rotation={-2.5}
          clip="irregular-1"
          shadow="offset-xl"
          zIndex={20}
          bleed="left"
          bleedAmount="lg"
          annotationNumber="001"
          texture="grain"
        />

        {/* Slot 2: Studio shot - right top */}
        <Slot
          label="STUDIO"
          size="large"
          position="absolute"
          top="3%"
          right="5%"
          rotation={3}
          clip="torn-1"
          shadow="float"
          zIndex={18}
          decoration="tape-corner"
          bleed="right"
          bleedAmount="md"
        />

        {/* Slot 3: Medium - hands at work */}
        <Slot
          label="HANDS"
          size="medium"
          position="absolute"
          top="40%"
          right="15%"
          rotation={-4}
          clip="organic-1"
          shadow="dramatic"
          zIndex={25}
          overlapX={80}
          decoration="staple"
        />

        {/* Slot 4: Process shot */}
        <Slot
          label="PROCESS"
          size="small"
          position="absolute"
          bottom="25%"
          left="5%"
          rotation={6}
          clip="torn-2"
          shadow="offset"
          zIndex={22}
          grayscale
          decoration="pin"
        />

        {/* Slot 5: Tokyo reference */}
        <Slot
          label="TOKYO"
          size="tiny"
          position="absolute"
          top="55%"
          left="35%"
          rotation={-10}
          clip="notch-1"
          zIndex={28}
          decoration="clip"
        />

        {/* Slot 6: Sasada badge */}
        <Slot
          label="SASADA"
          size="swatch"
          position="absolute"
          top="22%"
          right="35%"
          rotation={15}
          border="accent"
          zIndex={24}
          decoration="tape-top"
        />

        {/* Slot 7: Small square - materials */}
        <Slot
          label="MATERIAL"
          size="small-square"
          position="absolute"
          bottom="15%"
          right="8%"
          rotation={-3}
          clip="diagonal-1"
          shadow="soft"
          zIndex={19}
          decoration="corner-fold"
        />

        {/* Slot 8: Detail - right bleeding */}
        <Slot
          label="DETAIL"
          size="small"
          position="absolute"
          top="65%"
          right="-3%"
          rotation={-8}
          clip="irregular-4"
          zIndex={15}
          bleed="right"
          bleedAmount="md"
          sepia
        />

        {/* Slot 9: Micro accent */}
        <Slot
          label="01"
          size="micro"
          position="absolute"
          top="35%"
          left="50%"
          rotation={12}
          border="thin"
          zIndex={30}
          decoration="pin-red"
        />

        {/* Slot 10: Medium-wide - sketchbook */}
        <Slot
          label="SKETCHBOOK"
          size="medium-wide"
          position="absolute"
          top="70%"
          left="20%"
          rotation={2}
          clip="wave-1"
          shadow="float"
          zIndex={16}
          overlapY={60}
        />

        {/* Slot 11: Swatch cluster 1 */}
        <Slot
          label="WOOL"
          size="swatch"
          position="absolute"
          top="78%"
          left="55%"
          rotation={-5}
          border="rough"
          zIndex={26}
        />

        {/* Slot 12: Swatch cluster 2 */}
        <Slot
          label="SILK"
          size="swatch"
          position="absolute"
          top="82%"
          left="62%"
          rotation={8}
          border="accent"
          zIndex={27}
          overlapX={25}
        />

        {/* Slot 13: Tiny-wide reference */}
        <Slot
          label="REF"
          size="tiny-wide"
          position="absolute"
          top="12%"
          left="45%"
          rotation={-6}
          clip="irregular-5"
          zIndex={21}
          grayscale
        />

        {/* Slot 14: Top bleeding */}
        <Slot
          label="MOOD"
          size="small"
          position="absolute"
          top="-2%"
          left="60%"
          rotation={4}
          clip="trapezoid"
          shadow="offset"
          zIndex={14}
          bleed="top"
          bleedAmount="md"
        />

        {/* Slot 15: Medium-tall */}
        <Slot
          label="FORM"
          size="medium-tall"
          position="absolute"
          bottom="10%"
          left="42%"
          rotation={-1.5}
          clip="corner-cut"
          shadow="deep"
          zIndex={17}
          contrast
        />

        {/* Scattered Annotations */}
        <AnnotationLabel
          text="designer"
          position={{ top: '8%', left: '30%' }}
          rotation={-3}
          variant="tag"
        />
        <AnnotationLabel
          text="self portrait"
          position={{ top: '48%', left: '8%' }}
          rotation={5}
          variant="handwritten"
        />
        <AnnotationLabel
          text="2024"
          position={{ bottom: '35%', right: '30%' }}
          rotation={-2}
          variant="stamp"
        />
        <AnnotationLabel
          text="tokyo"
          position={{ top: '60%', right: '5%' }}
          rotation={8}
          variant="default"
        />

        {/* Name and info - positioned asymmetrically */}
        <div
          className="absolute z-40"
          style={{
            bottom: '8%',
            left: '6%',
            transform: 'rotate(-1deg)',
          }}
        >
          <LabelText
            text="Designer"
            style={{ fontSize: '0.55rem' }}
          />

          <LayeredTitle
            text="Taehyun Lee"
            size="medium"
            layerStyle="offset"
            offsetX={4}
            offsetY={4}
            layerOpacity={0.12}
            layerColor="#8B7355"
            charRotation
            rotationIntensity={2}
            className="mt-4"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              letterSpacing: '-0.02em',
            }}
            as="h1"
          />

          <ExperimentalText
            text="이태현"
            variant="caption"
            effect="scatter"
            intensity="subtle"
            className="block mt-2"
            style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: 'rgba(122, 122, 122, 0.3)' }}
          />

          <div className="mt-6 flex items-center gap-4">
            <WhisperText text="Seoul / Tokyo" style={{ fontSize: '0.55rem' }} />
            <span className="w-6 h-px bg-yon-grey/20" />
            <WhisperText text="SASADA" style={{ fontSize: '0.55rem' }} />
          </div>
        </div>

        {/* Contact - bottom right */}
        <div
          className="absolute z-40"
          style={{
            bottom: '8%',
            right: '6%',
            textAlign: 'right',
            transform: 'rotate(0.5deg)',
          }}
        >
          <a
            href="mailto:hello@theyon.com"
            className="block font-mono text-yon-grey/50 hover:text-yon-black transition-colors"
            style={{ fontSize: '0.75rem', letterSpacing: '0.1em' }}
          >
            hello@theyon.com
          </a>
          <a
            href="https://instagram.com/theyon_studio"
            target="_blank"
            rel="noopener noreferrer"
            className="block font-mono text-yon-grey/30 hover:text-yon-black transition-colors mt-2"
            style={{ fontSize: '0.65rem', letterSpacing: '0.1em' }}
          >
            @theyon_studio
          </a>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40">
          <span
            className="block font-mono uppercase tracking-[0.3em] text-yon-grey/30"
            style={{ fontSize: '0.5rem' }}
          >
            Scroll
          </span>
          <span className="block text-yon-grey/20 mt-2 text-center">↓</span>
        </div>
      </section>

      {/* ============================================
          SECTION 2: Philosophy / Statement
          Dense moodboard style with 8 slots
          ============================================ */}
      <section className="relative min-h-[90vh] w-full flex items-center overflow-hidden texture-paper">
        {/* Background letter */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '5%',
            right: '-20%',
            fontSize: 'clamp(25rem, 60vw, 85rem)',
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

        {/* Secondary background */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            bottom: '8%',
            left: '-5%',
            fontSize: 'clamp(5rem, 12vw, 18rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-mono), monospace',
            opacity: 0.02,
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
          <LayeredTitle
            text="&ldquo;Twisted yet harmonious&rdquo;"
            size="medium"
            layerStyle="echo"
            offsetX={4}
            offsetY={4}
            layerOpacity={0.1}
            layerColor="#8B7355"
            charRotation
            rotationIntensity={1.5}
            style={{
              fontStyle: 'italic',
              fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
              transform: 'rotate(-1.5deg)',
              maxWidth: '42ch',
            }}
            as="h2"
          />

          <div className="mt-10" style={{ marginLeft: '3rem', transform: 'rotate(0.5deg)' }}>
            <ExperimentalText
              text="뒤틀렸지만 조화로운"
              variant="caption"
              effect="scatter"
              intensity="subtle"
              style={{ color: 'rgba(122, 122, 122, 0.5)' }}
            />
          </div>

          <p
            className="font-sans text-yon-grey/70 mt-14 max-w-lg leading-relaxed"
            style={{
              fontSize: '0.9rem',
              marginLeft: '5rem',
              transform: 'rotate(0.8deg)',
            }}
          >
            Every element slightly askew, yet together they form perfect beauty.
            Fashion that exists beyond time and space—unreachable, ideal.
            The pursuit of something just beyond reach.
          </p>
        </div>

        {/* Floating slots - 8 slots */}
        <Slot
          label="MOOD"
          size="medium"
          position="absolute"
          top="8%"
          right="8%"
          rotation={6}
          clip="irregular-6"
          shadow="float"
          zIndex={8}
          grayscale
          decoration="tape-top"
        />

        <Slot
          label="VISION"
          size="small"
          position="absolute"
          top="30%"
          right="20%"
          rotation={-4}
          clip="torn-3"
          zIndex={10}
          decoration="pin"
          overlapY={40}
        />

        <Slot
          label="REF"
          size="tiny"
          position="absolute"
          bottom="25%"
          right="25%"
          rotation={-10}
          border="thin"
          zIndex={12}
        />

        <Slot
          label="TEXTURE"
          size="swatch"
          position="absolute"
          top="55%"
          right="40%"
          rotation={12}
          border="rough"
          zIndex={9}
          decoration="staple"
        />

        <Slot
          label="SKETCH"
          size="small"
          position="absolute"
          bottom="12%"
          right="5%"
          rotation={-5}
          clip="organic-2"
          zIndex={7}
          bleed="right"
          bleedAmount="sm"
          sepia
        />

        <Slot
          label="IDEA"
          size="tiny-wide"
          position="absolute"
          top="40%"
          right="32%"
          rotation={-8}
          clip="notch-2"
          zIndex={11}
        />

        <Slot
          label="02"
          size="micro"
          position="absolute"
          top="50%"
          right="48%"
          rotation={15}
          border="accent"
          zIndex={14}
        />

        <Slot
          label="FORM"
          size="small-square"
          position="absolute"
          bottom="30%"
          right="12%"
          rotation={3}
          clip="diagonal-2"
          zIndex={6}
          decoration="corner-fold"
        />

        <AnnotationLabel
          text="essential"
          position={{ bottom: '45%', left: '58%' }}
          rotation={3}
          variant="handwritten"
        />
        <AnnotationLabel
          text="beyond"
          position={{ top: '20%', right: '40%' }}
          rotation={-4}
          variant="tag"
        />
      </section>

      {/* ============================================
          SECTION 3: Education / Background
          Dense documentation style with 6 slots
          ============================================ */}
      <section className="relative min-h-[80vh] py-24 px-8 md:px-16 lg:px-24 overflow-hidden texture-grain">
        {/* Background */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            bottom: '5%',
            left: '-10%',
            fontSize: 'clamp(10rem, 22vw, 35rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-mono), monospace',
            opacity: 0.02,
            lineHeight: 0.8,
            color: '#0A0A0A',
            transform: 'rotate(-3deg)',
          }}
          aria-hidden="true"
        >
          2024
        </span>

        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '10%',
            right: '-8%',
            fontSize: 'clamp(8rem, 18vw, 28rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.015,
            color: '#8B7355',
            transform: 'rotate(5deg)',
          }}
          aria-hidden="true"
        >
          SASADA
        </span>

        <div className="relative z-10 max-w-4xl">
          <LabelText text="Background" style={{ fontSize: '0.55rem' }} />

          <div className="mt-14 space-y-12">
            {/* Education */}
            <div style={{ transform: 'rotate(-0.5deg)' }}>
              <AnnotationText text="EDUCATION" variant="label" style={{ color: 'rgba(139, 115, 85, 0.6)' }} />
              <LayeredTitle
                text="SASADA Fashion School"
                size="small"
                layerStyle="offset"
                offsetX={2}
                offsetY={2}
                layerOpacity={0.08}
                className="mt-3"
                style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)' }}
                as="h3"
              />
              <WhisperText
                text="Tokyo — 2023–Present"
                className="block mt-2"
                style={{ fontSize: '0.65rem' }}
              />
            </div>

            {/* Target */}
            <div style={{ marginLeft: '4rem', transform: 'rotate(0.3deg)' }}>
              <AnnotationText text="PORTFOLIO TARGET" variant="label" style={{ color: 'rgba(139, 115, 85, 0.6)' }} />
              <p
                className="font-sans text-yon-grey/60 mt-3"
                style={{ fontSize: '0.85rem', lineHeight: 1.7 }}
              >
                CSM, Parsons, Royal Academy of Antwerp
              </p>
              <WhisperText
                text="대학원 포트폴리오"
                className="block mt-2"
                style={{ fontSize: '0.5rem' }}
              />
            </div>

            {/* Focus */}
            <div style={{ transform: 'rotate(-0.3deg)' }}>
              <AnnotationText text="FOCUS" variant="label" style={{ color: 'rgba(139, 115, 85, 0.6)' }} />
              <p
                className="font-sans text-yon-grey/60 mt-3"
                style={{ fontSize: '0.85rem', lineHeight: 1.7, maxWidth: '40ch' }}
              >
                Experimental tailoring, pattern deconstruction, material exploration, conceptual
                fashion design
              </p>
            </div>

            {/* Values */}
            <div style={{ marginLeft: '2rem', transform: 'rotate(0.5deg)' }}>
              <AnnotationText text="VALUES" variant="label" style={{ color: 'rgba(139, 115, 85, 0.6)' }} />
              <p
                className="font-sans text-yon-grey/60 mt-3"
                style={{ fontSize: '0.85rem', lineHeight: 1.7, maxWidth: '35ch' }}
              >
                Imperfection as aesthetic. Process over product. Research-driven creativity.
              </p>
            </div>
          </div>
        </div>

        {/* Side slots - 6 scattered */}
        <Slot
          label="SKETCH"
          size="large"
          position="absolute"
          top="5%"
          right="5%"
          rotation={-3}
          clip="torn-1"
          shadow="offset"
          zIndex={10}
          annotationNumber="S-001"
          decoration="tape-corner"
        />

        <Slot
          label="TOILE"
          size="medium"
          position="absolute"
          top="40%"
          right="10%"
          rotation={5}
          clip="irregular-2"
          shadow="float"
          zIndex={12}
          sepia
        />

        <Slot
          label="PATTERN"
          size="small"
          position="absolute"
          bottom="20%"
          right="25%"
          rotation={-6}
          clip="organic-1"
          zIndex={14}
          grayscale
          decoration="pin"
        />

        <Slot
          label="NOTE"
          size="tiny"
          position="absolute"
          top="65%"
          right="40%"
          rotation={10}
          border="thin"
          zIndex={16}
          decoration="clip"
        />

        <Slot
          label="SAMPLE"
          size="swatch"
          position="absolute"
          bottom="30%"
          right="8%"
          rotation={-8}
          border="rough"
          zIndex={11}
          decoration="tape-top"
        />

        <Slot
          label="03"
          size="micro"
          position="absolute"
          top="30%"
          right="35%"
          rotation={12}
          border="accent"
          zIndex={18}
        />

        <AnnotationLabel
          text="research"
          position={{ top: '15%', right: '30%' }}
          rotation={-3}
          variant="handwritten"
        />
        <AnnotationLabel
          text="WIP"
          position={{ bottom: '40%', right: '15%' }}
          rotation={5}
          variant="stamp"
        />
      </section>

      {/* ============================================
          SECTION 4: Work Process Section
          New dense moodboard
          ============================================ */}
      <section className="relative min-h-[70vh] w-full py-24 overflow-hidden bg-yon-ivory/30 texture-paper">
        {/* Background */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '10%',
            left: '-8%',
            fontSize: 'clamp(8rem, 18vw, 28rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.02,
            color: '#0A0A0A',
            transform: 'rotate(-5deg)',
          }}
          aria-hidden="true"
        >
          WORK
        </span>

        <div className="relative z-10 px-8 md:px-16 lg:px-24">
          <div className="max-w-4xl">
            <LabelText text="Process" style={{ fontSize: '0.55rem' }} />

            <LayeredTitle
              text="How I Work"
              size="medium"
              layerStyle="offset"
              offsetX={3}
              offsetY={3}
              layerOpacity={0.1}
              layerColor="#8B7355"
              className="mt-6"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                letterSpacing: '-0.02em',
                transform: 'rotate(-0.5deg)',
              }}
              as="h2"
            />

            <p
              className="font-sans text-yon-grey/60 mt-8 max-w-md"
              style={{
                fontSize: '0.9rem',
                lineHeight: 1.8,
                marginLeft: '2rem',
                transform: 'rotate(0.3deg)',
              }}
            >
              Research-driven design process. From concept to toile to final piece.
              Embracing mistakes as creative opportunities.
            </p>
          </div>

          {/* Process slots grid */}
          <div className="relative mt-16" style={{ minHeight: '40vh' }}>
            <Slot
              label="RESEARCH"
              size="medium"
              position="absolute"
              top="0"
              left="0"
              rotation={-2}
              clip="irregular-1"
              shadow="offset"
              zIndex={15}
              annotationNumber="01"
              decoration="pin"
            />

            <Slot
              label="SKETCH"
              size="small"
              position="absolute"
              top="10%"
              left="30%"
              rotation={4}
              clip="torn-2"
              zIndex={18}
              decoration="tape-top"
            />

            <Slot
              label="PROTOTYPE"
              size="medium"
              position="absolute"
              top="5%"
              right="15%"
              rotation={-3}
              clip="organic-2"
              shadow="float"
              zIndex={16}
              annotationNumber="02"
            />

            <Slot
              label="ITERATE"
              size="small-square"
              position="absolute"
              bottom="20%"
              left="20%"
              rotation={6}
              clip="diagonal-1"
              zIndex={20}
              decoration="staple"
            />

            <Slot
              label="FINAL"
              size="small"
              position="absolute"
              bottom="10%"
              right="25%"
              rotation={-5}
              clip="irregular-3"
              shadow="dramatic"
              zIndex={17}
              annotationNumber="03"
              decoration="corner-fold"
            />

            <Slot
              label="A"
              size="swatch"
              position="absolute"
              top="50%"
              left="45%"
              rotation={10}
              border="rough"
              zIndex={22}
            />

            <Slot
              label="B"
              size="swatch"
              position="absolute"
              top="55%"
              left="52%"
              rotation={-8}
              border="accent"
              zIndex={23}
              overlapX={20}
            />

            <AnnotationLabel
              text="iterate"
              position={{ top: '35%', left: '35%' }}
              rotation={-3}
              variant="handwritten"
            />
            <AnnotationLabel
              text="APPROVED"
              position={{ bottom: '25%', right: '10%' }}
              rotation={5}
              variant="stamp"
            />
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 5: CTA - Contact
          ============================================ */}
      <section className="relative min-h-[50vh] w-full flex items-center justify-center overflow-hidden texture-grain">
        {/* Background */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '25%',
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
          <LabelText text="Get in touch" style={{ fontSize: '0.55rem' }} />

          <LayeredTitle
            text="Contact"
            size="medium"
            layerStyle="offset"
            offsetX={4}
            offsetY={4}
            layerOpacity={0.1}
            layerColor="#8B7355"
            charRotation
            rotationIntensity={1.5}
            className="mt-6"
            style={{
              fontSize: 'clamp(1.8rem, 4.5vw, 3rem)',
              transform: 'rotate(-1deg)',
            }}
            as="h2"
          />

          <Link
            href="/contact"
            className="inline-block mt-10 font-mono uppercase tracking-[0.2em] text-yon-grey/50 hover:text-yon-black transition-colors border-b border-yon-grey/20 hover:border-yon-black pb-1"
            style={{ fontSize: '0.6rem' }}
          >
            Send Message →
          </Link>
        </div>

        {/* Accent slots */}
        <Slot
          label="STUDIO"
          size="small"
          position="absolute"
          bottom="15%"
          right="10%"
          rotation={-8}
          clip="irregular-4"
          zIndex={5}
          grayscale
          decoration="tape-corner"
        />

        <Slot
          label="MAIL"
          size="tiny"
          position="absolute"
          top="20%"
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

        <AnnotationLabel
          text="say hello"
          position={{ top: '35%', right: '20%' }}
          rotation={4}
          variant="handwritten"
        />
      </section>

      <Footer />
    </div>
  )
}
