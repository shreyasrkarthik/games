# Puzzle Pantry

Unlimited word and logic games. Plain HTML, CSS and JavaScript, no build step, works on GitHub Pages.

## Games

- **Fiver** (`fiver/`): find the hidden 5-letter word in 6 guesses. Optional hard mode.
- **Lockpick** (`digits/`): crack a 3, 4 or 5-digit code from hit and near-miss pegs, in 10 tries.
- **Twister** (`twister/`): unscramble five letters into a word, with hints.
- **Rungs** (`rungs/`): word ladder. Go from one 4-letter word to another, one letter at a time. Every pair is random and checked solvable by breadth-first search; par is the shortest route.
- **Long Tail** (`longtail/`): name something in a category in 30 seconds. Rarer answers score more (10/30/60/100). Categories and tiers live in `data/longtail.js`.

## How words avoid repeating

`data/words.js` holds 1,800 common 5-letter answer words and a larger list of about 12,600 accepted guesses.
Each game keeps a shuffled "deck" of the answer list in `localStorage` (`js/common.js`, `Deck`).
A word is only dealt again after the whole list has been played on that browser, then the list reshuffles.

Solved words (Fiver, Twister) and climbed ladders (Rungs) are skipped for good on that browser.
To carry them to another device, use **Sync solved words** on the home page: copy the list on one device, paste it on the other.
To retire words everywhere, add them to `data/solved.js`.

Stats and the current round are saved per browser in `localStorage`.

## Run locally

Open `index.html` in a browser, or run `python3 -m http.server` in this folder and visit http://localhost:8000.

## Adding a game

Make a folder with an `index.html`, load `../css/common.css` and `../js/common.js`, and add a tile to the home page `index.html`.
