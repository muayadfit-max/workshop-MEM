import React from "react";
import { easeInOut } from "../anim";
import { Camera, useShotTime } from "../Camera";
import { SHOTS } from "../timing";

// «نوعية الناس»: medium-wide on the figure above, its clock beside it.
const S = SHOTS[1];
export const Shot2Giver: React.FC = () => {
  const { t, local } = useShotTime(S.start);
  const k = easeInOut(local / (S.end - S.start));
  return <Camera t={t} framing={{ s: 1.6 + 0.06 * k, fx: 720, topY: 445 }} />;
};
