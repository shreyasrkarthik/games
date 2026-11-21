(function () {
  const GAME = "rungs", LEN = 4;
  const L = window.LADDER;
  const COMMON = new Set(L.common.concat(L.starts));
  const VALID = new Set([...COMMON, ...L.extra]);
  const deck = PP.Deck(GAME, L.starts, GAME);
  const STARTS = new Set(L.starts);

  function neighbours(w, set) {
    const out = [];
    for (let i = 0; i < LEN; i++) {
      for (let c = 97; c <= 122; c++) {
        const ch = String.fromCharCode(c);
        if (ch === w[i]) continue;
        const x = w.slice(0, i) + ch + w.slice(i + 1);
        if (set.has(x)) out.push(x);
      }
    }
    return out;
  }
  // Breadth-first search: the shortest ladder from a to b (or null).
  function shortest(a, b, set) {
    if (a === b) return [a];
    const prev = new Map([[a, null]]);
    const q = [a];
    for (let h = 0; h < q.length; h++) {
      const u = q[h];
      for (const v of neighbours(u, set)) {
        if (prev.has(v)) continue;
        prev.set(v, u);
        if (v === b) {
          const path = [b];
          let p = u;
          while (p) { path.unshift(p); p = prev.get(p); }
          return path;
        }
        q.push(v);
      }
    }
    return null;
  }
  // Pick a common target 4-5 steps away (3-6 if needed). Always solvable,
  // because the target is found by searching outward from the start.
  function pickTarget(start) {
    const dist = new Map([[start, 0]]);
    const q = [start];
    for (let h = 0; h < q.length; h++) {
      const u = q[h];
      if (dist.get(u) >= 6) continue;
      for (const v of neighbours(u, COMMON)) {
        if (!dist.has(v)) { dist.set(v, dist.get(u) + 1); q.push(v); }
      }
    }
    for (const want of [[4, 5], [3, 6]]) {
      const c = [...dist].filter(([w, d]) => STARTS.has(w) && d >= want[0] && d <= want[1]);
      if (c.length) {
        const [w, d] = c[Math.floor(Math.random() * c.length)];
        return { target: w, par: d };
      }
    }
    return null;
  }

  let st = PP.load("state:" + GAME, null);
  const fresh = !st || st.start !== deck.current() || (st.path.length === 1 && PP.solvedLocal(GAME).has(st.start));
  if (fresh) { deck.skipSolved(); newRound(); }

  function newRound() {
    let pick = null, start = null;
    for (let tries = 0; tries < 50 && !pick; tries++) {
      start = deck.current();
      pick = pickTarget(start);
      if (!pick) deck.advance(); // a start word with no good target: skip it
    }
    st = { start, target: pick.target, par: pick.par, path: [start], cur: "", done: false, won: false, hints: 0 };
    PP.save("state:" + GAME, st);
  }
  function save() { PP.save("state:" + GAME, st); render(); }
  function last() { return st.path[st.path.length - 1]; }

  // ---------- rendering ----------
  const ladderEl = document.getElementById("ladder");
  function wordRow(w, cls, prevWord) {
    const row = document.createElement("div");
    row.className = "word " + (cls || "");
    for (let i = 0; i < LEN; i++) {
      const s = document.createElement("span");
      const ch = w[i] || "";
      s.textContent = ch;
      if (prevWord && ch && prevWord[i] !== ch) s.classList.add("changed");
      if (cls === "" && ch && ch === st.target[i]) s.classList.add("match");
      if (cls === "typing" && ch) s.classList.add("filled");
      row.appendChild(s);
    }
    return row;
  }
  function render() {
    ladderEl.innerHTML = "";
    st.path.forEach((w, k) => {
      const reached = st.won && k === st.path.length - 1;
      ladderEl.appendChild(wordRow(w, k === 0 ? "start" : reached ? "target reached" : "", k ? st.path[k - 1] : null));
    });
    if (!st.done) {
      ladderEl.appendChild(wordRow(st.cur, "typing"));
      const gap = document.createElement("div");
      gap.className = "gap";
      gap.textContent = "⋮";
      ladderEl.appendChild(gap);
      ladderEl.appendChild(wordRow(st.target, "target"));
    }
    ladderEl.scrollTop = ladderEl.scrollHeight;
    document.getElementById("par").textContent = st.par;
    document.getElementById("steps").textContent = st.path.length - 1;
    document.getElementById("pairInfo").innerHTML = `<b>${st.start.toUpperCase()}</b> → <b>${st.target.toUpperCase()}</b>`;
    document.getElementById("result").classList.toggle("hidden", !st.done);
    document.getElementById("tools").classList.toggle("hidden", st.done);
    document.getElementById("keyboard").classList.toggle("hidden", st.done);
    if (st.done) {
      const steps = st.path.length - 1;
      const diff = steps - st.par;
      document.getElementById("resultText").innerHTML = st.won
        ? `Made it in <b>${steps}</b> step${steps > 1 ? "s" : ""}. ` +
          (diff < 0 ? "Under par, nice find!" : diff === 0 ? "A perfect climb." : `${diff} over par.`) +
          (st.hints ? ` (${st.hints} hint${st.hints > 1 ? "s" : ""})` : "")
        : "Here's a shortest ladder:";
      const best = shortest(st.start, st.target, COMMON) || shortest(st.start, st.target, VALID);
      document.getElementById("pathText").textContent = (st.won ? "Par route: " : "") + best.map((w) => w.toUpperCase()).join(" → ");
    }
  }

  // ---------- input ----------
  function shake(msg) {
    PP.toast(msg);
    const row = ladderEl.querySelector(".typing");
    if (row) { row.classList.remove("shake"); void row.offsetWidth; row.classList.add("shake"); }
  }
  function addStep(w) {
    st.path.push(w);
    st.cur = "";
    if (w === st.target) {
      st.done = true;
      st.won = true;
      PP.addSolved(GAME, st.start);
      const over = st.path.length - 1 - st.par;
      PP.recordResult(GAME, true, Math.min(4, Math.max(1, over + 1)), 4);
      PP.toast(over <= 0 ? "Perfect!" : "Made it!");
    }
    save();
  }
  function submit() {
    const w = st.cur;
    if (w.length < LEN) return shake("Four letters, please");
    const diff = [...w].filter((c, i) => c !== last()[i]).length;
    if (diff !== 1) return shake("Change exactly one letter");
    if (!VALID.has(w)) return shake("Not in the word list");
    if (st.path.includes(w)) return shake("Already on your ladder");
    addStep(w);
  }
  function press(k) {
    if (st.done) { if (k === "enter") next(); return; }
    if (k === "enter") return submit();
    if (k === "back") st.cur = st.cur.slice(0, -1);
    else if (/^[a-z]$/.test(k) && st.cur.length < LEN) st.cur += k;
    save();
  }
  function hint() {
    if (st.done) return;
    const route = shortest(last(), st.target, COMMON) || shortest(last(), st.target, VALID);
    if (!route || route.length < 2) return PP.toast("No route from here. Try Undo");
    const nextWord = route[1];
    if (st.path.includes(nextWord)) return PP.toast("Try Undo first");
    st.hints += 1;
    addStep(nextWord);
  }
  function next() {
    deck.advance();
    newRound();
    render();
  }

  // keyboard
  const kbEl = document.getElementById("keyboard");
  ["qwertyuiop", "asdfghjkl", "+zxcvbnm-"].forEach((r) => {
    const row = document.createElement("div");
    row.className = "krow";
    for (const ch of r) {
      const b = document.createElement("button");
      const k = ch === "+" ? "enter" : ch === "-" ? "back" : ch;
      b.dataset.k = k;
      b.className = "key" + (k.length > 1 ? " wide" : "");
      b.textContent = k === "enter" ? "Enter" : k === "back" ? "⌫" : ch;
      row.appendChild(b);
    }
    kbEl.appendChild(row);
  });
  kbEl.addEventListener("click", (e) => {
    const b = e.target.closest(".key");
    if (b) { press(b.dataset.k); b.blur(); }
  });
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (document.querySelector(".modal-back.open")) return;
    if (e.key === "Enter") { e.preventDefault(); press("enter"); }
    else if (e.key === "Backspace") press("back");
    else if (/^[a-zA-Z]$/.test(e.key)) press(e.key.toLowerCase());
  });
  document.getElementById("undo").addEventListener("click", () => {
    if (st.done || st.path.length < 2) return;
    st.path.pop();
    save();
  });
  document.getElementById("hint").addEventListener("click", hint);
  document.getElementById("giveUp").addEventListener("click", () => {
    if (st.done || !confirm("Show the answer? This counts as a loss.")) return;
    st.done = true;
    st.won = false;
    PP.recordResult(GAME, false, 1, 4);
    save();
  });
  document.getElementById("nextBtn").addEventListener("click", next);
  document.getElementById("statsBtn").addEventListener("click", () => {
    PP.renderStats(document.getElementById("statsBody"), GAME, 4, null);
    PP.modal("stats", true);
  });

  render();
  if (!PP.load("seenHelp:" + GAME, false)) {
    PP.save("seenHelp:" + GAME, true);
    PP.modal("help", true);
  }
})();
