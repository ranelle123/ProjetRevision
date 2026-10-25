/* ==========================================================
   app.js : fonctionnalités COMMUNES à toutes les pages
   ----------------------------------------------------------
   1. Réglages
   2. store      : lire / écrire dans localStorage sans planter
   3. Outils     : échapper du texte, afficher une notification
   4. Thème      : mode clair / sombre
   5. Menu mobile
   6. Réinitialisation des données
   ========================================================== */
'use strict';

/* ---------- 1. Réglages ---------- */
// Prénom affiché sur l'accueil : modifie-le ici
const DEFAULT_USER_NAME = 'Iverson';
const STORAGE_PREFIX = 'bts.';

function getUserName() {
  const stored = store.get('userName', DEFAULT_USER_NAME);
  return typeof stored === 'string' && stored.trim() ? stored.trim() : DEFAULT_USER_NAME;
}

function setUserName(name) {
  const nextName = String(name || '').trim();
  const finalName = nextName || DEFAULT_USER_NAME;
  store.set('userName', finalName);
  return finalName;
}


/* ---------- 2. store : accès sécurisé à localStorage ----------
   localStorage ne sait stocker que du texte. On convertit donc nos
   données avec JSON.stringify (objet → texte) et JSON.parse (texte → objet).
   Le try/catch évite un plantage si le navigateur bloque le stockage
   (navigation privée par exemple) ou si les données sont corrompues. */
const store = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(STORAGE_PREFIX + key);
      if (raw === null) return fallback;
      const parsed = JSON.parse(raw);
      return parsed === undefined ? fallback : parsed;
    } catch (e) {
      return fallback;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  },

  clearAll() {
    try {
      Object.keys(localStorage)
        .filter((k) => k.startsWith(STORAGE_PREFIX))
        .forEach((k) => localStorage.removeItem(k));
      return true;
    } catch (e) {
      return false;
    }
  }
};

/* Format des données qui seront enregistrées (étapes suivantes) :
   quizHistory      → [ { date, matiere, niveau, score, total }, ... ]
   fichesVues       → [ 'id-fiche', ... ]
   flashcards       → { 'id-carte': 'connue' | 'a-revoir', ... }
   favoris          → { fiches: [...], matieres: [...] }
   derniereActivite → { titre, url, date }
   theme            → 'light' | 'dark'                                  */


/* ---------- 3. Outils ---------- */

// Empêche du texte saisi par l'utilisateur d'être interprété comme du HTML
function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Petite notification discrète en bas de l'écran (disparaît toute seule)
function showToast(message, type = 'info') {
  let region = document.getElementById('toast-region');
  if (!region) {
    region = document.createElement('div');
    region.id = 'toast-region';
    region.setAttribute('aria-live', 'polite'); // lue par les lecteurs d'écran
    document.body.append(region);
  }

  const toast = document.createElement('div');
  toast.className = 'toast toast-' + type;
  toast.textContent = message;
  region.append(toast);

  setTimeout(() => {
    toast.classList.add('is-leaving');
    setTimeout(() => toast.remove(), 350);
  }, 2800);
}


/* ---------- 4. Thème clair / sombre ---------- */
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.setAttribute('aria-pressed', String(theme === 'dark'));
    btn.setAttribute('aria-label', theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre');
  }
}

function initTheme() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  const prefersDark = typeof matchMedia === 'function' ? matchMedia('(prefers-color-scheme: dark)').matches : false;
  const initialTheme = document.documentElement.dataset.theme || (prefersDark ? 'dark' : 'light');

  // Le script placé dans <head> a déjà choisi le bon thème : on synchronise juste le bouton
  applyTheme(initialTheme);

  btn.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    store.set('theme', next);
    showToast(next === 'dark' ? 'Mode sombre activé' : 'Mode clair activé');
  });
}


/* ---------- 5. Menu mobile ---------- */
function initMenu() {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');
  if (!toggle || !nav) return;

  function setOpen(open) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  }

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));

  // Fermer avec la touche Échap
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });
}


/* ---------- 6. Réinitialisation des données ---------- */
function initReset() {
  const btn = document.getElementById('reset-data');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const ok = confirm('Effacer toute ta progression (quiz, fiches vues, flashcards, favoris) ? Cette action est définitive.');
    if (!ok) return;
    store.clearAll();
    location.reload();
  });
}


/* ---------- Démarrage ----------
   Ce fichier est chargé en bas de la page : le HTML existe déjà,
   on peut donc brancher directement les fonctions. */
initTheme();
initMenu();
initReset();
