// Rewards: stars, Frooky's briefcase of collectable exploration tools, medals ("פרסים") and detective ranks.
// Collectables only (no power-ups). Each game has its OWN collection.
// To add a tool, add a line to the right array. `icon` is a placeholder emoji for now (real drawings later).
// `topic` = the subject the tool belongs to; tools unlock following the subject of the clues being answered.

const STARS_PER_TOOL = 5;

const TOOLS_FACTS = [
  { id: "magnifier",  topic: "general", icon: "🔍", name: "זכוכית מגדלת" },
  { id: "camera",     topic: "animals", icon: "📷", name: "מצלמת ספארי" },
  { id: "telescope",  topic: "space",   icon: "🔭", name: "טלסקופ" },
  { id: "microscope", topic: "food",    icon: "🔬", name: "מיקרוסקופ" },
  { id: "brush",      topic: "art",     icon: "🖌️", name: "מכחול" },
  { id: "notebook",   topic: "general", icon: "📓", name: "מחברת חקירות" },
  { id: "flashlight", topic: "animals", icon: "🔦", name: "פנס לילה" },
  { id: "compass",    topic: "space",   icon: "🧭", name: "מצפן" },
  { id: "scale",      topic: "food",    icon: "⚖️", name: "מאזניים" },
  { id: "palette",    topic: "art",     icon: "🎨", name: "לוח צבעים" },
  { id: "map",        topic: "animals", icon: "🗺️", name: "מפת טיולים" },
  { id: "satellite",  topic: "space",   icon: "🛰️", name: "לוויין" },
  { id: "testtube",   topic: "food",    icon: "🧪", name: "מבחנה" },
  { id: "pencil",     topic: "art",     icon: "✏️", name: "עיפרון" },
  { id: "magnet",     topic: "general", icon: "🧲", name: "מגנט" },
  { id: "mystery",    topic: "general", icon: "❓", name: "כלי מסתורי" },
  // animals
  { id: "paw",        topic: "animals", icon: "🐾", name: "עקבות" },
  { id: "boot",       topic: "animals", icon: "🥾", name: "נעלי שטח" },
  { id: "tent",       topic: "animals", icon: "⛺", name: "אוהל" },
  { id: "leaf",       topic: "animals", icon: "🍃", name: "עלה" },
  { id: "shell",      topic: "animals", icon: "🐚", name: "צדף" },
  { id: "goggles",    topic: "animals", icon: "🥽", name: "משקפי צלילה" },
  { id: "canoe",      topic: "animals", icon: "🛶", name: "קאנו" },
  { id: "bone",       topic: "animals", icon: "🦴", name: "עצם" },
  // space
  { id: "rocket",     topic: "space",   icon: "🚀", name: "רקטה" },
  { id: "ufo",        topic: "space",   icon: "🛸", name: "צלחת מעופפת" },
  { id: "comet",      topic: "space",   icon: "☄️", name: "שביט" },
  { id: "starmap",    topic: "space",   icon: "🌌", name: "מפת כוכבים" },
  { id: "moon",       topic: "space",   icon: "🌙", name: "ירח" },
  { id: "antenna",    topic: "space",   icon: "📡", name: "צלחת קליטה" },
  { id: "stopwatch",  topic: "space",   icon: "⏱️", name: "שעון עצר" },
  { id: "globe",      topic: "space",   icon: "🌍", name: "כדור הארץ" },
  // food
  { id: "fork",       topic: "food",    icon: "🍴", name: "מזלג וסכין" },
  { id: "spoon",      topic: "food",    icon: "🥄", name: "כף" },
  { id: "salt",       topic: "food",    icon: "🧂", name: "מלחייה" },
  { id: "bowl",       topic: "food",    icon: "🥣", name: "קערה" },
  { id: "plate",      topic: "food",    icon: "🍽️", name: "צלחת" },
  { id: "chopsticks", topic: "food",    icon: "🥢", name: "מקלות אכילה" },
  { id: "timer",      topic: "food",    icon: "⏲️", name: "טיימר מטבח" },
  { id: "takeout",    topic: "food",    icon: "🥡", name: "קופסת אוכל" },
  // art
  { id: "scissors",   topic: "art",     icon: "✂️", name: "מספריים" },
  { id: "crayon",     topic: "art",     icon: "🖍️", name: "צבעי פסטל" },
  { id: "frame",      topic: "art",     icon: "🖼️", name: "מסגרת לציור" },
  { id: "ruler",      topic: "art",     icon: "📏", name: "סרגל" },
  { id: "triangle",   topic: "art",     icon: "📐", name: "משולש שרטוט" },
  { id: "pen",        topic: "art",     icon: "🖊️", name: "עט" },
  { id: "thread",     topic: "art",     icon: "🧵", name: "חוט" },
  { id: "masks",      topic: "art",     icon: "🎭", name: "מסכות תיאטרון" },
  // general
  { id: "hat",        topic: "general", icon: "🕵️", name: "כובע בלש" },
  { id: "suitcase",   topic: "general", icon: "🧳", name: "מזוודה" },
  { id: "key",        topic: "general", icon: "🔑", name: "מפתח" },
  { id: "puzzle",     topic: "general", icon: "🧩", name: "פאזל" },
  { id: "bookmark",   topic: "general", icon: "🔖", name: "סימנייה" },
  { id: "pin",        topic: "general", icon: "📌", name: "נעץ" },
  { id: "safetypin",  topic: "general", icon: "🧷", name: "סיכת ביטחון" },
  { id: "clock",      topic: "general", icon: "⏰", name: "שעון מעורר" }
];

