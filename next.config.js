import { NextRequest, NextResponse } from 'next/server'
import { getStore, generateId, fmtDate } from '@/lib/store'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, kana, university, graduationYear, phone, email, eventId, dateId } = body

  if (!name || !kana || !university || !graduationYear || !phone || !email || !eventId || !dateId) {
    return NextResponse.json({ error: '必須項目が不足しています。' }, { status: 400 })
  }

  const store = getStore()
  const event = store.events.find(e => e.id === eventId)
  if (!event) return NextResponse.json({ error: 'イベントが見つかりません。' }, { status: 404 })

  const date = event.dates.find(d => d.id === dateId)
  if (!date) return NextResponse.json({ error: '日程が見つかりません。' }, { status: 404 })

  if (date.capacity > 0 && date.booked >= date.capacity) {
    return NextResponse.json({ error: 'この日程は満席です。' }, { status: 409 })
  }

  // 重複チェック
  const duplicate = store.reservations.find(r => r.email === email && r.dateId === dateId)
  if (duplicate) {
    return NextResponse.json({ error: 'このメールアドレスはすでにこの日程を予約済みです。' }, { status: 409 })
  }

  date.booked++

  const reservation = {
    id: generateId('rsv'),
    name, kana, university, graduationYear, phone, email,
    eventId, eventName: event.name,
    dateId, dateLabel: `${fmtDate(date.date)} ${date.time}〜`,
    venue: date.venue,
    reservedAt: new Date().toISOString(),
  }
  store.reservations.push(reservation)

  // ── Google スプレッドシートへ送信 ──────────────────────
  const gasUrl = process.env.GOOGLE_APPS_SCRIPT_URL
  if (gasUrl) {
    try {
      await fetch(gasUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, kana, university,
          graduationYear, phone, email,
          eventName: event.name,
          dateLabel: `${fmtDate(date.date)} ${date.time}〜`,
          venue: date.venue,
          reservedAt: new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }),
        }),
      })
    } catch (e) {
      // スプレッドシート送信失敗でも予約自体は成功とする
      console.error('GAS送信エラー:', e)
    }
  }

  return NextResponse.json({ ok: true }, { status: 201 })
}
