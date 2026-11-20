// Fact Detective pictures (flat Frooky-style SVG). Each entry is the inside of a 200x200 <svg viewBox="0 0 200 200">.
// Use: facts reference these by name with the `pic` field, e.g. pic: "giraffe".
const PICS_FOOD = {
  "tomato": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <ellipse cx="100" cy="116" rx="64" ry="56" fill="#E63B2E"/>
  <path d="M100 66 L86 52 L72 66 L82 74 L66 80 L84 86 L100 78 L116 86 L134 80 L118 74 L128 66 L114 52 Z" fill="#008D36"/>
  <path d="M100 66 V44" fill="none" stroke-width="7"/>
  <path d="M60 108 Q64 92 78 86" fill="none" stroke="#fff" stroke-width="6" opacity=".8"/>
</g>`,
  "honey": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M62 76 H138 Q150 76 150 90 V160 Q150 176 134 176 H66 Q50 176 50 160 V90 Q50 76 62 76 Z" fill="#FFD100"/>
  <rect x="56" y="56" width="88" height="22" rx="6" fill="#F37021"/>
  <rect x="64" y="100" width="72" height="50" rx="8" fill="#fff"/>
  <path d="M100 112 L112 119 V133 L100 140 L88 133 V119 Z" fill="#FFD100" stroke-width="4"/>
  <path d="M60 80 Q58 98 64 104" fill="none" stroke="#fff" stroke-width="5" opacity=".7"/>
</g>`,
  "chocolate": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <rect x="48" y="30" width="104" height="150" rx="10" fill="#6b3b1e"/>
  <path d="M48 70 H152 M48 110 H152 M82 30 V120 M118 30 V120" fill="none" stroke-width="4"/>
  <path d="M44 120 H156 V172 Q156 182 146 182 H54 Q44 182 44 172 Z" fill="#FFD100"/>
  <path d="M44 120 L52 108 L64 120 L76 108 L88 120 L100 108 L112 120 L124 108 L136 120 L148 108 L156 120" fill="#FFD100"/>
  <rect x="62" y="136" width="76" height="22" rx="6" fill="#fff" stroke-width="4"/>
  <circle cx="100" cy="147" r="5" fill="#6b3b1e" stroke="none"/>
</g>`,
  "popcorn": `<defs><clipPath id="bucketClip"><path d="M52 104 L148 104 L136 182 L64 182 Z"/></clipPath></defs><g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <g fill="#FFF8DC" stroke-width="5"><circle cx="60" cy="82" r="20"/><circle cx="98" cy="62" r="24"/><circle cx="140" cy="82" r="20"/><circle cx="80" cy="96" r="18"/><circle cx="120" cy="96" r="18"/></g>
  <g fill="#FFD100" stroke="none"><circle cx="56" cy="78" r="5"/><circle cx="102" cy="58" r="6"/><circle cx="142" cy="80" r="5"/><circle cx="84" cy="94" r="5"/><circle cx="118" cy="94" r="5"/></g>
  <path d="M52 104 L148 104 L136 182 L64 182 Z" fill="#fff"/>
  <g clip-path="url(#bucketClip)" stroke="none" fill="#E63B2E"><rect x="60" y="100" width="18" height="90"/><rect x="96" y="100" width="18" height="90"/><rect x="132" y="100" width="18" height="90"/></g>
  <path d="M52 104 L148 104 L136 182 L64 182 Z" fill="none"/>
</g>`,
  "rice": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M40 104 Q100 22 160 104 Z" fill="#fff"/>
  <g fill="none" stroke-width="3.5"><path d="M72 84 l8 -4 M96 70 l8 2 M120 82 l8 4 M84 98 l8 -2 M108 92 l8 3 M140 98 l6 2 M60 96 l6 -3"/></g>
  <path d="M26 104 H174 Q172 176 100 178 Q28 176 26 104 Z" fill="#005CA9"/>
  <path d="M130 40 L172 150 M146 36 L184 140" fill="none" stroke="#F37021" stroke-width="6"/>
</g>`,
  "yogurt": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M58 82 H142 L130 176 H70 Z" fill="#fff"/>
  <path d="M60 108 H140 L136 144 H64 Z" fill="#005CA9"/>
  <path d="M100 138 C84 126 86 114 94 114 C98 114 100 117 100 120 C100 117 102 114 106 114 C114 114 116 126 100 138 Z" fill="#fff" stroke-width="3"/>
  <rect x="52" y="66" width="96" height="18" rx="6" fill="#9aa3ad"/>
</g>`,
  "watermelon": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M18 70 A82 82 0 0 0 182 70 Z" fill="#008D36"/>
  <path d="M30 70 A70 70 0 0 0 170 70 Z" fill="#fff" stroke-width="3"/>
  <path d="M36 70 A64 64 0 0 0 164 70 Z" fill="#E63B2E" stroke-width="3"/>
  <g fill="#1a1a1a" stroke="none"><ellipse cx="70" cy="96" rx="4" ry="7"/><ellipse cx="100" cy="116" rx="4" ry="7"/><ellipse cx="130" cy="96" rx="4" ry="7"/><ellipse cx="84" cy="126" rx="4" ry="7"/><ellipse cx="116" cy="136" rx="4" ry="7"/></g>
</g>`,
  "pizza": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M100 182 L28 58 Q100 28 172 58 Z" fill="#FFD100"/>
  <path d="M26 56 Q100 24 174 56 Q176 74 168 80 Q100 52 32 80 Q24 74 26 56 Z" fill="#E0A85C"/>
  <g fill="#E63B2E" stroke-width="4"><circle cx="100" cy="100" r="12"/><circle cx="72" cy="88" r="9"/><circle cx="130" cy="88" r="9"/><circle cx="100" cy="140" r="8"/></g>
  <g fill="#008D36" stroke="none"><circle cx="86" cy="118" r="4"/><circle cx="116" cy="120" r="4"/><circle cx="100" cy="76" r="4"/></g>
</g>`,
  "strawberry": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M100 180 C34 146 34 78 100 84 C166 78 166 146 100 180 Z" fill="#E63B2E"/>
  <g fill="#FFD100" stroke="none"><ellipse cx="74" cy="108" rx="3" ry="4.5"/><ellipse cx="100" cy="102" rx="3" ry="4.5"/><ellipse cx="126" cy="108" rx="3" ry="4.5"/><ellipse cx="86" cy="130" rx="3" ry="4.5"/><ellipse cx="114" cy="130" rx="3" ry="4.5"/><ellipse cx="100" cy="152" rx="3" ry="4.5"/><ellipse cx="68" cy="132" rx="3" ry="4.5"/><ellipse cx="132" cy="132" rx="3" ry="4.5"/></g>
  <path d="M100 84 L84 68 L70 80 L84 88 L66 96 L88 98 L100 90 L112 98 L134 96 L116 88 L130 80 L116 68 Z" fill="#008D36" stroke-width="5"/>
  <path d="M100 82 V56" fill="none" stroke-width="7"/>
</g>`,
  "milk": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M138 96 Q172 96 172 120 Q172 144 138 142" fill="none" stroke-width="18"/>
  <path d="M138 96 Q172 96 172 120 Q172 144 138 142" fill="none" stroke="#fff" stroke-width="6"/>
  <path d="M84 56 H116 V70 Q144 76 144 104 V164 Q144 182 126 182 H74 Q56 182 56 164 V104 Q56 76 84 70 Z" fill="#fff"/>
  <rect x="56" y="112" width="88" height="42" fill="#005CA9" stroke-width="5"/>
  <path d="M100 118 C88 132 90 144 100 147 C110 144 112 132 100 118 Z" fill="#fff" stroke-width="3.5"/>
  <rect x="78" y="34" width="44" height="24" rx="7" fill="#005CA9"/>
  <path d="M72 94 Q70 106 72 120" fill="none" stroke="#9ec9f0" stroke-width="5" opacity=".9"/>
</g>`,
  "banana": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M56 48 Q26 172 176 154 Q104 126 80 48 Z" fill="#FFD100"/>
  <path d="M64 70 Q60 140 150 150" fill="none" stroke="#F6C45A" stroke-width="4"/>
  <rect x="54" y="30" width="26" height="22" rx="5" fill="#8a5a2b" stroke-width="5"/>
  <path d="M170 150 L184 156 L174 160 Z" fill="#3a2a1a" stroke-width="4"/>
</g>`,
  "carrot": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <g transform="rotate(25 100 110)">
    <ellipse cx="82" cy="42" rx="9" ry="22" transform="rotate(-20 82 42)" fill="#008D36"/><ellipse cx="100" cy="36" rx="9" ry="24" fill="#008D36"/><ellipse cx="118" cy="42" rx="9" ry="22" transform="rotate(20 118 42)" fill="#008D36"/>
    <path d="M70 62 Q100 50 130 62 L106 186 Q100 194 94 186 Z" fill="#F37021"/>
    <path d="M78 88 H98 M108 108 H124 M82 124 H98 M96 150 H106" fill="none" stroke-width="4"/>
  </g>
</g>`,
  "candy": `<defs><clipPath id="candyClip"><ellipse cx="100" cy="100" rx="42" ry="32"/></clipPath></defs><g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M62 100 L26 66 Q16 100 26 134 Z" fill="#FFD100"/>
  <path d="M138 100 L174 66 Q184 100 174 134 Z" fill="#FFD100"/>
  <path d="M54 100 L30 80 M54 100 L28 100 M54 100 L30 120 M146 100 L170 80 M146 100 L172 100 M146 100 L170 120" fill="none" stroke-width="3.5"/>
  <ellipse cx="100" cy="100" rx="42" ry="32" fill="#F6879B"/>
  <g clip-path="url(#candyClip)" stroke="none" fill="#fff"><rect x="60" y="56" width="10" height="90" transform="rotate(30 100 100)"/><rect x="88" y="56" width="10" height="90" transform="rotate(30 100 100)"/><rect x="116" y="56" width="10" height="90" transform="rotate(30 100 100)"/></g>
  <ellipse cx="100" cy="100" rx="42" ry="32" fill="none"/>
  <path d="M74 84 Q80 76 90 74" fill="none" stroke="#fff" stroke-width="5" opacity=".9"/>
</g>`,
  "gum": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <g transform="rotate(-10 100 110)">
    <rect x="104" y="36" width="34" height="68" rx="4" fill="#FFF3C4"/>
    <path d="M104 50 H138" fill="none" stroke-width="4"/>
    <rect x="62" y="30" width="34" height="74" rx="4" fill="#F6879B"/>
    <path d="M62 46 H96" fill="none" stroke-width="4"/>
    <rect x="40" y="84" width="120" height="92" rx="10" fill="#005CA9"/>
    <rect x="40" y="112" width="120" height="36" fill="#fff" stroke-width="4"/>
    <circle cx="100" cy="130" r="12" fill="#F6879B" stroke-width="4"/>
    <circle cx="96" cy="126" r="3" fill="#fff" stroke="none"/>
    <path d="M52 100 H74 M126 100 H148 M52 162 H74 M126 162 H148" fill="none" stroke="#fff" stroke-width="4"/>
  </g>
</g>`,
  "mushroom": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <rect x="76" y="94" width="48" height="76" rx="16" fill="#FFF3C4"/>
  <path d="M24 100 Q24 34 100 34 Q176 34 176 100 Q100 112 24 100 Z" fill="#D9A066"/>
  <g fill="#FFF3C4" stroke-width="4"><circle cx="64" cy="76" r="9"/><circle cx="110" cy="58" r="11"/><circle cx="140" cy="84" r="8"/></g>
</g>`,
  "peanut": `<defs><clipPath id="peanutClip"><path d="M24 102 Q24 64 62 64 Q90 64 100 84 Q110 64 140 64 Q180 64 180 106 Q180 144 140 144 Q110 144 100 124 Q90 144 62 144 Q24 144 24 102 Z"/></clipPath></defs><g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <g transform="rotate(-18 100 102)">
    <path d="M24 102 Q24 64 62 64 Q90 64 100 84 Q110 64 140 64 Q180 64 180 106 Q180 144 140 144 Q110 144 100 124 Q90 144 62 144 Q24 144 24 102 Z" fill="#E6C28F"/>
    <g clip-path="url(#peanutClip)" fill="none" stroke="#C9A06A" stroke-width="2.5">
      <path d="M10 70 L60 150 M30 60 L90 150 M54 60 L120 150 M80 60 L146 150 M108 60 L174 150 M136 60 L200 140 M10 130 L60 60 M30 150 L100 60 M60 150 L130 60 M90 150 L160 60 M118 150 L190 70 M146 150 L200 90"/>
    </g>
    <path d="M24 102 Q24 64 62 64 Q90 64 100 84 Q110 64 140 64 Q180 64 180 106 Q180 144 140 144 Q110 144 100 124 Q90 144 62 144 Q24 144 24 102 Z" fill="none"/>
    <path d="M44 80 Q52 72 64 72" fill="none" stroke="#fff" stroke-width="5" opacity=".7"/>
  </g>
</g>`,
  "pineapple": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M96 78 Q66 52 58 28 Q88 36 102 78 Z" fill="#008D36" stroke-width="5"/><path d="M104 78 Q134 52 142 28 Q112 36 98 78 Z" fill="#008D36" stroke-width="5"/><path d="M90 78 Q94 40 100 8 Q106 40 110 78 Z" fill="#008D36" stroke-width="5"/>
  <ellipse cx="100" cy="128" rx="46" ry="58" fill="#F6C45A"/>
  <path d="M64 96 L136 160 M58 124 L120 180 M80 82 L142 138 M136 96 L64 160 M142 124 L80 180 M120 82 L58 138" fill="none" stroke="#F37021" stroke-width="3.5"/>
</g>`,
  "egg": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M74 52 C108 52 118 110 112 134 C106 160 42 160 38 128 C34 100 46 52 74 52 Z" fill="#fff"/>
  <path d="M130 66 C162 66 172 120 166 144 C160 170 98 170 94 140 C90 112 102 66 130 66 Z" fill="#C99060"/>
  <path d="M52 78 Q56 66 66 62" fill="none" stroke="#fff" stroke-width="5" opacity="0"/>
  <path d="M112 96 Q116 80 126 76" fill="none" stroke="#fff" stroke-width="5" opacity=".7"/>
</g>`,
  "apple": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M100 72 Q72 50 48 76 Q28 106 50 146 Q70 182 100 170 Q130 182 150 146 Q172 106 152 76 Q128 50 100 72 Z" fill="#E63B2E"/>
  <path d="M100 72 Q98 52 110 38" fill="none" stroke="#8a5a2b" stroke-width="7"/>
  <path d="M112 54 Q132 34 154 48 Q136 66 112 54 Z" fill="#008D36"/>
  <path d="M60 98 Q58 120 66 138" fill="none" stroke="#fff" stroke-width="6" opacity=".7"/>
</g>`,
  "lemon": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <circle cx="34" cy="106" r="10" fill="#FFD100"/><circle cx="166" cy="106" r="10" fill="#FFD100"/>
  <ellipse cx="100" cy="106" rx="66" ry="48" fill="#FFD100"/>
  <path d="M56 80 Q70 64 92 62" fill="none" stroke="#fff" stroke-width="6" opacity=".8"/>
  <path d="M112 58 Q126 36 150 40 Q142 62 112 58 Z" fill="#008D36"/>
  <path d="M112 58 Q124 50 138 46" fill="none" stroke-width="3.5"/>
</g>`,
  "bread": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M26 124 Q26 62 100 62 Q174 62 174 124 Q174 152 156 154 V162 Q156 170 148 170 H52 Q44 170 44 162 V154 Q26 152 26 124 Z" fill="#E0A95F"/>
  <path d="M62 78 L78 112 M96 72 L112 112 M130 78 L146 112" fill="none" stroke="#8a5a2b" stroke-width="6"/>
  <path d="M40 112 Q44 92 58 82" fill="none" stroke="#fff" stroke-width="5" opacity=".6"/>
</g>`,
  "cheese": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M20 150 V108 L180 76 V150 Z" fill="#FFD100"/>
  <path d="M20 108 L100 56 L180 76 Z" fill="#FFE766"/>
  <circle cx="58" cy="128" r="11" fill="#F6C45A" stroke-width="4.5"/>
  <circle cx="112" cy="124" r="8" fill="#F6C45A" stroke-width="4.5"/>
  <circle cx="148" cy="108" r="10" fill="#F6C45A" stroke-width="4.5"/>
  <circle cx="92" cy="104" r="6" fill="#F6C45A" stroke-width="4"/>
</g>`,
  "potato": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M36 112 Q30 70 82 64 Q140 54 166 90 Q184 130 140 150 Q92 170 50 148 Q36 136 36 112 Z" fill="#C99060"/>
  <g fill="#8a5a2b" stroke="none"><ellipse cx="70" cy="100" rx="5" ry="4"/><ellipse cx="112" cy="86" rx="5" ry="4"/><ellipse cx="140" cy="120" rx="5" ry="4"/><ellipse cx="88" cy="134" rx="5" ry="4"/><ellipse cx="60" cy="128" rx="4" ry="3.5"/></g>
  <path d="M54 88 Q64 76 82 74" fill="none" stroke="#fff" stroke-width="5" opacity=".6"/>
</g>`,
  "onion": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M94 162 L88 188 M100 164 V190 M106 162 L114 188" fill="none" stroke-width="4.5"/>
  <path d="M100 38 Q108 56 128 70 Q170 92 160 128 Q150 162 100 166 Q50 162 40 128 Q30 92 72 70 Q92 56 100 38 Z" fill="#B05BA3"/>
  <path d="M100 52 Q76 90 80 160 M100 52 Q124 90 120 160 M100 52 Q64 94 56 140 M100 52 Q136 94 144 140" fill="none" stroke="#E7B4E0" stroke-width="4" opacity=".9"/>
</g>`,
  "salt": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M60 80 H140 L148 164 Q148 176 136 176 H64 Q52 176 52 164 Z" fill="#fff"/>
  <rect x="53" y="112" width="94" height="28" fill="#005CA9" stroke-width="5"/>
  <path d="M60 80 Q60 52 100 50 Q140 52 140 80 Z" fill="#9aa5b1"/>
  <g fill="#000" stroke="none"><circle cx="86" cy="66" r="3"/><circle cx="100" cy="62" r="3"/><circle cx="114" cy="66" r="3"/><circle cx="100" cy="72" r="3"/></g>
  <path d="M68 96 Q66 140 68 162" fill="none" stroke="#9ec9f0" stroke-width="5" opacity=".8"/>
  <g fill="#fff" stroke-width="4"><rect x="22" y="160" width="12" height="12" transform="rotate(14 28 166)"/><rect x="164" y="150" width="10" height="10" transform="rotate(-18 169 155)"/><rect x="172" y="174" width="12" height="12" transform="rotate(8 178 180)"/></g>
</g>`,
  "coconut": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <circle cx="100" cy="106" r="64" fill="#8a5a2b"/>
  <g fill="none" stroke="#5a3a1a" stroke-width="3.5"><path d="M56 70 L48 62 M70 54 L66 44 M92 46 V36 M122 50 L128 40 M144 64 L154 58 M156 92 L168 90 M152 130 L164 136 M130 154 L136 166 M100 166 V178 M66 152 L58 162 M46 124 L34 128 M42 96 L30 94"/></g>
  <g fill="#3a2a1a" stroke-width="3.5"><circle cx="84" cy="94" r="7"/><circle cx="116" cy="94" r="7"/><circle cx="100" cy="118" r="7"/></g>
  <path d="M56 84 Q60 66 76 58" fill="none" stroke="#fff" stroke-width="5" opacity=".35"/>
</g>`,
  "chili": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M40 72 Q96 52 140 98 Q168 130 184 172 Q142 162 106 134 Q62 104 40 72 Z" fill="#E63B2E"/>
  <path d="M46 78 Q30 66 32 44 Q52 48 60 68 Z" fill="#008D36"/>
  <path d="M62 78 Q96 70 124 96" fill="none" stroke="#fff" stroke-width="5" opacity=".7"/>
</g>`,
  "pasta": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <g fill="none" stroke-width="12">
    <path d="M44 112 Q50 52 82 66 Q96 40 118 62 Q146 50 156 112"/>
  </g>
  <g fill="none" stroke="#FFD100" stroke-width="6">
    <path d="M44 112 Q50 52 82 66 Q96 40 118 62 Q146 50 156 112"/>
  </g>
  <g fill="none" stroke-width="10"><path d="M54 112 Q62 74 80 90 Q92 66 108 88 Q130 72 146 112"/></g>
  <g fill="none" stroke="#FFD100" stroke-width="4"><path d="M54 112 Q62 74 80 90 Q92 66 108 88 Q130 72 146 112"/></g>
  <circle cx="100" cy="80" r="12" fill="#E63B2E" stroke-width="4.5"/>
  <path d="M28 112 H172 Q168 170 100 174 Q32 170 28 112 Z" fill="#005CA9"/>
  <path d="M42 126 Q44 144 56 156" fill="none" stroke="#9ec9f0" stroke-width="5" opacity=".8"/>
  <path d="M168 40 V92 M158 40 V62 M178 40 V62 M158 62 Q168 72 178 62" fill="none" stroke-width="5"/>
</g>`
};
