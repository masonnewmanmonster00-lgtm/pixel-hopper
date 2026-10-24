(function () {
  "use strict";

  const HELP = {
    easy: "Sight, hearing, smell, taste, and touch. Match the clue to the sense or the body part.",
    medium: "Senses share the work. Smell changes taste, skin feels more than one thing, and sight needs light.",
    hard: "Five tastes, a false tongue map, and ways people sense the world differently. This is not the organ-tapping body game."
  };

  function frame(sky, ground, inner) {
    return '<svg viewBox="0 0 220 150" role="img" aria-label="Lesson picture">' +
      '<rect width="220" height="150" fill="' + sky + '"/>' +
      '<rect y="112" width="220" height="38" fill="' + ground + '"/>' +
      inner + "</svg>";
  }

  const ART = {
    eye: frame("#d7ecff", "#efe6d2",
      '<ellipse cx="110" cy="78" rx="62" ry="36" fill="#fffdf8" stroke="#1c2430" stroke-width="2"/>' +
      '<circle cx="110" cy="78" r="18" fill="#3d7ec9" stroke="#1c2430" stroke-width="2"/>' +
      '<circle cx="110" cy="78" r="8" fill="#1c2430"/>' +
      '<circle cx="116" cy="72" r="3" fill="#fff"/>'),
    ear: frame("#f8e6d8", "#efe6d2",
      '<path d="M118 36c28 8 36 40 28 64-6 18-22 28-28 36-4-16 2-24 2-36 0-10-8-16-8-28 0-16 2-30 6-36z" fill="#f0c7a0" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M112 58c10 4 14 16 8 26" fill="none" stroke="#1c2430" stroke-width="2"/>'),
    nose: frame("#f6e7c8", "#efe6d2",
      '<path d="M110 28c18 20 28 40 22 62-4 14-14 20-22 20s-18-6-22-20c-6-22 4-42 22-62z" fill="#f0c7a0" stroke="#1c2430" stroke-width="2"/>' +
      '<ellipse cx="98" cy="100" rx="6" ry="8" fill="#e7b898" stroke="#1c2430" stroke-width="2"/>' +
      '<ellipse cx="122" cy="100" rx="6" ry="8" fill="#e7b898" stroke="#1c2430" stroke-width="2"/>'),
    tongue: frame("#f8d6dc", "#efe6d2",
      '<path d="M70 70h80c8 28-8 52-40 52S62 98 70 70z" fill="#e86b7a" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M86 86h48M90 100h40" stroke="#c4475a" stroke-width="2"/>'),
    hand: frame("#efe6d2", "#d7c4a4",
      '<rect x="96" y="70" width="28" height="48" rx="10" fill="#f0c7a0" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="78" y="48" width="14" height="40" rx="7" fill="#f0c7a0" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="96" y="36" width="14" height="48" rx="7" fill="#f0c7a0" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="114" y="42" width="14" height="44" rx="7" fill="#f0c7a0" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="132" y="54" width="14" height="34" rx="7" fill="#f0c7a0" stroke="#1c2430" stroke-width="2"/>'),
    bell: frame("#fff3c4", "#efe6d2",
      '<path d="M110 36v12" stroke="#1c2430" stroke-width="3"/>' +
      '<path d="M78 96c0-28 14-48 32-48s32 20 32 48H78z" fill="#f0c43a" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="74" y="96" width="72" height="10" rx="3" fill="#e6b84a" stroke="#1c2430" stroke-width="2"/>' +
      '<circle cx="110" cy="116" r="6" fill="#1c2430"/>'),
    lemon: frame("#fff8d0", "#c9d7b0",
      '<ellipse cx="110" cy="80" rx="46" ry="32" fill="#f5d000" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M70 74h80M74 86h72" stroke="#e0b800" stroke-width="2"/>'),
    ice: frame("#e7f4ff", "#d7ecff",
      '<rect x="78" y="48" width="64" height="56" rx="8" fill="#d7f3ff" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M90 62h40M86 76h48" stroke="#9fd0ef" stroke-width="3"/>'),
    soup: frame("#f8e6d8", "#efe6d2",
      '<ellipse cx="110" cy="96" rx="48" ry="16" fill="#c4472f" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M62 96c0 28 22 40 48 40s48-12 48-40" fill="#e7d3c4" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M96 70c8-16 20-16 28 0" fill="none" stroke="#8a8f96" stroke-width="2"/>'),
    dark: frame("#1c2430", "#121820",
      '<circle cx="150" cy="48" r="10" fill="#ffd36e"/>' +
      '<rect x="70" y="70" width="80" height="40" rx="8" fill="#2a3140" stroke="#ffd36e" stroke-width="2"/>'),
    phones: frame("#e7eef6", "#efe6d2",
      '<circle cx="110" cy="74" r="28" fill="#f0c7a0" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M78 78c-8 18 6 28 14 22" fill="none" stroke="#1c2430" stroke-width="6"/>' +
      '<path d="M142 78c8 18-6 28-14 22" fill="none" stroke="#1c2430" stroke-width="6"/>' +
      '<path d="M82 70h56" stroke="#2f6fed" stroke-width="4"/>'),
    sun: frame("#fff3c4", "#c9d7b0",
      '<circle cx="110" cy="74" r="24" fill="#f0c43a" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M110 28v16M110 104v16M64 74h16M140 74h16M78 42l12 12M130 94l12 12M142 42l-12 12M90 94l-12 12" stroke="#e6b84a" stroke-width="3"/>'),
    dots: frame("#efe6d2", "#d7c4a4",
      '<rect x="58" y="40" width="104" height="72" rx="6" fill="#f7f3ea" stroke="#1c2430" stroke-width="2"/>' +
      '<circle cx="78" cy="58" r="4" fill="#1c2430"/><circle cx="96" cy="58" r="4" fill="#1c2430"/>' +
      '<circle cx="78" cy="76" r="4" fill="#1c2430"/><circle cx="114" cy="76" r="4" fill="#1c2430"/>' +
      '<circle cx="96" cy="94" r="4" fill="#1c2430"/><circle cx="132" cy="58" r="4" fill="#1c2430"/>'),
    brain: frame("#f3e6ff", "#efe6d2",
      '<path d="M70 88c0-30 16-48 40-48s40 18 40 48-12 40-40 40-40-16-40-40z" fill="#d7b4f0" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M110 44v80M86 70c12 8 16 8 24 0M86 96c12 8 16 8 24 0" fill="none" stroke="#1c2430" stroke-width="2"/>'),
    eyes: frame("#d7ecff", "#efe6d2",
      '<ellipse cx="74" cy="78" rx="28" ry="18" fill="#fff" stroke="#1c2430" stroke-width="2"/>' +
      '<ellipse cx="146" cy="78" rx="28" ry="18" fill="#fff" stroke="#1c2430" stroke-width="2"/>' +
      '<circle cx="74" cy="78" r="7" fill="#1c2430"/><circle cx="146" cy="78" r="7" fill="#1c2430"/>')
  };

  const EASY = [
    { art: "eye", ask: "Which body part do you use for sight?", answer: "Eyes", choices: ["Eyes", "Ears", "Nose", "Knees"], fact: "Eyes take in light so you can see shapes, motion, and color." },
    { art: "ear", ask: "Which body part do you use for hearing?", answer: "Ears", choices: ["Ears", "Eyes", "Tongue", "Elbows"], fact: "Ears collect sound. Tiny parts inside turn the vibration into a signal." },
    { art: "nose", ask: "Which body part do you use for smell?", answer: "Nose", choices: ["Nose", "Eyes", "Skin", "Teeth"], fact: "Tiny particles in the air reach smell sensors inside your nose." },
    { art: "tongue", ask: "Which body part do you use for taste?", answer: "Tongue", choices: ["Tongue", "Ears", "Hair", "Bones"], fact: "Taste buds on the tongue sense sweet, salty, sour, bitter, and savory tastes." },
    { art: "hand", ask: "Which body part do you use for touch?", answer: "Skin", choices: ["Skin", "Hair only", "Bones", "Teeth"], fact: "Skin covers your body. It senses touch, temperature, and pain, not just on your hands." },
    { art: "bell", ask: "A bell rings across the room. Which sense notices it?", answer: "Hearing", choices: ["Hearing", "Taste", "Smell", "Sight only"], fact: "Hearing notices sound, even when the bell is out of view." },
    { art: "lemon", ask: "You can tell a lemon is yellow before you taste it. Which sense is that?", answer: "Sight", choices: ["Sight", "Hearing", "Touch", "Taste"], fact: "Color is information for your eyes. Taste comes later, when the lemon is in your mouth." },
    { art: "ice", ask: "An ice cube feels cold in your hand. Which sense is that?", answer: "Touch", choices: ["Touch", "Hearing", "Smell", "Sight"], fact: "Skin senses temperature. Cold means heat is leaving your hand and moving into the ice." }
  ];

  const MEDIUM = [
    { art: "soup", ask: "A stuffed-up nose makes food taste bland. Why?", answer: "Smell and taste work together", choices: ["Smell and taste work together", "The tongue goes to sleep", "Color leaves the food", "Ears block the flavor"], fact: "Much of what you call flavor is smell. When your nose is blocked, the tongue still tastes, but the food seems flat." },
    { art: "ear", ask: "Besides hearing, what else does the inner ear help you do?", answer: "Balance", choices: ["Balance", "Digest food", "Grow taller", "Change your eye color"], fact: "Fluid and tiny sensors in the inner ear tell your brain which way is up. Eyes and muscles help too." },
    { art: "hand", ask: "Which list matches what skin can sense?", answer: "Touch, temperature, and pain", choices: ["Touch, temperature, and pain", "Only gentle taps", "Only color", "Only sweet and sour"], fact: "Different sensors in the skin report pressure, warmth, cold, and pain." },
    { art: "dark", ask: "Why are colors hard to see in a very dark room?", answer: "Sight needs light", choices: ["Sight needs light", "Darkness paints everything blue", "Your tongue must taste the color", "Ears turn color into sound"], fact: "In bright light, cells in the eye see color. In very dim light you mostly notice light and dark, not color." },
    { art: "phones", ask: "What is a safe habit with headphones?", answer: "Keep the volume down and take breaks", choices: ["Keep the volume down and take breaks", "Turn it up until it hurts", "Sleep with the loudest setting", "Share one earbud at full volume"], fact: "Very loud sound can damage hearing. Quieter volume and breaks give your ears a rest." },
    { art: "nose", ask: "Toast is burning in another room. Which sense often notices first?", answer: "Smell", choices: ["Smell", "Taste", "Touch", "Balance"], fact: "Smell can travel through the air before you see smoke. Tell an adult if something smells like it is burning." },
    { art: "tongue", ask: "A pretzel tastes salty. Which sense is doing that job?", answer: "Taste", choices: ["Taste", "Hearing", "Sight", "Balance"], fact: "Salty is one of the tastes your tongue can detect. Crunch is touch and sound, not a taste." },
    { art: "sun", ask: "Why should you avoid staring at the Sun?", answer: "It can damage your eyes", choices: ["It can damage your eyes", "The Sun has no light", "Looking makes the Sun colder", "Eyes only work at night"], fact: "Strong sunlight can harm the seeing part of the eye. Ordinary sunglasses do not make it safe to stare, including during an eclipse." }
  ];

  const HARD = [
    { art: "tongue", ask: "Chili feels hot and spicy. What is the accurate idea?", answer: "Spicy triggers heat and pain sensors, and it is not one of the five tastes", choices: ["Spicy triggers heat and pain sensors, and it is not one of the five tastes", "Spicy is the sixth taste, sensed only by the ears", "Spicy is just the color red", "Spicy means the food is always burning in the oven"], fact: "The five basic tastes are sweet, salty, sour, bitter, and umami. Chili sets off the same kind of sensor that notices painful heat." },
    { art: "soup", ask: "What is umami?", answer: "The savory taste in foods like broth, cheese, and mushrooms", choices: ["The savory taste in foods like broth, cheese, and mushrooms", "A bone in the ear", "The color of a lemon", "A kind of loud sound"], fact: "Umami is the savory taste. Broth, ripe tomatoes, cheese, and mushrooms are common examples." },
    { art: "tongue", ask: "An old chart said sweet is tasted only on the tip of the tongue. What is true?", answer: "That tongue map is wrong", choices: ["That tongue map is wrong", "Only the tip can taste anything", "The ears taste sweet", "Bitter can be tasted only by the nose"], fact: "Taste buds in different areas can sense sweet, salty, sour, bitter, and umami. The strict tongue map is a myth." },
    { art: "eyes", ask: "How do two eyes help?", answer: "They make it easier to judge distance", choices: ["They make it easier to judge distance", "They let you taste twice as much", "They replace the inner ear completely", "They hear around corners"], fact: "Each eye sees from a slightly different place. The brain compares the two views, which helps you tell how far away something is. One eye can still use other clues, such as size." },
    { art: "dots", ask: "What is braille?", answer: "A code of raised dots read by touch", choices: ["A code of raised dots read by touch", "A flavor of ice cream", "A color only eyes can see", "A musical note"], fact: "Braille uses patterns of raised dots. Readers feel the dots with their fingertips. It is a writing system, not a spoken language." },
    { art: "ear", ask: "Which statement about hearing is accurate?", answer: "People who are deaf or hard of hearing may use sign language, captions, or hearing aids", choices: ["People who are deaf or hard of hearing may use sign language, captions, or hearing aids", "Everyone hears exactly the same sounds", "Hearing is the only way to learn", "Hearing aids make ears unnecessary to mention"], fact: "Hearing varies from person to person. Sign language, captions, and hearing aids are tools. Learning Lab's Sign Language ABC game practices fingerspelling." },
    { art: "brain", ask: "Sense organs collect signals. What puts those signals together into meaning?", answer: "The brain", choices: ["The brain", "The kneecap", "The hair", "The fingernail"], fact: "Eyes, ears, nose, tongue, and skin collect information. The brain interprets it so you can recognize a bell, a lemon, or a hot cup." },
    { art: "sun", ask: "You want to watch an eclipse. What is the safe idea?", answer: "Do not look at the Sun through ordinary sunglasses", choices: ["Do not look at the Sun through ordinary sunglasses", "Sunglasses make staring at the Sun safe", "Closing one eye blocks all the light", "The Moon removes every risk"], fact: "Special eclipse viewers or an indirect projection are used to watch the Sun. Ordinary sunglasses, even dark ones, are not enough." }
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
      note: "You finished " + round.length + " senses questions.",
      questions: round,
      draw: draw,
      again: function () { start(api.level, api); }
    });
  }

  Edu.bind("senses", start);
})();
