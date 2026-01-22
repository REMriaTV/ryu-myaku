'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Onsen } from '@/lib/types'

// Leaflet icon fix - アイコン表示エラー対策
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// カスタムアイコン（CSSで描画した光る点）
const createCustomIcon = (prefecture: string) => {
  // 都道府県に応じた色分け
  const regionColors: { [key: string]: string } = {
    '北海道': '#00bcd4', // シアン
    '和歌山': '#ff5722', // オレンジ
    '三重': '#ff9800',   // アンバー
    '島根': '#4caf50',   // グリーン
    '鳥取': '#8bc34a',   // ライトグリーン
    '岡山': '#cddc39',   // ライム
    '兵庫': '#ffeb3b',   // イエロー
    '奈良': '#e91e63',   // ピンク
    '熊本': '#f44336',   // レッド
    '長野': '#9c27b0',   // パープル
    '神奈川': '#3f51b5', // インディゴ
  }

  const color = regionColors[prefecture] || '#ffffff'

  return L.divIcon({
    className: 'glowing-dot-marker',
    html: `<div style="
      width: 12px;
      height: 12px;
      background: ${color};
      border-radius: 50%;
      box-shadow: 0 0 10px ${color}, 0 0 20px ${color}, 0 0 30px ${color};
      border: 2px solid rgba(255,255,255,0.8);
    "></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  })
}

interface MapProps {
  onsenData: Onsen[]
}

export default function Map({ onsenData }: MapProps) {
  // 中心座標を計算（すべての温泉の中心）
  const centerLat = onsenData.reduce((sum, onsen) => sum + onsen.lat, 0) / onsenData.length
  const centerLng = onsenData.reduce((sum, onsen) => sum + onsen.lng, 0) / onsenData.length

  return (
    <MapContainer
      center={[centerLat, centerLng]}
      zoom={6}
      style={{ height: '100vh', width: '100%', zIndex: 0 }}
      zoomControl={true}
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        subdomains="abcd"
        maxZoom={19}
      />
      {onsenData.map((onsen) => (
        <Marker
          key={onsen.id}
          position={[onsen.lat, onsen.lng]}
          icon={createCustomIcon(onsen.prefecture)}
        >
          <Popup>
            <div style={{ minWidth: '200px' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 'bold' }}>
                {onsen.displayName}
              </h3>
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                {onsen.prefecture} {onsen.area && `・${onsen.area}`}
              </div>
              {onsen.facility && (
                <div style={{ fontSize: '12px', marginBottom: '4px' }}>
                  <strong>施設:</strong> {onsen.facility}
                </div>
              )}
              {onsen.springQuality && (
                <div style={{ fontSize: '11px', color: '#888', marginBottom: '4px' }}>
                  {onsen.springQuality}
                </div>
              )}
              {onsen.note && (
                <div style={{ fontSize: '12px', marginTop: '8px', fontStyle: 'italic', color: '#555' }}>
                  {onsen.note}
                </div>
              )}
              {onsen.googleMap && (
                <a
                  href={onsen.googleMap}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '11px', color: '#1976d2', display: 'block', marginTop: '8px' }}
                >
                  Google Mapで開く →
                </a>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
