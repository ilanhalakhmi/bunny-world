// Game 1: "בלשית העובדות" (Fact Detective) + Frooky's notebook.
// Facts live in data/data-facts-<topic>.js. A round = 10 clues; progress is saved after every answer,
// so the player can leave at any time and continue from the same clue.

const ROUND_SIZE = 10;
const FACT_TOPICS = [
  { id: "animals", name: "חיות", icon: "🦒" },
  { id: "space", name: "חלל", icon: "🚀" },
  { id: "food", name: "אוכל", icon: "🍕" },
  { id: "art", name: "ציור ואמנות", icon: "🎨" }
];
const FACT_SOURCES = () => ({ animals: FACTS_ANIMALS, space: FACTS_SPACE, food: FACTS_FOOD, art: FACTS_ART });
const PIC_SOURCES = () => ({ animals: PICS_ANIMALS, space: PICS_SPACE, food: PICS_FOOD, art: PICS_ART });
const CORRECT_MSGS = ["כל הכבוד!", "בול!", "מצוין!", "יפה מאוד!", "תשובה מעולה!", "פתרון מושלם!", "בלש אמיתי!"];
const WRONG_MSGS = ["אופס, כמעט!", "לא נורא, ככה לומדים!", "אוי, זה היה מסובך!", "הפעם זה לא יצא. נחזור לזה עוד מעט!", "שטויות במיץ עגבניות... כמעט נפלנו בפח!"];

/* ---------- fact data helpers ---------- */
// verified:false facts stay hidden until someone checks them.
function topicFacts(topic) { return (FACT_SOURCES()[topic] || []).filter(f => f.verified !== false); }
let _byId = null;
function factById(id) {
  if (!_byId) { _byId = {}; FACT_TOPICS.forEach(t => topicFacts(t.id).forEach(f => { _byId[f.id] = f; })); }
  return _byId[id];
}
function picSVG(f) {
  const inner = (PIC_SOURCES()[f.topic] || {})[f.pic];
  return inner ? `<svg viewBox="0 0 200 200" aria-hidden="true">${inner}</svg>` : "";
}
const isLearned = (p, id) => { const s = p.facts[id]; return !!s && s.s === "learned"; };
const learnedCount = (p, topic) => topicFacts(topic).filter(f => isLearned(p, f.id)).length;

// Harder levels open up as the player masters the easier ones.
function levelsOpen(p, list) {
  const order = ["easy", "medium", "hard"], open = ["easy"];
  for (let i = 0; i < 2; i++) {
    const cur = list.filter(f => f.level === order[i]);
    if (!cur.length) { open.push(order[i + 1]); continue; }
    const learned = cur.filter(f => isLearned(p, f.id)).length;
    const allSeen = cur.every(f => p.facts[f.id]);
    if (learned / cur.length >= 0.5 || allSeen) open.push(order[i + 1]); else break;
  }
  return open;
}

// Choose the 10 clues of a round: unseen first, then missed, then seen; about half true / half myths.
function buildQueue(p, topicId) {
  const topics = topicId === "mix" ? FACT_TOPICS.map(t => t.id) : [topicId];
  let pool = [], all = [];
  topics.forEach(t => { const list = topicFacts(t); const open = levelsOpen(p, list); all.push(...list); pool.push(...list.filter(f => open.includes(f.level))); });
  if (pool.length < ROUND_SIZE) pool = all;
  const rank = f => { const s = p.facts[f.id]; if (!s) return 0; if (s.s === "missed") return 1; if (s.s === "learned") return 3; return 2; };
  pool = shuffle(pool).sort((a, b) => rank(a) - rank(b));
  const picked = []; let want = Math.random() < 0.5;
  for (let i = 0; i < ROUND_SIZE && pool.length; i++) {
    let idx = pool.findIndex(f => f.answer === want); if (idx < 0) idx = 0;
    picked.push(pool.splice(idx, 1)[0]); want = !want;
  }
  return shuffle(picked).map(f => f.id);
}

