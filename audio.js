// Sound engine: everything is synthesized with the Web Audio API (no sound files).
// Ported from design/sound-lab.html. Public API at the bottom: Snd.sfx(name), Snd.music(style), toggles.
/* =========================================================
   Sound engine (this becomes audio.js in the real game).
   Everything is synthesized with the Web Audio API.
   ========================================================= */
let ctx, master, sfxBus, musicBus, echo, noiseBuf, curBus;
const rnd = a => a[Math.floor(Math.random() * a.length)];
const rr = (a, b) => a + Math.random() * (b - a);
const mf = m => 440 * Math.pow(2, (m - 69) / 12);          // midi -> Hz

function init() {
  if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return; }
  ctx = new (window.AudioContext || window.webkitAudioContext)();
  master = ctx.createGain(); master.connect(ctx.destination);
  sfxBus = ctx.createGain(); sfxBus.connect(master);
  musicBus = ctx.createGain(); musicBus.connect(master);
  curBus = sfxBus;
  // shared echo for the music (space sparkles)
  echo = ctx.createDelay(1); echo.delayTime.value = 0.375;
  const fb = ctx.createGain(); fb.gain.value = 0.42; echo.connect(fb); fb.connect(echo);
  const eg = ctx.createGain(); eg.gain.value = 0.5; echo.connect(eg); eg.connect(musicBus);
  noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
  const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  setVol();
}
function setVol() {
  if (!ctx) return;
  sfxBus.gain.value = 0.8;
  musicBus.gain.value = 0.4;
}

/* one note: o = {type, vol, a, to, bus, echo, vib} */
function tone(f, t, d, o = {}) {
  const osc = ctx.createOscillator(), g = ctx.createGain();
  osc.type = o.type || 'sine';
  osc.frequency.setValueAtTime(f, t);
  if (o.to) osc.frequency.exponentialRampToValueAtTime(o.to, t + d);
  if (o.vib) { const l = ctx.createOscillator(), lg = ctx.createGain(); l.frequency.value = o.vib; lg.gain.value = f * 0.04; l.connect(lg); lg.connect(osc.frequency); l.start(t); l.stop(t + d + 0.1); }
  const a = o.a || 0.006, v = o.vol || 0.2;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(v, t + a);
  g.gain.exponentialRampToValueAtTime(0.0001, t + d);
  osc.connect(g); g.connect(o.bus || curBus);
  if (o.echo) { const s = ctx.createGain(); s.gain.value = o.echo; g.connect(s); s.connect(echo); }
  osc.start(t); osc.stop(t + d + 0.05);
}
/* filtered noise burst: o = {type, f, f2, vol, bus} */
function noise(t, d, o = {}) {
  const src = ctx.createBufferSource(); src.buffer = noiseBuf; src.loop = true;
  const fl = ctx.createBiquadFilter(); fl.type = o.type || 'lowpass';
  fl.frequency.setValueAtTime(o.f || 1000, t);
  if (o.f2) fl.frequency.exponentialRampToValueAtTime(o.f2, t + d);
  const g = ctx.createGain(); const v = o.vol || 0.2;
  g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(v, t + 0.004);
  g.gain.exponentialRampToValueAtTime(0.0001, t + d);
  src.connect(fl); fl.connect(g); g.connect(o.bus || curBus);
  src.start(t); src.stop(t + d + 0.05);
}
const PENT = [0, 2, 4, 7, 9];                              // major pentatonic

