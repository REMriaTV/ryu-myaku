import dynamic from 'next/dynamic'
import onsenJson from '@/data/onsen.json'
import { Onsen } from '@/lib/types'

// Mapコンポーネントを動的インポート（SSR無効化）
const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0a0a0a',
      color: '#d4af37',
      fontFamily: 'serif',
      letterSpacing: '0.2em',
      fontSize: '12px'
    }}>
      大地と接続中
    </div>
  )
})

// JSONからデータを取得
const onsenData: Onsen[] = onsenJson.onsen

export default function RyuMyakuPage() {
  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw', background: '#0a0a0a' }}>
      {/* タイトル */}
      <div
        style={{
          position: 'absolute',
          top: '32px',
          left: '32px',
          zIndex: 1000,
          color: '#d4af37',
          fontFamily: 'serif',
        }}
      >
        <h1
          style={{
            fontSize: '42px',
            fontWeight: 300,
            marginBottom: '12px',
            letterSpacing: '0.15em',
            textShadow: '0 0 40px rgba(212, 175, 55, 0.3)',
          }}
        >
          RYU-MYAKU
        </h1>
        <p
          style={{
            fontSize: '11px',
            fontWeight: 300,
            letterSpacing: '0.1em',
            color: 'rgba(255, 255, 255, 0.5)',
            lineHeight: 1.6,
          }}
        >
          地中深く眠る熱を感じ、大地の鼓動に身を浸す
        </p>
      </div>

      {/* 統計 */}
      <div
        style={{
          position: 'absolute',
          bottom: '28px',
          left: '28px',
          zIndex: 1000,
          color: 'rgba(212, 175, 55, 0.5)',
          fontFamily: 'serif',
          fontSize: '9px',
          letterSpacing: '0.03em',
        }}
      >
        <span style={{ color: 'rgba(212, 175, 55, 0.8)' }}>{onsenData.length}</span> 湯処
      </div>

      {/* 地図コンポーネント */}
      <Map onsenData={onsenData} />
    </div>
  )
}
