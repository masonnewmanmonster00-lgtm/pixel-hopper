(function () {
  "use strict";

  const HELP = {
    easy: "Tap the organ the question names. On this front view, the person's left is on your right.",
    medium: "The gold outline marks one organ. Pick the job it does.",
    hard: "Bones and body systems. The highlight shows the part the question is about, and you name the bone or the system."
  };

  const PARTS = {
    brain: {
      name: "brain",
      fact: "The brain sits inside the skull. It lets you think, feel, remember, and move.",
      job: "Controls thinking and movement"
    },
    lungs: {
      name: "lungs",
      fact: "The lungs fill most of the chest, on both sides. They bring oxygen in and let carbon dioxide out.",
      job: "Takes in oxygen"
    },
    heart: {
      name: "heart",
      fact: "The heart pumps blood. On a person facing you, it sits a little toward their left, which is your right.",
      job: "Pumps blood"
    },
    stomach: {
      name: "stomach",
      fact: "The stomach is in the upper belly, a little toward the person's left. It churns food into a soupy mix.",
      job: "Mixes and breaks down food"
    }
  };

  const JOBS = ["Controls thinking and movement", "Takes in oxygen", "Pumps blood", "Mixes and breaks down food"];

  const HARD = [
    {
      ask: "Which bone protects the brain?",
      answer: "Skull",
      fact: "The skull is the bony case around the brain.",
      lit: ["brain"],
      choices: ["Skull", "Femur", "Ribs", "Spine"]
    },
    {
      ask: "Which bones protect the heart and lungs?",
      answer: "Ribs",
      fact: "The ribs form a cage around the heart and lungs.",
      lit: ["heart", "lungs"],
      choices: ["Ribs", "Skull", "Femur", "Fingers"]
    },
    {
      ask: "Which column of bones holds the body upright and protects the spinal cord?",
      answer: "Spine",
      fact: "The spine, or backbone, is a stack of bones. It supports you and protects the spinal cord.",
      lit: [],
      choices: ["Spine", "Femur", "Skull", "Ribs"]
    },
    {
      ask: "Which of these is the longest bone in the human body?",
      answer: "Femur",
      fact: "The femur is the thigh bone. It is the longest bone in the human body.",
      lit: [],
      choices: ["Femur", "Rib", "Spine", "Skull"]
    },
    {
      ask: "Which system sends signals so you can think and move?",
      answer: "Nervous system",
      fact: "The nervous system includes the brain, the spinal cord, and the nerves.",
      lit: ["brain"],
      choices: ["Nervous system", "Digestive system", "Respiratory system", "Circulatory system"]
    },
    {
      ask: "Which system moves blood through the body?",
      answer: "Circulatory system",
      fact: "The circulatory system is the heart plus the blood vessels that carry blood.",
      lit: ["heart"],
      choices: ["Circulatory system", "Respiratory system", "Digestive system", "Nervous system"]
    },
    {
      ask: "Which system brings oxygen into the body?",
      answer: "Respiratory system",
      fact: "The respiratory system includes the lungs and the airways you breathe through.",
      lit: ["lungs"],
      choices: ["Respiratory system", "Digestive system", "Skeletal system", "Circulatory system"]
    },
    {
      ask: "Which system breaks food down so the body can use it?",
      answer: "Digestive system",
      fact: "The digestive system includes the mouth, the stomach, and the intestines.",
      lit: ["stomach"],
      choices: ["Digestive system", "Respiratory system", "Nervous system", "Skeletal system"]
    }
  ];

  const FIGURE = [
    '<svg class="figure" viewBox="0 0 220 400" role="group" aria-label="Front view of a person">',
    '<rect x="78" y="274" width="26" height="92" rx="12" fill="#f6d2b5" stroke="#1c2430" stroke-width="2"/>',
    '<rect x="116" y="274" width="26" height="92" rx="12" fill="#f6d2b5" stroke="#1c2430" stroke-width="2"/>',
    '<ellipse cx="86" cy="372" rx="18" ry="10" fill="#3a2a24" stroke="#1c2430" stroke-width="2"/>',
    '<ellipse cx="134" cy="372" rx="18" ry="10" fill="#3a2a24" stroke="#1c2430" stroke-width="2"/>',
    '<rect x="8" y="150" width="52" height="22" rx="11" fill="#f6d2b5" stroke="#1c2430" stroke-width="2"/>',
    '<rect x="160" y="150" width="52" height="22" rx="11" fill="#f6d2b5" stroke="#1c2430" stroke-width="2"/>',
    '<rect x="50" y="132" width="120" height="158" rx="40" fill="#fffdf8" stroke="#1c2430" stroke-width="2"/>',
    '<ellipse class="organ lungs" data-part="lungs" aria-label="Wide shape in the chest" cx="82" cy="178" rx="24" ry="36" fill="#f4b6c8" stroke="#1c2430" stroke-width="2"/>',
    '<ellipse class="organ lungs" data-part="lungs" aria-label="Wide shape in the chest" cx="116" cy="182" rx="18" ry="32" fill="#f4b6c8" stroke="#1c2430" stroke-width="2"/>',
    '<path class="organ heart" data-part="heart" aria-label="Small shape in the chest" fill="#e24b4b" stroke="#1c2430" stroke-width="2" d="M148 204C148 204 128 188 128 176C128 166 136 158 144 158C148 158 148 164 148 164C148 164 148 158 152 158C160 158 168 166 168 176C168 188 148 204 148 204Z"/>',
    '<ellipse class="organ stomach" data-part="stomach" aria-label="In the belly" cx="120" cy="250" rx="30" ry="24" fill="#f0c36e" stroke="#1c2430" stroke-width="2"/>',
    '<rect x="98" y="116" width="24" height="28" rx="8" fill="#f6d2b5" stroke="#1c2430" stroke-width="2"/>',
    '<circle cx="110" cy="78" r="48" fill="#f6d2b5" stroke="#1c2430" stroke-width="2"/>',
    '<path fill="#3a2a24" d="M68 70c2-30 20-42 42-42s40 12 42 42c-12-16-24-22-42-22s-30 6-42 22z"/>',
    '<ellipse class="organ brain" data-part="brain" aria-label="In the head" cx="110" cy="64" rx="30" ry="22" fill="#d7b4f0" stroke="#1c2430" stroke-width="2"/>',
    '<g class="face">',
    '<circle cx="96" cy="96" r="3" fill="#1c2430"/>',
    '<circle cx="124" cy="96" r="3" fill="#1c2430"/>',
    '<path d="M100 108c6 8 14 8 20 0" fill="none" stroke="#1c2430" stroke-width="2" stroke-linecap="round"/>',
    "</g>",
    "</svg>"
  ].join("");

  let session = null;

  function mountFigure(parent, opts) {
    const wrap = Lab.el("div", "body-wrap");
    wrap.innerHTML = FIGURE;
    const svg = wrap.querySelector("svg");
    if (!opts.interactive) svg.classList.add("quiet");
    (opts.lit || []).forEach(function (name) {
      wrap.querySelectorAll('[data-part="' + name + '"]').forEach(function (node) {
        node.classList.add("lit");
      });
    });
    if (opts.interactive) {
      wrap.querySelectorAll("[data-part]").forEach(function (node) {
        node.setAttribute("tabindex", "0");
        node.setAttribute("role", "button");
      });
      function pick(event) {
        const node = event.target.closest && event.target.closest("[data-part]");
        if (!node) return;
        opts.onPick(node.getAttribute("data-part"), svg);
      }
      wrap.addEventListener("click", pick);
      wrap.addEventListener("keydown", function (event) {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        pick(event);
      });
    }
    parent.appendChild(wrap);
    parent.appendChild(Lab.el("p", "sub", "Front view"));
    return svg;
  }

  function easy(api) {
    const flag = { stopped: false };
    const help = document.getElementById("help");
    const stage = document.getElementById("stage");
    const order = Edu.shuffle(["brain", "heart", "lungs", "stomach", "brain", "heart", "lungs", "stomach"]);
    let index = 0;
    let streak = 0;
    let locked = false;
    if (help) help.textContent = HELP.easy;
    api.resetScore();
    api.status("");

    function show() {
      if (flag.stopped || !stage) return;
      if (index >= order.length) {
        Edu.finish(stage, {
          title: "Nice work",
          score: api.score,
          best: api.best,
          note: "You explored 8 organs.",
          win: true,
          onAgain: function () { start(api.level, api); }
        });
        return;
      }
      locked = false;
      const id = order[index];
      const part = PARTS[id];
      stage.innerHTML = "";
      stage.appendChild(Lab.el("p", "progress", (index + 1) + " of " + order.length));
      const q = Lab.el("p", "question", "Tap the " + part.name);
      q.setAttribute("data-answer", id);
      stage.appendChild(q);
      mountFigure(stage, {
        interactive: true,
        lit: [],
        onPick: function (hitId, svg) {
          if (locked || flag.stopped) return;
          locked = true;
          svg.classList.add("locked");
          const hit = PARTS[hitId];
          const ok = hitId === id;
          const nodeList = svg.querySelectorAll('[data-part="' + hitId + '"]');
          Array.prototype.forEach.call(nodeList, function (node) {
            node.classList.add(ok ? "lit" : "picked");
          });
          if (ok) {
            streak += 1;
            api.add(api.points() + Math.max(0, streak - 1) * 2);
            api.beep("ok");
            api.status(streak > 1 ? "Yes! Streak of " + streak + "." : "Yes! That's the " + part.name + ".", "good");
          } else {
            streak = 0;
            api.beep("no");
            api.status("That's the " + hit.name + ".", "bad");
          }
          stage.appendChild(Lab.el("p", "fact", part.fact));
          const next = Lab.el("button", "textbtn go", "Next");
          next.setAttribute("data-action", "next");
          next.addEventListener("click", function () {
            if (flag.stopped) return;
            index += 1;
            show();
          });
          const row = Lab.el("div", "actions");
          row.appendChild(next);
          stage.appendChild(row);
        }
      });
    }

    show();
    return { stop: function () { flag.stopped = true; } };
  }

  function quizQuestions(level) {
    if (level === "medium") {
      const ids = ["brain", "lungs", "heart", "stomach", "brain", "lungs", "heart", "stomach"];
      return Edu.shuffle(ids).map(function (id) {
        const part = PARTS[id];
        return {
          lit: [id],
          ask: "What is this highlighted part's main job?",
          answer: part.job,
          fact: part.fact,
          choices: Lab.options(part.job, JOBS)
        };
      });
    }
    return Edu.shuffle(HARD).map(function (item) {
      return {
        lit: item.lit,
        ask: item.ask,
        answer: item.answer,
        fact: item.fact,
        choices: Lab.options(item.answer, item.choices)
      };
    });
  }

  function start(level, api) {
    if (session) session.stop();
    if (level === "easy") {
      session = easy(api);
      return;
    }
    session = Lab.round(api, {
      help: HELP[level],
      note: "You finished 8 body questions.",
      questions: quizQuestions(level),
      draw: function (stage, item) {
        mountFigure(stage, { interactive: false, lit: item.lit || [] });
      },
      again: function () { start(api.level, api); }
    });
  }

  Edu.bind("body", start);
})();
