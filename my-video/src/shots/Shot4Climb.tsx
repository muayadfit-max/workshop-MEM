import React from "react";
import { easeInOut } from "../anim";
import { Camera, useShotTime } from "../Camera";
import { SHOTS } from "../timing";

// «مدح ودعم»: the climber goes up a rung toward the hand. The gap stays.
const S = SHOTS[3];
export const Shot4Climb: React.FC = () => {
  const { t, local } = useShotTime(S.start);
  const k = easeInOut(local / (S.end - S.start));
  return <Camera t={t} framing={{ s: 1.45 + 0.05 * k, fx: 500, topY: 445 }} />;
};
