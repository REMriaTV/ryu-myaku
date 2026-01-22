import type { Metadata } from 'next'
import { Cinzel } from 'next/font/google'
import './globals.css'

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-cinzel',
})

export const metadata: Metadata = {
  title: 'RYU-MYAKU - Connect to the Earth\'s Vein',
  description: '地下で繋がる湯脈（龍脈）を感じる、ダークな温泉マップ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={cinzel.variable}>{children}</body>
    </html>
  )
}
