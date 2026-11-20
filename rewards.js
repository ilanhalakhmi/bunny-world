// Rewards: stars + Frooky's briefcase of collectable exploration tools.
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
  { id: "mystery",    topic: "general", icon: "❓", name: "כלי מסתורי" }
];

// Collections per game (a new game adds its own array here).
const TOOL_COLLECTIONS = { facts: TOOLS_FACTS, kitchen: [] };

// Which tool to give next: first an unowned tool of this subject, else a general one, else any.
function pickNextTool(game, topic, owned) {
  const all = TOOL_COLLECTIONS[game] || [];
  const free = all.filter(t => !owned.includes(t.id));
  return free.find(t => t.topic === topic) || free.find(t => t.topic === "general") || free[0] || null;
}
