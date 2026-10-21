# ✦ Le Royaume des Mots Enchantés

Site statique (HTML + CSS + JavaScript, **aucun build**) du parcours de français
**2<sup>ème</sup> année moyenne — année scolaire 2026-2027**.

Une **vidéo de fond** (`assets/3porte.mp4`) ouvre le site, sans portes dessinées :
les trois royaumes (conte, fable, légende) s'y choisissent par de grands boutons de texte
→ 3 projets / 7 séquences / 28 semaines (1 de rentrée — évaluation et remédiation —, 25 de cours + révisions et examens) / 112 séances.

Trois **orbes magiques interactifs, toujours centrés** sous le texte, ouvrent par séance
les documents officiels **dans le site** (lecteur PDF intégré). Ils sont habillés d'un effet
de **verre liquide** (CSS pur) et de **glitters animés**, sans aucune image de décor.

Chaque séquence affiche en plus **ses devoirs officiels** : les quatre rubriques de la
progression annuelle du ministère — sujet de production écrite (manuel 2AM, page indiquée),
devoir surveillé, préparation orale et lecture à la maison.

Un **cahier journal auto-rempli** (`#/cahier-journal`) reconstruit les semaines de l'année
(25 de cours + révisions et examens) à partir de l'**emploi du temps** : horaires, séances de
chaque classe (2AM5, 2AM6, 2AM7), thèmes, objectifs et support de la leçon — imprimable et
téléchargeable en `.doc`.

La **répartition annuelle** (`#/repartition`) est le document de l'enseignant à
**imprimer** ou à **télécharger en Word (.doc)** : nom de l'établissement, professeur et
classes (mémorisés dans le navigateur) et la répartition **découpée par mois** (projet,
séquence, séances, évaluations, vacances rattachées à leur mois), un mois par page, avec
l'en-tête officiel et les lignes de signature.

---

## 📦 Dépôt GitHub

Le site est versionné sur GitHub : **<https://github.com/amormesbahi/royaume-des-mots-enchantes>**

* dépôt **public**, branche par défaut **`main`**, historique complet ;
* aucun build : le dépôt *est* le site (Netlify le publie tel quel) ;
* les PDF et la vidéo sont versionnés ici (34,9 Mo) — ils sont servis **à la demande**,
  jamais au démarrage.

### Pousser une modification

```powershell
git status                     # ce qui a changé
git add -A                     # indexer
git commit -m "message"        # enregistrer
git push                       # envoyer sur GitHub
```

> ⚠️ **Le réseau de l'établissement est très lent (~60 Ko/s)** : un `push` complet des
> 34,9 Mo prend **≈ 8 à 10 minutes**. Les modifications suivantes (texte, code) ne
> pèsent que quelques kilo-octets et partent en quelques secondes.

> 🔐 **Authentification** : le dépôt utilise un jeton personnel. Pour le régénérer :
> GitHub → *Settings* → *Developer settings* → *Personal access tokens* → *Fine-grained tokens*.
> Il faut les droits **Contents : Read and write** sur ce dépôt.

### Consulter l'historique

| Commande | Effet |
|---|---|
| `git log --oneline` | la liste des commits |
| `git show --stat HEAD` | le contenu du dernier commit |
| `git status -sb` | l'état du dossier (`## main...origin/main` = à jour) |
| `git diff` | les modifications non enregistrées |

---

## 📁 Arborescence

