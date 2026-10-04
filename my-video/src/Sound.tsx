import React from "react";
import { Audio } from "@remotion/media";
import { Sequence, staticFile } from "remotion";
import { TICK_FRAMES } from "./timing";

// Voice-over audio only (its picture is never shown), plus a code-made tick 3 frames before each cut.
export const Sound: React.FC = () => (
  <>
    <Audio src={staticFile("assets/voiceover.mov")} />
    {TICK_FRAMES.map((f) => (
      <Sequence key={f} from={f} durationInFrames={6} layout="none">
        <Audio src={staticFile("sfx/tick.wav")} />
      </Sequence>
    ))}
  </>
);
