import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";
import { FONT } from "./tokens";

// Tajawal, loaded from local files (public/fonts, from @fontsource/tajawal). Arabic and Latin subsets.
const ARABIC = "U+0600-06FF,U+0750-077F,U+08A0-08FF,U+200C-200E,U+FB50-FDFF,U+FE70-FEFC";
const LATIN = "U+0000-00FF,U+0131,U+0152-0153,U+2000-206F";

export const fontsReady = Promise.all(
  ([FONT.base.weight, FONT.emphasis.weight] as const).flatMap((w) => [
    loadFont({ family: FONT.family, url: staticFile(`fonts/tajawal-arabic-${w}-normal.woff2`), weight: String(w), unicodeRange: ARABIC }),
    loadFont({ family: FONT.family, url: staticFile(`fonts/tajawal-latin-${w}-normal.woff2`), weight: String(w), unicodeRange: LATIN }),
  ]),
);
