import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 12,
          background: '#0A0A0A',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FAFAFA',
          fontFamily: 'Georgia, serif',
          fontWeight: 400,
        }}
      >
        Y
      </div>
    ),
    {
      width: 16,
      height: 16,
    }
  )
}