```
annuelle/
├─ index.html            page unique (structure SPA)
├─ netlify.toml          configuration de déploiement
├─ .gitattributes        fins de ligne LF figées (PDF, Word, images)
├─ .gitignore            fichiers exclus du dépôt
├─ css/
│  └─ style.css          thème « nuit enchantée », 3 décors SVG, écran vidéo,
│                        orbes centrés · verre liquide · glitters · cahier journal
├─ js/
│  ├─ data.js            données pédagogiques (META, THEMES, SEQUENCES, TYPES, SEMAINES, CALENDRIER_OFFICIEL, JEUX)
│  ├─ cahier.js          les 6 blocs « Travaux dirigés » du cahier d'activités (21 activités)
│  ├─ illustrations.js   banque de dessins SVG (32 scènes, aucun fichier image)
│  ├─ journal.js         cahier journal auto-rempli (EMPLOI, dates, export .doc)
│  └─ app.js             moteur : routes par ancre, vues, écran vidéo, orbes, TD
├─ assets/
│  ├─ 3porte.mp4         vidéo de fond de l'accueil (1280 × 720, 10 s, en boucle)
│  ├─ 3porte-poster.jpg  image d'attente de la vidéo (évite l'écran noir)
│  ├─ fiches-2am.pdf     109 fiches pédagogiques   (5 Mo)
│  └─ manuel-2am.pdf     154 pages du manuel 2AM  (23 Mo)
└─ README.md
```

Les PDF ne sont **jamais chargés au démarrage** : ils s'ouvrent uniquement au clic sur un orbe,
dans le **lecteur intégré** (`<iframe src="assets/….pdf?p=N#page=N&view=Fit">`).
Un bouton « Nouvel onglet ↗ » reste disponible si l'on préfère consulter le PDF à part.

La vidéo, elle, est chargée **uniquement sur la page d'accueil** (`preload="metadata"` +
lecture automatique) et son poster s'affiche immédiatement. Comme `netlify.toml` règle le
`Content-Type` **par extension**, `/assets/*.mp4` reçoit `video/mp4` et `/assets/*.jpg`
`image/jpeg` : une règle `/assets/*` globale forcerait `application/pdf` sur ces deux fichiers
et les rendrait illisibles.

> Les fichiers `cahier d'activités 2am.docx` (dossier `TD`) et les PDF en doublon à la racine
> ont été **retirés du dossier** avant le dépôt (tout est déjà servi depuis `assets/` et `js/`) ;
> conservez-en une copie dans vos archives.

---

## 🚀 Déployer sur Netlify (netlify.app)

### 🌐 Le site est déjà en ligne

| Hébergeur | Adresse | État |
|---|---|---|
| **GitHub Pages** | <https://amormesbahi.github.io/royaume-des-mots-enchantes/> | ✅ actif, redéployé à chaque `push` |
| Netlify | *à configurer* | https://<nom>.netlify.app |

> GitHub Pages sert le dépôt **tel quel**, sans build : le `push` de `main` suffit.

### Par glisser-déposer (le plus rapide)

1. Ouvrir <https://app.netlify.com/drop>.
2. Glisser-déposer **le dossier `annuelle`** entier.
3. Le site est en ligne immédiatement sur `https://<nom>.netlify.app`.

### Par dépôt Git (recommandé : redéploiement automatique)

1. Sur <https://app.netlify.com> → **Add new site** → **Import an existing project**.
2. Choisir le dépôt **`royaume-des-mots-enchantes`** (compte `amormesbahi`).
3. Les réglages sont déjà dans `netlify.toml` :
   * `publish = "."` (pas de build),
   * cache 1 an sur `/assets/*.pdf`, `/assets/*.mp4`, `/assets/*.jpg`, avec le bon `Content-Type`
     pour chaque type (`application/pdf`, `video/mp4`, `image/jpeg`) et `Accept-Ranges` sur la vidéo,
   * pas de redirection (la navigation utilise des ancres `#/…`).

### Fichiers retirés du dossier (doublons de la source)

Les fichiers suivants ont été retirés avant le dépôt — rien ne les référence dans le site
(tout est chargé depuis `assets/` et `js/`) :

| Fichier | Taille | Raison |
|---|---|---|
| `cahier d'activités 2am.docx` (dossier `TD`) | 797 Ko | source des exercices, déjà transcrite dans `js/cahier.js` |
| `2AM fiches.pdf` (racine) | 5,1 Mo | doublon de `assets/fiches-2am.pdf` |
| `Manuel_2AM.pdf` (racine) | 23,1 Mo | doublon de `assets/manuel-2am.pdf` |

`repartition_annuelle_2am_2026_2027.pdf` (13 Ko) reste à la racine comme référence.

