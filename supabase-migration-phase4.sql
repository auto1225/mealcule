-- ══════════════════════════════════════════════════════════════
-- Mealcule Phase 4 — Health Tracking (Nutrition Goals, Logs, Scores)
-- Daily nutrition tracking, goal management, and health score computation
-- Run: Supabase Dashboard → SQL Editor
-- ══════════════════════════════════════════════════════════════

-- ── 1. NUTRITION GOALS (per-user daily nutrition targets) ──
CREATE TABLE public.nutrition_goals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  calories NUMERIC DEFAULT 2000,
  protein NUMERIC DEFAULT 50,
  fat NUMERIC DEFAULT 65,
  carbs NUMERIC DEFAULT 300,
  fiber NUMERIC DEFAULT 25,
  sodium NUMERIC DEFAULT 2300,
  sugar NUMERIC DEFAULT 50,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE UNIQUE INDEX idx_nutrition_goals_user_active
  ON public.nutrition_goals(user_id) WHERE is_active = true;

CREATE TRIGGER nutrition_goals_updated_at
  BEFORE UPDATE ON public.nutrition_goals
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

ALTER TABLE public.nutrition_goals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own nutrition goals"
  ON public.nutrition_goals FOR ALL
  USING (auth.uid() = user_id);

-- ── 2. NUTRITION LOGS (daily nutrition intake records) ──
CREATE TABLE public.nutrition_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  log_date DATE NOT NULL,
  meal_type TEXT CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack', 'total')),
  source TEXT DEFAULT 'meal_plan' CHECK (source IN ('meal_plan', 'manual', 'scan')),
  source_id UUID,
  meal_name TEXT,
  calories NUMERIC DEFAULT 0,
  protein NUMERIC DEFAULT 0,
  fat NUMERIC DEFAULT 0,
  carbs NUMERIC DEFAULT 0,
  fiber NUMERIC DEFAULT 0,
  sodium NUMERIC DEFAULT 0,
  sugar NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_nutrition_logs_user_date ON public.nutrition_logs(user_id, log_date);
CREATE INDEX idx_nutrition_logs_date_desc ON public.nutrition_logs(log_date DESC);

ALTER TABLE public.nutrition_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own nutrition logs"
  ON public.nutrition_logs FOR ALL
  USING (auth.uid() = user_id);

