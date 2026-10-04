// Writes public/sfx/tick.wav: a short, soft clock tick made in code (no sample, no randomness).
import { writeFileSync, mkdirSync } from "node:fs";

const sr = 48000;
const dur = 0.06;
const n = Math.round(sr * dur);
const peak = 0.06; // about -24 dBFS peak; the voice-over averages -23.8 dB RMS, so the tick sits well under it
const data = new Int16Array(n);
for (let i = 0; i < n; i++) {
  const t = i / sr;
  const body = Math.sin(2 * Math.PI * 1900 * t) * Math.exp(-t * 140);
  const knock = Math.sin(2 * Math.PI * 620 * t) * Math.exp(-t * 70) * 0.6;
  const attack = Math.min(1, t / 0.0008);
  data[i] = Math.round(32767 * peak * attack * (body + knock) / 1.6);
}
const header = Buffer.alloc(44);
header.write("RIFF", 0);
header.writeUInt32LE(36 + n * 2, 4);
header.write("WAVE", 8);
header.write("fmt ", 12);
header.writeUInt32LE(16, 16);
header.writeUInt16LE(1, 20);
header.writeUInt16LE(1, 22);
header.writeUInt32LE(sr, 24);
header.writeUInt32LE(sr * 2, 28);
header.writeUInt16LE(2, 32);
header.writeUInt16LE(16, 34);
header.write("data", 36);
header.writeUInt32LE(n * 2, 40);
mkdirSync("public/sfx", { recursive: true });
writeFileSync("public/sfx/tick.wav", Buffer.concat([header, Buffer.from(data.buffer)]));
console.log("wrote public/sfx/tick.wav", n, "samples");
