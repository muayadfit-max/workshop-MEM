# Shot list — "Just be careful" (1080x1920, 30 fps, 22.70 s = 681 frames)

The audio track of `assets/voiceover.mov` is 20.99 s long. The last spoken word, «careful»,
starts at 19.79 s. After it, the end card enters and then holds until 22.70 s.

**Snapped to `my-video/src/data/words.json`.** Every cut lands on a real word onset.

**Bold** = emphasis word (140 px / 800). Every other word is 72 px / 500.

| # | Start–end (s) | Frames | Cut lands on | On-screen text (word-in at spoken onset) | Framing and focal (40–55% H) | Motion (transform and opacity only) |
|---|---|---|---|---|---|---|
| 1 | 0.00–2.89 | 0–86 | — | نوعية **الناس** shown in `muted` from frame 0 (poster) | **WIDE poster**: cliff, kneeling figure with the offered hand, accent clock, a ladder from below that stops short of the hand, the climber. Focal: the climber, ≈45% | Idle loops. Camera push 1.00→1.03. The voice says «نشرت هذا الفيديو لأن يوصف بالضبط» |
| 2 | 2.89–4.73 | 87–141 | «نوعية» | نوعية (accent 2.89) → **الناس** (accent 3.34) | **MEDIUM** on the top figure: "the kind of people". Focal: the top figure, ≈48% | The picture is settled at the cut. Slow push 1.00→1.04. The offered hand bobs |
| 3 | 4.73–8.78 | 142–262 | «واقفين» | واقفين **معك** (4.73 / 5.17) → line swap → من **وراك** (5.76 / 5.93) | **MEDIUM** on the top figure, front, then the hidden side. Focal ≈50% | On «واقفين» the hand extends 24 px. On «من» the camera trucks 1:1 to the clenched fist behind its back (ease-out, lands 6.30 s). The fist tightens on «وراك» |
| 4 | 8.78–10.87 | 263–325 | «مدح» | **مدح** ودعم (8.78 / 9.17) | **MEDIUM-WIDE** vertical: hand, ladder top, climber. Focal: the climber, ≈52% | On «مدح» the climber climbs one rung (−70 px, ease-out 15 f). The hand dips 12 px. The gap stays ≥ 90 px. Settled 9.37 s, held 1.50 s |
| 5 | 10.87–13.85 | 326–415 | «يخرب» | يخربون **علاقاتك** (10.87 / 11.09) | **TIGHT on the gap**: fingertips, top rung, the climber's head and reaching hand. Focal ≈50% | On «يخرب» the ladder rocks 1.5° and settles. On «فرصة» (12.83) it slips 40 px, so the gap widens |
| 6 | 13.85–17.19 | 416–515 | «عشان» | (no text until 15.10) → يشوهون **صورتك** (15.10 / 15.83) | **MEDIUM on the climber**. Focal ≈54% | On «يطيحون» (14.23) the climber slips half a rung. On «ويشوهون» its silhouette skews 6° (`skewX`, 12 f) and holds bent |
| 7 | 17.19–22.70 **(ending, longest: 5.51 s)** | 516–680 | «it» | It keeps **rolling** (17.19 / 17.32 / 17.74) → Just be **careful** (19.34 / 19.63 / 19.79) → `MUAYAD FIT` | **CLOSE on the accent clock** (≈42%), then one continuous pull-back to the **WIDE poster** (climber ≈45%) | The clock hand rolls continuously. On «just» the camera pulls back 2.2→1.00 (ease-out, 45 f). At 20.53 s the line fades and the scene drops to 0.25. The wordmark enters at 20.53 s and holds 2.0 s |

Line exits: each line fades out over 5 frames, finishing on the next line's first onset or on
the cut, whichever comes first. The «my friend» words (18.10–18.67) are not shown on screen.

## Holds after settle (rule: ≥ 1.5 s)

A shot settles when its opening camera move and figure action have landed and its first line
is on screen. Words that come later are word-synced beats inside the shot.

| Shot | Settles | Next cut | Hold |
|---|---|---|---|
| 1 | 0.00 (poster) | 2.89 | 2.89 s |
| 2 | 2.89 (no entrance move) | 4.73 | 1.84 s |
| 3 | 4.93 (first line in) | 8.78 | 3.85 s |
| 4 | 9.37 (ودعم in, climb landed) | 10.87 | 1.50 s |
| 5 | 11.40 (rock landed) | 13.85 | 2.45 s |
| 6 | 14.60 (slip landed) | 17.19 | 2.59 s |
| 7 | 20.80 (wordmark in) | 22.70 | 1.90 s |

## Sound

- The voice-over audio plays from frame 0 to its end (20.99 s). The picture is never shown.
- A clock tick synthesised in code (a short damped sine click, about −20 dB under the voice)
  plays 3 frames before each cut: frames 84, 139, 260, 323, 413 and 513.
