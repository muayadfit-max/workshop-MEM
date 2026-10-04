import React from "react";
import { COLOR, CONTOUR } from "../tokens";
import { GIVER } from "./geometry";
import { Blob, Limb, rotAbout, scaleAbout } from "./Ink";

// The figure above: kneels on the ledge, offers one open hand, hides a fist behind its back.
export const Giver: React.FC<{ lean: number; bob: number; extend: number; dip: number; fist: number }> = ({
  lean,
  bob,
  extend,
  dip,
  fist,
}) => {
  const ext = `translate(${-0.32 * extend} ${0.95 * extend + dip})`;
  return (
    <g>
      <Limb pts={GIVER.farLeg} w={44} />
      <Limb pts={GIVER.nearLeg} w={44} />
      <g transform={rotAbout(lean, GIVER.hip)}>
        <Limb pts={GIVER.farArm} w={30} />
        <g transform={scaleAbout(fist, GIVER.fist.c)}>
          <Blob c={GIVER.fist.c} rx={GIVER.fist.r} />
          {/* knuckles: the giver's only detail, so the hidden hand reads as a fist */}
          {[-7, 3].map((dy) => (
            <path
              key={dy}
              d={`M${GIVER.fist.c[0] - 9} ${GIVER.fist.c[1] + dy} q9 -5 18 0`}
              fill="none"
              stroke={COLOR.bg}
              strokeWidth={CONTOUR * 0.7}
              strokeLinecap="round"
            />
          ))}
        </g>
        <Limb pts={[GIVER.hip, GIVER.shoulder]} w={76} />
        <Blob c={GIVER.head.c} rx={GIVER.head.r} />
        <g transform={`${ext} ${rotAbout(bob, GIVER.offeredShoulder)}`}>
          <Limb pts={GIVER.offeredArm} w={30} />
          <Blob c={GIVER.hand.c} rx={GIVER.hand.rx} ry={GIVER.hand.ry} rot={GIVER.hand.rot} />
        </g>
      </g>
    </g>
  );
};
