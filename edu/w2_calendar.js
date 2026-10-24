(function () {
  "use strict";

  const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const HELP = {
    easy: "A week has seven days and a year has twelve months. In Canada and the United States, spring is followed by summer.",
    medium: "Read the month. This calendar starts on Sunday. Some calendars start on Monday.",
    hard: "Leap years, days from one date to another, and the season that comes next."
  };

  function frame(inner) {
    return '<svg viewBox="0 0 220 150" role="img" aria-label="Lesson picture">' +
      '<rect width="220" height="150" fill="#d7ecff"/>' +
      '<rect y="118" width="220" height="32" fill="#c9d7b0"/>' +
      inner + "</svg>";
  }

  const ICON = frame(
    '<rect x="62" y="28" width="96" height="92" rx="8" fill="#fffdf8" stroke="#1c2430" stroke-width="2"/>' +
    '<rect x="62" y="28" width="96" height="22" fill="#c4472f"/>' +
    '<rect x="80" y="20" width="8" height="16" rx="2" fill="#1c2430"/>' +
    '<rect x="132" y="20" width="8" height="16" rx="2" fill="#1c2430"/>' +
    '<circle cx="86" cy="68" r="5" fill="#1c2430"/>' +
    '<circle cx="110" cy="68" r="5" fill="#1c2430"/>' +
    '<circle cx="134" cy="68" r="5" fill="#1c2430"/>' +
    '<circle cx="86" cy="90" r="5" fill="#ffd36e" stroke="#1c2430" stroke-width="2"/>' +
    '<circle cx="110" cy="90" r="5" fill="#1c2430"/>' +
    '<circle cx="134" cy="90" r="5" fill="#1c2430"/>'
  );

  function daysInMonth(year, monthIndex) {
    return new Date(year, monthIndex + 1, 0).getDate();
  }

  function weekdayName(year, monthIndex, day) {
    return DAYS[new Date(year, monthIndex, day).getDay()];
  }

  function mountCalendar(stage, spec) {
    const first = new Date(spec.year, spec.month, 1).getDay();
    const total = daysInMonth(spec.year, spec.month);
    const wrap = Lab.el("div", "cal");
    wrap.appendChild(Lab.el("p", "cal-name", MONTHS[spec.month] + " " + spec.year));
    const grid = Lab.el("div", "cal-grid");
    SHORT.forEach(function (name) {
      grid.appendChild(Lab.el("div", "cal-dow", name));
    });
    let cell = 0;
    for (let i = 0; i < first; i += 1) {
      grid.appendChild(Lab.el("div", "cal-day cal-empty"));
      cell += 1;
    }
    for (let day = 1; day <= total; day += 1) {
      const marked = spec.mark === day;
      grid.appendChild(Lab.el("div", marked ? "cal-day on" : "cal-day", String(day)));
      cell += 1;
    }
    while (cell % 7 !== 0) {
      grid.appendChild(Lab.el("div", "cal-day cal-empty"));
      cell += 1;
    }
    wrap.appendChild(grid);
    wrap.appendChild(Lab.el("p", "cal-note", "This calendar starts on Sunday. Some calendars start on Monday."));
    stage.appendChild(wrap);
  }

  const EASY = [
    {
      ask: "How many days are in one week?",
      answer: "7",
      choices: ["7", "5", "10", "12"],
      fact: "Sunday through Saturday is seven days. Then the next week starts again."
    },
    {
      ask: "Which day comes right after Wednesday?",
      answer: "Thursday",
      choices: ["Thursday", "Tuesday", "Friday", "Monday"],
      fact: "The days run Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, and then back to Sunday."
    },
    {
      ask: "Which month comes right after July?",
      answer: "August",
      choices: ["August", "June", "September", "May"],
      fact: "July is the seventh month. August is the eighth. The year ends with December."
    },
    {
      ask: "What is the first month of the year?",
      answer: "January",
      choices: ["January", "March", "December", "April"],
      fact: "The year starts in January and ends in December. There are twelve months."
    },
    {
      ask: "In Canada and the United States, which season comes after spring?",
      answer: "Summer",
      choices: ["Summer", "Winter", "Fall", "A second spring"],
      fact: "In Canada and the United States the order is spring, summer, fall, winter. Weather scientists count spring as March, April, and May, and summer as June, July, and August. Astronomical spring starts near March 20, and astronomical summer starts at the June solstice, around June 21. In Australia, December is a summer month."
    },
    {
      ask: "How many months are in one year?",
      answer: "12",
      choices: ["12", "7", "10", "24"],
      fact: "January through December is twelve months."
    },
    {
      ask: "How many days does February usually have?",
      answer: "28",
      choices: ["28", "30", "31", "27"],
      fact: "February has 28 days in a common year. A leap year gives February 29 days."
    },
    {
      ask: "Which day comes right before Sunday?",
      answer: "Saturday",
      choices: ["Saturday", "Monday", "Friday", "Thursday"],
      fact: "Saturday comes before Sunday. On a Sunday-start calendar, Saturday is the last day of the week."
    }
  ];

  function mediumBank() {
    const specs = [
      { year: 2026, month: 2, day: 18 },
      { year: 2026, month: 9, day: 15 },
      { year: 2024, month: 1, length: true },
      { year: 2026, month: 6, day: 4 },
      { year: 2027, month: 0, day: 1 },
      { year: 2026, month: 3, length: true },
      { year: 2025, month: 1, length: true },
      { year: 2026, month: 11, day: 25 }
    ];
    return specs.map(function (spec) {
      const title = MONTHS[spec.month] + " " + spec.year;
      if (spec.length) {
        const total = String(daysInMonth(spec.year, spec.month));
        let fact = title + " has " + total + " days. ";
        if (spec.month === 1) {
          fact += total === "29"
            ? "It is a leap year, so February has 29 days."
            : "It is not a leap year, so February has 28 days.";
        } else if (total === "30") {
          fact += "April, June, September, and November have 30 days. The other months have 31, except February.";
        } else {
          fact += "January, March, May, July, August, October, and December have 31 days.";
        }
        return {
          cal: { year: spec.year, month: spec.month },
          ask: "How many days are in " + title + "?",
          answer: total,
          choices: ["28", "29", "30", "31"],
          fact: fact
        };
      }
      const name = weekdayName(spec.year, spec.month, spec.day);
      const when = MONTHS[spec.month] + " " + spec.day + ", " + spec.year;
      return {
        cal: { year: spec.year, month: spec.month, mark: spec.day },
        ask: when + " falls on which weekday?",
        answer: name,
        choices: DAYS.slice(),
        fact: when + " is a " + name + ". Find that date on the Sunday-start calendar. Some calendars start on Monday instead."
      };
    });
  }

  const HARD = [
    {
      ask: "Is 2024 a leap year?",
      answer: "Yes",
      choices: ["Yes", "No"],
      fact: "2024 can be divided by 4, and it is not a century year, so it is a leap year. February 2024 has 29 days."
    },
    {
      ask: "Is 1900 a leap year?",
      answer: "No",
      choices: ["Yes", "No"],
      fact: "1900 can be divided by 100, but not by 400. A century year is a leap year only when it can also be divided by 400. February 1900 had 28 days."
    },
    {
      ask: "Is 2000 a leap year?",
      answer: "Yes",
      choices: ["Yes", "No"],
      fact: "2000 can be divided by 400, so it is a leap year even though it is a century year. February 2000 had 29 days."
    },
    {
      ask: "Is 2026 a leap year?",
      answer: "No",
      choices: ["Yes", "No"],
      fact: "2026 cannot be divided by 4, so it is a common year. February 2026 has 28 days."
    },
    {
      ask: "March 10 is how many days later than March 3?",
      answer: "7",
      choices: ["7", "8", "6", "10"],
      fact: "Subtract the dates: 10 − 3 = 7. March 10 is 7 days later than March 3. Counting both dates would give 8, and that is a different question."
    },
    {
      ask: "In a leap year, which month gets the extra day?",
      answer: "February",
      choices: ["February", "January", "April", "December"],
      fact: "The extra day is February 29. The other months keep their usual lengths."
    },
    {
      ask: "Which rule decides a leap year?",
      answer: "Divisible by 4, except century years unless also divisible by 400",
      choices: [
        "Divisible by 4, except century years unless also divisible by 400",
        "Every year that ends in 0",
        "Every odd-numbered year",
        "Only years that start on a Monday"
      ],
      fact: "A year is a leap year when it can be divided by 4. Years that can be divided by 100 are not, unless they can also be divided by 400. The year 2000 was a leap year. 1900 was not, and 2100 will not be."
    },
    {
      ask: "In Canada and the United States, which season comes after fall?",
      answer: "Winter",
      choices: ["Winter", "Spring", "Summer", "A second fall"],
      fact: "After fall comes winter. Weather scientists count winter as December, January, and February. Astronomical winter starts near the December solstice, around December 21. South of the equator, December is a summer month."
    }
  ];

  let session = null;

  function pack(item) {
    const pool = item.choices.indexOf(item.answer) === -1
      ? item.choices.concat([item.answer])
      : item.choices.slice();
    const picked = pool.length > 4
      ? Lab.options(item.answer, pool).map(function (choice) { return choice.label; })
      : pool;
    return {
      cal: item.cal || null,
      ask: item.ask,
      answer: item.answer,
      fact: item.fact,
      choices: Edu.shuffle(picked).map(function (label) {
        return { label: label, value: label };
      })
    };
  }

  function questions(level) {
    const bank = level === "easy" ? EASY : level === "medium" ? mediumBank() : HARD;
    return Edu.shuffle(bank.map(pack));
  }

  function draw(stage, item) {
    if (item.cal) {
      mountCalendar(stage, item.cal);
      return;
    }
    const wrap = Lab.el("div", "scene");
    wrap.innerHTML = ICON;
    stage.appendChild(wrap);
  }

  function start(level, api) {
    if (session) session.stop();
    const round = questions(level);
    session = Lab.round(api, {
      help: HELP[level],
      note: "You finished " + round.length + " calendar questions.",
      questions: round,
      draw: draw,
      again: function () { start(api.level, api); }
    });
  }

  Edu.bind("calendar", start);
})();
