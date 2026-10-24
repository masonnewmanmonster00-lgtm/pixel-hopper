(function () {
  "use strict";

  const HELP = {
    easy: "Canada has three levels of government: federal, provincial or territorial, and municipal. Match the job to the level.",
    medium: "Leaders, hospitals, and who gives cities their power. Territories have their own governments too.",
    hard: "Voting, the Charter of Rights and Freedoms, and governments that share the work."
  };

  const LEVELS = ["Federal", "Provincial or territorial", "Municipal"];

  function frame(sky, ground, inner) {
    return '<svg viewBox="0 0 220 150" role="img" aria-label="Lesson picture">' +
      '<rect width="220" height="150" fill="' + sky + '"/>' +
      '<rect y="108" width="220" height="42" fill="' + ground + '"/>' +
      inner + "</svg>";
  }

  const ART = {
    parliament: frame("#cfe8ff", "#8fbf7a",
      '<rect x="38" y="78" width="144" height="36" fill="#d8c7a2" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="96" y="40" width="28" height="50" fill="#c4472f" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M96 40 l14-16 14 16" fill="#8d4b3a" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="52" y="62" width="18" height="28" fill="#d8c7a2" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="150" y="62" width="18" height="28" fill="#d8c7a2" stroke="#1c2430" stroke-width="2"/>' +
      '<circle cx="186" cy="36" r="10" fill="#fff" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M186 28 v16 M180 36 h12" stroke="#c4472f" stroke-width="2"/>'),
    school: frame("#d5e6c8", "#c9b48a",
      '<rect x="48" y="58" width="124" height="56" fill="#f4efe4" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M40 58 L110 28 L180 58" fill="#c4472f" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="98" y="78" width="24" height="36" fill="#8d4b3a" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="62" y="74" width="20" height="16" fill="#9fd0ef" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="138" y="74" width="20" height="16" fill="#9fd0ef" stroke="#1c2430" stroke-width="2"/>'),
    city: frame("#d7e6f6", "#b7c4a4",
      '<rect x="70" y="48" width="80" height="66" fill="#f7f3ea" stroke="#1c2430" stroke-width="2"/>' +
      '<circle cx="110" cy="70" r="12" fill="#fff" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M110 70 v-6 M110 70 h5" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="28" y="86" width="36" height="22" fill="#2f6fed" stroke="#1c2430" stroke-width="2"/>' +
      '<circle cx="38" cy="110" r="6" fill="#1c2430"/><circle cx="54" cy="110" r="6" fill="#1c2430"/>' +
      '<rect x="164" y="78" width="28" height="30" fill="#2f9e44" stroke="#1c2430" stroke-width="2"/>'),
    ballot: frame("#efe6d2", "#d9d3c7",
      '<rect x="78" y="48" width="64" height="70" rx="6" fill="#f7f4ee" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M86 70 h28 M86 84 h36 M86 98 h22" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="96" y="36" width="28" height="16" fill="#ffd36e" stroke="#1c2430" stroke-width="2"/>'),
    scroll: frame("#f3e6c8", "#e4d2b0",
      '<rect x="48" y="40" width="124" height="78" rx="8" fill="#fff8e8" stroke="#1c2430" stroke-width="2"/>' +
      '<circle cx="48" cy="79" r="10" fill="#e2c48a" stroke="#1c2430" stroke-width="2"/>' +
      '<circle cx="172" cy="79" r="10" fill="#e2c48a" stroke="#1c2430" stroke-width="2"/>' +
      '<path d="M70 62 h80 M70 78 h70 M70 94 h60" stroke="#1c2430" stroke-width="2"/>'),
    hospital: frame("#e7f2ea", "#c5d6b0",
      '<rect x="54" y="46" width="112" height="68" fill="#f7f4ee" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="96" y="62" width="28" height="10" fill="#c4472f"/>' +
      '<rect x="105" y="53" width="10" height="28" fill="#c4472f"/>' +
      '<rect x="70" y="88" width="22" height="26" fill="#9fd0ef" stroke="#1c2430" stroke-width="2"/>' +
      '<rect x="128" y="88" width="22" height="26" fill="#9fd0ef" stroke="#1c2430" stroke-width="2"/>')
  };

  const EASY = [
    { art: "parliament", ask: "Who is in charge of the Canadian Armed Forces and the navy?", answer: "Federal", fact: "National defence is a federal job. Provinces and cities do not have their own armies." },
    { art: "school", ask: "Who sets the rules for public schools and what students learn?", answer: "Provincial or territorial", fact: "Education belongs to the provinces and territories. A local school board helps run the schools." },
    { art: "city", ask: "Who usually sends the trucks that pick up garbage and recycling?", answer: "Municipal", fact: "Cities, towns, and other municipalities usually collect garbage and recycling." },
    { art: "parliament", ask: "Who prints Canada's money and runs the postal service?", answer: "Federal", fact: "Currency and Canada Post are federal responsibilities." },
    { art: "school", ask: "Who issues driver's licences and looks after big provincial highways?", answer: "Provincial or territorial", fact: "Driver's licences and most major highways are provincial or territorial." },
    { art: "city", ask: "Who looks after the neighbourhood library, the local park, and the town pool?", answer: "Municipal", fact: "Libraries, local parks, and recreation programs are usually municipal." },
    { art: "scroll", ask: "Who makes Canada's criminal laws, such as the Criminal Code?", answer: "Federal", fact: "Parliament makes criminal law. Provinces run many of the courts that hear those cases." },
    { art: "city", ask: "Who clears snow from city streets and fixes local water pipes?", answer: "Municipal", fact: "Snow clearing, local roads, and water pipes are typical municipal jobs." }
  ];

  const MEDIUM = [
    { art: "parliament", ask: "Canadians do not vote for this leader on the federal ballot. Who is it?", answer: "The Prime Minister", choices: ["The Prime Minister", "Their local city councillor", "The mayor", "A store owner"], fact: "You vote for a Member of Parliament in your riding. The Prime Minister is usually the leader of the party with the most seats in the House of Commons." },
    { art: "school", ask: "What is the title of the leader of a provincial government?", answer: "Premier", choices: ["Premier", "Prime Minister", "Mayor", "Principal"], fact: "A premier leads a province. The prime minister leads the federal government, and a mayor leads a municipality." },
    { art: "city", ask: "In many cities, voters choose this person directly. Who is it?", answer: "The mayor", choices: ["The mayor", "The Prime Minister", "The Governor General", "A senator"], fact: "Municipal ballots often include the mayor and councillors. Federal voters choose a local MP, not the Prime Minister." },
    { art: "parliament", ask: "Who represents the King in the federal government?", answer: "The Governor General", choices: ["The Governor General", "The mayor", "A school trustee", "The premier"], fact: "The Governor General represents the King of Canada for federal duties, including signing bills into law and appointing the Prime Minister." },
    { art: "hospital", ask: "Who mainly runs hospitals and public health insurance?", answer: "Provinces and territories", choices: ["Provinces and territories", "City councils alone", "Canada Post", "Local libraries"], fact: "Provinces and territories deliver health care. The federal Canada Health Act sets conditions for that public insurance and helps pay for it." },
    { art: "city", ask: "Where do municipal governments get their powers?", answer: "From the province or territory", choices: ["From the province or territory", "From a vote of shopkeepers", "From the United Nations", "From the school yearbook"], fact: "Cities and towns are created by provincial or territorial law. They can only do what that law allows." },
    { art: "scroll", ask: "Passports and citizenship decisions belong to which level?", answer: "Federal", choices: ["Federal", "Municipal", "A school board", "The town library"], fact: "Citizenship, passports, and immigration are federal." },
    { art: "parliament", ask: "A Member of Parliament, or MP, is elected to which body?", answer: "The House of Commons", choices: ["The House of Commons", "A city council", "A school board", "The Supreme Court"], fact: "MPs sit in the House of Commons in Ottawa. Senators are appointed, not elected." }
  ];

  const HARD = [
    { art: "ballot", ask: "What do you need in order to vote in a Canadian federal election?", answer: "Be a citizen and at least 18", choices: ["Be a citizen and at least 18", "Own a house", "Be 16 and visiting Canada", "Pay a fee at the polling station"], fact: "Federal voters must be Canadian citizens and at least 18 on election day. You do not need to own property, and you do not pay to vote." },
    { art: "ballot", ask: "How does a federal ballot stay private?", answer: "You mark it in secret", choices: ["You mark it in secret", "You announce your choice out loud", "The mayor reads it aloud", "Your teacher signs it"], fact: "Canada uses a secret ballot. Nobody is allowed to watch how you mark it, and you do not put your name on it." },
    { art: "scroll", ask: "The Charter of Rights and Freedoms is part of which document?", answer: "Canada's constitution", choices: ["Canada's constitution", "A city parking bylaw", "A school handbook", "A store receipt"], fact: "The Charter became part of the Constitution Act, 1982. It protects rights such as expression, religion, voting, equality, and fair legal treatment." },
    { art: "scroll", ask: "Which of these is a Charter freedom?", answer: "Peaceful assembly", choices: ["Peaceful assembly", "Hurting someone you disagree with", "Skipping every law you dislike", "Taking another person's vote"], fact: "You may gather peacefully. Hurting people or stopping them from voting is not a right." },
    { art: "ballot", ask: "Which of these is a responsibility of adult citizens, not a law that children must follow today?", answer: "Serve on a jury if asked", choices: ["Serve on a jury if asked", "Ignore all traffic lights", "Vote twice", "Hide your taxes"], fact: "Adults can be asked to serve on a jury. Voting is a right and a responsibility. Canada does not force people to vote." },
    { art: "parliament", ask: "Which statement about Indigenous governments is accurate?", answer: "First Nations, Inuit, and Métis governments are part of how Canada is governed", choices: ["First Nations, Inuit, and Métis governments are part of how Canada is governed", "They are the same thing as a city council", "They were created by a town bylaw", "Canada has no Indigenous governments"], fact: "First Nations, Inuit, and Métis peoples have their own governments and rights, including treaty rights. Those governments are not city councils." },
    { art: "hospital", ask: "Who does which health job?", answer: "Provinces run care, and Ottawa helps set national rules", choices: ["Provinces run care, and Ottawa helps set national rules", "Only the mayor runs every hospital", "Only the army runs public insurance", "Schools set the Canada Health Act"], fact: "Your hospital is part of a provincial or territorial system. Parliament passed the Canada Health Act, which sets principles for public insurance." },
    { art: "ballot", ask: "Municipal election rules are best described how?", answer: "The province or territory sets them, and they are not all identical", choices: ["The province or territory sets them, and they are not all identical", "The United Nations runs every city election", "Every city uses the federal ballot", "Only senators vote for mayor"], fact: "Provinces and territories make the municipal election rules. Many places require voters to be 18. Some also let non-resident property owners vote. Check your own municipality." }
  ];

  let session = null;

  function fromBank(bank) {
    return bank.map(function (item) {
      const choices = item.choices || LEVELS;
      return {
        art: item.art,
        ask: item.ask,
        answer: item.answer,
        fact: item.fact,
        choices: Edu.shuffle(choices).map(function (label) {
          return { label: label, value: label };
        })
      };
    });
  }

  function questions(level) {
    if (level === "easy") return Edu.shuffle(fromBank(EASY));
    if (level === "medium") return Edu.shuffle(fromBank(MEDIUM));
    return Edu.shuffle(fromBank(HARD));
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
      note: "You finished " + round.length + " civics questions.",
      questions: round,
      draw: draw,
      again: function () { start(api.level, api); }
    });
  }

  Edu.bind("citizen", start);
})();
