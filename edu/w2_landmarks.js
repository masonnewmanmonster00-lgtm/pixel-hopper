(function () {
  "use strict";

  const HELP = {
    easy: "Name the country for each famous place.",
    medium: "Match the landmark and the country. Some countries have more than one famous place.",
    hard: "Cities, shared borders, and careful names. Big Ben is a bell, not the tower."
  };

  const COUNTRIES = ["France", "United States", "China", "Egypt", "India", "Brazil", "Australia", "Italy", "United Kingdom", "Peru", "Mexico", "Japan", "Greece", "Spain", "Chile", "Jordan", "Cambodia", "Canada", "Germany"];

  function frame(ground, inner) {
    return '<svg viewBox="0 0 220 150" role="img" aria-label="Landmark picture">' +
      '<rect width="220" height="150" fill="#cfe8ff"/>' +
      '<rect y="108" width="220" height="42" fill="' + ground + '"/>' +
      inner + "</svg>";
  }

  const ART = {
    eiffel: frame("#d9d3c7",
      '<path d="M110 18 L72 128 h18 l8-28 h24 l8 28 h18 z" fill="#6d787f" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M90 78 h40 M98 52 h24 M110 18 v110" fill="none" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M84 104 h52" stroke="#efe6d2" stroke-width="4"/>'),
    liberty: frame("#b7d3c4",
      '<rect x="96" y="108" width="28" height="28" fill="#8d8378" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M100 108 V72 h20 v36" fill="#2f9e6b" stroke="#1c2430" stroke-width="2"/>' +
      '<circle cx="110" cy="64" r="10" fill="#2f9e6b" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M100 58 l4-12 h4 l-2 12 M110 50 v-12 M116 56 l6-10" stroke="#2f9e6b" stroke-width="3" stroke-linecap="round"/>' +
      '<path d="M78 70 h22 M86 62 v22" stroke="#c2a36b" stroke-width="4" stroke-linecap="round"/>' +
      '<circle cx="86" cy="56" r="6" fill="#ffd36e" stroke="#1c2430" stroke-width="2"/>'),
    wall: frame("#b7d7a8",
      '<path d="M10 96 C40 70 50 110 80 86 C110 64 120 100 150 80 C180 62 190 96 214 78 V108 H10 Z" fill="#7f8c74" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M16 90 h10 v-10 h8 v10 h12 v-12 h8 v12 h14 v-10 h8 v10 h16 v-12 h8 v12 h14 v-8 h8 v8 h16 v-12 h8 v12" fill="#d9d3c5" stroke="#1c2430" stroke-width="2"/>'),
    pyramids: frame("#e6c98a",
      '<circle cx="180" cy="36" r="14" fill="#ffd36e" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M70 120 L110 42 L150 120 Z" fill="#e2b04a" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M118 120 L148 62 L178 120 Z" fill="#c9963a" stroke="#1c2430" stroke-width="2"/>'),
    taj: frame("#d5e4c8",
      '<rect x="20" y="112" width="180" height="10" fill="#9fd0e6" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="78" y="78" width="64" height="36" fill="#fff" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M78 78 Q110 28 142 78" fill="#fff" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="106" y="48" width="8" height="16" fill="#c2a36b" stroke="#1c2430"/>' +
      '<rect x="46" y="70" width="10" height="44" fill="#fff" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="164" y="70" width="10" height="44" fill="#fff" stroke="#1c2430" stroke-width="2"/>' +
      '<circle cx="51" cy="66" r="6" fill="#fff" stroke="#1c2430" stroke-width="2"/>' +
      '<circle cx="169" cy="66" r="6" fill="#fff" stroke="#1c2430" stroke-width="2"/>'),
    redeemer: frame("#9fbf7a",
      '<path d="M40 120 L110 70 L180 120 Z" fill="#6f8f58" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="102" y="48" width="16" height="36" fill="#f4f1ea" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="70" y="56" width="80" height="10" fill="#f4f1ea" stroke="#1c2430" stroke-width="2"/>' +
      '<circle cx="110" cy="42" r="8" fill="#f4f1ea" stroke="#1c2430" stroke-width="2"/>'),
    opera: frame("#8ec5e8",
      '<path d="M30 110 C40 70 60 78 70 110 C80 64 100 74 110 110 C120 58 145 72 156 110 C166 68 190 80 200 110 Z" fill="#f7f4ee" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M20 112 h180" stroke="#1c2430" stroke-width="2"/>'),
    colosseum: frame("#e4d2b0",
      '<path d="M36 112 V70 Q110 28 184 70 V112 Z" fill="#e2c48a" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M52 112 V78 Q110 48 168 78 V112" fill="#f3e2b8" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M60 100 h12 v12 h-12 z M88 100 h12 v12 h-12 z M116 100 h12 v12 h-12 z M144 100 h12 v12 h-12 z" fill="#c9a66b" stroke="#1c2430"/>'),
    clock: frame("#d5d8de",
      '<rect x="96" y="28" width="28" height="96" fill="#d8c7a2" stroke="#1c2430" stroke-width="2"/>' +
      '<circle cx="110" cy="58" r="10" fill="#fff" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M110 58 v-6 M110 58 h4" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M96 28 l14-12 14 12" fill="#8d4b3a" stroke="#1c2430" stroke-width="2"/>'),
    pisa: frame("#d7e2c4",
      '<g transform="rotate(-8 110 90)">' +
      '<rect x="96" y="36" width="28" height="88" fill="#f4f1ea" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M92 50 h36 M92 68 h36 M92 86 h36 M92 104 h36" stroke="#1c2430" stroke-width="2"/>' +
      "</g>"),
    stones: frame("#b7c4a4",
      '<path d="M40 112 V70 h16 v42 M64 112 V58 h18 v54 M92 112 V64 h16 v48 M120 112 V60 h22 v52 M154 112 V74 h16 v38" fill="#b7b7b7" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M64 58 h46 v-10 H64 z M120 62 h36 v-8 h-36 z" fill="#9a9a9a" stroke="#1c2430" stroke-width="2"/>'),
    fuji: frame("#d5e6c8",
      '<circle cx="168" cy="40" r="12" fill="#ef6f4c" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M30 120 L110 36 L190 120 Z" fill="#6f8faf" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M78 70 L110 36 L142 70 L126 78 L110 62 L94 78 Z" fill="#fff" stroke="#1c2430" stroke-width="2"/>'),
    machu: frame("#8fbf7a",
      '<path d="M20 120 L60 70 L100 120 L140 60 L200 120 Z" fill="#6f8f58" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M70 112 h80 v-8 h-12 v-8 h-10 v8 h-16 v-14 h-12 v14 h-12 v-8 h-8 z" fill="#d9d0c0" stroke="#1c2430" stroke-width="2"/>'),
    parthenon: frame("#e6d7b0",
      '<rect x="36" y="78" width="148" height="12" fill="#f4efe4" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M48 78 L110 48 L172 78 Z" fill="#f4efe4" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M52 90 h8 v28 h-8 z M72 90 h8 v28 h-8 z M92 90 h8 v28 h-8 z M112 90 h8 v28 h-8 z M132 90 h8 v28 h-8 z M152 90 h8 v28 h-8 z" fill="#f7f3ea" stroke="#1c2430" stroke-width="2"/>'),
    chichen: frame("#e6c98a",
      '<path d="M40 120 L70 78 h80 L180 120 Z" fill="#c9843a" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M62 102 h96 v-8 H78 v-8 h64 v-8 H94 v-8 h36" fill="none" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="100" y="62" width="20" height="16" fill="#a86b2c" stroke="#1c2430" stroke-width="2"/>'),
    moai: frame("#9db892",
      '<path d="M48 120 V70 Q70 40 92 70 V120 Z" fill="#8a8f86" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M110 120 V78 Q132 50 154 78 V120 Z" fill="#7d8278" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M62 86 h16 M124 92 h16" stroke="#1c2430" stroke-width="2"/>'),
    petra: frame("#e2b7a0",
      '<path d="M30 120 V40 h160 v80" fill="#c9846a" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M70 120 V70 h80 v50" fill="#e7b199" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M70 70 L110 40 L150 70" fill="#f0c2ae" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="98" y="86" width="24" height="34" fill="#a86b58" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M78 86 h8 v10 h-8 z M134 86 h8 v10 h-8 z" fill="#f4d3c4" stroke="#1c2430"/>'),
    angkor: frame("#c9d7a8",
      '<rect x="70" y="78" width="80" height="40" fill="#d8c39a" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M70 78 Q110 40 150 78" fill="#e6d2a8" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M40 96 Q55 70 70 96 M150 96 Q165 70 180 96" fill="#e6d2a8" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="104" y="88" width="12" height="30" fill="#6d5438" stroke="#1c2430"/>'),
    bridge: frame("#b7d7ef",
      '<path d="M16 100 H204" stroke="#c4472f" stroke-width="8"/>' +
      '<path d="M30 100 V70 M190 100 V70 M30 70 H190" stroke="#c4472f" stroke-width="4"/>' +
      '<path d="M30 70 Q110 20 190 70" fill="none" stroke="#c4472f" stroke-width="4"/>' +
      '<path d="M70 78 v22 M110 62 v38 M150 78 v22" stroke="#c4472f" stroke-width="3"/>'),
    uluru: frame("#e7c9a4",
      '<path d="M24 112 C40 70 70 78 90 96 C110 60 150 64 196 100 V120 H24 Z" fill="#c4553a" stroke="#1c2430" stroke-width="2"/>'),
    falls: frame("#c5d6b0",
      '<path d="M18 108 L18 36 h46 l8 72 z" fill="#7d8f68" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M156 108 L204 108 V36 h-46 z" fill="#7d8f68" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M64 44 h92 v64 H64 z" fill="#8ec8ef" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M78 58 v36 M102 50 v48 M126 58 v36" stroke="#f7fbff" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M40 116 h140" stroke="#6eb0dd" stroke-width="8" stroke-linecap="round"/>'),
    sagrada: frame("#d5e4f2",
      '<path d="M40 120 V70 Q60 40 80 70 V120 M80 120 V60 Q100 24 120 60 V120 M120 120 V70 Q140 40 160 70 V120" fill="#d8c36a" stroke="#1c2430" stroke-width="2"/>' +
      '<circle cx="60" cy="58" r="4" fill="#ef6f4c"/><circle cx="100" cy="40" r="4" fill="#2f6fed"/><circle cx="140" cy="58" r="4" fill="#2f9e44"/>')
  };

  const PLACES = [
    { id: "eiffel", name: "Eiffel Tower", country: "France", city: "Paris", fact: "The Eiffel Tower is in Paris, France. It was built for a world's fair in 1889." },
    { id: "liberty", name: "Statue of Liberty", country: "United States", city: "New York", fact: "The Statue of Liberty stands in New York Harbor, in the United States. France gave it as a gift." },
    { id: "wall", name: "Great Wall", country: "China", city: "Beijing", fact: "The Great Wall is in China. It is not one single wall, but many walls built over many centuries." },
    { id: "pyramids", name: "Pyramids of Giza", country: "Egypt", city: "Giza", fact: "The Pyramids of Giza are in Egypt, near Cairo. They were tombs for ancient pharaohs." },
    { id: "taj", name: "Taj Mahal", country: "India", city: "Agra", fact: "The Taj Mahal is in Agra, India, not in Delhi. It is a marble tomb." },
    { id: "redeemer", name: "Christ the Redeemer", country: "Brazil", city: "Rio de Janeiro", fact: "Christ the Redeemer looks over Rio de Janeiro, Brazil." },
    { id: "opera", name: "Sydney Opera House", country: "Australia", city: "Sydney", fact: "The Sydney Opera House is in Sydney, Australia. Its roofs look like sails or shells." },
    { id: "colosseum", name: "Colosseum", country: "Italy", city: "Rome", fact: "The Colosseum is an ancient amphitheater in Rome, Italy." },
    { id: "clock", name: "Elizabeth Tower", country: "United Kingdom", city: "London", fact: "The clock tower in London is Elizabeth Tower. Big Ben is the name of the great bell inside it. The country is the United Kingdom." },
    { id: "pisa", name: "Leaning Tower of Pisa", country: "Italy", city: "Pisa", fact: "The Leaning Tower is the bell tower of Pisa's cathedral, in Italy. The ground under it shifted." },
    { id: "stones", name: "Stonehenge", country: "United Kingdom", city: "Salisbury", fact: "Stonehenge is a circle of huge stones in England, part of the United Kingdom." },
    { id: "fuji", name: "Mount Fuji", country: "Japan", city: "Honshu", fact: "Mount Fuji is a volcano on the island of Honshu, in Japan. It is a famous symbol of the country." },
    { id: "machu", name: "Machu Picchu", country: "Peru", city: "Cusco Region", fact: "Machu Picchu is an Inca city high in the Andes Mountains of Peru." },
    { id: "parthenon", name: "Parthenon", country: "Greece", city: "Athens", fact: "The Parthenon is an ancient temple on the Acropolis in Athens, Greece." },
    { id: "chichen", name: "Chichen Itza", country: "Mexico", city: "Yucatan", fact: "Chichen Itza is a Maya city in the Yucatan Peninsula of Mexico. El Castillo is its step pyramid." },
    { id: "moai", name: "Moai of Rapa Nui", country: "Chile", city: "Rapa Nui", fact: "The moai are stone figures on Rapa Nui, also called Easter Island. The island is part of Chile." },
    { id: "petra", name: "Petra", country: "Jordan", city: "Petra", fact: "Petra is an ancient city in Jordan. Many of its buildings are carved into rose-colored cliffs." },
    { id: "angkor", name: "Angkor Wat", country: "Cambodia", city: "Siem Reap", fact: "Angkor Wat is a huge temple complex near Siem Reap, Cambodia." },
    { id: "bridge", name: "Golden Gate Bridge", country: "United States", city: "San Francisco", fact: "The Golden Gate Bridge crosses the entrance to San Francisco Bay, in the United States." },
    { id: "uluru", name: "Uluru", country: "Australia", city: "Northern Territory", fact: "Uluru is a massive sandstone rock in Australia's Northern Territory. It is a sacred place for Anangu people." },
    { id: "sagrada", name: "Sagrada Familia", country: "Spain", city: "Barcelona", fact: "The Sagrada Familia is a basilica in Barcelona, Spain. Its tall spires are still being finished." }
  ];

  const HARD = [
    {
      id: "taj",
      ask: "The Taj Mahal is in which city?",
      answer: "Agra",
      choices: ["Agra", "Delhi", "Mumbai", "Kolkata"],
      fact: "The Taj Mahal is in Agra, India. Delhi is the capital, but it is a different city."
    },
    {
      id: "colosseum",
      ask: "The Colosseum is in which city?",
      answer: "Rome",
      choices: ["Rome", "Athens", "Paris", "Madrid"],
      fact: "The Colosseum is in Rome, Italy. Athens has the Parthenon."
    },
    {
      id: "machu",
      ask: "Machu Picchu is in which country?",
      answer: "Peru",
      choices: ["Peru", "Mexico", "Brazil", "Chile"],
      fact: "Machu Picchu is in Peru. Chichen Itza is the famous pyramid site in Mexico."
    },
    {
      id: "moai",
      ask: "The moai of Rapa Nui (Easter Island) are part of which country?",
      answer: "Chile",
      choices: ["Chile", "Peru", "Japan", "Australia"],
      fact: "Rapa Nui is far out in the Pacific Ocean, and it is part of Chile."
    },
    {
      id: "petra",
      ask: "Petra, the city carved into rose-colored rock, is in which country?",
      answer: "Jordan",
      choices: ["Jordan", "Egypt", "Greece", "India"],
      fact: "Petra is in Jordan. The pyramids, not Petra, are in Egypt."
    },
    {
      id: "clock",
      ask: "Big Ben is a bell. What is the name of the clock tower that holds it?",
      answer: "Elizabeth Tower",
      choices: ["Elizabeth Tower", "Tower of London", "Eiffel Tower", "CN Tower"],
      fact: "The tower in London is Elizabeth Tower. Big Ben is the bell. The country is the United Kingdom."
    },
    {
      id: "falls",
      ask: "Niagara Falls sits on the border of which two countries?",
      answer: "Canada and the United States",
      choices: ["Canada and the United States", "United States and Mexico", "France and the United Kingdom", "Brazil and Argentina"],
      fact: "The falls are shared by Ontario in Canada and New York in the United States."
    },
    {
      id: "parthenon",
      ask: "The Parthenon stands in which city?",
      answer: "Athens",
      choices: ["Athens", "Rome", "Cairo", "Istanbul"],
      fact: "The Parthenon is on the Acropolis in Athens, Greece."
    },
    {
      id: "uluru",
      ask: "Uluru, a sacred sandstone rock, is in which country?",
      answer: "Australia",
      choices: ["Australia", "Egypt", "United States", "China"],
      fact: "Uluru is in the Northern Territory of Australia. It is sacred to the Anangu people."
    },
    {
      id: "angkor",
      ask: "Angkor Wat is a temple complex in which country?",
      answer: "Cambodia",
      choices: ["Cambodia", "India", "China", "Spain"],
      fact: "Angkor Wat is near Siem Reap, Cambodia."
    }
  ];

  let session = null;

  function byId(id) {
    return PLACES.filter(function (place) { return place.id === id; })[0];
  }

  function countryQuestion(place, pool) {
    return {
      id: place.id,
      title: place.name,
      ask: "Which country is this in?",
      answer: place.country,
      fact: place.fact,
      choices: Lab.options(place.country, pool || COUNTRIES)
    };
  }

  function whichLandmark(country) {
    const matches = PLACES.filter(function (place) { return place.country === country; });
    const place = Edu.pick(matches);
    const names = PLACES.map(function (item) { return item.name; });
    return {
      id: place.id,
      title: country,
      ask: "Which landmark is in " + country + "?",
      answer: place.name,
      fact: place.fact,
      choices: Lab.options(place.name, names)
    };
  }

  function questions(level) {
    if (level === "easy") {
      const ids = ["eiffel", "liberty", "wall", "pyramids", "taj", "redeemer", "opera", "colosseum"];
      return Edu.shuffle(ids).map(function (id) {
        return countryQuestion(byId(id), ["France", "United States", "China", "Egypt", "India", "Brazil", "Australia", "Italy"]);
      });
    }
    if (level === "medium") {
      const ids = ["clock", "pisa", "stones", "fuji", "machu", "parthenon", "chichen", "bridge", "sagrada", "opera", "eiffel", "taj"];
      const countryQs = Edu.shuffle(ids).slice(0, 4).map(function (id) {
        return countryQuestion(byId(id));
      });
      const nameQs = ["Italy", "United States", "United Kingdom", "Australia"].map(whichLandmark);
      return Edu.shuffle(countryQs.concat(nameQs));
    }
    return Edu.shuffle(HARD).slice(0, 8).map(function (item) {
      return {
        id: item.id,
        plain: item.plain,
        ask: item.ask,
        answer: item.answer,
        fact: item.fact,
        choices: Edu.shuffle(item.choices).map(function (label) {
          return { label: label, value: label };
        })
      };
    });
  }

  function draw(stage, item) {
    if (!item.id || !ART[item.id]) return;
    const wrap = Lab.el("div", "scene");
    wrap.innerHTML = ART[item.id];
    stage.appendChild(wrap);
    if (item.title) stage.appendChild(Lab.el("p", "scene-title", item.title));
  }

  function start(level, api) {
    if (session) session.stop();
    session = Lab.round(api, {
      help: HELP[level],
      note: "You finished 8 landmark questions.",
      questions: questions(level),
      draw: draw,
      again: function () { start(api.level, api); }
    });
  }

  Edu.bind("landmarks", start);
})();
