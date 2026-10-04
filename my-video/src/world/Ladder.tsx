import React from "react";
import { COLOR, CONTOUR } from "../tokens";
import { LADDER, railX } from "./geometry";

type Seg = { x1: number; y1: number; x2: number; y2: number; w: number };

// Two passes (all outlines, then all fills) so rungs join the rails cleanly.
export const Ladder: React.FC = () => {
  const [l0] = LADDER.left;
  const [r0] = LADDER.right;
  const topL = railX(LADDER.topY);
  const segs: Seg[] = [];
  for (let y = LADDER.rungStart; y < 1990; y += LADDER.rungGap) segs.push({ x1: railX(y), y1: y, x2: railX(y) + 70, y2: y, w: 9 });
  segs.push({ x1: l0[0], y1: l0[1], x2: topL, y2: LADDER.topY, w: 12 });
  segs.push({ x1: r0[0], y1: r0[1], x2: topL + 70, y2: LADDER.topY, w: 12 });
  return (
    <g strokeLinecap="round">
      {segs.map((s, i) => (
        <line key={`o${i}`} {...s} stroke={COLOR.bg} strokeWidth={s.w + CONTOUR * 2} />
      ))}
      {segs.map((s, i) => (
        <line key={`f${i}`} {...s} stroke={COLOR.text} strokeWidth={s.w} />
      ))}
    </g>
  );
};
