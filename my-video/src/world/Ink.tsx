import React from "react";
import { COLOR, CONTOUR } from "../tokens";
import type { P } from "./geometry";

// Flat off-white volumes with one dark contour weight, like the reference's figures.

const curve = (pts: P[], sharp?: boolean) =>
  sharp
    ? "M" + pts.map((p) => `${p[0]} ${p[1]}`).join(" L")
    : pts.length === 2
    ? `M${pts[0][0]} ${pts[0][1]} L${pts[1][0]} ${pts[1][1]}`
    : `M${pts[0][0]} ${pts[0][1]} Q${pts[1][0]} ${pts[1][1]} ${pts[2][0]} ${pts[2][1]}`;

export const Limb: React.FC<{ pts: P[]; w: number; sharp?: boolean }> = ({ pts, w, sharp }) => {
  const d = curve(pts, sharp);
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} stroke={COLOR.bg} strokeWidth={w + CONTOUR * 2} />
      <path d={d} stroke={COLOR.text} strokeWidth={w} />
    </g>
  );
};

export const Blob: React.FC<{ c: P; rx: number; ry?: number; rot?: number; fill?: string }> = ({
  c,
  rx,
  ry,
  rot = 0,
  fill = COLOR.text,
}) => (
  <ellipse
    cx={c[0]}
    cy={c[1]}
    rx={rx}
    ry={ry ?? rx}
    transform={`rotate(${rot} ${c[0]} ${c[1]})`}
    fill={fill}
    stroke={COLOR.bg}
    strokeWidth={CONTOUR}
  />
);

/** SVG rotate about a point, as a transform string. */
export const rotAbout = (deg: number, p: P) => `rotate(${deg} ${p[0]} ${p[1]})`;
export const scaleAbout = (s: number, p: P) => `translate(${p[0]} ${p[1]}) scale(${s}) translate(${-p[0]} ${-p[1]})`;
export const skewXAbout = (deg: number, p: P) => `translate(${p[0]} ${p[1]}) skewX(${deg}) translate(${-p[0]} ${-p[1]})`;
export const scaleXAbout = (s: number, p: P) => `translate(${p[0]} ${p[1]}) scale(${s} 1) translate(${-p[0]} ${-p[1]})`;
