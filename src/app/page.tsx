import Link from 'next/link'

export default function HomePage() {
  const sections = [
    { id: 'lab', title: 'LAB', subtitle: 'Digital Experiments' },
    { id: 'collections', title: 'COLLECTIONS', subtitle: 'Fashion Archive' },
    { id: 'archive', title: 'ARCHIVE', subtitle: 'Past • Present • Future' },
    { id: 'about', title: 'ABOUT', subtitle: 'Philosophy' },
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        <div className="text-center">
          <h1 className="cinch-title text-6xl md:text-8xl lg:text-9xl mb-4">
            CINCH LAB
          </h1>
          <p className="text-sm md:text-base tracking-[0.2em] opacity-70">
            Experimental Fashion Laboratory
          </p>
          <p className="mt-8 text-xs tracking-[0.3em] uppercase opacity-50">
            Minimalism • Innovation • Excellence
          </p>
        </div>

        {/* Minimal scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 scroll-indicator">
          <div className="w-[1px] h-16 bg-white opacity-30" />
        </div>
      </section>

      {/* Navigation Grid */}
      <section className="min-h-screen flex items-center justify-center px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
          {sections.map((section) => (
            <Link
              key={section.id}
              href={`/${section.id}`}
              className="group block"
            >
              <div className="aspect-square border border-white/20 hover:border-white transition-colors duration-500 p-8 flex flex-col justify-center items-center text-center">
                <h2 className="text-2xl md:text-3xl mb-2 tracking-wider group-hover:scale-105 transition-transform duration-500">
                  {section.title}
                </h2>
                <p className="text-xs tracking-widest opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                  {section.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Section */}
      <section className="min-h-screen py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl mb-12 tracking-wider">
            NEW EXPERIMENTS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="group">
                <div className="aspect-[3/4] bg-gradient-to-br from-gray-900 to-black border border-white/10 hover:border-white/30 transition-colors duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-sm mb-1">EXPERIMENT {String(item).padStart(3, '0')}</p>
                    <p className="text-xs opacity-70">DIGITAL PIECE</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="min-h-screen flex items-center justify-center px-4 md:px-8">
        <div className="max-w-4xl text-center">
          <blockquote className="text-2xl md:text-4xl lg:text-5xl font-thin leading-tight mb-8">
            <span className="block">
              "Less is more, but better."
            </span>
          </blockquote>

          <p className="text-sm tracking-[0.3em] uppercase opacity-70">
            CINCH LAB PHILOSOPHY
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl mb-8 tracking-wider">ENTER THE LABORATORY</h3>
          <Link
            href="/lab"
            className="inline-block border border-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-colors duration-500"
          >
            EXPLORE NOW
          </Link>
        </div>
      </section>
    </main>
  )
}