Poids réellement servis par le site : **≈ 276 Ko de code** (index.html, style.css, app.js,
data.js, cahier.js, illustrations.js, journal.js) + **6,65 Mo de médias** sur l'accueil
(vidéo 6,22 Mo + poster 128 Ko), les 29,5 Mo de PDF n'étant chargés qu'à la demande.

### En local (test)

Ouvrir `index.html` directement (double-clic) fonctionne déjà.
Pour un vrai serveur local :

```bash
npx serve .          # ou : python -m http.server 8000
```

---

## 🗺️ Navigation

| Route | Vue |
|---|---|
| `#/` | Accueil : la **vidéo de fond** + les 3 royaumes en grands boutons + chiffres clés |
| `#/theme/1` `#/theme/2` `#/theme/3` | Arbre des séquences d'un thème (conte / fable / légende) |
| `#/sequence/1` … `#/sequence/7` | Détail d'une séquence + ses séances + ses **4 devoirs officiels** |
| `#/semaine/1` … `#/semaine/27` | Les 4 séances d'une semaine |
| `#/seance/<semaine>/<0-3>` | Fiche résumée + la **console des trois orbes** |
| `#/chrono` | Chronologie des 28 semaines (rentrée, vacances, devoirs, examens officiels) |
| `#/calendrier` | **Calendrier officiel** des devoirs et des examens (3 trimestres, dates du CEM) |
| `#/repartition` | **Répartition annuelle à imprimer / à télécharger en Word** (établissement, professeur, classes) |
| `#/jeux` | Les 7 TD du cahier (21 activités illustrées) |
| `#/journal` | **Cahier journal auto-rempli** (par classe : 2AM5 / 2AM6 / 2AM7) · **emploi du temps modifiable** dans l'application |
| `#/guide` | Mode d'emploi pour l'enseignant |

---

## 🏛️ Interface intégrale et centralisée

L'écran est construit autour d'un seul instrument de navigation, toujours au même endroit,
et **tout l'écrit est centré** (largeur plafonnée à 74 caractères par bloc de lecture) :

* **Accueil — l'écran vidéo** : `assets/3porte.mp4` occupe tout l'écran (`object-fit: cover`),
  assombrie par un voile en dégradé pour que le texte reste lisible. Les trois royaumes sont
  ensuite présentés en **grands boutons de texte** dans une grille de 3 colonnes centrée,
  en bas de page.
* **Séance — la console des orbes** : les trois orbes cliquables sont **toujours centrés**,
  alignés sur une ligne sous le texte, quelle que soit la séance. Plus d'image de décor :
  les orbes sont dessinés en CSS (disque sombre + anneau coloré + libellé) avec un effet de
  **verre liquide** (`backdrop-filter`) et des **glitters** (poussières dorées animées) qui
  retombent en fond.
* Largeurs étroites (< 900 px) : les royaumes passent sur une colonne, la console empile ses légendes.

---

## 🎬 L'écran vidéo de l'accueil

| Point | Choix retenu |
|---|---|
| Source | `assets/3porte.mp4` — 1280 × 720 (16:9), 10,01 s, 470 images, 6,22 Mo, en boucle |
| Lecture | `muted` + `playsinline` + `loop` + `preload="metadata"` — nécessaire pour passer les politiques d'autoplay |
| Attente | `poster="assets/3porte-poster.jpg"` (1200 × 675, 128 Ko) : aucune image noire pendant le téléchargement |
| Lisibilité | `.ecran-voile`, double dégradé (vertical + radial) posé sur la vidéo |
| Accessibilité | `aria-hidden="true"` (décor pur) ; un bouton **Pause / Lecture** en bas à droite — exigé pour tout contenu animé au-delà de 5 s (WCAG 2.2.2) |
| Accessibilité | `prefers-reduced-motion` → la vidéo est mise en pause, les glitters s'arrêtent et le décor SVG prend le relais |
| Repli | si le fichier est absent ou illisible, `body[data-ecran="erreur"]` ré-affiche le décor SVG |

La vidéo **n'existe que sur l'accueil** : dès qu'on entre dans un royaume, l'élément `<video>`
est mis en pause et masqué (`display:none`), et les 6,22 Mo ne sont jamais téléchargés par les
autres pages.

