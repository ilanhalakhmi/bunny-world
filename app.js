// App core: storage, players (several per phone), router, home screen, briefcase, update button.
// Games live in game-facts.js and game-kitchen.js and register themselves in SCREENS / GAMES.

const VERSION = "1.1.3";
const STORE_KEY = "frooky.v1";
const SCREENS = {};          // name -> function(root, args)
const GAMES = [];            // registered mini-games (shown on the home screen)

/* ---------- tiny DOM helper: h('div', {class:'x', onclick:fn}, child, 'text') ---------- */
function h(tag, props, ...kids) {
  const e = document.createElement(tag);
  for (const k in (props || {})) {
    const v = props[k];
    if (v == null || v === false) continue;
    if (k === "class") e.className = v;
    else if (k === "html") e.innerHTML = v;
    else if (k.startsWith("on")) e.addEventListener(k.slice(2), v);
    else e.setAttribute(k, v);
  }
  kids.flat().forEach(c => { if (c != null && c !== false) e.append(c.nodeType ? c : document.createTextNode(c)); });
  return e;
}
const rndItem = a => a[Math.floor(Math.random() * a.length)];
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

/* ---------- storage (localStorage, always in try/catch) ---------- */
let DB = { players: {}, current: null, settings: { sfx: true, music: true } };
function loadDB() {
  try { const r = localStorage.getItem(STORE_KEY); if (r) { const d = JSON.parse(r); DB = Object.assign(DB, d); DB.settings = Object.assign({ sfx: true, music: true }, d.settings); } } catch (e) {}
}
function saveDB() { try { localStorage.setItem(STORE_KEY, JSON.stringify(DB)); } catch (e) {} }
const me = () => DB.players[DB.current];
const PLAYER_COLORS = ["#F37021", "#005CA9", "#008D36", "#F6879B", "#7FD1D6", "#FFD100"];

function newPlayerData(name) {
  const id = "p" + Date.now().toString(36) + Math.floor(Math.random() * 1000).toString(36);
  const used = Object.values(DB.players).map(p => p.color);
  const color = PLAYER_COLORS.find(c => !used.includes(c)) || rndItem(PLAYER_COLORS);
  return { id, name, color, stars: 0, tools: [], facts: {}, round: null, casesClosed: 0, correct: 0, wrong: 0, topicDone: {}, lastPlayed: Date.now() };
}
function createPlayer(name) { const p = newPlayerData(name); DB.players[p.id] = p; DB.current = p.id; saveDB(); return p; }
function deletePlayer(id) { delete DB.players[id]; if (DB.current === id) DB.current = null; saveDB(); }
function sortedPlayers() { return Object.values(DB.players).sort((a, b) => b.lastPlayed - a.lastPlayed); }

/* ---------- stars & tools ---------- */
// Adds one star; returns a newly unlocked tool (or null). `topic` decides which tool follows.
function addStar(topic) {
  const p = me(); p.stars++;
  let tool = null;
  if (p.stars % STARS_PER_TOOL === 0) { tool = pickNextTool("facts", topic, p.tools); if (tool) p.tools.push(tool.id); }
  saveDB();
  return tool;
}

/* ---------- router, modal, toast ---------- */
let currentScreen = "";
function go(name, args) {
  closeModal();
  currentScreen = name;
  const root = document.getElementById("app");
  root.innerHTML = "";
  SCREENS[name](root, args || {});
  window.scrollTo(0, 0);
  if (pendingUpdateReg) setTimeout(showPendingUpdate, 400);
}
function modal(content) {
  closeModal();
  const m = h("div", { class: "modal-back", id: "modal" }, h("div", { class: "modal" }, content));
  document.body.append(m);
  return m;
}
function closeModal() { const m = document.getElementById("modal"); if (m) m.remove(); }
function toast(text) {
  const t = h("div", { class: "toast" }, text);
  document.body.append(t);
  setTimeout(() => t.remove(), 2600);
}
function topBar(title, backTo, right) {
  return h("div", { class: "topbar" },
    h("button", { class: "icon-btn", "aria-label": "חזרה", onclick: () => { Snd.sfx("back"); go(backTo || "home"); } }, "→"),
    h("div", { class: "topbar-title" }, title),
    right || h("div", { class: "starcount" }, "⭐ " + (me() ? me().stars : 0)));
}
function soundToggles() {
  const s = DB.settings;
  const mk = (key, on, off, label) => {
    const b = h("button", { class: "icon-btn small", "aria-label": label }, s[key] ? on : off);
    b.onclick = () => {
      s[key] = !s[key]; b.textContent = s[key] ? on : off; saveDB();
      if (key === "sfx") Snd.setSfx(s.sfx); else Snd.setMusic(s.music);
      Snd.unlock(); Snd.sfx("tap");
    };
    return b;
  };
  return h("div", { class: "toggles" }, mk("music", "🎵", "🔇", "מוזיקה"), mk("sfx", "🔊", "🔈", "צלילים"));
}

