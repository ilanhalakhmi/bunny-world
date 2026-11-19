# CLAUDE.md — Bunny World (working title; Hebrew title TBD)

> Status: planning. Do NOT build or generate game files until the user explicitly asks.

## 1. Project Overview
- **Audience:** A 9-year-old girl, on an Android phone (portrait). Interests: animals, food, space/universe, drawing.
- **Language:** Hebrew, `<html lang="he" dir="rtl">`. Playful, warm, age-appropriate tone.
- **Character:** An ORIGINAL Miffy-inspired bunny (name TBD — use placeholder `BUNNY_NAME` in code/text until chosen). Never use the name "Miffy" or copy Miffy/Dick Bruna designs; only the general minimalist style.
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
- **Rewards (shared across games):** stars (correct answers, successful dishes, streak bonus) → unlock stickers in a sticker book (game-specific badges, mystery stickers; funny failed dishes earn "discovery" stickers). Kitchen unlocks new ingredients/recipes with progress. Later: decorate the bunny's room with earned items.
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
