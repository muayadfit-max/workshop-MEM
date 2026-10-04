# Shot list — "Just be careful" (1080x1920, 30 fps, about 21.9 s)

The voice-over is 21.08 s long. The end card holds about 0.8 s after the last spoken
word, so the last line is never cut.

**Times are provisional.** They come from the voice-over's energy envelope (pauses near
2.4, 7.8, 10.3, 15.2 and 17.8 s). In step 3, every cut and every word-in snaps to a
real word boundary in `words.json`.

**Bold** = emphasis word (148 px / 800). Every other word is 92 px / 500.

| # | Start–end (s) | On-screen text | Framing and focal (40–55% H) | Motion (transform and opacity only, frame-driven) | Transition in |
|---|---|---|---|---|---|
| 1 | 0.00–2.40 | نوعية **الناس** | **WIDE poster.** The whole world: cliff on the right, the kneeling figure leaning off the ledge with its hand offered, the accent clock on the ledge, a rigid ladder from below that stops a gap short of the hand, the climber on it. Focal: the climber, about 45% H (head y≈830 to feet y≈1690) | Frame 0 is final: the line is visible in `muted`, and each word lights up as it is spoken. Idle loops start. Camera push 1.00→1.03 | — (frame 0 = poster) |
| 2 | 2.40–4.90 | واقفين **معك** | **MEDIUM** on the top figure and the offered open hand. Focal: the top figure, about 48% H | The hand extends 24 px toward the climber (eased over 18 f), the body leans 2° forward, push 1.00→1.06. It reads as warm and supportive | Hard cut on the first word |
| 3 | 4.90–7.80 | من **وراك** | **MEDIUM, reframed behind the figure.** The camera trucks so the hidden hand comes into view: clenched behind its back. The offered hand is still visible at frame edge. Focal: the top figure, about 50% H | Truck 1:1 left 60 px plus push 1.00→1.04. The fist tightens with a 0.94 scale pulse on «وراك». The idle lean continues, so the front stays friendly | Hard cut |
| 4 | 7.80–10.30 | مدح ودعم (**مدح**) | **MEDIUM-WIDE** on the vertical: the offered hand on top, the ladder top, the climber reaching. Focal: the climber, about 52% H | The climber climbs one rung (translateY −70 px, ease in-out over 24 f), its arm reaching up. The hand dips 12 px. **The gap never closes** (stays ≥ 90 px) | Hard cut |
| 5 | 10.30–15.20 | يخربون **علاقاتك** → يشوهون **صورتك** | **TIGHT LONG HOLD on the gap**: fingertips above, the ladder's top rung below, the climber's head and reaching hand. This is the single metaphor, held. Focal: the climber's upper body plus the hand, about 50% H | Near-still. Push 1.00→1.08 over the whole 4.9 s. On «يخربون» the ladder rocks 1.5° around its base and settles. On «يشوهون» the climber's silhouette skews 6° (`skewX`) and holds, as the image bent out of shape. The line swaps on a word boundary and the camera does not cut | Hard cut |
| 6 | 15.20–17.80 | It keeps **rolling** | **CLOSE on the accent clock** on the ledge, with the top figure's knee as a dark edge. Focal: the clock, about 42% H | The clock hand rotates continuously (one turn per 2.6 s, linear, from the frame number). The clock body rocks ±2°. LTR text | Hard cut |
| 7 | 17.80–21.90 | Just be **careful** → end card **MUAYAD FIT** | **WIDE pull-back** to the poster framing. Focal: the climber, about 45% H | Scale 1.15→1.00 (ease-out, 40 f). The idle loops slow to half amplitude. 6 f after «careful» ends, the line fades and the scene drops to 0.25 opacity. `MUAYAD FIT` enters (opacity + 18 px rise, 8 f) centred in the stage and holds to the end. The audio plays to its last sample | Hard cut |

## Checks built into this plan

- **Frame 0** shows the cliff, the ladder, the gap and `نوعية الناس`.
- No more than 4 words are on screen in any frame. The end card replaces line 8 and is
  never added to it.
- The text band is y 200–420 in every shot. Every important element sits between
  y 420 and 1440, and x 64–1016.
- The accent is used on the clock and the current word only.
- Nothing from the voice-over video is shown. Only its audio is used.
