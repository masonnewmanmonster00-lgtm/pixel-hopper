(function () {
  "use strict";

  const HELP = {
    easy: "Paper, the compass, the Great Wall, and other ideas from ancient China.",
    medium: "Dynasties from the Qin to the Qing, and what each one is known for.",
    hard: "Myths to retire, and a closer look at the Silk Road and inventions."
  };

  function frame(sky, ground, inner) {
    return '<svg viewBox="0 0 220 150" role="img" aria-label="Lesson picture">' +
      '<rect width="220" height="150" fill="' + sky + '"/>' +
      '<rect y="108" width="220" height="42" fill="' + ground + '"/>' +
      inner + "</svg>";
  }

  const ART = {
    wall: frame("#cfe8ff", "#b7c4a4",
      '<path d="M8 100 C40 70 55 108 90 84 C120 64 130 100 160 78 C185 62 196 96 214 80 V112 H8 Z" fill="#7f8c74" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M16 92 h12 v-12 h8 v12 h14 v-14 h8 v14 h16 v-12 h8 v12" fill="#e7e0d2" stroke="#1c2430" stroke-width="2"/>'),
    paper: frame("#f6f1e4", "#e6d7b0",
      '<rect x="58" y="36" width="104" height="80" fill="#fffdf6" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M74 56 h72 M74 72 h60 M74 88 h68" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M150 96 l28 18" stroke="#8d4b3a" stroke-width="4" stroke-linecap="round"/>'),
    compass: frame("#e7f0ea", "#d5d8de",
      '<circle cx="110" cy="78" r="36" fill="#f7f4ee" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M110 48 v60 M80 78 h60" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M110 52 l8 26 h-16 z" fill="#c4472f" stroke="#1c2430" stroke-width="2"/>' +
      '<circle cx="110" cy="78" r="4" fill="#1c2430"/>'),
    silk: frame("#f8e7c8", "#e2c48a",
      '<path d="M20 112 C70 70 90 120 140 86 C170 68 190 100 210 90" fill="none" stroke="#c9963a" stroke-width="4"/>' +
      '<ellipse cx="70" cy="86" rx="16" ry="10" fill="#e6d2a8" stroke="#1c2430" stroke-width="2"/>' +
      '<ellipse cx="150" cy="74" rx="16" ry="10" fill="#e6d2a8" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="40" y="70" width="22" height="16" fill="#c4472f" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="168" y="62" width="22" height="16" fill="#2f6fed" stroke="#1c2430" stroke-width="2"/>'),
    army: frame("#e7d7b8", "#c9b48a",
      '<rect x="36" y="58" width="28" height="52" fill="#c9843a" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="76" y="50" width="28" height="60" fill="#a86b2c" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="116" y="58" width="28" height="52" fill="#c9843a" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="156" y="52" width="28" height="58" fill="#a86b2c" stroke="#1c2430" stroke-width="2"/>' +
      '<circle cx="50" cy="50" r="8" fill="#e2b07a" stroke="#1c2430" stroke-width="2"/>' +
      '<circle cx="90" cy="42" r="8" fill="#e2b07a" stroke="#1c2430" stroke-width="2"/>' +
      '<circle cx="130" cy="50" r="8" fill="#e2b07a" stroke="#1c2430" stroke-width="2"/>' +
      '<circle cx="170" cy="44" r="8" fill="#e2b07a" stroke="#1c2430" stroke-width="2"/>'),
    spark: frame("#1c2430", "#2a3344",
      '<circle cx="110" cy="78" r="8" fill="#ffd36e" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M110 40 v18 M110 98 v18 M70 78 h18 M132 78 h18 M84 50 l12 12 M126 96 l12 12 M136 50 l-12 12 M84 96 l12-12" stroke="#ffd36e" stroke-width="3" stroke-linecap="round"/>'),
    blocks: frame("#f4efe4", "#e4d2b0",
      '<rect x="46" y="70" width="36" height="28" fill="#8d4b3a" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="92" y="64" width="36" height="34" fill="#a86b2c" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="138" y="72" width="36" height="26" fill="#8d4b3a" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M54 84 h20 M100 80 h20 M146 84 h20" stroke="#f4efe4" stroke-width="2"/>'),
    canal: frame("#d5e6f2", "#8fbf7a",
      '<path d="M0 96 h220 v20 H0 z" fill="#7eb6e0" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M40 96 l30-24 h40 l20 24" fill="#c9843a" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="62" y="78" width="16" height="14" fill="#f4efe4" stroke="#1c2430" stroke-width="2"/>'),
    palace: frame("#d5e4f2", "#c9b48a",
      '<rect x="40" y="78" width="140" height="34" fill="#c4472f" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M30 78 L110 40 L190 78" fill="#e2b04a" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="96" y="88" width="28" height="24" fill="#6d3b32" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M48 78 v34 M70 78 v34 M150 78 v34 M172 78 v34" stroke="#1c2430" stroke-width="2"/>')
  };

  const EASY = [
    { art: "paper", ask: "Which invention, improved in China, replaced writing on bamboo strips for many people?", answer: "Paper", choices: ["Paper", "The steam engine", "The light bulb", "The telephone"], fact: "Cai Lun, a Han dynasty official, improved papermaking around 105 CE. Earlier scraps of paper have also been found, so he improved a process rather than inventing it from nothing." },
    { art: "compass", ask: "Which tool for finding direction was developed in China?", answer: "The magnetic compass", choices: ["The magnetic compass", "The GPS satellite", "The sextant from Europe", "The hourglass"], fact: "China developed the magnetic compass. Sailors were using it to navigate by the Song dynasty." },
    { art: "wall", ask: "What is the huge set of walls and watchtowers across northern China?", answer: "The Great Wall", choices: ["The Great Wall", "The Grand Canal", "The Silk Road", "The Forbidden City"], fact: "The Great Wall is not one wall built in a single year. Several dynasties built and rebuilt sections." },
    { art: "silk", ask: "Which cloth, made from the cocoons of moths, was a famous Chinese export?", answer: "Silk", choices: ["Silk", "Denim", "Nylon", "Wool from llamas"], fact: "Silk making was a closely kept Chinese skill for a long time. Silk became one of the goods carried west by traders." },
    { art: "army", ask: "The life-size clay army buried near Xi'an was made for which ruler?", answer: "Qin Shi Huang", choices: ["Qin Shi Huang", "Confucius", "Kublai Khan", "Cai Lun"], fact: "Qin Shi Huang was the first emperor of a unified China. The terracotta army was buried near his tomb. The figures are clay, not real soldiers." },
    { art: "paper", ask: "Confucius was a teacher during the Zhou period. What did he emphasize?", answer: "Learning, respect, and treating people humanely", choices: ["Learning, respect, and treating people humanely", "Building steamships", "Ruling as the first emperor", "Inventing gunpowder"], fact: "Confucius lived around 551 to 479 BCE. He was a teacher, not an emperor. His ideas about family, learning, and respect shaped later governments." },
    { art: "blocks", ask: "China printed books long before presses spread across Europe. What was an early method?", answer: "Carving a whole page into a wooden block", choices: ["Carving a whole page into a wooden block", "Typing on a laptop", "Writing only on stone forever", "Using a photocopier"], fact: "Woodblock printing was widely used by the Tang dynasty. Later, Bi Sheng made movable type from clay in the Song dynasty, around 1040." },
    { art: "spark", ask: "Alchemists in China discovered a black powder that could burn and explode. What was it?", answer: "Gunpowder", choices: ["Gunpowder", "Penicillin", "Concrete from Rome only", "Electricity"], fact: "Gunpowder was discovered in China by the 800s, during the Tang dynasty. It was later used in fireworks and weapons. This game does not teach anyone how to make it." }
  ];

  const MEDIUM = [
    { art: "army", ask: "Qin Shi Huang unified China in 221 BCE. What else did his government standardize?", answer: "Weights, coins, and the written script", choices: ["Weights, coins, and the written script", "The internet", "Provincial elections", "The Canadian dollar"], fact: "The Qin linked walls, built roads, and made weights, coins, and writing more uniform. Qin rule was also harsh." },
    { art: "wall", ask: "Much of the stone Great Wall that visitors walk on was rebuilt by which dynasty?", answer: "Ming", choices: ["Ming", "Qin only", "Qing only, in one summer", "The Zhou, before writing"], fact: "The Qin linked earlier walls. The famous stone sections near Beijing were largely rebuilt in the Ming dynasty, from the 1300s to the 1600s." },
    { art: "silk", ask: "Which dynasty is especially remembered for poetry, capital Chang'an, and busy Silk Road trade?", answer: "Tang", choices: ["Tang", "Qin", "A dynasty that has not happened yet", "The Shang, before silk roads"], fact: "The Tang dynasty, 618 to 907, was a high point of art and long-distance trade. Chang'an, now Xi'an, was one of the world's largest cities." },
    { art: "palace", ask: "Kublai Khan ruled China as part of which dynasty?", answer: "Yuan", choices: ["Yuan", "Han", "Sui", "Ming"], fact: "The Yuan dynasty, 1271 to 1368, was the Mongol dynasty in China. Kublai Khan ruled from what is now Beijing." },
    { art: "palace", ask: "Which was the last imperial dynasty of China?", answer: "Qing", choices: ["Qing", "Shang", "Qin", "Han"], fact: "The Qing dynasty ruled from 1644 to 1912. After it ended, China was no longer governed by an emperor." },
    { art: "compass", ask: "Paper money and wide use of the compass at sea both fit which dynasty?", answer: "Song", choices: ["Song", "Shang", "The ice age", "Qin, before paper"], fact: "The Song dynasty, 960 to 1279, used paper money and navigational compasses. Movable type also appeared then." },
    { art: "canal", ask: "The Sui dynasty is short, but it linked rivers into which waterway?", answer: "The Grand Canal", choices: ["The Grand Canal", "The Panama Canal", "The Great Wall", "The Nile"], fact: "The Sui, in the early 600s, connected earlier canals into the Grand Canal. It carried grain between north and south China. Parts of it are still used." },
    { art: "paper", ask: "Which order of dynasties is correct, from earlier to later?", answer: "Qin, then Han, then Tang", choices: ["Qin, then Han, then Tang", "Qing, then Qin, then Shang", "Ming, then Han, then Qin", "Tang, then Qin, then the Shang"], fact: "A useful line of major dynasties is Qin, Han, Sui, Tang, Song, Yuan, Ming, Qing. The Shang and Zhou came before the Qin." }
  ];

  const HARD = [
    { art: "wall", ask: "Which statement about the Great Wall is true?", answer: "Many dynasties built different sections over a long time", choices: ["Many dynasties built different sections over a long time", "One emperor finished the whole wall in a single year", "It is a canal", "It was built in Rome"], fact: "Walls were built, abandoned, and rebuilt from before the Qin through the Ming. Thinking of it as one continuous project by one person is a myth." },
    { art: "wall", ask: "Can you see the Great Wall from the Moon using only your eyes?", answer: "No. That story is a myth", choices: ["No. That story is a myth", "Yes, it is the only human thing you can see", "Yes, but only the Qin bricks", "Only during a solar eclipse"], fact: "Astronauts cannot pick out the Great Wall from the Moon with the naked eye. It is long, but it is not wide enough to see from that far away." },
    { art: "silk", ask: "What was the Silk Road?", answer: "A network of trade routes, not one single road", choices: ["A network of trade routes, not one single road", "A stone wall", "One paved highway built by the Ming", "A sea that China closed forever"], fact: "Traders moved silk, horses, glass, spices, and ideas. Buddhism traveled into China along these routes. There were also sea routes." },
    { art: "paper", ask: "What is the careful way to describe Cai Lun and paper?", answer: "He improved papermaking in the Han dynasty", choices: ["He improved papermaking in the Han dynasty", "He invented the telephone", "Paper was unknown anywhere until 1492", "He built the terracotta army"], fact: "Cai Lun presented an improved paper process around 105 CE. Archaeologists have found earlier paper fibres, so the honest sentence is that he improved it and helped it spread." },
    { art: "blocks", ask: "Who made movable clay type in China around 1040?", answer: "Bi Sheng", choices: ["Bi Sheng", "Qin Shi Huang", "Confucius", "Zhang Qian"], fact: "Bi Sheng's movable type came centuries before Gutenberg's metal press in Europe. Woodblock printing was already common in China." },
    { art: "silk", ask: "What traveled into China along the Silk Road besides goods?", answer: "Ideas, including Buddhism", choices: ["Ideas, including Buddhism", "Nothing but silk, in one direction", "The Canadian Charter", "Steam locomotives"], fact: "The routes carried religions, technologies, and art both ways. Zhang Qian's Han dynasty missions in the 100s BCE helped open official contact westward." },
    { art: "spark", ask: "When was gunpowder discovered?", answer: "In China, by the 800s", choices: ["In China, by the 800s", "In Canada in 1867", "In the Qin dynasty, before writing", "It was never used until modern factories"], fact: "Tang dynasty alchemists described the powder in the 800s. Song and later armies used it in weapons. The ingredients are not part of this game." },
    { art: "army", ask: "The terracotta army was found in 1974. What is true about the figures?", answer: "They are clay statues buried near the first emperor's tomb", choices: ["They are clay statues buried near the first emperor's tomb", "They are living soldiers still on duty", "They were built by the Qing in 1912", "They guard the Grand Canal"], fact: "Farmers digging a well near Xi'an found the pits. Thousands of clay soldiers, horses, and chariots were made for Qin Shi Huang's tomb complex." }
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
      note: "You finished " + round.length + " Ancient China questions.",
      questions: round,
      draw: draw,
      again: function () { start(api.level, api); }
    });
  }

  Edu.bind("china", start);
})();
