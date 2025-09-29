'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

// ==========================================================================
// CONTACT PAGE - Minimal CDG Aesthetic
// Asymmetric Form Layout × Professional Tone
// ==========================================================================

export default function ContactPage() {
  const [formData, setFormData] = useState({
    type: 'COLLABORATION',
    name: '',
    email: '',
    organization: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const inquiryTypes = [
    { value: 'COLLABORATION', label: 'Creative Collaboration' },
    { value: 'EXHIBITION', label: 'Exhibition Request' },
    { value: 'RESEARCH', label: 'Research Partnership' },
    { value: 'PRESS', label: 'Press Inquiry' },
    { value: 'OTHER', label: 'Other' }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTimeout(() => {
      setIsSubmitted(true)
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div style={{
      backgroundColor: 'var(--zone-contact-surface)',
      minHeight: '100vh'
    }}>

      {/* ==========================================================================
         HEADER - CDG Minimal
         ========================================================================== */}

      <header className="cdg-grid" style={{ padding: '8rem 2rem 4rem', position: 'relative' }}>

        {/* Number Tag */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-number-tag"
          style={{
            position: 'absolute',
            top: '2rem',
            right: '2rem',
            transform: 'rotate(-4deg)',
            fontSize: 'var(--type-xl)',
            color: 'var(--zone-contact-accent-1)'
          }}
        >
          005
        </motion.div>

        {/* Title - CDG Item 1 */}
        <motion.div
          className="cdg-grid-item-1"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-cdg-black" style={{
            color: 'var(--zone-contact-contrast)',
            lineHeight: '0.85',
            marginBottom: 'var(--space-21)',
            fontSize: 'clamp(var(--type-6xl), 12vw, var(--type-9xl))'
          }}>
            CONT
            <br />
            <span style={{ color: 'var(--zone-contact-accent-1)' }}>ACT</span>
          </h1>
        </motion.div>

        {/* Subtitle - CDG Item 2 */}
        <motion.div
          className="cdg-grid-item-2"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{
            backgroundColor: 'var(--margiela-paper)',
            padding: 'var(--space-34)',
            border: '2px solid var(--zone-contact-accent-2)',
            transform: 'rotate(-1deg)'
          }}
        >
          <div className="text-white-label" style={{ marginBottom: 'var(--space-8)' }}>
            PROFESSIONAL INQUIRIES ONLY
          </div>

          <p className="text-heading-5" style={{
            color: 'var(--margiela-graphite)',
            fontWeight: 'var(--font-weight-light)',
            lineHeight: 'var(--leading-relaxed)',
            marginBottom: 'var(--space-13)'
          }}>
            For collaboration, exhibition, and research inquiries.
            <br />
            We do not sell products.
          </p>

          <div style={{
            backgroundColor: 'var(--cdg-blood-red)',
            color: 'white',
            padding: 'var(--space-8)',
            marginTop: 'var(--space-13)'
          }}>
            <p className="text-body-small" style={{ color: 'white' }}>
              Note: Commercial product requests will not receive responses.
              This laboratory exists for experimentation, not commerce.
            </p>
          </div>
        </motion.div>
      </header>

      {/* ==========================================================================
         FORM SECTION - Broken Grid with Asymmetric Fields
         ========================================================================== */}

      <section style={{ padding: '4rem 2rem 8rem' }}>

        {!isSubmitted ? (
          <motion.form
            onSubmit={handleSubmit}
            className="broken-symmetry-right"
            style={{
              maxWidth: '1400px',
              margin: '0 auto',
              gap: 'var(--space-55)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Left Column - Type & Organization */}
            <div style={{
              display: 'grid',
              gap: 'var(--space-21)',
              transform: 'rotate(-0.8deg)'
            }}>
              {/* Inquiry Type */}
              <div>
                <label className="text-label" style={{
                  color: 'var(--zone-contact-accent-1)',
                  display: 'block',
                  marginBottom: 'var(--space-5)'
                }}>
                  INQUIRY TYPE
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: 'var(--space-8)',
                    backgroundColor: 'transparent',
                    border: '2px solid var(--zone-contact-accent-2)',
                    color: 'var(--margiela-graphite)',
                    fontSize: 'var(--type-base)',
                    fontFamily: 'inherit',
                    outline: 'none',
                    transition: 'border-color var(--duration-normal)'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--zone-contact-primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--zone-contact-accent-2)'}
                >
                  {inquiryTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Organization */}
              <div>
                <label className="text-label" style={{
                  color: 'var(--zone-contact-accent-1)',
                  display: 'block',
                  marginBottom: 'var(--space-5)'
                }}>
                  ORGANIZATION / INSTITUTION
                </label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: 'var(--space-8)',
                    backgroundColor: 'transparent',
                    border: '2px solid var(--zone-contact-accent-2)',
                    color: 'var(--margiela-graphite)',
                    fontSize: 'var(--type-base)',
                    fontFamily: 'inherit',
                    outline: 'none',
                    transition: 'border-color var(--duration-normal)'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--zone-contact-primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--zone-contact-accent-2)'}
                />
              </div>

              {/* Info Box */}
              <div style={{
                backgroundColor: 'var(--zone-contact-primary)',
                color: 'var(--zone-contact-accent-1)',
                padding: 'var(--space-21)',
                transform: 'rotate(1deg)'
              }}>
                <p className="text-label" style={{
                  color: 'var(--zone-contact-accent-1)',
                  marginBottom: 'var(--space-8)'
                }}>
                  RESPONSE TIME
                </p>
                <p className="text-body" style={{ color: 'var(--zone-contact-accent-1)' }}>
                  5-7 business days
                  <br />
                  High-resolution images available upon request
                </p>
              </div>
            </div>

            {/* Right Column - Contact Info & Message */}
            <div style={{
              display: 'grid',
              gap: 'var(--space-21)',
              transform: 'rotate(0.5deg)'
            }}>
              {/* Name */}
              <div>
                <label className="text-label" style={{
                  color: 'var(--zone-contact-accent-1)',
                  display: 'block',
                  marginBottom: 'var(--space-5)'
                }}>
                  NAME
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: 'var(--space-8)',
                    backgroundColor: 'transparent',
                    border: '2px solid var(--zone-contact-accent-2)',
                    color: 'var(--margiela-graphite)',
                    fontSize: 'var(--type-base)',
                    fontFamily: 'inherit',
                    outline: 'none',
                    transition: 'border-color var(--duration-normal)'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--zone-contact-primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--zone-contact-accent-2)'}
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-label" style={{
                  color: 'var(--zone-contact-accent-1)',
                  display: 'block',
                  marginBottom: 'var(--space-5)'
                }}>
                  EMAIL
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: 'var(--space-8)',
                    backgroundColor: 'transparent',
                    border: '2px solid var(--zone-contact-accent-2)',
                    color: 'var(--margiela-graphite)',
                    fontSize: 'var(--type-base)',
                    fontFamily: 'inherit',
                    outline: 'none',
                    transition: 'border-color var(--duration-normal)'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--zone-contact-primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--zone-contact-accent-2)'}
                />
              </div>

              {/* Message */}
              <div>
                <label className="text-label" style={{
                  color: 'var(--zone-contact-accent-1)',
                  display: 'block',
                  marginBottom: 'var(--space-5)'
                }}>
                  MESSAGE
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={8}
                  style={{
                    width: '100%',
                    padding: 'var(--space-8)',
                    backgroundColor: 'transparent',
                    border: '2px solid var(--zone-contact-accent-2)',
                    color: 'var(--margiela-graphite)',
                    fontSize: 'var(--type-base)',
                    fontFamily: 'inherit',
                    outline: 'none',
                    resize: 'vertical',
                    transition: 'border-color var(--duration-normal)'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--zone-contact-primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--zone-contact-accent-2)'}
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 0.98 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: '100%',
                  padding: 'var(--space-13)',
                  backgroundColor: 'var(--zone-contact-primary)',
                  color: 'var(--zone-contact-accent-1)',
                  border: '2px solid var(--zone-contact-primary)',
                  fontSize: 'var(--type-base)',
                  fontWeight: 'var(--font-weight-bold)',
                  letterSpacing: 'var(--tracking-wider)',
                  cursor: 'pointer',
                  transition: 'all var(--duration-normal)',
                  textTransform: 'uppercase'
                }}
              >
                Submit Inquiry
              </motion.button>
            </div>
          </motion.form>

        ) : (
          /* Success State */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              maxWidth: '800px',
              margin: '0 auto',
              textAlign: 'center',
              padding: 'var(--space-55)',
              backgroundColor: 'var(--margiela-snow)',
              border: '4px solid var(--lab-reaction-green)',
              transform: 'rotate(-1deg)'
            }}
          >
            <div style={{
              width: '80px',
              height: '80px',
              backgroundColor: 'var(--lab-reaction-green)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto var(--space-21)'
            }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2 className="text-display-3" style={{
              color: 'var(--margiela-void)',
              marginBottom: 'var(--space-13)'
            }}>
              Inquiry Received
            </h2>

            <p className="text-body" style={{
              color: 'var(--margiela-steel)',
              marginBottom: 'var(--space-21)'
            }}>
              We will review your submission and respond if appropriate.
              Commercial requests will not receive responses.
            </p>

            <div className="text-white-label" style={{ display: 'inline-block' }}>
              RESPONSE WITHIN 5-7 DAYS
            </div>
          </motion.div>
        )}
      </section>

      {/* ==========================================================================
         CONTACT INFORMATION - Sacai Grid
         ========================================================================== */}

      <section className="sacai-grid" style={{ padding: '8rem 2rem' }}>
        <div className="sacai-grid-layer-1">
          <span className="text-number-tag">006</span>
          <h2 className="text-display-3" style={{
            color: 'var(--margiela-void)',
            marginTop: 'var(--space-8)',
            marginBottom: 'var(--space-13)'
          }}>
            Direct Contact
          </h2>
          <div style={{ display: 'grid', gap: 'var(--space-13)' }}>
            <div>
              <p className="text-label" style={{
                color: 'var(--zone-contact-accent-1)',
                marginBottom: 'var(--space-3)'
              }}>
                GENERAL INQUIRIES
              </p>
              <p className="text-body" style={{ color: 'var(--margiela-graphite)' }}>
                inquiries@cinchlab.com
              </p>
            </div>
            <div>
              <p className="text-label" style={{
                color: 'var(--zone-contact-accent-1)',
                marginBottom: 'var(--space-3)'
              }}>
                PRESS
              </p>
              <p className="text-body" style={{ color: 'var(--margiela-graphite)' }}>
                press@cinchlab.com
              </p>
            </div>
          </div>
        </div>

        <div className="sacai-grid-layer-2" style={{
          backgroundColor: 'var(--zone-contact-primary)',
          color: 'var(--zone-contact-accent-1)'
        }}>
          <p className="text-label" style={{
            color: 'var(--zone-contact-accent-1)',
            marginBottom: 'var(--space-8)'
          }}>
            LOCATION
          </p>
          <p className="text-heading-5" style={{
            color: 'var(--zone-contact-accent-1)',
            fontWeight: 'var(--font-weight-regular)'
          }}>
            Seoul, South Korea
            <br />
            <span className="text-body" style={{ color: 'var(--zone-contact-accent-1)' }}>
              Laboratory visits by appointment
            </span>
          </p>
        </div>

        <div className="sacai-grid-layer-3" style={{
          backgroundColor: 'var(--zone-contact-accent-1)',
          color: 'var(--margiela-graphite)'
        }}>
          <p className="text-heading-6" style={{ color: 'var(--margiela-graphite)' }}>
            COLLABORATION
            <br />
            NOT SALES
          </p>
        </div>
      </section>

      {/* ==========================================================================
         FOOTER
         ========================================================================== */}

      <footer style={{
        padding: 'var(--space-34) var(--space-21)',
        borderTop: '2px solid var(--zone-contact-accent-2)',
        textAlign: 'center',
        backgroundColor: 'var(--margiela-void)',
        color: 'white'
      }}>
        <p className="text-label" style={{ color: 'var(--zone-contact-accent-1)' }}>
          CINCH LAB • PROFESSIONAL INQUIRIES ONLY • NO COMMERCE
        </p>
      </footer>
    </div>
  )
}