(function () {
  "use strict";

  const HELP = {
    easy: "Add and subtract within 10. Ten problems.",
    medium: "Add, subtract, and multiply smaller numbers.",
    hard: "Mix in bigger facts and division. The timer is shorter."
  };
  const LIMIT = { easy: 30, medium: 20, hard: 12 };
  const TOTAL = 10;
  let session = null;

  function problem(level) {
    if (level === "easy") {
      if (Math.random() < 0.5) {
        const a = Edu.rand(0, 10);
        const b = Edu.rand(0, 10);
        return { text: a + " + " + b, answer: a + b };
      }
      const a = Edu.rand(0, 10);
      const b = Edu.rand(0, a);
      return { text: a + " − " + b, answer: a - b };
    }
    if (level === "medium") {
      const roll = Math.random();
      if (roll < 0.34) {
        const a = Edu.rand(0, 20);
        const b = Edu.rand(0, 20);
        return { text: a + " + " + b, answer: a + b };
      }
      if (roll < 0.67) {
        const a = Edu.rand(0, 20);
        const b = Edu.rand(0, a);
        return { text: a + " − " + b, answer: a - b };
      }
      const a = Edu.rand(0, 9);
      const b = Edu.rand(0, 5);
      return { text: a + " × " + b, answer: a * b };
    }
    const roll = Math.random();
    if (roll < 0.28) {
      const a = Edu.rand(2, 12);
      const b = Edu.rand(2, 12);
      return { text: (a * b) + " ÷ " + b, answer: a };
    }
    if (roll < 0.58) {
      const a = Edu.rand(2, 12);
      const b = Edu.rand(2, 12);
      return { text: a + " × " + b, answer: a * b };
    }
    if (roll < 0.8) {
      const a = Edu.rand(10, 40);
      const b = Edu.rand(0, 30);
      return { text: a + " + " + b, answer: a + b };
    }
    const a = Edu.rand(10, 50);
    const b = Edu.rand(0, a);
    return { text: a + " − " + b, answer: a - b };
  }

  function optionsFor(answer) {
    const used = { [answer]: true };
    const found = [];
    const seeds = Edu.shuffle([answer + 1, answer - 1, answer + 2, answer - 2, answer + 10, answer - 10, answer + 5, answer + 3, answer + 4]);
    seeds.forEach(function (n) {
      if (found.length >= 3) return;
      if (!Number.isFinite(n) || n < 0 || used[n]) return;
      used[n] = true;
      found.push(n);
    });
    let guard = 0;
    while (found.length < 3 && guard < 30) {
      guard += 1;
      const n = Math.max(0, answer + Edu.rand(1, 9));
      if (!used[n]) {
        used[n] = true;
        found.push(n);
      }
    }
    return Edu.shuffle([answer].concat(found)).map(function (n) {
      return { label: String(n), value: n };
    });
  }

  function run(level, api) {
    const flag = { stopped: false, timers: [] };
    let index = 0;
    let streak = 0;
    let locked = false;
    let clock = null;
    const help = document.getElementById("help");
    const stage = document.getElementById("stage");
    if (help) help.textContent = HELP[level];
    api.resetScore();
    api.status("");

    function stopClock() {
      if (clock) clearInterval(clock);
      clock = null;
    }

    function show() {
      stopClock();
      if (flag.stopped) return;
      if (index >= TOTAL) {
        Edu.finish(stage, {
          title: "Nice work",
          score: api.score,
          best: api.best,
          note: "You finished 10 problems.",
          win: true,
          onAgain: function () { start(api.level, api); }
        });
        return;
      }
      locked = false;
      const item = problem(level);
      let left = LIMIT[level];
      stage.innerHTML = "";
      const progress = document.createElement("p");
      progress.className = "progress";
      progress.textContent = "Problem " + (index + 1) + " of " + TOTAL;
      const prompt = document.createElement("p");
      prompt.className = "prompt";
      prompt.textContent = item.text;
      const time = document.createElement("p");
      time.className = "sub";
      time.textContent = left + " seconds";
      stage.appendChild(progress);
      stage.appendChild(prompt);
      stage.appendChild(time);
      const buttons = Edu.choices(stage, optionsFor(item.answer), function (choice, btn, all) {
        if (locked || flag.stopped) return;
        locked = true;
        stopClock();
        all.forEach(function (b) { b.disabled = true; });
        const ok = choice.value === item.answer;
        btn.classList.add(ok ? "good" : "bad");
        if (!ok) {
          all.forEach(function (b) {
            if (Number(b.textContent) === item.answer) b.classList.add("good");
          });
          streak = 0;
          api.beep("no");
          api.status("The answer is " + item.answer + ".", "bad");
        } else {
          streak += 1;
          api.add(api.points() + Math.max(0, streak - 1) * 2);
          api.beep("ok");
          api.status(streak > 1 ? "Yes! Streak of " + streak + "." : "Yes!", "good");
        }
        index += 1;
        Edu.later(flag, show, ok ? 750 : 1400);
      });
      function onKey(e) {
        if (flag.stopped || locked) return;
        const n = Number(e.key);
        if (n >= 1 && n <= buttons.length) buttons[n - 1].click();
      }
      document.addEventListener("keydown", onKey);
      flag.timers.push(setTimeout(function () {}, 0));
      const keyTimer = { remove: function () { document.removeEventListener("keydown", onKey); } };
      flag.timers.push(keyTimer);
      clock = setInterval(function () {
        if (flag.stopped || locked) return;
        left -= 1;
        time.textContent = left + " seconds";
        if (left > 0) return;
        locked = true;
        stopClock();
        streak = 0;
        buttons.forEach(function (b) {
          b.disabled = true;
          if (Number(b.textContent) === item.answer) b.classList.add("good");
        });
        api.beep("no");
        api.status("Time is up. The answer is " + item.answer + ".", "bad");
        index += 1;
        Edu.later(flag, show, 1400);
      }, 1000);

      const prevStop = flag.extraStop;
      flag.extraStop = function () {
        document.removeEventListener("keydown", onKey);
        if (prevStop) prevStop();
      };
    }

    show();
    return {
      stop() {
        flag.stopped = true;
        stopClock();
        flag.timers.forEach(function (id) {
          if (typeof id === "number") clearTimeout(id);
        });
        if (flag.extraStop) flag.extraStop();
      }
    };
  }

  function start(level, api) {
    if (session) session.stop();
    session = run(level, api);
  }

  Edu.bind("math", start);
})();
