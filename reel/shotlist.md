# Shot list, as built: "Just be careful" (1080x1920, 30 fps, 22.70 s = 681 frames)

Times are on the video timeline. The .mov's audio track starts at 0.087 s, so every time
below is the `words.json` time + 0.087 s. Every cut lands on a spoken word onset.

**Bold** = emphasis word (140 px / 800). Every other word is 72 px / 500.

| # | Seconds | Frames | Cut on | Text | Framing (scale × / world x at centre) | Motion |
|---|---|---|---|---|---|---|
| 1 | 0.00–2.98 | 0–88 | — | نوعية **الناس** in muted from frame 0 | **Wide poster** 1.00→1.03. Climber ≈46% H | Idle loops: lean, hand bob, reach, breathe, clock ticks |
| 2 | 2.98–4.82 | 89–144 | «نوعية» | words light up as spoken | **Medium-wide** on the giver and its clock, 1.60→1.66 / 720 | Idle. The clock is fully in frame |
| 3 | 4.82–8.87 | 145–265 | «واقفين» | واقفين **معك** → من **وراك** | **Medium** 2.6 / 600 → **truck** to 2.9 / 680 on «من» (18 f ease-out) | The hand extends 24 px. At the end, the open hand and the fist on the back share the frame. The fist tightens on «وراك» |
| 4 | 8.87–10.96 | 266–328 | «مدح» | **مدح** ودعم | **Medium-wide vertical** 1.45→1.50 / 500 | Climber up one rung (15 f), the hand dips 10 px. Settles 9.46 s, holds 45 f |
| 5 | 10.96–13.94 | 329–417 | «يخرب» | يخربون **علاقاتك** | **Tight on the gap** 1.80→1.86 / 560 | Ladder rocks 1.5° on «يخرب». On «فرصة» it slips 40 px and the gap widens |
| 6 | 13.94–17.28 | 418–517 | «عشان» | يشوهون **صورتك** | **On the climber** 1.12→1.16 / 400 (clock cropped out) | Climber slips half a rung on «يطيحون». On «ويشوهون» the silhouette skews 14° and narrows 10%, and holds |
| 7 | 17.28–22.70 (ending, longest) | 518–680 | «it» | It keeps **rolling** → Just be **careful** → `MUAYAD FIT` | **Clock close-up** 5.4 → **pull back** to the wide poster on «just» (45 f) | The clock rolls one turn per 2.6 s. The line fades at 20.62 s, the scene dims to 30%, and the wordmark enters in the text band and holds 2.1 s |

Ticks (synthesised in code by `scripts/make-tick.mjs`, about −24 dBFS peak) start at
frames 86, 142, 263, 326, 415 and 515, 3 frames before each cut.
