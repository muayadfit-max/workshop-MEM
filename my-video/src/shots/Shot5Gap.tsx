import React from "react";
import { easeInOut } from "../anim";
import { Camera, useShotTime } from "../Camera";
import { SHOTS } from "../timing";

// «يخربون علاقاتك»: tight on the gap between the hand and the ladder.
const S = SHOTS[4];
export const Shot5Gap: React.FC = () => {
  const { t, local } = useShotTime(S.start);
  const k = easeInOut(local / (S.end - S.start));
  return <Camera t={t} framing={{ s: 1.8 + 0.06 * k, fx: 560, topY: 450 }} />;
};