/* ---------------- sound effects ---------------- */
const S = {
  tap()    { init(); const t = ctx.currentTime, f = rr(520, 760);
             tone(f, t, 0.09, { type: 'sine', vol: 0.25, to: f * 0.6 }); },
  select() { init(); const t = ctx.currentTime, r = rnd([72, 74, 76]);
             tone(mf(r), t, 0.12, { type: 'triangle', vol: 0.22 }); tone(mf(r + 7), t + 0.07, 0.16, { type: 'triangle', vol: 0.22 }); },
  back()   { init(); const t = ctx.currentTime, r = rnd([76, 74]);
             tone(mf(r), t, 0.1, { type: 'triangle', vol: 0.2 }); tone(mf(r - 5), t + 0.07, 0.14, { type: 'triangle', vol: 0.2 }); },
  whoosh() { init(); const t = ctx.currentTime;
             noise(t, 0.3, { type: 'bandpass', f: 400, f2: rr(2200, 3200), vol: 0.14 }); },

  correct() { init(); const t = ctx.currentTime, r = rnd([67, 69, 71, 72]), v = Math.floor(Math.random() * 3);
    const pats = [[0, 4, 7, 12], [0, 2, 7, 9, 12], [0, 7, 12]];            // 3 cheerful arpeggios
    pats[v].forEach((n, i) => {
      tone(mf(r + n), t + i * 0.075, 0.28, { type: 'triangle', vol: 0.22 });
      tone(mf(r + n + 12), t + i * 0.075, 0.2, { type: 'sine', vol: 0.07 });
    }); },
  streak() { init(); const t = ctx.currentTime, r = rnd([60, 62, 65]);
    [0, 4, 7, 12, 16, 19, 24].forEach((n, i) => {
      tone(mf(r + n), t + i * 0.065, 0.3, { type: 'triangle', vol: 0.2 });
      tone(mf(r + n + 12), t + i * 0.065 + 0.02, 0.2, { type: 'sine', vol: 0.06 });
    });
    tone(mf(r + 24), t + 0.5, 0.6, { type: 'sine', vol: 0.12 }); },
  wrong() { init(); const t = ctx.currentTime, v = Math.floor(Math.random() * 3);
    if (v === 0) {                                                       // boing
      tone(420, t, 0.4, { type: 'sine', vol: 0.25, to: 170, vib: 18 });
    } else if (v === 1) {                                                // oops, two falling notes
      tone(mf(67), t, 0.16, { type: 'triangle', vol: 0.22 }); tone(mf(62), t + 0.15, 0.3, { type: 'triangle', vol: 0.22 });
    } else {                                                             // wah-wah
      tone(330, t, 0.22, { type: 'triangle', vol: 0.2, to: 260 }); tone(290, t + 0.22, 0.4, { type: 'triangle', vol: 0.2, to: 190, vib: 9 });
    } },
  stamp() { init(); const t = ctx.currentTime;
    tone(150, t, 0.16, { type: 'sine', vol: 0.5, to: 45 });
    noise(t, 0.09, { type: 'lowpass', f: 1800, f2: 300, vol: 0.3 });
    noise(t + 0.01, 0.04, { type: 'highpass', f: 3000, vol: 0.08 }); },
  star() { init(); const t = ctx.currentTime, r = rnd([84, 86, 88]);
    [0, 7, 12].forEach((n, i) => tone(mf(r + n), t + i * 0.06, 0.25, { type: 'sine', vol: 0.15 })); },
  /* Suspense before an answer is revealed. 5 random variants; returns the length in seconds,
     so the game can wait that long and then show the stamp. */
  suspense(v) { init(); const t = ctx.currentTime;
    v = (v === undefined) ? Math.floor(Math.random() * 5) : v;
    if (v === 0) {                                                       // drum roll, getting louder
      const n = 22; for (let i = 0; i < n; i++) { const k = i / n;
        noise(t + i * 0.045, 0.05, { type: 'bandpass', f: rr(900, 1400), vol: 0.07 + 0.2 * k });
        if (i % 2 === 0) tone(110, t + i * 0.045, 0.06, { type: 'sine', vol: 0.05 + 0.12 * k, to: 80 }); }
      return 1.0;
    }
    if (v === 1) {                                                       // clock ticking, speeding up
      let x = 0, gap = 0.2; for (let i = 0; i < 7; i++) { tone(i % 2 ? 1500 : 1800, t + x, 0.03, { type: 'square', vol: 0.07 }); noise(t + x, 0.02, { type: 'highpass', f: 4000, vol: 0.1 }); x += gap; gap *= 0.82; }
      return x + 0.1;
    }
    if (v === 2) {                                                       // thinking: little wandering bleeps
      let x = 0; for (let i = 0; i < 7; i++) { const f = mf(rnd([72, 76, 79, 81, 84, 88])); tone(f, t + x, 0.09, { type: 'sine', vol: 0.14, to: f * rnd([1.05, 0.95]) }); x += 0.11; }
      return x + 0.15;
    }
    if (v === 3) {                                                       // rising whistle
      tone(300, t, 0.9, { type: 'sine', vol: 0.18, to: 1700, vib: 7 }); tone(600, t, 0.9, { type: 'triangle', vol: 0.06, to: 3400 });
      noise(t, 0.9, { type: 'bandpass', f: 500, f2: 4000, vol: 0.05 });
      return 0.95;
    }
    /* v === 4: mysterious two-note creep with a tiny shiver */                                         // sneaky detective steps
    [[55, 0], [56, 0.22], [55, 0.44], [58, 0.66]].forEach(([n, d]) => { tone(mf(n), t + d, 0.2, { type: 'triangle', vol: 0.2 }); tone(mf(n + 12), t + d, 0.12, { type: 'sine', vol: 0.05 }); });
    tone(mf(79), t + 0.86, 0.3, { type: 'sine', vol: 0.07, vib: 12 });
    return 1.1;
  },
  /* demo: suspense, then the reveal */
  /* In the game: use maybeSuspense() - it skips the suspense about 1 time in 3 (returns 0), so it stays special. */
  maybeSuspense() { return Math.random() < 1 / 3 ? 0 : S.suspense(); },
  reveal(right) { const d = S.maybeSuspense(); setTimeout(() => { if (right) { S.stamp(); setTimeout(S.correct, 120); } else { S.stamp(); setTimeout(S.wrong, 120); } }, d * 1000); },

  briefcase() { init(); const t = ctx.currentTime;
    noise(t, 0.03, { type: 'highpass', f: 2500, vol: 0.35 }); noise(t + 0.1, 0.04, { type: 'highpass', f: 2000, vol: 0.35 });   // two latches
    const r = rnd([67, 69]);
    [0, 4, 7, 11, 14, 16, 19, 23].forEach((n, i) => {
      tone(mf(r + 12 + n), t + 0.3 + i * 0.07, 0.5, { type: 'sine', vol: 0.14 });
      tone(mf(r + 24 + n), t + 0.32 + i * 0.07, 0.25, { type: 'triangle', vol: 0.04 });
    }); },
  caseClosed() { init(); const t = ctx.currentTime;
    [[60, 0], [64, 0.12], [67, 0.24], [72, 0.4]].forEach(([n, d]) => {
      tone(mf(n), t + d, 0.35, { type: 'triangle', vol: 0.22 }); tone(mf(n + 12), t + d, 0.3, { type: 'sine', vol: 0.07 });
    });
    [60, 64, 67, 72].forEach(n => tone(mf(n), t + 0.6, 0.9, { type: 'triangle', vol: 0.14 }));
    S._rise(t + 0.6); },
  _rise(t) { noise(t, 0.5, { type: 'bandpass', f: 1500, f2: 6000, vol: 0.05 }); },
  topicDone() { init(); const t = ctx.currentTime;
    const m = [60, 64, 67, 72, 71, 74, 79];
    m.forEach((n, i) => tone(mf(n), t + i * 0.12, 0.4, { type: 'triangle', vol: 0.2 }));
    [67, 71, 74, 79].forEach(n => tone(mf(n), t + 0.9, 1.2, { type: 'triangle', vol: 0.15 }));
    for (let i = 0; i < 10; i++) tone(mf(rnd([84, 86, 88, 91, 93])), t + 0.9 + i * 0.09, 0.2, { type: 'sine', vol: 0.09 }); },

  bubble() { init(); const t = ctx.currentTime;
    for (let i = 0; i < 8; i++) { const f = rr(250, 700); tone(f, t + i * rr(0.08, 0.16), 0.09, { type: 'sine', vol: 0.18, to: f * 1.8 }); } },
  splash() { init(); const t = ctx.currentTime;
    noise(t, 0.2, { type: 'lowpass', f: 3000, f2: 400, vol: 0.22 }); tone(rr(300, 500), t + 0.05, 0.12, { type: 'sine', vol: 0.2, to: 900 }); },
  yum() { init(); const t = ctx.currentTime;
    tone(260, t, 0.5, { type: 'triangle', vol: 0.22, to: 330, vib: 6 }); tone(330, t + 0.3, 0.45, { type: 'triangle', vol: 0.2, to: 420, vib: 6 });
    [76, 79, 84].forEach((n, i) => tone(mf(n), t + 0.55 + i * 0.07, 0.25, { type: 'sine', vol: 0.12 })); },
  yuck() { init(); const t = ctx.currentTime;
    const o = ctx.createOscillator(), g = ctx.createGain(), fl = ctx.createBiquadFilter();
    o.type = 'sawtooth'; o.frequency.setValueAtTime(220, t); o.frequency.exponentialRampToValueAtTime(80, t + 0.6);
    fl.type = 'lowpass'; fl.frequency.value = 700;
    const l = ctx.createOscillator(), lg = ctx.createGain(); l.frequency.value = 14; lg.gain.value = 18; l.connect(lg); lg.connect(o.frequency); l.start(t); l.stop(t + 0.7);
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.2, t + 0.04); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.65);
    o.connect(fl); fl.connect(g); g.connect(sfxBus); o.start(t); o.stop(t + 0.7); },
  sour() { init(); const t = ctx.currentTime;
    tone(900, t, 0.14, { type: 'square', vol: 0.08, to: 1500 }); tone(1500, t + 0.14, 0.18, { type: 'square', vol: 0.08, to: 700 }); },
  crunch() { init(); const t = ctx.currentTime;
    for (let i = 0; i < 4; i++) noise(t + i * 0.07, 0.05, { type: 'bandpass', f: rr(1500, 3500), vol: 0.3 }); }
};

