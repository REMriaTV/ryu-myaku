import dynamic from 'next/dynamic'
import onsenJson from '@/data/onsen.json'
import ryumyakuJson from '@/data/ryumyaku.json'
import platesJson from '@/data/plates.json'
import { Onsen, RyuMyaku, PlateBoundary } from '@/lib/types'

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
      fontFamily: '"Noto Serif JP", serif',
      letterSpacing: '0.2em'
    }}>
      大地と接続中...
    </div>
  )
})

// JSONからデータを取得
const onsenData: Onsen[] = onsenJson.onsen
const ryumyakuData: RyuMyaku[] = ryumyakuJson.ryumyaku
const plateBoundaries = platesJson.boundaries as PlateBoundary[]

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
          fontFamily: '"Noto Serif JP", serif',
        }}
      >
        <h1
          style={{
            fontSize: '32px',
            fontWeight: 400,
            marginBottom: '4px',
            letterSpacing: '0.15em',
            textShadow: '0 0 20px rgba(212, 175, 55, 0.3)',
          }}
        >
          龍脈
        </h1>
        <p
          style={{
            fontSize: '11px',
            fontWeight: 300,
            letterSpacing: '0.3em',
            opacity: 0.6,
            textTransform: 'uppercase',
          }}
        >
          RYU-MYAKU
        </p>
      </div>

      {/* サブタイトル・コンセプト */}
      <div
        style={{
          position: 'absolute',
          top: '100px',
          left: '32px',
          zIndex: 1000,
          color: 'rgba(255, 255, 255, 0.5)',
          fontFamily: '"Noto Serif JP", serif',
          fontSize: '10px',
          letterSpacing: '0.1em',
          lineHeight: 1.8,
          maxWidth: '200px',
        }}
      >
        <p style={{ margin: 0 }}>大地の気脈を辿り</p>
        <p style={{ margin: 0 }}>龍の息吹に身を清める</p>
      </div>

      {/* 統計情報 */}
      <div
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '32px',
          zIndex: 1000,
          color: 'rgba(212, 175, 55, 0.6)',
          fontFamily: '"Noto Serif JP", serif',
          fontSize: '10px',
          letterSpacing: '0.05em',
        }}
      >
        <div style={{ marginBottom: '4px' }}>
          <span style={{ color: '#d4af37' }}>{onsenData.length}</span> 湯処
        </div>
        <div style={{ marginBottom: '4px' }}>
          <span style={{ color: '#d4af37' }}>{plateBoundaries.length}</span> 境界線
        </div>
        <div>
          <span style={{ color: '#d4af37' }}>4</span> プレート
        </div>
      </div>

      {/* 凡例 */}
      <div
        style={{
          position: 'absolute',
          bottom: '32px',
          right: '32px',
          zIndex: 1000,
          color: 'rgba(255, 255, 255, 0.5)',
          fontFamily: '"Noto Serif JP", serif',
          fontSize: '9px',
          letterSpacing: '0.05em',
          textAlign: 'right',
        }}
      >
        <div style={{ marginBottom: '6px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
          <span>湯処</span>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#d4af37', boxShadow: '0 0 6px #d4af37' }} />
        </div>
        <div style={{ marginBottom: '6px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
          <span>龍脈</span>
          <div style={{ width: '20px', height: '2px', background: 'rgba(212, 175, 55, 0.7)' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
          <span>境界</span>
          <div style={{ width: '20px', height: '2px', background: 'rgba(212, 175, 55, 0.4)', borderStyle: 'dashed' }} />
        </div>
      </div>

      {/* 地図コンポーネント */}
      <Map
        onsenData={onsenData}
        ryumyakuData={ryumyakuData}
        plateBoundaries={plateBoundaries}
      />
    </div>
  )
}
