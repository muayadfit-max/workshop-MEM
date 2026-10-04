import React from "react";
import { CLIMBER } from "./geometry";
import { Blob, Limb, rotAbout } from "./Ink";

// The figure below: on the ladder, one hand on the rail, the other reaching up.
export const Climber: React.FC<{ reach: number }> = ({ reach }) => (
  <g>
    <Limb pts={CLIMBER.farLeg} w={40} sharp />
    <Blob c={CLIMBER.farFoot.c} rx={CLIMBER.farFoot.rx} ry={CLIMBER.farFoot.ry} />
    <Limb pts={CLIMBER.farArm} w={30} sharp />
    <Blob c={CLIMBER.grip.c} rx={CLIMBER.grip.r} />
    <Limb pts={CLIMBER.torso} w={76} />
    <Limb pts={CLIMBER.nearLeg} w={40} sharp />
    <Blob c={CLIMBER.nearFoot.c} rx={CLIMBER.nearFoot.rx} ry={CLIMBER.nearFoot.ry} />
    <Blob c={CLIMBER.head.c} rx={CLIMBER.head.r} />
    <g transform={rotAbout(reach, CLIMBER.reachShoulder)}>
      <Limb pts={CLIMBER.reachArm} w={30} sharp />
      <Blob c={CLIMBER.reachHand.c} rx={CLIMBER.reachHand.rx} ry={CLIMBER.reachHand.ry} rot={CLIMBER.reachHand.rot} />
    </g>
  </g>
);
