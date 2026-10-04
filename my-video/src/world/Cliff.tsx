import React from "react";
import { COLOR, CONTOUR } from "../tokens";
import { CLIFF } from "./geometry";

export const Cliff: React.FC = () => {
  const d = "M" + CLIFF.outline.map((p) => p.join(" ")).join(" L") + " Z";
  return (
    <g>
      <path d={d} fill={COLOR.surface} stroke={COLOR.muted} strokeWidth={CONTOUR} strokeLinejoin="round" />
      {CLIFF.cracks.map((c, i) => (
        <polyline
          key={i}
          points={c.map((p) => p.join(",")).join(" ")}
          fill="none"
          stroke={COLOR.muted}
          strokeWidth={CONTOUR * 0.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.6}
        />
      ))}
    </g>
  );
};
