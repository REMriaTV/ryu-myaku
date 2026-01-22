'use client'

import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Onsen, RyuMyaku, PlateBoundary } from '@/lib/types'

// Leaflet icon fix
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// 金色のカスタムアイコン - 龍の息吹が湧き出る場所
const createGoldenIcon = () => {
  const gold = '#d4af37'

  return L.divIcon({
    className: 'golden-marker',
    html: `<div style="
      width: 10px;
      height: 10px;
      background: ${gold};
      border-radius: 50%;
      box-shadow: 0 0 8px ${gold}, 0 0 16px rgba(212, 175, 55, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.3);
    "></div>`,
    iconSize: [10, 10],
    iconAnchor: [5, 5],
  })
}

interface MapProps {
  onsenData: Onsen[]
  ryumyakuData?: RyuMyaku[]
  plateBoundaries?: PlateBoundary[]
}

export default function Map({ onsenData, ryumyakuData = [], plateBoundaries = [] }: MapProps) {
  // 日本の中心
  const center: [number, number] = [36.5, 137.5]

  return (
    <MapContainer
      center={center}
      zoom={6}
      style={{ height: '100vh', width: '100%', zIndex: 0 }}
      zoomControl={true}
      scrollWheelZoom={true}
    >
      {/* 漆黒のタイルマップ */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        subdomains="abcd"
        maxZoom={19}
      />

      {/* プレート境界 - 大地の裂け目 */}
      {plateBoundaries.map((boundary) => (
        <Polyline
          key={boundary.id}
          positions={boundary.coordinates as [number, number][]}
          pathOptions={{
            color: boundary.color,
            weight: boundary.type === 'fault' ? 3 : 2,
            opacity: 0.6,
            dashArray: boundary.type === 'subduction' ? '8, 4' : '4, 2',
          }}
        >
          <Popup>
            <div style={{
              minWidth: '200px',
              background: '#1a1a1a',
              color: '#d4af37',
              padding: '12px',
              margin: '-13px -20px',
              fontFamily: '"Noto Serif JP", serif'
            }}>
              <h3 style={{
                margin: '0 0 8px 0',
                fontSize: '14px',
                fontWeight: 'bold',
                borderBottom: '1px solid rgba(212, 175, 55, 0.3)',
                paddingBottom: '8px'
              }}>
                {boundary.name}
              </h3>
              <div style={{ fontSize: '10px', color: 'rgba(212, 175, 55, 0.6)', marginBottom: '8px' }}>
                {boundary.nameEn}
              </div>
              <p style={{ fontSize: '11px', margin: 0, lineHeight: 1.6, color: 'rgba(255,255,255,0.8)' }}>
                {boundary.description}
              </p>
            </div>
          </Popup>
        </Polyline>
      ))}

      {/* 龍脈 - 大地の気の流れ */}
      {ryumyakuData.map((ryumyaku) => (
        <Polyline
          key={ryumyaku.id}
          positions={ryumyaku.coordinates as [number, number][]}
          pathOptions={{
            color: ryumyaku.color,
            weight: ryumyaku.lineWidth || 3,
            opacity: 0.8,
            lineCap: 'round',
            lineJoin: 'round',
          }}
        >
          <Popup>
            <div style={{
              minWidth: '200px',
              background: '#1a1a1a',
              color: '#d4af37',
              padding: '12px',
              margin: '-13px -20px',
              fontFamily: '"Noto Serif JP", serif'
            }}>
              <h3 style={{
                margin: '0 0 8px 0',
                fontSize: '14px',
                fontWeight: 'bold',
                borderBottom: '1px solid rgba(212, 175, 55, 0.3)',
                paddingBottom: '8px'
              }}>
                {ryumyaku.name}
              </h3>
              <div style={{ fontSize: '10px', color: 'rgba(212, 175, 55, 0.6)', marginBottom: '8px' }}>
                {ryumyaku.nameEn}
              </div>
              <p style={{ fontSize: '11px', margin: 0, lineHeight: 1.6, color: 'rgba(255,255,255,0.8)' }}>
                {ryumyaku.description}
              </p>
            </div>
          </Popup>
        </Polyline>
      ))}

      {/* 温泉 - 龍の息吹が湧き出る場所 */}
      {onsenData.map((onsen) => (
        <Marker
          key={onsen.id}
          position={[onsen.lat, onsen.lng]}
          icon={createGoldenIcon()}
        >
          <Popup>
            <div style={{
              minWidth: '220px',
              background: '#1a1a1a',
              color: '#d4af37',
              padding: '16px',
              margin: '-13px -20px',
              fontFamily: '"Noto Serif JP", serif'
            }}>
              <h3 style={{
                margin: '0 0 4px 0',
                fontSize: '16px',
                fontWeight: 'bold',
                letterSpacing: '0.05em'
              }}>
                {onsen.displayName}
              </h3>
              <div style={{
                fontSize: '11px',
                color: 'rgba(212, 175, 55, 0.6)',
                marginBottom: '12px',
                borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
                paddingBottom: '12px'
              }}>
                {onsen.prefecture} {onsen.area && `・${onsen.area}`}
              </div>

              {onsen.facility && (
                <div style={{ fontSize: '12px', marginBottom: '6px', color: 'rgba(255,255,255,0.9)' }}>
                  <span style={{ color: 'rgba(212, 175, 55, 0.7)' }}>湯処</span>　{onsen.facility}
                </div>
              )}

              {onsen.springQuality && (
                <div style={{
                  fontSize: '10px',
                  color: 'rgba(255,255,255,0.6)',
                  marginBottom: '8px',
                  padding: '6px 8px',
                  background: 'rgba(212, 175, 55, 0.1)',
                  borderRadius: '2px'
                }}>
                  {onsen.springQuality}
                </div>
              )}

              {onsen.note && (
                <div style={{
                  fontSize: '11px',
                  marginTop: '10px',
                  fontStyle: 'italic',
                  color: 'rgba(255,255,255,0.7)',
                  lineHeight: 1.5
                }}>
                  {onsen.note}
                </div>
              )}

              {onsen.googleMap && (
                <a
                  href={onsen.googleMap}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '10px',
                    color: '#d4af37',
                    display: 'block',
                    marginTop: '12px',
                    textDecoration: 'none',
                    opacity: 0.8
                  }}
                >
                  → 地図で確認
                </a>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
