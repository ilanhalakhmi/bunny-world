# CLAUDE.md — Bunny World (working title; Hebrew title TBD)

> Status: v1.1 playable build (players, Fact Detective with ~50 clues per topic, notebook, briefcase, Kitchen = placeholder). Target ~100 clues per topic, added in fact-checked batches of ~25 (each batch: web fact-check + independent Hebrew review + new drawings as labeled sheets in design/pics). Kitchen game still to be designed.
> Players: several per phone, stored only in the phone's localStorage (key `frooky.v1`); names are never in code or URLs. Facts with `verified: false` are hidden from the game.

## 1. Project Overview
- **Audience:** A 9-year-old girl, on an Android phone (portrait). Interests: animals, food, space/universe, drawing.
- **Language:** Hebrew, `<html lang="he" dir="rtl">`. Playful, warm, age-appropriate tone.
- **Character:** **Frooky (פרוקי)**, an ORIGINAL boy bunny (Miffy-inspired style only). Never use the name "Miffy" or copy Miffy/Dick Bruna designs.
  Look (approved): two straight ears with yellow insides, dot eyes, orange cheeks, small orange HEART nose, small "w" smile, blue overalls (pocket, yellow buttons, rolled cuffs), orange briefcase with magnifying-glass + pencil stickers. Personality: loyal friend, very curious.
  Approved art lives in `design/` (`frooky.svg`, `frooky-expressions.svg` + PNG previews). Reuse these SVG shapes; do not redesign without asking.
- **Expressions (12, in `design/frooky-expressions.svg`):** Fact Detective: curious (default), thinking, happy (correct), celebrating, sad (wrong), surprised. Kitchen: yummy, yucky (green tint), sour (lemon), salty (shaker), spicy (red tint, flame), sweet (heart eyes, lollipop). Swap face parts only; head/ears stay the same.
- **Privacy:** Public site. Never put the child's name or personal info in code, URLs, or content.

## 2. Architecture & Tech Stack (STRICT)
- Lightweight, offline-capable **PWA**. Only Vanilla HTML5, CSS3, ES6+ JS. No frameworks, bundlers, or npm deps. No build step.
- Plain files loaded via `<script>` tags (no modules/bundler), split by purpose, e.g.:
  `index.html`, `style.css`, `app.js` (hub/router/state), `audio.js`, `rewards.js`, `data/data-facts-<topic>.js` (one per topic), `data-recipes.js`, `game-facts.js`, `game-kitchen.js`, `manifest.json`, `sw.js`, `icons/`.
