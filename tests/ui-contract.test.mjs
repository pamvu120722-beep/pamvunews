import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

// Regression tests for category switching and dynamic cards.
// The previous regression was valid JavaScript but a runtime TypeError:
// querySelector returns ONE element; .forEach() needs querySelectorAll.
const app=readFileSync(new URL('../public/app.js', import.meta.url),'utf8');
const html=readFileSync(new URL('../public/index.html', import.meta.url),'utf8');
const worker=readFileSync(new URL('../src/worker.js', import.meta.url),'utf8');

test('no single-element DOM query is treated as an array',()=>{
  const bad=app.split('\n').map((line,i)=>({line,number:i+1}))
    .filter(({line})=>/(?<!\$)\$\([^)]*\)\s*\.\s*(?:forEach|map|filter|some|every|reduce|find)\s*\(/.test(line));
  assert.deepEqual(bad, [], 'Replace $(selector).forEach with $$(selector).forEach');
});

test('all seven news categories and their click handlers are retained',()=>{
  for(const topic of ['all','vietnam','football','economy','esports','world','technology','culture']){
    assert.ok(html.includes('data-topic="'+topic+'"'), 'Missing UI topic '+topic);
    assert.match(worker,new RegExp('\\b'+topic+': \\[|\\b'+topic+': \\[','m'), 'Missing API topic '+topic);
  }
  assert.ok(app.includes("$$('.topic-filter').forEach(button=>button.addEventListener('click'"));
  assert.ok(app.includes("$$('.topic-filter').forEach(el=>el.classList.toggle('active'"));
});

test('economy and LCK/LPL buttons have collection-safe handlers',()=>{
  for (const item of ["$$('[data-economy-focus]').forEach", "$$('[data-league]').forEach"]) {
    assert.ok(app.includes(item), 'Missing safe loop: '+item);
  }
  for(const league of ['all','lck','lpl']) assert.ok(html.includes('data-league="'+league+'"'));
  for(const focus of ['all','vietnam','markets','companies','global']) assert.ok(html.includes('data-economy-focus="'+focus+'"'));
});

test('load more has required UI and handles multiple cards',()=>{
  for(const id of ['loadMoreBtn','loadMoreStatus','storyCount','storyGrid','economyDesk','esportsDesk']) {
    assert.ok(html.includes('id="'+id+'"'), 'Missing '+id);
  }
  assert.ok(app.includes("$$('.story-card', $('#storyGrid'))"));
  assert.ok(app.includes("$('#loadMoreBtn').addEventListener('click'"));
});
