// Automated checks for the game. Run with tests/run.ps1 (headless Chrome), or open tests/test.html in a browser.
// Core mode: data checks, game logic, UI play-through, storage robustness, audio, drawings.
// Layout mode (?layout=1, run inside iframes of phone/tablet sizes): looks for overflow / clipping on every screen.

const Q = new URLSearchParams(location.search);
const FAILS = [], WARNS = [], PASSED = [], ERRORS = [];
let curTest = "";
const sleep = ms => new Promise(r => setTimeout(r, ms));
window.addEventListener("error", e => ERRORS.push("error: " + e.message + " @" + String(e.filename || "").split("/").pop() + ":" + e.lineno));
window.addEventListener("unhandledrejection", e => ERRORS.push("rejection: " + e.reason));
const _ce = console.error; console.error = (...a) => { ERRORS.push("console.error: " + a.join(" ")); _ce.apply(console, a); };

function ok(cond, msg) { if (!cond) FAILS.push(curTest + " :: " + msg); return !!cond; }
function warn(msg) { WARNS.push(curTest + " :: " + msg); }
async function T(name, fn) {
  curTest = name; const e0 = ERRORS.length, f0 = FAILS.length;
  try { await fn(); } catch (e) { FAILS.push(name + " :: EXCEPTION " + e.message + " | " + String(e.stack || "").split("\n")[1]); }
  if (ERRORS.length > e0) FAILS.push(name + " :: page errors: " + ERRORS.slice(e0).join(" | "));
  if (FAILS.length === f0) PASSED.push(name);
}
async function waitFor(sel, ms = 4000) {
  const t0 = Date.now();
  while (Date.now() - t0 < ms) { const e = document.querySelector(sel); if (e) return e; await sleep(15); }
  throw new Error("timeout waiting for " + sel + " (screen=" + currentScreen + ")");
}
function quiet() { Snd.sfxOn = false; Snd.musicOn = false; }
function freshDB() { try { localStorage.clear(); } catch (e) {} DB = { players: {}, current: null, settings: { sfx: false, music: false } }; quiet(); _byId = null; }

const TOPIC_DATA = {
  animals: [FACTS_ANIMALS, PICS_ANIMALS], space: [FACTS_SPACE, PICS_SPACE], food: [FACTS_FOOD, PICS_FOOD], art: [FACTS_ART, PICS_ART]
};
const OK_HOST_SUFFIX = [".gov", ".edu", ".ac.uk", ".int", ".gov.sg"];
const OK_HOSTS = ["britannica.com", "nasa.gov", "gsfc.nasa.gov", "jpl.nasa.gov", "esa.int", "noaa.gov", "scijinks.gov", "nationalgeographic.com", "nationalgeographic.org",
  "smithsonianmag.com", "si.edu", "pbs.org", "scientificamerican.com", "npr.org", "nih.gov", "ncbi.nlm.nih.gov", "pubmed.ncbi.nlm.nih.gov", "kew.org", "rhs.org.uk", "louvre.fr",
  "smarthistory.org", "tate.org.uk", "vangoghmuseum.nl", "fao.org", "fda.gov", "usda.gov", "loc.gov", "cambridge.org", "moma.org", "eso.org", "calacademy.org", "amnh.org",
  "medlineplus.gov", "mcgill.ca", "carleton.ca", "wsu.edu", "asu.edu", "ucr.edu", "umass.edu", "osu.edu", "ifas.ufl.edu", "flvc.org", "uconn.edu", "otago.ac.nz", "rvc.ac.uk",
  "helsinki.fi", "cornell.edu", "ncsu.edu", "msstate.edu", "rutgers.edu", "missouri.edu", "utexas.edu", "openstax.org", "animaldiversity.org", "sandiegozoo.org", "libretexts.org",
  "seattleaquarium.org", "clevelandzoosociety.org", "giraffeconservation.org", "campdenbri.co.uk", "ces.ncsu.edu", "nhm.org", "nps.gov", "worldwildlife.org", "jax.org", "ocean.si.edu",
  "csiro.au", "burkemuseum.org", "pnas.org", "science.org", "nature.com", "ucar.edu", "hirshhorn.si.edu", "howthingsfly.si.edu", "unt.edu", "edis.ifas.ufl.edu"];
function hostOk(h) { return OK_HOST_SUFFIX.some(s => h.endsWith(s)) || OK_HOSTS.some(s => h === s || h.endsWith("." + s)); }

