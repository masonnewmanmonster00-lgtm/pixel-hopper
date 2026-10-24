(function () {
  "use strict";

  const FAMILIES = ["Strings", "Woodwind", "Brass", "Percussion"];

  const HELP = {
    easy: "An orchestra sorts instruments into four families: strings, woodwind, brass, and percussion. Tap Play the sound to hear a simple synthesized tone. That button works even when game beeps are off.",
    medium: "A metal saxophone is still a woodwind, because of its reed. Listen, then choose the family. This is about orchestra families, not sound-wave physics.",
    hard: "The piano is often counted with percussion because hammers strike the strings. People also call it a keyboard. Play the sound still works when game beeps are off."
  };

  function frame(sky, inner) {
    return '<svg viewBox="0 0 220 150" role="img" aria-label="Lesson picture">' +
      '<rect width="220" height="150" fill="' + sky + '"/>' +
      '<rect y="118" width="220" height="32" fill="#d7c4a4"/>' +
      inner + "</svg>";
  }

  const ART = {
    violin: frame("#f6e7c8",
      '<ellipse cx="118" cy="96" rx="26" ry="30" fill="#c47a3a" stroke="#1c2430" stroke-width="2"/>' +
      '<ellipse cx="118" cy="78" rx="18" ry="14" fill="#e7b07a" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="112" y="36" width="12" height="40" fill="#5c3317" stroke="#1c2430" stroke-width="2"/>' +
      '<circle cx="118" cy="30" r="10" fill="#5c3317" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M118 40 v72" stroke="#fff8e8" stroke-width="1.5"/>' +
      '<path d="M104 88 q6 12 0 20" fill="none" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M132 88 q-6 12 0 20" fill="none" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M36 108 Q90 40 150 96" fill="none" stroke="#f4efe4" stroke-width="4"/>' +
      '<path d="M150 96 l8 6" stroke="#1c2430" stroke-width="2"/>'),
    cello: frame("#f3e2c4",
      '<ellipse cx="110" cy="86" rx="34" ry="36" fill="#a8642e" stroke="#1c2430" stroke-width="2"/>' +
      '<ellipse cx="110" cy="68" rx="22" ry="16" fill="#d9a36a" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="103" y="24" width="14" height="40" fill="#5c3317" stroke="#1c2430" stroke-width="2"/>' +
      '<circle cx="110" cy="20" r="9" fill="#5c3317" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M110 30 v78" stroke="#fff8e8" stroke-width="1.5"/>' +
      '<path d="M110 122 v16" stroke="#1c2430" stroke-width="3"/>' +
      '<path d="M28 100 Q80 36 150 90" fill="none" stroke="#f7f3ea" stroke-width="4"/>'),
    flute: frame("#e4eef6",
      '<rect x="24" y="68" width="172" height="16" rx="8" fill="#d5dde6" stroke="#1c2430" stroke-width="2"/>' +
      '<ellipse cx="46" cy="68" rx="10" ry="7" fill="#f7f9fb" stroke="#1c2430" stroke-width="2"/>' +
      '<circle cx="78" cy="68" r="5" fill="#eef2f6" stroke="#1c2430" stroke-width="2"/>' +
      '<circle cx="98" cy="76" r="5" fill="#eef2f6" stroke="#1c2430" stroke-width="2"/>' +
      '<circle cx="118" cy="68" r="5" fill="#eef2f6" stroke="#1c2430" stroke-width="2"/>' +
      '<circle cx="138" cy="76" r="5" fill="#eef2f6" stroke="#1c2430" stroke-width="2"/>' +
      '<circle cx="158" cy="68" r="5" fill="#eef2f6" stroke="#1c2430" stroke-width="2"/>'),
    clarinet: frame("#e7eef4",
      '<rect x="102" y="22" width="16" height="86" rx="4" fill="#1c2430" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="98" y="96" width="24" height="28" fill="#1c2430"/>' +
      '<path d="M90 124 h40 l-8 14 h-24 z" fill="#2a3140" stroke="#1c2430" stroke-width="2"/>' +
      '<circle cx="110" cy="40" r="3" fill="#d5dde6"/>' +
      '<circle cx="110" cy="54" r="3" fill="#d5dde6"/>' +
      '<circle cx="110" cy="68" r="3" fill="#d5dde6"/>' +
      '<circle cx="110" cy="82" r="3" fill="#d5dde6"/>' +
      '<rect x="106" y="12" width="8" height="12" fill="#c9a36a" stroke="#1c2430" stroke-width="2"/>'),
    trumpet: frame("#f8efd4",
      '<rect x="36" y="70" width="18" height="10" rx="2" fill="#c9ccd1" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="52" y="68" width="78" height="14" fill="#e6b84a" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="74" y="48" width="8" height="24" rx="2" fill="#f0d078" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="90" y="44" width="8" height="28" rx="2" fill="#f0d078" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="106" y="48" width="8" height="24" rx="2" fill="#f0d078" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M130 62 L176 46 L176 104 L130 88 Z" fill="#e6b84a" stroke="#1c2430" stroke-width="2"/>' +
      '<ellipse cx="176" cy="75" rx="6" ry="29" fill="#f3d98a" stroke="#1c2430" stroke-width="2"/>'),
    trombone: frame("#f6edd2",
      '<rect x="48" y="52" width="112" height="10" rx="3" fill="#e6b84a" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="48" y="86" width="112" height="10" rx="3" fill="#e6b84a" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M46 52 v44" stroke="#e6b84a" stroke-width="10" stroke-linecap="round"/>' +
      '<path d="M46 52 v44" fill="none" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M150 46 L188 36 L188 78 L150 68 Z" fill="#e6b84a" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="70" y="40" width="8" height="18" fill="#c9ccd1" stroke="#1c2430" stroke-width="2"/>'),
    drum: frame("#f8e6d8",
      '<ellipse cx="110" cy="70" rx="52" ry="16" fill="#f7f3ea" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M58 70 h104 v34 a52 16 0 0 1 -104 0 z" fill="#c4472f" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M64 48 L126 86" stroke="#e7c48a" stroke-width="5" stroke-linecap="round"/>' +
      '<path d="M156 48 L94 86" stroke="#e7c48a" stroke-width="5" stroke-linecap="round"/>'),
    xylophone: frame("#efe6d2",
      '<path d="M40 108 h150" stroke="#5c3317" stroke-width="6" stroke-linecap="round"/>' +
      '<rect x="48" y="46" width="16" height="62" rx="3" fill="#e6b84a" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="70" y="52" width="16" height="56" rx="3" fill="#f0d078" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="92" y="58" width="16" height="50" rx="3" fill="#e6b84a" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="114" y="64" width="16" height="44" rx="3" fill="#f0d078" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="136" y="70" width="16" height="38" rx="3" fill="#e6b84a" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M36 40 l24 28" stroke="#c9a36a" stroke-width="4" stroke-linecap="round"/>' +
      '<circle cx="62" cy="70" r="5" fill="#f7f3ea" stroke="#1c2430" stroke-width="2"/>'),
    harp: frame("#f7ecd4",
      '<path d="M70 120 L70 36 Q120 20 156 78 L150 120 Z" fill="#e6b84a" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M78 108 L148 86 M82 96 L146 78 M86 84 L142 68 M90 72 L136 58 M94 60 L128 50" stroke="#fff8e8" stroke-width="1.5"/>'),
    sax: frame("#f8efd4",
      '<path d="M128 28 h18 v36 q0 20 -16 28 l-8 8 q-28 18 -36 8 q-8 -10 6 -16 l20 -8 q16 -8 16 -24 z" fill="#e6b84a" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="132" y="16" width="8" height="16" fill="#2a3140" stroke="#1c2430" stroke-width="2"/>' +
      '<circle cx="124" cy="52" r="3" fill="#1c2430"/>' +
      '<circle cx="122" cy="66" r="3" fill="#1c2430"/>' +
      '<ellipse cx="96" cy="104" rx="18" ry="12" fill="#f0d078" stroke="#1c2430" stroke-width="2"/>'),
    timpani: frame("#f4e4d4",
      '<ellipse cx="110" cy="78" rx="48" ry="14" fill="#f7f3ea" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M66 78 Q62 120 110 124 Q158 120 154 78" fill="#b87333" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M96 40 l18 36" stroke="#c9a36a" stroke-width="4" stroke-linecap="round"/>' +
      '<circle cx="116" cy="78" r="5" fill="#f4efe4" stroke="#1c2430" stroke-width="2"/>'),
    horn: frame("#f8efd4",
      '<circle cx="108" cy="78" r="36" fill="none" stroke="#e6b84a" stroke-width="12"/>' +
      '<circle cx="108" cy="78" r="36" fill="none" stroke="#1c2430" stroke-width="2"/>' +
      '<circle cx="108" cy="78" r="28" fill="none" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="78" y="70" width="16" height="10" rx="2" fill="#c9ccd1" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M140 62 L176 48 L176 96 L140 84 Z" fill="#e6b84a" stroke="#1c2430" stroke-width="2"/>'),
    oboe: frame("#efe6d2",
      '<rect x="104" y="36" width="12" height="78" rx="4" fill="#1c2430"/>' +
      '<path d="M100 110 h20 l-4 16 h-12 z" fill="#2a3140" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M107 20 h6 l-1 16 h-4 z" fill="#c9a36a" stroke="#1c2430" stroke-width="2"/>' +
      '<circle cx="110" cy="52" r="2.5" fill="#d5dde6"/>' +
      '<circle cx="110" cy="66" r="2.5" fill="#d5dde6"/>' +
      '<circle cx="110" cy="80" r="2.5" fill="#d5dde6"/>' +
      '<circle cx="110" cy="94" r="2.5" fill="#d5dde6"/>'),
    listen: frame("#e7f0ea",
      '<rect x="58" y="58" width="28" height="36" rx="4" fill="#1c2430"/>' +
      '<path d="M86 64 L118 48 V104 L86 88 Z" fill="#ffd36e" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M132 62 q16 14 0 28" fill="none" stroke="#1c2430" stroke-width="3"/>' +
      '<path d="M142 52 q26 24 0 48" fill="none" stroke="#1c2430" stroke-width="3"/>'),
    piano: frame("#efe6d2",
      '<path d="M36 96 V58 h148 v38 z" fill="#2a3140" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="36" y="96" width="148" height="22" fill="#1c2430"/>' +
      '<rect x="44" y="64" width="14" height="32" fill="#f7f3ea" stroke="#1c2430"/>' +
      '<rect x="58" y="64" width="14" height="32" fill="#f7f3ea" stroke="#1c2430"/>' +
      '<rect x="72" y="64" width="14" height="32" fill="#f7f3ea" stroke="#1c2430"/>' +
      '<rect x="86" y="64" width="14" height="32" fill="#f7f3ea" stroke="#1c2430"/>' +
      '<rect x="100" y="64" width="14" height="32" fill="#f7f3ea" stroke="#1c2430"/>' +
      '<rect x="114" y="64" width="14" height="32" fill="#f7f3ea" stroke="#1c2430"/>' +
      '<rect x="128" y="64" width="14" height="32" fill="#f7f3ea" stroke="#1c2430"/>' +
      '<rect x="142" y="64" width="14" height="32" fill="#f7f3ea" stroke="#1c2430"/>' +
      '<rect x="156" y="64" width="14" height="32" fill="#f7f3ea" stroke="#1c2430"/>' +
      '<rect x="54" y="64" width="8" height="18" fill="#1c2430"/>' +
      '<rect x="68" y="64" width="8" height="18" fill="#1c2430"/>' +
      '<rect x="96" y="64" width="8" height="18" fill="#1c2430"/>' +
      '<rect x="110" y="64" width="8" height="18" fill="#1c2430"/>' +
      '<rect x="124" y="64" width="8" height="18" fill="#1c2430"/>'),
    bass: frame("#f3e2c4",
      '<ellipse cx="124" cy="92" rx="40" ry="40" fill="#8d4e22" stroke="#1c2430" stroke-width="2"/>' +
      '<ellipse cx="124" cy="72" rx="26" ry="18" fill="#c47a3a" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="116" y="16" width="16" height="48" fill="#5c3317" stroke="#1c2430" stroke-width="2"/>' +
      '<circle cx="124" cy="14" r="10" fill="#5c3317" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M124 24 v92" stroke="#fff8e8" stroke-width="2"/>' +
      '<path d="M124 132 v10" stroke="#1c2430" stroke-width="3"/>'),
    recorder: frame("#f7f1e4",
      '<rect x="100" y="28" width="18" height="90" rx="6" fill="#f4efe4" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="96" y="18" width="26" height="16" rx="4" fill="#e7d7b8" stroke="#1c2430" stroke-width="2"/>' +
      '<circle cx="109" cy="52" r="3" fill="#1c2430"/>' +
      '<circle cx="109" cy="66" r="3" fill="#1c2430"/>' +
      '<circle cx="109" cy="80" r="3" fill="#1c2430"/>' +
      '<circle cx="109" cy="94" r="3" fill="#1c2430"/>' +
      '<circle cx="109" cy="106" r="3" fill="#1c2430"/>'),
    tuba: frame("#f8efd4",
      '<path d="M70 40 h16 v70 h-16 z" fill="#e6b84a" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M70 100 q20 24 50 10" fill="none" stroke="#e6b84a" stroke-width="16"/>' +
      '<path d="M70 100 q20 24 50 10" fill="none" stroke="#1c2430" stroke-width="2"/>' +
      '<ellipse cx="132" cy="78" rx="28" ry="36" fill="#f0d078" stroke="#1c2430" stroke-width="2"/>' +
      '<ellipse cx="132" cy="78" rx="16" ry="22" fill="#1c2430" opacity="0.25"/>' +
      '<rect x="66" y="28" width="24" height="12" rx="3" fill="#c9ccd1" stroke="#1c2430" stroke-width="2"/>'),
    cymbals: frame("#f8efd4",
      '<ellipse cx="78" cy="78" rx="36" ry="14" fill="#f0d078" stroke="#1c2430" stroke-width="2" transform="rotate(-28 78 78)"/>' +
      '<ellipse cx="142" cy="78" rx="36" ry="14" fill="#e6b84a" stroke="#1c2430" stroke-width="2" transform="rotate(28 142 78)"/>' +
      '<path d="M78 78 l-20 40" stroke="#c9a36a" stroke-width="4"/>' +
      '<path d="M142 78 l20 40" stroke="#c9a36a" stroke-width="4"/>')
  };

  const EASY = [
    { art: "violin", hear: "strings", ask: "This is a violin. Which family is it?", answer: "Strings", fact: "A violin has four strings and is usually played with a bow. Violin, viola, cello, and double bass are the string family." },
    { art: "cello", hear: "strings", ask: "This is a cello. Which family is it?", answer: "Strings", fact: "A cello rests on the floor with an endpin. Its strings are longer and lower than a violin's. It is a string instrument." },
    { art: "flute", hear: "woodwind", ask: "This is a flute. Which family is it?", answer: "Woodwind", fact: "A flute is a woodwind. The player blows across a hole, and the air column inside the tube vibrates. A flute has no reed." },
    { art: "clarinet", hear: "woodwind", ask: "This is a clarinet. Which family is it?", answer: "Woodwind", fact: "A clarinet uses a single reed on the mouthpiece. Covering the holes changes the note. It is a woodwind." },
    { art: "trumpet", hear: "brass", ask: "This is a trumpet. Which family is it?", answer: "Brass", fact: "A trumpet player buzzes their lips into a mouthpiece. Three valves change the note. It is a brass instrument." },
    { art: "trombone", hear: "brass", ask: "This is a trombone. Which family is it?", answer: "Brass", fact: "A trombone is brass. The player buzzes into the mouthpiece and moves the slide to change the note." },
    { art: "drum", hear: "percussion", ask: "This is a drum. Which family is it?", answer: "Percussion", fact: "You play a drum by striking it. Drums, cymbals, xylophones, and timpani are percussion." },
    { art: "xylophone", hear: "percussion", ask: "This is a xylophone. Which family is it?", answer: "Percussion", fact: "A xylophone has bars that you strike with mallets. Different bar lengths make different notes. It is percussion." }
  ];

  const MEDIUM = [
    { art: "trumpet", ask: "Which of these is not a string instrument?", answer: "Trumpet", choices: ["Trumpet", "Violin", "Viola", "Cello"], fact: "Violin, viola, and cello are strings. A trumpet is brass: the player buzzes their lips into a mouthpiece." },
    { art: "sax", hear: "woodwind", ask: "A saxophone is made of metal. Which family is it in?", answer: "Woodwind", fact: "The saxophone uses a reed, and the sound comes from the air column inside. That puts it in the woodwind family even though the body is metal." },
    { art: "harp", hear: "strings", ask: "This is a harp. Which family is it?", answer: "Strings", fact: "A harp's strings are plucked. In an orchestra it sits with the string family." },
    { art: "timpani", hear: "percussion", ask: "These are timpani, or kettle drums. Which family are they?", answer: "Percussion", fact: "Timpani are large copper bowls with a drumhead. The player strikes them with mallets, so they are percussion." },
    { art: "horn", hear: "brass", ask: "This is a French horn. Which family is it?", answer: "Brass", fact: "A French horn is a coiled brass instrument. The player buzzes into a mouthpiece, and valves plus the hand in the bell change the note." },
    { art: "oboe", hear: "woodwind", ask: "This is an oboe. Which family is it?", answer: "Woodwind", fact: "An oboe uses a double reed. Two thin pieces of cane vibrate against each other. It is a woodwind." },
    { art: "listen", hear: "strings", ask: "Tap Play the sound, then choose the family.", answer: "Strings", fact: "That sound is a stand-in for bowed strings: a bright tone with a little wobble, like a violin note. Real instruments are richer than this synthesized tone." },
    { art: "listen", hear: "brass", ask: "Tap Play the sound, then choose the family.", answer: "Brass", fact: "That sound is a stand-in for brass: a buzzy note that opens up, the way a trumpet gets brighter. Real brass comes from buzzing lips, not from a speaker." }
  ];

  const HARD = [
    { art: "piano", ask: "Hammers inside a piano strike the strings. Many school orchestras count it with which family?", answer: "Percussion", fact: "Because hammers strike the strings, many school programs place the piano with percussion. It is also called a keyboard instrument. It is not only a member of the bowed string section." },
    { art: "flute", ask: "The flute has no reed. Which family is it in?", answer: "Woodwind", fact: "A reed is common in the woodwind family, but it is not required. The flute, the piccolo, and the recorder are woodwinds with no reed." },
    { art: "sax", ask: "Which sentence about the saxophone is accurate?", answer: "It is a woodwind, even though it is metal", choices: ["It is a woodwind, even though it is metal", "It is brass because the body is metal", "It is percussion because keys click", "It is a string instrument"], fact: "Family names follow how the sound is made. A saxophone sound starts with a reed and an air column, so it is a woodwind." },
    { art: "bass", ask: "The double bass is the largest instrument of the violin family. Which family is it?", answer: "Strings", fact: "A double bass has strings and is usually played with a bow or by plucking. The word bass is also used for a low brass sound, but this instrument is strings." },
    { art: "recorder", ask: "This is a recorder. Which family is it?", answer: "Woodwind", fact: "A recorder is a woodwind. You blow into a mouthpiece and cover the holes. It does not use a reed." },
    { art: "trumpet", ask: "A player buzzes their lips into a cup-shaped mouthpiece. Which family is that?", answer: "Brass", fact: "Lip buzzing is the brass-family method. Trumpets, trombones, French horns, and tubas all work that way." },
    { art: "listen", hear: "woodwind", ask: "Tap Play the sound, then choose the family.", answer: "Woodwind", fact: "That sound is a stand-in for a woodwind: a smoother, higher tone, like air in a tube. A real flute or clarinet has more color than this simple tone." },
    { art: "listen", hear: "percussion", ask: "Tap Play the sound, then choose the family.", answer: "Percussion", fact: "That sound is a stand-in for percussion: a short hit with noise and a falling pitch, like a drum. Real drums and cymbals are struck, not blown or bowed." }
  ];

  let audioCtx = null;
  let live = [];
  let session = null;

  function stopLive() {
    live.forEach(function (node) {
      try { node.stop(); } catch (e) {}
    });
    live = [];
  }

  function env(gain, time, peak, attack, dur) {
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(peak, time + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + dur);
  }

  function playSound(kind) {
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      if (!audioCtx) audioCtx = new AC();
      const run = function () {
        try {
          stopLive();
          const ac = audioCtx;
          const t = ac.currentTime + 0.02;
          if (kind === "strings") {
            const osc = ac.createOscillator();
            const gain = ac.createGain();
            const lfo = ac.createOscillator();
            const depth = ac.createGain();
            osc.type = "sawtooth";
            osc.frequency.setValueAtTime(440, t);
            lfo.frequency.setValueAtTime(5, t);
            depth.gain.setValueAtTime(6, t);
            lfo.connect(depth);
            depth.connect(osc.frequency);
            env(gain, t, 0.06, 0.12, 0.9);
            osc.connect(gain);
            gain.connect(ac.destination);
            lfo.start(t);
            osc.start(t);
            osc.stop(t + 0.95);
            lfo.stop(t + 0.95);
            live.push(osc, lfo);
          } else if (kind === "woodwind") {
            const osc = ac.createOscillator();
            const harm = ac.createOscillator();
            const gain = ac.createGain();
            const harmGain = ac.createGain();
            osc.type = "sine";
            harm.type = "sine";
            osc.frequency.setValueAtTime(830, t);
            harm.frequency.setValueAtTime(1660, t);
            env(gain, t, 0.06, 0.05, 0.7);
            harmGain.gain.setValueAtTime(0.012, t);
            osc.connect(gain);
            harm.connect(harmGain);
            gain.connect(ac.destination);
            harmGain.connect(ac.destination);
            osc.start(t);
            harm.start(t);
            osc.stop(t + 0.75);
            harm.stop(t + 0.75);
            live.push(osc, harm);
          } else if (kind === "brass") {
            const osc = ac.createOscillator();
            const filter = ac.createBiquadFilter();
            const gain = ac.createGain();
            osc.type = "sawtooth";
            osc.frequency.setValueAtTime(349, t);
            filter.type = "lowpass";
            filter.frequency.setValueAtTime(400, t);
            filter.frequency.linearRampToValueAtTime(2200, t + 0.18);
            filter.frequency.linearRampToValueAtTime(900, t + 0.7);
            env(gain, t, 0.07, 0.08, 0.8);
            osc.connect(filter);
            filter.connect(gain);
            gain.connect(ac.destination);
            osc.start(t);
            osc.stop(t + 0.85);
            live.push(osc);
          } else if (kind === "percussion") {
            const seconds = 0.25;
            const buffer = ac.createBuffer(1, Math.floor(ac.sampleRate * seconds), ac.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1;
            const noise = ac.createBufferSource();
            const noiseGain = ac.createGain();
            noise.buffer = buffer;
            noiseGain.gain.setValueAtTime(0.16, t);
            noiseGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
            noise.connect(noiseGain);
            noiseGain.connect(ac.destination);
            noise.start(t);
            noise.stop(t + seconds);
            const osc = ac.createOscillator();
            const gain = ac.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(160, t);
            osc.frequency.exponentialRampToValueAtTime(55, t + 0.2);
            gain.gain.setValueAtTime(0.18, t);
            gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
            osc.connect(gain);
            gain.connect(ac.destination);
            osc.start(t);
            osc.stop(t + 0.26);
            live.push(noise, osc);
          }
        } catch (e) {}
      };
      if (audioCtx.state === "suspended") {
        const pending = audioCtx.resume();
        if (pending && typeof pending.then === "function") pending.then(run).catch(function () {});
        else run();
      } else {
        run();
      }
    } catch (e) {}
  }

  function pack(item) {
    const labels = item.choices || FAMILIES;
    return {
      art: item.art,
      hear: item.hear || "",
      ask: item.ask,
      answer: item.answer,
      fact: item.fact,
      choices: Edu.shuffle(labels).map(function (label) {
        return { label: label, value: label };
      })
    };
  }

  function questions(level) {
    const bank = level === "easy" ? EASY : level === "medium" ? MEDIUM : HARD;
    return Edu.shuffle(bank.map(pack));
  }

  function draw(stage, item) {
    if (item.art && ART[item.art]) {
      const wrap = Lab.el("div", "scene");
      wrap.innerHTML = ART[item.art];
      stage.appendChild(wrap);
    }
    if (item.hear) {
      const btn = Lab.el("button", "textbtn hear", "Play the sound");
      btn.setAttribute("data-action", "hear");
      btn.addEventListener("click", function () { playSound(item.hear); });
      stage.appendChild(btn);
    }
  }

  function start(level, api) {
    if (session) session.stop();
    stopLive();
    const round = questions(level);
    session = Lab.round(api, {
      help: HELP[level],
      note: "You finished " + round.length + " instrument questions.",
      questions: round,
      draw: draw,
      again: function () { start(api.level, api); }
    });
  }

  Edu.bind("families", start);
})();
