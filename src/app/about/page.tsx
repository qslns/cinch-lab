'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-yon-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-2">
          {/* Left - Text */}
          <div className="flex items-center justify-center p-8 md:p-16 order-2 md:order-1">
            <motion.div
              className="max-w-lg"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-mono text-micro text-yon-grey tracking-widest uppercase">
                About
              </span>
              <h1 className="mt-4 font-serif text-display text-yon-black transform rotate-[-0.5deg]">
                THE YON
              </h1>
              <p className="mt-8 text-body-lg text-yon-steel leading-relaxed">
                "저 너머"를 향한 끊임없는 탐구.
                <br /><br />
                THE YON은 시간과 공간을 초월한 패션을 추구합니다.
                손에 잡히지 않는, 도달하기 어려운 이상적인 아름다움.
                그것이 우리가 추구하는 방향입니다.
              </p>
            </motion.div>
          </div>

          {/* Right - Image placeholder */}
          <motion.div
            className="relative h-[50vh] md:h-screen bg-yon-charcoal order-1 md:order-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-sm text-yon-grey">DESIGNER PORTRAIT</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-yon-ivory">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-micro text-yon-grey tracking-widest uppercase">
              Philosophy
            </span>
            <h2 className="mt-4 font-serif text-title text-yon-black transform rotate-[-0.3deg]">
              Twisted yet harmonious
            </h2>
            <p className="mt-8 text-body-lg text-yon-steel leading-relaxed">
              모든 요소가 약간씩 어긋나 있습니다. 하지만 전체적으로는 하나의 아름다운
              구성을 이룹니다. 해체되어 있지만 완벽합니다. 이것이 THE YON의 미학입니다.
            </p>
            <p className="mt-6 text-body-lg text-yon-steel leading-relaxed">
              우리는 전통적인 패턴 메이킹과 현대적인 해체주의가 만나는 지점을 탐구합니다.
              Pattern Magic의 기법들을 연구하고, 그것을 넘어서는 새로운 가능성을 찾습니다.
              완성된 결과물만큼이나 과정 자체가 중요합니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Designer Section */}
      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-micro text-yon-grey tracking-widest uppercase">
              Designer
            </span>
            <h2 className="mt-4 font-serif text-title text-yon-black">
              Taehyun Lee
            </h2>
            <div className="mt-8 grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-body text-yon-steel leading-relaxed">
                  사사다 패션스쿨에서 패션 디자인을 공부하고 있습니다.
                  실험적인 패턴 메이킹과 소재 연구에 집중하며,
                  전통적인 테일러링 기법과 현대적인 해체주의 사이의
                  균형점을 찾고 있습니다.
                </p>
              </div>
              <div>
                <p className="text-body text-yon-steel leading-relaxed">
                  THE YON은 판매를 위한 브랜드가 아닙니다.
                  이것은 실험과 연구를 위한 공간이며, 창작 과정 자체를
                  기록하고 공유하기 위한 디지털 아카이브입니다.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-yon-charcoal text-yon-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-micro text-yon-silver tracking-widest uppercase">
              Approach
            </span>
            <h2 className="mt-4 font-serif text-title">
              How we work
            </h2>
            <ul className="mt-8 space-y-6">
              {[
                { num: '01', text: 'Research — 영감의 원천을 찾고, 기존의 기법을 분석합니다.' },
                { num: '02', text: 'Experiment — 새로운 가능성을 탐구하고, 실패를 두려워하지 않습니다.' },
                { num: '03', text: 'Document — 과정을 기록하고, 발견을 공유합니다.' },
                { num: '04', text: 'Refine — 반복적인 개선을 통해 완성도를 높입니다.' },
              ].map((item) => (
                <li key={item.num} className="flex items-start gap-6">
                  <span className="font-mono text-micro text-yon-silver mt-1">
                    {item.num}
                  </span>
                  <span className="text-body-lg text-yon-ivory">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-mono text-micro text-yon-grey tracking-widest uppercase mb-8">
              Interested in collaboration?
            </p>
            <Link
              href="/contact"
              className="inline-block font-serif text-heading text-yon-black hover:text-yon-accent transition-colors duration-300"
            >
              Get in touch →
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
