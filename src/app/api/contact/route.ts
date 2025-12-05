import { NextRequest, NextResponse } from 'next/server'

// Efficient Rate Limiter with automatic cleanup
class RateLimiter {
  private store = new Map<string, { count: number; resetTime: number }>()
  private readonly window: number
  private readonly limit: number

  constructor(window: number, limit: number) {
    this.window = window
    this.limit = limit
  }

  check(key: string): boolean {
    const now = Date.now()
    const record = this.store.get(key)

    if (!record || now > record.resetTime) {
      this.store.set(key, { count: 1, resetTime: now + this.window })
      return true
    }

    if (record.count < this.limit) {
      record.count++
      return true
    }

    return false
  }

  cleanup(): void {
    const now = Date.now()
    for (const [key, value] of this.store.entries()) {
      if (now > value.resetTime) {
        this.store.delete(key)
      }
    }
  }
}

const rateLimiter = new RateLimiter(60 * 1000, 3)

// Cleanup every 5 minutes
if (typeof globalThis !== 'undefined' && !('_rateLimiterCleanup' in globalThis)) {
  setInterval(() => rateLimiter.cleanup(), 5 * 60 * 1000)
  ;(globalThis as Record<string, unknown>)._rateLimiterCleanup = true
}

// Allowed origins (Set for O(1) lookup)
const ALLOWED_ORIGINS = new Set([
  'https://theyon.vercel.app',
  'http://localhost:3000',
  'http://localhost:3001',
])

// Valid inquiry types (Set for O(1) lookup)
const VALID_TYPES = new Set(['collaboration', 'press', 'exhibition', 'general'])

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

interface ContactFormData {
  name: string
  email: string
  type: string
  message: string
  website?: string // Honeypot
}

function validateEmail(email: string): boolean {
  return EMAIL_REGEX.test(email) && email.length <= 254
}

function sanitizeInput(input: string, maxLength = 5000): string {
  return input
    .trim()
    .replace(/<[^>]*>/g, '')
    .replace(/[\x00-\x1F\x7F]/g, '')
    .slice(0, maxLength)
}

function hashIP(ip: string): string {
  let hash = 0
  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(16).slice(0, 12)
}

export async function POST(request: NextRequest) {
  try {
    // 1. Origin check
    const origin = request.headers.get('origin')
    if (origin && !ALLOWED_ORIGINS.has(origin)) {
      return NextResponse.json(
        { error: 'Invalid request origin.' },
        { status: 403 }
      )
    }

    // 2. Get and hash client IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
               request.headers.get('x-real-ip')?.trim() ||
               request.headers.get('cf-connecting-ip')?.trim() ||
               'unknown'
    const hashedIp = hashIP(ip)

    // 3. Rate limit check
    if (!rateLimiter.check(hashedIp)) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        {
          status: 429,
          headers: { 'Retry-After': '60' }
        }
      )
    }

    // 4. Parse body
    let body: ContactFormData
    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        { error: 'Invalid request body.' },
        { status: 400 }
      )
    }

    // 5. Honeypot check (silent reject)
    if (body.website) {
      return NextResponse.json(
        { success: true, message: 'Message sent successfully.' },
        { status: 200 }
      )
    }

    // 6. Required fields
    if (!body.name?.trim() || !body.email?.trim() || !body.type?.trim() || !body.message?.trim()) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      )
    }

    // 7. Sanitize
    const sanitized = {
      name: sanitizeInput(body.name, 100),
      email: sanitizeInput(body.email, 254),
      type: sanitizeInput(body.type, 50),
      message: sanitizeInput(body.message, 5000),
    }

    // 8. Validate
    if (sanitized.name.length < 2) {
      return NextResponse.json(
        { error: 'Name must be at least 2 characters.' },
        { status: 400 }
      )
    }

    if (!validateEmail(sanitized.email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      )
    }

    if (!VALID_TYPES.has(sanitized.type)) {
      return NextResponse.json(
        { error: 'Invalid inquiry type.' },
        { status: 400 }
      )
    }

    if (sanitized.message.length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters.' },
        { status: 400 }
      )
    }

    // 9. Log in production
    if (process.env.NODE_ENV === 'production') {
      console.log(`[CONTACT] ${sanitized.type} from ${sanitized.email}`)
    }

    // TODO: Integrate with email service (Resend, SendGrid, etc.)

    return NextResponse.json(
      { success: true, message: 'Message sent successfully.' },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store',
          'X-Content-Type-Options': 'nosniff',
        }
      }
    )
  } catch (error) {
    console.error('[CONTACT_ERROR]', error)
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin')

  if (!origin || !ALLOWED_ORIGINS.has(origin)) {
    return new NextResponse(null, { status: 403 })
  }

  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  })
}
