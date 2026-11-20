// Frooky the bunny (approved art from design/frooky.svg + design/frooky-expressions.svg).
// frookyHead(expr) -> head-only SVG string;  frookyFull(expr) -> full body with briefcase.
// expr is one of: curious thinking happy celebrating sad surprised yummy yucky sour salty spicy sweet
(function () {
  const EARS = `<path d="M190 192 C150 140 138 60 152 30 C160 12 185 14 200 40 C220 80 232 130 236 172 Z" fill="#fff"/>
<path d="M190 165 C172 130 166 85 176 68 C190 72 205 120 212 160 Z" fill="#FFD100" stroke-width="3.5"/>
<g transform="translate(520 0) scale(-1 1)"><path d="M190 192 C150 140 138 60 152 30 C160 12 185 14 200 40 C220 80 232 130 236 172 Z" fill="#fff"/>
<path d="M190 165 C172 130 166 85 176 68 C190 72 205 120 212 160 Z" fill="#FFD100" stroke-width="3.5"/></g>`;

  const BODY = `<ellipse cx="230" cy="500" rx="27" ry="13" fill="#fff"/><ellipse cx="298" cy="500" rx="27" ry="13" fill="#fff"/>
<rect x="208" y="340" width="118" height="60" rx="18" fill="#fff"/>
<path d="M206 374 C201 415 197 450 201 490 H262 L264 452 L268 490 H330 C334 450 330 415 326 374 Z" fill="#005CA9"/>
<rect x="226" y="372" width="76" height="48" rx="8" fill="#005CA9"/>
<rect x="246" y="392" width="38" height="26" rx="5" fill="#005CA9" stroke-width="4"/>
<rect x="195" y="482" width="70" height="18" rx="5" fill="#0a7bd6"/><rect x="267" y="482" width="64" height="18" rx="5" fill="#0a7bd6"/>
<path d="M224 346 L226 376" fill="none" stroke-width="8"/><path d="M300 346 L298 376" fill="none" stroke-width="8"/>
<circle cx="226" cy="380" r="8" fill="#FFD100" stroke-width="4"/><circle cx="298" cy="380" r="8" fill="#FFD100" stroke-width="4"/>
<ellipse cx="196" cy="394" rx="19" ry="42" transform="rotate(16 196 394)" fill="#fff"/>
<ellipse cx="341" cy="404" rx="19" ry="50" transform="rotate(-10 341 404)" fill="#fff"/>
<path d="M352 472 V452 Q352 441 364 441 Q376 441 376 452 V472" fill="none" stroke-width="7"/>
<rect x="332" y="470" width="86" height="58" rx="9" fill="#F37021"/><path d="M332 490 H418" fill="none" stroke-width="4"/>
<rect x="346" y="484" width="12" height="12" rx="2" fill="#FFD100" stroke-width="3.5"/><rect x="392" y="484" width="12" height="12" rx="2" fill="#FFD100" stroke-width="3.5"/>
<circle cx="357" cy="512" r="13" fill="#fff" stroke-width="3"/><circle cx="354" cy="509" r="5.5" fill="#fff" stroke="#005CA9" stroke-width="2.8"/><path d="M358.5 513.5 L364 519" fill="none" stroke="#005CA9" stroke-width="3.5"/>
<circle cx="393" cy="512" r="13" fill="#fff" stroke-width="3"/>
<g transform="translate(393 512) rotate(45)" stroke-width="1.8"><rect x="-3" y="-11" width="6" height="3.5" fill="#F37021"/><rect x="-3" y="-7.5" width="6" height="12" fill="#FFD100"/><path d="M-3 4.5 L0 10 L3 4.5 Z" fill="#fff"/></g>
<circle cx="356" cy="456" r="11" fill="#fff"/>`;

  const HEADSHAPE = "M260 163 C320 163 365 200 365 255 C365 305 320 345 262 345 C200 345 155 310 155 255 C155 200 200 163 260 163 Z";
  const DOTS = `<circle cx="206" cy="268" r="7" fill="#000" stroke="none"/><circle cx="312" cy="266" r="7" fill="#000" stroke="none"/>`;
  const CHEEKS = `<ellipse cx="190" cy="293" rx="14" ry="8" fill="#F37021" stroke="none" opacity=".7"/><ellipse cx="328" cy="290" rx="14" ry="8" fill="#F37021" stroke="none" opacity=".7"/>`;
  const BIGCHEEKS = `<ellipse cx="188" cy="294" rx="17" ry="10" fill="#F37021" stroke="none" opacity=".85"/><ellipse cx="330" cy="291" rx="17" ry="10" fill="#F37021" stroke="none" opacity=".85"/>`;
  const NOSE = `<path d="M260 291.2 C249.4 284.6 250.8 276 256 276 C258.7 276 260 278 260 280 C260 278 261.3 276 264 276 C269.2 276 270.6 284.6 260 291.2 Z" fill="#F37021" stroke="#000" stroke-width="2.8"/>`;
  const HEART = `<path d="M0 8 C-13 1 -8 -9 0 -3 C8 -9 13 1 0 8 Z"/>`;
  const DROP = `<path d="M338 205 Q346 218 338 226 Q330 218 338 205 Z" fill="#4aa3e0" stroke-width="3"/>`;

  // Each face: optional overlay (tint over the head) + the face parts.
  const FACES = {
    curious: { f: `${DOTS}${CHEEKS}${NOSE}<path d="M260 291 V299 M245 299 Q252 311 260 299 Q268 311 275 299"/>` },
    thinking: { f: `<circle cx="211" cy="262" r="7" fill="#000" stroke="none"/><circle cx="317" cy="260" r="7" fill="#000" stroke="none"/>
      <path d="M192 248 Q206 242 220 248"/><path d="M298 238 Q312 230 326 238"/>${CHEEKS}${NOSE}
      <path d="M260 291 V298 M246 305 Q258 300 274 297"/>
      <circle cx="378" cy="232" r="4" fill="#000" stroke="none"/><circle cx="392" cy="212" r="6" fill="#000" stroke="none"/><circle cx="412" cy="186" r="9" fill="#000" stroke="none"/>` },
    happy: { f: `<path d="M194 272 Q206 256 218 272"/><path d="M300 270 Q312 254 324 270"/>${CHEEKS}${NOSE}
      <path d="M238 297 Q260 334 282 297 Z" fill="#fff"/><ellipse cx="260" cy="311" rx="9" ry="4.5" fill="#F6A27A" stroke="none"/>` },
    celebrating: { f: `<path d="M194 272 Q206 256 218 272"/><path d="M300 270 Q312 254 324 270"/>${BIGCHEEKS}${NOSE}
      <path d="M232 295 Q260 342 288 295 Z" fill="#fff"/><ellipse cx="260" cy="316" rx="11" ry="5.5" fill="#F6A27A" stroke="none"/>
      <g stroke="none"><circle cx="125" cy="205" r="8" fill="#008D36"/><circle cx="110" cy="270" r="6" fill="#005CA9"/><circle cx="130" cy="330" r="7" fill="#FFD100"/>
      <rect x="385" y="198" width="14" height="14" fill="#F37021" transform="rotate(25 392 205)"/><circle cx="400" cy="275" r="7" fill="#FFD100"/><circle cx="385" cy="335" r="8" fill="#008D36"/>
      <circle cx="260" cy="110" r="7" fill="#F37021"/><rect x="240" y="60" width="12" height="12" fill="#005CA9" transform="rotate(20 246 66)"/></g>` },
    sad: { f: `${DOTS}<path d="M192 254 L220 244"/><path d="M300 244 L328 254"/>${CHEEKS}${NOSE}
      <path d="M246 308 Q260 294 274 308"/><path d="M200 284 Q208 296 200 304 Q192 296 200 284 Z" fill="#4aa3e0" stroke-width="3"/>` },
    surprised: { f: `<circle cx="206" cy="266" r="12" fill="#fff" stroke-width="4"/><circle cx="206" cy="266" r="5" fill="#000" stroke="none"/>
      <circle cx="312" cy="264" r="12" fill="#fff" stroke-width="4"/><circle cx="312" cy="264" r="5" fill="#000" stroke="none"/>
      <path d="M190 240 Q206 230 222 240"/><path d="M296 238 Q312 228 328 238"/>${CHEEKS}${NOSE}<ellipse cx="260" cy="307" rx="7" ry="9" fill="#fff"/>` },
    yummy: { f: `<path d="M194 272 Q206 256 218 272"/><path d="M300 270 Q312 254 324 270"/>${BIGCHEEKS}${NOSE}
      <path d="M240 297 Q260 322 280 297"/><ellipse cx="277" cy="313" rx="10" ry="6" fill="#F6A27A" transform="rotate(35 277 313)" stroke-width="4"/>
      <g transform="translate(392 230)" stroke-width="4"><g transform="scale(1.6)" fill="#F37021">${HEART}</g></g>` },
    yucky: { overlay: ["#008D36", ".3"], f: `<path d="M198 256 L216 268 L198 280"/><path d="M326 254 L308 266 L326 278"/>
      <ellipse cx="190" cy="293" rx="14" ry="8" fill="#008D36" stroke="none" opacity=".6"/><ellipse cx="328" cy="290" rx="14" ry="8" fill="#008D36" stroke="none" opacity=".6"/>${NOSE}
      <path d="M242 304 Q251 297 260 304 Q269 311 278 304"/><path d="M252 306 V318 Q260 328 268 318 V306" fill="#F6A27A" stroke-width="4"/>` },
    sour: { f: `<path d="M194 266 Q206 278 218 266"/><path d="M300 264 Q312 276 324 264"/><path d="M190 250 L220 258"/><path d="M330 248 L300 256"/>${CHEEKS}${NOSE}
      <circle cx="260" cy="306" r="5.5"/><path d="M248 301 L253 303 M272 301 L267 303 M250 311 L254 309 M270 311 L266 309" stroke-width="4"/>
      <ellipse cx="396" cy="314" rx="24" ry="17" fill="#FFD100" transform="rotate(-20 396 314)"/><path d="M406 292 Q420 286 424 296 Q414 302 406 292 Z" fill="#008D36" stroke-width="3"/>` },
    salty: { f: `${DOTS}<path d="M192 252 Q206 248 220 242"/><path d="M300 242 Q314 248 328 252"/>${CHEEKS}${NOSE}
      <path d="M242 304 Q248 297 254 304 Q260 311 266 304 Q272 297 278 304"/>${DROP}
      <g transform="translate(396 288) rotate(-160) scale(1.35)" stroke-width="3.2"><rect x="-14" y="-6" width="28" height="36" rx="7" fill="#fff"/>
      <path d="M-14 -6 Q-14 -26 0 -26 Q14 -26 14 -6 Z" fill="#005CA9"/><g fill="#fff" stroke="none"><circle cx="-5" cy="-15" r="2.2"/><circle cx="3" cy="-18" r="2.2"/><circle cx="6" cy="-11" r="2.2"/></g></g>
      <g fill="#fff" stroke-width="2.5"><circle cx="384" cy="332" r="3.5"/><circle cx="394" cy="342" r="3.5"/><circle cx="378" cy="348" r="3.5"/><circle cx="388" cy="358" r="3.5"/><circle cx="372" cy="362" r="3"/></g>` },
    spicy: { overlay: ["#F37021", ".35"], f: `${DOTS}<path d="M192 248 Q206 242 220 248"/><path d="M298 246 Q312 240 326 246"/>${BIGCHEEKS.replace(' opacity=".85"', '')}${NOSE}
      <path d="M244 297 Q260 338 276 297 Z" fill="#fff"/><ellipse cx="260" cy="316" rx="9" ry="5" fill="#F6A27A" stroke="none"/>${DROP}
      <path d="M395 290 C406 302 414 310 408 326 C404 338 386 338 382 324 C379 314 389 310 391 300 C393 304 395 300 395 290 Z" fill="#F37021"/>
      <path d="M396 312 C401 318 403 324 399 329 C394 332 389 328 390 322 C391 318 395 318 396 312 Z" fill="#FFD100" stroke-width="3"/>` },
    sweet: { f: `<g transform="translate(206 268) scale(1.5)" fill="#F37021" stroke-width="3">${HEART}</g><g transform="translate(312 266) scale(1.5)" fill="#F37021" stroke-width="3">${HEART}</g>
      ${BIGCHEEKS}${NOSE}<path d="M245 299 Q260 316 275 299"/>
      <path d="M400 330 V372" stroke-width="5"/><circle cx="400" cy="308" r="22" fill="#FFD100"/><path d="M400 308 m-12 0 a12 12 0 1 1 12 12 M400 308 m-5 0 a5 5 0 1 1 5 5" stroke-width="3"/>` }
  };

  function build(expr, full) {
    const fc = FACES[expr] || FACES.curious;
    const ov = fc.overlay ? `<path d="${HEADSHAPE}" fill="${fc.overlay[0]}" opacity="${fc.overlay[1]}" stroke="none"/>` : '';
    const vb = full ? '120 0 320 550' : '120 0 320 366';
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" class="frooky-svg" role="img" aria-label="פרוקי">
<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">${EARS}${full ? BODY : ''}<path d="${HEADSHAPE}" fill="#fff"/></g>${ov}
<g fill="none" stroke="#000" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">${fc.f}</g></svg>`;
  }
  window.frookyHead = expr => build(expr, false);
  window.frookyFull = expr => build(expr, true);
  window.FROOKY_EXPRESSIONS = Object.keys(FACES);
})();
