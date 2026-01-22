import type { Metadata } from 'next'
import { Noto_Serif_JP } from 'next/font/google'
import './globals.css'

const notoSerifJP = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-noto-serif-jp',
})

export const metadata: Metadata = {
  title: '龍脈 RYU-MYAKU',
  description: '大地の気脈を辿り、龍の息吹に身を清める。日本の温泉と地質構造線を可視化する。',
  keywords: ['温泉', '龍脈', '湯治', 'プレート', '中央構造線', '日本'],
  openGraph: {
    title: '龍脈 RYU-MYAKU',
    description: '大地の気脈を辿り、龍の息吹に身を清める',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={notoSerifJP.variable} style={{ margin: 0, padding: 0, background: '#0a0a0a' }}>
        {children}
      </body>
    </html>
  )
}
