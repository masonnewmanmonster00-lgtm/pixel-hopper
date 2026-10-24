(function () {
  "use strict";

  function storageGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }

  function storageSet(key, value) {
    try { localStorage.setItem(key, value); } catch (e) {}
  }

  function shuffle(list) {
    const a = list.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    return a;
  }

  function rand(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  function pick(list) {
    return list[rand(0, list.length - 1)];
  }

  function loadBest(id) {
    const n = Number(storageGet("edu-best-" + id));
    return Number.isFinite(n) && n > 0 ? n : 0;
  }

  function saveBest(id, score) {
    storageSet("edu-best-" + id, String(score));
  }

  function loadLevel(id) {
    const value = storageGet("edu-level-" + id);
    return value === "medium" || value === "hard" ? value : "easy";
  }

  function saveLevel(id, level) {
    storageSet("edu-level-" + id, level);
  }

  let audioCtx = null;
  let soundOn = storageGet("edu-sound") === "on";

  function beep(kind) {
    if (!soundOn) return;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      if (!audioCtx) audioCtx = new AC();
      if (audioCtx.state === "suspended") audioCtx.resume();
      const t = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = kind === "no" ? "triangle" : "sine";
      const freq = kind === "no" ? 180 : kind === "win" ? 660 : 520;
      osc.frequency.setValueAtTime(freq, t);
      if (kind === "win") osc.frequency.exponentialRampToValueAtTime(880, t + 0.16);
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.05, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + (kind === "win" ? 0.28 : 0.12));
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(t);
      osc.stop(t + 0.32);
    } catch (e) {}
  }

  function pointsFor(level) {
    if (level === "hard") return 25;
    if (level === "medium") return 15;
    return 10;
  }

  function bind(id, onLevel) {
    const scoreEl = document.getElementById("score");
    const bestEl = document.getElementById("best");
    const statusEl = document.getElementById("status");
    const buttons = Array.prototype.slice.call(document.querySelectorAll("[data-level]"));
    let score = 0;
    let best = loadBest(id);
    let level = loadLevel(id);
    if (bestEl) bestEl.textContent = String(best);
    if (scoreEl) scoreEl.textContent = "0";

    const api = {
      get score() { return score; },
      get best() { return best; },
      get level() { return level; },
      setScore(n) {
        score = Math.max(0, n | 0);
        if (scoreEl) scoreEl.textContent = String(score);
        if (score > best) {
          best = score;
          saveBest(id, best);
          if (bestEl) bestEl.textContent = String(best);
        }
      },
      add(n) { api.setScore(score + n); },
      resetScore() {
        score = 0;
        if (scoreEl) scoreEl.textContent = "0";
      },
      status(text, kind) {
        if (!statusEl) return;
        statusEl.textContent = text || "";
        statusEl.classList.remove("good", "bad");
        if (kind) statusEl.classList.add(kind);
      },
      beep: beep,
      points() { return pointsFor(level); }
    };

    function paint() {
      buttons.forEach(function (btn) {
        const on = btn.dataset.level === level;
        btn.classList.toggle("on", on);
        btn.setAttribute("aria-pressed", on ? "true" : "false");
      });
    }

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        level = btn.dataset.level;
        saveLevel(id, level);
        paint();
        api.resetScore();
        onLevel(level, api);
      });
    });

    const soundBtn = document.querySelector("[data-sound]");
    if (soundBtn) {
      function sync() {
        soundBtn.textContent = soundOn ? "Sound on" : "Sound off";
        soundBtn.setAttribute("aria-pressed", soundOn ? "true" : "false");
      }
      sync();
      soundBtn.addEventListener("click", function () {
        soundOn = !soundOn;
        storageSet("edu-sound", soundOn ? "on" : "off");
        sync();
        beep("ok");
      });
    }

    paint();
    onLevel(level, api);
    return api;
  }

  function finish(stage, info) {
    const panel = document.createElement("section");
    panel.className = "end";
    const heading = document.createElement("h2");
    heading.textContent = info.title || "Round complete";
    const score = document.createElement("p");
    score.className = "end-score";
    score.textContent = "Score " + info.score;
    const best = document.createElement("p");
    best.textContent = "Best " + info.best;
    panel.appendChild(heading);
    panel.appendChild(score);
    panel.appendChild(best);
    if (info.note) {
      const note = document.createElement("p");
      note.textContent = info.note;
      panel.appendChild(note);
    }
    const row = document.createElement("div");
    row.className = "end-actions";
    const again = document.createElement("button");
    again.type = "button";
    again.className = "primary";
    again.textContent = "Play again";
    again.addEventListener("click", info.onAgain);
    const home = document.createElement("a");
    home.className = "ghost";
    home.href = "./index.html";
    home.textContent = "All games";
    row.appendChild(again);
    row.appendChild(home);
    panel.appendChild(row);
    stage.innerHTML = "";
    stage.appendChild(panel);
    if (info.win) beep("win");
  }

  function choices(parent, items, onPick) {
    const wrap = document.createElement("div");
    wrap.className = "choices";
    const buttons = items.map(function (item) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "choice";
      btn.textContent = item.label;
      btn.addEventListener("click", function () { onPick(item, btn, buttons); });
      wrap.appendChild(btn);
      return btn;
    });
    parent.appendChild(wrap);
    return buttons;
  }

  function keypad(parent, opts) {
    const max = opts.maxDigits || 4;
    let value = "";
    let gone = false;
    const wrap = document.createElement("div");
    wrap.className = "pad";
    const readout = document.createElement("div");
    readout.className = "readout";
    readout.setAttribute("aria-live", "polite");
    readout.setAttribute("aria-label", "Your answer");
    const keys = document.createElement("div");
    keys.className = "keys";

    function render() {
      readout.textContent = opts.format ? opts.format(value) : (value || "–");
    }

    function push(digit) {
      if (gone || value.length >= max) return;
      value += digit;
      render();
    }

    function submit() {
      if (gone || !value) {
        readout.classList.remove("shake");
        void readout.offsetWidth;
        readout.classList.add("shake");
        return;
      }
      opts.onSubmit(value);
    }

    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "Clear", "0", "Go"].forEach(function (label) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "key" + (label === "Go" ? " go" : "");
      btn.textContent = label;
      if (label === "Clear") btn.setAttribute("aria-label", "Clear");
      btn.addEventListener("click", function () {
        if (label === "Clear") { value = ""; render(); return; }
        if (label === "Go") { submit(); return; }
        push(label);
      });
      keys.appendChild(btn);
    });

    wrap.appendChild(readout);
    wrap.appendChild(keys);
    parent.appendChild(wrap);
    render();

    function onKey(e) {
      if (gone) return;
      const tag = e.target && e.target.tagName;
      if ((tag === "BUTTON" || tag === "A") && (e.key === "Enter" || e.key === " ")) return;
      if (e.key >= "0" && e.key <= "9") { push(e.key); e.preventDefault(); }
      else if (e.key === "Backspace") { value = value.slice(0, -1); render(); e.preventDefault(); }
      else if (e.key === "Enter") { submit(); e.preventDefault(); }
      else if (e.key === "Escape") { value = ""; render(); }
    }

    document.addEventListener("keydown", onKey);

    return {
      clear() { value = ""; render(); },
      shake() {
        readout.classList.remove("shake");
        void readout.offsetWidth;
        readout.classList.add("shake");
      },
      lock(on) {
        keys.querySelectorAll("button").forEach(function (btn) { btn.disabled = on; });
      },
      destroy() {
        gone = true;
        document.removeEventListener("keydown", onKey);
        if (wrap.parentNode) wrap.remove();
      }
    };
  }

  function later(flag, fn, ms) {
    const id = setTimeout(function () {
      if (!flag.stopped) fn();
    }, ms);
    flag.timers.push(id);
    return id;
  }

  window.Edu = {
    shuffle: shuffle,
    rand: rand,
    pick: pick,
    loadBest: loadBest,
    pointsFor: pointsFor,
    bind: bind,
    finish: finish,
    choices: choices,
    keypad: keypad,
    later: later
  };
})();