/* ---------- players screen ---------- */
SCREENS.players = (root) => {
  Snd.music("home");
  const list = h("div", { class: "player-list" });
  const players = sortedPlayers();
  players.forEach((p, i) => {
    const row = h("div", { class: "player-card" },
      h("button", { class: "player-main", onclick: () => { Snd.sfx("select"); DB.current = p.id; p.lastPlayed = Date.now(); saveDB(); go("home"); } },
        h("span", { class: "avatar", style: "background:" + p.color }, [...p.name][0] || "?"),
        h("span", { class: "pinfo" },
          h("span", { class: "pname" }, p.name),
          h("span", { class: "pstats" }, "⭐ " + p.stars + "   🗂️ " + p.casesClosed + " תיקים סגורים" + (i === 0 && players.length > 1 ? "   🕘 אחרון" : "")))),
      h("button", { class: "icon-btn small danger", "aria-label": "מחיקת שחקן", onclick: () => confirmDelete(p) }, "🗑️"));
    list.append(row);
  });
  if (!players.length) list.append(h("p", { class: "hint" }, "עוד אין שחקנים. בואו נתחיל!"));
  root.append(h("div", { class: "screen players" },
    h("div", { class: "hero-small", html: frookyHead("curious") }),
    h("h1", {}, "מי משחק?"),
    list,
    h("button", { class: "btn blue", onclick: () => { Snd.sfx("select"); askName(); } }, "＋ שחקן חדש"),
    updateFooter()));
  if (!players.length) askName();
};

function askName() {
  const input = h("input", { class: "name-input", type: "text", maxlength: "12", placeholder: "איך קוראים לך?", autocomplete: "off" });
  const msg = h("div", { class: "form-msg" });
  const submit = () => {
    const name = input.value.trim().replace(/\s+/g, " ");
    if (!name) { msg.textContent = "כתבו שם קודם 🙂"; Snd.sfx("wrong"); return; }
    if (Object.values(DB.players).some(p => p.name.toLowerCase() === name.toLowerCase())) { msg.textContent = "כבר יש שחקן בשם הזה. נסו שם אחר."; Snd.sfx("wrong"); return; }
    createPlayer(name); Snd.sfx("star"); go("home");
  };
  input.addEventListener("keydown", e => { if (e.key === "Enter") submit(); });
  modal([
    h("h2", {}, "שחקן חדש"),
    input, msg,
    h("div", { class: "btn-row" },
      h("button", { class: "btn green", onclick: submit }, "יאללה!"),
      Object.keys(DB.players).length ? h("button", { class: "btn white", onclick: () => { Snd.sfx("back"); closeModal(); } }, "ביטול") : null)
  ]);
  setTimeout(() => input.focus(), 50);
}

function confirmDelete(p) {
  Snd.sfx("tap");
  modal([
    h("h2", {}, "למחוק את " + p.name + "?"),
    h("p", {}, "כל הכוכבים, הכלים וההתקדמות של " + p.name + " יימחקו, ואי אפשר להחזיר אותם."),
    h("div", { class: "btn-row" },
      h("button", { class: "btn orange", onclick: () => { deletePlayer(p.id); Snd.sfx("back"); go("players"); } }, "כן, למחוק"),
      h("button", { class: "btn white", onclick: () => { Snd.sfx("back"); closeModal(); } }, "ביטול"))
  ]);
}

