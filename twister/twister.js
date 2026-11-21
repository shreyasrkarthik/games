(function () {
  const GAME = "twister", LEN = 5, MAXHINT = LEN - 1;
  const ANSWERS = window.WORDS.answers;
  const VALID = new Set(window.WORDS.guesses);
  ANSWERS.forEach((w) => VALID.add(w));
  const deck = PP.Deck(GAME, ANSWERS, GAME);

  const ansEl = document.getElementById("answer");
  const letEl = document.getElementById("letters");
  const resultEl = document.getElementById("result");

  let st = PP.load("state:" + GAME, null);
  const fresh = !st || st.word !== deck.current() || (!st.hints && st.slots.every((x) => x === null) && PP.solvedLocal(GAME).has(st.word));
  if (fresh) { deck.skipSolved(); newRound(); }

  function word() { return st.word; }
  function sortKey(w) { return w.split("").sort().join(""); }
  function scramble(w) {
    let s = w;
    for (let t = 0; t < 30 && VALID.has(s); t++) s = PP.shuffle(w.split("")).join("");
    return s.split("");
  }
  function newRound() {
    const w = deck.current();
    st = { word: w, letters: scramble(w), slots: Array(LEN).fill(null), locked: [], hints: 0, done: false, won: false };
    PP.save("state:" + GAME, st);
  }
  function usedTiles() { return new Set(st.slots.filter((x) => x !== null)); }
  function current() { return st.slots.map((t) => (t === null ? "" : st.letters[t])).join(""); }

  function render() {
    const used = usedTiles();
    ansEl.innerHTML = "";
    st.slots.forEach((t, i) => {
      const d = document.createElement("div");
      d.className = "slot" + (st.locked.includes(i) ? " locked" : "") + (st.done && st.won ? " solved" : "");
      d.textContent = st.done && !st.won ? word()[i] : t === null ? "" : st.letters[t];
      d.addEventListener("click", () => unplace(i));
      ansEl.appendChild(d);
    });
    letEl.innerHTML = "";
    st.letters.forEach((ch, i) => {
      const b = document.createElement("button");
      b.className = "tile" + (used.has(i) ? " used" : "");
      b.textContent = ch;
      b.disabled = used.has(i) || st.done;
      b.addEventListener("click", () => place(i));
      letEl.appendChild(b);
    });
    document.getElementById("sub").textContent =
      `Word ${deck.total() - deck.left() + 1} of ${deck.total()}` + (st.hints ? ` · ${st.hints} hint${st.hints > 1 ? "s" : ""} used` : "");
    document.getElementById("hint").disabled = st.done || st.hints >= MAXHINT;
    ["mix", "clear", "skip"].forEach((id) => (document.getElementById(id).disabled = st.done));
    resultEl.classList.toggle("hidden", !st.done);
    if (st.done) {
      const w = word().toUpperCase();
      const got = current();
      document.getElementById("resultText").innerHTML = st.won
        ? got === word()
          ? `Solved: <b>${w}</b>` + (st.hints ? ` with ${st.hints} hint${st.hints > 1 ? "s" : ""}.` : ", no hints!")
          : `<b>${got.toUpperCase()}</b> works too! The word I had was <b>${w}</b>.`
        : `The word was <b>${w}</b>.`;
    }
  }

  function place(tile) {
    if (st.done || usedTiles().has(tile)) return;
    const i = st.slots.indexOf(null);
    if (i < 0) return;
    st.slots[i] = tile;
    check();
  }
  function unplace(i) {
    if (st.done || st.locked.includes(i) || st.slots[i] === null) return;
    st.slots[i] = null;
    save();
  }
  function placeLetter(ch) {
    const used = usedTiles();
    const tile = st.letters.findIndex((c, i) => c === ch && !used.has(i));
    if (tile >= 0) place(tile);
  }
  function backspace() {
    for (let i = LEN - 1; i >= 0; i--) {
      if (st.slots[i] !== null && !st.locked.includes(i)) { st.slots[i] = null; break; }
    }
    save();
  }
  function clear() {
    st.slots = st.slots.map((t, i) => (st.locked.includes(i) ? t : null));
    save();
  }
  function hint() {
    if (st.done || st.hints >= MAXHINT) return;
    clear();
    const w = word();
    const pos = [...Array(LEN).keys()].find((i) => !st.locked.includes(i));
    const used = usedTiles();
    const tile = st.letters.findIndex((c, i) => c === w[pos] && !used.has(i));
    st.slots[pos] = tile;
    st.locked.push(pos);
    st.hints += 1;
    save();
  }
  function check() {
    const g = current();
    if (g.length === LEN) {
      if (g === word() || (VALID.has(g) && sortKey(g) === sortKey(word()))) {
        st.done = true;
        st.won = true;
        PP.addSolved(GAME, word());
        PP.recordResult(GAME, true, st.hints + 1, LEN);
        PP.toast(st.hints ? "Solved!" : "Clean solve!");
      } else {
        PP.toast("Not a word, try again");
        ansEl.classList.remove("shake");
        void ansEl.offsetWidth;
        ansEl.classList.add("shake");
      }
    }
    save();
  }
  function giveUp() {
    if (st.done) return;
    st.done = true;
    st.won = false;
    PP.recordResult(GAME, false, 1, LEN);
    save();
  }
  function next() {
    deck.advance();
    newRound();
    render();
  }
  function save() {
    PP.save("state:" + GAME, st);
    render();
  }
  function mix() {
    // shuffle tiles but keep already-placed letters where they are
    const placed = st.slots.map((t) => (t === null ? null : st.letters[t]));
    st.letters = PP.shuffle(st.letters);
    const taken = new Set();
    st.slots = placed.map((ch) => {
      if (ch === null) return null;
      const i = st.letters.findIndex((c, k) => c === ch && !taken.has(k));
      taken.add(i);
      return i;
    });
    save();
  }

  document.getElementById("mix").addEventListener("click", mix);
  document.getElementById("clear").addEventListener("click", clear);
  document.getElementById("hint").addEventListener("click", hint);
  document.getElementById("skip").addEventListener("click", () => {
    if (confirm("Give up and see the word? This resets your streak.")) giveUp();
  });
  document.getElementById("nextBtn").addEventListener("click", next);
  document.getElementById("statsBtn").addEventListener("click", () => {
    PP.renderStats(document.getElementById("statsBody"), GAME, LEN, null);
    PP.modal("stats", true);
  });
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === "Enter" && st.done) { e.preventDefault(); next(); }
    else if (e.key === "Backspace") backspace();
    else if (e.key === " ") { e.preventDefault(); mix(); }
    else if (/^[a-zA-Z]$/.test(e.key)) placeLetter(e.key.toLowerCase());
  });

  render();
  if (!PP.load("seenHelp:" + GAME, false)) {
    PP.modal("help", true);
    PP.save("seenHelp:" + GAME, true);
  }
})();
