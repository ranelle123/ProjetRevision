'use strict';

const MATIERES = [
  { id: 'hematologie', nom: 'Hématologie', icone: 'i-drop', ton: 'blue', description: 'Hémogramme, cellules sanguines et hémopathies.' },
  { id: 'hemostase', nom: 'Hémostase', icone: 'i-drop', ton: 'indigo', description: 'Coagulation, exploration et suivi.' },
  { id: 'biochimie', nom: 'Biochimie clinique', icone: 'i-flask', ton: 'green', description: 'Fonctions rénale, hépatique, glucidique et lipidique.' },
  { id: 'bacteriologie', nom: 'Bactériologie', icone: 'i-bacteria', ton: 'teal', description: 'Examen cytobactériologique, identification et antibiogramme.' },
  { id: 'virologie', nom: 'Virologie', icone: 'i-virus', ton: 'blue', description: 'Structure virale, diagnostic et sérologie.' },
  { id: 'immunologie', nom: 'Immunologie', icone: 'i-shield', ton: 'green', description: 'Immunité, sérologie et immuno-hématologie.' },
  { id: 'parasitologie', nom: 'Parasitologie et mycologie', icone: 'i-mushroom', ton: 'teal', description: 'Parasites, levures et champignons filamenteux.' },
  { id: 'prelevements', nom: 'Prélèvements', icone: 'i-tube', ton: 'indigo', description: 'Prescription, prélèvement, transport et réception.' },
  { id: 'qualite', nom: 'Qualité et sécurité', icone: 'i-clipboard', ton: 'blue', description: 'Traçabilité, assurance qualité et prévention des risques.' },
  { id: 'techniques', nom: 'Techniques de laboratoire', icone: 'i-bars', ton: 'green', description: 'Microscopie, spectrophotométrie et méthodes analytiques.' },
  { id: 'moleculaire', nom: 'Biologie moléculaire', icone: 'i-virus', ton: 'teal', description: 'ADN, ARN, PCR et diagnostic moléculaire.' },
  { id: 'transfusion', nom: 'Immuno-hématologie', icone: 'i-drop', ton: 'indigo', description: 'Groupes sanguins, RAI et sécurité transfusionnelle.' },
  { id: 'cytologie', nom: 'Biologie cellulaire', icone: 'i-dish', ton: 'blue', description: 'Cellule, organites, division et différenciation.' },
  { id: 'transversal', nom: 'Sciences appliquées', icone: 'i-book', ton: 'green', description: 'Mathématiques, communication et contexte professionnel.' }
];

