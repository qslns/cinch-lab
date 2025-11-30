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
    description: 'Pattern deconstruction through experimental tailoring techniques. Every seam exposed, every structure questioned.',
    techniques: ['Raw Edge', 'Inverted Seams', 'Visible Interfacing'],
    status: 'In Progress',
  },
  {
    id: 2,
    title: 'FRAGMENTS',
    season: 'SS25',
    year: '2025',
    slug: 'fragments',
    description: 'Hybrid material construction with contrasting textures. Beauty in the broken pieces.',
    techniques: ['Material Splicing', 'Surface Manipulation'],
    status: 'Testing',
  },
  {
    id: 3,
    title: 'VOID',
    season: 'AW24',
    year: '2024',
    slug: 'void',
    description: 'Architectural volume exploration. The space between defines the form.',
    techniques: ['Draping', 'Pattern Cutting'],
    status: 'Complete',
  },
]

const archivePreview = [
  { id: 'AW25-001', title: 'Deconstructed Tailoring', category: 'Research' },
  { id: 'SS25-002', title: 'Raw Edge Studies', category: 'Material' },
  { id: 'AW24-003', title: 'Volume Architecture', category: 'Form' },
]


// Static Philosophy Section (SSR)
function PhilosophySection() {
  return (
    <section className="relative py-24 md:py-32 lg:py-40 px-6 md:px-8 lg:px-12 bg-yon-ivory overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-yon-platinum/20 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px bg-yon-grey" />
              <span className="font-mono text-[10px] text-yon-grey tracking-[0.2em] uppercase">
                Philosophy
              </span>
              <span className="font-mono text-[10px] text-yon-grey/40 tracking-wider">
                001
              </span>
            </div>
          </div>

          <div className="md:col-span-8">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.15] text-yon-black">
              Twisted yet harmonious
            </h2>

            <div className="mt-8 space-y-6">
              <p className="text-base md:text-lg text-yon-steel leading-[1.8]">
                Every element is slightly askew, yet together they form perfect beauty.
                Fashion that transcends time and space — the pursuit of an ideal beyond reach.
              </p>
              <p className="text-sm text-yon-grey leading-[1.7]">
                모든 요소가 약간씩 어긋나 있지만, 전체적으로는 하나의 아름다운 구성을 이룹니다.
                시간과 공간을 초월한 패션 — 손에 잡히지 않는 이상을 향한 탐구.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 pt-8 border-t border-yon-platinum">
              {[
                { label: 'Collections', value: '4' },
                { label: 'Archive Items', value: '24+' },
                { label: 'Since', value: '2024' },
              ].map((stat, i) => (
                <div key={i}>
                  <span className="font-serif text-2xl md:text-3xl text-yon-black">{stat.value}</span>
                  <span className="block mt-1 font-mono text-[9px] text-yon-grey tracking-[0.1em] uppercase">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 font-mono text-xs tracking-[0.12em] uppercase text-yon-black hover:text-yon-accent transition-colors"
              >
                <span>About the Designer</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Static Contact CTA Section (SSR)
function ContactCTASection() {
  return (
    <section className="relative py-24 md:py-32 px-6 md:px-8 lg:px-12 bg-yon-ivory">
      <div className="max-w-4xl mx-auto text-center">
        <span className="font-mono text-[10px] text-yon-grey tracking-[0.2em] uppercase">
          Get in Touch
        </span>

        <h2 className="mt-6 font-serif text-3xl md:text-4xl lg:text-5xl text-yon-black leading-[1.15]">
          Interested in collaboration?
        </h2>

        <p className="mt-6 text-base text-yon-steel leading-[1.7] max-w-lg mx-auto">
          For collaborations, exhibitions, press inquiries, or just to say hello.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-yon-black text-yon-white font-mono text-[10px] tracking-[0.12em] uppercase hover:bg-yon-charcoal transition-colors"
          >
            <span>Contact</span>
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <a
            href="mailto:hello@theyon.com"
            className="group inline-flex items-center gap-3 px-8 py-4 border border-yon-black font-mono text-[10px] tracking-[0.12em] uppercase text-yon-black hover:bg-yon-black hover:text-yon-white transition-all duration-300"
          >
            <span>hello@theyon.com</span>
          </a>
        </div>
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
