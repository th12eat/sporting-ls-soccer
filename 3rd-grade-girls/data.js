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
  name: "Lightning Bolts",
  subName: "Sporting LS · 3rd Grade Girls",
  logo: "logo.svg",
  league: "Sporting LS Recreation League",
  season: "Fall 2026",
  coaches: ["Coach Thomas", "Coach John"],
  socialManager: "Amber Mann",
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
  nextSession: { label: "Next practice", type: "practice", date: "2026-08-11", time: "6:00pm" },
};

/* ---- PRACTICES (newest first; the top one shows as "This week") ---------- */
const PRACTICES = [
  {
    date: "2026-08-11",
    title: "Offsides, set pieces with goalies, Rondo & crossing",
    // Forecast (upcoming practice) — replace with the actual after we play.
    weather: { emoji: "☀️", tempF: 90, condition: "Forecast: mostly clear & hot", humidity: 50 },
    summary:
      "This week we'll learn offsides and work set pieces with our goalies (goal kicks and defending corners). We'll bring back the Rondo keep-away and finally get to crossing — the drill we didn't reach last time. Finish with a scrimmage.",

    attendance: { present: [], absent: [] },

    warmup: {
      items: [
        "Dynamic warm-up + light dribbling",
        "Quick review: positions & staying onside",
      ],
    },

    drills: [
      {
        name: "Offsides",
        focus: "Staying onside — level with or behind the last defender",
        youtube: "",
        diagram: "drills/offsides.svg",
        steps: [
          "You're offside if you're ahead of the last defender AND the ball when it's played to you.",
          "Time your run: stay level with the last defender, then burst forward as the ball is kicked.",
          "Defenders can step up together to catch attackers offside.",
          "If you're unsure — check where the last defender is before you sprint.",
        ],
      },
      {
        name: "Set Pieces with Goalies",
        focus: "Goal kicks and defending corners — the goalie's job",
        youtube: "",
        diagram: "drills/set-pieces-goalie.svg",
        steps: [
          "Goal kick: spread wide, the goalie/back plays out to the sides — not up the middle.",
          "Defending a corner: the goalie owns the box — call 'keeper!' loud and go get it.",
          "Field players: mark up and clear the ball AWAY from our goal, out to the sides.",
          "Everyone knows their spot before the ball is played.",
        ],
      },
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
        name: "Crossing",
        focus: "Getting wide and delivering the ball into the box",
        youtube: "",
        diagram: "drills/crossing.svg",
        steps: [
          "Dribble wide down the side (the wing).",
          "Look up to see teammates in the middle.",
          "Drive the ball across the front of the goal.",
          "Forwards: time your run to meet the cross.",
        ],
      },
    ],

    scrimmage: {
      description: "10-minute scrimmage — watch for offsides, and use the goalie on goal kicks & corners.",
      duration: "10 minutes",
    },

    homework: [
      {
        name: "Understand Offsides",
        focus: "Knowing the offside rule and timing your runs",
        concept:
          "Offside stops attackers from just standing by the goal waiting for a pass. You're offside if you're ahead of the last defender (and the ball) when a teammate plays it to you. Good attackers stay level with the last defender, then time their run to burst forward AS the ball is kicked.",
        youtube: "",
        diagram: "drills/offsides.svg",
        time: "5 min",
        equipment: "Just the diagram (a couch cushion 'defender' helps!)",
        steps: [
          "Look at the diagram: find the last defender's line.",
          "Point to the ✓ onside player and the ✗ offside player and say why.",
          "Practice the idea: a grown-up is the 'last defender' — don't run past them until the 'ball' is played.",
        ],
        indoor:
          "Line up toys or cushions as defenders; walk through 'onside vs. offside' by standing level with the last one.",
      },
    ],
  },

  {
    date: "2026-08-04",
    title: "Body position, protecting the ball & trapping",
    // Actual weather recorded after the practice.
    weather: { emoji: "☀️", tempF: 88, condition: "Clear & hot", humidity: 55 },
    summary:
      "We worked on good body position (legal contact), protecting our own ball while winning others, keeping possession in a 4v4 transfer game, and trapping the ball with a clean first touch. Finished with a scrimmage.",

    attendance: { present: [], absent: [] },

    warmup: {
      items: [
        "We chose our team name — the Lightning Bolts! ⚡",
        "Dynamic warm-up + light dribbling",
        "Quick review of positions & spacing (our 7v7 shape)",
      ],
    },

    drills: [
      {
        name: "Body Position — Do's & Don'ts",
        focus: "How to position relative to the ball, and legal give-and-take contact",
        youtube: "",
        diagram: "drills/body-position.svg",
        steps: [
          "Stay 'goal-side' — between the ball and our goal when defending.",
          "Get side-on so you can see the ball AND the field.",
          "Contact is legal shoulder-to-shoulder — lean, don't shove.",
          "No pushing with hands/arms and no shoving from behind (that's a foul).",
        ],
      },
      {
        name: "Protect & Kick Away",
        focus: "Shielding your own ball while poking away an opponent's",
        youtube: "",
        diagram: "drills/protect-kick-away.svg",
        steps: [
          "Everyone dribbles in the grid with their OWN ball.",
          "Keep your body between defenders and your ball (shield it!).",
          "At the same time, try to kick OTHER players' balls out of the grid.",
          "If your ball gets knocked out, do 3 toe-taps and come back in.",
          "Last player with a ball in the grid wins the round.",
        ],
      },
      {
        name: "4v4 Transfer (5 Passes)",
        focus: "Keeping possession under pressure, then switching the ball across",
        youtube: "https://youtu.be/A-n82IYDq7M?t=98",
        youtubeEnd: "158",
        diagram: "drills/transfer-4v4.svg",
        steps: [
          "4 players on each end, 4 defenders in the middle (like group monkey-in-the-middle).",
          "The end team must complete 5 passes among themselves first.",
          "After 5 passes, they can transfer the ball across to the other end team.",
          "Defenders try to win it; if they do, they swap with the team that lost it.",
          "Stay spread out and call for the ball to make the 5 passes easier.",
        ],
      },
      {
        name: "Trapping — First Touch",
        focus: "Cushioning the ball to control it with your first touch",
        youtube: "",
        diagram: "drills/trapping.svg",
        steps: [
          "Watch the ball all the way onto your foot.",
          "Open the inside of your foot and 'give' a little as it arrives.",
          "Try the sole (foot on top) and thigh/chest for higher balls.",
          "Goal: the ball stays within one step of you (a 'soft' touch).",
        ],
      },
    ],

    scrimmage: {
      description: "10-minute scrimmage — protect the ball, use good body position, and hold your spots!",
      duration: "10 minutes",
    },

    homework: [
      {
        name: "Play Your Position",
        focus: "Knowing your job and holding your spot in our 7v7 shape",
        concept:
          "When everyone stays in their spot (1 Forward, 2 Mids, 3 Backs, GK), we cover the whole field and always have someone to pass to. If everyone chases the ball, we leave big gaps. Your job changes by position — wings stay wide, mids connect, backs protect.",
        youtube: "",
        diagrams: [
          { label: "Our 7v7 (1–2–3)", src: "drills/positions-7v7.svg" },
          { label: "Full 11v11", src: "drills/positions-11v11.svg" },
        ],
        time: "5 min",
        equipment: "Just the diagram",
        steps: [
          "Look at our 7v7 shape and pick the spot you play most.",
          "Say your job out loud (e.g., 'Right Mid: stay wide, help attack AND defense').",
          "Ask a grown-up to call a position — you point to where you'd stand.",
        ],
        indoor:
          "Lay out paper spots on the floor in our shape and walk to your position when someone calls it.",
      },
      {
        name: "Trap It Soft",
        focus: "A controlled first touch",
        concept:
          "A good first touch buys you time. If the ball bounces far away, a defender can steal it. If you 'cushion' it close, you're ready to dribble, pass, or shoot right away.",
        youtube: "",
        diagram: "drills/trapping.svg",
        time: "10 min",
        equipment: "1 ball + a wall or partner",
        steps: [
          "Toss or pass the ball to yourself off a wall.",
          "Meet it with the inside of your foot and 'give' as it arrives.",
          "See if you can stop it within one step — no chasing!",
          "Try trapping with the sole and thigh too.",
        ],
        indoor:
          "Use a soft/foam ball against a wall or couch. Focus on the gentle 'cushion' motion, not power.",
      },
      {
        name: "Kick With Power & Aim",
        focus: "Striking the ball cleanly for accuracy and distance",
        concept:
          "Good kicks come from your laces (the top of your shoe), a solid plant foot next to the ball, and a follow-through toward your target. Look where you want it to go!",
        youtube: "https://www.youtube.com/watch?v=zEg-cumP2kE",
        diagram: "",
        time: "10 min",
        equipment: "1 ball + a target (cones, a tree, a goal)",
        steps: [
          "Plant your non-kicking foot next to the ball, pointing at the target.",
          "Strike the middle of the ball with your laces.",
          "Follow through toward where you want it to go.",
          "Start close and accurate, then step back for more power.",
        ],
        indoor:
          "Ground passes only inside — use a soft ball and aim at a pillow target. Save the big kicks for outside.",
      },
    ],
  },

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

/* ---- SNACK SIGNUPS --------------------------------------------------------
   One row per game/tournament date. `who` = the family signed up, or "" if the
   date is still open. `signupUrl` is the Google Form to claim a date.
   Dates match the league weekends; tournament spots are 10/16–10/18.          */
const SNACKS = {
  signupUrl: "https://forms.gle/7gMyJhQusDzDLSFM8",
  dates: [
    { date: "2026-08-22", who: "Noor" },
    { date: "2026-08-29", who: "" },
    { date: "2026-09-12", who: "" },
    { date: "2026-09-19", who: "" },
    { date: "2026-09-26", who: "" },
    { date: "2026-10-03", who: "" },
    { date: "2026-10-10", who: "" },
    { date: "2026-10-16", who: "", label: "TBD Tournament Game 1", tbd: true },
    { date: "2026-10-17", who: "", label: "TBD Tournament Game 2", tbd: true },
    { date: "2026-10-17", who: "", label: "TBD Tournament Game 3", tbd: true },
    { date: "2026-10-18", who: "", label: "TBD Tournament Game 4", tbd: true },
  ],
};

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
