import { XMLParser } from 'fast-xml-parser';

// Curated, fixed publisher feeds. Never use an arbitrary caller-provided URL.
const FEEDS = {
  'vn-home': { url: 'https://e.vnexpress.net/rss/home.rss', source: 'VnExpress International', topic: 'vietnam' },
  'vn-business': { url: 'https://e.vnexpress.net/rss/business.rss', source: 'VnExpress International', topic: 'economy' },
  // Sports RSS is a MIXED feed. We only keep actual association-football items below.
  'vn-sports': { url: 'https://e.vnexpress.net/rss/sports.rss', source: 'VnExpress International', topic: 'football', mixedSports: true },
  'vn-tech': { url: 'https://e.vnexpress.net/rss/tech.rss', source: 'VnExpress International', topic: 'technology' },
  'vn-travel': { url: 'https://e.vnexpress.net/rss/travel.rss', source: 'VnExpress International', topic: 'culture' },
  'guardian-football': { url: 'https://www.theguardian.com/football/rss', source: 'The Guardian', topic: 'football' },
  'guardian-business': { url: 'https://www.theguardian.com/business/rss', source: 'The Guardian', topic: 'economy' },
  'guardian-world': { url: 'https://www.theguardian.com/world/rss', source: 'The Guardian', topic: 'world' },
  'guardian-tech': { url: 'https://www.theguardian.com/technology/rss', source: 'The Guardian', topic: 'technology' },
  'cna-asia': { url: 'https://www.channelnewsasia.com/api/v1/rss-outbound-feed?_format=xml&category=6511', source: 'CNA', topic: 'world' },
  'cna-business': { url: 'https://www.channelnewsasia.com/api/v1/rss-outbound-feed?_format=xml&category=6936', source: 'CNA', topic: 'economy' },
  'cna-sport': { url: 'https://www.channelnewsasia.com/api/v1/rss-outbound-feed?_format=xml&category=10296', source: 'CNA', topic: 'football', mixedSports: true },
  'cna-world': { url: 'https://www.channelnewsasia.com/api/v1/rss-outbound-feed?_format=xml&category=6311', source: 'CNA', topic: 'world' },
  'dw-world': { url: 'https://rss.dw.com/rdf/rss-en-all', source: 'DW', topic: 'world' },
  // Google News SEARCH RSS; links lead to indexed publishers, not first-party league RSS.
  'lol-lck': { url: 'https://news.google.com/rss/search?q=(%22LCK%22%20OR%20%22T1%22%20OR%20%22Gen.G%22%20OR%20%22Hanwha%20Life%20Esports%22%20OR%20%22Dplus%20KIA%22)%20%22League%20of%20Legends%22%20when%3A30d&hl=en-US&gl=US&ceid=US:en', source: 'Google News', topic: 'esports', league: 'lck', searchAggregator: true },
  'lol-lpl': { url: 'https://news.google.com/rss/search?q=(%22LPL%22%20OR%20%22Bilibili%20Gaming%22%20OR%20%22Top%20Esports%22%20OR%20%22JD%20Gaming%22%20OR%20%22Weibo%20Gaming%22)%20%22League%20of%20Legends%22%20when%3A30d&hl=en-US&gl=US&ceid=US:en', source: 'Google News', topic: 'esports', league: 'lpl', searchAggregator: true }
};
const BY_TOPIC = {
  all: ['vn-home', 'vn-business', 'vn-sports', 'guardian-football', 'guardian-business', 'guardian-world', 'vn-tech', 'vn-travel', 'lol-lck', 'lol-lpl'],
  vietnam: ['vn-home', 'vn-business', 'vn-travel'],
  football: ['vn-sports', 'guardian-football', 'cna-sport'],
  esports: ['lol-lck', 'lol-lpl'],
  // Vietnam business + UK/global markets + Southeast Asian economy in one dedicated desk.
  economy: ['vn-business', 'guardian-business', 'cna-business'],
  world: ['guardian-world', 'cna-world', 'dw-world'],
  technology: ['vn-tech', 'guardian-tech'],
  culture: ['vn-travel', 'cna-asia']
};
const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  trimValues: true,
  cdataPropName: '#text',
  parseTagValue: false,
  processEntities: true
});
const asArray = (v) => v == null ? [] : Array.isArray(v) ? v : [v];
const plain = (v) => {
  if (v == null) return '';
  if (typeof v === 'string') return v;
  if (typeof v === 'number') return String(v);
  if (typeof v === 'object') return plain(v['#text'] ?? v['__cdata'] ?? v['#cdata-section'] ?? '');
  return '';
};
const htmlEntities = (s) => s.replace(/&#(x[\da-f]+|\d+);/gi, (_, code) => {
  const point = code.toLowerCase().startsWith('x') ? parseInt(code.slice(1), 16) : parseInt(code, 10);
  return Number.isFinite(point) && point > 0 && point <= 0x10ffff ? String.fromCodePoint(point) : '';
}).replace(/&(amp|quot|apos|lt|gt|nbsp|rsquo|lsquo|ldquo|rdquo|ndash|mdash|hellip);/gi, (_, c) => ({
  amp:'&',quot:'"',apos:"'",lt:'<',gt:'>',nbsp:' ',rsquo:'’',lsquo:'‘',ldquo:'“',rdquo:'”',ndash:'–',mdash:'—',hellip:'…'
})[c.toLowerCase()] ?? '');
const strip = (v) => htmlEntities(plain(v).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim());
const cleanLink = (value) => {
  const candidate = typeof value === 'object' ? value?.['@_href'] ?? value?.['#text'] : value;
  try { const u = new URL(plain(candidate)); return ['https:', 'http:'].includes(u.protocol) ? u.href : ''; } catch { return ''; }
};
// Images are used ONLY if they appear in the RSS item (never scraped from an article).
const imageFrom = (item) => {
  const candidates = [
    ...asArray(item['media:content']), ...asArray(item['media:thumbnail']),
    ...asArray(item['media:group']).flatMap(g => [...asArray(g?.['media:content']), ...asArray(g?.['media:thumbnail'])]),
    ...asArray(item.enclosure), ...asArray(item.image?.url), ...asArray(item.image)
  ];
  for (const entry of candidates) {
    const kind = String(entry?.['@_type'] ?? '').toLowerCase();
    const medium = String(entry?.['@_medium'] ?? '').toLowerCase();
    if ((kind && !kind.startsWith('image/')) || (medium && medium !== 'image')) continue;
    const url = cleanLink(entry?.['@_url'] ?? entry?.['@_href'] ?? entry);
    if (url) return url;
  }
  for (const description of [item.description, item['content:encoded'], item.summary]) {
    const match = plain(description).match(/<img\b[^>]+src=["']([^"']+)["']/i);
    if (match) { const url = cleanLink(htmlEntities(match[1])); if (url) return url; }
  }
  return '';
};
// RSS descriptions are often absent. Respect that: never manufacture an article body.
const excerptFrom = (item, title) => {
  const choices = [item.description, item.summary, item['dc:description'], item['media:description'], item['content:encoded']];
  for (const c of choices) {
    const excerpt = strip(c).slice(0, 450).trim();
    if (excerpt && excerpt.toLowerCase() !== title.toLowerCase() && excerpt.length >= 20) return excerpt;
  }
  return '';
};
// Football ≠ every sport. Mixed sports feeds frequently carry F1, cricket, rugby, etc.
const OTHER_SPORTS = /\b(?:f\s?1|formula\s?(?:1|one)|formula e|grand prix|motor racing|nascar|motogp|cricket|rugby|six nations|nfl|nba|basketball|baseball|tennis|golf|badminton|volleyball|swimming|marathon|cycling|doping|athletics|world series|wimbledon|fiji rugby|ufc|mma|esports|e-sports|pickleball|snooker|hockey)\b/i;
const SOCCER_TERMS = /\b(?:football|soccer|fifa|uefa|afc|premier league|champions league|europa league|conference league|v-?league|la liga|bundesliga|serie a|ligue 1|world cup|asian cup|afc cup|aff cup|asean cup|national football team|goalkeeper|striker|midfielder|penalty shootout|penalty kick|free kick|offside|transfer window|football club|manchester (?:united|city)|man united|arsenal|liverpool|chelsea|tottenham|real madrid|barcelona|bayern munich|psg|inter milan|ac milan|juventus|newcastle united|everton|brighton|aston villa|nottingham forest|west ham|wolves|leicester|napoli|atletico madrid|vietnamese football|vietnam football|vietnam women's team|hanoi fc|ho chi minh city fc)\b/i;
export function isFootballStory(title, description = '', mixedSports = false) {
  const text = `${title} ${description}`;
  if (OTHER_SPORTS.test(text)) return false;
  // The Guardian's football-specific RSS is already categorized by the publisher.
  return !mixedSports || SOCCER_TERMS.test(text);
}
// Esports here means ONLY League of Legends coverage related to LCK or LPL.
const NOT_LOL = /\b(?:valorant|counter[- ]?strike|cs2|dota\s?2|pubg|overwatch|mobile legends|wild rift|arena of valor|tft|teamfight tactics|fortnite|call of duty)\b/i;
const LCK_TERMS = /\b(?:lck|league of legends champions korea|t1|gen\.?g|hanwha life(?: esports)?|hle|dplus(?: kia)?|dk|kt rolster|nongshim redforce|b[nk]? fearx|brion|dn soopers|faker|chovy|showmaker|peanut|gumayusi|keria|zeus|canyon|ruler)\b/i;
const LPL_TERMS = /\b(?:lpl|league of legends pro league|bilibili gaming|blg|top esports|tes|jd gaming|jdg|weibo gaming|wbg|invictus gaming|ig|edward gaming|edg|funplus phoenix|fpx|lng esports|anyone'?s legend|al|royal never give up|rng|xiaohu|knight|bin|elk|jackeylove|theshy|meiko)\b/i;
export function lolLeagueOf(title, excerpt = '', requested = '') {
  const t = String(title || '') + ' ' + String(excerpt || '');
  if (NOT_LOL.test(t)) return '';
  // Search-specific RSS is already restricted by "League of Legends"; require a named league/team.
  const ck=LCK_TERMS.test(t), pl=LPL_TERMS.test(t);
  if (requested === 'lck') return ck ? 'lck' : '';
  if (requested === 'lpl') return pl ? 'lpl' : '';
  return ck && !pl ? 'lck' : pl && !ck ? 'lpl' : '';
}
const calcLevel = (s) => {
  const w = s.toLowerCase().match(/[a-z]+(?:'[a-z]+)?/g) ?? [];
  if (w.length < 13) return 'B1';
  const longRatio = w.filter(x => x.length >= 9).length / w.length;
  return longRatio > .22 ? 'C1' : longRatio > .12 ? 'B2' : 'B1';
};
const digest = (s) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return (h >>> 0).toString(36);
};
async function loadFeed(id) {
  const feed = FEEDS[id];
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 8500);
  try {
    const resp = await fetch(feed.url, {
      signal: ctrl.signal,
      headers: { 'Accept': 'application/rss+xml, application/xml, application/atom+xml, text/xml;q=0.9,*/*;q=0.8', 'User-Agent': 'PamVuEnglishLedger/1.0 (personal language study RSS reader)' },
      cf: { cacheEverything: true, cacheTtl: 900 }
    });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const xml = await resp.text();
    if (xml.length > 1_800_000) throw new Error('Feed exceeds size limit');
    const parsed = parser.parse(xml);
    const root = parsed.rss?.channel ?? parsed['rdf:RDF'] ?? parsed.feed ?? {};
    const entries = asArray(root.item ?? root.entry);
    return entries.slice(0, 30).map((entry) => {
      const title = strip(entry.title).slice(0, 280);
      const description = excerptFrom(entry, title);
      const url = cleanLink(entry.link ?? entry.guid);
      if (!url || !title) return null;
      if (feed.topic === 'football' && !isFootballStory(title, description, Boolean(feed.mixedSports))) return null;
      if (feed.topic === 'esports' && !lolLeagueOf(title, description, feed.league)) return null;
      const pub = plain(entry.pubDate ?? entry.published ?? entry.updated ?? entry['dc:date']);
      const t = Date.parse(pub);
      return {
        id: digest(url), title, summary: description, url,
        image: imageFrom(entry), source: feed.searchAggregator ? (strip(entry.source) || feed.source) : feed.source, topic: feed.topic,
        league: feed.league || null,
        hasExcerpt: Boolean(description),
        publishedAt: Number.isFinite(t) ? new Date(t).toISOString() : null,
        level: calcLevel(`${title} ${description}`), contentType: 'rss',
        readMinutes: Math.max(2, Math.ceil((`${title} ${description}`.split(/\s+/).length) / 150))
      };
    }).filter(Boolean);
  } finally { clearTimeout(timer); }
}
function json(data, status = 200, bypassCache = false) {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': status === 200 && !bypassCache ? 'public, max-age=60' : 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'Access-Control-Allow-Origin': '*'
  };
  // Netlify Functions do not automatically cache just because Cache-Control exists.
  // Opt into short edge caching for shared requests, not manual Refresh requests.
  if (status === 200 && !bypassCache) headers['Netlify-CDN-Cache-Control'] = 'public, max-age=180';
  return new Response(JSON.stringify(data), { status, headers });
}
async function handleNews(req) {
  const u = new URL(req.url);
  const bypassCache = u.searchParams.has('fresh');
  const topic = BY_TOPIC[u.searchParams.get('topic')] ? u.searchParams.get('topic') : 'all';
  const ids = BY_TOPIC[topic];
  const settled = await Promise.allSettled(ids.map(loadFeed));
  const succeeded = settled.filter(x => x.status === 'fulfilled');
  const failures = settled.filter(x => x.status === 'rejected').length;
  const seen = new Set();
  const items = succeeded.flatMap(x => x.value).filter(x => {
    if (seen.has(x.url)) return false;
    seen.add(x.url); return true;
  }).sort((a, b) => Date.parse(b.publishedAt ?? 0) - Date.parse(a.publishedAt ?? 0)).slice(0, 100);
  return json({ items, topic, fetchedAt: new Date().toISOString(), healthyFeeds: succeeded.length, failedFeeds: failures, totalFeeds: ids.length, isLive: items.length > 0 }, items.length ? 200 : 503, bypassCache);
}
export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    if (pathname === '/api/news') {
      if (request.method !== 'GET') return json({ error: 'Method not allowed' }, 405);
      try { return await handleNews(request); }
      catch { return json({ error: 'Không thể tải RSS ở thời điểm này', items: [], isLive: false }, 503); }
    }
    return env.ASSETS.fetch(request);
  }
};
