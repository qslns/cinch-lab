'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Footer from '@/components/Footer'

// Custom easing for smooth animations
const yonEase = [0.22, 1, 0.36, 1] as const

// Contact form field type
type FormField = 'name' | 'email' | 'type' | 'message'
type FormData = Record<FormField, string>
type FormErrors = Partial<Record<FormField, string>>

// Inquiry types
const inquiryTypes = [
  { id: 'collaboration', label: 'Collaboration', labelKo: '협업 문의' },
  { id: 'exhibition', label: 'Exhibition', labelKo: '전시 문의' },
  { id: 'press', label: 'Press / Media', labelKo: '언론 / 미디어' },
  { id: 'other', label: 'Other', labelKo: '기타' },
]

// Social links
const socialLinks = [
  {
    id: 'email',
    label: 'Email',
    value: 'hello@theyon.com',
    href: 'mailto:hello@theyon.com',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    id: 'instagram',
    label: 'Instagram',
    value: '@theyon_studio',
    href: 'https://instagram.com/theyon_studio',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <path d="M17.5 6.5h.01" strokeLinecap="round" />
      </svg>
    ),
  },
]

// Decorative elements
const decorativeElements = [
  { position: { top: '8%', left: '3%' }, size: 'w-[18vw] md:w-[10vw]', rotation: -6, variant: 'light' as const },
  { position: { top: '20%', right: '5%' }, size: 'w-[14vw] md:w-[8vw]', rotation: 8, variant: 'medium' as const },
  { position: { bottom: '30%', left: '8%' }, size: 'w-[16vw] md:w-[7vw]', rotation: -3, variant: 'dark' as const },
]

const variantStyles = {
  light: 'bg-yon-platinum',
  medium: 'bg-yon-silver',
  dark: 'bg-yon-charcoal',
}

// Form input component
function FormInput({
  label,
  labelKo,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  required = false,
  isTextarea = false,
}: {
  label: string
  labelKo: string
  name: FormField
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  error?: string
  placeholder?: string
  required?: boolean
  isTextarea?: boolean
}) {
  const [isFocused, setIsFocused] = useState(false)
  const hasValue = value.length > 0

  const inputClasses = `
    w-full bg-transparent border-b px-0 py-3 text-base text-yon-black
    placeholder:text-yon-grey/40 outline-none transition-colors duration-300
    ${error ? 'border-red-500' : isFocused ? 'border-yon-black' : 'border-yon-platinum'}
  `

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Label */}
      <motion.label
        className={`absolute left-0 transition-all duration-300 pointer-events-none ${
          isFocused || hasValue
            ? '-top-5 text-[10px] tracking-[0.15em] uppercase'
            : 'top-3 text-sm'
        } ${error ? 'text-red-500' : isFocused ? 'text-yon-black' : 'text-yon-grey'}`}
        htmlFor={name}
      >
        <span className="font-mono">{label}</span>
        {required && <span className="text-yon-accent ml-1">*</span>}
        <span className="hidden md:inline text-yon-grey/50 ml-2 font-mono">
          {labelKo}
        </span>
      </motion.label>

      {/* Input */}
      {isTextarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={isFocused ? placeholder : ''}
          className={`${inputClasses} resize-none min-h-[120px]`}
          required={required}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={isFocused ? placeholder : ''}
          className={inputClasses}
          required={required}
        />
      )}

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.span
            className="absolute -bottom-5 left-0 text-[10px] text-red-500 font-mono"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Type selector component
