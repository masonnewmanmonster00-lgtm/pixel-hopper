(function () {
  "use strict";

  const SKIN = 'fill="#f6d2b5" stroke="#1c2430" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"';

  function svg(inner, extra) {
    return '<svg class="asl-hand" viewBox="0 0 160 210" role="img" aria-label="Hand shape">' +
      inner + (extra || "") + "</svg>";
  }

  function rect(x, y, w, h, rad) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + rad + '" ' + SKIN + '/>';
  }

  function nail(x, y) {
    return '<ellipse cx="' + x + '" cy="' + y + '" rx="3.2" ry="4.2" fill="#fbe8d6" stroke="none"/>';
  }

  function palm() {
    return rect(44, 100, 74, 70, 24) + rect(62, 162, 36, 32, 12);
  }

  function up(x, y, h) {
    y = y == null ? 24 : y;
    h = h == null ? 84 : h;
    return rect(x, y, 16, h, 8) + nail(x + 8, y + 10);
  }

  function bump(x, y, h) {
    return rect(x, y == null ? 84 : y, 16, h == null ? 28 : h, 8);
  }

  function together(x, y, w, h) {
    return rect(x, y, w, h, 12) +
      [0.12, 0.37, 0.62, 0.87].map(function (t) {
        return nail(x + w * t, y + 10);
      }).join("");
  }

  function arrow(d, head) {
    return '<path d="' + d + '" fill="none" stroke="#2f6fed" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="' + head + '" fill="#2f6fed" stroke="none"/>';
  }

  const LETTERS = {
    A: function () {
      return svg(palm() + bump(50) + bump(68) + bump(86) + bump(104) + rect(20, 108, 26, 50, 12) + nail(33, 118));
    },
    B: function () {
      return svg(together(48, 22, 66, 86) + palm() + rect(52, 128, 52, 16, 8));
    },
    C: function () {
      return svg(
        '<path ' + SKIN + ' fill-rule="evenodd" d="M126 44c-14-22-62-26-86 4-24 30-18 78 16 100 28 18 62 10 80-16l-22-10c-10 16-34 20-52 6-20-16-22-50-8-72 16-24 48-22 62 0z"/>' +
        rect(68, 164, 32, 28, 12)
      );
    },
    D: function () {
      return svg(up(56, 18, 78) + palm() + '<circle cx="96" cy="124" r="22" ' + SKIN + '/><circle cx="96" cy="124" r="8" fill="#efe6d2" stroke="#1c2430" stroke-width="2.5"/>');
    },
    E: function () {
      return svg(palm() + bump(50, 72, 34) + bump(68, 72, 34) + bump(86, 72, 34) + bump(104, 72, 34) + rect(50, 100, 62, 16, 8));
    },
    F: function () {
      return svg(
        up(74, 22) + up(92, 22) + up(110, 22) + palm() +
        '<circle cx="50" cy="118" r="18" ' + SKIN + '/><circle cx="50" cy="118" r="7" fill="#efe6d2" stroke="#1c2430" stroke-width="2.5"/>'
      );
    },
    G: function () {
      return svg(
        rect(78, 70, 52, 78, 22) + rect(66, 168, 30, 26, 10) +
        rect(12, 78, 78, 16, 8) + nail(24, 86) +
        rect(18, 102, 64, 15, 7) +
        bump(96, 64, 18) + bump(114, 64, 18)
      );
    },
    H: function () {
      return svg(
        rect(84, 68, 48, 82, 20) + rect(70, 168, 30, 26, 10) +
        rect(10, 74, 86, 15, 7) + nail(22, 81.5) +
        rect(10, 94, 86, 15, 7) + nail(22, 101.5) +
        rect(92, 118, 28, 14, 7)
      );
    },
    I: function () {
      return svg(up(104, 22) + palm() + bump(50) + bump(68) + bump(86) + rect(48, 122, 46, 15, 7));
    },
    J: function () {
      return svg(
        up(104, 22) + palm() + bump(50) + bump(68) + bump(86) + rect(48, 122, 46, 15, 7),
        arrow("M128 36c26 10 28 48 6 70", "M128 104l14 2-8 12z")
      );
    },
    K: function () {
      return svg(
        up(46, 20, 86) +
        '<rect x="72" y="28" width="16" height="80" rx="8" transform="rotate(26 80 100)" ' + SKIN + '/>' +
        nail(86, 40) +
        rect(58, 86, 18, 44, 8) +
        palm() + bump(108, 88, 22)
      );
    },
    L: function () {
      return svg(up(62, 18, 80) + palm() + rect(8, 118, 52, 16, 8) + nail(20, 126) + bump(84) + bump(102));
    },
    M: function () {
      return svg(palm() + bump(46, 76, 40) + bump(64, 76, 40) + bump(82, 76, 40) + bump(104, 96, 18) + '<ellipse cx="70" cy="122" rx="10" ry="12" ' + SKIN + '/>');
    },
    N: function () {
      return svg(palm() + bump(50, 76, 40) + bump(70, 76, 40) + bump(92, 96, 18) + bump(110, 96, 18) + '<ellipse cx="78" cy="124" rx="9" ry="11" ' + SKIN + '/>');
    },
    O: function () {
      return svg(
        '<ellipse cx="82" cy="112" rx="40" ry="46" ' + SKIN + '/>' +
        '<ellipse cx="82" cy="108" rx="16" ry="20" fill="#efe6d2" stroke="#1c2430" stroke-width="2.5"/>' +
        rect(66, 160, 32, 30, 12)
      );
    },
    P: function () {
      return svg(
        rect(58, 16, 40, 28, 12) +
        rect(48, 36, 64, 58, 20) +
        up(56, 86, 86) +
        '<rect x="78" y="90" width="16" height="78" rx="8" transform="rotate(-24 86 150)" ' + SKIN + '/>' +
        nail(70, 168) +
        rect(66, 78, 18, 36, 8)
      );
    },
    Q: function () {
      return svg(
        rect(58, 18, 48, 56, 18) +
        rect(70, 66, 16, 96, 8) + nail(78, 152) +
        rect(92, 70, 15, 72, 7) +
        bump(48, 28, 18) +
        rect(64, 168, 28, 8, 4)
      );
    },
    R: function () {
      return svg(
        '<rect x="52" y="24" width="16" height="82" rx="8" transform="rotate(18 60 90)" ' + SKIN + '/>' +
        '<rect x="70" y="24" width="16" height="82" rx="8" transform="rotate(-22 78 70)" ' + SKIN + '/>' +
        nail(58, 36) + nail(92, 34) +
        palm() + bump(108, 90, 20)
      );
    },
    S: function () {
      return svg(palm() + bump(50, 88, 26) + bump(68, 88, 26) + bump(86, 88, 26) + bump(104, 88, 26) + rect(46, 96, 68, 16, 8));
    },
    T: function () {
      return svg(palm() + bump(50, 90, 24) + bump(68, 90, 24) + bump(86, 90, 24) + bump(104, 90, 24) + '<ellipse cx="66" cy="92" rx="9" ry="13" ' + SKIN + '/>' + nail(66, 84));
    },
    U: function () {
      return svg(up(58, 22) + up(74, 22) + palm() + bump(98) + bump(114, 92, 20) + rect(56, 124, 36, 14, 7));
    },
    V: function () {
      return svg(up(40, 24) + up(78, 24) + palm() + bump(102) + bump(118, 96, 16));
    },
    W: function () {
      return svg(up(32, 26) + up(56, 26) + up(80, 26) + palm() + bump(108, 90, 22));
    },
    X: function () {
      return svg(
        '<path ' + SKIN + ' d="M62 108c0-22 2-34 16-46 10-8 22 2 16 16-4 10-8 16-10 36z"/>' +
        nail(80, 66) +
        palm() + bump(86) + bump(102) + bump(118, 96, 16)
      );
    },
    Y: function () {
      return svg(up(104, 22) + palm() + rect(8, 118, 50, 16, 8) + nail(20, 126) + bump(54) + bump(72) + bump(90));
    },
    Z: function () {
      return svg(
        up(58, 22) + palm() + bump(84) + bump(102) + bump(118, 96, 16),
        arrow("M108 28h30L112 50h32", "M140 42l12 8-14 2z")
      );
    }
  };

  const FACTS = {
    A: "A is a fist with the thumb standing beside the index finger.",
    B: "B is a flat hand. Four fingers point up together, and the thumb crosses the palm.",
    C: "C is a curved hand, like the letter C.",
    D: "D points the index finger up. The thumb and other fingers touch in a circle.",
    E: "E curls the fingers down so the fingertips rest on the thumb.",
    F: "F touches the index finger to the thumb. The other three fingers stay up.",
    G: "G points the index finger and thumb sideways, parallel, like a tiny shelf.",
    H: "H points the index and middle fingers sideways, held together.",
    I: "I raises only the pinky. The other fingers make a fist.",
    J: "J starts like I, then the pinky draws a J. The blue arrow shows that path.",
    K: "K raises the index and middle fingers, with the thumb between them.",
    L: "L makes an L: index finger up, thumb out to the side.",
    M: "M tucks the thumb under the index, middle, and ring fingers.",
    N: "N tucks the thumb under the index and middle fingers only.",
    O: "O touches all the fingertips to the thumb, making a circle.",
    P: "P is the K shape aimed downward.",
    Q: "Q is the G shape aimed downward.",
    R: "R crosses the index and middle fingers.",
    S: "S is a fist with the thumb across the front of the fingers.",
    T: "T is a fist with the thumb tucked between the index and middle fingers.",
    U: "U holds the index and middle fingers together and up.",
    V: "V spreads the index and middle fingers, like a peace sign.",
    W: "W spreads the index, middle, and ring fingers.",
    X: "X bends the index finger into a hook. The others stay folded.",
    Y: "Y sticks out the thumb and the pinky. The middle three fingers fold.",
    Z: "Z points with the index finger and draws a Z. The blue arrow shows that path."
  };

  window.W2Hands = {
    svg: function (letter) { return LETTERS[letter](); },
    fact: function (letter) { return FACTS[letter]; },
    letters: Object.keys(LETTERS)
  };
})();
