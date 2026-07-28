/* =============================================================================
   TEAM HOMEWORK DATA  —  this is the only file you need to edit each week.
   =============================================================================

   HOW TO ADD A NEW PRACTICE
   -------------------------
   1. Copy one whole { ... } block below (from the { to the }, including comma).
   2. Paste it at the TOP of the practices list (newest first).
   3. Change the date, title, and notes.
   4. For each drill:
        - name:     the drill's name
        - focus:    one short line — what skill it builds
        - youtube:  paste a YouTube link (any normal link works — see note below)
        - diagram:  a picture file in the drills/ folder, OR leave as ""  (empty)
        - steps:    a list of short instructions, one per line in [ ]
   5. Save the file. Refresh the page. Done.

   YOUTUBE LINKS
   -------------------------
   Paste the link exactly as you copied it. All of these work:
     https://www.youtube.com/watch?v=ABC123
     https://youtu.be/ABC123
     https://www.youtube.com/shorts/ABC123
   To start a clip at a certain time, keep the "&t=90s" part of the link.

   DIAGRAMS
   -------------------------
   Put an image (PNG/JPG/SVG) in the "drills" folder, then write its file name:
     diagram: "drills/passing-gates.svg"
   No picture yet? Just use:
     diagram: ""

   ============================================================================= */

const TEAM = {
  name: "Sporting LS — 3rd Grade Girls",
  league: "Sporting LS Recreation League",
  season: "Fall 2026",
  coachNote:
    "Homework is 10–15 minutes, 2–3 times before next practice. Watch the clip together, then head to the yard or driveway. Have fun — touches on the ball matter more than getting it perfect!",
};

/* Practices are listed NEWEST FIRST. The top one shows as "This week". */
const PRACTICES = [
  {
    date: "2026-09-15",
    title: "Practice 3 — Dribbling with your head up",
    summary:
      "We worked on keeping the ball close and looking up to see the field. Homework this week is all about soft, frequent touches.",
    drills: [
      {
        name: "Dribble Through the Gates",
        focus: "Close control & change of direction",
        youtube: "https://www.youtube.com/watch?v=Dbj-B2mQ0AU",
        diagram: "drills/dribble-gates.svg",
        steps: [
          "Set up 4–5 'gates' (two cones/shoes about 2 feet apart).",
          "Dribble through each gate using small touches.",
          "After each gate, look up and call out a color you see.",
          "Count how many gates you can hit in 60 seconds — beat your score!",
        ],
      },
      {
        name: "Toe Taps & Foundations",
        focus: "Quick feet & ball familiarity",
        youtube: "https://youtu.be/dcQMzcYT9AU",
        diagram: "",
        steps: [
          "Ball still, tap the top of it lightly with alternating feet.",
          "Start slow — 20 taps. Then go for 20 seconds as fast as you can.",
          "Keep your back straight and look up between sets.",
        ],
      },
    ],
  },

  {
    date: "2026-09-08",
    title: "Practice 2 — Passing to a partner",
    summary:
      "Inside-of-the-foot passing and 'showing' for the ball. Grab a parent or sibling as your partner for homework.",
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
  },

  {
    date: "2026-09-01",
    title: "Practice 1 — First touches & stopping the ball",
    summary:
      "Welcome to the season! We learned how to stop the ball under our foot and dribble in open space.",
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
  },
];
