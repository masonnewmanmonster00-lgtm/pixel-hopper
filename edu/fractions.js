(function () {
  "use strict";

  const HELP = {
    easy: "Halves and quarters. Tap slices to add toppings, then tap Serve.",
    medium: "Thirds, sixths, and eighths.",
    hard: "The fraction may not use the same number as the slices. One half of 8 is 4."
  };
  const TOTAL = 8;
  let session = null;

  function makeQuestion(level) {
    if (level === "easy") {
      const slices = Edu.pick([2, 4]);
      const need = Edu.rand(1, slices);
      return { slices: slices, need: need, label: need + "/" + slices };
    }
    if (level === "medium") {
      const slices = Edu.pick([3, 6, 8]);
      const need = Edu.rand(1, slices - 1);
      return { slices: slices, need: need, label: need + "/" + slices };
    }
    return Edu.pick([
      { slices: 4, need: 2, label: "1/2" },
      { slices: 6, need: 3, label: "1/2" },
      { slices: 8, need: 4, label: "1/2" },
      { slices: 6, need: 2, label: "1/3" },
      { slices: 6, need: 4, label: "2/3" },
      { slices: 8, need: 2, label: "1/4" },
      { slices: 8, need: 6, label: "3/4" },
      { slices: 4, need: 3, label: "3/4" },
      { slices: 3, need: 2, label: "2/3" },
      { slices: 8, need: 4, label: "2/4" }
    ]);
  }

  function wedge(i, n, r, cx, cy) {
    const a0 = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    const a1 = -Math.PI / 2 + ((i + 1) * 2 * Math.PI) / n;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const x0 = cx + r * Math.cos(a0);
    const y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    return "M " + cx + " " + cy + " L " + x0.toFixed(2) + " " + y0.toFixed(2) + " A " + r + " " + r + " 0 " + large + " 1 " + x1.toFixed(2) + " " + y1.toFixed(2) + " Z";
  }

  function run(level, api) {
    const flag = { stopped: false, timers: [] };
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
          title: "Pizza is served",
          score: api.score,
          best: api.best,
          note: "You played 8 pies.",
          win: true,
          onAgain: function () { start(api.level, api); }
        });
        return;
      }
      const q = makeQuestion(level);
      const topped = [];
      for (let i = 0; i < q.slices; i++) topped.push(false);
      let locked = false;
      stage.innerHTML = "";
      const progress = document.createElement("p");
      progress.className = "progress";
      progress.textContent = "Pie " + (index + 1) + " of " + TOTAL;
      const question = document.createElement("p");
      question.className = "question";
      question.textContent = "Top " + q.label + " of the pizza.";
      const count = document.createElement("p");
      count.className = "countline";
      const wrap = document.createElement("div");
      wrap.className = "pizza-wrap";
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", "0 0 200 200");
      svg.setAttribute("role", "group");
      svg.setAttribute("aria-label", "Pizza with " + q.slices + " slices");
      const plate = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      plate.setAttribute("cx", "100");
      plate.setAttribute("cy", "100");
      plate.setAttribute("r", "96");
      plate.setAttribute("fill", "#f4e1c1");
      plate.setAttribute("stroke", "#1c2430");
      plate.setAttribute("stroke-width", "3");
      svg.appendChild(plate);
      const paths = [];

      function paintCount() {
        const n = topped.filter(Boolean).length;
        count.textContent = "Topped " + n + " of " + q.slices;
      }

      function paintSlice(i) {
        const path = paths[i];
        path.setAttribute("fill", topped[i] ? "#f0c14a" : "#f6e2b8");
        path.setAttribute("aria-pressed", topped[i] ? "true" : "false");
        const old = path.querySelectorAll ? null : null;
        const dots = svg.querySelectorAll('[data-dot="' + i + '"]');
        dots.forEach(function (dot) { dot.remove(); });
        if (topped[i]) {
          const a = -Math.PI / 2 + ((i + 0.5) * 2 * Math.PI) / q.slices;
          [42, 62].forEach(function (dist) {
            const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            dot.setAttribute("data-dot", String(i));
            dot.setAttribute("cx", (100 + Math.cos(a) * dist).toFixed(2));
            dot.setAttribute("cy", (100 + Math.sin(a) * dist).toFixed(2));
            dot.setAttribute("r", "5");
            dot.setAttribute("fill", "#d64545");
            dot.setAttribute("pointer-events", "none");
            svg.appendChild(dot);
          });
        }
      }

      for (let i = 0; i < q.slices; i++) {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", wedge(i, q.slices, 78, 100, 100));
        path.setAttribute("stroke", "#1c2430");
        path.setAttribute("stroke-width", "2");
        path.setAttribute("class", "slice");
        path.setAttribute("tabindex", "0");
        path.setAttribute("role", "button");
        path.setAttribute("aria-label", "Slice " + (i + 1));
        path.addEventListener("click", function () {
          if (locked) return;
          topped[i] = !topped[i];
          paintSlice(i);
          paintCount();
        });
        path.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            path.click();
          }
        });
        svg.appendChild(path);
        paths.push(path);
        paintSlice(i);
      }
      wrap.appendChild(svg);
      paintCount();

      const actions = document.createElement("div");
      actions.className = "actions";
      const clearBtn = document.createElement("button");
      clearBtn.type = "button";
      clearBtn.className = "textbtn";
      clearBtn.textContent = "Clear";
      const serve = document.createElement("button");
      serve.type = "button";
      serve.className = "textbtn go";
      serve.textContent = "Serve";
      clearBtn.addEventListener("click", function () {
        if (locked) return;
        for (let i = 0; i < topped.length; i++) {
          topped[i] = false;
          paintSlice(i);
        }
        paintCount();
      });
      serve.addEventListener("click", function () {
        if (locked || flag.stopped) return;
        locked = true;
        const got = topped.filter(Boolean).length;
        const ok = got === q.need;
        if (ok) {
          streak += 1;
          api.add(api.points() + Math.max(0, streak - 1) * 2);
          api.beep("ok");
          api.status("Yes! " + q.label + " is " + q.need + " of " + q.slices + " slices.", "good");
        } else {
          streak = 0;
          api.beep("no");
          api.status("You topped " + got + ". " + q.label + " of " + q.slices + " is " + q.need + " slices.", "bad");
          for (let i = 0; i < q.slices; i++) {
            topped[i] = i < q.need;
            paintSlice(i);
          }
          paintCount();
        }
        index += 1;
        serve.disabled = true;
        clearBtn.disabled = true;
        const next = document.createElement("button");
        next.type = "button";
        next.className = "textbtn go";
        next.textContent = index >= TOTAL ? "See score" : "Next pie";
        next.addEventListener("click", show);
        actions.appendChild(next);
        next.focus();
      });
      actions.appendChild(clearBtn);
      actions.appendChild(serve);
      stage.appendChild(progress);
      stage.appendChild(question);
      stage.appendChild(wrap);
      stage.appendChild(count);
      stage.appendChild(actions);
    }

    show();
    return { stop() { flag.stopped = true; flag.timers.forEach(clearTimeout); } };
  }

  function start(level, api) {
    if (session) session.stop();
    session = run(level, api);
  }

  Edu.bind("fractions", start);
})();
