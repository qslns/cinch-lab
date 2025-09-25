'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import gsap from 'gsap'
import CipherText from '@/components/CipherText'

// Communication Channels
const channels = [
  {
    id: 'CH_001',
    protocol: 'ENCRYPTED_EMAIL',
    frequency: '256-BIT',
    address: 'lab@cinch.secure',
    status: 'SECURE',
    encryption: 'AES-256',
    responseTime: '&lt; 24H'
  },
  {
    id: 'CH_002',
    protocol: 'QUANTUM_RELAY',
    frequency: 'Q-BAND',
    address: '@cinch.quantum',
    status: 'EXPERIMENTAL',
    encryption: 'QUANTUM',
    responseTime: 'INSTANT'
  },
  {
    id: 'CH_003',
    protocol: 'NEURAL_LINK',
    frequency: 'SYNAPTIC',
    address: 'mind.cinch.lab',
    status: 'BETA',
    encryption: 'NEURAL',
    responseTime: 'VARIABLE'
  }
]

// Laboratory Locations
const facilities = [
  {
    designation: 'SITE_ALPHA',
    location: 'NEW YORK',
    coordinates: '40.7128°N, 74.0060°W',
    clearance: 'LEVEL_5',
    status: 'OPERATIONAL',
    hazardLevel: 3,
    specialization: 'FABRIC_RESEARCH'
  },
  {
    designation: 'SITE_BETA',
    location: 'TOKYO',
    coordinates: '35.6762°N, 139.6503°E',
    clearance: 'LEVEL_4',
    status: 'RESTRICTED',
    hazardLevel: 4,
    specialization: 'TEMPORAL_STUDIES'
  },
  {
    designation: 'SITE_GAMMA',
    location: 'LONDON',
    coordinates: '51.5074°N, 0.1278°W',
    clearance: 'LEVEL_3',
    status: 'MAINTENANCE',
    hazardLevel: 2,
    specialization: 'PATTERN_ANALYSIS'
  },
  {
    designation: 'SITE_DELTA',
    location: '[CLASSIFIED]',
    coordinates: '[REDACTED]',
    clearance: 'LEVEL_10',
    status: 'UNKNOWN',
    hazardLevel: 5,
    specialization: '[DATA_EXPUNGED]'
  }
]

// Message Types
const messageTypes = [
  { code: 'INQ_001', type: 'GENERAL_INQUIRY', priority: 'LOW', processing: 'AUTOMATED' },
  { code: 'COL_002', type: 'COLLABORATION', priority: 'MEDIUM', processing: 'MANUAL' },
  { code: 'URG_003', type: 'URGENT_MATTER', priority: 'HIGH', processing: 'IMMEDIATE' },
  { code: 'EXP_004', type: 'EXPERIMENT_ACCESS', priority: 'CRITICAL', processing: 'CLEARANCE_REQUIRED' },
  { code: 'BUG_005', type: 'ANOMALY_REPORT', priority: 'VARIABLE', processing: 'INVESTIGATION' }
]