-- ── 3. HEALTH SCORES (daily computed health scores) ──
CREATE TABLE public.health_scores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  score_date DATE NOT NULL,
  overall_score NUMERIC CHECK (overall_score BETWEEN 0 AND 100),
  breakdown JSONB DEFAULT '{}',
  factors JSONB DEFAULT '[]',
  meal_plan_id UUID REFERENCES public.meal_plans(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE UNIQUE INDEX idx_health_scores_user_date
  ON public.health_scores(user_id, score_date);

ALTER TABLE public.health_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own health scores"
  ON public.health_scores FOR ALL
  USING (auth.uid() = user_id);

-- ── 4. RPC: Daily nutrition summary with goal comparison ──
CREATE OR REPLACE FUNCTION public.get_nutrition_summary(
  p_user_id UUID,
  p_start DATE,
  p_end DATE
)
RETURNS JSONB AS $$
DECLARE
  v_goal RECORD;
  v_result JSONB := '{}';
  v_day RECORD;
BEGIN
  -- Fetch the user's active nutrition goal
  SELECT calories, protein, fat, carbs, fiber, sodium, sugar
  INTO v_goal
  FROM public.nutrition_goals
  WHERE user_id = p_user_id AND is_active = true
  LIMIT 1;

  -- Fall back to defaults if no goal exists
  IF v_goal IS NULL THEN
    v_goal := ROW(2000, 50, 65, 300, 25, 2300, 50);
  END IF;

  -- Aggregate nutrition per day within the date range
  FOR v_day IN
    SELECT
      log_date,
      COALESCE(SUM(calories), 0) AS sum_calories,
      COALESCE(SUM(protein), 0)  AS sum_protein,
      COALESCE(SUM(fat), 0)      AS sum_fat,
      COALESCE(SUM(carbs), 0)    AS sum_carbs,
      COALESCE(SUM(fiber), 0)    AS sum_fiber,
      COALESCE(SUM(sodium), 0)   AS sum_sodium,
      COALESCE(SUM(sugar), 0)    AS sum_sugar
    FROM public.nutrition_logs
    WHERE user_id = p_user_id
      AND log_date BETWEEN p_start AND p_end
    GROUP BY log_date
    ORDER BY log_date
  LOOP
    v_result := v_result || jsonb_build_object(
      v_day.log_date::text,
      jsonb_build_object(
        'actual', jsonb_build_object(
          'calories', v_day.sum_calories,
          'protein',  v_day.sum_protein,
          'fat',      v_day.sum_fat,
          'carbs',    v_day.sum_carbs,
          'fiber',    v_day.sum_fiber,
          'sodium',   v_day.sum_sodium,
          'sugar',    v_day.sum_sugar
        ),
        'goal', jsonb_build_object(
          'calories', v_goal.calories,
          'protein',  v_goal.protein,
          'fat',      v_goal.fat,
          'carbs',    v_goal.carbs,
          'fiber',    v_goal.fiber,
          'sodium',   v_goal.sodium,
          'sugar',    v_goal.sugar
        ),
        'pct', jsonb_build_object(
          'calories', CASE WHEN v_goal.calories > 0 THEN ROUND(v_day.sum_calories / v_goal.calories * 100) ELSE 0 END,
          'protein',  CASE WHEN v_goal.protein  > 0 THEN ROUND(v_day.sum_protein  / v_goal.protein  * 100) ELSE 0 END,
          'fat',      CASE WHEN v_goal.fat      > 0 THEN ROUND(v_day.sum_fat      / v_goal.fat      * 100) ELSE 0 END,
          'carbs',    CASE WHEN v_goal.carbs    > 0 THEN ROUND(v_day.sum_carbs    / v_goal.carbs    * 100) ELSE 0 END,
          'fiber',    CASE WHEN v_goal.fiber    > 0 THEN ROUND(v_day.sum_fiber    / v_goal.fiber    * 100) ELSE 0 END,
          'sodium',   CASE WHEN v_goal.sodium   > 0 THEN ROUND(v_day.sum_sodium   / v_goal.sodium   * 100) ELSE 0 END,
          'sugar',    CASE WHEN v_goal.sugar    > 0 THEN ROUND(v_day.sum_sugar    / v_goal.sugar    * 100) ELSE 0 END
        )
      )
    );
  END LOOP;

  RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ── 5. RPC: Weekly health score trend ──
CREATE OR REPLACE FUNCTION public.get_weekly_health_trend(
  p_user_id UUID,
  p_weeks INT DEFAULT 4
)
RETURNS JSONB AS $$
  SELECT COALESCE(
    jsonb_agg(
      jsonb_build_object(
        'week_start', week_start,
        'week_end',   week_end,
        'avg_score',  avg_score,
        'days_count', days_count
      ) ORDER BY week_start
    ),
    '[]'::jsonb
  )
  FROM (
    SELECT
      DATE_TRUNC('week', score_date)::date                    AS week_start,
      (DATE_TRUNC('week', score_date) + INTERVAL '6 days')::date AS week_end,
      ROUND(AVG(overall_score), 1)                            AS avg_score,
      COUNT(*)                                                AS days_count
    FROM public.health_scores
    WHERE user_id = p_user_id
      AND score_date >= CURRENT_DATE - (p_weeks * 7)
    GROUP BY DATE_TRUNC('week', score_date)
    ORDER BY week_start
  ) sub;
$$ LANGUAGE sql SECURITY DEFINER;
