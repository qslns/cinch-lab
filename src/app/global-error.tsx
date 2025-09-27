'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'monospace',
          backgroundColor: '#f5f5f5'
        }}>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>CRITICAL ERROR</h1>
            <p style={{ marginBottom: '2rem', color: '#666' }}>
              System failure. Reconstruction required.
            </p>
            <button
              onClick={reset}
              style={{
                padding: '1rem 2rem',
                backgroundColor: '#000',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold',
                letterSpacing: '0.1em'
              }}
            >
              RESET SYSTEM
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}