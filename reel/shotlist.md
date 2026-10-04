# Shot list — "Just be careful" (1080x1920, 30 fps, about 22.7 s)

The voice-over is 21.08 s long. After the last word, the end card enters and then holds
1.5 s, as CLAUDE.md requires. That makes the total about 22.7 s, and the last line is
never cut.

**Times are provisional.** They come from the voice-over's energy envelope. In step 3,
every cut and every word-in snaps to a real word boundary in `words.json`. Every shot
must hold ≥ 1.5 s after it settles. Where the transcript breaks that, the cut moves to
the next word boundary.

**Bold** = emphasis word (140 px / 800). Every other word is 72 px / 500.

| # | Start–end (s) | On-screen text | Framing and focal (40–55% H) | Motion (transform and opacity only, frame-driven) | Transition in |
|---|---|---|---|---|---|
| 1 | 0.00–2.40 | نوعية **الناس** | **WIDE poster.** The whole world: cliff on the right, the kneeling figure leaning off the ledge with its hand offered, the accent clock on the ledge, a rigid ladder from below that stops a gap short of the hand, the climber on it. Focal: the climber, about 45% H | Frame 0 is final: the line is visible in `muted`, and each word lights up as it is spoken. Idle loops start. Camera push 1.00→1.03 | — (frame 0 = poster) |
| 2 | 2.40–4.90 | واقفين **معك** | **MEDIUM** on the top figure and the offered open hand. Focal: the top figure, about 48% H | The hand extends 24 px (ease-out over 18 f), the body leans 2° forward. Push 1.00→1.06 | Hard cut |
| 3 | 4.90–7.80 | من **وراك** | **MEDIUM, behind the figure.** The camera trucks so the hidden hand comes into view: clenched behind its back. Focal: the top figure, about 50% H | Truck 60 px plus push 1.00→1.04. On «وراك» the fist tightens (a 0.94 scale pulse). The front stays friendly | Hard cut |
| 4 | 7.80–10.30 | **مدح** ودعم | **MEDIUM-WIDE** on the vertical: the hand on top, the ladder top, the climber reaching. Focal: the climber, about 52% H | The climber climbs one rung (−70 px, ease-out over 24 f). The hand dips 12 px. **The gap never closes** (stays ≥ 90 px) | Hard cut |
| 5 | 10.30–12.60 | يخربون **علاقاتك** | **TIGHT on the gap**: fingertips above, the top rung below, the climber's head and reaching hand. Focal: the climber's upper body plus the hand, about 50% H | Near-still. Push 1.00→1.05. On «يخربون» the ladder rocks 1.5° around its base and settles | Hard cut |
| 6 | 12.60–15.20 | يشوهون **صورتك** | **MEDIUM on the climber** alone on the ladder. Focal: the climber, about 54% H | On «يشوهون» the climber's silhouette skews 6° (`skewX`, ease-out over 12 f) and holds bent: the image distorted | Hard cut |
| 7 | 15.20–22.70 **(ending, longest)** | It keeps **rolling** → Just be **careful** → **MUAYAD FIT** | **CLOSE on the accent clock** (≈42% H), then one continuous pull-back to the **WIDE poster** framing (climber ≈45% H). No cut inside the shot | The clock hand rotates continuously (one turn per 2.6 s, linear from the frame number). On «Just» the camera pulls back 2.2→1.00 (ease-out, 45 f) and the clock keeps rolling, small, on the ledge. 6 f after «careful» ends, the line fades and the scene drops to 0.25 opacity. `MUAYAD FIT` enters (opacity + 18 px rise, 8 f) and holds 1.5 s. The audio plays to its last sample | Hard cut |

## Sound

- The audio is the voice-over from `assets/voiceover.mov` only. The picture is never shown.
- **Cut sound (pending your OK):** a soft clock tick starts 3 f before each of the 6 cuts,
  about −20 dB under the voice. It is synthesised in code because no sound asset was given.

## Checks built into this plan

- **Frame 0** shows the cliff, the ladder, the gap and `نوعية الناس`.
- No more than 4 words are on screen in any frame. The end card replaces line 8 and is
  never added to it.
- The text band is y 200–420 in every shot. Every important element sits between
  y 420 and 1440, and x 64–1016.
- The accent is used on the clock and the current word only.
- Shots 1–6 are each 2.3–2.9 s long. Shot 7 is about 7.5 s and the longest.
