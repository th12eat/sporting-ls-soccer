/* =============================================================================
   TEAM DATA  —  this is the main file you edit.   (3rd Grade Girls)
   =============================================================================

   FOUR lists live in this file:
     TEAM       — team name, coaches, default practice time, venue
     PRACTICES  — practice history (newest first) with drills + homework inline
     GAMES      — game history (newest first)
     ROSTER     — each player + season stats

   -------------------------------------------------------------------------
   ADD A NEW PRACTICE
   -------------------------------------------------------------------------
   1. Copy a { ... } block from PRACTICES and paste it at the TOP (newest first).
   2. Edit date, title, summary, attendance, warm-up items, drills, homework.
   3. time:     leave it off to use TEAM.defaultTime (6:00pm). Set it only if
                a practice starts at a different time.
   4. weather:  after a practice, fill in what it was: { emoji, tempF, condition }.
   5. FORECAST: when you add a NEW practice, set the PREVIOUS (now-past) one's
                weather to what actually happened, and put the FORECAST for the
                new/upcoming practice in its weather field (mark it a forecast in
                the condition text, e.g. "Forecast: Sunny"). See notes at bottom.

   DRILL / HOMEWORK media:
     - Give a drill BOTH a `diagram` and a `youtube` link and the page shows a
       Diagram ⇄ Video toggle (defaults to the diagram).
     - Only one of them? It just shows that one.

   YOUTUBE: paste any normal link (watch?v=, youtu.be/, /shorts/).
   ============================================================================= */

const TEAM = {
  name: "Sporting LS — 3rd Grade Girls",
  league: "Sporting LS Recreation League",
  season: "Fall 2026",
  coaches: ["Coach Thomas", "Coach John"],
  defaultTime: "6:00pm",

  // Team accent colors (3rd grade = black & mustard yellow). These tint the
  // hero stripes, badges, and highlight accents. Leave off for the default look.
  theme: { primary: "#1a1a1a", primaryDeep: "#000000", accent: "#e6b422", accentSoft: "#f4d774", onPrimary: "#ffffff" },

  // Locations. `map` can be a full Google Maps link, or leave it off and the
  // page will build a search link from the name. Practices are at one place;
  // games are at Legacy Park but the field # varies week to week (set per game).
  practiceLocation: {
    name: "Legacy Park Practice Soccer Fields",
    map: "https://www.google.com/maps/search/?api=1&query=Legacy+Park+Practice+Soccer+Fields+Lee%27s+Summit+MO",
  },
  gameLocation: {
    name: "Legacy Park Soccer Fields",
    map: "https://www.google.com/maps/search/?api=1&query=Legacy+Park+Soccer+Fields+Lee%27s+Summit+MO",
  },
  // Shown in the hero as the general venue line.
  venue: "Practices: Legacy Park Practice Soccer Fields · Lee's Summit, MO",

  // Live forecast widget (National Weather Service — no API key needed).
  // Set the NEXT upcoming event here. type: "practice" or "game" controls which
  // location the header links to. For a game, you can add location: {name, map}.
  // weatherGrid is the NWS grid for Legacy Park, Lee's Summit MO — don't change it.
  weatherGrid: "EAX/51,43",
  nextSession: { label: "Next practice", type: "practice", date: "2026-08-04", time: "6:00pm" },
};

