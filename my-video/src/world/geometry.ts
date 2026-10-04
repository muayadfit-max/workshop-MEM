// World coordinates: the wide poster framing, 1080x1920, before any camera move.
export type P = readonly [number, number];

export const CLIFF = {
  outline: [
    [585, 702], [700, 698], [820, 701], [1120, 699], [1120, 1990],
    [930, 1990], [860, 1650], [800, 1400], [735, 1180], [690, 1000], [640, 860], [612, 760],
  ] as P[],
  cracks: [
    [[820, 770], [850, 880], [830, 1000]],
    [[960, 790], [990, 940], [975, 1080], [1010, 1240]],
    [[880, 1310], [905, 1450]],
  ] as P[][],
};

export const CLOCK = { c: [955, 618] as P, r: 52 };

export const LADDER = {
  base: [445, 2000] as P,
  left: [[410, 2000], [510, 930]] as P[],
  right: [[480, 2000], [580, 930]] as P[],
  topY: 918,
  rungStart: 945,
  rungGap: 90,
};
// Rail x on the left rail for a given y.
export const railX = (y: number) => 410 + ((2000 - y) * 100) / 1070;
// Moving along the ladder by `d` px (positive = up).
export const alongLadder = (d: number): P => [(d * 100) / 1070, -d];

// The giver is drawn 40 px left of these points (see World) to clear the clock.
export const GIVER_SHIFT = -40;
export const GIVER = {
  hip: [795, 612] as P,
  shoulder: [660, 548] as P,
  head: { c: [612, 510] as P, r: 46 },
  nearLeg: [[790, 620], [735, 678], [830, 684]] as P[],
  farLeg: [[805, 615], [772, 674], [852, 680]] as P[],
  offeredArm: [[655, 562], [598, 642], [582, 742]] as P[],
  offeredShoulder: [655, 562] as P,
  hand: { c: [578, 766] as P, rx: 22, ry: 30, rot: 18 },
  farArm: [[690, 540], [730, 505], [775, 535]] as P[],
  fist: { c: [779, 540] as P, r: 21 },
};

// Limbs listed as [joint, joint, joint] are drawn with straight segments (crisp knees and elbows).
export const CLIMBER = {
  hip: [398, 1338] as P,
  head: { c: [468, 1012] as P, r: 50 },
  torso: [[398, 1338], [452, 1078]] as P[],
  nearLeg: [[404, 1335], [515, 1395], [462, 1484]] as P[],
  nearFoot: { c: [474, 1488] as P, rx: 27, ry: 13 },
  farLeg: [[392, 1345], [490, 1600], [436, 1754]] as P[],
  farFoot: { c: [448, 1758] as P, rx: 27, ry: 13 },
  farArm: [[448, 1095], [470, 1190], [498, 1150]] as P[],
  grip: { c: [498, 1148] as P, r: 17 },
  reachArm: [[458, 1088], [520, 1050], [545, 996]] as P[],
  reachShoulder: [458, 1088] as P,
  reachHand: { c: [548, 984] as P, rx: 18, ry: 25, rot: 18 },
};
