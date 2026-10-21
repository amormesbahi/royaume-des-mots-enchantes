/* =============================================================================
   BIBLIOTHÈQUE D'ILLUSTRATIONS
   Petits dessins vectoriels (SVG inline, sans fichier image, sans dépendance).
   Chaque scène est décorative : le sens est toujours porté par le texte.
   Rendu : illus('lacet')  →  <span class="illu">…svg…</span>
   ========================================================================== */
(function (global) {
  'use strict';

  var S = '<svg viewBox="0 0 160 110" preserveAspectRatio="xMidYMid meet" focusable="false">';

  var ILLU = {

    /* ── Le conte : situations initiales et péripéties ───────────── */
    lacet: S + '<path d="M0 74h160v36H0z" fill="#4a8fc0"/>' +
      '<path d="M0 74q20-7 40 0t40 0 40 0 40 0v36H0z" fill="#35719c"/>' +
      '<path d="M14 84h30M58 90h26M104 82h34" stroke="#8fd0ef" stroke-width="3" stroke-linecap="round" opacity=".7"/>' +
      '<circle cx="52" cy="44" r="10" fill="#ffd9b8"/>' +
      '<path d="M42 46q2-18 20-12l4 8q-10-6-20 6z" fill="#7a3b2e"/>' +
      '<path d="M40 55h24l7 22H35z" fill="#e0417c"/>' +
      '<ellipse cx="106" cy="80" rx="15" ry="8" fill="#ffffff"/>' +
      '<path d="M118 78q4-16 12-12-5 8-3 13" stroke="#ffffff" stroke-width="5" fill="none" stroke-linecap="round"/>' +
      '<path d="M128 62l9 2-8 5z" fill="#ffb703"/></svg>',

    bucheron: S + '<rect x="0" y="88" width="160" height="22" fill="#6b4b2a"/>' +
      '<rect x="92" y="44" width="10" height="46" fill="#8b5e34"/>' +
      '<path d="M97 50 76 34M97 60l22-16" stroke="#8b5e34" stroke-width="6" stroke-linecap="round"/>' +
      '<circle cx="118" cy="22" r="22" fill="#2f8f5b"/>' +
      '<circle cx="94" cy="34" r="15" fill="#37a86c"/>' +
      '<circle cx="30" cy="38" r="11" fill="#ffd9b8"/>' +
      '<path d="M20 34h20v-8h-20z" fill="#c1440e"/>' +
      '<path d="M18 50h24l7 40H14z" fill="#3a6ea5"/>' +
      '<path d="M42 68l28-14" stroke="#8b5e34" stroke-width="7" stroke-linecap="round"/>' +
      '<path d="M68 44l14 18-11 7-11-20z" fill="#b0bec5"/></svg>',

    chaumier: S + '<circle cx="130" cy="26" r="14" fill="#ffd166"/>' +
      '<rect x="28" y="58" width="104" height="42" fill="#e8d5b5"/>' +
      '<path d="M16 62 80 20l64 42z" fill="#c98b3a"/>' +
      '<path d="M16 62h128" stroke="#a9712c" stroke-width="6" stroke-linecap="round"/>' +
      '<rect x="66" y="70" width="30" height="30" rx="3" fill="#8b5e34"/>' +
      '<circle cx="80" cy="84" r="2.4" fill="#ffd166"/>' +
      '<rect x="38" y="70" width="18" height="16" rx="2" fill="#5f8fd6"/>' +
      '<rect x="104" y="70" width="18" height="16" rx="2" fill="#5f8fd6"/></svg>',

    chateau: S + '<rect x="18" y="52" width="124" height="48" fill="#d9c9a8"/>' +
      '<g fill="#b9a181"><rect x="18" y="34" width="14" height="20"/><rect x="40" y="34" width="14" height="20"/>' +
      '<rect x="62" y="34" width="14" height="20"/><rect x="84" y="34" width="14" height="20"/>' +
      '<rect x="106" y="34" width="14" height="20"/><rect x="128" y="34" width="14" height="20"/></g>' +
      '<path d="M68 100V78a12 12 0 0 1 24 0v22z" fill="#7b5b3a"/>' +
      '<rect x="30" y="66" width="14" height="14" rx="2" fill="#5f8fd6"/>' +
      '<rect x="116" y="66" width="14" height="14" rx="2" fill="#5f8fd6"/>' +
      '<path d="M80 6v22" stroke="#8b8b8b" stroke-width="3"/>' +
      '<path d="M80 6l22 6-22 8z" fill="#e04f5f"/></svg>',

    citrouille: S + '<circle cx="80" cy="72" r="30" fill="#e07b2a"/>' +
      '<circle cx="52" cy="76" r="18" fill="#ef8f3c"/>' +
      '<circle cx="108" cy="76" r="18" fill="#ef8f3c"/>' +
      '<rect x="76" y="30" width="8" height="16" rx="3" fill="#3f7d3f"/>' +
      '<path d="M84 38q14-10 22-2-10 8-22 2z" fill="#4f9a4f"/>' +
      '<circle cx="66" cy="66" r="8" fill="#ffd166"/>' +
      '<circle cx="96" cy="66" r="8" fill="#ffd166"/>' +
      '<path d="M66 86q14 10 28 0" stroke="#7a3b12" stroke-width="4" fill="none" stroke-linecap="round"/>' +
      '<path d="M18 24l3 7 7 3-7 3-3 7-3-7-7-3 7-3zM138 32l2.5 6 6 2.5-6 2.5-2.5 6-2.5-6-6-2.5 6-2.5z" fill="#ffd166"/></svg>',

    escalier: S + '<rect x="0" y="96" width="160" height="14" fill="#4a3b5c"/>' +
      '<g fill="#6f5c86"><rect x="16" y="78" width="26" height="20"/><rect x="44" y="62" width="26" height="20"/>' +
      '<rect x="72" y="46" width="26" height="20"/><rect x="100" y="30" width="26" height="20"/>' +
      '<rect x="128" y="14" width="26" height="20"/></g>' +
      '<g stroke="#9c86bd" stroke-width="2"><path d="M16 80h26M44 64h26M72 48h26M100 32h26M128 16h26"/></g>' +
      '<path d="M120 44l8 6-8 6z" fill="#ffe08a"/>' +
      '<circle cx="128" cy="50" r="3.5" fill="#fff8e1"/>' +
      '<path d="M36 90l6 5-6 5z" fill="#ffe08a"/>' +
      '<path d="M64 74l6 5-6 5z" fill="#ffe08a"/></svg>',

    paix: S + '<circle cx="132" cy="28" r="13" fill="#ffd166"/>' +
      '<rect x="0" y="84" width="160" height="26" fill="#4f8a52"/>' +
      '<rect x="30" y="46" width="100" height="40" fill="#e2d4b6"/>' +
      '<g fill="#c2b08c"><rect x="30" y="32" width="12" height="16"/><rect x="52" y="32" width="12" height="16"/>' +
      '<rect x="74" y="32" width="12" height="16"/><rect x="96" y="32" width="12" height="16"/><rect x="118" y="32" width="12" height="16"/></g>' +
      '<path d="M74 86V70a6 6 0 0 1 12 0v16z" fill="#7b5b3a"/>' +
      '<path d="M18 26q6-6 12 0M36 18q6-6 12 0" stroke="#7f8fa6" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '<circle cx="46" cy="12" r="3" fill="#7f8fa6"/></svg>',

    depart: S + '<circle cx="80" cy="22" r="14" fill="#ffd9a8"/>' +
      '<path d="M0 92h160v18H0z" fill="#6b8f5a"/>' +
      '<rect x="24" y="46" width="24" height="46" rx="10" fill="#3a6ea5"/>' +
      '<circle cx="36" cy="34" r="13" fill="#ffd9b8"/>' +
      '<path d="M66 42h28l8 50H58z" fill="#c2185b"/>' +
      '<circle cx="80" cy="30" r="13" fill="#ffd0b0"/>' +
      '<path d="M96 56l22-10" stroke="#ffd0b0" stroke-width="7" stroke-linecap="round"/>' +
      '<path d="M118 40l8 6-8 6z" fill="#ffd9b8"/>' +
      '<path d="M12 74q8-6 14 0" stroke="#2f8f5b" stroke-width="3" fill="none" stroke-linecap="round"/></svg>',

    couronne: S + '<path d="M34 82 22 30l26 18 22-30 22 30 26-18-12 52z" fill="#ffd166"/>' +
      '<rect x="34" y="82" width="92" height="12" rx="4" fill="#e0a800"/>' +
      '<circle cx="22" cy="26" r="6" fill="#e04f5f"/><circle cx="80" cy="16" r="7" fill="#4a8fc0"/>' +
      '<circle cx="138" cy="26" r="6" fill="#4f9a4f"/>' +
      '<circle cx="56" cy="56" r="4" fill="#e04f5f"/><circle cx="80" cy="52" r="4" fill="#4a8fc0"/>' +
      '<circle cx="104" cy="56" r="4" fill="#4f9a4f"/>' +
      '<path d="M20 100h120" stroke="#c79a2c" stroke-width="4" stroke-linecap="round"/></svg>',

    /* ── La fable : les animaux et leurs traits de caractère ─────── */
    avare: S + '<circle cx="42" cy="40" r="18" fill="#3b3b4a"/>' +
      '<path d="M30 34q10-12 24-2" stroke="#6b6b7d" stroke-width="4" fill="none" stroke-linecap="round"/>' +
      '<circle cx="48" cy="38" r="3" fill="#ffd166"/><circle cx="58" cy="42" r="3" fill="#ffd166"/>' +
      '<path d="M52 52l12 6-12 4z" fill="#ffb703"/>' +
      '<rect x="94" y="62" width="42" height="30" rx="5" fill="#8b5e34"/>' +
      '<path d="M104 62q4-14 22-8" stroke="#8b5e34" stroke-width="6" fill="none"/>' +
      '<text x="115" y="85" font-size="20" text-anchor="middle" fill="#ffd166" font-family="Georgia,serif">₺</text>' +
      '<circle cx="70" cy="86" r="9" fill="#ffd166"/>' +
      '<path d="M70 80v12M66 84h8" stroke="#a06b00" stroke-width="2"/></svg>',

    jaloux: S + '<rect x="118" y="26" width="12" height="72" fill="#8b5e34"/>' +
      '<circle cx="140" cy="34" r="10" fill="#4f9a4f"/>' +
      '<circle cx="124" cy="22" r="9" fill="#ffd166"/>' +
      '<path d="M124 32v8" stroke="#ffd166" stroke-width="3"/>' +
      '<circle cx="104" cy="18" r="7" fill="#ffd166"/>' +
      '<ellipse cx="46" cy="72" rx="28" ry="20" fill="#d2691e"/>' +
      '<circle cx="22" cy="58" r="13" fill="#d2691e"/>' +
      '<path d="M10 50l-8-8 12 2z" fill="#d2691e"/>' +
      '<circle cx="16" cy="54" r="3" fill="#3b3b4a"/>' +
      '<path d="M74 76q10 4 22 0" stroke="#7a3b12" stroke-width="4" fill="none" stroke-linecap="round"/>' +
      '<path d="M118 100h42" stroke="#6b4b2a" stroke-width="6" stroke-linecap="round"/></svg>',

    paresseux: S + '<rect x="118" y="18" width="12" height="84" fill="#8b5e34"/>' +
      '<circle cx="140" cy="28" r="22" fill="#2f8f5b"/>' +
      '<circle cx="118" cy="42" r="16" fill="#37a86c"/>' +
      '<ellipse cx="58" cy="82" rx="34" ry="20" fill="#a9712c"/>' +
      '<circle cx="26" cy="72" r="14" fill="#c98b3a"/>' +
      '<circle cx="18" cy="68" r="2.6" fill="#3b3b4a"/><circle cx="30" cy="66" r="2.6" fill="#3b3b4a"/>' +
      '<path d="M18 82q8 6 16 0" stroke="#7a4a12" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '<path d="M74 70q6-6 12 0M92 66q6-6 12 0" stroke="#8b8fa6" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '<text x="96" y="58" font-size="13" fill="#8b8fa6" font-family="Georgia,serif">z</text></svg>',

    /* ── La bande dessinée : les onomatopées ─────────────────────── */
    plank: S + '<rect x="0" y="86" width="160" height="24" fill="#4a3b5c"/>' +
      '<g transform="rotate(-24 76 56)"><rect x="18" y="46" width="116" height="14" rx="2" fill="#c98b3a"/>' +
      '<rect x="34" y="46" width="8" height="14" fill="#a9712c"/><rect x="72" y="46" width="8" height="14" fill="#a9712c"/>' +
      '<rect x="108" y="46" width="8" height="14" fill="#a9712c"/></g>' +
      '<circle cx="40" cy="62" r="2.5" fill="#b0bec5"/><circle cx="72" cy="50" r="2.5" fill="#b0bec5"/>' +
      '<path d="M132 22l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" fill="#ffd166"/>' +
      '<path d="M20 30q-10 8 0 16" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".6"/></svg>',

    sanglier: S + '<rect x="112" y="10" width="34" height="100" fill="#8b5e34"/>' +
      '<path d="M116 30q10-8 20 0M116 60q10-8 20 0M116 84q10-8 20 0" stroke="#6b4b2a" stroke-width="4" fill="none"/>' +
      '<ellipse cx="58" cy="70" rx="34" ry="24" fill="#5b4630"/>' +
      '<circle cx="24" cy="56" r="16" fill="#6b5340"/>' +
      '<ellipse cx="14" cy="62" rx="10" ry="8" fill="#4a3a28"/>' +
      '<circle cx="20" cy="48" r="3" fill="#ffd166"/>' +
      '<path d="M10 40q-8 10 2 14" stroke="#e8e0d0" stroke-width="4" fill="none" stroke-linecap="round"/>' +
      '<path d="M40 92l-6 12M62 94l-4 12M80 90l-2 14" stroke="#3b2f22" stroke-width="6" stroke-linecap="round"/>' +
      '<path d="M104 46l6 8-8 4z" fill="#ffd166"/></svg>',

    moustique: S + '<circle cx="128" cy="56" r="22" fill="#ffd9b8"/>' +
      '<path d="M128 40q-14 4-18 16" stroke="#e0b090" stroke-width="5" fill="none" stroke-linecap="round"/>' +
      '<ellipse cx="52" cy="58" rx="16" ry="12" fill="#6b6b7d"/>' +
      '<circle cx="38" cy="56" r="9" fill="#4a4a5a"/>' +
      '<circle cx="32" cy="54" r="2.4" fill="#ff6b81"/><circle cx="42" cy="56" r="2.4" fill="#ff6b81"/>' +
      '<path d="M66 58l18-4" stroke="#4a4a5a" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M50 46q-6-16 6-22 14-6 20 6" stroke="#b0bec5" stroke-width="3" fill="none" opacity=".75"/>' +
      '<path d="M78 40q10-12 22-8" stroke="#b0bec5" stroke-width="3" fill="none" opacity=".75"/>' +
      '<path d="M40 72l-10 22M60 70l4 24" stroke="#4a4a5a" stroke-width="3" stroke-linecap="round"/>' +
      '<text x="16" y="26" font-size="15" fill="#8b8fa6" font-family="Georgia,serif">zzz</text></svg>',

    /* ── La légende : héros, djebel, oasis ───────────────────────── */
    heros: S + '<circle cx="80" cy="30" r="14" fill="#ffd0b0"/>' +
      '<path d="M66 26q6-14 18-8 8 4 4 10-10-6-22 4z" fill="#3b2f22"/>' +
      '<path d="M58 46h44l-6 50H64z" fill="#c1121f"/>' +
      '<path d="M58 48 36 74l8 6 18-22z" fill="#e04f5f"/>' +
      '<rect x="98" y="44" width="6" height="56" rx="3" fill="#b0bec5"/>' +
      '<rect x="92" y="38" width="18" height="8" rx="3" fill="#ffd166"/>' +
      '<path d="M101 96v10M95 92h12" stroke="#8d6e00" stroke-width="5" stroke-linecap="round"/>' +
      '<circle cx="76" cy="30" r="2.6" fill="#3b3b4a"/><circle cx="88" cy="30" r="2.6" fill="#3b3b4a"/>' +
      '<path d="M78 38q5 4 10 0" stroke="#7a4a3a" stroke-width="2.5" fill="none" stroke-linecap="round"/>' +
      '<rect x="0" y="96" width="160" height="14" fill="#c9a227"/></svg>',

    djebel: S + '<circle cx="34" cy="24" r="11" fill="#ffe08a"/>' +
      '<path d="M6 96 62 26l34 42 18-20 40 48z" fill="#8b6a4a"/>' +
      '<path d="M40 62 62 26l16 20-10-2-8 12z" fill="#f2ead9" opacity=".9"/>' +
      '<path d="M96 96 116 62l22 34z" fill="#6b4f36"/>' +
      '<rect x="0" y="92" width="160" height="18" fill="#d9b26f"/>' +
      '<path d="M60 22l2.4 5.4 5.6 2.6-5.6 2.6-2.4 5.4-2.4-5.4-5.6-2.6 5.6-2.6z" fill="#ffd166"/>' +
      '<circle cx="94" cy="34" r="2.6" fill="#fff6d0"/><circle cx="120" cy="18" r="2.2" fill="#fff6d0"/></svg>',

    oasis: S + '<circle cx="132" cy="24" r="13" fill="#ffd166"/>' +
      '<rect x="0" y="76" width="160" height="34" fill="#e2c07a"/>' +
      '<ellipse cx="72" cy="84" rx="56" ry="12" fill="#4a8fc0"/>' +
      '<ellipse cx="72" cy="84" rx="34" ry="7" fill="#6fb4dc"/>' +
      '<rect x="42" y="34" width="8" height="44" fill="#8b5e34"/>' +
      '<path d="M46 40q-22-14-30 2 18 6 30 2zM46 40q22-14 30 2-18 6-30 2zM46 36q-12-20 0-24 12 4 0 24z" fill="#2f8f5b"/>' +
      '<rect x="96" y="42" width="7" height="34" fill="#8b5e34"/>' +
      '<path d="M99 47q-18-11-24 2 14 5 24 1zM99 47q18-11 24 2-14 5-24 1z" fill="#37a86c"/>' +
      '<path d="M24 92h24M112 92h22" stroke="#c9a227" stroke-width="4" stroke-linecap="round" opacity=".5"/></svg>',

    /* ── Les métamorphoses ───────────────────────────────────────── */
    chenille: S + '<rect x="0" y="88" width="160" height="22" fill="#4f8a52"/>' +
      '<circle cx="42" cy="72" r="18" fill="#7ac74f"/>' +
      '<circle cx="68" cy="70" r="16" fill="#8fd85f"/>' +
      '<circle cx="92" cy="70" r="14" fill="#7ac74f"/>' +
      '<circle cx="112" cy="72" r="13" fill="#8fd85f"/>' +
      '<circle cx="42" cy="72" r="3" fill="#2b3b1f"/><circle cx="42" cy="66" r="2" fill="#fff"/>' +
      '<path d="M124 68l8-8M124 74l9 5" stroke="#5a9a3a" stroke-width="3" stroke-linecap="round"/>' +
      '<path d="M30 56q14-10 24 0" stroke="#c8a415" stroke-width="4" fill="none" stroke-linecap="round"/>' +
      '<circle cx="140" cy="40" r="3" fill="#ffd166"/><circle cx="22" cy="40" r="2.4" fill="#ffd166"/></svg>',

    papillon: S + '<path d="M80 56c-14-24-46-26-52-8-6 18 20 34 52 12z" fill="#7c5cff"/>' +
      '<path d="M80 56c14-24 46-26 52-8 6 18-20 34-52 12z" fill="#a58bff"/>' +
      '<path d="M80 58c-12 14-40 16-44 2-4-14 22-20 44-6z" fill="#ff8fb1"/>' +
      '<path d="M80 58c12 14 40 16 44 2 4-14-22-20-44-6z" fill="#ffb3c9"/>' +
      '<rect x="77" y="34" width="6" height="46" rx="3" fill="#4a3b5c"/>' +
      '<circle cx="80" cy="30" r="6" fill="#4a3b5c"/>' +
      '<path d="M76 26l-8-10M84 26l8-10" stroke="#4a3b5c" stroke-width="2.4" stroke-linecap="round"/>' +
      '<circle cx="66" cy="14" r="2.6" fill="#ffd166"/><circle cx="94" cy="14" r="2.6" fill="#ffd166"/></svg>',

    graine: S + '<rect x="0" y="84" width="160" height="26" fill="#6b4b2a"/>' +
      '<path d="M80 88c-14-26-40-30-46-14-6 16 20 28 46 14z" fill="#4f9a4f"/>' +
      '<path d="M80 88c14-26 40-30 46-14 6 16-20 28-46 14z" fill="#63b063"/>' +
      '<ellipse cx="80" cy="78" rx="15" ry="18" fill="#a9712c"/>' +
      '<path d="M72 70q8 8 4 18" stroke="#7a4a12" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '<rect x="0" y="96" width="160" height="14" fill="#8b5e34"/>' +
      '<path d="M120 40l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="#ffd166"/></svg>',

    chene: S + '<rect x="0" y="88" width="160" height="22" fill="#6b4b2a"/>' +
      '<rect x="72" y="52" width="16" height="38" fill="#8b5e34"/>' +
      '<path d="M80 60 62 46M80 66l20-14" stroke="#8b5e34" stroke-width="7" stroke-linecap="round"/>' +
      '<circle cx="80" cy="34" r="26" fill="#2f8f5b"/>' +
      '<circle cx="52" cy="46" r="18" fill="#37a86c"/>' +
      '<circle cx="110" cy="44" r="20" fill="#2b8054"/>' +
      '<circle cx="76" cy="18" r="16" fill="#37a86c"/>' +
      '<circle cx="34" cy="72" r="4" fill="#c0392b"/><circle cx="124" cy="74" r="4" fill="#c0392b"/></svg>',

    source: S + '<path d="M0 60 46 30l34 22 34-24 46 32v50H0z" fill="#8b6a4a"/>' +
      '<path d="M0 76 46 52l34 18 34-20 46 26v34H0z" fill="#6b4f36"/>' +
      '<ellipse cx="80" cy="86" rx="40" ry="16" fill="#4a8fc0"/>' +
      '<ellipse cx="80" cy="86" rx="24" ry="9" fill="#7cc4ea"/>' +
      '<path d="M78 62V44a6 6 0 0 1 12 0v18z" fill="#bfe6ff" opacity=".85"/>' +
      '<circle cx="52" cy="18" r="2.6" fill="#fff"/><circle cx="110" cy="16" r="2.2" fill="#fff"/>' +
      '<path d="M0 100h160" stroke="#4a3b5c" stroke-width="8"/></svg>',

    fontaine: S + '<rect x="0" y="88" width="160" height="22" fill="#6b4b2a"/>' +
      '<ellipse cx="80" cy="88" rx="52" ry="12" fill="#d9c9a8"/>' +
      '<ellipse cx="80" cy="86" rx="42" ry="9" fill="#4a8fc0"/>' +
      '<rect x="74" y="48" width="12" height="38" fill="#c2b08c"/>' +
      '<ellipse cx="80" cy="46" rx="24" ry="8" fill="#e2d4b6"/>' +
      '<path d="M80 40V24" stroke="#bfe6ff" stroke-width="6" stroke-linecap="round"/>' +
      '<circle cx="80" cy="20" r="6" fill="#7cc4ea"/>' +
      '<path d="M62 34q-8-12 0-18M98 34q8-12 0-18" stroke="#bfe6ff" stroke-width="4" fill="none" stroke-linecap="round"/>' +
      '<circle cx="54" cy="16" r="2.4" fill="#fff"/><circle cx="106" cy="18" r="2.4" fill="#fff"/></svg>',

    /* ── Le cahier d'activités :textscènes des TD ────────────────── */
    sorciere: S + '<rect x="0" y="94" width="160" height="16" fill="#4a3b5c"/>' +
      '<circle cx="132" cy="20" r="11" fill="#ffe08a"/>' +
      '<path d="M20 94l12-46 12 46z" fill="#3d2b63"/>' +
      '<path d="M24 62h16l-3-12H27z" fill="#2b1b4a"/>' +
      '<circle cx="32" cy="52" r="8" fill="#e8c39e"/>' +
      '<rect x="58" y="52" width="5" height="42" rx="2" fill="#8b5e34"/>' +
      '<path d="M50 90l22 2-5 8-19-2z" fill="#c98b3a"/>' +
      '<ellipse cx="86" cy="78" rx="15" ry="17" fill="#6aa84f"/>' +
      '<circle cx="86" cy="58" r="9" fill="#8fce6a"/>' +
      '<circle cx="81" cy="56" r="2" fill="#2b3b1f"/><circle cx="91" cy="56" r="2" fill="#2b3b1f"/>' +
      '<path d="M78 88v8M94 88v8" stroke="#6aa84f" stroke-width="5" stroke-linecap="round"/>' +
      '<ellipse cx="118" cy="86" rx="10" ry="12" fill="#7fbde0"/>' +
      '<circle cx="118" cy="72" r="7" fill="#e8c39e"/>' +
      '<path d="M108 82q10-8 20 0" stroke="#bfe6ff" stroke-width="2" fill="none" opacity=".9"/>' +
      '<ellipse cx="144" cy="84" rx="9" ry="11" fill="#f2b8d0"/>' +
      '<circle cx="144" cy="71" r="6" fill="#ffd9c2"/>' +
      '<path d="M136 80q8-7 16 0" stroke="#fff" stroke-width="2" fill="none" opacity=".9"/></svg>',

    alibaba: S + '<rect x="0" y="90" width="160" height="20" fill="#6b4b2a"/>' +
      '<path d="M8 92q0-52 40-52t40 52z" fill="#6f5c86"/>' +
      '<path d="M20 92q0-38 28-38t28 38z" fill="#2a1030"/>' +
      '<rect x="70" y="66" width="34" height="26" rx="3" fill="#8b5e34"/>' +
      '<rect x="70" y="74" width="34" height="4" fill="#5c2f1a"/>' +
      '<circle cx="90" cy="72" r="2.4" fill="#ffd166"/>' +
      '<circle cx="98" cy="96" r="7" fill="#ffd166"/><circle cx="86" cy="96" r="6" fill="#ffd166"/>' +
      '<circle cx="118" cy="94" r="7" fill="#ffb703"/><circle cx="128" cy="88" r="5" fill="#ffd166"/>' +
      '<rect x="124" y="36" width="7" height="54" fill="#5c2f1a"/>' +
      '<path d="M120 30h15v8h-15z" fill="#c1440e"/>' +
      '<path d="M118 20h19v11h-19z" fill="#c1440e" rx="2"/>' +
      '<circle cx="150" cy="30" r="9" fill="#4a8fc0"/></svg>',

    vache: S + '<rect x="0" y="82" width="160" height="28" fill="#4f8a52"/>' +
      '<path d="M0 84h160" stroke="#3d6f40" stroke-width="3"/>' +
      '<ellipse cx="80" cy="58" rx="36" ry="22" fill="#f6f1e4"/>' +
      '<circle cx="112" cy="44" r="15" fill="#3a3a44"/>' +
      '<path d="M120 34q6-10 12-4-6 6-12 4z" fill="#f6f1e4"/>' +
      '<circle cx="120" cy="42" r="2.4" fill="#fff"/><circle cx="128" cy="44" r="2.4" fill="#fff"/>' +
      '<ellipse cx="118" cy="52" rx="7" ry="5" fill="#e8c9b0"/>' +
      '<path d="M52 76v14M68 78v12M94 78v12M108 74v16" stroke="#e8dcc4" stroke-width="6" stroke-linecap="round"/>' +
      '<path d="M62 40q10-8 20 0" stroke="#3a3a44" stroke-width="4" fill="none" stroke-linecap="round"/>' +
      '<path d="M80 40v36" stroke="#3a3a44" stroke-width="4"/>' +
      '<circle cx="80" cy="44" r="4.5" fill="#ffd166"/>' +
      '<circle cx="26" cy="26" r="3" fill="#7ac74f"/><circle cx="34" cy="16" r="2.4" fill="#7ac74f"/></svg>',

    lion: S + '<rect x="0" y="94" width="160" height="16" fill="#c98b3a"/>' +
      '<circle cx="52" cy="44" r="27" fill="#b06a1f"/>' +
      '<circle cx="52" cy="46" r="21" fill="#d98c33"/>' +
      '<circle cx="52" cy="50" r="16" fill="#f0c060"/>' +
      '<circle cx="46" cy="46" r="2.4" fill="#3b2f22"/><circle cx="58" cy="46" r="2.4" fill="#3b2f22"/>' +
      '<path d="M48 58q4 4 8 0" stroke="#7a4a12" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
      '<path d="M40 76v16M64 76v16" stroke="#b06a1f" stroke-width="8" stroke-linecap="round"/>' +
      '<ellipse cx="116" cy="82" rx="20" ry="14" fill="#d2691e"/>' +
      '<circle cx="98" cy="70" r="11" fill="#d2691e"/>' +
      '<path d="M88 64l-7-6 10 1z" fill="#d2691e"/>' +
      '<circle cx="93" cy="67" r="2.2" fill="#3b3b4a"/>' +
      '<path d="M92 74q6 3 12 0" stroke="#7a3b12" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
      '<path d="M134 84q10-4 16 2-8 6-16-2z" fill="#a9712c"/>' +
      '<circle cx="142" cy="58" r="2.6" fill="#ffd166"/><circle cx="150" cy="72" r="2" fill="#ffd166"/></svg>',

    bd: S + '<rect x="0" y="0" width="160" height="110" fill="#fff8ea"/>' +
      '<g stroke="#3b3b4a" stroke-width="2.5" fill="none">' +
      '<rect x="6" y="8" width="47" height="94"/><rect x="56" y="8" width="47" height="94"/>' +
      '<rect x="106" y="8" width="48" height="94"/></g>' +
      '<path d="M10 78q10-30 22-6t16-12v38H10z" fill="#6aa84f"/>' +
      '<circle cx="26" cy="34" r="11" fill="#d2691e"/>' +
      '<path d="M20 24l-4-9 10 4z" fill="#d2691e"/>' +
      '<path d="M60 84q10-26 20-8t18-14v36H60z" fill="#4a8fc0"/>' +
      '<circle cx="80" cy="34" r="11" fill="#e8d5b5"/>' +
      '<path d="M112 62q10-22 18-6t18-10v52h-36z" fill="#c98b3a"/>' +
      '<circle cx="130" cy="34" r="11" fill="#6b6b7d"/>' +
      '<path d="M12 14h34a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H12z" fill="#fff" stroke="#3b3b4a" stroke-width="2"/>' +
      '<path d="M62 14h34a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H62z" fill="#fff" stroke="#3b3b4a" stroke-width="2"/>' +
      '<path d="M112 14h34a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4h-34z" fill="#fff" stroke="#3b3b4a" stroke-width="2"/>' +
      '<path d="M17 22h24M17 29h18M67 22h24M67 29h18M117 22h24M117 29h18" stroke="#8b8b96" stroke-width="2.5" stroke-linecap="round"/>' +
      '<text x="24" y="94" font-size="22" font-family="Georgia,serif" fill="#e04f5f">Ahou !</text>' +
      '<text x="70" y="94" font-size="22" font-family="Georgia,serif" fill="#3a6ea5">Plic !</text>' +
      '<text x="118" y="94" font-size="20" font-family="Georgia,serif" fill="#4f9a4f">Bzzzz</text></svg>',

    grenadier: S + '<rect x="0" y="88" width="160" height="22" fill="#6b4b2a"/>' +
      '<rect x="70" y="50" width="18" height="40" fill="#8b5e34"/>' +
      '<path d="M79 58 62 46M79 66l20-14" stroke="#8b5e34" stroke-width="6" stroke-linecap="round"/>' +
      '<circle cx="80" cy="30" r="24" fill="#2f8f5b"/>' +
      '<circle cx="54" cy="42" r="16" fill="#37a86c"/>' +
      '<circle cx="106" cy="40" r="18" fill="#2b8054"/>' +
      '<circle cx="76" cy="14" r="14" fill="#37a86c"/>' +
      '<circle cx="62" cy="28" r="6" fill="#d1362f"/><circle cx="96" cy="26" r="6.5" fill="#d1362f"/>' +
      '<circle cx="82" cy="44" r="6" fill="#e04f5f"/><circle cx="110" cy="52" r="5" fill="#d1362f"/>' +
      '<circle cx="46" cy="34" r="5" fill="#e04f5f"/>' +
      '<circle cx="60" cy="26" r="1.6" fill="#fff6d0"/><circle cx="94" cy="24" r="1.6" fill="#fff6d0"/>' +
      '<circle cx="128" cy="20" r="2.6" fill="#ffd166"/><circle cx="20" cy="24" r="2.2" fill="#ffd166"/></svg>',

    /* ── Neutre ──────────────────────────────────────────────────── */
    defaut: S + '<rect x="34" y="26" width="92" height="62" rx="8" fill="#6b4f8f"/>' +
      '<rect x="34" y="26" width="92" height="12" rx="6" fill="#8a6ab0"/>' +
      '<path d="M80 34v46" stroke="#c9b6e4" stroke-width="3"/>' +
      '<path d="M48 58h24M48 66h24M92 58h22M92 66h16" stroke="#c9b6e4" stroke-width="3" stroke-linecap="round" opacity=".8"/>' +
      '<circle cx="80" cy="86" r="4" fill="#ffd166"/>' +
      '<path d="M124 30q10 8 0 16" stroke="#ffd166" stroke-width="3" fill="none" stroke-linecap="round"/></svg>'
  };

  /* Deux variantes utiles : le livre (page de garde) et la plume. */
  ILLU.livre = S + '<rect x="24" y="30" width="52" height="58" rx="5" fill="#8e5bb5"/>' +
    '<rect x="84" y="30" width="52" height="58" rx="5" fill="#a06fc9"/>' +
    '<path d="M80 30v58" stroke="#4a2f6b" stroke-width="4"/>' +
    '<path d="M34 44h32M34 54h32M94 44h32M94 54h32" stroke="#dcc8f0" stroke-width="3" stroke-linecap="round"/>' +
    '<circle cx="80" cy="20" r="5" fill="#ffd166"/>';

  ILLU.plume = S + '<path d="M132 16 74 74l-14 20 20-14 58-58z" fill="#f5f0e6"/>' +
    '<path d="M132 16 74 74l-6-6 58-58z" fill="#d9cfb8"/>' +
    '<path d="M60 94l-10 4 4-10z" fill="#ffd166"/>' +
    '<path d="M40 96h84" stroke="#c9b6e4" stroke-width="4" stroke-linecap="round" opacity=".7"/>';

  function illus(nom, classe) {
    return '<span class="illu' + (classe ? ' ' + classe : '') + '" aria-hidden="true">' +
      (ILLU[nom] || ILLU.defaut) + '</svg>';
  }

  global.ILLUSTRATIONS = ILLU;
  global.illus = illus;
})(window);