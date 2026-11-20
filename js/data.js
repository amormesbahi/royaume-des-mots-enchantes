/* =========================================================================
   LE ROYAUME DES MOTS ENCHANTÉS — Données pédagogiques
   Sources : Répartition annuelle 2AM 2026-2027
             Fiches pédagogiques (109 p.)
             Manuel de français 2AM (154 p., ONPS 2018-2019)
             Progression annuelle officielle 2AM (ONPS) :
               Projet 1 « Dire et jouer un conte »  — 12 semaines / 36 h
               Projet 2 « Animer une fable »        —  8 semaines / 24 h
               Projet 3 « Dire une légende »        —  6 semaines / 18 h
   ========================================================================= */

const META = {
  niveau: '2ème Année Moyenne',
  code: '2AM',
  annee: '2026-2027',
  volume: '4 séances par semaine — 3 séances classiques + 1 séance de TD',
  finCours: '3 juin 2027',
  docs: {
    fiches: 'assets/fiches-2am.pdf',
    manuel: 'assets/manuel-2am.pdf'
  }
};

/* ---------------------------------------------------------------- THEMES */
const THEMES = [
  {
    id: 1, code: 'conte', nom: 'Le Merveilleux', genre: 'Le conte',
    devise: 'Entrer dans le monde du merveilleux',
    decor: 'chaperon',
    description:
      'Des fées, des ogres, des forêts et des actions magiques. ' +
      'On y découvre la situation initiale, les péripéties et le dénouement ' +
      'd’un conte, pour apprendre à raconter soi-même.',
    couleur: '#e0407a',
    couleur2: '#ff9ec4'
  },
  {
    id: 2, code: 'fable', nom: 'La Fable & la BD', genre: 'La fable et la bande dessinée',
    devise: 'Donner la parole aux animaux',
    decor: 'renard',
    description:
      'Les animaux parlent, se querellent, se conseillent. ' +
      'On écrit des dialogues, on ponctue, puis on transforme une fable ' +
      'en planche de bande dessinée.',
    couleur: '#ef7a2a',
    couleur2: '#ffc98a'
  },
  {
    id: 3, code: 'legende', nom: 'La Légende', genre: 'La légende',
    devise: 'Rapporter des faits et des lieux inoubliables',
    decor: 'ogresse',
    description:
      'Des héros, des sources, des oasis et desdjebels. ' +
      'La légende explique un fait ou un lieu extraordinaire : ' +
      'elle mêle une part de vrai et une part de magie.',
    couleur: '#8a5cd6',
    couleur2: '#c9a9f5'
  }
];

/* ------------------------------------------------------------- SEQUENCES
   `officiel` reprend, pour chaque séquence, les rubriques de la progression
   annuelle officielle (ONPS) avec la page du manuel 2AM correspondante.
   `devoirs` : quatre devoirs — le sujet officiel de production écrite, un
   devoir surveillé, la préparation orale et la lecture à la maison.        */
