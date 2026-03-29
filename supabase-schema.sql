-- ══════════════════════════════════════════════════════════════
-- Mealcule v2.0 — Supabase Database Schema
-- 분자 요리 과학 플랫폼 · 상업용 DB 스키마
-- 실행: Supabase Dashboard → SQL Editor에서 실행
-- ══════════════════════════════════════════════════════════════

-- ── 0. Extensions ──
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ══════════════════════════════════════════════════════════════
-- 1. PROFILES (auth.users 확장)
-- ══════════════════════════════════════════════════════════════
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  avatar_url TEXT,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'enterprise')),
  pro_mode BOOLEAN DEFAULT false,
  language TEXT DEFAULT 'ko',
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 자동 프로필 생성 트리거
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture', NULL)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- updated_at 자동 갱신 함수
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- 관리자 체크 함수 (재귀 방지를 위해 SECURITY DEFINER 사용)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admin can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.is_admin());

-- ══════════════════════════════════════════════════════════════
-- 2. SUBSCRIPTIONS (구독/결제)
-- ══════════════════════════════════════════════════════════════
CREATE TABLE public.subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  plan TEXT NOT NULL CHECK (plan IN ('free', 'pro', 'enterprise')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'expired', 'trial', 'past_due')),
  started_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ,
  trial_ends_at TIMESTAMPTZ,
  cancel_at TIMESTAMPTZ,
  payment_provider TEXT, -- 'stripe', 'toss', 'paddle' 등
  payment_id TEXT,       -- 외부 결제 시스템 ID
  amount INTEGER DEFAULT 0,
  currency TEXT DEFAULT 'KRW',
  interval TEXT DEFAULT 'monthly' CHECK (interval IN ('monthly', 'yearly')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TRIGGER subscriptions_updated_at
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- 구독 변경 시 프로필 플랜 자동 동기화
CREATE OR REPLACE FUNCTION public.sync_plan_on_subscription()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.profiles
  SET plan = NEW.plan, updated_at = now()
  WHERE id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER sync_plan_trigger
  AFTER INSERT OR UPDATE ON public.subscriptions
  FOR EACH ROW
  WHEN (NEW.status = 'active')
  EXECUTE FUNCTION public.sync_plan_on_subscription();

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own subscriptions"
  ON public.subscriptions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admin can manage all subscriptions"
  ON public.subscriptions FOR ALL
  USING (
    public.is_admin()
  );

-- ══════════════════════════════════════════════════════════════
-- 3. CATEGORIES (식재료 카테고리)
-- ══════════════════════════════════════════════════════════════
CREATE TABLE public.categories (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  label_en TEXT,
  emoji TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);

INSERT INTO public.categories (id, label, label_en, emoji, sort_order) VALUES
  ('meat', '육류', 'Meat', '🥩', 1),
  ('seafood', '해산물', 'Seafood', '🐟', 2),
  ('veg', '채소', 'Vegetables', '🥬', 3),
  ('fruit', '과일', 'Fruits', '🍎', 4),
  ('dairy', '유제품', 'Dairy', '🧀', 5),
  ('grain', '곡물', 'Grains', '🌾', 6),
  ('egg', '계란류', 'Eggs', '🥚', 7),
  ('oil', '오일', 'Oils', '🫒', 8),
  ('sauce', '소스/양념', 'Sauces', '🧂', 9),
  ('nut', '견과류', 'Nuts', '🥜', 10),
  ('legume', '콩류', 'Legumes', '🫘', 11),
  ('mushroom', '버섯', 'Mushrooms', '🍄', 12),
  ('herb', '허브/향신료', 'Herbs & Spices', '🌿', 13),
  ('processed', '가공식품', 'Processed', '🥫', 14),
  ('beverage', '음료', 'Beverages', '🥤', 15);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view categories"
  ON public.categories FOR SELECT
  USING (true);

CREATE POLICY "Admin can manage categories"
  ON public.categories FOR ALL
  USING (
    public.is_admin()
  );

-- ══════════════════════════════════════════════════════════════
-- 4. INGREDIENTS (식재료 데이터베이스)
-- ══════════════════════════════════════════════════════════════
CREATE TABLE public.ingredients (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  name_en TEXT,
  cat TEXT REFERENCES public.categories(id) NOT NULL,
  emoji TEXT,
  default_g NUMERIC DEFAULT 100,
  -- 주요 영양소 (per 100g)
  protein NUMERIC DEFAULT 0,
  fat NUMERIC DEFAULT 0,
  carbs NUMERIC DEFAULT 0,
  water NUMERIC DEFAULT 0,
  fiber NUMERIC DEFAULT 0,
  calories NUMERIC DEFAULT 0,
  -- 아미노산
  amino_acids JSONB DEFAULT '[]',
  -- 비타민/미네랄
  vit_a NUMERIC DEFAULT 0,
  vit_c NUMERIC DEFAULT 0,
  vit_d NUMERIC DEFAULT 0,
  vit_e NUMERIC DEFAULT 0,
  vit_k NUMERIC DEFAULT 0,
  vit_b1 NUMERIC DEFAULT 0,
  vit_b2 NUMERIC DEFAULT 0,
  vit_b6 NUMERIC DEFAULT 0,
  vit_b12 NUMERIC DEFAULT 0,
  folate NUMERIC DEFAULT 0,
  niacin NUMERIC DEFAULT 0,
  sodium NUMERIC DEFAULT 0,
  potassium NUMERIC DEFAULT 0,
  calcium NUMERIC DEFAULT 0,
  iron NUMERIC DEFAULT 0,
  zinc NUMERIC DEFAULT 0,
  magnesium NUMERIC DEFAULT 0,
  phosphorus NUMERIC DEFAULT 0,
  -- 특수 화합물
  compounds JSONB DEFAULT '[]',
  -- 맛 프로필 (0-100)
  flavor_umami NUMERIC DEFAULT 0,
  flavor_sweet NUMERIC DEFAULT 0,
  flavor_salty NUMERIC DEFAULT 0,
  flavor_sour NUMERIC DEFAULT 0,
  flavor_bitter NUMERIC DEFAULT 0,
  -- 메타데이터
  source TEXT DEFAULT 'USDA',
  source_id TEXT,            -- USDA FDC ID 등
  verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  tags JSONB DEFAULT '[]',   -- ['organic', 'seasonal', 'allergen'] 등
  allergens JSONB DEFAULT '[]', -- ['gluten', 'dairy', 'nuts'] 등
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 검색 성능을 위한 인덱스
CREATE INDEX idx_ingredients_name ON public.ingredients USING gin(name gin_trgm_ops);
CREATE INDEX idx_ingredients_name_en ON public.ingredients USING gin(name_en gin_trgm_ops);
CREATE INDEX idx_ingredients_cat ON public.ingredients(cat);
CREATE INDEX idx_ingredients_active ON public.ingredients(is_active) WHERE is_active = true;

-- pg_trgm 확장 (퍼지 검색용)
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE TRIGGER ingredients_updated_at
  BEFORE UPDATE ON public.ingredients
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

ALTER TABLE public.ingredients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active ingredients"
  ON public.ingredients FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admin can manage ingredients"
  ON public.ingredients FOR ALL
  USING (
    public.is_admin()
  );

-- ══════════════════════════════════════════════════════════════
-- 5. REACTIONS (과학적 반응 데이터베이스)
-- ══════════════════════════════════════════════════════════════
CREATE TABLE public.reactions (
  id SERIAL PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  name_en TEXT,
  icon TEXT,
  category TEXT CHECK (category IN ('chemical', 'physical', 'biological', 'thermal')),
  description TEXT,
  description_en TEXT,
  formula TEXT,                -- 화학식 또는 수학 모델
  mechanism TEXT,              -- 반응 메커니즘 설명
  confidence INTEGER DEFAULT 80 CHECK (confidence BETWEEN 0 AND 100),
  pro_detail TEXT,             -- 프로 모드 상세 정보
  pro_detail_en TEXT,
  -- 반응 조건
  temp_min NUMERIC,
  temp_max NUMERIC,
  ph_range NUMRANGE,
  time_factor NUMERIC,        -- 시간 계수
  -- 트리거 조건
  trigger_ingredients JSONB DEFAULT '[]',  -- 필요한 재료 조건
  trigger_methods JSONB DEFAULT '[]',      -- 해당 조리법
  trigger_conditions JSONB DEFAULT '{}',   -- 기타 조건
  -- 과학적 참고문헌
  refs JSONB DEFAULT '[]',
  -- 결과/효과
  effects JSONB DEFAULT '[]',  -- [{type: 'flavor', impact: 'positive', description: '...'}]
  products JSONB DEFAULT '[]', -- 생성 화합물
  -- 메타
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TRIGGER reactions_updated_at
  BEFORE UPDATE ON public.reactions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

ALTER TABLE public.reactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active reactions"
  ON public.reactions FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admin can manage reactions"
  ON public.reactions FOR ALL
  USING (
    public.is_admin()
  );

-- 기본 반응 데이터 삽입
INSERT INTO public.reactions (key, name, name_en, icon, category, confidence, formula, trigger_methods, refs) VALUES
  ('maillard', '마이야르 반응', 'Maillard Reaction', '🟫', 'chemical', 92,
   'k = A·exp(-Ea/RT), Ea≈40-160 kJ/mol',
   '["pan_fry","grill","oven","air_fry"]',
   '[{"authors":"Hodge, J.E.","year":1953,"title":"Chemistry of Browning Reactions in Model Systems","journal":"J. Agric. Food Chem.","doi":"10.1021/jf60140a600"}]'),
  ('caramelization', '캐러멜화', 'Caramelization', '🍯', 'chemical', 88,
   'Sucrose → Glucose + Fructose → HMF → 색소',
   '["pan_fry","grill","oven"]',
   '[{"authors":"Kroh, L.W.","year":1994,"title":"Caramelisation in food and beverages","journal":"Food Chemistry","doi":"10.1016/0308-8146(94)90188-0"}]'),
  ('protein_denaturation', '단백질 변성', 'Protein Denaturation', '🔬', 'physical', 90,
   'ΔG = ΔH - TΔS',
   '["pan_fry","grill","oven","boil","steam","sous_vide","air_fry"]',
   '[{"authors":"Tornberg, E.","year":2005,"title":"Effects of heat on meat proteins","journal":"Meat Science","doi":"10.1016/j.meatsci.2004.11.021"}]'),
  ('starch_gelatin', '전분 호화', 'Starch Gelatinization', '🫧', 'physical', 90,
   'Starch + H₂O + Heat → Gel',
   '["boil","steam","oven","microwave"]',
   '[{"authors":"Donovan, J.W.","year":1979,"title":"Phase transitions of the starch–water system","journal":"Biopolymers","doi":"10.1002/bip.1979.360180204"}]'),
  ('vitamin_c_loss', '비타민C 손실', 'Vitamin C Degradation', '🍋', 'chemical', 85,
   'C₆H₈O₆ → C₆H₆O₆ + H₂ (산화)',
   '["boil","pan_fry","grill","oven","microwave","air_fry"]',
   '[{"authors":"Lee, S.K. & Kader, A.A.","year":2000,"title":"Preharvest and postharvest factors influencing vitamin C content","journal":"Postharvest Biol. Technol."}]'),
  ('lipid_oxidation', '지질 산화', 'Lipid Oxidation', '💨', 'chemical', 87,
   'RH → R• + H• → ROO• → ROOH',
   '["pan_fry","grill","deep_fry","air_fry"]',
   '[{"authors":"Frankel, E.N.","year":1980,"title":"Lipid oxidation","journal":"Progress in Lipid Research","doi":"10.1016/0163-7827(80)90006-5"}]'),
  ('acrylamide', '아크릴아마이드 생성', 'Acrylamide Formation', '⚠️', 'chemical', 88,
   'Asparagine + Reducing Sugar → Acrylamide (>120°C)',
   '["pan_fry","grill","deep_fry","oven","air_fry"]',
   '[{"authors":"Mottram, D.S. et al.","year":2002,"title":"Acrylamide is formed in the Maillard reaction","journal":"Nature","doi":"10.1038/419448a"}]'),
  ('nutrient_retention', '영양소 보존', 'Nutrient Retention', '🛡️', 'physical', 86,
   'Retention% = f(method, time, temp, water)',
   '["steam","sous_vide","microwave","boil","raw"]',
   '[{"authors":"USDA Table of Nutrient Retention Factors","year":2007,"title":"Nutrient Retention Factors, Release 6","journal":"USDA"}]');

-- ══════════════════════════════════════════════════════════════
-- 6. ANALYSIS HISTORY (분석 히스토리)
-- ══════════════════════════════════════════════════════════════
CREATE TABLE public.analysis_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  -- 입력 데이터
  ingredients JSONB NOT NULL,  -- {name: grams, ...}
  method TEXT NOT NULL,
  temperature NUMERIC,
  duration NUMERIC,
  oil_amount NUMERIC,
  -- 멤버 프로필
  member_profiles JSONB DEFAULT '[]',
  -- 분석 결과
  reactions JSONB,
  nutrition JSONB,
  flavor JSONB,
  health JSONB,
  -- 메타
  is_bookmarked BOOLEAN DEFAULT false,
  notes TEXT,
  tags JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_analysis_user ON public.analysis_history(user_id);
CREATE INDEX idx_analysis_created ON public.analysis_history(created_at DESC);
CREATE INDEX idx_analysis_bookmarked ON public.analysis_history(user_id, is_bookmarked) WHERE is_bookmarked = true;

ALTER TABLE public.analysis_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own analysis"
  ON public.analysis_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own analysis"
  ON public.analysis_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own analysis"
  ON public.analysis_history FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own analysis"
  ON public.analysis_history FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Admin can view all analysis"
  ON public.analysis_history FOR SELECT
  USING (
    public.is_admin()
  );

-- ══════════════════════════════════════════════════════════════
-- 7. DAILY USAGE (사용량 추적/제한)
-- ══════════════════════════════════════════════════════════════
CREATE TABLE public.daily_usage (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  usage_date DATE DEFAULT CURRENT_DATE,
  analysis_count INTEGER DEFAULT 0,
  search_count INTEGER DEFAULT 0,
  export_count INTEGER DEFAULT 0,
  UNIQUE(user_id, usage_date)
);

ALTER TABLE public.daily_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own usage"
  ON public.daily_usage FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can upsert own usage"
  ON public.daily_usage FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own usage"
  ON public.daily_usage FOR UPDATE
  USING (auth.uid() = user_id);

-- 사용량 증가 RPC 함수
CREATE OR REPLACE FUNCTION public.increment_usage(usage_type TEXT)
RETURNS JSONB AS $$
DECLARE
  current_count INTEGER;
  max_count INTEGER;
  user_plan TEXT;
  result JSONB;
BEGIN
  -- 유저 플랜 확인
  SELECT plan INTO user_plan FROM public.profiles WHERE id = auth.uid();

  -- 플랜별 제한
  IF usage_type = 'analysis' THEN
    max_count := CASE user_plan
      WHEN 'free' THEN 5
      WHEN 'pro' THEN 100
      WHEN 'enterprise' THEN 10000
      ELSE 5
    END;
  ELSIF usage_type = 'export' THEN
    max_count := CASE user_plan
      WHEN 'free' THEN 0
      WHEN 'pro' THEN 50
      WHEN 'enterprise' THEN 10000
      ELSE 0
    END;
  ELSE
    max_count := 1000;
  END IF;

  -- Upsert daily usage
  INSERT INTO public.daily_usage (user_id, usage_date, analysis_count, search_count, export_count)
  VALUES (auth.uid(), CURRENT_DATE, 0, 0, 0)
  ON CONFLICT (user_id, usage_date) DO NOTHING;

  -- 현재 카운트 확인
  EXECUTE format(
    'SELECT %I FROM public.daily_usage WHERE user_id = $1 AND usage_date = CURRENT_DATE',
    usage_type || '_count'
  ) INTO current_count USING auth.uid();

  IF current_count >= max_count THEN
    RETURN jsonb_build_object('allowed', false, 'current', current_count, 'max', max_count, 'plan', user_plan);
  END IF;

  -- 카운트 증가
  EXECUTE format(
    'UPDATE public.daily_usage SET %I = %I + 1 WHERE user_id = $1 AND usage_date = CURRENT_DATE',
    usage_type || '_count', usage_type || '_count'
  ) USING auth.uid();

  RETURN jsonb_build_object('allowed', true, 'current', current_count + 1, 'max', max_count, 'plan', user_plan);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ══════════════════════════════════════════════════════════════
-- 8. FEEDBACK (사용자 피드백)
-- ══════════════════════════════════════════════════════════════
CREATE TABLE public.feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  type TEXT CHECK (type IN ('bug', 'feature', 'general', 'data_correction')),
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  admin_notes TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TRIGGER feedback_updated_at
  BEFORE UPDATE ON public.feedback
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert feedback"
  ON public.feedback FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own feedback"
  ON public.feedback FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admin can manage all feedback"
  ON public.feedback FOR ALL
  USING (
    public.is_admin()
  );

-- ══════════════════════════════════════════════════════════════
-- 9. USER MEMBER PROFILES (건강 분석용 멤버 프로필)
-- ══════════════════════════════════════════════════════════════
CREATE TABLE public.member_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  age INTEGER,
  gender TEXT CHECK (gender IN ('male', 'female', 'other')),
  height NUMERIC,
  weight NUMERIC,
  ethnicity TEXT,
  activity TEXT CHECK (activity IN ('sedentary', 'light', 'moderate', 'active', 'very_active')),
  traits JSONB DEFAULT '[]',
  family_history JSONB DEFAULT '[]',
  conditions JSONB DEFAULT '[]',
  substances JSONB DEFAULT '[]',
  is_default BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TRIGGER member_profiles_updated_at
  BEFORE UPDATE ON public.member_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

ALTER TABLE public.member_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own member profiles"
  ON public.member_profiles FOR ALL
  USING (auth.uid() = user_id);

-- ══════════════════════════════════════════════════════════════
-- 10. ADMIN ANALYTICS VIEWS (관리자용 통계 뷰)
-- ══════════════════════════════════════════════════════════════

-- 일일 활성 사용자
CREATE OR REPLACE VIEW public.admin_daily_stats AS
SELECT
  d.usage_date,
  COUNT(DISTINCT d.user_id) as active_users,
  SUM(d.analysis_count) as total_analyses,
  SUM(d.search_count) as total_searches,
  SUM(d.export_count) as total_exports
FROM public.daily_usage d
GROUP BY d.usage_date
ORDER BY d.usage_date DESC;

-- 플랜별 사용자 수
CREATE OR REPLACE VIEW public.admin_plan_stats AS
SELECT
  plan,
  COUNT(*) as user_count,
  COUNT(*) FILTER (WHERE created_at > now() - INTERVAL '7 days') as new_this_week,
  COUNT(*) FILTER (WHERE created_at > now() - INTERVAL '30 days') as new_this_month
FROM public.profiles
GROUP BY plan;

-- 인기 식재료 TOP 50
CREATE OR REPLACE VIEW public.admin_popular_ingredients AS
SELECT
  ing_key as ingredient,
  COUNT(*) as usage_count
FROM public.analysis_history,
  jsonb_object_keys(ingredients) as ing_key
GROUP BY ing_key
ORDER BY usage_count DESC
LIMIT 50;

-- ══════════════════════════════════════════════════════════════
-- 11. HELPER RPC FUNCTIONS
-- ══════════════════════════════════════════════════════════════

-- 사용자 프로필 + 구독 정보 한번에 조회
CREATE OR REPLACE FUNCTION public.get_user_profile()
RETURNS JSONB AS $$
DECLARE
  profile_data JSONB;
  sub_data JSONB;
  usage_data JSONB;
BEGIN
  SELECT to_jsonb(p.*) INTO profile_data
  FROM public.profiles p
  WHERE p.id = auth.uid();

  SELECT to_jsonb(s.*) INTO sub_data
  FROM public.subscriptions s
  WHERE s.user_id = auth.uid() AND s.status = 'active'
  ORDER BY s.created_at DESC
  LIMIT 1;

  SELECT to_jsonb(d.*) INTO usage_data
  FROM public.daily_usage d
  WHERE d.user_id = auth.uid() AND d.usage_date = CURRENT_DATE;

  RETURN jsonb_build_object(
    'profile', COALESCE(profile_data, '{}'::jsonb),
    'subscription', COALESCE(sub_data, '{}'::jsonb),
    'daily_usage', COALESCE(usage_data, jsonb_build_object('analysis_count', 0, 'search_count', 0, 'export_count', 0))
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 분석 결과 저장
CREATE OR REPLACE FUNCTION public.save_analysis(
  p_ingredients JSONB,
  p_method TEXT,
  p_temperature NUMERIC,
  p_duration NUMERIC,
  p_oil_amount NUMERIC,
  p_member_profiles JSONB,
  p_reactions JSONB,
  p_nutrition JSONB,
  p_flavor JSONB,
  p_health JSONB
)
RETURNS UUID AS $$
DECLARE
  new_id UUID;
BEGIN
  INSERT INTO public.analysis_history (
    user_id, ingredients, method, temperature, duration, oil_amount,
    member_profiles, reactions, nutrition, flavor, health
  ) VALUES (
    auth.uid(), p_ingredients, p_method, p_temperature, p_duration, p_oil_amount,
    p_member_profiles, p_reactions, p_nutrition, p_flavor, p_health
  ) RETURNING id INTO new_id;

  RETURN new_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ══════════════════════════════════════════════════════════════
-- DONE! 스키마 생성 완료
-- Supabase Dashboard → Authentication → Settings에서:
--   1. Email auth 활성화
--   2. Google OAuth 설정 (Google Cloud Console에서 Client ID/Secret 발급)
--   3. Site URL: https://mealcule.com
--   4. Redirect URLs: https://mealcule.com
-- ══════════════════════════════════════════════════════════════
