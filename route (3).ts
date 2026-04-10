import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'イベント参加予約',
  description: '説明会・インターンシップへの参加予約フォームです。',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
