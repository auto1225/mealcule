-- ══════════════════════════════════════════════════════════════
-- Mealcule Phase 1 — Recipe Box + Meal Planner + Grocery List
-- Samsung Food 기능 통합을 위한 DB 마이그레이션
-- 실행: Supabase Dashboard → SQL Editor에서 실행
-- ══════════════════════════════════════════════════════════════

-- ── 1. RECIPE COLLECTIONS (레시피 컬렉션) ──
CREATE TABLE public.recipe_collections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  name_en TEXT,
  description TEXT,
  emoji TEXT DEFAULT '📁',
  color TEXT DEFAULT '#059669',
  is_default BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_collections_user ON public.recipe_collections(user_id);

CREATE TRIGGER recipe_collections_updated_at
  BEFORE UPDATE ON public.recipe_collections
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

ALTER TABLE public.recipe_collections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own collections"
  ON public.recipe_collections FOR ALL
  USING (auth.uid() = user_id);

-- ── 2. SAVED RECIPES (저장된 레시피) ──
CREATE TABLE public.saved_recipes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  -- 레시피 데이터 (AI 응답에서 비정규화)
  name TEXT NOT NULL,
  name_en TEXT,
  description TEXT,
  cuisine TEXT,
  difficulty TEXT,
  health_note TEXT,
  allergens JSONB DEFAULT '[]',
  youtube_query TEXT,
  -- 분석 컨텍스트 (저장 시점의 재료/조리법)
  ingredients JSONB NOT NULL DEFAULT '[]',   -- [{name, grams, en}]
  method TEXT,
  temperature NUMERIC,
  duration NUMERIC,
  -- 영양/맛 스냅샷 (저장 시점)
  nutrition_snapshot JSONB DEFAULT '{}',
  flavor_snapshot JSONB DEFAULT '{}',
  health_snapshot JSONB DEFAULT '{}',
  -- 정리
  collection_id UUID REFERENCES public.recipe_collections(id) ON DELETE SET NULL,
  notes TEXT,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  tags JSONB DEFAULT '[]',
  is_favorite BOOLEAN DEFAULT false,
  -- 출처
  source TEXT DEFAULT 'ai' CHECK (source IN ('ai', 'manual', 'import', 'community')),
  source_url TEXT,
  -- 메타
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_saved_recipes_user ON public.saved_recipes(user_id);
CREATE INDEX idx_saved_recipes_collection ON public.saved_recipes(collection_id);
CREATE INDEX idx_saved_recipes_favorite ON public.saved_recipes(user_id, is_favorite) WHERE is_favorite = true;
CREATE INDEX idx_saved_recipes_created ON public.saved_recipes(user_id, created_at DESC);

CREATE TRIGGER saved_recipes_updated_at
  BEFORE UPDATE ON public.saved_recipes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

ALTER TABLE public.saved_recipes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own saved recipes"
  ON public.saved_recipes FOR ALL
  USING (auth.uid() = user_id);

-- ── 3. MEAL PLANS (주간 식단 계획) ──
CREATE TABLE public.meal_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  week_start DATE NOT NULL,              -- 해당 주 월요일
  name TEXT,                              -- "Week 13 Plan" 등 선택적 라벨
  is_active BOOLEAN DEFAULT true,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE UNIQUE INDEX idx_meal_plans_user_week
  ON public.meal_plans(user_id, week_start) WHERE is_active = true;

CREATE TRIGGER meal_plans_updated_at
  BEFORE UPDATE ON public.meal_plans
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

ALTER TABLE public.meal_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own meal plans"
  ON public.meal_plans FOR ALL
  USING (auth.uid() = user_id);

-- ── 4. MEAL PLAN ITEMS (식단 항목) ──
CREATE TABLE public.meal_plan_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  meal_plan_id UUID REFERENCES public.meal_plans(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  -- 캘린더 위치
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),  -- 0=월, 6=일
  meal_type TEXT NOT NULL CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')),
  -- 레시피 참조 (없으면 수동 입력)
  recipe_id UUID REFERENCES public.saved_recipes(id) ON DELETE SET NULL,
  -- 수동 입력 필드
  custom_name TEXT,
  custom_name_en TEXT,
  custom_emoji TEXT DEFAULT '🍽️',
  custom_ingredients JSONB,
  -- 영양 캐시 (레시피 or 수동에서)
  calories NUMERIC DEFAULT 0,
  protein NUMERIC DEFAULT 0,
  fat NUMERIC DEFAULT 0,
  carbs NUMERIC DEFAULT 0,
  fiber NUMERIC DEFAULT 0,
  -- 정렬/메모
  sort_order INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_meal_items_plan ON public.meal_plan_items(meal_plan_id);
CREATE INDEX idx_meal_items_user ON public.meal_plan_items(user_id);

ALTER TABLE public.meal_plan_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own meal plan items"
  ON public.meal_plan_items FOR ALL
  USING (auth.uid() = user_id);

-- ── 5. GROCERY LISTS (장보기 목록) ──
CREATE TABLE public.grocery_lists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  meal_plan_id UUID REFERENCES public.meal_plans(id) ON DELETE SET NULL,
  name TEXT,
  week_label TEXT,
  is_active BOOLEAN DEFAULT true,
  share_token TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_grocery_lists_user ON public.grocery_lists(user_id);

