/* =========================================================================
   LE ROYAUME DES MOTS ENCHANTÉS — Moteur de l'application
   Navigation par ancre (#/) · vues · orbes magiques · exercices illustrés
   ========================================================================= */
(function () {
  'use strict';

  /* ====================================================== UTILITAIRES ==== */
  const $ = (sel, racine) => (racine || document).querySelector(sel);
  const app = $('#app');
  const voile = $('#voile');
  const modale = $('#modale');
  const modaleCarte = $('#modale-carte');
  const toastZone = $('#toast-zone');
  const navPrincipale = $('#nav-principal');
  const burger = $('#burger');

  /* écran vidéo de l'accueil */
  const ecranVideo = $('#ecran-video');
  const boutonPause = $('#ecran-pause');
  if (ecranVideo) {
    ecranVideo.addEventListener('play', majPause);
    ecranVideo.addEventListener('pause', majPause);
    ecranVideo.addEventListener('error', () => {
      document.body.dataset.ecran = 'erreur';
    });
  }

  const sansAccent = (s) => String(s)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  function melange(a) {
    const b = a.slice();
    for (let i = b.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = b[i]; b[i] = b[j]; b[j] = t;
    }
    return b;
  }
  const serie = (n) => { const a = []; for (let i = 0; i < n; i++) a.push(i); return a; };

  function choisirAutres(pool, exclu, k) {
    return melange(pool.filter((x) => x !== exclu)).slice(0, k);
  }

  /* =================================================== ACCÈS AUX DONNÉES = */
  const theme = (id) => THEMES.find((t) => t.id === id) || THEMES[0];
  const sequence = (id) => SEQUENCES.find((s) => s.id === id);
  const semaine = (n) => SEMAINES.find((s) => !s.vacances && s.n === Number(n));
  const typeInfo = (t) => TYPES[t] || { label: t, icon: '•', famille: 'autre' };

  /* **gras** → <b>gras</b> : le cahier d'activités souligne certains mots */
  const gras = (s) => String(s == null ? '' : s)
    .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
    .replace(/«\s*(.+?)\s*»/g, '« <i>$1</i> »');

  const COULEUR_FAMILLE = {
    comprehension: 'or',
    langue: 'marine',
    production: 'violette',
    evaluation: 'verte',
    td: 'rose',
    autre: ''
  };
  const puceDe = (famille) => COULEUR_FAMILLE[famille] || '';

  const PUCE_THEME = { 1: 'rose', 2: 'marine', 3: 'violette' };
  const puceTheme = (thId) => PUCE_THEME[thId] || 'or';

  function semainesDeSequence(seqId) { return SEMAINES.filter((s) => !s.vacances && s.seq === seqId); }
  function semainesDuTheme(thId) { return SEMAINES.filter((s) => !s.vacances && s.theme === thId); }
  function sequencesDuTheme(thId) { return SEQUENCES.filter((s) => s.theme === thId); }

  function indexGlobalSemaine(sem, i) {
    let c = 0;
    for (const s of SEMAINES) {
      if (s.vacances) continue;
      if (s.n === sem.n) return c + i + 1;
      c += s.seances.length;
    }
    return 0;
  }

  function voisinSeance(sem, i) {
    const ordre = SEMAINES.filter((s) => !s.vacances);
    const pos = ordre.findIndex((s) => s.n === sem.n);
    if (i > 0) return { sem, i: i - 1, sens: 'precedente' };
    if (i < sem.seances.length - 1) return { sem, i: i + 1, sens: 'suivante' };
    if (pos > 0) return { sem: ordre[pos - 1], i: ordre[pos - 1].seances.length - 1, sens: 'precedente' };
    if (pos < ordre.length - 1) return { sem: ordre[pos + 1], i: 0, sens: 'suivante' };
    return null;
  }

  function stats() {
    const semaines = SEMAINES.filter((s) => !s.vacances);
    const seances = semaines.reduce((n, s) => n + s.seances.length, 0);
    return {
      semaines: semaines.length,
      seances,
      sequences: SEQUENCES.length,
      projets: THEMES.length,
      jeux: Object.keys(JEUX).length,
      pagesFiches: 109,
      pagesManuel: 154
    };
  }

  /* ============================================================ DÉCORS ==== */

  /* L'accueil affiche la vidéo en plein écran, toutes les autres pages le
     décor SVG. Le bouton Pause n'existe que sur l'accueil. */
  function majEcran(estAccueil) {
    const actif = Boolean(estAccueil);
    document.body.dataset.ecran = actif ? 'video' : 'svg';
    if (!ecranVideo) return;
    if (actif) {
      if (mouvementReduit()) { ecranVideo.pause(); majPause(); }
      else { ecranVideo.play().catch(() => {}); }
    } else {
      ecranVideo.pause();
    }
  }
  function majPause() {
    if (!boutonPause || !ecranVideo) return;
    const joue = !ecranVideo.paused;
    boutonPause.setAttribute('aria-pressed', joue ? 'false' : 'true');
    boutonPause.querySelector('.ecran-pause-ic').textContent = joue ? '❚❚' : '▶';
    boutonPause.querySelector('.ecran-pause-txt').textContent = joue ? 'Pause' : 'Lecture';
    boutonPause.setAttribute('aria-label', joue ? 'Mettre la vidéo de fond en pause' : 'Reprendre la vidéo de fond');
  }

  function appliquerDecor(thId) {
    document.body.dataset.theme = String(thId || 0);
    $('#decors').dataset.decor = thId === 1 ? 'chaperon' : thId === 2 ? 'renard' : thId === 3 ? 'ogresse' : 'mixte';
  }

  /* ============================================================= TOASTS ==== */
  function toast(titre, detail, icone) {
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = '<span class="ic" aria-hidden="true">' + (icone || '✨') + '</span>' +
      '<div><b>' + titre + '</b><span>' + detail + '</span></div>';
    toastZone.appendChild(el);
    setTimeout(() => {
      el.classList.add('toast-sortie');
      setTimeout(() => el.remove(), 320);
    }, 5600);
  }

  /* ============================================================ MODALE ==== */
  let dernierFocus = null;
  function ouvrirModal(html, variante) {
    dernierFocus = document.activeElement;
    modaleCarte.onclick = null;
    modaleCarte.innerHTML = html;
    voile.hidden = false;
    modale.hidden = false;
    modale.classList.toggle('lecteur', variante === 'lecteur');
    modale.setAttribute('aria-labelledby', 'modale-titre');
    document.body.style.overflow = 'hidden';
    const f = modaleCarte.querySelector('[data-fermer]');
    if (f) f.focus();
  }
  function fermerModal() {
    voile.hidden = true;
    modale.hidden = true;
    modale.classList.remove('lecteur');
    modaleCarte.onclick = null;
    modaleCarte.innerHTML = '';
    document.body.style.overflow = '';
    if (dernierFocus && dernierFocus.focus) dernierFocus.focus();
  }
  const modaleOuverte = () => !modale.hidden;

  voile.addEventListener('click', fermerModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modaleOuverte()) { fermerModal(); return; }
    if (e.key === 'Tab' && modaleOuverte()) {
      const f = modaleCarte.querySelectorAll('button, a[href], input, [tabindex]:not([tabindex="-1"])');
      if (!f.length) return;
      const list = Array.prototype.slice.call(f).filter((x) => !x.disabled && x.offsetParent !== null);
      if (!list.length) return;
      const first = list[0], last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ============================================================= ORBES ==== */
  function particules(n) {
    let s = '';
    for (let i = 0; i < n; i++) {
      const a = (Math.PI * 2 * i) / n + Math.random() * 0.7;
      const r = 26 + Math.random() * 15;
      s += '<i style="--dx:' + Math.cos(a) * r + 'px;--dy:' + Math.sin(a) * r +
        'px;animation-delay:' + (Math.random() * 3.2).toFixed(2) + 's"></i>';
    }
    return s;
  }

  /* Poussière de lutins : n éclats scintillants semés sur la sphère de verre.
     Trois familles — des paillettes le long du bord, des étincelles au
     centre et des éclats qui montent puis retombent.                     */
  function glitters(n) {
    let s = '';
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 22 + Math.random() * 30;                 /* rayon du semis */
      const taille = (1.6 + Math.random() * 3.4).toFixed(1);
      const duree = (2.6 + Math.random() * 4.4).toFixed(2);
      const retard = (Math.random() * 5).toFixed(2);
      const monte = (-16 - Math.random() * 26).toFixed(0);
      s += '<i style="--gx:' + (50 + Math.cos(a) * r).toFixed(1) + '%;' +
        '--gy:' + (50 + Math.sin(a) * r).toFixed(1) + '%;' +
        '--gt:' + taille + 'px;--gm:' + monte + 'px;' +
        '--gd:' + duree + 's;--gr:' + retard + 's"></i>';
    }
    return s;
  }

  function orbe(o) {
    const attrs = o.attrs || '';
    const prefixe = o.icone + ' ' + o.titre + ' ' + (o.page || '');
    return '<button class="orbe ' + o.classe + '" type="button" ' + attrs +
      (o.disabled ? ' disabled aria-disabled="true"' : '') +
      ' title="' + prefixe + ' — ' + (o.aria || 'ouvrir le document') + '"' +
      ' aria-label="' + prefixe + ' — ' + (o.aria || 'ouvrir le document') + '">' +
      '<span class="orbe-halo" aria-hidden="true"></span>' +
      '<span class="orbe-anneau" aria-hidden="true"></span>' +
      '<span class="orbe-particules" aria-hidden="true">' + particules(o.particules || 8) + '</span>' +
      '<span class="orbe-glitter" aria-hidden="true">' + glitters(o.glitters || 16) + '</span>' +
      '<span class="orbe-noyau" aria-hidden="true">' +
      '<span class="orbe-reflet" aria-hidden="true"></span>' +
      '<span class="orbe-icone">' + o.icone + '</span> ' +
      '<span class="orbe-titre">' + o.titre + '</span> ' +
      '<span class="orbe-page">' + (o.page || '') + '</span>' +
      '</span></button>';
  }

  /* Rideau de paillettes de l'écran :illusion de poussière d'étoiles.
     Décoratif, donc aria-hidden et sans effet sur la lecture.            */
  function rideauGlitter(n) {
    let s = '';
    for (let i = 0; i < n; i++) {
      const taille = (1.5 + Math.random() * 3.2).toFixed(1);
      const duree = (7 + Math.random() * 12).toFixed(2);
      const retard = (Math.random() * 14).toFixed(2);
      const monte = (-30 - Math.random() * 70).toFixed(0);
      s += '<i style="--gx:' + (Math.random() * 100).toFixed(1) + '%;' +
        '--gy:' + (Math.random() * 100).toFixed(1) + '%;' +
        '--gt:' + taille + 'px;--gm:' + monte + 'px;' +
        '--gd:' + duree + 's;--gr:' + retard + 's"></i>';
    }
    return s;
  }

  /* ═══════════════════════════════════════ LECTEUR DE PDF INTÉGRÉ ══ */
  const PAGES_PDF = { fiches: 109, manuel: 154 };

  function ouvrirLecteur(doc, page, etiquette, fin) {
    const url = META.docs[doc];
    if (!url) return;
    const total = PAGES_PDF[doc] || 1;
    const nom = doc === 'fiches' ? '📜 Fiches pédagogiques' : '📖 Manuel scolaire 2AM';
    let courante = Math.min(Math.max(parseInt(page, 10) || 1, 1), total);
    const srcDe = (n) => url + '?p=' + n + '#page=' + n + '&view=Fit';
    const lienDe = (n) => url + '#page=' + n + '&view=Fit';
    const plage = fin && parseInt(fin, 10) > courante
      ? ' <b class="lecteur-plage">Plage du document : pages ' + courante + ' à ' + fin + '</b>' : '';

    ouvrirModal(
      '<div class="modale-tete">' +
        '<div><div class="sous">Lecteur intégré · document officiel</div>' +
        '<h2 id="modale-titre">' + nom + '</h2></div>' +
        '<button class="fermer" type="button" data-fermer aria-label="Fermer le lecteur">✕</button>' +
      '</div>' +
      '<p class="lecteur-desc">La page s\'affiche ci-dessous, sans quitter le site.' +
        (etiquette ? ' ' + etiquette : '') + plage + '</p>' +
      '<div class="lecteur-barre">' +
        '<button class="btn petit" type="button" data-pg="-1">‹ Page précédente</button>' +
        '<span class="lecteur-compteur">Page <b data-num>' + courante + '</b> sur ' + total + '</span>' +
        '<button class="btn petit" type="button" data-pg="1">Page suivante ›</button>' +
        (plage ? '<button class="btn petit" type="button" data-pg-fin="' + fin + '">Aller à la p. ' + fin + '</button>' : '') +
        '<span class="espace"></span>' +
        '<a class="btn petit" data-ouvrir href="' + lienDe(courante) + '" target="_blank" rel="noopener">Nouvel onglet ↗</a>' +
      '</div>' +
      '<div class="lecteur-scene">' +
        '<div class="lecteur-attente" data-attente><span>Chargement du document…</span></div>' +
        '<iframe class="lecteur-pdf" title="' + nom + '" src="' + srcDe(courante) + '"></iframe>' +
      '</div>' +
      '<p class="lecteur-note">Astuce : utilisez la molette dans le document pour zoomer, et ← → pour changer de page.</p>',
      'lecteur'
    );

    const cadre = modaleCarte;
    const iframe = cadre.querySelector('.lecteur-pdf');
    const attente = cadre.querySelector('[data-attente]');
    const lien = cadre.querySelector('[data-ouvrir]');
    const num = cadre.querySelector('[data-num]');
    iframe.addEventListener('load', () => { attente.hidden = true; });

    cadre.onclick = (ev) => {
      const saut = ev.target.closest('[data-pg-fin]');
      if (saut) { aller(parseInt(saut.dataset.pgFin, 10)); return; }
      const b = ev.target.closest('[data-pg]');
      if (b) aller(courante + Number(b.dataset.pg));
    };

    function aller(n) {
      const v = Math.min(Math.max(n, 1), total);
      courante = v;
      num.textContent = v;
      lien.setAttribute('href', lienDe(v));
      attente.hidden = false;
      iframe.setAttribute('src', srcDe(v));
      toast('Page ' + v + ' ✦', 'Le document est affiché dans le lecteur intégré.',
        doc === 'fiches' ? '📜' : '📖');
    }
    toast('Document ouvert ✦', etiquette || nom, doc === 'fiches' ? '📜' : '📖');
  }

  /* Raccourcis clavier du lecteur (hors focus dans le PDF) */
  document.addEventListener('keydown', (e) => {
    if (!modale.classList.contains('lecteur') || modale.hidden) return;
    if (e.target && e.target.closest && e.target.closest('.lecteur-pdf')) return;
    if (e.target && e.target.closest && e.target.closest('[data-pg]')) return;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      const b = modaleCarte.querySelector('[data-pg="' + (e.key === 'ArrowLeft' ? -1 : 1) + '"]');
      if (b) { e.preventDefault(); b.click(); }
    }
  });

/* ══════════════════════════════════════════════════════ TRAVAUX DIRIGÉS ══
     Les 7 séances de TD de la répartition s'appuient sur les 6 blocs
     « Travaux dirigés » du CAHIER D'ACTIVITÉS (js/cahier.js).

     Un seul et unique moteur, volontairement simple :
     une illustration, une question, trois réponses, un retour immédiat.
     Trois activités par TD, reprises du cahier.
     ═════════════════════════════════════════════════════════════════ */
  function blocCahier(id) {
    const j = JEUX[id];
    return j ? CAHIER[j.cahier] : null;
  }

  function coqueJeu(titre, sous, aide, illu) {
    return '<div class="modale-tete">' +
      '<div><div class="sous">' + sous + '</div><h2 id="modale-titre">' + titre + '</h2></div>' +
      '<button class="fermer" type="button" data-fermer aria-label="Fermer le TD">✕</button></div>' +
      '<div class="jeu" id="zone-jeu">' +
      '<p class="jeu-aide">' + aide + '</p>' +
      '<ol class="exo-etapes" data-etapes></ol>' +
      '<div class="exo">' +
      '<figure class="exo-scene">' + illus(illu) + '</figure>' +
      '<div class="exo-texte">' +
      '<p class="exo-num" data-num></p>' +
      '<p class="exo-q" data-question></p>' +
      '<div class="exo-choix" data-choix></div>' +
      '<p class="exo-retour" data-retour role="status" aria-live="polite"></p>' +
      '</div></div>' +
      '<div class="jeu-actions">' +
      '<button class="btn petit" type="button" data-prev disabled>← Précédente</button>' +
      '<button class="btn petit" type="button" data-suivant>Suivante →</button>' +
      '<button class="btn petit" type="button" data-revoir>↺ Recommencer</button>' +
      '</div>' +
      '<details class="cahier-source"><summary>📖 Le texte du cahier</summary>' +
      '<div class="cahier-corps" data-cahier></div></details>' +
      '</div>';
  }

  function ouvrirJeu(id) {
    const j = JEUX[id];
    if (!j) { toast('TD indisponible', 'Cette activité n\'est pas encore chargée.', '⚠️'); return; }
    const bloc = blocCahier(id);
    if (!bloc) { toast('TD indisponible', 'Le bloc du cahier n\'est pas chargé.', '⚠️'); return; }

    const sq = sequence(j.seq);
    const th = theme(j.theme);
    const acts = bloc.activites;
    const etape = { i: 0 };

    ouvrirModal(coqueJeu(
      j.titre,
      'TD de la semaine ' + j.td + ' · séquence ' + j.seq + (sq ? ' — ' + sq.titre : '') + ' · ' + th.genre,
      bloc.source,
      j.illu
    ));

    const racine = modaleCarte.querySelector('#zone-jeu');
    const zone = racine.querySelector('[data-choix]');
    const retour = racine.querySelector('[data-retour]');
    const scene = racine.querySelector('.exo-scene');
    const q = racine.querySelector('[data-question]');
    const num = racine.querySelector('[data-num]');
    const etapes = racine.querySelector('[data-etapes]');
    const prec = racine.querySelector('[data-prev]');
    const suiv = racine.querySelector('[data-suivant]');
    let repondu = false;

    /* le pas courant */
    function rendre() {
      const a = acts[etape.i];
      repondu = false;
      q.innerHTML = gras(a.q);
      num.textContent = a.n + ' — cahier d’activités';
      scene.innerHTML = illus(a.illu);
      retour.textContent = '';
      zone.innerHTML = '';

      a.choix.forEach((texte, i) => {
        const b = document.createElement('button');
        b.className = 'exo-btn';
        b.type = 'button';
        b.textContent = texte;
        b.addEventListener('click', () => {
          if (repondu) return;
          const bonne = i === a.r;
          b.classList.add(bonne ? 'ok' : 'ko');
          if (!bonne) {
            Array.prototype.forEach.call(zone.children, (x) => { x.disabled = true; });
            const b2 = zone.children[a.r];
            if (b2) b2.classList.add('ok');
          }
          repondu = true;
          retour.innerHTML = (bonne ? '✅ <b>Bien joué !</b> ' : '💡 <b>La bonne réponse était :</b> ') +
            a.choix[a.r] + ' — ' + a.note;
          toast(bonne ? 'Bonne réponse ✦' : 'Réponse à revoir ✦', a.choix[a.r], bonne ? '🎉' : '💡');
          Array.prototype.forEach.call(etapes.children, (li, k) => {
            if (k < etape.i) li.className = 'faite';
            else if (k === etape.i) li.className = 'ok' + (bonne ? ' juste' : '');
          });
          prec.disabled = etape.i === 0;
          suiv.textContent = etape.i === acts.length - 1 ? 'Bilan ✓' : 'Suivante →';
        });
        zone.appendChild(b);
      });

      Array.prototype.forEach.call(etapes.children, (li, k) => {
        li.className = k < etape.i ? 'faite' : (k === etape.i ? 'ok' : '');
      });
      prec.disabled = etape.i === 0;
      suiv.textContent = etape.i === acts.length - 1 ? 'Bilan ✓' : 'Suivante →';
      const premier = zone.querySelector('.exo-btn');
      if (premier) premier.focus();
    }

    /* pastilles d'étapes */
    etapes.innerHTML = acts.map((a, i) =>
      '<li><button type="button" data-etape="' + i + '">' + (i + 1) + '. ' + a.n + '</button></li>'
    ).join('');
    etapes.addEventListener('click', (ev) => {
      const b = ev.target.closest('[data-etape]');
      if (!b) return;
      etape.i = Number(b.dataset.etape);
      rendre();
    });

    prec.addEventListener('click', () => { if (etape.i > 0) { etape.i--; rendre(); } });
    suiv.addEventListener('click', () => {
      if (etape.i < acts.length - 1) { etape.i++; rendre(); return; }
      const justes = etapes.querySelectorAll('li.ok.juste').length;
      toast('✦ TD terminé', justes + ' bonne' + (justes > 1 ? 's' : '') + ' réponse' + (justes > 1 ? 's' : '') + ' sur ' + acts.length + '.', '🎓');
    });
    racine.querySelector('[data-revoir]').addEventListener('click', () => { etape.i = 0; rendre(); });

    /* texte et autres activités du cahier, en référence */
    racine.querySelector('[data-cahier]').innerHTML =
      (bloc.texte ? '<p class="cahier-texte">' + bloc.texte + '</p>' : '') +
      (bloc.autres && bloc.autres.length
        ? '<h4>Autres activités du même TD</h4><ul class="cahier-autres">' +
          bloc.autres.map((x) => '<li>' + x + '</li>').join('') + '</ul>'
        : '');

    rendre();
  }

  /* =============================================================== VUES ==== */

  /* ---------------------------------------------------------- 1. ACCUEIL */
  function vueAccueil() {
    const s = stats();
    const royaume = (t) => {
      const sq = sequencesDuTheme(t.id);
      const sm = semainesDuTheme(t.id);
      const seances = sm.reduce((n, x) => n + x.seances.length, 0);
      return '<a class="royaume" data-theme="' + t.id + '" data-royaume="' + t.id + '" href="#/theme/' + t.id + '">' +
        '<span class="royaume-genre">' + t.genre + '</span>' +
        '<strong class="royaume-nom">' + t.nom + '</strong>' +
        '<p class="royaume-devise">« ' + t.devise + ' »</p>' +
        '<p class="royaume-desc">' + t.description + '</p>' +
        '<p class="royaume-meta"><span>' + sq.length + ' séquences</span>' +
        '<span>' + sm.length + ' semaines</span><span>' + seances + ' séances</span></p>' +
        '<span class="royaume-ouvrir">Entrer dans le royaume ▸</span>' +
        '</a>';
    };

    return '<div class="enveloppe accueil">' +
      '<section class="heros">' +
      '<div class="compte">' +
      '<span class="puce or">✦ 2<sup>ème</sup> année moyenne</span>' +
      '<span class="puce marine">Année scolaire ' + META.annee + '</span>' +
      '<span class="puce">' + META.volume + '</span>' +
      '<span class="puce verte">Fin de l\'année : ' + META.finCours + '</span>' +
      '</div>' +
      '<h1>Le Royaume des Mots Enchantés</h1>' +
      '<p class="chapo">Un parcours de français en trois royaumes : le <b>conte</b>, la <b>fable</b> et la <b>légende</b>. ' +
      'Sept séquences, vingt-cinq semaines de cours, cent séances — précédées en septembre d\'une semaine ' +
      'd\'évaluation et de remédiation, puis les révisions et les examens du dernier trimestre — ' +
      'et deux orbes magiques à chaque séance pour ouvrir ' +
      'la fiche pédagogique et la page du manuel.</p>' +
      '<div class="actions">' +
      '<a class="btn principal" href="#/theme/1">✨ Commencer par le conte</a>' +
      '<a class="btn" href="#/chrono">🗓 Voir la chronologie</a>' +
      '<a class="btn fantome" href="#/jeux">🎲 Les exercices des TD</a>' +
      '</div></section>' +

      '<section class="statistiques">' +
      '<div class="stat verre"><b>' + s.semaines + '</b><span>semaines</span></div>' +
      '<div class="stat verre"><b>' + s.seances + '</b><span>séances</span></div>' +
      '<div class="stat verre"><b>' + s.sequences + '</b><span>séquences</span></div>' +
      '<div class="stat verre"><b>' + s.projets + '</b><span>projets</span></div>' +
      '<div class="stat verre"><b>' + (s.jeux * 3) + '</b><span>exercices du cahier</span></div>' +
      '<div class="stat verre"><b>' + (s.pagesFiches + s.pagesManuel) + '</b><span>pages PDF</span></div>' +
      '</section>' +

      '<section class="scene-royaumes">' +
      '<h2 class="titre-vue"><span class="surtitre">Les trois royaumes</span>Choisissez votre porte</h2>' +
      '<p class="lede">Un clic sur un royaume ouvre l\'arbre de ses séquences et de ses semaines. ' +
      'On peut parcourir les trois royaumes dans l\'ordre officiel de la répartition annuelle ' +
      'ou sauter directement à la séquence de son choix.</p>' +
      '<div class="royaumes">' + THEMES.map(royaume).join('') + '</div>' +
      '</section>' +

      '<section class="bandeau-notes">' +
      '<article class="note verre"><h3>📜 Fiche pédagogique</h3><p>Chaque séance dispose d\'une fiche résumée ici : objectif, compétences, critères. ' +
      'Un clic sur l\'orbe jaune ouvre la fiche complète dans le lecteur intégré (' + s.pagesFiches + ' pages du PDF officiel).</p></article>' +
      '<article class="note verre"><h3>📖 Manuel scolaire</h3><p>L\'orbe bleu ouvre, dans le même lecteur, la page du manuel de français 2AM qui traite le même thème ' +
      '(' + s.pagesManuel + ' pages). L\'intitulé réel de la page est rappelé sous chaque orb.</p></article>' +
      '<article class="note verre"><h3>📔 Travaux dirigés du cahier</h3><p>Les sept séances de TD reprennent les blocs « Travaux dirigés » du cahier d\'activités : ' +
      'chacun donne trois activités illustrées — une image, une question, trois réponses, l\'explication et le texte du cahier.</p></article>' +
      '</section></div>';
  }

  /* ------------------------------------------------------------ 2. THÈME */
  function noeudSemaine(sem) {
    const sq = sequence(sem.seq);
    const marques = sem.seances.map((se) => {
      const tp = typeInfo(se.t);
      return '<i>' + tp.icon + '</i>';
    }).join('');
    const jeu = sem.seances.some((se) => se.jeu);
    return '<a class="noeud-semaine carte-cliquable" href="#/semaine/' + sem.n + '">' +
      '<span class="num">' + sem.n + '</span>' +
      '<span class="mois">' + sem.mois + ' · séquence ' + sq.num + '</span>' +
      '<span class="resume">' + (sem.seances[0].obj || '') + '</span>' +
      '<span class="marques">' + marques + (jeu ? '<i>🎲</i>' : '') + '</span>' +
      '</a>';
  }

  function blocSequence(sq) {
    const sm = semainesDeSequence(sq.id);
    const th = theme(sq.theme);
    return '<article class="bloc-serie verre">' +
      '<header><h2>Séquence ' + sq.num + ' · ' + sq.titre + '</h2>' +
      '<span class="puce ' + puceTheme(th.id) + '">' + sq.accent + '</span></header>' +
      '<p class="meta">' + sq.tache + ' · ' + th.genre + ' · ' + sm.length + ' semaines · fiches p. ' +
      sq.ficheDebut + ' à ' + sq.ficheFin + ' · page de garde du manuel p. ' + (sq.manuelDiviseur - 1) + '</p>' +
      '<div class="semaines">' + sm.map(noeudSemaine).join('') + '</div>' +
      '<div class="actions" style="margin-top:18px;display:flex;gap:10px;flex-wrap:wrap">' +
      '<a class="btn petit" href="#/sequence/' + sq.id + '">Ouvrir la séquence ›</a>' +
      '</div>' +
      '</article>';
  }

  function vueTheme(id) {
    const th = THEMES.find((t) => t.id === Number(id));
    if (!th) return vueIntrouvable('Cette porte n’existe pas. Choisis le conte, la fable ou la légende.');
    const sqs = sequencesDuTheme(th.id);
    const sms = semainesDuTheme(th.id);
    const totalSeances = sms.reduce((n, s) => n + s.seances.length, 0);
    const ficheDebut = sqs[0].ficheDebut, ficheFin = sqs[sqs.length - 1].ficheFin;
    const manuelDebut = sqs[0].manuelDiviseur, manuelFin = sqs[sqs.length - 1].manuelDiviseur;

    return '<div class="enveloppe">' +
      '<nav class="fil" aria-label="Fil d’Ariane"><a href="#/">Accueil</a><span class="sep">›</span><span class="ici">' + th.genre + '</span></nav>' +
      '<header class="entete-sequence">' +
      '<div class="compte" style="display:flex;gap:8px;flex-wrap:wrap">' +
      '<span class="puce rose">Projet ' + th.id + ' sur 3</span>' +
      '<span class="puce">' + sqs.length + ' séquences</span>' +
      '<span class="puce">' + sms.length + ' semaines</span>' +
      '<span class="puce verte">' + totalSeances + ' séances</span></div>' +
      '<h1>' + th.nom + '</h1>' +
      '<p class="lede"><span class="tache">« ' + th.devise + ' »</span> — ' + th.description + '</p>' +
      '<div class="orbes">' +
      orbe({ classe: 'fiche', icone: '📜', titre: 'Les fiches', page: 'p. ' + ficheDebut + '–' + ficheFin,
        aria: 'Ouvrir les fiches pédagogiques du thème dans le lecteur intégré',
        attrs: 'data-doc="fiches" data-page="' + ficheDebut + '" data-fin="' + ficheFin + '" data-label="les fiches du thème ' + th.genre.toLowerCase() + ' (p. ' + ficheDebut + ' à ' + ficheFin + ')"' }) +
      orbe({ classe: 'manuel', icone: '📖', titre: 'Le manuel', page: 'p. ' + manuelDebut,
        aria: 'Ouvrir la page du manuel qui présente le thème dans le lecteur intégré',
        attrs: 'data-doc="manuel" data-page="' + manuelDebut + '" data-label="la page du manuel ' + (manuelDebut - 1) + ' — présentation du thème ' + th.genre.toLowerCase() + '"' }) +
      '</div>' +
      '<div class="orbe-legendes">' +
      '<p class="orbe-legende fiche"><strong>Fiche pédagogique</strong><span>Le document officiel des 109 fiches, à la page ' + ficheDebut + ' de ce thème.</span></p>' +
      '<p class="orbe-legende manuel"><strong>Manuel scolaire</strong><span>Le manuel de français 2AM (ONPS) à la page ' + (manuelDebut - 1) + '.</span></p>' +
      '</div>' +
      '</header>' +
      '<div class="serie">' + sqs.map(blocSequence).join('') + '</div>' +
      '<p style="margin-top:26px"><a class="lien-fleche" href="#/chrono">Voir toute la chronologie de l’année ›</a></p>' +
      '</div>';
  }

  /* ---------------------------------------------------- 3bis. LES DEVOIRS */

  /* Les quatre devoirs d'une séquence : le sujet officiel de production
     écrite, un devoir surveillé, la préparation orale et la lecture à la
     maison. Chaque page renvoie au manuel dans le lecteur intégré. */
  function carteDevoir(sq, d, i) {
    return '<article class="devoir' + (d.officiel ? ' officiel' : '') + '">' +
      '<div class="devoir-tete">' +
      '<span class="devoir-ic" aria-hidden="true">' + d.icone + '</span>' +
      '<span class="devoir-nature">' + d.nature + '</span>' +
      (d.badge ? '<span class="devoir-badge">' + d.badge + '</span>' : '') +
      '</div>' +
      '<h3 class="devoir-sujet">' + d.sujet + '</h3>' +
      '<p class="devoir-enonce">' + d.enonce + '</p>' +
      '<p class="devoir-pied">' +
      '<button class="btn petit" type="button" data-doc="manuel" data-page="' + d.page +
      '" data-label="la page ' + d.page + ' du manuel — devoir « ' + d.sujet + ' », séquence ' + sq.num + '">' +
      '📖 Manuel p. ' + d.page + '</button>' +
      '</p></article>';
  }

  function blocDevoirs(sq) {
    if (!sq.devoirs || !sq.devoirs.length) return '';
    return '<div class="bloc bloc-devoirs">' +
      '<h2><span aria-hidden="true">📚</span> Les devoirs de la séquence</h2>' +
      '<p class="sous-titre">Sujet officiel de production écrite, devoir surveillé, ' +
      'préparation orale et lecture à la maison — d\'après la progression ' +
      'annuelle officielle 2AM. Clique sur une page pour l\'ouvrir dans le manuel.</p>' +
      '<div class="grille-devoirs">' +
      sq.devoirs.map((d, i) => carteDevoir(sq, d, i)).join('') +
      '</div>' +
      '<div class="encart encart-devoirs">' +
      '<b>À faire à la maison, puis à corriger en classe.</b> ' +
      'Les quatre devoirs couvrent les quatre rubriques officielles de la ' +
      'séquence : <i>j\'écoute</i>, <i>je lis</i>, <i>je m\'exprime</i> et <i>j\'écris</i>. ' +
      'Le devoir surveillé est noté ; la production écrite et la préparation orale ' +
      'sont évaluées avec la grille de la classe.' +
      '</div></div>';
  }

  /* Les rubriques officielles de la séquence et leurs pages de manuel. */
  function blocOfficiel(sq) {
    if (!sq.officiel || !sq.officiel.length) return '';
    return '<div class="bloc bloc-officiel">' +
      '<h2><span aria-hidden="true">📐</span> La progression officielle</h2>' +
      '<p class="sous-titre">' + (sq.projet || '') + (sq.duree ? ' · ' + sq.duree : '') + '</p>' +
      '<ul class="rubriques">' +
      sq.officiel.map((r) =>
        '<li class="rubrique ' + r.cle + '">' +
        '<span class="rubrique-libelle">' + r.libelle + '</span>' +
        '<span class="rubrique-detail">' + r.detail + '</span>' +
        '<button class="lien-page" type="button" data-doc="manuel" data-page="' + r.page +
        '" data-label="la page ' + r.page + ' du manuel — ' + r.libelle + '">' +
        'p. ' + r.page + '</button></li>').join('') +
      '</ul></div>';
  }

  /* -------------------------------------------------------- 3. SÉQUENCE */
  function ligneSeance(sem, i) {
    const se = sem.seances[i];
    const tp = typeInfo(se.t);
    const idx = indexGlobalSemaine(sem, i);
    const droite = [];
    if (se.f) droite.push('📜 p. ' + se.f.de + (se.f.a !== se.f.de ? '–' + se.f.a : ''));
    if (se.mp) droite.push('📖 p. ' + se.mp);
    if (se.jeu) droite.push('🎲 jeu');
    if (se.libre) droite.push('🕊 libre');
    return '<a class="ligne-seance" href="#/seance/' + sem.n + '/' + i + '">' +
      '<span class="type"><span class="ic">' + tp.icon + '</span><span>' + tp.label + '</span></span>' +
      '<span class="obj"><b>Séance ' + idx + ' · ' + tp.label + '</b>' + (se.obj || '') + '</span>' +
      '<span class="droite">' + droite.join(' · ') + '</span>' +
      '</a>';
  }

  function vueSequence(id) {
    const sq = sequence(Number(id));
    if (!sq) return vueIntrouvable('Cette séquence n’existe pas.');
    const th = theme(sq.theme);
    const sms = semainesDeSequence(sq.id);
    return '<div class="enveloppe">' +
      '<nav class="fil" aria-label="Fil d’Ariane"><a href="#/">Accueil</a><span class="sep">›</span>' +
      '<a href="#/theme/' + th.id + '">' + th.genre + '</a><span class="sep">›</span>' +
      '<span class="ici">Séquence ' + sq.num + '</span></nav>' +
      '<header class="entete-sequence">' +
      '<div class="puces"><span class="puce rose">Séquence ' + sq.num + ' / ' + SEQUENCES.length + '</span>' +
      '<span class="puce">' + sq.accent + '</span>' +
      (sq.note ? '<span class="puce verte">' + sq.note + '</span>' : '') + '</div>' +
      '<h1>' + sq.titre + '</h1>' +
      '<p class="lede"><span class="tache">' + sq.tache + '</span> — Cette séquence travaille : <b>' + sq.accent.toLowerCase() + '</b>. ' +
      sms.length + ' semaines, ' + sms.reduce((n, s) => n + s.seances.length, 0) + ' séances.</p>' +
      '<div class="orbes">' +
      orbe({ classe: 'fiche', icone: '📜', titre: 'Fiche', page: 'p. ' + sq.ficheDebut + '–' + sq.ficheFin,
        aria: 'Ouvrir la première fiche de la séquence dans le lecteur intégré',
        attrs: 'data-doc="fiches" data-page="' + sq.ficheDebut + '" data-fin="' + sq.ficheFin + '" data-label="les fiches de la séquence ' + sq.num + ' (p. ' + sq.ficheDebut + ' à ' + sq.ficheFin + ')"' }) +
      orbe({ classe: 'manuel', icone: '📖', titre: 'Manuel', page: 'p. ' + sq.manuelDiviseur,
        aria: 'Ouvrir la page du manuel de la séquence dans le lecteur intégré',
        attrs: 'data-doc="manuel" data-page="' + sq.manuelDiviseur + '" data-label="la page du manuel de la séquence ' + sq.num + ' (page imprimée ' + (sq.manuelDiviseur - 1) + ')"' }) +
      '</div>' +
      '<div class="orbe-legendes">' +
      '<p class="orbe-legende fiche"><strong>Page de garde p. ' + sq.ficheDiviseur + '</strong><span>L\'intercalaire de la séquence, puis les fiches des pages ' + sq.ficheDebut + ' à ' + sq.ficheFin + '.</span></p>' +
      '<p class="orbe-legende manuel"><strong>Manuel p. ' + (sq.manuelDiviseur - 1) + '</strong><span>La page du manuel qui présente ce projet.</span></p>' +
      '</div>' +
      '</header>' +
      blocOfficiel(sq) +
      blocDevoirs(sq) +
      '<div class="bloc"><h2>Les séances de la séquence</h2>' +
      sms.map((sem) => '<div style="margin-bottom:22px">' +
        '<h3 style="font-size:1.05rem;margin-bottom:8px">Semaine ' + sem.n + ' · ' + sem.mois +
        (sem.note ? ' <span class="puce verte">' + sem.note + '</span>' : '') + '</h3>' +
        '<div class="tri-seances">' + sem.seances.map((_, i) => ligneSeance(sem, i)).join('') + '</div></div>').join('') +
      '</div></div>';
  }

  /* --------------------------------------------------------- 4. SEMAINE */
  function vueSemaine(n) {
    const sem = semaine(n);
    if (!sem) return vueIntrouvable('Cette semaine n’existe pas.');
    const sq = sequence(sem.seq);
    const rentree = !sq;
    const th = rentree ? null : theme(sem.theme);
    return '<div class="enveloppe">' +
      '<nav class="fil" aria-label="Fil d’Ariane"><a href="#/">Accueil</a><span class="sep">›</span>' +
      (rentree ? '<span class="ici">Semaine de rentrée — ' + sem.mois + '</span>'
        : '<a href="#/theme/' + th.id + '">' + th.genre + '</a><span class="sep">›</span>' +
        '<a href="#/sequence/' + sq.id + '">Séquence ' + sq.num + '</a><span class="sep">›</span>' +
        '<span class="ici">Semaine ' + sem.n + '</span>') + '</nav>' +
      '<header class="entete-sequence">' +
      '<div class="puces"><span class="puce or">' + (rentree ? 'Semaine de rentrée' : 'Semaine ' + sem.n + ' / ' + stats().semaines) + '</span>' +
      '<span class="puce">' + sem.mois + '</span>' +
      '<span class="puce ' + (rentree ? 'verte' : puceTheme(th.id)) + '">' +
      (rentree ? 'Évaluation et remédiation' : sq.num + '. ' + sq.titre) + '</span>' +
      (!rentree && sem.note ? '<span class="puce verte">' + sem.note + '</span>' : '') + '</div>' +
      '<h1>' + (rentree ? 'Semaine de rentrée — ' + sem.mois : 'Semaine ' + sem.n + ' — ' + sem.mois) + '</h1>' +
      '<p class="lede">' + sem.seances.length + ' séances' +
      (rentree ? ' · évaluation diagnostique et remédiation · accueil de la classe'
        : ' · <b>' + sq.accent.toLowerCase() + '</b> · ' + th.genre) + '</p>' +
      '</header>' +
      '<div class="tri-seances">' + sem.seances.map((_, i) => ligneSeance(sem, i)).join('') + '</div>' +
      '<p style="margin-top:24px">' + (rentree
        ? '<a class="lien-fleche" href="#/chrono">← Chronologie</a> <a class="lien-fleche" href="#/">Accueil ▸</a>'
        : '<a class="lien-fleche" href="#/sequence/' + sq.id + '">← Toute la séquence ' + sq.num + '</a>') + '</p>' +
      '</div>';
  }

  /* ---------------------------------------------------------- 5. SÉANCE */
  function vueSeance(n, i) {
    const sem = semaine(n);
    if (!sem) return vueIntrouvable('Cette semaine n’existe pas.');
    if (!sem.seances[i]) return vueIntrouvable('Cette séance n’existe pas.');
    const se = sem.seances[i];
    const tp = typeInfo(se.t);
    const sq = sequence(sem.seq);
    const rentree = !sq;
    const th = rentree ? null : theme(sem.theme);
    const idx = indexGlobalSemaine(sem, i);
    const j = se.jeu ? JEUX[se.jeu] : null;
    const prec = voisinSeance(sem, i);
    const docFiche = se.f;
    const titre = tp.label;

    const orbes =
      '<section class="console" aria-label="Les trois orbes magiques de la séance">' +
      '<p class="console-titre">Les trois orbes magiques</p>' +
      '<div class="orbes">' +
      orbe({
        classe: 'fiche', icone: '📜', titre: 'Fiche', page: docFiche ? 'p. ' + docFiche.de + (docFiche.a !== docFiche.de ? '–' + docFiche.a : '') : '—',
        disabled: !docFiche, aria: docFiche ? 'Ouvrir la fiche pédagogique de la séance dans le lecteur intégré' : 'Aucune fiche dédiée pour cette séance',
        attrs: 'data-doc="fiches" data-page="' + (docFiche ? docFiche.de : '') + '" data-fin="' + (docFiche ? docFiche.a : '') + '" data-label="la fiche pédagogique de la séance ' + idx + ' (p. ' + (docFiche ? docFiche.de + (docFiche.a !== docFiche.de ? ' à ' + docFiche.a : '') : '?') + ')"'
      }) +
      orbe({
        classe: 'manuel', icone: '📖', titre: 'Manuel', page: se.mp ? 'p. ' + se.mp : '—',
        disabled: !se.mp, aria: se.mp ? 'Ouvrir la page du manuel correspondant dans le lecteur intégré' : 'Aucune page de manuel pour cette séance',
        attrs: 'data-doc="manuel" data-page="' + (se.mp || '') + '" data-label="la page ' + se.mp + ' du manuel — « ' + (se.mt || '') + ' »"'
      }) +
      (j ? orbe({
        classe: 'jeu', icone: '🎲', titre: 'Le jeu', page: 'TD ' + j.td, disabled: false,
        aria: 'Jouer à ' + j.titre, attrs: 'data-jeu-id="' + se.jeu + '"', particules: 10, glitters: 22
      }) : '') +
      '</div>' +
      '<div class="orbe-legendes">' +
      '<p class="orbe-legende fiche"><strong>Fiche pédagogique</strong><span>' +
      (docFiche ? 'Pages ' + docFiche.de + (docFiche.a !== docFiche.de ? ' à ' + docFiche.a : '') + ' du fichier « Fiches pédagogiques » (PDF de ' + stats().pagesFiches + ' pages).'
        : 'Pas de fiche dédiée pour cette séance : consulte la séquence pour les fiches voisines.') + '</span></p>' +
      '<p class="orbe-legende manuel"><strong>Manuel scolaire</strong><span>' +
      (se.mp ? 'Page ' + se.mp + ' du PDF du manuel' + (se.m ? ' (page imprimée ' + se.m + ')' : '') +
        (se.mt ? ' — « ' + se.mt + ' »' : '') + '.' : 'Pas de page de manuel rattachée.') + '</span></p>' +
      (j ? '<p class="orbe-legende jeu"><strong>' + blocCahier(se.jeu).titre + '</strong><span>Trois activités du cahier — ' +
        blocCahier(se.jeu).activites.length + ' exercices illustrés.</span></p>' : '') +
      '</div></section>';

    return '<div class="enveloppe">' +
      '<nav class="fil" aria-label="Fil d’Ariane"><a href="#/">Accueil</a><span class="sep">›</span>' +
      (rentree ? '<a href="#/semaine/0">Semaine de rentrée</a>' :
        '<a href="#/theme/' + th.id + '">' + th.genre + '</a><span class="sep">›</span>' +
        '<a href="#/sequence/' + sq.id + '">Séquence ' + sq.num + '</a><span class="sep">›</span>' +
        '<a href="#/semaine/' + sem.n + '">Semaine ' + sem.n + '</a>') + '<span class="sep">›</span>' +
      '<span class="ici">Séance ' + idx + '</span></nav>' +

      '<article class="carte-seance verre">' +
      '<header class="entete-seance">' +
      '<div class="puces">' +
      '<span class="puce ' + puceDe(tp.famille) + '">' + tp.icon + ' ' + titre + '</span>' +
      '<span class="puce or">Séance ' + idx + ' / ' + stats().seances + '</span>' +
      '<span class="puce">Semaine ' + sem.n + ' · ' + sem.mois + '</span>' +
      '<span class="puce ' + (rentree ? 'verte' : puceTheme(th.id)) + '">' +
      (rentree ? 'Évaluation et remédiation' : sq.num + '. ' + sq.accent) + '</span>' +
      (se.evaluation ? '<span class="puce verte">' + se.evaluation + '</span>' : '') +
      (se.libre ? '<span class="puce">🕊 Séance libre</span>' : '') +
      '</div>' +
      '<h1><span class="type-nom">' + titre + '</span></h1>' +
      '<div class="objectif"><b>Objectif de la séance —</b> ' + (se.obj || 'Non précisé.') + '</div>' +
      '</header>' +

      orbes +

      (se.capable && se.capable.length ? '<div class="bloc"><h2>Je suis capable de…</h2><ul class="liste-capable">' +
        se.capable.map((c) => '<li>' + c + '</li>').join('') + '</ul></div>' : '') +

      (se.criteres && se.criteres.length ? '<div class="bloc"><h2>Critères de réussite</h2><ul class="liste-capable criteres">' +
        se.criteres.map((c) => '<li>' + c + '</li>').join('') + '</ul></div>' : '') +

      (se.libre ? '<div class="bloc"><h2>Organisation</h2><div class="encart-libert">Séance libre : suivi individuel, soutien, remédiation ou approfondissement. Le choix revient à l’enseignant selon les besoins de la classe.</div></div>' : '') +

      '<div class="bloc"><h2>Les documents de la séance</h2>' +
      '<div class="grille-docs">' +
      '<div class="doc"><div class="tete">📜 Fiche pédagogique</div>' +
      '<p>' + (docFiche ? 'Séance ' + idx + ' — pages <code>' + docFiche.de + (docFiche.a !== docFiche.de ? '–' + docFiche.a : '') + '</code> du fichier <em>Fiches pédagogiques</em>.' +
        ' <button class="lien-fleche" type="button" data-doc="fiches" data-page="' + docFiche.de + '" data-fin="' + docFiche.a + '">Lire dans le site ▸</button>' +
        ' · <a class="lien-fleche" href="' + META.docs.fiches + '#page=' + docFiche.de + '&view=Fit" target="_blank" rel="noopener">Ouvrir ↗</a>'
        : 'Pas de fiche dédiée. <button class="lien-fleche" type="button" data-doc="fiches" data-page="1">Ouvrir le PDF des fiches ▸</button>') + '</p></div>' +
      '<div class="doc"><div class="tete">📖 Manuel scolaire</div>' +
      '<p>' + (se.mp ? 'Page <code>' + se.mp + '</code> du PDF du manuel' + (se.m ? ' (page imprimée <code>' + se.m + '</code>)' : '') +
        (se.mt ? '<br><em>« ' + se.mt + ' »</em>' : '') +
        ' <button class="lien-fleche" type="button" data-doc="manuel" data-page="' + se.mp + '">Lire dans le site ▸</button>' +
        ' · <a class="lien-fleche" href="' + META.docs.manuel + '#page=' + se.mp + '&view=Fit" target="_blank" rel="noopener">Ouvrir ↗</a>'
        : 'Pas de page de manuel rattachée à cette séance. <button class="lien-fleche" type="button" data-doc="manuel" data-page="1">Ouvrir le manuel ▸</button>') + '</p></div>' +
      (j ? '<div class="doc"><div class="tete">📔 Travaux dirigés du cahier</div><p>' +
        '<b>' + j.titre + '</b> — ' + blocCahier(se.jeu).titre + ' (' + blocCahier(se.jeu).source + '). ' +
        '<button class="btn petit" type="button" data-jeu-id="' + se.jeu + '" style="margin-left:8px">Ouvrir le TD</button></p></div>' : '') +
      '</div></div>' +

      '<div class="bloc" style="display:flex;gap:10px;flex-wrap:wrap;justify-content:space-between">' +
      '<a class="btn" href="#/semaine/' + sem.n + '">← Les ' +
      (rentree ? 'séances de la semaine de rentrée' : '4 séances de la semaine ' + sem.n) + '</a>' +
      (prec ? '<a class="btn principal" href="#/seance/' + prec.sem.n + '/' + prec.i + '">' +
        (prec.sens === 'suivante' ? 'Séance suivante →' : '← Séance précédente') + '</a>' : '') +
      '</div>' +
      '</article></div>';
  }

  function vueIntrouvable(msg) {
    return '<div class="enveloppe"><div class="verre carte-seance" style="text-align:center">' +
      '<h1>Oups…</h1><p class="lede" style="margin-inline:auto">' + msg + '</p>' +
      '<p style="margin-top:20px"><a class="btn principal" href="#/">Retour à l\'accueil</a></p></div></div>';
  }

  /* ------------------------------------------------------ 6. CHRONOLOGIE */
  function vueChrono() {
    const items = SEMAINES.map((s) => {
      if (s.vacances) {
        const mots = (/\b(\d{1,2})\s+([^\s]+)\s+(\d{4})\b/.exec(s.du) || []);
        const mNom = String(mots[2] || '').toLowerCase().replace(/['’\u2019.]/g, '');
        const automne = mNom.slice(0, 3) === 'sep' || mNom.slice(0, 3) === 'oct' || mNom.slice(0, 3) === 'nov';
        const printemps = mNom.slice(0, 3) === 'mar' || mNom.slice(0, 3) === 'avr';
        return '<div class="chrono-item vacances">' +
          '<div class="chrono-pastille" aria-hidden="true">' +
          (automne ? '🍂' : (printemps ? '🌷' : '❄')) + '</div>' +
          '<div class="chrono-carte verre"><div class="chrono-tete"><h2>' + s.nom + '</h2>' +
          '<span class="mois">après la semaine ' + s.apres + '</span></div>' +
          '<p style="color:var(--texte-doux);margin:0">Du <b>' + s.du + '</b> au <b>' + s.au + '</b> — interruption pédagogique.</p></div></div>';
      }
      const sq = sequence(s.seq);
      const rentree = !sq;
      const th = rentree ? null : theme(s.theme);
      return '<div class="chrono-item">' +
        '<div class="chrono-pastille" aria-hidden="true">' + (rentree ? 'R' : s.n) + '</div>' +
        '<div class="chrono-carte verre">' +
        '<div class="chrono-tete"><h2>' + s.mois + (rentree ? ' — évaluation et remédiation' : ' · séquence ' + sq.num) + '</h2>' +
        '<span class="mois">' + (rentree ? 'Accueil des élèves · dernière semaine de septembre' : th.genre) + '</span>' +
        (s.note && !rentree ? '<span class="puce verte">' + s.note + '</span>' : '') +
        '<a class="btn petit" style="margin-left:auto" href="#/semaine/' + s.n + '">Voir la semaine</a></div>' +
        '<div class="chrono-seances">' +
        s.seances.map((se, i) => {
          const tp = typeInfo(se.t);
          return '<a class="pastille-type" href="#/seance/' + s.n + '/' + i + '">' +
            '<span>' + tp.icon + '</span><span><b>' + tp.label + '</b>' + (se.obj || '') + '</span></a>';
        }).join('') +
        '</div></div></div>';
    }).join('');

    const nbsem = SEMAINES.filter((s) => !s.vacances).length;

    return '<div class="enveloppe">' +
      '<nav class="fil" aria-label="Fil d’Ariane"><a href="#/">Accueil</a><span class="sep">›</span><span class="ici">Chronologie</span></nav>' +
      '<h1 class="titre-vue"><span class="surtitre">Année scolaire ' + META.annee + '</span>Chronologie des ' + nbsem + ' semaines</h1>' +
      '<p class="lede">Vue d\'ensemble de l\'année : 4 séances par semaine (3 classiques + 1 TD), les vacances, ' +
      'les devoirs surveillés (semaines 7, 16 et 23-24) et les examens officiels du CEM ' +
      '(semaine 9 — trimestre 1, semaine 18 — trimestre 2, semaine 27 — trimestre 3).</p>' +
      '<div class="puces" style="margin-top:18px">' +
      '<span class="puce or">Semaines 1–11 · projet 1</span>' +
      '<span class="puce marine">Semaines 12–19 · projet 2</span>' +
      '<span class="puce violette">Semaines 20–25 · projet 3</span>' +
      '<span class="puce bleue">Semaines 26–27 · révisions et examens</span>' +
      '<span class="puce verte">Devoirs : sem. 7, 16, 23-24</span>' +
      '<span class="puce rose">Examens : sem. 9, 18, 27</span></div>' +
      '<p style="margin:14px 0 0"><a class="btn petit" href="#/calendrier">Calendrier officiel des devoirs et examens ▸</a>' +
      ' <a class="btn petit" href="#/repartition">🖨️ Répartition à imprimer ▸</a></p>' +
      '<div class="chrono" style="margin-top:22px">' + items + '</div>' +
      '</div>';
  }

  /* ------------------------------------------------ CALENDRIER OFFICIEL */
  function vueCalendrier() {
    const carte = (t) => {
      const bloc = (b) => '<div class="cal-bloc">' +
        '<span class="cal-bloc-titre">' + b.libelle + '</span>' +
        '<span class="cal-bloc-periode">' + b.periode + '</span>' +
        (b.semaines && b.semaines.length
          ? '<span class="cal-bloc-semaines">semaines ' + b.semaines.join(' · ') + '</span>' : '') +
        '</div>';
      return '<section class="verre cal-carte">' +
        '<h2><span class="cal-emoji" aria-hidden="true">' + t.emoji + '</span>' + t.nom + '</h2>' +
        bloc(t.devoirs) + bloc(t.examens) +
        '</section>';
    };
    return '<div class="enveloppe">' +
      '<nav class="fil" aria-label="Fil d’Ariane"><a href="#/">Accueil</a><span class="sep">›</span><span class="ici">Calendrier officiel</span></nav>' +
      '<h1 class="titre-vue"><span class="surtitre">CEM — ' + META.annee + '</span>Calendrier officiel des devoirs et examens</h1>' +
      '<p class="lede">Les échéances officielles du CEM pour l\'année scolaire ' + META.annee +
      ' — chaque période renvoie aux semaines correspondantes de la chronologie.</p>' +
      '<div class="cal-grille" style="margin-top:24px">' + CALENDRIER_OFFICIEL.map(carte).join('') + '</div>' +
      '<div class="encart" style="margin-top:18px"><b>4AM / BEM blanc :</b> devoirs mi-avril 2027, ' +
      'examens du 9 au 11 mai 2027. Ce parcours, destiné à la 2AM, suit le calendrier 1AM-2AM-3AM.</div>' +
      '<p style="margin-top:18px"><a class="btn principal" href="#/chrono">Voir la chronologie des semaines ▸</a></p>' +
      '</div>';
  }

  /* ------------------------------------------- RÉPARTITION À IMPRIMER ---- */
  /* État de la page : établissement, enseignant, classes (remembered) */
  const CLE_REP = 'rme-repartition';
  const repEtat = { etablissement: '', professeur: '', classes: '2AM5 · 2AM6 · 2AM7' };
  try {
    const brut = JSON.parse(localStorage.getItem(CLE_REP) || '{}');
    if (brut) {
      if (typeof brut.etablissement === 'string') repEtat.etablissement = brut.etablissement;
      if (typeof brut.professeur === 'string') repEtat.professeur = brut.professeur;
      if (typeof brut.classes === 'string' && brut.classes.trim()) repEtat.classes = brut.classes;
    }
  } catch (e) { /* stockage indisponible : valeurs par défaut */ }
  function sauverRepEtat() {
    try { localStorage.setItem(CLE_REP, JSON.stringify(repEtat)); } catch (e) { /* ignoré */ }
  }

  const escHtml = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  function lignesSemaine(sem) {
    return sem.seances.map((se) => {
      const tp = typeInfo(se.t);
      const obj = String(se.obj || '');
      const court = obj.length > 64 ? obj.slice(0, 61).replace(/\s+\S*$/, '') + '…' : obj;
      return escHtml(tp.icon + ' ' + tp.label + ' — ' + court);
    }).join('<br>');
  }

  function evalSemaine(sem) {
    if (sem.note) return escHtml(sem.note);
    const vus = [];
    sem.seances.forEach((se) => {
      if (se.evaluation && vus.indexOf(se.evaluation) < 0) vus.push(se.evaluation);
    });
    return vus.length ? escHtml(vus.join(' · ')) : '—';
  }

  function tableAnnuelle() {
    const rangs = [];
    SEMAINES.forEach((s) => {
      if (s.vacances) {
        rangs.push({ vac: true, apres: s.apres, libelle: s.nom + ' — du ' + s.du + ' au ' + s.au +
          ' (après la semaine ' + s.apres + ')' });
        return;
      }
      const sq = sequence(s.seq);
      if (!sq) {
        rangs.push({
          vac: false, sem: s, mois: s.mois,
          projetKey: 'R', seqKey: 'R',
          projet: 'Accueil de la classe',
          seqLib: 'Semaine de rentrée — évaluation et remédiation',
          genre: 'Dernière semaine de septembre',
          contenu: lignesSemaine(s),
          eval: evalSemaine(s)
        });
        return;
      }
      const th = theme(sq.theme);
      rangs.push({
        vac: false, sem: s, mois: s.mois,
        projetKey: sq.projet, seqKey: sq.id,
        projet: sq.projet,
        seqLib: sq.num + '. ' + sq.titre,
        genre: th.genre,
        contenu: lignesSemaine(s),
        eval: evalSemaine(s)
      });
    });

    /* La répartition se découpe par mois : chaque mois forme un bloc,
       imprimé sur sa propre page (break-before). Les vacances sont
       rattachées au mois qui les précède (après la semaine N).          */
    const moisDeVac = (r) => {
      const w = SEMAINES.find((x) => !x.vacances && x.n === r.apres);
      return w ? w.mois : 'Mai';
    };
    const blocs = [];
    rangs.forEach((r) => {
      const m = r.vac ? moisDeVac(r) : r.mois;
      let b = blocs.find((x) => x.mois === m);
      if (!b) { b = { mois: m, rangs: [] }; blocs.push(b); }
      b.rangs.push(r);
    });

    const spans = (liste, cle) => {
      const n = liste.length, out = new Array(n).fill(0);
      for (let i = 0; i < n; i++) {
        if (liste[i].vac) continue;
        if (i > 0 && !liste[i - 1].vac && cle(liste[i - 1]) === cle(liste[i])) continue;
        let c = 1;
        for (let j = i + 1; j < n && !liste[j].vac && cle(liste[j]) === cle(liste[i]); j++) c++;
        out[i] = c;
      }
      return out;
    };

    const titreBloc = (b) => {
      const sem = b.rangs.filter((r) => !r.vac).map((r) => r.sem.n);
      if (sem.length === 1 && sem[0] === 0) {
        return '🗓 Septembre — semaine de rentrée · Évaluation et remédiation';
      }
      const plage = sem.length > 1 ? sem[0] + '–' + sem[sem.length - 1] : String(sem[0]);
      const projs = [], seqs = [];
      b.rangs.forEach((r) => {
        if (r.vac) return;
        if (projs.indexOf(r.projet) < 0) projs.push(r.projet);
        if (seqs.indexOf(r.seqLib) < 0) seqs.push(r.seqLib);
      });
      return '🗓 ' + b.mois + ' — semaines ' + plage +
        (projs.length ? ' · ' + projs.join(' · ') : '') +
        (seqs.length ? ' · ' + seqs.join(' / ') : '');
    };

    const blocHtml = (b, premier) => {
      const spProj = spans(b.rangs, (r) => r.projetKey);
      const spSeq = spans(b.rangs, (r) => r.seqKey);
      let html = '<section class="rep-mois-page' + (premier ? ' premier' : '') + '">' +
        '<h4 class="rep-mois-titre">' + escHtml(titreBloc(b)) + '</h4>' +
        '<table class="rep-table rep-annuelle"><thead><tr>' +
        '<th>Sem.</th><th>Projet</th><th>Séquence</th>' +
        '<th>Contenu de la semaine (séances)</th><th>Évaluations</th>' +
        '</tr></thead><tbody>';
      b.rangs.forEach((r, i) => {
        if (r.vac) {
          html += '<tr class="rep-vacs"><td colspan="5">🕊 ' + escHtml(r.libelle) + '</td></tr>';
          return;
        }
        html += '<tr>' +
          '<td class="rep-sem">S' + r.sem.n + '</td>' +
          (spProj[i] ? '<td rowspan="' + spProj[i] + '">' + escHtml(r.projet) + '</td>' : '') +
          (spSeq[i] ? '<td rowspan="' + spSeq[i] + '"><b>' + escHtml(r.seqLib) + '</b>' +
            '<br><small>' + escHtml(r.genre) + '</small></td>' : '') +
          '<td class="rep-contenu">' + r.contenu + '</td>' +
          '<td class="rep-eval">' + r.eval + '</td></tr>';
      });
      return html + '</tbody></table></section>';
    };

    return blocs.map((b, i) => blocHtml(b, i === 0)).join('');
  }

  function repEntete() {
    return '<section class="rep-entete" aria-label="En-tête de la répartition">' +
      '<div class="rep-tete-etat"><p>République Algérienne Démocratique et Populaire</p>' +
      '<p>Ministère de l’Éducation Nationale</p></div>' +
      '<h2 class="rep-titre">Répartition annuelle</h2>' +
      '<p class="rep-sous-titre">Discipline : Français — ' + META.niveau + ' · Année scolaire ' + META.annee + '</p>' +
      '<ul class="rep-coordonnees">' +
      '<li><b>Établissement :</b> <span id="rep-c-ets">' +
      (repEtat.etablissement ? escHtml(repEtat.etablissement) : '<i>à renseigner</i>') + '</span></li>' +
      '<li><b>Enseignant :</b> <span id="rep-c-prof">' +
      (repEtat.professeur ? escHtml(repEtat.professeur) : '<i>à renseigner</i>') + '</span></li>' +
      '<li><b>Classes :</b> <span id="rep-c-classes">' + escHtml(repEtat.classes) + '</span></li>' +
      '<li><b>Volume hebdomadaire :</b> ' + META.volume + '</li>' +
      '<li><b>Fin de l’année :</b> ' + META.finCours + '</li>' +
      '</ul></section>';
  }

  function corpsRepartition(doc) {
    return repEntete() +
      '<section class="rep-section"><h3>Répartition annuelle</h3>' +
      tableAnnuelle() + '</section>' +
      (doc
        ? '<table class="rep-signatures-doc"><tr><td><span>Le professeur</span></td>' +
          '<td><span>Le directeur / La directrice</span></td></tr>' +
          '<tr class="rep-signatures-lignes"><td><i></i></td><td><i></i></td></tr></table>'
        : '<div class="rep-signatures"><div><span>Le professeur</span><i></i></div>' +
          '<div><span>Le directeur / La directrice</span><i></i></div></div>') +
      '<p class="rep-pied">Document généré par <b>Le Royaume des Mots Enchantés</b> — ' +
      'répartition annuelle 2AM ' + META.annee + '.</p>';
  }

  /* ------------------------------------------------- FICHIER .DOC (WORD) --
     Répartition exportée en HTML « Word » : en-tête officiel, répartition
     annuelle (un mois par page) et signatures. Le fichier s’ouvre dans Word
     et peut être enregistré en .docx ; le contenu reprend celui de l’aperçu. */
  const CSS_DOC_REP =
    'body{font-family:Calibri,Arial,sans-serif;font-size:10pt;color:#111;}' +
    'h3,h4{font-family:Georgia,serif;color:#241045;}' +
    '.rep-entete{border:1pt solid #666;background:#f2f2f2;padding:8pt 10pt;margin:0 0 12pt;text-align:center;}' +
    '.rep-tete-etat p{margin:0;font-size:9pt;color:#333;}' +
    '.rep-titre{font-size:15pt;color:#7a2a55;margin:6pt 0 2pt;text-transform:uppercase;letter-spacing:.5pt;}' +
    '.rep-sous-titre{margin:0 0 6pt;font-size:10pt;color:#333;}' +
    '.rep-coordonnees{list-style:none;margin:6pt 0 0;padding:0;font-size:10pt;}' +
    '.rep-coordonnees li{margin:1pt 0;}' +
    '.rep-section h3{font-size:13pt;color:#7a2a55;border-left:3pt solid #7a2a55;padding-left:6pt;margin:12pt 0 6pt;}' +
    '.rep-mois-page:not(.premier){page-break-before:always;}' +
    '.rep-mois-titre{font-size:11pt;margin:0 0 4pt;}' +
    'table.rep-table{border-collapse:collapse;width:100%;margin:0 0 10pt;}' +
    '.rep-table th,.rep-table td{border:.5pt solid #666;padding:3pt 4pt;vertical-align:top;font-size:8.5pt;}' +
    '.rep-table thead th{background:#ddd;text-align:left;}' +
    '.rep-table .rep-sem{white-space:nowrap;}' +
    '.rep-table .rep-contenu,.rep-table .rep-eval,.rep-table .rep-echeances{font-size:8pt;color:#333;}' +
    '.rep-vacs td{background:#f0f0f0;color:#333;}' +
    'table.rep-signatures-doc{border-collapse:collapse;width:100%;margin-top:30pt;}' +
    '.rep-signatures-doc td{width:50%;border:none;text-align:center;font-size:10pt;}' +
    '.rep-signatures-doc .rep-signatures-lignes td{padding-top:26pt;}' +
    '.rep-signatures-doc i{display:block;border-bottom:1pt solid #000;height:0;}' +
    '.rep-pied{margin-top:16pt;border-top:.5pt solid #999;padding-top:6pt;font-size:9pt;color:#666;}' +
    '@page{size:A4 portrait;margin:1.2cm;}';

  /* Petite ligne de statut sous les boutons (succès / erreur de l’export). */
  let _repStatutTimer = null;
  function repStatut(texte, mode) {
    const s = document.getElementById('rep-statut');
    if (!s) return;
    if (_repStatutTimer) clearTimeout(_repStatutTimer);
    s.textContent = texte;
    s.className = 'rep-statut' + (mode ? ' ' + mode : '');
    _repStatutTimer = setTimeout(() => { s.textContent = ''; s.className = 'rep-statut'; }, 7000);
  }

  function exporterRepartition() {
    const titre = 'Répartition annuelle ' + META.niveau + ' — ' + META.annee;
    const nomFichier = 'Repartition-2AM-' + META.annee + '.doc';
    try {
      /* Saut de page par mois en style inline : Word ne comprend pas :not(). */
      const corps = corpsRepartition(true)
        .replace(/<section class="rep-mois-page">/g,
          '<section class="rep-mois-page" style="page-break-before:always">');
      const html =
        '<html xmlns:o="urn:schemas-microsoft-com:office:office" ' +
        'xmlns:w="urn:schemas-microsoft-com:office:word" ' +
        'xmlns="http://www.w3.org/TR/REC-html40">' +
        '<head><meta charset="utf-8"><title>' + escHtml(titre) + '</title>' +
        '<!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View>' +
        '<w:Zoom>100</w:Zoom></w:WordDocument></xml><![endif]-->' +
        '<style>' + CSS_DOC_REP + '</style></head><body>' + corps + '</body></html>';

      const blob = new Blob(['\ufeff' + html], { type: 'application/msword;charset=utf-8' });

      /* Ancien Edge : enregistrement direct depuis le Blob. */
      if (window.navigator && navigator.msSaveBlob) {
        navigator.msSaveBlob(blob, nomFichier);
        repStatut('Document enregistré : ' + nomFichier + '.', 'ok');
        return;
      }

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = nomFichier;
      a.rel = 'noopener';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      /* On laisse le téléchargement démarrer avant de détruire l’ancre et
         l’URL blob (revokeObjectURL trop précoce = fichier illisible).    */
      setTimeout(() => {
        URL.revokeObjectURL(url);
        if (a.parentNode) a.parentNode.removeChild(a);
      }, 1000);
      repStatut('Document généré : « ' + nomFichier + ' » — vérifie tes téléchargements.', 'ok');
    } catch (err) {
      repStatut('Erreur durant l’export : ' + ((err && err.message) ? err.message : String(err)) + '.', 'err');
    }
  }

  function vueRepartition() {
    return '<div class="enveloppe">' +
      '<nav class="fil" aria-label="Fil d’Ariane"><a href="#/">Accueil</a><span class="sep">›</span>' +
      '<span class="ici">Répartition</span></nav>' +
      '<h1 class="sr-only">Répartition annuelle</h1>' +
      '<div class="rep-outil" id="rep-outil">' +
      '<label class="jr-champ"><span>Établissement</span>' +
      '<input type="text" id="rep-ets" value="' + escHtml(repEtat.etablissement) + '" ' +
      'placeholder="CEM / Collège …" autocomplete="organization"></label>' +
      '<label class="jr-champ"><span>Enseignant</span>' +
      '<input type="text" id="rep-prof" value="' + escHtml(repEtat.professeur) + '" ' +
      'placeholder="Nom et prénom" autocomplete="name"></label>' +
      '<label class="jr-champ"><span>Classes</span>' +
      '<input type="text" id="rep-classes" value="' + escHtml(repEtat.classes) + '"></label>' +
      '<span class="jr-actions"><button type="button" class="btn" id="rep-imprimer">🖨️ Imprimer la répartition</button>' +
      '<button type="button" class="btn principal" id="rep-doc">⬇️ Télécharger en Word (.doc)</button>' +
      '<span class="rep-statut" id="rep-statut" role="status" aria-live="polite"></span></span>' +
      '</div>' +
      '<div id="rep-corps" class="rep-corps">' + corpsRepartition() + '</div>' +
      '</div>';
  }

  function repartitionInit() {
    const lier = (id, cle, cible, max) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('input', () => {
        repEtat[cle] = el.value.slice(0, max || 120);
        sauverRepEtat();
        const c = document.getElementById(cible);
        if (c) c.innerHTML = repEtat[cle] ? escHtml(repEtat[cle]) : '<i>à renseigner</i>';
      });
    };
    lier('rep-ets', 'etablissement', 'rep-c-ets', 90);
    lier('rep-prof', 'professeur', 'rep-c-prof', 80);
    lier('rep-classes', 'classes', 'rep-c-classes', 90);
    const btn = document.getElementById('rep-imprimer');
    if (btn) btn.addEventListener('click', () => window.print());
    const bdoc = document.getElementById('rep-doc');
    if (bdoc) bdoc.addEventListener('click', exporterRepartition);
  }

  /* ------------------------------------------------------ 7. EXERCICES */
  function vueJeux() {
    const cles = Object.keys(JEUX);
    return '<div class="enveloppe">' +
      '<nav class="fil" aria-label="Fil d’Ariane"><a href="#/">Accueil</a><span class="sep">›</span><span class="ici">Exercices des TD</span></nav>' +
      '<h1 class="titre-vue"><span class="surtitre">Travaux dirigés du cahier d\'activités</span>' +
      cles.length + ' TD · ' + cles.length * 3 + ' exercices illustrés</h1>' +
      '<p class="lede">Les sept séances de TD de la répartition annuelle s\'appuient sur les blocs « Travaux dirigés » ' +
      'du <b>cahier d\'activités de 2<sup>ème</sup> A.M.</b> Chaque TD est découpé en trois activités, ' +
      'illustrées et jouables : une image, une question, trois réponses, puis l\'explication et le texte du cahier.</p>' +
      '<div class="grille-jeux" style="margin-top:26px">' +
      cles.map((id) => {
        const j = JEUX[id];
        const b = blocCahier(id);
        const sq = sequence(j.seq);
        return '<button class="carte-jeu" type="button" data-jeu-id="' + id + '">' +
          '<span class="vignette">' + illus(j.illu) + '</span>' +
          '<h2>' + b.titre + '</h2>' +
          '<p class="carte-jeu-sous">' + b.source + '</p>' +
          '<span class="carte-jeu-acts">' + b.activites.map((a) =>
            '<span class="act">' + a.n.replace('Activité ', '') + '</span>').join('') + '</span>' +
          '<span class="bas">Séquence ' + j.seq + ' · semaine ' + j.td + (sq ? ' · ' + sq.accent : '') +
          ' · ' + b.activites.length + ' activités</span>' +
          '<span class="appel">Ouvrir le TD ▸</span></button>';
      }).join('') +
      '</div></div>';
  }

  /* ------------------------------------------------------------ 8. GUIDE */
  function vueGuide() {
    const s = stats();
    return '<div class="enveloppe">' +
      '<nav class="fil" aria-label="Fil d’Ariane"><a href="#/">Accueil</a><span class="sep">›</span><span class="ici">Guide</span></nav>' +
      '<h1 class="titre-vue"><span class="surtitre">Mode d\'emploi</span>Guide de l\'enseignant</h1>' +
      '<div class="guide" style="margin-top:22px">' +

      '<section class="verre"><h2>1 · Naviguer dans le royaume</h2>' +
      '<ul>' +
      '<li><b>Accueil</b> : une vidéo en fond de page, puis les trois royaumes (conte, fable, légende) en grands boutons de texte, et les chiffres de l\'année.</li>' +
      '<li><b>Royaume → séquence</b> : un clic mène à l\'arbre des semaines de la séquence, puis au détail de chaque séance.</li>' +
      '<li><b>Chronologie</b> : les semaines de cours, de révisions et d\'examens dans l\'ordre, avec les vacances et les moments d\'évaluation.</li>' +
      '<li><b>Calendrier officiel</b> : les périodes de devoirs et d\'examens des trois trimestres (calendrier du CEM).</li>' +
      '<li><b>Répartition</b> : la <a href="#/repartition">répartition annuelle</a> à imprimer ou à télécharger en Word, avec l\'établissement, le professeur et les classes.</li>' +
      '<li><b>Cahier journal</b> : un <a href="#/journal">document imprimable</a> rempli automatiquement à partir de l\'emploi du temps (modifiable dans l\'application) et de la répartition annuelle.</li>' +
      '<li><b>Exercices</b> : les ' + s.jeux + ' TD du cahier d\'activités (' + (s.jeux * 3) + ' activités), illustrés et accessibles d\'un clic.</li>' +
      '</ul>' +
      '<div class="encart">Tout fonctionne avec des ancres (#/…) : aucune page à recharger, et le site peut être hébergé ' +
      'n\'importe où (Netlify, GitHub Pages, un simple dossier) sans configuration serveur.</div></section>' +

      '<section class="verre"><h2>2 · Les trois orbes magiques</h2>' +
      '<ul>' +
      '<li><b>Orbe jaune 📜 — la fiche</b> : ouvre la fiche pédagogique officielle de la séance dans le <b>lecteur intégré</b>, à la bonne page du PDF des fiches (' + s.pagesFiches + ' pages).</li>' +
      '<li><b>Orbe bleu 📖 — le manuel</b> : ouvre la page du manuel de français 2AM qui traite le même thème (' + s.pagesManuel + ' pages).</li>' +
      '<li><b>Orbe violet 🎲 — le TD</b> : présent sur les sept séances de TD ; il ouvre les trois activités du cahier correspondant.</li>' +
      '</ul>' +
      '<div class="encart">Les trois orbes sont des <b>sphères de verre liquide</b> dessinées en CSS, ' +
      'toujours centrées sur la page : elles se déforment, se colorent et renvoient la ' +
      'lumière du décor. Des <b>paillettes animées</b> scintillent à l\'intérieur et ' +
      'autour de chacune d\'elles.</div>' +
      '<div class="encart">Dans le lecteur : <b>‹ Page précédente</b> et <b>Page suivante ›</b> (ou les touches ← et →), ' +
      'un bouton « Aller à la p. X » quand la fiche couvre plusieurs pages, et « Nouvel onglet ↗ » si tu préfères ' +
      'consulter le PDF à part. Rien n\'est chargé avant le premier clic.</div></section>' +

      '<section class="verre"><h2>3 · Les devoirs de chaque séquence</h2>' +
      '<p>Chaque page de séquence présente <b>quatre devoirs</b> et la <b>progression officielle</b> ' +
      'de la séquence. Rien n\'est inventé : les rubriques et les sujets viennent de la ' +
      '<b>progression annuelle officielle 2AM</b>, qui découpe le programme en trois projets — ' +
      '<b>« Dire et jouer un conte »</b> (12 semaines, 36 h), <b>« Animer une fable »</b> ' +
      '(8 semaines, 24 h) et <b>« Dire une légende »</b> (6 semaines, 18 h).</p>' +
      '<ul>' +
      '<li><b>✍️ Production écrite</b> : le <b>sujet officiel</b> de la séquence, avec sa page du manuel — « Produire le début d\'un conte » (p. 23), « Produire un dialogue à partir d\'une fable » (p. 79), « Décrire un personnage légendaire » (p. 120)…</li>' +
      '<li><b>📋 Devoir surveillé</b> : un sujet de composition officiel, rattaché à un texte du manuel.</li>' +
      '<li><b>🗣️ Préparation orale</b> : la prise de parole à préparer, appuyée sur le support audio officiel.</li>' +
      '<li><b>📚 Lecture à la maison</b> : le texte ou le point de langue à relire et à travailler.</li>' +
      '</ul>' +
      '<div class="encart">Chaque bouton <b>📖 Manuel p. X</b> ouvre directement la bonne page du ' +
      'manuel dans le lecteur intégré.</div></section>' +

      '<section class="verre"><h2>4 · Correspondance des documents</h2>' +
      '<p>Le site suit la <b>répartition annuelle 2026-2027</b> (objectifs, types de séances, dates, évaluations). ' +
      'Pour chaque séance, l\'orbe du manuel ouvre la page du manuel ONPS 2018-2019 qui traite le même thème ; ' +
      'l\'intitulé réel de cette page est affiché sous l\'orbe, car certains titres du manuel diffèrent des textes cités ' +
      'par la répartition (par exemple « Les serins et le chardonneret » pour la fable, ' +
      '« Yennayer et la vieille bergère » et « Aïn Bent El Soltane de Mascara » pour la légende).</p>' +
      '<p>Le numéro de page PDF du manuel correspond à la page imprimée + 1 (le PDF contient une page de couverture).</p></section>' +

      '<section class="verre"><h2>5 · Les travaux dirigés du cahier d\'activités</h2>' +
      '<p>Les sept séances de TD de la répartition ne sont pas des exercices inventés : ce sont les blocs ' +
      '« <b>Travaux dirigés</b> » du <b>cahier d\'activités et de T.D — 2<sup>ème</sup> A.M.</b>repris tels quels ' +
      '(mêmes titres, mêmes consignes, mêmes phrases d\'appui). Chaque séance ouvre trois activités du cahier, ' +
      'présentées sur le même schéma volontairement simple :</p>' +
      '<div class="puces">' +
      '<span class="puce or">🖼 une illustration</span>' +
      '<span class="puce marine">❓ une question</span>' +
      '<span class="puce violette">🔘 trois réponses</span>' +
      '<span class="puce verte">✅ la réponse et son explication</span>' +
      '</div>' +
      '<p style="margin-top:14px">Un sélecteur d\'étapes en haut de la fenêtre permet de revenir à n\'importe quelle activité, ' +
      '« ↺ Recommencer » remet le TD à zéro, et « 📖 Le texte du cahier » déplie le texte intégral de la séance ' +
      'ainsi que les autres activités du même TD (elles ne sont pas cliquables, elles servent de référence).</p>' +
      '<table class="tableau-cahier"><thead><tr><th>Séance</th><th>Bloc du cahier</th><th>Activités reprises</th></tr></thead><tbody>' +
      Object.keys(JEUX).map(function (k) {
        const jj = JEUX[k]; const bb = CAHIER[jj.cahier];
        return '<tr><td>semaine ' + jj.td + '</td><td>' + bb.titre + '</td><td>' +
          bb.activites.map(function (a) { return a.n.replace('Activité ', 'Act. '); }).join(' · ') + '</td></tr>';
      }).join('') +
      '</tbody></table></section>' +

      '<section class="verre"><h2>6 · Les types de séance</h2>' +
      '<div class="puces">' +
      Object.keys(TYPES).map((k) => '<span class="puce ' + puceDe(TYPES[k].famille) + '">' + TYPES[k].icon + ' ' + TYPES[k].label + '</span>').join('') +
      '</div>' +
      '<p style="margin-top:14px">Chaque semaine comporte quatre séances : trois séances classiques et une séance de TD. ' +
      'Les séances libres (soutien, remédiation, autonomie) sont signalées par 🕊.</p></section>' +

      '<section class="verre"><h2>7 · Calendrier de l\'année</h2>' +
      '<ul>' +
      SEMAINES.filter((v) => v.vacances).map((v) =>
        '<li><b>' + v.nom + '</b> : du ' + v.du + ' au ' + v.au +
        ' (après la semaine ' + v.apres + ').</li>').join('') +
      '<li><b>Devoirs surveillés</b> : semaines 7 (mi-nov.), 16 (février) et 23-24 (3e trimestre).</li>' +
      '<li><b>Examens officiels du CEM</b> : <a href="#/calendrier">semaine 9 (T1, 6-10 déc.), semaine 18 (T2, 2-8 mars) et semaine 27 (T3, 23-27 mai)</a>.</li>' +
      '<li><b>Fin de l\'année</b> : examens du 3e trimestre du 23 au 27 mai 2027.</li>' +
      '</ul>' +
      '<div class="encart"><a class="btn petit" href="#/calendrier">📅 Calendrier officiel des devoirs et examens</a> — ' +
      'détail des trois trimestres (4AM / BEM blanc : devoirs mi-avril, examens du 9 au 11 mai 2027). ' +
      '<a class="btn petit" href="#/repartition">🖨️ Répartition à imprimer</a></div></section>' +

      '<section class="verre"><h2>8 · Documents de référence</h2>' +
      '<ul>' +
      '<li><button class="lien-fleche" type="button" data-doc="fiches" data-page="1">Fiches pédagogiques (' + s.pagesFiches + ' pages) ▸</button></li>' +
      '<li><button class="lien-fleche" type="button" data-doc="manuel" data-page="1">Manuel scolaire 2AM (' + s.pagesManuel + ' pages) ▸</button></li>' +
      '<li><b>Cahier d\'activités et de T.D — 2<sup>ème</sup> A.M.</b> (2023/2024) : ses blocs « Travaux dirigés » ' +
      'alimentent les sept exercices du site.</li>' +
      '<li>Répartition annuelle 2AM 2026-2027 (document de référence de l\'enseignant).</li>' +
      '</ul>' +
      '<div class="encart">Le site est 100 % statique : aucune connexion, aucun envoi de données. ' +
      'Il fonctionne hors ligne une fois les fichiers mis en cache par le navigateur.</div></section>' +
      '</div></div>';
  }

  /* ============================================================= ROUTAGE ==== */
  function router() {
    const brut = (location.hash || '').replace(/^#\/?/, '');
    const seg = brut.split('/').filter((s) => s.length);
    let html = '', themeId = 0, lienActif = '#/';

    if (!seg.length) {
      html = vueAccueil();
    } else if (seg[0] === 'theme') {
      const t = Number(seg[1]);
      const valide = THEMES.some((x) => x.id === t);
      html = vueTheme(t);
      themeId = valide ? t : 0;
      lienActif = '#/' + seg[0];
    } else if (seg[0] === 'sequence') {
      const sq = sequence(Number(seg[1]));
      html = vueSequence(Number(seg[1]));
      themeId = sq ? sq.theme : 0;
      lienActif = '#/' + seg[0];
    } else if (seg[0] === 'semaine') {
      const sem = semaine(seg[1]);
      html = vueSemaine(seg[1]);
      themeId = sem ? sem.theme : 0;
      lienActif = '#/' + seg[0];
    } else if (seg[0] === 'seance') {
      const sem = semaine(seg[1]);
      html = vueSeance(seg[1], Number(seg[2] || 0));
      themeId = sem ? sem.theme : 0;
      lienActif = '#/' + seg[0];
    } else if (seg[0] === 'chrono') {
      html = vueChrono();
      lienActif = '#/chrono';
    } else if (seg[0] === 'calendrier') {
      html = vueCalendrier();
      lienActif = '#/calendrier';
    } else if (seg[0] === 'repartition') {
      html = vueRepartition();
      lienActif = '#/repartition';
    } else if (seg[0] === 'jeux') {
      html = vueJeux();
      lienActif = '#/jeux';
    } else if (seg[0] === 'journal') {
      html = typeof vueJournal === 'function'
        ? vueJournal()
        : vueIntrouvable('Le générateur de cahier journal n’est pas chargé.');
      lienActif = '#/journal';
    } else if (seg[0] === 'guide') {
      html = vueGuide();
      lienActif = '#/guide';
    } else {
      html = vueIntrouvable('Cette page n\'existe pas dans le royaume.');
      lienActif = '#/';
    }

    app.innerHTML = html;
    appliquerDecor(themeId);
    majEcran(seg.length === 0);

    /* le cahier journal pilote sa propre barre d’outils */
    if (seg[0] === 'journal' && typeof journalInit === 'function') journalInit();
    /* la répartition pilote ses champs à imprimer */
    if (seg[0] === 'repartition') repartitionInit();

    Array.prototype.forEach.call(navPrincipale.querySelectorAll('a'), (a) => {
      a.classList.toggle('actif', a.getAttribute('href') === lienActif);
    });

    if (modaleOuverte()) fermerModal();
    window.scrollTo(0, 0);
    app.focus({ preventScroll: true });
  }

  /* ======================================================== ÉVÉNEMENTS ==== */
  const mouvementReduit = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.addEventListener('click', (e) => {
    const ferm = e.target.closest('[data-fermer]');
    if (ferm) { fermerModal(); return; }

    const jb = e.target.closest('[data-jeu-id]');
    if (jb) { ouvrirJeu(jb.dataset.jeuId); return; }

    /* orbes et boutons-document : ouverture dans le lecteur intégré */
    const ob = e.target.closest('.orbe[data-doc], [data-doc][data-page]');
    if (ob && !ob.disabled) {
      ouvrirLecteur(ob.dataset.doc, Number(ob.dataset.page),
        ob.dataset.label || '', ob.dataset.fin);
      return;
    }

    /* royaumes : mise en évidence puis navigation */
    const pt = e.target.closest('.royaume');
    if (pt) {
      if (pt.classList.contains('ouverte')) return;
      e.preventDefault();
      const cible = pt.getAttribute('href') || '#/';
      if (mouvementReduit()) { location.hash = cible; return; }
      pt.classList.add('ouverte');
      setTimeout(() => { location.hash = cible; }, 420);
      return;
    }

    /* pause / lecture de la vidéo de l'accueil */
    if (e.target.closest('#ecran-pause')) {
      if (ecranVideo.paused) ecranVideo.play().catch(() => {}); else ecranVideo.pause();
      majPause();
    }
  });

  /* Survol d'un royaume : le décor du site prend la couleur du royaume */
  app.addEventListener('mouseover', (e) => {
    const p = e.target.closest('.royaume');
    if (p && !p.contains(e.relatedTarget)) appliquerDecor(Number(p.dataset.royaume));
  });
  app.addEventListener('mouseout', (e) => {
    const p = e.target.closest('.royaume');
    if (p && !p.contains(e.relatedTarget)) appliquerDecor(0);
  });

  navPrincipale.addEventListener('click', () => {
    navPrincipale.classList.remove('ouvert');
    burger.setAttribute('aria-expanded', 'false');
  });

  burger.addEventListener('click', () => {
    const ouvert = navPrincipale.classList.toggle('ouvert');
    burger.setAttribute('aria-expanded', ouvert ? 'true' : 'false');
  });

  window.addEventListener('hashchange', router);
  window.addEventListener('error', (ev) => {
    console.error('[RME]', ev.message);
  });

  /* ============================================================== DÉMARRAGE */
  /* Poussière de lutins sur toute la page (une seule fois, jamais rejouée). */
  const poussiere = $('#poussiere');
  if (poussiere) poussiere.innerHTML = rideauGlitter(46);

  if (!location.hash) location.replace('#/');
  router();
})();
