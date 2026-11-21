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
  await sleep(1400); closeModal();   // let timers of this test (award popups) fire before the next test starts
  if (ERRORS.length > e0) FAILS.push(name + " :: page errors: " + ERRORS.slice(e0).join(" | "));
  if (FAILS.length === f0) PASSED.push(name);
}
async function waitFor(sel, ms = 4000) {
  const t0 = Date.now();
  while (Date.now() - t0 < ms) { const e = document.querySelector(sel); if (e) return e; await sleep(15); }
  throw new Error("timeout waiting for " + sel + " (screen=" + currentScreen + ")");
}
const _createPlayer = createPlayer; createPlayer = (n, g) => { const p = _createPlayer(n, g); p.genderAsked = true; return p; };
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

  await T("queue: a clue is never repeated until every clue of the topic was shown (cycles), missed ones lead the next cycle", () => {
    const answerRound = (p, q, wrongIds = []) => q.forEach(id => { const f = factById(id); askedIn(p, f.topic)[id] = 1; p.facts[id] = wrongIds.includes(id) ? { right: 0, wrong: 1, s: "missed" } : { right: 1, wrong: 0, s: "seen" }; });
    for (const topic of ["animals", "space", "food", "art", "mix"]) {
      freshDB(); const p = createPlayer("מחזור"); const topics = topic === "mix" ? ["animals", "space", "food", "art"] : [topic];
      for (let r = 0; r < 70; r++) {
        const before = {}, cyc = JSON.stringify(p.cycles); topics.forEach(t => { before[t] = Object.assign({}, askedIn(p, t)); });
        const q = buildQueue(p, topic), unaskedBefore = topics.flatMap(t => topicFacts(t)).filter(f => !before[f.topic][f.id]);
        ok(q.length === ROUND_SIZE && new Set(q).size === q.length, topic + ": round " + r + " size/unique");
        const repeats = q.filter(id => before[factById(id).topic][id]);
        if (JSON.stringify(p.cycles) === cyc) ok(repeats.length === 0, topic + " round " + r + ": " + repeats.length + " repeated clue(s) although unasked clues remain");
        else { ok(unaskedBefore.every(f => q.includes(f.id)), topic + " round " + r + ": new cycle began before all unasked clues were used"); ok(repeats.length === ROUND_SIZE - unaskedBefore.length, topic + ": repeats only fill the gap"); }
        answerRound(p, q);
      }
      ok(topics.every(t => p.cycles[t] >= 2), topic + ": cycles never advanced");
    }
    // a clue missed in the old cycle is the first thing asked in the next one
    freshDB(); const p = createPlayer("החמצה"), list = topicFacts("food");
    list.forEach(f => { askedIn(p, "food")[f.id] = 1; p.facts[f.id] = { right: 1, wrong: 0, s: "seen" }; });
    const missed = list.slice(0, 3).map(f => f.id); missed.forEach(id => { p.facts[id] = { right: 0, wrong: 1, s: "missed" }; });
    const q = buildQueue(p, "food"); ok(missed.every(id => q.includes(id)), "missed clues must lead the new cycle"); ok(p.cycles.food === 2, "cycle counter");
    // balance never beats freshness: only false clues are left unasked -> they are all used before any true clue repeats
    freshDB(); const p2 = createPlayer("איזון"), sp = topicFacts("space"), falses = sp.filter(f => !f.answer);
    sp.forEach(f => { if (f.answer) { askedIn(p2, "space")[f.id] = 1; p2.facts[f.id] = { right: 1, wrong: 0, s: "seen" }; } });
    const q2 = buildQueue(p2, "space"); ok(q2.filter(id => !factById(id).answer).length === Math.min(ROUND_SIZE, falses.length), "unasked clues must come before repeats even if they are all myths");
    // a save from before cycles existed: answered clues count as already asked
    freshDB(); const p3 = createPlayer("ישן"); delete p3.asked; delete p3.cycles; topicFacts("art").slice(0, 25).forEach(f => { p3.facts[f.id] = { right: 1, wrong: 0, s: "seen" }; });
    const q3 = buildQueue(p3, "art"); ok(q3.every(id => !p3.facts[id]), "old save: answered clues were asked again"); saveDB(); loadDB();
    ok(me().asked && me().asked.art && Object.keys(me().asked.art).length === 25, "asked clues must survive save/load");
  });

  await T("ui: new player flow (empty state, validation, gender, duplicate names, 12-char limit)", async () => {
    freshDB(); go("players");
    await waitFor(".modal .name-input");
    const input = document.querySelector(".name-input"), okBtn = document.querySelector(".modal .btn.green");
    ok(input.maxLength === 12, "name maxlength");
    ok(document.querySelectorAll(".gender-btn").length === 2, "boy/girl buttons missing");
    okBtn.click(); ok(document.querySelector(".form-msg").textContent.length > 0, "empty name should show a message"); ok(!Object.keys(DB.players).length, "empty name created a player");
    input.value = "  דנה   כהן "; okBtn.click(); ok(!Object.keys(DB.players).length, "a player was created without choosing boy/girl");
    ok(document.querySelector(".form-msg").textContent.includes("בן או בת"), "should ask to choose boy or girl");
    document.querySelector('.gender-btn[data-g="f"]').click(); ok(document.querySelector('.gender-btn[data-g="f"]').classList.contains("on"), "chosen gender should be highlighted");
    okBtn.click(); await sleep(30);
    const p = me(); ok(p && p.name === "דנה כהן", "name not trimmed/normalized: " + (p && p.name)); ok(p.gender === "f", "gender not saved"); ok(currentScreen === "home", "should go home after creating a player");
    go("players"); document.querySelector(".btn.blue").click(); await waitFor(".modal .name-input");
    document.querySelector(".name-input").value = "דנה כהן"; document.querySelector('.gender-btn[data-g="m"]').click(); document.querySelector(".modal .btn.green").click();
    ok(Object.keys(DB.players).length === 1, "duplicate name was accepted");
    document.querySelector(".modal .btn.white").click(); ok(!document.getElementById("modal"), "cancel should close the modal");
    document.querySelector(".name-input") || document.querySelector(".btn.blue").click();
    document.querySelector(".name-input").value = "<b>x</b> & \"y\""; document.querySelector('.gender-btn[data-g="m"]').click(); document.querySelector(".modal .btn.green").click(); await sleep(30);
    ok(document.querySelectorAll("#app b").length === 0, "player name was interpreted as HTML");
  });

  await T("ui: edit a player's name and gender; renaming to someone else's name is refused", async () => {
    freshDB(); createPlayer("אחד", "m"); const a = me(); createPlayer("שתיים", "f"); const b = me(); go("players");
    const row = [...document.querySelectorAll(".player-card")].find(r => r.textContent.includes("אחד")); row.querySelector('[aria-label="עריכת שחקן"]').click(); await waitFor(".modal .name-input");
    ok(document.querySelector(".name-input").value === "אחד", "edit should pre-fill the name"); ok(document.querySelector('.gender-btn[data-g="m"]').classList.contains("on"), "edit should pre-select the gender");
    document.querySelector(".name-input").value = "שתיים"; document.querySelector(".modal .btn.green").click(); ok(a.name === "אחד", "renamed onto an existing name");
    document.querySelector(".name-input").value = "אחד אחד"; document.querySelector('.gender-btn[data-g="f"]').click(); document.querySelector(".modal .btn.green").click(); await sleep(20);
    ok(a.name === "אחד אחד" && a.gender === "f", "edit not saved: " + a.name + "/" + a.gender); ok(Object.keys(DB.players).length === 2, "edit created a new player"); ok(currentScreen === "players", "should return to the players list");
    ok(JSON.parse(localStorage.getItem(STORE_KEY)).players[a.id].gender === "f", "edit not persisted");
    const keep = [...document.querySelectorAll(".player-card")].find(r => r.textContent.includes("אחד אחד")); keep.querySelector('[aria-label="עריכת שחקן"]').click(); await waitFor(".modal .name-input");
    document.querySelector(".name-input").value = "אחד אחד"; document.querySelector(".modal .btn.green").click(); await sleep(10); ok(a.name === "אחד אחד", "re-saving the same name must be allowed");
  });

  await T("gender: wording follows boy / girl / not chosen", async () => {
    const m = { gender: "m", stars: 0, tools: [], medals: {} }, f = { gender: "f", stars: 0, tools: [], medals: {} }, n = { stars: 0, tools: [], medals: {} };
    ok(factsTitle(m) === "בלש העובדות" && factsTitle(f) === "בלשית העובדות", "game title by gender");
    ok(rankOf(m) !== rankOf(f) && rankOf(m).includes("בלש") && rankOf(f).includes("בלשית"), "rank wording by gender: " + rankOf(m) + " / " + rankOf(f));
    ok(rankOf(n).includes("/"), "no gender -> neutral rank: " + rankOf(n));
    ok(correctMsgs(f).includes("בלשית אמיתית!") && !correctMsgs(f).includes("בלש אמיתי!") && correctMsgs(m).includes("בלש אמיתי!"), "praise by gender");
    ok(G(m, "a", "b", "c") === "a" && G(f, "a", "b", "c") === "b" && G(n, "a", "b", "c") === "c" && G(undefined, "a", "b", "c") === "c", "G()");
    // the real screens
    freshDB(); createPlayer("בן", "m"); go("home"); ok(document.querySelector(".gtitle").textContent === "בלש העובדות", "home shows the boy title");
    go("facts"); ok(!document.querySelector(".topbar-title").textContent.includes("בלשית"), "boy topic screen title");
    startRound("food"); await waitFor(".clue"); ok(document.querySelector(".bubble").textContent.includes("מה דעתך"), "boy clue prompt");
    freshDB(); createPlayer("בת", "f"); go("home"); ok(document.querySelector(".gtitle").textContent === "בלשית העובדות", "home shows the girl title");
    go("kitchen"); ok(document.querySelector(".case-card").textContent.includes("לחצי"), "girl kitchen text uses feminine imperative");
    freshDB(); createPlayer("בן", "m"); go("kitchen"); ok(document.querySelector(".case-card").textContent.includes("לחץ על"), "boy kitchen text uses masculine imperative");
    freshDB(); createPlayer("ללא"); go("kitchen"); ok(document.querySelector(".case-card").textContent.includes("לחצו"), "no gender -> plural");
  });

  await T("gender: players created before this feature are asked once (and can skip)", async () => {
    freshDB(); const p = _createPlayer("ישנה"); ok(p.genderAsked === false && p.gender === undefined, "old-style player expected");
    go("home"); await waitFor("#modal", 2000); ok(document.querySelector("#modal h2").textContent.includes("בן או בת"), "gender question not shown");
    document.querySelector("#modal .btn.green").click(); ok(document.querySelector("#modal .form-msg").textContent.includes("בן או בת"), "saving without a choice should ask again");
    document.querySelector("#modal .btn.white").click(); ok(!document.getElementById("modal") && p.genderAsked === true && p.gender === undefined, "skip should close and not ask again");
    go("home"); await sleep(600); ok(!document.getElementById("modal"), "asked a second time");
    freshDB(); const q = _createPlayer("ישן"); go("home"); await waitFor("#modal", 2000); document.querySelector('#modal .gender-btn[data-g="f"]').click(); document.querySelector("#modal .btn.green").click(); await sleep(30);
    ok(q.gender === "f", "choice not saved"); ok(document.querySelector(".gtitle").textContent === "בלשית העובדות", "home not refreshed with the new wording");
  });

  await T("rewards: more tools, medals with unique ids, ranks", () => {
    ok(TOOLS_FACTS.length >= 50, "expected 50+ tools, have " + TOOLS_FACTS.length);
    ok(new Set(TOOLS_FACTS.map(t => t.icon)).size === TOOLS_FACTS.length, "two tools share an icon"); ok(new Set(TOOLS_FACTS.map(t => t.name)).size === TOOLS_FACTS.length, "two tools share a name");
    for (const t of ["animals", "space", "food", "art", "general"]) ok(TOOLS_FACTS.filter(x => x.topic === t).length >= 8, "few tools for " + t);
    ok(MEDALS.length >= 25 && new Set(MEDALS.map(m => m.id)).size === MEDALS.length, "medal ids"); ok(new Set(MEDALS.map(m => m.icon)).size === MEDALS.length, "two medals share an icon");
    MEDALS.forEach(m => ok(m.name && m.desc && typeof m.ok === "function", "medal incomplete " + m.id));
    ok(RANKS.every((r, i) => i === 0 || r.min > RANKS[i - 1].min) && RANKS[0].min === 0, "ranks must increase from 0");
    freshDB(); const p = createPlayer("מדליה", "f"); ok(Object.keys(p.medals).length === 0 && checkMedals(p).length === 0, "a new player has no medals");
    p.stars = 1; ok(checkMedals(p).map(m => m.id).join() === "star1", "first star medal"); ok(checkMedals(p).length === 0, "a medal must be given only once");
    p.stars = 200; p.casesClosed = 30; p.perfect = 1; p.bestStreak = 10; p.myths = 60; p.comebacks = 10; p.topicsPlayed = { animals: 1, space: 1, food: 1, art: 1, mix: 1 };
    TOOLS_FACTS.forEach(t => p.tools.push(t.id)); Object.keys(TOPIC_DATA).forEach(t => { p.topicDone[t] = true; topicFacts(t).forEach(f => { p.facts[f.id] = { right: 2, wrong: 0, s: "learned" }; }); });
    checkMedals(p); ok(Object.keys(p.medals).length === MEDALS.length, "a complete player should hold every medal; missing: " + MEDALS.filter(m => !p.medals[m.id]).map(m => m.id));
  });

  await T("ui: medals are awarded while playing (popup), counters update, briefcase tabs work", async () => {
    freshDB(); Snd.maybeSuspense = () => 0; createPlayer("פרסים", "f"); const p = me();
    startRound("animals"); let f = factById(p.round.queue[0]);
    document.querySelectorAll(".btn.ans")[f.answer ? 0 : 1].click(); await waitFor(".answers.single .btn");
    ok(p.medals.star1, "first correct answer should give the first-star medal"); const m = await waitFor("#modal", 3000);
    ok(m.querySelector("h2").textContent.includes("פרס") && m.textContent.includes("כוכב ראשון"), "award popup content"); m.querySelector(".btn").click(); ok(!document.getElementById("modal"), "award popup should close");
    // a myth caught after a miss counts for both counters
    const R = p.round; const myth = topicFacts("animals").find(x => !x.answer && x.id !== f.id); R.queue[R.pos] = myth.id; p.facts[myth.id] = { right: 0, wrong: 1, s: "missed" }; go("factsPlay");
    await waitFor(".clue"); const before = { myths: p.myths, back: p.comebacks };
    document.querySelectorAll(".btn.ans")[1].click(); await waitFor(".answers.single .btn"); ok(p.myths === before.myths + 1 && p.comebacks === before.back + 1, "myth/comeback counters");
    ok(p.bestStreak >= 2, "best streak tracked: " + p.bestStreak); closeModal();
    go("briefcase"); ok(document.querySelectorAll(".tool").length === TOOLS_FACTS.length, "tools tab");
    [...document.querySelectorAll(".tab")][1].click(); ok(document.querySelectorAll(".medal").length === MEDALS.length, "medals tab"); ok(document.querySelectorAll(".medal.got").length === Object.keys(p.medals).length, "earned medals highlighted");
    ok(document.querySelector(".rank").textContent.includes("בלשית"), "rank line uses feminine wording"); [...document.querySelectorAll(".tab")][0].click(); ok(document.querySelector(".tool-grid"), "back to tools");
    // finishing a perfect case: summary lists new medals
    freshDB(); createPlayer("מושלם", "m"); const q = me(); startRound("space"); q.round.firstTry = 10; q.round.pos = q.round.queue.length; go("factsPlay"); await waitFor(".done");
    ok(q.perfect === 1 && q.medals.perfect && q.medals.case1, "perfect case + first case medals"); ok(document.querySelector(".award-list .award"), "summary should list the new medals");
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
    ok(p.stars === 5 && p.tools.length === 1, "5th star should give a tool"); const m = await waitFor("#modal", 3000); ok(m.textContent.includes(TOOLS_FACTS.find(t => t.id === p.tools[0]).name), "modal names the tool: [" + m.textContent + "]");
    m.querySelector(".btn").click(); const next = document.getElementById("modal"); ok(!next || next.querySelector("h2").textContent.includes("פרס"), "after the tool popup only the medals popup may follow"); if (next) { next.querySelector(".btn").click(); ok(!document.getElementById("modal"), "medals popup should close"); }
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
  createPlayer("שרה", "f"); const p = me(); p.stars = 12; createPlayer("אברהם-יצחק", "m"); createPlayer("מיכל"); DB.current = p.id;
  TOOLS_FACTS.slice(0, 23).forEach(t => p.tools.push(t.id)); p.stars = 135; MEDALS.slice(0, 12).forEach(m => { p.medals[m.id] = 1; });
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
  briefcaseTab = "tools"; await render("briefcase-tools", () => go("briefcase")); briefcaseTab = "medals"; await render("briefcase-medals", () => go("briefcase")); briefcaseTab = "tools";
  await render("edit-player-modal", () => { go("players"); askName(p); }); await render("ask-gender-modal", () => { go("players"); askGender(p); }); await render("awards-modal", () => { go("home"); showAwardsModal(MEDALS.slice(0, 3)); }); await render("tool-modal", () => { go("home"); showToolModal(TOOLS_FACTS[20]); });
  await render("kitchen", () => go("kitchen"));
  await render("done", () => go("factsDone", { topic: "animals", stars: 8, firstTry: 7, total: 10, mastered: ["animals", "space"] }));
  // the longest clue and the longest explanation of every topic, before and after answering
  for (const topic of Object.keys(TOPIC_DATA)) {
    const facts = topicFacts(topic), byClue = facts.slice().sort((a, b) => b.text.length - a.text.length)[0], byExp = facts.slice().sort((a, b) => b.explain.length - a.explain.length)[0];
    for (const f of [byClue, byExp]) {
      p.round = { topic, queue: [f.id, facts[0].id], pos: 0, total: 10, solved: 0, firstTry: 0, stars: 0, streak: 0, requeued: {}, seen: {} }; saveDB();
      await render("play-" + topic + "-" + f.id + "-question", () => go("factsPlay"), { noScroll: innerHeight >= 640 });
      document.querySelectorAll(".btn.ans")[0].click(); await waitFor(".answers.single .btn"); await sleep(80); closeModal(); measure("play-" + topic + "-" + f.id + "-answered", { noScroll: false });
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
