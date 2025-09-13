export default function AboutPage() {
  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl mb-4 tracking-wider">ABOUT</h1>
        </header>

        {/* Main Content */}
        <div className="space-y-16">
          {/* Philosophy */}
          <section className="fade-in">
            <h2 className="text-xs tracking-[0.2em] opacity-50 mb-6">PHILOSOPHY</h2>
            <p className="text-2xl font-thin leading-relaxed mb-6">
              CINCH LAB is an experimental fashion laboratory that challenges the boundaries
              between art and wearability.
            </p>
            <p className="text-sm opacity-70 leading-relaxed">
              Founded in 2022, we create limited experiments that explore minimalism,
              architectural forms, and the poetry of negative space. Each piece is a
              meditation on restraint and intention.
            </p>
          </section>

          {/* Process */}
          <section className="fade-in" style={{ animationDelay: '100ms' }}>
            <h2 className="text-xs tracking-[0.2em] opacity-50 mb-6">PROCESS</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg mb-3">Concept</h3>
                <p className="text-sm opacity-70">
                  Each collection begins with a philosophical exploration,
                  drawing from architecture, nature, and abstract concepts.
                </p>
              </div>
              <div>
                <h3 className="text-lg mb-3">Design</h3>
                <p className="text-sm opacity-70">
                  Silhouettes are refined through countless iterations,
                  removing everything unnecessary until only essence remains.
                </p>
              </div>
              <div>
                <h3 className="text-lg mb-3">Creation</h3>
                <p className="text-sm opacity-70">
                  Limited quantities ensure attention to detail and exclusivity,
                  with each piece numbered and documented.
                </p>
              </div>
            </div>
          </section>

          {/* Manifesto */}
          <section className="fade-in border-t border-white/20 pt-16" style={{ animationDelay: '200ms' }}>
            <blockquote className="text-2xl md:text-3xl font-thin leading-relaxed">
              "Fashion's extreme limits lie not in excess, but in controlled minimalism."
            </blockquote>
            <p className="mt-6 text-sm tracking-[0.2em] opacity-50">
              — CINCH LAB MANIFESTO
            </p>
          </section>

          {/* Values */}
          <section className="fade-in" style={{ animationDelay: '300ms' }}>
            <h2 className="text-xs tracking-[0.2em] opacity-50 mb-6">VALUES</h2>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <span className="mr-4 opacity-50">01</span>
                <span className="opacity-70">MINIMALISM AS MAXIMUM EXPRESSION</span>
              </li>
              <li className="flex items-start">
                <span className="mr-4 opacity-50">02</span>
                <span className="opacity-70">QUALITY OVER QUANTITY</span>
              </li>
              <li className="flex items-start">
                <span className="mr-4 opacity-50">03</span>
                <span className="opacity-70">SUSTAINABLE BY DESIGN</span>
              </li>
              <li className="flex items-start">
                <span className="mr-4 opacity-50">04</span>
                <span className="opacity-70">TIMELESS OVER TRENDY</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  )
}