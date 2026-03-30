-- ══════════════════════════════════════════════════════════════
-- Mealcule cooking_methods table
-- 사용자 추가 조리 방법 + AI 물리화학 인자 분석
-- ══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.cooking_methods (
  id          BIGSERIAL    PRIMARY KEY,
  key         TEXT         UNIQUE NOT NULL,  -- JS key: snake_case (e.g. 'infrared_grill')
  label       TEXT         NOT NULL,          -- 한국어 표시명
  label_en    TEXT,                           -- English name
  emoji       TEXT         NOT NULL DEFAULT '🍳',
  range_min   INTEGER      NOT NULL,          -- 최소 온도 °C
  range_max   INTEGER      NOT NULL,          -- 최대 온도 °C
  -- 물리화학 인자
  medium      TEXT         NOT NULL DEFAULT 'dry'
                           CHECK (medium IN ('dry','water','steam','oil','mw','smoke','none')),
  pressure_atm NUMERIC(4,2) NOT NULL DEFAULT 1.0,  -- 기압 배수 (압력솥≈1.3)
  o2_level    NUMERIC(3,2) NOT NULL DEFAULT 0.7,   -- 산소 노출도 0-1
  leach_factor NUMERIC(3,2) NOT NULL DEFAULT 0.0,  -- 수용성 영양소 용출율 0-1
  fat_contact BOOLEAN      NOT NULL DEFAULT false, -- 지방상 직접 접촉
  browning    BOOLEAN      NOT NULL DEFAULT true,  -- 마이야르/캐러멜화 가능
  starch_h2o  BOOLEAN      NOT NULL DEFAULT false, -- 전분 호화 가능
  pah_risk    BOOLEAN      NOT NULL DEFAULT false, -- PAH/HCA 생성 위험
  uniformity  TEXT         NOT NULL DEFAULT 'medium'
                           CHECK (uniformity IN ('high','medium','low')),
  source      TEXT         NOT NULL DEFAULT 'ai_generated',
  is_active   BOOLEAN      NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT now()
);

-- RLS: 전체 읽기 허용, 쓰기는 SECURITY DEFINER RPC로만
ALTER TABLE public.cooking_methods ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read active methods"
  ON public.cooking_methods FOR SELECT
  USING (is_active = true);

-- SECURITY DEFINER 함수 (anon 키로 INSERT 가능)
CREATE OR REPLACE FUNCTION public.insert_ai_method(data jsonb)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  result public.cooking_methods;
BEGIN
  INSERT INTO public.cooking_methods (
    key, label, label_en, emoji, range_min, range_max,
    medium, pressure_atm, o2_level, leach_factor,
    fat_contact, browning, starch_h2o, pah_risk, uniformity, source
  ) VALUES (
    data->>'key',
    data->>'label',
    data->>'label_en',
    COALESCE(data->>'emoji', '🍳'),
    (data->>'range_min')::int,
    (data->>'range_max')::int,
    COALESCE(data->>'medium', 'dry'),
    COALESCE((data->>'pressure_atm')::numeric, 1.0),
    COALESCE((data->>'o2_level')::numeric, 0.7),
    COALESCE((data->>'leach_factor')::numeric, 0.0),
    COALESCE((data->>'fat_contact')::boolean, false),
    COALESCE((data->>'browning')::boolean, true),
    COALESCE((data->>'starch_h2o')::boolean, false),
    COALESCE((data->>'pah_risk')::boolean, false),
    COALESCE(data->>'uniformity', 'medium'),
    COALESCE(data->>'source', 'ai_generated')
  )
  ON CONFLICT (key) DO NOTHING
  RETURNING * INTO result;
  RETURN row_to_json(result)::jsonb;
END;
$$;

-- 검색용 인덱스
CREATE INDEX IF NOT EXISTS idx_cooking_methods_label
  ON public.cooking_methods USING gin(label gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_cooking_methods_label_en
  ON public.cooking_methods USING gin(label_en gin_trgm_ops);

-- 확인
SELECT count(*) AS cooking_methods_created FROM public.cooking_methods;
