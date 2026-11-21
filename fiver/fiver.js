(function () {
  const ROWS = 6, LEN = 5, GAME = "fiver";
  const ANSWERS = window.WORDS.answers;
  const VALID = new Set(window.WORDS.guesses);
  ANSWERS.forEach((w) => VALID.add(w));
  const deck = PP.Deck(GAME, ANSWERS.length);

  const boardEl = document.getElementById("board");
  const kbEl = document.getElementById("keyboard");
  const resultEl = document.getElementById("result");
  const resultText = document.getElementById("resultText");
  const hardEl = document.getElementById("hard");
  const subEl = document.getElementById("sub");

  // Game state is saved so a refresh resumes the same round.
  let st = PP.load("state:" + GAME, null);
  if (!st || st.idx !== deck.current()) newRound();
  hardEl.checked = !!PP.load("hard:" + GAME, false);

  function newRound() {
    st = { idx: deck.current(), guesses: [], cur: "", done: false, won: false };
    PP.save("state:" + GAME, st);
  }
  function answer() { return ANSWERS[st.idx]; }

  // Score a guess. Handles repeated letters: each letter in the answer can
  // only be "used" once, exact matches first.
  function score(guess, ans) {
    const res = Array(LEN).fill("miss");
    const left = {};
    for (let i = 0; i < LEN; i++) {
      if (guess[i] === ans[i]) res[i] = "hit";
      else left[ans[i]] = (left[ans[i]] || 0) + 1;
    }
    for (let i = 0; i < LEN; i++) {
      if (res[i] !== "hit" && left[guess[i]] > 0) {
        res[i] = "near";
        left[guess[i]] -= 1;
      }
    }
    return res;
  }

  // Hard mode: every revealed clue must be used in later guesses.
  function hardModeProblem(guess) {
    const ans = answer();
    for (const g of st.guesses) {
      const sc = score(g, ans);
      for (let i = 0; i < LEN; i++) {
        if (sc[i] === "hit" && guess[i] !== g[i]) return `Letter ${i + 1} must be ${g[i].toUpperCase()}`;
      }
      const need = {};
      for (let i = 0; i < LEN; i++) if (sc[i] !== "miss") need[g[i]] = (need[g[i]] || 0) + 1;
      for (const ch in need) {
        const have = guess.split("").filter((c) => c === ch).length;
        if (have < need[ch]) return `Guess must contain ${ch.toUpperCase()}`;
      }
    }
    return null;
  }

  // ---------- rendering ----------
  function buildBoard() {
    boardEl.innerHTML = "";
    for (let r = 0; r < ROWS; r++) {
      const row = document.createElement("div");
      row.className = "row";
      for (let c = 0; c < LEN; c++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        row.appendChild(cell);
      }
      boardEl.appendChild(row);
    }
  }
  function render() {
    const ans = answer();
    const rows = boardEl.children;
    for (let r = 0; r < ROWS; r++) {
      const word = r < st.guesses.length ? st.guesses[r] : r === st.guesses.length ? st.cur : "";
      const sc = r < st.guesses.length ? score(word, ans) : null;
      for (let c = 0; c < LEN; c++) {
        const cell = rows[r].children[c];
        const ch = word[c] || "";
        cell.textContent = ch;
        cell.className = "cell" + (sc ? " " + sc[c] : ch ? " filled" : "");
      }
    }
    // keyboard colours: hit beats near beats miss
    const best = {};
    const rank = { miss: 1, near: 2, hit: 3 };
    for (const g of st.guesses) {
      score(g, ans).forEach((s, i) => {
        if (!best[g[i]] || rank[s] > rank[best[g[i]]]) best[g[i]] = s;
      });
    }
    kbEl.querySelectorAll(".key[data-k]").forEach((k) => {
      const ch = k.dataset.k;
      k.className = "key" + (ch.length > 1 ? " wide" : "") + (best[ch] ? " " + best[ch] : "");
    });
    hardEl.disabled = st.guesses.length > 0 && !st.done;
    subEl.textContent = `Word ${ANSWERS.length - deck.left() + 1} of ${ANSWERS.length}` + (deck.round() > 1 ? ` · round ${deck.round()}` : "");
    if (st.done) {
      resultEl.classList.remove("hidden");
      resultText.innerHTML = st.won
        ? `Got it in ${st.guesses.length}! The word was <b>${ans.toUpperCase()}</b>.`
        : `The word was <b>${ans.toUpperCase()}</b>.`;
    } else {
      resultEl.classList.add("hidden");
    }
  }
  function buildKeyboard() {
    const rows = ["qwertyuiop", "asdfghjkl", "+zxcvbnm-"];
    kbEl.innerHTML = "";
    rows.forEach((r) => {
      const row = document.createElement("div");
      row.className = "krow";
      for (const ch of r) {
        const b = document.createElement("button");
        const k = ch === "+" ? "enter" : ch === "-" ? "back" : ch;
        b.dataset.k = k;
        b.className = "key" + (k.length > 1 ? " wide" : "");
        b.textContent = k === "enter" ? "Enter" : k === "back" ? "⌫" : ch;
        b.setAttribute("aria-label", k);
        row.appendChild(b);
      }
      kbEl.appendChild(row);
    });
  }

  // ---------- input ----------
  function press(k) {
    if (st.done) {
      if (k === "enter") next();
      return;
    }
    if (k === "back") st.cur = st.cur.slice(0, -1);
    else if (k === "enter") return submit();
    else if (/^[a-z]$/.test(k) && st.cur.length < LEN) st.cur += k;
    PP.save("state:" + GAME, st);
    render();
  }
  function shake(msg) {
    PP.toast(msg);
    const row = boardEl.children[st.guesses.length];
    row.classList.remove("shake");
    void row.offsetWidth;
    row.classList.add("shake");
  }
  function submit() {
    const g = st.cur;
    if (g.length < LEN) return shake("Not enough letters");
    if (!VALID.has(g)) return shake("Not in the word list");
    if (hardEl.checked) {
      const p = hardModeProblem(g);
      if (p) return shake(p);
    }
    st.guesses.push(g);
    st.cur = "";
    if (g === answer()) finish(true);
    else if (st.guesses.length === ROWS) finish(false);
    PP.save("state:" + GAME, st);
    render();
  }
  function finish(won) {
    st.done = true;
    st.won = won;
    PP.recordResult(GAME, won, st.guesses.length, ROWS);
    PP.toast(won ? ["Genius!", "Brilliant!", "Great!", "Nice!", "Solid.", "Phew!"][st.guesses.length - 1] : answer().toUpperCase(), 1800);
    setTimeout(() => showStats(won ? st.guesses.length : null), 1300);
  }
  function next() {
    deck.advance();
    newRound();
    PP.modal("stats", false);
    render();
  }
  function showStats(last) {
    PP.renderStats(document.getElementById("statsBody"), GAME, ROWS, last);
    document.getElementById("deckInfo").textContent =
      `${deck.left()} new words left before the list reshuffles.`;
    PP.modal("stats", true);
  }

  kbEl.addEventListener("click", (e) => {
    const b = e.target.closest(".key");
    if (b) { press(b.dataset.k); b.blur(); }
  });
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const openModal = document.querySelector(".modal-back.open");
    if (openModal) {
      if (e.key === "Enter" || e.key === "Escape") {
        e.preventDefault();
        if (st.done && e.key === "Enter") next();
        else openModal.classList.remove("open");
      }
      return;
    }
    if (e.key === "Enter") { e.preventDefault(); press("enter"); }
    else if (e.key === "Backspace") press("back");
    else if (/^[a-zA-Z]$/.test(e.key)) press(e.key.toLowerCase());
  });
  document.getElementById("nextBtn").addEventListener("click", next);
  document.getElementById("statsBtn").addEventListener("click", () => showStats(null));
  document.getElementById("giveUp").addEventListener("click", () => {
    if (st.done) return;
    if (!confirm("Give up and see the word? This counts as a loss.")) return;
    finish(false);
    PP.save("state:" + GAME, st);
    render();
  });
  hardEl.addEventListener("change", () => PP.save("hard:" + GAME, hardEl.checked));

  buildBoard();
  buildKeyboard();
  render();
  if (!PP.load("seenHelp:" + GAME, false)) {
    PP.modal("help", true);
    PP.save("seenHelp:" + GAME, true);
  }
})();
