import { BEAT } from "../timing";
import { easeInOut, easeOut, loop, prog, ring } from "../anim";

// Every pose value is a pure function of global time t (seconds).
export const pose = (t: number) => ({
  // Idle life
  lean: 1.2 * loop(t, 2.0), // giver upper body, deg about the hip
  bob: 1.5 * loop(t, 2.0, Math.PI / 2), // offered arm, deg about the shoulder
  reach: 3 * loop(t, 1.6), // climber's reaching arm, deg about the shoulder
  breathe: 3 * loop(t, 2.0, 1), // climber, px

  // Beats on spoken words
  extend: 24 * easeOut(prog(t, BEAT.waqfin, 0.6)), // «واقفين»: the hand reaches further
  dip: 10 * easeOut(prog(t, BEAT.madh, 0.5)), // «مدح»: the hand dips toward the climber
  fist: 1 - 0.08 * easeOut(prog(t, BEAT.wrak, 0.25)), // «وراك»: the hidden fist tightens
  climb: easeOut(prog(t, BEAT.madh, 0.5)), // «مدح»: one rung up
  rock: 1.5 * ring(t, BEAT.yikharib), // «يخرب»: ladder rocks and settles, deg
  ladderSlip: 40 * easeOut(prog(t, BEAT.fursa, 0.4)), // «فرصة»: ladder slips down, px
  climberSlip: 45 * easeInOut(prog(t, BEAT.yitayhun, 0.35)), // «يطيحون»: climber slips half a rung
  skew: 14 * easeOut(prog(t, BEAT.yishawhun, 0.4)), // «يشوهون»: the silhouette bends, deg
  squeeze: 1 - 0.1 * easeOut(prog(t, BEAT.yishawhun, 0.4)), // ...and narrows: the image warped
  clock: clockAngle(t),
});

// The minute hand ticks 6° a second; from «it» it rolls one turn per 2.6 s.
const tickAngle = (t: number) => {
  const whole = Math.floor(t);
  return 6 * (whole + easeOut((t - whole) / (4 / 30)));
};
export const clockAngle = (t: number) =>
  t < BEAT.it ? tickAngle(t) : tickAngle(BEAT.it) + (360 * (t - BEAT.it)) / 2.6;
