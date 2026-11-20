import assert from 'node:assert/strict';
import { test } from 'node:test';
import worker from '../src/worker.js';

const xml = suffix => '<?xml version="1.0" encoding="UTF-8"?>' +
'<rss version="2.0"><channel><title>Test publisher</title><item>' +
'<title>Business growth report '+suffix+'</title>' +
'<link>https://example.com/story-'+suffix+'</link>' +
'<description>Economic developments offer new context for English learners.</description>' +
'<pubDate>Fri, 20 Nov 2026 08:00:00 GMT</pubDate></item></channel></rss>';

// No live third-party HTTP requests during CI.
const originalFetch = globalThis.fetch;
test('economy feeds return timestamped status and noncached manual checks', async () => {
  globalThis.fetch = async url => new Response(xml(encodeURIComponent(String(url)).slice(-20)), {status:200, headers:{'Content-Type':'application/rss+xml'}});
  try {
    const res=await worker.fetch(new Request('https://example.net/api/news?topic=economy&fresh=1'), {});
    assert.equal(res.status,200);
    assert.match(res.headers.get('Cache-Control'),/no-store/);
    const data=await res.json();
    assert.equal(data.topic,'economy');
    assert.equal(data.totalFeeds,5);
    assert.equal(data.healthyFeeds,5);
    assert.equal(data.failedFeeds,0);
    assert.equal(data.sourceHealth.length,5);
    assert.ok(data.sourceHealth.every(s=>s.status==='ok' && s.articleCount===1));
    assert.equal(data.latestPublishedAt,'2026-11-20T08:00:00.000Z');
    assert.ok(data.fetchedAt && Number.isFinite(Date.parse(data.fetchedAt)));
    assert.ok(data.items.length>0);
    assert.ok(data.publisherCount>=1);
  } finally { globalThis.fetch=originalFetch; }
});
test('one failed publisher stays visible as unavailable in status', async()=>{
  globalThis.fetch = async url => {
    if(String(url).includes('feeds.npr.org')) throw new Error('mock publisher unavailable');
    return new Response(xml(encodeURIComponent(String(url)).slice(-20)),{status:200});
  };
  try{
    const res=await worker.fetch(new Request('https://example.net/api/news?topic=economy&fresh=1'),{});
    assert.equal(res.status,200);
    const data=await res.json();
    assert.equal(data.totalFeeds,5);
    assert.equal(data.healthyFeeds,4);
    assert.equal(data.failedFeeds,1);
    const npr=data.sourceHealth.find(s=>s.id==='npr-business');
    assert.equal(npr.status,'failed');
    assert.equal(npr.articleCount,0);
    assert.equal(data.isLive,true);
  }finally{globalThis.fetch=originalFetch;}
});
test('new RSS sources cover world, economy and lifestyle',async()=>{
  const topics={world:7,economy:5,culture:3};
  globalThis.fetch=async url=>new Response(xml(encodeURIComponent(String(url)).slice(-20)),{status:200});
  try{
    for(const [topic,n] of Object.entries(topics)){
      const response=await worker.fetch(new Request('https://example.net/api/news?topic='+topic),{});
      const body=await response.json();
      assert.equal(body.totalFeeds,n);
      assert.equal(body.sourceHealth.length,n);
      assert.equal(body.healthyFeeds,n);
    }
  }finally{globalThis.fetch=originalFetch;}
});
