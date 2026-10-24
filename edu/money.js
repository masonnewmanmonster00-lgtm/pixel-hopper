(function () {
  "use strict";

  const HELP = {
    easy: "Pennies and nickels. How many cents are in the tray?",
    medium: "Add pennies, nickels, dimes, and quarters.",
    hard: "Coins plus $1 and $5 bills. Answer in cents. A dollar is 100 cents."
  };
  const VALUES = { penny: 1, nickel: 5, dime: 10, quarter: 25, one: 100, five: 500 };
  const NAMES = { penny: "penny", nickel: "nickel", dime: "dime", quarter: "quarter", one: "one-dollar bill", five: "five-dollar bill" };
  const FACE = { penny: "1¢", nickel: "5¢", dime: "10¢", quarter: "25¢", one: "$1", five: "$5" };
  const PLURAL = { penny: "pennies", nickel: "nickels", dime: "dimes", quarter: "quarters", one: "one-dollar bills", five: "five-dollar bills" };
  const ORDER = ["five", "one", "quarter", "dime", "nickel", "penny"];
  const TOTAL = 8;
  let session = null;

  function plural(n, kind) {
    return n + " " + (n === 1 ? NAMES[kind] : PLURAL[kind]);
  }

  function pile(level) {
    const coins = { penny: 0, nickel: 0, dime: 0, quarter: 0, one: 0, five: 0 };
    coins.penny = Edu.rand(0, level === "easy" ? 8 : 4);
    coins.nickel = Edu.rand(0, level === "easy" ? 4 : 3);
    if (level !== "easy") {
      coins.dime = Edu.rand(0, 3);
      coins.quarter = Edu.rand(0, 3);
    }
    if (level === "hard") {
      coins.one = Edu.rand(0, 2);
      coins.five = Math.random() < 0.45 ? 1 : 0;
    }
    let total = 0;
    ORDER.forEach(function (kind) { total += coins[kind] * VALUES[kind]; });
    if (total === 0) {
      coins.penny = 2;
      total = 2;
    }
    return { coins: coins, total: total };
  }

  function legendFor(level) {
    const bits = ["Penny 1¢", "Nickel 5¢"];
    if (level !== "easy") bits.push("Dime 10¢", "Quarter 25¢");
    if (level === "hard") bits.push("$1 = 100¢", "$5 = 500¢");
    return bits.join(" · ");
  }

  function run(level, api) {
    const flag = { stopped: false, timers: [] };
    let index = 0;
    let streak = 0;
    let current = null;
    let pad = null;
    const stage = document.getElementById("stage");
    const help = document.getElementById("help");
    if (help) help.textContent = HELP[level];
    api.resetScore();
    api.status("");

    function show() {
      if (flag.stopped) return;
      if (pad) pad.destroy();
      if (index >= TOTAL) {
        Edu.finish(stage, {
          title: "Register closed",
          score: api.score,
          best: api.best,
          note: "You counted 8 trays.",
          win: true,
          onAgain: function () { start(api.level, api); }
        });
        return;
      }
      current = pile(level);
      let locked = false;
      stage.innerHTML = "";
      const progress = document.createElement("p");
      progress.className = "progress";
      progress.textContent = "Tray " + (index + 1) + " of " + TOTAL;
      const question = document.createElement("p");
      question.className = "question";
      question.textContent = "How many cents is this?";
      const parts = [];
      const tray = document.createElement("div");
      tray.className = "tray";
      ORDER.forEach(function (kind) {
        const count = current.coins[kind];
        if (!count) return;
        parts.push(plural(count, kind));
        for (let i = 0; i < count; i++) {
          const el = document.createElement("div");
          el.className = kind === "one" || kind === "five" ? "bill " + kind : "coin " + kind;
          const span = document.createElement("span");
          span.textContent = FACE[kind];
          el.appendChild(span);
          tray.appendChild(el);
        }
      });
      tray.setAttribute("role", "img");
      tray.setAttribute("aria-label", parts.join(", "));
      const legend = document.createElement("p");
      legend.className = "legend";
      legend.textContent = legendFor(level);
      stage.appendChild(progress);
      stage.appendChild(question);
      stage.appendChild(tray);
      stage.appendChild(legend);
      pad = Edu.keypad(stage, {
        maxDigits: 4,
        format: function (value) { return (value || "0") + "¢"; },
        onSubmit: function (value) {
          if (locked || flag.stopped) return;
          locked = true;
          const n = Number(value);
          const ok = n === current.total;
          if (ok) {
            streak += 1;
            api.add(api.points() + Math.max(0, streak - 1) * 2);
            api.beep("ok");
            api.status("Yes! That is " + current.total + " cents.", "good");
          } else {
            streak = 0;
            api.beep("no");
            api.status("The total is " + current.total + " cents.", "bad");
            pad.shake();
          }
          pad.lock(true);
          index += 1;
          const row = document.createElement("div");
          row.className = "actions";
          const next = document.createElement("button");
          next.type = "button";
          next.className = "textbtn go";
          next.textContent = index >= TOTAL ? "See score" : "Next tray";
          next.addEventListener("click", show);
          row.appendChild(next);
          stage.appendChild(row);
          next.focus();
        }
      });
    }

    show();
    return {
      stop() {
        flag.stopped = true;
        if (pad) pad.destroy();
      }
    };
  }

  function start(level, api) {
    if (session) session.stop();
    session = run(level, api);
  }

  Edu.bind("money", start);
})();
