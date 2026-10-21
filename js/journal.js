/* =========================================================================
   LE ROYAUME DES MOTS ENCHANTÉS — CAHIER JOURNAL (2AM · 2026-2027)

   Ce script remplit le cahier journal de l’enseignant en croisant deux
   sources du dossier « annuelle » :

     · l’EMPLOI DU TEMPS  (emploi du temps/emploi.doc)
         → jour, horaire et classe de chacune des 4 séances hebdomadaires ;
     · la RÉPARTITION ANNUELLE (js/data.js)
         → semaine, thème, séquence, type de séance, objectif, support
           (fiche + manuel) et évaluation.

   Tout est recalculé à la volée : aucune date, aucun horaire n’est écrit en
   dur. Le document produit reprend la structure du modèle
   « cahier journal/Cahier journal 2am.docx » :

       en-tête → progression → projet → séquence
               → objectifs → tableau (Séances | Thèmes et objectifs |
                 Dates | horaires | classes | évaluations)

   Deux sorties : l’impression du navigateur et un fichier .doc (Word).
   ========================================================================= */
(function () {
  'use strict';

  /* ============================================================ EMPLOI ====
     Transcription exacte de « emploi du temps/emploi.doc » (version 2026-2027)
     : 7 créneaux × 5 jours (dimanche → jeudi). La sixième colonne du document
     d’origine est vide et n’est pas reprise. « /TD » signale la séance de
     travaux dirigés de la classe (dans le document : seconde ligne de la
     cellule, ex. « 2AM6 ⏎ TD »).                                        */
  const EMPLOI_DEFAUT = {
    jours: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi'],
    creneaux: [
      { lib: '8 – 9',         debut: '08:00', fin: '09:00' },
      { lib: '9 – 10',        debut: '09:00', fin: '10:00' },
      { lib: '10 – 11',       debut: '10:00', fin: '11:00' },
      { lib: '11 – 12',       debut: '11:00', fin: '12:00' },
      { lib: '13:30 – 14:30', debut: '13:30', fin: '14:30' },
      { lib: '14:30 – 15:30', debut: '14:30', fin: '15:30' },
      { lib: '15:30 – 16:30', debut: '15:30', fin: '16:30' }
    ],
    grille: [
      ['2AM6',     '2AM5',    '',        '2AM5',   ''        ],
      ['2AM6/TD',  '2AM5',    '',        '',       '2AM7/TD' ],
      ['',         '',        '',        '2AM5/TD', ''       ],
      ['',         '',        '',        '',       '2AM6'    ],
      ['',         '',        '',        '2AM7',   ''        ],
      ['',         '2AM7',    '',        '',       ''        ],
      ['2AM7',     '2AM6',    '',        '',       ''        ]
    ]
  };

  /* Grille de travail : au départ, copie de la grille officielle ci-dessus ;
     au chargement, elle est remplacée par la version enregistrée dans le
     navigateur (voir « Modifier l’emploi du temps » dans #/journal).       */
  const EMPLOI = copieEmploi(EMPLOI_DEFAUT);

  const CLASSES = ['2AM5', '2AM6', '2AM7'];

  /* ============================================================ ÉTAT ====== */
  const CLE = 'rme-cahier-journal';
  const etat = { classe: '2AM5', professeur: '' };

  function chargerEtat() {
    try {
      const brut = JSON.parse(localStorage.getItem(CLE) || '{}');
      if (brut && CLASSES.indexOf(brut.classe) >= 0) etat.classe = brut.classe;
      if (brut && typeof brut.professeur === 'string') etat.professeur = brut.professeur;
    } catch (e) { /* stockage indisponible : on garde les valeurs par défaut */ }
  }

  function sauverEtat() {
    try { localStorage.setItem(CLE, JSON.stringify(etat)); } catch (e) { /* ignoré */ }
  }

  /* ============================================ EMPLOI DU TEMPS (état) ====
     La grille et les horaires de l’emploi du temps sont modifiables depuis
     l’application et mémorisés dans le navigateur.                         */
  const CLE_EMPLOI = 'rme-emploi-temps';

  function copieEmploi(src) {
    return JSON.parse(JSON.stringify(src));
  }

  /* « 08:00 », « 09:00 » → « 8 – 9 » ; « 13:30 », « 14:30 » → « 13:30 – 14:30 ». */
  function libHoraire(debut, fin) {
    const court = (h) => {
      const m = /^(\d{1,2}):(\d{2})$/.exec(String(h || '').trim());
      if (!m) return String(h || '');
      return m[2] === '00' ? String(Number(m[1])) : m[1] + ':' + m[2];
    };
    return court(debut) + ' – ' + court(fin);
  }

  /* Contrôle de forme d’un emploi du temps enregistré : jours, créneaux et
     grille doivent être cohérents, sinon on renvoie null (grille officielle). */
  function normaliserEmploi(src) {
    if (!src || typeof src !== 'object') return null;
    const jours = Array.isArray(src.jours) ? src.jours.map(String) : null;
    const creneaux = Array.isArray(src.creneaux) ? src.creneaux.map((c) => ({
      lib: String((c && c.lib) || ''),
      debut: String((c && c.debut) || ''),
      fin: String((c && c.fin) || '')
    })) : null;
    const grille = Array.isArray(src.grille)
      ? src.grille.map((l) => (Array.isArray(l) ? l.map((x) => String(x == null ? '' : x)) : null))
      : null;
    if (!jours || !jours.length) return null;
    if (!creneaux || !creneaux.length) return null;
    if (!grille || grille.length !== creneaux.length) return null;
    if (grille.some((l) => !l || l.length !== jours.length)) return null;
    return { jours: jours, creneaux: creneaux, grille: grille };
  }

  function chargerEmploi() {
    try {
      const valide = normaliserEmploi(JSON.parse(localStorage.getItem(CLE_EMPLOI) || 'null'));
      if (valide) {
        EMPLOI.jours = valide.jours;
        EMPLOI.creneaux = valide.creneaux;
        EMPLOI.grille = valide.grille;
      }
    } catch (e) { /* stockage indisponible : la grille officielle est conservée */ }
  }

  function sauverEmploi() {
    try {
      localStorage.setItem(CLE_EMPLOI, JSON.stringify({
        jours: EMPLOI.jours, creneaux: EMPLOI.creneaux, grille: EMPLOI.grille
      }));
    } catch (e) { /* ignoré */ }
  }

  function reinitialiserEmploi() {
    EMPLOI.jours = EMPLOI_DEFAUT.jours.slice();
    EMPLOI.creneaux = copieEmploi(EMPLOI_DEFAUT.creneaux);
    EMPLOI.grille = copieEmploi(EMPLOI_DEFAUT.grille);
    try { localStorage.removeItem(CLE_EMPLOI); } catch (e) { /* ignoré */ }
  }

  /* =========================================================== DATES ====== */
  const MOIS_LONGS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin',
                      'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  const MOIS_COURTS = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin',
                       'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
  const JOURS_LONGS = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const JOURS_COURTS = ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'];

  /* « 17 déc. 2026 », « 18 mars 2027 », « 27 mai 2027 » → objet Date */
  function parseDateFR(txt) {
    const m = /^\s*(\d{1,2})\s+([^\s]+)\s+(\d{4})\s*$/.exec(String(txt || ''));
    if (!m) return null;
    const nom = m[2].toLowerCase().replace(/\.$/, '');
    let mois = -1;
    for (let i = 0; i < MOIS_LONGS.length; i++) {
      if (MOIS_LONGS[i].replace('.', '').indexOf(nom) === 0) { mois = i; break; }
    }
    if (mois < 0) return null;
    return new Date(Number(m[3]), mois, Number(m[1]));
  }

  const VACANCES = SEMAINES
    .filter((s) => s.vacances)
    .map((s) => ({ nom: s.nom, du: parseDateFR(s.du), au: parseDateFR(s.au) }))
    .filter((v) => v.du && v.au);

  function enVacances(d) {
    return !!vacanceDe(d);
  }

  /* Nom de la période de vacances qui contient la date (27 oct. 2026 est le
     premier jour des vacances d’automne), ou null. Les vacances coupent la
     semaine 4 (25 oct.) et les derniers jours des semaines 10 et 20.       */
  function vacanceDe(d) {
    for (let i = 0; i < VACANCES.length; i++) {
      if (d >= VACANCES[i].du && d < VACANCES[i].au) return VACANCES[i].nom;
    }
    return null;
  }

  const FIN_COURS = parseDateFR(META.finCours) || new Date(2027, 4, 27);

  function fmtDate(d) {
    if (!d) return '—';
    return JOURS_COURTS[d.getDay()] + ' ' + d.getDate() + ' ' +
           MOIS_COURTS[d.getMonth()] + ' ' + d.getFullYear();
  }

  function fmtDateCourte(d) {
    if (!d) return '—';
    return d.getDate() + ' ' + MOIS_COURTS[d.getMonth()] + ' ' + d.getFullYear();
  }

  function iso(d) {
    const p = (n) => (n < 10 ? '0' + n : '' + n);
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
  }

  /* Ajout de jours « façon calendrier » : on repart d’une date à minuit
     locale pour ne pas dériver d’une heure lors des changements de fuseau. */
  function ajouterJours(d, n) {
    const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    x.setDate(x.getDate() + n);
    return x;
  }

  /* -------------------------------------------------------------------
     DATES DES 27 SEMAINES

     La répartition annuelle groupe les semaines par mois. Le calendrier
     2026-2027 comprend trois périodes de vacances : automne (27 oct. →
     2 nov. 2026, reprise le lundi 2 nov.), hiver (17 déc. → 3 janv.)
     et printemps (18 mars → 4 avr.). L’année s’achève avec les examens
     du 3e trimestre (23-27 mai 2027), donc le dernier dimanche utile
     est le 23 mai 2027.

     On attribue les dimanches **du dernier au premier**, en donnant la
     préférence au mois indiqué par la répartition, tout en garantissant
     qu’il reste assez de dimanches pour les semaines précédentes et qu'
     aucune séance ne dépasse la fin de l’année. Avec les vacances d’automne
     et les libellés de mois ajustés (janvier 4, février 3, mars 3, avril 3, mai 4),
     les 28 semaines (1 de rentrée — évaluation et remédiation, 25 de cours +
     révisions et examens) tombent
     **exactement** dans le mois de la répartition, du dim. 27 sept. 2026
     au dim. 23 mai 2027.                                              */
  let cacheDimanches = null;

  function dimanchesDesSemaines() {
    if (cacheDimanches) return cacheDimanches;

    const semaines = SEMAINES.filter((s) => !s.vacances);
    const annee = Number(String(META.annee).split('-')[0]) || 2026;

    /* dernier dimanche dont les séances (jusqu’au jeudi) tiennent avant la
       fin de l’année : 27 mai 2027 (jeudi) → dimanche 23 mai 2027       */
    const limite = new Date(FIN_COURS);
    limite.setDate(limite.getDate() - 4);
    const cap = new Date(limite);
    cap.setDate(cap.getDate() - cap.getDay());

    /* tous les dimanches scolaires, vacances exclues */
    let d = new Date(annee, 8, 1);
    while (d.getDay() !== 0) d.setDate(d.getDate() + 1);
    let dispo = [];
    while (d <= cap) {
      if (!enVacances(d)) dispo.push(new Date(d));
      d.setDate(d.getDate() + 7);
    }

    const res = new Array(semaines.length);
    for (let i = semaines.length - 1; i >= 0; i--) {
      const suivant = i + 1 < res.length ? res[i + 1].getTime() : Infinity;
      const candidats = dispo.filter((x) => x.getTime() < suivant);
      /* il faut encore loger les i semaines précédentes : seuls les
         dimanches d’indice ≥ i sont utilisables                        */
      const faisables = candidats.slice(i);
      const base = faisables.length ? faisables : candidats;
      if (!base.length) { res[i] = null; continue; }
      const propres = base.filter(
        (x) => MOIS_LONGS[x.getMonth()].toLowerCase() === semaines[i].mois.toLowerCase()
      );
      const choisi = (propres.length ? propres : base)[(propres.length ? propres : base).length - 1];
      res[i] = choisi;
      dispo = dispo.filter((x) => x.getTime() < choisi.getTime());
    }

    cacheDimanches = res;
    return res;
  }

  /* ====================================================== EMPLOI DU TEMPS = */
  function creneauxClasse(code) {
    const out = [];
    EMPLOI.grille.forEach((ligne, ci) => {
      ligne.forEach((cell, j) => {
        if (!cell) return;
        const parts = String(cell).split('/');
        if (parts[0].trim() !== code) return;
        out.push({
          jour: j,
          td: parts.length > 1 && parts[1].trim().toUpperCase() === 'TD',
          debut: EMPLOI.creneaux[ci].debut,
          fin: EMPLOI.creneaux[ci].fin,
          lib: EMPLOI.creneaux[ci].lib
        });
      });
    });
    out.sort((a, b) => (a.jour - b.jour) || (a.debut < b.debut ? -1 : (a.debut > b.debut ? 1 : 0)));
    return out;
  }

  /* ==================================================== PETITS OUTILS ===== */
  function esc(s) {
    return String(s === null || s === undefined ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function typeInfo(t) { return TYPES[t] || { label: t, icon: '•' }; }

  function sequenceDe(id) {
    for (let i = 0; i < SEQUENCES.length; i++) if (SEQUENCES[i].id === id) return SEQUENCES[i];
    return null;
  }

  function themeDe(id) {
    for (let i = 0; i < THEMES.length; i++) if (THEMES[i].id === id) return THEMES[i];
    return null;
  }

  function semainesDeSeq(num) {
    return SEMAINES.filter((s) => !s.vacances && s.seq === num);
  }

  /* Support de la leçon : fiche pédagogique + page du manuel + intitulé */
  function supportSeance(se) {
    const bits = [];
    if (se.f) bits.push('fiche p. ' + se.f.de + (se.f.a !== se.f.de ? ' – ' + se.f.a : ''));
    if (se.mp) bits.push('manuel p. ' + se.mp + (se.mt ? ' — « ' + se.mt + ' »' : ''));
    else if (se.m) bits.push('manuel p. ' + se.m);
    if (!bits.length) return '';
    return 'Support : ' + bits.join(' · ') + '.';
  }

  function evaluationSeance(sem, se, i) {
    if (se.evaluation) return se.evaluation;
    if (i === 0 && sem.note) return sem.note;
    if (se.t === 'td') return 'TD';
    return '—';
  }

  /* Objectifs d’apprentissage d’une séquence (dédoublonnés) */
  function objectifsSeq(num) {
    const vus = [];
    semainesDeSeq(num).forEach((sem) => {
      sem.seances.forEach((se) => {
        (se.capable || []).forEach((c) => { if (vus.indexOf(c) < 0) vus.push(c); });
      });
    });
    return vus;
  }

  /* ====================================================== EMPLOI EN HTML == */
  function htmlEmploi() {
    const lignes = EMPLOI.creneaux.map((cr, ci) => {
      const cellules = EMPLOI.grille[ci].map((cell, j) => {
        if (!cell) return '<td class="jr-vide"></td>';
        const parts = cell.split('/');
        const ici = parts[0].trim() === etat.classe;
        return '<td class="' + (ici ? 'jr-occupe' : 'jr-autre') + '">' +
          '<b>' + esc(parts[0].trim()) + '</b>' +
          (parts.length > 1 ? '<span class="jr-td">TD</span>' : '') +
          (ici ? '' : '<span class="jr-hors">autre classe</span>') +
          '</td>';
      }).join('');
      return '<tr><th scope="row">' + esc(cr.lib) + '</th>' + cellules + '</tr>';
    }).join('');

    return '<section class="jr-bloc" aria-labelledby="jr-emploi-t">' +
      '<h2 id="jr-emploi-t">Emploi du temps — ' + esc(etat.classe) + '</h2>' +
      '<div class="jr-scroll"><table class="jr-grille"><caption>4 séances par semaine : ' +
      '3 séances classiques + 1 séance de travaux dirigés.</caption>' +
      '<thead><tr><th scope="col">Heure</th>' +
      EMPLOI.jours.map((j) => '<th scope="col">' + j + '</th>').join('') +
      '</tr></thead><tbody>' + lignes + '</tbody></table></div>' +
      '<p class="jr-legende"><span class="jr-cle jr-occupe"></span> séance de ' + esc(etat.classe) +
      ' · <span class="jr-cle jr-td-leg"></span> séance de TD · ' +
      '<span class="jr-cle jr-autre"></span> autre classe du même service.</p>' +
      '</section>';
  }

  /* ============================================== ÉDITEUR EMPLOI DU TEMPS ==
     Grille modifiable par l’enseignant : une liste déroulante par créneau
     (classe ou vide) et deux champs d’heure par ligne. Les changements sont
     enregistrés dans le navigateur et le document se régénère tout de suite. */
  function optionsCellule(valeur) {
    const v = String(valeur || '').trim().toUpperCase();
    const liste = [['', '— vide —']];
    CLASSES.forEach((c) => {
      liste.push([c, c]);
      liste.push([c + '/TD', c + ' · TD']);
    });
    return liste.map((paire) =>
      '<option value="' + esc(paire[0]) + '"' + (paire[0].toUpperCase() === v ? ' selected' : '') +
      '>' + esc(paire[1]) + '</option>').join('');
  }

  function contenuEditeurEmploi() {
    const entete = '<tr><th scope="col">Horaire</th>' +
      EMPLOI.jours.map((j) => '<th scope="col">' + esc(j) + '</th>').join('') + '</tr>';

    const corps = EMPLOI.creneaux.map((cr, ci) => {
      const champs = '<div class="jr-editeur-heure">' +
        '<input type="time" data-cr="' + ci + '" data-champ="debut" value="' + esc(cr.debut) + '" ' +
        'aria-label="Heure de début du créneau ' + (ci + 1) + '">' +
        '<span class="jr-editeur-tiret">–</span>' +
        '<input type="time" data-cr="' + ci + '" data-champ="fin" value="' + esc(cr.fin) + '" ' +
        'aria-label="Heure de fin du créneau ' + (ci + 1) + '">' +
        '<span class="jr-editeur-lib" data-lib="' + ci + '">' + esc(cr.lib) + '</span></div>';
      const cellules = EMPLOI.jours.map((nomJour, j) =>
        '<td><select class="jr-editeur-cellule" data-cr="' + ci + '" data-jour="' + j + '" ' +
        'aria-label="Créneau ' + (ci + 1) + ', ' + esc(nomJour) + '">' +
        optionsCellule(EMPLOI.grille[ci][j]) + '</select></td>').join('');
      return '<tr><th scope="row">' + champs + '</th>' + cellules + '</tr>';
    }).join('');

    return '<p class="jr-editeur-aide">Choisis la <b>classe de chaque créneau</b> — ou ' +
      '<b>— vide —</b> — puis ajuste les <b>horaires</b> si besoin. Chaque modification est ' +
      '<b>enregistrée automatiquement</b> dans ce navigateur, et le cahier journal ci-dessous ' +
      'se met à jour aussitôt.</p>' +
      '<div class="jr-scroll"><table class="jr-grille jr-editeur-grille">' +
      '<thead>' + entete + '</thead><tbody>' + corps + '</tbody></table></div>' +
      '<div class="jr-editeur-actions">' +
      '<button type="button" class="btn" id="jr-emploi-reset">↩️ Rétablir l’emploi du temps d’origine</button>' +
      '<span class="jr-statut" id="jr-emploi-statut" role="status" aria-live="polite"></span>' +
      '</div>';
  }

  function htmlEditeurEmploi() {
    return '<details class="jr-editeur" id="jr-editeur">' +
      '<summary>✏️ Modifier l’emploi du temps</summary>' +
      '<div class="jr-editeur-corps">' + contenuEditeurEmploi() + '</div>' +
      '</details>';
  }

  /* Ligne de statut de l’éditeur, effacée après quelques secondes. */
  let statutEmploiTimer = null;
  function statutEmploi(texte, mode) {
    const s = document.getElementById('jr-emploi-statut');
    if (!s) return;
    if (statutEmploiTimer) clearTimeout(statutEmploiTimer);
    s.textContent = texte;
    s.className = 'jr-statut' + (mode ? ' ' + mode : '');
    statutEmploiTimer = setTimeout(() => {
      s.textContent = '';
      s.className = 'jr-statut';
    }, 6000);
  }

  /* ==================================================== PROGRESSION ====== */
  function htmlProgression() {
    const projets = [];
    SEQUENCES.forEach((sq) => {
      let p = null;
      for (let i = 0; i < projets.length; i++) if (projets[i].projet === sq.projet) p = projets[i];
      if (!p) { p = { projet: sq.projet, duree: sq.duree, tache: sq.tache, seqs: [] }; projets.push(p); }
      p.seqs.push(sq);
    });

    return '<section class="jr-bloc" aria-labelledby="jr-prog-t">' +
      '<h2 id="jr-prog-t">Progression annuelle — les trois projets</h2>' +
      '<ul class="jr-liste">' + projets.map((p) =>
        '<li><b>' + esc(p.projet) + '</b> — ' + esc(p.duree) +
        ' · tâche : ' + esc(p.tache) +
        ' · séquence' + (p.seqs.length > 1 ? 's ' : ' ') +
        p.seqs.map((s) => s.num).join(', ') + '.</li>').join('') +
      '</ul>' +
      '<p class="jr-note">Chaque séance du tableau ci-dessous renvoie à la ' +
      'répartition annuelle (objectif, fiche pédagogique, page du manuel) ' +
      'et à l’emploi du temps (jour et horaire réels de ' + esc(etat.classe) + ').</p>' +
      '</section>';
  }

  /* ==================================================== TABLEAU D’UNE SQ == */
  function htmlTableSeq(semList) {
    const cr = creneauxClasse(etat.classe);
    const classiques = cr.filter((c) => !c.td);
    const slotTd = cr.filter((c) => c.td)[0] || null;
    const dimanches = dimanchesDesSemaines();
    let ic = 0;
    const corps = [];

    semList.forEach((sem) => {
      ic = 0;                       /* chaque semaine repart au créneau 1 */
      const dim = dimanches[SEMAINES.filter((s) => !s.vacances).indexOf(sem)];
      const jeu = dim ? ajouterJours(dim, 4) : null;

      corps.push('<tr class="jr-semaine"><td colspan="6">' +
        '<b>Semaine ' + sem.n + '</b> — semaine du ' + fmtDate(dim) +
        ' au ' + fmtDate(jeu) +
        ' <span class="jr-mois">répartition : ' + esc(sem.mois) + '</span>' +
        (sem.note ? ' <span class="jr-note-eval">' + esc(sem.note) + '</span>' : '') +
        '</td></tr>');

      sem.seances.forEach((se, i) => {
        const tp = typeInfo(se.t);
        const slot = se.t === 'td' ? slotTd : classiques[ic++];
        const caps = (se.capable || [])
          .map((c) => '<span class="jr-cap">• ' + esc(c) + '</span>').join('');
        const sup = supportSeance(se);
        const date = slot && dim
          ? ajouterJours(dim, slot.jour)
          : null;
        const vac = date ? vacanceDe(date) : null;

        corps.push('<tr>' +
          '<td class="jr-seance"><b>Séance ' + (i + 1) + '</b>' +
          '<span class="jr-type">' + tp.icon + ' ' + esc(tp.label) + '</span>' +
          (se.t === 'td' ? '<span class="jr-badge">TD</span>' : '') + '</td>' +
          '<td class="jr-contenu"><b class="jr-obj">' + esc(se.obj || '') + '</b>' +
          caps +
          (sup ? '<span class="jr-support">' + esc(sup) + '</span>' : '') + '</td>' +
          '<td class="jr-date">' + (date ? fmtDate(date) : '—') +
          (vac ? ' <span class="jr-vacs">' + esc(vac) + '</span>' : '') + '</td>' +
          '<td class="jr-horaire">' + (slot ? esc(slot.debut) + ' – ' + esc(slot.fin) : '—') + '</td>' +
          '<td class="jr-classe">' + esc(etat.classe) + '</td>' +
          '<td class="jr-eval">' + esc(evaluationSeance(sem, se, i)) + '</td>' +
          '</tr>');
      });
    });

    return '<div class="jr-scroll"><table class="jr-table">' +
      '<thead><tr>' +
      '<th scope="col">Séances</th>' +
      '<th scope="col">Thèmes et objectifs</th>' +
      '<th scope="col">Dates</th>' +
      '<th scope="col">Horaires</th>' +
      '<th scope="col">Classes</th>' +
      '<th scope="col">Évaluations</th>' +
      '</tr></thead><tbody>' + corps.join('') + '</tbody></table></div>';
  }

  /* ======================================================= PROJETS/SÉQ === */
  function htmlSeq(sq) {
    const semList = semainesDeSeq(sq.id);
    if (!semList.length) return '';
    const th = themeDe(sq.theme);
    const obj = objectifsSeq(sq.id);

    return '<article class="jr-seq" aria-labelledby="jr-sq-' + sq.id + '">' +
      '<h3 id="jr-sq-' + sq.id + '">Séquence ' + sq.num + ' — ' + esc(sq.titre) + '</h3>' +
      '<p class="jr-seq-meta">' +
      '<b>Objectif général :</b> ' + esc(sq.titre) + ' — ' + esc(sq.accent) + ' · ' +
      (th ? esc(th.genre) + ' (' + esc(th.nom) + ')' : '') + ' · ' +
      esc(sq.duree) + ' · ' + semList.length + ' semaine' + (semList.length > 1 ? 's' : '') +
      ' (' + semList.map((s) => s.n).join(', ') + ').</p>' +
      (obj.length ? '<div class="jr-obj"><b>Objectifs d’apprentissage</b><ul class="jr-liste">' +
        obj.map((o) => '<li>' + esc(o) + '</li>').join('') + '</ul></div>' : '') +
      htmlTableSeq(semList) +
      '</article>';
  }

  function htmlProjets() {
    const projets = [];
    SEQUENCES.forEach((sq) => {
      let p = null;
      for (let i = 0; i < projets.length; i++) if (projets[i].projet === sq.projet) p = projets[i];
      if (!p) { p = { projet: sq.projet, seqs: [] }; projets.push(p); }
      p.seqs.push(sq);
    });

    return projets.map((p) =>
      '<section class="jr-projet" aria-labelledby="jr-p' + p.seqs[0].id + '">' +
      '<h2 id="jr-p' + p.seqs[0].id + '">' + esc(p.projet) + '</h2>' +
      '<p class="jr-projet-meta">Séquences ' +
      p.seqs.map((s) => s.num).join(', ') + ' · ' + esc(p.seqs[0].duree) +
      ' · ' + esc(p.seqs[0].tache) + '</p>' +
      p.seqs.map(htmlSeq).join('') +
      '</section>').join('');
  }

  /* ========================================================= EN-TÊTE ====== */
  function htmlEntete() {
    const dim = dimanchesDesSemaines();
    const utiles = dim.filter(Boolean);
    const premier = utiles.length ? utiles[0] : null;
    const dernier = utiles.length ? utiles[utiles.length - 1] : null;

    return '<section class="jr-entete" aria-label="En-tête du cahier journal">' +
      '<p class="jr-rubrique">Cahier journal</p>' +
      '<h2 class="jr-titre">Français — ' + esc(META.niveau) + ' (' + esc(META.code) + ')</h2>' +
      '<p class="jr-ligne"><b>Année scolaire :</b> ' + esc(META.annee) +
      ' <span class="jr-sep">·</span> <b>Classe :</b> ' + esc(etat.classe) +
      ' <span class="jr-sep">·</span> <b>Professeur :</b> ' +
      (etat.professeur ? esc(etat.professeur) : '<i>à renseigner</i>') + '</p>' +
      '<p class="jr-ligne"><b>Volume horaire :</b> ' + esc(META.volume) +
      ' <span class="jr-sep">·</span> <b>Fin des cours :</b> ' + esc(META.finCours) +
      ' <span class="jr-sep">·</span> <b>Période couverte :</b> ' +
      (premier ? fmtDateCourte(premier) + ' → ' + fmtDateCourte(dernier) : '—') + '</p>' +
      '</section>';
  }

  /* ======================================================== DOCUMENT ====== */
  function corpsJournal() {
    return htmlEntete() + htmlEmploi() + htmlProgression() + htmlProjets() +
      '<p class="jr-pied">Document généré par <b>Le Royaume des Mots Enchantés</b> ' +
      'à partir de l’emploi du temps, de la répartition annuelle 2AM ' + esc(META.annee) +
      ' et du modèle « Cahier journal 2am ».</p>';
  }

  /* ======================================================== LIVRAISON ===== */
  function vueJournal() {
    const options = CLASSES.map((c) =>
      '<option value="' + c + '"' + (c === etat.classe ? ' selected' : '') + '>' + c + '</option>'
    ).join('');

    return '<div class="enveloppe">' +
      '<nav class="fil" aria-label="Fil d’Ariane"><a href="#/">Accueil</a>' +
      '<span class="sep">›</span><span class="ici">Cahier journal</span></nav>' +
      '<h1 class="titre-vue"><span class="surtitre">Outil de l’enseignant</span>' +
      'Cahier journal — remplissage automatique</h1>' +
      '<p class="lede">Le cahier journal se remplit tout seul : les <b>jours et les horaires</b> ' +
      'proviennent de l’emploi du temps (que tu peux <b>modifier</b> juste en dessous), les ' +
      '<b>séances, thèmes, objectifs, supports et évaluations</b> de la répartition annuelle. ' +
      'Choisis la classe, indique ton nom, puis imprime ou télécharge le document.</p>' +
      '<div class="journal-outil" id="journal-outil">' +
      '<label class="jr-champ"><span>Classe</span>' +
      '<select id="jr-classe" aria-label="Classe du cahier journal">' + options + '</select></label>' +
      '<label class="jr-champ"><span>Professeur</span>' +
      '<input type="text" id="jr-prof" value="' + esc(etat.professeur) + '" ' +
      'placeholder="Nom et prénom" autocomplete="name"></label>' +
      '<span class="jr-actions">' +
      '<button type="button" class="btn" id="jr-imprimer">🖨️ Imprimer</button>' +
      '<button type="button" class="btn" id="jr-doc">⬇️ Télécharger (.doc)</button>' +
      '</span>' +
      '<span class="jr-statut" id="jr-statut" role="status" aria-live="polite"></span></div>' +
      htmlEditeurEmploi() +
      '<div id="journal-corps" class="journal-corps">' + corpsJournal() + '</div>' +
      '</div>';
  }

  /* --------------------------------------------------------- IMPRESSION -- */
  function imprimer() { window.print(); }

  /* --------------------------------------------------------- FICHIER .DOC -
     Un HTML simple, ouvert et modifiable par Word, que l’on peut ensuite
     enregistrer en .docx. Le contenu est identique à l’aperçu écran.     */
  const CSS_DOC =
    'body{font-family:Calibri,Arial,sans-serif;font-size:11pt;color:#111;}' +
    'h1,h2,h3{font-family:Georgia,serif;color:#241045;margin:14pt 0 6pt;}' +
    'h2{font-size:15pt;border-bottom:1.5pt solid #241045;padding-bottom:3pt;}' +
    'h3{font-size:13pt;color:#7a2a55;}' +
    'p{margin:4pt 0;}' +
    '.jr-rubrique{font-size:9pt;letter-spacing:2pt;text-transform:uppercase;color:#a07a20;margin:0;}' +
    '.jr-titre{font-size:16pt;margin:2pt 0 6pt;}' +
    '.jr-entete{border:1pt solid #999;padding:8pt 10pt;margin-bottom:12pt;background:#f6f4ef;}' +
    '.jr-ligne{margin:2pt 0;font-size:10.5pt;}' +
    '.jr-sep{color:#999;}' +
    'table{border-collapse:collapse;width:100%;margin:6pt 0 14pt;}' +
    'caption{font-size:9pt;color:#555;text-align:left;margin-bottom:4pt;}' +
    'th,td{border:.5pt solid #9a9a9a;padding:4pt 5pt;vertical-align:top;font-size:9.5pt;}' +
    'thead th{background:#241045;color:#fff;font-size:9pt;text-align:left;}' +
    '.jr-grille th[scope=row]{background:#efece4;text-align:left;width:16%;}' +
    '.jr-grille .jr-occupe{background:#e6f2e6;font-weight:bold;text-align:center;}' +
    '.jr-grille .jr-autre{background:#f4f4f4;color:#888;text-align:center;}' +
    '.jr-grille .jr-vide{background:#fafafa;}' +
    '.jr-td{display:block;font-size:8pt;color:#7a2a55;font-weight:bold;}' +
    '.jr-hors{display:block;font-size:7.5pt;color:#999;}' +
    '.jr-legende{font-size:9pt;color:#555;}' +
    '.jr-semaine td{background:#efece4;font-size:9.5pt;}' +
    '.jr-mois,.jr-note-eval{font-size:8.5pt;color:#666;margin-left:6pt;}' +
    '.jr-note-eval{color:#a07a20;}' +
    '.jr-vacs{display:inline-block;font-size:7.5pt;border:.5pt solid #9a5c0d;' +
    'color:#9a5c0d;background:#fff2dc;border-radius:8pt;padding:0 3pt;margin-left:3pt;}' +
    '.jr-seance b{display:block;}' +
    '.jr-type{display:block;font-size:8.5pt;color:#555;}' +
    '.jr-badge{display:inline-block;font-size:8pt;border:.5pt solid #7a2a55;' +
    'color:#7a2a55;padding:0 3pt;}' +
    '.jr-obj{display:block;}' +
    '.jr-cap{display:block;font-size:9pt;color:#444;margin-top:1pt;}' +
    '.jr-support{display:block;font-size:8.5pt;color:#a07a20;margin-top:2pt;}' +
    '.jr-seq{margin:12pt 0 18pt;}' +
    '.jr-seq-meta,.jr-projet-meta,.jr-note,.jr-pied{font-size:10pt;color:#333;}' +
    '.jr-liste{margin:4pt 0 8pt 14pt;}' +
    '.jr-liste li{margin-bottom:2pt;}' +
    '.jr-pied{margin-top:16pt;border-top:.5pt solid #999;padding-top:6pt;' +
    'font-size:9pt;color:#666;}' +
    '@page{size:A4 landscape;margin:1.2cm;}';

  /* Petite ligne de statut sous les boutons (succès / erreur de l’export). */
  let _statutTimer = null;
  function statut(texte, mode) {
    const s = document.getElementById('jr-statut');
    if (!s) return;
    clearTimeout(_statutTimer);
    s.textContent = texte;
    s.className = 'jr-statut' + (mode ? ' ' + mode : '');
    _statutTimer = setTimeout(() => { s.textContent = ''; s.className = 'jr-statut'; }, 7000);
  }

  function telechargerDoc() {
    const titre = 'Cahier journal ' + etat.classe + ' — ' + META.annee;
    const nomFichier = 'Cahier-journal-' + etat.classe + '-' + META.annee + '.doc';
    let html;
    try {
      html =
        '<html xmlns:o="urn:schemas-microsoft-com:office:office" ' +
        'xmlns:w="urn:schemas-microsoft-com:office:word" ' +
        'xmlns="http://www.w3.org/TR/REC-html40">' +
        '<head><meta charset="utf-8"><title>' + esc(titre) + '</title>' +
        '<!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View>' +
        '<w:Zoom>100</w:Zoom></w:WordDocument></xml><![endif]-->' +
        '<style>' + CSS_DOC + '</style></head><body>' + corpsJournal() + '</body></html>';

      const blob = new Blob(['\ufeff' + html], { type: 'application/msword;charset=utf-8' });

      /* Ancien Edge : enregistrement direct depuis le Blob. */
      if (window.navigator && navigator.msSaveBlob) {
        navigator.msSaveBlob(blob, nomFichier);
        statut('Document enregistré : ' + nomFichier + '.', 'ok');
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
         l’URL blob : un retrait immédiat peut annuler la sauvegarde sur
         certains navigateurs (Chrome/Edge) et `revokeObjectURL` trop
         précoce rend le fichier illisible.                                  */
      setTimeout(() => {
        URL.revokeObjectURL(url);
        if (a.parentNode) a.parentNode.removeChild(a);
      }, 1000);
      statut('Document généré : « ' + nomFichier + ' » — vérifiez vos téléchargements.', 'ok');
    } catch (err) {
      statut('Erreur durant l’export : ' + ((err && err.message) ? err.message : String(err)) + '.', 'err');
    }
  }

  /* ---------------------------------------------------------- INITIALISATION */
  function journalInit() {
    const sel = document.getElementById('jr-classe');
    const inp = document.getElementById('jr-prof');
    const boite = document.getElementById('journal-outil');
    if (!sel || !inp || !boite) return;

    function majCorps() {
      const cible = document.getElementById('journal-corps');
      if (cible) cible.innerHTML = corpsJournal();
    }

    sel.addEventListener('change', () => {
      if (CLASSES.indexOf(sel.value) < 0) return;
      etat.classe = sel.value;
      sauverEtat();
      majCorps();
    });

    inp.addEventListener('input', () => {
      etat.professeur = inp.value.slice(0, 80);
      sauverEtat();
      majCorps();
    });

    const bp = document.getElementById('jr-imprimer');
    const bd = document.getElementById('jr-doc');
    if (bp) bp.addEventListener('click', imprimer);
    if (bd) bd.addEventListener('click', telechargerDoc);

    /* --- modification de l’emploi du temps ------------------------------ */
    const ed = document.getElementById('jr-editeur');
    if (ed) {
      ed.addEventListener('change', (e) => {
        const cellule = e.target.closest('.jr-editeur-cellule');
        if (cellule) {
          const ci = Number(cellule.dataset.cr);
          const j = Number(cellule.dataset.jour);
          if (!EMPLOI.grille[ci] || typeof EMPLOI.grille[ci][j] === 'undefined') return;
          EMPLOI.grille[ci][j] = cellule.value;
          sauverEmploi();
          majCorps();
          statutEmploi('Enregistré : ' + EMPLOI.jours[j] + ' — ' +
            (cellule.value ? cellule.value.replace('/TD', ' · TD') : 'créneau libre') + '.');
          return;
        }
        const heure = e.target.closest('input[type="time"][data-champ]');
        if (heure) {
          const cr = EMPLOI.creneaux[Number(heure.dataset.cr)];
          if (!cr) return;
          cr[heure.dataset.champ] = heure.value;
          cr.lib = libHoraire(cr.debut, cr.fin);
          const lib = ed.querySelector('[data-lib="' + heure.dataset.cr + '"]');
          if (lib) lib.textContent = cr.lib;
          sauverEmploi();
          majCorps();
          statutEmploi('Enregistré : horaire ' + (cr.lib || '—') + '.');
        }
      });

      ed.addEventListener('click', (e) => {
        if (!e.target.closest('#jr-emploi-reset')) return;
        reinitialiserEmploi();
        const corps = ed.querySelector('.jr-editeur-corps');
        if (corps) corps.innerHTML = contenuEditeurEmploi();
        majCorps();
        statutEmploi('Emploi du temps d’origine rétabli.', 'ok');
      });
    }
  }

  /* -------------------------------------------------------------------- */
  chargerEtat();
  chargerEmploi();

  window.EMPLOI = EMPLOI;
  window.vueJournal = vueJournal;
  window.journalInit = journalInit;
})();
