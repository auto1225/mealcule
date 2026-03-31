-- ══════════════════════════════════════════════════════════════
-- Mealcule Phase 3 — Social / Community Features
-- 커뮤니티 기능을 위한 DB 마이그레이션
-- 실행: Supabase Dashboard → SQL Editor에서 실행
-- ══════════════════════════════════════════════════════════════

-- ── 1. SHARED RECIPES (공개 레시피 공유) ──
CREATE TABLE public.shared_recipes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  recipe_id UUID REFERENCES public.saved_recipes(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  title_en TEXT,
  description TEXT,
  tags JSONB DEFAULT '[]',
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  like_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_shared_recipes_user ON public.shared_recipes(user_id);
CREATE INDEX idx_shared_recipes_created ON public.shared_recipes(created_at DESC);
CREATE INDEX idx_shared_recipes_featured ON public.shared_recipes(is_featured) WHERE is_featured = true;

ALTER TABLE public.shared_recipes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view shared recipes"
  ON public.shared_recipes FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own shared recipes"
  ON public.shared_recipes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own shared recipes"
  ON public.shared_recipes FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own shared recipes"
  ON public.shared_recipes FOR DELETE
  USING (auth.uid() = user_id);

-- ── 2. RECIPE LIKES (좋아요 추적) ──
CREATE TABLE public.recipe_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  shared_recipe_id UUID REFERENCES public.shared_recipes(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, shared_recipe_id)
);

ALTER TABLE public.recipe_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view recipe likes"
  ON public.recipe_likes FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert own likes"
  ON public.recipe_likes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own likes"
  ON public.recipe_likes FOR DELETE
  USING (auth.uid() = user_id);

-- ── 3. RECIPE COMMENTS (레시피 댓글) ──
CREATE TABLE public.recipe_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  shared_recipe_id UUID REFERENCES public.shared_recipes(id) ON DELETE CASCADE NOT NULL,
  parent_id UUID REFERENCES public.recipe_comments(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  is_edited BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_recipe_comments_shared ON public.recipe_comments(shared_recipe_id);
CREATE INDEX idx_recipe_comments_parent ON public.recipe_comments(parent_id);

CREATE TRIGGER recipe_comments_updated_at
  BEFORE UPDATE ON public.recipe_comments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

ALTER TABLE public.recipe_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view recipe comments"
  ON public.recipe_comments FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert own comments"
  ON public.recipe_comments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own comments"
  ON public.recipe_comments FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments"
  ON public.recipe_comments FOR DELETE
  USING (auth.uid() = user_id);

-- ── 4. USER FOLLOWS (팔로우 관계) ──
CREATE TABLE public.user_follows (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  follower_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  following_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (follower_id, following_id),
  CHECK (follower_id != following_id)
);

CREATE INDEX idx_user_follows_follower ON public.user_follows(follower_id);
CREATE INDEX idx_user_follows_following ON public.user_follows(following_id);

ALTER TABLE public.user_follows ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view follows"
  ON public.user_follows FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own follows"
  ON public.user_follows FOR INSERT
  WITH CHECK (auth.uid() = follower_id);

CREATE POLICY "Users can delete own follows"
  ON public.user_follows FOR DELETE
  USING (auth.uid() = follower_id);

-- ── 5. RPC: 좋아요 토글 ──
CREATE OR REPLACE FUNCTION public.toggle_recipe_like(p_user_id UUID, p_shared_recipe_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  v_exists BOOLEAN;
BEGIN
  -- Check if a like already exists
  SELECT EXISTS(
    SELECT 1 FROM public.recipe_likes
    WHERE user_id = p_user_id AND shared_recipe_id = p_shared_recipe_id
  ) INTO v_exists;

  IF v_exists THEN
    -- Remove like
    DELETE FROM public.recipe_likes
    WHERE user_id = p_user_id AND shared_recipe_id = p_shared_recipe_id;

    -- Decrement like_count
    UPDATE public.shared_recipes
    SET like_count = GREATEST(like_count - 1, 0)
    WHERE id = p_shared_recipe_id;

    RETURN false;
  ELSE
    -- Add like
    INSERT INTO public.recipe_likes (user_id, shared_recipe_id)
    VALUES (p_user_id, p_shared_recipe_id);

    -- Increment like_count
    UPDATE public.shared_recipes
    SET like_count = like_count + 1
    WHERE id = p_shared_recipe_id;

    RETURN true;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ── 6. RPC: 커뮤니티 피드 조회 ──
CREATE OR REPLACE FUNCTION public.get_community_feed(p_limit INT DEFAULT 20, p_offset INT DEFAULT 0)
RETURNS TABLE (
  id UUID,
  user_id UUID,
  recipe_id UUID,
  title TEXT,
  title_en TEXT,
  description TEXT,
  tags JSONB,
  image_url TEXT,
  is_featured BOOLEAN,
  like_count INTEGER,
  view_count INTEGER,
  created_at TIMESTAMPTZ,
  user_name TEXT,
  user_avatar TEXT,
  comment_count BIGINT
) AS $$
  SELECT
    sr.id,
    sr.user_id,
    sr.recipe_id,
    sr.title,
    sr.title_en,
    sr.description,
    sr.tags,
    sr.image_url,
    sr.is_featured,
    sr.like_count,
    sr.view_count,
    sr.created_at,
    p.name AS user_name,
    p.avatar_url AS user_avatar,
    COALESCE(cc.cnt, 0) AS comment_count
  FROM public.shared_recipes sr
  JOIN public.profiles p ON p.id = sr.user_id
  LEFT JOIN LATERAL (
    SELECT COUNT(*) AS cnt
    FROM public.recipe_comments rc
    WHERE rc.shared_recipe_id = sr.id
  ) cc ON true
  ORDER BY sr.created_at DESC
  LIMIT p_limit
  OFFSET p_offset;
$$ LANGUAGE sql SECURITY DEFINER;