/* ---------- registration on the home screen ---------- */
GAMES.push({
  id: "facts", title: "בלשית העובדות", icon: "🔍", color: "blue",
  subtitle(p) { const r = p.round; return r && r.pos < r.queue.length ? "ממשיכים: חידה " + (Math.min(r.solved + 1, r.total)) + " מתוך " + r.total : "נכון או שטויות במיץ עגבניות?"; },
  open() { go("facts"); }
});

/* ---------- entry: continue an open case or pick a topic ---------- */
SCREENS.facts = (root) => {
  const p = me(), r = p.round;
  if (r && r.pos < r.queue.length) {
    Snd.music("home");
    const t = FACT_TOPICS.find(x => x.id === r.topic);
    root.append(h("div", { class: "screen" },
      topBar("בלשית העובדות"),
      h("div", { class: "hero-small", html: frookyHead("curious") }),
      h("div", { class: "case-card open-case" },
        h("div", { class: "case-tab" }, "תיק פתוח"),
        h("p", { class: "big" }, "יש תיק שלא סיימנו!"),
        h("p", {}, (t ? t.icon + " " + t.name : "🎲 הפתעה") + " · חידה " + Math.min(r.solved + 1, r.total) + " מתוך " + r.total)),
      h("button", { class: "btn blue", onclick: () => { Snd.sfx("select"); go("factsPlay"); } }, "▶ להמשיך בתיק"),
      h("button", { class: "btn white", onclick: () => { Snd.sfx("select"); p.round = null; saveDB(); go("factsTopics"); } }, "📂 תיק חדש")));
  } else go("factsTopics");
};

/* ---------- topic picker ---------- */
SCREENS.factsTopics = (root) => {
  const p = me();
  Snd.music("home");
  const cards = FACT_TOPICS.map(t => {
    const total = topicFacts(t.id).length, got = learnedCount(p, t.id);
    return h("button", { class: "topic-card", onclick: () => { Snd.sfx("select"); startRound(t.id); } },
      h("span", { class: "ticon" }, t.icon), h("span", { class: "tname" }, t.name),
      h("span", { class: "tbar" }, h("span", { style: "width:" + Math.round(100 * got / Math.max(1, total)) + "%" })),
      h("small", {}, got + "/" + total + " נלמדו"));
  });
  cards.push(h("button", { class: "topic-card mix", onclick: () => { Snd.sfx("select"); startRound("mix"); } },
    h("span", { class: "ticon" }, "🎲"), h("span", { class: "tname" }, "הפתעה!"), h("small", {}, "מכל הנושאים")));
  root.append(h("div", { class: "screen" },
    topBar("בלשית העובדות", "home"),
    h("div", { class: "speech-row" }, h("div", { class: "hero-small", html: frookyHead("curious") }), h("div", { class: "bubble" }, "על מה נחקור היום?")),
    h("div", { class: "topic-grid" }, cards)));
};

function startRound(topicId) {
  const p = me();
  p.round = { topic: topicId, queue: buildQueue(p, topicId), pos: 0, total: ROUND_SIZE, solved: 0, firstTry: 0, stars: 0, streak: 0, requeued: {}, seen: {} };
  saveDB();
  go("factsPlay");
}

