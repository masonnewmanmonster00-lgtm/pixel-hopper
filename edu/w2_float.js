(function () {
  "use strict";

  const HELP = {
    easy: "Some things float in water and some sink. A life jacket is for the water, with a grown-up nearby.",
    medium: "Floating depends on density, not only on how heavy something feels. Shape and trapped air matter.",
    hard: "Compare an object with water. Salt water, ice, boats, and submarines all use the same idea."
  };

  function frame(inner) {
    return '<svg viewBox="0 0 220 150" role="img" aria-label="Lesson picture">' +
      '<rect width="220" height="150" fill="#d7ecff"/>' +
      '<rect y="78" width="220" height="72" fill="#3d8ec9"/>' +
      '<path d="M0 86 q20 8 40 0 t40 0 t40 0 t40 0 t40 0 t40 0" fill="none" stroke="#9fd0ef" stroke-width="3"/>' +
      inner + "</svg>";
  }

  const ART = {
    log: frame('<rect x="36" y="70" width="148" height="22" rx="11" fill="#a8642e" stroke="#1c2430" stroke-width="2"/>' +
      '<circle cx="40" cy="81" r="11" fill="#c47a3a" stroke="#1c2430" stroke-width="2"/>'),
    rock: frame('<ellipse cx="110" cy="112" rx="28" ry="16" fill="#6b7280" stroke="#1c2430" stroke-width="2"/>' +
      '<ellipse cx="100" cy="108" rx="10" ry="6" fill="#9aa8b5"/>'),
    bottle: frame('<rect x="96" y="36" width="28" height="16" rx="3" fill="#9fd0ef" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="88" y="52" width="44" height="40" rx="8" fill="#e7f6ff" stroke="#1c2430" stroke-width="2"/>'),
    full: frame('<rect x="96" y="58" width="28" height="12" rx="3" fill="#1c2430"/>' +
      '<rect x="88" y="70" width="44" height="48" rx="6" fill="#3d8ec9" stroke="#1c2430" stroke-width="2"/>'),
    jacket: frame('<path d="M78 48 h64 l12 70 H66 z" fill="#f07a1a" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="100" y="62" width="20" height="28" fill="#ffd36e" stroke="#1c2430" stroke-width="2"/>' +
      '<circle cx="90" cy="40" r="10" fill="#f0c7a0" stroke="#1c2430" stroke-width="2"/>'),
    boat: frame('<path d="M40 88 h140 l-18 28 H58 z" fill="#c4472f" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="100" y="58" width="28" height="30" fill="#fffdf8" stroke="#1c2430" stroke-width="2"/>'),
    ice: frame('<rect x="78" y="64" width="64" height="28" rx="4" fill="#e7f6ff" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M86 74 h20 M120 80 h16" stroke="#9fd0ef" stroke-width="2"/>'),
    foil: frame('<path d="M48 90 l30-28 28 20 36-24 30 32 v16 H48 z" fill="#d5dde6" stroke="#1c2430" stroke-width="2"/>'),
    salt: frame('<ellipse cx="110" cy="100" rx="70" ry="22" fill="#7eb6e0" stroke="#1c2430" stroke-width="2"/>' +
      '<circle cx="110" cy="78" r="14" fill="#f0c7a0" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="98" y="90" width="24" height="16" fill="#2f6fed" stroke="#1c2430" stroke-width="2"/>'),
    sub: frame('<ellipse cx="110" cy="108" rx="58" ry="18" fill="#3a4150" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="96" y="86" width="22" height="14" fill="#ffd36e" stroke="#1c2430" stroke-width="2"/>'),
    pond: frame('<rect x="70" y="96" width="80" height="10" rx="2" fill="#e7f6ff" stroke="#1c2430" stroke-width="2"/>' +
      '<ellipse cx="150" cy="118" rx="16" ry="8" fill="#6b7280" stroke="#1c2430" stroke-width="2"/>'),
    wood: frame('<rect x="48" y="96" width="50" height="16" rx="4" fill="#c47a3a" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="122" y="108" width="46" height="14" rx="3" fill="#5c3317" stroke="#1c2430" stroke-width="2"/>')
  };

  const EASY = [
    { art: "log", ask: "A dry wooden log is set in a pond. What does it usually do?", answer: "Float", choices: ["Float", "Sink straight to the bottom", "Turn into a fish", "Freeze the pond"], fact: "Most dry wood is less dense than water, so a log floats even though it can be heavy." },
    { art: "rock", ask: "A small solid stone is dropped into a pond. What does it usually do?", answer: "Sink", choices: ["Sink", "Float like a boat", "Hover in the air", "Become salt"], fact: "A typical stone is denser than water, so it sinks. A few bubbly rocks, such as pumice, are the exception." },
    { art: "bottle", ask: "An empty plastic bottle is capped so air stays inside. In a pool, it will…", answer: "Float", choices: ["Float", "Always sink", "Dissolve", "Weigh more than a car"], fact: "The bottle holds air. Air is much less dense than water, so the closed bottle floats." },
    { art: "full", ask: "The same bottle is filled completely with water, with no air left, and capped. It will…", answer: "Sink", choices: ["Sink", "Float higher than before", "Fly", "Turn into wood"], fact: "Without a pocket of air, the full bottle is about as dense as water or a little denser, so it sinks." },
    { art: "jacket", ask: "What is a life jacket for?", answer: "Helping you float in the water", choices: ["Helping you float in the water", "Making you sink faster", "Keeping rain off your homework", "Warming soup"], fact: "A life jacket uses foam that traps air. Wear one in a boat. Rules differ by place, and a grown-up should be with you near deep water." },
    { art: "pond", ask: "Which object is more likely to float?", answer: "A big dry log", choices: ["A big dry log", "A small solid pebble", "A steel marble", "A rock"], fact: "Bigger does not mean it sinks. The log is large but less dense than water. The pebble is small but denser than water." },
    { art: "ice", ask: "An ice cube is put into a glass of water. What happens?", answer: "It floats", choices: ["It floats", "It always sinks", "It turns the glass into metal", "It falls upward out of the glass"], fact: "Ice is solid water, and it is less dense than liquid water, so it floats. Matter Lab is where you sort solids, liquids, and gases." },
    { art: "boat", ask: "You are going out in a small boat. What is the safe habit?", answer: "Wear a life jacket and go with a grown-up", choices: ["Wear a life jacket and go with a grown-up", "Leave the life jackets on shore", "Stand up and rock the boat", "Swim under the boat alone"], fact: "A life jacket helps you float if you fall in. An adult should be in charge, and you stay seated while the boat is moving." }
  ];

  const MEDIUM = [
    { art: "log", ask: "What decides whether something floats in water?", answer: "Its density compared with water", choices: ["Its density compared with water", "Only its color", "Only how old it is", "Whether it has a name"], fact: "Density is how much mass is packed into a space. If the object is less dense than water, it floats. If it is denser, it sinks." },
    { art: "boat", ask: "A solid steel ball sinks, but a steel ship can float. Why?", answer: "The ship holds a lot of air, so overall it is less dense than water", choices: ["The ship holds a lot of air, so overall it is less dense than water", "Steel always floats", "Ships turn off gravity", "Paint makes steel lighter than air"], fact: "Steel itself is denser than water. The ship's shape encloses air. The steel plus that air, taken together, is less dense than the same volume of water." },
    { art: "foil", ask: "You have one sheet of foil. Which shape is more likely to float?", answer: "A boat shape that holds air", choices: ["A boat shape that holds air", "A tight ball with the air squeezed out", "Either shape always sinks", "Either shape always flies"], fact: "The material is the same. A tight ball can sink. Shaped into a boat, the foil pushes aside enough water and traps air, so it floats." },
    { art: "salt", ask: "Why is it easier to float in very salty water than in fresh water?", answer: "Salt water is denser", choices: ["Salt water is denser", "Salt removes gravity", "Fresh water is solid", "Salt makes you weigh nothing"], fact: "Dissolved salt packs more mass into the water, so the water is denser. The Dead Sea is extremely salty, and people float there more easily. It is still deep water, not a place to swim alone." },
    { art: "ice", ask: "Why does ice float in a glass of water?", answer: "Ice is less dense than liquid water", choices: ["Ice is less dense than liquid water", "Ice is heavier than the same amount of water", "Glasses push upward", "Ice has no mass"], fact: "When water freezes, the crystals take up more space. The same mass fills more volume, so ice is less dense and floats." },
    { art: "log", ask: "A toy boat floats and the water level in the tub rises a little. What happened?", answer: "The boat pushed some water aside", choices: ["The boat pushed some water aside", "The boat deleted some water", "The water flew into the air and stayed there", "The tub shrank"], fact: "A floating object displaces water. It pushes aside a weight of water equal to its own weight. That is why the level rises." },
    { art: "bottle", ask: "An orange with its peel often floats. The same orange, peeled, often sinks. Why?", answer: "The peel holds tiny pockets of air", choices: ["The peel holds tiny pockets of air", "Peeling adds steel", "The orange changes color and color controls floating", "The peel was full of stones"], fact: "The peel is spongy and full of air, which lowers the orange's density. Without the peel, the fruit is denser than water and sinks." },
    { art: "jacket", ask: "How does a foam life jacket help you float?", answer: "The foam traps air, so you and the jacket together are less dense than water", choices: ["The foam traps air, so you and the jacket together are less dense than water", "It makes your body denser than a rock", "It drinks the water", "It only works on dry land"], fact: "The foam is full of trapped air. Arm floaties from a toy box are not the same as a fastened life jacket." }
  ];

  const HARD = [
    { art: "rock", ask: "An object is denser than water. What does it do in water?", answer: "It sinks", choices: ["It sinks", "It must float", "It turns into ice", "It becomes salt"], fact: "Denser than water means more mass in the same space than the water has. That object sinks, unless a shape around it traps enough air." },
    { art: "sub", ask: "A submarine takes water into its tanks and goes down. Why?", answer: "The added water makes the submarine denser", choices: ["The added water makes the submarine denser", "The tanks erase gravity", "Water in the tanks turns the hull into wood", "Submarines float only in air"], fact: "Ballast tanks let the crew change the submarine's average density. Letting water in makes it sink. Pushing the water out with air makes it rise." },
    { art: "salt", ask: "Which statement about the Dead Sea is accurate?", answer: "Its very salty water makes floating easier, and it is still not a place to swim alone", choices: ["Its very salty water makes floating easier, and it is still not a place to swim alone", "Nobody can float there", "The salt makes every swimmer sink faster", "It is fresh water with no salt"], fact: "The Dead Sea is much saltier than the ocean, so your body floats higher. You can still put your face under, and you still need a grown-up and a safe plan." },
    { art: "pond", ask: "In winter, ice forms on the top of a pond. Why does that matter for animals under it?", answer: "The ice floats, so liquid water can remain below", choices: ["The ice floats, so liquid water can remain below", "Ice sinks and crushes the bottom", "Ponds freeze from the bottom up every time", "Fish leave the water to breathe ice"], fact: "Because ice is less dense than liquid water, it stays on top. Liquid water can remain underneath for a while. Animals still need the ice to be left alone." },
    { art: "ice", ask: "Most solids sink in their own melted liquid. What is special about water?", answer: "Its solid form, ice, is less dense than the liquid", choices: ["Its solid form, ice, is less dense than the liquid", "Ice is always a gas", "Water cannot freeze", "Solid water is heavier than liquid water, so ice sinks"], fact: "Water spreads out as it freezes. That is unusual. It is why ice cubes float and why pipes can crack if water freezes inside them." },
    { art: "wood", ask: "Does every piece of wood float?", answer: "No. Some very dense or waterlogged wood sinks", choices: ["No. Some very dense or waterlogged wood sinks", "Yes, wood is weightless", "Only painted wood can sink", "Wood floats only in salt and never in fresh water"], fact: "Many woods float. A few, such as ebony, are denser than water. Wood that has soaked up water can sink too." },
    { art: "boat", ask: "A boat is loaded with more and more rocks. What can happen?", answer: "It sits lower, and it can sink if water comes over the sides", choices: ["It sits lower, and it can sink if water comes over the sides", "Extra rocks always make it lighter", "Boats cannot sink", "Rocks turn into air"], fact: "Added mass makes the boat displace more water and ride lower. Once water floods in, the air space fills and the boat can sink. Do not overload a boat." },
    { art: "log", ask: "Which comparison is the best floating rule?", answer: "Compare the object's density with the density of the water", choices: ["Compare the object's density with the density of the water", "Heavier objects always sink", "Larger objects always sink", "Round objects always float"], fact: "A heavy log can float and a light pebble can sink. Size and the number on a scale are not enough. Density compared with the water is the rule." }
  ];

  let session = null;

  function pack(item) {
    return {
      art: item.art,
      ask: item.ask,
      answer: item.answer,
      fact: item.fact,
      choices: Edu.shuffle(item.choices).map(function (label) {
        return { label: label, value: label };
      })
    };
  }

  function questions(level) {
    const bank = level === "easy" ? EASY : level === "medium" ? MEDIUM : HARD;
    return Edu.shuffle(bank.map(pack));
  }

  function draw(stage, item) {
    if (!item.art || !ART[item.art]) return;
    const wrap = Lab.el("div", "scene");
    wrap.innerHTML = ART[item.art];
    stage.appendChild(wrap);
  }

  function start(level, api) {
    if (session) session.stop();
    const round = questions(level);
    session = Lab.round(api, {
      help: HELP[level],
      note: "You finished " + round.length + " floating questions.",
      questions: round,
      draw: draw,
      again: function () { start(api.level, api); }
    });
  }

  Edu.bind("float", start);
})();
