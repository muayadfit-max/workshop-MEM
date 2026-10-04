import React from "react";
import { easeInOut } from "../anim";
import { Camera, useShotTime } from "../Camera";
import { SHOTS } from "../timing";

// «يشوهون صورتك»: on the climber; it slips, then its silhouette bends.
const S = SHOTS[5];
export const Shot6Distort: React.FC = () => {
  const { t, local } = useShotTime(S.start);
  const k = easeInOut(local / (S.end - S.start));
  return <Camera t={t} framing={{ s: 1.12 + 0.04 * k, fx: 400, topY: 440 }} />;
};