/* ---------- the clue screen ---------- */
SCREENS.factsPlay = (root) => {
  const p = me(), R = p.round;
  if (!R) return go("factsTopics");
  if (R.pos >= R.queue.length) return finishRound();
  const f = factById(R.queue[R.pos]);
  if (!f) { R.pos++; saveDB(); return go("factsPlay"); }
  const topicId = f.topic;
  Snd.music(topicId);
  const isRepeat = !!R.seen[f.id];

  let busy = false;

  const speech = h("div", { class: "bubble small" }, isRepeat ? "הנה זה חוזר – מוכנים?" : "מה דעתכם? אמת או שטויות?");
  const face = h("div", { class: "face", html: frookyFull("curious") });
  const stamp = h("div", { class: "stamp" });
  const result = h("div", { class: "result" });
  const card = h("div", { class: "case-card" },
    h("div", { class: "case-tab" }, "תיק " + FACT_TOPICS.find(t => t.id === topicId).name + (isRepeat ? " · 🔁 עוד פעם" : "")),
    h("div", { class: "clip" }),
    h("div", { class: "pic", html: picSVG(f) }),
    h("p", { class: "clue" }, f.text),
    result, stamp);
  const tomato = `<svg viewBox="30 30 140 140" class="mini-tomato">${PICS_FOOD.tomato}</svg>`;
  const btnTrue = h("button", { class: "btn green ans", onclick: () => answer(true) }, "נכון ✓");
  const btnFalse = h("button", { class: "btn orange ans two-line", onclick: () => answer(false) }, h("span", { html: tomato }), h("span", {}, "שטויות במיץ עגבניות!"));
  const answers = h("div", { class: "answers" }, btnTrue, btnFalse);

  root.append(h("div", { class: "screen play" },
    h("div", { class: "bg", html: BACKGROUNDS[topicId] }),
    h("div", { class: "play-inner" },
      topBar("חידה " + Math.min(R.solved + 1, R.total) + " מתוך " + R.total, "home"),
      card,
      h("div", { class: "speech-row tight" }, face, speech),
      answers)));

  function setFace(expr) { face.innerHTML = frookyFull(expr); }

  function answer(sayTrue) {
    if (busy) return; busy = true;
    btnTrue.disabled = btnFalse.disabled = true;
    (sayTrue ? btnTrue : btnFalse).classList.add("picked");
    Snd.sfx("tap");
    setFace("thinking"); speech.textContent = "הממ...";
    const wait = Snd.maybeSuspense() * 1000;
    setTimeout(() => reveal(sayTrue), wait ? wait + 200 : 250);
  }

  function reveal(sayTrue) {
    const right = sayTrue === f.answer;
    // --- save progress for this fact ---
    const st = p.facts[f.id] || (p.facts[f.id] = { right: 0, wrong: 0, s: "seen" });
    if (right) { st.right++; st.s = st.right >= 2 ? "learned" : "seen"; p.correct++; R.solved++; R.streak++; if (!isRepeat) R.firstTry++; }
    else { st.wrong++; st.s = "missed"; p.wrong++; R.streak = 0; }
    R.seen[f.id] = true; R.pos++;
    if (!right) {                       // missed clues come back later in the same round (max 2 times)
      const n = R.requeued[f.id] || 0;
      if (n < 2) { R.requeued[f.id] = n + 1; R.queue.splice(Math.min(R.queue.length, R.pos + 3), 0, f.id); }
    }
    let tool = null;
    if (right) { R.stars++; tool = addStar(topicId); const sc = document.querySelector(".topbar .starcount"); if (sc) sc.textContent = "⭐ " + p.stars; }
    saveDB();
    // --- show it ---
    stamp.textContent = right ? "תשובה נכונה!" : "טעות!";
    stamp.className = "stamp slam " + (right ? "yes" : "no");
    Snd.sfx("stamp");
    setTimeout(() => Snd.sfx(right ? (R.streak >= 3 ? "streak" : "correct") : "wrong"), 160);
    setFace(right ? (R.streak >= 3 ? "celebrating" : "happy") : "sad");
    speech.textContent = right ? rndItem(CORRECT_MSGS) : rndItem(WRONG_MSGS);
    result.innerHTML = "";
    result.append(h("b", {}, f.answer ? "ידעת? " : "האמת היא: "), f.explain);
    result.classList.add("show");
    if (right) {
      const s = h("div", { class: "star-pop" }, "+1 ⭐"); card.append(s); setTimeout(() => Snd.sfx("star"), 420);
    }
    const next = h("button", { class: "btn blue", onclick: () => { Snd.sfx("tap"); go("factsPlay"); } }, R.pos >= R.queue.length ? "לסיום התיק ›" : "להמשיך ›");
    answers.replaceWith(h("div", { class: "answers single" }, next));
    if (tool) setTimeout(() => showToolModal(tool), 1200);
  }
};

