# Motion Studio Rules — follow these for every video

## 1. Render contract (non-negotiable)
- Everything is code. Every frame is a pure function of the frame number: the same frame must produce the exact same image on every render.
- Drive all motion from the current frame (Remotion: useCurrentFrame(); HyperFrames: seekable timelines). No CSS transitions/animations, no requestAnimationFrame, no Date.now(), no setTimeout.
- No Math.random(). Use seeded randomness (Remotion: random("seed")).
- Animate transform and opacity only. Never animate left/top/width/margin.
- No filter: blur() on moving elements in final renders.
- Default format: 1080x1920, 30 fps. 60 fps only when asked.
- Write timing in seconds and convert once: frames = round(seconds * fps).
- Place scenes at absolute start frames (Remotion: <Sequence from={...}>).

## 2. Layout and safe zones
- Keep all important text and logos out of the top 10% and the bottom 25%.
- Side margins >= 64 px.
- The focal element fills 40–55% of the frame height.
- Frame 0 is a complete poster. Never start from a black or empty frame.

## 3. Look
- Define 4–6 color tokens once. No hard-coded colors anywhere else.
- One flat accent. No neon, no glow, no rainbow gradients, no glassmorphism.
- Type scale at 1080 px wide: headline 96–140 px, subhead 56–72, body 40–48, labels 28–32. Max 2 font families. Load fonts locally.
- Arabic: a font with Arabic glyphs; direction rtl on text elements only.

## 4. Motion
- Entrances ease-out. Every shot holds at least 1.5 s after it settles.
- 15–21 seconds = about 6–8 shots. Something meaningful changes every 2–3 s.
- Loops are pure functions of the frame, not repeat/yoyo tweens.
- The ending is its own shot and holds the longest.

## 5. Timing and sound
- With a voice-over: word-level timestamps, cuts only on real word boundaries.
- A cut sound starts ~3 frames before the cut.

## 6. Workflow
1. Shot list first. Stop and wait for OK.
2. One component per visual idea. Tokens in one file.
3. Stills of every shot before the MP4.
4. Score each shot 1–10. Fix anything below 8.
5. Only then render the MP4.
6. Never invent logos, faces, prices, or claims. Use the assets given, or ask.
