// 温泉データの型定義
export type Onsen = {
  id: string
  name: string
  displayName: string
  prefecture: string
  area: string
  lat: number
  lng: number
  confirmed: boolean
  facility: string
  springQuality: string
  address: string
  googleMap: string
  note: string
}

// 龍脈（地質構造線）の型定義
export type RyuMyaku = {
  id: string
  name: string
  nameEn: string
  description: string
  color: string
  lineWidth?: number
  coordinates: number[][]
}

// プレート境界の型定義
export type PlateBoundary = {
  id: string
  name: string
  nameEn: string
  type: 'subduction' | 'fault'
  description: string
  color: string
  coordinates: number[][]
}

// プレート情報
export type Plate = {
  id: string
  name: string
  nameEn: string
  description: string
}

// プレートデータ全体
export type PlatesData = {
  plates: Plate[]
  boundaries: PlateBoundary[]
}
