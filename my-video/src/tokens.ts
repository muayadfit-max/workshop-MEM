// The only place colours, type and layout numbers are defined.

export const COLOR = {
  bg: "#0B0B0B",
  surface: "#161616",
  text: "#F4F4F4",
  muted: "#9A9A9A",
  accent: "#1a9df1",
} as const;

export const FONT = {
  family: "Tajawal",
  base: { size: 72, weight: 500 }, // subhead tier
  emphasis: { size: 140, weight: 800 }, // headline tier (max)
  wordmark: { size: 120, weight: 800, tracking: "0.08em" },
  lineHeight: 1.15,
} as const;

export const FRAME = { width: 1080, height: 1920, fps: 30 } as const;

// Safe zones (screen px).
export const SAFE = {
  top: 192, // top 10%
  bottom: 1440, // bottom 25% starts here
  side: 64,
  textBand: { top: 200, bottom: 420 },
} as const;

// One contour weight for the whole drawing, in world units.
export const CONTOUR = 6;