const SEQUENCES = [
  {
    id: 1, theme: 1, num: 1,
    titre: 'Entrer dans le monde du merveilleux',
    accent: 'La situation initiale',
    tache: 'Tâche 1 — Jouer un conte',
    projet: 'Projet 1 — Dire et jouer un conte',
    duree: '12 semaines · 36 h',
    ficheDiviseur: 2, ficheDebut: 3, ficheFin: 18,
    manuelDiviseur: 11,
    officiel: [
      { cle: 'écoute',   libelle: 'J’écoute et je comprends', detail: 'Support audio : « Le petit chaperon rouge »', page: 12 },
      { cle: 'lecture',  libelle: 'Je lis et je comprends',   detail: '« Un bûcheron honnête »', page: 13 },
      { cle: 'vocabulaire', libelle: 'Vocabulaire',          detail: 'Les formules d’ouverture du conte', page: 15 },
      { cle: 'grammaire', libelle: 'Grammaire',              detail: 'Les compléments circonstanciels : temps, lieu, manière', page: 17 },
      { cle: 'conjugaison', libelle: 'Conjugaison',           detail: 'L’imparfait de l’indicatif', page: 19 },
      { cle: 'lecture',  libelle: 'Je lis et je comprends (2)', detail: '« Le petit garçon et la sorcière »', page: 24 }
    ],
    devoirs: [
      {
        icone: '✍️', nature: 'Production écrite', badge: 'Sujet officiel',
        sujet: 'Produire le début d’un conte',
        enonce: 'Écris le début d’un conte : présente le héros, le lieu et le moment. ' +
                'Ton texte doit contenir au moins huit lignes.',
        page: 23, officiel: true
      },
      {
        icone: '📋', nature: 'Devoir surveillé',
        sujet: '« L’avare et le puits »',
        enonce: 'Un homme riche mais avare vit seul dans un village. Un jour, il tombe dans ' +
                'un puits et appelle à l’aide. Son voisin lui propose son aide, mais l’avare refuse.',
        page: 29
      },
      {
        icone: '🗣️', nature: 'Préparation à l’oral',
        sujet: 'Raconter la situation initiale',
        enonce: 'Choisis un conte que tu connais et raconte sa situation initiale en une minute. ' +
                'Appuie-toi sur le support audio « Le petit chaperon rouge ».',
        page: 12
      },
      {
        icone: '📚', nature: 'Lecture à la maison',
        sujet: '« Un bûcheron honnête » et « Le petit garçon et la sorcière »',
        enonce: 'Lis les deux textes, puis relève trois adjectifs qualificatifs qui décrivent ' +
                'le héros et explique ce qu’ils apprennent sur lui.',
        page: 13
      }
    ]
  },
  {
    id: 2, theme: 1, num: 2,
    titre: 'Tout à coup…',
    accent: 'Les péripéties',
    tache: 'Tâche 1 — Jouer un conte',
    projet: 'Projet 1 — Dire et jouer un conte',
    duree: '12 semaines · 36 h',
    ficheDiviseur: 19, ficheDebut: 20, ficheFin: 35,
    manuelDiviseur: 28,
    officiel: [
      { cle: 'écoute',   libelle: 'J’écoute et je comprends', detail: 'Support audio : « La fille du pêcheur »', page: 28 },
      { cle: 'lecture',  libelle: 'Je lis et je comprends',   detail: '« Un homme malhonnête »', page: 29 },
      { cle: 'grammaire', libelle: 'Grammaire',              detail: 'Les articulateurs chronologiques', page: 31 },
      { cle: 'vocabulaire', libelle: 'Vocabulaire',          detail: 'Le vocabulaire du merveilleux', page: 32 },
      { cle: 'conjugaison', libelle: 'Conjugaison',           detail: 'Le passé simple', page: 36 },
      { cle: 'lecture',  libelle: 'Je lis et je comprends (2)', detail: '« Les deux sœurs et les fées »', page: 42 }
    ],
    devoirs: [
      {
        icone: '✍️', nature: 'Production écrite', badge: 'Sujet officiel',
        sujet: 'Produire la suite d’un conte',
        enonce: 'Reprends le début d’un conte que tu as écrit et raconte les péripéties. ' +
                'Emploie au moins cinq articulateurs chronologiques.',
        page: 41, officiel: true
      },
      {
        icone: '📋', nature: 'Devoir surveillé',
        sujet: '« Les deux sœurs et les fées »',
        enonce: 'Compréhension de l’écrit, vocabulaire du merveilleux, puis production écrite : ' +
                'raconte la fin de l’histoire des deux sœurs.',
        page: 42
      },
      {
        icone: '🗣️', nature: 'Préparation à l’oral',
        sujet: 'Raconter les péripéties',
        enonce: 'Raconte à l’oral les péripéties d’un conte de ton choix. ' +
                'Appuie-toi sur le support audio « La fille du pêcheur ».',
        page: 28
      },
      {
        icone: '📚', nature: 'Lecture à la maison',
        sujet: '« Un homme malhonnête »',
        enonce: 'Lis le texte, puis explique la péripétie principale et relève le vocabulaire ' +
                'du merveilleux qui y apparaît.',
        page: 29
      }
    ]
  },
  {
    id: 3, theme: 1, num: 3,
    titre: 'C’est ainsi que…',
    accent: 'La situation finale',
    tache: 'Tâche 1 — Jouer un conte',
    projet: 'Projet 1 — Dire et jouer un conte',
    duree: '12 semaines · 36 h',
    ficheDiviseur: 36, ficheDebut: 37, ficheFin: 50,
    manuelDiviseur: 45,
    officiel: [
      { cle: 'écoute',   libelle: 'J’écoute et je comprends', detail: 'Support audio : « Le pêcheur et sa femme »', page: 46 },
      { cle: 'lecture',  libelle: 'Je lis et je comprends',   detail: '« Loundja, la fille du roi »', page: 47 },
      { cle: 'vocabulaire', libelle: 'Vocabulaire',          detail: 'Les formules de clôture du conte', page: 49 },
      { cle: 'grammaire', libelle: 'Grammaire',              detail: 'Les substituts lexicaux et grammaticaux', page: 50 },
      { cle: 'lecture',  libelle: 'Je lis et je comprends (2)', detail: '« Le renard et le lion »', page: 60 },
      { cle: 'evaluation', libelle: 'Évaluation bilan',      detail: 'Bilan du projet 1', page: 62 }
    ],
    devoirs: [
      {
        icone: '✍️', nature: 'Production écrite', badge: 'Sujet officiel',
        sujet: 'Produire la fin d’un conte',
        enonce: 'Termine le conte que tu as écrit : résous le problème et termine par une ' +
                'formule de clôture.',
        page: 58, officiel: true
      },
      {
        icone: '📋', nature: 'Devoir surveillé',
        sujet: '« Loundja, la fille du roi »',
        enonce: 'Compréhension de l’écrit et vocabulaire des formules de clôture, ' +
                'puis décris la situation finale de l’histoire.',
        page: 47
      },
      {
        icone: '🗣️', nature: 'Préparation à l’oral',
        sujet: 'Raconter la situation finale',
        enonce: 'Raconte à l’oral comment se termine un conte de ton choix. ' +
                'Appuie-toi sur le support audio « Le pêcheur et sa femme ».',
        page: 46
      },
      {
        icone: '📚', nature: 'Lecture à la maison',
        sujet: '« Le renard et le lion »',
        enonce: 'Lis le texte, puis relève les substituts lexicaux et grammaticaux ' +
                'utilisés pour éviter les répétitions.',
        page: 60
      }
    ]
  },
  {
    id: 4, theme: 2, num: 4,
    titre: 'Donner la parole aux animaux',
    accent: 'Animer une fable',
    tache: 'Tâche 2 — Animer une fable',
    projet: 'Projet 2 — Animer une fable',
    duree: '8 semaines · 24 h',
    ficheDiviseur: 51, ficheDebut: 52, ficheFin: 67,
    manuelDiviseur: 65,
    officiel: [
      { cle: 'orale',    libelle: 'Je m’exprime',           detail: 'Production orale', page: 66 },
      { cle: 'lecture',  libelle: 'Je lis et je comprends',  detail: '« Les serins et le chardonneret »', page: 67 },
      { cle: 'vocabulaire', libelle: 'Vocabulaire',          detail: 'Les verbes introducteurs de paroles', page: 69 },
      { cle: 'conjugaison', libelle: 'Conjugaison',           detail: 'Le présent de l’indicatif', page: 73 },
      { cle: 'orthographe', libelle: 'Orthographe',          detail: 'Les adverbes de manière', page: 75 },
      { cle: 'lecture',  libelle: 'Je lis et je comprends (2)', detail: '« Le perroquet »', page: 80 }
    ],
    devoirs: [
      {
        icone: '✍️', nature: 'Production écrite', badge: 'Sujet officiel',
        sujet: 'Produire un dialogue à partir d’une fable',
        enonce: 'Transforme la fable « Le perroquet » en dialogue. Emploie quatre verbes ' +
                'introducteurs de paroles et deux adverbes de manière.',
        page: 79, officiel: true
      },
      {
        icone: '📋', nature: 'Devoir surveillé',
        sujet: '« Le Renard et le Coq » — Jean de La Fontaine',
        enonce: 'Composition officielle 2AM : compréhension de la fable, vocabulaire, ' +
                'puis expression écrite autour de la morale.',
        page: 67
      },
      {
        icone: '🗣️', nature: 'Préparation à l’oral',
        sujet: 'Dire la morale d’une fable',
        enonce: 'Choisis une fable et dis sa morale à l’oral, en une minute, ' +
                'en expliquant d’abord ce qu’il arrive aux animaux.',
        page: 66
      },
      {
        icone: '📚', nature: 'Lecture à la maison',
        sujet: '« Les serins et le chardonneret »',
        enonce: 'Lis le texte, puis relève tous les verbes introducteurs de paroles ' +
                'et les adverbes de manière.',
        page: 67
      }
    ]
  },
  {
    id: 5, theme: 2, num: 5,
    titre: 'Insérer un dialogue dans une BD',
    accent: 'À vos bulles !',
    tache: 'Tâche 2 — Animer une fable',
    projet: 'Projet 2 — Animer une fable',
    duree: '8 semaines · 24 h',
    ficheDiviseur: 68, ficheDebut: 69, ficheFin: 83,
    manuelDiviseur: 83,
    officiel: [
      { cle: 'orale',    libelle: 'Je m’exprime',           detail: 'Production orale', page: 84 },
      { cle: 'lecture',  libelle: 'Je lis et je comprends',  detail: '« La guenon, le singe et la noix »', page: 85 },
      { cle: 'vocabulaire', libelle: 'Vocabulaire',          detail: 'Le vocabulaire de la bande dessinée', page: 87 },
      { cle: 'grammaire', libelle: 'Grammaire',              detail: 'Les types de phrases', page: 90 },
      { cle: 'conjugaison', libelle: 'Conjugaison',           detail: 'Le futur simple', page: 92 },
      { cle: 'lecture',  libelle: 'Je lis et je comprends (2)', detail: '« Le maître et le scorpion »', page: 99 }
    ],
    devoirs: [
      {
        icone: '✍️', nature: 'Production écrite', badge: 'Sujet officiel',
        sujet: 'Réaliser une bande dessinée',
        enonce: 'Dessine trois cases d’une bande dessinée d’après la fable « La guenon, ' +
                'le singe et la noix ». Rédige les bulles et les cartouches.',
        page: 97, officiel: true
      },
      {
        icone: '📋', nature: 'Devoir surveillé',
        sujet: '« Le maître et le scorpion »',
        enonce: 'Compréhension de l’écrit, vocabulaire de la BD, puis transforme ' +
                'l’épisode le plus drôle en trois cases.',
        page: 99
      },
      {
        icone: '🗣️', nature: 'Préparation à l’oral',
        sujet: 'Raconter la fable en images',
        enonce: 'Raconte à l’oral la fable « Le Corbeau et le Renard », puis explique ' +
                'en trois phrases comment tu la découperais en cases.',
        page: 84
      },
      {
        icone: '📚', nature: 'Lecture à la maison',
        sujet: 'Le vocabulaire de la bande dessinée',
        enonce: 'Note le vocabulaire de la BD (onomatopées, cartouches, bulles, ' +
                'récitatif) puis construis une phrase pour chaque terme.',
        page: 87
      }
    ]
  },
  {
    id: 6, theme: 3, num: 6,
    titre: 'La légende d’un personnage héroïque',
    accent: 'Personnes et faits extraordinaires',
    tache: 'Tâche 3 — Dire une légende',
    projet: 'Projet 3 — Dire une légende',
    duree: '6 semaines · 18 h',
    ficheDiviseur: 84, ficheDebut: 85, ficheFin: 98,
    manuelDiviseur: 103,
    officiel: [
      { cle: 'orale',    libelle: 'Je m’exprime',           detail: 'Production orale', page: 104 },
      { cle: 'lecture',  libelle: 'Je lis et je comprends',  detail: '« Yennayer et la vieille bergère »', page: 105 },
      { cle: 'vocabulaire', libelle: 'Vocabulaire',          detail: 'La nominalisation à base verbale : -ation, -age, -ment', page: 107 },
      { cle: 'grammaire', libelle: 'Grammaire',              detail: 'La proposition subordonnée relative « qui »', page: 110 },
      { cle: 'conjugaison', libelle: 'Conjugaison',           detail: 'Le passé composé', page: 113 }
    ],
    devoirs: [
      {
        icone: '✍️', nature: 'Production écrite', badge: 'Sujet officiel',
        sujet: 'Décrire un personnage légendaire',
        enonce: 'Décris un personnage légendaire que tu connais (Kheireddine, ' +
                'Yennayer, Casse-Noisette…) : ses qualities, ses actions, sa renommée. ' +
                'Emploie deux subordonnées relatives « qui ».',
        page: 120, officiel: true
      },
      {
        icone: '📋', nature: 'Devoir surveillé',
        sujet: '« Yennayer et la vieille bergère »',
        enonce: 'Compréhension de l’écrit et nominalisation, puis décris ' +
                'le personnage principal en huit lignes.',
        page: 105
      },
      {
        icone: '🗣️', nature: 'Préparation à l’oral',
        sujet: 'Présenter un personnage de légende',
        enonce: 'Présente à l’oral un personnage de légende de ton pays. ' +
                'Appuie-toi sur le support audio « Taourirt la protégée ».',
        page: 104
      },
      {
        icone: '📚', nature: 'Lecture à la maison',
        sujet: 'Les substantifs en -ation, -age, -ment',
        enonce: 'Transforme huit verbes en substantifs (protéger → protection, ' +
                'nager → nage…) et construis une phrase pour chacun.',
        page: 107
      }
    ]
  },
  {
    id: 7, theme: 3, num: 7,
    titre: 'La légende d’un lieu ou d’une plante',
    accent: 'Faits et lieux inoubliables',
    tache: 'Tâche 3 — Dire une légende',
    projet: 'Projet 3 — Dire une légende',
    duree: '6 semaines · 18 h',
    ficheDiviseur: 99, ficheDebut: 100, ficheFin: 109,
    manuelDiviseur: 124,
    officiel: [
      { cle: 'orale',    libelle: 'Je m’exprime',           detail: 'Production orale', page: 125 },
      { cle: 'lecture',  libelle: 'Je lis et je comprends',  detail: '« Aïn Bent El Soltane de Mascara »', page: 126 },
      { cle: 'vocabulaire', libelle: 'Vocabulaire',          detail: 'Les indicateurs de lieu', page: 128 },
      { cle: 'grammaire', libelle: 'Grammaire',              detail: 'La proposition subordonnée relative « où »', page: 130 },
      { cle: 'conjugaison', libelle: 'Conjugaison',           detail: 'Le plus-que-parfait', page: 132 },
      { cle: 'evaluation', libelle: 'Évaluation bilan',      detail: 'Bilan du projet 3', page: 142 }
    ],
    devoirs: [
      {
        icone: '✍️', nature: 'Production écrite', badge: 'Sujet officiel',
        sujet: 'Décrire un lieu de légende',
        enonce: 'Décris un lieu de légende de ta région : sa situation, son aspect, ' +
                'ce qu’on raconte sur lui. Emploie des indicateurs de lieu et ' +
                'deux relatives « où ».',
        page: 138, officiel: true
      },
      {
        icone: '📋', nature: 'Devoir surveillé',
        sujet: '« Aïn Bent El Soltane de Mascara »',
        enonce: 'Compréhension de l’écrit, indicateurs de lieu, puis rédige ' +
                'la description d’un autre site légendaire de ton choix.',
        page: 126
      },
      {
        icone: '🗣️', nature: 'Préparation à l’oral',
        sujet: 'Décrire un lieu de légende',
        enonce: 'Décris à l’oral un lieu de légende que tu connais, en une minute. ' +
                'Appuie-toi sur le support audio « Le Sahara ».',
        page: 125
      },
      {
        icone: '📚', nature: 'Lecture à la maison',
        sujet: 'Le plus-que-parfait et les relatifs « où »',
        enonce: 'Transforme six phrases au plus-que-parfait, puis relie quatre ' +
                'données de lieu avec le relatif « où ».',
        page: 132
      }
    ]
  }
];

