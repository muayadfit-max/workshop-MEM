# Creative-director review log

Each round rendered start / settled / end stills of all 7 shots, plus in-between frames for
moving shots. Stills were reviewed with safe-zone guides drawn over them.
Scores: **R**eadability, **H**ierarchy, **M**otion, **B**rand fit, **S**afe zones.

## Scores below 8 and the fixes applied

| Round | Shot | Score | Problem | Fix |
|---|---|---|---|---|
| 1 | 1, 4, 5, 6 | B 7 | The climber's torso and far leg formed one pillar | (round 2) redrawn with straight thigh and shin segments, knees toward the ladder, feet on rungs |
| 1 | all | B 7 | Rail outlines cut the rung ends, so the rungs floated | Ladder drawn in two passes: all outlines, then all fills |
| 1 | 1, 7 | B 7 | The clock's knob floated, its legs were invisible | Knob removed. Two small accent feet added |
| 1 | 2, 3, 4 | S 7 | The clock was cropped at the right edge, and the fist sat past the 64 px margin | Each framing changed so the clock is fully in or fully out |
| 1 | 3 | R 6 | The hidden arm arced over the body like a handle | Forearm now lies across the back with the fist on top |
| 1 | 5 | S 7 | The climber's head dropped into the bottom 25% after the ladder slip | Scale 1.9 → 1.8 |
| 1 | 6 | H 6 / M 6 | Not really on the climber; a 6° skew was invisible | Reframed on the climber. Skew raised (final 14° plus a 10% narrowing) |
| 1 | 7 | B 7 / H 7 | The giver's feet crowded the clock close-up; the wordmark sat over the figures | Giver moved 40 px left with shorter shins. Wordmark moved into the text band |
| 2 | 3 | M 6 | S2 and S3 had near-identical framing (jump cut) | S3 trucks from the open hand to the back |
| 2 | 3 | R 7 | The fist was unreadable at that size | Two knuckle lines added (the giver's only detail) |
| 3 | 3 | H 7 | At 4.2× the head was half cut and the torso swamped the frame | (round 4) S3 ends on 2.9× with head, open hand and fist together. S2 became a medium-wide with the clock |
| 3 | 6 | M 7 | The skew read as a lean | 14° skew plus 10% narrowing |
| 4 | 7 | S 7 | Mid pull-back, the giver's head rose into the text band | The dolly settles the vertical framing on a faster curve than the zoom |
| post | all | R 7 | The audio played 87 ms (2.6 f) after the captions: the .mov's audio starts at 0.087 s | `audio_start` stored in words.json and added in timing.ts. Measured lag after the fix: 0.087 s on both |

## Final scores (round 5, after the sync fix)

| Shot | R | H | M | B | S |
|---|---|---|---|---|---|
| 1 Poster | 9 | 8 | 8 | 9 | 9 |
| 2 Giver | 9 | 8 | 8 | 9 | 8 |
| 3 Behind | 8 | 8 | 8 | 9 | 8 |
| 4 Climb | 9 | 9 | 8 | 9 | 9 |
| 5 Gap | 9 | 9 | 8 | 9 | 9 |
| 6 Distort | 9 | 8 | 8 | 8 | 9 |
| 7 Ending | 9 | 9 | 9 | 9 | 9 |

The remaining 8s, noted honestly:
- S2/S3: the climber's head and the ladder top are cropped in the bottom-left corner. They
  sit in the bottom 25%, where nothing important lives, but they are not elegant.
- S6: the warp is a skew. With transform and opacity only, a stronger distortion is not
  possible without paths that change shape.
