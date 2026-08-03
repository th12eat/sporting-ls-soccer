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

  // Build one diagram panel (an image in a captioned frame).
  function diagramPanel(src, caption, alt) {
    var dg = el("div", { class: "diagram-wrap" });
    dg.appendChild(el("img", { src: src, alt: alt || "diagram", loading: "lazy" }));
    dg.appendChild(el("div", { class: "diagram-cap" }, caption || "Setup diagram"));
    return dg;
  }

  // Build a lazy YouTube panel (loads the iframe only on click).
  function videoPanel(yt, name) {
    var vw = el("div", { class: "video-wrap" });
    var facade = el("button", {
      class: "video-facade", type: "button",
      "aria-label": "Play video: " + esc(name),
      style: "background-image:url('https://i.ytimg.com/vi/" + yt.id + "/hqdefault.jpg')"
    }, '<span class="play-btn"></span>');
    facade.addEventListener("click", function () {
      var src = "https://www.youtube-nocookie.com/embed/" + yt.id +
        "?autoplay=1&rel=0&modestbranding=1" + (yt.start ? "&start=" + yt.start : "");
      var iframe = el("iframe", {
        src: src, title: esc(name),
        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
        allowfullscreen: "true"
      });
      vw.innerHTML = ""; vw.appendChild(iframe);
    });
    vw.appendChild(facade);
    return vw;
  }

  // ---- Media block: toggles between any diagrams + a video (first is default)
  // An item may have: `diagram` (single), `diagrams` [{label, src}], `youtube`.
  function buildMedia(item) {
    var yt = parseYouTube(item.youtube);
    var panels = []; // { label, node }

    if (item.diagrams && item.diagrams.length) {
      item.diagrams.forEach(function (d) {
        panels.push({ label: "▦ " + (d.label || "Diagram"),
          node: diagramPanel(d.src, d.label || "Setup diagram", item.name + " — " + (d.label || "")) });
      });
    } else if (item.diagram) {
      panels.push({ label: "▦ Diagram", node: diagramPanel(item.diagram, "Setup diagram", item.name + " diagram") });
    }

    if (yt) panels.push({ label: "▶ Video", node: videoPanel(yt, item.name) });

    if (!panels.length) return null;
    var media = el("div", { class: "media" });

    if (panels.length > 1) {
      var toggle = el("div", { class: "media-toggle", role: "tablist" });
      panels.forEach(function (p, i) {
        var btn = el("button", { class: "mt-btn" + (i === 0 ? " active" : ""), type: "button" }, p.label);
        btn.addEventListener("click", function () {
          panels.forEach(function (q, j) {
            q.node.style.display = (j === i) ? "" : "none";
          });
          var btns = toggle.children;
          for (var k = 0; k < btns.length; k++) btns[k].classList.remove("active");
          btn.classList.add("active");
        });
        toggle.appendChild(btn);
      });
      media.appendChild(toggle);
    }

    panels.forEach(function (p, i) {
      if (i !== 0) p.node.style.display = "none"; // first panel is default
      media.appendChild(p.node);
    });
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

  // ---- Sporting LS weather guidelines --------------------------------------
  // Heat Index (NWS "feels like"). If humidity is present we compute the heat
  // index; otherwise we fall back to the air temperature. Zones + actions and
  // the cold/lightning rules come from sportingls.org/weather-guidelines-2.
  function heatIndexF(T, RH) {
    if (T == null) return null;
    if (RH == null || T < 80) return T; // HI only meaningful when warm & humid
    var HI = -42.379 + 2.04901523*T + 10.14333127*RH
      - 0.22475541*T*RH - 0.00683783*T*T - 0.05481717*RH*RH
      + 0.00122874*T*T*RH + 0.00085282*T*RH*RH - 0.00000199*T*T*RH*RH;
    return Math.round(HI);
  }

  // Returns { zone, color, label, action } for a heat-index value, or null.
  function heatZone(hi) {
    if (hi == null) return null;
    if (hi >= 115) return { zone: "Black", color: "#1a1a1a",
      label: "Black (115°F+)", action: "All games & practices CANCELLED." };
    if (hi >= 106) return { zone: "Red", color: "#c0392b",
      label: "Red (106–115°F)", action: "Mandatory mid-half water break; games shortened." };
    if (hi >= 99) return { zone: "Orange", color: "#d35400",
      label: "Orange (99–105°F)", action: "Water coolers at fields; frequent breaks." };
    if (hi >= 81) return { zone: "Yellow", color: "#c9a100",
      label: "Yellow (81–98°F)", action: "Hydration encouraged; frequent substitutions." };
    if (hi >= 65) return { zone: "White", color: "#5b6b7c",
      label: "White (65–80°F)", action: "No special measures needed." };
    return null; // below 65°F -> handled by cold-weather check
  }

  // Cold-weather playability (uses temp; wind chill if provided as w.windChillF).
  function coldRule(w) {
    var t = w.tempF, wc = (w.windChillF != null ? w.windChillF : t);
    if (t == null) return null;
    if (t <= 40 || wc <= 32)
      return { color: "#2c6ca0", label: "Too cold", action: "Play requires temp above 40°F and wind chill above 32°F." };
    if (t < 65)
      return { color: "#2c6ca0", label: "Cool", action: "Dress in layers; playable (temp above 40°F, wind chill above 32°F)." };
    return null;
  }

  // Build the guideline object for an entry's weather, or null.
  function weatherGuideline(w) {
    if (!w) return null;
    var lightning = w.lightning
      ? { color: "#6a1b9a", label: "⚡ Lightning", action: "Clear fields on the horn; shelter in vehicles. Return 30+ min after the last strike within 10 miles." }
      : null;
    if (lightning) return lightning;
    var hi = heatIndexF(w.tempF, w.humidity != null ? w.humidity : null);
    var hz = heatZone(hi);
    if (hz) {
      var extra = (w.humidity != null && hi !== w.tempF) ? " (heat index " + hi + "°F)" : "";
      hz.action = hz.action + extra;
      return hz;
    }
    return coldRule(w);
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
      var g = weatherGuideline(w);
      if (g) {
        var chip = el("span", { class: "hdr-chip zone", title: g.action,
          style: "background:" + g.color + ";color:#fff" }, esc(g.label));
        frag.appendChild(chip);
      }
    }
    return frag;
  }

  // Full-width guideline banner shown inside a practice/game body.
  function guidelineBanner(w) {
    var g = weatherGuideline(w);
    if (!g) return null;
    var b = el("div", { class: "wx-guideline", style: "border-left-color:" + g.color });
    b.appendChild(el("span", { class: "wx-g-badge", style: "background:" + g.color },
      esc(g.label)));
    b.appendChild(el("span", { class: "wx-g-text" }, esc(g.action)));
    return b;
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

    var gb = p.weather ? guidelineBanner(p.weather) : null;
    if (gb) inner.appendChild(gb);
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

    inner.appendChild(collapseFooter(card, header));
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
    var ggb = g.weather ? guidelineBanner(g.weather) : null;
    if (ggb) inner.appendChild(ggb);
    // Location: use the game's specific field, else the team's game venue. Link to map.
    var gLoc = g.location || (TEAM.gameLocation || null);
    var link = locationLink(gLoc);
    if (link) {
      var locP = el("p", { class: "summary" });
      locP.appendChild(link);
      inner.appendChild(locP);
    }
    if (g.summary) inner.appendChild(el("p", { class: "summary" }, esc(g.summary)));
    if (g.scorers && g.scorers.length) {
      inner.appendChild(band("Goals & Assists", "⚽"));
      var ul = el("ul", { class: "tick-list" });
      g.scorers.forEach(function (s) { ul.appendChild(el("li", null, esc(s))); });
      inner.appendChild(el("div", { class: "drill" }, "")).appendChild(ul);
    }
    inner.appendChild(collapseFooter(card, header));
    body.appendChild(inner); card.appendChild(body);
    wireToggle(card, header);
    return card;
  }

  function wireToggle(card, header) {
    function toggle() {
      var open = card.classList.toggle("open");
      header.setAttribute("aria-expanded", open ? "true" : "false");
      updateFloatingClose();
    }
    header.addEventListener("click", toggle);
    header.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
    });
    registerCard(card, header);
  }

  // ---- Floating "close" button --------------------------------------------
  // Appears only when an OPEN card's header has scrolled off the top of the
  // screen, so you can collapse from anywhere without scrolling to find it.
  var _cards = [];          // { card, header }
  var _floatBtn = null;

  function registerCard(card, header) { _cards.push({ card: card, header: header }); }

  function ensureFloatBtn() {
    if (_floatBtn) return _floatBtn;
    _floatBtn = el("button", { class: "float-close", type: "button",
      "aria-label": "Close the open section" }, "▲ Close");
    _floatBtn.style.display = "none";
    _floatBtn.addEventListener("click", function () {
      // Close the top-most open card whose header is above the viewport.
      var target = currentFloatTarget();
      if (target) {
        target.card.classList.remove("open");
        target.header.setAttribute("aria-expanded", "false");
      }
      updateFloatingClose();
    });
    document.body.appendChild(_floatBtn);
    return _floatBtn;
  }

  // The open card whose header is scrolled above the top of the viewport.
  function currentFloatTarget() {
    for (var i = 0; i < _cards.length; i++) {
      var c = _cards[i];
      if (!c.card.classList.contains("open")) continue;
      var r = c.header.getBoundingClientRect ? c.header.getBoundingClientRect() : null;
      if (!r) continue;
      // header top is above the viewport, but the card still occupies screen
      var cr = c.card.getBoundingClientRect();
      if (r.bottom < 8 && cr.bottom > 80) return c;
    }
    return null;
  }

  function updateFloatingClose() {
    var btn = ensureFloatBtn();
    btn.style.display = currentFloatTarget() ? "" : "none";
  }

  // A "collapse" button placed at the bottom of an expanded card, so you can
  // close it after scrolling instead of scrolling back to the top.
  function collapseFooter(card, header) {
    var foot = el("div", { class: "collapse-foot" });
    var btn = el("button", { class: "collapse-btn", type: "button",
      "aria-label": "Collapse this section" }, "▲ Close");
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      card.classList.remove("open");
      header.setAttribute("aria-expanded", "false");
      // Bring the header back into view smoothly.
      if (header.scrollIntoView) header.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    foot.appendChild(btn);
    return foot;
  }

  // ---- Collated (searchable) lists for Homework & Drills tabs ---------------
  function collate(kind) {
    var out = [];
    (typeof PRACTICES !== "undefined" ? PRACTICES : []).forEach(function (p) {
      var items = kind === "drills" ? p.drills : p.homework;
      (items || []).forEach(function (it) {
        // Items flagged collate:false show inline in the practice but are kept
        // out of the collated Drills/Homework tabs (e.g. "Player Showcase").
        if (it.collate === false) return;
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
    // Which stat columns to show. A team can override via TEAM.rosterFields
    // (e.g. omit "saves"/"goalie" for a no-goalie team). Default = full set.
    var ALL_FIELDS = [
      { key: "goals",     label: "Goals" },
      { key: "assists",   label: "Assists" },
      { key: "saves",     label: "Saves" },
      { key: "games",     label: "Games" },
      { key: "practices", label: "Practices" },
      { key: "goalie",    label: "Goalie", flag: true },
      { key: "captain",   label: "Captain", flag: true },
    ];
    var wanted = (typeof TEAM !== "undefined" && TEAM.rosterFields) ? TEAM.rosterFields : null;
    var fields = wanted
      ? ALL_FIELDS.filter(function (f) { return wanted.indexOf(f.key) !== -1; })
      : ALL_FIELDS;
    var showGoalie = fields.some(function (f) { return f.key === "goalie"; });

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
      fields.forEach(function (f) {
        if (f.flag) stats.appendChild(stat(f.label, mark(pl[f.key]), "flag"));
        else stats.appendChild(stat(f.label, String(pl[f.key] || 0)));
      });
      card.appendChild(stats);
      grid.appendChild(card);
    });
    mount.appendChild(grid);
    // legend (only meaningful when a flag column like Goalie/Captain is shown)
    mount.appendChild(el("p", { class: "legend" },
      '<span class="mk yes">✓</span> yes &nbsp; <span class="mk no">✗</span> opted out &nbsp; <span class="mk neutral">–</span> not yet'));
  }

  // ---- Weather Guidelines tab (Sporting LS official rules) -------------------
  function renderGuidelines(mountId) {
    var mount = document.getElementById(mountId);
    if (!mount) return;
    mount.innerHTML = "";

    var intro = el("p", { class: "summary" },
      "Sporting LS follows these National Weather Service–based rules for all games and practices. " +
      "The zone that applies to a session's weather also shows on that session's card.");
    intro.style.padding = "0 0 1rem";
    mount.appendChild(intro);

    // Heat index table
    var heat = [
      { z: "White", r: "65–80°F", a: "No special measures needed.", c: "#5b6b7c" },
      { z: "Yellow", r: "81–98°F", a: "Hydration encouraged; frequent substitutions.", c: "#c9a100" },
      { z: "Orange", r: "99–105°F", a: "Water coolers at fields; frequent breaks.", c: "#d35400" },
      { z: "Red", r: "106–115°F", a: "Mandatory mid-half water break; games shortened (12–25 min halves by age).", c: "#c0392b" },
      { z: "Black", r: "115°F+", a: "All games & practices CANCELLED.", c: "#1a1a1a" },
    ];
    mount.appendChild(el("h3", { class: "wg-h" }, "🌡️ Heat Index Zones"));
    var table = el("div", { class: "wg-zones" });
    heat.forEach(function (row) {
      var r = el("div", { class: "wg-zone" });
      r.appendChild(el("span", { class: "wg-badge", style: "background:" + row.c }, row.z));
      r.appendChild(el("span", { class: "wg-range" }, row.r));
      r.appendChild(el("span", { class: "wg-action" }, row.a));
      table.appendChild(r);
    });
    mount.appendChild(table);

    // Lightning
    mount.appendChild(el("h3", { class: "wg-h" }, "⚡ Lightning"));
    var lg = el("ul", { class: "tick-list wg-list" });
    [
      "One horn blast = clear the fields; players shelter in vehicles.",
      "A strobe light means active lightning danger — shelter immediately.",
      "Three horn blasts = all-clear, safe to return.",
      "Must wait 30+ minutes after the last lightning strike within 10 miles.",
      "In-progress games: past halftime counts as complete; first-half games reschedule.",
    ].forEach(function (t) { lg.appendChild(el("li", null, t)); });
    mount.appendChild(lg);

    // Cold
    mount.appendChild(el("h3", { class: "wg-h" }, "❄️ Cold Weather"));
    var cg = el("ul", { class: "tick-list wg-list" });
    [
      "Play happens when wind chill is above 32°F and temperature above 40°F.",
      "Wet conditions are playable when wind chill is above 40°F and temperature above 48°F.",
    ].forEach(function (t) { cg.appendChild(el("li", null, t)); });
    mount.appendChild(cg);

    // Other + contact
    mount.appendChild(el("h3", { class: "wg-h" }, "🚩 Other Unsafe Conditions"));
    mount.appendChild(el("p", { class: "summary flush wg-p" },
      "Field marshals also monitor for excessive field damage, standing water or snow, high winds, and hail."));
    mount.appendChild(el("p", { class: "summary flush wg-p" },
      "Check status: 816-473-1001 or the PlayMetrics app. Full rules: sportingls.org/weather-guidelines-2"));
  }

  // ---- Live forecast for the next session (National Weather Service) --------
  function to24h(t) {
    // "6:00pm" -> 18 ; "9:00am" -> 9  (returns hour integer, best-effort)
    if (!t) return 18;
    var m = String(t).trim().toLowerCase().match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/);
    if (!m) return 18;
    var h = parseInt(m[1], 10);
    var ap = m[3];
    if (ap === "pm" && h < 12) h += 12;
    if (ap === "am" && h === 12) h = 0;
    return h;
  }

  function iconFor(shortForecast) {
    var s = (shortForecast || "").toLowerCase();
    if (s.indexOf("thunder") !== -1) return "⛈️";
    if (s.indexOf("rain") !== -1 || s.indexOf("shower") !== -1) return "🌧️";
    if (s.indexOf("snow") !== -1) return "🌨️";
    if (s.indexOf("fog") !== -1) return "🌫️";
    if (s.indexOf("cloud") !== -1 && s.indexOf("partly") !== -1) return "⛅";
    if (s.indexOf("cloud") !== -1 || s.indexOf("overcast") !== -1) return "☁️";
    if (s.indexOf("clear") !== -1 || s.indexOf("sunny") !== -1) return "☀️";
    return "🌤️";
  }

  function loadForecast() {
    if (typeof TEAM === "undefined" || !TEAM.nextSession || !TEAM.weatherGrid) return;
    var host = document.getElementById("forecast");
    if (!host) return;

    var ns = TEAM.nextSession;
    var d = fmtDate(ns.date);
    var when = (ns.label || "Next session") + " · " + d.full +
      " · " + (ns.time || TEAM.defaultTime || "");
    host.style.display = "";
    host.innerHTML = "";
    var line = el("div", { class: "fc-line" },
      '<span class="fc-icon">📅</span><span class="fc-when">' + esc(when) + "</span>");
    var val = el("span", { class: "fc-val" }, "Loading forecast…");
    line.appendChild(val);
    host.appendChild(line);

    var targetHour = to24h(ns.time || TEAM.defaultTime);
    var url = "https://api.weather.gov/gridpoints/" + TEAM.weatherGrid + "/forecast/hourly";

    fetch(url, { headers: { "Accept": "application/geo+json" } })
      .then(function (r) { if (!r.ok) throw new Error("wx " + r.status); return r.json(); })
      .then(function (j) {
        var periods = (j && j.properties && j.properties.periods) || [];
        var match = null;
        for (var i = 0; i < periods.length; i++) {
          var st = periods[i].startTime || "";
          if (st.slice(0, 10) === ns.date) {
            var hr = parseInt(st.slice(11, 13), 10);
            if (hr === targetHour) { match = periods[i]; break; }
            if (!match && hr >= targetHour) match = periods[i]; // nearest after
          }
        }
        if (!match) { val.textContent = "Forecast not available yet (check back closer to the date)."; return; }
        var pop = match.probabilityOfPrecipitation && match.probabilityOfPrecipitation.value;
        val.innerHTML = iconFor(match.shortForecast) + " " +
          '<strong>' + match.temperature + "°" + (match.temperatureUnit || "F") + "</strong> · " +
          esc(match.shortForecast || "") +
          (pop ? ' · ' + pop + '% precip' : "");

        // Apply Sporting LS guideline to the forecast too.
        var rh = match.relativeHumidity && match.relativeHumidity.value;
        var isTstorm = /thunder|t-storm|tstorm/i.test(match.shortForecast || "");
        var g = weatherGuideline({
          tempF: match.temperature, humidity: (rh != null ? rh : null),
          lightning: isTstorm
        });
        if (g) {
          var gb = el("div", { class: "wx-guideline in-forecast",
            style: "border-left-color:" + g.color });
          gb.appendChild(el("span", { class: "wx-g-badge", style: "background:" + g.color },
            esc(g.label)));
          gb.appendChild(el("span", { class: "wx-g-text" }, esc(g.action)));
          host.appendChild(gb);
        }
      })
      .catch(function () {
        val.textContent = "Live forecast unavailable right now.";
      });
  }

  // ---- Location link helper --------------------------------------------------
  // Accepts a location that's a string or { name, map }. Returns an <a> to the
  // map (uses provided map URL, else builds a Google Maps search from the name).
  function locationLink(loc, prefix) {
    if (!loc) return null;
    var name = typeof loc === "string" ? loc : (loc.name || "");
    if (!name) return null;
    var map = (typeof loc === "object" && loc.map) ? loc.map :
      "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(name);
    var a = el("a", { class: "loc-link", href: map, target: "_blank", rel: "noopener" },
      "📍 " + esc((prefix || "") + name));
    return a;
  }

  // ---- Calendar (.ics) export ------------------------------------------------
  function icsDate(dateStr, timeStr) {
    // dateStr "2026-08-04", timeStr "6:00pm" -> "20260804T180000" (local, floating)
    var p = dateStr.split("-");
    var h = to24h(timeStr), min = 0;
    var mm = String(timeStr || "").match(/:(\d{2})/);
    if (mm) min = parseInt(mm[1], 10);
    function z(n){ return (n < 10 ? "0" : "") + n; }
    return p[0] + z(+p[1]) + z(+p[2]) + "T" + z(h) + z(min) + "00";
  }

  function addHours(dateStr, timeStr, hours) {
    var p = dateStr.split("-");
    var d = new Date(+p[0], +p[1]-1, +p[2], to24h(timeStr), 0, 0);
    d.setHours(d.getHours() + hours);
    function z(n){ return (n < 10 ? "0" : "") + n; }
    return d.getFullYear() + z(d.getMonth()+1) + z(d.getDate()) +
      "T" + z(d.getHours()) + z(d.getMinutes()) + "00";
  }

  function buildICS(events) {
    var lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Sporting LS//Team//EN", "CALSCALE:GREGORIAN"];
    events.forEach(function (ev, i) {
      lines.push("BEGIN:VEVENT");
      lines.push("UID:sls-" + ev.date + "-" + i + "@sportingls");
      lines.push("DTSTART:" + icsDate(ev.date, ev.time));
      lines.push("DTEND:" + addHours(ev.date, ev.time, ev.durHours || 1));
      lines.push("SUMMARY:" + icsEsc(ev.title));
      if (ev.location) lines.push("LOCATION:" + icsEsc(ev.location));
      if (ev.desc) lines.push("DESCRIPTION:" + icsEsc(ev.desc));
      lines.push("END:VEVENT");
    });
    lines.push("END:VCALENDAR");
    return lines.join("\r\n");
  }

  function icsEsc(s) {
    return String(s == null ? "" : s)
      .replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
  }

  function downloadICS(filename, text) {
    var blob = new Blob([text], { type: "text/calendar;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  // Gather all schedulable practices + games into calendar events.
  function scheduleEvents() {
    var evs = [];
    var pLoc = TEAM.practiceLocation ? (TEAM.practiceLocation.name || TEAM.practiceLocation) : "";
    (typeof PRACTICES !== "undefined" ? PRACTICES : []).forEach(function (p) {
      if (!p.date) return;
      evs.push({ date: p.date, time: p.time || TEAM.defaultTime, durHours: 1,
        title: TEAM.name + " — Practice", location: pLoc, desc: p.title || "" });
    });
    (typeof GAMES !== "undefined" ? GAMES : []).forEach(function (g) {
      if (!g.date) return;
      var gLoc = g.location || (TEAM.gameLocation ? (TEAM.gameLocation.name || TEAM.gameLocation) : "");
      evs.push({ date: g.date, time: g.time || TEAM.defaultTime, durHours: 1,
        title: TEAM.name + " — Game" + (g.opponent ? " vs. " + g.opponent : ""),
        location: gLoc, desc: "" });
    });
    return evs;
  }

  function wireCalendarButton() {
    var btn = document.getElementById("cal-btn");
    if (!btn) return;
    var evs = scheduleEvents();
    if (!evs.length) { btn.style.display = "none"; return; }
    btn.style.display = "";
    btn.addEventListener("click", function () {
      downloadICS("sporting-ls-schedule.ics", buildICS(evs));
    });
  }

  // ---- Tabs ------------------------------------------------------------------
  var EM_WORD = { practice: "Practices", games: "Games", homework: "Homework", drills: "Drills", roster: "Roster", weather: "Weather Rules" };

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
    if (em) em.textContent = EM_WORD[name] || "Practices";
    if (location.hash.slice(1) !== name) {
      try { history.replaceState(null, "", "#" + name); } catch (e) {}
    }
    if (typeof updateFloatingClose === "function") updateFloatingClose();
  }

  // Apply a team's accent colors by overriding CSS custom properties.
  function applyTheme(theme) {
    if (!theme || typeof document === "undefined" || !document.documentElement) return;
    var root = document.documentElement.style;
    if (!root || !root.setProperty) return;
    // Hero stripes + primary surfaces take the team's primary color.
    if (theme.primary)     { root.setProperty("--grass", theme.primary);
                             root.setProperty("--navy", theme.primary); }
    if (theme.primaryDeep) { root.setProperty("--grass-deep", theme.primaryDeep);
                             root.setProperty("--navy-2", theme.primaryDeep); }
    // Accent (whistle/captain highlights, calendar button, play button).
    if (theme.accent)      root.setProperty("--gold", theme.accent);
    if (theme.accentSoft)  root.setProperty("--sky-bright", theme.accentSoft);
  }

  // ---- Boot ------------------------------------------------------------------
  function init() {
    if (typeof TEAM !== "undefined") {
      if (TEAM.theme) applyTheme(TEAM.theme);
      if (TEAM.name) document.title = "Sporting LS · " + TEAM.name.replace(/^Sporting LS\s*[—-]\s*/, "");
      setText("team-sub", TEAM.name);
      setText("season-tag", TEAM.season);
      setText("league-badge", TEAM.league);
      if (TEAM.coaches && TEAM.coaches.length) setText("coach-list", TEAM.coaches.join(" · "));
      // Venue line: show ONLY the next event's location (practice or game),
      // based on nextSession.type. A game may set its own field via ns.location.
      var venueEl = document.getElementById("venue");
      if (venueEl) {
        venueEl.innerHTML = "";
        var ns = TEAM.nextSession || {};
        var isGame = ns.type === "game";
        var loc = ns.location ||
          (isGame ? TEAM.gameLocation : TEAM.practiceLocation);
        var link = locationLink(loc, (isGame ? "Game: " : "Practice: "));
        if (link) venueEl.appendChild(link);
        else if (TEAM.venue) venueEl.textContent = "📍 " + TEAM.venue;
      }
    }

    loadForecast();
    wireCalendarButton();

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

    // Weather guidelines
    renderGuidelines("weather-list");

    // Wire tab buttons
    var btns = document.querySelectorAll(".tab-btn");
    for (var k = 0; k < btns.length; k++) {
      (function (b) {
        b.addEventListener("click", function () { showTab(b.getAttribute("data-tab")); });
      })(btns[k]);
    }

    var start = location.hash.slice(1);
    showTab(EM_WORD[start] ? start : "practice");

    // Floating close button: recheck on scroll / resize.
    ensureFloatBtn();
    if (typeof window !== "undefined" && window.addEventListener) {
      window.addEventListener("scroll", updateFloatingClose, { passive: true });
      window.addEventListener("resize", updateFloatingClose);
    }
    updateFloatingClose();
  }

  function setText(id, txt) {
    var e = document.getElementById(id);
    if (e && txt != null) e.textContent = txt;
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
