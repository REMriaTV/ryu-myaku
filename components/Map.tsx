'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Onsen } from '@/lib/types'

// Leaflet icon fix
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// マグマ風の脈動マーカー
const createMagmaIcon = () => {
  return L.divIcon({
    className: 'magma-marker',
    html: `<div class="magma-pulse"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  })
}

interface MapProps {
  onsenData: Onsen[]
}

export default function Map({ onsenData }: MapProps) {
  const center: [number, number] = [36.5, 137.5]

  return (
    <MapContainer
      center={center}
      zoom={6}
      style={{ height: '100vh', width: '100%', zIndex: 0 }}
      zoomControl={true}
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
        attribution='&copy; CARTO'
        subdomains="abcd"
        maxZoom={19}
      />

      {/* 温泉マーカー */}
      {onsenData.map((onsen) => (
        <Marker
          key={onsen.id}
          position={[onsen.lat, onsen.lng]}
          icon={createMagmaIcon()}
        >
          <Popup>
            <div style={{
              minWidth: '200px',
              background: '#0a0a0a',
              color: '#d4af37',
              padding: '14px',
              margin: '-13px -20px',
              fontFamily: 'serif'
            }}>
              <h3 style={{
                margin: '0 0 4px 0',
                fontSize: '14px',
                fontWeight: 'normal',
                letterSpacing: '0.03em'
              }}>
                {onsen.displayName}
              </h3>
              <div style={{
                fontSize: '10px',
                color: 'rgba(212, 175, 55, 0.5)',
                marginBottom: '10px',
                borderBottom: '1px solid rgba(212, 175, 55, 0.15)',
                paddingBottom: '10px'
              }}>
                {onsen.prefecture} {onsen.area && `・${onsen.area}`}
              </div>

              {onsen.facility && (
                <div style={{ fontSize: '11px', marginBottom: '4px', color: 'rgba(255,255,255,0.8)' }}>
                  <span style={{ color: 'rgba(212, 175, 55, 0.6)', fontSize: '9px' }}>湯処</span>　{onsen.facility}
                </div>
              )}

              {onsen.springQuality && (
                <div style={{
                  fontSize: '9px',
                  color: 'rgba(255,255,255,0.5)',
                  marginTop: '6px',
                  padding: '4px 6px',
                  background: 'rgba(212, 175, 55, 0.08)',
                  borderRadius: '2px'
                }}>
                  {onsen.springQuality}
                </div>
              )}

              {onsen.note && (
                <div style={{
                  fontSize: '10px',
                  marginTop: '8px',
                  fontStyle: 'italic',
                  color: 'rgba(255,255,255,0.6)',
                  lineHeight: 1.4
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
                    fontSize: '9px',
                    color: 'rgba(212, 175, 55, 0.7)',
                    display: 'block',
                    marginTop: '10px',
                    textDecoration: 'none'
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
