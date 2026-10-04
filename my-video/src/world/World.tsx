import React from "react";
import { Cliff } from "./Cliff";
import { Climber } from "./Climber";
import { Clock } from "./Clock";
import { CLIMBER, GIVER_SHIFT, LADDER, alongLadder } from "./geometry";
import { Giver } from "./Giver";
import { scaleXAbout, skewXAbout } from "./Ink";
import { Ladder } from "./Ladder";
import { pose } from "./pose";

// The single drawing every shot looks at. `t` is global time in seconds.
export const World: React.FC<{ t: number }> = ({ t }) => {
  const p = pose(t);
  const slip = alongLadder(-p.ladderSlip);
  const up = alongLadder(LADDER.rungGap * p.climb - p.climberSlip);
  return (
    <g>
      <Cliff />
      <Clock hand={p.clock} />
      <g transform={`translate(${slip[0]} ${slip[1]}) rotate(${p.rock} ${LADDER.base[0]} ${LADDER.base[1]})`}>
        <Ladder />
        <g transform={`translate(${up[0]} ${up[1] + p.breathe}) ${skewXAbout(-p.skew, CLIMBER.hip)} ${scaleXAbout(p.squeeze, CLIMBER.hip)}`}>
          <Climber reach={p.reach} />
        </g>
      </g>
      <g transform={`translate(${GIVER_SHIFT} 0)`}>
        <Giver lean={p.lean} bob={p.bob} extend={p.extend} dip={p.dip} fist={p.fist} />
      </g>
    </g>
  );
};
