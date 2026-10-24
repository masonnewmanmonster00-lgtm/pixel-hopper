(function () {
  "use strict";

  const HELP = {
    easy: "Towns sort recycling differently. This round uses a common rule for clean paper, plastic bottles and jugs, glass jars, and metal cans. Check your local list at home.",
    medium: "Food scraps, bags, and greasy boxes. A recycling symbol does not always mean it goes in the curbside bin.",
    hard: "Batteries, foam, ceramics, and other items that often need the trash or a special drop-off. Local rules still win."
  };

  const BINS = [
    { id: "paper", label: "Paper" },
    { id: "plastic", label: "Plastic" },
    { id: "glass", label: "Glass" },
    { id: "metal", label: "Metal" },
    { id: "compost", label: "Compost" },
    { id: "trash", label: "Trash" },
    { id: "special", label: "Special drop-off" }
  ];

  const ROUNDS = {
    easy: [
      { emoji: "📰", name: "Newspaper", bin: "paper", fact: "Clean newspaper is paper recycling." },
      { emoji: "📦", name: "Clean cardboard box", bin: "paper", fact: "Flattened, clean cardboard is usually paper. Food stains and grease are a different case." },
      { emoji: "🧴", name: "Empty plastic water bottle", bin: "plastic", fact: "An empty plastic bottle is usually plastic recycling. A quick rinse helps." },
      { emoji: "🥛", name: "Rinsed milk jug", bin: "plastic", fact: "A rinsed milk jug is plastic. The cap is often plastic too; some towns ask you to leave it on." },
      { emoji: "🫙", name: "Rinsed glass jar", bin: "glass", fact: "A rinsed glass jar is bottle glass. A metal lid is metal, and some towns want it separated." },
      { emoji: "🥫", name: "Aluminum drink can", bin: "metal", fact: "An aluminum drink can is metal." },
      { emoji: "🥫", name: "Rinsed steel food can", bin: "metal", fact: "A rinsed steel food can is metal." },
      { emoji: "📖", name: "Magazine", bin: "paper", fact: "A magazine is paper, even with a glossy cover, in most curbside programs." }
    ],
    medium: [
      { emoji: "🍌", name: "Banana peel", bin: "compost", fact: "Fruit peels belong in compost, not in the paper or plastic bin." },
      { emoji: "🍎", name: "Apple core", bin: "compost", fact: "Apple cores are food scraps. Compost them if you can." },
      { emoji: "🍂", name: "Dry leaves", bin: "compost", fact: "Dry leaves are yard waste. They go to compost, not recycling." },
      { emoji: "🛍️", name: "Plastic shopping bag", bin: "trash", fact: "Plastic bags tangle sorting machines. Many towns say trash, or a store drop-off, not the curbside bin." },
      { emoji: "🍕", name: "Greasy pizza box", bin: "trash", fact: "Grease soaks into the cardboard and spoils paper recycling. A clean lid can be paper. A greasy box is trash." },
      { emoji: "🥃", name: "Drinking glass", bin: "trash", fact: "A drinking glass is not bottle glass. It melts differently and can spoil a batch, so it usually goes in the trash." },
      { emoji: "🧻", name: "Used paper napkin", bin: "trash", fact: "Soiled paper is not recyclable. Compost it only if your local program accepts napkins. Otherwise use the trash." },
      { emoji: "🥈", name: "Clean aluminum foil", bin: "metal", fact: "Clean foil is aluminum, so it is metal. Foil covered in food is usually trash." }
    ],
    hard: [
      { emoji: "🔋", name: "Batteries", bin: "special", fact: "Batteries can start fires in trash and recycling trucks. Take them to a battery drop-off." },
      { emoji: "🥤", name: "Foam cup", bin: "trash", fact: "Foam cups are not accepted in most curbside bins. They usually go in the trash." },
      { emoji: "🍵", name: "Ceramic mug", bin: "trash", fact: "Ceramic is not bottle glass. A broken mug belongs in the trash, wrapped so nobody gets cut." },
      { emoji: "💡", name: "CFL light bulb", bin: "special", fact: "Compact fluorescent bulbs contain a small amount of mercury. Recycle them at a household hazardous-waste drop-off, not in the glass bin." },
      { emoji: "🎨", name: "Can of liquid paint", bin: "special", fact: "Liquid paint is household hazardous waste. Take it to a drop-off. An empty, dry metal can is sometimes metal, but wet paint is not." },
      { emoji: "🪢", name: "Garden hose", bin: "trash", fact: "Hoses and cords tangle the sorting machines. They go in the trash." },
      { emoji: "📄", name: "Loose shredded paper", bin: "trash", fact: "Loose shreds fall through the sorters or blow away. Some towns take shreds inside a paper bag. If yours does not, use the trash." },
      { emoji: "〰️", name: "Plastic straw", bin: "trash", fact: "Straws are too small for most sorting machines, so they belong in the trash." }
    ]
  };

  let session = null;

  function binsFor(level) {
    return BINS.filter(function (bin) {
      return level === "hard" || bin.id !== "special";
    });
  }

  function play(level, api) {
    const flag = { stopped: false };
    const help = document.getElementById("help");
    const stage = document.getElementById("stage");
    const items = Edu.shuffle(ROUNDS[level]);
    const bins = binsFor(level);
    let index = 0;
    let streak = 0;
    let locked = false;
    if (help) help.textContent = HELP[level];
    api.resetScore();
    api.status("");

    function show() {
      if (flag.stopped || !stage) return;
      if (index >= items.length) {
        Edu.finish(stage, {
          title: "Nice work",
          score: api.score,
          best: api.best,
          note: "You sorted 8 items. Your town's list is the one to follow at home.",
          win: true,
          onAgain: function () { start(api.level, api); }
        });
        return;
      }
      locked = false;
      const item = items[index];
      stage.innerHTML = "";
      stage.appendChild(Lab.el("p", "progress", (index + 1) + " of " + items.length));
      const card = Lab.el("div", "item-card");
      card.setAttribute("data-answer", item.bin);
      const pic = Lab.el("p", "emoji", item.emoji);
      pic.setAttribute("role", "img");
      pic.setAttribute("aria-label", "Item to sort");
      card.appendChild(pic);
      card.appendChild(Lab.el("p", "question", item.name));
      stage.appendChild(card);
      const wrap = Lab.el("div", "bins");
      const buttons = bins.map(function (bin) {
        const btn = Lab.el("button", "bin " + bin.id, bin.label);
        btn.setAttribute("data-bin", bin.id);
        btn.addEventListener("click", function () {
          if (locked || flag.stopped) return;
          locked = true;
          const ok = bin.id === item.bin;
          buttons.forEach(function (other) { other.disabled = true; });
          btn.classList.add(ok ? "good" : "bad");
          if (!ok) {
            buttons.forEach(function (other) {
              if (other.getAttribute("data-bin") === item.bin) other.classList.add("good");
            });
            streak = 0;
            api.beep("no");
            api.status("Not quite.", "bad");
          } else {
            streak += 1;
            api.add(api.points() + Math.max(0, streak - 1) * 2);
            api.beep("ok");
            api.status(streak > 1 ? "Yes! Streak of " + streak + "." : "Yes!", "good");
          }
          stage.appendChild(Lab.el("p", "fact", item.fact));
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
        });
        wrap.appendChild(btn);
        return btn;
      });
      stage.appendChild(wrap);
    }

    show();
    return { stop: function () { flag.stopped = true; } };
  }

  function start(level, api) {
    if (session) session.stop();
    session = play(level, api);
  }

  Edu.bind("recycle", start);
})();
