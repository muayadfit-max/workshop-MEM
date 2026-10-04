# Style — "Just be careful" Reel (Muayad Fit)

Extracted from `references/bhalo.mp4` (360x640, 30 fps, 16.3 s), sampled at one frame
every 0.5 s (33 frames). We keep its grammar only, not its characters, poses or text.

## 1. What the reference does

| Trait | Observed in the reference | What we keep |
|---|---|---|
| Field | Near-black violet-charcoal, sampled `#2E2136` to `#20232C`, light grain and vignette | Flat `#0B0B0B`. No grain, no vignette. |
| Figures | Flat warm off-white fill (sampled `#B2978F`), thick dark contour, no shading | Flat `#F4F4F4` fill, `#0B0B0B` contour |
| Contour | About 2 px at 360 w, so about 6 px at 1080 w. Same weight everywhere | **8 px** at 1080 w, round caps and joins, one weight for the whole drawing |
| Detail | Cliff has a few crack lines. Faces are 2 dots and a mouth. Nothing else | Cliff has 3 crack lines at most. Heads are **blank**, with no facial features |
| Cast | One cliff, one ladder, one clock, two figures | The same count. Nothing added |
| Composition | Cliff wedge on the **left** (about 55% wide), ledge at about 31% of the height, a figure above, a climber on the right | **Mirrored and re-staged**: cliff on the **right**, ledge lower, rigid ladder standing **from below** |
| Camera | One locked shot for all 16 s. No cuts, no zoom | Mostly locked. A slow push of 3–8% per shot, and **hard cuts only on word boundaries** |
| Motion | Slow idle loops with a period of about 1.5–2 s and small amplitude: lean, reach, wind | The same tempo. Sine loops that are pure functions of the frame number, with an amplitude of 1–3° or 4–24 px |
| Hold | The whole clip is one metaphor held | Shot 7, the ending, is the long hold: the clock rolling, then the full scene |
| Text | Burnt-in text exists (ignored) | Our own type layer (below) |

**Original staging, not copied 1:1.** In the reference, the top figure cranks a clock
that lowers a rope ladder. In ours, the clock **stands alone** on the ledge as the
accent object. The ladder is **rigid** and leans against the cliff wall from below, and
its top rung stops a visible **gap** short of the offered hand. The top figure lies
prone at the edge with one hand offered down. Its other hand is hidden behind its back,
clenched. The climber climbs from the lower left and reaches up. Neither figure copies a
reference pose.

## 2. Palette (one flat accent)

| Token | Hex | Use |
|---|---|---|
| `bg` | `#0B0B0B` | Field, contour lines |
| `surface` | `#161616` | Cliff face fill (a darker plane than the figures, so the figures read first) |
| `text` | `#F4F4F4` | Figures, ladder, spoken words, wordmark |
| `muted` | `#9A9A9A` | Cliff top edge and crack lines, words visible but not yet spoken (frame-0 poster only) |
| `accent` | `#1a9df1` | **Only** the clock and the word being spoken right now |

No gradients, glows, shadows or blend modes. The accent never fills more than about 6%
of the frame, except at the start of Shot 7, the clock close-up.

## 3. Type

- **Tajawal**, loaded locally from `@fontsource/tajawal` (woff2 in `node_modules`, no CDN).
- Arabic lines 1–6: `direction: rtl` **on the text element only**, `text-align: right`
  inside a centred block. English lines 7–8 are LTR.
- Uses the CLAUDE.md type scale. Base word: **72 px** (subhead), weight 500. **Emphasis word: 140 px**
  (headline maximum), weight 800. Line-height 1.15. One family only (Tajawal).
- Max 4 words on screen at once. Each line is one line, and never wraps beyond 2.
- **Text band:** y 200–420 px, centred, x 64–1016 px. The band stays in the same place
  in every shot, so the eye never hunts for the text.
- The wordmark `MUAYAD FIT` (there is no `assets/logo.svg`) uses Tajawal 800, 120 px (headline),
  tracking 0.08 em, in `#F4F4F4`. No mark is drawn.

## 4. How text enters and leaves

1. **Word-synced.** Each on-screen word appears on the frame its spoken word starts
   (from `words.json`).
2. **Enter:** opacity 0 to 1 and translateY +18 px to 0 over **6 frames** (200 ms),
   with ease-out cubic.
3. **Colour state:** the word being spoken is `accent`. Once its spoken end time passes
   it becomes `text`.
4. **Exit:** the whole line fades out (opacity 1 to 0, translateY 0 to −12 px) over
   **5 frames**, finishing on the first word boundary of the next line. Lines never
   overlap.
5. **Frame-0 poster exception:** line 1 `نوعية الناس` is already on screen at frame 0
   in `muted`. Each word lights up `accent`, then `text`, as it is spoken.

## 5. Shot grammar

- **Shot length:** shots 1–6 run 2.3–2.9 s, so something meaningful changes every 2–3 s.
  **The ending (Shot 7) is its own shot and holds the longest** (about 7.5 s). It is the
  reference's long hold on one metaphor: the clock keeps rolling while the camera pulls back.
- **Settle and hold:** a shot settles when its last word has entered (word start + 6 f) and
  its camera or figure move has landed. **Every shot holds at least 1.5 s (45 f) after it
  settles.** If the transcript breaks this, the cut moves to the next real word boundary.
- **Camera** is one world SVG (the scene) inside a camera group. Each shot is a framing
  `{x, y, scale}` with a slow push of 3–8% across the shot (ease in-out). There is
  never a whip or a shake.
- **Transitions** are hard cuts on real word boundaries. No dissolves between shots.
  The only fades are the type exits and the end card. Each shot is a `<Sequence from={...}>`
  at an absolute start frame. Timing is written in seconds and converted once with
  `Math.round(s * 30)`.
- **Cut sound:** a soft tick starts 3 frames before each cut, about −20 dB under the
  voice-over (the clock's own tick, synthesised in code). This is pending your OK.
- **Idle life** (all frame-driven, with no `Math.random()`):
  - The top figure leans: ±1.2° over a 2.0 s sine.
  - The offered hand bobs: ±6 px over a 2.0 s sine, out of phase with the lean.
  - The climber's reaching arm moves ±3° over a 1.6 s sine.
  - The clock's hand ticks 6° per second, with a 4-frame ease.
- Only `transform` and `opacity` animate. Paths never morph.

## 6. Frame and safe zones (1080x1920)

| Zone | Pixels | Rule |
|---|---|---|
| Top 10% | y 0–192 | Field only |
| Text band | y 200–420 | Type only |
| Stage | y 420–1440 | The hand, the gap, the ladder top, heads and the clock all live here |
| Bottom 25% | y 1440–1920 | Only non-essential continuation: ladder rails, the cliff base, the climber's lower legs |
| Sides | x < 64, x > 1016 | Nothing important. The cliff mass may bleed off the right edge |

**Focal figure = 40–55% of the frame height (768–1056 px)** in every shot. The focal
element for each shot is named in the shot list.
