// POST /api/generate-grocery-list
// 식단 플래너에서 장보기 목록 자동 생성 (Supabase RPC)
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    return res.status(500).json({ error: 'Supabase configuration missing' });
  }

  const { meal_plan_id, user_id } = req.body || {};
  if (!meal_plan_id || !user_id) {
    return res.status(400).json({ error: 'meal_plan_id and user_id required' });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    const { data: listId, error } = await supabase.rpc('generate_grocery_from_plan', {
      p_plan_id: meal_plan_id,
      p_user_id: user_id
    });

    if (error) {
      console.error('RPC error:', error);
      return res.status(500).json({ error: error.message });
    }

    // Fetch the generated items
    const { data: items, error: itemsError } = await supabase
      .from('grocery_items')
      .select('*')
      .eq('list_id', listId)
      .order('category')
      .order('ingredient_name');

    if (itemsError) {
      console.error('Items fetch error:', itemsError);
      return res.status(500).json({ error: itemsError.message });
    }

    // Fetch the list metadata (for share_token)
    const { data: list } = await supabase
      .from('grocery_lists')
      .select('*')
      .eq('id', listId)
      .single();

    return res.status(200).json({
      list_id: listId,
      share_token: list?.share_token,
      items: items || [],
      total: items?.length || 0
    });

  } catch (e) {
    console.error('Generate grocery list error:', e);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
