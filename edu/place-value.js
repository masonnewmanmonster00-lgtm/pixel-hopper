(function () {
  "use strict";

  const HELP = {
    easy: "A little square is 1. A rod of ten squares is 10. Read the blocks, then type the number.",
    medium: "Build the number. +100 adds a flat, +10 a rod, and +1 a unit. A place holds up to 9.",
    hard: "Cubes are thousands. Also find the value of a digit: a 4 in the hundreds place is worth 400, not 4."
  };

  const META = {
    thousands: { label: "Thousands", kind: "cube" },
    hundreds: { label: "Hundreds", kind: "flat" },
    tens: { label: "Tens", kind: "rod" },
    ones: { label: "Ones", kind: "unit" }
  };

  let session = null;

  function legend(parent) {
    parent.appendChild(Lab.el("p", "legend", "Unit = 1 · Rod = 10 · Flat = 100 · Cube = 1,000"));
  }

  function piece(kind) {
    if (kind === "unit") return Lab.el("i", "unit");
    if (kind === "cube") return Lab.el("div", "cube", "1000");
    if (kind === "rod") {
      const rod = Lab.el("div", "rod");
      for (let i = 0; i < 10; i++) rod.appendChild(Lab.el("i"));
      return rod;
    }
    const flat = Lab.el("div", "flat");
    for (let i = 0; i < 100; i++) flat.appendChild(Lab.el("i"));
    return flat;
  }

  function column(key, count) {
    const meta = META[key];
    const col = Lab.el("div", "pv-col");
    col.appendChild(Lab.el("p", "pv-label", meta.label));
    const pile = Lab.el("div", "pv-pile");
    if (!count) pile.appendChild(Lab.el("p", "pv-empty", "0"));
    for (let i = 0; i < count; i++) pile.appendChild(piece(meta.kind));
    col.appendChild(pile);
    return col;
  }

  function drawBlocks(parent, counts, places) {
    legend(parent);
    const board = Lab.el("div", "block-board");
    places.forEach(function (key) {
      board.appendChild(column(key, counts[key] || 0));
    });
    parent.appendChild(board);
  }

  function easyQuestions() {
    const questions = [];
    const seen = {};
    let guard = 0;
    while (questions.length < 8 && guard < 40) {
      guard += 1;
      const tens = Edu.rand(0, 9);
      const ones = Edu.rand(0, 9);
      if (!tens && !ones) continue;
      const number = tens * 10 + ones;
      if (seen[number]) continue;
      seen[number] = true;
      questions.push({
        counts: { tens: tens, ones: ones },
        places: ["tens", "ones"],
        ask: "What number do these blocks show?",
        answer: String(number),
        keypad: true,
        numeric: true,
        maxDigits: 2,
        fact: tens + (tens === 1 ? " rod = " : " rods = ") + (tens * 10) + ". " + ones + (ones === 1 ? " unit = " : " units = ") + ones + ". Together they make " + number + "."
      });
    }
    return questions;
  }

  function hardQuestions() {
    const questions = [];
    for (let i = 0; i < 4; i++) {
      const counts = {
        thousands: Edu.rand(1, 9),
        hundreds: Edu.rand(0, 9),
        tens: Edu.rand(0, 9),
        ones: Edu.rand(0, 9)
      };
      const number = counts.thousands * 1000 + counts.hundreds * 100 + counts.tens * 10 + counts.ones;
      questions.push({
        counts: counts,
        places: ["thousands", "hundreds", "tens", "ones"],
        ask: "What number do these blocks show?",
        answer: String(number),
        keypad: true,
        numeric: true,
        maxDigits: 4,
        fact: "Cubes are thousands, flats are hundreds, rods are tens, and units are ones. These blocks show " + number + "."
      });
    }
    const names = ["thousands", "hundreds", "tens", "ones"];
    const values = [1000, 100, 10, 1];
    for (let i = 0; i < 4; i++) {
      const number = Edu.rand(1000, 9999);
      const text = String(number);
      const place = Edu.rand(0, 3);
      const digit = text.charAt(place);
      const value = Number(digit) * values[place];
      questions.push({
        numeral: text,
        ask: "In " + text + ", what is the value of the " + names[place] + " digit?",
        answer: String(value),
        keypad: true,
        numeric: true,
        maxDigits: 4,
        fact: "The " + names[place] + " digit is " + digit + ". Its value is " + digit + " × " + values[place] + " = " + value + "."
      });
    }
    return Edu.shuffle(questions);
  }

  function drawQuestion(stage, item) {
    if (item.counts) drawBlocks(stage, item.counts, item.places);
    else legend(stage);
    if (item.numeral) stage.appendChild(Lab.el("p", "prompt", item.numeral));
  }

  function goals() {
    const list = [];
    let guard = 0;
    while (list.length < 6 && guard < 40) {
      guard += 1;
      const number = Edu.rand(1, 999);
      if (list.indexOf(number) === -1) list.push(number);
    }
    return list;
  }

  function build(api) {
    const flag = { stopped: false };
    const help = document.getElementById("help");
    const stage = document.getElementById("stage");
    const targets = goals();
    let index = 0;
    let streak = 0;
    let locked = false;
    if (help) help.textContent = HELP.medium;
    api.resetScore();
    api.status("");

    function show() {
      if (flag.stopped || !stage) return;
      if (index >= targets.length) {
        Edu.finish(stage, {
          title: "Nice work",
          score: api.score,
          best: api.best,
          note: "You built 6 numbers.",
          win: true,
          onAgain: function () { start(api.level, api); }
        });
        return;
      }
      locked = false;
      const goal = targets[index];
      const counts = { hundreds: 0, tens: 0, ones: 0 };
      stage.innerHTML = "";
      stage.appendChild(Lab.el("p", "progress", (index + 1) + " of " + targets.length));
      legend(stage);
      const q = Lab.el("p", "question", "Build " + goal);
      q.setAttribute("data-answer", String(goal));
      stage.appendChild(q);
      const live = Lab.el("p", "prompt", "0");
      live.setAttribute("data-built", "0");
      stage.appendChild(live);
      const host = Lab.el("div", "builder");
      stage.appendChild(host);

      function value() {
        return counts.hundreds * 100 + counts.tens * 10 + counts.ones;
      }

      function paint() {
        host.innerHTML = "";
        ["hundreds", "tens", "ones"].forEach(function (key) {
          const col = column(key, counts[key]);
          const controls = Lab.el("div", "pv-controls");
          const sub = Lab.el("button", "mini", "−" + (key === "hundreds" ? 100 : key === "tens" ? 10 : 1));
          sub.setAttribute("data-sub", key);
          const add = Lab.el("button", "mini", "+" + (key === "hundreds" ? 100 : key === "tens" ? 10 : 1));
          add.setAttribute("data-add", key);
          sub.addEventListener("click", function () {
            if (locked || flag.stopped || counts[key] <= 0) return;
            counts[key] -= 1;
            paint();
          });
          add.addEventListener("click", function () {
            if (locked || flag.stopped) return;
            if (counts[key] >= 9) {
              api.status("Only 9 in a place. Ten here would trade up to the next place.", "bad");
              return;
            }
            counts[key] += 1;
            paint();
          });
          controls.appendChild(sub);
          controls.appendChild(add);
          col.appendChild(controls);
          host.appendChild(col);
        });
        const built = value();
        live.textContent = String(built);
        live.setAttribute("data-built", String(built));
      }

      paint();
      const actions = Lab.el("div", "actions");
      const check = Lab.el("button", "textbtn go", "Check");
      check.setAttribute("data-action", "check");
      check.addEventListener("click", function () {
        if (locked || flag.stopped) return;
        const built = value();
        if (built !== goal) {
          streak = 0;
          api.beep("no");
          api.status("You built " + built + ". Keep going — the number to build is " + goal + ".", "bad");
          return;
        }
        locked = true;
        streak += 1;
        api.add(api.points() + Math.max(0, streak - 1) * 2);
        api.beep("ok");
        api.status(streak > 1 ? "Yes! Streak of " + streak + "." : "Yes!", "good");
        stage.appendChild(Lab.el("p", "fact", goal + " is " + counts.hundreds + " hundreds, " + counts.tens + " tens, and " + counts.ones + " ones."));
        const next = Lab.el("button", "textbtn go", "Next");
        next.setAttribute("data-action", "next");
        next.addEventListener("click", function () {
          if (flag.stopped) return;
          index += 1;
          show();
        });
        actions.appendChild(next);
        check.disabled = true;
      });
      actions.appendChild(check);
      stage.appendChild(actions);
    }

    show();
    return { stop: function () { flag.stopped = true; } };
  }

  function start(level, api) {
    if (session) session.stop();
    if (level === "medium") {
      session = build(api);
      return;
    }
    session = Lab.round(api, {
      help: HELP[level],
      note: level === "hard" ? "You finished 8 place-value questions." : "You read 8 numbers.",
      questions: level === "hard" ? hardQuestions() : easyQuestions(),
      draw: drawQuestion,
      again: function () { start(api.level, api); }
    });
  }

  Edu.bind("place", start);
})();
