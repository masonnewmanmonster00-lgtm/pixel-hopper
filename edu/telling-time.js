(function () {
  "use strict";

  const HELP = {
    easy: "Times on the hour, like 3 o'clock.",
    medium: "O'clock, quarter past, half past, and quarter to.",
    hard: "Times to the nearest five minutes, written as 6:25."
  };
  const TOTAL = 10;
  let session = null;

  function shiftHour(h, d) {
    let n = h + d;
    while (n > 12) n -= 12;
    while (n < 1) n += 12;
    return n;
  }

  function format(h, m, level) {
    if (level === "hard") return h + ":" + String(m).padStart(2, "0");
    if (m === 0) return h + " o'clock";
    if (m === 15) return "quarter past " + h;
    if (m === 30) return "half past " + h;
    if (m === 45) return "quarter to " + shiftHour(h, 1);
    return h + ":" + String(m).padStart(2, "0");
  }

  function randomTime(level, seen) {
    for (let guard = 0; guard < 40; guard++) {
      const h = Edu.rand(1, 12);
      let m = 0;
      if (level === "medium") m = Edu.pick([0, 15, 30, 45]);
      if (level === "hard") m = Edu.rand(0, 11) * 5;
      const key = h + ":" + m;
      if (!seen[key]) {
        seen[key] = true;
        return { h: h, m: m };
      }
    }
    return { h: 3, m: 0 };
  }

  function distractors(h, m, level, correct) {
    const pairs = [];
    if (level === "easy") {
      pairs.push([shiftHour(h, 1), 0], [shiftHour(h, -1), 0], [shiftHour(h, 2), 0], [shiftHour(h, 3), 0]);
    } else if (level === "medium") {
      pairs.push([h, 0], [h, 15], [h, 30], [h, 45], [shiftHour(h, 1), m], [shiftHour(h, -1), m]);
    } else {
      const m2 = (m + 5) % 60;
      const m3 = (m + 55) % 60;
      pairs.push([h, m2], [h, m3], [shiftHour(h, 1), m], [shiftHour(h, -1), m], [shiftHour(h, 1), m2]);
    }
    const labels = [];
    const used = {};
    used[correct] = true;
    pairs.forEach(function (pair) {
      const label = format(pair[0], pair[1], level);
      if (used[label] || labels.length >= 3) return;
      used[label] = true;
      labels.push(label);
    });
    let guard = 0;
    while (labels.length < 3 && guard < 20) {
      guard += 1;
      const label = format(Edu.rand(1, 12), level === "hard" ? Edu.rand(0, 11) * 5 : Edu.pick([0, 15, 30, 45]), level);
      if (!used[label]) {
        used[label] = true;
        labels.push(label);
      }
    }
    return labels;
  }

  function clockSvg(h, m) {
    const hourAngle = (h % 12) * 30 + m * 0.5;
    const minuteAngle = m * 6;
    let numbers = "";
    for (let n = 1; n <= 12; n++) {
      const a = ((n * 30 - 90) * Math.PI) / 180;
      const x = 100 + Math.cos(a) * 74;
      const y = 100 + Math.sin(a) * 74;
      numbers += '<text x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" text-anchor="middle" dominant-baseline="middle" font-size="15" font-weight="700" fill="#1c2430">' + n + "</text>";
    }
    let ticks = "";
    for (let n = 0; n < 60; n++) {
      const a = (n * 6 * Math.PI) / 180;
      const inner = n % 5 === 0 ? 84 : 90;
      const x1 = 100 + Math.sin(a) * inner;
      const y1 = 100 - Math.cos(a) * inner;
      const x2 = 100 + Math.sin(a) * 94;
      const y2 = 100 - Math.cos(a) * 94;
      ticks += '<line x1="' + x1.toFixed(1) + '" y1="' + y1.toFixed(1) + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) + '" stroke="#1c2430" stroke-width="' + (n % 5 === 0 ? 2 : 1) + '"/>';
    }
    return (
      '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Analog clock">' +
      '<circle cx="100" cy="100" r="96" fill="#fffdf8" stroke="#1c2430" stroke-width="4"/>' +
      ticks + numbers +
      '<line x1="100" y1="108" x2="100" y2="52" stroke="#1c2430" stroke-width="7" stroke-linecap="round" transform="rotate(' + hourAngle + ' 100 100)"/>' +
      '<line x1="100" y1="112" x2="100" y2="28" stroke="#ef6f4c" stroke-width="4" stroke-linecap="round" transform="rotate(' + minuteAngle + ' 100 100)"/>' +
      '<circle cx="100" cy="100" r="5" fill="#1c2430"/>' +
      "</svg>"
    );
  }

  function run(level, api) {
    const flag = { stopped: false, timers: [] };
    const seen = {};
    let index = 0;
    let streak = 0;
    const stage = document.getElementById("stage");
    const help = document.getElementById("help");
    if (help) help.textContent = HELP[level];
    api.resetScore();
    api.status("");

    function show() {
      if (flag.stopped) return;
      if (index >= TOTAL) {
        Edu.finish(stage, {
          title: "Time is up — in a good way",
          score: api.score,
          best: api.best,
          note: "You read 10 clocks.",
          win: true,
          onAgain: function () { start(api.level, api); }
        });
        return;
      }
      const time = randomTime(level, seen);
      const answer = format(time.h, time.m, level);
      const labels = Edu.shuffle([answer].concat(distractors(time.h, time.m, level, answer)));
      let locked = false;
      stage.innerHTML = "";
      const progress = document.createElement("p");
      progress.className = "progress";
      progress.textContent = "Clock " + (index + 1) + " of " + TOTAL;
      const wrap = document.createElement("div");
      wrap.className = "clock-wrap";
      wrap.innerHTML = clockSvg(time.h, time.m);
      const question = document.createElement("p");
      question.className = "question";
      question.textContent = "What time does this clock show?";
      stage.appendChild(progress);
      stage.appendChild(wrap);
      stage.appendChild(question);
      const buttons = Edu.choices(stage, labels.map(function (label) {
        return { label: label, value: label };
      }), function (choice, btn, all) {
        if (locked || flag.stopped) return;
        locked = true;
        all.forEach(function (b) { b.disabled = true; });
        const ok = choice.value === answer;
        btn.classList.add(ok ? "good" : "bad");
        if (!ok) {
          all.forEach(function (b) {
            if (b.textContent === answer) b.classList.add("good");
          });
          streak = 0;
          api.beep("no");
          api.status("This clock says " + answer + ".", "bad");
        } else {
          streak += 1;
          api.add(api.points() + Math.max(0, streak - 1) * 2);
          api.beep("ok");
          api.status("Yes! " + answer + ".", "good");
        }
        index += 1;
        const row = document.createElement("div");
        row.className = "actions";
        const next = document.createElement("button");
        next.type = "button";
        next.className = "textbtn go";
        next.textContent = index >= TOTAL ? "See score" : "Next clock";
        next.addEventListener("click", show);
        row.appendChild(next);
        stage.appendChild(row);
        next.focus();
      });
      function onKey(e) {
        if (locked || flag.stopped) return;
        const n = Number(e.key);
        if (n >= 1 && n <= buttons.length) buttons[n - 1].click();
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

  Edu.bind("clock", start);
})();
