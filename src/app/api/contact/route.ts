import { NextRequest, NextResponse } from 'next/server'

// Rate limiting: simple in-memory store (use Redis in production)
const submissions = new Map<string, number[]>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_SUBMISSIONS = 3 // Max 3 submissions per minute

interface ContactFormData {
  name: string
  email: string
  type: string
  message: string
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .slice(0, 5000) // Limit length
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowStart = now - RATE_LIMIT_WINDOW

  // Get previous submissions for this IP
  const ipSubmissions = submissions.get(ip) || []

  // Filter to only recent submissions
  const recentSubmissions = ipSubmissions.filter(time => time > windowStart)

  // Update the store
  submissions.set(ip, recentSubmissions)

  // Check if under limit
  return recentSubmissions.length < MAX_SUBMISSIONS
}

function recordSubmission(ip: string): void {
  const ipSubmissions = submissions.get(ip) || []
  ipSubmissions.push(Date.now())
  submissions.set(ip, ipSubmissions)
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
               request.headers.get('x-real-ip') ||
               'unknown'

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      )
    }

    // Parse request body
    const body: ContactFormData = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.type || !body.message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      )
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(body.name),
      email: sanitizeInput(body.email),
      type: sanitizeInput(body.type),
      message: sanitizeInput(body.message),
    }

    // Validate email format
    if (!validateEmail(sanitizedData.email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      )
    }

    // Validate inquiry type
    const validTypes = ['collaboration', 'press', 'exhibition', 'general']
    if (!validTypes.includes(sanitizedData.type)) {
      return NextResponse.json(
        { error: 'Invalid inquiry type.' },
        { status: 400 }
      )
    }

    // Validate minimum lengths
    if (sanitizedData.name.length < 2) {
      return NextResponse.json(
        { error: 'Name must be at least 2 characters.' },
        { status: 400 }
      )
    }

    if (sanitizedData.message.length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters.' },
        { status: 400 }
      )
    }

    // Record submission for rate limiting
    recordSubmission(ip)

    // Log submission (in production, send email or save to database)
    console.log('Contact form submission:', {
      ...sanitizedData,
      timestamp: new Date().toISOString(),
      ip: ip.slice(0, 10) + '***', // Partially mask IP for privacy
    })

    // TODO: Integrate with email service (e.g., Resend, SendGrid, Nodemailer)
    // await sendEmail({
    //   to: 'hello@theyon.com',
    //   subject: `New ${sanitizedData.type} inquiry from ${sanitizedData.name}`,
    //   body: sanitizedData.message,
    //   replyTo: sanitizedData.email,
    // })

    return NextResponse.json(
      { success: true, message: 'Message sent successfully.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    )
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}
