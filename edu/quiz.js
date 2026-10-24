(function () {
  "use strict";

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    if (tag === "button") node.type = "button";
    return node;
  }

  function options(correct, labels) {
    const wrongs = [];
    Edu.shuffle(labels).forEach(function (label) {
      if (wrongs.length >= 3) return;
      if (label === correct || wrongs.indexOf(label) !== -1) return;
      wrongs.push(label);
    });
    return Edu.shuffle(wrongs.concat([correct])).map(function (label) {
      return { label: label, value: label };
    });
  }

  function round(api, opts) {
    const flag = { stopped: false };
    const help = document.getElementById("help");
    const stage = document.getElementById("stage");
    const questions = opts.questions || [];
    let index = 0;
    let streak = 0;
    let locked = false;
    let pad = null;
    if (help) help.textContent = opts.help || "";
    api.resetScore();
    api.status("");

    function cleanup() {
      if (pad) {
        pad.destroy();
        pad = null;
      }
    }

    function show() {
      cleanup();
      if (flag.stopped || !stage) return;
      if (index >= questions.length) {
        Edu.finish(stage, {
          title: "Nice work",
          score: api.score,
          best: api.best,
          note: opts.note || "You finished this round.",
          win: true,
          onAgain: function () { opts.again(); }
        });
        return;
      }
      locked = false;
      const item = questions[index];
      stage.innerHTML = "";
      stage.appendChild(el("p", "progress", (index + 1) + " of " + questions.length));
      if (opts.draw) opts.draw(stage, item);
      const q = el("p", "question", item.ask);
      q.setAttribute("data-answer", item.answer);
      stage.appendChild(q);

      function grade(ok) {
        if (flag.stopped) return;
        locked = true;
        if (ok) {
          streak += 1;
          api.add(api.points() + Math.max(0, streak - 1) * 2);
          api.beep("ok");
          api.status(streak > 1 ? "Yes! Streak of " + streak + "." : "Yes!", "good");
        } else {
          streak = 0;
          api.beep("no");
          api.status("Not quite.", "bad");
        }
        if (item.fact) stage.appendChild(el("p", "fact", item.fact));
        const next = el("button", "textbtn go", "Next");
        next.setAttribute("data-action", "next");
        next.addEventListener("click", function () {
          if (flag.stopped) return;
          index += 1;
          show();
        });
        const row = el("div", "actions");
        row.appendChild(next);
        stage.appendChild(row);
      }

      if (item.choices) {
        const buttons = Edu.choices(stage, item.choices, function (choice, btn, all) {
          if (locked || flag.stopped) return;
          const ok = choice.value === item.answer;
          all.forEach(function (b) { b.disabled = true; });
          btn.classList.add(ok ? "good" : "bad");
          if (!ok) {
            all.forEach(function (b) {
              if (b.getAttribute("data-value") === item.answer) b.classList.add("good");
            });
          }
          grade(ok);
        });
        buttons.forEach(function (b, i) {
          b.setAttribute("data-value", item.choices[i].value);
        });
      } else if (item.keypad) {
        pad = Edu.keypad(stage, {
          maxDigits: item.maxDigits || 4,
          onSubmit: function (value) {
            if (locked || flag.stopped) return;
            const ok = item.numeric
              ? value !== "" && String(Number(value)) === String(Number(item.answer))
              : value === item.answer;
            if (pad) pad.lock(true);
            grade(ok);
          }
        });
      }
    }

    show();
    return {
      stop: function () {
        flag.stopped = true;
        cleanup();
      }
    };
  }

  window.Lab = { el: el, options: options, round: round };
})();
