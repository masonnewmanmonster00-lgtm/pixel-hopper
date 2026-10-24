(function () {
  "use strict";

  const HELP = {
    easy: "In Canada and the United States, cars drive on the right. Look left, then right, then left again before you cross.",
    medium: "Read the sign or the signal. A helmet sits level, with the strap fastened, about two fingers above your eyebrows.",
    hard: "Some street rules change by province, state, or city. The safe habits stay the same: look, wait, and be seen."
  };

  function frame(sky, ground, inner) {
    return '<svg viewBox="0 0 220 150" role="img" aria-label="Lesson picture">' +
      '<rect width="220" height="150" fill="' + sky + '"/>' +
      '<rect y="108" width="220" height="42" fill="' + ground + '"/>' +
      inner + "</svg>";
  }

  function lamp(y, color, on) {
    return '<circle cx="110" cy="' + y + '" r="11" fill="' + (on ? color : "#3a4150") + '" stroke="#f7f3ea" stroke-width="2"/>';
  }

  function signal(lit) {
    return frame("#d7ecff", "#9aa8b5",
      '<rect x="92" y="24" width="36" height="88" rx="8" fill="#2a3140" stroke="#1c2430" stroke-width="2"/>' +
      lamp(42, "#e23b2f", lit === "red") +
      lamp(68, "#f0c43a", lit === "yellow") +
      lamp(94, "#3cba5a", lit === "green"));
  }

  const ART = {
    cross: frame("#d7ecff", "#8fbf7a",
      '<rect y="78" width="220" height="42" fill="#4b5563"/>' +
      '<rect x="86" y="78" width="16" height="42" fill="#f7f3ea"/>' +
      '<rect x="110" y="78" width="16" height="42" fill="#f7f3ea"/>' +
      '<rect x="134" y="78" width="16" height="42" fill="#f7f3ea"/>' +
      '<circle cx="40" cy="96" r="10" fill="#2f6fed" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="24" y="90" width="22" height="12" fill="#2f6fed" stroke="#1c2430" stroke-width="2"/>' +
      '<circle cx="190" cy="96" r="10" fill="#c4472f" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="174" y="90" width="22" height="12" fill="#c4472f" stroke="#1c2430" stroke-width="2"/>' +
      '<circle cx="118" cy="58" r="8" fill="#f0c7a0" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="110" y="66" width="16" height="18" rx="3" fill="#2f6fed" stroke="#1c2430" stroke-width="2"/>'),
    red: signal("red"),
    yellow: signal("yellow"),
    green: signal("green"),
    helmet: frame("#d7ecff", "#c9d7b0",
      '<circle cx="110" cy="86" r="28" fill="#f0c7a0" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M78 78 Q110 40 142 78 Q110 58 78 78" fill="#2f6fed" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M84 84 q26 16 52 0" fill="none" stroke="#1c2430" stroke-width="3"/>' +
      '<circle cx="100" cy="88" r="2" fill="#1c2430"/>' +
      '<circle cx="120" cy="88" r="2" fill="#1c2430"/>' +
      '<path d="M102 98 q8 6 16 0" fill="none" stroke="#1c2430" stroke-width="2"/>'),
    bus: frame("#d7ecff", "#6b7280",
      '<rect x="28" y="58" width="150" height="52" rx="8" fill="#f0c43a" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="40" y="68" width="28" height="18" fill="#9fd0ef" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="76" y="68" width="28" height="18" fill="#9fd0ef" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="112" y="68" width="28" height="18" fill="#9fd0ef" stroke="#1c2430" stroke-width="2"/>' +
      '<circle cx="58" cy="114" r="8" fill="#1c2430"/>' +
      '<circle cx="148" cy="114" r="8" fill="#1c2430"/>' +
      '<circle cx="46" cy="62" r="5" fill="#e23b2f" stroke="#1c2430" stroke-width="2"/>' +
      '<circle cx="160" cy="62" r="5" fill="#e23b2f" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="168" y="70" width="28" height="8" fill="#e23b2f" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="176" y="78" width="36" height="22" rx="2" fill="#f7f3ea" stroke="#1c2430" stroke-width="2"/>'),
    ball: frame("#d7ecff", "#8fbf7a",
      '<rect y="86" width="220" height="28" fill="#4b5563"/>' +
      '<circle cx="150" cy="96" r="12" fill="#f7f3ea" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M150 84 v24 M138 96 h24" stroke="#1c2430" stroke-width="2"/>' +
      '<circle cx="48" cy="70" r="8" fill="#f0c7a0" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="40" y="78" width="16" height="16" rx="3" fill="#2f9e44" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M64 86 h28" stroke="#1c2430" stroke-width="2" stroke-dasharray="3 3"/>'),
    bike: frame("#d7ecff", "#9aa8b5",
      '<circle cx="62" cy="100" r="18" fill="none" stroke="#1c2430" stroke-width="3"/>' +
      '<circle cx="150" cy="100" r="18" fill="none" stroke="#1c2430" stroke-width="3"/>' +
      '<path d="M62 100 L96 100 L118 78 L150 100 L118 100 L96 78 Z" fill="none" stroke="#2f6fed" stroke-width="3"/>' +
      '<rect x="168" y="86" width="34" height="16" rx="3" fill="#c4472f" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M176 78 l16 8" stroke="#1c2430" stroke-width="2"/>'),
    belt: frame("#e7eef6", "#d9d3c7",
      '<rect x="36" y="48" width="148" height="70" rx="10" fill="#9fd0ef" stroke="#1c2430" stroke-width="2"/>' +
      '<circle cx="90" cy="78" r="10" fill="#f0c7a0" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="80" y="88" width="22" height="22" rx="4" fill="#2f6fed" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M78 80 q24 28 48 -6" fill="none" stroke="#1c2430" stroke-width="4"/>'),
    walk: frame("#d7ecff", "#9aa8b5",
      '<rect x="86" y="28" width="48" height="78" rx="6" fill="#1c2430" stroke="#1c2430" stroke-width="2"/>' +
      '<circle cx="110" cy="48" r="6" fill="#f7f3ea"/>' +
      '<path d="M110 56 v16 M110 64 l-10 10 M110 64 l10 10 M110 72 l-8 16 M110 72 l8 16" stroke="#f7f3ea" stroke-width="3" fill="none"/>'),
    hand: frame("#d7ecff", "#9aa8b5",
      '<rect x="86" y="28" width="48" height="78" rx="6" fill="#1c2430"/>' +
      '<path d="M98 46 h24 v28 h-8 v-16 h-8 v16 h-8 z" fill="#e23b2f"/>'),
    yield: frame("#d7ecff", "#8fbf7a",
      '<path d="M110 36 L166 112 L54 112 Z" fill="#f7f3ea" stroke="#e23b2f" stroke-width="8"/>' +
      '<path d="M110 52 L150 104 L70 104 Z" fill="#f7f3ea"/>' +
      '<rect x="104" y="112" width="12" height="18" fill="#9aa8b5" stroke="#1c2430" stroke-width="2"/>'),
    stop: frame("#d7ecff", "#8fbf7a",
      '<polygon points="110,28 146,42 160,78 146,114 110,128 74,114 60,78 74,42" fill="#e23b2f" stroke="#1c2430" stroke-width="3"/>' +
      '<rect x="104" y="128" width="12" height="16" fill="#9aa8b5" stroke="#1c2430" stroke-width="2"/>'),
    phones: frame("#d7ecff", "#8fbf7a",
      '<circle cx="110" cy="70" r="18" fill="#f0c7a0" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M86 78 q-8 16 8 20" fill="none" stroke="#1c2430" stroke-width="4"/>' +
      '<path d="M134 78 q8 16 -8 20" fill="none" stroke="#1c2430" stroke-width="4"/>' +
      '<rect y="112" width="220" height="20" fill="#4b5563"/>' +
      '<rect x="96" y="112" width="10" height="20" fill="#f7f3ea"/>' +
      '<rect x="114" y="112" width="10" height="20" fill="#f7f3ea"/>'),
    rail: frame("#d7ecff", "#c9b48a",
      '<rect x="96" y="24" width="8" height="70" fill="#f7f3ea" stroke="#1c2430" stroke-width="2" transform="rotate(-28 100 60)"/>' +
      '<rect x="116" y="24" width="8" height="70" fill="#f7f3ea" stroke="#1c2430" stroke-width="2" transform="rotate(28 120 60)"/>' +
      '<rect x="20" y="96" width="180" height="8" fill="#e23b2f" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="20" y="88" width="10" height="24" fill="#f7f3ea" stroke="#1c2430" stroke-width="2"/>' +
      '<rect y="118" width="220" height="8" fill="#6b7280"/>' +
      '<rect y="132" width="220" height="6" fill="#6b7280"/>'),
    parked: frame("#d7ecff", "#8fbf7a",
      '<rect y="96" width="220" height="22" fill="#4b5563"/>' +
      '<rect x="18" y="78" width="52" height="26" rx="4" fill="#2f6fed" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="150" y="78" width="52" height="26" rx="4" fill="#c4472f" stroke="#1c2430" stroke-width="2"/>' +
      '<circle cx="110" cy="70" r="7" fill="#f0c7a0" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="103" y="78" width="14" height="14" fill="#2f9e44" stroke="#1c2430" stroke-width="2"/>')
  };

  const EASY = [
    {
      art: "cross",
      ask: "In Canada and the United States, how do you look before you step into the street?",
      answer: "Left, then right, then left again",
      choices: ["Left, then right, then left again", "Only behind you", "Close your eyes and run", "Only up at the sky"],
      fact: "Cars drive on the right, so the nearest lane comes from your left. Look left, then right, then left again. Cross only when the way is clear."
    },
    {
      art: "cross",
      ask: "Where is the safest usual place to cross?",
      answer: "At a crosswalk or a corner",
      choices: ["At a crosswalk or a corner", "Between parked cars", "Anywhere in the middle of the block", "Right behind a bus"],
      fact: "Cross at a corner or a marked crosswalk. Drivers expect people there. Do not step out from between parked cars."
    },
    {
      art: "red",
      ask: "The traffic light facing you is red. What do you do?",
      answer: "Stop and wait for the walk signal",
      choices: ["Stop and wait for the walk signal", "Run before the cars move", "Cross if nobody is honking", "Walk on red because you are small"],
      fact: "Red means stop. Wait on the curb for a walk signal, then look left, right, and left again. A fresh green light for cars is not a reason to step out without looking."
    },
    {
      art: "helmet",
      ask: "When should you wear a bike helmet?",
      answer: "On every ride",
      choices: ["On every ride", "Only on hills", "Only if a friend is watching", "Only on a brand-new bike"],
      fact: "Wear a helmet every time you ride, including short trips. It should be level, with the strap fastened. Helmet laws differ by province and state, but the safe habit does not."
    },
    {
      art: "bus",
      ask: "A school bus has flashing red lights and the stop arm is out. You need to cross. What do you do?",
      answer: "Wait for the driver to signal, then cross in front",
      choices: ["Wait for the driver to signal, then cross in front", "Run behind the bus", "Cross while the cars are still moving", "Wave the cars around the bus"],
      fact: "Flashing red lights and an out stop arm mean traffic on your side stops. You still wait for the driver's signal. Cross in front, where the driver can see you. Never cross behind the bus."
    },
    {
      art: "ball",
      ask: "Your ball rolls into the street. What is the safe move?",
      answer: "Stop and get an adult. Do not chase it",
      choices: ["Stop and get an adult. Do not chase it", "Sprint after it", "Close your eyes and reach", "Send a younger child"],
      fact: "Do not chase a ball, a pet, or a hat into the street. Stop at the curb and ask an adult for help. Drivers may not see you in time."
    },
    {
      art: "bike",
      ask: "If you ride a bike on the road in Canada or the United States, which way do you go?",
      answer: "On the right, the same direction as the cars",
      choices: ["On the right, the same direction as the cars", "On the left, facing the cars", "Down the middle of the lane with your eyes closed", "Wherever the sidewalk looks empty"],
      fact: "On the road, ride on the right with traffic. Stop at stop signs, and use a light at dusk. Sidewalk rules are different in each city, so follow the local rule."
    },
    {
      art: "belt",
      ask: "What do you do every time you ride in a car?",
      answer: "Buckle the seat belt",
      choices: ["Buckle the seat belt", "Kneel on the seat", "Share one belt with a friend", "Hold the door instead"],
      fact: "Buckle up in the back seat and the front seat, on short trips too. A seat belt holds you if the car stops suddenly."
    }
  ];

  const MEDIUM = [
    {
      art: "helmet",
      ask: "How should a bike helmet fit?",
      answer: "Level, strap snug, about two fingers above the eyebrows",
      choices: ["Level, strap snug, about two fingers above the eyebrows", "Pushed back so your hair shows", "Loose enough to tip over your eyes", "Hanging from the handlebars"],
      fact: "The helmet sits level, about two fingers above your eyebrows, and the strap is snug under your chin. A loose or tilted helmet cannot protect you well."
    },
    {
      art: "walk",
      ask: "The signal shows a white walking person. What may you do?",
      answer: "Start if the way is clear, and still look",
      choices: ["Start if the way is clear, and still look", "Step out without looking", "Run because the cars must freeze", "Wait until it turns red"],
      fact: "A white walking person, or a WALK signal, means you may start if the path is clear. Still look left, right, and left. Turning drivers may not see you."
    },
    {
      art: "hand",
      ask: "The don't-walk signal is flashing. You are still on the curb. What do you do?",
      answer: "Do not start. Wait for the next walk signal",
      choices: ["Do not start. Wait for the next walk signal", "Sprint to beat the light", "Start if you are already late", "Cross with your eyes on your phone"],
      fact: "A flashing don't-walk, often an orange hand, means do not start. If you are already in the crosswalk, keep going and finish. Do not turn around in the middle."
    },
    {
      art: "yield",
      ask: "This sign is an upside-down triangle. What does it tell a driver?",
      answer: "Slow down and give the right of way",
      choices: ["Slow down and give the right of way", "Speed up to go first", "Park under the sign", "Honk and keep going"],
      fact: "A yield sign is an upside-down triangle. Drivers slow down and let other traffic or people go first. You still do not step out until the cars have actually stopped."
    },
    {
      art: "stop",
      ask: "What shape is a stop sign in Canada and the United States?",
      answer: "An octagon, a shape with eight sides",
      choices: ["An octagon, a shape with eight sides", "A circle", "An upside-down triangle", "A rectangle"],
      fact: "The stop sign is a red octagon. You can recognize the shape even if words are hard to see. Drivers must stop. You still wait until it is your turn and the way is clear."
    },
    {
      art: "bus",
      ask: "Where do you cross when you get off a school bus?",
      answer: "In front of the bus, where the driver can see you",
      choices: ["In front of the bus, where the driver can see you", "Behind the bus", "Between the bus and a parked car", "After the bus has already left"],
      fact: "Cross in front of the bus, far enough ahead that the driver can see you, and only after the driver signals. Never cross behind it. The driver cannot see you there."
    },
    {
      art: "phones",
      ask: "You are wearing headphones and you need to cross. What is the safe habit?",
      answer: "Take them off so you can hear traffic",
      choices: ["Take them off so you can hear traffic", "Turn the music up", "Keep them on and run", "Close your eyes to concentrate"],
      fact: "Take headphones off before you cross so you can hear engines, horns, and sirens. Look as well. Hearing does not replace looking."
    },
    {
      art: "green",
      ask: "The light turns green for your direction. What else is true?",
      answer: "You still look before you step out",
      choices: ["You still look before you step out", "Green means close your eyes and go", "Green means every car has stopped forever", "Green means run diagonally"],
      fact: "A green light does not mean you can step out without looking. A driver may be turning or running the light. Look left, right, and left again, and keep watching as you cross."
    }
  ];

  const HARD = [
    {
      art: "bus",
      ask: "A school bus is loading kids on the far side of a divided highway. Which statement is right?",
      answer: "The rule for the opposite direction differs by province and state",
      choices: [
        "The rule for the opposite direction differs by province and state",
        "Every province and state uses one identical rule",
        "Cars on your side may pass a bus that is loading",
        "Kids should cross behind the bus to save time"
      ],
      fact: "Traffic beside a bus with flashing red lights and the stop arm out must stop. On a divided highway, the rule for cars going the other way is not the same in every province or state. Learn the local rule. Never pass a bus that is loading on your side, and never cross behind the bus."
    },
    {
      art: "helmet",
      ask: "Which statement about bike helmets is accurate for Canada and the United States?",
      answer: "Helmet laws differ, and the safe habit is to wear one every time",
      choices: [
        "Helmet laws differ, and the safe habit is to wear one every time",
        "One federal law is identical in every province and state",
        "Helmets are only for races",
        "A loose helmet is safer than a snug one"
      ],
      fact: "Some places require helmets for children or for every rider, and some do not. The law is local. Wear a helmet on every ride anyway, level and with the strap fastened."
    },
    {
      art: "rail",
      ask: "The railroad gates are down and the lights are flashing. What do you do?",
      answer: "Wait. Never go around the gates",
      choices: ["Wait. Never go around the gates", "Duck under the gate if you are late", "Cross if you cannot see a train yet", "Bike around the end of the gate"],
      fact: "Lowered gates mean stop and wait, on foot or on a bike. A train is wider than the tracks and cannot swerve. It is closer and faster than it looks. Go only after the gates are up and the lights have stopped."
    },
    {
      art: "bike",
      ask: "May you ride a bicycle on the sidewalk?",
      answer: "It depends on the city. Follow the local rule",
      choices: ["It depends on the city. Follow the local rule", "Sidewalks are always required", "Sidewalks are banned everywhere", "Only if you ride against traffic"],
      fact: "Some cities allow sidewalk riding, some allow it for young children, and some ban it. Read the local rule. On the road, ride on the right with traffic and stop at stop signs."
    },
    {
      art: "cross",
      ask: "Why look left first in Canada and the United States?",
      answer: "The nearest lane of traffic comes from the left",
      choices: ["The nearest lane of traffic comes from the left", "Cars drive on the left, as in the United Kingdom", "The left shoe should step first", "Traffic lights only face left"],
      fact: "People drive on the right, so the closest cars approach from your left. Look left first, then right, then left again before you step out, and keep looking while you cross."
    },
    {
      art: "yellow",
      ask: "The light turns yellow and you are still on the curb. What do you do?",
      answer: "Do not start. Wait for the next walk signal",
      choices: ["Do not start. Wait for the next walk signal", "Race the cars", "Yellow means walk faster", "Yellow is the same as a walk signal"],
      fact: "Yellow means the light is about to turn red. If you have not started, stay on the curb. If you are already crossing, finish. Do not enter on yellow."
    },
    {
      art: "parked",
      ask: "Why is it unsafe to cross between parked cars?",
      answer: "Drivers cannot see you, and you cannot see them",
      choices: ["Drivers cannot see you, and you cannot see them", "Parked cars make you invisible and safe", "It is the same as a crosswalk", "It is safer than a corner"],
      fact: "Parked cars block the view both ways. Walk to a corner or a crosswalk, then look left, right, and left again."
    },
    {
      art: "bike",
      ask: "You are still riding at dusk. What should the bike have?",
      answer: "A white light in front and a red light or reflector in back",
      choices: ["A white light in front and a red light or reflector in back", "No lights, so cars do not notice you", "Only a light pointed at the sky", "Headphones instead of lights"],
      fact: "At dusk and at night, use a white front light and a red rear light or reflector so drivers can see you. Wear the helmet, ride on the right, and take headphones off when you need to hear traffic."
    }
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
      note: "You finished " + round.length + " road-safety questions.",
      questions: round,
      draw: draw,
      again: function () { start(api.level, api); }
    });
  }

  Edu.bind("road", start);
})();
