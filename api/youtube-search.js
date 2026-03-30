// GET /api/youtube-search?q=...&order=date|viewCount|rating&maxResults=6&lang=ko&region=KR
// YouTube Data API v3 래퍼 — YOUTUBE_API_KEY 환경변수 필요
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  if (!YOUTUBE_API_KEY) return res.status(500).json({ error: 'YOUTUBE_API_KEY missing' });

  const { q, order = 'relevance', maxResults = '6', lang = '', region = '' } = req.query;
  if (!q) return res.status(400).json({ error: 'q parameter required' });

  try {
    // ── 1. Search ──────────────────────────────────────────────────────
    const searchParams = new URLSearchParams({
      part: 'snippet',
      q,
      type: 'video',
      order,
      maxResults,
      key: YOUTUBE_API_KEY,
    });
    if (lang)   searchParams.set('relevanceLanguage', lang);
    if (region) searchParams.set('regionCode', region);

    const searchRes = await fetch(`https://www.googleapis.com/youtube/v3/search?${searchParams}`);
    const searchData = await searchRes.json();

    if (searchData.error) {
      return res.status(502).json({ error: searchData.error.message, code: searchData.error.code });
    }

    const items = searchData.items || [];
    if (items.length === 0) return res.json({ videos: [] });

    const videoIds = items.map(i => i.id.videoId).filter(Boolean).join(',');

    // ── 2. Statistics + duration ───────────────────────────────────────
    const statsParams = new URLSearchParams({
      part: 'statistics,contentDetails',
      id: videoIds,
      key: YOUTUBE_API_KEY,
    });
    const statsRes = await fetch(`https://www.googleapis.com/youtube/v3/videos?${statsParams}`);
    const statsData = await statsRes.json();

    const statsMap = {};
    (statsData.items || []).forEach(v => { statsMap[v.id] = v; });

    let videos = items
      .filter(item => item.id?.videoId)
      .map(item => {
        const vid = item.id.videoId;
        const sn  = item.snippet;
        const st  = statsMap[vid]?.statistics || {};
        const dur = statsMap[vid]?.contentDetails?.duration || '';
        return {
          id:          vid,
          title:       sn.title,
          channel:     sn.channelTitle,
          thumbnail:   sn.thumbnails?.medium?.url || sn.thumbnails?.default?.url || '',
          publishedAt: sn.publishedAt,
          viewCount:   parseInt(st.viewCount  || 0),
          likeCount:   parseInt(st.likeCount  || 0),
          duration:    parseDuration(dur),
        };
      });

    // Re-sort (YouTube search API order isn't always accurate for viewCount/rating)
    if (order === 'viewCount') videos.sort((a, b) => b.viewCount - a.viewCount);
    if (order === 'rating')    videos.sort((a, b) => b.likeCount - a.likeCount);

    return res.json({ videos });
  } catch (e) {
    return res.status(502).json({ error: 'YouTube 검색 실패', detail: e.message });
  }
}

// ISO 8601 duration → "MM:SS" or "HH:MM:SS"
function parseDuration(iso) {
  if (!iso) return '';
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return '';
  const h = parseInt(m[1] || 0), min = parseInt(m[2] || 0), sec = parseInt(m[3] || 0);
  if (h > 0) return `${h}:${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
  return `${min}:${String(sec).padStart(2,'0')}`;
}
