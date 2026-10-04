import React from "react";
import { Composition } from "remotion";
import { Reel } from "./Reel";
import { DURATION, FPS } from "./timing";
import { FRAME } from "./tokens";

export const RemotionRoot: React.FC = () => (
  <Composition id="JustBeCareful" component={Reel} durationInFrames={DURATION} fps={FPS} width={FRAME.width} height={FRAME.height} />
);
