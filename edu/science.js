(function () {
  "use strict";

  const HELP = {
    easy: "Everyday science. Pick true or false, then read why.",
    medium: "A step past the basics.",
    hard: "Trickier facts. The explanation tells you why."
  };

  const BANK = {
    easy: [
      ["The Sun is a star.", true, "The Sun is the closest star to Earth."],
      ["Fish live in water.", true, "Fish live in rivers, lakes, and oceans."],
      ["Ice is frozen water.", true, "When water gets cold enough, it freezes into ice."],
      ["People have three eyes.", false, "People have two eyes."],
      ["Plants need light to grow.", true, "Leaves use light to make food."],
      ["A rainbow can show many colors.", true, "Raindrops can split sunlight into colors."],
      ["Rocks are alive.", false, "Rocks are not living things."],
      ["Spiders have eight legs.", true, "Insects have six legs. Spiders have eight."],
      ["Penguins fly through the air.", false, "Penguins swim. They do not fly."],
      ["Earth is shaped like a ball.", true, "Earth is a round planet."],
      ["Bees can help flowers make seeds.", true, "Bees move pollen from flower to flower."],
      ["Magnets pick up paper.", false, "Magnets attract some metals, not paper."],
      ["Rain is water falling from clouds.", true, "Clouds drop water as rain."],
      ["People breathe with gills.", false, "People breathe with lungs."],
      ["A seed can grow into a plant.", true, "A seed holds a baby plant."]
    ],
    medium: [
      ["Earth orbits the Sun.", true, "One trip around the Sun is about one year."],
      ["Sound travels faster than light.", false, "Light is much faster than sound."],
      ["Whales are mammals.", true, "Whales breathe air and nurse their babies."],
      ["All birds can fly.", false, "Ostriches and penguins are birds that do not fly."],
      ["Your heart pumps blood.", true, "The heart pushes blood through your body."],
      ["The Moon makes its own light.", false, "Moonlight is sunlight bouncing off the Moon."],
      ["Lightning is electricity.", true, "A lightning bolt is a huge electric spark."],
      ["Every planet has bright rings like Saturn.", false, "Saturn's rings are the famous bright ones."],
      ["Water is made of hydrogen and oxygen.", true, "A water molecule is H2O."],
      ["A year is about 365 days.", true, "Earth's trip around the Sun takes about 365 days. A leap year has 366."],
      ["A magnet has a north pole and a south pole.", true, "Every magnet has two poles."],
      ["Tyrannosaurus rex still roams the forests.", false, "That dinosaur died out long ago."],
      ["Sound can move through air.", true, "Air carries the vibrations we hear."],
      ["The Amazon is an ocean.", false, "The Amazon is a river and a rainforest."],
      ["Bones help hold your body up.", true, "Your skeleton supports you."]
    ],
    hard: [
      ["Sound can travel through empty space.", false, "Sound needs matter, such as air or water, to travel."],
      ["At sea level, water boils at 100°C.", true, "That is water's boiling point at sea level."],
      ["Venus is the hottest planet in our solar system.", true, "Thick air on Venus traps heat."],
      ["Antibiotics cure a cold virus.", false, "Antibiotics work on bacteria, not viruses."],
      ["Gravity is weaker on the Moon than on Earth.", true, "That is why astronauts bounce as they walk."],
      ["Photosynthesis lets plants make food with sunlight.", true, "Plants use light, water, and air to make sugar."],
      ["DNA stores instructions for living things.", true, "DNA is the chemical code inside cells."],
      ["All metals stick to magnets.", false, "Iron does. Aluminum and copper do not."],
      ["Earth is the third planet from the Sun.", true, "The order starts Mercury, Venus, Earth."],
      ["The Pacific is the largest ocean.", true, "It covers more area than any other ocean."],
      ["An adult human skeleton has 206 bones.", true, "Babies start with more bones that later join."],
      ["Plants release oxygen during photosynthesis.", true, "That oxygen goes into the air."],
      ["Water boils at the same temperature on every mountain.", false, "Higher up, water boils at a lower temperature."],
      ["Atoms are too small to see with only your eyes.", true, "Atoms are far smaller than a grain of sand."],
      ["A tadpole can grow into a frog.", true, "That change is called metamorphosis."]
    ]
  };

  const TOTAL = 10;
  let session = null;

  function run(level, api) {
    const flag = { stopped: false, timers: [] };
    const round = Edu.shuffle(BANK[level] || BANK.easy).slice(0, TOTAL);
    let index = 0;
    let streak = 0;
    const stage = document.getElementById("stage");
    const help = document.getElementById("help");
    if (help) help.textContent = HELP[level];
    api.resetScore();
    api.status("");

    function show() {
      if (flag.stopped) return;
      if (index >= round.length) {
        Edu.finish(stage, {
          title: "Lab notes closed",
          score: api.score,
          best: api.best,
          note: "You checked " + round.length + " statements.",
          win: true,
          onAgain: function () { start(api.level, api); }
        });
        return;
      }
      const item = round[index];
      let locked = false;
      stage.innerHTML = "";
      const progress = document.createElement("p");
      progress.className = "progress";
      progress.textContent = "Statement " + (index + 1) + " of " + round.length;
      const question = document.createElement("p");
      question.className = "question";
      question.textContent = item[0];
      stage.appendChild(progress);
      stage.appendChild(question);
      const why = document.createElement("p");
      why.className = "clue";
      const buttons = Edu.choices(stage, [
        { label: "True", value: true },
        { label: "False", value: false }
      ], function (choice, btn, all) {
        if (locked || flag.stopped) return;
        locked = true;
        all.forEach(function (b) { b.disabled = true; });
        const ok = choice.value === item[1];
        btn.classList.add(ok ? "good" : "bad");
        if (!ok) {
          all.forEach(function (b) {
            if (b.textContent === (item[1] ? "True" : "False")) b.classList.add("good");
          });
          streak = 0;
          api.beep("no");
          api.status(item[1] ? "That one is true." : "That one is false.", "bad");
        } else {
          streak += 1;
          api.add(api.points() + Math.max(0, streak - 1) * 2);
          api.beep("ok");
          api.status(streak > 1 ? "Yes! Streak of " + streak + "." : "Yes!", "good");
        }
        why.textContent = item[2];
        stage.appendChild(why);
        index += 1;
        const row = document.createElement("div");
        row.className = "actions";
        const next = document.createElement("button");
        next.type = "button";
        next.className = "textbtn go";
        next.textContent = index >= round.length ? "See score" : "Next";
        next.addEventListener("click", show);
        row.appendChild(next);
        stage.appendChild(row);
        next.focus();
      });
      function onKey(e) {
        if (locked || flag.stopped) return;
        const key = e.key.toLowerCase();
        if (key === "t" || e.key === "1") buttons[0].click();
        if (key === "f" || e.key === "2") buttons[1].click();
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

  Edu.bind("science", start);
})();
