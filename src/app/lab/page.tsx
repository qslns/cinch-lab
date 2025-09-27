'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import CipherText from '@/components/CipherText'
import {
  DeconstructedHover,
  SacaiLayer,
  FragmentMosaic,
  ExposedStructure,
  AsymmetricTransform
} from '@/components/HybridLayerEffects'

// Detailed fashion experiments with real terminology
const experiments = [
  {
    id: 'EXP-001',
    title: 'DECONSTRUCTED BLAZER ANALYSIS',
    status: 'IN_PROGRESS',
    progress: 67,
    startDate: '2024.03.15',
    techniques: ['Pattern Drafting', 'Draping', 'Seam Ripping', 'French Seams'],
    materials: ['Wool Gabardine 280gsm', 'Canvas Interfacing', 'Silk Lining'],
    specifications: {
      seamAllowance: '1.5cm',
      grainDirection: 'Lengthwise',
      ease: '6cm chest',
      constructionMethod: 'Tailored'
    },
    notes: 'Investigating traditional structure through deconstruction. Each seam reveals construction history.',
    phase: 'TOILE_FITTING'
  },
  {
    id: 'EXP-002',
    title: 'BONDED SEAM CONSTRUCTION',
    status: 'COMPLETED',
    progress: 100,
    startDate: '2024.02.28',
    techniques: ['Ultrasonic Welding', 'Heat Sealing', 'Laser Cutting'],
    materials: ['Neoprene 3mm', 'TPU Film', 'Polyurethane Tape'],
    specifications: {
      bondWidth: '8mm',
      temperature: '180°C',
      pressure: '2.5 bar',
      seamStrength: '45N/cm'
    },
    notes: 'Revolutionary seam-free construction eliminates traditional stitching. Future of garment assembly.',
    phase: 'ARCHIVED'
  },
  {
    id: 'EXP-003',
    title: 'HYBRID LAYERING SYSTEM',
    status: 'TESTING',
    progress: 34,
    startDate: '2024.03.22',
    techniques: ['Layer Splicing', 'Asymmetric Assembly', 'Volume Manipulation'],
    materials: ['Jersey Knit', 'Woven Cotton', 'Mesh Insert'],
    specifications: {
      layerCount: '3-7 layers',
      maxThickness: '12mm',
      breathability: 'Maintained',
      flexibility: 'Enhanced'
    },
    notes: 'Sacai-inspired multi-layer integration. Each layer maintains independence while creating unity.',
    phase: 'PROTOTYPE'
  },
  {
    id: 'EXP-004',
    title: '3D KNIT SEAMLESS CONSTRUCTION',
    status: 'IN_PROGRESS',
    progress: 89,
    startDate: '2024.01.10',
    techniques: ['Whole Garment Knitting', 'Intarsia', 'Cable Structures'],
    materials: ['Merino Wool', 'Lycra Core', 'Conductive Thread'],
    specifications: {
      gauge: '12GG',
      structure: 'Full Fashion',
      seamReduction: '95%',
      fitPrecision: '±2mm'
    },
    notes: 'Zero-waste knitting eliminates cutting and sewing. Machine becomes the pattern maker.',
    phase: 'REFINEMENT'
  },
  {
    id: 'EXP-005',
    title: 'PATTERN MORPHING ALGORITHM',
    status: 'EXPERIMENTAL',
    progress: 12,
    startDate: '2024.03.01',
    techniques: ['Digital Pattern Making', 'Parametric Design', 'AI Generation'],
    materials: ['Digital Canvas', 'Virtual Fabric', 'Code Patterns'],
    specifications: {
      iterations: '∞',
      variables: '47 parameters',
      accuracy: '99.7%',
      adaptability: 'Real-time'
    },
    notes: 'Machine learning meets pattern making. Teaching computers to understand fabric behavior.',
    phase: 'RESEARCH'
  },
  {
    id: 'EXP-006',
    title: 'MEMORY FABRIC INTEGRATION',
    status: 'SUSPENDED',
    progress: 8,
    startDate: '2024.02.14',
    techniques: ['Shape Memory Alloy', 'Heat Activation', 'Fiber Embedding'],
    materials: ['Nitinol Wire', 'Smart Textile', 'Thermoplastic'],
    specifications: {
      activationTemp: '37°C',
      memoryDuration: '30 min',
      cycles: '1000+',
      recovery: '98%'
    },
    notes: 'Garments that remember and return to original form. Self-adjusting fit technology.',
    phase: 'SUSPENDED'
  }
]

