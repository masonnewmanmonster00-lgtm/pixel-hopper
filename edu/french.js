(function () {
  "use strict";

  const HELP = {
    easy: "Match a greeting to its English, or name the colour in French. The colour clue is a swatch, not an English word.",
    medium: "Say the number in French, or name the animal. Un and une both mean a, or one.",
    hard: "Read the French and pick the English. Accents matter: é, è, ç, and à are part of the word."
  };

  const GREETINGS = [
    { fr: "Bonjour", en: "Hello", emoji: "👋", fact: "Bonjour means hello. People use it in the daytime, the way English uses good morning." },
    { fr: "Bonsoir", en: "Good evening", emoji: "🌆", fact: "Bonsoir means good evening." },
    { fr: "Salut", en: "Hi", emoji: "🙋", fact: "Salut means hi. It is informal, for friends and family." },
    { fr: "Merci", en: "Thank you", emoji: "🙏", fact: "Merci means thank you." },
    { fr: "S'il vous plaît", en: "Please", emoji: "🤲", fact: "S'il vous plaît means please. It is the polite form to use with adults." },
    { fr: "Au revoir", en: "Goodbye", emoji: "🚪", fact: "Au revoir means goodbye." },
    { fr: "Oui", en: "Yes", emoji: "✅", fact: "Oui means yes." },
    { fr: "Non", en: "No", emoji: "🚫", fact: "Non means no." }
  ];

  const COLOURS = [
    { fr: "rouge", en: "red", hex: "#e23d3d" },
    { fr: "bleu", en: "blue", hex: "#2f6fed" },
    { fr: "vert", en: "green", hex: "#2f9e44" },
    { fr: "jaune", en: "yellow", hex: "#f5c518" },
    { fr: "orange", en: "orange", hex: "#f08a24" },
    { fr: "violet", en: "purple", hex: "#7b4bb7" },
    { fr: "rose", en: "pink", hex: "#f48fb1" },
    { fr: "noir", en: "black", hex: "#1c2430" },
    { fr: "blanc", en: "white", hex: "#ffffff" },
    { fr: "marron", en: "brown", hex: "#8a5a2b" },
    { fr: "gris", en: "grey", hex: "#8d97a3" }
  ];

  const NUMBERS = [
    { fr: "un", n: 1 },
    { fr: "deux", n: 2 },
    { fr: "trois", n: 3 },
    { fr: "quatre", n: 4 },
    { fr: "cinq", n: 5 },
    { fr: "six", n: 6 },
    { fr: "sept", n: 7 },
    { fr: "huit", n: 8 },
    { fr: "neuf", n: 9 },
    { fr: "dix", n: 10 }
  ];

  const ANIMALS = [
    { fr: "un chat", en: "a cat", emoji: "🐱" },
    { fr: "un chien", en: "a dog", emoji: "🐶" },
    { fr: "un oiseau", en: "a bird", emoji: "🐦" },
    { fr: "un poisson", en: "a fish", emoji: "🐟" },
    { fr: "un cheval", en: "a horse", emoji: "🐴" },
    { fr: "une vache", en: "a cow", emoji: "🐄" },
    { fr: "un cochon", en: "a pig", emoji: "🐷" },
    { fr: "un lapin", en: "a rabbit", emoji: "🐰" },
    { fr: "une souris", en: "a mouse", emoji: "🐭" },
    { fr: "un lion", en: "a lion", emoji: "🦁" },
    { fr: "un éléphant", en: "an elephant", emoji: "🐘" },
    { fr: "une grenouille", en: "a frog", emoji: "🐸" }
  ];

  const PHRASES = [
    { fr: "Comment ça va ?", en: "How are you?", fact: "Comment ça va ? means how are you?" },
    { fr: "Ça va bien", en: "I am doing well", fact: "Ça va bien means things are going well, or I am fine." },
    { fr: "Je m'appelle", en: "My name is", fact: "Je m'appelle means my name is. You say your name after it." },
    { fr: "Enchanté", en: "Nice to meet you", fact: "Enchanté means nice to meet you." },
    { fr: "Merci beaucoup", en: "Thank you very much", fact: "Merci beaucoup means thank you very much. Beaucoup means a lot." },
    { fr: "De rien", en: "You're welcome", fact: "De rien means you're welcome. People say it after merci." },
    { fr: "À bientôt", en: "See you soon", fact: "À bientôt means see you soon." },
    { fr: "Bonne nuit", en: "Good night", fact: "Bonne nuit means good night." },
    { fr: "Excusez-moi", en: "Excuse me", fact: "Excusez-moi means excuse me." },
    { fr: "Je ne comprends pas", en: "I don't understand", fact: "Je ne comprends pas means I don't understand." }
  ];

  let session = null;

  function cap(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  function take(list, n) {
    return Edu.shuffle(list).slice(0, n);
  }

  function colourFact(item) {
    if (item.fr === "orange") return "Orange is the same word in French and English.";
    return cap(item.fr) + " means " + item.en + ".";
  }

  function questions(level) {
    if (level === "easy") {
      const greetings = GREETINGS.map(function (item) {
        return {
          emoji: item.emoji,
          phrase: item.fr,
          ask: "What does this mean in English?",
          answer: item.en,
          fact: item.fact,
          choices: Lab.options(item.en, GREETINGS.map(function (g) { return g.en; }))
        };
      });
      const colours = COLOURS.map(function (item) {
        return {
          swatch: item.hex,
          ask: "What is this colour called in French?",
          answer: item.fr,
          fact: colourFact(item),
          choices: Lab.options(item.fr, COLOURS.map(function (c) { return c.fr; }))
        };
      });
      return Edu.shuffle(take(greetings, 4).concat(take(colours, 4)));
    }
    if (level === "medium") {
      const numbers = NUMBERS.map(function (item) {
        return {
          big: String(item.n),
          ask: "How do you say this number in French?",
          answer: item.fr,
          fact: cap(item.fr) + " means " + item.n + ".",
          choices: Lab.options(item.fr, NUMBERS.map(function (n) { return n.fr; }))
        };
      });
      const animals = ANIMALS.map(function (item) {
        return {
          emoji: item.emoji,
          ask: "What is this animal in French?",
          answer: item.fr,
          fact: cap(item.fr) + " means " + item.en + ".",
          choices: Lab.options(item.fr, ANIMALS.map(function (a) { return a.fr; }))
        };
      });
      return Edu.shuffle(take(numbers, 4).concat(take(animals, 4)));
    }
    const review = [
      { fr: "rouge", en: "red", fact: "Rouge means red." },
      { fr: "bleu", en: "blue", fact: "Bleu means blue." },
      { fr: "un chat", en: "a cat", fact: "Un chat means a cat." },
      { fr: "un chien", en: "a dog", fact: "Un chien means a dog." },
      { fr: "trois", en: "three", fact: "Trois means three." },
      { fr: "dix", en: "ten", fact: "Dix means ten." }
    ];
    const pool = PHRASES.concat(review);
    const english = pool.map(function (item) { return item.en; });
    return take(pool.map(function (item) {
      return {
        phrase: item.fr,
        ask: "What does this French mean?",
        answer: item.en,
        fact: item.fact,
        choices: Lab.options(item.en, english)
      };
    }), 8);
  }

  function draw(stage, item) {
    if (item.swatch) {
      const chip = Lab.el("div", "swatch");
      chip.style.background = item.swatch;
      chip.setAttribute("role", "img");
      chip.setAttribute("aria-label", "Colour swatch");
      stage.appendChild(chip);
    }
    if (item.emoji) {
      const pic = Lab.el("p", "emoji", item.emoji);
      pic.setAttribute("role", "img");
      pic.setAttribute("aria-label", "Picture prompt");
      stage.appendChild(pic);
    }
    if (item.big) stage.appendChild(Lab.el("p", "prompt", item.big));
    if (item.phrase) {
      const line = Lab.el("p", "prompt phrase", item.phrase);
      line.lang = "fr";
      stage.appendChild(line);
    }
  }

  function start(level, api) {
    if (session) session.stop();
    const round = questions(level);
    session = Lab.round(api, {
      help: HELP[level],
      note: "You finished 8 French questions.",
      questions: round,
      draw: draw,
      again: function () { start(api.level, api); }
    });
  }

  Edu.bind("french", start);
})();
