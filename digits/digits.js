(function () {
  const GAME = "lockpick", TRIES = 10;
  let len = PP.load("len:" + GAME, 4);
  let st = PP.load("state:" + GAME, null);
  if (!st || st.len !== len) newRound();

  const entryEl = document.getElementById("entry");
  const histEl = document.getElementById("history");
  const padEl = document.getElementById("pad");
  const resultEl = document.getElementById("result");

  function newRound() {
    // every possible code is equally likely; with 720+ codes, repeats are rare
    let code = "";
    const digits = PP.shuffle([..."0123456789"]);
    code = digits.slice(0, len).join("");
    st = { len, code, guesses: [], cur: "", done: false, won: false, out: [] };
    PP.save("state:" + GAME, st);
  }
  function score(g) {
    let hit = 0, near = 0;
    for (let i = 0; i < st.len; i++) {
      if (g[i] === st.code[i]) hit++;
      else if (st.code.includes(g[i])) near++;
    }
    return { hit, near };
  }

  function render() {
    document.querySelectorAll("#opts [data-len]").forEach((b) => b.classList.toggle("sel", +b.dataset.len === st.len));
    document.getElementById("sub").textContent = st.done ? "" : `Try ${st.guesses.length + 1} of ${TRIES}`;
    entryEl.innerHTML = "";
    for (let i = 0; i < st.len; i++) {
      const s = document.createElement("div");
      s.className = "slot" + (i === st.cur.length && !st.done ? " on" : "");
      s.textContent = st.done ? st.code[i] : st.cur[i] || "";
      entryEl.appendChild(s);
    }
    histEl.innerHTML = "";
    st.guesses.slice().reverse().forEach((g, ri) => {
      const { hit, near } = score(g);
      const row = document.createElement("div");
      row.className = "hrow";
      let pegs = "";
      for (let i = 0; i < st.len; i++) pegs += `<span class="peg ${i < hit ? "hit" : i < hit + near ? "near" : ""}"></span>`;
      row.innerHTML = `<span class="n">${st.guesses.length - ri}</span><span class="code">${g}</span><span class="pegs">${pegs}</span><span class="counts">${hit} hit · ${near} near</span>`;
      histEl.appendChild(row);
    });
    padEl.querySelectorAll(".key").forEach((k) => {
      k.classList.toggle("out", st.out.includes(k.dataset.d));
      k.disabled = st.done;
    });
    resultEl.classList.toggle("hidden", !st.done);
    if (st.done) {
      document.getElementById("resultText").innerHTML = st.won
        ? `Unlocked in ${st.guesses.length} ${st.guesses.length === 1 ? "try" : "tries"}!`
        : `Out of tries. The code was <b>${st.code}</b>.`;
    }
  }

  function press(d) {
    if (st.done) return;
    if (st.cur.includes(d)) return PP.toast("Each digit is used once");
    if (st.cur.length < st.len) st.cur += d;
    save();
  }
  function back() {
    if (st.done) return;
    st.cur = st.cur.slice(0, -1);
    save();
  }
  function submit() {
    if (st.done) return next();
    if (st.cur.length < st.len) return PP.toast(`Enter ${st.len} digits`);
    if (st.guesses.includes(st.cur)) return PP.toast("You already tried that");
    st.guesses.push(st.cur);
    const { hit } = score(st.cur);
    st.cur = "";
    if (hit === st.len) finish(true);
    else if (st.guesses.length >= TRIES) finish(false);
    save();
  }
  function finish(won) {
    st.done = true;
    st.won = won;
    PP.recordResult(GAME, won, st.guesses.length, TRIES);
    setTimeout(() => showStats(won ? st.guesses.length : null), 900);
  }
  function next() {
    newRound();
    PP.modal("stats", false);
    render();
  }
  function save() {
    PP.save("state:" + GAME, st);
    render();
  }
  function showStats(last) {
    PP.renderStats(document.getElementById("statsBody"), GAME, TRIES, last);
    PP.modal("stats", true);
  }
  function toggleOut(d) {
    st.out = st.out.includes(d) ? st.out.filter((x) => x !== d) : st.out.concat(d);
    save();
  }

  for (const d of "1234567890") {
    const b = document.createElement("button");
    b.className = "key";
    b.dataset.d = d;
    b.textContent = d;
    let timer = null, long = false;
    b.addEventListener("pointerdown", () => { long = false; timer = setTimeout(() => { long = true; toggleOut(d); }, 450); });
    b.addEventListener("pointerup", () => clearTimeout(timer));
    b.addEventListener("pointerleave", () => clearTimeout(timer));
    b.addEventListener("click", () => { if (!long) press(d); });
    b.addEventListener("contextmenu", (e) => { e.preventDefault(); if (!long) toggleOut(d); });
    padEl.appendChild(b);
  }
  document.getElementById("back").addEventListener("click", back);
  document.getElementById("enter").addEventListener("click", submit);
  document.getElementById("nextBtn").addEventListener("click", next);
  document.getElementById("statsBtn").addEventListener("click", () => showStats(null));
  document.getElementById("opts").addEventListener("click", (e) => {
    const b = e.target.closest("[data-len]");
    if (!b) return;
    const n = +b.dataset.len;
    if (n === st.len) return;
    if (st.guesses.length && !st.done && !confirm("Start a new code with a different length? This round won't count.")) return;
    len = n;
    PP.save("len:" + GAME, len);
    newRound();
    render();
  });
  document.addEventListener("keydown", (e) => {
    if (/^[0-9]$/.test(e.key)) press(e.key);
    else if (e.key === "Backspace") back();
    else if (e.key === "Enter") { e.preventDefault(); submit(); }
  });

  render();
  if (!PP.load("seenHelp:" + GAME, false)) {
    PP.modal("help", true);
    PP.save("seenHelp:" + GAME, true);
  }
})();
