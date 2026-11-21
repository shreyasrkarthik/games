(function () {
  const GAME = "longtail", PER_ROUND = 5, SECONDS = 30;
  const POINTS = [10, 30, 60, 100];
  const NAMES = ["Everyday", "Sharp", "Rare", "Legendary"];
  const COLORS = ["#7b8494", "var(--hit)", "var(--accent)", "#b4479a"];
  const CATS = window.LONGTAIL;
  const nice = (s) => s.replace(/(^|[\s-])([a-z])/g, (m, a, b) => a + b.toUpperCase());
  const byId = Object.fromEntries(CATS.map((c) => [c.id, c]));
  const deck = PP.Deck(GAME, CATS.map((c) => c.id), GAME);

  // ---------- answer matching ----------
  function norm(s) {
    return s.toLowerCase()
      .replace(/\+\+/g, "pp").replace(/#/g, "sharp").replace(/&/g, " and ")
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/['’.]/g, "").replace(/[^a-z0-9]+/g, " ").trim()
      .replace(/^(the|a|an) /, "");
  }
  // Each category gets a lookup: normalised alias -> {tier, display name}
  const lookup = {};
  function table(cat) {
    if (lookup[cat.id]) return lookup[cat.id];
    const m = new Map();
    cat.t.forEach((tier, ti) => tier.split("|").forEach((entry) => {
      const names = entry.split("=");
      names.forEach((n) => m.set(norm(n).replace(/ /g, ""), { tier: ti, name: names[0] }));
    }));
    return (lookup[cat.id] = m);
  }
  function lev(a, b, max) {
    if (Math.abs(a.length - b.length) > max) return max + 1;
    let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
    let prev2 = prev;
    for (let i = 1; i <= a.length; i++) {
      const cur = [i];
      let best = i;
      for (let j = 1; j <= b.length; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
        // a swapped pair of letters counts as one typo
        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) cur[j] = Math.min(cur[j], prev2[j - 2] + 1);
        best = Math.min(best, cur[j]);
      }
      if (best > max) return max + 1;
      prev2 = prev;
      prev = cur;
    }
    return prev[b.length];
  }
  function judge(cat, text) {
    const key = norm(text).replace(/ /g, "");
    if (!key) return null;
    const m = table(cat);
    if (m.has(key)) return m.get(key);
    // allow a small typo on longer answers
    let found = null, bestD = 9;
    for (const [k, v] of m) {
      const max = k.length >= 10 ? 2 : k.length >= 5 ? 1 : 0;
      if (!max) continue;
      const d = lev(key, k, max);
      if (d <= max && d < bestD) { bestD = d; found = v; }
    }
    return found;
  }

  // ---------- state ----------
  let st = PP.load("state:" + GAME, null);
  if (!st || !st.cats || st.cats.some((id) => !byId[id])) newRound();
  const relaxedEl = document.getElementById("relaxed");
  relaxedEl.checked = !!PP.load("relaxed:" + GAME, false);

  function newRound() {
    const cats = [];
    for (let i = 0; i < PER_ROUND; i++) {
      cats.push(deck.current());
      deck.advance();
    }
    st = { cats, i: 0, answers: [], done: false, startedAt: null };
    PP.save("state:" + GAME, st);
  }
  function save() { PP.save("state:" + GAME, st); }
  function total() { return st.answers.reduce((s, a) => s + (a ? a.points : 0), 0); }

  // ---------- timer ----------
  let tick = null;
  function startTimer() {
    clearInterval(tick);
    const bar = document.querySelector("#timer div");
    const wrap = document.getElementById("timer");
    if (relaxedEl.checked) { wrap.classList.add("hidden"); return; }
    wrap.classList.remove("hidden");
    if (!st.startedAt) { st.startedAt = Date.now(); save(); }
    const step = () => {
      const left = Math.max(0, SECONDS - (Date.now() - st.startedAt) / 1000);
      bar.style.width = (100 * left) / SECONDS + "%";
      wrap.classList.toggle("low", left < 8);
      if (left <= 0) { clearInterval(tick); timeUp(); }
    };
    step();
    tick = setInterval(step, 250);
  }
  function timeUp() {
    if (st.answers[st.i] !== undefined) return;
    st.answers[st.i] = { text: "", tier: -1, points: 0 };
    save();
    showVerdict();
  }

  // ---------- rendering ----------
  const els = {
    prompt: document.getElementById("prompt"), verdict: document.getElementById("verdict"),
    input: document.getElementById("answer"), nextRow: document.getElementById("nextRow"),
    play: document.getElementById("play"), summary: document.getElementById("summary"),
  };
  function renderTop() {
    document.getElementById("score").textContent = total();
    document.getElementById("dots").innerHTML = st.cats
      .map((_, k) => `<i class="${k < st.answers.length ? "done" : ""} ${k === st.i && !st.done ? "now" : ""}"></i>`).join("");
  }
  function examples(cat, skipName) {
    // show a couple of rarer answers so every round teaches something
    const out = [];
    for (let t = 3; t >= 1 && out.length < 4; t--) {
      const names = PP.shuffle(cat.t[t].split("|").map((e) => e.split("=")[0])).filter((n) => n !== skipName);
      names.slice(0, t === 3 ? 2 : 1).forEach((n) => out.push(`${nice(n)} (${NAMES[t]})`));
    }
    return out.join(", ");
  }
  function showVerdict() {
    clearInterval(tick);
    const cat = byId[st.cats[st.i]];
    const a = st.answers[st.i];
    let html;
    if (a.tier < 0) html = `<span class="tier tnone">Time's up</span> 0 points`;
    else {
      html = `<span class="tier t${a.tier}">${NAMES[a.tier]}</span> <b>${nice(a.name)}</b> · +${a.points}`;
      html += '<div class="ladder">' + POINTS.map((p, k) =>
        `<span class="${k <= a.tier ? "on" : ""}" style="height:${18 + k * 7}px;background:${COLORS[k]}"></span>`).join("") + "</div>";
    }
    html += `<div class="examples">${a.tier === 3 ? "Other deep answers" : "Rarer answers"}: ${examples(cat, a.name)}</div>`;
    els.verdict.innerHTML = html;
    els.input.disabled = true;
    els.nextRow.classList.remove("hidden");
    document.getElementById("nextQ").textContent = st.i + 1 < PER_ROUND ? "Next" : "See score";
    document.getElementById("nextQ").focus();
    renderTop();
  }
  function showQuestion() {
    els.play.classList.remove("hidden");
    els.summary.classList.add("hidden");
    const cat = byId[st.cats[st.i]];
    els.prompt.textContent = cat.prompt;
    els.verdict.innerHTML = "";
    els.nextRow.classList.add("hidden");
    els.input.disabled = false;
    els.input.value = "";
    renderTop();
    if (st.answers[st.i] !== undefined) return showVerdict();
    els.input.focus();
    startTimer();
  }
  function showSummary() {
    clearInterval(tick);
    els.play.classList.add("hidden");
    els.summary.classList.remove("hidden");
    renderTop();
    const s = PP.load("stats:" + GAME, { played: 0, best: 0, sum: 0, legendary: 0 });
    document.getElementById("total").textContent = `${total()} / ${PER_ROUND * 100}`;
    document.getElementById("best").textContent = `Best round: ${s.best}`;
    document.getElementById("rows").innerHTML = st.cats.map((id, k) => {
      const a = st.answers[k];
      const right = a.tier < 0 ? "No answer · 0" : `${nice(a.name)} · ${NAMES[a.tier]} · ${a.points}`;
      return `<div class="summary-row"><span><span class="p">${byId[id].prompt}</span></span><span>${right}</span></div>`;
    }).join("");
  }
  function render() {
    if (st.done) showSummary();
    else showQuestion();
  }

  // ---------- actions ----------
  document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();
    if (st.done || st.answers[st.i] !== undefined) return;
    const text = els.input.value;
    if (!text.trim()) return;
    const cat = byId[st.cats[st.i]];
    const hit = judge(cat, text);
    if (!hit) {
      PP.toast("Not on my list. Try another");
      els.input.select();
      return;
    }
    st.answers[st.i] = { text, tier: hit.tier, name: hit.name, points: POINTS[hit.tier] };
    save();
    showVerdict();
  });
  document.getElementById("nextQ").addEventListener("click", () => {
    if (st.i + 1 < PER_ROUND) {
      st.i += 1;
      st.startedAt = null;
      save();
      showQuestion();
    } else {
      st.done = true;
      const s = PP.load("stats:" + GAME, { played: 0, best: 0, sum: 0, legendary: 0 });
      s.played += 1;
      s.sum += total();
      s.best = Math.max(s.best, total());
      s.legendary += st.answers.filter((a) => a.tier === 3).length;
      PP.save("stats:" + GAME, s);
      save();
      showSummary();
    }
  });
  document.getElementById("again").addEventListener("click", () => { newRound(); render(); });
  relaxedEl.addEventListener("change", () => {
    PP.save("relaxed:" + GAME, relaxedEl.checked);
    if (!st.done && st.answers[st.i] === undefined) { st.startedAt = null; save(); startTimer(); }
  });
  document.getElementById("statsBtn").addEventListener("click", () => {
    const s = PP.load("stats:" + GAME, { played: 0, best: 0, sum: 0, legendary: 0 });
    const avg = s.played ? Math.round(s.sum / s.played) : 0;
    document.getElementById("statsBody").innerHTML =
      '<div class="stats-row">' +
      `<div><b>${s.played}</b><span>Rounds</span></div>` +
      `<div><b>${avg}</b><span>Average</span></div>` +
      `<div><b>${s.best}</b><span>Best</span></div>` +
      `<div><b>${s.legendary}</b><span>Legendary</span></div></div>` +
      `<p class="examples">${deck.left()} of ${CATS.length} categories left before they reshuffle.</p>`;
    PP.modal("stats", true);
  });
  // closing the help shouldn't eat the clock: restart the timer for this prompt
  function restartAfterHelp() {
    if (!st.done && st.answers[st.i] === undefined) { st.startedAt = null; save(); startTimer(); els.input.focus(); }
  }
  document.getElementById("help").addEventListener("click", (e) => {
    if (e.target.matches(".close") || e.target.id === "help") restartAfterHelp();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.getElementById("help").classList.contains("open")) setTimeout(restartAfterHelp, 0);
  }, true);

  if (!PP.load("seenHelp:" + GAME, false)) {
    PP.save("seenHelp:" + GAME, true);
    PP.modal("help", true);
  }
  render();
  window.__longtail = { judge: (id, t) => judge(byId[id], t) }; // used by tests
})();