/* ------------------------------------------------------- TYPES DE SEANCE */
const TYPES = {
  oral:  { label: 'Oral',                       icon: '👂', famille: 'comprehension' },
  comp1: { label: 'Compréhension écrite 1',      icon: '📖', famille: 'comprehension' },
  comp2: { label: 'Compréhension écrite 2',      icon: '📚', famille: 'comprehension' },
  voc:   { label: 'Vocabulaire',                icon: '🔤', famille: 'langue' },
  gram:  { label: 'Grammaire',                  icon: '🧩', famille: 'langue' },
  conj:  { label: 'Conjugaison',                icon: '🔁', famille: 'langue' },
  prep:  { label: 'Préparation à l’écriture',    icon: '📝', famille: 'production' },
  pe:    { label: 'Production écrite',          icon: '🪶', famille: 'production' },
  eval:  { label: 'Évaluation & remédiation',   icon: '🔎', famille: 'evaluation' },
  td:    { label: 'TD — Activité',              icon: '🎲', famille: 'td' },
  rev:   { label: 'Révisions',                  icon: '🔄', famille: 'evaluation' },
  ds:    { label: 'Devoir surveillé',           icon: '📋', famille: 'evaluation' },
  compo: { label: 'Composition',                icon: '🏅', famille: 'evaluation' },
  bilan: { label: 'Bilan pédagogique',          icon: '🎓', famille: 'evaluation' }
};

/* ---------------------------------------------------------------- SEMAINES
   t    : type de séance (clé de TYPES)
   obj  : objectif (Répartition annuelle)
   f    : pages du PDF « assets/fiches-2am.pdf »   (null = pas de fiche dédiée)
   m    : page imprimée citée par la répartition
   mp   : page PDF correspondante dans « assets/manuel-2am.pdf »
   mt   : intitulé réel de cette page dans le manuel ONPS 2018-2019
   jeu  : identifiant du jeu lexical interactif (TD de semaine A)
   -------------------------------------------------------------------- */
