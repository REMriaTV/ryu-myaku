'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Leaflet icon fix - アイコン表示エラー対策
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// カスタムアイコン（CSSで描画した光る点）
const createCustomIcon = (rank: string) => {
  const classMap: { [key: string]: string } = {
    S: 'pin-s',
    B: 'pin-b',
    C: 'pin-c',
  }
  const pinClass = classMap[rank] || 'pin-c'

  return L.divIcon({
    className: 'glowing-dot-marker',
    html: `<div class="${pinClass}"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  })
}

interface OnsenData {
  name: string
  rank: string
  lat: number
  lng: number
  note: string
}

interface MapProps {
  onsenData: OnsenData[]
}

export default function Map({ onsenData }: MapProps) {
  useEffect(() => {
    // マップの初期化を確実にする
  }, [])

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
      {onsenData.map((onsen, index) => (
        <Marker
          key={index}
          position={[onsen.lat, onsen.lng]}
          icon={createCustomIcon(onsen.rank)}
        >
          <Popup>
            <div className="onsen-popup">
              <h3>{onsen.name}</h3>
              <span className={`rank rank-${onsen.rank}`}>Rank {onsen.rank}</span>
              <div className="note">{onsen.note}</div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
