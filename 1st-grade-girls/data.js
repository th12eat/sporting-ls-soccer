/* =============================================================================
   TEAM DATA  —  this is the main file you edit.   (1st Grade Girls)
   =============================================================================

   Same structure as the 3rd Grade page. FOUR lists:
     TEAM       — team name, coaches, default practice time, venue
     PRACTICES  — practice history (newest first), drills + homework inline
     GAMES      — game history (newest first)
     ROSTER     — each player + season stats

   This page is a starting point — add real practices, games, and players as
   the season goes. See the 3rd-grade data.js for a fully filled-in example.

   time:    leave off a practice/game to use TEAM.defaultTime (6:00pm).
   weather: after each session fill in { emoji, tempF, condition }. When you add
            a new upcoming practice, put the FORECAST there (e.g.
            condition: "Forecast: Sunny") and update it to the actual afterward.
   media:   a drill with BOTH a diagram and a youtube link shows a Diagram/Video
            toggle (defaults to the diagram).
   ============================================================================= */

const TEAM = {
  name: "Sporting LS — 1st Grade Girls",
  league: "Sporting LS Recreation League",
  season: "Fall 2026",
  coaches: ["Coach Thomas", "Coach Stephen", "Coach Lindsey"],
  defaultTime: "6:00pm",

  // Locations. Practices are at Hawthorne Hill Elementary; games at Legacy Park
  // (the field # varies week to week — set g.location per game when known).
  practiceLocation: {
    name: "Hawthorne Hill Elementary",
    map: "https://www.google.com/maps/search/?api=1&query=Hawthorne+Hill+Elementary+Lee%27s+Summit+MO",
  },
  gameLocation: {
    name: "Legacy Park Soccer Fields",
    map: "https://www.google.com/maps/search/?api=1&query=Legacy+Park+Soccer+Fields+Lee%27s+Summit+MO",
  },
  venue: "Practices: Hawthorne Hill Elementary · Lee's Summit, MO",

  // Practices are on WEDNESDAYS for this team.
  practiceDay: "Wednesday",

  // 4v4 with NO goalie — don't track Saves or Goalie on the roster.
  rosterFields: ["goals", "assists", "games", "practices", "captain"],

  // Live forecast widget (National Weather Service — no API key needed).
  // Set the NEXT upcoming event here. type: "practice" or "game" controls which
  // location the header links to. For a game, you can add location: {name, map}.
  // weatherGrid is the NWS grid for the Lee's Summit area — don't change it.
  weatherGrid: "EAX/51,43",
  nextSession: { label: "Next practice", type: "practice", date: "2026-08-05", time: "6:00pm" },
};

/* ---- PRACTICES (newest first; the top one shows as "This week") ---------- */
const PRACTICES = [
  {
    date: "2026-07-22",
    title: "First practice — getting to know the ball (and each other!)",
    weather: { emoji: "⛅", tempF: 77, condition: "Mostly cloudy" },
    summary:
      "Our very first practice! We got to know each other, played some fun chase-and-dribble games, worked on passing and leading a teammate, took some shots, and finished with a scrimmage.",

    attendance: {
      present: ["Ella", "Mia", "Bella", "Morgan", "Sutton", "Zuri", "Noelle", "Caroline", "Annistyn", "Aria"],
      absent: ["Evalynn"],
    },

    warmup: {
      items: [
        "Circle: each player shared her name, school, and favorite ice cream",
        "Light movement to get warm",
      ],
    },

    drills: [
      {
        name: "\"Elsa\" (Freeze-Tag Keep-Away)",
        focus: "Dribbling under pressure, protecting the ball, and helping teammates",
        youtube: "",
        diagram: "",
        steps: [
          "Everyone has a ball EXCEPT the 1–3 chosen 'Elsas' (the attackers).",
          "The Elsas try to kick other players' balls out past the boundary.",
          "If YOUR ball goes out, go get it, come back in, then hold it over your head and spread your feet — you're 'frozen'.",
          "A teammate un-freezes you by dribbling their ball through your spread feet.",
          "Game ends when time runs out (players with balls win!) OR the Elsas freeze everyone.",
        ],
      },
      {
        name: "Sharks & Minnows",
        focus: "Dribbling at speed while keeping control and dodging",
        youtube: "",
        diagram: "",
        steps: [
          "'Minnows' each start with a ball on one side; 1–2 'sharks' are in the middle.",
          "On 'go', minnows dribble across without losing their ball to a shark.",
          "If a shark kicks your ball out, you become a shark too.",
          "Last minnow with a ball wins!",
        ],
      },
      {
        name: "Lead & Pass (Moving Partners)",
        focus: "Passing to a moving teammate and leading the pass ahead of them",
        youtube: "",
        diagram: "",
        steps: [
          "Partners line up about 8 feet apart, one line has the ball.",
          "Jog down the field together, passing back and forth.",
          "Pass slightly AHEAD of your partner so they run onto it — don't make them stop.",
          "Switch who's leading as you go.",
        ],
      },
      {
        name: "Shooting — Give & Go with Coach",
        focus: "Passing, running onto a return pass, and shooting",
        youtube: "",
        diagram: "",
        steps: [
          "Pass the ball to the coach.",
          "Coach immediately passes it back, leading you toward the goal.",
          "Run onto the ball and take your shot!",
        ],
      },
    ],

    scrimmage: {
      description:
        "We finished with a 10-minute scrimmage to put it all together and just play!",
      duration: "10 minutes",
    },

    homework: [],
  },
];

/* ---- GAMES (newest first). Add when the season starts. ------------------- */
const GAMES = [];

/* ---- ROSTER --------------------------------------------------------------
   goalie / captain: "yes" (check), "no" (X, opted out — captain never uses no),
   "" (neutral dash). number optional (jersey #); null shows a ball.
   Add the 1st-grade players here.                                            */
const ROSTER = [
  { name: "Ella",     number: null, goals: 0, assists: 0, games: 0, practices: 1, captain: "" },
  { name: "Mia",      number: null, goals: 0, assists: 0, games: 0, practices: 1, captain: "" },
  { name: "Bella",    number: null, goals: 0, assists: 0, games: 0, practices: 1, captain: "" },
  { name: "Evalynn",  number: null, goals: 0, assists: 0, games: 0, practices: 0, captain: "" },
  { name: "Morgan",   number: null, goals: 0, assists: 0, games: 0, practices: 1, captain: "" },
  { name: "Sutton",   number: null, goals: 0, assists: 0, games: 0, practices: 1, captain: "" },
  { name: "Zuri",     number: null, goals: 0, assists: 0, games: 0, practices: 1, captain: "" },
  { name: "Noelle",   number: null, goals: 0, assists: 0, games: 0, practices: 1, captain: "" },
  { name: "Caroline", number: null, goals: 0, assists: 0, games: 0, practices: 1, captain: "" },
  { name: "Annistyn", number: null, goals: 0, assists: 0, games: 0, practices: 1, captain: "" },
  { name: "Aria",     number: null, goals: 0, assists: 0, games: 0, practices: 1, captain: "" },
];
