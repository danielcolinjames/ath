import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'experimental-edge',
}

export default async function handler(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const r = searchParams.get('r')
  const g = searchParams.get('g')
  const b = searchParams.get('b')

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#0F111A',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <div tw="absolute top-0 left-0 w-full h-full opacity-15" style={{ background: `linear-gradient(90deg, rgba(${r}, ${g}, ${b}, 1), rgba${r}, ${g}, ${b}, 1)` }} />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
