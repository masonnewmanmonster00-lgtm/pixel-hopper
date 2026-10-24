(function () {
  "use strict";

  const PAIRS = [
    [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
    [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]
  ];

  const HELP = {
    easy: "I = 1, V = 5, X = 10. When a smaller value comes first, subtract: IV is 5 − 1 = 4, and IX is 10 − 1 = 9.",
    medium: "Add the letters. L = 50 and C = 100. XL is 50 − 10 = 40, and XC is 100 − 10 = 90.",
    hard: "No chart. I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, M = 1000. A smaller value before a larger one is subtracted, as in CM = 900 and CD = 400."
  };

  const CHARTS = {
    easy: [["I", "1"], ["V", "5"], ["X", "10"]],
    medium: [["I", "1"], ["V", "5"], ["X", "10"], ["L", "50"], ["C", "100"]]
  };

  let session = null;

  function toRoman(n) {
    let out = "";
    let left = n;
    PAIRS.forEach(function (pair) {
      while (left >= pair[0]) {
        out += pair[1];
        left -= pair[0];
      }
    });
    return out;
  }

  function nearby(n, lo, hi) {
    const vals = [n];
    let distance = 1;
    while (vals.length < 4 && distance < 40) {
      [n + distance, n - distance].forEach(function (value) {
        if (vals.length >= 4) return;
        if (value < lo || value > hi || vals.indexOf(value) !== -1) return;
        vals.push(value);
      });
      distance += 1;
    }
    return vals;
  }

  function make(n, lo, hi, toRomanPrompt) {
    const roman = toRoman(n);
    if (toRomanPrompt) {
      const choices = Edu.shuffle(nearby(n, lo, hi).map(function (value) {
        return { label: String(value), value: String(value) };
      }));
      return {
        ask: "What number is " + roman + "?",
        answer: String(n),
        fact: roman + " = " + n + ".",
        choices: choices,
        chart: true
      };
    }
    const choices = Edu.shuffle(nearby(n, lo, hi).map(function (value) {
      return { label: toRoman(value), value: toRoman(value) };
    }));
    return {
      ask: "How do you write " + n + " in Roman numerals?",
      answer: roman,
      fact: n + " is written " + roman + ".",
      choices: choices,
      chart: true
    };
  }

  function questions(level) {
    let pool;
    let lo;
    let hi;
    if (level === "easy") {
      pool = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      lo = 1;
      hi = 12;
    } else if (level === "medium") {
      pool = [4, 9, 14, 15, 19, 20, 24, 29, 34, 40, 44, 49, 50, 54, 60, 74, 80, 90, 94, 99];
      lo = 1;
      hi = 100;
    } else {
      pool = [4, 9, 40, 90, 400, 444, 500, 900, 999, 1000, 1066, 1492, 1666, 1994, 2000, 2024];
      lo = 1;
      hi = 3000;
    }
    return Edu.shuffle(pool).slice(0, 8).map(function (n) {
      return make(n, lo, hi, Math.random() < 0.5);
    });
  }

  function draw(stage, item, level) {
    const rows = CHARTS[level];
    if (!rows) return;
    const list = Lab.el("ul", "chart");
    rows.forEach(function (row) {
      list.appendChild(Lab.el("li", "", row[0] + " = " + row[1]));
    });
    stage.appendChild(list);
    item.chart = true;
  }

  function start(level, api) {
    if (session) session.stop();
    session = Lab.round(api, {
      help: HELP[level],
      note: "You finished 8 Roman numerals.",
      questions: questions(level),
      draw: function (stage, item) { draw(stage, item, level); },
      again: function () { start(api.level, api); }
    });
  }

  Edu.bind("roman", start);
})();
