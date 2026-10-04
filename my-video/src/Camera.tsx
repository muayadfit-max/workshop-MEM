import React from "react";
import { useCurrentFrame } from "remotion";
import { COLOR, FRAME, SAFE } from "./tokens";
import { FPS } from "./timing";
import { World } from "./world/World";

// A framing: scale `s`, world x shown at screen centre `fx`, world y shown at the text band's lower edge `topY`.
// Keeping world y ≈ 450 at or below screen 420 keeps the text band over empty sky in every shot.
export type Framing = { s: number; fx: number; topY: number };

export const WIDE: Framing = { s: 1, fx: 540, topY: SAFE.textBand.bottom };

const CENTER_Y = 930; // centre of the stage between the text band and the bottom safe zone
export const centerOf = (f: Framing) => ({ x: f.fx, y: f.topY + (CENTER_Y - SAFE.textBand.bottom) / f.s });

/**
 * Dolly between two framings: scale moves in log space and x linearly, while the
 * text-band edge (topY) settles on a faster curve, so the band stays clear of the
 * figures for the whole move.
 */
export const between = (a: Framing, b: Framing, k: number): Framing => {
  const s = Math.exp(Math.log(a.s) + (Math.log(b.s) - Math.log(a.s)) * k);
  const kTop = 1 - Math.pow(1 - k, 4);
  return { s, fx: a.fx + (b.fx - a.fx) * k, topY: a.topY + (b.topY - a.topY) * kTop };
};

/** Push in or out about the stage centre, keeping the same centred world point. */
export const push = (f: Framing, s: number): Framing => {
  const c = centerOf(f);
  return { s, fx: c.x, topY: c.y - (CENTER_Y - SAFE.textBand.bottom) / s };
};

/** Shot-local time helper: global seconds for the current frame inside a <Sequence>. */
export const useShotTime = (start: number) => {
  const frame = useCurrentFrame();
  const local = frame / FPS;
  return { local, t: start + local };
};

export const Camera: React.FC<{ framing: Framing; t: number; opacity?: number }> = ({ framing, t, opacity = 1 }) => {
  const { s, fx, topY } = framing;
  const tx = FRAME.width / 2 - fx * s;
  const ty = SAFE.textBand.bottom - topY * s;
  return (
    <svg
      width={FRAME.width}
      height={FRAME.height}
      viewBox={`0 0 ${FRAME.width} ${FRAME.height}`}
      style={{ position: "absolute", inset: 0, background: COLOR.bg }}
    >
      <g opacity={opacity} transform={`translate(${tx} ${ty}) scale(${s})`}>
        <World t={t} />
      </g>
    </svg>
  );
};