// Current active projects
const currentProjects = [
  {
    name: 'CINCH-24-SS-001',
    description: 'Deconstructed Tailoring Series',
    deadline: '2024.04.30',
    team: ['Pattern Maker', 'Seamstress', 'Fit Specialist'],
    materials: ['Wool Suiting', 'Canvas', 'Thread'],
    status: 'CUTTING'
  },
  {
    name: 'CINCH-24-FW-002',
    description: 'Hybrid Construction Research',
    deadline: '2024.05.15',
    team: ['Technical Designer', 'R&D Engineer'],
    materials: ['Technical Fabrics', 'Hardware'],
    status: 'PROTOTYPE'
  }
]

// Technical library categories
const technicalLibrary = [
  {
    category: 'SEAMING TECHNIQUES',
    count: 47,
    entries: [
      'French Seam', 'Flat Fell Seam', 'Hong Kong Finish', 'Serged Seam',
      'Pinked Seam', 'Bound Seam', 'Welted Seam', 'Lapped Seam'
    ]
  },
  {
    category: 'PATTERN LIBRARY',
    count: 234,
    entries: [
      'Basic Bodice Block', 'Sleeve Sloper', 'Skirt Block', 'Trouser Block',
      'Collar Variations', 'Dart Manipulations', 'Ease Adjustments'
    ]
  },
  {
    category: 'MATERIAL DATABASE',
    count: 189,
    entries: [
      'Natural Fibers', 'Synthetic Fibers', 'Technical Textiles', 'Smart Fabrics',
      'Interfacings', 'Notions', 'Hardware', 'Treatments'
    ]
  },
  {
    category: 'CONSTRUCTION METHODS',
    count: 67,
    entries: [
      'Tailored Construction', 'Couture Techniques', 'Industrial Methods',
      'Zero Waste Patterns', 'Seamless Knitting', 'Bonded Seams'
    ]
  }
]

// Process documentation steps
const processStages = [
  { id: 'CONCEPT', label: 'Conceptual Development', duration: '∞', icon: '◐' },
  { id: 'RESEARCH', label: 'Technical Research', duration: '168hrs', icon: '◒' },
  { id: 'PATTERN', label: 'Pattern Engineering', duration: '72hrs', icon: '◓' },
  { id: 'TOILE', label: 'Toile Construction', duration: '48hrs', icon: '◑' },
  { id: 'FITTING', label: 'Fit Analysis', duration: '24hrs', icon: '◐' },
  { id: 'CONSTRUCTION', label: 'Final Assembly', duration: '96hrs', icon: '◒' },
  { id: 'FINISHING', label: 'Detail Refinement', duration: '36hrs', icon: '◓' },
  { id: 'ANALYSIS', label: 'Post-Construction Review', duration: '12hrs', icon: '◑' }
]

