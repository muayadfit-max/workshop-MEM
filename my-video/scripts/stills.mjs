// Renders review stills: start / settled / end of every shot, plus a contact sheet.
// Usage: node scripts/stills.mjs <outDir> [frame,frame,...]
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import path from "node:path";
import { mkdirSync } from "node:fs";

const BROWSER = "/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell";
const outDir = process.argv[2] ?? "out/stills";
const DEFAULT = {
  "s1": [0, 60, 86],
  "s2": [87, 112, 141],
  "s3": [142, 200, 262],
  "s4": [263, 285, 325],
  "s5": [326, 360, 415],
  "s6": [416, 490, 515],
  "s7": [516, 545, 640, 680],
};
const only = process.argv[3]?.split(",").map(Number);
mkdirSync(outDir, { recursive: true });
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
const composition = await selectComposition({ serveUrl, id: "JustBeCareful", browserExecutable: BROWSER });
const jobs = only
  ? only.map((f) => ["f", f])
  : Object.entries(DEFAULT).flatMap(([k, fs]) => fs.map((f) => [k, f]));
for (const [k, f] of jobs) {
  const output = path.join(outDir, `${k}_${String(f).padStart(3, "0")}.png`);
  await renderStill({ serveUrl, composition, frame: f, output, browserExecutable: BROWSER, imageFormat: "png" });
  console.log(output);
}