function showToolModal(tool) {
  Snd.sfx("briefcase");
  modal([
    h("h2", {}, "התיק נפתח!"),
    h("div", { class: "tool-big" }, tool.icon),
    h("p", { class: "big" }, "כלי חדש: " + tool.name),
    h("p", {}, "הוא נשמר בתיק של פרוקי 💼"),
    h("button", { class: "btn green", onclick: () => { Snd.sfx("tap"); closeModal(); } }, "מעולה!")
  ]);
}

/* ---------- end of a round ---------- */
function finishRound() {
  const p = me(), R = p.round;
  p.casesClosed++;
  const mastered = [];
  const topics = R.topic === "mix" ? FACT_TOPICS.map(t => t.id) : [R.topic];
  topics.forEach(t => { const total = topicFacts(t).length; if (total && learnedCount(p, t) >= total && !p.topicDone[t]) { p.topicDone[t] = true; mastered.push(t); } });
  const summary = { topic: R.topic, stars: R.stars, firstTry: R.firstTry, total: R.total, mastered };
  p.round = null; saveDB();
  go("factsDone", summary);
}
SCREENS.factsDone = (root, s) => {
  const p = me();
  Snd.music("home");
  setTimeout(() => Snd.sfx(s.mastered.length ? "topicDone" : "caseClosed"), 200);
  const stamp = h("div", { class: "stamp slam yes big-stamp" }, "התיק נסגר!");
  const topicName = id => FACT_TOPICS.find(t => t.id === id).name;
  root.append(h("div", { class: "screen done" },
    h("div", { class: "hero", html: frookyFull("celebrating") }),
    h("div", { class: "case-card" },
      h("div", { class: "case-tab" }, "סיכום תיק"), stamp,
      h("p", { class: "big" }, "⭐ " + s.stars + " כוכבים בתיק הזה"),
      h("p", {}, s.firstTry + " מתוך " + s.total + " תשובות נכונות בניסיון הראשון"),
      s.mastered.length ? h("p", { class: "big trophy" }, "🏆 סיימתם את כל החידות בנושא " + s.mastered.map(topicName).join(", ") + "!") : null,
      s.mastered.length ? h("p", {}, "אפשר לנסות נושא אחר או לחזור על חידות ישנות.") : null),
    h("button", { class: "btn blue", onclick: () => { Snd.sfx("select"); s.topic ? startRound(s.topic) : go("factsTopics"); } }, "🔍 תיק חדש באותו נושא"),
    h("button", { class: "btn white", onclick: () => { Snd.sfx("select"); go("factsTopics"); } }, "📂 בחירת נושא"),
    h("button", { class: "btn white", onclick: () => { Snd.sfx("back"); go("home"); } }, "🏠 הביתה")));
};

/* ---------- Frooky's notebook: every fact answered correctly at least once ---------- */
let notebookTopic = "animals";
SCREENS.notebook = (root) => {
  const p = me();
  Snd.music("home");
  const tabs = h("div", { class: "tabs" }, FACT_TOPICS.map(t => h("button", { class: "tab" + (t.id === notebookTopic ? " on" : ""), onclick: () => { Snd.sfx("tap"); notebookTopic = t.id; go("notebook"); } }, t.icon + " " + t.name)));
  const items = topicFacts(notebookTopic).filter(f => p.facts[f.id] && p.facts[f.id].right >= 1);
  const list = h("div", { class: "nb-list" }, items.length ? items.map(f => h("div", { class: "nb-item" },
    h("div", { class: "nb-pic", html: picSVG(f) }),
    h("div", { class: "nb-text" },
      f.answer ? h("div", {}, f.text) : h("div", { class: "myth" }, "טעות נפוצה: " + f.text),
      h("small", {}, (f.answer ? "ידעת? " : "האמת היא: ") + f.explain)))) :
    [h("p", { class: "hint" }, "עוד אין כאן כלום בנושא הזה. פותרים חידות והמחברת מתמלאת!")]);
  root.append(h("div", { class: "screen" },
    topBar("המחברת של פרוקי"), tabs, list));
};