- **Visuals:** Bruna-style minimalism — crisp inline SVG, thick black outlines, white background. Palette: Orange `#F37021`, Blue `#005CA9`, Yellow `#FFD100`, Green `#008D36`.
- **Audio:** Web Audio API synthesized only (no sound files, no licensing, works offline). Unlock AudioContext on first user tap. Prototype + engine live in `design/sound-lab.html`; its engine code becomes `audio.js` (reuse it, don't redesign without asking).
  - Every effect has random variants (pitch/notes) so it never gets boring: tap, select, back, swoosh; correct (3 arpeggios), streak, wrong (3 gentle ones: boing / oops / wah-wah, never harsh), stamp, star, briefcase open, case closed, topic done; Kitchen: bubble, splash, yum, yuck, sour, crunch.
  - Suspense before revealing an answer: 5 random variants (drum roll, ticking clock, thinking bleeps, rising whistle, sneaky detective), ~1s each, `suspense()` returns its length so the game waits, then stamp + result. Skipped ~1 time in 3 (`maybeSuspense()`).
  - Background music: generative loops, quiet, one style per place (home music-box, animals marimba, space pads+echo, food swing groove, art dreamy arpeggios); melodies are random walks so they never repeat exactly. Pause when the app is hidden.
  - Settings: separate music and sound-effects on/off (+ volume), remembered in `localStorage`. Audio is tested by ear by the family (the developer can't hear it).
- **Persistence:** `localStorage` (wrapped in try/catch) for stars, stickers, progress. No accounts/servers.

## 3. Hosting, PWA & Updates
- Repo: `https://github.com/ilanhalakhmi/bunny-world` (branch `main`). Deployed via GitHub Pages from `/` root → `https://ilanhalakhmi.github.io/bunny-world/`.
- Add `<meta name="robots" content="noindex">`. Install via Android Chrome "Add to Home Screen".
- Pages is served from a subpath: use RELATIVE paths everywhere; set `start_url` and `scope` to `./`. Manifest: `display: standalone`, portrait, PNG icons 192 & 512.
- Service worker: cache-first for offline play. Cache name carries a `VERSION` constant; bump it every release.
- **Hidden update button** (long-press on a parent corner): calls `registration.update()`, downloads in background, shows "עדכון מוכן, לחצי להפעלה"; reloads only on tap. Works offline (falls back to cache). Show version number on screen.

## 4. Game Roadmap (Modular Hub)
- **Home Screen:** hub with the bunny SVG; buttons launch mini-games; shows stars and sticker-book entry.
- **Game 1 — "בלשית העובדות" (Fact Detective):** The player is the detective; Frooky is her partner. True/False clues, no timer.
  - Buttons: **נכון ✓** (green) and **שטויות במיץ עגבניות!** (orange, tomato icon, 2 lines). Stamps slam on the clue card: "נכון!" or "שטויות במיץ עגבניות!"; a wrong pick shows Frooky's sad face + a gentle stamp. Case-file card look; "case closed" at round end.
  - Round = 10 clues. Player picks a topic first: animals / space / food / drawing-art / "surprise me". Missed facts return later in the same round. ~50% true / 50% false, false ones are popular myths where possible.
  - Reaction faces: use Frooky expressions (happy, celebrating, sad, surprised, thinking). 1-sentence Hebrew explanation after every answer.
  - Rewards: stars per correct answer; every 5 stars the briefcase opens → new tool from THIS game's collection.
  - **Big pool:** target ~100 facts per topic (start ~30, grow in validated batches of 20-30). Per-fact status saved in `localStorage` (new/seen/missed/learned; learned = correct twice). Pick order: unseen → missed. Each fact has `level` (easy/medium/hard); harder ones appear as she masters a topic. Topic finished → special reward + suggest another topic.
  - "Frooky's notebook": every fact she answers correctly is saved there by topic, so she can reread what she learned. (Later idea: she suggests her own facts, credited to her.)
  - Data: one editable file per topic (`data/data-facts-animals.js`, `-space.js`, `-food.js`, `-art.js`; each declares `FACTS_ANIMALS` etc.), each an array of `{ id, topic, level, text, answer, explain, pic }`.
  - **Graphics:** 4 simple topic backgrounds (animals = savanna, space = starry sky, food = kitchen/market, art = studio) (drawn: `data/backgrounds.js`, const `BACKGROUNDS` keyed by topic, portrait viewBox 0 0 360 640, source `design/pics/backgrounds-sheet.svg`) + one small flat SVG drawing per clue subject (~65 unique, reused across clues via the `pic` field, e.g. `pic: "giraffe"`; stored as SVG strings in `data/pics-<topic>.js` (`PICS_ANIMALS` etc., each viewBox 0 0 200 200); editable source sheets in `design/pics/`). Same Bruna style as Frooky: thick black outline, flat palette colors, simple geometric shapes. The picture must NOT give away the answer (for myths, draw the plain subject, not the truth). Pictures also appear next to each solved fact in Frooky's notebook. Drawn in topic batches as labeled sheets, reviewed by the family before adding to the project. (Option later: the daughter's own drawings.)
- **Game 2 — "הטבחית" (Kitchen):** pick ingredients from a pantry (incl. funny wrong ones), cook in a pot, feed the bunny → dynamic face (happy vs. disgusted/surprised). Data: editable `RECIPES` array in `data-recipes.js`. Primary design investment goes here.
- **Rewards:** stars (correct answers, successful dishes, streak bonus) shared across games. Frooky's briefcase holds **collectable exploration tools** (collectables only — NO gameplay power-ups). Each game has its OWN separate collection: Fact Detective (animals, space, drawing, general: magnifying glass, telescope, compass, notebook+pencil, flashlight, bug jar/net, binoculars, paint brush, camera, magnet, microscope, map, mystery "?" tool…) and Kitchen (spoon, whisk, recipe book, spice jars, scale…). Tool unlocks follow the subject of the questions/recipes when possible; when a subject's set is complete, unlock from the next subject. Tools live in an editable array. Later: sticker book, decorate Frooky's room, kitchen ingredient/recipe unlocks, funny failed dishes earn "discovery" stickers.
- **Content themes:** animals, food, space/universe, drawing.
- **Future:** new games register in a `GAMES` list; adding games/data must not require refactoring core.

## 5. Coding Rules
- Modular, readable code; comments in **English** so the developer and his daughter can add facts/recipes by hand.
- Mobile portrait first: large tap targets (≥48px), no unintended scrolling/zoom.
- Token-efficient: make **surgical edits**, never rewrite whole files for content changes.

## 6. Content Validation Workflow
Before asking the user to review any facts/recipes/Hebrew text:
1. Fact-check each fact via web sources; record source + confidence; drop or flag unverifiable ones.
2. Run an independent cold-read review (fresh agent) for Hebrew grammar, spelling, gender agreement, and 9-year-old suitability.
3. Remove ambiguous true/false statements (answer depends on interpretation).
4. Give the user a short list of least-certain items; the user is the final gate.
