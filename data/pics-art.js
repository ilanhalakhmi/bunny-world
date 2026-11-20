// Fact Detective pictures (flat Frooky-style SVG). Each entry is the inside of a 200x200 <svg viewBox="0 0 200 200">.
// Use: facts reference these by name with the `pic` field, e.g. pic: "giraffe".
const PICS_ART = {
  "mona-lisa": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <rect x="36" y="18" width="128" height="164" rx="6" fill="#E0A85C"/>
  <rect x="50" y="32" width="100" height="136" fill="#A9C4A0" stroke-width="4"/>
  <path d="M50 92 Q76 78 100 90 Q126 80 150 92 V110 H50 Z" fill="#7FA5C8" stroke="none"/>
  <path d="M74 72 Q100 36 126 72 L132 128 L68 128 Z" fill="#4a2f1a"/>
  <path d="M56 168 Q64 120 100 116 Q136 120 144 168 Z" fill="#3a2a1a"/>
  <path d="M84 120 Q100 138 116 120" fill="#F6C9A0" stroke-width="4"/>
  <ellipse cx="100" cy="90" rx="21" ry="26" fill="#F6C9A0"/>
  <circle cx="92" cy="86" r="2.8" fill="#000" stroke="none"/><circle cx="108" cy="86" r="2.8" fill="#000" stroke="none"/>
  <path d="M92 102 Q100 108 108 102" fill="none" stroke-width="3.5"/>
  <ellipse cx="100" cy="152" rx="20" ry="9" fill="#F6C9A0" stroke-width="4"/>
</g>`,
  "louvre": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <rect x="8" y="104" width="52" height="58" fill="#E6D3A3"/><rect x="140" y="104" width="52" height="58" fill="#E6D3A3"/>
  <path d="M8 104 L34 84 L60 104 Z M140 104 L166 84 L192 104 Z" fill="#7d8791"/>
  <g fill="#fff" stroke-width="3.5"><rect x="18" y="116" width="10" height="16"/><rect x="40" y="116" width="10" height="16"/><rect x="150" y="116" width="10" height="16"/><rect x="172" y="116" width="10" height="16"/></g>
  <path d="M34 166 L100 52 L166 166 Z" fill="#BFE3F5"/>
  <path d="M100 52 L100 166 M67 109 H133 M52 138 H148 M84 80 L58 138 M116 80 L142 138 M100 52 L74 166 M100 52 L126 166" fill="none" stroke-width="3"/>
  <path d="M8 166 H192" fill="none"/>
</g>`,
  "starry-night": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <rect x="24" y="26" width="152" height="148" rx="4" fill="#1F3FA0"/>
  <g fill="none" stroke-width="4"><path d="M40 64 Q62 44 84 64 T128 64 T168 54" stroke="#8fb8ff"/><path d="M40 92 Q66 74 92 92 T150 90" stroke="#5f8fe0"/></g>
  <g fill="#FFD100" stroke-width="3"><circle cx="56" cy="46" r="7"/><circle cx="100" cy="40" r="8"/><circle cx="142" cy="78" r="7"/></g>
  <g fill="none" stroke="#FFE680" stroke-width="3"><circle cx="56" cy="46" r="12"/><circle cx="100" cy="40" r="13"/><circle cx="142" cy="78" r="12"/></g>
  <path d="M152 36 A14 14 0 1 0 152 62 A10 10 0 1 1 152 36 Z" fill="#FFD100" stroke-width="3"/>
  <path d="M24 150 Q80 126 176 146 V174 H24 Z" fill="#12245c" stroke="none"/>
  <path d="M42 174 L48 112 Q50 90 54 70 Q62 100 66 130 L68 174 Z" fill="#0a4a2a" stroke-width="4"/>
  <g stroke="none" fill="#FFD100"><rect x="100" y="150" width="8" height="8"/><rect x="118" y="152" width="8" height="8"/><rect x="136" y="150" width="8" height="8"/></g>
</g>`,
  "palette": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M30 108 Q22 58 82 48 Q142 38 172 80 Q192 120 150 140 Q130 150 126 130 Q122 112 102 120 Q98 152 60 150 Q36 150 30 108 Z" fill="#F0D9A8"/>
  <ellipse cx="138" cy="86" rx="9" ry="7" fill="#fff" stroke-width="4"/>
  <g stroke-width="4"><circle cx="58" cy="86" r="11" fill="#E63B2E"/><circle cx="84" cy="68" r="11" fill="#FFD100"/><circle cx="112" cy="64" r="11" fill="#005CA9"/><circle cx="52" cy="116" r="11" fill="#008D36"/><circle cx="76" cy="124" r="10" fill="#fff"/></g>
  <path d="M150 28 L120 100" fill="none" stroke-width="14"/><path d="M150 28 L120 100" fill="none" stroke="#8a5a2b" stroke-width="6"/>
  <path d="M116 112 L108 128 Q118 130 126 120 Z" fill="#F37021" stroke-width="4"/>
</g>`,
  "white-paint": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <rect x="104" y="24" width="48" height="44" fill="#1F3FA0"/><rect x="104" y="68" width="48" height="44" fill="#4f7fe0"/><rect x="104" y="112" width="48" height="44" fill="#a9c6ff"/>
  <path d="M40 72 H78 L82 160 H36 Z" fill="#fff"/>
  <rect x="34" y="150" width="50" height="14" rx="3" fill="#9aa3ad"/>
  <path d="M46 72 L48 52 H72 L74 72 Z" fill="#fff"/>
  <rect x="46" y="38" width="26" height="16" rx="4" fill="#F37021"/>
  <rect x="38" y="96" width="42" height="28" fill="#005CA9" stroke-width="4"/>
  <ellipse cx="59" cy="110" rx="9" ry="6" fill="#fff" stroke="none"/>
</g>`,
  "lapis": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M36 118 L58 66 L108 46 L160 72 L168 124 L122 162 L66 158 Z" fill="#2548B5"/>
  <path d="M58 66 L84 96 L108 46 M84 96 L36 118 M84 96 L126 110 L160 72 M126 110 L122 162 M126 110 L168 124 M84 96 L66 158" fill="none" stroke="#4f7fe0" stroke-width="3.5"/>
  <g fill="#FFD100" stroke="none"><circle cx="76" cy="84" r="4"/><circle cx="112" cy="84" r="3.5"/><circle cx="102" cy="132" r="4"/><circle cx="142" cy="102" r="3.5"/><circle cx="70" cy="128" r="3"/><circle cx="138" cy="136" r="3"/></g>
</g>`,
  "cave-painting": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M20 160 Q10 80 40 50 Q70 20 120 28 Q172 30 186 80 Q196 130 176 164 Q100 184 20 160 Z" fill="#8a6a4a"/>
  <g fill="none" stroke="#2a1a10" stroke-width="5">
    <ellipse cx="86" cy="104" rx="30" ry="16" fill="#2a1a10"/><ellipse cx="62" cy="92" rx="12" ry="9" fill="#2a1a10"/>
    <path d="M72 118 V140 M86 120 V142 M100 120 V142 M110 114 V136"/>
    <path d="M56 84 L50 66 L58 70 M62 82 L66 62 L70 68"/>
  </g>
  <g fill="#C0392B" stroke="#7a1f14" stroke-width="3.5">
    <ellipse cx="146" cy="108" rx="14" ry="16"/>
    <ellipse cx="134" cy="84" rx="4" ry="11" transform="rotate(-12 134 84)"/><ellipse cx="144" cy="80" rx="4" ry="12"/><ellipse cx="154" cy="82" rx="4" ry="11" transform="rotate(10 154 82)"/><ellipse cx="163" cy="90" rx="4" ry="10" transform="rotate(24 163 90)"/>
    <ellipse cx="128" cy="100" rx="4" ry="9" transform="rotate(-50 128 100)"/>
  </g>
</g>`,
  "rainbow": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M16 150 A84 84 0 0 1 184 150 Z" fill="#E63B2E"/>
  <path d="M30 150 A70 70 0 0 1 170 150 Z" fill="#F37021"/>
  <path d="M44 150 A56 56 0 0 1 156 150 Z" fill="#FFD100"/>
  <path d="M58 150 A42 42 0 0 1 142 150 Z" fill="#008D36"/>
  <path d="M72 150 A28 28 0 0 1 128 150 Z" fill="#005CA9"/>
  <path d="M86 150 A14 14 0 0 1 114 150 Z" fill="#fff"/>
  <g fill="#fff" stroke-width="5"><circle cx="24" cy="152" r="14"/><circle cx="44" cy="160" r="12"/><circle cx="176" cy="152" r="14"/><circle cx="156" cy="160" r="12"/></g>
  <g fill="#fff" stroke="none"><circle cx="24" cy="152" r="9"/><circle cx="176" cy="152" r="9"/></g>
</g>`,
  "pixels": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <g fill="#E63B2E" stroke-width="3.5">
    <rect x="37" y="45" width="18" height="18"/><rect x="55" y="45" width="18" height="18"/><rect x="109" y="45" width="18" height="18"/><rect x="127" y="45" width="18" height="18"/>
    <rect x="19" y="63" width="18" height="18"/><rect x="37" y="63" width="18" height="18"/><rect x="55" y="63" width="18" height="18"/><rect x="73" y="63" width="18" height="18"/><rect x="91" y="63" width="18" height="18"/><rect x="109" y="63" width="18" height="18"/><rect x="127" y="63" width="18" height="18"/><rect x="145" y="63" width="18" height="18"/><rect x="163" y="63" width="18" height="18"/>
  </g>
  <g fill="#E63B2E" stroke-width="3.5">
    <rect x="19" y="81" width="18" height="18"/><rect x="37" y="81" width="18" height="18"/><rect x="55" y="81" width="18" height="18"/><rect x="73" y="81" width="18" height="18"/><rect x="91" y="81" width="18" height="18"/><rect x="109" y="81" width="18" height="18"/><rect x="127" y="81" width="18" height="18"/><rect x="145" y="81" width="18" height="18"/><rect x="163" y="81" width="18" height="18"/>
    <rect x="37" y="99" width="18" height="18"/><rect x="55" y="99" width="18" height="18"/><rect x="73" y="99" width="18" height="18"/><rect x="91" y="99" width="18" height="18"/><rect x="109" y="99" width="18" height="18"/><rect x="127" y="99" width="18" height="18"/><rect x="145" y="99" width="18" height="18"/>
    <rect x="55" y="117" width="18" height="18"/><rect x="73" y="117" width="18" height="18"/><rect x="91" y="117" width="18" height="18"/><rect x="109" y="117" width="18" height="18"/><rect x="127" y="117" width="18" height="18"/>
    <rect x="73" y="135" width="18" height="18"/><rect x="91" y="135" width="18" height="18"/><rect x="109" y="135" width="18" height="18"/>
    <rect x="91" y="153" width="18" height="18"/>
  </g>
  <g fill="#fff" stroke="none" opacity=".8"><rect x="43" y="51" width="6" height="6"/><rect x="115" y="51" width="6" height="6"/></g>
</g>`,
  "sunflowers": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M78 96 Q72 130 90 148 M126 90 Q132 130 112 148 M102 78 Q100 120 100 148" fill="none" stroke="#008D36" stroke-width="7"/>
  <path d="M70 150 H130 Q134 150 134 156 L128 184 Q126 188 120 188 H80 Q74 188 72 184 L66 156 Q66 150 70 150 Z" fill="#F37021"/>
<ellipse cx="70" cy="60" rx="8" ry="13" transform="rotate(0 70 82)" fill="#FFD100" stroke-width="4"/>
<ellipse cx="70" cy="60" rx="8" ry="13" transform="rotate(36 70 82)" fill="#FFD100" stroke-width="4"/>
<ellipse cx="70" cy="60" rx="8" ry="13" transform="rotate(72 70 82)" fill="#FFD100" stroke-width="4"/>
<ellipse cx="70" cy="60" rx="8" ry="13" transform="rotate(108 70 82)" fill="#FFD100" stroke-width="4"/>
<ellipse cx="70" cy="60" rx="8" ry="13" transform="rotate(144 70 82)" fill="#FFD100" stroke-width="4"/>
<ellipse cx="70" cy="60" rx="8" ry="13" transform="rotate(180 70 82)" fill="#FFD100" stroke-width="4"/>
<ellipse cx="70" cy="60" rx="8" ry="13" transform="rotate(216 70 82)" fill="#FFD100" stroke-width="4"/>
<ellipse cx="70" cy="60" rx="8" ry="13" transform="rotate(252 70 82)" fill="#FFD100" stroke-width="4"/>
<ellipse cx="70" cy="60" rx="8" ry="13" transform="rotate(288 70 82)" fill="#FFD100" stroke-width="4"/>
<ellipse cx="70" cy="60" rx="8" ry="13" transform="rotate(324 70 82)" fill="#FFD100" stroke-width="4"/>
<circle cx="70" cy="82" r="14" fill="#6b3b1e" stroke-width="4"/>
<ellipse cx="130" cy="56" rx="8" ry="13" transform="rotate(0 130 78)" fill="#FFD100" stroke-width="4"/>
<ellipse cx="130" cy="56" rx="8" ry="13" transform="rotate(36 130 78)" fill="#FFD100" stroke-width="4"/>
<ellipse cx="130" cy="56" rx="8" ry="13" transform="rotate(72 130 78)" fill="#FFD100" stroke-width="4"/>
<ellipse cx="130" cy="56" rx="8" ry="13" transform="rotate(108 130 78)" fill="#FFD100" stroke-width="4"/>
<ellipse cx="130" cy="56" rx="8" ry="13" transform="rotate(144 130 78)" fill="#FFD100" stroke-width="4"/>
<ellipse cx="130" cy="56" rx="8" ry="13" transform="rotate(180 130 78)" fill="#FFD100" stroke-width="4"/>
<ellipse cx="130" cy="56" rx="8" ry="13" transform="rotate(216 130 78)" fill="#FFD100" stroke-width="4"/>
<ellipse cx="130" cy="56" rx="8" ry="13" transform="rotate(252 130 78)" fill="#FFD100" stroke-width="4"/>
<ellipse cx="130" cy="56" rx="8" ry="13" transform="rotate(288 130 78)" fill="#FFD100" stroke-width="4"/>
<ellipse cx="130" cy="56" rx="8" ry="13" transform="rotate(324 130 78)" fill="#FFD100" stroke-width="4"/>
<circle cx="130" cy="78" r="14" fill="#6b3b1e" stroke-width="4"/>
<ellipse cx="100" cy="34" rx="8" ry="13" transform="rotate(0 100 56)" fill="#FFD100" stroke-width="4"/>
<ellipse cx="100" cy="34" rx="8" ry="13" transform="rotate(36 100 56)" fill="#FFD100" stroke-width="4"/>
<ellipse cx="100" cy="34" rx="8" ry="13" transform="rotate(72 100 56)" fill="#FFD100" stroke-width="4"/>
<ellipse cx="100" cy="34" rx="8" ry="13" transform="rotate(108 100 56)" fill="#FFD100" stroke-width="4"/>
<ellipse cx="100" cy="34" rx="8" ry="13" transform="rotate(144 100 56)" fill="#FFD100" stroke-width="4"/>
<ellipse cx="100" cy="34" rx="8" ry="13" transform="rotate(180 100 56)" fill="#FFD100" stroke-width="4"/>
<ellipse cx="100" cy="34" rx="8" ry="13" transform="rotate(216 100 56)" fill="#FFD100" stroke-width="4"/>
<ellipse cx="100" cy="34" rx="8" ry="13" transform="rotate(252 100 56)" fill="#FFD100" stroke-width="4"/>
<ellipse cx="100" cy="34" rx="8" ry="13" transform="rotate(288 100 56)" fill="#FFD100" stroke-width="4"/>
<ellipse cx="100" cy="34" rx="8" ry="13" transform="rotate(324 100 56)" fill="#FFD100" stroke-width="4"/>
<circle cx="100" cy="56" r="14" fill="#6b3b1e" stroke-width="4"/>
</g>`,
  "pencil": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <g transform="rotate(35 100 100)">
    <rect x="82" y="10" width="36" height="22" rx="8" fill="#F6879B"/>
    <rect x="82" y="32" width="36" height="14" fill="#9aa3ad"/><path d="M82 39 H118" fill="none" stroke-width="3"/>
    <rect x="82" y="46" width="36" height="96" fill="#FFD100"/>
    <path d="M100 46 V142" fill="none" stroke="#F6C45A" stroke-width="4"/>
    <path d="M82 142 L118 142 L100 180 Z" fill="#F6C9A0"/>
    <path d="M92 162 L108 162 L100 180 Z" fill="#3a3a3a" stroke-width="3.5"/>
  </g>
</g>`,
  "statue": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <rect x="54" y="162" width="92" height="24" rx="4" fill="#cfcac0"/>
  <rect x="78" y="112" width="20" height="52" rx="8" fill="#E8E6E1"/><rect x="102" y="112" width="20" height="52" rx="8" fill="#E8E6E1"/>
  <ellipse cx="64" cy="108" rx="10" ry="28" transform="rotate(6 64 108)" fill="#E8E6E1"/>
  <path d="M68 80 Q100 70 132 80 L124 126 Q100 134 76 126 Z" fill="#E8E6E1"/>
  <path d="M84 100 Q100 108 116 100" fill="none" stroke="#bdb8ad" stroke-width="3.5"/>
  <path d="M132 92 Q148 78 130 58" fill="none" stroke-width="20"/><path d="M132 92 Q148 78 130 58" fill="none" stroke="#E8E6E1" stroke-width="10"/>
  <rect x="92" y="62" width="16" height="16" rx="5" fill="#E8E6E1" stroke-width="4"/>
  <circle cx="100" cy="50" r="19" fill="#E8E6E1"/>
  <path d="M80 48 Q80 26 100 26 Q120 26 120 48 Q112 38 100 40 Q88 38 80 48 Z" fill="#E8E6E1" stroke-width="4.5"/>
  <circle cx="93" cy="52" r="2.5" fill="#000" stroke="none"/><circle cx="107" cy="52" r="2.5" fill="#000" stroke="none"/>
  <path d="M95 61 Q100 64 105 61" fill="none" stroke-width="3"/>
</g>`,
  "color-wheel": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M100 100 L100 30 A70 70 0 0 1 160.6 65 Z" fill="#E63B2E"/>
  <path d="M100 100 L160.6 65 A70 70 0 0 1 160.6 135 Z" fill="#F37021"/>
  <path d="M100 100 L160.6 135 A70 70 0 0 1 100 170 Z" fill="#FFD100"/>
  <path d="M100 100 L100 170 A70 70 0 0 1 39.4 135 Z" fill="#008D36"/>
  <path d="M100 100 L39.4 135 A70 70 0 0 1 39.4 65 Z" fill="#005CA9"/>
  <path d="M100 100 L39.4 65 A70 70 0 0 1 100 30 Z" fill="#7a3fa0"/>
  <circle cx="100" cy="100" r="14" fill="#fff"/>
</g>`,
  "paper": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M44 28 H156 V140 L128 172 H44 Z" fill="#FFF3C4"/>
  <path d="M156 140 L128 140 L128 172 Z" fill="#E6D3A3"/>
  <path d="M60 56 H140 M60 76 H140 M60 96 H140 M60 116 H112" fill="none" stroke="#9aa3ad" stroke-width="4"/>
  <rect x="60" y="136" width="22" height="22" rx="3" fill="#E63B2E" stroke-width="4"/>
</g>`,
  "film-strip": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <rect x="8" y="52" width="184" height="96" rx="6" fill="#1a1a1a"/>
  <g fill="#fff" stroke="none"><rect x="16" y="58" width="12" height="8"/><rect x="40" y="58" width="12" height="8"/><rect x="64" y="58" width="12" height="8"/><rect x="88" y="58" width="12" height="8"/><rect x="112" y="58" width="12" height="8"/><rect x="136" y="58" width="12" height="8"/><rect x="160" y="58" width="12" height="8"/>
  <rect x="16" y="134" width="12" height="8"/><rect x="40" y="134" width="12" height="8"/><rect x="64" y="134" width="12" height="8"/><rect x="88" y="134" width="12" height="8"/><rect x="112" y="134" width="12" height="8"/><rect x="136" y="134" width="12" height="8"/><rect x="160" y="134" width="12" height="8"/></g>
  <g fill="#fff" stroke-width="3.5"><rect x="18" y="72" width="48" height="56"/><rect x="76" y="72" width="48" height="56"/><rect x="134" y="72" width="48" height="56"/></g>
  <g fill="#F37021" stroke-width="3.5"><circle cx="42" cy="86" r="9"/><ellipse cx="100" cy="112" rx="11" ry="8"/><circle cx="158" cy="92" r="9"/></g>
</g>`,
  "mural": `<defs><clipPath id="wallClip"><rect x="20" y="30" width="160" height="140" rx="6"/></clipPath></defs><g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <rect x="20" y="30" width="160" height="140" rx="6" fill="#E0A85C"/>
  <g clip-path="url(#wallClip)" fill="none" stroke="#B9803A" stroke-width="3">
    <path d="M20 58 H180 M20 86 H180 M20 114 H180 M20 142 H180 M50 30 V58 M110 30 V58 M150 58 V86 M80 58 V86 M50 86 V114 M110 86 V114 M150 114 V142 M80 114 V142 M50 142 V170 M110 142 V170"/>
  </g>
  <rect x="44" y="44" width="112" height="112" rx="10" fill="#9ED8F0"/>
  <circle cx="122" cy="72" r="14" fill="#FFD100" stroke-width="4"/>
  <path d="M44 150 Q74 100 104 130 Q130 108 156 134 V146 Q156 156 146 156 H54 Q44 156 44 146 Z" fill="#008D36" stroke-width="5"/>
  <path d="M60 80 Q58 68 72 68 Q78 58 90 64 Q102 62 100 76 Q104 86 90 86 H70 Q58 88 60 80 Z" fill="#fff" stroke-width="4"/>
  <rect x="44" y="44" width="112" height="112" rx="10" fill="none"/>
</g>`
};
