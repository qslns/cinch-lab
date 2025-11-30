import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 320,
          background: '#0A0A0A',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FAFAFA',
          fontFamily: 'Georgia, serif',
          fontWeight: 300,
          letterSpacing: '-0.02em',
        }}
      >
        Y
      </div>
    ),
    {
      width: 512,
      height: 512,
    }
  )
}
