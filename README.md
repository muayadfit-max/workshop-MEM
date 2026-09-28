# Fertilizer Roadmap — Interactive Canvas

Interactive, pan-and-zoom canvas visualising the integration roadmap of minerals to fertilizers (FalajPoint).

- `index.html` — the full standalone canvas (all CSS and JS inline; no build step).
- Published via GitHub Pages by `.github/workflows/pages.yml`.

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

then visit http://localhost:8000

## Offline backup

`workshop-canvas-offline.html` is the whole canvas in one file — fonts, d3,
topojson, the QR library, the world-atlas topology and every image are embedded,
so it opens with no network at all. Copy it to a USB stick or email it; double
-click to run.

Rebuild it after any change to `index.html`, or the backup drifts from the live
site:

```bash
python3 tools/build-offline.py
```
