function cacheKey(q, page, limit, cat) {
  return `search:${q}:${cat}:${page}:${limit}`;
}

async function fetchSearch(q, page=1, limit=20, cat='') {
  const key = cacheKey(q, page, limit, cat);
  const raw = localStorage.getItem(key);
  if (raw) {
    try {
      const { ts, data } = JSON.parse(raw);
      if (Date.now() - ts < 30 * 1000) { // TTL 30s
        return data; // cache hit
      }
    } catch (e) {}
  }

  const res = await fetch(`/api/products/search?q=${encodeURIComponent(q)}&page=${page}&limit=${limit}&cat=${encodeURIComponent(cat)}`);
  const data = await res.json();
  localStorage.setItem(key, JSON.stringify({ ts: Date.now(), data }));
  return data;
}
