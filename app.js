/* Renders the page from data.js. You should not need to edit this file. */

(function () {
  "use strict";

  // ---- Pull a YouTube video id out of any normal YouTube link ----------------
  // Handles watch?v=, youtu.be/, /shorts/, /embed/, and keeps a start time (&t=).
  function parseYouTube(url) {
    if (!url) return null;
    var id = null;
    var start = 0;

    try {
      var u = new URL(url);
      // start time (t=90s or t=90 or start=90)
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
      // Not a full URL — maybe they pasted just the id
      id = String(url).trim();
    }
    if (!id) return null;
    return { id: id, start: start };
  }

  function parseTime(t) {
    // "90", "90s", "1m30s", "1h2m3s"
    if (/^\d+$/.test(t)) return parseInt(t, 10);
    var m = t.match(/(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/);
    if (!m) return 0;
    return (parseInt(m[1] || 0, 10) * 3600) +
           (parseInt(m[2] || 0, 10) * 60) +
           parseInt(m[3] || 0, 10);
  }

  function fmtDate(iso) {
    // iso "2026-09-15" -> {mo:"SEP", day:"15", full:"Mon, Sep 15, 2026"}
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

  // ---- Build one drill block -------------------------------------------------
  function renderDrill(drill) {
    var yt = parseYouTube(drill.youtube);
    var hasMedia = !!(yt || drill.diagram);

    var wrap = el("div", { class: "drill" + (hasMedia ? " has-media" : "") });

    // left: text
    var text = el("div");
    var name = el("div", { class: "drill-name" },
      '<span class="ball">⚽</span>' + esc(drill.name));
    text.appendChild(name);
    if (drill.focus) text.appendChild(el("span", { class: "drill-focus" }, esc(drill.focus)));

    if (drill.steps && drill.steps.length) {
      var ol = el("ol", { class: "steps" });
      drill.steps.forEach(function (s) { ol.appendChild(el("li", null, esc(s))); });
      text.appendChild(ol);
    }
    wrap.appendChild(text);

    if (!hasMedia) return wrap;

    // right: media
    var media = el("div", { class: "media" });

    if (yt) {
      var vw = el("div", { class: "video-wrap" });
      var facade = el("button", {
        class: "video-facade",
        "aria-label": "Play video: " + esc(drill.name),
        style: "background-image:url('https://i.ytimg.com/vi/" + yt.id + "/hqdefault.jpg')"
      }, '<span class="play-btn"></span>');

      facade.addEventListener("click", function () {
        var src = "https://www.youtube-nocookie.com/embed/" + yt.id +
          "?autoplay=1&rel=0&modestbranding=1" + (yt.start ? "&start=" + yt.start : "");
        var iframe = el("iframe", {
          src: src,
          title: esc(drill.name),
          allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
          allowfullscreen: "true"
        });
        vw.innerHTML = "";
        vw.appendChild(iframe);
      });

      vw.appendChild(facade);
      media.appendChild(vw);
    }

    if (drill.diagram) {
      var dg = el("div", { class: "diagram-wrap" });
      dg.appendChild(el("img", {
        src: drill.diagram, alt: drill.name + " diagram", loading: "lazy"
      }));
      dg.appendChild(el("div", { class: "diagram-cap" }, "Setup diagram"));
      media.appendChild(dg);
    }

    wrap.appendChild(media);
    return wrap;
  }

  // ---- Build one practice card ----------------------------------------------
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
    (p.drills || []).forEach(function (dr) { inner.appendChild(renderDrill(dr)); });
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
