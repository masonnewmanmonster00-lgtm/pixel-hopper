(function () {
  "use strict";

  function star(cx, cy, r, fill, rot) {
    const pts = [];
    const turn = rot || 0;
    for (let i = 0; i < 10; i++) {
      const rad = i % 2 === 0 ? r : r * 0.4;
      const a = -Math.PI / 2 + turn + (i * Math.PI) / 5;
      pts.push((cx + rad * Math.cos(a)).toFixed(2) + "," + (cy + rad * Math.sin(a)).toFixed(2));
    }
    return '<polygon points="' + pts.join(" ") + '" fill="' + fill + '"/>';
  }

  function starN(cx, cy, r, n, fill) {
    const pts = [];
    for (let i = 0; i < n * 2; i++) {
      const rad = i % 2 === 0 ? r : r * 0.42;
      const a = -Math.PI / 2 + (i * Math.PI) / n;
      pts.push((cx + rad * Math.cos(a)).toFixed(2) + "," + (cy + rad * Math.sin(a)).toFixed(2));
    }
    return '<polygon points="' + pts.join(" ") + '" fill="' + fill + '"/>';
  }

  function svg(inner, w, h) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + " " + h + '">' + inner + "</svg>";
  }

  function stripesH(colors, w, h) {
    const band = h / colors.length;
    return colors.map(function (color, i) {
      return '<rect x="0" y="' + (i * band) + '" width="' + w + '" height="' + (band + 0.25) + '" fill="' + color + '"/>';
    }).join("");
  }

  function stripesV(colors, w, h) {
    const band = w / colors.length;
    return colors.map(function (color, i) {
      return '<rect x="' + (i * band) + '" y="0" width="' + (band + 0.25) + '" height="' + h + '" fill="' + color + '"/>';
    }).join("");
  }

  function unionJack(clipId) {
    return (
      '<clipPath id="' + clipId + '"><rect width="60" height="30"/></clipPath>' +
      '<clipPath id="' + clipId + 'd"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/></clipPath>' +
      '<g clip-path="url(#' + clipId + ')">' +
      '<path d="M0,0 v30 h60 v-30 z" fill="#012169"/>' +
      '<path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/>' +
      '<path d="M0,0 L60,30 M60,0 L0,30" clip-path="url(#' + clipId + 'd)" stroke="#C8102E" stroke-width="4"/>' +
      '<path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/>' +
      '<path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"/>' +
      "</g>"
    );
  }

  function nordic(bg, cross, inner) {
    let body = '<rect width="60" height="40" fill="' + bg + '"/>';
    body += '<rect x="16" width="10" height="40" fill="' + cross + '"/>';
    body += '<rect y="15" width="60" height="10" fill="' + cross + '"/>';
    if (inner) {
      body += '<rect x="18.5" width="5" height="40" fill="' + inner + '"/>';
      body += '<rect y="17.5" width="60" height="5" fill="' + inner + '"/>';
    }
    return svg(body, 60, 40);
  }

  const flags = [
    { id: "jp", name: "Japan", capital: "Tokyo", easy: true, svg: svg('<rect width="60" height="40" fill="#fff"/><circle cx="30" cy="20" r="8.6" fill="#bc002d"/>', 60, 40) },
    { id: "fr", name: "France", capital: "Paris", easy: true, svg: svg(stripesV(["#0055a4", "#fff", "#ef4135"], 60, 40), 60, 40) },
    { id: "de", name: "Germany", capital: "Berlin", easy: true, svg: svg(stripesH(["#000000", "#dd0000", "#ffce00"], 60, 40), 60, 40) },
    { id: "it", name: "Italy", capital: "Rome", easy: true, svg: svg(stripesV(["#009246", "#ffffff", "#ce2b37"], 60, 40), 60, 40) },
    { id: "es", name: "Spain", capital: "Madrid", easy: true, svg: svg('<rect width="60" height="40" fill="#c60b1e"/><rect y="10" width="60" height="20" fill="#ffc400"/>', 60, 40) },
    { id: "gb", name: "United Kingdom", capital: "London", easy: true, svg: svg(unionJack("gbclip"), 60, 30) },
    {
      id: "us",
      name: "United States",
      capital: "Washington, D.C.",
      easy: true,
      svg: (function () {
        const w = 60;
        const h = 40;
        const sh = h / 13;
        let body = "";
        for (let i = 0; i < 13; i++) {
          body += '<rect y="' + (i * sh) + '" width="' + w + '" height="' + (sh + 0.2) + '" fill="' + (i % 2 ? "#ffffff" : "#b22234") + '"/>';
        }
        const ch = sh * 7;
        const cw = w * 0.4;
        body += '<rect width="' + cw + '" height="' + ch + '" fill="#3c3b6e"/>';
        [6, 5, 6, 5, 6, 5, 6, 5, 6].forEach(function (count, r) {
          const y = (ch * (r + 1)) / 10;
          for (let c = 0; c < count; c++) {
            const x = (cw * (c + 1 + (count === 5 ? 0.5 : 0))) / 7;
            body += '<circle cx="' + x.toFixed(2) + '" cy="' + y.toFixed(2) + '" r="0.72" fill="#fff"/>';
          }
        });
        return svg(body, w, h);
      })()
    },
    {
      id: "ca",
      name: "Canada",
      capital: "Ottawa",
      easy: true,
      svg: svg(
        '<rect width="60" height="30" fill="#fff"/>' +
        '<rect width="15" height="30" fill="#ff0000"/>' +
        '<rect x="45" width="15" height="30" fill="#ff0000"/>' +
        '<path fill="#ff0000" d="M30,3.2 L32.4,9.2 L38.2,7.6 L35.6,12.8 L42,14.4 L36.2,18 L39,24.2 L32.8,21 L33.2,28.2 L30,22.6 L26.8,28.2 L27.2,21 L21,24.2 L23.8,18 L18,14.4 L24.4,12.8 L21.8,7.6 L27.6,9.2 Z"/>',
        60, 30)
    },
    {
      id: "br",
      name: "Brazil",
      capital: "Brasília",
      easy: true,
      svg: svg(
        '<rect width="60" height="42" fill="#009c3b"/>' +
        '<polygon points="30,3.2 55.5,21 30,38.8 4.5,21" fill="#ffdf00"/>' +
        '<circle cx="30" cy="21" r="8.4" fill="#002776"/>' +
        '<path d="M22.2,22.6 Q30,17.6 37.8,22.6" fill="none" stroke="#fff" stroke-width="1.15"/>',
        60, 42)
    },
    {
      id: "mx",
      name: "Mexico",
      capital: "Mexico City",
      easy: true,
      svg: svg(
        stripesV(["#006847", "#ffffff", "#ce1126"], 60, 40) +
        '<circle cx="30" cy="21" r="4.6" fill="#c68642"/>' +
        '<rect x="29.2" y="16.2" width="1.6" height="7" fill="#1f7a3a"/>' +
        '<circle cx="30" cy="15.4" r="1.7" fill="#1f7a3a"/>',
        60, 40)
    },
    {
      id: "cn",
      name: "China",
      capital: "Beijing",
      easy: true,
      svg: (function () {
        let body = '<rect width="60" height="40" fill="#de2910"/>' + star(11, 9, 4.4, "#ffde00", 0);
        [[20, 3.4], [24, 6.6], [24, 11.6], [20, 14.8]].forEach(function (point) {
          const ang = Math.atan2(9 - point[1], 11 - point[0]);
          body += star(point[0], point[1], 1.45, "#ffde00", ang + Math.PI / 2);
        });
        return svg(body, 60, 40);
      })()
    },
    {
      id: "in",
      name: "India",
      capital: "New Delhi",
      easy: true,
      svg: (function () {
        let body = '<rect width="60" height="13.4" fill="#ff9933"/>';
        body += '<rect y="13.3" width="60" height="13.5" fill="#fff"/>';
        body += '<rect y="26.6" width="60" height="13.4" fill="#138808"/>';
        body += '<circle cx="30" cy="20" r="5.2" fill="none" stroke="#000080" stroke-width="0.45"/>';
        for (let i = 0; i < 24; i++) {
          const a = (i * Math.PI) / 12;
          body += '<line x1="30" y1="20" x2="' + (30 + Math.cos(a) * 5).toFixed(2) + '" y2="' + (20 + Math.sin(a) * 5).toFixed(2) + '" stroke="#000080" stroke-width="0.28"/>';
        }
        body += '<circle cx="30" cy="20" r="0.65" fill="#000080"/>';
        return svg(body, 60, 40);
      })()
    },
    {
      id: "au",
      name: "Australia",
      capital: "Canberra",
      easy: true,
      svg: svg(
        '<rect width="120" height="60" fill="#012169"/>' +
        '<svg x="0" y="0" width="60" height="30" viewBox="0 0 60 30">' + unionJack("auclip") + "</svg>" +
        starN(30, 45, 6, 7, "#fff") +
        starN(84, 15, 3.3, 7, "#fff") +
        starN(96, 28, 3.5, 7, "#fff") +
        starN(96, 46, 3.2, 7, "#fff") +
        starN(108, 36, 2.3, 5, "#fff") +
        starN(78, 36, 2.5, 5, "#fff"),
        120, 60)
    },
    {
      id: "gr",
      name: "Greece",
      capital: "Athens",
      easy: false,
      svg: (function () {
        let body = "";
        for (let i = 0; i < 9; i++) {
          body += '<rect y="' + (i * 4) + '" width="54" height="4.2" fill="' + (i % 2 ? "#ffffff" : "#0d5eaf") + '"/>';
        }
        body += '<rect width="20" height="20" fill="#0d5eaf"/>';
        body += '<rect x="8" width="4" height="20" fill="#fff"/>';
        body += '<rect y="8" width="20" height="4" fill="#fff"/>';
        return svg(body, 54, 36);
      })()
    },
    { id: "se", name: "Sweden", capital: "Stockholm", easy: false, svg: nordic("#006aa7", "#fecc00") },
    { id: "no", name: "Norway", capital: "Oslo", easy: false, svg: nordic("#ba0c2f", "#ffffff", "#00205b") },
    {
      id: "ch",
      name: "Switzerland",
      capital: "Bern",
      easy: false,
      svg: svg('<rect width="32" height="32" fill="#ff0000"/><rect x="13" y="5" width="6" height="22" fill="#fff"/><rect x="5" y="13" width="22" height="6" fill="#fff"/>', 32, 32)
    },
    { id: "nl", name: "Netherlands", capital: "Amsterdam", easy: false, svg: svg(stripesH(["#ae1c28", "#ffffff", "#21468b"], 60, 40), 60, 40) },
    { id: "ie", name: "Ireland", capital: "Dublin", easy: false, svg: svg(stripesV(["#169b62", "#ffffff", "#ff883e"], 60, 40), 60, 40) },
    { id: "ng", name: "Nigeria", capital: "Abuja", easy: false, svg: svg(stripesV(["#008751", "#ffffff", "#008751"], 60, 40), 60, 40) },
    {
      id: "tr",
      name: "Turkey",
      capital: "Ankara",
      easy: false,
      svg: svg(
        '<rect width="60" height="40" fill="#e30a17"/>' +
        '<circle cx="23" cy="20" r="8" fill="#fff"/>' +
        '<circle cx="26" cy="20" r="6.3" fill="#e30a17"/>' +
        star(33.5, 20, 4, "#fff", 0.25),
        60, 40)
    },
    {
      id: "kr",
      name: "South Korea",
      capital: "Seoul",
      easy: false,
      svg: svg(
        '<rect width="72" height="48" fill="#fff"/>' +
        '<g transform="translate(36 24)">' +
        '<circle r="10" fill="#cd2e3a"/>' +
        '<path fill="#0047a0" d="M0,-10 A10,10 0 0,0 0,10 A5,5 0 0,0 0,0 A5,5 0 0,1 0,-10"/>' +
        "</g>" +
        '<g fill="#000">' +
        '<rect x="12" y="8" width="12" height="1.5" transform="rotate(40 18 10)"/>' +
        '<rect x="12" y="11" width="12" height="1.5" transform="rotate(40 18 13)"/>' +
        '<rect x="12" y="14" width="5" height="1.5" transform="rotate(40 18 16)"/>' +
        '<rect x="19" y="14" width="5" height="1.5" transform="rotate(40 18 16)"/>' +
        '<rect x="48" y="8" width="12" height="1.5" transform="rotate(-40 54 10)"/>' +
        '<rect x="48" y="11" width="5" height="1.5" transform="rotate(-40 54 13)"/>' +
        '<rect x="55" y="11" width="5" height="1.5" transform="rotate(-40 54 13)"/>' +
        '<rect x="48" y="14" width="12" height="1.5" transform="rotate(-40 54 16)"/>' +
        '<rect x="12" y="32" width="5" height="1.5" transform="rotate(-40 18 34)"/>' +
        '<rect x="19" y="32" width="5" height="1.5" transform="rotate(-40 18 34)"/>' +
        '<rect x="12" y="35" width="12" height="1.5" transform="rotate(-40 18 37)"/>' +
        '<rect x="12" y="38" width="5" height="1.5" transform="rotate(-40 18 40)"/>' +
        '<rect x="19" y="38" width="5" height="1.5" transform="rotate(-40 18 40)"/>' +
        '<rect x="48" y="32" width="12" height="1.5" transform="rotate(40 54 34)"/>' +
        '<rect x="48" y="35" width="5" height="1.5" transform="rotate(40 54 37)"/>' +
        '<rect x="55" y="35" width="5" height="1.5" transform="rotate(40 54 37)"/>' +
        '<rect x="48" y="38" width="12" height="1.5" transform="rotate(40 54 40)"/>' +
        "</g>",
        72, 48)
    },
    {
      id: "vn",
      name: "Vietnam",
      capital: "Hanoi",
      easy: false,
      svg: svg('<rect width="60" height="40" fill="#da251d"/>' + star(30, 20, 9, "#ffff00", 0), 60, 40)
    },
    {
      id: "ar",
      name: "Argentina",
      capital: "Buenos Aires",
      easy: false,
      svg: (function () {
        let body = '<rect width="60" height="40" fill="#74acdf"/>';
        body += '<rect y="13.33" width="60" height="13.34" fill="#fff"/>';
        for (let i = 0; i < 16; i++) {
          const a = (i * Math.PI) / 8;
          const x1 = 30 + Math.cos(a) * 3.1;
          const y1 = 20 + Math.sin(a) * 3.1;
          const x2 = 30 + Math.cos(a) * 5.8;
          const y2 = 20 + Math.sin(a) * 5.8;
          body += '<line x1="' + x1.toFixed(2) + '" y1="' + y1.toFixed(2) + '" x2="' + x2.toFixed(2) + '" y2="' + y2.toFixed(2) + '" stroke="#f6b40e" stroke-width="1.15" stroke-linecap="round"/>';
        }
        body += '<circle cx="30" cy="20" r="2.8" fill="#f6b40e"/>';
        return svg(body, 60, 40);
      })()
    },
    {
      id: "eg",
      name: "Egypt",
      capital: "Cairo",
      easy: false,
      svg: svg(
        stripesH(["#ce1126", "#ffffff", "#000000"], 60, 40) +
        '<circle cx="30" cy="20" r="3.6" fill="none" stroke="#c9a227" stroke-width="0.9"/>' +
        '<path d="M27.2,20.6 h5.6 l-1,2.2 h-3.6 z" fill="#c9a227"/>',
        60, 40)
    },
    {
      id: "ke",
      name: "Kenya",
      capital: "Nairobi",
      easy: false,
      svg: svg(
        '<rect width="60" height="40" fill="#fff"/>' +
        '<rect width="60" height="11.4" fill="#000"/>' +
        '<rect y="14.3" width="60" height="11.4" fill="#bb0000"/>' +
        '<rect y="28.6" width="60" height="11.4" fill="#006600"/>' +
        '<ellipse cx="30" cy="20" rx="3.1" ry="7.2" fill="#fff" stroke="#000" stroke-width="0.45"/>' +
        '<ellipse cx="30" cy="20" rx="2.2" ry="6.2" fill="#bb0000"/>' +
        '<line x1="30" y1="14.2" x2="30" y2="25.8" stroke="#000" stroke-width="0.45"/>',
        60, 40)
    },
    {
      id: "pt",
      name: "Portugal",
      capital: "Lisbon",
      easy: false,
      svg: svg(
        '<rect width="22" height="40" fill="#006600"/>' +
        '<rect x="22" width="38" height="40" fill="#ff0000"/>' +
        '<circle cx="22" cy="20" r="7.2" fill="#ffcc00"/>' +
        '<circle cx="22" cy="20" r="4.3" fill="#fff" stroke="#003893" stroke-width="0.7"/>' +
        '<path d="M22,16.4 v7.2 M18.6,20 h6.8" stroke="#cc0000" stroke-width="1.1"/>',
        60, 40)
    },
    {
      id: "jm",
      name: "Jamaica",
      capital: "Kingston",
      easy: false,
      svg: svg(
        '<rect width="120" height="60" fill="#fed100"/>' +
        '<polygon points="0,8 0,52 46,30" fill="#000"/>' +
        '<polygon points="120,8 120,52 74,30" fill="#000"/>' +
        '<polygon points="12,0 108,0 60,20" fill="#007749"/>' +
        '<polygon points="12,60 108,60 60,40" fill="#007749"/>',
        120, 60)
    }
  ];

  window.EduFlags = flags;
})();
