// Adapt existing RSS handler to Netlify Functions without changing the news logic.
import rssWorker from '../../src/worker.js';

export default async function handler(request) {
  const url = new URL(request.url);
  url.pathname = '/api/news';
  const proxyRequest = new Request(url.toString(), request);
  return rssWorker.fetch(proxyRequest, {});
}
