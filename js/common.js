// Shared helpers for all games: storage, no-repeat "deck", toast, modals.
(function () {
  const PREFIX = "pp:"; // Puzzle Pantry

  function load(key, fallback) {
    try {
      const raw = localStorage.getItem(PREFIX + key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }
  function save(key, value) {
    try { localStorage.setItem(PREFIX + key, JSON.stringify(value)); } catch (e) { /* storage off */ }
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // ---------- solved words ----------
  // Words solved on this browser, plus words listed in data/solved.js
  // (words you've sent over to be retired for good). Neither comes up again.
  function solvedLocal(game) { return new Set(load("solved:" + game, [])); }
  function addSolved(game, word) {
    const s = solvedLocal(game);
    s.add(word);
    save("solved:" + game, [...s].sort());
  }
  function retired(game) {
    const fromRepo = (window.SOLVED && window.SOLVED[game]) || [];
    const all = solvedLocal(game);
    fromRepo.forEach((w) => all.add(w));
    return all;
  }
  // Export every game's solved words as plain text, one line per game.
  function exportSolved(games) {
    return games.map((g) => `${g}: ${[...solvedLocal(g)].sort().join(" ")}`).join("\n");
  }
  // Merge a pasted export into this browser. Returns how many words were new.
  function importSolved(text, games) {
    let added = 0;
    text.split(/\n+/).forEach((line) => {
      const m = line.match(/^\s*([a-z]+)\s*:\s*(.*)$/i);
      if (!m || !games.includes(m[1].toLowerCase())) return;
      const g = m[1].toLowerCase();
      const s = solvedLocal(g);
      (m[2].toLowerCase().match(/[a-z]+/g) || []).forEach((w) => {
        if (!s.has(w)) { s.add(w); added++; }
      });
      save("solved:" + g, [...s].sort());
    });
    return added;
  }

  // A deck deals every word once, in a random order, before reshuffling.
  // The order and position are kept in localStorage, so a word never repeats
  // until the whole list has been played on this browser. Solved and retired
  // words are skipped entirely.
  function Deck(name, words, game) {
    const key = "deck:" + name;
    const valid = new Set(words);
    let st = load(key, null);
    function fresh(round) {
      st = { order: shuffle(words), pos: 0, round };
      save(key, st);
    }
    if (!st || !Array.isArray(st.order) || typeof st.order[0] !== "string") {
      fresh(1);
    } else {
      // the word list may have changed since last visit: drop removed words,
      // add new ones to the part not yet played
      const played = st.order.slice(0, st.pos).filter((w) => valid.has(w));
      const ahead = st.order.slice(st.pos).filter((w) => valid.has(w));
      const known = new Set(st.order);
      const added = shuffle(words.filter((w) => !known.has(w)));
      st.order = played.concat(ahead, added);
      st.pos = played.length;
      save(key, st);
    }
    function skip() {
      const gone = retired(game || name);
      if (gone.size >= words.length) return; // everything solved: allow repeats
      for (let guard = 0; guard < 2; guard++) {
        while (st.pos < st.order.length && gone.has(st.order[st.pos])) st.pos++;
        if (st.pos < st.order.length) break;
        fresh(st.round + 1);
      }
      save(key, st);
    }
    return {
      current() {
        if (st.pos >= st.order.length) fresh(st.round + 1);
        return st.order[st.pos];
      },
      // move to the next word, skipping anything solved or retired
      advance() {
        st.pos += 1;
        if (st.pos >= st.order.length) fresh(st.round + 1);
        skip();
      },
      skipSolved() {
        const before = st.order[st.pos];
        skip();
        return st.order[st.pos] !== before;
      },
      left() {
        const gone = retired(game || name);
        return st.order.slice(st.pos).filter((w) => !gone.has(w)).length;
      },
      total() {
        const gone = retired(game || name);
        return words.filter((w) => !gone.has(w)).length;
      },
      round() { return st.round; },
    };
  }

  let toastTimer = null;
  function toast(msg, ms) {
    let el = document.getElementById("toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "toast";
      el.className = "toast";
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), ms || 1400);
  }

  function modal(id, open) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle("open", open !== false);
  }
  document.addEventListener("click", (e) => {
    const t = e.target;
    if (t.matches("[data-open]")) modal(t.getAttribute("data-open"), true);
    if (t.matches(".modal .close") || t.classList.contains("modal-back")) {
      const back = t.closest(".modal-back");
      if (back) back.classList.remove("open");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") document.querySelectorAll(".modal-back.open").forEach((m) => m.classList.remove("open"));
  });

  function blankStats(n) {
    return { played: 0, won: 0, streak: 0, best: 0, dist: Array(n).fill(0) };
  }
  function recordResult(game, won, tries, n) {
    const s = load("stats:" + game, blankStats(n));
    if (!s.dist || s.dist.length !== n) s.dist = Array(n).fill(0);
    s.played += 1;
    if (won) {
      s.won += 1;
      s.streak += 1;
      s.best = Math.max(s.best, s.streak);
      s.dist[tries - 1] += 1;
    } else {
      s.streak = 0;
    }
    save("stats:" + game, s);
    return s;
  }
  function renderStats(container, game, n, lastTries) {
    const s = load("stats:" + game, blankStats(n));
    const pct = s.played ? Math.round((100 * s.won) / s.played) : 0;
    const max = Math.max(1, ...(s.dist || [0]));
    let html =
      '<div class="stats-row">' +
      `<div><b>${s.played}</b><span>Played</span></div>` +
      `<div><b>${pct}</b><span>Win %</span></div>` +
      `<div><b>${s.streak}</b><span>Streak</span></div>` +
      `<div><b>${s.best}</b><span>Best streak</span></div>` +
      "</div>";
    if (s.dist && s.dist.length) {
      html += '<div class="dist">';
      s.dist.forEach((c, i) => {
        const w = Math.max(8, Math.round((100 * c) / max));
        const cur = lastTries === i + 1 ? " cur" : "";
        html += `<div class="dist-row"><span>${i + 1}</span><span class="bar${cur}" style="width:${w}%">${c}</span></div>`;
      });
      html += "</div>";
    }
    container.innerHTML = html;
  }

  window.PP = { load, save, shuffle, Deck, toast, modal, recordResult, renderStats, addSolved, solvedLocal, exportSolved, importSolved };
})();
