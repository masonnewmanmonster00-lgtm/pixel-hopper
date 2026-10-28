(function () {
  "use strict";

  const HELP = {
    easy: "Multiply numbers from 1 to 5. Get 8 right before time runs out.",
    medium: "Tables from 1 to 10. Get 12 right.",
    hard: "Tables from 2 to 12, on a faster clock. Get 12 right."
  };
  let session = null;

  function run(level, api) {
    const flag = { stopped: false, timers: [] };
    const goal = level === "easy" ? 8 : 12;
    const totalTime = level === "hard" ? 45 : 60;
    const minF = level === "hard" ? 2 : 1;
    const maxF = level === "easy" ? 5 : level === "medium" ? 10 : 12;
    let left = totalTime;
    let correct = 0;
    let locked = false;
    let problem = null;
    let clock = null;
    const stage = document.getElementById("stage");
    const help = document.getElementById("help");
    if (help) help.textContent = HELP[level];
    api.resetScore();
    api.status("");
    stage.innerHTML = "";

    const meta = document.createElement("p");
    meta.className = "progress";
    const track = document.createElement("div");
    track.className = "track";
    track.setAttribute("aria-hidden", "true");
    const runner = document.createElement("div");
    runner.className = "runner";
    runner.textContent = "★";
    track.appendChild(runner);
    const prompt = document.createElement("p");
    prompt.className = "prompt";
    stage.appendChild(meta);
    stage.appendChild(track);
    stage.appendChild(prompt);

    function placeRunner() {
      const pct = Math.min(1, correct / goal);
      runner.style.left = "calc(" + (pct * 100) + "% - " + (pct * 26) + "px)";
    }

    function paintMeta() {
      meta.textContent = correct + " / " + goal + " correct · " + left + "s";
    }

    function ask() {
      if (flag.stopped) return;
      problem = {
        a: Edu.rand(minF, maxF),
        b: Edu.rand(minF, maxF)
      };
      problem.answer = problem.a * problem.b;
      prompt.textContent = problem.a + " × " + problem.b;
      pad.clear();
      locked = false;
      pad.lock(false);
    }

    function end(won) {
      if (flag.stopped) return;
      flag.stopped = true;
      if (clock) clearInterval(clock);
      pad.destroy();
      if (won) api.add(left * 2);
      Edu.finish(stage, {
        title: won ? "You finished the race" : "Time is up",
        score: api.score,
        best: api.best,
        note: correct + " correct. " + goal + " finishes the race.",
        win: won,
        onAgain: function () { start(api.level, api); }
      });
    }

    const pad = Edu.keypad(stage, {
      maxDigits: 3,
      onSubmit: function (value) {
        if (locked || flag.stopped || !problem) return;
        const n = Number(value);
        if (n === problem.answer) {
          locked = true;
          correct += 1;
          api.add(api.points());
          api.beep("ok");
          api.status("Yes! " + problem.a + " × " + problem.b + " = " + problem.answer, "good");
          placeRunner();
          paintMeta();
          if (correct >= goal) {
            end(true);
            return;
          }
          Edu.later(flag, ask, 350);
        } else {
          locked = true;
          api.beep("no");
          api.status(problem.a + " × " + problem.b + " = " + problem.answer, "bad");
          pad.shake();
          Edu.later(flag, ask, 1400);
        }
      }
    });

    placeRunner();
    paintMeta();
    ask();
    clock = setInterval(function () {
      if (flag.stopped) return;
      left -= 1;
      if (left < 0) left = 0;
      paintMeta();
      if (left <= 0) end(false);
    }, 1000);

    return {
      stop() {
        flag.stopped = true;
        if (clock) clearInterval(clock);
        flag.timers.forEach(clearTimeout);
        pad.destroy();
      }
    };
  }

  function start(level, api) {
    if (session) session.stop();
    session = run(level, api);
  }

  Edu.bind("times", start);
})();
