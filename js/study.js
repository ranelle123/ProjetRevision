'use strict';

(function () {
  const page = document.body.dataset.page;
  const params = new URLSearchParams(location.search);
  const byId = (id) => document.getElementById(id);
  const subjectName = (id) => (MATIERES.find((item) => item.id === id) || { nom: id }).nom;
  const safeArray = (value) => Array.isArray(value) ? value : [];
  const safeObject = (value) => value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  const cards = FICHES.flatMap((fiche) => fiche.cartes.map((card, index) => ({
    id: fiche.id + '-' + index,
    ficheId: fiche.id,
    matiere: fiche.matiere,
    titre: fiche.titre,
    question: card[0],
    reponse: card[1]
  })));

  function fillSubjectSelect(select, requested) {
    if (!select) return;
    select.insertAdjacentHTML('beforeend', MATIERES.map((item) =>
      '<option value="' + escapeHtml(item.id) + '">' + escapeHtml(item.nom) + '</option>'
    ).join(''));
    if (requested && MATIERES.some((item) => item.id === requested)) select.value = requested;
  }

  function setLastActivity(title, url) {
    store.set('derniereActivite', { titre: title, url: url, date: new Date().toISOString() });
  }

  function renderFicheList() {
    const search = byId('fiche-search');
    const filter = byId('matiere-filter');
    const list = byId('fiche-list');
    const count = byId('fiche-count');
    if (!list) return;

    fillSubjectSelect(filter, params.get('matiere'));
    if (search && params.get('q')) search.value = params.get('q');

    function render() {
      const query = (search ? search.value : '').trim().toLocaleLowerCase('fr');
      const selectedSubject = filter ? filter.value : '';
      const matches = FICHES.filter((fiche) => {
        const text = [fiche.titre, fiche.resume, ...fiche.points, subjectName(fiche.matiere)].join(' ').toLocaleLowerCase('fr');
        return (!selectedSubject || fiche.matiere === selectedSubject) && (!query || text.includes(query));
      });
      if (count) count.textContent = matches.length + ' fiche' + (matches.length > 1 ? 's' : '');
      list.innerHTML = matches.length ? matches.map((fiche) =>
        '<article class="study-card">' +
          '<span class="study-tag">' + escapeHtml(subjectName(fiche.matiere)) + ' · ' + escapeHtml(fiche.niveau) + '</span>' +
          '<h2>' + escapeHtml(fiche.titre) + '</h2>' +
          '<p>' + escapeHtml(fiche.resume) + '</p>' +
          '<div class="card-actions"><button class="btn btn-primary" type="button" data-open-fiche="' + escapeHtml(fiche.id) + '">Lire la fiche</button>' +
          '<button class="btn btn-outline" type="button" data-favorite="' + escapeHtml(fiche.id) + '">' +
          (safeArray(store.get('favoris', [])).includes(fiche.id) ? '★ En favori' : '☆ Ajouter aux favoris') + '</button></div>' +
        '</article>'
      ).join('') : '<div class="empty-state"><p>Aucune fiche ne correspond à cette recherche.</p></div>';
    }

    function openFiche(id) {
      const fiche = FICHES.find((item) => item.id === id);
      const detail = byId('fiche-detail');
      if (!fiche || !detail) return;
      detail.hidden = false;
      detail.innerHTML = '<div class="detail-heading"><div><span class="study-tag">' + escapeHtml(subjectName(fiche.matiere)) + ' · ' + escapeHtml(fiche.niveau) + '</span><h2>' + escapeHtml(fiche.titre) + '</h2></div><button class="btn btn-outline" type="button" id="close-fiche">Fermer</button></div>' +
        '<p>' + escapeHtml(fiche.resume) + '</p><h3>À retenir</h3><ul class="fact-list">' +
        fiche.points.map((point) => '<li>' + escapeHtml(point) + '</li>').join('') + '</ul>' +
        '<div class="card-actions"><a class="btn btn-primary" href="quiz.html?matiere=' + encodeURIComponent(fiche.matiere) + '">Quiz de cette matière</a>' +
        '<a class="btn btn-outline" href="flashcards.html?matiere=' + encodeURIComponent(fiche.matiere) + '">Réviser les cartes</a></div>';
      const viewed = safeArray(store.get('fichesVues', []));
      if (!viewed.includes(id)) {
        viewed.push(id);
        store.set('fichesVues', viewed);
      }
      setLastActivity(fiche.titre, 'fiches.html?notion=' + encodeURIComponent(fiche.id));
      detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    list.addEventListener('click', (event) => {
      const target = event.target.closest('button');
      if (!target) return;
      if (target.dataset.openFiche) openFiche(target.dataset.openFiche);
      if (target.dataset.favorite) {
        const favorites = safeArray(store.get('favoris', []));
        const next = favorites.includes(target.dataset.favorite)
          ? favorites.filter((id) => id !== target.dataset.favorite)
          : [...favorites, target.dataset.favorite];
        store.set('favoris', next);
        render();
        showToast(next.includes(target.dataset.favorite) ? 'Fiche ajoutée aux favoris' : 'Fiche retirée des favoris', 'success');
      }
    });
    if (search) search.addEventListener('input', render);
    if (filter) filter.addEventListener('change', render);
    const closeDetail = (event) => {
      if (event.target.id === 'close-fiche') byId('fiche-detail').hidden = true;
    };
    byId('fiche-detail').addEventListener('click', closeDetail);
    if (params.get('notion')) openFiche(params.get('notion'));
    render();
  }

  function summarizeLocally() {
    const input = byId('summary-input');
    const output = byId('summary-output');
    const status = byId('summary-status');
    if (!input || !output || !status) return;
    const text = input.value.trim();
    if (text.length < 80) {
      status.textContent = 'Ajoute un texte d’au moins 80 caractères pour obtenir une synthèse utile.';
      output.replaceChildren();
      return;
    }
    const stopWords = new Set(('alors au aux avec ce ces dans de des du elle en et eux il ils je la le les leur lui ma mais me même mes moi mon ne nos notre nous on ou par pas pour qu que quelle quelles quels qui sa se ses son sont sous sur ta te tes ton toutes tout tu un une vos votre vous est être avoir comme cette cet').split(' '));
    const sentences = text.match(/[^.!?]+[.!?]?/g) || [text];
    const words = text.toLocaleLowerCase('fr').match(/[a-zà-ÿ]{3,}/g) || [];
    const frequencies = new Map();
    words.forEach((word) => {
      if (!stopWords.has(word)) frequencies.set(word, (frequencies.get(word) || 0) + 1);
    });
    const ranked = sentences.map((sentence, index) => {
      const terms = sentence.toLocaleLowerCase('fr').match(/[a-zà-ÿ]{3,}/g) || [];
      const score = terms.reduce((sum, word) => sum + (stopWords.has(word) ? 0 : (frequencies.get(word) || 0)), 0) / Math.max(terms.length, 1);
      return { sentence: sentence.trim(), index: index, score: score };
    }).filter((item) => item.sentence.length > 25);
    const take = Math.min(5, Math.max(2, Math.ceil(ranked.length * 0.25)));
    const summary = ranked.sort((a, b) => b.score - a.score).slice(0, take).sort((a, b) => a.index - b.index);
    output.innerHTML = summary.length
      ? '<h3>Synthèse extraite</h3><ul class="fact-list">' + summary.map((item) => '<li>' + escapeHtml(item.sentence) + '</li>').join('') + '</ul>'
      : '<p>Je n’ai pas trouvé de phrases exploitables. Vérifie le texte ou ajoute une ponctuation claire.</p>';
    status.textContent = summary.length + ' idées retenues — vérifie-les avec ton cours.';
  }

  function renderQuiz() {
    const filter = byId('quiz-filter');
    const start = byId('quiz-start');
    const area = byId('quiz-area');
    if (!area) return;
    fillSubjectSelect(filter, params.get('matiere'));
    let questions = [];
    let current = 0;
    let score = 0;
    let answered = false;
    let subject = '';

    function showQuestion() {
      const item = questions[current];
      if (!item) return finish();
      answered = false;
      area.innerHTML = '<div class="quiz-progress"><span>Question ' + (current + 1) + ' / ' + questions.length + '</span><span>' + score + ' bonne' + (score > 1 ? 's' : '') + ' réponse' + (score > 1 ? 's' : '') + '</span></div>' +
        '<div class="progress-track"><span style="width:' + Math.round(current / questions.length * 100) + '%"></span></div>' +
        '<h2 class="quiz-question">' + escapeHtml(item.q) + '</h2><div class="answer-list">' +
        item.options.map((option, index) => '<button type="button" class="answer-option" data-answer="' + index + '">' + escapeHtml(option) + '</button>').join('') +
        '</div><div id="answer-feedback" class="answer-feedback" aria-live="polite"></div>';
    }

    function finish() {
      const total = questions.length;
      const history = safeArray(store.get('quizHistory', []));
      history.unshift({ date: new Date().toISOString(), matiere: subject || 'mixte', niveau: 'Mixte', score: score, total: total });
      store.set('quizHistory', history.slice(0, 100));
      setLastActivity('Quiz terminé · ' + score + '/' + total, 'progression.html');
      area.innerHTML = '<div class="quiz-result"><p class="study-tag">Quiz terminé</p><h2>' + score + ' / ' + total + '</h2><p>' + (score === total ? 'Excellent, toutes les réponses sont justes !' : 'Relis les explications et retente un quiz pour consolider.') + '</p><button id="retry-quiz" class="btn btn-primary" type="button">Refaire un quiz</button> <a class="btn btn-outline" href="progression.html">Voir ma progression</a></div>';
      const retry = byId('retry-quiz');
      if (retry) retry.addEventListener('click', begin);
    }

    function begin() {
      subject = filter ? filter.value : '';
      const pool = FICHES.filter((fiche) => !subject || fiche.matiere === subject)
        .flatMap((fiche) => fiche.quiz.map((question) => ({ ...question, matiere: fiche.matiere })));
      questions = pool.sort(() => Math.random() - 0.5).slice(0, Math.min(10, pool.length));
      current = 0;
      score = 0;
      if (!questions.length) {
        area.innerHTML = '<div class="empty-state"><p>Aucune question disponible pour cette matière.</p></div>';
        return;
      }
      showQuestion();
    }

    area.addEventListener('click', (event) => {
      const target = event.target.closest('button');
      if (!target) return;
      if (target.dataset.answer !== undefined && !answered) {
        answered = true;
        const item = questions[current];
        const selected = Number(target.dataset.answer);
        if (selected === item.correct) score += 1;
        area.querySelectorAll('[data-answer]').forEach((button) => {
          button.disabled = true;
          if (Number(button.dataset.answer) === item.correct) button.classList.add('is-correct');
          else if (Number(button.dataset.answer) === selected) button.classList.add('is-wrong');
        });
        const feedback = byId('answer-feedback');
        feedback.innerHTML = '<p><strong>' + (selected === item.correct ? 'Bonne réponse.' : 'À revoir.') + '</strong> ' + escapeHtml(item.explication) + '</p><button id="next-question" class="btn btn-primary" type="button">' + (current + 1 === questions.length ? 'Voir le résultat' : 'Question suivante') + '</button>';
      }
      if (target.id === 'next-question') {
        current += 1;
        showQuestion();
      }
    });
    if (start) start.addEventListener('click', begin);
    if (params.get('matiere') && filter) begin();
  }

  function renderFlashcards() {
    const filter = byId('flashcard-filter');
    const area = byId('flashcard-area');
    const dueButton = byId('flashcard-due');
    const count = byId('flashcard-count');
    if (!area) return;
    fillSubjectSelect(filter, params.get('matiere'));
    let dueOnly = params.get('filtre') === 'a-revoir';
    let deck = [];
    let position = 0;
    const status = () => safeObject(store.get('flashcards', {}));

    function render() {
      const selected = filter ? filter.value : '';
      const states = status();
      deck = cards.filter((card) =>
        (!selected || card.matiere === selected) &&
        (!dueOnly || states[card.id] === 'a-revoir')
      );
      position = 0;
      if (count) count.textContent = deck.length + ' carte' + (deck.length > 1 ? 's' : '');
      if (!deck.length) {
        area.innerHTML = '<div class="empty-state"><p>' + (dueOnly ? 'Aucune carte marquée « à revoir » dans ce filtre.' : 'Aucune carte dans cette matière.') + '</p></div>';
        return;
      }
      showCard();
    }

    function showCard() {
      const card = deck[position];
      if (!card) return;
      const revealed = area.dataset.revealed === 'true';
      area.innerHTML = '<div class="flashcard-count">Carte ' + (position + 1) + ' / ' + deck.length + ' · ' + escapeHtml(subjectName(card.matiere)) + '</div>' +
        '<article class="flashcard"><span class="study-tag">' + escapeHtml(card.titre) + '</span><h2>' + escapeHtml(card.question) + '</h2>' +
        (revealed ? '<p class="flashcard-answer">' + escapeHtml(card.reponse) + '</p>' : '<button id="reveal-answer" class="btn btn-primary" type="button">Afficher la réponse</button>') +
        (revealed ? '<div class="card-actions"><button class="btn btn-outline" data-mark="a-revoir" type="button">À revoir</button><button class="btn btn-primary" data-mark="connue" type="button">Je la connais</button></div>' : '') +
        '</article>';
    }

    area.addEventListener('click', (event) => {
      const target = event.target.closest('button');
      if (!target) return;
      if (target.id === 'reveal-answer') {
        area.dataset.revealed = 'true';
        showCard();
      } else if (target.dataset.mark) {
        const state = status();
        state[deck[position].id] = target.dataset.mark;
        store.set('flashcards', state);
        position += 1;
        area.dataset.revealed = 'false';
        if (position >= deck.length) {
          area.innerHTML = '<div class="quiz-result"><h2>Session terminée</h2><p>Tes réponses sont enregistrées sur cet appareil.</p><button id="restart-cards" class="btn btn-primary" type="button">Recommencer</button></div>';
        } else showCard();
      } else if (target.id === 'restart-cards') render();
    });
    if (filter) filter.addEventListener('change', render);
    if (dueButton) dueButton.addEventListener('click', () => {
      dueOnly = !dueOnly;
      dueButton.setAttribute('aria-pressed', String(dueOnly));
      dueButton.textContent = dueOnly ? 'Afficher toutes les cartes' : 'À revoir uniquement';
      render();
    });
    area.dataset.revealed = 'false';
    if (params.get('filtre') === 'a-revoir') {
      dueButton.setAttribute('aria-pressed', 'true');
      dueButton.textContent = 'Afficher toutes les cartes';
    }
    render();
  }

  function renderProgress() {
    const history = safeArray(store.get('quizHistory', []));
    const seen = safeArray(store.get('fichesVues', []));
    const flashcards = safeObject(store.get('flashcards', {}));
    const avg = history.length ? Math.round(history.reduce((sum, item) => {
      const total = Number(item.total);
      return sum + (total > 0 ? Number(item.score) / total * 100 : 0);
    }, 0) / history.length) : null;
    byId('progress-quizzes').textContent = history.length;
    byId('progress-average').textContent = avg === null ? '–' : avg + ' %';
    byId('progress-sheets').textContent = seen.length;
    byId('progress-mastered').textContent = Object.values(flashcards).filter((state) => state === 'connue').length;

    const subjectHistory = {};
    history.forEach((item) => {
      if (!item.matiere || item.matiere === 'mixte') return;
      subjectHistory[item.matiere] = subjectHistory[item.matiere] || { score: 0, total: 0, attempts: 0 };
      const result = subjectHistory[item.matiere];
      result.score += Number(item.score) || 0;
      result.total += Number(item.total) || 0;
      result.attempts += 1;
    });
    byId('progress-subjects').innerHTML = MATIERES.map((item) => {
      const result = subjectHistory[item.id];
      const percentage = result && result.total ? Math.round(result.score / result.total * 100) : 0;
      return '<div class="progress-row"><span>' + escapeHtml(item.nom) + '</span>' +
        (result ? '<div class="progress-track"><span style="width:' + percentage + '%"></span></div><strong>' + percentage + ' % <small>(' + result.attempts + ')</small></strong>' : '<span class="section-note">Pas encore évaluée</span>') +
        '</div>';
    }).join('');
    byId('progress-history').innerHTML = history.length ? '<ol class="history-list">' + history.slice(0, 10).map((item) => {
      const date = item.date ? new Date(item.date).toLocaleDateString('fr-FR') : 'Date inconnue';
      return '<li><span><strong>' + escapeHtml(subjectName(item.matiere)) + '</strong><small>' + escapeHtml(date) + '</small></span><strong>' + (Number(item.score) || 0) + ' / ' + (Number(item.total) || 0) + '</strong></li>';
    }).join('') + '</ol>' : '<div class="empty-state"><p>Aucun quiz terminé pour le moment. <a href="quiz.html">Lancer un premier quiz</a></p></div>';
  }

  function renderFavorites() {
    const list = byId('favorite-list');
    if (!list) return;
    function render() {
      const favorites = safeArray(store.get('favoris', []));
      const selected = FICHES.filter((fiche) => favorites.includes(fiche.id));
      list.innerHTML = selected.length ? selected.map((fiche) =>
        '<article class="study-card"><span class="study-tag">' + escapeHtml(subjectName(fiche.matiere)) + '</span><h2>' + escapeHtml(fiche.titre) + '</h2><p>' + escapeHtml(fiche.resume) + '</p>' +
        '<div class="card-actions"><a class="btn btn-primary" href="fiches.html?notion=' + encodeURIComponent(fiche.id) + '">Ouvrir la fiche</a><button class="btn btn-outline" data-remove-favorite="' + escapeHtml(fiche.id) + '" type="button">Retirer</button></div></article>'
      ).join('') : '<div class="empty-state"><p>Tu n’as pas encore de fiche favorite. Ajoute-en depuis le catalogue des <a href="fiches.html">fiches</a>.</p></div>';
    }
    list.addEventListener('click', (event) => {
      const button = event.target.closest('[data-remove-favorite]');
      if (!button) return;
      const favorites = safeArray(store.get('favoris', []));
      store.set('favoris', favorites.filter((id) => id !== button.dataset.removeFavorite));
      render();
    });
    render();
  }

  if (page === 'fiches') {
    renderFicheList();
    byId('summarize-button').addEventListener('click', summarizeLocally);
  }
  if (page === 'quiz') renderQuiz();
  if (page === 'flashcards') renderFlashcards();
  if (page === 'progression') renderProgress();
  if (page === 'favoris') renderFavorites();
})();
