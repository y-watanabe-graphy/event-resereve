import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  const { data: events, error } = await supabase
    .from('events')
    .select('*, dates:event_dates(*)')
    .order('created_at', { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // 各イベントの日程を日付順にソート
  const sorted = (events ?? []).map(ev => ({
    ...ev,
    dates: (ev.dates ?? []).sort((a: any, b: any) => a.date.localeCompare(b.date)),
  }))

  return NextResponse.json(sorted)
}
