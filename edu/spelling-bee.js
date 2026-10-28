(function () {
  "use strict";

  const HELP = {
    easy: "Short words. The first letter is filled in. Tap the rest in order.",
    medium: "Five-letter words, with a few extra letters in the bank.",
    hard: "Longer words and more extra letters."
  };

  const WORDS = {
    easy: [
      ["cat", "A pet that says meow", "🐱"],
      ["dog", "A pet that barks", "🐶"],
      ["sun", "It lights the day", "🌞"],
      ["bee", "An insect that makes honey", "🐝"],
      ["hat", "You wear it on your head", "🎩"],
      ["pig", "A farm animal that oinks", "🐷"],
      ["bus", "A big ride for many people", "🚌"],
      ["cup", "You drink from it", "☕"],
      ["map", "It helps you find the way", "📍"],
      ["fish", "An animal that swims", "🐟"],
      ["star", "A distant point of light in the night sky", "⭐"],
      ["moon", "Earth's companion that glows at night", "🌙"],
      ["book", "Pages you can read", "📚"],
      ["tree", "A tall plant with a trunk", "🌳"],
      ["cake", "A sweet birthday treat", "🎂"],
      ["bird", "An animal with feathers", "🐦"],
      ["frog", "It hops and says ribbit", "🐸"],
      ["milk", "A white drink", "🥛"],
      ["ball", "You can throw or kick it", "⚽"],
      ["rain", "Water falling from clouds", "💧"]
    ],
    medium: [
      ["apple", "A crunchy fruit", "🍎"],
      ["grape", "A fruit that grows in bunches", "🍇"],
      ["horse", "A big animal people can ride", "🐴"],
      ["tiger", "A big cat with stripes", "🐯"],
      ["house", "A home for people", "🏠"],
      ["plant", "A living thing that grows in soil", "🌱"],
      ["clock", "It tells you the time", "⏰"],
      ["bread", "A food baked from flour", "🍞"],
      ["candy", "A sweet treat", "🍬"],
      ["robot", "A machine that can move", "🤖"],
      ["ocean", "A huge body of salty water", "🌊"],
      ["pizza", "A pie with cheese on top", "🍕"],
      ["queen", "A royal ruler", "👑"],
      ["train", "It rolls along a track", "🚂"],
      ["zebra", "A horse with black and white stripes", "🦓"]
    ],
    hard: [
      ["banana", "A long yellow fruit", "🍌"],
      ["orange", "A round citrus fruit", "🍊"],
      ["flower", "The colorful part of a plant", "🌸"],
      ["rocket", "A machine that flies into space", "🚀"],
      ["turtle", "A reptile with a shell", "🐢"],
      ["monkey", "An animal that climbs and swings", "🐵"],
      ["planet", "A world that orbits a star", "🪐"],
      ["castle", "A stone home with towers", "🏰"],
      ["pencil", "You write or draw with it", "✏️"],
      ["window", "A glass opening in a wall", "🪟"],
      ["bridge", "It carries a road over water", "🌉"],
      ["cookie", "A small sweet baked treat", "🍪"],
      ["butterfly", "An insect with colorful wings", "🦋"],
      ["elephant", "A huge animal with a trunk", "🐘"],
      ["rainbow", "Colors bent across the sky", "🌈"],
      ["volcano", "A mountain that can erupt", "🌋"],
      ["garden", "A place where people grow plants", "🌻"],
      ["school", "A place where kids learn", "🏫"],
      ["friend", "A person you like and trust", "🙂"],
      ["yellow", "A color like the Sun", "🟡"],
      ["purple", "A color made from red and blue", "🟣"],
      ["kitten", "A young cat", "🐱"],
      ["sandwich", "Food stacked between bread", "🥪"],
      ["umbrella", "It keeps rain off your head", "☂️"]
    ]
  };

  const TOTAL = 8;
  let session = null;

  function bankFor(word, decoys, fixed) {
    const letters = word.split("");
    if (fixed) letters.shift();
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    const used = {};
    word.split("").forEach(function (ch) { used[ch] = true; });
    const extra = Edu.shuffle(alphabet.filter(function (ch) { return !used[ch]; })).slice(0, decoys);
    return Edu.shuffle(letters.concat(extra));
  }

  function run(level, api) {
    const flag = { stopped: false, timers: [] };
    const round = Edu.shuffle(WORDS[level] || WORDS.easy).slice(0, TOTAL);
    let index = 0;
    let streak = 0;
    const stage = document.getElementById("stage");
    const help = document.getElementById("help");
    if (help) help.textContent = HELP[level];
    api.resetScore();
    api.status("");

    function show() {
      if (flag.stopped) return;
      if (index >= round.length) {
        Edu.finish(stage, {
          title: "Spelling bee complete",
          score: api.score,
          best: api.best,
          note: "You spelled " + round.length + " words.",
          win: true,
          onAgain: function () { start(api.level, api); }
        });
        return;
      }
      const entry = round[index];
      const word = entry[0].toUpperCase();
      const decoys = level === "hard" ? 3 : level === "medium" ? 2 : 1;
      const fixed = level === "easy";
      let clean = true;
      let built = fixed ? 1 : 0;
      stage.innerHTML = "";
      const progress = document.createElement("p");
      progress.className = "progress";
      progress.textContent = "Word " + (index + 1) + " of " + round.length;
      const emoji = document.createElement("p");
      emoji.className = "emoji";
      emoji.setAttribute("aria-hidden", "true");
      emoji.textContent = entry[2];
      const clue = document.createElement("p");
      clue.className = "clue";
      clue.textContent = entry[1];
      const blanks = document.createElement("div");
      blanks.className = "blanks";
      const slots = [];
      for (let i = 0; i < word.length; i++) {
        const slot = document.createElement("button");
        slot.type = "button";
        slot.className = "blank btn";
        slot.setAttribute("aria-label", "Letter " + (i + 1));
        if (fixed && i === 0) {
          slot.textContent = word[0];
          slot.dataset.ch = word[0];
          slot.classList.add("fixed");
          slot.disabled = true;
        }
        slot.addEventListener("click", function () {
          if (slot.classList.contains("fixed") || !slot.dataset.ch || built !== i + 1) return;
          const ch = slot.dataset.ch;
          slot.textContent = "";
          delete slot.dataset.ch;
          built -= 1;
          const buttons = bank.querySelectorAll("button");
          for (let b = 0; b < buttons.length; b++) {
            if (buttons[b].disabled && buttons[b].dataset.ch === ch) {
              buttons[b].disabled = false;
              break;
            }
          }
        });
        blanks.appendChild(slot);
        slots.push(slot);
      }
      const bank = document.createElement("div");
      bank.className = "bank";
      bank.setAttribute("aria-label", "Letters");

      function check() {
        const guess = slots.map(function (slot) { return slot.dataset.ch || ""; }).join("");
        if (guess === word) {
          const gain = clean ? api.points() + Math.max(0, streak) * 2 : Math.max(5, Math.floor(api.points() / 2));
          if (clean) streak += 1;
          else streak = 0;
          api.add(gain);
          api.beep("ok");
          api.status(clean ? "Spelled!" : "You fixed it.", "good");
          index += 1;
          bank.querySelectorAll("button").forEach(function (btn) { btn.disabled = true; });
          const row = document.createElement("div");
          row.className = "actions";
          const next = document.createElement("button");
          next.type = "button";
          next.className = "textbtn go";
          next.textContent = index >= round.length ? "See score" : "Next word";
          next.addEventListener("click", show);
          row.appendChild(next);
          stage.appendChild(row);
          next.focus();
          return;
        }
        clean = false;
        streak = 0;
        api.beep("no");
        api.status("Not quite. Try the letters again.", "bad");
        blanks.classList.remove("shake");
        void blanks.offsetWidth;
        blanks.classList.add("shake");
        slots.forEach(function (slot, i) {
          if (fixed && i === 0) return;
          slot.textContent = "";
          delete slot.dataset.ch;
        });
        built = fixed ? 1 : 0;
        bank.querySelectorAll("button").forEach(function (btn) { btn.disabled = false; });
      }

      bankFor(word.toLowerCase(), decoys, fixed).forEach(function (ch) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "letter";
        btn.textContent = ch.toUpperCase();
        btn.dataset.ch = ch.toUpperCase();
        btn.addEventListener("click", function () {
          if (btn.disabled || built >= word.length) return;
          slots[built].textContent = btn.dataset.ch;
          slots[built].dataset.ch = btn.dataset.ch;
          btn.disabled = true;
          built += 1;
          if (built === word.length) check();
        });
        bank.appendChild(btn);
      });

      const actions = document.createElement("div");
      actions.className = "actions";
      const undo = document.createElement("button");
      undo.type = "button";
      undo.className = "textbtn";
      undo.textContent = "Undo";
      undo.addEventListener("click", function () {
        if (built <= (fixed ? 1 : 0)) return;
        const slot = slots[built - 1];
        const ch = slot.dataset.ch;
        slot.textContent = "";
        delete slot.dataset.ch;
        built -= 1;
        const buttons = bank.querySelectorAll("button");
        for (let i = 0; i < buttons.length; i++) {
          if (buttons[i].disabled && buttons[i].dataset.ch === ch) {
            buttons[i].disabled = false;
            break;
          }
        }
      });
      const showWord = document.createElement("button");
      showWord.type = "button";
      showWord.className = "textbtn";
      showWord.textContent = "Show word";
      showWord.addEventListener("click", function () {
        streak = 0;
        api.beep("no");
        api.status("The word is " + word + ".", "bad");
        slots.forEach(function (slot, i) {
          slot.textContent = word[i];
          slot.dataset.ch = word[i];
        });
        bank.querySelectorAll("button").forEach(function (btn) { btn.disabled = true; });
        undo.disabled = true;
        showWord.disabled = true;
        index += 1;
        const next = document.createElement("button");
        next.type = "button";
        next.className = "textbtn go";
        next.textContent = index >= round.length ? "See score" : "Next word";
        next.addEventListener("click", show);
        actions.appendChild(next);
      });
      actions.appendChild(undo);
      actions.appendChild(showWord);

      stage.appendChild(progress);
      stage.appendChild(emoji);
      stage.appendChild(clue);
      stage.appendChild(blanks);
      stage.appendChild(bank);
      stage.appendChild(actions);

      function onKey(e) {
        if (flag.stopped) return;
        if (e.key === "Backspace") {
          undo.click();
          e.preventDefault();
          return;
        }
        if (!/^[a-z]$/i.test(e.key) || built >= word.length) return;
        const want = e.key.toUpperCase();
        const buttons = bank.querySelectorAll("button");
        for (let i = 0; i < buttons.length; i++) {
          if (!buttons[i].disabled && buttons[i].dataset.ch === want) {
            buttons[i].click();
            e.preventDefault();
            break;
          }
        }
      }
      document.addEventListener("keydown", onKey);
      const prev = flag.extraStop;
      flag.extraStop = function () {
        document.removeEventListener("keydown", onKey);
        if (prev) prev();
      };
    }

    show();
    return {
      stop() {
        flag.stopped = true;
        if (flag.extraStop) flag.extraStop();
      }
    };
  }

  function start(level, api) {
    if (session) session.stop();
    session = run(level, api);
  }

  Edu.bind("spelling", start);
})();
