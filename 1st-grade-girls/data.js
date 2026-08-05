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
  socialManager: "Rachel Mitchell",
  defaultTime: "6:00pm",

  // Team accent colors (1st grade = green & white). These tint the hero
  // stripes, badges, and highlight accents. Leave off for the default look.
  theme: { primary: "#1b7a3d", primaryDeep: "#125c2c", accent: "#ffffff", accentSoft: "#d8f0df", onPrimary: "#ffffff" },

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
    date: "2026-08-05",
    title: "Offense vs. defense (no goalie!), body position, shooting & passing",
    // Forecast (upcoming practice) — replace with the actual after we play.
    weather: { emoji: "⛈️", tempF: 85, condition: "Forecast: chance of storms", humidity: 67 },
    summary:
      "This week we'll learn how to split into offense and defense with no goalie — where to stand and how to hustle back. We'll practice good body position (using your body without pushing), then do a shooting drill and a passing drill, and finish with a scrimmage.",

    attendance: { present: [], absent: [] },

    warmup: {
      items: [
        "Dribbling warm-up",
        "Quick chat: which way are we going? Where's our goal?",
      ],
    },

    drills: [
      {
        name: "Offense & Defense — No Goalie",
        focus: "Spreading out into 2 up / 2 back, and hustling to defend",
        youtube: "",
        diagram: "drills/split-def-off.svg",
        steps: [
          "2 players push up to attack, 2 stay back to defend.",
          "Attackers: look for space and go toward THEIR goal.",
          "Defenders: stay between the ball and OUR goal — with no goalie, hustle back fast!",
          "When we win the ball, attackers run forward; when we lose it, everyone sprints back.",
        ],
      },
      {
        name: "Body Position — Use Your Body (Nicely!)",
        focus: "Staying strong on the ball without pushing someone over",
        youtube: "",
        diagram: "drills/body-position.svg",
        steps: [
          "Get your body between the ball and the other player to keep it safe.",
          "Lean shoulder-to-shoulder — that's allowed!",
          "No pushing with your hands and no shoving from behind.",
          "Stay low and balanced so you don't fall over.",
        ],
      },
      {
        name: "Shooting Drill",
        focus: "Kicking on goal with a good plant foot",
        youtube: "",
        diagram: "drills/shooting-giveandgo.svg",
        steps: [
          "Dribble toward the goal.",
          "Plant your standing foot next to the ball.",
          "Kick through the middle with your laces and follow through.",
          "Celebrate your goals!",
        ],
      },
      {
        name: "Passing Drill",
        focus: "Passing to a partner and leading them (like last week)",
        youtube: "",
        diagram: "drills/lead-pass.svg",
        steps: [
          "Partners pass back and forth with the inside of the foot.",
          "Now move together and pass a little AHEAD of your partner.",
          "Call your partner's name before you pass.",
        ],
      },
    ],

    scrimmage: {
      description: "10-minute scrimmage — remember to spread out, 2 up and 2 back!",
      duration: "10 minutes",
    },

    homework: [
      {
        name: "Don't Bunch Up!",
        focus: "Spreading out instead of everyone chasing the ball",
        concept:
          "When everyone runs to the ball it gets crowded and no one can score. If you SPREAD OUT — some in front, some behind — there's always someone open to pass to, and always someone back to defend. Think of it like sharing the field.",
        youtube: "",
        diagram: "drills/split-def-off.svg",
        time: "5 min",
        equipment: "Just the diagram (a yard helps!)",
        steps: [
          "Look at the picture: 2 players up front, 2 in the back.",
          "With a grown-up, practice 'spread out!' — jog to your own space, not the ball.",
          "Talk about it while watching a game: point out kids who are open.",
        ],
        indoor:
          "Use stuffed animals or paper spots to show '2 up, 2 back' on the living room floor.",
      },
      {
        name: "Strong But Gentle",
        focus: "Using your body to protect the ball — no pushing",
        concept:
          "You're allowed to be strong and lean shoulder-to-shoulder to keep the ball safe, but pushing with your hands or shoving from behind is a foul. Staying low and balanced helps you stay on your feet.",
        youtube: "",
        diagram: "drills/body-position.svg",
        time: "5 min",
        equipment: "1 ball + a partner",
        steps: [
          "Put your body between the ball and your partner.",
          "Gently lean shoulder-to-shoulder — hands stay to yourself.",
          "Stay low and take small steps to keep your balance.",
        ],
        indoor:
          "Practice a gentle shoulder-lean standing next to a grown-up — no ball needed, just the balance and 'no hands' idea.",
      },
    ],
  },

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
        diagram: "drills/elsa.svg",
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
        diagram: "drills/sharks-minnows.svg",
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
        diagram: "drills/lead-pass.svg",
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
        diagram: "drills/shooting-giveandgo.svg",
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

    homework: [
      {
        name: "Make Friends With the Ball",
        focus: "Lots of little touches to get comfortable",
        concept:
          "At this age the #1 thing is getting comfortable with the ball at your feet. The more you touch it, the braver and more confident you'll be in games. It should feel like a fun toy, not something scary!",
        youtube: "",
        diagram: "",
        time: "5–10 min",
        equipment: "1 ball",
        steps: [
          "Dribble around the yard with little taps — pretend the ball is stuck to your feet.",
          "Tap the top of the ball back and forth between feet (toe-taps).",
          "Stop the ball with the bottom of your foot when a grown-up yells 'freeze!'.",
        ],
        indoor:
          "Use a rolled-up sock or a soft/foam ball on the carpet. Gentle taps only — great for the living room!",
      },
      {
        name: "Pass & Lead a Partner",
        focus: "Passing ahead of a moving teammate",
        concept:
          "In a game your teammates are always moving. If you pass right AT them they have to stop and wait. If you pass a little bit in FRONT of them, they can run onto it and keep going — that's how teams move the ball fast.",
        youtube: "",
        diagram: "drills/lead-pass.svg",
        time: "5–10 min",
        equipment: "1 ball + a partner (parent or sibling!)",
        steps: [
          "Stand a few steps apart and pass with the inside of your foot.",
          "Now both walk slowly and keep passing — aim a little AHEAD of your partner.",
          "Say your partner's name before you pass so they're ready.",
        ],
        indoor:
          "Roll or gently pass a soft ball back and forth across the room while slowly walking side to side.",
      },
      {
        name: "Shoot on Goal",
        focus: "Kicking hard and on target",
        concept:
          "Scoring is the best part! Good shots come from planting your standing foot next to the ball and striking through the middle with your laces (the top of your shoe), looking where you want it to go.",
        youtube: "",
        diagram: "drills/shooting-giveandgo.svg",
        time: "5–10 min",
        equipment: "1 ball + a 'goal' (two shoes, a net, or a wall target)",
        steps: [
          "Set the ball a few steps from your goal.",
          "Plant your non-kicking foot next to the ball.",
          "Kick through the middle with your laces — follow through toward the goal.",
          "Celebrate every goal! Then try from a little farther back.",
        ],
        indoor:
          "Use a soft ball and aim at a couch-cushion 'goal'. Focus on the plant foot and a smooth kick, not power.",
      },
    ],
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

/* ---- SNACK SIGNUPS --------------------------------------------------------
   One row per game/tournament date. `who` = the family signed up, or "" if the
   date is still open. `signupUrl` is the Google Form to claim a date.          */
const SNACKS = {
  signupUrl: "https://forms.gle/YE7DtKU3oFVoyWcW6",
  dates: [
    { date: "2026-08-22", who: "Sutton" },
    { date: "2026-08-29", who: "Aria" },
    { date: "2026-09-12", who: "" },
    { date: "2026-09-19", who: "Zuri" },
    { date: "2026-09-26", who: "" },
    { date: "2026-10-03", who: "Caroline" },
    { date: "2026-10-10", who: "" },
    { date: "2026-10-16", who: "", label: "TBD Tournament Game 1", tbd: true },
    { date: "2026-10-17", who: "", label: "TBD Tournament Game 2", tbd: true },
    { date: "2026-10-17", who: "", label: "TBD Tournament Game 3", tbd: true },
    { date: "2026-10-18", who: "", label: "TBD Tournament Game 4", tbd: true },
  ],
};