const FICHES = [
  {
    id: 'hemogramme', matiere: 'hematologie', titre: 'L’hémogramme (NFS)', niveau: 'Fondamentaux',
    resume: 'La numération-formule sanguine quantifie les cellules du sang et décrit leur répartition. Elle associe notamment les lignées érythrocytaire, leucocytaire et plaquettaire. L’interprétation se fait avec les unités, les intervalles de référence du laboratoire et le contexte clinique.',
    points: ['Hématies, hémoglobine, hématocrite et indices érythrocytaires (VGM, TCMH, CCMH).', 'Leucocytes et formule : neutrophiles, éosinophiles, basophiles, lymphocytes et monocytes.', 'Plaquettes : numération et vérification d’un éventuel amas sur le frottis.', 'Un résultat critique ou incohérent doit être vérifié et transmis selon la procédure du laboratoire.'],
    cartes: [['Que mesure principalement le VGM ?', 'Le volume moyen des hématies.'], ['Quel examen aide à vérifier une anomalie morphologique des cellules ?', 'L’examen microscopique du frottis sanguin.'], ['Que faire devant des amas plaquettaires susceptibles de fausser la numération ?', 'Vérifier le frottis et appliquer la procédure du laboratoire avant de valider.']],
    quiz: [
      { q: 'Le VGM renseigne sur…', options: ['le volume moyen des hématies', 'la concentration en fibrinogène', 'le nombre de leucocytes'], correct: 0, explication: 'Le VGM est le volume globulaire moyen, exprimé en femtolitres.' },
      { q: 'Quel examen complète utilement une NFS anormale ?', options: ['Un frottis sanguin', 'Une coproculture', 'Une électrophorèse seule'], correct: 0, explication: 'Le frottis permet l’observation morphologique des cellules et la recherche d’artefacts.' }
    ]
  },
  {
    id: 'anemies', matiere: 'hematologie', titre: 'Anémies et exploration érythrocytaire', niveau: 'Fondamentaux',
    resume: 'L’anémie correspond à une diminution de la concentration d’hémoglobine sous les seuils adaptés au patient. Le VGM oriente la classification en microcytaire, normocytaire ou macrocytaire. La réticulocytose distingue une réponse médullaire régénérative d’une réponse insuffisante.',
    points: ['Confirmer l’anémie sur l’hémoglobine en tenant compte de l’âge, du sexe et de la situation physiologique.', 'VGM bas : évoquer notamment carence martiale ou anomalie de synthèse de l’hémoglobine.', 'Réticulocytes élevés : réponse régénérative possible (hémolyse ou perte sanguine).', 'Associer les résultats à la ferritine, au bilan martial et aux autres éléments prescrits.'],
    cartes: [['Quel indice classe initialement les anémies selon la taille des hématies ?', 'Le VGM.'], ['Que suggèrent des réticulocytes élevés dans une anémie ?', 'Une réponse médullaire régénérative.'], ['Quel paramètre mesure directement la capacité de transport de l’oxygène ?', 'L’hémoglobine.']],
    quiz: [
      { q: 'Un VGM diminué définit une anémie…', options: ['microcytaire', 'macrocytaire', 'hémolytique à lui seul'], correct: 0, explication: 'La classification morphologique se fonde d’abord sur le VGM.' },
      { q: 'Une réticulocytose élevée traduit le plus souvent…', options: ['une réponse médullaire', 'une thrombopénie', 'une absence de production médullaire'], correct: 0, explication: 'Les réticulocytes sont des hématies jeunes ; leur hausse traduit une réponse médullaire.' }
    ]
  },
  {
    id: 'hemostase-primaire', matiere: 'hemostase', titre: 'Hémostase primaire et coagulation', niveau: 'Fondamentaux',
    resume: 'L’hémostase limite une perte sanguine après une lésion vasculaire. L’hémostase primaire implique le vaisseau, les plaquettes et le facteur von Willebrand ; la coagulation forme un réseau de fibrine qui stabilise le clou plaquettaire.',
    points: ['Hémostase primaire : vasoconstriction, adhésion, activation et agrégation plaquettaires.', 'La coagulation aboutit à la génération de thrombine et à la formation de fibrine.', 'Le TP explore principalement la voie extrinsèque et commune ; le TCA explore la voie intrinsèque et commune.', 'Le prélèvement citraté doit respecter le remplissage requis et être correctement homogénéisé.'],
    cartes: [['Quel produit stabilise le clou plaquettaire ?', 'La fibrine.'], ['Que explore principalement le TCA ?', 'Les voies intrinsèque et commune de la coagulation.'], ['Quel anticoagulant est utilisé pour les examens usuels de coagulation ?', 'Le citrate de sodium.']],
    quiz: [
      { q: 'Le TP explore principalement…', options: ['les voies extrinsèque et commune', 'la fibrinolyse seule', 'la fonction plaquettaire'], correct: 0, explication: 'Le TP/INR explore essentiellement les facteurs de la voie extrinsèque et de la voie commune.' },
      { q: 'La fibrine intervient surtout pour…', options: ['stabiliser le caillot', 'dégrader les hématies', 'activer le complément uniquement'], correct: 0, explication: 'Le réseau de fibrine consolide le clou plaquettaire.' }
    ]
  },
  {
    id: 'fonction-renale', matiere: 'biochimie', titre: 'Exploration de la fonction rénale', niveau: 'Fondamentaux',
    resume: 'L’évaluation rénale combine des marqueurs sanguins et urinaires, les données cliniques et l’estimation du débit de filtration glomérulaire. La créatinine dépend notamment de la masse musculaire ; une valeur isolée ne résume donc pas à elle seule la fonction rénale.',
    points: ['Créatinine : marqueur couramment utilisé, interprété avec une estimation du DFG.', 'Urée : influencée aussi par l’alimentation, le catabolisme et l’hydratation.', 'Albuminurie/protéinurie : renseigne sur une atteinte rénale selon la méthode et le contexte.', 'Respecter les consignes de recueil des urines et les unités avant toute interprétation.'],
    cartes: [['Quel paramètre est souvent utilisé pour estimer le DFG ?', 'La créatinine sanguine, intégrée à une équation validée.'], ['Pourquoi la créatinine doit-elle être interprétée avec prudence ?', 'Elle dépend notamment de la masse musculaire et du contexte.'], ['Quel type de prélèvement explore l’albuminurie ?', 'Un échantillon urinaire selon la prescription et la procédure.']],
    quiz: [
      { q: 'La créatinine seule…', options: ['ne résume pas à elle seule la fonction rénale', 'mesure directement le DFG', 'est indépendante de la masse musculaire'], correct: 0, explication: 'Le DFG est estimé par une équation et interprété avec le contexte du patient.' },
      { q: 'Quel marqueur urinaire est notamment utilisé pour évaluer une atteinte glomérulaire ?', options: ['L’albuminurie', 'La troponine', 'La bilirubine conjuguée'], correct: 0, explication: 'L’albuminurie est un marqueur important, à interpréter selon le contexte et la méthode.' }
    ]
  },
  {
    id: 'foie', matiere: 'biochimie', titre: 'Bilan hépatique', niveau: 'Fondamentaux',
    resume: 'Le bilan hépatique rassemble des marqueurs de cytolyse, de cholestase et de fonction de synthèse. Leur interprétation repose sur des profils associés, les valeurs de référence locales et la situation clinique.',
    points: ['ALAT et ASAT : enzymes utilisées dans l’exploration d’une cytolyse, sans être spécifiques du foie au même degré.', 'Phosphatases alcalines et GGT : utiles dans l’exploration d’une cholestase.', 'Bilirubine : interpréter les fractions et les signes associés.', 'Albumine et temps de prothrombine peuvent participer à l’évaluation de la fonction de synthèse.'],
    cartes: [['Quelles enzymes sont classiquement associées à la cytolyse ?', 'ALAT et ASAT.'], ['Quels marqueurs sont souvent associés à l’exploration d’une cholestase ?', 'Phosphatases alcalines et GGT.'], ['Pourquoi interpréter plusieurs paramètres ensemble ?', 'Les profils associés orientent mieux que chaque marqueur pris isolément.']],
    quiz: [
      { q: 'Quel profil évoque l’exploration d’une cytolyse ?', options: ['ALAT/ASAT', 'TPHA/VDRL', 'VGM/TCMH'], correct: 0, explication: 'ALAT et ASAT sont des enzymes couramment utilisées dans l’exploration d’une cytolyse.' },
      { q: 'Les phosphatases alcalines et la GGT sont notamment utiles dans l’exploration…', options: ['d’une cholestase', 'd’une anémie microcytaire', 'd’une hémostase primaire'], correct: 0, explication: 'Ces marqueurs sont interprétés dans le contexte d’un profil cholestatique.' }
    ]
  },
  {
    id: 'glycemie', matiere: 'biochimie', titre: 'Glucose, diabète et bilan lipidique', niveau: 'Fondamentaux',
    resume: 'Le métabolisme glucidique s’étudie avec des prélèvements et des conditions définis par la prescription. L’HbA1c reflète une exposition glycémique moyenne sur plusieurs semaines, tandis que le bilan lipidique décrit plusieurs fractions lipidiques.',
    points: ['Glycémie à jeun : vérifier les conditions de jeûne demandées et le tube adapté.', 'HbA1c : interprétation affectée par certaines situations modifiant la durée de vie des hématies.', 'Bilan lipidique : cholestérol total, HDL, triglycérides et LDL selon les méthodes utilisées.', 'Les seuils diagnostiques et objectifs de suivi dépendent des recommandations en vigueur.'],
    cartes: [['Que reflète principalement l’HbA1c ?', 'L’exposition moyenne au glucose au cours des semaines précédentes.'], ['Quelle condition pré-analytique peut être demandée pour une glycémie ?', 'Un prélèvement à jeun, selon la prescription et le protocole.'], ['Cite deux paramètres du bilan lipidique.', 'Par exemple cholestérol total, HDL, LDL ou triglycérides.']],
    quiz: [
      { q: 'L’HbA1c renseigne principalement sur…', options: ['l’exposition glycémique des dernières semaines', 'la glycémie instantanée uniquement', 'la fonction thyroïdienne'], correct: 0, explication: 'L’HbA1c reflète une moyenne glycémique sur la durée de vie des hématies, approximativement plusieurs semaines.' },
      { q: 'Quel facteur peut perturber l’interprétation de l’HbA1c ?', options: ['Une modification de la durée de vie des hématies', 'La couleur du bouchon du tube uniquement', 'Le groupe ABO'], correct: 0, explication: 'Les situations modifiant le renouvellement érythrocytaire peuvent biaiser l’HbA1c.' }
    ]
  },
  {
    id: 'ecbu', matiere: 'bacteriologie', titre: 'Examen cytobactériologique des urines', niveau: 'Pratique',
    resume: 'L’ECBU associe l’étude des éléments cellulaires urinaires et la recherche/quantification de bactéries. La qualité du prélèvement, sa conservation et les critères d’interprétation conditionnent la conclusion.',
    points: ['Prélèvement propre, idéalement avant antibiothérapie, selon les consignes locales.', 'Acheminement rapide ou conservation conforme aux procédures validées.', 'Examen direct et culture ; interprétation en tenant compte de la leucocyturie, de la bactériurie et du contexte.', 'L’identification et l’antibiogramme sont réalisés selon les critères et recommandations en vigueur.'],
    cartes: [['Pourquoi la qualité du recueil est-elle importante pour un ECBU ?', 'Pour limiter la contamination et interpréter correctement la culture.'], ['Que mesure la culture urinaire ?', 'La présence et la quantité de micro-organismes cultivables.'], ['L’antibiogramme se lit selon quoi ?', 'Les recommandations et critères interprétatifs en vigueur.']],
    quiz: [
      { q: 'Quel élément peut rendre un ECBU difficile à interpréter ?', options: ['Une contamination du prélèvement', 'Une traçabilité complète', 'Un transport conforme'], correct: 0, explication: 'Une contamination peut produire une culture non représentative.' },
      { q: 'L’antibiogramme sert à…', options: ['évaluer la sensibilité d’une souche aux antimicrobiens testés', 'dénombrer les hématies', 'identifier le groupe sanguin'], correct: 0, explication: 'Il caractérise la sensibilité in vitro selon les référentiels applicables.' }
    ]
  },
  {
    id: 'gram', matiere: 'bacteriologie', titre: 'Coloration de Gram et examen direct', niveau: 'Fondamentaux',
    resume: 'La coloration de Gram est une méthode différentielle qui classe les bactéries selon la structure de leur enveloppe et leur comportement à la décoloration. La morphologie et l’arrangement complètent l’observation, mais ne suffisent pas toujours à identifier une espèce.',
    points: ['Étapes usuelles : violet de gentiane, mordançage, décoloration, contre-coloration.', 'Gram positif : apparaît violet ; Gram négatif : apparaît rose/rouge après contre-coloration.', 'Décrire la morphologie (coques, bacilles) et l’arrangement observés.', 'Interpréter avec l’échantillon, la culture et les autres données ; contrôler la qualité technique.'],
    cartes: [['Quelle couleur prennent habituellement les bactéries Gram positif ?', 'Violet.'], ['Quel est le rôle du mordançage ?', 'Fixer/renforcer le complexe colorant dans la méthode de Gram.'], ['La coloration de Gram identifie-t-elle toujours l’espèce ?', 'Non, elle oriente ; l’identification peut nécessiter d’autres méthodes.']],
    quiz: [
      { q: 'Après une coloration de Gram réussie, les bactéries Gram négatif apparaissent généralement…', options: ['roses/rouges', 'violettes foncées', 'incolores en permanence'], correct: 0, explication: 'La contre-coloration rend les Gram négatif roses ou rouges.' },
      { q: 'L’examen direct permet notamment de décrire…', options: ['morphologie et arrangement', 'uniquement la sensibilité aux antibiotiques', 'le DFG'], correct: 0, explication: 'L’observation donne une orientation morphologique, sans toujours identifier l’espèce.' }
    ]
  },
  {
    id: 'antibiogramme', matiere: 'bacteriologie', titre: 'Antibiogramme et résistance bactérienne', niveau: 'Pratique',
    resume: 'L’antibiogramme évalue la sensibilité in vitro d’une bactérie aux antibiotiques. Le résultat dépend d’une méthode standardisée, d’un inoculum conforme et de seuils d’interprétation régulièrement actualisés.',
    points: ['Vérifier pureté et identité de la souche avant réalisation.', 'Standardiser l’inoculum, le milieu, les disques et les conditions d’incubation.', 'Mesurer et interpréter les diamètres selon le référentiel en vigueur (par exemple EUCAST si adopté).', 'Le résultat in vitro est transmis avec les règles de validation et commentaires adaptés.'],
    cartes: [['Pourquoi standardiser l’inoculum ?', 'Pour rendre les résultats reproductibles et comparables aux seuils.'], ['Que mesure-t-on en diffusion en gélose ?', 'Le diamètre de la zone d’inhibition autour d’un disque.'], ['Les seuils d’interprétation sont-ils immuables ?', 'Non, il faut utiliser la version en vigueur du référentiel retenu.']],
    quiz: [
      { q: 'Quel paramètre mesure-t-on en antibiogramme par diffusion en gélose ?', options: ['Le diamètre d’inhibition', 'Le VGM', 'La concentration de bilirubine'], correct: 0, explication: 'Le diamètre est interprété selon le référentiel et les conditions normalisées.' },
      { q: 'Pourquoi utiliser un référentiel à jour ?', options: ['Les critères d’interprétation évoluent', 'Les bactéries ne poussent plus sur gélose', 'Pour éviter le contrôle qualité'], correct: 0, explication: 'Les seuils et catégories peuvent être révisés ; il faut appliquer la version retenue en vigueur.' }
    ]
  },
  {
    id: 'virus', matiere: 'virologie', titre: 'Structure virale et diagnostic virologique', niveau: 'Fondamentaux',
    resume: 'Un virus est un agent infectieux acellulaire constitué d’un génome et d’une capside, parfois entourés d’une enveloppe. Sa multiplication dépend de la cellule hôte. Le diagnostic peut rechercher le génome, un antigène ou la réponse immunitaire.',
    points: ['Génome viral : ADN ou ARN ; capside protéique et enveloppe éventuelle.', 'Virus enveloppés généralement plus sensibles aux solvants et détergents que les virus nus.', 'PCR/RT-PCR recherche le génome ; antigénémie recherche des composants viraux ; sérologie recherche des anticorps.', 'Choix du prélèvement et moment du prélèvement selon le virus et la question diagnostique.'],
    cartes: [['Quels sont les éléments constitutifs essentiels d’un virus ?', 'Un génome et une capside ; parfois une enveloppe.'], ['Que recherche une RT-PCR ?', 'Un génome à ARN après transcription inverse en ADN complémentaire.'], ['Que détecte une sérologie virale ?', 'La réponse anticorps de l’hôte, selon le test.']],
    quiz: [
      { q: 'Un virus se multiplie…', options: ['dans une cellule hôte', 'sur un milieu inerte sans cellule', 'par division binaire autonome'], correct: 0, explication: 'Les virus sont des parasites intracellulaires obligatoires.' },
      { q: 'Une sérologie recherche le plus souvent…', options: ['des anticorps du patient', 'directement tous les génomes viraux', 'une activité enzymatique bactérienne'], correct: 0, explication: 'La sérologie explore la réponse immunitaire ; elle ne remplace pas toujours la détection directe.' }
    ]
  },
  {
    id: 'immunite', matiere: 'immunologie', titre: 'Immunité innée et adaptative', niveau: 'Fondamentaux',
    resume: 'L’immunité innée constitue une réponse rapide reposant notamment sur les barrières, phagocytes et médiateurs. L’immunité adaptative implique les lymphocytes B et T, la reconnaissance spécifique et une mémoire immunitaire.',
    points: ['Immunité innée : rapide, récepteurs de motifs, inflammation et phagocytose.', 'Lymphocytes B : différenciation en plasmocytes producteurs d’anticorps.', 'Lymphocytes T CD4 : coordination ; CD8 : cytotoxicité selon les situations.', 'La mémoire adaptative fonde la réponse secondaire et le principe de la vaccination.'],
    cartes: [['Quelle cellule produit les anticorps ?', 'Le plasmocyte, issu de la différenciation d’un lymphocyte B.'], ['Quel rôle général ont les lymphocytes T CD4 ?', 'Coordonner et réguler des réponses immunitaires.'], ['Quelle propriété distingue l’immunité adaptative ?', 'La spécificité et la mémoire immunitaire.']],
    quiz: [
      { q: 'Les plasmocytes sont principalement responsables de…', options: ['la sécrétion d’anticorps', 'la production de fibrine', 'la synthèse de bilirubine'], correct: 0, explication: 'Les plasmocytes sont des cellules effectrices dérivées des lymphocytes B.' },
      { q: 'La mémoire immunitaire est caractéristique…', options: ['de l’immunité adaptative', 'de la coagulation', 'de la seule barrière cutanée'], correct: 0, explication: 'Des cellules mémoires permettent une réponse secondaire plus rapide et spécifique.' }
    ]
  },
  {
    id: 'serologie', matiere: 'immunologie', titre: 'Sérologie : antigènes, anticorps et interprétation', niveau: 'Pratique',
    resume: 'Les tests sérologiques détectent des anticorps et/ou antigènes selon leur principe. Une sérologie négative ou positive s’interprète avec la fenêtre sérologique, la clinique, la vaccination et les performances du test.',
    points: ['Antigène : cible reconnue ; anticorps : immunoglobuline spécifique produite par l’organisme.', 'ELISA et techniques apparentées utilisent une réaction antigène-anticorps et un signal mesurable.', 'Un résultat réactif de dépistage peut nécessiter un test de confirmation selon l’algorithme.', 'Respecter les règles de contrôle interne, seuils de positivité et commentaires validés.'],
    cartes: [['Qu’est-ce que la fenêtre sérologique ?', 'La période où l’infection peut être présente avant que les anticorps soient détectables.'], ['Que mesure un test ELISA ?', 'Un signal lié à une interaction antigène-anticorps.'], ['Un dépistage réactif suffit-il toujours au diagnostic ?', 'Non, un algorithme peut prévoir confirmation et interprétation complémentaire.']],
    quiz: [
      { q: 'La fenêtre sérologique correspond…', options: ['au délai avant détection des anticorps après infection', 'à la durée de conservation du sérum', 'à la longueur d’onde du lecteur'], correct: 0, explication: 'La séroconversion peut être postérieure au début de l’infection.' },
      { q: 'Un test de dépistage réactif peut nécessiter…', options: ['une confirmation selon l’algorithme', 'aucune vérification', 'un antibiogramme systématique'], correct: 0, explication: 'Les algorithmes diagnostiques prévoient des confirmations selon le marqueur recherché.' }
    ]
  },
  {
    id: 'parasites', matiere: 'parasitologie', titre: 'Parasitologie : prélèvements et examen', niveau: 'Fondamentaux',
    resume: 'Le diagnostic parasitologique dépend du parasite recherché, du cycle biologique et du prélèvement pertinent. L’examen macroscopique, la microscopie et des méthodes complémentaires sont choisis selon l’indication.',
    points: ['Renseigner le contexte et la prescription, notamment séjour, symptômes et traitements si disponibles.', 'Choisir les selles, le sang, les urines ou un autre prélèvement selon le parasite suspecté.', 'Certains examens nécessitent plusieurs prélèvements ou un horaire particulier.', 'L’identification morphologique exige des préparations et colorations adaptées.'],
    cartes: [['Pourquoi plusieurs prélèvements de selles peuvent-ils être demandés ?', 'L’émission parasitaire peut être intermittente.'], ['Quel examen recherche notamment des hémoparasites ?', 'Un examen du sang adapté, par exemple frottis/goutte épaisse selon indication.'], ['Qu’est-ce qui guide le choix du prélèvement ?', 'Le parasite suspecté, son cycle et le contexte clinique.']],
    quiz: [
      { q: 'Le choix du prélèvement parasitologique dépend d’abord…', options: ['du parasite recherché et de son cycle', 'de la couleur du contenant uniquement', 'du groupe ABO'], correct: 0, explication: 'Le stade et le site de présence du parasite déterminent la stratégie diagnostique.' },
      { q: 'Pourquoi peut-on demander des prélèvements répétés ?', options: ['L’excrétion peut être intermittente', 'Pour augmenter artificiellement la concentration', 'Pour remplacer l’identification'], correct: 0, explication: 'Une émission intermittente peut diminuer la sensibilité d’un prélèvement unique.' }
    ]
  },
  {
    id: 'mycologie', matiere: 'parasitologie', titre: 'Mycologie médicale', niveau: 'Fondamentaux',
    resume: 'La mycologie médicale étudie les levures et champignons filamenteux responsables d’infections. L’examen direct, la culture et parfois l’identification complémentaire sont interprétés avec le site prélevé et le contexte.',
    points: ['Levures : cellules unicellulaires ; certaines peuvent former des pseudohyphes.', 'Champignons filamenteux : hyphes formant un mycélium.', 'Prélèvement au site atteint, quantité suffisante et transport adaptés.', 'Distinguer colonisation, contamination et infection selon le site et les données cliniques.'],
    cartes: [['Quelle différence morphologique générale distingue levure et moisissure ?', 'La levure est unicellulaire ; la moisissure forme des hyphes/mycélium.'], ['Pourquoi l’examen direct est-il utile ?', 'Il apporte une orientation rapide sur les éléments fongiques.'], ['Une culture positive signifie-t-elle toujours infection ?', 'Non, il faut considérer colonisation, contamination et contexte.']],
    quiz: [
      { q: 'Les champignons filamenteux sont structurés en…', options: ['hyphes', 'plaquettes', 'capsomères uniquement'], correct: 0, explication: 'Les hyphes constituent le mycélium des champignons filamenteux.' },
      { q: 'Une culture fongique positive s’interprète…', options: ['avec le site et le contexte', 'sans connaître le site prélevé', 'comme une infection certaine dans tous les cas'], correct: 0, explication: 'La signification dépend du prélèvement et du contexte clinique.' }
    ]
  },
  {
    id: 'preanalytique', matiere: 'prelevements', titre: 'Phase pré-analytique et prélèvements', niveau: 'Pratique',
    resume: 'La phase pré-analytique comprend la prescription, l’identification du patient, le prélèvement, le transport et la réception. Une erreur à cette étape peut invalider un examen ; la traçabilité et les critères d’acceptation sont essentiels.',
    points: ['Vérifier identité, prescription, étiquetage au moment du prélèvement et concordance des informations.', 'Choisir le tube et l’ordre de prélèvement selon les procédures en vigueur.', 'Respecter volume, homogénéisation, délai, température et protection de la lumière si nécessaire.', 'Documenter les non-conformités et appliquer les critères d’acceptation/rejet du laboratoire.'],
    cartes: [['Quand faut-il étiqueter un prélèvement ?', 'Au moment du prélèvement, en vérifiant l’identité selon la procédure.'], ['Que faire d’un échantillon non conforme ?', 'Tracer l’écart et appliquer la procédure de gestion des non-conformités.'], ['Cite trois facteurs pré-analytiques importants.', 'Par exemple tube, volume, délai, température, jeûne ou identification.']],
    quiz: [
      { q: 'Une erreur d’identification du prélèvement doit être…', options: ['traitée selon la procédure et tracée', 'corrigée en devinant l’identité', 'ignorée si le résultat paraît cohérent'], correct: 0, explication: 'L’identitovigilance est une exigence de sécurité ; une correction supposée n’est pas acceptable.' },
      { q: 'Quel facteur appartient à la phase pré-analytique ?', options: ['Le délai et la température de transport', 'La validation biologique uniquement', 'La maintenance annuelle seule'], correct: 0, explication: 'Le transport et les conditions de conservation sont des étapes pré-analytiques.' }
    ]
  },
  {
    id: 'qualite', matiere: 'qualite', titre: 'Qualité, traçabilité et accréditation', niveau: 'Pratique',
    resume: 'Le système de management de la qualité encadre les activités du laboratoire, de la demande au compte rendu. La traçabilité documente qui a fait quoi, quand et selon quelle procédure ; l’amélioration continue s’appuie sur l’analyse des écarts.',
    points: ['Appliquer les procédures maîtrisées et utiliser les versions en vigueur.', 'Contrôle qualité interne : surveiller la stabilité de la méthode au quotidien.', 'Évaluation externe de la qualité : comparer les performances à des résultats interlaboratoires.', 'Déclarer, analyser et traiter les non-conformités ; vérifier l’efficacité des actions correctives.'],
    cartes: [['Quel est le rôle du contrôle qualité interne ?', 'Surveiller au quotidien la maîtrise d’une méthode analytique.'], ['Que documente la traçabilité ?', 'Les opérations, acteurs, dates, lots et conditions selon les exigences applicables.'], ['Une action corrective doit-elle être évaluée ?', 'Oui, son efficacité doit être vérifiée et tracée.']],
    quiz: [
      { q: 'Le contrôle qualité interne sert notamment à…', options: ['surveiller la stabilité analytique', 'remplacer l’identification patient', 'supprimer les procédures'], correct: 0, explication: 'Le CQI détecte les dérives et aide à maîtriser les séries analytiques.' },
      { q: 'Après une action corrective, il faut…', options: ['en vérifier l’efficacité', 'effacer la non-conformité', 'arrêter la traçabilité'], correct: 0, explication: 'La vérification d’efficacité fait partie de la démarche d’amélioration.' }
    ]
  },
  {
    id: 'securite', matiere: 'qualite', titre: 'Hygiène, prévention et gestion des risques', niveau: 'Pratique',
    resume: 'La prévention au laboratoire repose sur l’évaluation des risques, les équipements de protection, les bonnes pratiques et la gestion des déchets. Toute exposition ou incident est signalé et pris en charge selon le protocole institutionnel.',
    points: ['Considérer les échantillons comme potentiellement infectieux et appliquer les précautions standard.', 'Adapter les EPI au risque : blouse, gants, protection oculaire ou respiratoire si indiquée.', 'Ne jamais recapuchonner une aiguille ; éliminer les objets piquants/coupants dans un collecteur adapté.', 'En cas d’accident d’exposition, appliquer immédiatement la procédure locale et alerter.'],
    cartes: [['Comment considérer les échantillons biologiques ?', 'Comme potentiellement infectieux, en appliquant les précautions standard.'], ['Où éliminer une aiguille usagée ?', 'Dans un collecteur adapté aux objets piquants/coupants, sans recapuchonnage.'], ['Que faire après une exposition accidentelle ?', 'Appliquer immédiatement le protocole local et alerter le responsable prévu.']],
    quiz: [
      { q: 'Les précautions standard s’appliquent…', options: ['à tout échantillon biologique', 'uniquement aux échantillons déjà positifs', 'seulement en virologie'], correct: 0, explication: 'On considère tout échantillon potentiellement infectieux.' },
      { q: 'Après un accident d’exposition, il faut…', options: ['suivre immédiatement le protocole local', 'attendre la fin du poste', 'désinfecter puis ne rien signaler'], correct: 0, explication: 'La prise en charge et le signalement doivent être immédiats selon les procédures.' }
    ]
  },
  {
    id: 'spectrophotometrie', matiere: 'techniques', titre: 'Spectrophotométrie et loi de Beer-Lambert', niveau: 'Fondamentaux',
    resume: 'La spectrophotométrie mesure l’absorbance d’un rayonnement à une longueur d’onde choisie. Dans les conditions de validité de la loi de Beer-Lambert, l’absorbance est proportionnelle à la concentration de l’espèce absorbante.',
    points: ['Transmittance T = I/I₀ ; absorbance A = −log₁₀(T).', 'Loi de Beer-Lambert : A = ε·l·c, avec ε coefficient d’absorption, l trajet optique et c concentration.', 'Utiliser un blanc, une longueur d’onde adaptée et une gamme d’étalonnage valide.', 'Vérifier les limites de linéarité et diluer selon procédure si la concentration est hors gamme.'],
    cartes: [['Quelle relation lie absorbance et transmittance ?', 'A = −log₁₀(T).'], ['Que représente l dans A = ε·l·c ?', 'La longueur du trajet optique.'], ['Pourquoi réaliser un blanc ?', 'Pour corriger l’absorbance liée au solvant/réactifs et à l’appareil.']],
    quiz: [
      { q: 'Dans la loi de Beer-Lambert, si les autres paramètres restent constants, A est proportionnelle à…', options: ['la concentration', 'la température absolue uniquement', 'l’inverse du trajet optique'], correct: 0, explication: 'A = ε·l·c dans les conditions de validité.' },
      { q: 'Une absorbance trop élevée hors gamme doit conduire à…', options: ['une dilution conforme puis une nouvelle mesure', 'un résultat extrapolé sans contrôle', 'supprimer le blanc'], correct: 0, explication: 'La mesure doit revenir dans une plage validée par la méthode.' }
    ]
  },
  {
    id: 'microscopie', matiere: 'techniques', titre: 'Microscopie et préparation des échantillons', niveau: 'Fondamentaux',
    resume: 'La microscopie optique permet d’observer des structures selon le grossissement, le contraste et la résolution. Une préparation adaptée et un réglage correct sont indispensables à une observation interprétable.',
    points: ['Le grossissement total est le produit du grossissement de l’oculaire par celui de l’objectif.', 'La résolution est la capacité à distinguer deux points proches ; elle n’est pas identique au grossissement.', 'Régler l’éclairage et le condenseur, commencer à faible grossissement puis augmenter.', 'Nettoyer les objectifs et utiliser l’huile uniquement avec l’objectif prévu.'],
    cartes: [['Comment calculer le grossissement total ?', 'Grossissement de l’oculaire multiplié par celui de l’objectif.'], ['Le grossissement et la résolution sont-ils identiques ?', 'Non, la résolution décrit la capacité à distinguer des détails proches.'], ['Pourquoi commencer à faible grossissement ?', 'Pour localiser la zone et réaliser une mise au point plus facilement.']],
    quiz: [
      { q: 'Un oculaire ×10 et un objectif ×40 donnent un grossissement total de…', options: ['×400', '×50', '×4'], correct: 0, explication: 'Le grossissement total est le produit : 10 × 40 = 400.' },
      { q: 'La résolution désigne…', options: ['la capacité à distinguer deux points proches', 'le grossissement seul', 'la couleur de la préparation'], correct: 0, explication: 'Augmenter le grossissement ne garantit pas une meilleure résolution.' }
    ]
  },
  {
    id: 'pcr', matiere: 'moleculaire', titre: 'PCR et amplification des acides nucléiques', niveau: 'Fondamentaux',
    resume: 'La PCR amplifie in vitro une région d’ADN grâce à des amorces, une ADN polymérase thermostable et des cycles de température. Une RT-PCR inclut une transcription inverse pour analyser un ARN ; la PCR en temps réel suit l’amplification par fluorescence.',
    points: ['Dénaturation : séparation des brins ; hybridation : fixation des amorces ; élongation : synthèse.', 'Les contrôles positif, négatif et internes contribuent à valider la série.', 'Séparer les zones pré- et post-amplification pour réduire le risque de contamination.', 'Un résultat négatif n’exclut pas toujours la cible si prélèvement, charge ou inhibition sont défavorables.'],
    cartes: [['Quelles sont les trois étapes d’un cycle PCR ?', 'Dénaturation, hybridation des amorces, élongation.'], ['Pourquoi séparer les zones pré- et post-PCR ?', 'Pour réduire les contaminations par les produits amplifiés.'], ['Que permet la transcription inverse ?', 'Convertir l’ARN en ADN complémentaire avant amplification.']],
    quiz: [
      { q: 'Pendant quelle étape les amorces se fixent-elles à l’ADN cible ?', options: ['Hybridation', 'Dénaturation', 'Élongation'], correct: 0, explication: 'Les amorces s’hybrident à leurs séquences complémentaires.' },
      { q: 'Quel contrôle détecte notamment une contamination des réactifs ?', options: ['Le témoin négatif', 'Le témoin positif uniquement', 'Le calibrateur de biochimie'], correct: 0, explication: 'Le témoin négatif ne doit pas amplifier la cible.' }
    ]
  },
  {
    id: 'transfusion', matiere: 'transfusion', titre: 'Groupes ABO, Rhésus et sécurité transfusionnelle', niveau: 'Pratique',
    resume: 'La sécurité transfusionnelle repose sur l’identification fiable du patient, le groupage sanguin, la recherche d’anticorps irréguliers et les contrôles requis. Les règles de compatibilité dépendent du composant transfusé et des procédures en vigueur.',
    points: ['Le système ABO repose sur les antigènes A et B des hématies et les anticorps plasmatiques correspondants.', 'Le système Rh comprend plusieurs antigènes ; l’antigène D est particulièrement important.', 'La RAI recherche des anticorps anti-érythrocytaires irréguliers.', 'Appliquer strictement les exigences d’identification, de prélèvements et de validation transfusionnelle.'],
    cartes: [['Que recherche la RAI ?', 'Des anticorps anti-érythrocytaires irréguliers dans le plasma/sérum.'], ['Quel antigène est principalement associé au Rhésus positif ?', 'L’antigène D.'], ['Quelle étape de sécurité est fondamentale avant le groupage ?', 'L’identification rigoureuse du patient et du prélèvement.']],
    quiz: [
      { q: 'La RAI recherche…', options: ['des anticorps anti-érythrocytaires irréguliers', 'des anticorps anti-bactériens', 'des facteurs de coagulation'], correct: 0, explication: 'La recherche d’agglutinines irrégulières concerne les anticorps dirigés contre des antigènes érythrocytaires.' },
      { q: 'Quel antigène du système Rh est particulièrement important ?', options: ['D', 'HBe', 'HLA-B27 uniquement'], correct: 0, explication: 'L’antigène D est central dans la détermination usuelle du Rhésus positif/négatif.' }
    ]
  },
  {
    id: 'cellule', matiere: 'cytologie', titre: 'Cellule eucaryote et organites', niveau: 'Fondamentaux',
    resume: 'La cellule eucaryote compartimente ses fonctions dans des organites. La membrane plasmique contrôle les échanges, le noyau porte l’information génétique et les mitochondries participent à la production d’ATP.',
    points: ['Membrane plasmique : bicouche lipidique, protéines et transport sélectif.', 'Noyau : ADN, transcription et régulation de l’expression des gènes.', 'Mitochondries : respiration cellulaire et production d’ATP.', 'Réticulum endoplasmique et appareil de Golgi : synthèse, maturation et adressage de molécules.'],
    cartes: [['Quel organite est le principal site de production d’ATP par respiration ?', 'La mitochondrie.'], ['Où se trouve principalement l’ADN nucléaire ?', 'Dans le noyau.'], ['Quel est le rôle général de l’appareil de Golgi ?', 'Modifier, trier et adresser des protéines/lipides.']],
    quiz: [
      { q: 'Quel organite est associé à la production d’ATP ?', options: ['Mitochondrie', 'Lysosome uniquement', 'Nucléole uniquement'], correct: 0, explication: 'La mitochondrie est le siège principal de la phosphorylation oxydative.' },
      { q: 'La membrane plasmique assure notamment…', options: ['des échanges sélectifs avec le milieu', 'la réplication de toutes les bactéries', 'la synthèse de fibrine plasmatique'], correct: 0, explication: 'La membrane régule les échanges et participe à la communication cellulaire.' }
    ]
  },
  {
    id: 'genetique', matiere: 'moleculaire', titre: 'ADN, expression génétique et mutations', niveau: 'Fondamentaux',
    resume: 'L’information génétique est portée par l’ADN. La transcription produit un ARN à partir d’un brin matrice et la traduction permet la synthèse d’une protéine. Une mutation peut être silencieuse, modifier un acide aminé ou introduire un codon stop.',
    points: ['ADN : double hélice composée de nucléotides ; appariements A-T et C-G.', 'Transcription : ADN vers ARN ; traduction : ARN messager vers chaîne polypeptidique.', 'Mutation ponctuelle, insertion ou délétion : conséquences variables selon la séquence et le cadre de lecture.', 'Les variants sont interprétés avec nomenclature, méthode, fréquence et contexte ; un variant n’est pas automatiquement pathogène.'],
    cartes: [['Quel appariement caractérise l’ADN ?', 'A-T et C-G.'], ['Quel est le sens général de la transcription ?', 'ADN vers ARN.'], ['Une variation génétique est-elle automatiquement pathogène ?', 'Non, sa signification dépend de son interprétation et du contexte.']],
    quiz: [
      { q: 'La traduction correspond à…', options: ['la synthèse d’une protéine à partir de l’ARNm', 'la synthèse d’ARN à partir de l’ADN', 'la séparation des hématies'], correct: 0, explication: 'Les ribosomes lisent l’ARNm pour assembler une chaîne polypeptidique.' },
      { q: 'Une mutation est…', options: ['une variation de la séquence nucléotidique', 'toujours une maladie', 'une étape de coagulation'], correct: 0, explication: 'La conséquence d’une variation dépend de son emplacement et de son effet biologique.' }
    ]
  },
  {
    id: 'leucocytes', matiere: 'hematologie', titre: 'Leucocytes et formule sanguine', niveau: 'Fondamentaux',
    resume: 'La formule leucocytaire quantifie les différentes populations de globules blancs. Les variations doivent être évaluées en valeurs absolues, en tenant compte de l’âge, du contexte et des éventuelles cellules anormales observées au frottis.',
    points: ['Neutrophiles : défense notamment contre les bactéries et les champignons.', 'Lymphocytes : immunité adaptative et populations B, T ou NK.', 'Éosinophiles : impliqués notamment dans les réactions allergiques et parasitaires.', 'Interpréter les valeurs absolues et contrôler les alertes de l’automate par examen adapté.'],
    cartes: [['Quelle population est souvent impliquée dans la défense antibactérienne ?', 'Les neutrophiles.'], ['Pourquoi privilégier les valeurs absolues pour la formule ?', 'Un pourcentage seul peut être trompeur si le nombre total de leucocytes varie.'], ['Que faire devant une alerte morphologique automate ?', 'Vérifier selon les règles du laboratoire, notamment par frottis si indiqué.']],
    quiz: [
      { q: 'Une formule leucocytaire s’interprète notamment avec…', options: ['les valeurs absolues et le contexte', 'les pourcentages seuls', 'le groupe sanguin uniquement'], correct: 0, explication: 'Les pourcentages dépendent du nombre total de leucocytes et doivent être replacés dans leur contexte.' },
      { q: 'Une alerte morphologique de l’automate peut conduire à…', options: ['un contrôle par frottis selon la procédure', 'une validation automatique systématique', 'un dosage de créatinine'], correct: 0, explication: 'Le frottis permet de vérifier les alertes et d’observer la morphologie.' }
    ]
  },
  {
    id: 'electrolytes', matiere: 'biochimie', titre: 'Équilibre hydro-électrolytique', niveau: 'Fondamentaux',
    resume: 'Le bilan ionique explore notamment sodium, potassium et chlorures, souvent associés au bicarbonate. Les résultats dépendent du prélèvement, de l’hémolyse éventuelle, du type d’échantillon et des méthodes utilisées.',
    points: ['Le sodium participe à l’équilibre osmotique et hydrique extracellulaire.', 'Le potassium est majoritairement intracellulaire ; l’hémolyse peut augmenter artificiellement sa mesure.', 'Les chlorures et bicarbonates contribuent à l’évaluation de l’équilibre acido-basique.', 'Un résultat critique est contrôlé et transmis selon la procédure locale.'],
    cartes: [['Quel ion est principalement intracellulaire ?', 'Le potassium.'], ['Quel artefact pré-analytique peut faussement augmenter la kaliémie ?', 'L’hémolyse du prélèvement.'], ['Quel ion majeur est principalement extracellulaire ?', 'Le sodium.']],
    quiz: [
      { q: 'L’hémolyse peut perturber en particulier la mesure de…', options: ['potassium', 'sodium uniquement', 'albumine uniquement'], correct: 0, explication: 'La libération du contenu intracellulaire des hématies peut augmenter le potassium mesuré.' },
      { q: 'Le sodium est le principal cation…', options: ['extracellulaire', 'intracellulaire', 'des hématies uniquement'], correct: 0, explication: 'Le sodium est le cation majeur du compartiment extracellulaire.' }
    ]
  },
  {
    id: 'marqueurs-cardiaques', matiere: 'biochimie', titre: 'Marqueurs cardiaques', niveau: 'Fondamentaux',
    resume: 'Les troponines cardiaques sont des marqueurs de lésion myocardique. Leur interprétation dépend du délai, de l’évolution des concentrations, du seuil analytique, de la fonction rénale et du contexte clinique ; un résultat isolé ne constitue pas à lui seul un diagnostic.',
    points: ['Troponines I ou T : marqueurs privilégiés de l’atteinte myocardique dans les algorithmes en vigueur.', 'Interpréter une cinétique avec plusieurs prélèvements quand le protocole le prévoit.', 'CK-MB et autres marqueurs ont des indications et limites spécifiques.', 'Les seuils et délais décisionnels doivent être ceux du protocole et des recommandations à jour.'],
    cartes: [['Quel marqueur est privilégié pour explorer une lésion myocardique ?', 'Les troponines cardiaques I ou T.'], ['Pourquoi la cinétique des troponines est-elle utile ?', 'L’évolution temporelle aide à interpréter une élévation selon l’algorithme clinique.'], ['Un dosage élevé isolé suffit-il à établir le diagnostic ?', 'Non, il doit être intégré au contexte clinique et aux critères diagnostiques.']],
    quiz: [
      { q: 'Les troponines sont principalement associées à l’exploration…', options: ['d’une lésion myocardique', 'd’une cholestase', 'd’une carence martiale'], correct: 0, explication: 'Les troponines cardiaques sont des marqueurs de lésion myocardique.' },
      { q: 'Un résultat de troponine s’interprète…', options: ['avec le contexte et parfois une cinétique', 'sans le délai du prélèvement', 'comme un diagnostic isolé dans tous les cas'], correct: 0, explication: 'Les algorithmes prennent en compte le contexte, le seuil et l’évolution temporelle.' }
    ]
  },
  {
    id: 'hemocultures', matiere: 'bacteriologie', titre: 'Hémocultures et diagnostic des infections', niveau: 'Pratique',
    resume: 'Les hémocultures recherchent des micro-organismes dans le sang. Leur rendement dépend notamment du volume prélevé, du nombre de séries, du moment du prélèvement et de l’asepsie ; un résultat positif doit être rapidement pris en charge selon l’organisation du laboratoire.',
    points: ['Prélever avant antibiothérapie si possible sans retarder une prise en charge urgente.', 'Respecter l’asepsie, les volumes prescrits, les flacons et l’identification.', 'En cas de positivité : examen direct, alerte selon les critères, puis identification et antibiogramme.', 'Distinguer infection vraie et contamination en intégrant les flacons, le germe et le contexte.'],
    cartes: [['Quel paramètre pré-analytique important influence le rendement des hémocultures ?', 'Le volume de sang prélevé.'], ['Que faire après signalement de positivité par l’automate ?', 'Appliquer la procédure : examen direct, alerte si requise et identification.'], ['Une hémoculture positive est-elle toujours une bactériémie vraie ?', 'Non, une contamination est possible et doit être interprétée.']],
    quiz: [
      { q: 'Quel facteur influence fortement le rendement des hémocultures ?', options: ['Le volume prélevé', 'La couleur de la blouse', 'Le groupe ABO'], correct: 0, explication: 'Le volume prélevé est un facteur important de sensibilité.' },
      { q: 'Après une hémoculture positive, il faut notamment…', options: ['suivre le circuit d’alerte et d’identification', 'ignorer le signal si le patient est asymptomatique', 'jeter le flacon'], correct: 0, explication: 'Les procédures prévoient une prise en charge rapide et une communication des résultats pertinents.' }
    ]
  },
  {
    id: 'hepatites-vih', matiere: 'virologie', titre: 'Sérologies virales : VIH et hépatites', niveau: 'Pratique',
    resume: 'Le dépistage du VIH et des hépatites s’appuie sur des algorithmes spécifiques qui associent recherche d’antigènes et/ou d’anticorps, tests de confirmation et parfois détection moléculaire. Les délais de fenêtre et règles de rendu doivent suivre les recommandations actualisées.',
    points: ['VIH : tests combinés antigène/anticorps et confirmation selon l’algorithme réglementaire.', 'Hépatite B : interpréter ensemble Ag HBs, anti-HBs et anti-HBc selon le profil.', 'Hépatite C : anticorps de dépistage puis recherche d’ARN si indiquée.', 'Respecter confidentialité, information et circuit de rendu réglementaire.'],
    cartes: [['Que recherche un test combiné VIH de 4e génération ?', 'Les anticorps anti-VIH et l’antigène p24.'], ['Quel marqueur indique une infection active par le VHB dans le profil usuel ?', 'L’antigène HBs, à interpréter avec les autres marqueurs et l’algorithme.'], ['Comment confirmer une sérologie anti-VHC positive ?', 'Par une recherche d’ARN du VHC selon l’algorithme.']],
    quiz: [
      { q: 'Une sérologie anti-VHC positive conduit généralement à envisager…', options: ['une recherche d’ARN selon l’algorithme', 'une NFS seule', 'un antibiogramme'], correct: 0, explication: 'La détection de l’ARN aide à rechercher une infection en cours.' },
      { q: 'Pour interpréter les marqueurs du VHB, il faut…', options: ['considérer leur profil combiné', 's’appuyer uniquement sur les anti-HBs', 'ignorer la vaccination'], correct: 0, explication: 'L’interprétation combine plusieurs marqueurs et le contexte, dont la vaccination.' }
    ]
  },
  {
    id: 'complement', matiere: 'immunologie', titre: 'Complément et hypersensibilités', niveau: 'Fondamentaux',
    resume: 'Le système du complément contribue à l’immunité innée par opsonisation, inflammation et lyse. Les hypersensibilités sont classées en quatre types selon les mécanismes immunologiques impliqués.',
    points: ['Voies d’activation du complément : classique, lectines et alternative ; convergence vers C3.', 'C3b favorise l’opsonisation ; C3a/C5a participent à l’inflammation ; le complexe terminal peut lyser.', 'Hypersensibilité I : IgE et mastocytes ; II : anticorps dirigés contre des cellules/structures.', 'Hypersensibilités III et IV : complexes immuns et réponse cellulaire retardée respectivement.'],
    cartes: [['Quel fragment du complément est un opsonine importante ?', 'C3b.'], ['Quel mécanisme caractérise l’hypersensibilité de type I ?', 'IgE, mastocytes et médiateurs de dégranulation.'], ['Quel type d’hypersensibilité est principalement cellulaire et retardé ?', 'Le type IV.']],
    quiz: [
      { q: 'L’hypersensibilité de type I fait intervenir surtout…', options: ['IgE et mastocytes', 'complexes immuns uniquement', 'lymphocytes T cytotoxiques seuls'], correct: 0, explication: 'Le type I est immédiat et médié par les IgE et mastocytes.' },
      { q: 'Le complément intervient notamment dans…', options: ['opsonisation et inflammation', 'la synthèse d’ADN uniquement', 'la production d’hémoglobine'], correct: 0, explication: 'Le complément participe à plusieurs fonctions effectrices de l’immunité.' }
    ]
  },
  {
    id: 'paludisme', matiere: 'parasitologie', titre: 'Paludisme et hémoparasites', niveau: 'Pratique',
    resume: 'Le diagnostic du paludisme repose sur la recherche rapide de Plasmodium dans le sang selon les méthodes disponibles et les procédures d’urgence. L’espèce et la parasitémie orientent la prise en charge et doivent être transmises avec les délais requis.',
    points: ['Urgence biologique : signaler immédiatement une suspicion au laboratoire selon son circuit.', 'Frottis mince : identification morphologique et estimation de la parasitémie.', 'Goutte épaisse : méthode concentrée utile à la détection de faibles parasitémies.', 'Tests rapides antigéniques : outil complémentaire, interprété selon les performances et limites.'],
    cartes: [['Quel examen aide à estimer la parasitémie et identifier Plasmodium ?', 'Le frottis sanguin mince.'], ['À quoi sert notamment la goutte épaisse ?', 'À concentrer les parasites pour faciliter la détection.'], ['Comment traiter une suspicion urgente de paludisme au laboratoire ?', 'Selon le circuit d’urgence et de communication des résultats.']],
    quiz: [
      { q: 'La goutte épaisse est notamment utile pour…', options: ['détecter des parasitémies faibles', 'mesurer le TP', 'doser les anticorps anti-HBs'], correct: 0, explication: 'La concentration du prélèvement augmente la sensibilité de détection.' },
      { q: 'Une suspicion de paludisme nécessite…', options: ['une prise en charge biologique urgente selon le protocole', 'un résultat transmis sans délai standard', 'une culture bactérienne seule'], correct: 0, explication: 'Le diagnostic est urgent et les résultats doivent suivre le circuit adapté.' }
    ]
  },
  {
    id: 'statistiques', matiere: 'transversal', titre: 'Validation analytique et statistiques de base', niveau: 'Méthodes',
    resume: 'La validation analytique évalue si une méthode est adaptée à son usage. La justesse, la fidélité, la sensibilité et la spécificité décrivent des performances différentes ; elles ne doivent pas être confondues.',
    points: ['Fidélité : proximité entre mesures répétées ; justesse : proximité de la valeur vraie/de référence.', 'Sensibilité diagnostique : proportion de malades correctement détectés ; spécificité : proportion de non-malades correctement identifiés.', 'Valeurs prédictives dépendent notamment de la prévalence dans la population testée.', 'Évaluer répétabilité, reproductibilité, linéarité, limites et interférences selon l’usage.'],
    cartes: [['Que décrit la fidélité d’une méthode ?', 'La proximité entre résultats répétés.'], ['La sensibilité diagnostique correspond à quelle proportion ?', 'La proportion de personnes malades avec un test positif.'], ['Les valeurs prédictives dépendent-elles de la prévalence ?', 'Oui, elles varient selon la prévalence de la maladie dans la population.']],
    quiz: [
      { q: 'La spécificité diagnostique mesure la capacité à…', options: ['identifier correctement les non-malades', 'détecter tous les malades', 'reproduire les dosages'], correct: 0, explication: 'La spécificité est la proportion de vrais négatifs parmi les personnes non malades.' },
      { q: 'Les valeurs prédictives varient notamment avec…', options: ['la prévalence', 'le nombre de chiffres du code-barres', 'la couleur du tube'], correct: 0, explication: 'La probabilité pré-test et la prévalence influencent les valeurs prédictives.' }
    ]
  },
  {
    id: 'secret-professionnel', matiere: 'transversal', titre: 'Éthique, confidentialité et communication', niveau: 'Professionnel',
    resume: 'Le laboratoire traite des données de santé sensibles et applique les règles de confidentialité, de protection des données et de communication définies par la loi et les procédures. Les résultats sont transmis uniquement aux destinataires autorisés.',
    points: ['Vérifier l’identité et les droits du destinataire avant communication.', 'Protéger les écrans, documents, identifiants et conversations en zone partagée.', 'Ne transmettre les résultats critiques qu’aux interlocuteurs et selon les circuits autorisés.', 'Tracer les appels et informations communiquées selon la procédure du laboratoire.'],
    cartes: [['À qui communiquer un résultat biologique ?', 'Aux destinataires autorisés, après vérification de leur identité et selon la procédure.'], ['Que faire d’un résultat critique ?', 'Le transmettre rapidement selon le circuit prévu et tracer la communication.'], ['Les données biologiques sont-elles des données sensibles ?', 'Oui, ce sont des données de santé qui nécessitent une protection stricte.']],
    quiz: [
      { q: 'Avant de communiquer un résultat, il faut…', options: ['vérifier l’identité et l’autorisation du destinataire', 'l’envoyer à toute personne qui le demande', 'le publier sans identifiant'], correct: 0, explication: 'La confidentialité et la vérification du destinataire sont indispensables.' },
      { q: 'La communication d’un résultat critique doit être…', options: ['rapide, conforme au circuit et tracée', 'différée sans justification', 'faite uniquement par affichage public'], correct: 0, explication: 'Les procédures définissent les délais, destinataires et la traçabilité.' }
    ]
  },
  {
    id: 'mathematiques', matiere: 'transversal', titre: 'Dilutions, concentrations et unités', niveau: 'Méthodes',
    resume: 'Les calculs de laboratoire exigent des unités cohérentes, une écriture scientifique et la distinction entre concentration, quantité et volume. Pour une dilution simple, C₁V₁ = C₂V₂ si la quantité de soluté est conservée.',
    points: ['Convertir avant le calcul : 1 L = 1000 mL ; 1 mmol = 1000 µmol.', 'Dilution : facteur F = volume final / volume prélevé ; C finale = C initiale / F.', 'Conserver les chiffres significatifs adaptés à la méthode et au résultat.', 'Vérifier l’ordre de grandeur et inscrire les unités à chaque étape.'],
    cartes: [['Quelle relation utilise-t-on pour une dilution simple ?', 'C₁V₁ = C₂V₂.'], ['Un prélèvement de 1 mL complété à 10 mL correspond à quel facteur de dilution ?', 'Facteur 10.'], ['Quelle vérification évite beaucoup d’erreurs de calcul ?', 'Vérifier les unités et l’ordre de grandeur.']],
    quiz: [
      { q: 'On prélève 2 mL et on complète à 10 mL. Le facteur de dilution est…', options: ['5', '2', '10'], correct: 0, explication: 'Facteur = volume final / volume prélevé = 10/2 = 5.' },
      { q: 'Dans une dilution simple, quelle grandeur se conserve ?', options: ['La quantité de soluté transférée', 'La concentration', 'Le volume prélevé et final'], correct: 0, explication: 'C₁V₁ = C₂V₂ exprime la conservation de la quantité de soluté.' }
    ]
  }
];

const CITATIONS = [
  { texte: 'Le hasard ne favorise que les esprits préparés.', auteur: 'Louis Pasteur' },
  { texte: 'C’est en forgeant qu’on devient forgeron.', auteur: 'Proverbe' },
  { texte: 'Petit à petit, l’oiseau fait son nid.', auteur: 'Proverbe' },
  { texte: 'Rome ne s’est pas faite en un jour.', auteur: 'Proverbe' },
  { texte: 'Qui veut voyager loin ménage sa monture.', auteur: 'Proverbe' }
];
