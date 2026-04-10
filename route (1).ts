'use client'
import { useState, useEffect } from 'react'
import type { Event } from '@/lib/store'

function fmtDate(d: string) {
  const [y, m, dd] = d.split('-')
  return `${y}年${parseInt(m)}月${parseInt(dd)}日`
}

export default function ReservePage() {
  const [events, setEvents] = useState<Event[]>([])
  const [selectedEvent, setSelectedEvent] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [form, setForm] = useState({ name: '', kana: '', university: '', graduationYear: '', phone: '', email: '' })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/events').then(r => r.json()).then(setEvents).catch(() => {})
  }, [])

  const currentEvent = events.find(e => e.id === selectedEvent)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedEvent || !selectedDate) { setError('イベントと日程を選択してください。'); return }
    setError(''); setLoading(true)
    const res = await fetch('/api/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, eventId: selectedEvent, dateId: selectedDate }),
    })
    const json = await res.json()
    setLoading(false)
    if (!res.ok) { setError(json.error || '予約に失敗しました。時間をおいて再度お試しください。'); return }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ textAlign: 'center', maxWidth: '400px' }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%', background: 'var(--green-bg)',
            border: '1px solid var(--green-border)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', margin: '0 auto 20px', fontSize: 28,
          }}>✓</div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '10px' }}>予約が完了しました</h1>
          <p style={{ color: 'var(--text-2)', lineHeight: 1.8, marginBottom: '28px', fontSize: '14px' }}>
            ご予約ありがとうございます。<br />当日は時間に余裕をもってお越しください。
          </p>
          <button className="btn btn-secondary" onClick={() => {
            setSubmitted(false); setSelectedEvent(''); setSelectedDate('')
            setForm({ name: '', kana: '', university: '', graduationYear: '', phone: '', email: '' })
          }}>別の日程を予約する</button>
        </div>
      </div>
    )
  }

  return (
    <>
      <header className="site-header">
        <div className="container inner">
          <span className="site-logo">
            イベント参加予約 <span>説明会・インターンシップ</span>
          </span>
        </div>
      </header>

      <main className="container" style={{ paddingTop: '28px', paddingBottom: '60px' }}>
        <div className="page-hero">
          <h1>イベントに参加する</h1>
          <p>説明会・インターンシップへのお申し込みはこちらから。</p>
        </div>

        {error && <div className="alert alert-error" style={{ marginBottom: '16px' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* 基本情報 */}
          <div className="card">
            <p className="card-title">基本情報</p>
            <div className="form-grid">
              <div className="field">
                <label>氏名<span className="req">*</span></label>
                <input required placeholder="山田 太郎" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="field">
                <label>フリガナ<span className="req">*</span></label>
                <input required placeholder="ヤマダ タロウ" value={form.kana} onChange={e => setForm({ ...form, kana: e.target.value })} />
              </div>
              <div className="field">
                <label>大学名<span className="req">*</span></label>
                <input required placeholder="○○大学" value={form.university} onChange={e => setForm({ ...form, university: e.target.value })} />
              </div>
              <div className="field">
                <label>年卒<span className="req">*</span></label>
                <select required value={form.graduationYear} onChange={e => setForm({ ...form, graduationYear: e.target.value })}>
                  <option value="">選択してください</option>
                  <option value="27卒">27卒</option>
                  <option value="28卒">28卒</option>
                  <option value="29卒">29卒</option>
                </select>
              </div>
              <div className="field">
                <label>電話番号<span className="req">*</span></label>
                <input required type="tel" placeholder="090-0000-0000" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div className="field">
                <label>メールアドレス<span className="req">*</span></label>
                <input required type="email" placeholder="example@mail.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
            </div>
          </div>

          {/* イベント選択 */}
          <div className="card">
            <p className="card-title">参加イベント</p>
            {events.length === 0 ? (
              <p className="text-sm">現在、受付中のイベントがありません。</p>
            ) : (
              <>
                <div className="field">
                  <label>イベントを選択<span className="req">*</span></label>
                  <select value={selectedEvent} onChange={e => { setSelectedEvent(e.target.value); setSelectedDate('') }} required>
                    <option value="">選択してください</option>
                    {events.map(ev => <option key={ev.id} value={ev.id}>{ev.name}</option>)}
                  </select>
                </div>
                {currentEvent?.description && (
                  <p style={{ marginTop: '10px', fontSize: '13px', color: 'var(--text-2)', lineHeight: 1.75 }}>
                    {currentEvent.description}
                  </p>
                )}
              </>
            )}
          </div>

          {/* 日程選択 */}
          {selectedEvent && currentEvent && (
            <div className="card">
              <p className="card-title">参加日程</p>
              {currentEvent.dates.length === 0 ? (
                <p className="text-sm">現在、選択できる日程がありません。</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {currentEvent.dates.map(d => {
                    const isFull = d.capacity > 0 && d.booked >= d.capacity
                    const remaining = d.capacity > 0 ? d.capacity - d.booked : null
                    return (
                      <label
                        key={d.id}
                        className={`date-option${selectedDate === d.id ? ' selected' : ''}${isFull ? ' is-full' : ''}`}
                        onClick={() => !isFull && setSelectedDate(d.id)}
                      >
                        <input type="radio" name="date" value={d.id} checked={selectedDate === d.id}
                          onChange={() => setSelectedDate(d.id)} disabled={isFull} style={{ pointerEvents: 'none' }} />
                        <div className="date-label">
                          <div className="date-name">{fmtDate(d.date)}　{d.time}〜</div>
                          <div className="date-meta">{d.venue}</div>
                        </div>
                        <span className={`badge ${isFull ? 'badge-full' : 'badge-open'}`}>
                          {isFull ? '満席' : remaining !== null ? `残${remaining}席` : '受付中'}
                        </span>
                      </label>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          <button type="submit" className="btn btn-primary btn-full" disabled={loading || events.length === 0}
            style={{ padding: '14px', fontSize: '15px', marginTop: '4px' }}>
            {loading ? '送信中...' : '予約を確定する'}
          </button>
        </form>
      </main>
    </>
  )
}