/* ---------- home screen ---------- */
SCREENS.home = (root) => {
  const p = me();
  if (!p) return go("players");
  Snd.music("home");
  const hello = h("div", { class: "bubble" }, rndItem(["שלום " + p.name + "!", "היי " + p.name + "! מה נשחק?", "שמחתי לראות אותך, " + p.name + "!"]));
  const hero = h("div", { class: "hero", html: frookyFull("curious") });
  hero.addEventListener("click", () => { Snd.sfx("tap"); hero.innerHTML = frookyFull(rndItem(["happy", "surprised", "celebrating", "curious"])); hero.classList.remove("hop"); void hero.offsetWidth; hero.classList.add("hop"); setTimeout(() => { hero.innerHTML = frookyFull("curious"); }, 1400); });
  const gameBtns = GAMES.map(g => h("button", { class: "btn game " + g.color, onclick: () => { Snd.sfx("select"); g.open(); } },
    h("span", { class: "gicon" }, g.icon), h("span", { class: "gtext" }, h("span", { class: "gtitle" }, g.title), h("span", { class: "gsub" }, g.subtitle(p)))));
  const learned = Object.values(p.facts).filter(f => f.right >= 1).length;
  root.append(h("div", { class: "screen home" },
    h("div", { class: "home-top" },
      h("button", { class: "chip", onclick: () => { Snd.sfx("back"); go("players"); } }, h("span", { class: "avatar tiny", style: "background:" + p.color }, [...p.name][0]), p.name, " ⇄"),
      h("div", { class: "starcount" }, "⭐ " + p.stars),
      soundToggles()),
    hero, hello,
    h("div", { class: "games" }, gameBtns),
    h("div", { class: "btn-row two" },
      h("button", { class: "btn white", onclick: () => { Snd.sfx("select"); go("notebook"); } }, "📓 המחברת", h("small", {}, learned + " עובדות")),
      h("button", { class: "btn white", onclick: () => { Snd.sfx("select"); go("briefcase"); } }, "💼 התיק", h("small", {}, p.tools.length + "/" + TOOL_COLLECTIONS.facts.length + " כלים"))),
    h("div", { class: "ver" }, "גרסה " + VERSION)));
};

/* ---------- briefcase: collection of tools ---------- */
SCREENS.briefcase = (root) => {
  const p = me(); const all = TOOL_COLLECTIONS.facts;
  const grid = h("div", { class: "tool-grid" }, all.map(t => {
    const owned = p.tools.includes(t.id);
    return h("button", { class: "tool" + (owned ? " owned" : ""), onclick: () => { Snd.sfx(owned ? "star" : "back"); toast(owned ? t.name : "עוד לא פתחתם את הכלי הזה. אוספים כוכבים!"); } },
      h("span", { class: "ticon" }, owned ? t.icon : "❔"), h("span", { class: "tname" }, owned ? t.name : "???"));
  }));
  const toNext = STARS_PER_TOOL - (p.stars % STARS_PER_TOOL);
  root.append(h("div", { class: "screen" },
    topBar("התיק של פרוקי"),
    h("div", { class: "hero-small", html: frookyHead("happy") }),
    h("p", { class: "hint" }, p.tools.length >= all.length ? "אספתם את כל הכלים! 🎉" : "עוד " + toNext + " כוכבים לכלי הבא"),
    grid));
};

