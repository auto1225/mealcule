-- ══════════════════════════════════════════════════════════════
-- Mealcule i18n Migration
-- 다국어 지원을 위한 DB 구조 변경
-- _en 컬럼 방식 → translations JSONB 방식으로 통합
-- ══════════════════════════════════════════════════════════════

-- ── 1. categories: label_en → translations JSONB ──
ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS translations JSONB DEFAULT '{}';

UPDATE public.categories SET translations = CASE id
  WHEN 'meat'      THEN '{"en":"Meat","ja":"肉類","zh":"肉类","es":"Carnes","fr":"Viandes"}'
  WHEN 'seafood'   THEN '{"en":"Seafood","ja":"魚介類","zh":"海鲜","es":"Mariscos","fr":"Fruits de mer"}'
  WHEN 'veg'       THEN '{"en":"Vegetables","ja":"野菜","zh":"蔬菜","es":"Verduras","fr":"Légumes"}'
  WHEN 'fruit'     THEN '{"en":"Fruits","ja":"果物","zh":"水果","es":"Frutas","fr":"Fruits"}'
  WHEN 'dairy'     THEN '{"en":"Dairy","ja":"乳製品","zh":"乳制品","es":"Lácteos","fr":"Produits laitiers"}'
  WHEN 'grain'     THEN '{"en":"Grains","ja":"穀物","zh":"谷物","es":"Cereales","fr":"Céréales"}'
  WHEN 'egg'       THEN '{"en":"Eggs","ja":"卵","zh":"蛋类","es":"Huevos","fr":"Œufs"}'
  WHEN 'oil'       THEN '{"en":"Oils & Fats","ja":"油脂","zh":"油脂","es":"Aceites","fr":"Huiles"}'
  WHEN 'sauce'     THEN '{"en":"Sauces & Seasonings","ja":"調味料","zh":"调味料","es":"Salsas","fr":"Sauces"}'
  WHEN 'nut'       THEN '{"en":"Nuts & Seeds","ja":"ナッツ","zh":"坚果","es":"Nueces","fr":"Noix"}'
  WHEN 'legume'    THEN '{"en":"Legumes","ja":"豆類","zh":"豆类","es":"Legumbres","fr":"Légumineuses"}'
  WHEN 'mushroom'  THEN '{"en":"Mushrooms","ja":"きのこ","zh":"菌菇","es":"Hongos","fr":"Champignons"}'
  WHEN 'herb'      THEN '{"en":"Herbs & Spices","ja":"ハーブ・スパイス","zh":"香草香料","es":"Hierbas","fr":"Épices"}'
  WHEN 'processed' THEN '{"en":"Processed Foods","ja":"加工食品","zh":"加工食品","es":"Procesados","fr":"Transformés"}'
  WHEN 'beverage'  THEN '{"en":"Beverages","ja":"飲料","zh":"饮料","es":"Bebidas","fr":"Boissons"}'
  ELSE '{}'
END::jsonb;

ALTER TABLE public.categories DROP COLUMN IF EXISTS label_en;

-- ── 2. ingredients: name_en → translations JSONB ──
ALTER TABLE public.ingredients ADD COLUMN IF NOT EXISTS translations JSONB DEFAULT '{}';

-- 기존 name_en 데이터를 translations.en으로 이전
UPDATE public.ingredients
SET translations = jsonb_build_object('en', name_en)
WHERE name_en IS NOT NULL AND name_en != '';

-- name_en 인덱스 제거 후 컬럼 삭제
DROP INDEX IF EXISTS idx_ingredients_name_en;
ALTER TABLE public.ingredients DROP COLUMN IF EXISTS name_en;

-- translations 검색용 GIN 인덱스 추가
CREATE INDEX IF NOT EXISTS idx_ingredients_translations
  ON public.ingredients USING gin(translations);

-- ── 3. reactions: name_en/description_en/pro_detail_en → translations JSONB ──
ALTER TABLE public.reactions ADD COLUMN IF NOT EXISTS translations JSONB DEFAULT '{}';

-- 기존 _en 데이터를 translations.en으로 이전
UPDATE public.reactions
SET translations = jsonb_build_object(
  'en', jsonb_strip_nulls(jsonb_build_object(
    'name',       name_en,
    'description', description_en,
    'pro_detail',  pro_detail_en
  ))
)
WHERE name_en IS NOT NULL;

-- 영어 번역 데이터가 없는 경우 기본값 삽입
UPDATE public.reactions SET translations = CASE key
  WHEN 'maillard' THEN '{"en":{"name":"Maillard Reaction","description":"Amino acids + reducing sugars react above 140°C → melanoidins + hundreds of flavor compounds"},"ja":{"name":"メイラード反応"},"zh":{"name":"美拉德反应"},"es":{"name":"Reacción de Maillard"},"fr":{"name":"Réaction de Maillard"}}'
  WHEN 'caramelization' THEN '{"en":{"name":"Caramelization","description":"Sugars decompose above 160°C → caramel aroma and brown color"},"ja":{"name":"カラメル化"},"zh":{"name":"焦糖化"},"es":{"name":"Caramelización"},"fr":{"name":"Caramélisation"}}'
  WHEN 'protein_denaturation' THEN '{"en":{"name":"Protein Denaturation","description":"Heat unfolds protein structure → texture and digestibility changes"},"ja":{"name":"タンパク質変性"},"zh":{"name":"蛋白质变性"}}'
  WHEN 'starch_gelatin' THEN '{"en":{"name":"Starch Gelatinization","description":"Starch granules absorb water and swell with heat → gel formation"},"ja":{"name":"デンプンの糊化"},"zh":{"name":"淀粉糊化"}}'
  WHEN 'vitamin_c_loss' THEN '{"en":{"name":"Vitamin C Degradation","description":"Ascorbic acid oxidizes rapidly under heat and oxygen exposure"},"ja":{"name":"ビタミンC損失"},"zh":{"name":"维生素C流失"}}'
  WHEN 'lipid_oxidation' THEN '{"en":{"name":"Lipid Oxidation","description":"Unsaturated fatty acids react with oxygen → rancidity and harmful compounds"},"ja":{"name":"脂質酸化"},"zh":{"name":"脂质氧化"}}'
  WHEN 'acrylamide' THEN '{"en":{"name":"Acrylamide Formation","description":"Asparagine + reducing sugars react above 120°C → potential carcinogen"},"ja":{"name":"アクリルアミド生成"},"zh":{"name":"丙烯酰胺生成"}}'
  WHEN 'nutrient_retention' THEN '{"en":{"name":"Nutrient Retention","description":"Gentle cooking methods preserve vitamins and minerals more effectively"},"ja":{"name":"栄養素保持"},"zh":{"name":"营养素保留"}}'
  ELSE translations
END::jsonb
WHERE translations = '{}' OR translations IS NULL;

ALTER TABLE public.reactions DROP COLUMN IF EXISTS name_en;
ALTER TABLE public.reactions DROP COLUMN IF EXISTS description_en;
ALTER TABLE public.reactions DROP COLUMN IF EXISTS pro_detail_en;

-- ── 4. subscriptions: currency 기본값 USD로 변경 ──
ALTER TABLE public.subscriptions ALTER COLUMN currency SET DEFAULT 'USD';

-- ── 완료 확인 ──
SELECT
  (SELECT count(*) FROM public.categories WHERE translations != '{}') AS categories_translated,
  (SELECT count(*) FROM public.reactions WHERE translations != '{}') AS reactions_translated,
  (SELECT count(*) FROM public.ingredients WHERE translations != '{}') AS ingredients_translated;
