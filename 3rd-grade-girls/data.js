/* =============================================================================
   TEAM HOMEWORK DATA  —  this is the only file you need to edit each week.
   =============================================================================

   Each practice has FIVE parts, top to bottom:
     1. attendance  — who was present / missing
     2. warmup      — stretching, warm-up games, team-building
     3. drills      — the main skill work (with videos + diagrams)
     4. scrimmage   — the game we bookend practice with
     5. homework    — game-theory concept + a drill to do at home
                      (each homework drill can list an INDOOR alternative)

   -------------------------------------------------------------------------
   HOW TO ADD A NEW PRACTICE
   -------------------------------------------------------------------------
   1. Copy the whole { ... } block for a practice below.
   2. Paste it at the TOP of the PRACTICES list (newest first).
   3. Edit the fields. Anything you don't need, set to "" or delete the line.
   4. Save the file, refresh the page. Done.

   YOUTUBE LINKS — paste any normal link, all of these work:
     https://www.youtube.com/watch?v=ABC123   |   https://youtu.be/ABC123
     https://www.youtube.com/shorts/ABC123     (keep "&t=90s" to start partway)

   DIAGRAMS — put an image in the drills/ folder and name it:
     diagram: "drills/rondo.svg"      (or leave "" for none)

   FIELD REFERENCE for a drill/homework item:
     name:      title of the drill
     focus:     one short line — the skill it builds
     youtube:   a YouTube link, or ""
     diagram:   an image path in drills/, or ""
     steps:     [ "short instruction", "next step", ... ]
     concept:   (homework only) the game-theory idea behind it
     indoor:    (homework only) how to do it inside / with limited gear, or ""
     time:      (homework only) e.g. "10 min"   equipment: e.g. "1 ball"
   ============================================================================= */

const TEAM = {
  name: "Sporting LS — 3rd Grade Girls",
  league: "Sporting LS Recreation League",
  season: "Fall 2026",
  coachNote:
    "Homework is 10–15 minutes, 2–3 times before next practice. Watch the clip together, then head outside — or use the indoor version on a rainy day. Touches on the ball matter more than getting it perfect. Have fun!",
};

