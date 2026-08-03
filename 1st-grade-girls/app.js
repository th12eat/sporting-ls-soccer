/* Renders the page from data.js. You should not need to edit this file.
   Shared by every team — only data.js differs between folders. */

(function () {
  "use strict";

  // ---- YouTube link parsing --------------------------------------------------
  function parseYouTube(url) {
    if (!url) return null;
    var id = null, start = 0;
    try {
      var u = new URL(url);
      var t = u.searchParams.get("t") || u.searchParams.get("start");
      if (t) start = parseTime(t);
      if (u.hostname.indexOf("youtu.be") !== -1) {
        id = u.pathname.split("/").filter(Boolean)[0];
      } else if (u.pathname.indexOf("/shorts/") === 0) {
        id = u.pathname.split("/")[2];
      } else if (u.pathname.indexOf("/embed/") === 0) {
        id = u.pathname.split("/")[2];
      } else {
        id = u.searchParams.get("v");
      }
    } catch (e) { id = String(url).trim(); }
    if (!id) return null;
    return { id: id, start: start };
  }

  function parseTime(t) {
    if (/^\d+$/.test(t)) return parseInt(t, 10);
    var m = t.match(/(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/);
    if (!m) return 0;
    return (parseInt(m[1] || 0, 10) * 3600) +
           (parseInt(m[2] || 0, 10) * 60) + parseInt(m[3] || 0, 10);
  }

  function fmtDate(iso) {
    var parts = iso.split("-");
    var d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    var mo = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
    var full = d.toLocaleDateString("en-US", {
      weekday: "short", month: "short", day: "numeric", year: "numeric"
    });
    return { mo: mo, day: parts[2].replace(/^0/, ""), full: full };
  }

  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (html != null) e.innerHTML = html;
    return e;
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function teamDefaultTime() {
    return (typeof TEAM !== "undefined" && TEAM.defaultTime) ? TEAM.defaultTime : "";
  }

  // ---- Media block: diagram <-> video toggle (defaults to diagram) ----------
  function buildMedia(item) {
    var yt = parseYouTube(item.youtube);
    var hasDiagram = !!item.diagram;
    if (!yt && !hasDiagram) return null;

    var media = el("div", { class: "media" });
    var both = yt && hasDiagram;

    // Toggle bar (only when we have both a diagram and a video)
    var panels = {};
    if (both) {
      var toggle = el("div", { class: "media-toggle", role: "tablist" });
      var bDia = el("button", { class: "mt-btn active", type: "button" }, "▦ Diagram");
      var bVid = el("button", { class: "mt-btn", type: "button" }, "▶ Video");
      toggle.appendChild(bDia); toggle.appendChild(bVid);
      media.appendChild(toggle);

      bDia.addEventListener("click", function () {
        panels.dia.style.display = ""; panels.vid.style.display = "none";
        bDia.classList.add("active"); bVid.classList.remove("active");
      });
      bVid.addEventListener("click", function () {
        panels.dia.style.display = "none"; panels.vid.style.display = "";
        bVid.classList.add("active"); bDia.classList.remove("active");
      });
    }

    if (hasDiagram) {
      var dg = el("div", { class: "diagram-wrap" });
      dg.appendChild(el("img", { src: item.diagram, alt: item.name + " diagram", loading: "lazy" }));
      dg.appendChild(el("div", { class: "diagram-cap" }, "Setup diagram"));
      media.appendChild(dg);
      panels.dia = dg;
    }

    if (yt) {
      var vw = el("div", { class: "video-wrap" });
      var facade = el("button", {
        class: "video-facade", type: "button",
        "aria-label": "Play video: " + esc(item.name),
        style: "background-image:url('https://i.ytimg.com/vi/" + yt.id + "/hqdefault.jpg')"
      }, '<span class="play-btn"></span>');
      facade.addEventListener("click", function () {
        var src = "https://www.youtube-nocookie.com/embed/" + yt.id +
          "?autoplay=1&rel=0&modestbranding=1" + (yt.start ? "&start=" + yt.start : "");
        var iframe = el("iframe", {
          src: src, title: esc(item.name),
          allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
          allowfullscreen: "true"
        });
        vw.innerHTML = ""; vw.appendChild(iframe);
      });
      vw.appendChild(facade);
      media.appendChild(vw);
      panels.vid = vw;
      if (both) vw.style.display = "none"; // diagram is default
    }
    return media;
  }

  function stepsList(steps) {
    var ol = el("ol", { class: "steps" });
    (steps || []).forEach(function (s) { ol.appendChild(el("li", null, esc(s))); });
    return ol;
  }

  // ---- Drill card ------------------------------------------------------------
  function renderDrill(drill, meta) {
    var media = buildMedia(drill);
    var wrap = el("div", { class: "drill" + (media ? " has-media" : "") });
    var text = el("div");
    text.appendChild(el("div", { class: "drill-name" },
      '<span class="ball">⚽</span>' + esc(drill.name)));
    if (drill.focus) text.appendChild(el("span", { class: "drill-focus" }, esc(drill.focus)));
    if (meta) text.appendChild(el("div", { class: "from-tag" }, esc(meta)));
    if (drill.steps && drill.steps.length) text.appendChild(stepsList(drill.steps));
    wrap.appendChild(text);
    if (media) wrap.appendChild(media);
    return wrap;
  }

  // ---- Homework card ---------------------------------------------------------
  function renderHomework(hw, meta) {
    var media = buildMedia(hw);
    var wrap = el("div", { class: "drill homework" + (media ? " has-media" : "") });
    var text = el("div");
    text.appendChild(el("div", { class: "drill-name" },
      '<span class="ball">🎯</span>' + esc(hw.name)));
    if (hw.focus) text.appendChild(el("span", { class: "drill-focus" }, esc(hw.focus)));
    if (meta) text.appendChild(el("div", { class: "from-tag" }, esc(meta)));

    if (hw.time || hw.equipment) {
      var m = el("div", { class: "hw-meta" });
      if (hw.time) m.appendChild(el("span", { class: "chip" }, "⏱ " + esc(hw.time)));
      if (hw.equipment) m.appendChild(el("span", { class: "chip" }, "🧰 " + esc(hw.equipment)));
      text.appendChild(m);
    }
    if (hw.concept) {
      var why = el("div", { class: "concept" });
      why.appendChild(el("span", { class: "concept-label" }, "Why it matters"));
      why.appendChild(el("p", null, esc(hw.concept)));
      text.appendChild(why);
    }
    if (hw.steps && hw.steps.length) text.appendChild(stepsList(hw.steps));
    if (hw.indoor) {
      var ind = el("div", { class: "indoor" });
      ind.appendChild(el("span", { class: "indoor-label" }, "🏠 Indoor / limited-space option"));
      ind.appendChild(el("p", null, esc(hw.indoor)));
      text.appendChild(ind);
    }
    wrap.appendChild(text);
    if (media) wrap.appendChild(media);
    return wrap;
  }

  function band(label, emoji) {
    return el("div", { class: "band" },
      '<span class="band-emoji">' + emoji + '</span>' + esc(label));
  }

  function renderAttendance(att) {
    if (!att || ((!att.present || !att.present.length) && (!att.absent || !att.absent.length)))
      return null;
    var wrap = el("div", { class: "attendance" });
    if (att.present && att.present.length) {
      var p = el("div", { class: "att-group present" });
      p.appendChild(el("div", { class: "att-title" }, "Present · " + att.present.length));
      var c1 = el("div", { class: "att-chips" });
      att.present.forEach(function (n) { c1.appendChild(el("span", { class: "name-chip" }, esc(n))); });
      p.appendChild(c1); wrap.appendChild(p);
    }
    if (att.absent && att.absent.length) {
      var a = el("div", { class: "att-group absent" });
      a.appendChild(el("div", { class: "att-title" }, "Missing · " + att.absent.length));
      var c2 = el("div", { class: "att-chips" });
      att.absent.forEach(function (n) { c2.appendChild(el("span", { class: "name-chip out" }, esc(n))); });
      a.appendChild(c2); wrap.appendChild(a);
    }
    return wrap;
  }

  // Warm-up: bullet items only (description intentionally omitted per coach request)
  function renderWarmup(w) {
    if (!w || !(w.items && w.items.length)) return null;
    var wrap = el("div", { class: "drill" });
    var text = el("div");
    var ul = el("ul", { class: "tick-list" });
    w.items.forEach(function (i) { ul.appendChild(el("li", null, esc(i))); });
    text.appendChild(ul);
    wrap.appendChild(text);
    return wrap;
  }

  // Weather + time chips for a practice/game header
  function metaChips(entry) {
    var frag = el("span", { class: "hdr-chips" });
    var time = entry.time || teamDefaultTime();
    if (time) frag.appendChild(el("span", { class: "hdr-chip time" }, "🕕 " + esc(time)));
    if (entry.weather) {
      var w = entry.weather;
      var label = (w.emoji ? w.emoji + " " : "") +
        (w.tempF != null ? w.tempF + "°F" : "") +
        (w.condition ? (w.tempF != null ? " · " : "") + w.condition : "");
      if (label.trim()) frag.appendChild(el("span", { class: "hdr-chip wx" }, label));
    }
    return frag;
  }

  // ---- Practice card ---------------------------------------------------------
  function renderPractice(p, index, openFirst) {
    var d = fmtDate(p.date);
    var card = el("div", { class: "practice" + (index === 0 && openFirst ? " this-week open" : "") });

    var header = el("div", { class: "practice-header", role: "button", tabindex: "0",
      "aria-expanded": index === 0 && openFirst ? "true" : "false" });
    header.appendChild(el("div", { class: "cal" },
      '<div class="mo">' + d.mo + '</div><div class="day">' + d.day + '</div>'));
    var titles = el("div", { class: "practice-titles" });
    titles.appendChild(el("h3", null,
      esc(p.title) + (index === 0 && openFirst ? '<span class="thisweek-pill">This week</span>' : "")));
    var when = el("div", { class: "when" });
    when.appendChild(document.createTextNode(d.full));
    when.appendChild(metaChips(p));
    titles.appendChild(when);
    header.appendChild(titles);
    header.appendChild(el("div", { class: "chevron" }, "▾"));
    card.appendChild(header);

    var body = el("div", { class: "practice-body" });
    var inner = el("div", { class: "inner" });

    if (p.summary) inner.appendChild(el("p", { class: "summary" }, esc(p.summary)));

    var att = renderAttendance(p.attendance);
    if (att) inner.appendChild(att);

    var wu = renderWarmup(p.warmup);
    if (wu) { inner.appendChild(band("Warm-up & Stretching", "🤸")); inner.appendChild(wu); }

    if (p.drills && p.drills.length) {
      inner.appendChild(band("Drills", "⚽"));
      p.drills.forEach(function (dr) { inner.appendChild(renderDrill(dr)); });
    }

    if (p.scrimmage && (p.scrimmage.description || p.scrimmage.duration)) {
      inner.appendChild(band("Scrimmage", "🥅"));
      var sc = el("div", { class: "drill scrimmage" });
      var st = el("div");
      if (p.scrimmage.duration)
        st.appendChild(el("span", { class: "drill-focus" }, "⏱ " + esc(p.scrimmage.duration)));
      if (p.scrimmage.description)
        st.appendChild(el("p", { class: "summary flush" }, esc(p.scrimmage.description)));
      sc.appendChild(st); inner.appendChild(sc);
    }

    if (p.homework && p.homework.length) {
      inner.appendChild(band("Homework", "🏡"));
      if (p.homeworkIntro)
        inner.appendChild(el("p", { class: "summary hw-intro" }, esc(p.homeworkIntro)));
      p.homework.forEach(function (hw) { inner.appendChild(renderHomework(hw)); });
    }

    body.appendChild(inner); card.appendChild(body);
    wireToggle(card, header);
    return card;
  }

  // ---- Game card -------------------------------------------------------------
  function renderGame(g, index) {
    var d = fmtDate(g.date);
    var card = el("div", { class: "practice game-card" + (index === 0 ? " open" : "") });

    var header = el("div", { class: "practice-header", role: "button", tabindex: "0",
      "aria-expanded": index === 0 ? "true" : "false" });
    header.appendChild(el("div", { class: "cal" },
      '<div class="mo">' + d.mo + '</div><div class="day">' + d.day + '</div>'));

    var titles = el("div", { class: "practice-titles" });
    var vs = g.opponent ? "vs. " + g.opponent : (g.title || "Game");
    var scoreHtml = "";
    if (g.scoreUs != null && g.scoreThem != null) {
      var res = g.scoreUs > g.scoreThem ? "win" : (g.scoreUs < g.scoreThem ? "loss" : "tie");
      scoreHtml = ' <span class="score ' + res + '">' + g.scoreUs + "–" + g.scoreThem + "</span>";
    }
    titles.appendChild(el("h3", null, esc(vs) + scoreHtml));
    var when = el("div", { class: "when" });
    when.appendChild(document.createTextNode(d.full + (g.homeAway ? " · " + g.homeAway : "")));
    when.appendChild(metaChips(g));
    titles.appendChild(when);
    header.appendChild(titles);
    header.appendChild(el("div", { class: "chevron" }, "▾"));
    card.appendChild(header);

    var body = el("div", { class: "practice-body" });
    var inner = el("div", { class: "inner" });
    if (g.location) inner.appendChild(el("p", { class: "summary" }, "📍 " + esc(g.location)));
    if (g.summary) inner.appendChild(el("p", { class: "summary" }, esc(g.summary)));
    if (g.scorers && g.scorers.length) {
      inner.appendChild(band("Goals & Assists", "⚽"));
      var ul = el("ul", { class: "tick-list" });
      g.scorers.forEach(function (s) { ul.appendChild(el("li", null, esc(s))); });
      inner.appendChild(el("div", { class: "drill" }, "")).appendChild(ul);
    }
    body.appendChild(inner); card.appendChild(body);
    wireToggle(card, header);
    return card;
  }

  function wireToggle(card, header) {
    function toggle() {
      var open = card.classList.toggle("open");
      header.setAttribute("aria-expanded", open ? "true" : "false");
    }
    header.addEventListener("click", toggle);
    header.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
    });
  }

  // ---- Collated (searchable) lists for Homework & Drills tabs ---------------
  function collate(kind) {
    var out = [];
    (typeof PRACTICES !== "undefined" ? PRACTICES : []).forEach(function (p) {
      var items = kind === "drills" ? p.drills : p.homework;
      (items || []).forEach(function (it) {
        out.push({ item: it, date: p.date, from: fmtDate(p.date).full });
      });
    });
    return out;
  }

  function renderCollated(kind, mountId) {
    var mount = document.getElementById(mountId);
    mount.innerHTML = "";
    var all = collate(kind);

    var search = el("input", {
      type: "search", class: "search-box",
      placeholder: "Search " + (kind === "drills" ? "drills" : "homework") + "…"
    });
    mount.appendChild(search);
    var list = el("div", { class: "collated" });
    mount.appendChild(list);

    function draw(q) {
      list.innerHTML = "";
      var ql = (q || "").toLowerCase();
      var shown = 0;
      all.forEach(function (row) {
        var it = row.item;
        var hay = (it.name + " " + (it.focus || "") + " " + (it.concept || "") + " " +
                   (it.steps || []).join(" ")).toLowerCase();
        if (ql && hay.indexOf(ql) === -1) return;
        shown++;
        var meta = "From practice · " + row.from;
        list.appendChild(kind === "drills" ? renderDrill(it, meta) : renderHomework(it, meta));
      });
      if (!shown) list.appendChild(el("p", { class: "empty" }, "No matches."));
    }
    search.addEventListener("input", function () { draw(search.value); });
    draw("");
  }

  // ---- Roster tab ------------------------------------------------------------
  function mark(state) {
    // yes -> check, no -> x, anything else -> neutral dash
    if (state === "yes" || state === true) return '<span class="mk yes">✓</span>';
    if (state === "no") return '<span class="mk no">✗</span>';
    return '<span class="mk neutral">–</span>';
  }

  function renderRoster(mountId) {
    var mount = document.getElementById(mountId);
    mount.innerHTML = "";
    var roster = (typeof ROSTER !== "undefined" ? ROSTER : []);
    if (!roster.length) {
      mount.appendChild(el("p", { class: "empty" }, "Roster coming soon."));
      return;
    }
    var grid = el("div", { class: "roster" });
    roster.forEach(function (pl) {
      var card = el("div", { class: "roster-card" });
      card.appendChild(el("div", { class: "roster-name" },
        '<span class="jersey">' + (pl.number != null ? esc(pl.number) : "⚽") + "</span>" + esc(pl.name)));
      var stats = el("div", { class: "roster-stats" });
      function stat(label, val, cls) {
        var s = el("div", { class: "stat" + (cls ? " " + cls : "") });
        s.appendChild(el("span", { class: "stat-val" }, val));
        s.appendChild(el("span", { class: "stat-lbl" }, label));
        return s;
      }
      stats.appendChild(stat("Goals", String(pl.goals || 0)));
      stats.appendChild(stat("Assists", String(pl.assists || 0)));
      stats.appendChild(stat("Saves", String(pl.saves || 0)));
      stats.appendChild(stat("Games", String(pl.games || 0)));
      stats.appendChild(stat("Practices", String(pl.practices || 0)));
      stats.appendChild(stat("Goalie", mark(pl.goalie), "flag"));
      stats.appendChild(stat("Captain", mark(pl.captain), "flag"));
      card.appendChild(stats);
      grid.appendChild(card);
    });
    mount.appendChild(grid);
    // legend
    mount.appendChild(el("p", { class: "legend" },
      '<span class="mk yes">✓</span> yes &nbsp; <span class="mk no">✗</span> opted out &nbsp; <span class="mk neutral">–</span> not yet'));
  }

  // ---- Tabs ------------------------------------------------------------------
  var EM_WORD = { practice: "Practice", games: "Game", homework: "Homework", drills: "Drills", roster: "Roster" };

  function showTab(name) {
    var panels = document.querySelectorAll(".tab-panel");
    for (var i = 0; i < panels.length; i++) {
      panels[i].style.display = (panels[i].getAttribute("data-tab") === name) ? "" : "none";
    }
    var btns = document.querySelectorAll(".tab-btn");
    for (var j = 0; j < btns.length; j++) {
      btns[j].classList.toggle("active", btns[j].getAttribute("data-tab") === name);
    }
    var em = document.getElementById("hero-em");
    if (em) em.textContent = EM_WORD[name] || "Practice";
    if (location.hash.slice(1) !== name) {
      try { history.replaceState(null, "", "#" + name); } catch (e) {}
    }
  }

  // ---- Boot ------------------------------------------------------------------
  function init() {
    if (typeof TEAM !== "undefined") {
      setText("team-sub", TEAM.name);
      setText("season-tag", TEAM.season);
      setText("league-badge", TEAM.league);
      if (TEAM.coaches && TEAM.coaches.length) setText("coach-list", TEAM.coaches.join(" · "));
      if (TEAM.venue) setText("venue", "📍 " + TEAM.venue);
    }

    // Practice tab
    var practicesRoot = document.getElementById("practices");
    practicesRoot.innerHTML = "";
    (typeof PRACTICES !== "undefined" ? PRACTICES : []).forEach(function (p, i) {
      practicesRoot.appendChild(renderPractice(p, i, true));
    });

    // Games tab
    var gamesRoot = document.getElementById("games");
    gamesRoot.innerHTML = "";
    var games = (typeof GAMES !== "undefined" ? GAMES : []);
    if (!games.length) gamesRoot.appendChild(el("p", { class: "empty" }, "No games played yet — check back after game day!"));
    else games.forEach(function (g, i) { gamesRoot.appendChild(renderGame(g, i)); });

    // Collated tabs
    renderCollated("homework", "homework-list");
    renderCollated("drills", "drills-list");

    // Roster
    renderRoster("roster-list");

    // Wire tab buttons
    var btns = document.querySelectorAll(".tab-btn");
    for (var k = 0; k < btns.length; k++) {
      (function (b) {
        b.addEventListener("click", function () { showTab(b.getAttribute("data-tab")); });
      })(btns[k]);
    }

    var start = location.hash.slice(1);
    showTab(EM_WORD[start] ? start : "practice");
  }

  function setText(id, txt) {
    var e = document.getElementById(id);
    if (e && txt != null) e.textContent = txt;
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
