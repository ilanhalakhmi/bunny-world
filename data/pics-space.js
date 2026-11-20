// Fact Detective pictures (flat Frooky-style SVG). Each entry is the inside of a 200x200 <svg viewBox="0 0 200 200">.
// Use: facts reference these by name with the `pic` field, e.g. pic: "giraffe".
const PICS_SPACE = {
  "sun": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <g fill="#F37021" stroke-width="5"><path id="ray" d="M91 50 L100 14 L109 50 Z"/>
    <path d="M91 50 L100 14 L109 50 Z" transform="rotate(30 100 100)"/><path d="M91 50 L100 14 L109 50 Z" transform="rotate(60 100 100)"/>
    <path d="M91 50 L100 14 L109 50 Z" transform="rotate(90 100 100)"/><path d="M91 50 L100 14 L109 50 Z" transform="rotate(120 100 100)"/>
    <path d="M91 50 L100 14 L109 50 Z" transform="rotate(150 100 100)"/><path d="M91 50 L100 14 L109 50 Z" transform="rotate(180 100 100)"/>
    <path d="M91 50 L100 14 L109 50 Z" transform="rotate(210 100 100)"/><path d="M91 50 L100 14 L109 50 Z" transform="rotate(240 100 100)"/>
    <path d="M91 50 L100 14 L109 50 Z" transform="rotate(270 100 100)"/><path d="M91 50 L100 14 L109 50 Z" transform="rotate(300 100 100)"/>
    <path d="M91 50 L100 14 L109 50 Z" transform="rotate(330 100 100)"/></g>
  <circle cx="100" cy="100" r="50" fill="#FFD100"/>
  <circle cx="84" cy="92" r="5" fill="#000" stroke="none"/><circle cx="116" cy="92" r="5" fill="#000" stroke="none"/>
  <path d="M84 112 Q100 128 116 112" fill="none" stroke-width="5"/>
  <ellipse cx="72" cy="108" rx="9" ry="6" fill="#F37021" stroke="none" opacity=".6"/><ellipse cx="128" cy="108" rx="9" ry="6" fill="#F37021" stroke="none" opacity=".6"/>
</g>`,
  "moon": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <circle cx="100" cy="100" r="64" fill="#FFF3C4"/>
  <g fill="#F0E2A8" stroke-width="4"><circle cx="76" cy="78" r="14"/><circle cx="124" cy="106" r="18"/><circle cx="84" cy="128" r="9"/><circle cx="118" cy="66" r="7"/></g>
</g>`,
  "earth": `<defs><clipPath id="earthClip"><circle cx="100" cy="100" r="62"/></clipPath></defs><g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <circle cx="100" cy="100" r="62" fill="#005CA9"/>
  <g clip-path="url(#earthClip)" stroke="none" fill="#008D36">
    <path d="M60 66 Q82 46 104 62 Q100 82 114 94 Q96 118 76 106 Q52 92 60 66 Z"/>
    <path d="M122 112 Q150 98 156 128 Q146 156 124 148 Q112 128 122 112 Z"/>
    <path d="M72 138 Q86 130 92 146 Q82 160 70 152 Z"/>
  </g>
  <circle cx="100" cy="100" r="62" fill="none"/>
</g>`,
  "mercury": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <circle cx="100" cy="100" r="46" fill="#9aa3ad"/>
  <g fill="#7d8791" stroke-width="4"><circle cx="82" cy="84" r="10"/><circle cx="116" cy="112" r="12"/><circle cx="90" cy="120" r="6"/><circle cx="120" cy="80" r="5"/></g>
</g>`,
  "venus": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <circle cx="100" cy="100" r="54" fill="#F6C45A"/>
  <g fill="none" stroke="#fff" stroke-width="5" opacity=".9"><path d="M60 82 Q80 70 100 82 T140 82"/><path d="M52 104 Q76 92 100 104 T148 104"/><path d="M62 128 Q82 118 102 128 T138 126"/></g>
</g>`,
  "mars": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <circle cx="100" cy="100" r="50" fill="#D9501E"/>
  <ellipse cx="100" cy="64" rx="20" ry="8" fill="#fff" stroke-width="3.5"/>
  <g fill="#B8431A" stroke-width="4"><ellipse cx="84" cy="100" rx="12" ry="8"/><circle cx="120" cy="116" r="10"/><circle cx="96" cy="128" r="6"/><circle cx="124" cy="88" r="5"/></g>
</g>`,
  "jupiter": `<defs><clipPath id="jupClip"><circle cx="100" cy="100" r="66"/></clipPath></defs><g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <circle cx="100" cy="100" r="66" fill="#FFE0B0"/>
  <g clip-path="url(#jupClip)" stroke="none">
    <rect x="30" y="56" width="140" height="16" fill="#F6A27A"/><rect x="30" y="82" width="140" height="14" fill="#F37021"/>
    <rect x="30" y="112" width="140" height="16" fill="#F6C45A"/><rect x="30" y="138" width="140" height="12" fill="#F6A27A"/>
  </g>
  <ellipse cx="122" cy="116" rx="16" ry="10" fill="#D8452A" stroke-width="4"/>
  <circle cx="100" cy="100" r="66" fill="none"/>
</g>`,
  "saturn": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <g transform="rotate(-20 100 100)" fill="none">
    <ellipse cx="100" cy="100" rx="84" ry="24" stroke-width="20"/><ellipse cx="100" cy="100" rx="84" ry="24" stroke="#FFD100" stroke-width="9"/>
  </g>
  <circle cx="100" cy="100" r="44" fill="#F6C45A"/>
  <g transform="rotate(-20 100 100)" fill="none">
    <path d="M16 100 A84 24 0 0 0 184 100" stroke-width="20"/><path d="M16 100 A84 24 0 0 0 184 100" stroke="#FFD100" stroke-width="9"/>
  </g>
</g>`,
  "uranus": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <g fill="none"><ellipse cx="100" cy="100" rx="22" ry="84" stroke-width="12"/><ellipse cx="100" cy="100" rx="22" ry="84" stroke="#fff" stroke-width="4"/></g>
  <circle cx="100" cy="100" r="46" fill="#7FD1D6"/>
  <g fill="none"><path d="M100 16 A22 84 0 0 1 100 184" stroke-width="12"/><path d="M100 16 A22 84 0 0 1 100 184" stroke="#fff" stroke-width="4"/></g>
</g>`,
  "pluto": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <circle cx="100" cy="100" r="40" fill="#C9A98A"/>
  <path d="M96 116 C80 104 80 88 90 88 C95 88 98 91 100 94 C102 91 105 88 110 88 C120 88 120 104 104 116 L100 120 Z" fill="#FFF3E0" stroke-width="3.5"/>
  <g fill="#A8896B" stroke-width="3.5"><circle cx="76" cy="110" r="6"/><circle cx="124" cy="78" r="5"/></g>
</g>`,
  "astronaut": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <rect x="60" y="102" width="80" height="66" rx="14" fill="#cfd8e3"/>
  <rect x="80" y="160" width="18" height="30" rx="8" fill="#fff"/><rect x="102" y="160" width="18" height="30" rx="8" fill="#fff"/>
  <ellipse cx="89" cy="192" rx="15" ry="7" fill="#9aa3ad"/><ellipse cx="111" cy="192" rx="15" ry="7" fill="#9aa3ad"/>
  <rect x="74" y="104" width="52" height="62" rx="16" fill="#fff"/>
  <rect x="86" y="122" width="28" height="18" rx="4" fill="#fff" stroke-width="4"/>
  <g stroke="none"><circle cx="92" cy="131" r="3" fill="#F37021"/><circle cx="100" cy="131" r="3" fill="#FFD100"/><circle cx="108" cy="131" r="3" fill="#005CA9"/></g>
  <ellipse cx="62" cy="130" rx="12" ry="28" transform="rotate(18 62 130)" fill="#fff"/><ellipse cx="138" cy="130" rx="12" ry="28" transform="rotate(-18 138 130)" fill="#fff"/>
  <circle cx="100" cy="70" r="42" fill="#fff"/>
  <ellipse cx="100" cy="72" rx="30" ry="24" fill="#005CA9"/>
  <path d="M82 62 Q90 54 100 56" fill="none" stroke="#fff" stroke-width="5"/>
</g>`,
  "space-station": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <rect x="14" y="96" width="172" height="10" rx="3" fill="#9aa3ad"/>
  <g fill="#005CA9" stroke-width="5"><rect x="18" y="52" width="38" height="38"/><rect x="64" y="52" width="38" height="38"/><rect x="98" y="112" width="38" height="38"/><rect x="144" y="112" width="38" height="38"/></g>
  <g fill="none" stroke="#fff" stroke-width="2.5"><path d="M37 54 V88 M83 54 V88 M117 114 V148 M163 114 V148 M20 71 H54 M66 71 H100 M100 131 H134 M146 131 H180"/></g>
  <rect x="72" y="84" width="56" height="34" rx="12" fill="#fff"/>
  <rect x="72" y="96" width="56" height="10" fill="#F37021" stroke="none"/>
  <circle cx="100" cy="101" r="7" fill="#fff" stroke-width="4"/>
</g>`,
  "shooting-star": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M120 90 L20 172 L62 112 Z" fill="#F37021"/>
  <path d="M120 98 L50 164 L78 114 Z" fill="#FFD100" stroke="none"/>
  <path d="M146 40 L158 70 L190 72 L165 92 L174 124 L146 106 L118 124 L127 92 L102 72 L134 70 Z" fill="#FFD100"/>
</g>`,
  "great-wall": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M10 172 Q40 96 90 124 Q130 64 190 112 V184 Q190 192 182 192 H18 Q10 192 10 184 Z" fill="#7BC47F"/>
  <path d="M8 156 L52 124 L92 134 L134 96 L172 104 L182 94" fill="none" stroke-width="26"/>
  <path d="M8 156 L52 124 L92 134 L134 96 L172 104 L182 94" fill="none" stroke="#C8A27A" stroke-width="16"/>
  <g fill="#C8A27A" stroke-width="4"><rect x="40" y="96" width="24" height="30"/><rect x="122" y="68" width="24" height="30"/></g>
  <path d="M40 96 V90 H46 V96 M52 96 V90 H58 V96 M122 68 V62 H128 V68 M134 68 V62 H140 V68" fill="none" stroke-width="4"/>
</g>`,
  "rocket": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M82 142 Q100 192 118 142 Z" fill="#F37021"/><path d="M90 144 Q100 172 110 144 Z" fill="#FFD100" stroke="none"/>
  <path d="M70 118 L40 160 L70 142 Z" fill="#F37021"/><path d="M130 118 L160 160 L130 142 Z" fill="#F37021"/>
  <path d="M100 18 Q132 58 132 108 L132 144 L68 144 L68 108 Q68 58 100 18 Z" fill="#fff"/>
  <path d="M100 18 Q118 40 124 62 L76 62 Q82 40 100 18 Z" fill="#F37021"/>
  <circle cx="100" cy="92" r="16" fill="#005CA9"/><circle cx="95" cy="87" r="4" fill="#fff" stroke="none"/>
</g>`
};
