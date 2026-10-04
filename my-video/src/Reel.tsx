import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import "./fonts";
import { Sound } from "./Sound";
import { Shot1Poster } from "./shots/Shot1Poster";
import { Shot2Giver } from "./shots/Shot2Giver";
import { Shot3Behind } from "./shots/Shot3Behind";
import { Shot4Climb } from "./shots/Shot4Climb";
import { Shot5Gap } from "./shots/Shot5Gap";
import { Shot6Distort } from "./shots/Shot6Distort";
import { Shot7Ending } from "./shots/Shot7Ending";
import { Captions } from "./text/Captions";
import { EndCard } from "./text/EndCard";
import { SHOTS } from "./timing";
import { COLOR } from "./tokens";

const SHOT_COMPONENTS = [Shot1Poster, Shot2Giver, Shot3Behind, Shot4Climb, Shot5Gap, Shot6Distort, Shot7Ending];

export const Reel: React.FC = () => (
  <AbsoluteFill style={{ background: COLOR.bg }}>
    {SHOTS.map((s, i) => {
      const Shot = SHOT_COMPONENTS[i];
      return (
        <Sequence key={s.id} from={s.from} durationInFrames={s.frames} name={`Shot ${s.id}`}>
          <Shot />
        </Sequence>
      );
    })}
    <Captions />
    <EndCard />
    <Sound />
  </AbsoluteFill>
);
