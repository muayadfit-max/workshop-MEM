# assets

| File | Used by |
|---|---|
| `hm-sultan-haitham.webp` | The "His Majesty" panel (`.hm-photo`) on the left of the hub |

The portrait is a cut-out with a transparent background, so it must stay in a
format that carries an alpha channel — WebP or PNG. Saving it as a JPEG would
render the transparent background solid black.

The panel crops it to a 308px-wide column (`object-fit: cover`), so the file is
stored at 1422x800 — exactly 2x the rendered size for retina displays, with the
original 1920x1080 framing preserved and uncropped.

The full-resolution original is kept in git history (commit eaa8cde).
