// Fact Detective pictures (flat Frooky-style SVG). Each entry is the inside of a 200x200 <svg viewBox="0 0 200 200">.
// Use: facts reference these by name with the `pic` field, e.g. pic: "giraffe".
const PICS_ANIMALS = {
  "giraffe": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M42 140 Q28 150 32 170" fill="none"/>
  <rect x="58" y="160" width="14" height="30" fill="#FFD100"/><rect x="80" y="160" width="14" height="30" fill="#FFD100"/>
  <rect x="116" y="160" width="14" height="30" fill="#FFD100"/><rect x="138" y="160" width="14" height="30" fill="#FFD100"/>
  <ellipse cx="100" cy="150" rx="58" ry="30" fill="#FFD100"/>
  <path d="M112 138 L120 60 L148 60 L146 140 Z" fill="#FFD100"/>
  <ellipse cx="140" cy="46" rx="26" ry="16" transform="rotate(-6 140 46)" fill="#FFD100"/>
  <path d="M128 34 L126 16 M148 32 L150 14" fill="none"/>
  <circle cx="126" cy="13" r="5" fill="#F37021"/><circle cx="150" cy="11" r="5" fill="#F37021"/>
  <ellipse cx="112" cy="42" rx="10" ry="5" transform="rotate(-25 112 42)" fill="#FFD100"/>
  <circle cx="140" cy="42" r="3.5" fill="#000" stroke="none"/><circle cx="162" cy="52" r="2.2" fill="#000" stroke="none"/>
  <g fill="#F37021" stroke="none"><circle cx="82" cy="146" r="8"/><circle cx="108" cy="162" r="7"/><circle cx="122" cy="142" r="6"/><circle cx="132" cy="100" r="6"/><circle cx="130" cy="80" r="5"/><circle cx="134" cy="122" r="5"/></g>
</g>`,
  "octopus": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <g fill="none" stroke-linecap="round">
    <path d="M66 118 Q46 142 60 172" stroke-width="22"/><path d="M84 124 Q76 152 86 182" stroke-width="22"/><path d="M104 126 Q106 158 100 186" stroke-width="22"/>
    <path d="M122 122 Q132 152 120 180" stroke-width="22"/><path d="M138 116 Q158 138 148 168" stroke-width="22"/>
  </g>
  <g fill="none" stroke="#F37021" stroke-linecap="round" stroke-width="12">
    <path d="M66 118 Q46 142 60 172"/><path d="M84 124 Q76 152 86 182"/><path d="M104 126 Q106 158 100 186"/><path d="M122 122 Q132 152 120 180"/><path d="M138 116 Q158 138 148 168"/>
  </g>
  <ellipse cx="102" cy="82" rx="52" ry="46" fill="#F37021"/>
  <circle cx="84" cy="80" r="11" fill="#fff"/><circle cx="120" cy="80" r="11" fill="#fff"/>
  <circle cx="86" cy="82" r="5" fill="#000" stroke="none"/><circle cx="118" cy="82" r="5" fill="#000" stroke="none"/>
  <path d="M92 104 Q102 114 112 104" fill="none" stroke-width="5"/>
  <g fill="#FFD100" stroke="none" opacity=".9"><circle cx="82" cy="56" r="5"/><circle cx="108" cy="50" r="4"/><circle cx="126" cy="60" r="4"/></g>
</g>`,
  "penguin": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <ellipse cx="72" cy="182" rx="22" ry="10" fill="#F37021"/><ellipse cx="128" cy="182" rx="22" ry="10" fill="#F37021"/>
  <ellipse cx="100" cy="108" rx="48" ry="70" fill="#1a1a1a"/>
  <ellipse cx="100" cy="122" rx="30" ry="50" fill="#fff"/>
  <ellipse cx="50" cy="118" rx="12" ry="32" transform="rotate(15 50 118)" fill="#1a1a1a"/><ellipse cx="150" cy="118" rx="12" ry="32" transform="rotate(-15 150 118)" fill="#1a1a1a"/>
  <ellipse cx="84" cy="70" rx="11" ry="12" fill="#fff"/><ellipse cx="116" cy="70" rx="11" ry="12" fill="#fff"/>
  <circle cx="86" cy="72" r="4.5" fill="#000" stroke="none"/><circle cx="114" cy="72" r="4.5" fill="#000" stroke="none"/>
  <path d="M90 86 L110 86 L100 100 Z" fill="#F37021" stroke-width="4"/>
</g>`,
  "cat": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M52 78 L56 22 L92 52 Z" fill="#F37021"/><path d="M148 78 L144 22 L108 52 Z" fill="#F37021"/>
  <path d="M60 66 L62 40 L80 54 Z" fill="#FFD100" stroke="none"/><path d="M140 66 L138 40 L120 54 Z" fill="#FFD100" stroke="none"/>
  <ellipse cx="100" cy="100" rx="58" ry="52" fill="#F37021"/>
  <path d="M100 52 V68 M82 56 L86 70 M118 56 L114 70" fill="none" stroke-width="5"/>
  <ellipse cx="78" cy="98" rx="8" ry="10" fill="#fff"/><ellipse cx="122" cy="98" rx="8" ry="10" fill="#fff"/>
  <ellipse cx="78" cy="100" rx="3" ry="8" fill="#000" stroke="none"/><ellipse cx="122" cy="100" rx="3" ry="8" fill="#000" stroke="none"/>
  <path d="M93 114 H107 L100 123 Z" fill="#fff" stroke-width="4"/>
  <path d="M100 123 V128 M88 130 Q94 136 100 128 Q106 136 112 130" fill="none" stroke-width="4.5"/>
  <path d="M60 116 L30 108 M60 124 L30 128 M140 116 L170 108 M140 124 L170 128" fill="none" stroke-width="4"/>
</g>`,
  "lion": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <circle cx="100" cy="100" r="66" fill="#F37021"/>
  <circle cx="58" cy="52" r="14" fill="#FFD100"/><circle cx="142" cy="52" r="14" fill="#FFD100"/>
  <circle cx="100" cy="106" r="46" fill="#FFD100"/>
  <circle cx="82" cy="94" r="5" fill="#000" stroke="none"/><circle cx="118" cy="94" r="5" fill="#000" stroke="none"/>
  <path d="M90 108 H110 L100 120 Z" fill="#F37021" stroke-width="4"/>
  <path d="M100 120 V128 M86 128 Q93 136 100 128 Q107 136 114 128" fill="none" stroke-width="4.5"/>
  <path d="M60 112 L36 106 M60 120 L36 124 M140 112 L164 106 M140 120 L164 124" fill="none" stroke-width="4"/>
</g>`,
  "whale": `<defs><clipPath id="whaleBody"><ellipse cx="94" cy="124" rx="76" ry="46"/></clipPath></defs><g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M70 66 V40 M70 40 Q60 30 50 38 M70 40 Q80 30 90 38" fill="none" stroke="#005CA9" stroke-width="6"/>
  <path d="M156 128 Q186 120 192 86 Q176 94 166 102 Q176 70 158 54 Q152 88 144 112 Z" fill="#005CA9"/>
  <ellipse cx="94" cy="124" rx="76" ry="46" fill="#005CA9"/>
  <g clip-path="url(#whaleBody)"><ellipse cx="94" cy="150" rx="70" ry="22" fill="#fff" stroke="none"/></g><ellipse cx="94" cy="124" rx="76" ry="46" fill="none"/>
  
  <circle cx="46" cy="112" r="5" fill="#fff" stroke="none"/><circle cx="47" cy="113" r="2.5" fill="#000" stroke="none"/>
  <path d="M26 128 Q40 136 56 130" fill="none" stroke-width="4.5"/>
</g>`,
  "bee": `<defs><clipPath id="beeBody"><ellipse cx="105" cy="112" rx="48" ry="32"/></clipPath></defs><g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M52 108 Q40 100 34 88 M60 100 Q58 84 52 76" fill="none" stroke-width="4"/>
  <ellipse cx="92" cy="64" rx="18" ry="32" transform="rotate(-18 92 64)" fill="#fff" fill-opacity=".9"/>
  <ellipse cx="124" cy="62" rx="18" ry="32" transform="rotate(18 124 62)" fill="#fff" fill-opacity=".9"/>
  <ellipse cx="105" cy="112" rx="48" ry="32" fill="#FFD100"/>
  <g clip-path="url(#beeBody)" stroke="none" fill="#000"><rect x="96" y="70" width="12" height="90"/><rect x="118" y="70" width="12" height="90"/><rect x="140" y="70" width="12" height="90"/></g>
  <ellipse cx="105" cy="112" rx="48" ry="32" fill="none"/>
  <path d="M152 108 L172 112 L152 118 Z" fill="#000" stroke-width="4"/>
  <circle cx="64" cy="112" r="24" fill="#FFD100"/>
  <circle cx="56" cy="108" r="4.5" fill="#000" stroke="none"/><circle cx="72" cy="108" r="4.5" fill="#000" stroke="none"/>
  <path d="M54 122 Q64 130 74 122" fill="none" stroke-width="4"/>
</g>`,
  "rabbit": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <ellipse cx="148" cy="150" rx="16" ry="14" fill="#fff"/>
  <ellipse cx="96" cy="140" rx="54" ry="40" fill="#fff"/>
  <ellipse cx="112" cy="178" rx="28" ry="11" fill="#fff"/><ellipse cx="58" cy="176" rx="13" ry="9" fill="#fff"/>
  <path d="M50 86 Q40 20 62 18 Q80 20 72 84 Z" fill="#fff"/><path d="M62 78 Q56 38 64 32 Q72 40 68 76 Z" fill="#FFD100" stroke-width="3.5"/>
  <path d="M82 84 Q84 24 108 24 Q122 28 104 90 Z" fill="#fff"/><path d="M90 78 Q92 44 104 38 Q108 50 100 82 Z" fill="#FFD100" stroke-width="3.5"/>
  <circle cx="82" cy="104" r="42" fill="#fff"/>
  <circle cx="62" cy="98" r="5" fill="#000" stroke="none"/>
  <path d="M46 112 L56 112 L51 118 Z" fill="#F37021" stroke-width="3"/>
  <path d="M51 118 V122 M42 124 Q47 129 51 122 Q55 129 60 124" fill="none" stroke-width="3.5"/>
  <ellipse cx="72" cy="118" rx="9" ry="6" fill="#F37021" stroke="none" opacity=".6"/>
</g>`,
  "camel": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M158 128 Q170 138 166 158" fill="none"/>
  <rect x="60" y="150" width="17" height="38" fill="#F6C45A"/><rect x="84" y="150" width="17" height="38" fill="#F6C45A"/>
  <rect x="124" y="150" width="17" height="38" fill="#F6C45A"/><rect x="146" y="150" width="17" height="38" fill="#F6C45A"/>
  <path d="M52 140 Q50 110 84 106 Q100 70 120 104 Q164 106 164 140 Q164 160 144 160 H70 Q52 160 52 140 Z" fill="#F6C45A"/>
  <path d="M60 112 Q46 90 36 60 L58 52 Q64 80 80 106 Z" fill="#F6C45A"/>
  <ellipse cx="38" cy="50" rx="26" ry="15" transform="rotate(-10 38 50)" fill="#F6C45A"/>
  <circle cx="44" cy="44" r="3.5" fill="#000" stroke="none"/><circle cx="20" cy="54" r="2.2" fill="#000" stroke="none"/>
  <path d="M52 34 L56 24" fill="none"/>
  <path d="M26 58 Q32 62 38 58" fill="none" stroke-width="3.5"/>
</g>`,
  "butterfly": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <ellipse cx="66" cy="80" rx="42" ry="46" transform="rotate(-20 66 80)" fill="#F37021"/>
  <ellipse cx="134" cy="80" rx="42" ry="46" transform="rotate(20 134 80)" fill="#F37021"/>
  <ellipse cx="74" cy="140" rx="30" ry="32" transform="rotate(15 74 140)" fill="#FFD100"/>
  <ellipse cx="126" cy="140" rx="30" ry="32" transform="rotate(-15 126 140)" fill="#FFD100"/>
  <g stroke="none"><circle cx="64" cy="78" r="11" fill="#fff"/><circle cx="136" cy="78" r="11" fill="#fff"/><circle cx="74" cy="140" r="8" fill="#005CA9"/><circle cx="126" cy="140" r="8" fill="#005CA9"/></g>
  <path d="M96 66 Q88 40 76 30 M104 66 Q112 40 124 30" fill="none" stroke-width="4.5"/>
  <circle cx="75" cy="29" r="5" fill="#000"/><circle cx="125" cy="29" r="5" fill="#000"/>
  <ellipse cx="100" cy="108" rx="9" ry="42" fill="#1a1a1a"/>
</g>`,
  "shark": `<defs><clipPath id="sharkBody"><path d="M20 110 Q60 72 130 86 Q160 92 182 74 Q176 102 188 132 Q160 122 130 132 Q70 150 20 110 Z"/></clipPath></defs><g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M92 84 L108 38 L130 88 Z" fill="#4a86c5"/>
  <path d="M20 110 Q60 72 130 86 Q160 92 182 74 Q176 102 188 132 Q160 122 130 132 Q70 150 20 110 Z" fill="#4a86c5"/>
  <g clip-path="url(#sharkBody)"><ellipse cx="90" cy="150" rx="90" ry="28" fill="#fff" stroke="none"/></g>
  <path d="M20 110 Q60 72 130 86 Q160 92 182 74 Q176 102 188 132 Q160 122 130 132 Q70 150 20 110 Z" fill="none"/>
  <path d="M88 124 L70 156 L112 132 Z" fill="#4a86c5"/>
  <circle cx="56" cy="102" r="4.5" fill="#000" stroke="none"/>
  <path d="M78 100 V112 M88 99 V112 M98 98 V110" fill="none" stroke-width="4"/>
  <path d="M26 116 Q52 126 76 120" fill="none" stroke-width="4.5"/>
</g>`,
  "koala": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <circle cx="48" cy="66" r="26" fill="#9aa3ad"/><circle cx="152" cy="66" r="26" fill="#9aa3ad"/>
  <circle cx="48" cy="66" r="12" fill="#fff" stroke="none"/><circle cx="152" cy="66" r="12" fill="#fff" stroke="none"/>
  <circle cx="100" cy="108" r="54" fill="#9aa3ad"/>
  <circle cx="80" cy="98" r="5.5" fill="#000" stroke="none"/><circle cx="120" cy="98" r="5.5" fill="#000" stroke="none"/>
  <ellipse cx="100" cy="118" rx="14" ry="18" fill="#1a1a1a"/>
  <ellipse cx="78" cy="128" rx="9" ry="6" fill="#F37021" stroke="none" opacity=".5"/><ellipse cx="122" cy="128" rx="9" ry="6" fill="#F37021" stroke="none" opacity=".5"/>
  <path d="M72 148 Q100 168 128 148" fill="none" stroke="#008D36" stroke-width="0"/>
</g>`,
  "dolphin": `<defs><clipPath id="dolphinBody"><ellipse cx="100" cy="108" rx="70" ry="32" transform="rotate(-18 100 108)"/></clipPath></defs><g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M100 82 L118 46 L132 90 Z" fill="#4a86c5"/>
  <path d="M164 86 Q186 62 198 72 Q188 84 180 92 Q196 104 192 118 Q174 104 160 100 Z" fill="#4a86c5"/>
  <ellipse cx="34" cy="128" rx="26" ry="9" transform="rotate(-18 34 128)" fill="#4a86c5"/>
  <ellipse cx="100" cy="108" rx="70" ry="32" transform="rotate(-18 100 108)" fill="#4a86c5"/>
  <g clip-path="url(#dolphinBody)"><ellipse cx="96" cy="140" rx="80" ry="22" transform="rotate(-18 96 140)" fill="#fff" stroke="none"/></g>
  <ellipse cx="100" cy="108" rx="70" ry="32" transform="rotate(-18 100 108)" fill="none"/>
  <path d="M96 128 L88 156 L118 136 Z" fill="#4a86c5"/>
  <circle cx="64" cy="100" r="4.5" fill="#000" stroke="none"/>
  <path d="M30 132 Q46 138 62 128" fill="none" stroke-width="4"/>
</g>`,
  "goldfish": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M138 100 Q172 56 188 72 Q172 100 188 128 Q172 144 138 100 Z" fill="#F37021"/>
  <path d="M64 66 Q90 38 126 68" fill="#F37021"/>
  <ellipse cx="92" cy="102" rx="58" ry="44" fill="#F37021"/>
  <path d="M96 62 Q118 76 114 102 M84 62 Q104 78 100 100" fill="none" stroke-width="3.5" stroke="#FFD100"/>
  <circle cx="62" cy="92" r="11" fill="#fff"/><circle cx="60" cy="93" r="5" fill="#000" stroke="none"/>
  <path d="M38 112 Q46 118 54 112" fill="none" stroke-width="4"/>
  <ellipse cx="92" cy="122" rx="20" ry="10" transform="rotate(25 92 122)" fill="#FFD100"/>
  <g fill="none" stroke="#005CA9" stroke-width="3.5"><circle cx="20" cy="70" r="7"/><circle cx="34" cy="50" r="5"/></g>
</g>`,
  "bull": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M68 72 Q38 68 32 36" fill="none" stroke-width="20"/><path d="M68 72 Q38 68 32 36" fill="none" stroke="#FFF3C4" stroke-width="9"/>
  <path d="M132 72 Q162 68 168 36" fill="none" stroke-width="20"/><path d="M132 72 Q162 68 168 36" fill="none" stroke="#FFF3C4" stroke-width="9"/>
  <ellipse cx="50" cy="92" rx="22" ry="12" transform="rotate(25 50 92)" fill="#8a5a2b"/><ellipse cx="150" cy="92" rx="22" ry="12" transform="rotate(-25 150 92)" fill="#8a5a2b"/>
  <ellipse cx="100" cy="104" rx="42" ry="52" fill="#8a5a2b"/>
  <ellipse cx="100" cy="146" rx="30" ry="24" fill="#F6C9A0"/>
  <ellipse cx="90" cy="148" rx="4" ry="6" fill="#000" stroke="none"/><ellipse cx="110" cy="148" rx="4" ry="6" fill="#000" stroke="none"/>
  <circle cx="82" cy="98" r="5.5" fill="#000" stroke="none"/><circle cx="118" cy="98" r="5.5" fill="#000" stroke="none"/>
  <path d="M72 84 Q82 78 92 84 M108 84 Q118 78 128 84" fill="none" stroke-width="4"/>
</g>`,
  "ostrich": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M92 158 L88 190 M112 158 L114 190" fill="none" stroke-width="16"/><path d="M92 158 L88 190 M112 158 L114 190" fill="none" stroke="#F6A27A" stroke-width="7"/>
  <ellipse cx="86" cy="192" rx="14" ry="5" fill="#F6A27A"/><ellipse cx="118" cy="192" rx="14" ry="5" fill="#F6A27A"/>
  <ellipse cx="148" cy="112" rx="18" ry="12" fill="#fff"/>
  <ellipse cx="102" cy="124" rx="50" ry="40" fill="#1a1a1a"/>
  <path d="M82 118 Q112 104 140 126 Q124 152 88 140 Z" fill="#fff"/>
  <path d="M80 100 Q62 78 70 48" fill="none" stroke-width="20"/><path d="M80 100 Q62 78 70 48" fill="none" stroke="#F6A27A" stroke-width="9"/>
  <ellipse cx="74" cy="36" rx="16" ry="11" fill="#F6A27A"/>
  <path d="M88 36 L106 40 L88 44 Z" fill="#F37021" stroke-width="4"/>
  <circle cx="72" cy="33" r="3.5" fill="#000" stroke="none"/>
</g>`,
  "bat": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M94 96 Q64 66 18 74 Q34 90 28 108 Q44 106 52 124 Q72 112 94 120 Z" fill="#3a3a3a"/>
  <path d="M106 96 Q136 66 182 74 Q166 90 172 108 Q156 106 148 124 Q128 112 106 120 Z" fill="#3a3a3a"/>
  <path d="M86 64 L82 36 L98 54 Z M114 64 L118 36 L102 54 Z" fill="#3a3a3a"/>
  <ellipse cx="100" cy="110" rx="15" ry="26" fill="#3a3a3a"/>
  <circle cx="100" cy="78" r="19" fill="#3a3a3a"/>
  <circle cx="92" cy="74" r="5" fill="#fff" stroke="none"/><circle cx="108" cy="74" r="5" fill="#fff" stroke="none"/>
  <circle cx="92" cy="75" r="2.2" fill="#000" stroke="none"/><circle cx="108" cy="75" r="2.2" fill="#000" stroke="none"/>
  <path d="M93 88 Q100 94 107 88" fill="none" stroke="#fff" stroke-width="3.5"/>
</g>`,
  "owl": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <ellipse cx="82" cy="186" rx="14" ry="6" fill="#F37021"/><ellipse cx="118" cy="186" rx="14" ry="6" fill="#F37021"/>
  <ellipse cx="100" cy="112" rx="52" ry="66" fill="#8a5a2b"/>
  <path d="M60 58 L56 28 L82 50 Z M140 58 L144 28 L118 50 Z" fill="#8a5a2b"/>
  <ellipse cx="100" cy="140" rx="32" ry="36" fill="#F6C45A" stroke="none"/>
  <path d="M84 126 Q88 134 92 126 M100 126 Q104 134 108 126 M92 146 Q96 154 100 146 M104 146 Q108 154 112 146" fill="none" stroke="#8a5a2b" stroke-width="3.5"/>
  <ellipse cx="46" cy="118" rx="12" ry="34" transform="rotate(8 46 118)" fill="#6f4520"/><ellipse cx="154" cy="118" rx="12" ry="34" transform="rotate(-8 154 118)" fill="#6f4520"/>
  <circle cx="78" cy="84" r="22" fill="#fff"/><circle cx="122" cy="84" r="22" fill="#fff"/>
  <circle cx="80" cy="86" r="9" fill="#000" stroke="none"/><circle cx="120" cy="86" r="9" fill="#000" stroke="none"/>
  <path d="M92 98 L108 98 L100 114 Z" fill="#F37021" stroke-width="4"/>
</g>`,
  "spider": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <g fill="none" stroke-width="6">
    <path d="M84 100 L44 66 L24 84"/><path d="M80 110 L30 104 L16 126"/><path d="M82 122 L36 146 L28 172"/><path d="M90 130 L60 164 L56 188"/>
    <path d="M116 100 L156 66 L176 84"/><path d="M120 110 L170 104 L184 126"/><path d="M118 122 L164 146 L172 172"/><path d="M110 130 L140 164 L144 188"/>
  </g>
  <ellipse cx="100" cy="122" rx="30" ry="34" fill="#F37021"/>
  <circle cx="100" cy="84" r="20" fill="#F37021"/>
  <circle cx="92" cy="80" r="6" fill="#fff"/><circle cx="108" cy="80" r="6" fill="#fff"/>
  <circle cx="93" cy="81" r="2.5" fill="#000" stroke="none"/><circle cx="107" cy="81" r="2.5" fill="#000" stroke="none"/>
  <path d="M93 92 Q100 98 107 92" fill="none" stroke-width="4"/>
</g>`,
  "porcupine": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M52 112 L36 74 L62 96 L58 52 L82 90 L88 44 L104 88 L118 44 L124 90 L146 54 L142 98 L168 76 L156 120 Z" fill="#5a3a1a"/>
  <ellipse cx="108" cy="126" rx="62" ry="38" fill="#8a5a2b"/>
  <ellipse cx="46" cy="132" rx="26" ry="20" fill="#8a5a2b"/>
  <circle cx="40" cy="124" r="4.5" fill="#000" stroke="none"/>
  <ellipse cx="22" cy="134" rx="6" ry="5" fill="#000"/>
  <path d="M34 144 Q42 150 50 144" fill="none" stroke-width="3.5"/>
  <rect x="68" y="152" width="16" height="22" rx="6" fill="#8a5a2b"/><rect x="128" y="152" width="16" height="22" rx="6" fill="#8a5a2b"/>
</g>`,
  "ant": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <g fill="none" stroke-width="5">
    <path d="M92 118 L74 150 L66 176"/><path d="M98 120 L96 156 L98 182"/><path d="M104 118 L122 150 L134 176"/>
    <path d="M42 96 Q34 66 18 58"/><path d="M52 94 Q54 62 44 46"/>
  </g>
  <ellipse cx="154" cy="112" rx="32" ry="26" fill="#b5441a"/>
  <ellipse cx="100" cy="108" rx="22" ry="16" fill="#b5441a"/>
  <circle cx="52" cy="108" r="22" fill="#b5441a"/>
  <circle cx="46" cy="102" r="4.5" fill="#000" stroke="none"/><circle cx="62" cy="102" r="4.5" fill="#000" stroke="none"/>
  <path d="M44 116 Q54 124 64 116" fill="none" stroke-width="4"/>
  <path d="M36 82 Q40 56 78 54 Q82 80 56 86 Z" fill="#008D36"/><path d="M42 80 Q58 66 74 58" fill="none" stroke-width="3"/>
</g>`,
  "snake": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M30 164 Q72 176 82 140 Q92 104 130 118 Q166 130 148 86" fill="none" stroke-width="34"/>
  <path d="M30 164 Q72 176 82 140 Q92 104 130 118 Q166 130 148 86" fill="none" stroke="#008D36" stroke-width="22"/>
  <g fill="#FFD100" stroke="none"><circle cx="48" cy="170" r="4"/><circle cx="78" cy="150" r="4"/><circle cx="100" cy="120" r="4"/><circle cx="136" cy="124" r="4"/><circle cx="158" cy="116" r="4"/></g>
  <ellipse cx="146" cy="70" rx="22" ry="17" transform="rotate(-20 146 70)" fill="#008D36"/>
  <circle cx="140" cy="64" r="5" fill="#fff"/><circle cx="141" cy="65" r="2.2" fill="#000" stroke="none"/>
  <path d="M164 62 L184 52 M184 52 L192 44 M184 52 L194 54" fill="none" stroke="#e03030" stroke-width="4"/>
</g>`,
  "polar-bear": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <circle cx="56" cy="62" r="20" fill="#fff"/><circle cx="144" cy="62" r="20" fill="#fff"/>
  <circle cx="56" cy="62" r="9" fill="#cfd8e3" stroke="none"/><circle cx="144" cy="62" r="9" fill="#cfd8e3" stroke="none"/>
  <ellipse cx="100" cy="106" rx="56" ry="50" fill="#fff"/>
  <ellipse cx="100" cy="128" rx="26" ry="20" fill="#fff"/>
  <circle cx="76" cy="94" r="5.5" fill="#000" stroke="none"/><circle cx="124" cy="94" r="5.5" fill="#000" stroke="none"/>
  <ellipse cx="100" cy="118" rx="10" ry="7" fill="#1a1a1a"/>
  <path d="M100 124 V134 M88 136 Q94 142 100 134 Q106 142 112 136" fill="none" stroke-width="4"/>
  <ellipse cx="62" cy="120" rx="9" ry="6" fill="#9ec9f0" stroke="none" opacity=".7"/><ellipse cx="138" cy="120" rx="9" ry="6" fill="#9ec9f0" stroke="none" opacity=".7"/>
</g>`,
  "starfish": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M100 25 L120 77.5 L176 80.3 L132.3 115.5 L147 169.7 L100 139 L53 169.7 L67.7 115.5 L23.9 80.3 L80 77.5 Z" fill="#F37021"/>
  <g fill="#FFD100" stroke="none"><circle cx="100" cy="52" r="5"/><circle cx="148" cy="88" r="5"/><circle cx="128" cy="140" r="5"/><circle cx="72" cy="140" r="5"/><circle cx="52" cy="88" r="5"/></g>
  <circle cx="88" cy="100" r="5" fill="#000" stroke="none"/><circle cx="112" cy="100" r="5" fill="#000" stroke="none"/>
  <path d="M90 114 Q100 122 110 114" fill="none" stroke-width="4"/>
</g>`,
  "seahorse": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M106 146 Q92 158 98 174 Q110 190 128 178 Q138 166 124 160" fill="none" stroke-width="20"/>
  <path d="M106 146 Q92 158 98 174 Q110 190 128 178 Q138 166 124 160" fill="none" stroke="#FFD100" stroke-width="9"/>
  <path d="M104 62 Q136 82 126 114 Q118 136 106 148" fill="none" stroke-width="38"/>
  <path d="M104 62 Q136 82 126 114 Q118 136 106 148" fill="none" stroke="#FFD100" stroke-width="27"/>
  <ellipse cx="102" cy="104" rx="24" ry="32" fill="#FFE680"/>
  <path d="M84 92 H118 M82 106 H120 M84 120 H116" fill="none" stroke="#F37021" stroke-width="3.5"/>
  <path d="M142 92 Q158 106 146 130 Q136 116 142 92 Z" fill="#F37021" stroke-width="4"/>
  <path d="M74 70 L40 92" fill="none" stroke-width="20"/><path d="M74 70 L40 92" fill="none" stroke="#FFD100" stroke-width="9"/>
  <ellipse cx="96" cy="56" rx="26" ry="22" transform="rotate(-12 96 56)" fill="#FFD100"/>
  <path d="M88 36 L80 22 M101 34 L102 18 M113 38 L123 25" fill="none" stroke-width="5"/>
  <circle cx="80" cy="21" r="3.5" fill="#F37021"/><circle cx="102" cy="17" r="3.5" fill="#F37021"/><circle cx="123" cy="24" r="3.5" fill="#F37021"/>
  <circle cx="92" cy="52" r="8" fill="#fff"/><circle cx="90" cy="53" r="3.8" fill="#000" stroke="none"/>
  <ellipse cx="108" cy="66" rx="7" ry="4.5" fill="#F37021" stroke="none" opacity=".6"/>
</g>`,
  "dog": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <ellipse cx="52" cy="100" rx="18" ry="40" transform="rotate(12 52 100)" fill="#8a5a2b"/><ellipse cx="148" cy="100" rx="18" ry="40" transform="rotate(-12 148 100)" fill="#8a5a2b"/>
  <ellipse cx="100" cy="104" rx="46" ry="50" fill="#F6C45A"/>
  <ellipse cx="100" cy="134" rx="26" ry="20" fill="#fff"/>
  <circle cx="80" cy="92" r="5.5" fill="#000" stroke="none"/><circle cx="120" cy="92" r="5.5" fill="#000" stroke="none"/>
  <path d="M70 80 Q80 74 90 80 M130 80 Q120 74 110 80" fill="none" stroke-width="4"/>
  <ellipse cx="100" cy="122" rx="11" ry="8" fill="#1a1a1a"/>
  <path d="M100 130 V140 M88 142 Q94 148 100 140 Q106 148 112 142" fill="none" stroke-width="4"/>
  <path d="M94 148 Q100 168 106 148 Z" fill="#F6879B" stroke-width="3.5"/>
</g>`,
  "cockroach": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <g fill="none" stroke-width="5">
    <path d="M78 104 L44 90 L26 104"/><path d="M76 120 L38 124 L22 144"/><path d="M82 138 L50 160 L40 184"/>
    <path d="M122 104 L156 90 L174 104"/><path d="M124 120 L162 124 L178 144"/><path d="M118 138 L150 160 L160 184"/>
    <path d="M90 52 Q70 28 40 22"/><path d="M110 52 Q130 28 160 22"/>
  </g>
  <ellipse cx="100" cy="122" rx="32" ry="52" fill="#8a5a2b"/>
  <path d="M100 76 V172" fill="none" stroke-width="4"/>
  <ellipse cx="100" cy="64" rx="18" ry="16" fill="#8a5a2b"/>
  <circle cx="93" cy="62" r="4" fill="#fff" stroke="none"/><circle cx="107" cy="62" r="4" fill="#fff" stroke="none"/>
  <circle cx="93" cy="63" r="1.8" fill="#000" stroke="none"/><circle cx="107" cy="63" r="1.8" fill="#000" stroke="none"/>
</g>`,
  "elephant": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <ellipse cx="42" cy="98" rx="34" ry="46" fill="#8FA7C0"/>
  <ellipse cx="158" cy="98" rx="34" ry="46" fill="#8FA7C0"/>
  <ellipse cx="46" cy="100" rx="17" ry="30" fill="#F4B6B6" stroke="none"/>
  <ellipse cx="154" cy="100" rx="17" ry="30" fill="#F4B6B6" stroke="none"/>
  <path d="M100 112 Q100 168 112 182 Q126 192 136 172" fill="none" stroke-width="32"/>
  <ellipse cx="100" cy="98" rx="50" ry="54" fill="#8FA7C0"/>
  <path d="M100 112 Q100 168 112 182 Q126 192 136 172" fill="none" stroke="#8FA7C0" stroke-width="20"/>
  <path d="M96 130 V146 M104 136 V152 M100 124 V140" fill="none" stroke-width="3" opacity=".5"/>
  <path d="M72 128 Q56 150 70 162 Q78 148 84 134 Z" fill="#fff" stroke-width="5"/>
  <path d="M128 128 Q144 150 130 162 Q122 148 116 134 Z" fill="#fff" stroke-width="5"/>
  <circle cx="80" cy="84" r="6" fill="#000" stroke="none"/><circle cx="120" cy="84" r="6" fill="#000" stroke="none"/>
</g>`,
  "chameleon": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M30 100 H190" fill="none" stroke="#8a5a2b" stroke-width="0"/>
  <path d="M14 178 H188" fill="none" stroke-width="12"/>
  <path d="M14 178 H188" fill="none" stroke="#8a5a2b" stroke-width="5"/>
  <path d="M46 118 Q14 116 16 146 Q18 170 44 164 Q60 158 52 144 Q46 136 38 146" fill="none" stroke-width="18"/>
  <path d="M46 118 Q14 116 16 146 Q18 170 44 164 Q60 158 52 144 Q46 136 38 146" fill="none" stroke="#008D36" stroke-width="8"/>
  <rect x="76" y="132" width="16" height="42" rx="8" fill="#008D36"/>
  <rect x="116" y="132" width="16" height="42" rx="8" fill="#008D36"/>
  <ellipse cx="98" cy="112" rx="56" ry="38" fill="#008D36"/>
  <path d="M60 80 L66 66 L74 78 L84 62 L92 76 L104 60 L110 76 L122 62 L126 78" fill="none" stroke-width="5"/>
  <circle cx="150" cy="98" r="26" fill="#008D36"/>
  <path d="M168 110 Q186 112 190 104" fill="none" stroke-width="5"/>
  <circle cx="152" cy="90" r="13" fill="#FFD100"/><circle cx="154" cy="90" r="5.5" fill="#000" stroke="none"/>
  <g fill="#F37021" stroke="none"><circle cx="76" cy="112" r="7"/><circle cx="100" cy="126" r="6"/><circle cx="108" cy="100" r="6"/><circle cx="128" cy="118" r="5"/></g>
</g>`,
  "frog": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <ellipse cx="50" cy="170" rx="24" ry="10" fill="#008D36"/>
  <ellipse cx="150" cy="170" rx="24" ry="10" fill="#008D36"/>
  <ellipse cx="100" cy="128" rx="64" ry="46" fill="#008D36"/>
  <ellipse cx="100" cy="148" rx="40" ry="24" fill="#9BD18B" stroke="none"/>
  <circle cx="68" cy="72" r="20" fill="#008D36"/><circle cx="132" cy="72" r="20" fill="#008D36"/>
  <circle cx="68" cy="70" r="12" fill="#fff"/><circle cx="132" cy="70" r="12" fill="#fff"/>
  <circle cx="70" cy="72" r="6" fill="#000" stroke="none"/><circle cx="130" cy="72" r="6" fill="#000" stroke="none"/>
  <path d="M54 124 Q100 160 146 124" fill="none" stroke-width="5"/>
  <circle cx="92" cy="108" r="2.5" fill="#000" stroke="none"/><circle cx="108" cy="108" r="2.5" fill="#000" stroke="none"/>
</g>`,
  "turtle": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <rect x="56" y="128" width="26" height="34" rx="10" fill="#9BD18B"/>
  <rect x="118" y="128" width="26" height="34" rx="10" fill="#9BD18B"/>
  <path d="M168 134 L190 142 L168 148 Z" fill="#9BD18B"/>
  <rect x="34" y="122" width="132" height="20" rx="10" fill="#9BD18B"/>
  <ellipse cx="30" cy="106" rx="22" ry="17" fill="#9BD18B"/>
  <circle cx="24" cy="102" r="3.5" fill="#000" stroke="none"/>
  <path d="M14 114 Q24 120 32 114" fill="none" stroke-width="4"/>
  <path d="M40 126 Q40 58 100 58 Q160 58 160 126 Z" fill="#008D36"/>
  <path d="M100 58 V126 M70 66 Q74 100 72 126 M130 66 Q126 100 128 126 M46 100 H154" fill="none" stroke-width="4.5"/>
</g>`,
  "flamingo": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M94 128 V184 M112 128 L116 184" fill="none" stroke="#F08CA4" stroke-width="7"/>
  <path d="M94 184 H80 M116 184 H130" fill="none" stroke-width="6"/>
  <path d="M94 128 V184 M112 128 L116 184" fill="none" stroke-width="2.5" opacity="0"/>
  <ellipse cx="100" cy="104" rx="46" ry="30" fill="#F08CA4"/>
  <path d="M64 100 Q92 132 132 104 Q110 90 64 100 Z" fill="#E86A8A" stroke-width="4.5"/>
  <path d="M130 88 Q170 84 154 50 Q140 26 112 38" fill="none" stroke-width="22"/>
  <path d="M130 88 Q170 84 154 50 Q140 26 112 38" fill="none" stroke="#F08CA4" stroke-width="12"/>
  <circle cx="110" cy="38" r="14" fill="#F08CA4"/>
  <path d="M100 40 Q84 42 82 54 Q96 54 104 46 Z" fill="#fff" stroke-width="5"/>
  <path d="M82 54 Q96 54 104 46 L98 52 Z" fill="#000" stroke-width="3"/>
  <circle cx="112" cy="34" r="3" fill="#000" stroke="none"/>
</g>`,
  "kangaroo": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M70 156 Q32 170 20 196 L68 190 Z" fill="#E39B4F"/>
  <path d="M84 168 Q76 190 100 190 H128 V176 H108 Q104 168 100 160 Z" fill="#E39B4F"/>
  <ellipse cx="96" cy="120" rx="40" ry="54" transform="rotate(-8 96 120)" fill="#E39B4F"/>
  <path d="M74 118 Q96 150 122 118 Z" fill="#F6D9B0"/>
  <circle cx="96" cy="112" r="13" fill="#E39B4F"/>
  <ellipse cx="88" cy="97" rx="4" ry="8" transform="rotate(-20 88 97)" fill="#E39B4F"/><ellipse cx="104" cy="97" rx="4" ry="8" transform="rotate(20 104 97)" fill="#E39B4F"/>
  <circle cx="92" cy="112" r="2.2" fill="#000" stroke="none"/><circle cx="102" cy="112" r="2.2" fill="#000" stroke="none"/>
  <ellipse cx="112" cy="54" rx="24" ry="19" transform="rotate(-10 112 54)" fill="#E39B4F"/>
  <ellipse cx="132" cy="62" rx="12" ry="10" fill="#E39B4F"/>
  <ellipse cx="96" cy="30" rx="6" ry="16" transform="rotate(-18 96 30)" fill="#E39B4F"/><ellipse cx="116" cy="28" rx="6" ry="16" transform="rotate(12 116 28)" fill="#E39B4F"/>
  <circle cx="114" cy="50" r="3.5" fill="#000" stroke="none"/><circle cx="140" cy="60" r="2.5" fill="#000" stroke="none"/>
  <path d="M126 92 Q140 96 142 104" fill="none" stroke-width="7"/>
</g>`,
  "sloth": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M0 34 H200" fill="none" stroke-width="20"/>
  <path d="M0 34 H200" fill="none" stroke="#8a5a2b" stroke-width="9"/>
  <path d="M68 100 L56 40 M132 100 L144 40" fill="none" stroke-width="22"/>
  <path d="M68 100 L56 40 M132 100 L144 40" fill="none" stroke="#B58B5E" stroke-width="11"/>
  <ellipse cx="100" cy="150" rx="34" ry="36" fill="#B58B5E"/>
  <path d="M82 178 L78 196 M118 178 L122 196" fill="none" stroke-width="12"/>
  <path d="M82 178 L78 196 M118 178 L122 196" fill="none" stroke="#B58B5E" stroke-width="5"/>
  <circle cx="100" cy="98" r="32" fill="#D9BE95"/>
  <ellipse cx="86" cy="94" rx="11" ry="8" transform="rotate(25 86 94)" fill="#5a3a1a" stroke-width="4"/>
  <ellipse cx="114" cy="94" rx="11" ry="8" transform="rotate(-25 114 94)" fill="#5a3a1a" stroke-width="4"/>
  <circle cx="87" cy="94" r="3" fill="#fff" stroke="none"/><circle cx="113" cy="94" r="3" fill="#fff" stroke="none"/>
  <ellipse cx="100" cy="106" rx="6" ry="4.5" fill="#000" stroke="none"/>
  <path d="M90 116 Q100 124 110 116" fill="none" stroke-width="4.5"/>
</g>`,
  "jellyfish": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <g fill="none" stroke-linecap="round">
    <path d="M62 104 Q50 130 64 150 Q76 170 62 192" stroke-width="15"/><path d="M84 106 Q74 134 88 156 Q98 176 86 194" stroke-width="15"/>
    <path d="M110 106 Q122 134 108 156 Q98 176 112 194" stroke-width="15"/><path d="M136 104 Q150 130 136 150 Q124 170 138 192" stroke-width="15"/>
  </g>
  <g fill="none" stroke="#C58AD8" stroke-linecap="round" stroke-width="7">
    <path d="M62 104 Q50 130 64 150 Q76 170 62 192"/><path d="M84 106 Q74 134 88 156 Q98 176 86 194"/>
    <path d="M110 106 Q122 134 108 156 Q98 176 112 194"/><path d="M136 104 Q150 130 136 150 Q124 170 138 192"/>
  </g>
  <path d="M30 108 Q30 28 100 28 Q170 28 170 108 Q150 96 136 108 Q118 94 100 108 Q82 94 64 108 Q50 96 30 108 Z" fill="#C58AD8"/>
  <g fill="#fff" stroke="none" opacity=".85"><circle cx="64" cy="62" r="6"/><circle cx="140" cy="56" r="5"/><circle cx="104" cy="44" r="4"/></g>
  <circle cx="82" cy="76" r="5" fill="#000" stroke="none"/><circle cx="118" cy="76" r="5" fill="#000" stroke="none"/>
  <path d="M92 88 Q100 94 108 88" fill="none" stroke-width="4.5"/>
</g>`,
  "pig": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M46 60 L52 22 L88 46 Z" fill="#F5A3B5"/><path d="M154 60 L148 22 L112 46 Z" fill="#F5A3B5"/>
  <path d="M54 54 L56 36 L70 46 Z" fill="#F08CA0" stroke="none"/><path d="M146 54 L144 36 L130 46 Z" fill="#F08CA0" stroke="none"/>
  <circle cx="100" cy="102" r="60" fill="#F5A3B5"/>
  <ellipse cx="100" cy="120" rx="30" ry="22" fill="#F08CA0"/>
  <ellipse cx="90" cy="120" rx="4.5" ry="7" fill="#000" stroke="none"/><ellipse cx="110" cy="120" rx="4.5" ry="7" fill="#000" stroke="none"/>
  <circle cx="74" cy="88" r="6" fill="#000" stroke="none"/><circle cx="126" cy="88" r="6" fill="#000" stroke="none"/>
  <circle cx="64" cy="108" r="8" fill="#F08CA0" stroke="none" opacity=".7"/><circle cx="136" cy="108" r="8" fill="#F08CA0" stroke="none" opacity=".7"/>
</g>`,
  "crocodile": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M146 110 Q176 104 196 84 Q186 118 158 134 Z" fill="#008D36"/>
  <rect x="64" y="136" width="22" height="30" rx="9" fill="#008D36"/>
  <rect x="126" y="136" width="22" height="30" rx="9" fill="#008D36"/>
  <ellipse cx="108" cy="116" rx="50" ry="28" fill="#008D36"/>
  <path d="M10 112 Q10 96 36 96 H82 V130 H36 Q10 130 10 112 Z" fill="#008D36"/>
  <path d="M10 114 H82" fill="none" stroke-width="4"/>
  <path d="M22 114 L26 122 L30 114 M40 114 L44 122 L48 114 M58 114 L62 122 L66 114" fill="#fff" stroke-width="3.5"/>
  <path d="M76 90 L84 76 L92 90 L102 74 L110 90 L120 76 L128 92 L138 80 L144 96" fill="#006B2A" stroke-width="5"/>
  <circle cx="64" cy="94" r="10" fill="#fff"/><circle cx="66" cy="94" r="4.5" fill="#000" stroke="none"/>
  <circle cx="22" cy="102" r="2.5" fill="#000" stroke="none"/>
</g>`,
  "hedgehog": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <ellipse cx="62" cy="168" rx="14" ry="8" fill="#E8C9A0"/><ellipse cx="128" cy="170" rx="14" ry="8" fill="#E8C9A0"/>
  <path d="M30 138 L22 114 L40 118 L34 92 L54 104 L56 76 L74 94 L82 64 L96 86 L110 62 L118 86 L134 68 L136 94 L154 84 L150 108 L170 104 L162 130 L180 134 L162 158 Q100 176 34 150 Z" fill="#8a5a2b"/>
  <path d="M44 110 L50 126 M64 96 L70 118 M88 82 L92 112 M114 82 L114 112 M138 96 L132 118 M152 116 L144 134" fill="none" stroke="#5a3a1a" stroke-width="4"/>
  <path d="M14 146 Q14 120 50 116 Q76 118 82 146 Q76 166 46 166 Q14 164 14 146 Z" fill="#E8C9A0"/>
  <circle cx="10" cy="148" r="7" fill="#000" stroke-width="4"/>
  <circle cx="40" cy="136" r="4" fill="#000" stroke="none"/>
  <path d="M50 116 Q54 108 62 112" fill="none" stroke-width="4.5"/>
</g>`,
  "zebra": `<defs><clipPath id="zebraClip"><ellipse cx="100" cy="104" rx="42" ry="58"/></clipPath></defs><g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M62 54 L56 8 L90 36 Z" fill="#fff"/><path d="M138 54 L144 8 L110 36 Z" fill="#fff"/>
  
  <ellipse cx="100" cy="104" rx="42" ry="58" fill="#fff"/>
  <g clip-path="url(#zebraClip)" fill="#000" stroke="none">
    <path d="M56 70 L100 64 L100 74 L56 82 Z"/><path d="M52 100 L100 90 L100 100 L52 112 Z"/><path d="M54 130 L100 120 L100 130 L54 142 Z"/>
    <path d="M144 70 L100 64 L100 74 L144 82 Z"/><path d="M148 100 L100 90 L100 100 L148 112 Z"/><path d="M146 130 L100 120 L100 130 L146 142 Z"/>
    <path d="M94 46 H106 V60 H94 Z"/>
  </g>
  <ellipse cx="100" cy="104" rx="42" ry="58" fill="none"/>
  <ellipse cx="100" cy="150" rx="26" ry="20" fill="#D0D0D0"/>
  <ellipse cx="90" cy="150" rx="3.5" ry="6" fill="#000" stroke="none"/><ellipse cx="110" cy="150" rx="3.5" ry="6" fill="#000" stroke="none"/>
  <circle cx="78" cy="94" r="5" fill="#fff" stroke-width="4"/><circle cx="122" cy="94" r="5" fill="#fff" stroke-width="4"/>
  <circle cx="78" cy="94" r="2.2" fill="#000" stroke="none"/><circle cx="122" cy="94" r="2.2" fill="#000" stroke="none"/>
</g>`,
  "mosquito": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M112 112 L96 152 L84 184 M122 116 L120 156 L124 186 M132 112 L146 150 L162 178" fill="none" stroke-width="4.5"/>
  <ellipse cx="124" cy="80" rx="34" ry="13" transform="rotate(-35 124 80)" fill="#CFE8FF" opacity=".95"/>
  <ellipse cx="92" cy="76" rx="30" ry="11" transform="rotate(-62 92 76)" fill="#CFE8FF" opacity=".95"/>
  <ellipse cx="80" cy="118" rx="38" ry="14" transform="rotate(18 80 118)" fill="#6b4a3a"/>
  <path d="M54 112 L56 130 M70 108 L72 126 M86 112 L88 130" fill="none" stroke="#fff" stroke-width="4" opacity=".8"/>
  <circle cx="118" cy="106" r="15" fill="#6b4a3a"/>
  <circle cx="140" cy="100" r="11" fill="#6b4a3a"/>
  <path d="M148 102 L184 124" fill="none" stroke-width="4.5"/>
  <circle cx="142" cy="97" r="3" fill="#fff" stroke="none"/>
</g>`,
  "mouse": `<g stroke="#000" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M140 150 Q190 150 186 104 Q184 86 170 90" fill="none" stroke="#F5A3B5" stroke-width="7"/>
  <circle cx="60" cy="66" r="26" fill="#BDBDBD"/><circle cx="140" cy="66" r="26" fill="#BDBDBD"/>
  <circle cx="60" cy="66" r="14" fill="#F5A3B5" stroke="none"/><circle cx="140" cy="66" r="14" fill="#F5A3B5" stroke="none"/>
  <ellipse cx="100" cy="110" rx="48" ry="46" fill="#BDBDBD"/>
  <ellipse cx="100" cy="142" rx="30" ry="20" fill="#E8E8E8" stroke="none"/>
  <circle cx="80" cy="98" r="5.5" fill="#000" stroke="none"/><circle cx="120" cy="98" r="5.5" fill="#000" stroke="none"/>
  <circle cx="100" cy="122" r="7" fill="#F5A3B5" stroke-width="4"/>
  <path d="M100 129 V136 M90 140 Q95 146 100 138 Q105 146 110 140" fill="none" stroke-width="4"/>
  <rect x="95" y="138" width="10" height="9" rx="2" fill="#fff" stroke-width="3.5"/>
  <path d="M68 124 L36 118 M68 132 L38 140 M132 124 L164 118 M132 132 L162 140" fill="none" stroke-width="3.5"/>
</g>`
};
