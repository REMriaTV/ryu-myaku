# RYU-MYAKU Supabase スキーマ設計

## テーブル構造

### 1. onsen（温泉テーブル）

```sql
CREATE TABLE onsen (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  prefecture TEXT NOT NULL,
  area TEXT,
  lat DECIMAL(9,6) NOT NULL,
  lng DECIMAL(9,6) NOT NULL,
  confirmed BOOLEAN DEFAULT true,
  facility TEXT,
  spring_quality TEXT,
  address TEXT,
  google_map TEXT,
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックス
CREATE INDEX idx_onsen_prefecture ON onsen(prefecture);
CREATE INDEX idx_onsen_location ON onsen(lat, lng);
```

### 2. ryumyaku（龍脈テーブル）

```sql
CREATE TABLE ryumyaku (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  name_en TEXT,
  description TEXT,
  color TEXT DEFAULT '#ff0000',
  line_width INTEGER DEFAULT 3,
  coordinates JSONB NOT NULL, -- [[lat, lng], [lat, lng], ...]
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3. onsen_ryumyaku（温泉と龍脈の関連テーブル）

```sql
CREATE TABLE onsen_ryumyaku (
  onsen_id TEXT REFERENCES onsen(id) ON DELETE CASCADE,
  ryumyaku_id TEXT REFERENCES ryumyaku(id) ON DELETE CASCADE,
  distance_km DECIMAL(6,2), -- 龍脈からの距離（km）
  PRIMARY KEY (onsen_id, ryumyaku_id)
);
```

## 龍脈データ（初期データ）

### 日本の主要な地質構造線

1. **中央構造線（Median Tectonic Line）**
   - 日本最大の断層帯
   - 関東〜九州を横断
   - 色: #ff4444（赤）

2. **フォッサマグナ（Fossa Magna）**
   - 糸魚川-静岡構造線
   - 日本を東西に分ける
   - 色: #4444ff（青）

3. **糸魚川-静岡構造線（Itoigawa-Shizuoka Tectonic Line）**
   - フォッサマグナの西縁
   - 色: #44ff44（緑）

## Row Level Security (RLS)

```sql
-- 読み取りは誰でも可能
ALTER TABLE onsen ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON onsen FOR SELECT USING (true);

ALTER TABLE ryumyaku ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON ryumyaku FOR SELECT USING (true);

-- 書き込みは認証済みユーザーのみ
CREATE POLICY "Authenticated write access" ON onsen
  FOR ALL USING (auth.role() = 'authenticated');
```

## Supabase クライアント設定

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

## 環境変数

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 移行手順

1. Supabaseプロジェクト作成
2. SQLエディタでテーブル作成
3. `@supabase/supabase-js` インストール
4. 環境変数設定
5. 既存JSONデータをSupabaseにインポート
6. コードをSupabase APIに切り替え
