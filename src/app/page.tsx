import Footer from '@/components/Footer'
import HomeClient from '@/components/home/HomeClient'
import PhilosophySection from '@/components/home/PhilosophySection'
import ContactCTASection from '@/components/home/ContactCTASection'

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
