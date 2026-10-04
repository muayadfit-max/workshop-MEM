import React from "react";
import { easeInOut } from "../anim";
import { Camera, WIDE, push, useShotTime } from "../Camera";
import { SHOTS } from "../timing";

// Wide poster: the whole metaphor is on screen from frame 0.
const S = SHOTS[0];
export const Shot1Poster: React.FC = () => {
  const { t, local } = useShotTime(S.start);
  const k = easeInOut(local / (S.end - S.start));
  return <Camera t={t} framing={push(WIDE, 1 + 0.03 * k)} />;
};
