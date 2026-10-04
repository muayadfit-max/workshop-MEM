import React from "react";
import { useCurrentFrame } from "remotion";
import { clamp01, easeOut } from "../anim";
import { COLOR, FONT, SAFE } from "../tokens";
import { FPS, LINES, WORDS, type Line } from "../timing";

const ENTER = 6 / FPS;
const EXIT = 5 / FPS;
const SWAP = 2 / FPS; // colour hand-off is an opacity crossfade, not a colour tween

// One word: three stacked copies (muted / accent / text) so colour changes are opacity only.
const Word: React.FC<{ text: string; idx: number; emph?: boolean; poster?: boolean; t: number }> = ({
  text,
  idx,
  emph,
  poster,
  t,
}) => {
  const { start, end } = WORDS[idx];
  const spoken = clamp01((t - start) / SWAP);
  const done = clamp01((t - end) / SWAP);
  const enter = poster ? 1 : easeOut((t - start) / ENTER);
  const style = emph ? FONT.emphasis : FONT.base;
  const layer = (color: string, opacity: number) => (
    <span style={{ position: "absolute", inset: 0, color, opacity }}>{text}</span>
  );
  return (
    <span
      style={{
        position: "relative",
        display: "inline-block",
        fontSize: style.size,
        fontWeight: style.weight,
        opacity: enter,
        transform: `translateY(${18 * (1 - enter)}px)`,
      }}
    >
      <span style={{ opacity: 0 }}>{text}</span>
      {layer(COLOR.muted, poster ? 1 - spoken : 0)}
      {layer(COLOR.accent, spoken * (1 - done))}
      {layer(COLOR.text, done)}
    </span>
  );
};

const CaptionLine: React.FC<{ line: Line; t: number }> = ({ line, t }) => {
  const first = WORDS[line.words[0].idx].start;
  if (!line.poster && t < first) return null;
  if (t >= line.exit) return null;
  const out = easeOut((t - (line.exit - EXIT)) / EXIT);
  return (
    <div
      style={{
        position: "absolute",
        left: SAFE.side,
        right: SAFE.side,
        top: SAFE.textBand.top,
        height: SAFE.textBand.bottom - SAFE.textBand.top,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 1 - out,
        transform: `translateY(${-12 * out}px)`,
      }}
    >
      <div
        style={{
          direction: line.dir,
          display: "flex",
          alignItems: "baseline",
          gap: 26,
          fontFamily: FONT.family,
          lineHeight: FONT.lineHeight,
          whiteSpace: "nowrap",
        }}
      >
        {line.words.map((w) => (
          <Word key={w.idx} text={w.text} idx={w.idx} emph={w.emph} poster={line.poster} t={t} />
        ))}
      </div>
    </div>
  );
};

export const Captions: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  return (
    <>
      {LINES.map((line, i) => (
        <CaptionLine key={i} line={line} t={t} />
      ))}
    </>
  );
};
