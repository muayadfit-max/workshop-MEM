import React from "react";
import { easeOut } from "../anim";
import { Camera, useShotTime } from "../Camera";
import { BEAT, SHOTS } from "../timing";

// «واقفين معك» → «من وراك»: the offered hand, then the camera trucks until the open hand
// and the fist on its back share the frame.
const S = SHOTS[2];
export const Shot3Behind: React.FC = () => {
  const { t } = useShotTime(S.start);
  const truck = easeOut((t - BEAT.min) / (18 / 30));
  return <Camera t={t} framing={{ s: 2.6 + 0.3 * truck, fx: 600 + 80 * truck, topY: 450 }} />;
};