function TypeSelector({
  value,
  onChange,
  error,
}: {
  value: string
  onChange: (type: string) => void
  error?: string
}) {
  const errorId = 'inquiry-type-error'

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      role="radiogroup"
      aria-labelledby="inquiry-type-label"
      aria-required="true"
      aria-invalid={!!error}
      aria-describedby={error ? errorId : undefined}
    >
      <span id="inquiry-type-label" className="block font-mono text-[10px] text-yon-grey tracking-[0.15em] uppercase">
        Inquiry Type <span className="text-yon-accent" aria-hidden="true">*</span>
        <span className="sr-only">(required)</span>
        <span className="hidden md:inline text-yon-grey/50 ml-2">문의 유형</span>
      </span>

      <div className="flex flex-wrap gap-3">
        {inquiryTypes.map((type) => (
          <motion.button
            key={type.id}
            type="button"
            role="radio"
            aria-checked={value === type.id}
            onClick={() => onChange(type.id)}
            className={`group relative px-4 py-2.5 font-mono text-[11px] tracking-wider border transition-all duration-300 ${
              value === type.id
                ? 'border-yon-black bg-yon-black text-yon-white'
                : 'border-yon-platinum text-yon-grey hover:border-yon-grey'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="uppercase">{type.label}</span>
            <span className={`block text-[9px] mt-0.5 ${value === type.id ? 'text-yon-silver' : 'text-yon-grey/50'}`} aria-hidden="true">
              {type.labelKo}
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {error && (
          <motion.span
            id={errorId}
            role="alert"
            className="block text-[10px] text-red-500 font-mono"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Submit button component
function SubmitButton({
  isSubmitting,
  isSuccess,
}: {
  isSubmitting: boolean
  isSuccess: boolean
}) {
  const buttonText = isSubmitting ? 'Sending message...' : isSuccess ? 'Message sent successfully' : 'Send Message'

  return (
    <motion.button
      type="submit"
      disabled={isSubmitting || isSuccess}
      aria-busy={isSubmitting}
      aria-label={buttonText}
      className={`group relative w-full md:w-auto px-10 py-4 font-mono text-xs tracking-[0.2em] uppercase transition-all duration-500 ${
        isSuccess
          ? 'bg-green-600 text-white'
          : 'bg-yon-black text-yon-white hover:bg-yon-charcoal'
      }`}
      whileHover={{ scale: isSubmitting || isSuccess ? 1 : 1.02 }}
      whileTap={{ scale: isSubmitting || isSuccess ? 1 : 0.98 }}
    >
      <AnimatePresence mode="wait">
        {isSubmitting ? (
          <motion.span
            key="loading"
            className="flex items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.span
              className="w-4 h-4 border-2 border-yon-white/30 border-t-yon-white rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              aria-hidden="true"
            />
            Sending...
          </motion.span>
        ) : isSuccess ? (
          <motion.span
            key="success"
            className="flex items-center justify-center gap-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Sent Successfully
          </motion.span>
        ) : (
          <motion.span
            key="default"
            className="flex items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Send Message
            <motion.span
              className="inline-block"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              aria-hidden="true"
            >
              →
            </motion.span>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

// Contact link component
function ContactLink({
  link,
  index,
}: {
  link: typeof socialLinks[0]
  index: number
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.a
      href={link.href}
      target={link.id === 'instagram' ? '_blank' : undefined}
      rel={link.id === 'instagram' ? 'noopener noreferrer' : undefined}
      className="group block py-6 border-b border-yon-platinum last:border-b-0"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <motion.div
            className="text-yon-grey group-hover:text-yon-accent transition-colors duration-300"
            animate={{ rotate: isHovered ? 15 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {link.icon}
          </motion.div>
          <div>
            <span className="font-mono text-[10px] text-yon-grey/60 tracking-[0.15em] uppercase block mb-1">
              {link.label}
            </span>
            <motion.span
              className="font-serif text-xl md:text-2xl text-yon-black group-hover:text-yon-accent transition-colors duration-300"
              animate={{ x: isHovered ? 8 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {link.value}
            </motion.span>
          </div>
        </div>
        <motion.span
          className="text-yon-grey group-hover:text-yon-accent"
          animate={{ x: isHovered ? 8 : 0, opacity: isHovered ? 1 : 0.5 }}
          transition={{ duration: 0.3 }}
        >
          {link.id === 'instagram' ? (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          ) : (
            '→'
          )}
        </motion.span>
      </div>
    </motion.a>
  )
}

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const parallax1 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const parallax2 = useTransform(scrollYProgress, [0, 1], [0, -100])

  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    type: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.type) {
      newErrors.type = 'Please select an inquiry type'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error on change
    if (errors[name as FormField]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  // Handle type change
  const handleTypeChange = (type: string) => {
    setFormData((prev) => ({ ...prev, type }))
    if (errors.type) {
      setErrors((prev) => ({ ...prev, type: undefined }))
    }
  }

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSuccess(true)

    // Reset form after success
    setTimeout(() => {
      setFormData({ name: '', email: '', type: '', message: '' })
      setIsSuccess(false)
    }, 3000)
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-yon-white relative overflow-hidden">
      {/* Giant Background Letter */}
      <motion.span
        className="absolute top-[5%] right-[-20%] font-serif text-[80vw] md:text-[60vw] text-yon-platinum/[0.03] leading-none select-none pointer-events-none"
        style={{ y: parallax2 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: yonEase }}
      >
        C
      </motion.span>

      {/* Vertical decorative line */}
      <motion.div
        className="absolute top-[20%] left-[8%] w-px h-[35vh] bg-gradient-to-b from-transparent via-yon-accent/30 to-transparent"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: yonEase }}
      />

      {/* Number tag */}
      <motion.span
        className="absolute top-[30%] left-[4%] font-mono text-[10px] text-yon-grey/30 tracking-[0.3em] -rotate-90 origin-left"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        06.CONTACT
      </motion.span>

      {/* Decorative elements - repositioned */}
      {decorativeElements.map((el, index) => (
        <motion.div
          key={index}
          className={`absolute ${el.size} pointer-events-none`}
          style={{
            ...el.position,
            y: index % 2 === 0 ? parallax1 : parallax2,
            zIndex: 1,
          }}
          initial={{ opacity: 0, scale: 0.8, rotate: el.rotation - 10 }}
          animate={{ opacity: 0.4, scale: 1, rotate: el.rotation }}
          transition={{
            duration: 1.2,
            delay: 0.5 + index * 0.2,
            ease: yonEase,
          }}
        >
          <div
            className={`${variantStyles[el.variant]} w-full`}
            style={{ aspectRatio: '1/1' }}
          />
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 min-h-screen px-6 md:px-12 lg:px-16 py-32 md:py-40">
        <div className="max-w-7xl mx-auto">
          {/* Hero Header - Extreme Typography */}
          <motion.div
            className="mb-20 md:mb-32"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: yonEase }}
          >
            {/* Prefix tag with accent */}
            <motion.div
              className="flex items-center gap-4 mb-8"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: yonEase }}
            >
              <span className="w-12 h-px bg-yon-accent" />
              <span className="font-mono text-[10px] text-yon-accent tracking-[0.3em] uppercase">
                Get in touch
              </span>
            </motion.div>

            {/* Main Title - EXTREME Scale */}
            <h1 className="relative">
              <motion.span
                className="block font-serif text-[22vw] md:text-[16vw] lg:text-[14vw] text-yon-black leading-[0.75] tracking-[-0.03em]"
                initial={{ opacity: 0, y: 100, rotate: 2 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 1.2, delay: 0.1, ease: yonEase }}
              >
                Con
              </motion.span>
              <motion.span
                className="block font-serif text-[22vw] md:text-[16vw] lg:text-[14vw] text-yon-black leading-[0.75] tracking-[-0.03em] ml-[15%] md:ml-[20%]"
                initial={{ opacity: 0, y: 100, rotate: -2 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 1.2, delay: 0.2, ease: yonEase }}
              >
                tact
              </motion.span>

              {/* Italic ghost overlay */}
              <motion.span
                className="absolute top-0 left-0 font-serif italic text-[22vw] md:text-[16vw] lg:text-[14vw] text-yon-accent/[0.06] leading-[0.75] tracking-[-0.03em] pointer-events-none"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.6, ease: yonEase }}
              >
                Con
              </motion.span>
            </h1>

            {/* Korean subtitle - asymmetric placement */}
            <motion.div
              className="mt-6 md:mt-10 ml-[5%] md:ml-[40%]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: yonEase }}
            >
              <span className="font-mono text-[11px] text-yon-grey/50 tracking-[0.2em]">
                연락 — Let's connect
              </span>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="mt-10 md:mt-14 text-lg md:text-xl lg:text-2xl text-yon-steel leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: yonEase }}
            >
              For collaborations, exhibitions, press inquiries, or just to say hello.
              <span className="block mt-3 text-base text-yon-grey">
                협업, 전시, 언론 문의 또는 간단한 인사를 위해.
              </span>
            </motion.p>

            {/* Decorative line */}
            <motion.div
              className="mt-12 w-[60%] md:w-[40%] h-px bg-gradient-to-r from-yon-grey/20 via-yon-accent/30 to-transparent"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.7, ease: yonEase }}
            />
          </motion.div>

          {/* Two column layout */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left - Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <form onSubmit={handleSubmit} className="space-y-10">
                <FormInput
                  label="Name"
                  labelKo="이름"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  placeholder="Your name"
                  required
                />

                <FormInput
                  label="Email"
                  labelKo="이메일"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  placeholder="your@email.com"
                  required
                />

                <TypeSelector
                  value={formData.type}
                  onChange={handleTypeChange}
                  error={errors.type}
                />

                <FormInput
                  label="Message"
                  labelKo="메시지"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  error={errors.message}
                  placeholder="Tell us about your project or inquiry..."
                  required
                  isTextarea
                />

                <div className="pt-4">
                  <SubmitButton isSubmitting={isSubmitting} isSuccess={isSuccess} />
                </div>
              </form>

              {/* Note */}
              <motion.p
                className="mt-8 text-sm text-yon-grey leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                THE YON is not a commercial brand. We focus on experimental fashion research
                and creative collaborations.
              </motion.p>
            </motion.div>

            {/* Right - Direct contacts */}
            <motion.div
              className="lg:pt-8"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="w-8 h-px bg-yon-grey" />
                <span className="font-mono text-[10px] text-yon-grey tracking-[0.15em] uppercase">
                  Direct Contact
                </span>
              </div>

              <div className="mb-12">
                {socialLinks.map((link, index) => (
                  <ContactLink key={link.id} link={link} index={index} />
                ))}
              </div>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <span className="font-mono text-[10px] text-yon-grey/60 tracking-[0.15em] uppercase block mb-4">
                  Based in
                </span>
                <p className="font-serif text-3xl md:text-4xl text-yon-black leading-tight">
                  <span className="block">Seoul</span>
                  <span className="block ml-[5%] text-yon-grey">&</span>
                  <span className="block">Tokyo</span>
                </p>
              </motion.div>

              {/* Response time */}
              <motion.div
                className="mt-12 p-6 bg-yon-ivory"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <span className="font-mono text-[10px] text-yon-grey/60 tracking-[0.15em] uppercase block mb-2">
                  Response Time
                </span>
                <p className="text-base text-yon-steel">
                  We typically respond within 2-3 business days.
                  For urgent inquiries, please use email directly.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom quote section */}
      <section className="relative py-24 md:py-32 px-6 md:px-12 bg-yon-charcoal overflow-hidden">
        {/* Decorative */}
        <span className="absolute top-6 left-6 md:left-12 font-mono text-[80px] md:text-[140px] text-yon-graphite/15 leading-none select-none pointer-events-none transform rotate-[-5deg]">
          04
        </span>
        <span className="absolute bottom-6 right-6 md:right-12 font-mono text-[60px] md:text-[100px] text-yon-graphite/10 leading-none select-none pointer-events-none transform rotate-[8deg]">
          ∞
        </span>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-serif text-2xl md:text-4xl lg:text-5xl text-yon-white leading-[1.3]">
              <span className="block">Every conversation</span>
              <span className="block">is a new possibility</span>
            </p>

            <p className="mt-6 text-base text-yon-silver/80 leading-relaxed max-w-md mx-auto">
              모든 대화는 새로운 가능성입니다.
              함께 무언가를 만들어 보시겠습니까?
            </p>

            <p className="mt-10 font-mono text-[10px] text-yon-grey/50 tracking-[0.25em] uppercase">
              THE YON — Beyond Fashion
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