/* ---------------- background music ---------------- */
/* A tiny generative engine: each style = bpm + a function that plays one 16th-note step.
   Chords change every bar (16 steps); melodies are random walks over a scale, so it never repeats exactly. */
const MAJ = [0, 4, 7], MIN = [0, 3, 7];
let mus = { style: '', timer: null, next: 0, step: 0, last: 0 };

function walk(scale, lo, hi) {                          // random-walk melody pitch
  let n = mus.last || lo;
  for (let tries = 0; tries < 20; tries++) {
    const c = n + rnd([-4, -2, -2, 0, 2, 2, 4]);
    const pc = ((c % 12) + 12) % 12;
    if (c >= lo && c <= hi && scale.includes(pc)) { mus.last = c; return c; }
  }
  return (mus.last = rnd([lo + 2, lo + 4]));
}
const STYLES = {
  home: { bpm: 96, play(s, b, t, sp) {                  // cheerful music-box
    const root = [60, 65, 67, 60][b % 4], ch = [0, 4, 7];
    if (s % 4 === 0) tone(mf(root - 12 + (s % 8 === 4 ? 7 : 0)), t, 0.35, { type: 'triangle', vol: 0.16 });
    if (s % 2 === 0 && Math.random() < 0.65) { const n = walk([0, 2, 4, 7, 9], 72, 88); tone(mf(n), t, 0.3, { type: 'sine', vol: 0.12 }); tone(mf(n + 12), t, 0.12, { type: 'sine', vol: 0.04 }); }
    if (s === 0) ch.forEach(c => tone(mf(root + c), t, sp * 15, { type: 'sine', vol: 0.045, a: 0.3 }));
  } },
  animals: { bpm: 112, play(s, b, t, sp) {              // bouncy marimba
    const root = [60, 65, 67, 60][b % 4];
    if (s === 0 || s === 8) tone(mf(root - 24), t, 0.3, { type: 'triangle', vol: 0.22 });
    if (s === 6 || s === 14) tone(mf(root - 17), t, 0.2, { type: 'triangle', vol: 0.16 });
    if (s % 2 === 0 && Math.random() < 0.62) { const n = walk([0, 2, 4, 7, 9], 69, 86), f = mf(n);
      tone(f, t, 0.22, { type: 'sine', vol: 0.15 }); tone(f * 4, t, 0.05, { type: 'sine', vol: 0.05 }); }
    if (s % 4 === 2) noise(t, 0.04, { type: 'highpass', f: 6000, vol: 0.035, bus: musicBus });
    if (s === 0) [0, 4, 7].forEach(c => tone(mf(root + c), t, sp * 6, { type: 'triangle', vol: 0.04, a: 0.05, bus: musicBus }));
  } },
  space: { bpm: 70, play(s, b, t, sp) {                 // floaty pad + sparkles with echo
    const root = [62, 59, 55, 57][b % 4], ch = [0, 4, 7, 11];
    if (s === 0) { ch.forEach(c => tone(mf(root + c), t, sp * 17, { type: 'sine', vol: 0.06, a: 1.2, bus: musicBus }));
                   tone(mf(root - 24), t, sp * 16, { type: 'sine', vol: 0.12, a: 0.6, bus: musicBus }); }
    if (s % 2 === 0 && Math.random() < 0.22) { const n = walk([0, 2, 4, 7, 9, 11, 6], 81, 98);
      tone(mf(n), t, 0.5, { type: 'sine', vol: 0.09, echo: 0.7 }); }
  } },
  food: { bpm: 104, play(s, b, t, sp) {                 // light swingy market groove
    const root = [60, 57, 62, 55][b % 4], minor = [false, true, true, false][b % 4];
    const ch = minor ? MIN : MAJ, ts = (s % 4 === 2) ? t + sp * 0.6 : t;     // swing
    if (s % 4 === 0) { const walkTone = [0, ch[1], ch[2], 9][(s / 4) | 0]; tone(mf(root - 12 + walkTone), t, 0.3, { type: 'triangle', vol: 0.22 }); }
    if (s === 6 || s === 14) ch.forEach(c => tone(mf(root + c), ts, 0.14, { type: 'triangle', vol: 0.08 }));
    if (s % 8 === 4) noise(t, 0.1, { type: 'bandpass', f: 2500, vol: 0.05 });
    if (s % 2 === 0) noise(ts, 0.03, { type: 'highpass', f: 7000, vol: 0.025 });
    if (s % 4 === 0 && Math.random() < 0.55) { const n = walk([0, 2, 4, 5, 7, 9, 11], 72, 86); tone(mf(n), ts, 0.2, { type: 'sine', vol: 0.12 }); }
  } },
  art: { bpm: 80, play(s, b, t, sp) {                   // dreamy arpeggios
    const root = [57, 53, 60, 55][b % 4], ch = [MIN, MAJ, MAJ, MAJ][b % 4];
    if (s === 0) { tone(mf(root - 12), t, sp * 16, { type: 'sine', vol: 0.12, a: 0.3 }); ch.forEach(c => tone(mf(root + c), t, sp * 16, { type: 'sine', vol: 0.035, a: 0.8 })); }
    if (s % 2 === 0) { const c = ch[[0, 1, 2, 1][(s / 2) % 4]]; tone(mf(root + 12 + c), t, 0.5, { type: 'triangle', vol: 0.09, echo: 0.25 }); }
    if ((s === 6 || s === 12) && Math.random() < 0.6) { const n = walk([0, 2, 4, 7, 9], 76, 88); tone(mf(n), t, 0.7, { type: 'sine', vol: 0.1, echo: 0.5 }); }
  } }
};

