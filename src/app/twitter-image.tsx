import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'THE YON - Beyond Fashion'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#FAFAFA',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Decorative large Y in background */}
        <div
          style={{
            position: 'absolute',
            top: '-10%',
            right: '5%',
            fontSize: 600,
            color: 'rgba(212, 212, 212, 0.3)',
            fontFamily: 'Georgia, serif',
            fontWeight: 300,
            lineHeight: 1,
          }}
        >
          Y
        </div>

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 10,
          }}
        >
          {/* Brand name */}
          <div
            style={{
              fontSize: 96,
              fontFamily: 'Georgia, serif',
              fontWeight: 300,
              color: '#0A0A0A',
              letterSpacing: '-0.02em',
              marginBottom: 24,
            }}
          >
            THE YON
          </div>

          {/* Divider */}
          <div
            style={{
              width: 80,
              height: 1,
              background: '#D4D4D4',
              marginBottom: 24,
            }}
          />

          {/* Tagline */}
          <div
            style={{
              fontSize: 18,
              fontFamily: 'monospace',
              fontWeight: 400,
              color: '#7A7A7A',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            Beyond Fashion
          </div>

          {/* Designer name */}
          <div
            style={{
              fontSize: 14,
              fontFamily: 'monospace',
              fontWeight: 400,
              color: '#B0B0B0',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginTop: 48,
            }}
          >
            By Taehyun Lee
          </div>
        </div>

        {/* Corner markers */}
        <div
          style={{
            position: 'absolute',
            top: 40,
            left: 40,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ width: 32, height: 1, background: '#D4D4D4' }} />
          <div style={{ width: 1, height: 32, background: '#D4D4D4' }} />
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            right: 40,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <div style={{ width: 32, height: 1, background: '#D4D4D4' }} />
          <div style={{ width: 1, height: 32, background: '#D4D4D4', marginTop: -32 }} />
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
