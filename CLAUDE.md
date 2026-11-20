# CLAUDE.md — Bunny World (working title; Hebrew title TBD)

> Status: planning. Do NOT build or generate game files until the user explicitly asks.

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
  `index.html`, `style.css`, `app.js` (hub/router/state), `audio.js`, `rewards.js`, `data-facts.js`, `data-recipes.js`, `game-facts.js`, `game-kitchen.js`, `manifest.json`, `sw.js`, `icons/`.
- **Visuals:** Bruna-style minimalism — crisp inline SVG, thick black outlines, white background. Palette: Orange `#F37021`, Blue `#005CA9`, Yellow `#FFD100`, Green `#008D36`.
- **Audio:** Web Audio API synthesized effects only. Unlock AudioContext on first user tap.
- **Persistence:** `localStorage` (wrapped in try/catch) for stars, stickers, progress. No accounts/servers.

## 3. Hosting, PWA & Updates
- Repo: `https://github.com/ilanhalakhmi/bunny-world` (branch `main`). Deployed via GitHub Pages from `/` root → `https://ilanhalakhmi.github.io/bunny-world/`.
- Add `<meta name="robots" content="noindex">`. Install via Android Chrome "Add to Home Screen".
- Pages is served from a subpath: use RELATIVE paths everywhere; set `start_url` and `scope` to `./`. Manifest: `display: standalone`, portrait, PNG icons 192 & 512.
- Service worker: cache-first for offline play. Cache name carries a `VERSION` constant; bump it every release.
- **Hidden update button** (long-press on a parent corner): calls `registration.update()`, downloads in background, shows "עדכון מוכן, לחצי להפעלה"; reloads only on tap. Works offline (falls back to cache). Show version number on screen.

## 4. Game Roadmap (Modular Hub)
- **Home Screen:** hub with the bunny SVG; buttons launch mini-games; shows stars and sticker-book entry.
- **Game 1 — "בלשית העובדות" (Fact Detective):** True/False trivia; bunny & friends react; 1-sentence explanation each. Data: editable `FACTS` array in `data-facts.js`.
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