// Collections per game (a new game adds its own array here).
const TOOL_COLLECTIONS = { facts: TOOLS_FACTS, kitchen: [] };

// Which tool to give next: first an unowned tool of this subject, else a general one, else any.
function pickNextTool(game, topic, owned) {
  const all = TOOL_COLLECTIONS[game] || [];
  const free = all.filter(t => !owned.includes(t.id));
  return free.find(t => t.topic === topic) || free.find(t => t.topic === "general") || free[0] || null;
}

/* ---------- gendered wording ---------- */
// p.gender is "m" (boy), "f" (girl) or undefined (not chosen yet -> neutral/plural wording).
const G = (p, m, f, n) => (p && p.gender === "m") ? m : (p && p.gender === "f") ? f : (n === undefined ? m : n);

/* ---------- ranks (by stars) ---------- */
const RANKS = [
  { min: 0,   m: "בלש מתחיל",    f: "בלשית מתחילה",  n: "בלש/ית מתחיל/ה" },
  { min: 20,  m: "חוקר",          f: "חוקרת",          n: "חוקר/ת" },
  { min: 50,  m: "בלש מנוסה",    f: "בלשית מנוסה",   n: "בלש/ית מנוסה" },
  { min: 100, m: "בלש בכיר",     f: "בלשית בכירה",   n: "בלש/ית בכיר/ה" },
  { min: 180, m: "בלש-על",       f: "בלשית-על",       n: "בלש-על" },
  { min: 300, m: "אגדה של בלשים", f: "אגדה של בלשים", n: "אגדה של בלשים" }
];
function rankOf(p) { let r = RANKS[0]; RANKS.forEach(x => { if (p.stars >= x.min) r = x; }); return G(p, r.m, r.f, r.n); }
function nextRank(p) { return RANKS.find(x => x.min > p.stars) || null; }

