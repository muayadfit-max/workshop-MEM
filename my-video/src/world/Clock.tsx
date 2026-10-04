import React from "react";
import { COLOR, CONTOUR } from "../tokens";
import { CLOCK } from "./geometry";
import { rotAbout } from "./Ink";

// The only accent object. `hand` is the minute hand angle in degrees.
export const Clock: React.FC<{ hand: number }> = ({ hand }) => {
  const [cx, cy] = CLOCK.c;
  const r = CLOCK.r;
  const ink = { stroke: COLOR.bg, strokeWidth: CONTOUR, strokeLinecap: "round" as const };
  const feetY = 700 - 9;
  return (
    <g>
      {[-28, 28].map((dx) => (
        <ellipse key={dx} cx={cx + dx} cy={feetY} rx={13} ry={9} fill={COLOR.accent} stroke={COLOR.bg} strokeWidth={CONTOUR} />
      ))}
      <circle cx={cx} cy={cy} r={r} fill={COLOR.accent} stroke={COLOR.bg} strokeWidth={CONTOUR} />
      {[0, 90, 180, 270].map((a) => (
        <line key={a} x1={cx} y1={cy - r + 8} x2={cx} y2={cy - r + 17} {...ink} transform={rotAbout(a, CLOCK.c)} />
      ))}
      <line x1={cx} y1={cy} x2={cx - 21} y2={cy - 9} {...ink} strokeWidth={CONTOUR * 1.3} />
      <line x1={cx} y1={cy + 5} x2={cx} y2={cy - r + 13} {...ink} transform={rotAbout(hand, CLOCK.c)} />
      <circle cx={cx} cy={cy} r={5} fill={COLOR.bg} />
    </g>
  );
};