const SEMAINES = [
  {
    n: 0, mois: 'Octobre', theme: null, seq: 0, du: '4 oct. 2026',
    note: 'Évaluation diagnostique',
    seances: [
      { t: 'eval', obj: 'Évaluation diagnostique : test de positionnement global (lecture / écrit).',
      f: null, m: null, mp: null, mt: 'Évaluation de la rentrée scolaire',
      capable: ['Se situer à l’oral comme à l’écrit.'] },
      { t: 'eval', obj: 'Évaluation diagnostique : vérification des prérequis syntaxiques et lexicaux.',
      f: null, m: null, mp: null, mt: 'Prise de parole en continu',
      capable: ['S’exprimer oralement avec aisance.'] },
      { t: 'rev', obj: 'Remédiation ciblée et mise à niveau des outils de base.',
      f: null, m: null, mp: null, mt: 'Consolidation des acquis',
      capable: ['Reprendre les points non maîtrisés.'] },
      { t: 'td', obj: 'TD 1 (Ludique) : jeu de présentation et brise-glace lexical.', libre: false, f: null, m: null, mp: null,
      capable: ['Se présenter, écouter les autres et mémoriser du lexique.'] },
    ]
  },
  {
    n: 1, mois: 'Octobre', theme: 1, seq: 1, du: '11 oct. 2026',
    seances: [
      { t: 'oral', obj: 'Séance 1 : moment d’accroche + compréhension et production orales (p. 10-11).',
      f: { de: 3, a: 3 }, m: 10, mp: 12, mt: 'Nous écoutons pour comprendre l’histoire',
      capable: ['Écouter et comprendre une histoire.',
      'Repérer le cadre et les personnages d’un début de conte.'] },
      { t: 'comp1', obj: 'Compréhension de l’écrit 01 : découverte du texte support (p. 12-13).',
      f: { de: 4, a: 4 }, m: 12, mp: 13, mt: 'Nous regardons les images — « Que ton chemin disparaisse ! »',
      capable: ['Observer un support iconique.',
      'Comprendre oralement la situation initiale d’un conte.'] },
      { t: 'voc', obj: 'Vocabulaire : les formules d’ouverture du conte (p. 14).',
      f: { de: 7, a: 8 }, m: 14, mp: 16, mt: 'Les formules d’ouverture du conte',
      capable: ['Reconnaître la formule d’ouverture d’un conte.',
      'Employer « Il était une fois », « Il y a longtemps », « Autrefois »…'] },
    ]
  },
  {
    n: 2, mois: 'Octobre', theme: 1, seq: 1, du: '18 oct. 2026',
    seances: [
      { t: 'gram', obj: 'Grammaire : les compléments circonstanciels (CC temps / lieu / manière) (p. 16-17).',
      f: { de: 9, a: 10 }, m: 16, mp: 18, mt: 'Les compléments circonstanciels',
      capable: ['Identifier les compléments circonstanciels (CCT, CCL, CCM).',
      'Les employer correctement.'] },
      { t: 'conj', obj: 'Conjugaison : l’imparfait de l’indicatif (p. 18-19).',
      f: { de: 11, a: 12 }, m: 18, mp: 20, mt: 'L’imparfait de l’indicatif',
      capable: ['Identifier les terminaisons de l’imparfait.',
      'Conjuguer des verbes à l’imparfait de l’indicatif.'] },
      { t: 'prep', obj: 'Préparation à l’écrit : structurer le début d’un récit (p. 20).',
      f: { de: 13, a: 14 }, m: 20, mp: 23, mt: 'Nous écrivons le début d’une histoire',
      capable: ['Construire un début de conte.',
      'Repérer le début, la suite et la fin d’une histoire.'] },
      { t: 'td', obj: 'TD 2 (Vocabulaire) : mots croisés sur les formules d’ouverture et personnages du conte.', libre: false, f: { de: 3, a: 3 },
      m: null, mp: 16, mt: 'Les formules d’ouverture du conte', jeu: 'rallye',
      capable: ['Associer chaque formule d’ouverture à la situation initiale correspondante.'] },
    ]
  },
  {
    n: 3, mois: 'Octobre', theme: 1, seq: 1, du: '25 oct. 2026',
    seances: [
      { t: 'pe', obj: 'Production écrite : rédiger la situation initiale d’un conte (p. 21).',
      f: { de: 15, a: 16 }, m: 21, mp: 25, mt: '« Le petit garçon et la sorcière »',
      capable: ['Rédiger la situation initiale d’un conte de façon autonome.'],
      criteres: ['Préciser le moment et le lieu où se déroule le conte.',
      'Indiquer les personnages du conte.',
      'Conjuguer les verbes à l’imparfait.'] },
      { t: 'comp2', obj: 'Compréhension de l’écrit 02 : lecture autonome d’intégration des acquis (p. 15).',
      f: { de: 5, a: 6 }, m: 15, mp: 14, mt: '« Un bûcheron honnête » (Natha Caputo)',
      capable: ['Repérer le cadre spatio-temporel.',
      'Émettre des hypothèses de sens avant et après lecture.'] },
    ]
  },
  { vacances: true, nom: 'Vacances d’automne', du: '27 oct. 2026', au: '2 nov. 2026', apres: 3 },
  {
    n: 4, mois: 'Novembre', theme: 1, seq: 2, du: '1 nov. 2026',
    seances: [
      { t: 'eval', obj: 'Séance 9 (Séq. 01) : compte-rendu de la production écrite + auto-évaluation et remédiation.',
      f: { de: 17, a: 17 }, m: null, mp: 62, mt: '« Maintenant, je peux » — synthèse',
      capable: ['Repérer ses erreurs.',
      'Corriger et améliorer sa production écrite.'] },
      { t: 'oral', obj: 'Séance 1 (Séq. 02) : moment d’accroche + compréhension et production orales (p. 28-29).',
      f: { de: 20, a: 20 }, m: 28, mp: 28, mt: 'Nous écoutons pour comprendre l’histoire — « Cendrillon »',
      capable: ['Écouter et comprendre une histoire.',
      'Repérer la suite des événements.'] },
      { t: 'comp1', obj: 'Compréhension de l’écrit 01 : repérer les actions du récit (p. 30-31).',
      f: { de: 21, a: 21 }, m: 30, mp: 30, mt: '« Un homme malhonnête » (suite de « Un bûcheron honnête »)',
      capable: ['Comprendre oralement un support iconique.',
      'Analyser les actions du héros.'] },
      { t: 'td', obj: 'TD 3 (Vocabulaire) : chasse à l’intrus et devinettes autour du lexique du merveilleux.', libre: false, f: null, jeu: 'domino',
      m: 32, mp: 32, mt: 'Les expressions qui indiquent la suite du conte',
      capable: ['Relier chaque connecteur chronologique à la péripétie correspondante.'] },
    ]
  },
  {
    n: 5, mois: 'Novembre', theme: 1, seq: 2, du: '8 nov. 2026',
    seances: [
      { t: 'voc', obj: 'Vocabulaire : le vocabulaire du merveilleux et indicateurs chronologiques (p. 32-33).',
      f: { de: 24, a: 25 }, m: 32, mp: 32, mt: 'Les expressions qui indiquent la suite du conte',
      capable: ['Identifier et employer le vocabulaire du merveilleux.',
      'Employer les connecteurs de rupture : « Tout à coup », « Soudain »…'] },
      { t: 'gram', obj: 'Grammaire : les qualifiants (adjectif qualificatif et complément du nom) (p. 34-35).',
      f: { de: 26, a: 27 }, m: 34, mp: 35, mt: 'Les adjectifs qualificatifs et les compléments du nom',
      capable: ['Identifier l’adjectif qualificatif.',
      'Distinguer l’épithète du complément du nom.'] },
      { t: 'ds', obj: 'Devoir surveillé n° 1 (période réglementaire des devoirs du 1er trimestre).',
      f: null, m: null, mp: 63, mt: '« Mon test » — Projet 1',
      evaluation: 'Devoir surveillé n° 1' },
    ]
  },
  {
    n: 6, mois: 'Novembre', theme: 1, seq: 2, du: '15 nov. 2026',
    seances: [
      { t: 'eval', obj: 'Compte-rendu du devoir surveillé n° 1 et remédiation ciblée.',
      f: null, m: null, mp: 64, mt: 'Cahier de textes — complements circonstanciels' },
      { t: 'conj', obj: 'Conjugaison : le passé simple (1er et 2ème groupes + verbes usuels) (p. 36-37).',
      f: { de: 28, a: 29 }, m: 36, mp: 37, mt: 'Le passé simple — verbes des 1er et 2e groupes',
      capable: ['Identifier les terminaisons du passé simple.',
      'Conjuguer des verbes des 1er et 2e groupes au passé simple.'] },
      { t: 'prep', obj: 'Préparation à l’écrit : élaboration de la suite des événements (p. 38).',
      f: null, m: 38, mp: 42, mt: 'Le début de l’histoire — repérage des étapes',
      capable: ['Repérer le début, la suite et la fin d’une histoire.'] },
      { t: 'td', obj: 'TD 4 (Orthographe) : défi d’équipe sur les accords des adjectifs qualificatifs.', libre: false, f: null, m: null, mp: null,
      capable: ['Accorder correctement l’adjectif qualificatif avec le nom.'] },
    ]
  },
  {
    n: 7, mois: 'Novembre', theme: 1, seq: 2, du: '22 nov. 2026',
    seances: [
      { t: 'pe', obj: 'Production écrite : rédiger les péripéties en cohérence avec le début (p. 39).',
      f: { de: 32, a: 33 }, m: 39, mp: 43, mt: '« Les deux sœurs et les fées » — production de la suite',
      capable: ['Produire la suite d’une histoire.'],
      criteres: ['Respecter la chronologie des événements.',
      'Employer les connecteurs de rupture.'] },
      { t: 'comp2', obj: 'Compréhension de l’écrit 02 : analyse et mobilisation des ressources textuelles (p. 40).',
      f: { de: 30, a: 31 }, m: 40, mp: 43, mt: '« Les deux sœurs et les fées » (Perrault)',
      capable: ['Analyser un texte narratif.',
      'Rechercher la structure du conte.'] },
      { t: 'eval', obj: 'Séance 9 : compte-rendu de la production écrite + séance d’auto-correction guidée.',
      f: { de: 34, a: 34 }, m: null, mp: 62, mt: '« Maintenant, je peux » — synthèse',
      capable: ['Repérer ses erreurs.',
      'Corriger et améliorer sa production écrite.'] },
    ]
  },
  {
    n: 8, mois: 'Novembre', theme: 1, seq: 3, du: '29 nov. 2026',
    seances: [
      { t: 'oral', obj: 'Séance 1 : moment d’accroche + compréhension et production orales (p. 46-47).',
      f: { de: 37, a: 37 }, m: 46, mp: 46, mt: 'Nous écoutons pour comprendre l’histoire — « Le chaudron magique »',
      capable: ['Écouter et comprendre une histoire.',
      'Repérer la fin des événements.'] },
      { t: 'comp1', obj: 'Compréhension de l’écrit 01 : le dénouement du conte (p. 48-49).',
      f: { de: 38, a: 38 }, m: 48, mp: 47, mt: 'Nous regardons les images — la situation finale',
      capable: ['Comprendre oralement un support iconique.',
      'Découvrir la situation finale du conte.'] },
      { t: 'voc', obj: 'Vocabulaire : les formules de clôture du conte (p. 50) + révisions T1.',
      f: null, m: 50, mp: 50, mt: 'Les expressions qui indiquent la fin d’une histoire',
      capable: ['Reconnaître la formule de clôture d’un conte.',
      'Employer « C’est ainsi que », « Depuis ce jour »…'] },
      { t: 'td', obj: 'TD 5 (Vocabulaire) : méli-mélo ludique des formules de clôture et substituts.', libre: false, f: null, jeu: 'enigme',
      m: 50, mp: 50, mt: 'Les expressions qui indiquent la fin d’une histoire',
      capable: ['Reconnaître la formule de clôture à partir d’indices.'] },
    ]
  },
  {
    n: 9, mois: 'Décembre', theme: 1, seq: 3, du: '6 déc. 2026',
    note: 'COMPOSITIONS T1 - 06-10 déc.',
    seances: [
      { t: 'compo', obj: 'Composition du trimestre 1.', f: null, m: null,
      mp: 63, mt: '« Mon test » — Projet 1', evaluation: 'Composition — Trimestre 1' },
      { t: 'compo', obj: 'Composition du trimestre 1.', f: null, m: null,
      mp: 63, mt: '« Mon test » — Projet 1', evaluation: 'Composition — Trimestre 1' },
      { t: 'compo', obj: 'Composition du trimestre 1.', f: null, m: null,
      mp: 63, mt: '« Mon test » — Projet 1', evaluation: 'Composition — Trimestre 1' },
    ]
  },
  {
    n: 10, mois: 'Décembre', theme: 1, seq: 3, du: '13 déc. 2026',
    seances: [
      { t: 'eval', obj: 'Correction collective de la composition du 1er trimestre + remise des copies.', libre: false, f: null,
      m: null, mp: 63, mt: '« Mon test » — corrigé',
      capable: ['Faire le bilan du premier trimestre.'] },
      { t: 'eval', obj: 'Séance de régulation et remédiation individualisée post-composition.',
      f: null, m: null, mp: 64, mt: 'Cahier de textes — complements circonstanciels' },
      { t: 'bilan', obj: 'Bilan ludique du thème 1 - départ en vacances d’hiver (jeudi 17 déc. au soir).',
      f: null, m: null, mp: 60, mt: '« Mon projet » — Jouer l’histoire le jour de la fête' },
      { t: 'td', obj: 'TD 6 (Orthographe) : dictée négociée et quiz sur les homophones grammaticaux.', libre: false, f: null, m: null, mp: null,
      capable: ['Écrire sans erreur les homophones grammaticaux fréquents.'] },
    ]
  },
  { vacances: true, nom: 'Vacances d’hiver', du: '17 déc. 2026', au: '3 janv. 2027', apres: 10 },
  {
    n: 11, mois: 'Janvier', theme: 1, seq: 3, du: '3 janv. 2027',
    seances: [
      { t: 'gram', obj: 'Grammaire : les substituts lexicaux et grammaticaux (p. 52-53).',
      f: { de: 41, a: 42 }, m: 52, mp: 51, mt: 'Les substituts lexicaux et grammaticaux',
      capable: ['Identifier les substituts lexicaux et grammaticaux.',
      'Employer les pronoms pour éviter la répétition.'] },
      { t: 'conj', obj: 'Conjugaison : le passé simple des verbes irréguliers du 3ème groupe (p. 54-55).',
      f: { de: 43, a: 44 }, m: 54, mp: 55, mt: 'Le passé simple — 3e groupe + « être » et « avoir »',
      capable: ['Identifier le passé simple des verbes du 3e groupe.',
      'Conjuguer avec les auxiliaires « être » et « avoir ».'] },
      { t: 'prep', obj: 'Préparation à l’écrit : planifier le dénouement logique du récit (p. 56).',
      f: { de: 45, a: 46 }, m: 56, mp: 57, mt: '« Hansel et Gretel » — entraînement à l’écriture de la fin',
      capable: ['Repérer le début et la fin d’une histoire.',
      'Choisir une fin parmi quatre propositions.'] },
    ]
  },
  {
    n: 12, mois: 'Janvier', theme: 1, seq: 3, du: '10 janv. 2027',
    seances: [
      { t: 'pe', obj: 'Production écrite : rédiger la situation finale d’un conte (p. 57).',
      f: { de: 47, a: 48 }, m: 57, mp: 59, mt: 'Nous écrivons la fin de l’histoire',
      capable: ['Produire la fin d’un conte.'],
      criteres: ['Employer la formule de clôture.',
      'Respecter la cohérence du récit.'] },
      { t: 'comp2', obj: 'Compréhension de l’écrit 02 : lecture de réinvestissement autonome (p. 51).',
      f: { de: 39, a: 40 }, m: 51, mp: 48, mt: '« Loundja, la fille du roi » (Contes d’Algérie)',
      capable: ['Découvrir la situation finale du conte.',
      'Repérer la morale.'] },
      { t: 'eval', obj: 'Séance 9 : compte-rendu de la production écrite + amélioration collective du texte.',
      f: { de: 49, a: 49 }, m: null, mp: 62, mt: '« Maintenant, je peux » — reconnaître la fin d’un conte' },
      { t: 'td', obj: 'TD 7 (Vocabulaire) : jeu de l’oie des verbes introducteurs de paroles.', libre: false, f: null, m: null, mp: null,
      capable: ['Employer les verbes introducteurs de paroles dans un dialogue.'] },
    ]
  },
  {
    n: 13, mois: 'Janvier', theme: 2, seq: 4, du: '17 janv. 2027',
    seances: [
      { t: 'oral', obj: 'Séance 1 : moment d’accroche + compréhension et production orales (p. 66-67).',
      f: { de: 52, a: 52 }, m: 66, mp: 66, mt: 'Nous écoutons pour comprendre la fable',
      capable: ['Découvrir la fable.',
      'Repérer la morale.'] },
      { t: 'comp1', obj: 'Compréhension de l’écrit 01 : identifier la structure et la morale (p. 68-69).',
      f: { de: 53, a: 53 }, m: 68, mp: 68, mt: '« Les serins et le chardonneret » (Claris de Florian)',
      capable: ['Comprendre oralement un support iconique.',
      'Repérer les personnages de la fable.'] },
      { t: 'gram', obj: 'Vocabulaire : les verbes introducteurs de paroles (p. 70).',
      f: { de: 56, a: 57 }, m: 70, mp: 70, mt: 'Les verbes introducteurs de paroles et la ponctuation du dialogue',
      capable: ['Identifier et employer les verbes introducteurs de paroles.',
      'Placer les guillemets, les tirets et les deux points.'] },
    ]
  },
  {
    n: 14, mois: 'Janvier', theme: 2, seq: 4, du: '24 janv. 2027',
    seances: [
      { t: 'gram', obj: 'Grammaire : caractéristiques typographiques et discursives du dialogue (p. 72-73).',
      f: { de: 56, a: 57 }, m: 72, mp: 70, mt: 'Les verbes introducteurs de paroles et la ponctuation du dialogue',
      capable: ['Identifier et employer les verbes introducteurs de paroles.',
      'Placer les guillemets, les tirets et les deux points.'] },
      { t: 'conj', obj: 'Conjugaison : le présent de l’indicatif (narration et vérité générale) (p. 74-75).',
      f: { de: 58, a: 59 }, m: 74, mp: 72, mt: 'Le présent de narration, d’énonciation et de vérité générale',
      capable: ['Identifier les terminaisons du présent de l’indicatif.',
      'Distinguer les trois valeurs du présent.'] },
      { t: 'prep', obj: 'Préparation à l’écrit : introduire des répliques dans un récit (p. 76).',
      f: { de: 62, a: 62 }, m: 76, mp: 78, mt: 'Nous nous entraînons à écrire un dialogue à partir d’une fable',
      capable: ['Reprendre un texte pour y placer les paroles des personnages.'] },
      { t: 'td', obj: 'TD 8 (Orthographe) : concours express de formation des adverbes en « -ment ».', libre: false, f: null, jeu: 'tabou',
      m: 71, mp: 76, mt: 'Les adverbes de manière',
      capable: ['Nommer un trait de caractère sans employer le mot interdit.'] },
    ]
  },
  {
    n: 15, mois: 'Février', theme: 2, seq: 4, du: '31 janv. 2027',
    seances: [
      { t: 'pe', obj: 'Production écrite : transposer une fable sous une autre forme narrative (p. 77).',
      f: { de: 64, a: 65 }, m: 77, mp: 79, mt: 'Nous écrivons un dialogue à partir d’une fable',
      capable: ['Produire un dialogue entre des personnages de fable.'],
      criteres: ['Employer les verbes introducteurs de paroles.',
      'Respecter la ponctuation du dialogue.'] },
      { t: 'comp2', obj: 'Compréhension de l’écrit 02 : lecture d’analyse fine du dialogue (p. 71).',
      f: { de: 54, a: 55 }, m: 71, mp: 68, mt: '« Les serins et le chardonneret » — exploitation',
      capable: ['Repérer la morale.',
      'Identifier la ponctuation du dialogue.'] },
      { t: 'eval', obj: 'Séance 9 : compte-rendu de la production écrite + correction et réécriture individuelle.',
      f: { de: 66, a: 66 }, m: null, mp: 82, mt: '« Maintenant, je peux » — utiliser le dialogue' },
    ]
  },
  {
    n: 16, mois: 'Février', theme: 2, seq: 5, du: '7 fév. 2027',
    seances: [
      { t: 'oral', obj: 'Séance 1 : moment d’accroche + compréhension et production orales (p. 84-85).',
      f: { de: 69, a: 69 }, m: 84, mp: 84, mt: 'Nous écoutons pour comprendre l’histoire — « Le laboureur et ses enfants »',
      capable: ['Identifier la morale.',
      'Repérer la structure d’une bande dessinée.'] },
      { t: 'comp1', obj: 'Compréhension de l’écrit 01 : lire et décoder le langage de la BD (p. 86-87).',
      f: { de: 70, a: 70 }, m: 86, mp: 85, mt: 'Nous regardons les images — la bande dessinée',
      capable: ['Comprendre oralement un support iconique.'] },
      { t: 'voc', obj: 'Vocabulaire : les termes spécifiques de la BD (vignette, bulle, cartouche) (p. 88).',
      f: { de: 73, a: 74 }, m: 88, mp: 88, mt: 'Le lexique de la bande dessinée',
      capable: ['Identifier et employer le lexique de la BD.',
      'Distinguer vignette, bulle, cartouche et onomatopée.'] },
      { t: 'td', obj: 'TD 9 (Vocabulaire) : jeu d’association ludique sur les onomatopées et bulles de BD.', libre: false, f: null, jeu: 'puzzle',
      m: 92, mp: 88, mt: 'Le lexique de la bande dessinée',
      capable: ['Associer chaque onomatopée à la situation qui convient.'] },
    ]
  },
  {
    n: 17, mois: 'Février', theme: 2, seq: 5, du: '14 fév. 2027',
    seances: [
      { t: 'gram', obj: 'Grammaire : employer les différents types de phrases dans les bulles (p. 90-91).',
      f: { de: 75, a: 76 }, m: 90, mp: 91, mt: 'Les types de phrases — « Le lion et le renard »',
      capable: ['Identifier les différents types de phrases.',
      'Transposer le style direct vers les bulles.'] },
      { t: 'ds', obj: 'Devoir surveillé n° 2 (période réglementaire des devoirs du 2ème trimestre).',
      f: null, m: null, mp: 102, mt: '« Mon test » — Projet 2',
      evaluation: 'Devoir surveillé n° 2' },
      { t: 'conj', obj: 'Conjugaison : le futur simple de l’indicatif (p. 92-93).',
      f: { de: 77, a: 78 }, m: 92, mp: 95, mt: 'Le futur simple — « La tortue et les deux canards »',
      capable: ['Identifier les terminaisons du futur simple.',
      'Conjuguer des verbes au futur simple.'] },
    ]
  },
  {
    n: 18, mois: 'Février', theme: 2, seq: 5, du: '21 fév. 2027',
    seances: [
      { t: 'eval', obj: 'Compte-rendu du devoir surveillé n° 2 + remédiation ciblée.',
      f: null, m: null, mp: 102, mt: '« Mon test » — corrigé' },
      { t: 'prep', obj: 'Préparation à l’écrit : raccorder les planches et scénariser l’histoire (p. 94).',
      f: null, m: 94, mp: 97, mt: 'Nous nous entraînons à animer une fable',
      capable: ['Associer chaque nom à son image dans la BD.'] },
      { t: 'pe', obj: 'Production écrite : produire les cartouches et les bulles d’une BD (p. 95).',
      f: { de: 81, a: 82 }, m: 95, mp: 99, mt: 'Réaliser une planche de bande dessinée à partir d’une fable',
      capable: ['Réaliser une planche de bande dessinée.'],
      criteres: ['Choisir un titre et une morale.',
      'Placer les paroles du dialogue dans les bulles.'] },
      { t: 'td', obj: 'TD 10 (Orthographe) : chasse aux fautes dans des planches de BD truquées.', libre: false, f: null, m: null, mp: null,
      capable: ['Repérer et corriger les erreurs d’orthographe dans une planche de BD.'] },
    ]
  },
  {
    n: 19, mois: 'Mars', theme: 2, seq: 5, du: '7 mars 2027',
    note: 'COMPOSITIONS T2 - 02-08 mars',
    seances: [
      { t: 'compo', obj: 'Composition du trimestre 2.', f: null, m: null,
      mp: 100, mt: '« Le maître et le scorpion » — Fables d’Orient', evaluation: 'Composition — Trimestre 2' },
      { t: 'compo', obj: 'Composition du trimestre 2.', f: null, m: null,
      mp: 100, mt: '« Le maître et le scorpion » — Fables d’Orient', evaluation: 'Composition — Trimestre 2' },
      { t: 'compo', obj: 'Composition du trimestre 2.', f: null, m: null,
      mp: 100, mt: '« Le maître et le scorpion » — Fables d’Orient', evaluation: 'Composition — Trimestre 2' },
    ]
  },
  {
    n: 20, mois: 'Mars', theme: 2, seq: 5, du: '14 mars 2027',
    seances: [
      { t: 'eval', obj: 'Correction collective de la composition du 2ème trimestre + remise des copies.', libre: false, f: null,
      m: null, mp: 102, mt: '« Mon test » — bilan',
      capable: ['Faire le bilan du deuxième trimestre.'] },
      { t: 'comp2', obj: 'Séance 8 (Séq. 05) : compréhension de l’écrit 02 : interprétation d’une BD (p. 89).',
      f: { de: 79, a: 80 }, m: 89, mp: 86, mt: '« La guenon, le singe et la noix »',
      capable: ['Analyser l’agencement graphique d’une planche.',
      'Repérer vignettes, bulles et cartouches.'] },
      { t: 'eval', obj: 'Séance 9 (Séq. 05) : compte-rendu de la production écrite - vacances de printemps (jeudi 18 mars au soir).',
      f: { de: 83, a: 83 }, m: null, mp: 101, mt: '« Maintenant, je peux » — réaliser une BD' },
      { t: 'td', obj: 'TD 11 (Vocabulaire) : domino ludique des suffixes de nominalisation (-tion, -age, -ement).', libre: false, f: null, m: null, mp: null,
      capable: ['Former des noms avec les suffixes -tion, -age, -ement.'] },
    ]
  },
  { vacances: true, nom: 'Vacances de printemps', du: '18 mars 2027', au: '4 avr. 2027', apres: 20 },
  {
    n: 21, mois: 'Avril', theme: 3, seq: 6, du: '4 avr. 2027',
    seances: [
      { t: 'oral', obj: 'Séance 1 : moment d’accroche + compréhension et production orales (p. 106-107).',
      f: { de: 85, a: 85 }, m: 106, mp: 104, mt: 'Nous écoutons pour comprendre la légende',
      capable: ['Découvrir la légende.',
      'Distinguer le réel du fantastique.'] },
      { t: 'comp1', obj: 'Compréhension de l’écrit 01 : récit d’un héros légendaire (p. 108-109).',
      f: { de: 86, a: 86 }, m: 108, mp: 105, mt: 'Nous regardons les images — la légende',
      capable: ['Comprendre oralement un support iconique.'] },
      { t: 'voc', obj: 'Vocabulaire : la nominalisation (suffixes : -tion, -age, -ement) (p. 110).',
      f: { de: 89, a: 90 }, m: 110, mp: 108, mt: 'La nominalisation à base verbale — les suffixes',
      capable: ['Identifier le procédé de la nominalisation.',
      'Employer le lexique de l’héroïsme et du courage.'] },
    ]
  },
  {
    n: 22, mois: 'Avril', theme: 3, seq: 6, du: '11 avr. 2027',
    seances: [
      { t: 'gram', obj: 'Grammaire : la proposition subordonnée relative introduite par « qui » (p. 112-113).',
      f: { de: 91, a: 92 }, m: 112, mp: 111, mt: 'Le pronom relatif « qui »',
      capable: ['Identifier la relative par « qui ».',
      'L’employer pour éviter la répétition.'] },
      { t: 'conj', obj: 'Conjugaison : le passé composé de l’indicatif (être et avoir) (p. 114-115).',
      f: { de: 93, a: 94 }, m: 114, mp: 114, mt: 'Le passé composé',
      capable: ['Identifier le passé composé.',
      'Conjuguer des verbes au passé composé.'] },
      { t: 'prep', obj: 'Préparation à l’écrit : caractériser un portrait extraordinaire (p. 116).',
      f: null, m: 116, mp: 135, mt: 'Reconstituer l’ordre chronologique des actions',
      capable: ['Reconstituer l’ordre chronologique des actions.'] },
      { t: 'td', obj: 'TD 12 (Orthographe) : loto orthographique de l’accord du participe passé.', libre: false, f: null, jeu: 'portrait',
      m: 114, mp: 108, mt: 'La nominalisation à base verbale',
      capable: ['Définir un héros légendaire à partir d’indices.'] },
    ]
  },
  {
    n: 23, mois: 'Avril', theme: 3, seq: 6, du: '18 avr. 2027',
    seances: [
      { t: 'pe', obj: 'Production écrite : décrire un personnage légendaire et ses exploits (p. 117).',
      f: { de: 95, a: 96 }, m: 117, mp: 120, mt: 'Nous écrivons une histoire légendaire — « La légende d’Icare »',
      capable: ['Écrire une histoire légendaire.'],
      criteres: ['Rapporter les faits avec exactitude.',
      'Employer le lexique de la légende.'] },
      { t: 'comp2', obj: 'Compréhension de l’écrit 02 : lecture analytique d’un texte d’intégration (p. 111).',
      f: { de: 87, a: 88 }, m: 111, mp: 106, mt: '« Yennayer et la vieille bergère »',
      capable: ['Analyser et comprendre un texte narratif.',
      'Repérer les qualités du héros.'] },
      { t: 'eval', obj: 'Séance 9 : compte-rendu de la production écrite + accord du participe passé.',
      f: { de: 97, a: 97 }, m: null, mp: 123, mt: '« Maintenant, je peux » — rapporter une légende' },
    ]
  },
  {
    n: 24, mois: 'Avril', theme: 3, seq: 7, du: '25 avr. 2027',
    seances: [
      { t: 'oral', obj: 'Séance 1 : moment d’accroche + compréhension et production orales (p. 126-127).',
      f: { de: 100, a: 100 }, m: 126, mp: 125, mt: 'Nous écoutons pour comprendre la légende — le Sahara',
      capable: ['Écouter et comprendre une légende de lieu.'] },
      { t: 'comp1', obj: 'Compréhension de l’écrit 01 : découvrir le récit lié à un lieu (p. 128-129).',
      f: { de: 101, a: 103 }, m: 128, mp: 127, mt: '« Aïn Bent El Soltane de Mascara »',
      capable: ['Découvrir la situation initiale de la légende.',
      'Repérer le lieu et les faits légendaires.'] },
      { t: 'voc', obj: 'Vocabulaire : le vocabulaire de la description de lieu et indicateurs (p. 130).',
      f: { de: 104, a: 105 }, m: 130, mp: 129, mt: 'Les indicateurs de lieu',
      capable: ['Identifier et employer les indicateurs de lieu.',
      'Décrire une transformation physique.'] },
      { t: 'td', obj: 'TD 13 (Vocabulaire) : mots cachés et charades sur les lieux mythiques et paysages.', libre: false, f: null, m: null, mp: null,
      capable: ['Retrouver le lexique des lieux mythiques à partir d’indices.'] },
    ]
  },
  {
    n: 25, mois: 'Mai', theme: 3, seq: 7, du: '2 mai 2027',
    seances: [
      { t: 'gram', obj: 'Grammaire : la proposition subordonnée relative introduite par « où » (p. 132-133).',
      f: { de: 106, a: 107 }, m: 132, mp: 131, mt: 'Le pronom relatif « où »',
      capable: ['Identifier la PSR par « où ».',
      'L’employer pour éviter la répétition.'] },
      { t: 'ds', obj: 'Devoir surveillé n° 3 (période réglementaire des devoirs du 3ème trimestre).',
      f: null, m: null, mp: null, mt: null,
      evaluation: 'Devoir surveillé n° 3' },
      { t: 'conj', obj: 'Conjugaison : révision approfondie du passé composé et temps du récit (p. 134).',
      f: { de: 93, a: 94 }, m: 134, mp: 114, mt: 'Le passé composé',
      capable: ['Identifier le passé composé.',
      'Conjuguer des verbes au passé composé.'] },
    ]
  },
  {
    n: 26, mois: 'Mai', theme: 3, seq: 7, du: '9 mai 2027',
    seances: [
      { t: 'eval', obj: 'Compte-rendu du devoir surveillé n° 3 + remédiation ciblée.',
      f: null, m: null, mp: 62, mt: '« Maintenant, je peux » — bilan des acquis' },
      { t: 'prep', obj: 'Préparation à l’écrit : organiser la description d’un lieu mythique (p. 136).',
      f: null, m: 136, mp: 135, mt: 'Reconstituer l’ordre chronologique des actions',
      capable: ['Reconstituer l’ordre chronologique des actions.'] },
      { t: 'pe', obj: 'Production écrite : décrire un lieu légendaire (p. 137).',
      f: { de: 108, a: 109 }, m: 137, mp: 140, mt: 'Rapporter par écrit une histoire légendaire',
      capable: ['Écrire la légende d’un lieu et d’un fait légendaire.'],
      criteres: ['Présenter le lieu avec précision.',
      'Employer les indicateurs de lieu.'] },
      { t: 'td', obj: 'TD 14 (Orthographe) : rallye orthographique récapitulatif de fin d’année.', libre: false, f: null, jeu: 'metamorphose',
      m: 136, mp: 129, mt: 'Les indicateurs de lieu',
      capable: ['Associer chaque transformation à son verbe.'] },
    ]
  },
  {
    n: 27, mois: 'Mai', theme: 3, seq: 7, du: '16 mai 2027',
    seances: [
      { t: 'comp2', obj: 'Compréhension de l’écrit 02 : lecture documentaire d’intégration (p. 131).', f: null, m: 131, mp: null,
      capable: ['Identifier les informations explicites d’un texte documentaire.', 'Les mettre en relation avec la légende étudiée.'] },
      { t: 'eval', obj: 'Séance 9 : compte-rendu de la production écrite + amélioration collective.',
      f: null, m: null, mp: 143, mt: '« Mon test » — Projet 3' },
      { t: 'rev', obj: 'Révisions générales : synthèse sur le conte, la fable et la légende.',
      f: null, m: null, mp: 144, mt: '« Mon test » — Projet 3' },
    ]
  },
  {
    n: 28, mois: 'Mai', theme: 3, seq: 7, du: '23 mai 2027',
    note: 'COMPOSITIONS T3 - 23-27 mai',
    seances: [
      { t: 'compo', obj: 'Composition du trimestre 3.', f: null, m: null,
      mp: 140, mt: 'Rapporter par écrit une histoire légendaire', evaluation: 'Composition — Trimestre 3' },
      { t: 'compo', obj: 'Composition du trimestre 3.', f: null, m: null,
      mp: 140, mt: 'Rapporter par écrit une histoire légendaire', evaluation: 'Composition — Trimestre 3' },
      { t: 'compo', obj: 'Composition du trimestre 3.', f: null, m: null,
      mp: 140, mt: 'Rapporter par écrit une histoire légendaire', evaluation: 'Composition — Trimestre 3' },
    ]
  },
  {
    n: 29, mois: 'Mai', theme: 3, seq: 7, du: '30 mai 2027',
    seances: [
      { t: 'eval', obj: 'Correction collective de la composition du 3ème trimestre + remise des copies.',
      f: null, m: null, mp: 62, mt: '« Maintenant, je peux » — bilan des acquis' },
      { t: 'bilan', obj: 'Préparation aux examens de rattrapage et conseils méthodologiques.',
      f: null, m: null, mp: 60, mt: '« Mon projet » — Jouer l’histoire le jour de la fête' },
      { t: 'bilan', obj: 'Clôture officielle de l’année pédagogique avant les vacances d’été.', libre: false, f: null,
      m: null, mp: 60, mt: '« Mon projet » — Jouer l’histoire',
      capable: ['Clôturer l’année en célébrant les travaux littéraires.'] },
    ]
  },
];

