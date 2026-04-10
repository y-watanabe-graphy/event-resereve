import { NextRequest, NextResponse } from 'next/server'
import { createAdminToken, COOKIE_NAME } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const { password } = await req.json()
  if (!password || password !== (process.env.ADMIN_PASSWORD || 'admin1234')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const token = await createAdminToken()
  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 8,
    path: '/',
  })
  return res
}
