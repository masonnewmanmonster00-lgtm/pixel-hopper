(function () {
  "use strict";

  const HELP = {
    easy: "Well-known flags. Which country is this?",
    medium: "A bigger set of countries.",
    hard: "Name the capital city for each flag."
  };
  const TOTAL = 10;
  let session = null;

  function poolFor(level) {
    const all = window.EduFlags || [];
    if (level === "easy") return all.filter(function (flag) { return flag.easy; });
    return all.slice();
  }

  function run(level, api) {
    const flag = { stopped: false, timers: [] };
    const round = Edu.shuffle(poolFor(level)).slice(0, TOTAL);
    let index = 0;
    let streak = 0;
    const stage = document.getElementById("stage");
    const help = document.getElementById("help");
    if (help) help.textContent = HELP[level] || HELP.easy;
    api.resetScore();
    api.status("");

    function show() {
      if (flag.stopped) return;
      if (!round.length) {
        stage.textContent = "Flags could not be loaded.";
        return;
      }
      if (index >= round.length) {
        Edu.finish(stage, {
          title: "Atlas closed",
          score: api.score,
          best: api.best,
          note: "You answered " + round.length + " flags.",
          win: true,
          onAgain: function () { start(api.level, api); }
        });
        return;
      }
      const item = round[index];
      const hard = level === "hard";
      const answer = hard ? item.capital : item.name;
      const others = Edu.shuffle(poolFor(level).filter(function (f) {
        return (hard ? f.capital : f.name) !== answer;
      })).slice(0, 3).map(function (f) {
        return hard ? f.capital : f.name;
      });
      const labels = Edu.shuffle([answer].concat(others));
      let locked = false;
      stage.innerHTML = "";
      const progress = document.createElement("p");
      progress.className = "progress";
      progress.textContent = "Flag " + (index + 1) + " of " + round.length;
      const frame = document.createElement("div");
      frame.className = "flag-frame";
      frame.setAttribute("role", "img");
      frame.setAttribute("aria-label", "Flag to identify");
      frame.innerHTML = item.svg;
      const question = document.createElement("p");
      question.className = "question";
      question.textContent = hard ? "What is the capital of this country?" : "Which country flies this flag?";
      stage.appendChild(progress);
      stage.appendChild(frame);
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
          api.status("This is " + item.name + ". The capital is " + item.capital + ".", "bad");
        } else {
          streak += 1;
          api.add(api.points() + Math.max(0, streak - 1) * 2);
          api.beep("ok");
          api.status(hard ? "Yes! " + item.name + " — " + item.capital + "." : "Yes! That is " + item.name + ".", "good");
        }
        index += 1;
        const next = document.createElement("div");
        next.className = "actions";
        const button = document.createElement("button");
        button.type = "button";
        button.className = "textbtn go";
        button.textContent = index >= round.length ? "See score" : "Next flag";
        button.addEventListener("click", show);
        next.appendChild(button);
        stage.appendChild(next);
        button.focus();
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

  Edu.bind("flags", start);
})();