/* ---------- medals ("פרסים"): earned automatically from the player's progress ---------- */
const MEDAL_TOPICS = ["animals", "space", "food", "art"];
const notebookCount = p => Object.values(p.facts).filter(f => f.right >= 1).length;
const MEDALS = [
  { id: "star1",    icon: "⭐", name: "כוכב ראשון",      desc: "לצבור כוכב אחד",                    ok: p => p.stars >= 1 },
  { id: "stars25",  icon: "🌟", name: "25 כוכבים",       desc: "לצבור 25 כוכבים",                    ok: p => p.stars >= 25 },
  { id: "stars50",  icon: "💫", name: "50 כוכבים",       desc: "לצבור 50 כוכבים",                    ok: p => p.stars >= 50 },
  { id: "stars100", icon: "🌠", name: "100 כוכבים",      desc: "לצבור 100 כוכבים",                   ok: p => p.stars >= 100 },
  { id: "stars200", icon: "🏆", name: "200 כוכבים",      desc: "לצבור 200 כוכבים",                   ok: p => p.stars >= 200 },
  { id: "case1",    icon: "📁", name: "התיק הראשון",     desc: "לסגור תיק ראשון",                    ok: p => p.casesClosed >= 1 },
  { id: "case5",    icon: "🗂️", name: "5 תיקים סגורים",  desc: "לסגור 5 תיקים",                      ok: p => p.casesClosed >= 5 },
  { id: "case15",   icon: "🗃️", name: "15 תיקים סגורים", desc: "לסגור 15 תיקים",                     ok: p => p.casesClosed >= 15 },
  { id: "case30",   icon: "🏛️", name: "30 תיקים סגורים", desc: "לסגור 30 תיקים",                     ok: p => p.casesClosed >= 30 },
  { id: "perfect",  icon: "💯", name: "תיק מושלם",       desc: "לענות נכון על כל 10 החידות בניסיון הראשון", ok: p => p.perfect >= 1 },
  { id: "streak5",  icon: "🔥", name: "חמש ברצף",        desc: "5 תשובות נכונות ברצף",               ok: p => p.bestStreak >= 5 },
  { id: "streak10", icon: "🌋", name: "עשר ברצף",        desc: "10 תשובות נכונות ברצף",              ok: p => p.bestStreak >= 10 },
  { id: "myth10",   icon: "🍅", name: "10 שטויות נתפסו", desc: "לגלות 10 שטויות במיץ עגבניות",       ok: p => p.myths >= 10 },
  { id: "myth30",   icon: "🥫", name: "30 שטויות נתפסו", desc: "לגלות 30 שטויות במיץ עגבניות",       ok: p => p.myths >= 30 },
  { id: "myth60",   icon: "🏺", name: "60 שטויות נתפסו", desc: "לגלות 60 שטויות במיץ עגבניות",       ok: p => p.myths >= 60 },
  { id: "comeback", icon: "🔧", name: "אחרי הטעות",      desc: "לתקן 10 טעויות: לענות נכון על חידה שטעינו בה", ok: p => p.comebacks >= 10 },
  { id: "nb25",     icon: "📓", name: "מחברת מתמלאת",    desc: "25 עובדות במחברת",                   ok: p => notebookCount(p) >= 25 },
  { id: "nb100",    icon: "📚", name: "ספרייה קטנה",     desc: "100 עובדות במחברת",                  ok: p => notebookCount(p) >= 100 },
  { id: "tools10",  icon: "🧰", name: "10 כלים",         desc: "לאסוף 10 כלים בתיק",                 ok: p => p.tools.length >= 10 },
  { id: "tools30",  icon: "🎒", name: "30 כלים",         desc: "לאסוף 30 כלים בתיק",                 ok: p => p.tools.length >= 30 },
  { id: "toolsAll", icon: "💼", name: "כל הכלים",        desc: "לאסוף את כל הכלים בתיק",             ok: p => p.tools.length >= TOOLS_FACTS.length },
  { id: "animals15", icon: "🦒", name: "חיות: 15 נלמדו", desc: "ללמוד 15 חידות בנושא חיות",          ok: p => learnedCount(p, "animals") >= 15 },
  { id: "space15",  icon: "🚀", name: "חלל: 15 נלמדו",   desc: "ללמוד 15 חידות בנושא חלל",           ok: p => learnedCount(p, "space") >= 15 },
  { id: "food15",   icon: "🍕", name: "אוכל: 15 נלמדו",  desc: "ללמוד 15 חידות בנושא אוכל",          ok: p => learnedCount(p, "food") >= 15 },
  { id: "art15",    icon: "🎨", name: "אמנות: 15 נלמדו", desc: "ללמוד 15 חידות בנושא ציור ואמנות",   ok: p => learnedCount(p, "art") >= 15 },
  { id: "allTopics", icon: "🗺️", name: "מסע בכל הנושאים", desc: "לשחק תיק בכל ארבעת הנושאים",        ok: p => MEDAL_TOPICS.every(t => p.topicsPlayed[t]) },
  { id: "surprise", icon: "🎲", name: "הפתעה!",          desc: "לשחק תיק הפתעה מכל הנושאים",         ok: p => !!p.topicsPlayed.mix },
  { id: "topicDone", icon: "🏅", name: "סיום נושא",      desc: "ללמוד את כל החידות בנושא אחד",       ok: p => MEDAL_TOPICS.some(t => p.topicDone[t]) },
  { id: "allDone",  icon: "👑", name: "סיום כל הנושאים", desc: "ללמוד את כל החידות בכל הנושאים",     ok: p => MEDAL_TOPICS.every(t => p.topicDone[t]) }
];
// Gives the player every medal whose goal is reached and returns the NEW ones.
function checkMedals(p) {
  const got = [];
  MEDALS.forEach(m => { if (!p.medals[m.id] && m.ok(p)) { p.medals[m.id] = Date.now(); got.push(m); } });
  return got;
}