CREATE TRIGGER grocery_lists_updated_at
  BEFORE UPDATE ON public.grocery_lists
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

ALTER TABLE public.grocery_lists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own grocery lists"
  ON public.grocery_lists FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view shared grocery lists"
  ON public.grocery_lists FOR SELECT
  USING (share_token IS NOT NULL);

-- ── 6. GROCERY ITEMS (장보기 항목) ──
CREATE TABLE public.grocery_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  list_id UUID REFERENCES public.grocery_lists(id) ON DELETE CASCADE NOT NULL,
  -- 재료 정보
  ingredient_name TEXT NOT NULL,
  ingredient_name_en TEXT,
  category TEXT,                           -- CATEGORIES id (meat, veg 등)
  emoji TEXT,
  -- 수량
  quantity NUMERIC NOT NULL DEFAULT 0,
  unit TEXT DEFAULT 'g',                   -- 'g', 'ml', 'ea', 'pack'
  -- 출처 (어떤 레시피에서 필요한지)
  source_recipes JSONB DEFAULT '[]',       -- [{recipe_name, amount}]
  -- 상태
  is_checked BOOLEAN DEFAULT false,
  is_manual BOOLEAN DEFAULT false,
  notes TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_grocery_items_list ON public.grocery_items(list_id);

ALTER TABLE public.grocery_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage grocery items via list ownership"
  ON public.grocery_items FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.grocery_lists gl
      WHERE gl.id = list_id AND gl.user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can view shared grocery items"
  ON public.grocery_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.grocery_lists gl
      WHERE gl.id = list_id AND gl.share_token IS NOT NULL
    )
  );

-- ── 7. RPC: 식단 영양 합계 조회 ──
CREATE OR REPLACE FUNCTION public.get_meal_plan_nutrition(p_plan_id UUID)
RETURNS JSONB AS $$
  SELECT COALESCE(
    jsonb_object_agg(day_of_week::text, day_totals),
    '{}'::jsonb
  )
  FROM (
    SELECT day_of_week, jsonb_build_object(
      'calories', COALESCE(SUM(calories), 0),
      'protein', COALESCE(SUM(protein), 0),
      'fat', COALESCE(SUM(fat), 0),
      'carbs', COALESCE(SUM(carbs), 0),
      'fiber', COALESCE(SUM(fiber), 0),
      'meal_count', COUNT(*)
    ) as day_totals
    FROM public.meal_plan_items
    WHERE meal_plan_id = p_plan_id
    GROUP BY day_of_week
  ) sub;
$$ LANGUAGE sql SECURITY DEFINER;

-- ── 8. RPC: 장보기 목록 재료 합산 생성 ──
CREATE OR REPLACE FUNCTION public.generate_grocery_from_plan(p_plan_id UUID, p_user_id UUID)
RETURNS UUID AS $$
DECLARE
  v_list_id UUID;
  v_week TEXT;
BEGIN
  -- 주간 라벨 생성
  SELECT TO_CHAR(week_start, 'YYYY-MM-DD') INTO v_week
  FROM public.meal_plans WHERE id = p_plan_id AND user_id = p_user_id;

  IF v_week IS NULL THEN
    RAISE EXCEPTION 'Meal plan not found or unauthorized';
  END IF;

  -- 기존 목록이 있으면 재사용, 없으면 생성
  SELECT id INTO v_list_id
  FROM public.grocery_lists
  WHERE meal_plan_id = p_plan_id AND user_id = p_user_id AND is_active = true
  LIMIT 1;

  IF v_list_id IS NULL THEN
    INSERT INTO public.grocery_lists (user_id, meal_plan_id, week_label, share_token)
    VALUES (p_user_id, p_plan_id, v_week, encode(gen_random_bytes(16), 'hex'))
    RETURNING id INTO v_list_id;
  ELSE
    -- 기존 자동 생성 항목 삭제 (수동 항목은 유지)
    DELETE FROM public.grocery_items WHERE list_id = v_list_id AND is_manual = false;
  END IF;

  -- 식단의 모든 레시피 재료를 합산하여 삽입
  INSERT INTO public.grocery_items (list_id, ingredient_name, ingredient_name_en, category, emoji, quantity, unit, source_recipes)
  SELECT
    v_list_id,
    ing->>'name',
    ing->>'en',
    ing->>'cat',
    ing->>'emoji',
    SUM((ing->>'grams')::numeric),
    'g',
    jsonb_agg(jsonb_build_object(
      'recipe_name', COALESCE(sr.name, mpi.custom_name, 'Manual'),
      'amount', (ing->>'grams')::numeric
    ))
  FROM public.meal_plan_items mpi
  LEFT JOIN public.saved_recipes sr ON sr.id = mpi.recipe_id
  CROSS JOIN LATERAL jsonb_array_elements(
    CASE
      WHEN mpi.recipe_id IS NOT NULL THEN sr.ingredients
      WHEN mpi.custom_ingredients IS NOT NULL THEN mpi.custom_ingredients
      ELSE '[]'::jsonb
    END
  ) AS ing
  WHERE mpi.meal_plan_id = p_plan_id
  GROUP BY ing->>'name', ing->>'en', ing->>'cat', ing->>'emoji';

  RETURN v_list_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
