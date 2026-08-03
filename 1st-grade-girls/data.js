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

  // Live forecast widget (National Weather Service — no API key needed).
  // Set the NEXT upcoming event here. type: "practice" or "game" controls which
  // location the header links to. For a game, you can add location: {name, map}.
  // weatherGrid is the NWS grid for the Lee's Summit area — don't change it.
  weatherGrid: "EAX/51,43",
  nextSession: { label: "Next practice", type: "practice", date: "2026-08-05", time: "6:00pm" },
};

/* ---- PRACTICES (newest first). Add your first practice here. -------------
   Copy a block from the 3rd-grade data.js as a template. Example shape:
   {
     date: "2026-08-15",
     title: "First practice — meeting the ball",
     weather: { emoji: "☀️", tempF: 90, condition: "Sunny" },
     summary: "...",
     attendance: { present: [], absent: [] },
     warmup: { items: ["Jog", "Toe-taps", "Stretch"] },
     drills: [ { name, focus, youtube, diagram, steps: [] } ],
     scrimmage: { description: "...", duration: "10 minutes" },
     homeworkIntro: "...",
     homework: [ { name, focus, concept, youtube, diagram, time, equipment, steps: [], indoor } ],
   }
*/
const PRACTICES = [];

/* ---- GAMES (newest first). Add when the season starts. ------------------- */
const GAMES = [];

/* ---- ROSTER --------------------------------------------------------------
   goalie / captain: "yes" (check), "no" (X, opted out — captain never uses no),
   "" (neutral dash). number optional (jersey #); null shows a ball.
   Add the 1st-grade players here.                                            */
const ROSTER = [
  // { name: "Player", number: null, goals: 0, assists: 0, saves: 0, games: 0, practices: 0, goalie: "", captain: "" },
];
