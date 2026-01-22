import dynamic from 'next/dynamic'

// Mapコンポーネントを動的インポート（SSR無効化）
const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
})

const onsenData = [
  { name: "十津川温泉（玉置山のふもと）", rank: "S", lat: 33.924, lng: 135.796, note: "奈良" },
  { name: "杖立温泉（阿蘇の煙もくもく）", rank: "S", lat: 33.118, lng: 131.047, note: "熊本・小部屋は蒸し湯？" },
  { name: "皆生温泉", rank: "S", lat: 35.459, lng: 133.357, note: "鳥取" },
  { name: "湯の峰温泉", rank: "S", lat: 33.828, lng: 135.757, note: "和歌山・空海/小栗判官" },
  { name: "川湯温泉（大鵬の故郷）", rank: "S", lat: 43.630, lng: 144.444, note: "北海道・強酸性" },
  { name: "龍神温泉", rank: "S", lat: 33.911, lng: 135.568, note: "和歌山" },
  { name: "榊原温泉 榊原館", rank: "S", lat: 34.694, lng: 136.311, note: "三重" },
  { name: "出雲湯村温泉", rank: "S", lat: 35.215, lng: 132.893, note: "島根・斐伊川沿い" },
  { name: "温泉津温泉", rank: "S", lat: 35.097, lng: 132.348, note: "島根" },
  { name: "湯郷温泉（ホタル）", rank: "S", lat: 35.007, lng: 134.137, note: "岡山" },
  { name: "天然温泉ゆの里", rank: "B", lat: 34.308, lng: 135.589, note: "和歌山橋本・金水" },
  { name: "有馬温泉", rank: "B", lat: 34.797, lng: 135.247, note: "兵庫" },
  { name: "三瓶温泉", rank: "B", lat: 35.132, lng: 132.610, note: "島根" },
  { name: "玉造温泉", rank: "B", lat: 35.414, lng: 133.011, note: "島根" },
  { name: "軽井沢千ヶ滝温泉", rank: "C", lat: 36.368, lng: 138.587, note: "長野" }
]

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

      {/* 地図コンポーネント */}
      <Map onsenData={onsenData} />
    </div>
  )
}
