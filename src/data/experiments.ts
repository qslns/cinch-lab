// CINCH LAB Experiments Data - 순수 기술 실험 (판매 없음)

export interface Technique {
  id: string
  name: string
  description: string
  process: string[]
  materials: string[]
  difficulty: number // 1-5
}

export interface Experiment {
  id: string
  title: string
  subtitle: string
  category: 'PATTERN' | 'MATERIAL' | 'STRUCTURE' | 'TECHNIQUE' | 'PROCESS'
  status: 'ACTIVE' | 'COMPLETED' | 'ONGOING' | 'FAILED'
  description: string
  techniques: Technique[]
  discoveries: string[]
  failures: string[]
  dateStarted: string
  lastModified: string
}

export const experiments: Experiment[] = [
  {
    id: 'EXP_001',
    title: 'PATTERN_DECONSTRUCTION',
    subtitle: 'Breaking traditional pattern making',
    category: 'PATTERN',
    status: 'ACTIVE',
    description: 'Exploring the destruction and reconstruction of traditional pattern blocks. Each pattern piece becomes a canvas for experimentation.',
    techniques: [
      {
        id: 'TECH_001',
        name: 'Fractal Cutting',
        description: 'Creating self-similar patterns at different scales',
        process: [
          'Start with basic block',
          'Apply mathematical fractal formula',
          'Cut recursively',
          'Reassemble in chaos'
        ],
        materials: ['Paper', 'Muslin', 'Industrial felt'],
        difficulty: 4
      },
      {
        id: 'TECH_002',
        name: 'Negative Space Manipulation',
        description: 'Using absence as the primary design element',
        process: [
          'Define positive space',
          'Invert the pattern',
          'Cut away structure',
          'Support the void'
        ],
        materials: ['Transparent fabrics', 'Wire frames', 'Air'],
        difficulty: 5
      }
    ],
    discoveries: [
      'Patterns can exist in negative space',
      'Destruction creates new forms',
      'Mathematics applies to fashion'
    ],
    failures: [
      'Complete structural collapse in test 3',
      'Material fatigue at stress points',
      'Human body rejected form'
    ],
    dateStarted: '2024-01-15',
    lastModified: '2024-12-28'
  },
  {
    id: 'EXP_002',
    title: 'MATERIAL_ALCHEMY',
    subtitle: 'Transforming base materials into gold',
    category: 'MATERIAL',
    status: 'ONGOING',
    description: 'Chemical and physical manipulation of textiles to create unprecedented textures and properties.',
    techniques: [
      {
        id: 'TECH_003',
        name: 'Thermal Restructuring',
        description: 'Using extreme heat to alter molecular structure',
        process: [
          'Pre-treat with stabilizer',
          'Apply controlled heat (800°C)',
          'Rapid cooling in nitrogen',
          'Observe transformation'
        ],
        materials: ['Synthetic polymers', 'Metal fibers', 'Ceramic coating'],
        difficulty: 5
      },
      {
        id: 'TECH_004',
        name: 'Acid Erosion',
        description: 'Controlled destruction through chemical processes',
        process: [
          'Map erosion zones',
          'Apply acid in layers',
          'Neutralize at precise moments',
          'Document decay patterns'
        ],
        materials: ['Natural fibers', 'Protective barriers', 'Various acids'],
        difficulty: 4
      }
    ],
    discoveries: [
      'Heat creates memory in fabrics',
      'Destruction is a form of creation',
      'Chemistry is fashion'
    ],
    failures: [
      'Complete dissolution of sample 7',
      'Toxic fume generation',
      'Uncontrolled reactions'
    ],
    dateStarted: '2024-03-01',
    lastModified: '2024-12-28'
  },
  {
    id: 'EXP_003',
    title: 'DIMENSIONAL_CONSTRUCTION',
    subtitle: 'Building in the fourth dimension',
    category: 'STRUCTURE',
    status: 'COMPLETED',
    description: 'Creating garments that exist in multiple dimensions simultaneously through innovative construction techniques.',
    techniques: [
      {
        id: 'TECH_005',
        name: 'Möbius Strip Integration',
        description: 'Garments with no beginning or end',
        process: [
          'Create continuous surface',
          'Twist at calculated points',
          'Join seamlessly',
          'Test wearability'
        ],
        materials: ['Bias-cut fabrics', 'Elastic interfaces', 'Mathematical models'],
        difficulty: 3
      },
      {
        id: 'TECH_006',
        name: 'Time-Based Construction',
        description: 'Garments that change over time',
        process: [
          'Layer temporal materials',
          'Program degradation',
          'Document evolution',
          'Archive stages'
        ],
        materials: ['Biodegradable threads', 'pH-sensitive dyes', 'Living organisms'],
        difficulty: 5
      }
    ],
    discoveries: [
      'Fashion can be non-Euclidean',
      'Time is a design element',
      'Garments can evolve'
    ],
    failures: [
      'Wearer trapped in Möbius loop',
      'Premature degradation',
      'Dimensional instability'
    ],
    dateStarted: '2023-11-01',
    lastModified: '2024-08-15'
  },
  {
    id: 'EXP_004',
    title: 'ZERO_WASTE_CHAOS',
    subtitle: 'Perfection through imperfection',
    category: 'TECHNIQUE',
    status: 'ACTIVE',
    description: 'Achieving zero waste through embracing chaos theory and random pattern generation.',
    techniques: [
      {
        id: 'TECH_007',
        name: 'Algorithmic Pattern Generation',
        description: 'Computer-generated patterns based on chaos mathematics',
        process: [
          'Input fabric dimensions',
          'Run chaos algorithm',
          'Generate cutting plan',
          'Execute without waste'
        ],
        materials: ['Any fabric', 'Computer', 'Precision cutting tools'],
        difficulty: 4
      },
      {
        id: 'TECH_008',
        name: 'Puzzle Construction',
        description: 'Every piece fits somewhere',
        process: [
          'Cut random shapes',
          'Find connections',
          'Build garment like puzzle',
          'No piece left behind'
        ],
        materials: ['Fabric scraps', 'Interfacing', 'Patience'],
        difficulty: 3
      }
    ],
    discoveries: [
      'Chaos creates order',
      'Waste is a choice',
      'Random can be beautiful'
    ],
    failures: [
      'Unwearable puzzle pieces',
      'Algorithm created infinite loop',
      'Human error in execution'
    ],
    dateStarted: '2024-06-01',
    lastModified: '2024-12-28'
  },
  {
    id: 'EXP_005',
    title: 'BIOLOGICAL_INTEGRATION',
    subtitle: 'Living fashion',
    category: 'PROCESS',
    status: 'ACTIVE',
    description: 'Incorporating living organisms and biological processes into garment creation and evolution.',
    techniques: [
      {
        id: 'TECH_009',
        name: 'Bacterial Dyeing',
        description: 'Using bacteria to create unique color patterns',
        process: [
          'Cultivate specific bacteria',
          'Apply to fabric substrate',
          'Control growth conditions',
          'Fix colors permanently'
        ],
        materials: ['Bacteria cultures', 'Nutrient medium', 'Natural fabrics'],
        difficulty: 5
      },
      {
        id: 'TECH_010',
        name: 'Mycelium Growing',
        description: 'Growing garments from mushroom roots',
        process: [
          'Prepare growth substrate',
          'Inoculate with mycelium',
          'Shape during growth',
          'Harvest and preserve'
        ],
        materials: ['Mycelium spores', 'Growth medium', 'Molds'],
        difficulty: 5
      }
    ],
    discoveries: [
      'Fashion can be alive',
      'Biology is the future',
      'Growth is design'
    ],
    failures: [
      'Contamination of cultures',
      'Uncontrolled growth',
      'Decomposition of final pieces'
    ],
    dateStarted: '2024-09-01',
    lastModified: '2024-12-28'
  }
]

export function getExperimentById(id: string): Experiment | undefined {
  return experiments.find(e => e.id === id)
}

export function getActiveExperiments(): Experiment[] {
  return experiments.filter(e => e.status === 'ACTIVE' || e.status === 'ONGOING')
}

export function getExperimentsByCategory(category: Experiment['category']): Experiment[] {
  return experiments.filter(e => e.category === category)
}

export function getTechniques(): Technique[] {
  return experiments.flatMap(e => e.techniques)
}