function musicStart(name) {
  init(); musicStop(true);
  if (!name) return;
  const st = STYLES[name]; mus.style = name; mus.step = 0; mus.last = 0;
  mus.next = ctx.currentTime + 0.15;
  const sp = 60 / st.bpm / 4;
  mus.timer = setInterval(() => {
    while (mus.next < ctx.currentTime + 0.15) {
      const s = mus.step % 16, bar = Math.floor(mus.step / 16);
      curBus = musicBus; st.play(s, bar, mus.next, sp); curBus = sfxBus;
      mus.next += sp; mus.step++;
    }
  }, 30);
}
function musicStop(quiet) { clearInterval(mus.timer); mus.timer = null; mus.style = ''; }

/* ---------------- page wiring ---------------- */

/* ---------------- public API used by the game ---------------- */
const Snd = {
  sfxOn: true, musicOn: true, wanted: '',
  // play a sound effect by name (see S above); returns its length in seconds when it has one
  sfx(name, arg) { if (!this.sfxOn || !S[name]) return 0; try { return S[name](arg) || 0; } catch (e) { return 0; } },
  // suspense before an answer reveal: 0 = skipped this time
  maybeSuspense() { return this.sfxOn ? (S.maybeSuspense() || 0) : 0; },
  // background music for a place: 'home' | 'animals' | 'space' | 'food' | 'art' | '' (silence)
  music(style) { this.wanted = style || ''; if (this.musicOn && this.wanted) { if (mus.timer && mus.style === this.wanted) return; try { musicStart(this.wanted); } catch (e) {} } else { musicStop(); } },
  setSfx(on) { this.sfxOn = on; },
  setMusic(on) { this.musicOn = on; this.music(this.wanted); },
  // browsers only allow sound after a tap: call this from the first tap
  unlock() { try { init(); if (ctx.state === 'suspended') ctx.resume(); if (this.musicOn && this.wanted && !mus.timer) musicStart(this.wanted); } catch (e) {} }
};
document.addEventListener('visibilitychange', () => { if (!ctx) return; if (document.hidden) ctx.suspend(); else ctx.resume(); });
