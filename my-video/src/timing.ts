import words from "./data/words.json";
import { FRAME } from "./tokens";

// Timing is written in seconds and converted to frames once, here.
export const FPS = FRAME.fps;
export const toFrames = (seconds: number) => Math.round(seconds * FPS);

export type Word = { i: number; word: string; start: number; end: number; lang: "ar" | "en" };
// words.json is measured from the first audio sample; the .mov's audio starts at audio_start on the video timeline.
export const WORDS: Word[] = (words.words as Word[]).map((w) => ({
  ...w,
  start: w.start + words.audio_start,
  end: w.end + words.audio_start,
}));
const at = (i: number) => WORDS[i].start;

export const DURATION_S = 22.7;
export const DURATION = toFrames(DURATION_S);

// Beats (seconds), each one a spoken word onset from words.json.
export const BEAT = {
  naw3iya: at(6), // نوعية
  waqfin: at(11), // واقفين
  min: at(14), // من
  wrak: at(15), // وراك
  madh: at(20), // مدح
  yikharib: at(25), // يخرب
  fursa: at(29), // فرصة
  ashan: at(30), // عشان
  yitayhun: at(31), // يطيحون
  yishawhun: at(34), // ويشوهون
  it: at(36),
  just: at(41),
  carefulEnd: WORDS[43].end,
};

// End card: 6 frames after «careful» ends.
export const END_CARD_S = BEAT.carefulEnd + 0.2;

// Shots at absolute start times; every cut is a word onset.
export const SHOTS = [
  { id: 1, start: 0, end: BEAT.naw3iya },
  { id: 2, start: BEAT.naw3iya, end: BEAT.waqfin },
  { id: 3, start: BEAT.waqfin, end: BEAT.madh },
  { id: 4, start: BEAT.madh, end: BEAT.yikharib },
  { id: 5, start: BEAT.yikharib, end: BEAT.ashan },
  { id: 6, start: BEAT.ashan, end: BEAT.it },
  { id: 7, start: BEAT.it, end: DURATION_S },
].map((s) => ({ ...s, from: toFrames(s.start), frames: toFrames(s.end) - toFrames(s.start) }));

// On-screen lines. `emph` marks the bigger word. `exit` is when the line has fully left.
export type Line = {
  words: { text: string; idx: number; emph?: boolean }[];
  dir: "rtl" | "ltr";
  exit: number;
  poster?: boolean; // visible (muted) before it is spoken
};

export const LINES: Line[] = [
  { dir: "rtl", poster: true, exit: BEAT.waqfin, words: [{ text: "نوعية", idx: 6 }, { text: "الناس", idx: 7, emph: true }] },
  { dir: "rtl", exit: BEAT.min, words: [{ text: "واقفين", idx: 11 }, { text: "معك", idx: 12, emph: true }] },
  { dir: "rtl", exit: BEAT.madh, words: [{ text: "من", idx: 14 }, { text: "وراك", idx: 15, emph: true }] },
  { dir: "rtl", exit: BEAT.yikharib, words: [{ text: "مدح", idx: 20, emph: true }, { text: "ودعم", idx: 21 }] },
  { dir: "rtl", exit: BEAT.ashan, words: [{ text: "يخربون", idx: 25 }, { text: "علاقاتك", idx: 26, emph: true }] },
  { dir: "rtl", exit: BEAT.it, words: [{ text: "يشوهون", idx: 34 }, { text: "صورتك", idx: 35, emph: true }] },
  { dir: "ltr", exit: BEAT.just, words: [{ text: "It", idx: 36 }, { text: "keeps", idx: 37 }, { text: "rolling", idx: 38, emph: true }] },
  { dir: "ltr", exit: END_CARD_S, words: [{ text: "Just", idx: 41 }, { text: "be", idx: 42 }, { text: "careful", idx: 43, emph: true }] },
];

// A cut sound starts 3 frames before each cut.
export const TICK_FRAMES = SHOTS.slice(1).map((s) => s.from - 3);