export default function BrutalistContactPage() {
  const [activeChannel, setActiveChannel] = useState<string | null>(null)
  const [selectedFacility, setSelectedFacility] = useState<string | null>(null)
  const [terminalInput, setTerminalInput] = useState('')
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    'COMMUNICATION_TERMINAL_V3.2.1',
    'INITIALIZING_SECURE_CHANNELS...',
    'ENCRYPTION_PROTOCOLS_LOADED',
    'READY_FOR_TRANSMISSION'
  ])
  const [messageType, setMessageType] = useState('INQ_001')
  const [securityLevel, setSecurityLevel] = useState(1)
  const [transmitting, setTransmitting] = useState(false)
  const [scanlines, setScanlines] = useState(true)
  const [glitchActive, setGlitchActive] = useState(false)
  const [systemWarning, setSystemWarning] = useState<string | null>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Random system warnings
  useEffect(() => {
    const warningTimer = setInterval(() => {
      if (Math.random() > 0.85) {
        const warnings = [
          'SIGNAL_INTERFERENCE_DETECTED',
          'RECALIBRATING_ANTENNA_ARRAY',
          'QUANTUM_ENTANGLEMENT_UNSTABLE',
          'FIREWALL_BREACH_ATTEMPT_BLOCKED',
          'TEMPORAL_DELAY_IN_SECTOR_7'
        ]
        const warning = warnings[Math.floor(Math.random() * warnings.length)]
        setSystemWarning(warning)
        setGlitchActive(true)
        setTimeout(() => {
          setSystemWarning(null)
          setGlitchActive(false)
        }, 2000)
      }
    }, 4000)

    return () => clearInterval(warningTimer)
  }, [])

  // Terminal command processing
  const processCommand = (command: string) => {
    const cmd = command.toUpperCase()
    let response = ''

    if (cmd === 'HELP') {
      response = 'AVAILABLE_COMMANDS: HELP, STATUS, CHANNELS, FACILITIES, SEND, CLEAR, ENCRYPT'
    } else if (cmd === 'STATUS') {
      response = `SYSTEM_STATUS: OPERATIONAL | UPTIME: ${Math.floor(Math.random() * 9999)}H | PACKETS_SENT: ${Math.floor(Math.random() * 999999)}`
    } else if (cmd === 'CHANNELS') {
      response = 'LISTING_COMMUNICATION_CHANNELS...\n' + channels.map(ch => `${ch.id}: ${ch.protocol} [${ch.status}]`).join('\n')
    } else if (cmd === 'FACILITIES') {
      response = 'ACCESSING_FACILITY_DATABASE...\n' + facilities.map(f => `${f.designation}: ${f.location} [CLEARANCE: ${f.clearance}]`).join('\n')
    } else if (cmd === 'CLEAR') {
      setTerminalHistory(['TERMINAL_CLEARED', 'READY_FOR_INPUT'])
      return
    } else if (cmd.startsWith('SEND')) {
      response = 'INITIATING_TRANSMISSION_PROTOCOL...'
      setTransmitting(true)
      setTimeout(() => {
        setTerminalHistory(prev => [...prev, 'TRANSMISSION_COMPLETE', 'MESSAGE_ID: ' + Math.random().toString(36).substr(2, 9).toUpperCase()])
        setTransmitting(false)
      }, 2000)
    } else if (cmd === 'ENCRYPT') {
      response = `ENCRYPTION_KEY_GENERATED: ${Math.random().toString(36).substr(2, 16).toUpperCase()}`
    } else {
      response = `COMMAND_NOT_RECOGNIZED: ${cmd}`
    }

    if (response) {
      setTerminalHistory(prev => [...prev, `> ${command}`, response])
    }
  }

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (terminalInput.trim()) {
      processCommand(terminalInput)
      setTerminalInput('')
    }
  }

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.channel-card', {
        x: -100,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power4.out'
      })
      gsap.from('.facility-card', {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power4.out',
        delay: 0.3
      })
    })
    return () => ctx.revert()
  }, [])

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [terminalHistory])

  return (
    <div className="min-h-screen bg-paper-white relative">
      {/* Background Effects */}
      <div className="fixed inset-0 scientific-grid opacity-10 pointer-events-none" />
      {glitchActive && <div className="fixed inset-0 noise-overlay" />}
      {scanlines && <div className="fixed inset-0 scan-lines pointer-events-none" />}

      {/* System Warning */}
      <AnimatePresence>
        {systemWarning && (
          <motion.div
            className="fixed top-20 left-0 right-0 z-50 bg-warning-yellow text-carbon-black py-2 px-8"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold">⚠ {systemWarning}</span>
              <span className="text-[10px] opacity-60">CODE: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <section className="pt-24 pb-12 px-8 border-b-3 border-carbon-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-[clamp(60px,8vw,120px)] font-black brutalist-heading leading-[0.8]">
                <CipherText text="COMM" /><br />
                <span className="text-safety-orange"><CipherText text="LINK" /></span>
              </h1>
              <p className="text-xs font-mono mt-4 opacity-60">
                SECURE_TRANSMISSION_PROTOCOLS_ENGAGED
              </p>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-mono space-y-1">
                <div>SIGNAL: {Math.floor(Math.random() * 30 + 70)}%</div>
                <div>LATENCY: {Math.floor(Math.random() * 50 + 10)}ms</div>
                <div>ENCRYPTION: AES-256</div>
                <div className={`${glitchActive ? 'text-glitch-red flicker' : 'text-hazmat-green'}`}>
                  STATUS: {glitchActive ? 'INTERFERENCE' : 'CLEAR'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Communication Channels */}
      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black mb-8">COMMUNICATION_CHANNELS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 bg-carbon-black p-2">

            {channels.map((channel) => (
              <motion.div
                key={channel.id}
                className="channel-card bg-white relative overflow-hidden group cursor-pointer"
                onMouseEnter={() => setActiveChannel(channel.id)}
                onMouseLeave={() => setActiveChannel(null)}
                whileHover={{ y: -8 }}
              >
                {/* Card Header */}
                <div className="p-6 border-b-3 border-carbon-black">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono opacity-60">{channel.id}</span>
                      <h3 className="text-2xl font-black mt-1">{channel.protocol}</h3>
                    </div>
                    <div className={`px-2 py-1 text-[10px] font-mono ${
                      channel.status === 'SECURE' ? 'bg-hazmat-green' :
                      channel.status === 'EXPERIMENTAL' ? 'bg-warning-yellow' :
                      'bg-centrifuge-blue'
                    } text-white`}>
                      {channel.status}
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <div className="space-y-3 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="opacity-60">FREQUENCY:</span>
                      <span>{channel.frequency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-60">ENCRYPTION:</span>
                      <span>{channel.encryption}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-60">RESPONSE:</span>
                      <span>{channel.responseTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-60">ADDRESS:</span>
                      <span className="text-safety-orange">{channel.address}</span>
                    </div>
                  </div>

                  <motion.button
                    className="w-full mt-6 py-2 bg-carbon-black text-white text-xs font-mono hover:bg-safety-orange transition-colors"
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setTerminalHistory(prev => [...prev, `CONNECTING_TO_${channel.id}...`, `CONNECTION_ESTABLISHED`])
                    }}
                  >
                    CONNECT →
                  </motion.button>
                </div>

                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 bg-safety-orange pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeChannel === channel.id ? 0.05 : 0 }}
                />
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* Laboratory Facilities */}
      <section className="py-16 px-8 bg-concrete-gray">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-white mb-8">FACILITY_LOCATIONS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {facilities.map((facility) => (
              <motion.div
                key={facility.designation}
                className="facility-card bg-white p-6 relative cursor-pointer group"
                onMouseEnter={() => setSelectedFacility(facility.designation)}
                onMouseLeave={() => setSelectedFacility(null)}
                whileHover={{ scale: 1.02 }}
              >
                {/* Clearance Badge */}
                <div className="absolute top-2 right-2">
                  <div className={`text-[10px] font-mono px-2 py-1 ${
                    facility.clearance === 'LEVEL_10' ? 'bg-carbon-black text-white' :
                    facility.clearance === 'LEVEL_5' ? 'bg-glitch-red text-white' :
                    'bg-concrete-gray text-white'
                  }`}>
                    {facility.clearance}
                  </div>
                </div>

                <h3 className="text-xs font-mono opacity-60 mb-2">{facility.designation}</h3>
                <p className="text-xl font-black mb-4">{facility.location}</p>

                <div className="space-y-2 text-[10px] font-mono">
                  <div className="flex justify-between">
                    <span className="opacity-60">COORDS:</span>
                    <span className="text-right">{facility.coordinates}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-60">STATUS:</span>
                    <span className={`${
                      facility.status === 'OPERATIONAL' ? 'text-hazmat-green' :
                      facility.status === 'RESTRICTED' ? 'text-safety-orange' :
                      facility.status === 'UNKNOWN' ? 'text-glitch-red' :
                      'text-warning-yellow'
                    }`}>
                      {facility.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-60">HAZARD:</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-1.5 ${
                            i < facility.hazardLevel
                              ? facility.hazardLevel > 3 ? 'bg-glitch-red' : 'bg-warning-yellow'
                              : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-60">RESEARCH:</span>
                    <span className="text-right text-[9px]">{facility.specialization}</span>
                  </div>
                </div>

                {/* Hover overlay */}
                <motion.div
                  className="absolute inset-0 bg-carbon-black pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: selectedFacility === facility.designation ? 0.05 : 0 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Message Transmission Interface */}
      <section className="py-16 px-8 bg-carbon-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-white mb-8">MESSAGE_TRANSMISSION</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Message Configuration */}
            <div className="bg-white p-8">
              <h3 className="text-xs font-mono mb-6">CONFIGURE_MESSAGE</h3>

              {/* Message Type Selector */}
              <div className="mb-8">
                <label className="text-[10px] font-mono opacity-60 block mb-2">MESSAGE_TYPE</label>
                <div className="grid grid-cols-2 gap-2">
                  {messageTypes.map(type => (
                    <button
                      key={type.code}
                      onClick={() => setMessageType(type.code)}
                      className={`p-3 text-[10px] font-mono border-2 transition-all ${
                        messageType === type.code
                          ? 'border-safety-orange bg-safety-orange text-white'
                          : 'border-carbon-black/20 hover:border-carbon-black'
                      }`}
                    >
                      <div>{type.code}</div>
                      <div className="text-[9px] mt-1 opacity-80">{type.type}</div>
                      <div className={`text-[8px] mt-1 ${
                        type.priority === 'CRITICAL' ? 'text-glitch-red' :
                        type.priority === 'HIGH' ? 'text-safety-orange' :
                        type.priority === 'MEDIUM' ? 'text-warning-yellow' :
                        'text-current opacity-60'
                      }`}>
                        PRIORITY: {type.priority}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Security Level */}
              <div className="mb-8">
                <label className="text-[10px] font-mono opacity-60 block mb-2">
                  SECURITY_CLEARANCE_LEVEL: {securityLevel}
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={securityLevel}
                    onChange={(e) => setSecurityLevel(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-[10px] font-mono opacity-40">PUBLIC</span>
                    <span className="text-[10px] font-mono opacity-40">CLASSIFIED</span>
                    <span className="text-[10px] font-mono opacity-40">TOP_SECRET</span>
                  </div>
                </div>
              </div>

              {/* Transmission Options */}
              <div className="space-y-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={scanlines}
                    onChange={(e) => setScanlines(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 border-2 border-carbon-black ${
                    scanlines ? 'bg-safety-orange' : 'bg-white'
                  }`} />
                  <span className="text-[10px] font-mono">ENABLE_SCAN_LINES</span>
                </label>

                <div className="text-[10px] font-mono space-y-2 opacity-60">
                  <div>BANDWIDTH: {Math.floor(Math.random() * 500 + 500)} MB/s</div>
                  <div>PACKET_LOSS: {Math.random().toFixed(3)}%</div>
                  <div>ENCRYPTION: {securityLevel > 5 ? 'QUANTUM' : 'AES-256'}</div>
                </div>
              </div>

              <motion.button
                className="w-full mt-6 py-3 bg-carbon-black text-white text-xs font-mono hover:bg-glitch-red transition-colors"
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setTransmitting(true)
                  setTerminalHistory(prev => [...prev,
                    'INITIATING_TRANSMISSION...',
                    `MESSAGE_TYPE: ${messageType}`,
                    `SECURITY_LEVEL: ${securityLevel}`,
                    'ESTABLISHING_SECURE_CHANNEL...',
                    'TRANSMITTING_DATA_PACKETS...'
                  ])
                  setTimeout(() => {
                    setTransmitting(false)
                    setTerminalHistory(prev => [...prev,
                      'TRANSMISSION_COMPLETE',
                      `MESSAGE_ID: ${Math.random().toString(36).substr(2, 12).toUpperCase()}`,
                      'AWAITING_RESPONSE...'
                    ])
                  }, 3000)
                }}
                disabled={transmitting}
              >
                {transmitting ? 'TRANSMITTING...' : 'INITIATE_TRANSMISSION'}
              </motion.button>
            </div>

            {/* Terminal Interface */}
            <div className="bg-black p-6 font-mono text-green-500">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs">TERMINAL_V3.2.1</span>
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                </div>
              </div>

              <div
                ref={terminalRef}
                className="h-64 overflow-y-auto mb-4 text-xs space-y-1"
              >
                {terminalHistory.map((line, index) => (
                  <div key={index} className="opacity-80">
                    {line.startsWith('>') ? (
                      <span className="text-white">{line}</span>
                    ) : line.includes('ERROR') || line.includes('FAILED') ? (
                      <span className="text-red-500">{line}</span>
                    ) : line.includes('SUCCESS') || line.includes('COMPLETE') ? (
                      <span className="text-green-400">{line}</span>
                    ) : (
                      <span>{line}</span>
                    )}
                  </div>
                ))}
                {transmitting && (
                  <div className="animate-pulse">TRANSMITTING{'.'.repeat((Date.now() / 500) % 4)}</div>
                )}
              </div>

              <form onSubmit={handleTerminalSubmit} className="flex gap-2">
                <span className="text-green-500">&gt;</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-white"
                  placeholder="ENTER_COMMAND"
                  disabled={transmitting}
                />
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Protocols */}
      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black mb-8">EMERGENCY_PROTOCOLS</h2>

          <div className="bg-glitch-red text-white p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xs font-mono mb-4">CODE_RED</h3>
                <p className="text-[10px] font-mono opacity-80">
                  SYSTEM_BREACH_DETECTED<br />
                  CONTACT: emergency@cinch.lab<br />
                  RESPONSE_TIME: IMMEDIATE
                </p>
              </div>
              <div>
                <h3 className="text-xs font-mono mb-4">CODE_YELLOW</h3>
                <p className="text-[10px] font-mono opacity-80">
                  ANOMALY_DETECTED<br />
                  CONTACT: support@cinch.lab<br />
                  RESPONSE_TIME: &lt; 1H
                </p>
              </div>
              <div>
                <h3 className="text-xs font-mono mb-4">CODE_GREEN</h3>
                <p className="text-[10px] font-mono opacity-80">
                  ROUTINE_MAINTENANCE<br />
                  CONTACT: info@cinch.lab<br />
                  RESPONSE_TIME: &lt; 24H
                </p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="text-[10px] font-mono opacity-60">
                EMERGENCY_HOTLINE: +1-800-CINCH-911 | AVAILABLE_24/7 | QUANTUM_ENCRYPTION_ENABLED
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Communication Statistics */}
      <section className="py-16 px-8 bg-paper-white border-t-3 border-carbon-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black mb-8">TRANSMISSION_ANALYTICS</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 border-2 border-carbon-black">
              <div className="text-3xl font-black mb-2">{Math.floor(Math.random() * 9000 + 1000)}</div>
              <div className="text-[10px] font-mono opacity-60">MESSAGES_TRANSMITTED</div>
            </div>
            <div className="bg-white p-6 border-2 border-carbon-black">
              <div className="text-3xl font-black mb-2">99.97%</div>
              <div className="text-[10px] font-mono opacity-60">DELIVERY_RATE</div>
            </div>
            <div className="bg-white p-6 border-2 border-carbon-black">
              <div className="text-3xl font-black mb-2">{Math.floor(Math.random() * 50 + 10)}ms</div>
              <div className="text-[10px] font-mono opacity-60">AVG_LATENCY</div>
            </div>
            <div className="bg-white p-6 border-2 border-carbon-black">
              <div className="text-3xl font-black mb-2">{Math.floor(Math.random() * 200 + 50)}</div>
              <div className="text-[10px] font-mono opacity-60">ACTIVE_CONNECTIONS</div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-carbon-black text-white">
            <div className="text-xs font-mono space-y-1">
              <div className="opacity-60">NETWORK_STATUS: OPERATIONAL</div>
              <div className="opacity-60">LAST_MAINTENANCE: {new Date(Date.now() - Math.random() * 86400000).toISOString()}</div>
              <div className="opacity-60">NEXT_SCHEDULED_UPDATE: {new Date(Date.now() + Math.random() * 864000000).toISOString()}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8 border-t-3 border-carbon-black bg-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p className="text-[10px] font-mono opacity-60">
            CINCH_LAB © 2025 — COMMUNICATION_DIVISION
          </p>
          <div className="flex gap-4 text-[10px] font-mono">
            <button
              onClick={() => setTerminalHistory(prev => [...prev, 'PING_SENT', `PONG_RECEIVED: ${Math.floor(Math.random() * 50 + 10)}ms`])}
              className="hover:text-safety-orange transition-colors"
            >
              PING_SERVER
            </button>
            <Link href="/" className="hover:text-safety-orange transition-colors">
              RETURN_HOME →
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}