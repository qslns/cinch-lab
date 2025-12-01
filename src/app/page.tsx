import Link from 'next/link'
import Footer from '@/components/Footer'
import HomeClient from '@/components/home/HomeClient'

// Static data
const collections = [
  {
    id: 1,
    title: 'DECONSTRUCTION',
    season: 'AW25',
    year: '2025',
    slug: 'deconstruction',
  },
  {
    id: 2,
    title: 'FRAGMENTS',
    season: 'SS25',
    year: '2025',
    slug: 'fragments',
  },
  {
    id: 3,
    title: 'VOID',
    season: 'AW24',
    year: '2024',
    slug: 'void',
  },
]

const archivePreview = [
  { id: 'AW25-001', title: 'Deconstructed Tailoring', category: 'Research' },
  { id: 'SS25-002', title: 'Raw Edge Studies', category: 'Material' },
  { id: 'AW24-003', title: 'Volume Architecture', category: 'Form' },
]


// Minimal Philosophy Section - Just the essence
function PhilosophySection() {
  return (
    <section className="relative py-32 md:py-48 lg:py-56 px-6 md:px-8 lg:px-12 bg-yon-ivory overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-yon-black leading-relaxed italic">
          Twisted yet harmonious
        </p>
      </div>
    </section>
  )
}

// Minimal Contact - Just the email
function ContactCTASection() {
  return (
    <section className="relative py-24 md:py-32 px-6 md:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto text-center">
        <a
          href="mailto:hello@theyon.com"
          className="font-mono text-sm text-yon-grey hover:text-yon-black transition-colors tracking-wider"
        >
          hello@theyon.com
        </a>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <div className="relative bg-yon-white">
      {/* Hero + Collections + Archive - Client Components with animations */}
      <HomeClient collections={collections} archivePreview={archivePreview} />

      {/* Philosophy - Static SSR */}
      <PhilosophySection />

      {/* Contact CTA - Static SSR */}
      <ContactCTASection />

      <Footer />
    </div>
  )
}
