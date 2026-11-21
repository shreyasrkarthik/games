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

  // A deck deals every item once, in a random order, before reshuffling.
  // The order and position are kept in localStorage, so an answer never
  // repeats until the whole list has been played on this device.
  function Deck(name, size) {
    let st = load("deck:" + name, null);
    function fresh(round) {
      const order = shuffle([...Array(size).keys()]);
      st = { size, order, pos: 0, round };
      save("deck:" + name, st);
    }
    if (!st || st.size !== size || !Array.isArray(st.order)) fresh(1);
    return {
      current() {
        if (st.pos >= st.order.length) fresh(st.round + 1);
        return st.order[st.pos];
      },
      advance() {
        st.pos += 1;
        if (st.pos >= st.order.length) fresh(st.round + 1);
        else save("deck:" + name, st);
      },
      left() { return st.order.length - st.pos; },
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

  window.PP = { load, save, shuffle, Deck, toast, modal, recordResult, renderStats };
})();