const CALENDRIER_OFFICIEL = [
  {
    trimestre: 1, emoji: '🍂', nom: 'Premier trimestre',
    devoirs: {
      libelle: 'Devoirs',
      periode: 'Du 8 au 12 novembre 2026',
      semaines: [5]
    },
    examens: {
      libelle: 'Examens',
      periode: 'Du 6 au 10 décembre 2026',
      semaines: [9]
    }
  },
  {
    trimestre: 2, emoji: '❄️', nom: 'Deuxième trimestre',
    devoirs: {
      libelle: 'Devoirs',
      periode: 'Du 14 au 18 février 2027',
      semaines: [17]
    },
    examens: {
      libelle: 'Examens',
      periode: 'Les 2, 3, 4, 7 et 8 mars 2027',
      semaines: [19]
    }
  },
  {
    trimestre: 3, emoji: '☀️', nom: 'Troisième trimestre — 1AM · 2AM · 3AM',
    devoirs: {
      libelle: 'Devoirs',
      periode: 'Du 2 au 6 mai 2027',
      semaines: [25]
    },
    examens: {
      libelle: 'Examens',
      periode: 'Du 23 au 27 mai 2027',
      semaines: [28]
    }
  }
];


const JEUX = {
  rallye: {
    titre: 'Le Rallye des formules magiques', seq: 1, td: 2, theme: 1,
    cahier: 'td1', illu: 'lacet'
  },
  domino: {
    titre: 'Le Domino des Connecteurs', seq: 2, td: 3, theme: 1,
    cahier: 'td2', illu: 'sorciere'
  },
  enigme: {
    titre: 'L’Énigme du Mot de Clôture', seq: 3, td: 5, theme: 1,
    cahier: 'td3', illu: 'alibaba'
  },
  tabou: {
    titre: 'Le Tabou des traits de caractère', seq: 4, td: 8, theme: 2,
    cahier: 'td4', illu: 'lion'
  },
  puzzle: {
    titre: 'Le Puzzle des Onomatopées', seq: 5, td: 9, theme: 2,
    cahier: 'td5', illu: 'bd'
  },
  portrait: {
    titre: 'Le Portrait-Robot du Héros', seq: 6, td: 12, theme: 3,
    cahier: 'td6', illu: 'grenadier'
  },
  metamorphose: {
    titre: 'Le Grand Baccalauréat des Métamorphoses', seq: 7, td: 14, theme: 3,
    cahier: 'td7', illu: 'source'
  }
};
