/* Renders the page from data.js. You should not need to edit this file. */

(function () {
  "use strict";

  // ---- Pull a YouTube video id out of any normal YouTube link ----------------
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
    } catch (e) {
      id = String(url).trim();
    }
    if (!id) return null;
    return { id: id, start: start };
  }

  function parseTime(t) {
    if (/^\d+$/.test(t)) return parseInt(t, 10);
    var m = t.match(/(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/);
    if (!m) return 0;
    return (parseInt(m[1] || 0, 10) * 3600) +
           (parseInt(m[2] || 0, 10) * 60) +
           parseInt(m[3] || 0, 10);
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

  // A YouTube video + optional diagram, packaged into the media column.
  function buildMedia(item) {
    var yt = parseYouTube(item.youtube);
    if (!yt && !item.diagram) return null;
    var media = el("div", { class: "media" });

    if (yt) {
      var vw = el("div", { class: "video-wrap" });
      var facade = el("button", {
        class: "video-facade",
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
    }

    if (item.diagram) {
      var dg = el("div", { class: "diagram-wrap" });
      dg.appendChild(el("img", { src: item.diagram, alt: item.name + " diagram", loading: "lazy" }));
      dg.appendChild(el("div", { class: "diagram-cap" }, "Setup diagram"));
      media.appendChild(dg);
    }
    return media;
  }

  function stepsList(steps) {
    var ol = el("ol", { class: "steps" });
    (steps || []).forEach(function (s) { ol.appendChild(el("li", null, esc(s))); });
    return ol;
  }

  // ---- A practice drill (main skill work) -----------------------------------
  function renderDrill(drill) {
    var media = buildMedia(drill);
    var wrap = el("div", { class: "drill" + (media ? " has-media" : "") });

    var text = el("div");
    text.appendChild(el("div", { class: "drill-name" },
      '<span class="ball">⚽</span>' + esc(drill.name)));
    if (drill.focus) text.appendChild(el("span", { class: "drill-focus" }, esc(drill.focus)));
    if (drill.steps && drill.steps.length) text.appendChild(stepsList(drill.steps));
    wrap.appendChild(text);

    if (media) wrap.appendChild(media);
    return wrap;
  }

  // ---- A homework item (game theory + drill + indoor option) ----------------
  function renderHomework(hw) {
    var media = buildMedia(hw);
    var wrap = el("div", { class: "drill homework" + (media ? " has-media" : "") });

    var text = el("div");
    text.appendChild(el("div", { class: "drill-name" },
      '<span class="ball">🎯</span>' + esc(hw.name)));
    if (hw.focus) text.appendChild(el("span", { class: "drill-focus" }, esc(hw.focus)));

    // meta chips: time + equipment
    if (hw.time || hw.equipment) {
      var meta = el("div", { class: "hw-meta" });
      if (hw.time) meta.appendChild(el("span", { class: "chip" }, "⏱ " + esc(hw.time)));
      if (hw.equipment) meta.appendChild(el("span", { class: "chip" }, "🧰 " + esc(hw.equipment)));
      text.appendChild(meta);
    }

    // the "why" — game theory
    if (hw.concept) {
      var why = el("div", { class: "concept" });
      why.appendChild(el("span", { class: "concept-label" }, "Why it matters"));
      why.appendChild(el("p", null, esc(hw.concept)));
      text.appendChild(why);
    }

    if (hw.steps && hw.steps.length) text.appendChild(stepsList(hw.steps));

    // indoor / limited-equipment alternative
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

  // ---- Small helper: a labeled section band inside a practice ---------------
  function band(label, emoji) {
    return el("div", { class: "band" },
      '<span class="band-emoji">' + emoji + '</span>' + esc(label));
  }

  // ---- Attendance ------------------------------------------------------------
  function renderAttendance(att) {
    if (!att || ((!att.present || !att.present.length) && (!att.absent || !att.absent.length)))
      return null;
    var wrap = el("div", { class: "attendance" });
    if (att.present && att.present.length) {
      var p = el("div", { class: "att-group present" });
      p.appendChild(el("div", { class: "att-title" },
        "Present · " + att.present.length));
      var chips = el("div", { class: "att-chips" });
      att.present.forEach(function (n) { chips.appendChild(el("span", { class: "name-chip" }, esc(n))); });
      p.appendChild(chips);
      wrap.appendChild(p);
    }
    if (att.absent && att.absent.length) {
      var a = el("div", { class: "att-group absent" });
      a.appendChild(el("div", { class: "att-title" }, "Missing · " + att.absent.length));
      var chips2 = el("div", { class: "att-chips" });
      att.absent.forEach(function (n) { chips2.appendChild(el("span", { class: "name-chip out" }, esc(n))); });
      a.appendChild(chips2);
      wrap.appendChild(a);
    }
    return wrap;
  }

  // ---- Warm-up ---------------------------------------------------------------
  function renderWarmup(w) {
    if (!w || (!w.description && !(w.items && w.items.length) && !w.diagram)) return null;
    var media = w.diagram ? buildMedia({ name: "Warm-up", youtube: "", diagram: w.diagram }) : null;
    var wrap = el("div", { class: "drill" + (media ? " has-media" : "") });
    var text = el("div");
    if (w.description) text.appendChild(el("p", { class: "summary flush" }, esc(w.description)));
    if (w.items && w.items.length) {
      var ul = el("ul", { class: "tick-list" });
      w.items.forEach(function (i) { ul.appendChild(el("li", null, esc(i))); });
      text.appendChild(ul);
    }
    wrap.appendChild(text);
    if (media) wrap.appendChild(media);
    return wrap;
  }

  // ---- One practice card -----------------------------------------------------
  function renderPractice(p, index) {
    var d = fmtDate(p.date);
    var card = el("div", { class: "practice" + (index === 0 ? " this-week open" : "") });

    var header = el("div", { class: "practice-header", role: "button", tabindex: "0",
      "aria-expanded": index === 0 ? "true" : "false" });
    header.appendChild(el("div", { class: "cal" },
      '<div class="mo">' + d.mo + '</div><div class="day">' + d.day + '</div>'));
    var titles = el("div", { class: "practice-titles" });
    titles.appendChild(el("h3", null,
      esc(p.title) + (index === 0 ? '<span class="thisweek-pill">This week</span>' : "")));
    titles.appendChild(el("div", { class: "when" }, d.full));
    header.appendChild(titles);
    header.appendChild(el("div", { class: "chevron" }, "▾"));
    card.appendChild(header);

    var body = el("div", { class: "practice-body" });
    var inner = el("div", { class: "inner" });

    if (p.summary) inner.appendChild(el("p", { class: "summary" }, esc(p.summary)));

    // Attendance
    var att = renderAttendance(p.attendance);
    if (att) inner.appendChild(att);

    // Warm-up
    var wu = renderWarmup(p.warmup);
    if (wu) { inner.appendChild(band("Warm-up & Stretching", "🤸")); inner.appendChild(wu); }

    // Drills
    if (p.drills && p.drills.length) {
      inner.appendChild(band("Drills", "⚽"));
      p.drills.forEach(function (dr) { inner.appendChild(renderDrill(dr)); });
    }

    // Scrimmage
    if (p.scrimmage && (p.scrimmage.description || p.scrimmage.duration)) {
      inner.appendChild(band("Scrimmage", "🥅"));
      var sc = el("div", { class: "drill scrimmage" });
      var st = el("div");
      if (p.scrimmage.duration)
        st.appendChild(el("span", { class: "drill-focus" }, "⏱ " + esc(p.scrimmage.duration)));
      if (p.scrimmage.description)
        st.appendChild(el("p", { class: "summary flush" }, esc(p.scrimmage.description)));
      sc.appendChild(st);
      inner.appendChild(sc);
    }

    // Homework
    if (p.homework && p.homework.length) {
      inner.appendChild(band("Homework", "🏡"));
      if (p.homeworkIntro)
        inner.appendChild(el("p", { class: "summary hw-intro" }, esc(p.homeworkIntro)));
      p.homework.forEach(function (hw) { inner.appendChild(renderHomework(hw)); });
    }

    body.appendChild(inner);
    card.appendChild(body);

    function toggle() {
      var isOpen = card.classList.toggle("open");
      header.setAttribute("aria-expanded", isOpen ? "true" : "false");
    }
    header.addEventListener("click", toggle);
    header.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
    });
    return card;
  }

  // ---- Boot ------------------------------------------------------------------
  function init() {
    if (typeof TEAM !== "undefined") {
      document.title = "Team Homework · " + TEAM.name;
      setText("team-sub", TEAM.name);
      setText("coach-note", TEAM.coachNote);
      setText("season-tag", TEAM.season);
      setText("league-badge", TEAM.league);
    }
    var root = document.getElementById("practices");
    root.innerHTML = "";
    (typeof PRACTICES !== "undefined" ? PRACTICES : []).forEach(function (p, i) {
      root.appendChild(renderPractice(p, i));
    });
  }

  function setText(id, txt) {
    var e = document.getElementById(id);
    if (e && txt != null) e.textContent = txt;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
