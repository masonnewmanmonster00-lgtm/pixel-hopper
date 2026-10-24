(function () {
  "use strict";

  const HELP = {
    easy: "Heat moves from warmer things to cooler things. Sometimes it needs a touch, a flow of air or water, or open space.",
    medium: "Conduction, convection, and radiation are three ways heat travels. A fluffy jacket traps air.",
    hard: "A thermos slows all three. This is about heat, not the electricity in Circuit Builder."
  };

  function frame(sky, ground, inner) {
    return '<svg viewBox="0 0 220 150" role="img" aria-label="Lesson picture">' +
      '<rect width="220" height="150" fill="' + sky + '"/>' +
      '<rect y="112" width="220" height="38" fill="' + ground + '"/>' +
      inner + "</svg>";
  }

  const ART = {
    spoon: frame("#fff3c4", "#efe6d2",
      '<ellipse cx="90" cy="108" rx="36" ry="12" fill="#c4472f" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M70 108c0 18 14 26 28 26" fill="#e7d3c4" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="118" y="40" width="10" height="70" rx="3" fill="#d5dde6" stroke="#1c2430" stroke-width="2"/>' +
      '<ellipse cx="123" cy="36" rx="12" ry="8" fill="#eef2f6" stroke="#1c2430" stroke-width="2"/>'),
    wood: frame("#f6e7c8", "#efe6d2",
      '<ellipse cx="86" cy="108" rx="34" ry="12" fill="#c4472f" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="112" y="46" width="12" height="64" rx="4" fill="#c47a3a" stroke="#1c2430" stroke-width="2"/>'),
    fire: frame("#fff3c4", "#c9d7b0",
      '<path d="M110 108c-20-8-28-28-16-48 8 10 10 10 16-8 8 16 20 20 24 36 6 18-6 28-24 20z" fill="#f07a1a" stroke="#1c2430" stroke-width="2"/>' +
      '<circle cx="150" cy="70" r="10" fill="#f0c7a0" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M146 80 v16" stroke="#2f6fed" stroke-width="4"/>'),
    sun: frame("#fff8d0", "#c9d7b0",
      '<circle cx="70" cy="52" r="18" fill="#f0c43a" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M70 24v10M70 70v10M42 52h10M88 52h10" stroke="#e6b84a" stroke-width="3"/>' +
      '<circle cx="150" cy="90" r="16" fill="#f0c7a0" stroke="#1c2430" stroke-width="2"/>'),
    jacket: frame("#e7f0ea", "#d7c4a4",
      '<path d="M78 48 h64 l14 64 H64 z" fill="#2f6fed" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M96 60 h28 v40 H96 z" fill="#9fd0ef" stroke="#1c2430" stroke-width="2"/>'),
    mitt: frame("#f8e6d8", "#efe6d2",
      '<ellipse cx="110" cy="90" rx="40" ry="28" fill="#c4472f" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="78" y="70" width="28" height="16" rx="6" fill="#a33b24" stroke="#1c2430" stroke-width="2"/>'),
    heater: frame("#f8e6d8", "#efe6d2",
      '<rect x="70" y="70" width="80" height="42" rx="6" fill="#d5dde6" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M86 64c6-12 12-12 8-22M110 64c6-12 12-12 8-22M134 64c6-12 12-12 8-22" fill="none" stroke="#f07a1a" stroke-width="3"/>'),
    shirt: frame("#fff3c4", "#c9d7b0",
      '<path d="M70 56 l20-12 h40 l20 12 v58 H70 z" fill="#1c2430" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M124 48 h36 l8 16" fill="#f7f3ea" stroke="#1c2430" stroke-width="2"/>'),
    thermos: frame("#e7eef6", "#efe6d2",
      '<rect x="90" y="36" width="40" height="16" rx="4" fill="#1c2430"/>' +
      '<rect x="84" y="52" width="52" height="70" rx="12" fill="#d5dde6" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="96" y="64" width="28" height="46" rx="8" fill="#fffdf8" stroke="#9aa8b5" stroke-width="2"/>'),
    fan: frame("#d7ecff", "#efe6d2",
      '<circle cx="110" cy="74" r="28" fill="none" stroke="#1c2430" stroke-width="3"/>' +
      '<path d="M110 74 l22-16 M110 74 l-8 24 M110 74 l-20-10" stroke="#2f6fed" stroke-width="4"/>' +
      '<rect x="104" y="102" width="12" height="22" fill="#6b7280"/>'),
    lake: frame("#d7ecff", "#9fd0ef",
      '<rect y="70" width="220" height="18" fill="#e7f6ff" stroke="#1c2430" stroke-width="2"/>' +
      '<rect y="88" width="220" height="62" fill="#3d8ec9"/>'),
    hands: frame("#fff3c4", "#efe6d2",
      '<rect x="70" y="70" width="36" height="28" rx="8" fill="#f0c7a0" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="114" y="78" width="36" height="22" rx="8" fill="#e7f6ff" stroke="#1c2430" stroke-width="2"/>')
  };

  const EASY = [
    { art: "spoon", ask: "A metal spoon sits in hot soup. The handle gets hot. How did the heat move?", answer: "Conduction through the spoon", choices: ["Conduction through the spoon", "The spoon made its own heat", "Cold flowed up the spoon", "The handle boiled"], fact: "Conduction is heat moving through a material. In metal, the heat travels easily from the hot end to the cooler handle." },
    { art: "wood", ask: "A wooden spoon in the same soup stays cooler at the handle. Why?", answer: "Wood is a poorer conductor of heat than metal", choices: ["Wood is a poorer conductor of heat than metal", "Wood creates cold", "Wood is a liquid", "Wood blocks gravity"], fact: "Wood does not pass heat along as well as metal. The handle you hold stays cooler. This is heat, not the electricity lesson in Circuit Builder." },
    { art: "fire", ask: "You feel a campfire on your face without touching it. How does that heat arrive?", answer: "Radiation", choices: ["Radiation", "Conduction through the air only", "The flames jump into your eyes", "Convection inside a solid rock"], fact: "Radiation carries energy across space, including the air between you and the fire. You do not have to touch the flame. Stay a safe distance back." },
    { art: "heater", ask: "Warm air from a heater rises toward the ceiling. What is that flow called?", answer: "Convection", choices: ["Convection", "Reflection", "A solid current", "Magnetism"], fact: "Convection is heat carried by a moving liquid or gas. Warm air rises, cooler air moves in, and a current forms." },
    { art: "mitt", ask: "Why use a pot holder on a hot pan?", answer: "It slows heat moving into your hand", choices: ["It slows heat moving into your hand", "It makes the pan colder than ice", "It conducts heat faster", "It is only for decoration"], fact: "Cloth is a poor heat conductor, especially when it traps air. It is still not a toy. If the holder is wet, heat gets through faster. Ask an adult before you go near a hot pan." },
    { art: "sun", ask: "How does the Sun's warmth reach you across space?", answer: "Radiation", choices: ["Radiation", "Conduction through empty space", "A wind that starts at the Sun and never stops", "Convection through a solid beam"], fact: "Space between the Sun and Earth is almost empty, so conduction and convection cannot carry the heat. Radiation can cross that gap." },
    { art: "hands", ask: "Which way does heat move?", answer: "From the warmer thing to the cooler thing", choices: ["From the warmer thing to the cooler thing", "From cold into hot, as a stuff called cold", "Only downhill", "Only through wood"], fact: "Heat flows from warmer to cooler. When you hold ice, heat leaves your hand. Cold is not a substance flowing the other way." },
    { art: "jacket", ask: "A mug of hot chocolate warms your hands where you touch it. Which word fits?", answer: "Conduction", choices: ["Conduction", "The mug is radioactive", "Convection inside your bones", "The cup loses its color"], fact: "Your skin and the mug are touching, so heat conducts into your hands. If it is too hot, set it down and tell an adult." }
  ];

  const MEDIUM = [
    { art: "hands", ask: "What is the best description of heat flow?", answer: "It moves from warmer to cooler until the temperatures are closer", choices: ["It moves from warmer to cooler until the temperatures are closer", "Cold is a liquid that soaks in", "Heat only moves on Tuesdays", "Temperatures never change"], fact: "Energy moves from the hotter object to the cooler one. They get closer in temperature. There is no stuff called cold that flows in." },
    { art: "spoon", ask: "Conduction works best in which situation?", answer: "Heat traveling through a material, often a solid you can touch", choices: ["Heat traveling through a material, often a solid you can touch", "Heat hopping across empty space with no contact", "A current of water that is not touching anything", "Sound turning into color"], fact: "In conduction, particles pass energy to their neighbors. A spoon, a pan, and a metal bridge on a hot day are examples." },
    { art: "heater", ask: "Which example is convection?", answer: "Warm water rising in a pot while cooler water sinks", choices: ["Warm water rising in a pot while cooler water sinks", "A spoon handle heating up", "Sunlight crossing space", "A magnet picking up a pin"], fact: "The water moves, carrying heat with it. That current is convection. It happens in liquids and gases, which can flow." },
    { art: "sun", ask: "Which example is radiation?", answer: "Warmth from the Sun reaching Earth through space", choices: ["Warmth from the Sun reaching Earth through space", "A metal tray heating your hand by touch", "Hot air rising from a toaster", "Stirring soup with a spoon"], fact: "Radiation does not need particles to carry it. The Sun warms Earth this way. A nearby fire warms your face this way too." },
    { art: "wood", ask: "A pan has a metal handle and a spoon has a wooden handle. Which handle is safer to hold after cooking?", answer: "The wooden spoon handle", choices: ["The wooden spoon handle", "The bare metal pan handle", "Either one, metal stays cool", "Neither, wood heats faster than metal"], fact: "Metal conducts heat well, so a bare metal handle can burn you. Wood conducts heat poorly. Many pans add a plastic grip for the same reason." },
    { art: "jacket", ask: "Why does a fluffy jacket keep you warm?", answer: "It traps air, and trapped air is a poor heat conductor", choices: ["It traps air, and trapped air is a poor heat conductor", "It creates heat like a stove", "Feathers are a kind of fire", "It blocks all radiation from ever existing"], fact: "The jacket does not make heat. Your body does. Trapped air slows that heat from conducting away. Wet insulation works less well because water conducts heat better than air." },
    { art: "shirt", ask: "On a sunny day, which shirt usually absorbs more of the Sun's radiation?", answer: "A dark shirt", choices: ["A dark shirt", "A white shirt", "A clear glass shirt", "Both colors absorb none"], fact: "Dark surfaces absorb more visible light and warm up. Light surfaces reflect more. Shade, a hat, and sunscreen still matter, because sunburn comes from ultraviolet light you cannot see." },
    { art: "heater", ask: "A heater sits on the floor. Why does the whole room eventually feel warmer?", answer: "Warm air rises and cooler air moves in to be heated", choices: ["Warm air rises and cooler air moves in to be heated", "The floor sends cold upward", "Heat cannot move through air", "The ceiling conducts the cold away"], fact: "That loop is a convection current. A high window can let the warmest air out on a hot day for the same reason." }
  ];

  const HARD = [
    { art: "sun", ask: "What are the three ways heat travels?", answer: "Conduction, convection, and radiation", choices: ["Conduction, convection, and radiation", "Melting, boiling, and freezing", "North, south, and east", "Solids, liquids, and gases only"], fact: "Conduction passes heat through a material. Convection carries it in a moving fluid. Radiation crosses even empty space. Melting and boiling are changes of state, which Matter Lab explores." },
    { art: "thermos", ask: "Why does a vacuum flask keep cocoa hot?", answer: "The gap has almost no air, and the shiny walls reflect radiation", choices: ["The gap has almost no air, and the shiny walls reflect radiation", "It adds a tiny stove", "The vacuum creates cold particles", "Glass always makes drinks hotter"], fact: "With almost no air in the gap, conduction and convection nearly stop. The shiny lining reflects radiation. Heat still leaks slowly through the lid and the joins." },
    { art: "spoon", ask: "A metal spoon conducts heat. What should you remember from Circuit Builder?", answer: "Metals can conduct electricity too, but a hot spoon is a heat lesson", choices: ["Metals can conduct electricity too, but a hot spoon is a heat lesson", "Heat and electricity are the same school topic", "A hot spoon proves the soup is a battery", "Wood is a good electrical wire"], fact: "Circuit Builder is about electric circuits. Here, conduction means heat moving along the spoon. Many metals do both jobs, which is why wires and pans are metal." },
    { art: "heater", ask: "Can convection happen inside a solid steel block the way it does in a pot of water?", answer: "No. The steel cannot flow, so heat conducts through it instead", choices: ["No. The steel cannot flow, so heat conducts through it instead", "Yes, solids swirl like soup", "Only if the block is painted", "Convection is only for ice"], fact: "Convection needs particles that can move around, as in water or air. In solid steel the atoms stay in place and pass energy along by conduction." },
    { art: "sun", ask: "Why can't the Sun warm Earth by conduction?", answer: "Nearly empty space has no material to conduct the heat", choices: ["Nearly empty space has no material to conduct the heat", "The Sun is colder than Earth", "Conduction only works at night", "Earth is inside the Sun"], fact: "Conduction needs matter. The space between the Sun and Earth does not provide a spoon-like path. Radiation carries the energy." },
    { art: "hands", ask: "Your hand feels cold on an ice pack. What is happening?", answer: "Heat is leaving your hand and entering the ice pack", choices: ["Heat is leaving your hand and entering the ice pack", "Cold particles are flowing into your blood", "The ice pack pushes gravity away", "Your hand is making extra heat and keeping it"], fact: "The ice pack is cooler, so heat flows out of your warmer skin. Wrapped ice is safer than bare ice on skin. First Aid Heroes covers cooling an injury." },
    { art: "lake", ask: "A lake in Canada or the northern United States starts to freeze. Which science is involved?", answer: "Water near 4 °C sinks, and ice that forms later floats on top", choices: ["Water near 4 °C sinks, and ice that forms later floats on top", "Lakes always freeze from the mud upward", "Ice is denser than water, so it sinks", "Convection cannot happen in water"], fact: "Fresh water is densest at about 4 °C, so that water sinks. Colder water stays above and can freeze. Ice then floats. Sink or Float explains why the ice itself stays on top." },
    { art: "fan", ask: "A fan makes you feel cooler on a warm day. What is it doing?", answer: "Moving air over your skin so sweat can evaporate", choices: ["Moving air over your skin so sweat can evaporate", "Lowering the temperature of the whole room like an air conditioner", "Creating cold particles", "Stopping radiation from the Sun indoors"], fact: "A fan does not refrigerate the room. It blows away the warm layer near your skin and helps sweat evaporate, and evaporation takes heat with it." }
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
      note: "You finished " + round.length + " heat questions.",
      questions: round,
      draw: draw,
      again: function () { start(api.level, api); }
    });
  }

  Edu.bind("heat", start);
})();
