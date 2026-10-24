(function () {
  "use strict";

  const HELP = {
    easy: "Look at the face and name the feeling. People can feel more than one thing at once.",
    medium: "Read what happened and match the feeling. A feeling is a signal, not a mistake.",
    hard: "Pick a kind response. Kind does not mean you have to fix everything."
  };

  const FEELINGS = ["Happy", "Sad", "Angry", "Scared", "Surprised", "Worried", "Excited", "Calm", "Proud", "Lonely", "Embarrassed", "Frustrated"];

  const EASY = [
    { mood: "happy", answer: "Happy", fact: "A smile and soft eyes often show happy." },
    { mood: "sad", answer: "Sad", fact: "A frown and drooping eyes often show sad." },
    { mood: "angry", answer: "Angry", fact: "Eyebrows pulled down and a tight mouth often show angry." },
    { mood: "scared", answer: "Scared", fact: "Wide eyes and a small open mouth often show scared." },
    { mood: "surprised", answer: "Surprised", fact: "Round eyes and an open mouth often show surprised." },
    { mood: "worried", answer: "Worried", fact: "Raised inner eyebrows and a small frown often show worried." },
    { mood: "excited", answer: "Excited", fact: "A big smile can show excited. Excited is happy with extra energy." },
    { mood: "calm", answer: "Calm", fact: "A relaxed face and a small smile often show calm." }
  ];

  const MEDIUM = [
    {
      mood: "sad",
      ask: "A friend waited all week for a trip, and then it was cancelled. Which feeling fits?",
      answer: "Sad",
      fact: "A cancelled plan often feels sad. They might also feel disappointed. Both can be true."
    },
    {
      mood: "proud",
      ask: "You worked hard on a story, and the teacher asks you to read it aloud. Which feeling fits?",
      answer: "Proud",
      fact: "Proud is the warm feeling when you see your own effort pay off."
    },
    {
      mood: "scared",
      ask: "Thunder cracks right over the house and the lights flicker. Which feeling fits?",
      answer: "Scared",
      fact: "A sudden loud storm can make someone feel scared. That feeling is trying to keep them safe."
    },
    {
      mood: "worried",
      ask: "It is the first day at a new school, and you cannot find your class. Which feeling fits?",
      answer: "Worried",
      fact: "Worried shows up when you are not sure what will happen next."
    },
    {
      mood: "excited",
      ask: "Your team scores in the last second of the game. Which feeling fits?",
      answer: "Excited",
      fact: "Excited is a burst of happy energy."
    },
    {
      mood: "frustrated",
      ask: "The puzzle piece will not fit, and you have tried it three times. Which feeling fits?",
      answer: "Frustrated",
      fact: "Frustrated is the stuck feeling when something will not work yet."
    },
    {
      mood: "surprised",
      ask: "You open the door and people shout 'surprise!' Which feeling fits?",
      answer: "Surprised",
      fact: "Surprised is what you feel when something happens that you did not expect."
    },
    {
      mood: "lonely",
      ask: "Everyone else has a partner, and nobody saved you a seat. Which feeling fits?",
      answer: "Lonely",
      fact: "Lonely is the feeling of being left out, even in a room full of people."
    },
    {
      mood: "embarrassed",
      ask: "You forget the words in front of the class, and your face feels hot. Which feeling fits?",
      answer: "Embarrassed",
      fact: "Embarrassed is that hot, wish-I-could-hide feeling after a mistake everyone saw."
    },
    {
      mood: "calm",
      ask: "You finish reading in a quiet corner and your shoulders drop. Which feeling fits?",
      answer: "Calm",
      fact: "Calm is a settled feeling. Your body often gets quieter too."
    }
  ];

  const HARD = [
    {
      ask: "A friend is crying because their dog is sick. What is a kind response?",
      answer: "Sit with them and say you are sorry this is happening",
      alts: ["Tell them to stop crying", "Laugh and change the subject", "Say it is not a big deal"],
      fact: "Sitting with someone shows you care. You do not have to make the problem disappear."
    },
    {
      ask: "You lose a game and feel angry. What is a kind thing to do?",
      answer: "Take a breath and say that you feel frustrated",
      alts: ["Yell at the winner", "Knock the game over", "Call them a cheater"],
      fact: "Angry is allowed. Naming it in a calm voice keeps the feeling from spilling onto someone else."
    },
    {
      ask: "A new student is standing alone at recess. What is a kind response?",
      answer: "Ask if they want to play",
      alts: ["Whisper about them", "Pretend you do not see them", "Tell them to go somewhere else"],
      fact: "One invitation can turn lonely into included."
    },
    {
      ask: "A classmate trips and looks embarrassed. What is a kind response?",
      answer: "Ask if they are okay and help pick up their books",
      alts: ["Point and laugh", "Copy the fall", "Tell more people about it"],
      fact: "Helping with the practical thing, like the books, gives them a way back from the moment."
    },
    {
      ask: "Your little cousin says they are scared of the dark. What is a kind response?",
      answer: "Stay nearby and tell a grown-up they trust",
      alts: ["Call them a baby", "Switch the light off as a joke", "Ignore them"],
      fact: "Fear gets smaller when someone stays close. A trusted adult should know if a child is really scared."
    },
    {
      ask: "A friend shows you a drawing they are proud of. What is a kind response?",
      answer: "Name one thing you like about it",
      alts: ["Say yours is better", "Shrug and walk off", "Only point out a smudge"],
      fact: "A specific compliment tells them you really looked."
    },
    {
      ask: "You feel worried about a test. What is a kind thing to do for yourself?",
      answer: "Tell a parent or teacher and make a short study plan",
      alts: ["Hide the book and hope", "Make fun of kids who study", "Refuse to talk about it"],
      fact: "Worry shrinks when you share it and take one small next step."
    },
    {
      ask: "Two friends disagree about the rules. What is a kind response?",
      answer: "Pause the game and let each person explain",
      alts: ["Pick a side and shout", "Blame both and quit", "Change the rules in secret"],
      fact: "Each person gets a turn to talk. Then the group can pick a rule together."
    }
  ];

  let session = null;

  function faceSVG(mood) {
    const parts = {
      happy: { eye: 5.5, brow: "M46 60c8-10 18-10 24 0M90 60c8-10 18-10 24 0", mouth: "M56 98c8 18 40 18 48 0" },
      excited: { eye: 6.5, brow: "M44 56c10-14 20-14 26 0M90 56c10-14 20-14 26 0", mouth: "M50 94c10 26 50 26 60 0", open: true },
      proud: { eye: 4.2, brow: "M48 62c8-8 16-8 22 0M92 58c8-10 16-8 22 2", mouth: "M62 100c6 12 30 12 36 0" },
      calm: { eye: 0, brow: "M48 64c6-4 14-4 20 0M92 64c6-4 14-4 20 0", mouth: "M66 104c5 8 22 8 28 0", calm: true },
      sad: { eye: 5, brow: "M46 68c10-12 18-6 24 2M90 70c6-8 16-14 26-2", mouth: "M58 116c8-16 36-16 44 0", tear: true },
      lonely: { eye: 5, ey: 90, brow: "M46 70c10-8 18-4 24 2M90 72c8-8 16-10 24 0", mouth: "M62 118c6-12 30-12 36 0" },
      worried: { eye: 5.2, brow: "M44 70c12-14 18-6 26 2M96 62c8-4 16-12 22 0", mouth: "M64 112c6-10 26-10 32 0", sweat: true },
      angry: { eye: 4, brow: "M42 74l28-16M118 74l-28-16", mouth: "M62 112h36", flat: true },
      frustrated: { eye: 4.4, brow: "M42 72l26-12M118 72l-26-12", mouth: "M58 108c10 10 14 10 22 0c8-10 12-10 22 0" },
      scared: { eye: 8, brow: "M42 58c12-12 22-12 28 0M90 58c12-12 22-12 28 0", mouth: "M72 102a8 10 0 1 0 16 0a8 10 0 1 0-16 0", fillMouth: true },
      surprised: { eye: 9, brow: "M44 58h24M92 58h24", mouth: "M68 98a12 14 0 1 0 24 0a12 14 0 1 0-24 0", fillMouth: true },
      embarrassed: { eye: 5, ex: -6, brow: "M46 66c8-8 16-8 22 0M92 66c8-8 16-8 22 0", mouth: "M66 108c4 8 10 8 14 2c4 6 10 6 16-2", blush: true }
    };
    const p = parts[mood];
    const ey = p.ey || 78;
    const shift = p.ex || 0;
    const left = 58 + shift;
    const right = 102 + shift;
    let eyes = "";
    if (p.calm) {
      eyes = '<path d="M46 82c6 7 16 7 22 0M92 82c6 7 16 7 22 0" fill="none" stroke="#1c2430" stroke-width="3" stroke-linecap="round"/>';
    } else {
      const ry = p.eye;
      eyes = '<circle cx="' + left + '" cy="' + ey + '" r="' + ry + '" fill="#1c2430"/>' +
        '<circle cx="' + right + '" cy="' + ey + '" r="' + ry + '" fill="#1c2430"/>' +
        '<circle cx="' + (left + 2) + '" cy="' + (ey - 2) + '" r="1.5" fill="#fff"/>' +
        '<circle cx="' + (right + 2) + '" cy="' + (ey - 2) + '" r="1.5" fill="#fff"/>';
    }
    const blush = p.blush
      ? '<ellipse cx="46" cy="98" rx="11" ry="6" fill="#f4a3b0" stroke="none"/><ellipse cx="114" cy="98" rx="11" ry="6" fill="#f4a3b0" stroke="none"/>'
      : "";
    const tear = p.tear
      ? '<path d="M108 90c0 8 6 12 6 12s6-4 6-12c0-6-6-10-6-10s-6 4-6 10z" fill="#7eb6e0" stroke="#1c2430" stroke-width="1.5"/>'
      : "";
    const sweat = p.sweat
      ? '<path d="M122 46c0 6 5 9 5 9s5-3 5-9c0-5-5-8-5-8s-5 3-5 8z" fill="#9fd0ef" stroke="#1c2430" stroke-width="1.5"/>'
      : "";
    const mouthFill = p.fillMouth ? ' fill="#1c2430"' : ' fill="none"';
    return '<svg viewBox="0 0 160 160" role="img" aria-label="A face showing a feeling">' +
      '<circle cx="80" cy="82" r="58" fill="#f6d2b5" stroke="#1c2430" stroke-width="3"/>' +
      blush + tear + sweat + eyes +
      '<path d="' + p.brow + '" fill="none" stroke="#1c2430" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="' + p.mouth + '"' + mouthFill + ' stroke="#1c2430" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>' +
      "</svg>";
  }

  function mountFace(parent, mood) {
    const wrap = Lab.el("div", "face-wrap");
    wrap.innerHTML = faceSVG(mood);
    parent.appendChild(wrap);
  }

  function questions(level) {
    if (level === "easy") {
      return Edu.shuffle(EASY).map(function (item) {
        return {
          mood: item.mood,
          ask: "How does this person feel?",
          answer: item.answer,
          fact: item.fact,
          choices: Lab.options(item.answer, FEELINGS)
        };
      });
    }
    if (level === "medium") {
      return Edu.shuffle(MEDIUM).slice(0, 8).map(function (item) {
        return {
          mood: item.mood,
          ask: item.ask,
          answer: item.answer,
          fact: item.fact,
          choices: Lab.options(item.answer, FEELINGS)
        };
      });
    }
    return Edu.shuffle(HARD).map(function (item) {
      return {
        ask: item.ask,
        answer: item.answer,
        fact: item.fact,
        choices: Lab.options(item.answer, item.alts.concat([item.answer]))
      };
    });
  }

  function draw(stage, item) {
    if (item.mood) mountFace(stage, item.mood);
  }

  function start(level, api) {
    if (session) session.stop();
    const round = questions(level);
    session = Lab.round(api, {
      help: HELP[level],
      note: "You finished " + round.length + " feelings questions.",
      questions: round,
      draw: draw,
      again: function () { start(api.level, api); }
    });
  }

  Edu.bind("feelings", start);
})();
