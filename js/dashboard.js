/* ==========================================================
   dashboard.js : logique de la page d'accueil uniquement
   ----------------------------------------------------------
   Tous les chiffres affichés sont calculés à partir des données
   réellement enregistrées dans localStorage (jamais inventés).
   Au premier lancement, il n'y a encore rien : on affiche 0 ou « – ».
   ========================================================== */
(function () {
  'use strict';

  // Ce fichier ne sert que sur la page d'accueil
  if (document.body.dataset.page !== 'accueil') return;

  const $ = (id) => document.getElementById(id);

  function safeArray(value) {
    return Array.isArray(value) ? value : [];
  }

  function safeObject(value) {
    return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  }

  /* ---------- 1. Lecture des données sauvegardées ---------- */
  // On vérifie le type de chaque donnée : si le contenu est corrompu, on repart d'une valeur vide
  const quizHistory = safeArray(store.get('quizHistory', []));
  const fichesVues = safeArray(store.get('fichesVues', []));
  const flashcards = safeObject(store.get('flashcards', {}));
  const derniere = store.get('derniereActivite', null);
  const userName = getUserName();

  /* ---------- 2. Petits calculs ---------- */
  const pourcentage = (q) => (Number(q.total) > 0 ? (Number(q.score) / Number(q.total)) * 100 : 0);
  const nomMatiere = (id) => (MATIERES.find((m) => m.id === id) || { nom: id }).nom;

  // Score moyen = moyenne des pourcentages obtenus à chaque quiz
  const scoreMoyen = quizHistory.length
    ? Math.round(quizHistory.reduce((somme, q) => somme + pourcentage(q), 0) / quizHistory.length)
    : null;

  const cartesARevoir = Object.values(flashcards).filter((etat) => etat === 'a-revoir').length;

  /* ---------- 3. Message de bienvenue ---------- */
  const heure = new Date().getHours();
  $('greeting').textContent = 'Coucou ' + userName + ' 👋🏽';

  /* ---------- 4. Statistiques ---------- */
  $('stat-quiz').textContent = quizHistory.length;
  $('stat-score').textContent = scoreMoyen === null ? '–' : scoreMoyen + ' %';
  $('stat-fiches').textContent = fichesVues.length;
  $('stat-cards').textContent = cartesARevoir;

  /* ---------- 5. Reprendre mes révisions ---------- */
  if (derniere && derniere.titre && derniere.url) {
    const date = derniere.date ? new Date(derniere.date).toLocaleDateString('fr-FR') : '';
    $('resume-content').innerHTML =
      '<a class="resume-card" href="' + escapeHtml(derniere.url) + '">' +
        '<span><strong>' + escapeHtml(derniere.titre) + '</strong>' +
        (date ? '<small>Dernière activité : ' + date + '</small>' : '') + '</span>' +
        '<span class="btn btn-primary">Reprendre</span>' +
      '</a>';
  }

  /* ---------- 6. Réviser aujourd'hui ----------
     On propose, dans l'ordre :
     1) la matière où la moyenne aux quiz est la plus basse (si < 80 %)
     2) les flashcards marquées « à revoir »
     3) sinon, une suggestion de départ                                  */
  const suggestions = [];

  // Moyenne par matière : { hematologie: { somme: 150, n: 2 }, ... }
  const parMatiere = {};
  quizHistory.forEach((q) => {
    if (!q.matiere) return;
    parMatiere[q.matiere] = parMatiere[q.matiere] || { somme: 0, n: 0 };
    parMatiere[q.matiere].somme += pourcentage(q);
    parMatiere[q.matiere].n += 1;
  });

  let plusFaible = null;
  Object.entries(parMatiere).forEach(([id, { somme, n }]) => {
    const moyenne = Math.round(somme / n);
    if (!plusFaible || moyenne < plusFaible.moyenne) plusFaible = { id, moyenne };
  });

  if (plusFaible && plusFaible.moyenne < 80) {
    suggestions.push({
      texte: 'Refaire un quiz : ' + nomMatiere(plusFaible.id) + ' (moyenne ' + plusFaible.moyenne + ' %)',
      url: 'quiz.html?matiere=' + encodeURIComponent(plusFaible.id)
    });
  }

  if (cartesARevoir > 0) {
    suggestions.push({
      texte: cartesARevoir + (cartesARevoir > 1 ? ' flashcards à revoir' : ' flashcard à revoir'),
      url: 'flashcards.html?filtre=a-revoir'
    });
  }

  if (suggestions.length === 0) {
    suggestions.push({ texte: 'Commence par une matière : ouvre une première fiche', url: 'fiches.html' });
  }

  $('today-list').innerHTML = suggestions
    .map((s) => '<li><a href="' + escapeHtml(s.url) + '">' + escapeHtml(s.texte) + '</a></li>')
    .join('');

  /* ---------- 7. Cartes des matières (depuis data.js) ---------- */
  // Les données de data.js sont écrites par nous : on peut les insérer directement
  $('subjects-grid').innerHTML = MATIERES.map((m) =>
    '<a class="subject-card tone-' + m.ton + '" href="fiches.html?matiere=' + encodeURIComponent(m.id) + '">' +
      '<span class="subject-icon"><svg class="icon" aria-hidden="true"><use href="#' + m.icone + '"></use></svg></span>' +
      '<span class="subject-name">' + m.nom + '</span>' +
      '<span class="subject-desc">' + m.description + '</span>' +
      '<span class="study-tag">' + FICHES.filter((fiche) => fiche.matiere === m.id).length + ' fiche(s)</span>' +
    '</a>'
  ).join('');

  /* ---------- 8. Citation du jour ----------
     Le numéro du jour (nombre de jours depuis 1970) change chaque jour :
     on s'en sert pour choisir une citation, qui reste la même toute la journée. */
  const jour = Math.floor(Date.now() / 86400000);
  const citation = CITATIONS[jour % CITATIONS.length];
  $('quote-text').textContent = citation.texte;
  $('quote-author').textContent = citation.auteur;
})();