/* ---------- update check (button at the bottom of the home screen) ---------- */
// small "check for update" button + version, bottom-left corner (players screen)
function updateFooter() {
  return h("div", { class: "ver ver-row" },
    h("button", { class: "ver-btn", onclick: checkUpdate }, "🔄 עדכון"),
    h("small", {}, "גרסה " + VERSION));
}
// Silent update check on every launch: only speaks up when a new version is ready. Failures are ignored (nice-to-have).
let pendingUpdateReg = null;
function showPendingUpdate() {
  if (!pendingUpdateReg || (currentScreen !== "home" && currentScreen !== "players") || document.getElementById("modal")) return;
  const reg = pendingUpdateReg; pendingUpdateReg = null;   // ask once per launch
  offerUpdate(reg);
}
function silentUpdateCheck(reg) {
  const found = () => { if (reg.waiting && navigator.serviceWorker.controller) { pendingUpdateReg = reg; showPendingUpdate(); } };
  reg.update().then(() => {
    if (reg.waiting) return found();
    const w = reg.installing;
    if (!w) return;
    w.addEventListener("statechange", () => { if (w.state === "installed") found(); });
  }).catch(() => {});
}
function updateModal(title, text, buttons) {
  Snd.sfx("select");
  modal([h("h2", {}, title), h("p", { style: "text-align:center;margin:8px 0 12px" }, text), ...buttons]);
}
const closeBtn = (label) => h("button", { class: "btn white", onclick: () => { Snd.sfx("back"); closeModal(); } }, label || "סגירה");
function offerUpdate(reg) {
  updateModal("יש גרסה חדשה! ✨", "רוצים לעדכן עכשיו? המשחק ייטען מחדש. הכוכבים והשחקנים נשמרים.", [
    h("button", { class: "btn green", onclick: () => { closeModal(); if (reg.waiting) reg.waiting.postMessage("SKIP_WAITING"); else location.reload(); } }, "עדכנו עכשיו"),
    closeBtn("אחר כך")]);
}
function checkUpdate() {
  if (!("serviceWorker" in navigator)) return updateModal("לא נתמך", "הדפדפן הזה לא תומך בעדכונים אוטומטיים.", [closeBtn()]);
  updateModal("בודקים…", "בודקים אם יש גרסה חדשה 🔍", [closeBtn("ביטול")]);
  navigator.serviceWorker.getRegistration().then(reg => {
    if (!reg) return updateModal("עוד לא נשמר", "המשחק עדיין לא נשמר במכשיר לעבודה בלי אינטרנט. נסו שוב בעוד רגע.", [closeBtn()]);
    return reg.update().then(() => {
      const w = reg.installing;
      if (reg.waiting) return offerUpdate(reg);
      if (!w) return updateModal("הכול מעודכן ✓", "אין גרסה חדשה. יש לכם את הגרסה האחרונה (" + VERSION + ").", [closeBtn()]);
      const done = () => { if (reg.waiting) offerUpdate(reg); else updateModal("הכול מעודכן ✓", "אין גרסה חדשה (" + VERSION + ").", [closeBtn()]); };
      if (w.state === "installed" || w.state === "activated") return done();
      w.addEventListener("statechange", () => { if (w.state === "installed" || w.state === "activated") done(); else if (w.state === "redundant") updateModal("לא הצלחנו", "ההורדה נכשלה. נסו שוב.", [closeBtn()]); });
    });
  }).catch(() => updateModal("אין חיבור", "אי אפשר לבדוק עכשיו. אפשר להמשיך לשחק עם הגרסה השמורה.", [closeBtn()]));
}

/* ---------- start ---------- */
// Tablets: scale the whole UI up (CSS zoom) so it matches the phone's proportions.
function applyScale() {
  const w = window.innerWidth, hgt = window.innerHeight;
  const z = Math.max(1, Math.min(w / 400, hgt / 760, 2.4));
  document.body.style.zoom = z > 1.02 ? z : "";
  document.documentElement.style.setProperty("--vh", (hgt / (z > 1.02 ? z : 1)) + "px");
}
window.addEventListener("resize", applyScale);

const App = {
  start() {
    loadDB(); applyScale();
    Snd.sfxOn = DB.settings.sfx; Snd.musicOn = DB.settings.music;
    // sound can only start after the first tap
    document.addEventListener("pointerdown", () => Snd.unlock(), { once: false, passive: true });
    document.addEventListener("contextmenu", e => e.preventDefault());
    const players = sortedPlayers();
    if (!players.length) go("players");
    else if (players.length === 1) { DB.current = players[0].id; go("home"); }
    else go("players");
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("sw.js").then(silentUpdateCheck).catch(() => {});
      const hadController = !!navigator.serviceWorker.controller;
      let reloading = false;
      navigator.serviceWorker.addEventListener("controllerchange", () => { if (!hadController || reloading) return; reloading = true; location.reload(); });
    }
  }
};