export default function LabPage() {
  const [activeExperiment, setActiveExperiment] = useState<number | null>(null)
  const [currentStage, setCurrentStage] = useState(0)
  const [selectedTab, setSelectedTab] = useState<'experiments' | 'projects' | 'process' | 'library'>('experiments')
  const [labStatus, setLabStatus] = useState<'OPERATIONAL' | 'EXPERIMENTING' | 'CRITICAL'>('OPERATIONAL')
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  // Cycle through process stages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStage((prev) => (prev + 1) % processStages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Random status changes
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.9) {
        setLabStatus(prev => {
          const statuses: typeof labStatus[] = ['OPERATIONAL', 'EXPERIMENTING', 'CRITICAL']
          return statuses[Math.floor(Math.random() * statuses.length)]
        })
      }
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen bg-white-0 relative">
      {/* Technical Grid Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-20"
             style={{
               backgroundImage: `
                 linear-gradient(var(--gray-plaster) 1px, transparent 1px),
                 linear-gradient(90deg, var(--gray-plaster) 1px, transparent 1px)
               `,
               backgroundSize: '20px 20px'
             }}
        />
      </div>

      {/* Laboratory Status Bar */}
      <motion.div
        className="fixed top-20 left-0 right-0 z-40 bg-black-100 text-white-0 py-3 border-b border-gray-steel"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between text-micro font-mono">
            <div className="flex items-center gap-8">
              <span>LAB_STATUS: <span className={`
                ${labStatus === 'OPERATIONAL' ? 'text-centrifuge-blue' :
                  labStatus === 'EXPERIMENTING' ? 'text-warning-yellow' : 'text-safety-orange'}
              `}>{labStatus}</span></span>
              <span className="opacity-60">|</span>
              <span>ACTIVE_EXPERIMENTS: {experiments.filter(e => e.status === 'IN_PROGRESS').length}</span>
              <span className="opacity-60">|</span>
              <span>CURRENT_PROCESS: {processStages[currentStage].label}</span>
            </div>
            <div className="flex items-center gap-4">
              <motion.div
                className="w-2 h-2 rounded-full bg-safety-orange"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <CipherText mode="auto" delay={2000}>NO SALES • ONLY CREATION</CipherText>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="pt-40 pb-20">
        <div className="max-w-7xl mx-auto px-6">

          {/* Page Title */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-micro font-mono text-safety-orange mb-4 tracking-wider">
              CINCH LAB / EXPERIMENTAL_DIVISION
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tightest uppercase mb-6">
              <CipherText mode="auto" delay={1000}>LABORATORY</CipherText>
            </h1>
            <div className="text-lg text-concrete-gray max-w-3xl">
              Advanced fashion research facility. Every technique deconstructed, every method questioned,
              every possibility explored. We are the future of garment construction.
            </div>
            <div className="text-sm font-mono mt-4 text-concrete-gray">
              "난 천재야, CINCH LAB은 최고야" — Research Director
            </div>
          </motion.div>

          {/* Navigation Tabs */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex border-b border-gray-plaster">
              {[
                { id: 'experiments', label: 'EXPERIMENTS', count: experiments.length },
                { id: 'projects', label: 'CURRENT PROJECTS', count: currentProjects.length },
                { id: 'process', label: 'PROCESS DOCUMENTATION', count: processStages.length },
                { id: 'library', label: 'TECHNICAL LIBRARY', count: technicalLibrary.reduce((acc, cat) => acc + cat.count, 0) }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id as any)}
                  className={`px-6 py-4 text-sm font-mono uppercase transition-all duration-300 ${
                    selectedTab === tab.id
                      ? 'border-b-2 border-black-100 text-black-100'
                      : 'text-concrete-gray hover:text-black-100'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
          </motion.div>

          {/* Experiments Section */}
          <AnimatePresence mode="wait">
            {selectedTab === 'experiments' && (
              <motion.div
                key="experiments"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">
                    <CipherText>ACTIVE EXPERIMENTS</CipherText>
                  </h2>
                  <p className="text-concrete-gray">
                    Ongoing research into advanced construction techniques and material innovations.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {experiments.map((exp, index) => (
                    <motion.div
                      key={exp.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onMouseEnter={() => setActiveExperiment(index)}
                      onMouseLeave={() => setActiveExperiment(null)}
                      className={`relative bg-paper-white p-8 border transition-all duration-300 ${
                        activeExperiment === index
                          ? 'border-black-100 shadow-2xl transform -translate-y-1'
                          : 'border-concrete-gray/30'
                      }`}
                    >
                      {/* Experiment Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <div className="text-micro font-mono text-safety-orange mb-1">
                            {exp.id} • {exp.startDate}
                          </div>
                          <h3 className="text-xl font-bold tracking-wider">
                            <CipherText>{exp.title}</CipherText>
                          </h3>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-1 text-micro font-mono uppercase ${
                            exp.status === 'COMPLETED' ? 'bg-hazmat-green text-off-black' :
                            exp.status === 'IN_PROGRESS' ? 'bg-centrifuge-blue text-white' :
                            exp.status === 'TESTING' ? 'bg-warning-yellow text-off-black' :
                            exp.status === 'EXPERIMENTAL' ? 'bg-petri-pink text-off-black' :
                            'bg-concrete-gray text-white'
                          }`}>
                            {exp.status}
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-6">
                        <div className="flex justify-between text-micro font-mono mb-2">
                          <span>PROGRESS</span>
                          <span>{exp.progress}%</span>
                        </div>
                        <div className="h-1 bg-concrete-gray/30">
                          <motion.div
                            className="h-full bg-black-100"
                            initial={{ width: 0 }}
                            animate={{ width: `${exp.progress}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                          />
                        </div>
                      </div>

                      {/* Techniques & Materials */}
                      <div className="space-y-4 mb-6">
                        <div>
                          <div className="text-micro font-mono text-concrete-gray mb-2">TECHNIQUES:</div>
                          <div className="flex flex-wrap gap-2">
                            {exp.techniques.map(tech => (
                              <span key={tech} className="text-xs px-2 py-1 bg-concrete-gray/20 font-mono">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="text-micro font-mono text-concrete-gray mb-2">MATERIALS:</div>
                          <div className="flex flex-wrap gap-2">
                            {exp.materials.map(mat => (
                              <span key={mat} className="text-xs px-2 py-1 border border-concrete-gray/30 font-mono">
                                {mat}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Technical Specifications */}
                      <div className="mb-4">
                        <div className="text-micro font-mono text-concrete-gray mb-2">SPECIFICATIONS:</div>
                        <div className="space-y-1">
                          {Object.entries(exp.specifications).map(([key, value]) => (
                            <div key={key} className="flex justify-between text-xs font-mono">
                              <span className="uppercase">{key.replace(/([A-Z])/g, '_$1')}:</span>
                              <span>{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Notes */}
                      <div className="text-sm text-concrete-gray italic border-t border-concrete-gray/20 pt-4">
                        {exp.notes}
                      </div>

                      {/* Phase Indicator */}
                      <div className="absolute bottom-4 right-4">
                        <span className="text-micro font-mono text-concrete-gray">
                          {exp.phase}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Current Projects Section */}
            {selectedTab === 'projects' && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">
                    <CipherText>CURRENT PROJECTS</CipherText>
                  </h2>
                  <p className="text-concrete-gray">
                    Active development projects in various stages of completion.
                  </p>
                </div>

                <div className="space-y-6">
                  {currentProjects.map((project, index) => (
                    <motion.div
                      key={project.name}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="bg-paper-white p-8 border border-concrete-gray/30"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold mb-2">
                            <CipherText>{project.name}</CipherText>
                          </h3>
                          <p className="text-concrete-gray">{project.description}</p>
                        </div>
                        <span className={`px-3 py-1 text-sm font-mono uppercase ${
                          project.status === 'CUTTING' ? 'bg-warning-yellow text-off-black' :
                          'bg-centrifuge-blue text-white'
                        }`}>
                          {project.status}
                        </span>
                      </div>

                      <div className="grid md:grid-cols-3 gap-6 text-sm">
                        <div>
                          <div className="text-micro font-mono text-concrete-gray mb-2">DEADLINE:</div>
                          <div className="font-mono">{project.deadline}</div>
                        </div>
                        <div>
                          <div className="text-micro font-mono text-concrete-gray mb-2">TEAM:</div>
                          <div className="space-y-1">
                            {project.team.map(member => (
                              <div key={member} className="font-mono">{member}</div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="text-micro font-mono text-concrete-gray mb-2">MATERIALS:</div>
                          <div className="space-y-1">
                            {project.materials.map(material => (
                              <div key={material} className="font-mono">{material}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Process Documentation */}
            {selectedTab === 'process' && (
              <motion.div
                key="process"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">
                    <CipherText>PROCESS DOCUMENTATION</CipherText>
                  </h2>
                  <p className="text-concrete-gray">
                    Step-by-step methodology for garment creation and experimentation.
                  </p>
                </div>

                {/* Live Process Indicator */}
                <div className="mb-12 p-6 bg-off-black text-white">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">LIVE PROCESS MONITOR</h3>
                    <motion.div
                      className="text-2xl"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    >
                      {processStages[currentStage].icon}
                    </motion.div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="text-micro font-mono mb-1">CURRENT STAGE:</div>
                      <div className="text-xl font-mono">{processStages[currentStage].label}</div>
                    </div>
                    <div>
                      <div className="text-micro font-mono mb-1">ESTIMATED DURATION:</div>
                      <div className="text-xl font-mono">{processStages[currentStage].duration}</div>
                    </div>
                  </div>
                </div>

                {/* Process Steps */}
                <div className="space-y-4">
                  {processStages.map((stage, index) => (
                    <motion.div
                      key={stage.id}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-6 border transition-all duration-300 ${
                        index === currentStage
                          ? 'border-black-100 bg-paper-white'
                          : 'border-concrete-gray/30'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`text-2xl ${
                          index === currentStage ? 'text-black-100' : 'text-concrete-gray'
                        }`}>
                          {stage.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold">
                              STAGE {(index + 1).toString().padStart(2, '0')}: {stage.label}
                            </h3>
                            <span className="text-sm font-mono text-concrete-gray">
                              {stage.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Technical Library */}
            {selectedTab === 'library' && (
              <motion.div
                key="library"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">
                    <CipherText>TECHNICAL LIBRARY</CipherText>
                  </h2>
                  <p className="text-concrete-gray">
                    Comprehensive archive of fashion construction techniques and methodologies.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {technicalLibrary.map((category, index) => (
                    <motion.div
                      key={category.category}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-paper-white p-6 border border-concrete-gray/30"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold">
                          <CipherText>{category.category}</CipherText>
                        </h3>
                        <span className="px-2 py-1 bg-off-black text-white text-sm font-mono">
                          {category.count}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {category.entries.map(entry => (
                          <div key={entry} className="text-sm py-1 border-b border-concrete-gray/20 font-mono">
                            {entry}
                          </div>
                        ))}
                        <div className="text-xs text-concrete-gray italic pt-2">
                          + {category.count - category.entries.length} more entries
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Laboratory Manifesto */}
          <motion.div
            className="mt-20 text-center py-16 border-t border-concrete-gray/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <h2 className="text-3xl font-black mb-8 tracking-wider">
              <CipherText mode="auto" delay={3000}>
                LABORATORY MANIFESTO
              </CipherText>
            </h2>
            <div className="text-lg text-concrete-gray max-w-4xl mx-auto leading-relaxed">
              We are not bound by traditional methods. Every stitch is questioned, every seam reconsidered,
              every technique deconstructed and rebuilt. This laboratory exists to push the boundaries of
              what garments can be, how they can be made, and what fashion can become.
            </div>
            <div className="text-sm font-mono mt-8 text-concrete-gray">
              "Fashion is not about following rules. It's about breaking them intelligently."
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Lab Stats */}
      <motion.div
        className="fixed bottom-8 right-8 bg-off-black text-white p-4 text-micro font-mono min-w-48"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
      >
        <div className="space-y-1">
          <div>EXPERIMENTS_ACTIVE: {experiments.filter(e => e.status === 'IN_PROGRESS').length}</div>
          <div>TECHNIQUES_ARCHIVED: 347</div>
          <div>PATTERNS_GENERATED: 1,247</div>
          <div>HOURS_RESEARCHED: 12,847</div>
          <div className="pt-2 border-t border-concrete-gray text-warning-yellow">
            STATUS: {labStatus}
          </div>
        </div>
      </motion.div>
    </div>
  )
}