/* ---- PRACTICES (newest first; the top one shows as "This week") ---------- */
const PRACTICES = [
  {
    date: "2026-07-28",
    title: "Throw-ins, Rondo & choosing ground vs. air",
    // time: "6:00pm",  // omitted -> uses TEAM.defaultTime
    weather: { emoji: "☀️", tempF: 88, condition: "Clear & hot" },
    summary:
      "A hot one with lots of water breaks! We opened with names, schools, and favorite ice cream, then dug into throw-ins, keep-away (Rondo), and deciding on purpose whether to play the ball on the ground or in the air.",

    attendance: {
      present: ["Nora", "Nori", "Fiona", "Marlie", "Paige", "Adi", "Hailey", "Rose", "Riley"],
      absent: ["Orion", "Noor", "Reina"],
    },

    warmup: {
      items: [
        "Name / school / favorite ice cream circle",
        "Throw-in demonstration (proper form)",
        "Walk-through: roles & spacing on the field",
        "Dynamic movement + water breaks",
      ],
    },

    drills: [
      {
        name: "3v1 & 4v1 Rondo (Keep-Away)",
        focus: "Passing under pressure, spacing, and supporting angles",
        youtube: "https://www.youtube.com/watch?v=VxTKNvfnyLs",
        diagram: "drills/rondo.svg",
        steps: [
          "Players form a circle/triangle with one defender in the middle.",
          "Keep the ball away from the defender with quick, accurate passes.",
          "Move to an open angle so your teammate always has a pass.",
          "When the defender touches the ball, swap her out.",
        ],
      },
      {
        name: "Ground vs. Air — On Demand",
        focus: "Choosing to drive the ball low OR lift it, to a target distance",
        youtube: "https://www.youtube.com/watch?v=xIISidbW4TY",
        diagram: "drills/ground-air.svg",
        steps: [
          "Ground ball: strike through the middle of the ball, ankle locked.",
          "Air ball: get your foot under the ball and lean back slightly.",
          "Coach calls 'ground!' or 'air!' — you choose the right technique.",
          "Work up to a target distance (about 5, then 10 steps).",
        ],
      },
      {
        name: "Roll / Pullback",
        focus: "Changing direction to protect the ball and turn away from pressure",
        youtube: "https://www.youtube.com/watch?v=fN4L3ypTTAY",
        diagram: "drills/pullback.svg",
        steps: [
          "Place the sole of your foot on top of the ball, toe up.",
          "Roll the ball backward under your foot.",
          "Turn your body and accelerate away with the next touch.",
        ],
      },
      {
        name: "Partner Passing — Every Surface",
        focus: "Inside-foot passing on the ground & in the air, plus outside-of-foot",
        youtube: "https://www.youtube.com/watch?v=VbeasV7u_UQ",
        diagram: "drills/passing-gates.svg",
        steps: [
          "Pick a partner and stand about 8–10 feet apart.",
          "Pass on the ground with the INSIDE of your foot.",
          "Try a gentle lofted pass in the AIR.",
          "Then pass with the OUTSIDE of your foot.",
          "Communicate — call your partner's name before you pass.",
        ],
      },
      {
        name: "Player Showcase — New Moves",
        focus: "Confidence & learning from teammates",
        collate: false,   // shows inline here, but not on the Drills tab
        youtube: "",
        diagram: "",
        steps: [
          "Paige and Adi showed the team new soccer moves they learned recently.",
          "Everyone tried the moves together — great job being brave and teaching!",
        ],
      },
    ],

    scrimmage: {
      description:
        "We finished with a 10-minute scrimmage to put it all together — using throw-ins to restart, and looking for good spacing between teammates.",
      duration: "10 minutes",
    },

    homework: [
      {
        name: "Head Up + Ball Control",
        focus: "Dribble with control while scanning the field",
        concept:
          "In a game the field is always changing — teammates move, defenders close in. If your eyes are glued to the ball you can't see the pass or the space. Great players feel the ball with their feet so their eyes are free to READ the game.",
        youtube: "",
        diagram: "drills/dribble-gates.svg",
        time: "10 min",
        equipment: "1 ball + a few markers (cones, cups, shoes)",
        steps: [
          "Dribble around the yard with small, soft touches.",
          "Every few touches, glance UP and call out something you see.",
          "Have a parent hold up fingers — dribble and shout the number.",
        ],
        indoor:
          "Use a rolled-up sock or a low-bounce ball (like a racquetball) on carpet. Softer touches on carpet actually build better control. Have someone hold up fingers across the room for you to read while you tap the ball with your soles.",
      },
      {
        name: "Ground or Air — Your Choice",
        focus: "Consciously deciding where to put the ball, using foot & body position",
        concept:
          "A pass on the ground is faster and easier for a teammate to control. A ball in the air can travel OVER a defender's foot. Good players decide on purpose which one the moment calls for — it's not luck, it's a choice you make with your body position.",
        youtube: "https://www.youtube.com/watch?v=xIISidbW4TY",
        diagram: "drills/ground-air.svg",
        time: "10 min",
        equipment: "1 ball + a wall or a partner",
        steps: [
          "Lean OVER the ball + strike the middle = it stays on the GROUND.",
          "Lean BACK + get your foot under it = it goes in the AIR.",
          "Say out loud 'ground' or 'air' BEFORE each kick, then make it happen.",
          "Pick a target (a tree, a cone) about 5–10 steps away.",
        ],
        indoor:
          "Ground passes only indoors! Use a soft/foam ball against a wall or a couch cushion 'goal'. Practice the lean-over-the-ball body position and inside-foot contact slowly. Save the 'air' half for outside.",
      },
      {
        name: "Know Your Position",
        focus: "Our 7v7 shape (1–2–3) and how it maps to a full 11v11 team",
        concept:
          "Everyone spreads out to cover the field so we're not all chasing the ball. We play 7v7 with a 1–2–3 shape: 1 Forward up top, 2 Midfielders (LM, RM) to connect, and 3 Backs (LB, CB, RB) plus a Goalie to defend. The big-kid 11v11 game adds wings and splits the middle midfielder into an attacking CAM and a defending CDM — use the toggle to compare. When everyone holds their spot, we have more passing options and fewer gaps.",
        youtube: "",
        // Toggle: our 7v7 shape shows first (default); 11v11 for comparison.
        diagrams: [
          { label: "Our 7v7 (1–2–3)", src: "drills/positions-7v7.svg" },
          { label: "Full 11v11", src: "drills/positions-11v11.svg" },
        ],
        time: "5 min",
        equipment: "Just the diagram (and a paper field if you want)",
        steps: [
          "Our shape: F  /  LM · RM  /  LB · CB · RB  /  GK.",
          "Point to each spot and say the position name out loud.",
          "Ask: 'If I'm Right Mid, do I stay wide or run to the middle?' (Wide, then support!)",
          "Name one job per line: attack, connect, defend, guard the goal.",
          "Toggle to 11v11: see how CM splits into CAM (attack) and CDM (defend).",
        ],
        indoor:
          "Lay out paper on the floor in our 7v7 shape (F; LM, RM; LB, CB, RB; GK). Stand on a spot, name the position, and say its job. Move like that position would move.",
      },
      {
        name: "Throw-Ins",
        focus: "A legal, accurate throw-in to restart play",
        concept:
          "When the ball goes out on the sideline, a throw-in gives it back to a team. It's a free chance to keep possession — but only if it's legal. A foul throw hands the ball to the other team, so good form matters.",
        youtube: "https://www.youtube.com/watch?v=Umku3eCWg9Y",
        diagram: "drills/throw-in.svg",
        time: "5 min",
        equipment: "1 ball + a partner or wall",
        steps: [
          "Hold the ball with BOTH hands, bring it behind your head.",
          "Keep BOTH feet on the ground (no lifting or stepping over the line).",
          "Throw in one smooth motion over the top of your head.",
          "Aim for your partner's feet, then farther each time.",
        ],
        indoor:
          "Use a light or soft ball and throw to a partner sitting on the couch, or toward a spot on the wall. Focus on form: ball behind the head, both hands even, both feet planted.",
      },
    ],
  },
];

