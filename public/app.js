(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const KEY = 'pamvu-english-ledger-v1';
  const GOAL_DEFAULT = 15;
  const TOPIC_LABEL = { all:'All stories',vietnam:'Vietnam',football:'Football',economy:'Economy',world:'World',technology:'Technology',culture:'Lifestyle' };
  const TOPIC_COLOR = { vietnam:'#bf855f',football:'#5e8c76',economy:'#586d8e',world:'#71949c',technology:'#4e8b9c',culture:'#b28d83' };
  const GLOSSARY = {
    economy:['nền kinh tế','the system of producing, buying, and selling goods and services'],
    economic:['thuộc kinh tế','relating to an economy'],inflation:['lạm phát','a general increase in prices'],
    consumer:['người tiêu dùng','a person who buys goods or services'],consumers:['người tiêu dùng','people who buy goods or services'],
    investment:['đầu tư','the use of resources in the hope of future benefit'],investor:['nhà đầu tư','someone who puts money into an investment'],
    export:['xuất khẩu','to sell goods to another country'],exports:['hàng xuất khẩu','goods sold to another country'],
    import:['nhập khẩu','to bring goods into a country'],market:['thị trường','a place or system for buying and selling'],
    demand:['nhu cầu','the quantity of something people want to buy'],supply:['nguồn cung','the quantity available for purchase'],
    revenue:['doanh thu','income a business receives from sales'],budget:['ngân sách','a plan for spending and saving money'],
    income:['thu nhập','money earned by an individual or organization'],wages:['tiền lương','money paid to workers'],
    salary:['lương','regular payment for work'],growth:['tăng trưởng','the process of increasing in size or amount'],
    policy:['chính sách','a set of official plans or decisions'],trade:['thương mại','the buying and selling of goods or services'],
    tariff:['thuế quan','a tax on imported goods'],interest:['lãi suất hoặc sự quan tâm','the cost of borrowing money, or attention paid to something'],
    rate:['tỷ lệ, mức','a measure or quantity compared with another'],cost:['chi phí','the amount paid for something'],
    price:['giá cả','the amount of money something costs'],prices:['giá cả','amounts of money paid for goods or services'],
    company:['công ty','an organization that sells goods or services'],business:['doanh nghiệp; kinh doanh','commercial activity or an organization engaged in it'],
    competition:['sự cạnh tranh','the activity of trying to succeed against others'],competitive:['có tính cạnh tranh','having a strong position compared with rivals'],
    sustainable:['bền vững','able to continue with limited environmental or social harm'],sustainability:['tính bền vững','the capacity to continue without exhausting resources'],
    environment:['môi trường','the natural world and the conditions around us'],environmental:['thuộc môi trường','related to the natural world'],
    tourism:['du lịch','the industry of people travelling for pleasure'],tourist:['du khách','a person travelling for leisure'],
    destination:['điểm đến','a place people travel to'],destinationS:['các điểm đến','places people travel to'],
    community:['cộng đồng','a group of people living in the same place or sharing interests'],communities:['các cộng đồng','groups of people linked by place or interests'],
    culture:['văn hóa','the customs and beliefs of a group'],traditional:['truyền thống','following long-established customs'],
    opportunity:['cơ hội','a favourable chance to do something'],opportunities:['các cơ hội','favourable chances to do something'],
    challenge:['thử thách','something that requires effort to overcome'],challenges:['thử thách','difficult situations that require action'],
    improve:['cải thiện','to become or make something better'],development:['sự phát triển','the process of growing or improving'],
    develop:['phát triển','to grow or make something more advanced'],progress:['tiến bộ','movement towards a goal'],
    player:['cầu thủ','a person taking part in a sport'],players:['các cầu thủ','people taking part in a sport'],
    football:['bóng đá','a sport played by two teams with a ball'],coach:['huấn luyện viên','a person who trains players'],
    coaching:['việc huấn luyện','the process of training and instructing others'],team:['đội bóng, nhóm','people working or playing together'],
    league:['giải đấu','a competition involving several teams'],match:['trận đấu','a sports competition between sides'],
    tournament:['giải đấu','a series of sporting competitions'],goal:['bàn thắng; mục tiêu','a score in sport or an aim'],
    striker:['tiền đạo','a football player whose job is to score'],defender:['hậu vệ','a player who stops the opponent from scoring'],
    midfielder:['tiền vệ','a player working between defence and attack'],tactical:['chiến thuật','related to a plan of action'],
    tactics:['chiến thuật','plans used to achieve an advantage'],academy:['học viện','an institution offering special training'],
    transfer:['chuyển nhượng','moving a player from one club to another'],manager:['người quản lý','a person in charge of a team or organization'],
    supporters:['người hâm mộ','people who support a team or cause'],fans:['người hâm mộ','people who admire or follow something'],
    confidence:['sự tự tin','belief in your own abilities'],potential:['tiềm năng','the possibility of future success'],
    performance:['màn trình diễn; hiệu suất','how well an action or activity is carried out'],victory:['chiến thắng','winning a competition'],
    defeat:['thất bại','losing a competition'],result:['kết quả','the outcome of an action or event'],
    international:['quốc tế','involving more than one country'],global:['toàn cầu','relating to the whole world'],
    domestic:['trong nước','within a particular country'],regional:['thuộc khu vực','relating to a specific geographical area'],
    government:['chính phủ','the group responsible for governing a country'],authority:['cơ quan có thẩm quyền','an organization with official power'],
    official:['chính thức','approved by someone in authority'],report:['báo cáo','an account of information or events'],
    research:['nghiên cứu','a detailed investigation to find information'],study:['nghiên cứu; học tập','a detailed examination or learning activity'],
    data:['dữ liệu','facts or figures used for analysis'],evidence:['bằng chứng','information showing whether a claim is true'],
    impact:['tác động','a strong effect on something'],affect:['ảnh hưởng','to make a difference to something'],
    effect:['ảnh hưởng; hiệu ứng','a change caused by something else'],benefit:['lợi ích','something that improves a situation'],
    risk:['rủi ro','the possibility that something harmful will happen'],opinion:['quan điểm','a belief or judgement about something'],
    analysis:['phân tích','a careful examination of information'],strategy:['chiến lược','a plan to achieve a goal'],
    infrastructure:['cơ sở hạ tầng','basic systems such as roads and electricity'],logistics:['hậu cần; logistics','planning and moving resources efficiently'],
    supplier:['nhà cung cấp','a business that provides products or materials'],manufacturing:['sản xuất công nghiệp','making products on a large scale'],
    technology:['công nghệ','practical applications of scientific knowledge'],artificial:['nhân tạo','made by people rather than occurring naturally'],
    intelligence:['trí tuệ','the ability to learn and understand'],automation:['tự động hóa','using machines to perform tasks'],
    digital:['kỹ thuật số','using electronic information'],innovation:['đổi mới sáng tạo','the development of useful new ideas or methods'],
    reliable:['đáng tin cậy','able to be trusted'],accurate:['chính xác','correct and free from errors'],
    responsibility:['trách nhiệm','the duty to deal with something'],resilience:['khả năng chống chịu','the ability to recover after difficulty'],
    efficient:['hiệu quả','working well without wasting resources'],efficiency:['hiệu suất; hiệu quả','achieving results with minimal waste'],
    critical:['mang tính then chốt / phản biện','very important, or involving careful judgement'],
    priority:['ưu tiên','something regarded as more important than others'],
    commitment:['sự cam kết','a promise or willingness to continue an activity'],
    crucial:['rất quan trọng','extremely important'],significant:['đáng kể','important or large enough to matter'],
    meanwhile:['trong khi đó','at the same time'],however:['tuy nhiên','used to introduce a contrast'],
    therefore:['vì vậy','for that reason'],although:['mặc dù','despite the fact that'],
    moreover:['hơn nữa','in addition to what was said'],nevertheless:['tuy nhiên; dẫu vậy','despite what has just been mentioned'],
    eventually:['cuối cùng','after a long period'],particularly:['đặc biệt','especially or more than usual']
  };

  const defaultData = { words: [], bookmarks: [], savedArticles: [], sessions: [], reflections: {}, quizScores: {}, goal: GOAL_DEFAULT, customArticles: [] };
  let data = readStore();
  let activeView = 'home', activeTopic = 'all', activeLevel = 'all', query = '';
  let displayed = [], articlesById = new Map(), liveByTopic = new Map();
  let economyFocus = 'all';
  let currentArticle = null, currentDict = null, wordsMode = 'list', flashIndex = 0, flipped = false, itemsShown = 9;
  let fetchedAt = null, cacheStatus = 'connecting', isLoading = false, requestSeq = 0, toastTimer = null;

  function readStore() { try { return { ...defaultData, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch { return structuredClone(defaultData); } }
  function store() { try { localStorage.setItem(KEY, JSON.stringify(data)); } catch { showToast('Bộ nhớ trình duyệt đã đầy. Hãy export dữ liệu để sao lưu.'); } }
  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
  const safeUrl = v => { try { let u = new URL(v); return ['https:', 'http:'].includes(u.protocol) ? u.href : ''; } catch { return ''; } };
  const todayLocal = () => new Date().toLocaleDateString('sv-SE', { timeZone:'Asia/Ho_Chi_Minh' });
  const toDate = raw => { let d = new Date(raw); return Number.isFinite(+d) ? d : new Date(); };
  const dtFmt = new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'Asia/Ho_Chi_Minh'});
  const updateFmt = new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit',timeZone:'Asia/Ho_Chi_Minh'});
  function dateStr(d) { return d ? dtFmt.format(toDate(d)) : 'Practice article'; }
  function relativeDate(d) { if (!d) return 'Practice edition'; const diff = (Date.now() - +new Date(d)) / 3600000; if (diff < 0) return dateStr(d); if(diff < 1) return 'Just published'; if(diff < 24) return `${Math.floor(diff)}h ago`; return dateStr(d); }
  function showToast(message) { const el = $('#toast'); el.textContent = message; el.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), 3200); }
  function icon(name) { return `<svg aria-hidden="true"><use href="#i-${name}"/></svg>`; }
  function normalizeArticle(item) {
    return { ...item, source: item.source || 'Source not provided', topic: item.topic || 'world', summary: item.summary || '', readMinutes: Number(item.readMinutes || 3), contentType:item.contentType || 'rss' };
  }
  function isPractice(a) { return a.contentType === 'practice' || a.contentType === 'custom' || String(a.id).startsWith('practice-'); }
  function getArticle(id) { return articlesById.get(id) || window.PAMVU_PRACTICE.find(a=>a.id===id) || data.customArticles.find(a=>a.id===id) || (data.savedArticles||[]).find(a=>a.id===id); }
  function indexArticles(list) { list.forEach(a => articlesById.set(a.id, normalizeArticle(a))); }
  function categoryName(topic) { return TOPIC_LABEL[topic] || 'World'; }
  function readingMinutes(date = todayLocal()) { return data.sessions.filter(s => s.date === date).reduce((sum,s) => sum + Number(s.minutes || 0), 0); }
  function startedToday(article) { return data.sessions.some(s => s.id === article.id && s.date === todayLocal()); }
  function totalToday() { return readingMinutes(todayLocal()); }
  function bookmarked(id) { return data.bookmarks.includes(id); }
  function setLiveState(mode) {
    cacheStatus = mode;
    const el = $('#liveIndicator'); el.className = 'live-indicator ' + (mode === 'live' ? 'connected' : mode === 'practice' ? 'offline' : '');
    $('#liveText').textContent = mode === 'live' ? 'LIVE PUBLISHER RSS' : mode === 'practice' ? 'PRACTICE EDITION' : 'CONNECTING TO RSS';
  }
  function formatDateHeader() {
    const s = new Intl.DateTimeFormat('en-GB',{weekday:'long',day:'numeric',month:'short',year:'numeric',timeZone:'Asia/Ho_Chi_Minh'}).format(new Date());
    $('#todayDate').textContent = s.toUpperCase();
  }
  function updateStats() {
    $('#navWordCount').textContent = String(data.words.length);
    let total = totalToday(), goal = Number(data.goal || GOAL_DEFAULT);
    $('#dailyMeterText').textContent = `${total} / ${goal} min`;
    $('#dailyMeterBar').style.width = Math.min(100, Math.round(total / goal * 100)) + '%';
    $('#ritualBtn').textContent = total >= goal ? 'You reached your daily goal ✓' : 'Build my habit →';
  }
  async function fetchNews(topic = activeTopic, force = false) {
    const ticket = ++requestSeq;
    const cached = liveByTopic.get(topic);
    if (!force && cached && Date.now() - Date.parse(cached.fetchedAt) < 5 * 60 * 1000) { if (topic === activeTopic) applyStories(cached, false); return; }
    isLoading = true; $('#refreshNews').classList.add('loading');
    try {
      const url = '/api/news?topic=' + encodeURIComponent(topic) + (force ? '&fresh=' + Date.now() : '');
      const controller = new AbortController(); const timer = setTimeout(() => controller.abort(), 22000);
      let res;
      try { res = await fetch(url, { signal:controller.signal, cache:force ? 'no-store' : 'default' }); } finally { clearTimeout(timer); }
      if (!res.ok) throw new Error('RSS unavailable');
      const payload = await res.json();
      if (!payload.isLive || !Array.isArray(payload.items) || payload.items.length === 0) throw new Error('No feeds available');
      const items = payload.items.map(normalizeArticle);
      liveByTopic.set(topic, { items, fetchedAt:payload.fetchedAt, failedFeeds:payload.failedFeeds, healthyFeeds:payload.healthyFeeds });
      if (ticket === requestSeq) applyStories(liveByTopic.get(topic), false);
    } catch (err) {
      if (ticket === requestSeq) applyStories({ items:getPracticeForTopic(topic), fetchedAt:null, failedFeeds:0, healthyFeeds:0 }, true);
    } finally { if (ticket === requestSeq) { isLoading = false; $('#refreshNews').classList.remove('loading'); } }
  }
  function getPracticeForTopic(topic) { return window.PAMVU_PRACTICE.filter(a => topic === 'all' || a.topic === topic || (topic === 'vietnam' && a.id === 'practice-economy-trade')).map(a => ({ ...a,contentType:'practice' })); }
  function applyStories(result, practiceMode) {
    displayed = result.items;
    fetchedAt = result.fetchedAt;
    indexArticles(displayed);
    setLiveState(practiceMode ? 'practice' : 'live');
    // Keep the expanded list when RSS automatically refreshes.
    const notice = $('#newsNotice');
    if (practiceMode) {
      notice.hidden = false;
      notice.innerHTML = '<strong>Chế độ luyện tập:</strong> Tin RSS chưa kết nối. Đây là các bài luyện đọc tự biên soạn, không phải tin mới. Để bật nguồn tin cập nhật, hãy triển khai toàn bộ mã nguồn lên Netlify từ GitHub theo file README_NETLIFY.md. Bạn vẫn có thể đọc và học từ vựng bình thường.';
      $('#lastRefresh').textContent = 'PRACTICE LIBRARY · NOT LIVE NEWS';
    } else {
      notice.hidden = !result.failedFeeds;
      notice.textContent = result.failedFeeds ? `Đã kết nối ${result.healthyFeeds} nguồn RSS. ${result.failedFeeds} nguồn tạm thời không phản hồi; những tin còn lại vẫn là bài thật.` : '';
      $('#lastRefresh').textContent = `Updated ${fetchedAt ? updateFmt.format(toDate(fetchedAt)) : 'recently'} · Publisher RSS`;
    }
    renderHome();
  }
  const ECONOMY_MARKETS = /\b(?:stock|shares?|equities|invest(?:ment|ing|ors?)?|markets?|vn-?index|index|bonds?|interest rates?|central banks?|exchange rates?|currenc(?:y|ies)|gold prices?|bitcoin|crypto|securities|wall street|inflation|fed|trading|asset|commodit(?:y|ies))\b/i;
  const ECONOMY_COMPANIES = /\b(?:compan(?:y|ies)|businesses|firms?|corporat(?:e|ion|ions)|startup|start-up|enterprise|manufacturer|brand|retailer|factory|factories|ceo|merger|acquisition|earnings|revenue|profit|exports?|imports?|supply chain|sales|jobs|workforce)\b/i;
  function matchesEconomyFocus(article) {
    if (activeTopic !== 'economy' || economyFocus === 'all') return true;
    const text = String(article.title || '') + ' ' + String(article.summary || '');
    if (economyFocus === 'vietnam') return article.source === 'VnExpress International' || /\b(vietnam|vietnamese|hanoi|ho chi minh|saigon)\b/i.test(text);
    if (economyFocus === 'global') return article.source !== 'VnExpress International' && !/\b(vietnam|vietnamese)\b/i.test(text);
    if (economyFocus === 'markets') return ECONOMY_MARKETS.test(text);
    if (economyFocus === 'companies') return ECONOMY_COMPANIES.test(text);
    return true;
  }
  function filteredStories() {
    let s = displayed;
    if (activeTopic === 'economy') s = s.filter(matchesEconomyFocus);
    if (activeLevel !== 'all') s = s.filter(a => a.level === activeLevel);
    if (query.trim()) { const q = query.toLowerCase().trim(); s = s.filter(a => `${a.title} ${a.summary} ${a.source}`.toLowerCase().includes(q)); }
    return s;
  }
  // Publisher feeds can contain headlines without excerpts: label them clearly.
  const previewText = a => isPractice(a) ? (a.summary || '') : (a.summary || 'Headline only in RSS. Open the publisher for the full story, then practise your English here.');
  const isHeadlineOnly = a => !isPractice(a) && !String(a.summary || '').trim();
  function makeCover(article, hero = false) {
    const url = safeUrl(article.image);
    const className = hero ? 'hero-cover' : 'card-cover';
    const badge = hero ? 'image-badge' : 'card-tag';
    return `<div class="${className} cover-art" data-topic="${esc(article.topic)}">${url ? `<img src="${esc(url)}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.style.display='none'">` : ''}<span class="${badge}">${esc(categoryName(article.topic).toUpperCase())}${isPractice(article) ? ' · PRACTICE' : ''}</span>${hero ? '<span class="image-veil"></span>' : ''}</div>`;
  }
  function metadata(a) {
    return `<span class="source">${esc(a.source)}</span><span class="dot-separator"></span><span>${esc(relativeDate(a.publishedAt))}</span><span class="dot-separator"></span><span>${a.readMinutes} MIN READ</span>`;
  }
  function storyCard(a) {
    return `<article class="story-card" data-article-id="${esc(a.id)}">${makeCover(a)}<div class="card-body"><div class="story-topline">${metadata(a)}</div><h3 class="article-title" role="button" tabindex="0" data-open="${esc(a.id)}">${esc(a.title)}</h3><p class="${isHeadlineOnly(a) ? 'excerpt-missing' : ''}">${esc(previewText(a))}</p><div class="story-footer"><button class="card-read unstyled" data-open="${esc(a.id)}">Practice reading ${icon('arrow')}</button><div class="story-footer-right"><span class="sublevel">${esc(a.level)}</span><button class="save-small ${bookmarked(a.id) ? 'saved' : ''}" data-bookmark="${esc(a.id)}" aria-label="Lưu bài" title="Lưu bài">${icon('bookmark')}</button></div></div></div></article>`;
  }
  function renderHome() {
    const filtered = filteredStories(), featured = filtered[0];
    if (featured) {
      $('#heroStory').innerHTML = `${makeCover(featured,true)}<div class="hero-text"><div class="story-topline">${metadata(featured)}</div><h2 role="button" tabindex="0" data-open="${esc(featured.id)}">${esc(featured.title)}</h2><p class="${isHeadlineOnly(featured) ? 'excerpt-missing' : ''}">${esc(previewText(featured))}</p><div class="story-footer"><button class="read-link unstyled" data-open="${esc(featured.id)}">Read & learn ${icon('arrow')}</button><div class="story-footer-right"><span class="sublevel">${esc(featured.level)} READING</span><button class="save-small ${bookmarked(featured.id) ? 'saved' : ''}" data-bookmark="${esc(featured.id)}" aria-label="Lưu bài" title="Lưu bài">${icon('bookmark')}</button></div></div></div>`;
    } else {
      $('#heroStory').innerHTML = '<div class="empty-state"><h3>No matching stories</h3><p>Try a different topic, keyword or level.</p></div>';
    }
    const rest = filtered.slice(1,itemsShown);
    $('#storyGrid').innerHTML = rest.length ? rest.map(storyCard).join('') : (filtered.length ? '<div class="empty-state"><h3>That’s the latest in this section.</h3><p>Explore another topic or try the Reading Studio.</p></div>' : '');
    const more = Math.max(0, filtered.length - itemsShown);
    const shown = Math.min(itemsShown, filtered.length);
    const loadBtn = $('#loadMoreBtn');
    loadBtn.hidden = more === 0;
    loadBtn.disabled = more === 0;
    loadBtn.innerHTML = more ? `Load ${Math.min(9,more)} more stories (${more} left) ${icon('chevron')}` : '';
    $('#storyCount').textContent = filtered.length ? `Showing ${shown} of ${filtered.length} stories · ${categoryName(activeTopic)}` : 'No matching stories · try another filter';
    $('#loadMoreStatus').textContent = more ? `${more} stories remaining` : (filtered.length ? `You're all caught up · ${filtered.length} stories shown` : '');
    $('#economyDesk').hidden = activeTopic !== 'economy';
    updateStats();
  }
  function setView(name) {
    if (!['home','practice','words','progress'].includes(name)) return;
    activeView = name;
    $$('.view').forEach(x => x.classList.toggle('active', x.id === name + 'View'));
    $$('.nav-link').forEach(x => x.classList.toggle('active',x.dataset.view === name));
    if (name === 'practice') renderPractice();
    if (name === 'words') renderWords();
    if (name === 'progress') renderProgress();
    window.scrollTo({ top:0,behavior:'smooth' });
  }
  function renderPractice() {
    indexArticles(window.PAMVU_PRACTICE);
    indexArticles(data.customArticles);
    $('#practiceGrid').innerHTML = [...data.customArticles.map(x=>({...x,contentType:'custom'})),...window.PAMVU_PRACTICE].map(a => `<article class="practice-card"><div class="practice-card-top"><span>${esc(categoryName(a.topic).toUpperCase())}</span><span>${esc(a.level)} · ${a.readMinutes} MIN</span></div><h3>${esc(a.title)}</h3><p>${esc(a.summary)}</p><button data-open="${esc(a.id)}">Start this reading ${icon('arrow')}</button></article>`).join('');
  }
  function openReader(id) {
    const article = getArticle(id);
    if (!article) { showToast('Không tìm thấy bài đọc này. Hãy tải lại nguồn tin.'); return; }
    currentArticle = normalizeArticle(article);
    $('#readerMeta').textContent = `${categoryName(article.topic).toUpperCase()}   /   ${article.level}   /   ${article.readMinutes} MIN  /   ${article.source}`;
    $('#readerTitle').textContent = article.title;
    $('#readerBookmark').classList.toggle('active',bookmarked(article.id));
    $('#readerBookmark span').textContent = bookmarked(article.id) ? 'Saved' : 'Bookmark';
    $('#readerListen span').textContent = 'Listen';
    const headlineOnly = isHeadlineOnly(article);
    // With no excerpt, practise using the real headline; do not invent reporting.
    const copy = isPractice(article) ? article.body : (article.summary || article.title);
    renderClickableText(copy);
    renderReadingGuide(article, headlineOnly);
    $('#readerCopyright').textContent = isPractice(article) ? (article.contentType === 'custom' ? 'Your text is stored locally in this browser and is not uploaded.' : 'Original practice text created for PamVu English Ledger. This is not a news report.') : (headlineOnly ? 'Headline supplied by the publisher via RSS. No article summary was available. Read the original for facts before writing your reflection.' : 'Short publisher-provided RSS excerpt only. Full reporting belongs to the original publisher.');
    $('#readOriginal').hidden = !safeUrl(article.url) || isPractice(article);
    if (!$('#readOriginal').hidden) $('#readOriginal').href = safeUrl(article.url);
    $('#completeReader').textContent = startedToday(article) ? '✓ Completed today' : '✓ Mark as completed';
    $('#reflectionPrompt').textContent = isPractice(article) ? 'Write 2–3 English sentences: What was the main idea, and what would you like to discuss?' : (headlineOnly ? 'After opening the original report, write 2–3 English sentences describing confirmed facts. Avoid guessing from the headline.' : 'Summarise the RSS excerpt. After reading the original report, note one verified fact and one new expression.');
    $('#reflectionText').value = data.reflections[article.id]?.text || '';
    $('#reflectionStatus').textContent = '';
    renderArticleWords(); renderQuiz(article);
    $('#readerDialog').showModal(); document.body.classList.add('modal-open');
    $('#readerDialog').scrollTop = 0;
  }
  function renderReadingGuide(article, headlineOnly) {
    let section = $('#readingGuide');
    if (!section) {
      section = document.createElement('section'); section.id = 'readingGuide';
      section.className = 'reading-guide';
      $('#readerBody').insertAdjacentElement('afterend', section);
    }
    if (isPractice(article)) { section.hidden = true; return; }
    section.hidden = false;
    section.innerHTML = `<div class="reading-guide-label">${headlineOnly ? 'HEADLINE LAB · NO RSS EXCERPT' : 'NEWS READING LAB · VERIFIED SOURCE'}</div>
      <h3>${headlineOnly ? 'Start with the headline. Then verify the story.' : 'Make this news story part of your English practice.'}</h3>
      <p>${headlineOnly ? 'This publisher provides a headline but no text preview in RSS. The text above is the actual headline, not the full article.' : 'The paragraph above is a short publisher-provided excerpt, not the whole report.'}</p>
      <ol>
        <li>Before opening the link, predict the subject in one English sentence.</li>
        <li>Read the full story on the publisher's website. Identify <b>one confirmed fact</b>.</li>
        <li>Return here: save three expressions and write a 2–3 sentence reflection.</li>
      </ol>
      <div class="reading-guide-note">No invented articles or auto-generated facts · Original journalism stays with its publisher</div>`;
  }
  function renderClickableText(text) {
    const root = $('#readerBody'); root.replaceChildren();
    const paragraphs = String(text).slice(0,23000).split(/\n\s*\n/);
    const tokenRegex = /[A-Za-z]+(?:['’][A-Za-z]+)*(?:-[A-Za-z]+)*/g;
    for (const paragraph of paragraphs) {
      const p = document.createElement('p');
      let last = 0;
      for (const m of paragraph.matchAll(tokenRegex)) {
        p.append(document.createTextNode(paragraph.slice(last,m.index)));
        let b = document.createElement('button'); b.className = 'lookup-word'; b.type = 'button'; b.textContent = m[0]; b.dataset.word = m[0];
        b.setAttribute('aria-label',`Tra từ ${m[0]}`); p.append(b); last = m.index + m[0].length;
      }
      p.append(document.createTextNode(paragraph.slice(last))); root.append(p);
    }
  }
  function closeReader() { $('#readerDialog').close(); document.body.classList.remove('modal-open'); closeDict(); if ('speechSynthesis' in window) window.speechSynthesis.cancel(); }
  function doBookmark(id) {
    if (!id) return;
    if (bookmarked(id)) { data.bookmarks = data.bookmarks.filter(x=>x!==id); data.savedArticles=(data.savedArticles||[]).filter(a=>a.id!==id); showToast('Đã bỏ lưu bài.'); }
    else { data.bookmarks.unshift(id); const article=getArticle(id); if(article){data.savedArticles=data.savedArticles||[];data.savedArticles.unshift(article);data.savedArticles=data.savedArticles.slice(0,80);}showToast('Đã lưu bài vào danh sách đọc.'); }
    store();
    if (currentArticle?.id===id) { $('#readerBookmark').classList.toggle('active',bookmarked(id)); $('#readerBookmark span').textContent=bookmarked(id)?'Saved':'Bookmark'; }
    renderHome();
  }
  function finishArticle() {
    if (!currentArticle) return;
    if (startedToday(currentArticle)) { showToast('Bạn đã hoàn tất bài này hôm nay.'); return; }
    data.sessions.push({ id:currentArticle.id,date:todayLocal(),minutes:Math.max(2,currentArticle.readMinutes),title:currentArticle.title,topic:currentArticle.topic });
    store(); updateStats();
    $('#completeReader').textContent = '✓ Completed today';
    showToast(`Tuyệt! +${currentArticle.readMinutes} phút đọc đã được ghi nhận.`);
  }
  function renderArticleWords() {
    if (!currentArticle) return;
    const list = data.words.filter(w=>w.sourceId === currentArticle.id);
    $('#articleWords').innerHTML = list.length ? list.map(w=>`<span class="reader-vocab-chip">${esc(w.word)}</span>`).join('') : 'Tap any word to start learning.';
  }
  function saveReflection() {
    if(!currentArticle) return;
    const t=$('#reflectionText').value.trim();
    if(t.length<12){$('#reflectionStatus').textContent='Please write at least one complete English sentence.';return;}
    data.reflections[currentArticle.id] = { text:t,at:new Date().toISOString() };store();
    $('#reflectionStatus').textContent = '✓ Reflection saved on this device.';showToast('Đã lưu phần tóm tắt của bạn.');
  }
  function renderQuiz(a) {
    const target=$('#quizSection');
    if(!a.question || !Array.isArray(a.options)) {target.hidden=true;return;}
    target.hidden=false;
    target.innerHTML=`<div class="eyebrow">READING COMPREHENSION</div><h3>Check your understanding</h3><div class="quiz-question"><p>${esc(a.question)}</p>${a.options.map((t,i)=>`<label class="quiz-option"><input type="radio" name="quizAnswer" value="${i}"><span>${esc(t)}</span></label>`).join('')}<button class="quiz-check" id="quizCheckBtn">Check my answer</button><div class="quiz-answer" id="quizAnswer"></div></div>`;
    $('#quizCheckBtn').addEventListener('click',()=>{
      const checked=$('input[name="quizAnswer"]:checked',target);
      if(!checked){showToast('Hãy chọn một đáp án trước.');return;}
      const correct=Number(checked.value)===a.answer;
      data.quizScores[a.id]={correct,at:new Date().toISOString()};store();
      $('#quizAnswer').innerHTML=`<div class="quiz-result">${correct?'✓ Correct!':'Not quite — try reviewing the paragraph.'} ${esc(a.explanation)}</div>`;
      if(correct) showToast('Great job! You got it right.');
    });
  }
  function speakText(text) {
    if (!('speechSynthesis' in window)) {showToast('Trình duyệt không hỗ trợ đọc văn bản.');return;}
    const synth=window.speechSynthesis;
    synth.cancel();
    const utter=new SpeechSynthesisUtterance(String(text).slice(0,4200));
    utter.lang='en-GB';utter.rate=.9;utter.pitch=1;
    synth.speak(utter);
  }
  function clickWord(word, element) {
    if(!currentArticle || !word) return;
    const normalized = word.toLowerCase().replace(/^[^a-z]+|[^a-z]+$/g,'');
    if(!normalized || normalized.length>45) return;
    currentDict = { word:normalized, sourceId:currentArticle.id,sourceTitle:currentArticle.title,example:(element.closest('p')?.textContent || '').slice(0,300), phonetic:'',english:'', vietnamese:'' };
    const gloss=GLOSSARY[normalized] || GLOSSARY[normalized.replace(/s$/,'')];
    if(gloss){currentDict.vietnamese=gloss[0];currentDict.english=gloss[1];}
    const existing=data.words.find(w=>w.word===normalized);
    if(existing?.vietnamese) currentDict.vietnamese=existing.vietnamese;
    $('#dictWord').textContent=normalized;
    $('#dictPhonetic').textContent='Loading pronunciation…';
    $('#dictMeaning').textContent=currentDict.english || 'Đang tra định nghĩa tiếng Anh…';
    $('#dictExample').textContent=currentDict.example.length>100 ? '“'+currentDict.example.slice(0,160)+'…”' : '“'+currentDict.example+'”';
    $('#dictVietnamese').value=currentDict.vietnamese;
    $('#dictSave').textContent=existing?'Update flashcard':'+ Save to flashcards';
    const pop=$('#dictionaryPopover');
    // A native <dialog> is in the browser top layer. A popover outside it can appear
    // visible yet be impossible to click. Keep the dictionary INSIDE the dialog.
    if (!$('#readerDialog').contains(pop)) $('#readerDialog').appendChild(pop);
    pop.hidden=false;
    let rect=element.getBoundingClientRect();
    let left=Math.max(12,Math.min(window.innerWidth-355,rect.left));
    let top=rect.bottom+9;
    if(top+390>window.innerHeight) top=Math.max(12,rect.top-400);
    pop.style.left=left+'px';pop.style.top=top+'px';
    fetchDictionary(normalized, currentDict);
  }
  async function fetchDictionary(word, dict) {
    try {
      const ctrl = new AbortController(), t=setTimeout(()=>ctrl.abort(),7500);
      let res;
      try { res=await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+encodeURIComponent(word),{signal:ctrl.signal}); }
      finally { clearTimeout(t); }
      if(!res.ok) throw new Error('Unavailable');
      const json=await res.json();const first=json[0];
      if(currentDict!==dict) return;
      const definition=first?.meanings?.flatMap(m=>m.definitions||[])?.find(x=>x.definition)?.definition;
      const phonetic=first?.phonetic || first?.phonetics?.find(x=>x.text)?.text || '';
      currentDict.phonetic=phonetic;
      if(!currentDict.english && definition) currentDict.english=definition;
      $('#dictMeaning').textContent=currentDict.english || 'No definition available for this word.';
      $('#dictPhonetic').textContent=phonetic || 'English dictionary';
    } catch {
      if(currentDict!==dict) return;
      $('#dictPhonetic').textContent='Pronunciation unavailable';
      $('#dictMeaning').textContent=currentDict.english || 'Không lấy được định nghĩa trực tuyến. Bạn vẫn có thể nhập nghĩa tiếng Việt và lưu từ.';
    }
  }
  function closeDict() { $('#dictionaryPopover').hidden=true; currentDict=null; }
  function saveCurrentWord() {
    if(!currentDict) return;
    const v=$('#dictVietnamese').value.trim().slice(0,240);
    const word=currentDict.word;
    const existing=data.words.find(w=>w.word===word);
    const merged={...existing, word,vietnamese:v||currentDict.vietnamese||'',english:currentDict.english || existing?.english || '',phonetic:currentDict.phonetic || existing?.phonetic || '',example:currentDict.example,sourceTitle:currentDict.sourceTitle,sourceId:currentDict.sourceId,updatedAt:new Date().toISOString(),mastered:existing?.mastered||false};
    if(existing) data.words=data.words.map(w=>w.word===word?merged:w);
    else data.words.unshift({...merged,addedAt:new Date().toISOString()});
    store();updateStats();renderArticleWords();showToast(`Đã lưu “${word}” vào flashcards.`);closeDict();
  }
  function renderWords() {
    $('#wordTotal').textContent=data.words.length;
    $$('[data-words-mode]').forEach(el=>el.classList.toggle('active',el.dataset.wordsMode===wordsMode));
    if(data.words.length===0){
      $('#wordsContent').innerHTML='<div class="empty-vocab"><h3>Every vocabulary collection starts with one word.</h3><p>Mở một bài đọc và chạm vào từ bất kỳ để lưu flashcard đầu tiên nhé.</p><button class="solid-button" id="emptyStartReading">Explore articles →</button></div>';
      $('#emptyStartReading').onclick=()=>setView('home');return;
    }
    if(wordsMode==='cards'){renderFlashcards();return;}
    $('#wordsContent').innerHTML=`<div class="word-table">${data.words.map(w=>`<div class="word-item" data-word-row="${esc(w.word)}"><div><h3>${esc(w.word)} ${w.mastered?'<span class="sublevel">MASTERED</span>':''}</h3><p>${esc(w.english||'Add a definition or translation')}</p><small>From: ${esc(w.sourceTitle||'Your reading')} ${w.phonetic?' · '+esc(w.phonetic):''}</small></div><div class="word-item-actions"><input type="text" data-meaning="${esc(w.word)}" aria-label="Nghĩa tiếng Việt cho ${esc(w.word)}" value="${esc(w.vietnamese||'')}" placeholder="Ghi nghĩa tiếng Việt"><button data-speak="${esc(w.word)}" aria-label="Nghe từ">${icon('volume')}</button><button data-delete="${esc(w.word)}" aria-label="Xóa từ">${icon('trash')}</button></div></div>`).join('')}</div>`;
  }
  function reviewDue(w) { return !w.nextReview || w.nextReview <= todayLocal(); }
  function scheduledDate(days) {
    const d = new Date(todayLocal() + 'T12:00:00+07:00');
    d.setUTCDate(d.getUTCDate() + days);
    return d.toLocaleDateString('sv-SE', { timeZone:'Asia/Ho_Chi_Minh' });
  }
  function reviewCard(word, remembered) {
    if (remembered) {
      const nextStep = Math.min(5, Number(word.reviewStep || 0) + 1);
      const intervals = [0, 1, 3, 7, 14, 30];
      word.reviewStep = nextStep;
      word.nextReview = scheduledDate(intervals[nextStep]);
      if (nextStep >= 4) word.mastered = true;
      showToast(`Tốt lắm! Từ “${word.word}” sẽ được ôn lại sau ${intervals[nextStep]} ngày.`);
    } else {
      word.reviewStep = 0;
      word.mastered = false;
      word.nextReview = todayLocal();
      showToast(`Đã đưa “${word.word}” về danh sách cần ôn hôm nay.`);
    }
    word.lastReviewed = new Date().toISOString();
    store();
    const candidate = data.words.findIndex((w, i) => i !== flashIndex && reviewDue(w));
    flashIndex = candidate >= 0 ? candidate : (flashIndex + 1) % data.words.length;
    flipped = false;
    renderFlashcards();
  }
  function renderFlashcards() {
    flashIndex = Math.max(0, Math.min(data.words.length-1,flashIndex));
    const word=data.words[flashIndex];
    const dueCount=data.words.filter(reviewDue).length;
    $('#wordsContent').innerHTML=`<div class="flashcard-wrapper"><p class="eyebrow" style="justify-content:center">SPACED REVIEW · TAP TO FLIP</p>
      <div class="review-status"><strong>${dueCount}</strong> words due today · ${data.words.length} saved total</div>
      <div class="flashcard-outer" id="flashFlip" role="button" tabindex="0" aria-label="Lật flashcard"><div class="flashcard ${flipped?'flipped':''}" id="flashcard"><div class="flashcard-face"><span>FRONT · THE WORD</span><h2>${esc(word.word)}</h2><p>${esc(word.phonetic||'Tap to reveal meaning')}</p></div><div class="flashcard-face back"><span>BACK · THE MEANING</span><h2>${esc(word.vietnamese||word.english||'Your own meaning')}</h2><p>${esc(word.english||'')}<br>${esc(word.example?.slice(0,180)||'')}</p></div></div></div>
      <div class="flashcard-controls"><button id="flashPrev">← Previous</button><span class="flashcard-counter">${flashIndex+1} / ${data.words.length}</span><button id="flashNext">Next →</button></div>
      <div class="review-buttons"><button id="flashAgain">↻ Still learning</button><button id="flashGood">✓ I remember</button></div>
      <p class="review-hint">${reviewDue(word) ? 'Due now' : 'Next review: '+esc(word.nextReview)} · Remembered words are scheduled after 1, 3, 7, 14 then 30 days.</p>
      <div class="flashcard-controls"><button id="flashShuffle">↝ Shuffle cards</button></div></div>`;
    $('#flashFlip').addEventListener('click',flipCard);
    $('#flashFlip').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();flipCard();}});
    $('#flashPrev').onclick=()=>{flashIndex=(flashIndex-1+data.words.length)%data.words.length;flipped=false;renderFlashcards();};
    $('#flashNext').onclick=()=>{flashIndex=(flashIndex+1)%data.words.length;flipped=false;renderFlashcards();};
    $('#flashShuffle').onclick=()=>{flashIndex=Math.floor(Math.random()*data.words.length);flipped=false;renderFlashcards();};
    $('#flashAgain').onclick=()=>reviewCard(word,false);
    $('#flashGood').onclick=()=>reviewCard(word,true);
  }
  function flipCard() {flipped=!flipped;$('#flashcard').classList.toggle('flipped',flipped);}
  function renderProgress() {
    const sessions=data.sessions, days=[...new Set(sessions.map(s=>s.date))];
    let streak=0, day=new Date(todayLocal()+'T12:00:00+07:00');
    if(!days.includes(todayLocal())) day.setDate(day.getDate()-1);
    for(let n=0;n<500;n++){
      const date=day.toLocaleDateString('sv-SE',{timeZone:'Asia/Ho_Chi_Minh'});
      if(!days.includes(date))break;streak++;day.setDate(day.getDate()-1);
    }
    const totalMinutes=sessions.reduce((s,x)=>s+Number(x.minutes||0),0);
    const week=Array.from({length:7},(_,i)=>{ const d=new Date(todayLocal()+'T12:00:00+07:00'); d.setDate(d.getDate()-(6-i)); const key=d.toLocaleDateString('sv-SE',{timeZone:'Asia/Ho_Chi_Minh'});return {date:key,label:d.toLocaleDateString('en-US',{weekday:'short',timeZone:'Asia/Ho_Chi_Minh'}),minutes:readingMinutes(key)}; });
    $('#progressContent').innerHTML=`<div class="progress-stat-grid"><div class="progress-stat"><small>READING STREAK</small><strong>${streak} days</strong><span>Keep the momentum going</span></div><div class="progress-stat"><small>TOTAL READING TIME</small><strong>${totalMinutes} min</strong><span>Time spent with English</span></div><div class="progress-stat"><small>ARTICLES COMPLETED</small><strong>${sessions.length}</strong><span>Reading sessions logged</span></div><div class="progress-stat"><small>WORDS COLLECTED</small><strong>${data.words.length}</strong><span>${data.words.filter(w=>w.mastered).length} marked as mastered</span></div></div><div class="progress-bottom"><section class="habit-panel"><h2>One week at a glance</h2><p>Your reading minutes per day (Vietnam time).</p><div class="week-bars">${week.map(d=>`<div class="week-col"><div class="week-bar ${d.minutes?'active':''}" title="${d.minutes} min" style="height:${Math.max(5,Math.min(155,d.minutes / Math.max(data.goal,1) * 135))}px"></div><small>${d.label}</small></div>`).join('')}</div><div class="goal-panel"><div><h3>Daily reading goal</h3><p>Choose a sustainable target.</p></div><select id="goalSelect" aria-label="Thời lượng mục tiêu"><option value="10" ${data.goal===10?'selected':''}>10 min / day</option><option value="15" ${data.goal===15?'selected':''}>15 min / day</option><option value="20" ${data.goal===20?'selected':''}>20 min / day</option><option value="30" ${data.goal===30?'selected':''}>30 min / day</option></select></div></section><section class="recent-panel"><h2>Recent reading activity</h2><p>Your latest five completed readings.</p>${sessions.length? [...sessions].reverse().slice(0,5).map(s=>`<div class="recent-read"><b>${esc(s.title)}</b><small>${esc(s.date)} · ${s.minutes} reading min</small></div>`).join(''):'<div class="empty-vocab" style="padding:30px"><p>Your reading history will appear here after you finish an article.</p></div>'}</section></div>`;
    const saved = (data.savedArticles||[]).filter(a=>data.bookmarks.includes(a.id));
    $('#progressContent').insertAdjacentHTML('beforeend', `<section class="saved-panel"><h2>Saved for later · ${saved.length}</h2>${saved.length ? saved.slice(0,15).map(a=>`<button class="saved-article-btn" data-saved-open="${esc(a.id)}"><span>${esc(a.title)}</span>${icon('arrow')}</button>`).join('') : '<p style="color:#74847d;font-size:12px">Use the bookmark icon on a story to keep it here.</p>'}</section>`);
    $$('[data-saved-open]').forEach(button=>button.onclick=()=>openReader(button.dataset.savedOpen));
    $('#goalSelect').onchange=(e)=>{data.goal=Number(e.target.value);store();updateStats();renderProgress();};
  }
  function exportData() {
    const out=JSON.stringify({app:'PamVu English Ledger',exportedAt:new Date().toISOString(),...data},null,2);
    const href=URL.createObjectURL(new Blob([out],{type:'application/json'}));
    const a=document.createElement('a');a.href=href;a.download='pamvu-english-progress-'+todayLocal()+'.json';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(href),3000);
    showToast('Đã xuất file tiến độ học tiếng Anh của bạn.');
  }
  function addCustomArticle() {
    const title=$('#customTitle').value.trim(), body=$('#customBody').value.trim();
    if(title.length < 6 || body.length < 60){$('#pasteStatus').textContent='Hãy nhập tiêu đề ít nhất 6 ký tự và đoạn tiếng Anh tối thiểu 60 ký tự.';return;}
    const a={id:'custom-'+Date.now(),title,body:body.slice(0,23000),summary:body.slice(0,155)+'…',source:'Your personal text',topic:'world',level:'B2',contentType:'custom',readMinutes:Math.max(2,Math.ceil(body.split(/\s+/).length/155))};
    data.customArticles.unshift(a);data.customArticles=data.customArticles.slice(0,15);store();
    indexArticles([a]);$('#customTitle').value='';$('#customBody').value='';$('#pasteStatus').textContent='';renderPractice();openReader(a.id);
  }
  function handleOpenClicks(event) {
    const btn=event.target.closest('[data-open]');
    if(btn){openReader(btn.dataset.open);return;}
    const bookmark=event.target.closest('[data-bookmark]');
    if(bookmark){doBookmark(bookmark.dataset.bookmark);return;}
  }
  function bind() {
    $$('.nav-link').forEach(button=>button.addEventListener('click',()=>setView(button.dataset.view)));
    $$('.topic-filter').forEach(button=>button.addEventListener('click',()=>{
      activeTopic=button.dataset.topic; itemsShown=9; economyFocus='all'; $('.topic-filter').forEach(el=>el.classList.toggle('active',el===button));
      $('#heroStory').innerHTML='<div class="skeleton-hero"></div>';
      $('#storyGrid').innerHTML='<div class="skeleton-card"></div><div class="skeleton-card"></div><div class="skeleton-card"></div>';
      fetchNews(activeTopic);
    }));
    $('#articleSearch').addEventListener('input',e=>{query=e.target.value;itemsShown=9;renderHome();});
    $('#levelFilter').addEventListener('change',e=>{activeLevel=e.target.value;itemsShown=9;renderHome();});
    $('#economyDesk').addEventListener('click',e=>{
      const pill=e.target.closest('[data-economy-focus]'); if(!pill)return;
      economyFocus=pill.dataset.economyFocus;itemsShown=9;
      $('[data-economy-focus]').forEach(el=>{const active=el===pill;el.classList.toggle('active',active);el.setAttribute('aria-pressed',String(active));});
      renderHome();
    });
    $('#loadMoreBtn').addEventListener('click',()=>{
      const list=filteredStories();if(itemsShown>=list.length){renderHome();return;}
      const old=itemsShown;itemsShown=Math.min(itemsShown+9,list.length);renderHome();
      const cards=$('.story-card', $('#storyGrid'));
      const firstNew=cards[Math.max(0,old-1)];
      if(firstNew){firstNew.setAttribute('tabindex','-1');firstNew.scrollIntoView({behavior:'smooth',block:'nearest'});}
    });
    $('#refreshNews').addEventListener('click',()=>{liveByTopic.delete(activeTopic);fetchNews(activeTopic,true);});
    $('#storyGrid').addEventListener('click',handleOpenClicks);
    $('#heroStory').addEventListener('click',handleOpenClicks);
    for(const id of ['heroStory','storyGrid','practiceGrid']){
      $('#'+id).addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.dataset.open){e.preventDefault();openReader(e.target.dataset.open);}});
    }
    $('#practiceGrid').addEventListener('click',handleOpenClicks);
    $('#globalSearchBtn').onclick=()=>{setView('home');$('#articleSearch').focus();};
    $('#dailyStartBtn').onclick=()=>{setView('home');const first=filteredStories()[0];if(first)openReader(first.id);};
    $('#ritualBtn').onclick=()=>{const first=filteredStories()[0];if(first)openReader(first.id);else setView('practice');};
    $('#bannerStudioBtn').onclick=()=>setView('practice');
    $('#closeReader').onclick=closeReader;
    $('#readerDialog').addEventListener('click',e=>{if(e.target===$('#readerDialog'))closeReader();});
    $('#readerDialog').addEventListener('close',()=>{document.body.classList.remove('modal-open');closeDict();if('speechSynthesis' in window)window.speechSynthesis.cancel();});
    $('#readerBody').addEventListener('click',e=>{const word=e.target.closest('[data-word]');if(word)clickWord(word.dataset.word,word);});
    $('#readerBookmark').onclick=()=>currentArticle&&doBookmark(currentArticle.id);
    $('#completeReader').onclick=finishArticle;
    $('#saveReflection').onclick=saveReflection;
    $('#readerListen').onclick=()=>{if(!currentArticle)return;if('speechSynthesis'in window&&window.speechSynthesis.speaking){window.speechSynthesis.cancel();$('#readerListen span').textContent='Listen';}else{speakText(isPractice(currentArticle) ? currentArticle.body : (currentArticle.summary || currentArticle.title));$('#readerListen span').textContent='Stop / Listen';}};
    $('#dictClose').onclick=closeDict;
    $('#dictSpeak').onclick=()=>currentDict&&speakText(currentDict.word);
    $('#dictSave').onclick=saveCurrentWord;
    $('#addCustomArticle').onclick=addCustomArticle;
    $$('[data-words-mode]').forEach(el=>el.onclick=()=>{wordsMode=el.dataset.wordsMode;flipped=false;renderWords();});
    $('#wordsContent').addEventListener('change',e=>{const word=e.target.dataset.meaning;if(!word)return;const w=data.words.find(w=>w.word===word);if(w){w.vietnamese=e.target.value.trim();store();showToast('Đã lưu nghĩa tiếng Việt.');}});
    $('#wordsContent').addEventListener('click',e=>{
      const del=e.target.closest('[data-delete]'); if(del){data.words=data.words.filter(w=>w.word!==del.dataset.delete);store();updateStats();renderWords();showToast('Đã xóa từ.');return;}
      const speak=e.target.closest('[data-speak]');if(speak)speakText(speak.dataset.speak);
    });
    $('#exportDataBtn').onclick=exportData;
    document.addEventListener('keydown',e=>{if(e.key==='Escape')closeDict();});
    document.addEventListener('click',e=>{if(!$('#dictionaryPopover').hidden&&!e.target.closest('#dictionaryPopover')&&!e.target.closest('.lookup-word'))closeDict();});
  }
  function init() {
    if(!window.PAMVU_PRACTICE) return;
    formatDateHeader();indexArticles(window.PAMVU_PRACTICE);indexArticles(data.customArticles);
    updateStats();renderPractice();bind();setLiveState('connecting');
    const hash=location.hash.replace('#','');if(['home','practice','words','progress'].includes(hash))setView(hash);
    fetchNews('all');
    // Refresh RSS about every 5 minutes while the home page is visible.
    // On returning to a background tab, refresh promptly if the interval elapsed.
    const autoRefreshMs = 5 * 60 * 1000;
    let lastAutoRefresh = Date.now();
    function refreshNewsIfDue() {
      if (document.hidden || activeView !== 'home' || isLoading || Date.now() - lastAutoRefresh < autoRefreshMs) return;
      lastAutoRefresh = Date.now();
      liveByTopic.delete(activeTopic);
      fetchNews(activeTopic, true);
    }
    setInterval(refreshNewsIfDue, 60 * 1000);
    document.addEventListener('visibilitychange', refreshNewsIfDue);
    window.addEventListener('focus', refreshNewsIfDue);
  }
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init):init();
})();
