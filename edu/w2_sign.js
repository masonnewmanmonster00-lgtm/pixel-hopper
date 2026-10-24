(function () {
  "use strict";

  const HELP = {
    easy: "These are American Sign Language (ASL) hand shapes. Learn eight, then name them. Other sign languages use different alphabets. J and Z move; the blue arrow shows the path.",
    medium: "Name the ASL letter. The whole alphabet is in play, and there is no chart.",
    hard: "Watch out for ASL hands that look alike, then read a short fingerspelled word."
  };

  const LEARN = ["A", "B", "C", "L", "V", "Y", "I", "O"];
  const CONFUSABLE = [
    ["A", "S", "T", "E"],
    ["M", "N", "A", "S"],
    ["U", "V", "R", "K"],
    ["G", "Q", "H", "L"],
    ["K", "P", "V", "R"],
    ["D", "F", "O", "X"],
    ["B", "U", "W", "F"],
    ["I", "J", "Y", "X"]
  ];
  const WORDS = [
    { word: "CAT", near: ["CAP", "CAR", "CAN"] },
    { word: "DOG", near: ["DIG", "DOT", "LOG"] },
    { word: "SUN", near: ["SIT", "RUN", "FUN"] },
    { word: "HAT", near: ["HIT", "HOT", "BAT"] },
    { word: "YES", near: ["YET", "BED", "YAM"] },
    { word: "WIN", near: ["WIG", "PIN", "WIT"] }
  ];

  let session = null;

  function mountHand(parent, letter) {
    const wrap = Lab.el("div", "hand-wrap");
    wrap.innerHTML = W2Hands.svg(letter);
    parent.appendChild(wrap);
  }

  function choicesFor(letter, pool) {
    const labels = pool.filter(function (item) { return item !== letter; });
    return Lab.options(letter, labels.concat([letter]));
  }

  function letterQuestion(letter, pool) {
    return {
      letter: letter,
      ask: "Which letter is this hand?",
      answer: letter,
      fact: W2Hands.fact(letter),
      choices: choicesFor(letter, pool || W2Hands.letters)
    };
  }

  function wordQuestion(item) {
    return {
      word: item.word,
      ask: "What word do these hands spell?",
      answer: item.word,
      fact: item.word.split("").join(" · ") + " spells " + item.word + ".",
      choices: Lab.options(item.word, item.near.concat([item.word]))
    };
  }

  function questions(level) {
    if (level === "medium") {
      return Edu.shuffle(W2Hands.letters).slice(0, 8).map(function (letter) {
        return letterQuestion(letter);
      });
    }
    const hands = Edu.shuffle(CONFUSABLE).slice(0, 4).map(function (set) {
      const letter = Edu.pick(set);
      return letterQuestion(letter, set);
    });
    const words = Edu.shuffle(WORDS).slice(0, 4).map(wordQuestion);
    return Edu.shuffle(hands.concat(words));
  }

  function draw(stage, item) {
    if (item.word) {
      const row = Lab.el("div", "hands-row");
      item.word.split("").forEach(function (letter) {
        const wrap = Lab.el("div", "hand-wrap");
        wrap.innerHTML = W2Hands.svg(letter);
        row.appendChild(wrap);
      });
      stage.appendChild(row);
      return;
    }
    mountHand(stage, item.letter);
  }

  function easy(api) {
    const flag = { stopped: false };
    const help = document.getElementById("help");
    const stage = document.getElementById("stage");
    let step = 0;
    let quiz = null;
    if (help) help.textContent = HELP.easy;
    api.resetScore();
    api.status("");

    function showLearn() {
      if (flag.stopped || !stage) return;
      if (step >= LEARN.length) {
        quiz = Lab.round(api, {
          help: "Now name the hands you just studied.",
          note: "You learned 8 letters and quizzed them.",
          questions: Edu.shuffle(LEARN).slice(0, 6).map(function (letter) {
            return letterQuestion(letter, LEARN);
          }),
          draw: draw,
          again: function () { start(api.level, api); }
        });
        return;
      }
      const letter = LEARN[step];
      stage.innerHTML = "";
      stage.appendChild(Lab.el("p", "progress", "Learn " + (step + 1) + " of " + LEARN.length));
      mountHand(stage, letter);
      const name = Lab.el("p", "letter-name", letter);
      name.lang = "en";
      stage.appendChild(name);
      stage.appendChild(Lab.el("p", "fact", W2Hands.fact(letter)));
      const next = Lab.el("button", "textbtn go", "Next");
      next.setAttribute("data-action", "next");
      next.addEventListener("click", function () {
        if (flag.stopped) return;
        step += 1;
        showLearn();
      });
      const row = Lab.el("div", "actions");
      row.appendChild(next);
      stage.appendChild(row);
    }

    showLearn();
    return {
      stop: function () {
        flag.stopped = true;
        if (quiz) quiz.stop();
      }
    };
  }

  function start(level, api) {
    if (session) session.stop();
    if (level === "easy") {
      session = easy(api);
      return;
    }
    session = Lab.round(api, {
      help: HELP[level],
      note: "You finished 8 fingerspelling questions.",
      questions: questions(level),
      draw: draw,
      again: function () { start(api.level, api); }
    });
  }

  Edu.bind("asl", start);
})();