/* ---- GAMES (newest first). No games yet — add when the season starts. ----
   Example shape:
   {
     date: "2026-09-05",
     opponent: "Blue Thunder",
     homeAway: "Home",
     location: "Legacy Park Field 3",
     time: "9:00am",                              // omit -> TEAM.defaultTime
     weather: { emoji: "⛅", tempF: 72, condition: "Partly cloudy" },
     scoreUs: 3, scoreThem: 1,                     // omit both if not played
     summary: "Great teamwork and lots of shots on goal!",
     scorers: ["Goal: Nora (assist Adi)", "Goal: Paige"],
   }
*/
const GAMES = [];

/* ---- ROSTER --------------------------------------------------------------
   goalie / captain use one of: "yes" (checkmark), "no" (X, opted out),
   "" (neutral dash, not yet). Captains never use "no" (everyone will be
   captain at some point). number is optional (jersey #); null shows a ball. */
const ROSTER = [
  { name: "Nora",   number: null, goals: 0, assists: 0, saves: 0, games: 0, practices: 1, goalie: "", captain: "" },
  { name: "Nori",   number: null, goals: 0, assists: 0, saves: 0, games: 0, practices: 1, goalie: "", captain: "" },
  { name: "Fiona",  number: null, goals: 0, assists: 0, saves: 0, games: 0, practices: 1, goalie: "", captain: "" },
  { name: "Marlie", number: null, goals: 0, assists: 0, saves: 0, games: 0, practices: 1, goalie: "", captain: "" },
  { name: "Paige",  number: null, goals: 0, assists: 0, saves: 0, games: 0, practices: 1, goalie: "", captain: "" },
  { name: "Adi",    number: null, goals: 0, assists: 0, saves: 0, games: 0, practices: 1, goalie: "", captain: "" },
  { name: "Hailey", number: null, goals: 0, assists: 0, saves: 0, games: 0, practices: 1, goalie: "", captain: "" },
  { name: "Rose",   number: null, goals: 0, assists: 0, saves: 0, games: 0, practices: 1, goalie: "", captain: "" },
  { name: "Riley",  number: null, goals: 0, assists: 0, saves: 0, games: 0, practices: 1, goalie: "", captain: "" },
  { name: "Orion",  number: null, goals: 0, assists: 0, saves: 0, games: 0, practices: 0, goalie: "", captain: "" },
  { name: "Noor",   number: null, goals: 0, assists: 0, saves: 0, games: 0, practices: 0, goalie: "", captain: "" },
  { name: "Reina",  number: null, goals: 0, assists: 0, saves: 0, games: 0, practices: 0, goalie: "", captain: "" },
];

/* -----------------------------------------------------------------------------
   WEATHER WORKFLOW (per coach's note):
   Each time you add a new practice, do two things:
     (1) Update the practice that just PASSED so its weather = what actually
         happened (real temp + condition).
     (2) On the NEW upcoming practice, put the FORECAST — e.g.
         weather: { emoji: "⛅", tempF: 90, condition: "Forecast: hot, PM storms" }
         Then after that practice, come back and replace it with the actual.
   Legacy Park Soccer Fields, Lee's Summit MO. Default practice time 6:00pm.
----------------------------------------------------------------------------- */