/* Practices are listed NEWEST FIRST. The top one shows as "This week". */
const PRACTICES = [
  {
    date: "2026-07-28",
    title: "Practice — Throw-ins, Rondo & choosing ground vs. air",
    summary:
      "A hot one with lots of water breaks! We opened with names, schools, and favorite ice cream to keep getting to know each other, then dug into throw-ins, keep-away (Rondo), and deciding on purpose whether to play the ball on the ground or in the air.",

    // ---- who was here -------------------------------------------------------
    attendance: {
      present: ["Nora", "Nori", "Fiona", "Marlie", "Paige", "Adi", "Hailey", "Rose", "Riley"],
      absent: ["Orion", "Noor", "Reina"],
    },

    // ---- warm-up / stretching / team-building ------------------------------
    warmup: {
      description:
        "Team circle: each player shared her name, school, and favorite ice cream. We then walked through a throw-in demonstration and talked about roles and spacing on the field — where we stand and why — as our moving warm-up. Frequent water breaks throughout on a hot day.",
      diagram: "drills/throw-in.svg",
      items: [
        "Name / school / favorite ice cream circle",
        "Throw-in demonstration (proper form)",
        "Walk-through: roles & spacing on the field",
        "Dynamic movement + water breaks",
      ],
    },

    // ---- main drills --------------------------------------------------------
    drills: [
      {
        name: "3v1 & 4v1 Rondo (Keep-Away)",
        focus: "Passing under pressure, spacing, and supporting angles",
        youtube: "https://www.youtube.com/watch?v=Xslpg4mQD1k",
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
        youtube: "https://www.youtube.com/watch?v=8dxsBnRQ3Kg",
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
        youtube: "https://www.youtube.com/watch?v=sxAHmB8n8Kc",
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
        youtube: "https://youtu.be/eLbn-C4gYlk",
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
        youtube: "",
        diagram: "",
        steps: [
          "Paige and Adi showed the team new soccer moves they learned recently.",
          "Everyone tried the moves together — great job being brave and teaching!",
        ],
      },
    ],

    // ---- scrimmage ----------------------------------------------------------
    scrimmage: {
      description:
        "We finished with a 10-minute scrimmage to put it all together — using throw-ins to restart, and looking for good spacing between teammates.",
      duration: "10 minutes",
    },

    // ---- homework -----------------------------------------------------------
    homeworkIntro:
      "Three things to work on before next practice. Each has a game-theory idea (the 'why') and a quick drill — with an indoor option for hot or rainy days.",
    homework: [
      {
        name: "Head Up + Ball Control",
        focus: "Dribble with control while scanning the field",
        concept:
          "In a game the field is always changing — teammates move, defenders close in. If your eyes are glued to the ball you can't see the pass or the space. Great players feel the ball with their feet so their eyes are free to READ the game.",
        youtube: "https://www.youtube.com/watch?v=Dbj-B2mQ0AU",
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
        youtube: "https://www.youtube.com/watch?v=8dxsBnRQ3Kg",
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
        name: "Know Your Position (3×3 Grid)",
        focus: "Understanding the 10 standard positions and roles",
        concept:
          "A soccer team covers the field like a 3×3 grid so no one bunches up. Each spot has a job: wings stay wide, midfielders link defense and attack, backs protect the goal, and the goalie guards the net. When everyone holds a lane, we have more passing options and fewer gaps.",
        youtube: "",
        diagram: "drills/positions-grid.svg",
        time: "5 min",
        equipment: "Just the diagram (and a paper field if you want)",
        steps: [
          "Study the grid: LW · F · RW  /  LM · CM · RM  /  LB · CB · RB  /  GK.",
          "Point to each spot and say the position name out loud.",
          "Ask: 'If I'm Right Wing, do I stay wide or run to the middle?' (Wide!)",
          "Name one job for each row: attack, connect, defend, guard the goal.",
        ],
        indoor:
          "Lay out 9 pieces of paper on the floor in a 3×3 grid (plus one for the goalie). Stand on a square, name the position, and say its job. Move like that position would move.",
      },
      {
        name: "Throw-Ins",
        focus: "A legal, accurate throw-in to restart play",
        concept:
          "When the ball goes out on the sideline, a throw-in gives it back to a team. It's a free chance to keep possession — but only if it's legal. A foul throw hands the ball to the other team, so good form matters.",
        youtube: "https://www.youtube.com/watch?v=6a4Z4Q0y8Zc",
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

  {
    date: "2026-09-08",
    title: "Practice 2 — Passing to a partner",
    summary:
      "Inside-of-the-foot passing and 'showing' for the ball. Grab a parent or sibling as your partner for homework.",
    attendance: { present: [], absent: [] },
    warmup: {
      description: "Light jog and toe-taps to get warm.",
      diagram: "",
      items: ["Jog two laps", "Toe-taps on the ball", "Ankle & calf stretches"],
    },
    drills: [
      {
        name: "Passing Gates",
        focus: "Accuracy with the inside of the foot",
        youtube: "https://www.youtube.com/watch?v=eLbn-C4gYlk",
        diagram: "drills/passing-gates.svg",
        steps: [
          "Stand about 8–10 feet apart with one gate in the middle.",
          "Pass the ball through the gate to your partner.",
          "Plant your non-kicking foot next to the ball, point your toe up.",
          "10 clean passes each = a point. First to 3 points wins.",
        ],
      },
    ],
    scrimmage: { description: "Short 3v3 to end.", duration: "10 minutes" },
    homeworkIntro: "Practice passing with a partner this week.",
    homework: [
      {
        name: "Wall Passes",
        focus: "Inside-foot passing accuracy",
        concept:
          "Passing keeps the ball moving faster than any single player can dribble. The wall never gets tired — it's the perfect passing partner.",
        youtube: "https://www.youtube.com/watch?v=eLbn-C4gYlk",
        diagram: "",
        time: "10 min",
        equipment: "1 ball + a wall",
        steps: [
          "Pass the ball against a wall with the inside of your foot.",
          "Control the rebound, then pass again.",
          "Count how many you can do in a row.",
        ],
        indoor:
          "Use a soft ball against a baseboard or couch. Focus on a clean first touch to control the return.",
      },
    ],
  },

  {
    date: "2026-09-01",
    title: "Practice 1 — First touches & stopping the ball",
    summary:
      "Welcome to the season! We learned how to stop the ball under our foot and dribble in open space.",
    attendance: { present: [], absent: [] },
    warmup: {
      description: "Simple movement and stretching to start the season.",
      diagram: "",
      items: ["Jog", "Toe-taps", "Stretch"],
    },
    drills: [
      {
        name: "Red Light, Green Light",
        focus: "Stopping the ball on command",
        youtube: "https://www.youtube.com/shorts/8Zi6bnbnV3g",
        diagram: "",
        steps: [
          "Dribble forward on 'green light'.",
          "On 'red light', stop the ball by resting your foot gently on top.",
          "The ball should stop completely — no rolling away!",
        ],
      },
    ],
    scrimmage: { description: "First scrimmage of the season!", duration: "10 minutes" },
    homeworkIntro: "Get comfortable with the ball at your feet.",
    homework: [
      {
        name: "Sole Rolls",
        focus: "Ball familiarity and control",
        concept:
          "The more your feet know the ball, the less you have to look down — that frees your eyes to play the game.",
        youtube: "",
        diagram: "",
        time: "5 min",
        equipment: "1 ball",
        steps: [
          "Roll the ball side to side under one foot.",
          "Switch feet. Keep the ball close.",
          "Try it without looking down.",
        ],
        indoor: "Use a racquetball or rolled sock on carpet — same motion, softer touch.",
      },
    ],
  },
];