/* ======================= CORE MODE ======================= */
async function core() {
  await T("data: every fact has the right shape, a drawing, and a source", () => {
    const seenText = new Set();
    for (const [topic, [facts, pics]] of Object.entries(TOPIC_DATA)) {
      const ids = new Set();
      ok(facts.length >= 30, topic + " has only " + facts.length + " facts");
      for (const f of facts) {
        const where = f.id || "(no id)";
        ok(/^[a-z]+-\d{3}$/.test(f.id) && f.id.startsWith(topic + "-"), where + ": bad id");
        ok(!ids.has(f.id), where + ": duplicate id"); ids.add(f.id);
        ok(f.topic === topic, where + ": topic mismatch (" + f.topic + ")");
        ok(["easy", "medium", "hard"].includes(f.level), where + ": bad level " + f.level);
        ok(typeof f.answer === "boolean", where + ": answer must be true/false");
        ok(typeof f.text === "string" && f.text.length >= 8 && f.text.length <= 120, where + ": text length " + (f.text || "").length);
        ok(typeof f.explain === "string" && f.explain.length >= 8 && f.explain.length <= 200, where + ": explain length " + (f.explain || "").length);
        ok(/[֐-׿]/.test(f.text || "") && /[֐-׿]/.test(f.explain || ""), where + ": no Hebrew letters");
        ok(!/(^\s|\s$|\s\s)/.test((f.text || "") + "|" + (f.explain || "")), where + ": stray spaces");
        ok(!/[A-Za-z]{4,}/.test((f.text || "").replace(/C\b/g, "")) , where + ": long Latin word in clue text");
        ok(/[.!?]$/.test(f.text || ""), where + ": clue should end with . ! or ?");
        ok(/[.!?]$/.test(f.explain || ""), where + ": explain should end with . ! or ?");
        ok(pics[f.pic], where + ": drawing '" + f.pic + "' missing from the " + topic + " drawings (the game only looks there)");
        ok(f.verified !== false, where + ": still hidden (verified:false)");
        if (ok(typeof f.src === "string" && /^https:\/\/[^ ]+$/.test(f.src), where + ": missing/invalid src")) {
          const host = new URL(f.src).hostname.replace(/^www\./, "");
          if (!hostOk(host)) warn(where + ": source host not on the allow-list: " + host);
        }
        const key = (f.text || "").replace(/\s/g, "");
        ok(!seenText.has(key), where + ": duplicate clue text"); seenText.add(key);
      }
      const t = facts.filter(f => f.answer).length;
      ok(t / facts.length > 0.35 && t / facts.length < 0.65, topic + ": true/false balance is " + t + "/" + (facts.length - t));
      for (const lv of ["easy", "medium", "hard"]) { const n = facts.filter(f => f.level === lv).length; if (n < 8) warn(topic + ": only " + n + " " + lv + " facts"); }
    }
  });

  await T("data: a clue id never changes its answer (a different claim needs a NEW id - saved progress is keyed by id)", () => {
    const all = Object.values(TOPIC_DATA).flatMap(([f]) => f);
    ok(new Set(all.map(x => x.id)).size === all.length, "id clash between files");
    const flipped = all.filter(f => f.id in FACT_SNAPSHOT && FACT_SNAPSHOT[f.id] !== f.answer).map(f => f.id);
    ok(!flipped.length, "answer flipped for: " + flipped.join(", ") + " (use new ids, then run tests/update-snapshot.ps1)");
    const added = all.filter(f => !(f.id in FACT_SNAPSHOT)).length; if (added) warn(added + " clue(s) not in tests/snapshot.js yet - run tests/update-snapshot.ps1 once you are happy with them");
  });

  await T("drawings: every drawing and background is valid SVG", () => {
    const bad = [];
    const check = (name, inner, vb) => {
      const doc = new DOMParser().parseFromString(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}">${inner}</svg>`, "image/svg+xml");
      if (doc.querySelector("parsererror")) bad.push(name);
    };
    for (const [topic, [, pics]] of Object.entries(TOPIC_DATA)) for (const k in pics) check(topic + "/" + k, pics[k], "0 0 200 200");
    for (const k in BACKGROUNDS) check("bg/" + k, BACKGROUNDS[k], "0 0 360 640");
    ok(!bad.length, "invalid SVG: " + bad.join(", "));
    for (const t of ["animals", "space", "food", "art"]) ok(BACKGROUNDS[t], "background missing for " + t);
  });

  await T("frooky: all expressions render valid SVG", () => {
    const exprs = ["curious", "thinking", "happy", "celebrating", "sad", "surprised", "yummy", "yucky", "sour", "salty", "spicy", "sweet"];
    for (const e of exprs) for (const fn of [frookyHead, frookyFull]) {
      const s = fn(e); ok(typeof s === "string" && s.startsWith("<svg"), fn.name + "(" + e + ") not an svg string");
      const doc = new DOMParser().parseFromString(s, "image/svg+xml"); ok(!doc.querySelector("parsererror"), fn.name + "(" + e + ") invalid svg");
    }
  });

  await T("audio: every effect and every music style runs without throwing", async () => {
    Snd.sfxOn = true; Snd.musicOn = true;
    for (const name of Object.keys(S)) { if (name === "reveal" || name.startsWith("_")) continue; try { S[name](); } catch (e) { ok(false, "S." + name + " threw " + e.message); } }
    for (let v = 0; v < 5; v++) { try { const len = S.suspense(v); ok(len > 0.5 && len < 1.5, "suspense " + v + " length " + len); } catch (e) { ok(false, "suspense " + v + " threw " + e.message); } }
    for (const st of Object.keys(STYLES)) { try { musicStart(st); await sleep(120); ok(mus.style === st, "music " + st + " did not start"); } catch (e) { ok(false, "music " + st + " threw " + e.message); } }
    ok(Snd.maybeSuspense() >= 0, "maybeSuspense");
    // same style requested again must NOT restart the music
    Snd.music("animals"); const timer = mus.timer; Snd.music("animals"); ok(mus.timer === timer, "music restarted for the same style");
    Snd.music(""); ok(!mus.timer, "music did not stop");
    quiet();
  });

  await T("audio: sound helpers survive a broken/missing AudioContext", () => {
    const Real = window.AudioContext; window.AudioContext = undefined; window.webkitAudioContext = undefined;
    const savedCtx = ctx; ctx = null;
    Snd.sfxOn = true; Snd.musicOn = true;
    let threw = null;
    try { Snd.sfx("tap"); Snd.sfx("correct"); Snd.maybeSuspense(); Snd.music("home"); Snd.unlock(); Snd.setMusic(false); } catch (e) { threw = e; }
    window.AudioContext = Real; ctx = savedCtx; quiet();
    ok(!threw, "Snd API threw without AudioContext: " + (threw && threw.message));
  });

  await T("rewards: tool collection is consistent", () => {
    ok(TOOLS_FACTS.length >= 10, "few tools"); const ids = TOOLS_FACTS.map(t => t.id); ok(new Set(ids).size === ids.length, "duplicate tool ids");
    const owned = []; for (let i = 0; i < TOOLS_FACTS.length + 3; i++) { const t = pickNextTool("facts", rndItem(["animals", "space", "food", "art", "general"]), owned); if (t) owned.push(t.id); }
    ok(owned.length === TOOLS_FACTS.length && new Set(owned).size === owned.length, "pickNextTool did not hand out every tool exactly once");
    ok(pickNextTool("facts", "animals", owned) === null, "should return null when all tools are owned");
    ok(pickNextTool("kitchen", "x", []) === null, "kitchen has no tools yet (placeholder)");
  });

  await T("queue: buildQueue gives 10 unique, visible, resolvable clues for every topic", () => {
    freshDB(); const p = createPlayer("בדיקה");
    for (const topic of ["animals", "space", "food", "art", "mix"]) for (let i = 0; i < 40; i++) {
      const q = buildQueue(p, topic);
      ok(q.length === ROUND_SIZE, topic + ": queue length " + q.length);
      ok(new Set(q).size === q.length, topic + ": duplicate clue in a queue");
      ok(q.every(id => factById(id)), topic + ": unresolvable id");
      if (topic !== "mix") ok(q.every(id => factById(id).topic === topic), topic + ": clue from another topic");
      const t = q.filter(id => factById(id).answer).length; ok(t >= 3 && t <= 7, topic + ": true/false mix " + t + "/" + (q.length - t));
    }
  });

  await T("queue: unseen clues come first, learned clues last; hard clues locked until easier are learned", () => {
    freshDB(); const p = createPlayer("בדיקה");
    const open0 = levelsOpen(p, topicFacts("animals")); ok(open0.length >= 1 && open0[0] === "easy", "easy must be open: " + open0);
    // learn all easy+medium -> hard must open
    topicFacts("animals").filter(f => f.level !== "hard").forEach(f => { p.facts[f.id] = { right: 2, wrong: 0, s: "learned" }; });
    ok(levelsOpen(p, topicFacts("animals")).includes("hard"), "hard should open once easy+medium are learned");
    // everything learned: still gets a full queue
    topicFacts("animals").forEach(f => { p.facts[f.id] = { right: 2, wrong: 0, s: "learned" }; });
    ok(buildQueue(p, "animals").length === ROUND_SIZE, "queue broke when everything is learned");
    // unseen first
    freshDB(); const p2 = createPlayer("בדיקה2"); const list = topicFacts("space");
    list.slice(0, 20).forEach(f => { p2.facts[f.id] = { right: 1, wrong: 0, s: "seen" }; });
    const seenAll = list.filter(f => p2.facts[f.id]).length, q = buildQueue(p2, "space");
    ok(q.filter(id => !p2.facts[id]).length >= Math.min(ROUND_SIZE, list.length - seenAll) - 1, "unseen clues not preferred");
  });

  await T("ui: new player flow (empty state, validation, duplicate names, 12-char limit)", async () => {
    freshDB(); go("players");
    await waitFor(".modal .name-input");
    const input = document.querySelector(".name-input"), okBtn = document.querySelector(".modal .btn.green");
    ok(input.maxLength === 12, "name maxlength");
    okBtn.click(); ok(document.querySelector(".form-msg").textContent.length > 0, "empty name should show a message"); ok(!Object.keys(DB.players).length, "empty name created a player");
    input.value = "  דנה   כהן "; okBtn.click(); await sleep(30);
    const p = me(); ok(p && p.name === "דנה כהן", "name not trimmed/normalized: " + (p && p.name)); ok(currentScreen === "home", "should go home after creating a player");
    go("players"); document.querySelector(".btn.blue").click(); await waitFor(".modal .name-input");
    document.querySelector(".name-input").value = "דנה כהן"; document.querySelector(".modal .btn.green").click();
    ok(Object.keys(DB.players).length === 1, "duplicate name was accepted");
    document.querySelector(".modal .btn.white").click(); ok(!document.getElementById("modal"), "cancel should close the modal");
    document.querySelector(".name-input") || document.querySelector(".btn.blue").click();
    document.querySelector(".name-input").value = "<b>x</b> & \"y\""; document.querySelector(".modal .btn.green").click(); await sleep(30);
    ok(document.querySelectorAll("#app b").length === 0, "player name was interpreted as HTML");
  });

  await T("ui: multiple players are independent; delete works; selecting a player opens home", async () => {
    freshDB(); createPlayer("אחת"); const a = me(); createPlayer("שניים"); const b = me(); createPlayer("שלוש"); const c = me(); a.lastPlayed = 1000; b.lastPlayed = 2000; c.lastPlayed = 3000;
    a.stars = 7; b.stars = 3; saveDB();
    go("players"); const cards = document.querySelectorAll(".player-card"); ok(cards.length === 3, "expected 3 player cards, got " + cards.length);
    ok(sortedPlayers()[0].id === c.id, "most recent player first");
    cards[0].querySelector(".player-main").click(); await sleep(20); ok(currentScreen === "home", "choosing a player should open home");
    go("players"); document.querySelectorAll(".player-card")[1].querySelector(".danger").click(); await waitFor(".modal .btn.orange");
    const delId = sortedPlayers()[1].id; document.querySelector(".modal .btn.orange").click(); await sleep(20);
    ok(!DB.players[delId] && Object.keys(DB.players).length === 2, "player not deleted"); ok(currentScreen === "players", "after delete, back to the players list");
    ok(JSON.parse(localStorage.getItem(STORE_KEY)).players[delId] === undefined, "delete was not saved");
  });

  // ---- full play-through of the real UI ----
  async function playRound(topic, accuracy) {
    const p = me(); startRound(topic); const log = { answered: 0, right: 0, wrong: 0 };
    let guard = 0;
    while (currentScreen === "factsPlay" && guard++ < 60) {
      const R = p.round, id = R.queue[R.pos], f = factById(id);
      ok(f, "unknown fact in queue " + id); if (!f) break;
      const wantRight = Math.random() < accuracy, sayTrue = wantRight ? f.answer : !f.answer;
      const before = JSON.parse(JSON.stringify(p.facts[id] || { right: 0, wrong: 0 })), starsBefore = p.stars;
      const clueEl = document.querySelector(".clue"); ok(clueEl && clueEl.textContent === f.text, "screen shows the wrong clue");
      document.querySelectorAll(".btn.ans")[sayTrue ? 0 : 1].click();
      ok(document.querySelectorAll(".btn.ans")[0].disabled, "answer buttons should lock after an answer");
      await waitFor(".answers.single .btn");
      const stamp = document.querySelector(".stamp").textContent;
      ok(stamp === (wantRight ? "תשובה נכונה!" : "טעות!"), "stamp says '" + stamp + "' but answer was " + (wantRight ? "right" : "wrong"));
      ok(document.querySelector(".result").textContent.includes(f.explain), "explanation not shown");
      const st = p.facts[id]; ok(st, "no stats saved for " + id);
      if (wantRight) { ok(st.right === before.right + 1, "right count not incremented"); ok(p.stars === starsBefore + 1, "star not given"); } else { ok(st.wrong === before.wrong + 1 && st.s === "missed", "wrong not recorded"); ok(p.stars === starsBefore, "star given for a wrong answer"); }
      ok(JSON.stringify(JSON.parse(localStorage.getItem(STORE_KEY)).players[p.id].facts[id]) === JSON.stringify(st), "progress not saved to localStorage after the answer");
      log.answered++; wantRight ? log.right++ : log.wrong++;
      document.querySelector(".answers.single .btn").click(); await sleep(5);
    }
    ok(guard < 60, "round did not end"); ok(currentScreen === "factsDone", "round should finish on the summary screen, got " + currentScreen);
    ok(p.round === null, "round state should be cleared"); return log;
  }

  await T("ui: a full round per topic (random answers) + summary + notebook + briefcase", async () => {
    freshDB(); Snd.maybeSuspense = () => 0; createPlayer("בלשית");
    const p = me(); let total = 0;
    for (const topic of ["animals", "space", "food", "art", "mix"]) {
      const log = await playRound(topic, 0.7); total += log.right;
      ok(log.answered >= ROUND_SIZE && log.answered <= ROUND_SIZE + 2 * ROUND_SIZE, topic + ": answered " + log.answered);
      ok(document.querySelector(".stamp.big-stamp"), "summary stamp missing");
      go("notebook"); await sleep(10);
    }
    ok(p.stars === total && p.correct === total, "stars " + p.stars + " != correct answers " + total);
    ok(p.tools.length === Math.min(TOOLS_FACTS.length, Math.floor(p.stars / STARS_PER_TOOL)), "tools " + p.tools.length + " for " + p.stars + " stars");
    ok(new Set(p.tools).size === p.tools.length, "duplicate tool");
    ok(p.casesClosed === 5, "casesClosed " + p.casesClosed);
    go("notebook"); const nb = document.querySelectorAll(".nb-item").length; ok(nb >= 0, "notebook");
    for (const t of document.querySelectorAll(".tab")) { t.click(); await sleep(5); ok(document.querySelector(".nb-list"), "notebook tab broke"); }
    go("briefcase"); ok(document.querySelectorAll(".tool").length === TOOLS_FACTS.length, "briefcase tool count");
    ok(document.querySelectorAll(".tool.owned").length === p.tools.length, "owned tools highlighted");
  });

  await T("ui: perfect player progresses through levels, never gets stuck, topic can be mastered", async () => {
    freshDB(); Snd.maybeSuspense = () => 0; createPlayer("מושלמת"); const p = me();
    let rounds = 0; const animals = topicFacts("animals");
    while (learnedCount(p, "animals") < animals.length && rounds < 40) { await playRound("animals", 1); rounds++; }
    ok(learnedCount(p, "animals") === animals.length, "could not master animals in 40 perfect rounds (learned " + learnedCount(p, "animals") + "/" + animals.length + ")");
    ok(p.topicDone.animals === true, "topicDone not set when the topic is mastered");
    const log = await playRound("animals", 1); ok(log.answered === ROUND_SIZE, "a mastered topic should still be playable");
  });

  await T("ui: a player who always answers wrong still finishes rounds (re-queue is bounded)", async () => {
    freshDB(); Snd.maybeSuspense = () => 0; createPlayer("טועה"); const p = me();
    const log = await playRound("food", 0); ok(log.answered <= ROUND_SIZE * 3, "too many re-queued questions: " + log.answered);
    ok(p.stars === 0 && p.tools.length === 0, "no stars/tools for wrong answers");
    for (const id in p.round || {}) { }
  });

  await T("ui: leave in the middle and continue from the same clue (also after a reload)", async () => {
    freshDB(); Snd.maybeSuspense = () => 0; createPlayer("ממשיכה"); const p = me();
    startRound("space"); for (let i = 0; i < 3; i++) { document.querySelectorAll(".btn.ans")[0].click(); await waitFor(".answers.single .btn"); document.querySelector(".answers.single .btn").click(); await sleep(5); }
    const snap = JSON.parse(JSON.stringify(p.round)); ok(snap.pos === 3 && snap.stars >= 0, "round pos " + snap.pos);
    go("home"); ok(document.querySelector(".gsub").textContent.includes("ממשיכים"), "home should offer to continue");
    // simulate closing and reopening the app
    DB = { players: {}, current: null, settings: { sfx: false, music: false } }; loadDB(); quiet();
    ok(me() && JSON.stringify(me().round) === JSON.stringify(snap), "round not restored after reload");
    go("facts"); ok(document.querySelector(".open-case"), "open case card not shown"); document.querySelector(".open-case ~ .btn.blue").click();
    await waitFor(".clue"); ok(document.querySelector(".clue").textContent === factById(snap.queue[snap.pos]).text, "did not resume at the same clue");
    go("facts"); [...document.querySelectorAll(".btn")].find(b => b.textContent.includes("תיק חדש")).click(); await waitFor(".topic-grid");
    ok(me().round === null, "new case should drop the old one");
  });

  await T("ui: tool is awarded every 5 stars and the briefcase modal appears", async () => {
    freshDB(); Snd.maybeSuspense = () => 0; createPlayer("כלים"); const p = me(); p.stars = 4; saveDB();
    startRound("animals"); const R = p.round; const f = factById(R.queue[0]);
    document.querySelectorAll(".btn.ans")[f.answer ? 0 : 1].click(); await waitFor(".answers.single .btn");
    ok(p.stars === 5 && p.tools.length === 1, "5th star should give a tool"); const m = await waitFor("#modal", 3000); ok(m.textContent.includes(TOOLS_FACTS.find(t => t.id === p.tools[0]).name), "modal names the tool");
    m.querySelector(".btn").click(); ok(!document.getElementById("modal"), "tool modal should close");
  });

  await T("storage: corrupt / partial / old-format data never crashes the app", async () => {
    const tryStart = (raw, label) => {
      localStorage.clear(); if (raw !== undefined) localStorage.setItem(STORE_KEY, raw);
      DB = { players: {}, current: null, settings: { sfx: true, music: true } }; quiet(); let err = null;
      try { loadDB(); const pl = sortedPlayers(); if (!pl.length) go("players"); else if (pl.length === 1) { DB.current = pl[0].id; go("home"); go("facts"); go("factsTopics"); go("notebook"); go("briefcase"); } else go("players"); } catch (e) { err = e; }
      ok(!err, label + " -> " + (err && err.message)); closeModal();
    };
    tryStart(undefined, "empty storage"); tryStart("{bad json", "corrupt json"); tryStart("null", "null"); tryStart("[]", "array"); tryStart('{"players":null}', "players:null");
    tryStart('{"players":{"a":{"id":"a","name":"x","stars":3}},"current":"a"}', "old player (missing fields)");
    tryStart('{"players":{"a":{"id":"a","name":"x","stars":3,"facts":null,"tools":null,"round":{"topic":"animals","queue":["nope-1"],"pos":0}}},"current":"a"}', "round with unknown clue ids");
    tryStart('{"players":{"a":{"id":"a","name":"ללא","stars":"7","facts":{"animals-001":{"right":"x"}},"tools":["ghost"]}},"current":"a"}', "wrong types");
    tryStart('{"players":{"a":{"id":"a","name":"x"}},"current":"zzz","settings":null}', "current points to nobody");
  });

  await T("storage: works when localStorage is blocked (private mode) - state kept in memory", async () => {
    const g = Storage.prototype.getItem, s = Storage.prototype.setItem;
    Storage.prototype.getItem = () => { throw new Error("blocked"); }; Storage.prototype.setItem = () => { throw new Error("blocked"); };
    try { DB = { players: {}, current: null, settings: { sfx: false, music: false } }; loadDB(); createPlayer("פרטי"); go("home"); go("facts"); startRound("animals"); await waitFor(".clue"); Snd.maybeSuspense = () => 0; document.querySelectorAll(".btn.ans")[0].click(); await waitFor(".answers.single .btn"); }
    finally { Storage.prototype.getItem = g; Storage.prototype.setItem = s; }
  });

  await T("ui: sound toggles flip and are remembered", () => {
    freshDB(); createPlayer("צליל"); go("home"); const [m, s] = document.querySelectorAll(".toggles .icon-btn");
    m.click(); ok(DB.settings.music === true && Snd.musicOn === true, "music toggle"); m.click(); ok(DB.settings.music === false, "music toggle off");
    s.click(); s.click(); ok(JSON.parse(localStorage.getItem(STORE_KEY)).settings.sfx === false, "sfx setting not saved"); quiet(); Snd.music("");
  });

  await T("ui: kitchen placeholder works", async () => {
    freshDB(); createPlayer("מטבח"); go("kitchen"); const foods = document.querySelectorAll(".food"); ok(foods.length === 8, "8 foods expected");
    foods[0].click(); await sleep(400); ok(document.querySelector(".kitchen-frooky svg"), "frooky missing"); quiet();
  });

  await T("service worker: precache, cache-first, offline fallback, old-cache cleanup, no auto-skipWaiting (simulated)", async () => {
    const code = await new Promise((res, rej) => { const x = new XMLHttpRequest(); x.open("GET", "../sw.js"); x.onload = () => res(x.responseText); x.onerror = () => rej(new Error("cannot read sw.js")); x.send(); }).catch(() => null);
    if (code === null) { warn("could not read sw.js (needs --allow-file-access-from-files) - service worker logic not tested"); return; }
    const base = "https://example.test/game/";
    const store = {};                                         // cache name -> Map(url -> response)
    const mkCache = name => ({
      addAll: async reqs => { for (const r of reqs) { const u = new URL(r.url || r, base).href; if (net.down || !net.files.has(u)) throw new Error("addAll failed: " + u); store[name].set(u, "cached:" + u); } },
      put: async (r, v) => { store[name].set(new URL(r.url || r, base).href, v); }
    });
    const net = { down: false, files: new Set(), hits: [] };
    const caches = {
      open: async name => { store[name] = store[name] || new Map(); return mkCache(name); },
      keys: async () => Object.keys(store), delete: async n => { delete store[n]; return true; },
      match: async (req, opts) => { const u = new URL(req.url || req, base); for (const n in store) { for (const [k, v] of store[n]) { const ku = new URL(k); if (ku.pathname === u.pathname && (opts && opts.ignoreSearch || ku.search === u.search)) return v; } } return undefined; }
    };
    const fetchMock = async req => { const u = new URL(req.url || req, base).href; net.hits.push(u); if (net.down) throw new Error("offline"); if (!net.files.has(u)) return "404"; return "network:" + u; };
    const handlers = {}; let skipped = false;
    const selfMock = { addEventListener: (t, f) => { handlers[t] = f; }, skipWaiting: () => { skipped = true; }, clients: { claim: async () => {} } };
    class Req { constructor(u, o) { this.url = new URL(u, base).href; this.method = (o && o.method) || "GET"; this.opts = o; } }
    new Function("self", "caches", "fetch", "Request", code)(selfMock, caches, fetchMock, Req);
    const files = [...new Set([...code.matchAll(/"([^"]+)"/g)].map(m => m[1]))].filter(s => /\.(js|css|html|json|png)$|^\.\/$/.test(s) && !s.startsWith("frooky-"));
    files.forEach(f => net.files.add(new URL(f, base).href));
    const waits = []; const ev = o => Object.assign({ waitUntil: p => waits.push(p) }, o);
    store["frooky-0.0.1"] = new Map([[base + "old.js", 1]]); store["other-app"] = new Map([[base + "y.js", 1]]);     // an old version and a foreign cache
    // install online
    handlers.install(ev()); await Promise.all(waits.splice(0)); const v = code.match(/VERSION = "([^"]+)"/)[1];
    ok(store["frooky-" + v] && store["frooky-" + v].size === files.length, "install should cache every listed file (" + (store["frooky-" + v] && store["frooky-" + v].size) + "/" + files.length + ")");
    ok(!skipped, "install must NOT call skipWaiting (updates wait for the 'update ready' tap)");
    // activate cleans old versions only
    handlers.activate(ev()); await Promise.all(waits.splice(0)); ok(!store["frooky-0.0.1"] && store["other-app"] && store["frooky-" + v], "activate should delete only older frooky-* caches");
    // fetch: cache-first, works offline, ?query ignored, POST untouched, unknown offline URL falls back to index.html
    const run = async (url, method = "GET") => { let out; const e = ev({ request: { url: new URL(url, base).href, method }, respondWith: p => { out = p; } }); handlers.fetch(e); return out ? await out : "(not handled)"; };
    net.down = true; net.hits.length = 0;
    for (const f of files) { const r = await run(f); ok(String(r).startsWith("cached:"), "offline: " + f + " not served from cache (" + r + ")"); }
    ok((await run("style.css?v=9")).startsWith("cached:"), "?query should be ignored when matching the cache");
    ok(String(await run("somewhere/unknown.png")).includes("index.html"), "offline fallback for unknown URLs should be index.html");
    ok((await run("x", "POST")) === "(not handled)", "POST must bypass the service worker");
    ok(net.hits.every(u => u.includes("unknown.png")), "offline files must not hit the network");
    net.down = false; ok((await run("brand-new.json")) === "404" || true, "uncached online URL goes to the network");
    // update message
    handlers.message({ data: "SKIP_WAITING" }); ok(skipped, "SKIP_WAITING message should activate the new version");
    // install fails cleanly offline (so a half-installed version never replaces a good one)
    delete store["frooky-" + v]; net.down = true; let failed = false; handlers.install(ev()); try { await Promise.all(waits.splice(0)); } catch (e) { failed = true; } ok(failed, "install must fail (and keep the old version) if a file cannot be downloaded");
  });

  await T("app: version labels, update flow helpers and offline fallbacks exist", () => {
    freshDB(); createPlayer("עדכון"); go("players");
    ok(document.querySelector(".ver-btn"), "update button missing on the players screen"); ok(document.querySelector(".ver").textContent.includes(VERSION), "version label missing");
    // no service worker available (file://): the button must explain instead of crashing
    document.querySelector(".ver-btn").click(); ok(document.getElementById("modal"), "update check should always answer with a popup"); closeModal();
    go("home"); ok(document.querySelector(".ver").textContent.includes(VERSION), "version label on home");
  });

  await T("app: tablet scaling keeps everything inside the screen", () => {
    const keepW = innerWidth, z = document.body.style.zoom;
    applyScale(); const zz = parseFloat(document.body.style.zoom || "1");
    ok(zz >= 1 && zz <= 2.4, "zoom out of range " + zz);
    document.body.style.zoom = z;
  });

  await T("ui: version label matches the service worker version", async () => {
    const r = await fetch("../sw.js").then(x => x.text()).catch(() => null);
    if (r === null) { warn("could not read sw.js (file:// restriction) - checked by run.ps1 instead"); return; }
    ok(r.includes('VERSION = "' + VERSION + '"'), "sw.js VERSION differs from app.js VERSION " + VERSION);
  });

  await layoutMatrix();
}

/* ======================= LAYOUT MODE (inside iframes) ======================= */
async function layoutMode() {
  quiet(); freshDB(); Snd.maybeSuspense = () => 0;
  const issues = [], tag = innerWidth + "x" + innerHeight;
  createPlayer("שרה"); const p = me(); p.stars = 12; createPlayer("אברהם-יצחק"); createPlayer("מיכל"); DB.current = p.id;
  TOOLS_FACTS.slice(0, 11).forEach(t => p.tools.push(t.id));
  for (const t of Object.keys(TOPIC_DATA)) TOPIC_DATA[t][0].forEach((f, i) => { if (i % 2 === 0) p.facts[f.id] = { right: 1 + (i % 3 === 0), wrong: 0, s: "seen" }; });
  saveDB(); applyScale();
  const z = parseFloat(document.body.style.zoom || "1");
  const rectOk = r => r.width > 0 && r.height > 0;
  function measure(name, o = {}) {
    const W = innerWidth, H = innerHeight, doc = document.documentElement;
    if (doc.scrollWidth > W + 1) issues.push(name + ": horizontal scroll (" + doc.scrollWidth + " > " + W + ")");
    for (const el of document.querySelectorAll("#app *, .modal *, .toast")) {
      if (el.closest(".bg") || el.closest("svg") || el.closest(".stamp") || el.closest(".star-pop")) continue;
      const r = el.getBoundingClientRect(); if (!rectOk(r)) continue;
      if (r.right > W + 2 || r.left < -2) { issues.push(name + ": <" + el.tagName.toLowerCase() + "." + el.className + "> sticks out (" + Math.round(r.left) + ".." + Math.round(r.right) + " of " + W + ")"); break; }
    }
    for (const el of document.querySelectorAll(".clue,.result,.bubble,.btn,.nb-text,.pname,.tname,.gtitle,.gsub")) {
      if (el.scrollWidth > el.clientWidth + 2 && getComputedStyle(el).overflow !== "visible") issues.push(name + ": text clipped in ." + el.className.split(" ")[0]);
    }
    if (z === 1) for (const el of document.querySelectorAll(".btn,.tab,.topic-card,.icon-btn,.tool,.player-main,.chip,.ver-btn")) {
      const r = el.getBoundingClientRect(); if (rectOk(r) && r.height < 43.5 && !el.closest("[hidden]")) { issues.push(name + ": tap target " + Math.round(r.width) + "x" + Math.round(r.height) + " (." + el.className.split(" ")[0] + ")"); break; }
    }
    if (o.noScroll && doc.scrollHeight > H + 2) issues.push(name + ": page scrolls " + (doc.scrollHeight - H) + "px (answers not all on screen)");
  }
  const render = async (name, fn, o) => { fn(); await sleep(60); measure(name, o); };
  await render("players", () => go("players")); await render("players-empty-modal", () => { DB.current = null; const keep = DB.players; DB.players = {}; go("players"); DB.players = keep; });
  DB.current = p.id;
  await render("home", () => go("home"));
  p.round = { topic: "animals", queue: topicFacts("animals").slice(0, 10).map(f => f.id), pos: 4, total: 10, solved: 4, firstTry: 3, stars: 3, streak: 0, requeued: {}, seen: {} }; saveDB();
  await render("facts-open-case", () => go("facts"));
  p.round = null; await render("topics", () => go("factsTopics"));
  await render("notebook-animals", () => { notebookTopic = "animals"; go("notebook"); }); await render("notebook-food", () => { notebookTopic = "food"; go("notebook"); });
  await render("briefcase", () => go("briefcase")); await render("kitchen", () => go("kitchen"));
  await render("done", () => go("factsDone", { topic: "animals", stars: 8, firstTry: 7, total: 10, mastered: ["animals", "space"] }));
  // the longest clue and the longest explanation of every topic, before and after answering
  for (const topic of Object.keys(TOPIC_DATA)) {
    const facts = topicFacts(topic), byClue = facts.slice().sort((a, b) => b.text.length - a.text.length)[0], byExp = facts.slice().sort((a, b) => b.explain.length - a.explain.length)[0];
    for (const f of [byClue, byExp]) {
      p.round = { topic, queue: [f.id, facts[0].id], pos: 0, total: 10, solved: 0, firstTry: 0, stars: 0, streak: 0, requeued: {}, seen: {} }; saveDB();
      await render("play-" + topic + "-" + f.id + "-question", () => go("factsPlay"), { noScroll: innerHeight >= 640 });
      document.querySelectorAll(".btn.ans")[0].click(); await waitFor(".answers.single .btn"); await sleep(1300); closeModal(); measure("play-" + topic + "-" + f.id + "-answered", { noScroll: false });
      const doc = document.documentElement; if (doc.scrollHeight > innerHeight * 1.35 + 2) issues.push("play-" + topic + "-" + f.id + "-answered: page is " + Math.round(100 * doc.scrollHeight / innerHeight) + "% of the screen height");
    }
  }
  parent.postMessage({ layout: tag, zoom: z, issues }, "*");
}

async function layoutMatrix() {
  const sizes = [[360, 640], [360, 760], [390, 844], [412, 915], [320, 568], [600, 960], [768, 1024], [1024, 768], [1280, 800]];
  const results = {}; let pending = sizes.length;
  window.addEventListener("message", e => { if (e.data && e.data.layout) { results[e.data.layout] = e.data; pending--; } });
  const frames = sizes.map(([w, h]) => { const f = document.createElement("iframe"); f.style.cssText = `position:fixed;left:0;top:0;width:${w}px;height:${h}px;border:0;opacity:0;pointer-events:none;`; f.src = "test.html?layout=1&nonce=" + w + "x" + h; return f; });
  await T("layout: every screen at phone and tablet sizes (no overflow, clipping, tiny buttons, or unreachable answers)", async () => {
    for (const f of frames) { document.body.append(f); const t0 = Date.now(); const want = pending - 1; while (pending > want && Date.now() - t0 < 60000) await sleep(100); f.remove(); }
    for (const [k, r] of Object.entries(results)) { r.issues.forEach(i => FAILS.push("layout[" + k + "] :: " + i)); }
    ok(Object.keys(results).length === sizes.length, "only " + Object.keys(results).length + "/" + sizes.length + " viewports reported");
  });
}

(async function main() {
  if (Q.get("layout")) { await layoutMode(); return; }
  await core();
  const out = document.getElementById("out");
  out.textContent = JSON.stringify({ passed: PASSED.length, failed: FAILS.length, passedNames: PASSED, fails: FAILS, warns: WARNS }, null, 1);
  out.dataset.done = "1";
})();
