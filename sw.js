// Service worker: cache-first so the game works offline.
// BUMP `VERSION` on every release, otherwise phones keep the old cached files.
const VERSION = "1.1.0";
const CACHE = "frooky-" + VERSION;
const FILES = [
  "./", "index.html", "style.css", "app.js", "frooky.js", "audio.js", "rewards.js", "game-facts.js", "game-kitchen.js",
  "manifest.json", "icons/icon-192.png", "icons/icon-512.png", "icons/icon-maskable-512.png",
  "data/backgrounds.js", "data/pics-animals.js", "data/pics-space.js", "data/pics-food.js", "data/pics-art.js",
  "data/data-facts-animals.js", "data/data-facts-space.js", "data/data-facts-food.js", "data/data-facts-art.js"
];

// No skipWaiting here: a new version waits until the player taps "update ready" (see app.js).
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(f => new Request(f, { cache: "reload" })))));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith("frooky-") && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("message", e => { if (e.data === "SKIP_WAITING") self.skipWaiting(); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(hit => hit || fetch(e.request).catch(() => caches.match("index.html"))));
});
