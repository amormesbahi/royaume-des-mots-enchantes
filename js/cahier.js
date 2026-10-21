/* =============================================================================
   CAHIER D'ACTIVITÉS ET DE T.D  —  2ème A.M
   -----------------------------------------------------------------------------
   Les 6 blocs « Travaux dirigés » du cahier d'activités, transcrits fidèlement :
   mêmes titres, mêmes consignes, mêmes phrases d'appui.

   Chaque bloc donne 3 exercices cliquables (Activité 01, 02, 03 du TD)
   construits sur le seul mécanisme du site :

     { n, illu, q, choix: [a, b, c], r, note }

   `r` = index de la bonne réponse.  `autres` = les autres activités du même
   TD du cahier, gardées en texte de référence.
   ========================================================================== */

const CAHIER = {
  fichier: 'Cahier d’activités et de T.D',
  niveau: '2ème A.M',
  annee: '2023 / 2024',

  /* ---------------------------------------------------------------- projet 1 */
  td1: {
    titre: 'Les compléments circonstanciels',
    seq: 1, theme: 1,
    source: 'Travaux dirigés — Séquence 01, Grammaire : les compléments circonstanciels',
    theme_: 'Le conte',
    activites: [
      {
        n: 'Activité 01',
        illu: 'chaumier',
        q: 'Dans « ils habitaient **pauvrement**, **depuis plusieurs années**, **dans une misérable cabane** », quel groupe indique la manière ?',
        choix: ['dans une misérable cabane', 'depuis plusieurs années', 'pauvrement'],
        r: 2,
        note: 'On encadre le complément de manière : il répond à « comment ? ». « Dans une misérable cabane » répond à « où ? » (lieu) et « depuis plusieurs années » répond à « quand ? » (temps).'
      },
      {
        n: 'Activité 02',
        illu: 'lacet',
        q: 'Pour écrire le début d’une histoire, quelle question d’aide appelle un complément de temps ?',
        choix: ['Comment vivait-il ?', 'Où vivait le héros ?', 'Quand cette histoire s’est-elle passée ?'],
        r: 2,
        note: 'Le cahier propose trois questions : « quand » → complément de temps, « où » → complément de lieu, « comment » → complément de manière.'
      },
      {
        n: 'Activité 03',
        illu: 'escalier',
        q: 'Mots croisés : « Le prince marchait ……… dans la forêt. » Quel complément de lieu convient ?',
        choix: ['hier', 'lentement', 'près du vieux chêne'],
        r: 2,
        note: '« Près du vieux chêne » indique où : c’est un complément circonstanciel de lieu. « Hier » serait un complément de temps et « lentement » un complément de manière.'
      }
    ],
    autres: [
      'Activité 02 (suite) : « Quand cette histoire s’est-elle passée ? … / Où vivait le héros ? … / Comment vivait-il ? … »',
      'Activité 03 (suite) : mots croisés CCL / CCT / CCM'
    ]
  },

  td2: {
    titre: 'La sorcière et ses trois enfants',
    seq: 2, theme: 1,
    source: 'Travaux dirigés — Séquence 02, projet 1',
    theme_: 'Le conte',
    texte: 'Autrefois, dans un pays des merveilles, vivait une très méchante sorcière avec son mari le mage qui avait une barbe blanche et ses trois merveilleux enfants. L’aîné était un méchant ogre qui mangeait sans arrêt, le deuxième un bon lutin qui aimait les humains, et la cadette était une belle fée qui aidait les autres. Un jour, la sorcière alla au village des humains pour effrayer les gens ; elle prit l’apparence d’une ogresse avec des dents pointues, des yeux énormes et des griffes noires. Elle cria d’une voix effrayante et frappa avec son balai magique sur la terre afin de la faire trembler, et elle emmena avec elle son fils l’ogre. Soudain, elle trouva sur son chemin ses autres enfants qui l’empêchèrent de semer la terreur.',
    activites: [
      {
        n: 'Activité 01',
        illu: 'sorciere',
        q: 'Ce texte est :',
        choix: ['un conte', 'une fable', 'une légende'],
        r: 0,
        note: 'Des personnages imaginaires, un événement fantastique et une magicienne : c’est un conte.'
      },
      {
        n: 'Activité 02',
        illu: 'paix',
        q: 'Dans ce texte, quelle expression introduit la suite de l’histoire ?',
        choix: ['Il était une fois', 'Un jour,', 'Depuis ce jour'],
        r: 1,
        note: '« Un jour » fait partie des articulateurs chronologiques : il annonce une péripétie. « Il était une fois » ouvre le conte.'
      },
      {
        n: 'Activité 03',
        illu: 'chateau',
        q: 'Relève du texte les mots du vocabulaire du merveilleux. Lequel est dans cette catégorie ?',
        choix: ['une chaussée', 'un ogre', 'un cahier'],
        r: 1,
        note: 'Un ogre est un géant du folklore : c’est bien un mot du vocabulaire du merveilleux.'
      }
    ],
    autres: [
      'Activité 02 (suite) : compléter le tableau — le lieu de l’histoire (où ?) / les personnages (qui ?) / les expressions qui indiquent la suite',
      'Activité 04 : relever trois adjectifs qualificatifs puis les transformer au féminin ou au masculin',
      'Activité 05 : relever deux verbes à l’imparfait et deux verbes au passé simple, avec leurs infinitifs',
      'Activité 06 : « Il était une fois, un vieux pêcheur vivait avec sa femme au bord de la mer. » — entourer l’adjectif, encadrer le complément du nom'
    ]
  },

  td3: {
    titre: 'Ali Baba et le haricot magique',
    seq: 3, theme: 1,
    source: 'Travaux dirigés — Séquence 03, projet 1',
    theme_: 'Le conte',
    texte: 'Il était une fois, dans une ville de Perse, vivait un pauvre bûcheron qui s’appelait Ali Baba. Un jour, alors qu’Ali Baba coupait du bois dans la forêt, il entendit du bruit ; il se cacha sur un arbre où il entendit le chef d’un groupe de quarante voleurs dire une formule magique qui permit d’ouvrir la porte d’une grotte : « Sésame, ouvre-toi ! » et « Sésame, ferme-toi ! ». Après le départ des bandits, le bûcheron prononça la formule, entra dans la grotte et découvrit un grand trésor. Il emporta une partie de l’or avec lui. Finalement, Ali Baba et sa famille devinrent riches et vécurent dans le bonheur.',
    activites: [
      {
        n: 'Activité 01',
        illu: 'alibaba',
        q: '« Il était une fois, dans une ville de Perse, vivait un pauvre bûcheron… » Quelle formule ouvre le conte ?',
        choix: ['Il était une fois', 'Un jour', 'C’est ainsi que'],
        r: 0,
        note: '« Il était une fois » est la formule d’ouverture ; « Finalement, Ali Baba et sa famille devinrent riches » est la formule de clôture.'
      },
      {
        n: 'Activité 02',
        illu: 'vache',
        q: '« Il y a bien longtemps, un garçon qui (s’appeler) Sami. Il (vivre) avec sa mère dans une vieille petite cabane. » Quel temps faut-il employer ?',
        choix: ['l’imparfait', 'le passé simple', 'le futur simple'],
        r: 0,
        note: 'L’imparfait sert à décrire les habitudes et les circonstances dans le passé : c’est le temps du récit (« il s’appelait », « il vivait »).'
      },
      {
        n: 'Activité 03',
        illu: 'livre',
        q: '« Complète par un synonyme : misérable = ……… »',
        choix: ['pauvre', 'grand', 'content'],
        r: 0,
        note: '« Misérable » et « pauvre » ont le même sens ; ils diffèrent seulement par le degré.'
      }
    ],
    autres: [
      'Activité 01 (suite) : compléter les tableaux — formule d’ouverture / expression de suite / formule de clôture, puis le lieu, les personnages et le héros',
      'Activité 02 (suite) : « Je complète les phrases avec les mots : grand — magnifique —.content — riche — Extraordinary »',
      'Activité 04 : antonymes — laid, imaginaire, pauvre, grand, content, bienveillant, mauvais, gros, honnête, nouvelle, fort',
      'Évaluation bilan : texte « Sami et le haricot magique » (d’après Walter Crane) — compréhension de l’écrit'
    ]
  },

  /* ---------------------------------------------------------------- projet 2 */
  td4: {
    titre: 'Le Lion et le Renard',
    seq: 4, theme: 2,
    source: 'Travaux dirigés — projet 2, fable : le lion et le renard',
    theme_: 'La fable',
    texte: 'Le Lion fut extrêmement surpris. Jamais aucun animal n’avait osé lui parler de la sorte. — « Aurais-tu oublié que je suis le roi des animaux ? » interrogea le Lion. — « Prends garde ! » te dis-je. — « Et pourquoi ? » demanda le Lion. — « Tout simplement parce que je pourrais bien t’égorger et te dévorer », déclara le Renard avec assurance. — « Toi ! Mais tu plaisantes ! » s’exclama le Lion stupéfait.',
    activites: [
      {
        n: 'Activité 02',
        illu: 'lion',
        q: '« Tous les jours, le renard cherche sa nourriture. » À quel temps est conjugué « cherche » et quelle est sa valeur ?',
        choix: ['présent de l’indicatif : une habitude', 'passé simple : une action ponctuelle', 'imparfait : une habitude'],
        r: 0,
        note: '« Tous les jours » est un marqueur d’habitude : c’est le présent de l’indicatif qui exprime la répétition, le retour des mêmes faits.'
      },
      {
        n: 'Activité 03',
        illu: 'jaloux',
        q: '« — Aurais-tu oublié que je suis le roi des animaux ? interrogea le Lion. » Quel est le verbe introducteur de parole ?',
        choix: ['interrogea', 'demanda', 'déclara'],
        r: 0,
        note: '« Interrogea » se place après les mots de la question : il annonce une question. « Demanda » et « déclara » annoncent, eux, une demande et une déclaration.'
      },
      {
        n: 'Activité 04',
        illu: 'lion',
        q: 'Transforme l’adjectif en adverbe de manière : « confiant » →',
        choix: ['avec confiance', 'tout à coup', 'très souvent'],
        r: 0,
        note: 'On forme l’adverbe de manière avec « avec » + le nom : confiant → avec confiance (comme facile → facilement).'
      }
    ],
    autres: [
      'Activité 02 (suite) : « Le renard dévore la poule. / Le renard est l’animal le plus rusé. » — donner le temps et sa valeur',
      'Activité 03 (suite) : relever les verbes introducteurs de parole, deux signes de ponctuation, deux adjectifs qualificatifs et deux adverbes de manière',
      'Activité 04 (suite) : compléter le tableau adjectif qualificatif / adverbe de manière (facile, confiant…)'
    ]
  },

  td5: {
    titre: 'La bande dessinée',
    seq: 5, theme: 2,
    source: 'Travaux dirigés — projet 2, bande dessinée',
    theme_: 'La fable et la BD',
    activites: [
      {
        n: 'Activité 01',
        illu: 'bd',
        q: '« Le mois prochain, nous (participer) … au festival de la bande dessinée. » Quelle est la forme au futur simple ?',
        choix: ['nous participerons', 'nous participions', 'nous participons'],
        r: 0,
        note: 'Le futur simple se forme avec l’infinitif + ons / ez / ent : nous participons → nous participerons.'
      },
      {
        n: 'Activité 02',
        illu: 'bd',
        q: '« Pas moyen de manger ça ! » — C’est une phrase…',
        choix: ['exclamative', 'interrogative', 'déclarative'],
        r: 0,
        note: 'Elle exprime la colère du loup : le point d’exclamation signale une phrase exclamative.'
      },
      {
        n: 'Activité 03',
        illu: 'bd',
        q: '« Un loup, traversant un champ, y trouva de l’ogre » — C’est une phrase…',
        choix: ['déclarative', 'impérative', 'exclamative'],
        r: 0,
        note: 'La phrase donne une information et se termine par un point : c’est une phrase déclarative.'
      }
    ],
    autres: [
      'Activité 01 (suite) : conjuguer au futur simple — être, avoir, aller, faire, voir, pouvoir, vouloir, essayer (je, tu, il/elle, nous, vous, ils/elles)',
      'Activité 02 (suite) : questions sur la BD — titre, genre, personnages, nombre de vignettes, ce qu’a trouvé le loup',
      'Activité 02 (suite) : trouver dans le texte le synonyme de « écouter »'
    ]
  },

  /* ---------------------------------------------------------------- projet 3 */
  td6: {
    titre: 'La légende de Lalla Kh’didja',
    seq: 6, theme: 3,
    source: 'Travaux dirigés — projet 3, légende',
    theme_: 'La légende',
    activites: [
      {
        n: 'Activité 01',
        illu: 'grenadier',
        q: '« Lalla Kh’didja est (monté / montée) au sommet de la montagne. » Quel participe passé choisir ?',
        choix: ['monté', 'montée', 'montés'],
        r: 1,
        note: 'Lalla Kh’didja est une fille : le participe passé de « monter » s’accorde au féminin singulier avec l’auxiliaire être.'
      },
      {
        n: 'Activité 02',
        illu: 'source',
        q: '« Hier soir, Sarah (rentrer) … tard. » Quel est le passé composé correct ?',
        choix: ['Elle est rentrée', 'Elle a rentré', 'Elle était rentrée'],
        r: 0,
        note: '« Renter » se conjugue avec l’auxiliaire être, et le participe passé s’accorde avec le sujet féminin.'
      },
      {
        n: 'Activité 03',
        illu: 'grenadier',
        q: '« Ces propositions, Baddur les a (trouver) … très intéressantes. » Quel participe passé choisir ?',
        choix: ['trouvées', 'trouvé', 'trouvés'],
        r: 0,
        note: 'Le complément d’objet direct « les propositions » (féminin pluriel) est placé avant le verbe : le participe passé s’accorde avec lui.'
      }
    ],
    autres: [
      'Activité 01 (suite) : choisir le participe passé — un villageois a suivi Lalla ; tous les villageois sont partis chercher de Peau ; Lowayla a arrosé le grenadier ; le roi a laissé les villageois profiter de la source',
      'Activité 02 (suite) : conjuguer au passé composé (Sarah et les hamsters) — entendre, commencer, descendre, comprendre, sortir, oublier, ouvrir, trouver',
      'Activité 03 (suite) : accorder le participe passé après un COD placé avant — l’avons attendue, je les ai lues, ont les a détruites, les a votés, l’ont reconnue'
    ]
  },

  td7: {
    titre: 'Aïn Bent El Soltane de Mascara',
    seq: 7, theme: 3,
    source: 'Travaux dirigés — projet 3, légende d’un lieu et d’une plante',
    theme_: 'La légende',
    texte: 'Mascara est la ville où se trouve Aïn Bent El Soltane. Adel a quitté le village où il est né. La Casbah où beaucoup d’artistes ont vu le jour est classée monument historique. La mosquée où mes grands-parents faisaient leurs prières date du XVe siècle. C’est la source où ma mère nous emmenait la veille de nos examens.',
    activites: [
      {
        n: 'Activité 01',
        illu: 'source',
        q: '« Mascara est la ville **où** se trouve Aïn Bent El Soltane. » — Quel est le pronom relatif utilisé ?',
        choix: ['où', 'qui', 'que'],
        r: 0,
        note: 'Le pronom « où » remplace un complément de lieu : il ne s’accorde pas en genre ni en nombre.'
      },
      {
        n: 'Activité 02',
        illu: 'grenadier',
        q: '« La Casbah où beaucoup d’artistes ont vu le jour… » — « où » remplace…',
        choix: ['un nom de personne', 'un nom de lieu', 'un nom de chose abstraite'],
        r: 1,
        note: '« Où » renvoie à « la Casbah », un nom de lieu : il introduit un complément circonstanciel de lieu.'
      },
      {
        n: 'Activité 03',
        illu: 'source',
        q: '« Je vais ……… Mascara pour visiter la source de Bent El Soltane. » Quel indicateur de lieu convient ?',
        choix: ['à', 'dans', 'sur'],
        r: 0,
        note: 'Avec un verbe de mouvement, on emploie « à » + ville. « Dans » accompagne plutôt un lieu fermé, « sur » une surface.'
      }
    ],
    autres: [
      'Activité 01 (suite) : « Souligne l’indicateur de lieu » — Autrefois, Baddur vivait dans une petite oasis ; Le sultan construisit un beau palais près du village ; Les dromadaires se reposaient sur le sable',
      'Activité 02 (suite) : compléter avec un indicateur de lieu — près de la mosquée de Salah Bey, dans le jardin, à Mascara',
      'Activité 03 (suite) : relever les indicateurs de lieu dans le texte « Aïn Bent El Soltane de Mascara » (manuel, p. 126)',
      'Légendes du projet : « Pourquoi les girafes ont un long cou ? », « La légende parle d’une montagne où les habitants vivaient dans le bonheur »'
    ]
  }
};

/* Rattachement des 7 séances de TD du site aux 6 blocs du cahier. */
const TD_CAHIER = {
  rallye: 'td1',
  domino: 'td2',
  enigme: 'td3',
  tabou: 'td4',
  puzzle: 'td5',
  portrait: 'td6',
  metamorphose: 'td7'
};