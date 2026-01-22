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
      backgroundColor: '#1a1a2e',
      color: '#fff'
    }}>
      Loading map...
    </div>
  )
})

// JSONからデータを取得
const onsenData: Onsen[] = onsenJson.onsen

export default function RyuMyakuPage() {
  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
      {/* タイトルとサブタイトル */}
      <div
        style={{
          position: 'absolute',
          top: '40px',
          left: '40px',
          zIndex: 1000,
          color: '#ffffff',
          fontFamily: 'var(--font-cinzel), serif',
          textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)',
        }}
      >
        <h1
          style={{
            fontSize: '48px',
            fontWeight: 700,
            marginBottom: '8px',
            letterSpacing: '2px',
          }}
        >
          RYU-MYAKU
        </h1>
        <p
          style={{
            fontSize: '16px',
            fontWeight: 400,
            letterSpacing: '1px',
            opacity: 0.9,
          }}
        >
          Connect to the Earth&apos;s Vein
        </p>
      </div>

      {/* 温泉数表示 */}
      <div
        style={{
          position: 'absolute',
          top: '120px',
          left: '40px',
          zIndex: 1000,
          color: '#ffffff',
          fontSize: '14px',
          opacity: 0.8,
        }}
      >
        {onsenData.length} hot springs registered
      </div>

      {/* 地図コンポーネント */}
      <Map onsenData={onsenData} />
    </div>
  )
}
