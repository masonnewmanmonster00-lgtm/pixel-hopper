(function () {
  "use strict";

  const HELP = {
    easy: "MyPlate has five groups: fruit, vegetable, grain, protein, and dairy. Pick the group for each food.",
    medium: "Fill every spot on the plate, then press Serve. A treat does not fill a spot. A second food from the same group replaces the first.",
    hard: "Pick the food that fits an everyday plate. Treats can still be sometimes foods."
  };

  const GROUPS = ["Fruit", "Vegetable", "Grain", "Protein", "Dairy"];
  const ORDER = ["fruit", "vegetable", "grain", "protein", "dairy"];
  const LABEL = {
    fruit: "Fruit",
    vegetable: "Vegetable",
    grain: "Grain",
    protein: "Protein",
    dairy: "Dairy"
  };

  const FOODS = [
    { id: "apple", name: "Apple", emoji: "🍎", group: "fruit" },
    { id: "banana", name: "Banana", emoji: "🍌", group: "fruit" },
    { id: "grapes", name: "Grapes", emoji: "🍇", group: "fruit" },
    { id: "orange", name: "Orange", emoji: "🍊", group: "fruit" },
    { id: "carrot", name: "Carrot", emoji: "🥕", group: "vegetable" },
    { id: "broccoli", name: "Broccoli", emoji: "🥦", group: "vegetable" },
    { id: "lettuce", name: "Lettuce", emoji: "🥬", group: "vegetable" },
    { id: "cucumber", name: "Cucumber", emoji: "🥒", group: "vegetable" },
    { id: "bread", name: "Bread", emoji: "🍞", group: "grain" },
    { id: "rice", name: "Rice", emoji: "🍚", group: "grain" },
    { id: "oatmeal", name: "Oatmeal", emoji: "🥣", group: "grain" },
    { id: "pasta", name: "Pasta", emoji: "🍝", group: "grain" },
    { id: "chicken", name: "Chicken", emoji: "🍗", group: "protein" },
    { id: "fish", name: "Fish", emoji: "🐟", group: "protein" },
    { id: "eggs", name: "Eggs", emoji: "🥚", group: "protein" },
    { id: "peanut", name: "Peanut butter", emoji: "🥜", group: "protein" },
    { id: "milk", name: "Milk", emoji: "🥛", group: "dairy" },
    { id: "yogurt", name: "Yogurt", emoji: "🍶", group: "dairy" },
    { id: "cheese", name: "Cheese", emoji: "🧀", group: "dairy" }
  ];

  const TREATS = [
    { id: "cookie", name: "Cookie", emoji: "🍪", group: "treat" },
    { id: "candy", name: "Candy", emoji: "🍬", group: "treat" },
    { id: "soda", name: "Soda", emoji: "🥤", group: "treat" },
    { id: "donut", name: "Donut", emoji: "🍩", group: "treat" }
  ];

  const PAIRS = [
    {
      ask: "Which one fits an everyday plate better?",
      answer: "Apple",
      alt: "Candy",
      fact: "An apple is fruit, with fiber and vitamins. Candy is a sometimes treat."
    },
    {
      ask: "Which is the better everyday drink?",
      answer: "Water",
      alt: "Soda",
      fact: "Water is the everyday drink. Soda has a lot of added sugar, so it is a sometimes drink."
    },
    {
      ask: "Which snack fits the vegetable group?",
      answer: "Carrot sticks",
      alt: "Potato chips",
      fact: "Carrot sticks are a vegetable. Potato chips are a sometimes snack."
    },
    {
      ask: "Which one belongs in the grain group?",
      answer: "Whole-grain bread",
      alt: "Donut",
      fact: "Whole-grain bread is a grain food. A donut is a sometimes treat."
    },
    {
      ask: "Which drink counts as dairy?",
      answer: "Milk",
      alt: "Soda",
      fact: "Milk is dairy. Soda does not fill a MyPlate group."
    },
    {
      ask: "Which food is protein?",
      answer: "Grilled chicken",
      alt: "Candy",
      fact: "Chicken is protein. Candy is a treat, not one of the five groups."
    },
    {
      ask: "Which one is fruit rather than a sweet drink?",
      answer: "Orange",
      alt: "Fruit punch",
      fact: "An orange is fruit. Fruit punch often has added sugar and may contain little fruit."
    },
    {
      ask: "Which dairy food is the better everyday choice?",
      answer: "Yogurt",
      alt: "Ice cream",
      fact: "Yogurt is dairy. Plain yogurt usually has less added sugar than ice cream. Ice cream can be a sometimes treat."
    }
  ];

  let session = null;

  function groupChoices() {
    return Edu.shuffle(GROUPS.map(function (name) {
      return { label: name, value: name };
    }));
  }

  function questions(level) {
    if (level === "easy") {
      return Edu.shuffle(FOODS).slice(0, 8).map(function (food) {
        const group = LABEL[food.group];
        let fact = food.name + " is in the " + group.toLowerCase() + " group.";
        if (food.id === "peanut") fact = "Peanut butter counts as protein.";
        return {
          emoji: food.emoji,
          name: food.name,
          ask: "Which food group does this belong to?",
          answer: group,
          fact: fact,
          choices: groupChoices()
        };
      });
    }
    return Edu.shuffle(PAIRS).map(function (item) {
      return {
        ask: item.ask,
        answer: item.answer,
        fact: item.fact,
        choices: Lab.options(item.answer, [item.answer, item.alt])
      };
    });
  }

  function drawFood(stage, item) {
    if (!item.emoji) return;
    const pic = Lab.el("p", "emoji", item.emoji);
    pic.setAttribute("role", "img");
    pic.setAttribute("aria-label", "Food picture");
    stage.appendChild(pic);
    stage.appendChild(Lab.el("p", "prompt", item.name));
  }

  function plateFoods() {
    const picked = [];
    ORDER.forEach(function (group) {
      const pool = FOODS.filter(function (food) {
        return food.group === group && picked.indexOf(food) === -1;
      });
      picked.push(Edu.pick(pool));
    });
    const extras = Edu.shuffle(FOODS.filter(function (food) {
      return picked.indexOf(food) === -1;
    })).slice(0, 3);
    const treats = Edu.shuffle(TREATS).slice(0, 2);
    return Edu.shuffle(picked.concat(extras).concat(treats));
  }

  function plates(api) {
    const flag = { stopped: false };
    const help = document.getElementById("help");
    const stage = document.getElementById("stage");
    let plateIndex = 0;
    let streak = 0;
    let locked = false;
    if (help) help.textContent = HELP.medium;
    api.resetScore();
    api.status("");

    function show() {
      if (flag.stopped || !stage) return;
      locked = false;
      const foods = plateFoods();
      const filled = {};
      stage.innerHTML = "";
      stage.appendChild(Lab.el("p", "progress", "Plate " + (plateIndex + 1) + " of 3"));
      stage.appendChild(Lab.el("p", "question", "Fill every MyPlate group, then serve."));
      const plate = Lab.el("div", "plate");
      plate.setAttribute("data-plate", String(plateIndex + 1));
      ORDER.forEach(function (group) {
        const slot = Lab.el("button", "slot", LABEL[group]);
        slot.setAttribute("data-slot", group);
        slot.addEventListener("click", function () {
          if (locked || flag.stopped || !filled[group]) return;
          delete filled[group];
          paintSlots();
          api.status("Cleared the " + LABEL[group].toLowerCase() + " spot.");
        });
        plate.appendChild(slot);
      });
      stage.appendChild(plate);

      function paintSlots() {
        ORDER.forEach(function (group) {
          const slot = plate.querySelector('[data-slot="' + group + '"]');
          const food = filled[group];
          slot.textContent = food ? food.emoji + " " + food.name : LABEL[group];
          slot.classList.toggle("filled", !!food);
        });
      }

      const bank = Lab.el("div", "food-bank");
      foods.forEach(function (food) {
        const btn = Lab.el("button", "food", food.emoji + " " + food.name);
        btn.setAttribute("data-group", food.group);
        btn.setAttribute("data-food", food.id);
        btn.addEventListener("click", function () {
          if (locked || flag.stopped) return;
          if (food.group === "treat") {
            api.beep("no");
            api.status(food.name + " is a treat. It does not fill a MyPlate group.", "bad");
            const old = stage.querySelector(".fact");
            if (old) old.remove();
            const fact = Lab.el("p", "fact", "The five groups are fruit, vegetable, grain, protein, and dairy. A treat can be a sometimes food.");
            stage.insertBefore(fact, actions);
            return;
          }
          const replaced = !!filled[food.group];
          filled[food.group] = food;
          paintSlots();
          api.status(replaced
            ? food.name + " takes the " + LABEL[food.group].toLowerCase() + " spot."
            : food.name + " goes in " + LABEL[food.group].toLowerCase() + ".");
        });
        bank.appendChild(btn);
      });
      stage.appendChild(bank);

      const actions = Lab.el("div", "actions");
      const serve = Lab.el("button", "textbtn go", "Serve");
      serve.setAttribute("data-action", "serve");
      serve.addEventListener("click", function () {
        if (locked || flag.stopped) return;
        const missing = ORDER.filter(function (group) { return !filled[group]; });
        if (missing.length) {
          api.beep("no");
          api.status("Still missing " + missing.map(function (group) {
            return LABEL[group].toLowerCase();
          }).join(", ") + ".", "bad");
          return;
        }
        locked = true;
        streak += 1;
        api.add(api.points() + Math.max(0, streak - 1) * 2);
        api.beep("ok");
        api.status("Yes! This plate has all five groups.", "good");
        const old = stage.querySelector(".fact");
        if (old) old.remove();
        const names = ORDER.map(function (group) { return filled[group].name; });
        stage.appendChild(Lab.el("p", "fact", names.join(", ") + ". Fruit, vegetable, grain, protein, and dairy are all here."));
        const next = Lab.el("button", "textbtn go", "Next");
        next.setAttribute("data-action", "next");
        next.addEventListener("click", function () {
          if (flag.stopped) return;
          plateIndex += 1;
          if (plateIndex >= 3) {
            Edu.finish(stage, {
              title: "Nice work",
              score: api.score,
              best: api.best,
              note: "You served 3 plates.",
              win: true,
              onAgain: function () { start(api.level, api); }
            });
            return;
          }
          show();
        });
        actions.appendChild(next);
        serve.disabled = true;
      });
      actions.appendChild(serve);
      stage.appendChild(actions);
    }

    show();
    return { stop: function () { flag.stopped = true; } };
  }

  function start(level, api) {
    if (session) session.stop();
    if (level === "medium") {
      session = plates(api);
      return;
    }
    const round = questions(level);
    session = Lab.round(api, {
      help: HELP[level],
      note: "You finished 8 food questions.",
      questions: round,
      draw: drawFood,
      again: function () { start(api.level, api); }
    });
  }

  Edu.bind("food", start);
})();