---

## 👑 Les trois royaumes

Sur l'accueil, chaque royaume est une **grande carte de texte** (genre, nom, devise, description,
compteurs de séquences / semaines / séances, lien « Entrer dans le royaume ▸ ») :

* **survol** ou **focus** de la souris → la carte s'élève et le décor du site prend la couleur du royaume ;
* **clic** (ou touche `Entrée`) → mise en évidence brève puis navigation vers `#/theme/N` ;
* `prefers-reduced-motion` → navigation instantanée, sans animation ;
* grille de 3 colonnes sur grand écran, **une colonne** sous 900 px.

---

## 🔮 Les trois orbes magiques (verre liquide + glitters)

| Orbe | Document | Ouverture |
|---|---|---|
| 📜 **jaune** | `assets/fiches-2am.pdf` | à la page `fiche.de` (parfois une plage `de → a`) |
| 📖 **bleu** | `assets/manuel-2am.pdf` | à la page `mp` (page PDF ; l'intitulé réel `mt` est rappelé) |
| 📔 **violet** | travaux dirigés du cahier | fenêtre du TD : 3 activités (uniquement sur les 7 séances de TD) |

Les trois zones cliquables sont **toujours centrées** sous le texte (`.console`), alignées
sur une ligne. Chaque orbe est un disque sombre cerclé d'un anneau coloré, surmonté d'un
reflet de **verre liquide** (`backdrop-filter: blur` + dégradé) : le décor du site transparaît
derrière la zone à l'image d'une goutte. Des **glitters** (54 paillettes dorées animées,
`.poussiere`) retombent entre les orbes — elles s'arrêtent avec `prefers-reduced-motion`.

Le lecteur intégré propose : page précédente / suivante (clavier ← et →), compteur
`Page X sur 109|154`, bouton « Aller à la p. X » quand une plage de fiches est connue,
et lien « Nouvel onglet ↗ ».

> **Correspondance des pages du manuel** : la page PDF = page imprimée + 1
> (le PDF du manuel comporte une page de couverture). Ex. printed p. 13 → PDF p. 14.

### ⚠️ Note importante sur les sources

Le site suit la **répartition annuelle 2026-2027** (objectifs, types de séances, dates,
évaluations). Certains textes cités par la répartition ne figurent pas dans le manuel
**ONPS 2018-2019** joint au dossier. L'orbe du manuel ouvre donc toujours la page qui
traite **le même thème**, et son intitulé réel est affiché (ex. « Les serins et le
chardonneret » pour la fable, « Yennayer et la vieille bergère » et « Aïn Bent El
Soltane de Mascara » pour la légende).

---

## ✍️ Les devoirs officiels par séquence

Chaque séquence (`#/sequence/N`) se termine par un bloc **« Les devoirs »** reprenant les
quatre rubriques de la **progression annuelle officielle ONPS 2AM** (projet, durée,
production écrite, devoir surveillé, oral, lecture) :

| Séq. | Projet | Sujet officiel de production écrite | Pages |
|---|---|---|---|
| 1 | Projet 1 — Dire et jouer un conte (12 sem. · 36 h) | Produire **le début d'un conte** | 23 |
| 2 | Projet 1 | Produire **la suite d'un conte** | 41 |
| 3 | Projet 1 | Produire **la fin d'un conte** | 58 |
| 4 | Projet 2 — Animer une fable (8 sem. · 24 h) | Produire **le dialogue d'une fable** | 79 |
| 5 | Projet 2 | Produire **une bande dessinée** | 97 |
| 6 | Projet 3 — Dire une légende (6 sem. · 18 h) | Raconter **un personnage légendaire** | 120 |
| 7 | Projet 3 | Décrire **un lieu de légende** | 138 |

Pour chaque séquence, quatre devoirs sont proposés :

1. **✍️ Production écrite** sur le sujet officiel (page du manuel indiquée) ;
2. **📝 Devoir surveillé** (consigne + barème, dans l'esprit des épreuves officielles) ;
3. **🎧 Préparation orale** avec support audio de la séance (consignes de lecture expressive) ;
4. **📚 Lecture à la maison** (texte du manuel, page indiquée).

---

## 📓 Le cahier journal auto-rempli (`#/cahier-journal`)

Une vue entièrement **générée côté navigateur** (`js/journal.js`, aucune donnée en dur)
qui remplit le cahier journal de l'enseignant à partir de l'**emploi du temps** décodé du
dossier (`emploi du temps/emploi.doc`) et des **séquences** de `js/data.js`.

### Ce qu'elle contient

* **En-tête** : année scolaire, classe choisie, professeur, volume horaire
  (4 séances/semaine = 3 classiques + 1 TD), fin de l'année (27 mai 2027, examens T3), période couverte.
* **Emploi du temps de la classe** : grille 7 créneaux × 5 jours, avec la légende
  (séance de la classe / séance d'une autre classe / créneau libre).
* **Progression par projets** : les 3 projets officiels, leur durée et leurs séquences.
* **Le tableau du cahier journal** : 6 colonnes — Séances · Thèmes et objectifs · Dates ·
  Horaires · Classes · Évaluations. 27 blocs « Semaine N — du dim. … au jeu. … », chacun
  avec ses 4 séances datées et horairées.

### Les dates : calculées, jamais écrites en dur

* Les trois périodes de vacances viennent de `SEMAINES` (`vacances: 'automne' | 'hiver' | 'printemps'`,
  période `du ≤ dim < au`) : automne **du 27 oct. au 2 nov. 2026** (reprise le **lundi 2 nov.**),
  hiver (17 déc. – 3 janv.), printemps (18 mars – 4 avr.).
* Chaque semaine scolaire reçoit son **dimanche de départ** : on parcourt les dimanches
  scolaires depuis le 1<sup>er</sup> septembre de l'année, en attribuant **du dernier au premier**
  et en préférant le mois de la répartition (avec garde-fou pour qu'il reste assez de
  dimanches pour les semaines précédentes).
* Avec les vacances d'automne et les libellés de mois ajustés (janvier 4, février 3,
  mars 3, avril 3, mai 4), les **27 semaines de cours et la semaine 0 de rentrée tombent
  exactement dans le mois de la répartition** (semaine 0 = dernière semaine de septembre :
  **évaluation et remédiation**, dim. 27 sept. 2026), du **dim. 27 sept. 2026** au
  **dim. 23 mai 2027** — toutes les dates restent **≤ 27 mai 2027**
  (fin de l'année : examens du 3<sup>e</sup> trimestre, 23-27 mai).
* La 4<sup>e</sup> semaine (dim. 25 oct.) est la dernière avant les vacances d'automne : ses
  séances du mardi au jeudi sont perturbées pour les classes concernées — le journal l'indique.

### Les créneaux : déduits de l'emploi du temps

L'**emploi du temps est modifiable directement dans l'application** — page `#/journal`,
section dépliable « ✏️ Modifier l'emploi du temps » : une liste déroulante par créneau
(classe, classe · TD ou *vide*) et les heures de début et de fin. La grille est mémorisée
dans le navigateur (bouton « Rétablir l'emploi du temps d'origine » pour revenir à la
version officielle) et le cahier journal se régénère aussitôt.

Chaque classe a **4 créneaux** (3 classiques + 1 TD) extraits de l'emploi du temps :

| Classe | Séances classiques | TD |
|---|---|---|
| **2AM5** | lun. 08:00 · lun. 09:00 · mer. 08:00 | mer. 10:00 |
| **2AM6** | dim. 08:00 · lun. 15:30 · jeu. 11:00 | dim. 09:00 |
| **2AM7** | dim. 15:30 · lun. 14:30 · mer. 13:30 | jeu. 09:00 |

Les séances sont rangées par type (`t`) de la répartition (oral → vocabulaire → lecture /
atelier d'écriture / évaluation → TD), chacune avec **son objectif**, son **support**
(manuel p. X, fiche N, cahier d'activités pour les TD, audio pour la préparation orale)
et son **évaluation** (devoir surveillé n° 1 à la sem. 7 et n° 2 à la sem. 16 ;
devoirs T3 aux sem. 23-24 ; composition des trois trimestres aux sem. 9, 18 et 27 ;
évaluation continue aux sem. 6 et 16 ; semaines d'examens officiels T1 / T2 / T3 aux
sem. 9, 18 et 27, puis révisions à la sem. 26). La 4<sup>e</sup> séance est
un **TD** chaque semaine, avec les jeux du cahier d'activités aux semaines
1, 4, 8, 12, 15, 20 et 23.

### Sorties

* **Imprimer** : `window.print()` — le document sort en A4 avec les couleurs neutralisées.
* **Télécharger (.doc)** : HTML « Word » (BOM UTF-8, `@page A4 landscape`, styles
  `mso`), ouvrable dans Word / LibreOffice. Nom :
  `Cahier-journal-2AM5-2026-2027.doc`. Le téléchargement est réalisé via une
  ancre `blob:` retirée **après** le démarrage de la sauvegarde (retrait immédiat
  ou révocation trop rapide de l'URL pouvant annuler le fichier), avec repli
  `msSaveBlob` (ancien Edge) et message de statut sous les boutons (succès ou
  erreur explicite).

L'état (classe, professeur) et l'**emploi du temps modifié** sont mémorisés dans
`localStorage` (clés `rme-cahier-journal` et `rme-emploi-temps`).

---

## 📔 Les 7 TD du cahier d'activités — 21 activités

Les exercices ne sont **pas inventés** : ce sont les blocs « Travaux dirigés » du
**cahier d'activités et de T.D — 2<sup>ème</sup> A.M.** (2023/2024), transcrits dans
`js/cahier.js` avec leurs titres, leurs consignes et leurs phrases d'appui.

| Séance | Sem. | Bloc du cahier | Activités reprises |
|---|---|---|---|
| Le Rallye des formules magiques | 1 | Les compléments circonstanciels (séq. 01) | Act. 01 · 02 · 03 |
| Le Domino des Connecteurs | 4 | La sorcière et ses trois enfants (séq. 02) | Act. 01 · 02 · 03 |
| L'Énigme du Mot de Clôture | 8 | Ali Baba et le haricot magique (séq. 03) | Act. 01 · 02 · 03 |
| Le Tabou des traits de caractère | 12 | Le Lion et le Renard (projet 2) | Act. 02 · 03 · 04 |
| Le Puzzle des Onomatopées | 15 | La bande dessinée (projet 2) | Act. 01 · 02 · 03 |
| Le Portrait-Robot du Héros | 20 | La légende de Lalla Kh'didja (projet 3) | Act. 01 · 02 · 03 |
| Le Grand Baccalauréat des Métamorphoses | 23 | Aïn Bent El Soltane de Mascara (projet 3) | Act. 01 · 02 · 03 |

### Le mécanisme (un seul, volontairement simple)

> 🖼 une illustration → ❓ une question → 🔘 trois réponses → ✅ la réponse **et** son explication.

* Bonne réponse : bouton vert + explication.
* Mauvaise réponse : bouton rouge, les trois boutons se verrouillent et la bonne réponse est montrée.
* `.exo-etapes` : trois pastilles pour revenir à n'importe quelle activité ;
  `← Précédente`, `Suivante →` (devenue `Bilan ✓` à la fin) et `↺ Recommencer`.
* `📖 Le texte du cahier` déplie le texte intégral de la séance **et** les autres activités
  du même TD (référence, non cliquables).

Accès : menu **Exercices**, ou troisième orbe (📔) de la séance de TD concernée.

---

## 🖼️ Les illustrations

`js/illustrations.js` contient **32 dessins SVG** (lac, bûcheron, chaumier, château, citrouille,
escalier de verre, couronne, renard jaloux, sanglier, moustique, héros, djebel, oasis, chenille,
papillon, graine, chêne, source, fontaine, sorcière, Ali Baba, vache, lion, planche de BD,
grenadier…) :

* aucun fichier image à charger — tout est du SVG inline, net sur tous les écrans ;
* une image par carte de TD + une image par activité ;
* `illus('chateau')` renvoie le dessin, `illus('inconnu')` retombe sur une image générique.

---

## 🎨 Choix techniques

* **Aucune dépendance** : pas de framework, pas de CDN obligatoire (Google Fonts avec
  repli `Palatino/Georgia` + `Segoe UI` si hors-ligne).
* **Navigation par ancre** (`#/…`) : compatible Netlify, GitHub Pages ou simple dossier,
  sans redirection serveur.
* **Décors SVG** : 3 scènes inline (forêt du Chaperon Rouge, Renard & Corbeau, l'Ogresse),
  permutées selon le thème via `#decors[data-decor]` (et prévisualisées au survol d'un royaume).
  Sur l'accueil, ils sont remplacés par la vidéo plein écran.
* **Écran vidéo** : `<video>` en fond fixe (`z-index:-3`), voile en dégradé, bouton Pause ;
  absent des autres pages, donc jamais téléchargé ailleurs.
* **Orbes centrés** : `.console` en `display:flex; justify-content:center` — les trois
  groupes (disque + anneau + libellé) tiennent sur une ligne, sans image de décor à caler.
* **Verre liquide** : `backdrop-filter: blur() saturate()` + dégradés sur les orbes —
  le décor transparaît derrière comme dans une goutte (repli `-webkit-`).
* **Glitters** : ~54 paillettes dorées (`.poussiere`, `@keyframes tombe`) générées par
  `glitters(n)` + un rideau léger (`rideauGlitter`) sur les séances ; coupés par
  `prefers-reduced-motion`.
* **Console d'orbes** : un seul composant (`.console`) réutilisé sur les 112 séances.
* **Lecteur PDF intégré** : `<iframe>` vers le PDF + barre d'outils maison ; aucun `window.open`,
  donc aucun blocage de pop-up.
* **Cahier journal** : `js/journal.js` (IIFE + `'use strict'`), aucune donnée de date en dur,
  export `.doc` en HTML Word avec BOM UTF-8.
* **Curseur bâton magique** : `cursor: url("data:image/svg+xml;…")` (variante « pointe
  chaude » sur les éléments cliquables).
* **Accessibilité** : navigation clavier, `aria-label` sur les orbes, piège de focus dans
  la modale, `prefers-reduced-motion` respecté, focus visible doré.

---

## ✏️ Modifier le contenu

Tout le contenu pédagogique est dans **`js/data.js`** :

```js
META      // niveau, année, volume, chemins des PDF
THEMES    // les 3 royaumes (nom, devise, description, décor, couleurs)
SEQUENCES // les 7 séquences (projet, durée, officiel[], devoirs[], pages, fiches…)
TYPES     // les 13 types de séance (icône, famille)
SEMAINES  // les 28 semaines : n (0 = rentrée), mois, theme, seq, seances[], vacances, note
CALENDRIER_OFFICIEL // les 3 trimestres : devoirs + examens avec périodes et semaines
JEUX      // les 7 TD : titre, séquence, semaine, thème, bloc du cahier, illustration
```

Une séquence porte maintenant **ses devoirs officiels** :

```js
{
  projet: 'Projet 1 — Dire et jouer un conte',
  duree:  '12 semaines · 36 h',
  officiel: [ { cle: 'production', libelle: 'Production écrite', detail: '…', page: 23 }, … ],
  devoirs: [
    { icone: '✍️', nature: 'Production écrite', badge: 'Sujet officiel',
      enonce: '…', consignes: ['…'], page: 23, officiel: true },
    … // devoir surveillé, préparation orale, lecture à la maison
  ]
}
```

Le contenu des exercices est dans **`js/cahier.js`** :

```js
td1..td7 = {
  titre:  'Les compléments circonstanciels',   // titre du bloc dans le cahier
  seq: 1, theme: 1,
  source: 'Travaux dirigés — Séquence 01…',   // référence exacte dans le cahier
  texte:  '…',                                 // texte intégral lu en classe (facultatif)
  activites: [ { n, illu, q, choix, r, note }, … ],   // 3 activités
  autres:  [ '…', … ]                          // autres activités du même TD (référence)
}
```

Format d'une activité :

```js
{
  n: 'Activité 01',
  illu: 'chaumier',                            // clé de illustrations.js
  q: 'Quel groupe indique la manière ? **gras** → <b>gras</b>',
  choix: ['dans une misérable cabane', 'depuis plusieurs années', 'pauvrement'],
  r: 2,                                        // index de la bonne réponse
  note: 'On encadre le complément de manière…' // explication affichée
}
```

`JEUX` relie une séance de TD à son bloc du cahier :

```js
rallye: {
  titre: 'Le Rallye des formules magiques', seq: 1, td: 1, theme: 1,
  cahier: 'td1',     // clé du bloc dans CAHIER
  illu: 'lacet'      // dessin de la carte
}
```

Pour **changer ou ajouter une illustration**, éditez `js/illustrations.js`
(chaque dessin est une chaîne SVG avec `viewBox="0 0 160 110"`).

Le cahier journal se règle dans **`js/journal.js`** : la grille `EMPLOI` (relevée du fichier
`emploi du temps/emploi.doc`), les dates et créneaux par classe, les règles d'évaluation
(`evaluationSeance`) et les libellés des séances (`typesSeance`).

Séance type :

```js
{ t: 'voc', obj: 'Objectif…', f: { de: 7, a: 8 }, m: 14, mp: 16,
  mt: 'Titre réel dans le manuel', jeu: 'rallye',
  capable: ['…'], criteres: ['…'] }
```

---

## ✅ Contrôles effectués

* 21 activités ouvertes et jouées : bonne réponse → `.ok` ; mauvaise → boutons verrouillés + bonne réponse révélée.
* `↺ Recommencer` remet le TD à zéro ; les pastilles d'étapes naviguent entre les 3 activités.
* Les 32 illustrations s'affichent (210 × 144 px, aucune vide).
* Accueil : la vidéo occupe tout l'écran, le décor SVG est masqué, les 3 royaumes
  sont en 3 colonnes alignées et centrées ; **aucun débordement horizontal** (15 routes).
* Bouton Pause : `paused` bascule, `aria-pressed` et le libellé suivent l'état.
* Sortie de l'accueil : la vidéo est mise en pause et masquée ; retour : elle repart.
* Orbes : toujours centrés (3 groupes alignés sur une ligne), effet `backdrop-filter` actif,
  54 glitters `.poussiere`, coupés avec `prefers-reduced-motion`.
* Séances sans TD : 2 orbes (fiche + manuel), légendes adaptées ; avec TD : 3 orbes.
* Orbe fiche → `fiches-2am.pdf?p=3#page=3&view=Fit` ; orbe jeu → « Le Rallye des formules
  magiques », 3 activités, 3 choix.
* Les 12 rubriques du guide et les **4 devoirs officiels** de chaque séquence (7 × 4 = 28).
* Cahier journal : 27 semaines datées du 4 oct. 2026 au 23 mai 2027 (max. = jeu. 27 mai 2027,
  **≤ 27 mai 2027**), 108 séances toutes datées et horairées, 4 créneaux par classe conformes
  à l'emploi du temps, séances coupées par une vacance signalées ; export `.doc` testé
  (BOM UTF-8, `@page A4 landscape`, `Cahier-journal-2AM5-2026-2027.doc`, téléchargement
  `blob:` robuste avec retrait différé).
* Calendrier officiel `#/calendrier` : les 3 trimestres affichent leurs périodes de devoirs et
  d'examens (T1 : 6-10 déc. · T2 : 2-8 mars · T3 : 23-27 mai) avec leurs semaines associées ;
  les notes des semaines 9, 18, 23, 26 et 27 correspondent aux échéances officielles.
* Les 15 routes balayées sans erreur console ; Lighthouse **Accessibilité 1,00 ·
  Bonnes pratiques 1,00 · SEO 1,00**, zéro audit en échec.

---

© *Le Royaume des Mots Enchantés* — parcours de français 2AM 2026-2027.
Aucune donnée n'est collectée : le site fonctionne entièrement hors-ligne.