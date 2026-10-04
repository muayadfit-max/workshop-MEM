import React from "react";
import { useCurrentFrame } from "remotion";
import { easeOut } from "../anim";
import { COLOR, FONT, FRAME, SAFE } from "../tokens";
import { END_CARD_S, FPS } from "../timing";

// No logo file was given, so the end card is the words MUAYAD FIT. No mark is drawn.
// It sits in the text band, where every line of the film has appeared.
export const EndCard: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  if (t < END_CARD_S) return null;
  const k = easeOut((t - END_CARD_S) / (8 / FPS));
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        width: FRAME.width,
        top: SAFE.textBand.top,
        height: SAFE.textBand.bottom - SAFE.textBand.top,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: FONT.family,
        fontSize: FONT.wordmark.size,
        fontWeight: FONT.wordmark.weight,
        letterSpacing: FONT.wordmark.tracking,
        color: COLOR.text,
        opacity: k,
        transform: `translateY(${18 * (1 - k)}px)`,
      }}
    >
      MUAYAD FIT
    </div>
  );
};
