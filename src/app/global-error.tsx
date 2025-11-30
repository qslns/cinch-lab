'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Georgia, serif',
            backgroundColor: '#FAFAFA',
            color: '#0A0A0A',
            padding: '24px',
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '500px' }}>
            {/* Label */}
            <p
              style={{
                fontFamily: 'Consolas, monospace',
                fontSize: '10px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#7A7A7A',
                marginBottom: '24px',
              }}
            >
              Critical Error
            </p>

            {/* Title */}
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                fontWeight: 300,
                lineHeight: 0.95,
                marginBottom: '32px',
              }}
            >
              <span style={{ display: 'block', transform: 'rotate(-0.5deg)' }}>
                Something
              </span>
              <span style={{ display: 'block', transform: 'rotate(0.3deg)', marginLeft: '8%' }}>
                Broke
              </span>
            </h1>

            {/* Divider */}
            <div
              style={{
                width: '48px',
                height: '1px',
                backgroundColor: '#D4D4D4',
                margin: '0 auto 32px',
              }}
            />

            {/* Description */}
            <p
              style={{
                fontSize: '16px',
                lineHeight: 1.6,
                color: '#4A4A4A',
                marginBottom: '48px',
              }}
            >
              A critical error occurred. Please try refreshing the page or return to the homepage.
            </p>

            {/* Actions */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                alignItems: 'center',
              }}
            >
              <button
                onClick={reset}
                style={{
                  padding: '16px 32px',
                  backgroundColor: '#0A0A0A',
                  color: '#FAFAFA',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'Consolas, monospace',
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
              >
                Try Again
              </button>
              <a
                href="/"
                style={{
                  padding: '16px 32px',
                  backgroundColor: 'transparent',
                  color: '#0A0A0A',
                  border: '1px solid #0A0A0A',
                  textDecoration: 'none',
                  fontFamily: 'Consolas, monospace',
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
              >
                Go Home
              </a>
            </div>

            {/* Footer */}
            <p
              style={{
                marginTop: '64px',
                fontFamily: 'Consolas, monospace',
                fontSize: '10px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#7A7A7A',
              }}
            >
              THE YON — Beyond Fashion
            </p>
          </div>
        </div>
      </body>
    </html>
  )
}
