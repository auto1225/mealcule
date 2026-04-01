// Vercel Serverless Function — GET /api/food-image?q=beef&lang=en
// Pexels API를 통해 식재료/조리방법 이미지 검색
// PEXELS_API_KEY 환경변수 필요

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'public, max-age=604800'); // 7일 캐시
  if (req.method === 'OPTIONS') return res.status(200).end();

  const q = (req.query.q || '').trim();
  if (!q || q.length > 100) {
    return res.status(400).json({ error: 'Invalid query' });
  }

  const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
  if (!PEXELS_API_KEY) {
    return res.status(500).json({ error: 'PEXELS_API_KEY not configured' });
  }

  try {
    // 음식 관련 검색어 보강
    const searchQuery = `${q} food`;
    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(searchQuery)}&per_page=1&orientation=square`;

    const pexRes = await fetch(url, {
      headers: { Authorization: PEXELS_API_KEY },
    });

    if (!pexRes.ok) {
      return res.status(502).json({ error: 'Pexels API error', status: pexRes.status });
    }

    const data = await pexRes.json();
    if (!data.photos || data.photos.length === 0) {
      return res.json({ url: null });
    }

    const photo = data.photos[0];
    // 다양한 크기 제공
    return res.json({
      url: photo.src.small,        // 130px
      tiny: photo.src.tiny,        // 280px compressed
      medium: photo.src.medium,    // 350px
      id: photo.id,
      alt: photo.alt || q,
    });
  } catch (e) {
    return res.status(502).json({ error: 'Pexels fetch failed', detail: e.message });
  }
}
