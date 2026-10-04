import React from "react";
import { easeOut } from "../anim";
import { Camera, WIDE, between, useShotTime } from "../Camera";
import { BEAT, END_CARD_S, SHOTS } from "../timing";

// Ending: close on the rolling clock, pull back to the poster on «just», then dim for the wordmark.
const S = SHOTS[6];
const CLOCK_CLOSE = { s: 5.4, fx: 955, topY: 618 - 510 / 5.4 };
export const Shot7Ending: React.FC = () => {
  const { t } = useShotTime(S.start);
  const pull = easeOut((t - BEAT.just) / (45 / 30));
  const dim = easeOut((t - END_CARD_S) / (8 / 30));
  return <Camera t={t} framing={between(CLOCK_CLOSE, WIDE, pull)} opacity={1 - 0.7 * dim} />;
};
