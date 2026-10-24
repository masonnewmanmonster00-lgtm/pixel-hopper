(function () {
  "use strict";

  const HELP = {
    easy: "In Canada and the United States, emergencies go to 911. Your job is to stay safe and get help. This practice is not a first aid course.",
    medium: "Cuts, burns, nosebleeds, and bites. Cool water, not butter. Lean forward, not back.",
    hard: "Know when to call 911, what to say, and what a kid should leave to an adult."
  };

  function frame(sky, ground, inner) {
    return '<svg viewBox="0 0 220 150" role="img" aria-label="Lesson picture">' +
      '<rect width="220" height="150" fill="' + sky + '"/>' +
      '<rect y="108" width="220" height="42" fill="' + ground + '"/>' +
      inner + "</svg>";
  }

  const ART = {
    phone: frame("#d5e6f2", "#efe6d2",
      '<rect x="86" y="36" width="48" height="80" rx="8" fill="#1c2430" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="92" y="46" width="36" height="52" rx="3" fill="#9fd0ef"/>' +
      '<circle cx="110" cy="106" r="4" fill="#efe6d2"/>'),
    pressure: frame("#f8e7e4", "#e6d3c4",
      '<rect x="70" y="70" width="80" height="28" rx="14" fill="#f6d2b5" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="92" y="62" width="36" height="22" rx="4" fill="#f7f4ee" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M100 70 h20" stroke="#c4472f" stroke-width="3" stroke-linecap="round"/>'),
    water: frame("#d7eef8", "#d5d8de",
      '<rect x="40" y="40" width="28" height="70" rx="6" fill="#c9d4de" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M54 48 v40" stroke="#7eb6e0" stroke-width="4" stroke-linecap="round"/>' +
      '<ellipse cx="120" cy="96" rx="36" ry="14" fill="#f6d2b5" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M90 78 c20 10 40 10 60 0" fill="none" stroke="#7eb6e0" stroke-width="3"/>'),
    nose: frame("#f8e7c8", "#e6d7b0",
      '<circle cx="110" cy="70" r="28" fill="#f6d2b5" stroke="#1c2430" stroke-width="2"/>' +
      '<circle cx="100" cy="66" r="3" fill="#1c2430"/><circle cx="120" cy="66" r="3" fill="#1c2430"/>' +
      '<path d="M110 72 v12" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M96 96 c8 10 20 10 28 0" fill="none" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M70 108 l30-8" stroke="#1c2430" stroke-width="3" stroke-linecap="round"/>'),
    adult: frame("#e7f2ea", "#c5d6b0",
      '<circle cx="78" cy="48" r="14" fill="#f6d2b5" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="64" y="64" width="28" height="40" rx="8" fill="#2f6fed" stroke="#1c2430" stroke-width="2"/>' +
      '<circle cx="140" cy="62" r="12" fill="#f6d2b5" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="128" y="76" width="24" height="32" rx="8" fill="#ffd36e" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M92 84 h36" stroke="#1c2430" stroke-width="3"/>'),
    fire: frame("#f8e7c8", "#d9d3c7",
      '<path d="M110 100 c-20-8-24-30-8-42 c4 12 14 12 14 0 c14 8 22 28 8 46 c-4-8-12-8-14-4z" fill="#ef6f4c" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M40 112 h140" stroke="#1c2430" stroke-width="3"/>' +
      '<circle cx="168" cy="40" r="10" fill="#ffd36e" stroke="#1c2430" stroke-width="2"/>'),
    bee: frame("#f8f4dc", "#c9d4a4",
      '<ellipse cx="110" cy="78" rx="28" ry="18" fill="#ffd36e" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M98 70 v16 M110 66 v24 M122 70 v16" stroke="#1c2430" stroke-width="2"/>' +
      '<ellipse cx="86" cy="62" rx="12" ry="7" fill="#fff" stroke="#1c2430" stroke-width="2"/>' +
      '<ellipse cx="134" cy="62" rx="12" ry="7" fill="#fff" stroke="#1c2430" stroke-width="2"/>'),
    hands: frame("#e7f2ea", "#d9d3c7",
      '<ellipse cx="80" cy="86" rx="28" ry="18" fill="#f6d2b5" stroke="#1c2430" stroke-width="2"/>' +
      '<ellipse cx="130" cy="78" rx="28" ry="18" fill="#f6d2b5" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M40 40 h16 v16 h-16 z" fill="#9fd0ef" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M48 40 v-10 M44 34 h8" stroke="#2f6fed" stroke-width="2"/>')
  };

  const EASY = [
    { art: "phone", ask: "In Canada and the United States, which number do you call for a police, fire, or medical emergency?", answer: "911", choices: ["911", "411", "0", "The school's lunch line"], fact: "911 is the emergency number in Canada and the United States. Other countries use different numbers. Stay on the line until the operator says you can hang up." },
    { art: "phone", ask: "You have called for help. What do you do with the phone?", answer: "Stay on the line and answer the questions", choices: ["Stay on the line and answer the questions", "Hang up right away", "Hand the phone to a stranger and leave", "Put it in your pocket on silent"], fact: "Tell them what happened and where you are. Do not hang up first. If you can, send someone to wave the helpers in." },
    { art: "adult", ask: "What is a kid's first job at an emergency?", answer: "Stay safe, then get an adult and call for help", choices: ["Stay safe, then get an adult and call for help", "Run into danger to look brave", "Keep it a secret", "Try every treatment you can invent"], fact: "Heroes in this game go for help. Do not cross traffic, touch a live wire, or go into a fire or deep water." },
    { art: "pressure", ask: "A small cut is bleeding. What helps while you get an adult?", answer: "Press a clean cloth on it", choices: ["Press a clean cloth on it", "Keep peeking under the cloth every second", "Put dirt on it", "Wave it around to dry it"], fact: "Direct pressure slows bleeding. If the cloth soaks through, add another cloth on top. Do not peel the first one off." },
    { art: "water", ask: "A burn from hot water hurts. What should you start with?", answer: "Cool running water", choices: ["Cool running water", "Butter", "Ice pressed on the skin", "Toothpaste"], fact: "Cool running water, not ice, for about 20 minutes. Butter, oil, and toothpaste can make a burn worse." },
    { art: "adult", ask: "Someone is coughing hard because food went down the wrong way, and they can still cough and talk. What should you do?", answer: "Let them cough and stay with them", choices: ["Let them cough and stay with them", "Give them a drink immediately", "Slap their back while they are coughing well", "Tell them to lie flat"], fact: "A strong cough is the body clearing the airway. Stay with them. If they cannot cough, speak, or breathe, shout for an adult and call 911." },
    { art: "hands", ask: "After you help with a cut, what should you do?", answer: "Wash your hands", choices: ["Wash your hands", "Wipe them on the couch", "Skip washing if you were quick", "Hide the cloth under a pillow"], fact: "Soap and water protect you and the next person. Use gloves or a plastic bag as a barrier if you have to touch blood." },
    { art: "fire", ask: "Your shirt catches fire and you cannot get it off. What do you do?", answer: "Stop, drop, and roll", choices: ["Stop, drop, and roll", "Run as fast as you can", "Hide in a closet", "Fan the flames"], fact: "Stop, drop to the ground, cover your face, and roll until the flames are out. Then cool the burn with water and get an adult. If a building is on fire, get out first and call from outside." }
  ];

  const MEDIUM = [
    { art: "water", ask: "Which treatment does not belong on a burn?", answer: "Butter, toothpaste, or ice on the skin", choices: ["Butter, toothpaste, or ice on the skin", "Cool running water", "Taking off a ring that is not stuck", "A loose clean cloth after cooling"], fact: "Cool the burn for about 20 minutes. Remove jewelry that is not stuck before the area swells. Do not pull off clothing that is stuck to the skin. Do not pop blisters." },
    { art: "nose", ask: "A nose starts bleeding. How should the person sit?", answer: "Sit up and lean forward", choices: ["Sit up and lean forward", "Lean the head way back", "Lie flat and sniff in", "Stand on their head"], fact: "Leaning forward keeps blood from running down the throat. Pinch the soft part of the nose and ask an adult for help. Get urgent help if it will not stop or if the person was hit hard." },
    { art: "pressure", ask: "A stick is stuck in a wound. What is the safe choice?", answer: "Leave it there and get help", choices: ["Leave it there and get help", "Pull it out quickly", "Push it farther in", "Cut it shorter yourself"], fact: "An object may be slowing the bleeding. Leave it in place. An adult or emergency crew should remove it. You can press around it, not on it." },
    { art: "bee", ask: "After a bee sting, someone says their throat feels tight and they are wheezing. What now?", answer: "Call 911 and get an adult", choices: ["Call 911 and get an adult", "Wait an hour to see if it is real", "Give them a snack and send them to play", "Put butter on the sting and ignore the breathing"], fact: "Trouble breathing, swelling of the lips or tongue, or a spreading rash can be a severe allergic reaction. That is a 911 emergency. A mild sting can be washed, and a cold cloth may help, after an adult checks." },
    { art: "phone", ask: "A younger child swallows cleaning liquid. What should you avoid?", answer: "Making them vomit", choices: ["Making them vomit", "Calling 911 or a poison centre", "Telling an adult what the bottle was", "Keeping the bottle to show the helpers"], fact: "Do not make the person vomit unless a poison specialist tells you to. Call 911 or a poison centre, and have the container ready." },
    { art: "fire", ask: "Someone may have hurt their neck in a fall, and they are not in a fire or in traffic. What should you do?", answer: "Keep them still and call for help", choices: ["Keep them still and call for help", "Pull them up by the arms to test the neck", "Sit them in a chair", "Ask them to run it off"], fact: "Moving a neck or back injury can make it worse. Call 911 and get an adult. Only move the person if they are in immediate danger, such as a fire." },
    { art: "water", ask: "A burn is larger than the palm, or it is on the face, hands, or joints. What else is needed besides cool water?", answer: "Emergency help", choices: ["Emergency help", "A private promise not to tell", "More butter", "Popping the blisters"], fact: "Large burns, burns on the face, hands, feet, or joints, and any electrical or chemical burn need emergency help. Chemical burns also need the chemical washed off if it is safe to do that." },
    { art: "hands", ask: "An ice pack for a swollen ankle should be used how?", answer: "Wrapped in a cloth, not bare on the skin", choices: ["Wrapped in a cloth, not bare on the skin", "Frozen directly onto the skin for an hour", "Skipped, because swelling is good to ignore", "Replaced with a hot kettle"], fact: "A wrapped cold pack for short stretches can ease a sprain. Bare ice can hurt the skin. Rest the ankle and tell an adult. A bone that looks bent needs medical help, and you should not try to straighten it." }
  ];

  const HARD = [
    { art: "phone", ask: "Which set of facts is the most useful to tell a 911 operator?", answer: "Where you are, what happened, and who is hurt", choices: ["Where you are, what happened, and who is hurt", "Only your favourite colour", "A guess, then hang up", "The story, but refuse to give the address"], fact: "Say the address or a landmark, what you see, and how many people need help. Answer their questions. Do not hang up first." },
    { art: "pressure", ask: "Blood is soaking through cloth after you have been pressing. What next?", answer: "Add more cloth and keep pressing, and call 911", choices: ["Add more cloth and keep pressing, and call 911", "Take all the cloth off to check", "Wash the cut in a river", "Tie a string as tight as you can and walk away"], fact: "Keep pressure. Adding cloth is better than restarting the bleed by peeling layers off. Severe bleeding is a 911 call. A homemade tourniquet can cause harm, so that is a job for trained rescuers." },
    { art: "fire", ask: "A person is still touching a downed power line. What is the safe action?", answer: "Stay far back and call 911", choices: ["Stay far back and call 911", "Pull them off with your hands", "Poke the wire with a stick", "Pour water on the wire"], fact: "Electricity can travel through you, a stick, or water. Stay back, keep others back, and let the fire department and the power company make it safe." },
    { art: "adult", ask: "A friend collapses, will not wake up, and is not breathing normally. What is your role?", answer: "Call 911, get an adult, and ask if someone trained can help", choices: ["Call 911, get an adult, and ask if someone trained can help", "Give them water", "Prop them in a chair and leave", "Wait until the end of recess"], fact: "Not responding and not breathing normally is a 911 emergency. Trained adults can do CPR and use an AED. Your fast call is the step that brings them." },
    { art: "bee", ask: "A dog bite breaks the skin. After you are away from the dog, what should happen?", answer: "Wash it if you safely can, and an adult should get medical advice", choices: ["Wash it if you safely can, and an adult should get medical advice", "Ignore it because animals are clean", "Sew it closed yourself", "Promise not to tell so the dog will not get in trouble"], fact: "Bite wounds can get infected. An adult should ask a doctor or a clinic, especially if the bite is deep, on the face or hand, or if you do not know the animal." },
    { art: "nose", ask: "A nosebleed follows a hard hit to the head, and the person seems confused. What changes?", answer: "Treat it as an emergency, not an ordinary nosebleed", choices: ["Treat it as an emergency, not an ordinary nosebleed", "Have them blow hard to clear it", "Lay them back and wait until tomorrow", "Give them a running race"], fact: "Confusion, vomiting, or a headache after a head injury needs 911. Do not treat that like a playground nosebleed." },
    { art: "water", ask: "Clothes are stuck to a burn. What do you do with the cloth?", answer: "Leave the stuck cloth and cool around it", choices: ["Leave the stuck cloth and cool around it", "Rip it off quickly", "Cover it with butter so it slides", "Cut the skin to free the cloth"], fact: "Stuck cloth is protecting the burn. Cool with water and get emergency help. Clothing that is not stuck can be removed." },
    { art: "adult", ask: "Which sentence best describes a kid first-aider?", answer: "You get help and do a few safe things while adults take over", choices: ["You get help and do a few safe things while adults take over", "You must solve it alone or you failed", "You should copy treatments from a movie", "You should keep emergencies secret from adults"], fact: "Calling, sending for an adult, pressing a clean cloth, and cooling a burn are real help. Medicine doses, CPR, and moving an injured person belong to trained people unless a 911 operator tells you otherwise." }
  ];

  let session = null;

  function fromBank(bank) {
    return Edu.shuffle(bank).map(function (item) {
      return {
        art: item.art,
        ask: item.ask,
        answer: item.answer,
        fact: item.fact,
        choices: Edu.shuffle(item.choices).map(function (label) {
          return { label: label, value: label };
        })
      };
    });
  }

  function questions(level) {
    if (level === "easy") return fromBank(EASY);
    if (level === "medium") return fromBank(MEDIUM);
    return fromBank(HARD);
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
      note: "You finished " + round.length + " first aid questions. In a real emergency, get an adult.",
      questions: round,
      draw: draw,
      again: function () { start(api.level, api); }
    });
  }

  Edu.bind("firstaid", start);
})();
