// Pure helpers: every value is a function of time, never of state.
export const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
export const easeOut = (x: number) => 1 - Math.pow(1 - clamp01(x), 3);
export const easeInOut = (x: number) => {
  const t = clamp01(x);
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Progress 0..1 of a move that starts at `start` seconds and lasts `dur` seconds. */
export const prog = (t: number, start: number, dur: number) => clamp01((t - start) / dur);

/** Sine loop, period in seconds. */
export const loop = (t: number, period: number, phase = 0) => Math.sin((2 * Math.PI * t) / period + phase);

/** A knock that rings and settles: 0 before `start`, decays to 0 after. */
export const ring = (t: number, start: number, freq = 2.2, decay = 6) =>
  t < start ? 0 : Math.exp(-decay * (t - start)) * Math.sin(2 * Math.PI * freq * (t - start));
