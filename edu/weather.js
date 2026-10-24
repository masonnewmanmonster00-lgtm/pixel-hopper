(function () {
  "use strict";

  const HELP = {
    easy: "Name the weather in the picture.",
    medium: "Seasons in temperate places. Near the equator, wet and dry seasons are more common. South of the equator, the months are reversed.",
    hard: "The water cycle: evaporation, condensation, precipitation, and collection. The picture is a hint, not a word bank."
  };

  const WEATHER = [
    { emoji: "☀️", word: "sunny", fact: "Sunny means the sun is out and the sky is mostly clear." },
    { emoji: "🌧️", word: "rainy", fact: "Rainy means water is falling from clouds as rain." },
    { emoji: "❄️", word: "snowy", fact: "Snowy means ice crystals are falling. Snow is frozen water." },
    { emoji: "☁️", word: "cloudy", fact: "Cloudy means clouds cover most of the sky." },
    { emoji: "💨", word: "windy", fact: "Windy means the air is moving quickly." },
    { emoji: "⛈️", word: "stormy", fact: "A storm can bring heavy rain, strong wind, thunder, and lightning. Stay indoors when you see lightning." },
    { emoji: "🌁", word: "foggy", fact: "Fog is a cloud touching the ground. It is made of tiny water drops, so it is hard to see far." },
    { emoji: "🌤️", word: "partly cloudy", fact: "Partly cloudy means some sunshine and some clouds, not a sky that is covered over." }
  ];

  const SEASON_CHOICES = ["Spring", "Summer", "Autumn", "Winter"];

  const SEASONS = [
    {
      ask: "In many temperate places, which season has the longest days?",
      answer: "Summer",
      fact: "The longest day is the summer solstice. Temperate summers are usually the warmest season too."
    },
    {
      ask: "In many temperate places, which season has the shortest days?",
      answer: "Winter",
      fact: "The shortest day is the winter solstice. Temperate winters are usually the coldest season."
    },
    {
      ask: "In the temperate year, which season comes right after winter?",
      answer: "Spring",
      fact: "The cycle is winter, spring, summer, autumn, and then winter again."
    },
    {
      ask: "In many temperate places, when do a lot of trees grow new leaves?",
      answer: "Spring",
      fact: "Spring follows winter. Many trees leaf out, and many flowers bloom."
    },
    {
      ask: "In many temperate places, when do lots of trees change colour and drop leaves?",
      answer: "Autumn",
      fact: "Autumn, also called fall, comes after summer. The days are getting shorter."
    },
    {
      ask: "In the Northern Hemisphere, which season is December in?",
      answer: "Winter",
      fact: "North of the equator, including the United States and Europe, December is in winter."
    },
    {
      ask: "In the Southern Hemisphere, which season is December in?",
      answer: "Summer",
      fact: "Seasons are reversed south of the equator. December is summer in Australia and Argentina."
    },
    {
      ask: "Near the equator, which pattern is more common than four strong seasons?",
      answer: "A wet season and a dry season",
      fact: "Close to the equator, it stays warm through the year. Many places there have a rainy season and a drier season instead of a cold winter.",
      choices: [
        { label: "A wet season and a dry season", value: "A wet season and a dry season" },
        { label: "Four equally cold seasons", value: "Four equally cold seasons" },
        { label: "No rain at any time", value: "No rain at any time" },
        { label: "A season that lasts one day", value: "A season that lasts one day" }
      ]
    }
  ];

  const CYCLE = [
    {
      ask: "Heat turns liquid water into vapor that rises into the air. What is that step called?",
      answer: "Evaporation",
      fact: "Evaporation happens when the sun heats water in oceans, lakes, and puddles, and the water becomes vapor."
    },
    {
      ask: "Water vapor cools into tiny droplets that form a cloud. What is that step called?",
      answer: "Condensation",
      fact: "Condensation is vapor cooling back into liquid. Clouds are crowds of those tiny droplets, or of ice crystals."
    },
    {
      ask: "Rain, snow, sleet, or hail falls from clouds. What is that step called?",
      answer: "Precipitation",
      fact: "Precipitation is water falling from the sky. Rain is liquid. Snow, sleet, and hail are frozen."
    },
    {
      ask: "Water gathers in rivers, lakes, oceans, or underground. What is that step called?",
      answer: "Collection",
      fact: "Collection means the water gathers again. Water flowing downhill into streams is also called runoff."
    },
    {
      ask: "What supplies most of the energy that keeps the water cycle moving?",
      answer: "The sun",
      fact: "Heat from the sun evaporates water. That is the energy that lifts water into the air.",
      choices: [
        { label: "The sun", value: "The sun" },
        { label: "The moon", value: "The moon" },
        { label: "Thunder", value: "Thunder" },
        { label: "Street lights", value: "Street lights" }
      ]
    },
    {
      ask: "Where does most evaporation on Earth happen?",
      answer: "Oceans",
      fact: "Oceans hold about 97% of Earth's water, so most evaporation comes from them. Lakes, soil, and plants add more.",
      choices: [
        { label: "Oceans", value: "Oceans" },
        { label: "Water bottles", value: "Water bottles" },
        { label: "Swimming pools", value: "Swimming pools" },
        { label: "Kitchen sinks", value: "Kitchen sinks" }
      ]
    },
    {
      ask: "Plants release water vapor from their leaves. What is that called?",
      answer: "Transpiration",
      fact: "Transpiration is water vapor leaving plants through their leaves. It joins evaporation in moving water into the air.",
      choices: [
        { label: "Transpiration", value: "Transpiration" },
        { label: "Precipitation", value: "Precipitation" },
        { label: "Collection", value: "Collection" },
        { label: "Freezing", value: "Freezing" }
      ]
    },
    {
      ask: "Which sentence about the water cycle is true?",
      answer: "It keeps going and has no last step",
      fact: "The same water keeps moving. It is not used up. A drop can evaporate, join a cloud, fall as rain, and later evaporate again.",
      choices: [
        { label: "It keeps going and has no last step", value: "It keeps going and has no last step" },
        { label: "It ends when the rain stops", value: "It ends when the rain stops" },
        { label: "It happens only in summer", value: "It happens only in summer" },
        { label: "Each trip uses up the water", value: "Each trip uses up the water" }
      ]
    }
  ];

  const STEP_NAMES = ["Evaporation", "Condensation", "Precipitation", "Collection"];
  let session = null;

  function questions(level) {
    if (level === "easy") {
      const words = WEATHER.map(function (item) { return item.word; });
      return Edu.shuffle(WEATHER.map(function (item) {
        return {
          emoji: item.emoji,
          ask: "What is this weather called?",
          answer: item.word,
          fact: item.fact,
          choices: Lab.options(item.word, words)
        };
      }));
    }
    if (level === "medium") {
      return Edu.shuffle(SEASONS.map(function (item) {
        return {
          seasons: true,
          ask: item.ask,
          answer: item.answer,
          fact: item.fact,
          choices: item.choices || Lab.options(item.answer, SEASON_CHOICES)
        };
      }));
    }
    return Edu.shuffle(CYCLE.map(function (item) {
      return {
        cycle: true,
        ask: item.ask,
        answer: item.answer,
        fact: item.fact,
        choices: item.choices || Lab.options(item.answer, STEP_NAMES)
      };
    }));
  }

  function drawCycle(parent) {
    const wrap = Lab.el("div", "cycle");
    wrap.innerHTML = [
      '<svg viewBox="0 0 340 180" role="img" aria-label="The sun heats the ocean, water rises, a cloud forms, and rain falls">',
      '<rect x="1" y="1" width="338" height="178" rx="16" fill="#fffdf8" stroke="#1c2430" stroke-width="2"/>',
      '<circle cx="52" cy="48" r="18" fill="#ffd36e" stroke="#1c2430" stroke-width="2"/>',
      '<g stroke="#1c2430" stroke-width="2" stroke-linecap="round">',
      '<path d="M52 20v-8M30 30l-6-6M24 52h-8M30 74l-6 6M74 30l6-6M80 52h8M74 74l6 6"/>',
      "</g>",
      '<path d="M16 136c24-14 40-14 64 0s40 14 64 0 40-14 64 0 40 14 64 0 32-14 52 0v28H16z" fill="#8ec5ff" stroke="#1c2430" stroke-width="2"/>',
      '<path d="M128 128V70" fill="none" stroke="#1c2430" stroke-width="2"/>',
      '<path d="M128 62l-8 14h16z" fill="#1c2430"/>',
      '<text x="78" y="112" font-size="13" font-family="Trebuchet MS, sans-serif" fill="#1c2430">rises</text>',
      '<ellipse cx="236" cy="52" rx="26" ry="14" fill="#fff" stroke="#1c2430" stroke-width="2"/>',
      '<ellipse cx="262" cy="56" rx="22" ry="14" fill="#fff" stroke="#1c2430" stroke-width="2"/>',
      '<ellipse cx="246" cy="64" rx="34" ry="14" fill="#fff" stroke="#1c2430" stroke-width="2"/>',
      '<g stroke="#2f6fed" stroke-width="3" stroke-linecap="round">',
      '<path d="M220 88v22M240 92v22M260 88v22"/>',
      "</g>",
      '<text x="272" y="108" font-size="13" font-family="Trebuchet MS, sans-serif" fill="#1c2430">falls</text>',
      "</svg>"
    ].join("");
    parent.appendChild(wrap);
  }

  function draw(stage, item) {
    if (item.emoji) {
      const pic = Lab.el("p", "emoji", item.emoji);
      pic.setAttribute("role", "img");
      pic.setAttribute("aria-label", "Weather picture");
      stage.appendChild(pic);
    }
    if (item.seasons) {
      const row = Lab.el("div", "seasons");
      ["Spring", "Summer", "Autumn", "Winter"].forEach(function (name) {
        row.appendChild(Lab.el("span", "", name));
      });
      stage.appendChild(row);
    }
    if (item.cycle) drawCycle(stage);
  }

  function start(level, api) {
    if (session) session.stop();
    session = Lab.round(api, {
      help: HELP[level],
      note: "You finished 8 weather questions.",
      questions: questions(level),
      draw: draw,
      again: function () { start(api.level, api); }
    });
  }

  Edu.bind("weather", start);
})();
